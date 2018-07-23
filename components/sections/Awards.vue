<!--
    components/sections/Awards.vue
-->

<template>
    <div class="s-awards">
        <div class="flexGrid _horizontal">
            <div class="flexGrid__cell _4" />
            <div class="flexGrid__cell _4">
                <h2 v-text="$t(data.pressTitle)" />
                <list :items="data.press" />
            </div>
            <div class="flexGrid__cell _4" />
            <div class="flexGrid__cell _4 awards">
                <div class="parallas" data-parallax="200">
                    <h2 v-text="$t(data.title)" />
                    <list :items="data.awards" class="awards-list" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    const data = {
        title: "s-awards:title",
        awards: [
            { name: "s-awards:fwa", quantity: "1" },
            { name: "s-awards:awwwards", quantity: "7" },
            { name: "s-awards:css", quantity: "5" },
            { name: "s-awards:marathon", quantity: "1" },
            { name: "s-awards:half", quantity: "8" }
        ],
        pressTitle: "s-articles:title",
        press: [
            { name: "s-articles:awwwards", url: "https://www.awwwards.com/case-study-xavier-cusso-portfolio.html" },
            { name: "s-articles:comarts", url: "https://www.commarts.com/webpicks/xavier-cuss" }
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

    .s-awards {
        .awards {
            transform: translateY(-150px);
        }
    }

</style>


