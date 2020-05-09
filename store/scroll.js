//
// store/scroll.js

export const state = () => ({
    enabled: true,
    point: 0,
    direction: 0,
    to: 0,
    el: null
});

export const mutations = {
    setEnabled(state, enabled) {
        state.enabled = enabled;
    },
    scrollTo(state, point) {
        state.to = point;
    },
    setPoint(state, point) {
        state.point = point;
    },
    setDomEl(state, el) {
        state.el = el;
    },
    setDirection(state, direction) {
        state.direction = direction;
    }
};
