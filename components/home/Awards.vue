<!--
    components/sections/Awards.vue
-->

<template>
    <section class="s-awards">
        <div class="flexGrid _horizontal">
            <div class="flexGrid__cell press">
                <h2 v-text="data.pressTitle" />
                <list :items="data.press" />
            </div>
            <div class="flexGrid__cell awards">
                <div>
                    <h2 v-text="data.title" />
                    <list :items="data.awards" class="awards-list" />
                </div>
            </div>
        </div>
    </section>
</template>

<script>

    import { mapState } from "vuex";

    import List from "~/components/List";

    export default {
        name: "Awards",
        props: {
            data: Object
        },
        computed: {
            ...mapState({
                mobile: state => state.breakpoints.mobile
            })
        },
        components: {
            List
        }
    }

</script>

<style lang="scss" scoped>

    .s-awards {
        padding: 80px 0px 40px;
        .press {
            width: 50%;
            box-sizing: content-box;
            padding-right: 50%;
            @include respond-to("desktop") {
                width: 25%;
                padding-left: 25%;
                padding-right: 0%;
                padding-bottom: 40px;
            }
        }
        .awards {
            width: 50%;
            padding-top: 25px;
            padding-left: 50%;
            box-sizing: content-box;
            @include respond-to("desktop") {
                padding-top: 0px;
                width: 25%;
                padding-left: 25%;
                transform: translateY(100px);
            }
        }
    }

</style>


