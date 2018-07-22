<!--
    layouts/default.vue
-->

<template>
    <div class="l-default">
        <organism-header />
        <div class="vs-section">
            <div class="sections">
                <nuxt />
            </div>
        </div>
        <organism-footer />
        <background />
    </div>
</template>

<script>

    import { mapMutations } from "vuex";

    import LifecycleHooks from "~/mixins/LifecycleHooks";

    import OrganismHeader from "~/components/Header";
    import OrganismFooter from "~/components/Footer";
    import Background from "~/components/Background";

    export default {

        name: "default",

        mixins: [ LifecycleHooks ],

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

            OrganismHeader,
            OrganismFooter,
            Background
        }
    }

</script>

<style lang="scss" scoped>

    .l-default {
        overflow-y: hidden;
        .c-background {
            z-index: -1;
        }
    }  

</style>

