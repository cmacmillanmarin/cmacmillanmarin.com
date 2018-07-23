<!--
    components/Header.vue
-->

<template>
    <header class="c-header">
        <a class="a-mail" href="" v-text="`_@cmacmillanmarin.com`" />
    </header>
</template>

<script>

    import { mapState } from "vuex";

    export default {
        name: "Header",
        computed: {
            ...mapState({
                langs: state => state.lang.locales,
                breakpoint: state => state.breakpoints.breakpoint
            })
        }
    }

</script>

<style lang="scss" scoped>

    .c-header {
        
        position: fixed;
        z-index: 9;
        width: 100%;
        padding: 25px 16.666666%;
        color: $white;

        .a-mail {
            font-size: 12px;
            color: $white;
            position: absolute;
            left: 83.333334%;
        }
    }

</style>
