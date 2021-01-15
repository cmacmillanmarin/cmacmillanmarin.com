<!--
    components/sections/Work.vue
-->

<template>
    <section class="s-work">
        <div class="flexGrid _horizontal">
            <div ref="projects" class="flexGrid__cell projects">
                <h2 v-text="data.title" />
                <list :items="data.projects" class="selected-work" />
            </div>
            <div ref="agency" class="flexGrid__cell agency">
                <h2 v-text="data.clientTitle" />
                <list :items="data.clients" />
            </div>
        </div>
    </section>
</template>

<script>

    import { mapState } from "vuex";

    import List from "~/components/List";

    export default {
        name: "Work",
        computed: {
            ...mapState({
                mobile: state => state.breakpoints.mobile
            })
        },
        props: {
            data: Object
        },
        components: {
            List
        }
    }

</script>

<style lang="scss">

    .s-work {
        .projects {
            width: 100%;
            @include respond-to("desktop") {
                width: 75%;
            }
        }
        .agency {
            box-sizing: content-box;
            padding-top: 0px;
            padding-left: 50%;
            width: 50%;
            @include respond-to("desktop") {
                width: 25%;
                padding-top: 150px;
                padding-left: 0%;
            }
        }
    }

</style>


