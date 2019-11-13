<!--
    components/sections/Contact.vue
-->

<template>
    <div class="s-contact">
        <div class="flexGrid _horizontal">
            <div v-for="(platform, key) in data.social" :key="key" class="flexGrid__cell social-link">
                <a :href="platform.url" target="_blank" v-text="platform.name" />
                <p v-text="$t(platform.text)" />
            </div>
        </div>
        <div class="credits social-link">
            <p @mouseenter="play" @mouseleave="pause" class="call call_desktop" v-text="$t(data.callme)" />
            <p class="call call_mobile" @click="toggle" v-text="$t(data.callme)" />
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
            { name: "Twitter", url: "https://twitter.com/cmacmillanmarin", text: "s-contact:twitter:text" },
            { name: "Github", url: "https://github.com/cmacmillanmarin", text: "s-contact:github:text" },
            { name: "LinkedIn", url: "https://www.linkedin.com/in/cmacmillanmarin/", text: "s-contact:linkedin:text" },
            { name: "Email", url: "mailto:_@cmacmillanmarin.com", text: "s-contact:email:text" }
        ],
        dev: "s-contact:dev:text",
        callme: "s-contact:callme:text",
        audio: {
            mp3: "./audio/callme.mp3"
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
        data() {
            return {
                playing: false
            }
        },
        methods: {
            play() {
                this.$refs.audio.currentTime = 33.0;
                this.$refs.audio.play();
            },
            pause() {
                this.$refs.audio.pause();
            },
            toggle() {
                if (!this.playing) {
                    this.$refs.audio.currentTime = 33.0;
                    this.$refs.audio.play();
                } else this.$refs.audio.pause();
                this.playing = !this.playing;
            }
        }
    }

</script>

<style lang="scss" scoped>

    .s-contact {
        padding-bottom: 40px;
        .flexGrid {
            @include respond-to("tablet-portrait") {
                padding-top: 100px;
            }
            .social-link {
                width: 50%;
                padding-bottom: 50px;
                @include respond-to("desktop") {
                    width: 25%;
                }
            }
        }
        .credits {
            padding-top: 50px;
        }
        .call {
            display: inline;
        }
        .call_mobile {
            @include respond-to("tablet-portrait") {
                display: none;
            }
        }
        .call_desktop {
            display: none;
            @include respond-to("tablet-portrait") {
                display: block;
            }
        }
        .dev {
            padding-top: 100px;
            width: 100%;
        }
        audio {
            display: none;
        }
    }

</style>


