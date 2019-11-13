<!--
    components/sections/Facts.vue
-->

<template>
    <div class="s-facts">
        <div class="flexGrid _horizontal">
            <div class="flexGrid__cell facts_cell">
                <h2 v-text="$t(data.title)" />
                <list :items="data.facts" class="facts" />
            </div>
            <div class="flexGrid__cell _2" />
            <div class="flexGrid__cell _4" />
            <div class="flexGrid__cell _4" />
            <div ref="favs" class="flexGrid__cell favourites">
                <h2 v-text="$t(data.favouritesTitle)" />
                <list :items="data.favourites" class="favs" />
            </div>
        </div>
    </div>
</template>

<script>

    const data = {
        title: "s-facts:title",
        facts: [
            { name: "s-facts:stuff:1" },
            { name: "s-facts:stuff:2" },
            { name: "s-facts:stuff:3" },
            { name: "s-facts:stuff:4" },
            { name: "s-facts:stuff:5" },
            { name: "s-facts:stuff:6" },
            { name: "s-facts:stuff:7" },
            { name: "s-facts:stuff:10" },
            { name: "s-facts:stuff:11" }
        ],
        favouritesTitle: "s-facts:fav:title",
        favourites: [
            { name: "s-facts:fav:1:content", fav: "s-facts:fav:1" },
            { name: "s-facts:fav:2:content", fav: "s-facts:fav:2" },
            { name: "s-facts:fav:3:content", fav: "s-facts:fav:3" },
            { name: "s-facts:fav:4:content", fav: "s-facts:fav:4" },
            { name: "s-facts:fav:5:content", fav: "s-facts:fav:5" },
            { name: "s-facts:fav:6:content", fav: "s-facts:fav:6" },
            { name: "s-facts:fav:7:content", fav: "s-facts:fav:7" },
            { name: "s-facts:fav:8:content", fav: "s-facts:fav:8" },
        ]
    }

    import { mapState } from "vuex";

    import List from "~/components/List";

    export default {
        name: "Facts",
        props: {
            data: {
                type: Object,
                default: () => data
            }
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


