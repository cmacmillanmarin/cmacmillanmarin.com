<!--
    layouts/default.vue
-->

<template>
    <div class="l-default">
        <header-component ref="header" />
        <roulette ref="roulette"/>
        <div class="vs-section">
            <div class="sections">
                <nuxt />
            </div>
        </div>
        <background ref="background"/>
    </div>
</template>

<script>

    import { mapState, mapMutations } from "vuex";

    import LifecycleHooks from "~/mixins/LifecycleHooks";

    import HeaderComponent from "~/components/Header";
    import Background from "~/components/Background";
    import Roulette from "~/components/Roulette";

    export default {

        name: "default",

        mixins: [ LifecycleHooks ],

        computed: {
            ...mapState({
                Scroll: state => state.scroll.obj
            })
        },

        methods: {
            init() {
                this.domSections = this.$el.querySelector(".sections");
                this.domScrollEl = this.$el.querySelector(".vs-section");
                this.initScroll();
            },
            setListeners() {
                this.scroll.vs._emitter.on("scrolling", this.setScrollPoint);
            },
            initScroll() {
                this.scroll = new Scroll({
                    section: this.domScrollEl,
                    roulette: this.$refs.roulette.$el,
                    infiniteScroll: true,
                    native: false,
                    ease: 0.05
                });
                this.scroll.init();
            },
            ...mapMutations({
                setScrollPoint: "scroll/setPoint"
            })
        },

        components: {

            HeaderComponent,
            Background,
            Roulette
        }
    }

</script>

<style lang="scss" scoped>

    .l-default {
        overflow-y: hidden;
        .c-background {
            z-index: -1;
        }
        .c-roulette {
            z-index: 9;
        }
    }

</style>

