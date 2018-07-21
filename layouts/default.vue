<!--
    layouts/default.vue
-->

<template>
    <div class="l-default">
        <organism-header />
        <div class="vs-section">
            <nuxt />
        </div>
        <organism-footer />
        <background />
    </div>
</template>

<script>

    import LifecycleHooks from "~/mixins/LifecycleHooks";

    import OrganismHeader from "~/components/Header";
    import OrganismFooter from "~/components/Footer";
    import Background from "~/components/Background";

    export default {

        name: "default",

        mixins: [ LifecycleHooks ],

        methods: {
            init() {
                this.initScroll();
            },
            initScroll() {
                this.scroll = new Scroll({
                    native: false,
                    section: this.$el.querySelector(".vs-section"),
                    ease: 0.05,
                    infiniteScroll: true
                });

                this.scroll.init();
            },
            scrolling() {
                console.log("scrolling!");
                // if (this.albumsEl.getBoundingClientRect().top > 0) {
                //     this.addAlbumOnTop()
                // } else if ((this.albumsEl.getBoundingClientRect().bottom - global.window.innerHeight) < 0) {
                //     this.addAlbumOnBottom()
                // }
            },
            addAlbumOnTop() {
                const aux = _.clone(this.albums)
                this.albums = []
                this.$nextTick(() => {
                    aux.unshift(aux[aux.length - 1])
                    aux.pop()
                    this.albums = _.clone(aux)
                    this.$nextTick(() => {
                        this.setAlbumOffset(-this.topElHeight)
                        this.$nextTick(this.setSizes)
                    })
                })
            },
            addAlbumOnBottom() {
                const aux = _.clone(this.albums)
                this.albums = []
                this.$nextTick(() => {
                    aux.push(aux[0])
                    aux.shift()
                    this.albums = _.clone(aux)
                    this.$nextTick(() => {
                        this.setAlbumOffset(this.bottomElHeight)
                        this.$nextTick(this.setSizes)
                    })
                })
            }
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

