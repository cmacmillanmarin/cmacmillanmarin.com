<!--
    components/home/Sprite.vue
-->

<template>
    <div class="c-home-sprite" :style="containerStyle">
        <img ref="sprite" :src="src" :style="imgStyle" alt="sprite" />
    </div>
</template>

<script>

    import { mapState } from "vuex";
    import { TweenMax } from "gsap";

    import LifecycleHooks from "~/mixins/LifecycleHooks";

    export default {
        name: "Sprite",
        mixins: [ LifecycleHooks ],
        data() {
            return {
                frame: 0,
                frames: 350,
                width: 75,
                column: 0,
                columns: 10,
                row: 0,
                rows: 35,
                src: "./img/spritesheet.png"
            }
        },
        computed: {
            imgStyle() {
                return {width: `${this.width * this.columns}px`};
            },
            containerStyle() {
                return {
                    width: `${this.width}px`,
                    height: `${this.width}px`
                };
            }
        },
        methods: {
            init() {
                this.stop = false;
                this.frameCount = 0;
                this.fps = 30;
                this.fpsInterval = 1000 / this.fps;
                this.startTime = 0;
                this.now = 0;
                this.then = Date.now();
                this.startTime = this.then;
                this.elapsed = 0;
                this._raf = window.requestAnimationFrame(this.raf);
            },
            raf() {
                this._raf = window.requestAnimationFrame(this.raf); 
                
                this.now = Date.now();
                this.elapsed = this.now - this.then;

                // if enough time has elapsed, draw the next frame

                if (this.elapsed > this.fpsInterval) {

                    // Get ready for next frame by setting then=now, but also adjust for your
                    // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
                    this.then = this.now - (this.elapsed % this.fpsInterval);

                    // Put your drawing code here
                    this.frame = (this.frame + 1) % this.frames;
                    this.column = this.frame % this.columns;
                    this.row = this.column === 0 ? (this.row + 1) % this.rows : this.row;
                    this.$refs.sprite.style.transform = `translate3d(-${this.column * this.width}px, -${this.row * this.width}px, 0)`;
                }
            },
            destroyListeners() {
                window.cancelAnimationFrame(this._raf);
                console.log("destroyListeners!");
            }
        }
    }

</script>

<style lang="scss" scoped>
    .c-home-sprite {
        position: relative;
        overflow: hidden;
        img {
            position: absolute;
            max-width: none;
            top: 0;
            left: 0;
            will-change: transform;
        }
    }
</style>
