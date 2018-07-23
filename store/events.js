//
// store/events.js

export const state = () => ({
    introPosition: { event: true, params: undefined },
})

export const mutations = {
    dispatch(state, event) {
        const e = state[event.type];
        e.params = event.params ? event.params : undefined;
        e.event = !e.event;
    }
}
