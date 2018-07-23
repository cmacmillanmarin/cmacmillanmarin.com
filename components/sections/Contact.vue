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
                <p>Spotify</p>
            </div>
            <div class="flexGrid__cell _4">
                <p>Email</p>
            </div>
        </div>
        <p class="call">Call me on my cell phone?</p>
    </div>
</template>

<script>

    import { mapState } from "vuex";

    export default {
        name: "Contact",
        computed: {
            ...mapState({
                mobile: state => state.breakpoints.mobile
            })
        }
    }

</script>

<style lang="scss" scoped>

    .c-contact {
        .call {
            padding-top: 65px;
        }
    }

</style>


