<!--
    components/sections/Awards.vue
-->

<template>
    <div class="c-awards">
        <h2 v-text="$t(data.title)" />
        <list :items="data.awards" />
        <h2 v-text="$t(data.pressTitle)" />
        <list :items="data.press" />
    </div>
</template>

<script>

    const data = {
        title: "s-awards:title",
        awards: [
            { name: "1 x FWA" },
            { name: "7 x Awwwards" },
            { name: "5 x CSS Design Awards" },
            { name: "1 x Marathon Finisher" },
            { name: "8 x Half Marathon Finisher" },
            { name: "1 x B-Reel Bowling Championship" },
            { name: "1 x B-Reel Beach Volley Championship" },
        ],
        pressTitle: "s-articles:title",
        press: [
            { name: "Awwwards magazine", url: "https://www.awwwards.com/case-study-xavier-cusso-portfolio.html" }
        ]
    }

    import List from "~/components/List";

    export default {
        name: "Awards",
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


