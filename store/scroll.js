//
// store/scroll.js

export const state = () => ({
    obj: {},
    point: 0
});

export const mutations = {
    setPoint(state, point) {
        state.point = point;
    }
};