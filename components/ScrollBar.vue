<!--
    components/ScrollBar.vue
-->

<template>
    <div class="c-scrollBar" />
</template>

<script>

    import { mapState } from "vuex";

    import { TweenMax } from "gsap";

    import LifecycleHooks from "~/mixins/LifecycleHooks";

    export default {
        name: "ScrollBar",
        mixins: [ LifecycleHooks ],
        computed: {
            ...mapState({
                scrollPoint: state => state.scroll.point
            })
        },
        methods: {
            init() {
                this.setBar();
            },
            setListeners() {
                this.onResize = _.throttle(this.setBar, 10);
                window.addEventListener("resize", this.onResize);
            },
            setBar() {
                console.log("scroll bar!");
            },
            destroyListeners() {
                window.removeEventListener("resize", this.onResize);
            }
        }
    }

</script>

<style lang="scss" scoped>
    .c-scrollBar {
        color: red;
    }
</style>
