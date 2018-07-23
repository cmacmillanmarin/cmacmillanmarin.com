<!--
    components/sections/Contact.vue
-->

<template>
    <div class="s-contact">
        <div class="flexGrid _horizontal">
            <div v-for="(platform, key) in data.social" :key="key" class="flexGrid__cell _4 social-link">
                <a :href="platform.url" target="_blank" v-text="platform.name" />
                <p v-text="$t(platform.text)" />
            </div>
        </div>
        <div class="credits social-link">
            <p @mouseenter="play" @mouseleave="pause" class="call" v-text="$t(data.callme)"/>
            <audio ref="audio" loop>
                <source :src="data.audio.mp3" type="audio/mpeg">
            </audio>
            <p class="dev" v-text="$t(data.dev)" />
        </div>
    </div>
</template>

<script>

    const data = {
        social: [
            { name: "Twitter", url: "", text: "s-contact:twitter:text" },
            { name: "Github", url: "https://github.com/cmacmillanmarin", text: "s-contact:github:text" },
            { name: "Linkedin", url: "https://www.linkedin.com/in/cmacmillanmarin/", text: "s-contact:linkedin:text" },
            { name: "Email", url: "mailto:_@cmacmillanmarin.com", text: "s-contact:email:text" }
        ],
        dev: "s-contact:dev:text",
        callme: "s-contact:callme:text",
        audio: {
            mp3: "./audio/drakeHotlineBling.mp3"
        }
    }

    import { mapState } from "vuex";

    export default {
        name: "Contact",
        computed: {
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
        methods: {
            play() {
                this.$refs.audio.currentTime = 33.0;
                this.$refs.audio.play();
            },
            pause() {
                this.$refs.audio.pause();
            }
        }
    }

</script>

<style lang="scss" scoped>

    .s-contact {
        .flexGrid {
            padding-top: 100px;
        }
        .credits {
            padding-top: 50px;
        }
        .call {
            display: inline;
            cursor: pointer;
        }
        .dev {
            padding-top: 100px;
        }
        audio {
            display: none;
        }
    }

</style>


