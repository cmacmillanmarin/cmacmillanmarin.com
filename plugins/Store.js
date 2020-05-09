//
// plugins/Store.js

export default ({ store }) => {

    store.dispatch("checks/init");
    store.dispatch("breakpoints/init");
}
