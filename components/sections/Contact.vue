<!--
    components/sections/Contact.vue
-->

<template>
    <div class="c-contact">
        <div class="flexGrid _horizontal">
            <div class="flexGrid__cell _4">
                <p>Twitter</p>
            </div>
            <div class="flexGrid__cell _4">
                <p>Github</p>
            </div>
            <div class="flexGrid__cell _4">
                <p>Linkedin</p>
            </div>
            <div class="flexGrid__cell _4">
                <p>Email</p>
            </div>
        </div>
        <p class="call">Call me on my cell phone?</p>
        <audio>
            <source :src="data.audio.ogg" type="audio/ogg">
            <source :src="data.audio.mp3" type="audio/mpeg">
        </audio>
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
        .call {
            padding-top: 65px;
        }
        audio {
            display: none;
        }
    }

</style>


