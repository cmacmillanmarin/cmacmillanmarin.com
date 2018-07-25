<!--
    components/Header.vue
-->

<template>
    <header class="s-header">
        <a class="a-mail small-type header-email" href="mailto:_@cmacmillanmarin.com">
             _@cmacmillanmarin.com 🤙🏾
        </a>
    </header>
</template>

<script>

    import { mapState } from "vuex";

    export default {
        name: "Header",
        computed: {
            ...mapState({
                langs: state => state.lang.locales,
            })
        }
    }

</script>

<style lang="scss" scoped>

    .s-header {

        position: fixed;
        z-index: 9;
        width: 100%;
        padding: 25px 16.666666%;
        color: $white;
        opacity: 0;
        will-change: opacity;

        .a-mail {
            color: $white;
            position: absolute;
            right: calc(20px + 1px);
            @include respond-to("tablet-portrait") {
                right: calc(12.5% + 1px);
            }
            @include respond-to("desktop") {
                left: calc(83.333334% + 1px);
                right: auto;
            }
        }
    }

</style>
