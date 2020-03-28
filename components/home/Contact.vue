<!--
    components/sections/Contact.vue
-->

<template>
    <section class="s-contact">
        <div class="flexGrid _horizontal">
            <div v-for="(platform, key) in data.social" :key="key" class="flexGrid__cell social-link">
                <a :href="platform.url" target="_blank" v-text="platform.name" />
                <p v-text="platform.text" />
            </div>
        </div>
        <div class="credits social-link">
            <p @mouseenter="play" @mouseleave="pause" class="call call_desktop" v-text="data.callme" />
            <p class="call call_mobile" @click="toggle" v-text="data.callme" />
            <audio ref="audio" loop>
                <source :src="data.audio.mp3" type="audio/mpeg">
            </audio>
            <p class="dev" v-text="data.dev" />
        </div>
    </section>
</template>

<script>

    import { mapState } from "vuex";

    export default {
        name: "Contact",
        computed: {
            ...mapState({
                mobile: state => state.breakpoints.mobile
            })
        },
        props: {
            data: Object
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
        padding-top: 80px;
        padding-bottom: 40px;
        @include respond-to("desktop") {
            padding-top: 20px;
        }
        .flexGrid {
            @include respond-to("tablet-portrait") {
                padding-top: 0px;
            }
            .social-link {
                width: 50%;
                padding-bottom: 50px;
                @include respond-to("desktop") {
                    width: 25%;
                }
                a {
                    line-height: 1.45;
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


