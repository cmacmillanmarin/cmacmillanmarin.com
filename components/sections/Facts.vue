<!--
    components/sections/Facts.vue
-->

<template>
    <div class="c-facts">
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
            { name: "· Ran more than 5K km in the last 5 years." },
            { name: "· Played in a Basketball team my entire life. Retired now." },
            { name: "· Certified with Open Water Diver course." },
            { name: "· Have some tattoes. So <a href=''>instagram</a> as well." },
            { name: "· Created a list on Spotify you should <a href=''>listen</a> while working." },
            { name: "· Studied Software Engineering at UIB." }
        ],
        favouritesTitle: "s-favourites:title",
        favourites: [
            { name: "Homo Deus", fav: "Book" },
            { name: "HER", fav: "Movie" },
            { name: "Black Mirror", fav: "TV Serie" },
            { name: "FCBarcelona", fav: "Futbol team" },
            { name: "Stephen Curry, yes.", fav: "NBA team" },
            { name: "JayZ & Post Malone", fav: "Artist" },
            { name: "B&O Play H5", fav: "Headphones " },
            { name: "Nike x Stefan Janoski", fav: "Shoes" },
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


