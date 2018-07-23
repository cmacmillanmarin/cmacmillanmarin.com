<!--
    components/sections/Facts.vue
-->

<template>
    <div class="s-facts">
        <div class="flexGrid _horizontal">
            <div class="flexGrid__cell _2">
                <h2 v-text="$t(data.title)" />
                <list :items="data.facts" class="facts" />
            </div>
            <div class="flexGrid__cell _2" />
            <div class="flexGrid__cell _4" />
            <div class="flexGrid__cell _4" />
            <div ref="learning" class="flexGrid__cell _4 learning">
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
            { name: "s-facts:stuff:6" }
        ],
        favouritesTitle: "s-facts:fav:title",
        favourites: [
            { name: "Homo Deus", fav: "s-facts:fav:1" },
            { name: "HER", fav: "s-facts:fav:2" },
            { name: "Black Mirror", fav: "s-facts:fav:3" },
            { name: "FCBarcelona", fav: "s-facts:fav:4" },
            { name: "Stephen Curry, yes.", fav: "s-facts:fav:5" },
            { name: "JayZ & Post Malone", fav: "s-facts:fav:6" },
            { name: "B&O Play H5", fav: "s-facts:fav:7" },
            { name: "Nike x Stefan Janoski", fav: "s-facts:fav:8" },
        ]
    }

    import List from "~/components/List";

    export default {
        name: "Facts",
        props: {
            data: {
                type: Object,
                default: () => data
            }
        },
        components: {
            List
        }
    }

</script>

<style lang="scss" scoped>


</style>


