<!--
    components/sections/Intro.vue
-->

<template>
    <div class="s-intro">
        <div class="flexGrid" ref="content">
            <div class="flexGrid__cell _2">
                <p class="emoji" v-text="$t(data.emoji)" />
                <h1 class="SEO" v-text="$t(data.seo)" />
                <p class="intro-text" v-html="$t(data.intro)" />
            </div>
            <div class="learning">
                <p class="smaller-title smaller-type" v-text="$t(data.learningTitle)" />
                <list :items="data.fields" class="small-type" />
            </div>
        </div>
    </div>
</template>

<script>

    const data = {
        emoji: "s-intro:emoji",
        seo: "s-intro:seo:h1",
        intro: "s-intro:text",
        learningTitle: "s-intro:learning:title",
        fields: [
            { name: "s-intro:learning:1" },
            { name: "s-intro:learning:2" }
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

    .s-intro {
        position: relative;
        padding-bottom: 100px;
        .learning {
            position: absolute;
            left: 75%;
            bottom: 0px;
        }
    }

</style>


