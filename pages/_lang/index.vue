<!--
    pages/_lang/index.vue
-->

<template>
    <div class="p-index pageLayout">
        <section v-for="(section, key) in sections" :key="key">
            <component :is="section.id" :class="{ trans : section.transition }" />
        </section>
    </div>
</template>

<script>

    import _ from "lodash";

    import { mapState } from "vuex";

    import LifecycleHooks from "~/mixins/LifecycleHooks";
    import Transition from "~/mixins/Transition";

    import Intro from "~/components/sections/Intro";
    import Work from "~/components/sections/Work";
    import Awards from "~/components/sections/Awards";
    import Facts from "~/components/sections/Facts";
    import Contact from "~/components/sections/Contact";
    import FooterComponent from "~/components/Footer";

    export default {
        name: "index",
        mixins: [ LifecycleHooks, Transition ],
        computed: {
            ...mapState({
                scrollPoint: state => state.scroll.point
            })
        },
        data() {
            return {
                sections: [
                    { id: "intro", transition: true },
                    { id: "work", transition: true },
                    { id: "awards", transition: true },
                    { id: "facts", transition: true },
                    { id: "contact", transition: true }
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
                    const section = side === this.TOP ? aux[aux.length - 1] : aux[0];
                    section.transition = false;
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
        opacity: 0;
        will-change: opacity, transform;
        text-align: left;
        margin: 0px 20px;
        color: $white;
        transform: translateY(25px);
        border: 1px solid $darkGrey;
        @include respond-to("tablet-portrait") {
            padding: 0px 12.5%;
            margin: 0px;
            border: none;
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
