<!--
    pages/_lang/index.vue
-->

<template>
    <div class="p-index pageLayout">
        <section v-for="(section, key) in sections" :key="key">
            <component :is="section.id" />
        </section>
    </div>
</template>

<script>

    import _ from "lodash";

    import { mapState } from "vuex";

    import LifecycleHooks from "~/mixins/LifecycleHooks";
    import Transitions from "~/mixins/Transitions";

    import Intro from "~/components/sections/Intro";
    import Work from "~/components/sections/Work";
    import Awards from "~/components/sections/Awards";
    import Facts from "~/components/sections/Facts";
    import Contact from "~/components/sections/Contact";
    import FooterComponent from "~/components/Footer";

    export default {
        name: "index",
        mixins: [ LifecycleHooks, Transitions ],
        computed: {
            ...mapState({
                scrollPoint: state => state.scroll.point
            })
        },
        data() {
            return {
                sections: [
                    { id: "intro" },
                    { id: "work" },
                    { id: "awards" },
                    { id: "facts" },
                    { id: "contact" },
                    { id: "footerComponent" }
                ]
            }
        },
        watch: {
            scrollPoint() {
                this.scrolling();
            }
        },
        methods: {
            init() {
                this.offset = 0;

                this.TOP = "top";
                this.BOTTOM = "bottom";

                this.resize();
            },
            setListeners() {
                this.onResize = _.throttle(this.resize, 50);
                window.addEventListener("resize", this.onResize);
            },
            scrolling() {
                if (this.$el.getBoundingClientRect().top > 0) this.addSectionOn(this.TOP);
                else if ((this.$el.getBoundingClientRect().bottom - window.innerHeight) < 0) this.addSectionOn(this.BOTTOM);
            },
            addSectionOn(side) {
                const aux = [...this.sections];
                this.sections = [];
                this.$nextTick(()=>{
                    side === this.TOP ? aux.unshift(aux[aux.length - 1]) : aux.push(aux[0]);
                    side === this.TOP ? aux.pop() : aux.shift();
                    this.sections = [...aux];
                    this.setSectionOffset(side === this.TOP ? -this.bottomElHeight : this.topElHeight);
                    this.$nextTick(this.resize);
                });
            },
            setSectionOffset(val) {
                this.offset += val;
                TweenMax.set(this.$el, { y: this.offset, x: 0, z: 0 });
            },
            resize() {
                this.topElHeight = this.$el.querySelectorAll("section")[0].getBoundingClientRect().height;
                this.bottomElHeight = this.$el.querySelectorAll("section")[this.sections.length - 1].getBoundingClientRect().height;
            },
            destroyListeners() {
                 window.removeEventListener("resize", this.onResize);
            }
        },
        components: {
            Intro,
            Work,
            Awards,
            Facts,
            Contact,
            FooterComponent
        }
    }

</script>

<style lang="scss" scoped>

    .p-index {
        text-align: left;
        padding: 0px 20px;
        color: $white;
        @include respond-to("tablet-portrait") {
            padding: 0px 16.666666%;
        }
        section {
            > div {
                padding-top: 75px;
            }
        }
    }

</style>
