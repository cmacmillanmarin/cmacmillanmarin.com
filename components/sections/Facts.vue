<!--
    components/sections/Facts.vue
-->

<template>
    <div class="c-facts">
        <h2 v-text="$t(data.title)" />
        <ul>
            <li v-for="(fact, key) in data.facts" :key="key">
                <p v-text="fact.name" />
            </li>
        </ul>
        <ul>
            <li v-for="(fav, key) in data.favourites" :key="key">
                <p v-text="fav.name" />
            </li>
        </ul>
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
            { name: "I Studied Informatic enginering at UIB." }
        ],
        favourites: [
            { name: "Book: Homo Deus, Yuval Noah Harari" },
            { name: "Movie: HER" },
            { name: "TV Serie: Black Mirror" },
            { name: "Futbol team: FCBarcelona" },
            { name: "NBA team: Stephen Curry, yes." },
            { name: "Artist: JayZ & Post Malone" },
            { name: "Headphones: B&O Play H5" },
            { name: "Shoes: Nike x Stefan Janoski" },
        ]
    }

    export default {
        name: "Facts",
        props: {
            data: {
                type: Object,
                default: () => data
            }
        }
    }

</script>

<style lang="scss" scoped>


</style>


