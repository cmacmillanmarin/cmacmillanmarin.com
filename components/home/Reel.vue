<!--
    components/sections/reel.vue
-->

<template>
    <section class="s-reel">
        <div class="flexGrid _horizontal">
            <h2 v-text="data.title" />
            <div class="reel">
                <div class="play">
                    <div class="triangle" />
                </div>
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
                // background: rgba(255,255,255, 0.95);
                .play {
                    position: absolute;
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    border: 2px solid white;
                    @include centerXY();
                    .triangle {
                        position: absolute;
                        @include centerXY();
                        transform: translate(-33%, -50%);
                        width: 0; 
                        height: 0; 
                        border-left: 40px solid white;
                        border-top: 20px solid transparent;
                        border-bottom: 20px solid transparent; 
                    }
                }

            }
        }
    }

</style>


