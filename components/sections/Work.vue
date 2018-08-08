<!--
    components/sections/Work.vue
-->

<template>
    <div class="s-work">
        <div class="flexGrid _horizontal">
            <div ref="projects" class="flexGrid__cell projects">
                <h2 v-text="$t(data.title)" />
                <list :items="data.projects" class="selected-work" />
            </div>
            <div ref="agency" class="flexGrid__cell agency">
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
           { name: "s-work:project:hublot", url: "https://www.b-reel.com/work/hublot-digital-boutique" },
           { name: "s-work:project:gorillaz", url: "https://www.b-reel.com/work/client/gorillaz" },
           { name: "s-work:project:xaviercusso", url: "https://xaviercusso.com" },
           { name: "s-work:project:chaos", url: "https://shop.chaos.club/" },
           { name: "s-work:project:heremaps", url: "https://www.here.com/en/vision/innovation/here-open-location-platform" },
           { name: "s-work:project:stoooorm", url: "https://xaviercusso.com/#/project/stoooorm" },
           { name: "s-work:project:h2o", url: "http://www.h2o.es/#/en/" },
           { name: "s-work:project:intorno", url: "https://intorno.xyz" },
           { name: "s-work:project:draw", url: "https://www.awwwards.com/sites/draw-a-better-2016" },
           { name: "s-work:separator:text", separator: true },
           { name: "s-work:project:typeform" },
           { name: "s-work:project:vasarely" },
           { name: "s-work:project:evagher" }
        ],
        agencyTitle: "s-work:agency:title",
        agencies: [
            { name: "s-work:agency:breel", url: "https://b-reel.com" },
            { name: "s-work:agency:vasava", url: "https://portfolio.vasava.es/" },
            { name: "s-work:agency:bulldog", url: "http://bulldogstudio.es/" }
        ]
    }

    import { mapState } from "vuex";

    import List from "~/components/List";

    export default {
        name: "Work",
        computed: {
            ...mapState({
                mobile: state => state.breakpoints.mobile
            })
        },
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
        .projects {
            width: 100%;
            @include respond-to("desktop") {
                width: 75%;
            }
        }
        .agency {
            box-sizing: content-box;
            padding-top: 0px;
            padding-left: 50%;
            width: 50%;
            @include respond-to("desktop") {
                width: 25%;
                padding-top: 100px;
                padding-left: 0%;
            }
        }
    }

</style>


