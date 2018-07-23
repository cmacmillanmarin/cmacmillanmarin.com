<!--
    components/Background.vue
-->

<template>
    <div class="c-background">
        <canvas ref="canvas" />
        <div class="flexGrid _horizontal">
            <div class="flexGrid__cell" :class="smallDevice ? '_8' : '_6'"/>
            <div class="flexGrid__cell" :class="smallDevice ? '_37' : '_6'"/>
            <div class="flexGrid__cell" :class="smallDevice ? '_37' : '_6'"/>
            <div class="flexGrid__cell" :class="smallDevice ? '_8' : '_6'"/>
            <div v-if="!smallDevice" class="flexGrid__cell _6" />
            <div v-if="!smallDevice" class="flexGrid__cell _6" />
        </div>
    </div>
</template>

<script>

    import { mapState } from "vuex";

    import LifecycleHooks from "~/mixins/LifecycleHooks";

    import NoiseVS from "~/assets/glsl/noise/vs.glsl";
    import NoiseFS from "~/assets/glsl/noise/fs.glsl";

    export default {
        name: "Background",
        mixins: [ LifecycleHooks ],
        data() {
            return {
                smallDevice: true
            }
        },
        computed: {
            ...mapState({
                breakpoint: state => state.breakpoints.breakpoint
            })
        },
        watch: {
            breakpoint() {
                this.checkDevice();
            }
        },
        methods: {
            init() {
                this.checkDevice();
                this.initWebGLScene();
                this.initRAF();
            },
            setListeners() {
                this.onResize = _.throttle(this.resize, 50);
                window.addEventListener("resize", this.onResize);
            },
            checkDevice() {
                this.smallDevice = !(this.breakpoint.includes("desktop") || this.breakpoint.includes("tablet"));
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
                    this.gl.uniform1f(this.timeLocation, this.time);

                    this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
                }

                this.raf = window.requestAnimationFrame(this.anim.bind(this));
            },
            initWebGLScene() {

                this.canvas = this.$refs.canvas;
                this.canvas.width = window.innerWidth;
                this.canvas.height = window.innerHeight;

                this.gl = this.canvas.getContext("webgl");

                this.vertexShader = this.createShader(NoiseVS, this.gl.VERTEX_SHADER);
                this.fragShader = this.createShader(NoiseFS, this.gl.FRAGMENT_SHADER);

                this.program = this.gl.createProgram();
                this.gl.attachShader(this.program, this.vertexShader);
                this.gl.attachShader(this.program, this.fragShader);

                this.gl.linkProgram(this.program);
                this.gl.useProgram(this.program);

                this.timeLocation = this.gl.getUniformLocation(this.program, "u_time");

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
            },
            createShader(source, type) {
                const shader = this.gl.createShader(type);
                this.gl.shaderSource(shader, source);
                this.gl.compileShader(shader);

                return shader;
            },
            resize() {
                this.canvas.width = window.innerWidth;
                this.canvas.height = window.innerHeight;
            },
            mousemove() {
                var location = this.gl.getUniformLocation(this.program, "mouse");
                this.gl.uniform2f(location, event.clientX/this.canvas.width, event.clientY/this.canvas.height);
            },
            destroyListeners() {
                window.removeEventListener("resize", this.onResize);
                window.cancelAnimationFrame(this.raf);
            }
        }
    }

</script>

<style lang="scss" scoped>

    .c-background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        canvas, .flexGrid {
            position: absolute;
        }
        canvas {
            width: 100%;
            height: 100%;
        }
        .flexGrid {
            width: 100%;
            height: 100%;
            &__cell {
                border-right: 1px solid $darkGrey;
                &:last-child {
                    border: none;
                }
            } 
        }
    }

</style>


