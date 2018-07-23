<!--
    components/sections/Intro.vue
-->

<template>
    <div class="c-intro">
        <div ref="content">
            <p class="emoji">👻</p>
            <h1 class="SEO">Freelance developer</h1>
            <p>Hi, I’m Christian, a 28 y/o <a href="">islander</a> based in Barcelona. Nowadays busy working as Creative Developer at <a href="">B-Reel</a>, running <a href="">Burundanga Studio</a> and judging the best of digital industry at <a href="">FWA</a>.</p>
        </div>
    </div>
</template>

<script>

    import { TweenMax } from "gsap";

    import LifecycleHooks from "~/mixins/LifecycleHooks";

    export default {
        name: "Intro",
        mixins: [ LifecycleHooks ],
        methods: {
            init() {
                this.setPosition();
            },
            setListeners() {
                this.onResize = _.throttle(this.setPosition, 10);
                window.addEventListener("resize", this.onResize);
            },
            setPosition() {
                const paddingTop = (window.innerHeight - this.$refs.content.getBoundingClientRect().height) * 0.5;
                TweenMax.set(this.$el, { paddingTop });
            },
            destroyListeners() {
                window.removeEventListener("resize", this.onResize);
            }
        }
    }

</script>

<style lang="scss" scoped>

    .c-intro {
        width: 50%;
        padding-bottom: 100px;
    }

</style>


