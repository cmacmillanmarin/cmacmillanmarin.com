<!--
    components/sections/Work.vue
-->

<template>
    <div class="s-work">
        <div class="flexGrid _horizontal">
            <div class="flexGrid__cell _75">
                <h2 v-text="$t(data.title)" />
                <list :items="data.projects" class="selected-work" />
            </div>

            <div ref="agency" class="flexGrid__cell _4 agency">
                <h2 class="_noLine" v-text="$t(data.agencyTitle)" />
                <list :items="data.agencies" />
            </div>
        </div>
    </div>
</template>

<script>

    const data = {
        title: "s-work:title",
        projects: [
           { name: "LVMH Hublot Digital Boutique", url: "https://www.b-reel.com/work/hublot-digital-boutique" },
           { name: "Gorillaz & Jaguar App", url: "https://www.b-reel.com/work/client/gorillaz" },
           { name: "Xavier Cussó", url: "https://xaviercusso.com" },
           { name: "Chaos Fashion", url: "https://shop.chaos.club/" },
           { name: "Here Maps OLP", url: "https://www.here.com/en/vision/innovation/here-open-location-platform" },
           { name: "Stooorm", url: "https://xaviercusso.com/#/project/stoooorm" },
           { name: "Intorno", url: "https://intorno.xyz" },
           { name: "Draw a better 2016", url: "https://www.awwwards.com/sites/draw-a-better-2016" },
           { name: "s-work:separator:text", separator: true },
           { name: "Typeform? 🙃 " },
           { name: "Victor Vasarely" },
           { name: "Evagher" }
        ],
        agencyTitle: "s-work:agency:title",
        agencies: [
            { name: "B-Reel", url: "https://b-reel.com" },
            { name: "Vasava", url: "https://portfolio.vasava.es/" },
            { name: "Bulldog Studio", url: "http://bulldogstudio.es/" }
        ]
    }

    import List from "~/components/List";

    export default {
        name: "Work",
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

    .s-work {
        .agency {
            padding-top: 100px;
        }
        .learning {
            padding-top: 250px;
        }
    }

</style>


