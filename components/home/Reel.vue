<!--
    components/sections/reel.vue
-->

<template>
    <section class="s-reel">
        <div class="flexGrid _horizontal">
            <h2 v-text="data.title" />
            <div ref="reel" class="reel">
                <div ref="close" class="close" @click="close" />
                <div ref="player" class="player" :class="{desktop}"><div id="player" /></div>
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
                desktop: state => state.checks.desktop,
                breakpoint: state => state.breakpoints.breakpoint
            })
        },
        props: {
            data: Object
        },
        watch: {
            vs: {
                handler: async function() {
                    this._width = this.$el.getBoundingClientRect().width;
                    this._height = this._width * 9 / 16;
                    this.player && this.player.setSize(this._width, this._height);
                    if (this._playing) {
                        this.$refs.frame.style.width = `${this._width}px`;
                        this.$refs.frame.style.height = `${this._height}px`;
                        await this.$nextTick();
                        const {top, width, height} = this.$refs.reel.getBoundingClientRect();
                        const marginX = (this.vs.w - width) * 0.5;
                        const marginY = Math.ceil((this.vs.h - height) * 0.5);
                        const scrollOffset = (marginY - top);
                        this.scrollTo(this.scroll - scrollOffset);
                        this.$refs.close.style.transform = `translate3d(${marginX}px, -${marginY}px, 0)`;
                    }
                },
                deep: true
            }
        },
        mounted() {
            this._work = document.querySelector(".s-work");
            this._hide = document.querySelectorAll(".s-intro, .s-work, .c-roulette, .c-scrollBar");
        },
        methods: {
            close() {
                const opacity = 0;
                const time = 0.5;
                const ease = Power1.easeOut;
                this._playing = false;
                TweenMax.to(this.$refs.frame, time, {opacity, ease});
                TweenMax.to(this.$refs.player, time, {opacity, ease});
                TweenMax.to(this.$refs.close, time, {opacity, ease, onComplete: this.reset});
            },
            reset() {
                const time = 1.25;
                const delay = 0.5;
                const opacity = 1;
                const ease = Power1.easeIn;
                const pointerEvents = "auto";
                this.player.stopVideo();
                this.setScrollEnabled(true);
                this.$refs.frame.style.width = `${this.breakpoint === "desktop" ? 100 : 75}px`;
                this.$refs.frame.style.height = `${this.breakpoint === "desktop" ? 100 : 75}px`;
                this.$refs.frame.style.borderRadius = "50%";
                this._work.style.pointerEvents = pointerEvents;
                this.$refs.frame.style.pointerEvents = pointerEvents;
                this.$refs.player.style.pointerEvents = "none";
                this.$refs.play.style.opacity = 1;
                TweenMax.to(this.$refs.frame, time, {opacity, delay});
                TweenMax.to(this._hide, time, {opacity, delay});
            },
            anim() {
                const time = 1.0;
                const delay = 0.25;
                const opacity = 0;
                const ease = Power1.easeOut;
                const pointerEvents = "none";
                this.setScrollEnabled(false);
                const {top, height, width} = this.$refs.reel.getBoundingClientRect();
                const marginX = (this.vs.w - width) * 0.5;
                const marginY = Math.ceil((this.vs.h - height) * 0.5);
                const scrollOffset = (marginY - top);
                this.scrollTo(this.scroll - scrollOffset);
                this._width = this.$el.getBoundingClientRect().width;
                this._height = this._width * 9 / 16;
                this.$refs.close.style.transform = `translate3d(${marginX}px, -${marginY}px, 0)`;
                this._work.style.pointerEvents = pointerEvents;
                this.$refs.frame.style.pointerEvents = pointerEvents;
                TweenMax.to(this._hide, time * 0.5, {opacity, ease});
                TweenMax.to(this.$refs.play, time * 0.5, {opacity, ease});
                TweenMax.to(this.$refs.frame, time, {width: this._width, height: this._height, borderRadius: 0, ease, onComplete: this.createPlayer});
            },
            createPlayer() {
                if (!this.player) {
                    this.player = new window.YT.Player("player", {
                        width: this._width,
                        height: this._height,
                        videoId: "l6lYgs9iTvE",
                        playerVars: { 
                            "autoplay": this.desktop ? 1 : 0,
                            "controls": this.desktop ? 0 : 1,
                            "rel": 0,
                            "playsinline": 0,
                            "origin": "https://www.youtube.com"
                        },
                        events: {
                            'onReady': this.onPlayerReady,
                            'onStateChange': this.onStateChange
                        }
                    });
                    this._playing = true;
                } else if (!this._playing){
                    this._playing = true;
                    this.$refs.player.style.pointerEvents = this.desktop ? "none" : "auto";
                    this.player.seekTo(0);
                    this.player.playVideo();
                    this.onPlayerReady();
                }
            },
            onPlayerReady() {
                const time = 0.65;
                const ease = Power1.easeIn;
                const opacity = 1;
                TweenMax.to(this.$refs.player, time, {opacity, ease});
                TweenMax.to(this.$refs.close, time, {opacity, ease});
            },
            onStateChange(e) {
                e.data === 0 && this.close();
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
                scrollTo: "scroll/scrollTo",
                setScrollEnabled: "scroll/setEnabled"
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
            border: 2px solid white;
            will-change: opacity;
            opacity: 0;
            &::after, &::before {
                content: '';
                position: absolute;
                width: 25px;
                height: 2px;
                background: white;
                left: 50%;
                top: 50%;
                transform-origin: 50 50;
            }
            &::after {
                transform: translate(-50%, -50%) rotate(45deg);
            }
            &::before {
                transform: translate(-50%, -50%) rotate(-45deg);
            }
        }
        > div {
            width: 100%;
            .player {
                // z-index: 1;
                position: absolute;
                will-change: opacity;
                opacity: 0;
                &.desktop {
                    pointer-events: none;
                }
            }
            .reel {
                // z-index: 2;
                position: relative;
                width: 100%;
                padding-bottom: 56.25%;
                .play {
                    will-change: opacity;
                    position: absolute;
                    width: 75px;
                    height: 75px;
                    border-radius: 50%;
                    border: 2px solid white;
                    @include centerXY();
                    transform-origin: 50% 50%;
                    @include respond-to("desktop") {
                        width: 100px;
                        height: 100px;
                    }
                    .triangle {
                        position: absolute;
                        @include centerXY();
                        transform: translate(-33%, -50%);
                        width: 0; 
                        height: 0; 
                        border-left: 30px solid white;
                        border-top: 15px solid transparent;
                        border-bottom: 15px solid transparent; 
                        @include respond-to("desktop") {
                            border-left: 40px solid white;
                            border-top: 20px solid transparent;
                            border-bottom: 20px solid transparent;
                        }
                    }
                }

            }
        }
    }

</style>


