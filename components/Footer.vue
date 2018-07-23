<!--
    components/Footer.vue
-->

<template>
    <footer class="c-footer">
        <p ref="msg" class="msg">AGAIN?</p>
    </footer>
</template>

<script>

    import { mapState } from "vuex";

    import { TweenMax } from "gsap";

    import LifecycleHooks from "~/mixins/LifecycleHooks";

    export default {
        name: "Footer",
        mixins: [ LifecycleHooks ],
        computed: {
            ...mapState({
                introPosition: state => state.events.introPosition
            })
        },
        methods: {
            init() {
                this.setPosition();
            },
            setListeners() {
                this.onResize = _.throttle(this.setPosition, 10);
                window.addEventListener("resize", this.onResize);
            },
            setPosition() {
                const height = this.$refs.msg.getBoundingClientRect().height + this.introPosition.params.padding - 30;
                TweenMax.set(this.$el, { height });
            },
            destroyListeners() {
                window.removeEventListener("resize", this.onResize);
            }
        }
    }

</script>

<style lang="scss" scoped>
    footer {
        position: relative;
        box-sizing: content-box;
        p {
            line-height: normal;
            font-weight: 700;
            @include centerX();
            position: absolute;
            width: 1000%;
            bottom: 0px;
            text-align: center;
        }
    }
</style>
