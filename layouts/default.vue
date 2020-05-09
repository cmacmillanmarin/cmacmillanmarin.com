<!--
    layouts/default.vue
-->

<template>
    <div class="l-default">
        <!-- <header-component ref="header" /> -->
        <roulette ref="roulette"/>
        <div class="scroll" ref="scroll">
            <nuxt />
        </div>
        <scroll-bar ref="scrollBar" />
        <cursor-pointer ref="cursor" />
        <background ref="background"/>
    </div>
</template>

<script>

    import { mapState, mapMutations } from "vuex";

    import Head from "~/mixins/Head";

    // import HeaderComponent from "~/components/Header";
    import Background from "~/components/Background";
    import Roulette from "~/components/Roulette";
    import ScrollBar from "~/components/ScrollBar";
    import CursorPointer from "~/components/Cursor";

    export default {
        name: "default",
        mixins: [ Head ],
        computed: {
            ...mapState({
                ready: state => state.ready,
                to: state => state.scroll.to
            })
        },
        watch: {
            ready: "initScroll",
            to() {
                this.scroll.scrollTo(this.to);
            }
        },
        methods: {
            initScroll() {
                this.setScrollDomEl(this.$refs.scroll);
                this.scroll = new Scroll({
                    section: this.$refs.scroll,
                    roulette: this.$refs.roulette.$el,
                    infiniteScroll: true,
                    native: false,
                    noscrollbar: true,
                    ease: 0.05
                });
                this.scroll.init();
                this.scroll.vs._emitter.on("scrolling", this.setScrollPoint);
                this.scroll.vs._emitter.on("direction", this.setDirection);
            },
            ...mapMutations({
                setScrollPoint: "scroll/setPoint",
                setScrollDomEl: "scroll/setDomEl",
                setDirection: "scroll/setDirection"
            })
        },
        components: {
            Background,
            Roulette,
            ScrollBar,
            CursorPointer
        }
    }

</script>

<style lang="scss">

    .l-default {
        overflow-y: hidden;
        .c-background {
            z-index: -1;
        }
        .c-roulette {
            z-index: 9;
        }
        .scroll {
            will-change: transform;
        }
    }

</style>

