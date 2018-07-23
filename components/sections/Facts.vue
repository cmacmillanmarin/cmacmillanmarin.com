<!--
    components/sections/Facts.vue
-->

<template>
    <div class="c-facts">
        <div class="flexGrid _horizontal">
            <div class="flexGrid__cell _2">
                <h2 v-text="$t(data.title)" />
                <list :items="data.facts" />
            </div>
            <div class="flexGrid__cell _2" />
            <div class="flexGrid__cell _4" />
            <div class="flexGrid__cell _4" />
            <div ref="learning" class="flexGrid__cell _4 learning">
                <h2 v-text="$t(data.favouritesTitle)" />
                <list :items="data.favourites" />
            </div>
        </div>
    </div>
</template>

<script>

    const data = {
        title: "s-facts:title",
        facts: [
            { name: "· Ran more than 5K km in the last 5 years." },
            { name: "· Played in a Basketball team my entire life. Retired now." },
            { name: "· Certified with Open Water Diver course." },
            { name: "· Have some tattoes. So instagram as well." },
            { name: "· Created a list on Spotify you should listen while working." },
            { name: "· Attended to some courses: Swift(iOS), Online marketing by Google, etc." },
            { name: "· Studied Software Engineering at UIB." }
        ],
        favouritesTitle: "s-favourites:title",
        favourites: [
            { name: "Book Homo Deus, Yuval Noah Harari" },
            { name: "Movie HER" },
            { name: "TV Serie Black Mirror" },
            { name: "Futbol team FCBarcelona" },
            { name: "NBA team Stephen Curry, yes." },
            { name: "Artist JayZ & Post Malone" },
            { name: "Headphones B&O Play H5" },
            { name: "Shoes Nike x Stefan Janoski" },
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


