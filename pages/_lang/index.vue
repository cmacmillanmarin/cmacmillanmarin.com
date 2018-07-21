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

    import { mapState } from "vuex";

    import LifecycleHooks from "~/mixins/LifecycleHooks";
    import Transitions from "~/mixins/Transitions";

    export default {
        name: "index",
        mixins: [ LifecycleHooks, Transitions ],
        head () {
            return {
                title: `Christian MacMillan | Creative Developer`
            }
        },
        computed: {
            ...mapState({
                lang: state => state.lang.locale
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
                ]
            }
        },
        methods: {
            setInitValue() {

                console.log("Home: setInitValue()");
            },
            init() {

                console.log("Home: init()");
            },
            destroyListeners() {

                console.log("Home: destroyListeners()");
            }
        }
    }

</script>

<style lang="scss" scoped>

    .p-index {
        text-align: left;
        padding: 200px 16.666666%;
        color: $white;
        section {
            height: 200px;
        } 
    }

</style>
