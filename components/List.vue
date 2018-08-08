<!--
    components/List.vue
-->

<template>
    <ul class="c-list">
        <li v-for="(item, key) in items" :key="key">
            <span v-if="item.quantity">
                <span class="number" v-html="$t(item.quantity)" />
                <span class="cross" v-html="'x '" />
            </span>
            <span v-if="item.fav" class="category" v-text="$t(item.fav)" />
            <p class="separator" v-if="item.separator" v-text="$t(item.name)" />
            <a class="link" v-if="!item.separator && item.url" :href="item.url" v-text="$t(item.name)" target="_blank"/>
            <span class="item" v-if="!item.separator && !item.url" v-html="$t(item.name)" />
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

<style lang="scss" scoped />
