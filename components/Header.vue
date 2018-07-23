<!--
    components/Header.vue
-->

<template>
    <header class="c-header">
        <a class="a-mail small-type header-email" href="mailto:_@cmacmillanmarin.com">
             _@cmacmillanmarin.com 🤙🏾
        </a>
    </header>
</template>

<script>

    import { mapState } from "vuex";

    import LifecycleHooks from "~/mixins/LifecycleHooks";

    export default {
        name: "Header",
        mixins: [ LifecycleHooks ],
        computed: {
            ...mapState({
                langs: state => state.lang.locales,
                breakpoint: state => state.breakpoints.breakpoint
            })
        },
        methods: {
            init() {
            }
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
            color: $white;
            position: absolute;
            left: 83.333334%;
        }
    }

</style>
