<!--
    components/sections/reel.vue
-->

<template>
    <section class="s-reel">
        <div class="flexGrid _horizontal">
            <h2 v-text="data.title" />
            <div class="reel">
                <div class="play" />
            </div>
        </div>
    </section>
</template>

<script>

    import { mapState } from "vuex";

    import List from "~/components/List";

    export default {
        name: "Reel",
        computed: {
            ...mapState({
                mobile: state => state.breakpoints.mobile
            })
        },
        props: {
            data: Object
        },
        components: {
            List
        }
    }

</script>

<style lang="scss" scoped>

    .s-reel {
        padding: 0 0 200px;
        > div {
            width: 100%;
            .reel {
                position: relative;
                width: 100%;
                padding-bottom: 56.25%;
                border: 1px solid white;
                .play {
                    position: absolute;
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    border: 1px solid white;
                    @include centerXY();
                }
            }
        }
    }

</style>


