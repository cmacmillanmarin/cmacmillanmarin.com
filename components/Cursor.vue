<!--
    components/Cursor.vue
-->

<template>
    <div class="c-cursor">
        <span ref="dot" class="dot" />
        <div class="diagram-wrapper" />
    </div>
</template>

<script>

    import { mapState } from "vuex";

    import { TweenMax } from "gsap";
    
    // if (process.browser) {
    //     const Diagram = require("~/modules/Diagram");
    // }

    import LifecycleHooks from "~/mixins/LifecycleHooks";

    export default {
        name: "cursorComponent",
        mixins: [ LifecycleHooks ],
        computed: {
            ...mapState({
                scrollPoint: state => state.scroll.point,
                desktop: state => state.checks.desktop
            })
        },
        methods: {
            init() {
                // Diagram.init();
                if (!this.desktop) TweenMax.set(this.$el, { autoAlpha: 0 });
            },
            setListeners() {
                if (!this.desktop) return;
                window.addEventListener("mousemove", this.onMouseMove);
            },
            onMouseMove(e) {
                TweenMax.set(this.$refs.dot, { x: e.x, y: e.y, opacity: 1 })
            },
            destroyListeners() {
                window.removeEventListener("mousemove", this.onMouseMove);
            }
        }
    }

</script>

<style lang="scss" scoped>
    .c-cursor {
        position: absolute;
        mix-blend-mode: difference;
        top: 0;
        left: 0;
        transform: translate(-50%,-50%);
        pointer-events: none;
        .dot {
            display: block;
            background: white;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            opacity: 0;
            will-change: transform, opacity;
        }
        .diagram-wrapper {
            position: absolute;
            @include centerXY();
        }
    }
</style>
