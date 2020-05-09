<!--
    components/List.vue
-->

<template>
    <ul class="c-list">
        <li class="c-list__item" v-for="(item, key) in items" :key="key">
            <div class="line">
                <span v-if="item.fav" class="category" v-text="item.fav" />
                <p class="separator" v-if="item.separator" v-text="item.name" />
                <a class="link" v-if="!item.separator && item.url" :href="item.url" rel="noopener" v-text="item.name" target="_blank"/>
                <span class="item" v-if="!item.separator && !item.url" v-html="item.name" />
                <template v-if="item.quantity">
                    <span class="number quantity category" v-html="item.quantity" />
                </template>
            </div>
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

<style lang="scss">
    .c-list {
        width: 80%;
        &__item {
            .line {
                position: relative;
                display: inline-block;
                // margin-bottom: 5px;
                .quantity {
                    position: absolute;
                    right: 0;
                    top: 0;
                    transform: translateX(calc(100% + 5px));
                }
            }    
        }
    }
</style>
