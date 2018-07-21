<!--
    components/organisms/Footer.vue
-->

<template>
    <footer class="o-footer">
        <nuxt-link :to="{ name: 'lang', params: { lang: 'es' } }"> es </nuxt-link>
        <nuxt-link :to="{ name: 'lang', params: { lang: 'en' } }"> en </nuxt-link>
        <nuxt-link :to="{ name: 'lang', params: { lang: 'jp' } }"> jp </nuxt-link>
    </footer>
</template>

<script>

    export default {
        name: "Footer"
    }

</script>

<style lang="scss" scoped>

    .o-footer {
        position: fixed;
        bottom: 0;
        padding: 20px 20px 50px;
        p, a {
            font-size: 12px;
            color: $white;
        }
        a {
            cursor: pointer;
            text-transform: uppercase;
        }
    }

</style>
