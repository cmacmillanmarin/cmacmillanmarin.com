<!--
    components/ScrollBar.vue
-->

<template>
    <div class="c-scrollBar">
        <span ref="bar" class="bar" />
        <span ref="auxBar" class="auxBar" />
    </div>
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
                scrollDomEl: state => state.scroll.el,
                scrollDirection: state => state.scroll.direction
            })
        },
        data() {
            return {
                y: 0
            }
        },
        watch: {
            scrollPoint: "scrolling"
        },
        methods: {
            init() {
                _.delay(this.setBar, 1000);
            },
            setListeners() {
                this.onResize = _.throttle(this.setBar, 10);
                window.addEventListener("resize", this.onResize);
            },
            scrolling() {
                // console.log(this.scrollDirection);
                const mod = this.scrollPoint % this.sH > 0 ? this.scrollPoint % this.sH : this.sH + (this.scrollPoint % this.sH);
                const y = this.wH * (mod / this.sH);
                console.log(mod);
                if (y === 0) TweenMax.set(this.$refs.bar, { y: 0 })
                TweenMax.set(this.$refs.bar, { y })
            },
            setBar() {
                this.wH = window.innerHeight;
                this.sH = this.scrollDomEl.getBoundingClientRect().height;
                this.height = parseInt(this.wH * (this.wH / this.sH));
                TweenMax.to(this.$refs.bar, 0.1, { height: this.height });
                TweenMax.to(this.$refs.auxBar, 0.1, { height: this.height, y: -this.height });
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
        right: 16.666666%;
        height: 100%;
        .bar, .auxBar {
            position: absolute;
            top: 0;
            will-change: transform;
            display: block;
            width: 1px;
            background: lime;
        }
    }
</style>
