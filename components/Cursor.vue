<!--
    components/Cursor.vue
-->

<template>
    <div class="c-cursor">
        <span ref="dot" class="dot" />
    </div>
</template>

<script>

    import { mapState } from "vuex";

    import { TweenMax } from "gsap";

    import LifecycleHooks from "~/mixins/LifecycleHooks";

    export default {
        name: "cursorComponent",
        mixins: [ LifecycleHooks ],
        computed: {
            ...mapState({
                scrollPoint: state => state.scroll.point
            })
        },
        methods: {
            init() {
                console.log("Cursor init!");
            },
            setListeners() {
                window.addEventListener("mousemove", this.onMouseMove);
            },
            onMouseMove(e) {
                TweenMax.set(this.$refs.dot, { x: e.x, y: e.y })
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
        top: 0;
        left: 0;
        transform: translate(-50%,-50%);
        .dot {
            display: block;
            background: white;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            will-change: transform;
        }
    }
</style>
