<!--
    components/Footer.vue
-->

<template>
    <footer class="s-footer">
        <p ref="msg" class="msg" v-text="emojis[parseInt(Math.random() * (emojis.length - 1))]" />
    </footer>
</template>

<script>

    const emojis = ["👻","🤪","🙃","😈","👽","👾","😼","🤗","😏","🤙🏾","🤘🏾","🖕🏾","🖖🏾","🧠","🕶","🐶","🐒","💥","🔥","🍆","🥚","🍟","🏀","🥌","🎧","🎤","🎯","🏎","🚀","💸","🎈","🎉","🖤","💯","🔞","🔝"];

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
        data() {
            return {
                emojis
            }
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
