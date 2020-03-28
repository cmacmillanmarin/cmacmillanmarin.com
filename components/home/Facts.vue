<!--
    components/sections/Facts.vue
-->

<template>
    <div class="s-facts">
        <div class="flexGrid _horizontal">
            <div class="flexGrid__cell facts_cell">
                <h2 v-text="data.title" />
                <list :items="data.facts" class="facts" />
            </div>
            <div class="flexGrid__cell _2" />
            <div class="flexGrid__cell _4" />
            <div class="flexGrid__cell _4" />
            <div ref="favs" class="flexGrid__cell favourites">
                <h2 v-text="data.favouritesTitle" />
                <list :items="data.favourites" class="favs" />
            </div>
        </div>
    </div>
</template>

<script>

    import { mapState } from "vuex";

    import List from "~/components/List";

    export default {
        name: "Facts",
        props: {
            data: Object
        },
        computed: {
            ...mapState({
                mobile: state => state.breakpoints.mobile
            })
        },
        components: {
            List
        }
    }

</script>

<style lang="scss" scoped>

    .s-facts {
        .facts_cell {
            width: 100%;
            @include respond-to("desktop") {
                width: 50%;
            }
        }
        .favourites {
            padding-top: 75px;
            width: 50%;
            @include respond-to("desktop") {
                padding-top: 25px;
                width: 25%;
                padding-left: 0%;
                transform: translateY(-75px);
            }
            .c-list {
                width: 100%;
            }
        }
    }

</style>


