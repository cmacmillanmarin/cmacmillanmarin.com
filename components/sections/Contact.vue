<!--
    components/sections/Contact.vue
-->

<template>
    <div class="c-contact">
        <div class="flexGrid _horizontal">
            <div class="flexGrid__cell _4 social-link">
                <a href="https://twitter.com/cmacmillanmarin" target="_blank">Twitter</a>
                <p>Some thoughts and emojis about tech.</p>
            </div>
            <div class="flexGrid__cell _4 social-link">
                <a href="https://github.com/cmacmillanmarin" target="_blank">Github</a>
                <p>The code for this website and more.</p>
            </div>
            <div class="flexGrid__cell _4 social-link">
                <a href="https://www.linkedin.com/in/cmacmillanmarin/" target="_blank">LinkedIn</a>
                <p>Some extra laboral and academic information.</p>
            </div>
            <div class="flexGrid__cell _4 social-link">
                <a href="mailto:_@cmacmillanmarin.com" target="_blank">Email</a>
                <p>For job inquiries or saying hi.</p>
            </div>
        </div>
        <div class="credits social-link">
            <p class="call">Call me on my cell phone?</p>
            <p class="dev">Designed and Developed by me. With no love. At home.</p>
        </div>

        <!-- <audio>
            <source :src="data.audio.ogg" type="audio/ogg">
            <source :src="data.audio.mp3" type="audio/mpeg">
        </audio> -->
    </div>
</template>

<script>

    const data = {
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
        }
    }

</script>

<style lang="scss" scoped>

    .c-contact {
        .flexGrid {
            padding-top: 100px;
        }
        .credits {
            padding-top: 50px;
        }
        .call {
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


