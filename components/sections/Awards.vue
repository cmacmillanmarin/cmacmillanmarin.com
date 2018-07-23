<!--
    components/sections/Awards.vue
-->

<template>
    <div class="c-awards">
        <h2 v-text="$t(data.title)" />
        <ul>
            <li v-for="(project, key) in data.awards" :key="key">
                <p v-text="project.name" />
            </li>
        </ul>
        <h2 v-text="$t(data.pressTitle)" />
        <ul>
            <li v-for="(article, key) in data.press" :key="key">
                <a :href="article.url" v-text="article.name" target="_blank" />
            </li>
        </ul>
    </div>
</template>

<script>

    const data = {
        title: "s-awards:title",
        awards: [
            { name: "1 x FWA" },
            { name: "7 x Awwwards" },
            { name: "4 x CSS Design Awards" },
            { name: "1 x Marathon Finisher" },
            { name: "6 x Half Marathon Finisher" },
            { name: "1 x B-Reel Bowling Championship" },
            { name: "1 x B-Reel Beach Volley Championship" }
        ],
        pressTitle: "Some articles.",
        press: [
            { name: "Awwwards magazine", url: "https://www.awwwards.com/case-study-xavier-cusso-portfolio.html" }
        ]
    }

    export default {
        name: "Awards",
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


