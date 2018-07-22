//
// plugins/Scroll.js

class Scroll extends Smooth {

    constructor(opt = {}) {

        super(opt)
        this.dom.section = opt.section
        this.dom.dir = opt.dir
        this.dom.projectScrolling = (opt.type === 'project')
        this.dom.scrollPosition = 0
        this.dom.prevPosition = 0
        this.dom.direction = 0
        this.dom.infiniteScroll = opt.infiniteScroll
    }

    calc(e) {
        
        const delta = this.vars.direction == 'horizontal' ? e.deltaX : e.deltaY
        
        this.vars.target += delta * -1
        if (!this.dom.infiniteScroll) this.clampTarget()
    }

    run() {
        if (this.isRAFCanceled) return

        this.vars.current += (this.vars.target - this.vars.current) * this.vars.ease
        // this.vars.current < .1 && (this.vars.current = 0)
        
        this.rAF = requestAnimationFrame(this.run)

        if(!this.extends){
            this.dom.section.style[this.prefix] = this.getTransform(-this.vars.current.toFixed(2))
        }
        
        if(!this.vars.native && !this.options.noscrollbar) {
            const size = this.dom.scrollbar.drag.height
            const bounds = this.vars.direction === 'vertical' ? this.vars.height : this.vars.width
            const value = (Math.abs(this.vars.current) / (this.vars.bounding / (bounds - size))) + (size / .5) - size
            const clamp = Math.max(0, Math.min(value-size, value+size))
            this.dom.scrollbar.drag.el.style[this.prefix] = this.getTransform(clamp.toFixed(2))
        }

        if (this.callback && this.vars.current !== this.vars.last) {
            this.callback(this.vars.current)
        }

        this.vars.last = this.vars.current;
        
        this.dom.scrollPosition = parseInt(this.vars.current)
        if (this.dom.scrollPosition === this.dom.prevPosition) return
        else if (this.dom.scrollPosition > this.dom.prevPosition) this.dom.direction = 1
        else this.dom.direction = -1
        this.vs._emitter.emit('scrolling', this.dom.scrollPosition)
        if (this.dom.dir == 'horizontal') this.dom.section.style[this.prefix] = this.horizontalScroll(-this.vars.current.toFixed(2))
        else this.dom.section.style[this.prefix] = this.verticalScroll(-this.vars.current.toFixed(2))
        this.dom.prevPosition = this.dom.scrollPosition

    }

    setInfiniteScroll() {
        this.dom.infiniteScroll = true
    }

    setLimitedScroll() {
        this.dom.infiniteScroll = false
    }

    horizontalScroll(value) {
        return 'translate3d('+ value +'px,0,0)'
    }

    verticalScroll(value) {
        return 'translate3d(0,'+ value +'px,0)'
    }

    naturalScrollTo(val) {
        this.vars.target = val
    }

    scrollTo(val) {
        this.vars.current = val
        this.vars.target = val
    }

    scrollToZero() {
        this.vars.current = 0
        this.vars.target = 0
    }

    scrollToBottom() {
        this.vars.current = this.vars.bounding;
        this.vars.target = this.vars.bounding;
    }

    getScrollHeight() {
        return this.vars.bounding
    }

    getDirection() {
        return this.dom.direction
    }

    getScrollPercentage() {
        return (this.vars.current/this.vars.bounding).toFixed(2)
    }

    resize() {
        super.resize()
        if (this.dom.dir == 'horizontal') this.vars.bounding = this.dom.section.getBoundingClientRect().width - this.vars.width - 5
        else this.vars.bounding = this.dom.section.getBoundingClientRect().height - this.vars.height
    }

}

window.Scroll = Scroll