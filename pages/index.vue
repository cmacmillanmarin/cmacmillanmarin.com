<!--
    pages/index.vue
-->

<template>
    <div class="p-index pageLayout">
        <section v-for="(section, i) in sections" :key="i">
            <component :is="section.id" :data="section" />
        </section>
    </div>
</template>

<script>

    import { mapState, mapMutations } from "vuex";

    import LifecycleHooks from "~/mixins/LifecycleHooks";
    import Transition from "~/mixins/Transition";

    import Intro from "~/components/home/Intro";
    import Work from "~/components/home/Work";
    import Awards from "~/components/home/Awards";
    import Facts from "~/components/home/Facts";
    import Contact from "~/components/home/Contact";
    import FooterComponent from "~/components/Footer";

    export default {
        name: "index",
        mixins: [ LifecycleHooks, Transition ],
        computed: {
            ...mapState({
                ready: state => state.ready,
                scrollPoint: state => state.scroll.point,
                direction: state => state.scroll.direction
            }),
        },
        data() {
            return {
                sections: this.$content.pages.home
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

                this.initialSection = this.sections[0].id;
                this.lastSection = this.sections[this.sections.length - 1].id;

                this.resize();
            },
            setListeners() {
                window.addEventListener("resize", this.resize);
            },
            scrolling() {
                if (this.$el.getBoundingClientRect().top > 0) this.addSectionOn(this.TOP);
                else if ((this.$el.getBoundingClientRect().bottom - window.innerHeight) < 0) this.addSectionOn(this.BOTTOM);
            },
            addSectionOn(side) {
                const aux = [...this.sections];
                this.sections = [];
                this.$nextTick(()=>{
                    const section = side === this.TOP ? aux[aux.length - 1] : aux[0];
                    if ((section.id === this.initialSection && this.direction === 1)
                        || (section.id === this.lastSection && this.direction === -1)) this.changeRandomColor();
                    side === this.TOP ? aux.unshift(section) : aux.push(section);
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
                 window.removeEventListener("resize", this.resize);
            },
            ...mapMutations({
                changeRandomColor: "randomColor"
            })
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
        opacity: 0;
        will-change: opacity, transform;
        text-align: left;
        padding: 0px 20px;
        color: $white;
        transform: translateY(25px);
        @include respond-to("tablet-portrait") {
            padding: 0px 12.5%;
        }
        @include respond-to("desktop") {
            padding: 0px 16.666666%;
        }
        section {
            > div {
                padding-top: 75px;
            }
        }
    }

</style>
