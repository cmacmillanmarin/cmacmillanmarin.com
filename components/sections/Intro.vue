<!--
    components/sections/Intro.vue
-->

<template>
    <div class="c-intro">
        <div class="flexGrid" ref="content">
            <div class="flexGrid__cell _2">
                <p class="emoji">👻</p>
                <h1 class="SEO">Freelance developer based in Barcelona. Javascript, Nuxt, Vue, React, web, unity, webgl, iOS.</h1>
                <p>Hi, I’m Christian, a 28 y/o <a href="">islander</a> based in Barcelona. Nowadays busy working as Creative Developer at <a href="">B-Reel</a>, running <a href="">Burundanga Studio</a> and judging the best of digital industry at <a href="">FWA</a>.</p>
            </div>
            <div class="flexGrid__cell _2" />
            <div class="flexGrid__cell _4" />
            <div class="flexGrid__cell _4" />
            <div class="flexGrid__cell _4" />
            <div class="flexGrid__cell _4">
                <div ref="learning" class="flexGrid__cell _4 learning">
                    <list :items="data.fields" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    const data = {
        learningTitle: "s-work:learning:title",
        fields: [
            { name: "WebGL", url: "" },
            { name: "glsl", url: "" }
        ]
    }

    import { TweenMax } from "gsap";
    import { mapState, mapMutations } from "vuex";

    import LifecycleHooks from "~/mixins/LifecycleHooks";

    import List from "~/components/List";

    export default {
        name: "Intro",
        mixins: [ LifecycleHooks ],
        props: {
            data: {
                type: Object,
                default: () => data
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
                const paddingTop = (window.innerHeight - this.$refs.content.getBoundingClientRect().height) * 0.5;
                TweenMax.set(this.$el, { paddingTop });
                this.dispatch({ type: "introPosition", params: { padding: paddingTop }});
            },
            destroyListeners() {
                window.removeEventListener("resize", this.onResize);
            },
            ...mapMutations({
                dispatch: "events/dispatch"
            })
        },
        components: {
            List
        }
    }

</script>

<style lang="scss" scoped>

    .c-intro {

padding-bottom: 100px;
    }

</style>


