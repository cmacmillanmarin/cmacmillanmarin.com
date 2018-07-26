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

    import HeaderComponent from "~/components/Header";
    import Background from "~/components/Background";
    import Roulette from "~/components/Roulette";
    import ScrollBar from "~/components/ScrollBar";
    import CursorPointer from "~/components/Cursor";

    export default {
        name: "default",
        head() {
            return {
                meta: [
                    {
                        hid: "description",
                        name: "description",
                        content: this.$t("meta:description")
                    },
                    {
                        hid: "keywords",
                        name: "keywords",
                        content: this.$t("meta:keywords")
                    },
                    {
                        hid: "og:url",
                        name: "og:url",
                        content: this.$t("meta:url")
                    },
                    {
                        hid: "og:title",
                        name: "og:title",
                        content: this.$t("meta:title")
                    },
                    {
                        hid: "og:description",
                        name: "og:description",
                        content: this.$t("meta:description")
                    },
                    {
                        hid: "og:image",
                        name: "og:image",
                        content: this.$t("meta:og:image")
                    },

                    {
                        hid: "twitter:card",
                        name: "twitter:card",
                        content: "summary_large_image"
                    },
                    {
                        hid: "twitter:site",
                        name: "twitter:site",
                        content: "@cmacmillanmarin"
                    },
                    {
                        hid: "twitter:title",
                        name: "twitter:title",
                        content: this.$t("meta:title")
                    },
                    {
                        hid: "twitter:description",
                        name: "twitter:description",
                        content: this.$t("meta:description")
                    },
                    {
                        hid: "twitter:image",
                        name: "twitter:image",
                        content: this.$t("meta:twitter:image")
                    }
                ]
            }
        },
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

