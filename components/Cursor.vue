<!--
    components/Cursor.vue
-->

<template>
    <div class="c-cursor">
        <span class="dot" />
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
            onMouseMove() {
                console.log("Cursor !");
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
        .dot {
            display: block;
            background: white;
            width: 10px;
            height: 10px;
            border-radius: 50%;
        }
    }
</style>
