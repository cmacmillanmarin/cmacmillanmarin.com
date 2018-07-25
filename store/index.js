//
// store/index.js

export const state = () => ({
    colors: [
        "#9400D3",
        "#4B0082",
        "#0000FF",
        "#00FF00",
        "#FFFF00",
        "#FF7F00",
        "#FF0000"
    ],
    color: "#9400D3"
});

export const mutations = {
    randomColor(state) {
        let color = state.colors[parseInt(Math.random() * state.colors.length - 1)];
        while (color === state.color) color = state.colors[parseInt(Math.random() * state.colors.length - 1)];
        state.color = color;
    }
};

export const actions = {
    nuxtServerInit({ commit }, { req }) {

        commit("randomColor");
    }
};
