<!--
    components/organisms/Header.vue
-->

<template>
    <header class="o-header">
        <div class="flexGrid _horizontal">
            <div class="flexGrid__cell _2 _alignLeft">
                <nuxt-link :to="{ name: `lang`, params: { lang }}">
                    <atom-logo />
                </nuxt-link>
            </div>
            <div class="flexGrid__cell _2 _alignRight">
            </div>
        </div>
    </header>
</template>

<script>

    import { mapState } from "vuex";

    import AtomLogo from "~/components/Logo";

    export default {
        name: "Header",
        computed: {
            ...mapState({
                lang: state => state.lang.locale,
                breakpoint: state => state.breakpoints.breakpoint,
                platform: state => state.checks.platform,
                webGLSupported: state => state.checks.webGLSupported
            })
        },
        watch: {
            breakpoint() {
                console.log(`Breakpoint header listener! New breakpoint :: ${this.breakpoint}`);
            }
        },
        components: {
            AtomLogo
        }
    }

</script>

<style lang="scss" scoped>

    .o-header {
        
        position: fixed;
        z-index: 9;
        width: 100%;
        padding: 20px;

        .a-logo {
            width: 45px;
        }

        p {
            font-size: 10px;
        }
    }

</style>
