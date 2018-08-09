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

    import Head from "~/mixins/Head";

    import HeaderComponent from "~/components/Header";
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
                Scroll: state => state.scroll.obj
            })
        },
        watch: {
            ready: "initScroll"
        },
        methods: {
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

