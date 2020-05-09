<!--
    components/sections/reel.vue
-->

<template>
    <section class="s-reel">
        <div class="flexGrid _horizontal">
            <h2 v-text="data.title" />
            <div ref="reel" class="reel">
                <div ref="close" class="close" @click="close" />
                <div class="player"><div id="player" /></div>
                <div ref="frame" class="play" @click="loadYT">
                    <div ref="play" class="triangle" />
                </div>
            </div>
        </div>
    </section>
</template>

<script>

    import { mapState, mapMutations } from "vuex";
    import { TweenMax } from "gsap";

    import List from "~/components/List";

    export default {
        name: "Reel",
        computed: {
            ...mapState({
                scroll: state => state.scroll.point,
                mobile: state => state.breakpoints.mobile,
                vs: state => state.breakpoints.vs,
            })
        },
        props: {
            data: Object
        },
        mounted() {
            this._hide = document.querySelectorAll(".s-intro, .s-work, .c-roulette, .c-scrollBar");
        },
        methods: {
            close() {
                console.log("Close!!!");
            },
            anim() {
                const {top, height, width} = this.$refs.reel.getBoundingClientRect();
                const marginX = (this.vs.w - width) * 0.5;
                const marginY = Math.ceil((this.vs.h - height) * 0.5);
                const scrollOffset = (marginY - top);
                this.scrollTo(this.scroll - scrollOffset);
                this._width = this.$el.getBoundingClientRect().width;
                this._height = this._width * 9 / 16;
                this.$refs.close.style.transform = `translate3d(${marginX}px, -${marginY}px, 0)`;
                TweenMax.to(this._hide, 1.0, {opacity: 0});
                TweenMax.to(this.$refs.play, 1.0, {opacity: 0});
                TweenMax.to(this.$refs.frame, 1.0, {width: this._width, height: this._height, borderRadius: 0, onComplete: this.createPlayer});
            },
            createPlayer() {
                if (!window.YT && !window.YT.Player) return;
                this.player = new window.YT.Player("player", {
                    width: this._width,
                    height: this._height,
                    videoId: "l6lYgs9iTvE",
                    showInfo: 0,
                    playerVars: { "autoplay": 1, "controls": 0, "rel": 0, "playsinline": 1, "showinfo": 0 },
                    events: {
                        'onStateChange': this.initVideo
                    }
                });
            },
            initVideo() {
                this.player.setVolume(0);
                console.log("Show Video!");
            },
            loadYT() {
                if (window.YT) this.anim();
                else {
                    const tag = document.createElement("script");
                    tag.src = "https://www.youtube.com/iframe_api";
                    var firstScriptTag = document.getElementsByTagName("script")[0];
                    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                    tag.onload = ()=>{
                        this.anim();
                    };
                }
            },
            ...mapMutations({
                scrollTo: "scroll/scrollTo"
            })
        },
        beforeDestroy() {
            this.player && this.player.destroy();
            this.player = null;
        },
        components: {
            List
        }
    }

</script>

<style lang="scss" scoped>

    .s-reel {
        position: relative;
        padding: 0 0 50px;
        .close {
            position: absolute;
            top: 0;
            right: 0;
            width: 50px;
            height: 50px;
            background: white;
        }
        > div {
            width: 100%;
            .player {
                position: absolute;
            }
            .reel {
                position: relative;
                width: 100%;
                padding-bottom: 56.25%;
                .play {
                    position: absolute;
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    border: 2px solid white;
                    @include centerXY();
                    transform-origin: 50% 50%;
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


