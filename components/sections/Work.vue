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
                <h2 class="_noLine" v-text="$t(data.clientTitle)" />
                <list :items="data.clients" />
            </div>
        </div>
    </div>
</template>

<script>

    const data = {
        title: "s-work:title",
        projects: [
           { name: "s-work:project:ourplanet", url: "https://www.ourplanet.com/en/explorable-globe/landing" },
           { name: "s-work:project:xaviercusso", url: "https://xaviercusso.com" },
           { name: "s-work:project:hublot", url: "https://www.b-reel.com/work/hublot-digital-boutique" },
           { name: "s-work:project:loropiana", url: "https://uk.loropiana.com/en" },
           { name: "s-work:project:gorillaz", url: "https://www.b-reel.com/work/client/gorillaz" },
           { name: "s-work:project:chaos", url: "https://shop.chaos.club/" },
           { name: "s-work:project:h2o", url: "http://www.h2o.es/#/en/" },
           { name: "s-work:project:intorno", url: "http://intorno.xyz" },
           { name: "s-work:separator:text", separator: true },
           { name: "s-work:project:evagher" },
           { name: "s-work:project:vasarely" }
        ],
        clientTitle: "s-work:clients:title",
        clients: [
            { name: "WWF", url: "https://www.worldwildlife.org/" },
            { name: "Google", url: "https://google.com" },
            { name: "Netflix", url: "https://netflix.com" },
            { name: "Hublot", url: "https://hublot.com" },
            { name: "Mango", url: "https://mango.com" },
            { name: "Audi", url: "https://www.audi.com/en.html" }
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
                padding-top: 150px;
                padding-left: 0%;
            }
        }
    }

</style>


