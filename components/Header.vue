<!--
    components/Header.vue
-->

<template>
    <header class="c-header">
        <div class="flexGrid _horizontal">
            <a class="a-mail" href="" v-text="`_@cmacmillanmarin.com`" />
            <!-- <div class="flexGrid__cell _2 _alignLeft">
            </div>
            <div class="flexGrid__cell _2 _alignRight">
                
                <nuxt-link :to="{ name: 'lang', params: { lang: 'es' } }"> es </nuxt-link>
                <nuxt-link :to="{ name: 'lang', params: { lang: 'en' } }"> en </nuxt-link>
                <nuxt-link :to="{ name: 'lang', params: { lang: 'jp' } }"> jp </nuxt-link>
            </div> -->
        </div>
    </header>
</template>

<script>

    import { mapState } from "vuex";

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
