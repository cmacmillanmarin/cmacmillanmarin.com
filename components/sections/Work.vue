<!--
    components/sections/Work.vue
-->

<template>
    <div class="c-work">
        <h2 v-text="$t(data.title)" />
        <ul>
            <li v-for="(project, key) in data.projects" :key="key">
                <a :href="project.url" v-text="project.name" target="_blank" />
                <span v-text="project.after" />
            </li>
        </ul>
        <h2 v-text="$t(data.agencyIntro)" />
        <ul>
            <li v-for="(agency, key) in data.agencies" :key="key">
                <p v-text="agency.name" />
            </li>
        </ul>
    </div>
</template>

<script>

    const data = {
        title: "s-work:title",
        projects: [
           { name: "LVMH Hublot Digital Boutique", url: "https://www.b-reel.com/work/hublot-digital-boutique", after: "" },
           { name: "Gorillaz & Jaguar App", url: "https://www.b-reel.com/work/client/gorillaz", after: "" },
           { name: "Xavier Cussó", url: "https://xaviercusso.com", after: "" },
           { name: "Chaos Fashion", url: "https://shop.chaos.club/", after: "" },
           { name: "Here Maps OLP", url: "https://www.here.com/en/vision/innovation/here-open-location-platform", after: "" },
           { name: "Stooorm", url: "https://xaviercusso.com/#/project/stoooorm", after: "" },
           { name: "Intorno", url: "https://intorno.xyz", after: "" },
           { name: "Draw a better 2016", url: "https://www.awwwards.com/sites/draw-a-better-2016", after: "" },
           { name: "🙃 Typeform", url: "", after: "? (Maybe you watching)" },
           { name: "Evagher", url: "", after: "(Coming soon)" },
           { name: "Victor Vasarely", url: "", after: "(Coming soon)" }
        ],
        agencyIntro: "s-work:agency:title",
        agencies: [
            { name: "B-Reel", url: "https//b-reel.com" },
            { name: "Vasava", url: "https://portfolio.vasava.es/" },
            { name: "Bulldog Studio", url: "http://bulldogstudio.es/" }
        ]
    }

    export default {
        name: "Work",
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


