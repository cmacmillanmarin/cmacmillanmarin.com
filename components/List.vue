<!--
    components/List.vue
-->

<template>
    <ul class="c-list">
        <li v-for="(item, key) in items" :key="key">
            <a v-if="item.url" :href="item.url" v-text="item.name" />
            <p v-else v-text="item.name" />
        </li>
    </ul>
</template>

<script>

    const items = [];

    export default {
        name: "List",
        props: {
            items: {
                type: Array,
                default: () => items
            }
        }
    }

</script>

<style lang="scss" scoped>
</style>
