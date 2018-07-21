<!--
    components/molecules/Logo.vue
-->

<template>
    <div class="m-distortedImage">
        <canvas ref="canvas" />
    </div>
</template>

<script>

    const data = {
        lion: "./img/lion/image.jpg",
        mask: "./img/lion/mask.jpg",
        depthMap: "./img/lion/depthMap.jpg"
    };

    import LifecycleHooks from "~/mixins/LifecycleHooks";

    import HeatVS from "~/assets/glsl/heat/vs.glsl";
    import HeatFS from "~/assets/glsl/heat/fs.glsl";

    export default {
        name: "distortedImage",
        mixins: [ LifecycleHooks ],
        props: {
            data: {
                type: Object,
                default: () => data
            }
        },
        methods: {
            init() {

                this.initWebGLScene();
                this.initRAF();
            },
            setListeners() {
                document.addEventListener("mousemove", this.mousemove);
                window.addEventListener("resize", this.resize);
            },
            initRAF() {
                this.fps = 60; // target frame rate
                this.frameDuration = 1000/this.fps; // how long, in milliseconds, a regular frame should take to be drawn
                this.time = 0; // time value, to be sent to shaders, for example
                this.lastTime = 0; // when was the last frame drawn
                this.anim();
            },
            anim(elapsed) {

                if (elapsed) {
                    this.delta = elapsed - this.lastTime;
                    this.lastTime = elapsed;

                    // how much of a frame did the last frame take
                    this.step = this.delta/this.frameDuration;
                    // add it to the time counter
                    this.time += this.step;

                    this.activeTexture(0, this.texture, this.samplerLoc);
                    this.activeTexture(1, this.texture2, this.samplerLoc2);
                    this.activeTexture(2, this.texture3, this.depthMapLocation);

                    this.gl.uniform1f(this.timeLocation, this.time);

                    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
                }

                this.raf = window.requestAnimationFrame(this.anim.bind(this));
            },
            activeTexture(index, texture, location) {
                this.gl.activeTexture(this.gl[`TEXTURE${index}`]);
                this.gl.bindTexture(this.gl.TEXTURE_2D, texture);
                this.gl.uniform1i(location, index);
            },
            initWebGLScene() {

                this.canvas = this.$refs.canvas;
                this.canvas.width = window.innerWidth;
                this.canvas.height = window.innerWidth * 2 / 3;

                this.gl = this.canvas.getContext("webgl");

                this.vertexShader = this.createShader(HeatVS, this.gl.VERTEX_SHADER);
                this.fragShader = this.createShader(HeatFS, this.gl.FRAGMENT_SHADER);

                this.program = this.gl.createProgram();
                this.gl.attachShader(this.program, this.vertexShader);
                this.gl.attachShader(this.program, this.fragShader);

                this.gl.linkProgram(this.program);
                this.gl.useProgram(this.program);

                this.timeLocation = this.gl.getUniformLocation(this.program, "u_time");

                this.textureImage = new Image();
                this.textureMask = new Image();
                this.textureDepthMap = new Image();

                this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);

                // create rectangle
                this.buffer = this.gl.createBuffer();
                this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.buffer);
                this.gl.bufferData(
                    this.gl.ARRAY_BUFFER,
                    new Float32Array([
                        -1.0, 1.0,
                        -1.0, -1.0,
                        1.0, 1.0,
                        -1.0, -1.0,
                        1.0, -1.0,
                        1.0, 1.0
                    ]),
                    this.gl.STATIC_DRAW);

                // vertex data
                this.positionLocation = this.gl.getAttribLocation(this.program, "a_position");
                this.gl.enableVertexAttribArray(this.positionLocation);
                this.gl.vertexAttribPointer(this.positionLocation, 2, this.gl.FLOAT, false, 0, 0);


                this.samplerLoc = this.gl.getUniformLocation(this.program, "u_image");
                this.samplerLoc2 = this.gl.getUniformLocation(this.program, "u_mask");
                this.depthMapLocation = this.gl.getUniformLocation(this.program, "u_depthMap");

                this.textureImage.onload = () => {

                    this.texture = this.gl.createTexture();

                    this.gl.activeTexture(this.gl.TEXTURE0);
                    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);

                    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
                    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
                    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
                    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);

                    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.textureImage);

                }
                this.textureMask.onload = () => {

                    this.texture2 = this.gl.createTexture();

                    this.gl.activeTexture(this.gl.TEXTURE1);
                    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture2);

                    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
                    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
                    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
                    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);

                    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.textureMask);

                }
                this.textureDepthMap.onload = () => {

                    this.texture3 = this.gl.createTexture();

                    this.gl.activeTexture(this.gl.TEXTURE2);
                    this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture3);

                    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
                    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
                    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
                    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);

                    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.textureDepthMap);

                }

                this.textureImage.src = this.data.lion;
                this.textureMask.src = this.data.mask;
                this.textureDepthMap.src = this.data.depthMap;
            },
            createShader(source, type) {
                const shader = this.gl.createShader(type);
                this.gl.shaderSource(shader, source);
                this.gl.compileShader(shader);

                return shader;
            },
            resize() {
                console.log("entro");
                const width = window.innerWidth;
                const height = window.innerWidth * 2 / 3;
                this.canvas.width = width;
                this.canvas.height = height;
                TweenMax.set(this.canvas, { width, height })
            },
            mousemove() {
                var location = this.gl.getUniformLocation(this.program, "mouse");
                this.gl.uniform2f(location, event.clientX/this.canvas.width, event.clientY/this.canvas.height);
            },
            destroyListeners() {
                document.removeEventListener("mousemove", this.mousemove);
                window.removeEventListener("resize", this.resize);
                window.cancelAnimationFrame(this.raf);
            }
        }
    }

</script>

<style lang="scss" scoped>

    .m-distortedImage {
        canvas {
            @include centerXY();
            position: absolute;
        }
    }

</style>


