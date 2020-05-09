//
// store/scroll.js

export const state = () => ({
    point: 0,
    direction: 0,
    to: 0,
    el: null
});

export const mutations = {
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
