<!--
    pages/_lang/index.vue
-->

<template>
    <div class="p-index pageLayout">
        <section v-for="(section, key) in sections" :key="key">
            <p v-text="$t(`p-index:${section.id}`)" />
        </section>
    </div>
</template>

<script>

    import _ from "lodash";

    import { mapState } from "vuex";

    import LifecycleHooks from "~/mixins/LifecycleHooks";
    import Transitions from "~/mixins/Transitions";

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
                    { id: "agency" },
                    { id: "awards" },
                    { id: "press" },
                    { id: "interests" },
                    { id: "contact" }
                ],
                offset: 0
            }
        },
        watch: {
            scrollPoint() {
                this.scrolling();
            }
        },
        methods: { 
            init() {
                this.setSizes();
            },
            setListeners() {
                window.addEventListener("resize", this.resize);
            },
            scrolling() {
                console.log(this.$el.getBoundingClientRect().bottom - window.innerHeight);
                if (this.$el.getBoundingClientRect().top > 0) {
                    this.addSectionOnTop()
                } else if ((this.$el.getBoundingClientRect().bottom - window.innerHeight) < 0) {
                    this.addSectionOnBottom()
                }
            },
            addSectionOnTop() {
                const aux = _.clone(this.sections);
                this.sections = []
                this.$nextTick(() => {
                    aux.unshift(aux[aux.length - 1])
                    aux.pop()
                    this.sections = _.clone(aux)
                    this.$nextTick(() => {
                        this.setSectionOffset(-this.topElHeight)
                        this.$nextTick(this.setSizes)
                    })
                })
            },
            addSectionOnBottom() {
                const aux = _.clone(this.sections);
                this.sections = [];
                this.$nextTick(() => {
                    aux.push(aux[0])
                    aux.shift()
                    this.sections = _.clone(aux)
                    this.$nextTick(() => {
                        this.setSectionOffset(this.bottomElHeight)
                        this.$nextTick(this.setSizes)
                    })
                })
            },
            setSectionOffset(val) {
                this.offset += val
                console.log(this.offset);
                TweenMax.set(this.$el, { y: this.offset, x: 0, z: 0 })
            },
            setSizes() {
                this.topElHeight = this.$el.querySelectorAll('section')[0].getBoundingClientRect().height
                this.bottomElHeight = this.$el.querySelectorAll('section')[this.sections.length - 1].getBoundingClientRect().height
            },
            resize() {
                this.setSizes()
            },
            destroyListeners() {
                 window.removeEventListener("resize", this.resize);
            }
        }
    }

</script>

<style lang="scss" scoped>

    .p-index {
        text-align: left;
        padding: 200px 16.666666% 0px;
        color: $white;
        section {
            height: 200px;
        } 
    }

</style>
