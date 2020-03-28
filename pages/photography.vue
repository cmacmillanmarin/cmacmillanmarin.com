<!--
    pages/photography.vue
-->

<template>
    <div class="p-photography pageLayout">
        <p>Photography</p>
    </div>
</template>

<script>

    import LifecycleHooks from "~/mixins/LifecycleHooks";
    import Transition from "~/mixins/Transition";

    export default {
        name: "photography",
        mixins: [ LifecycleHooks, Transition ],
        methods: {
            init() {
                console.log("Photography");
            }
        }
    }

</script>

<style lang="scss" scoped>

    .p-photography {
        opacity: 0;
        will-change: opacity, transform;
    }

</style>
