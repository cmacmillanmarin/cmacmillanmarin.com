<!--
    layouts/default.vue
-->

<template>
    <div class="l-default">
        <header-component ref="header" />
        <roulette ref="roulette"/>
        <div ref="scroll">
            <div class="sections">
                <nuxt />
            </div>
        </div>
        <scroll-bar ref="scrollBar" />
        <cursor-pointer ref="cursor" />
        <background ref="background"/>
    </div>
</template>

<script>

    import { mapState, mapMutations } from "vuex";

    import LifecycleHooks from "~/mixins/LifecycleHooks";

    import HeaderComponent from "~/components/Header";
    import Background from "~/components/Background";
    import Roulette from "~/components/Roulette";
    import ScrollBar from "~/components/ScrollBar";
    import CursorPointer from "~/components/Cursor";

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
                this.setScrollDomEl(this.$refs.scroll);
                this.scroll = new Scroll({
                    section: this.$refs.scroll,
                    roulette: this.$refs.roulette.$el,
                    infiniteScroll: true,
                    native: false,
                    ease: 0.05
                });
                this.scroll.init();
            },
            ...mapMutations({
                setScrollPoint: "scroll/setPoint",
                setScrollDomEl: "scroll/setDomEl"
            })
        },

        components: {

            HeaderComponent,
            Background,
            Roulette,
            ScrollBar,
            CursorPointer
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

