//
//  components/types/mixins/Transition.js

export default {
    transition: {

        css: false,
        appear: true,
        mode: "out-in",
        routeName: "",

        leave(el, done) {

            this.routeName !== this.$route.name
                ? TweenMax.to(el, 0.25, { opacity: 0, onComplete: done })
                : done();
        },
        leaveCancelled(el) { TweenMax.killTweensOf(el); },

        beforeEnter(el) {
            this.routeName = this.$route.name;
            
            this.header = document.querySelector("header");
            this.background = document.querySelector(".c-background");
            this.roulette = document.querySelector(".c-roulette");
        },
        enter(el, done) {
            const lines = Array.from(this.background.querySelectorAll(".flexGrid__cell")).reverse();
            const borderWidth = this.roulette.getBoundingClientRect().width * 0.2;

            this.tl = new TimelineMax();
            this.tl.staggerTo(lines, 0.85, { y: "0%", ease: Power2.easeIn }, 0.1)
            .to(this.roulette, 0.65, { borderWidth, delay: 0.15 }, "roulette")
            .to(this.roulette.querySelector(".dot"), 0.65, { x: "-50%", y: -borderWidth + 20 }, "roulette")
            .to(this.header, 0.75, { opacity: 1 }, "appear")
            .to(el, 0.75, { opacity: 1, y: 0 }, "appear")
        },
        enterCancelled(el) { TweenMax.killTweensOf(el); }
    }
}
