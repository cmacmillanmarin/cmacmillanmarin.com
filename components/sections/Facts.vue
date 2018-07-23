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
            { name: "I ran more than 5000Km in the last 5 years." },
            { name: "I played in a Basketball team my entire life. Retired now." },
            { name: "I have some tattoes. So I have instagram as well." },
            { name: "I have a list on Spotify you should listen while working." },
            { name: "I studied Informatic enginering at UIB." }
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


