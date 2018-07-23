<!--
    components/Footer.vue
-->

<template>
    <footer class="c-footer">
        <p ref="msg" class="msg">🤮</p>
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
                const paddingTop = this.introPosition.params.padding
                TweenMax.set(this.$el, { paddingTop });
            },
            destroyListeners() {
                window.removeEventListener("resize", this.onResize);
            }
        }
    }

</script>

<style lang="scss" scoped>
    footer {
        p {
            line-height: normal;
            font-size: 8em;
            text-align: center;
        }
    }
</style>
