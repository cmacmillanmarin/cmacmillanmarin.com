<!--
    components/sections/Awards.vue
-->

<template>
    <div class="c-awards">
        <div class="flexGrid _horizontal">
            <div class="flexGrid__cell _4" />
            <div class="flexGrid__cell _4">
                <h2 v-text="$t(data.title)" />
                <list :items="data.awards" />
            </div>
            <div class="flexGrid__cell _2" />
            <div class="flexGrid__cell _4" />
            <div class="flexGrid__cell _4" />
            <div class="flexGrid__cell _4" />
            <div ref="learning" class="flexGrid__cell _4 learning">
                <h2 v-text="$t(data.pressTitle)" />
                <list :items="data.press" />
            </div>
        </div>
    </div>
</template>

<script>

    const data = {
        title: "s-awards:title",
        awards: [
            { name: "1xFWA" },
            { name: "7xAwwwards" },
            { name: "5xCSS Design Awards" },
            { name: "1xMarathon Finisher" },
            { name: "8xHalf Marathon Finisher" },
            { name: "1xB-Reel Bowling Championship" },
            { name: "1xB-Reel Volley Championship" },
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


