<!--
    components/sections/Intro.vue
-->

<template>
    <div class="s-intro">
        <div class="flexGrid" ref="content">
            <div class="intro flexGrid__cell">
                <p class="emoji" v-text="data.emoji" />
                <h1 class="SEO" v-text="data.seo" />
                <p class="intro-text" v-html="data.intro" />
            </div>
            <div class="learning">
                <p class="smaller-title smaller-type" v-text="data.learningTitle" />
                <list :items="data.fields" class="small-type" />
            </div>
        </div>
    </div>
</template>

<script>

    import { TweenMax } from "gsap";
    import { mapState, mapMutations } from "vuex";

    import LifecycleHooks from "~/mixins/LifecycleHooks";

    import List from "~/components/List";

    export default {
        name: "Intro",
        mixins: [ LifecycleHooks ],
        props: {
            data: Object
        },
        computed: {
            ...mapState({
                smallMobile: state => state.breakpoints.smallMobile
            })
        },
        methods: {
            init() {
                this.setPosition();
            },
            setListeners() {
                window.addEventListener("resize", this.setPosition);
            },
            setPosition() {
                const padding = (window.innerHeight - this.$refs.content.getBoundingClientRect().height) * 0.5;
                TweenMax.set(this.$el, { paddingTop: padding, paddingBottom: padding });
            },
            destroyListeners() {
                window.removeEventListener("resize", this.setPosition);
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
        .smaller-title {
            margin-bottom: 15px;
        }
        .intro {
            width: 75%;
            @include respond-to("tablet-portrait") {
                width: 50%;
            }
        }
        .learning {
            position: absolute;
            left: 50%;
            bottom: 100px;
            width: 37.5%;
            @include respond-to("tablet-portrait") {
                width: auto;
            }
            @include respond-to("desktop") {
                left: 75%;
            }
        }
    }

</style>


