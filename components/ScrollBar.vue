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
                ready: state => state.ready,
                scrollPoint: state => state.scroll.point,
                scrollDomEl: state => state.scroll.el,
                scrollDirection: state => state.scroll.direction,
                color: state => state.color
            })
        },
        watch: {
            ready: "setBar",
            scrollPoint: "scrolling",
            color: "changeColor"
        },
        methods: {
            setListeners() {
                this.onResize = _.throttle(this.setBar, 10);
                window.addEventListener("resize", this.onResize);
            },
            scrolling() {
                const mod = this.scrollPoint % this.sH > 0 ? this.scrollPoint % this.sH : this.sH + (this.scrollPoint % this.sH);
                const y = this.wH * (mod / this.sH);
                let auxY = mod + this.wH > this.sH ? (((mod + this.wH) - this.sH) / this.wH) * this.height - this.height : -this.height;
                auxY = mod + this.wH < this.wH ? mod : auxY;
                TweenMax.set(this.$refs.bar, { y })
                TweenMax.set(this.$refs.auxBar, { y: auxY })
            },
            setBar() {
                console.log("setBar!");
                this.wH = window.innerHeight;
                this.sH = this.scrollDomEl.getBoundingClientRect().height;
                this.height = parseInt(this.wH * (this.wH / this.sH));
                this.changeColor();
            },
            changeColor() {
                const backgroundColor = this.color;
                TweenMax.to(this.$refs.bar, 0.5, { height: this.height, backgroundColor  });
                TweenMax.to(this.$refs.auxBar, 0.5, { height: this.height, y: -this.height, backgroundColor });
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
        height: 100%;
        top: 0px;
        right: 20px;
        @include respond-to("tablet-portrait") {
            right: 12.5%;
        }
        @include respond-to("desktop") {
            right: 16.666666%;
        }
        .bar, .auxBar {
            position: absolute;
            top: 0;
            will-change: transform;
            display: block;
            width: 1px;
        }
    }
</style>
