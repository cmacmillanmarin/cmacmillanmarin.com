//
// nuxt.config.js

const axios = require("axios");
const manifest = require("./config/manifest");

module.exports = {

    router: {
        base: "/"
    },

    loading: false,

    modules: ["nuxt-sass-resources-loader"],

    sassResources: ["@/assets/css/style.scss"],

    css: ["~/assets/css/style.scss"],

    postcss: [
        require("autoprefixer")({
            browsers: ["last 2 versions", "ie >= 9", "Safari 8"],
        })
    ],

    plugins: [
        {
            src: "~/plugins/Data.js",
            ssr: true
        },
        {
            src: "~/plugins/Store.js",
            ssr: false
        },
        {
            src: "~/plugins/Smooth.js",
            ssr: false
        },
        {
            src: "~/plugins/Scroll.js",
            ssr: false
        }
    ],


    build: {
        vendor: [
            "gsap"
        ],
        extend(config, {
            isDev,
            isClient
        }) {
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: "pre",
                    test: /\.(js|vue)$/,
                    loader: "eslint-loader",
                    exclude: /(node_modules)/
                });

            }
            config.module.rules.push({
                test: /\.(glsl)$/,
                loader: "raw-loader",
                exclude: /(node_modules)/
            });
            return config
        }
    },
    generate: {
        routes: function (callback) {
            let routes = [];
            manifest.routes.forEach(route => {
                manifest.langs.forEach(lang => {
                    routes.push({
                        route: `${lang}/${route}`
                    });
                });
            })
            if (!manifest.dynamicRoutes || manifest.dynamicRoutes.length === 0) callback(null, routes);
            else {
                manifest.dynamicRoutes.forEach((dynamicRoute, numCall) => {
                    axios.get(dynamicRoute.url).then((res) => {
                        Array.from(res.data.result).forEach((child, key) => {
                            manifest.langs.forEach(lang => {
                                routes.push({
                                    route: `${lang}/${dynamicRoute.path}/${key}`,
                                    payload: child
                                });
                            });
                        });
                        if (numCall === manifest.dynamicRoutes.length - 1) callback(null, routes);
                    });
                });
            }
        }
    }
};
