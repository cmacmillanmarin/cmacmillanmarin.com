//
// store/breakpoints.js

export const state = () => ({
    breakpoint: "",
    mobile: false,
    smallMobile: false,
    prevBreakpoint: "",
    _debounce: null,
    vs: {w: 0, h: 0},
    _DEBOUNCE_DELAY: 50
})

export const mutations = {

    setViewportSize(state, size) {
        state.vs = {...size};
    },

    setBreakpoint(state, breakpoint) {
        state.breakpoint = breakpoint;
        state.smallMobile = breakpoint.includes("mobile");
        state.mobile = breakpoint.includes("mobile") || breakpoint.includes("tablet");
        state.prevBreakpoint = breakpoint;
    },

    setDebounce(state, debounce) {
        state._debounce = debounce;
    }
}

export const actions = {

    init({commit, dispatch }) {
        commit("setDebounce",() => {dispatch("_updateBreakpoint");});
        dispatch("startWatching");
    },

    startWatching({ state, dispatch }){
        dispatch("stopWatching");
        window.addEventListener("resize", state._debounce );
        state._debounce();
    },

    stopWatching({ state }){
        window.removeEventListener("resize", state._debounce );
    },

    _updateBreakpoint({ state, commit }) {

        let breakpoint = window.getComputedStyle(document.body, "::after").getPropertyValue("content");

        commit("setViewportSize", {w: window.innerWidth, h: window.innerHeight});

        if(breakpoint){
            breakpoint = breakpoint.replace(/["']/g, "");
        }

        if(state.prevBreakpoint !== breakpoint){
            commit("setBreakpoint", breakpoint);
        }
    }
}
