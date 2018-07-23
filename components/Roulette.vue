<!--
    components/atoms/Roulette.vue
-->

<template>
    <div class="c-roulette">
        <span ref="dot" class="dot" />
    </div>
</template>

<script>

    import _ from "lodash";
    import { TweenMax } from "gsap";

    import LifecycleHooks from "~/mixins/LifecycleHooks";

    export default {
        name: "Roulette",
        mixins: [ LifecycleHooks ],
        methods: {
            init() {
                this.resize();
            },
            setListeners() {
                this.onResize = _.throttle(this.resize, 50);
                window.addEventListener("resize", this.onResize);
            },
            resize() {
                const borderWidth = this.$el.getBoundingClientRect().width * 0.2;
                TweenMax.to(this.$el, 0.25, { borderWidth });
                TweenMax.to(this.$refs.dot, 0.25, { x: "-50%", y: -borderWidth + 20 });
            },
            destroyListeners() {
                window.removeEventListener("resize", this.onResize);
            }
        }
    }

</script>

<style lang="scss" scoped>

    .c-roulette {
        pointer-events: none;
        width: 75vw;
        height: 75vw;
        border: 0px solid $white;
        border-radius: 50%;
        @include centerXY();
        position: fixed;
        mix-blend-mode: difference;
        transform-origin: 0% 0%;
        @include respond-to("tablet-portrait") {
            width: 33.333333vw;
            height: 33.333333vw;
        }
        .dot {
            position: absolute;
            background: black;
            width: 25px;
            height: 25px;
            border-radius: 50%;
            left: 50%;
            transform: translate(-50%, -60px);
            @include respond-to("desktop-medium") {
                width: 30px;
                height: 30px;
            }
        }
    }

</style>


