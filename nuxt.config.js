//
// nuxt.config.js

const Data = require("./data/en.json");

const routes = ["/"];
for (const page in Data.pages) {
    page !== "home" && routes.push(`/${page}`);
}

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
        routes
    }
};
