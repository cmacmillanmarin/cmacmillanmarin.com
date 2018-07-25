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
                scrollPoint: state => state.scroll.point,
                scrollDomEl: state => state.scroll.el
            })
        },
        methods: {
            init() {
                _.delay(this.setBar, 1000); 
            },
            setListeners() {
                this.onResize = _.throttle(this.setBar, 10);
                window.addEventListener("resize", this.onResize);
            },
            setBar() {
                const wH = window.innerHeight;
                const sH = this.scrollDomEl.getBoundingClientRect().height
                console.log(wH, sH);
            },
            destroyListeners() {
                window.removeEventListener("resize", this.onResize);
            }
        }
    }

</script>

<style lang="scss" scoped>
    .c-scrollBar {
        position: absolute;
        top: 0px;
        right: 0px;
        width: 2px;
        background: white;
        height: 20px;
    }
</style>
