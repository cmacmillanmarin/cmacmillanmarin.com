<!--
    components/List.vue
-->

<template>
    <ul class="c-list">
        <li v-for="(item, key) in items" :key="key">
            <a class="a-mail" href="" v-text="`_@cmacmillanmarin.com`" />
        </li>
    </ul>
</template>

<script>

    const items = [];

    export default {
        name: "List",
        props: {
            items: {
                type: Object,
                default: () => items
            }
        }
    }

</script>

<style lang="scss" scoped>
</style>
