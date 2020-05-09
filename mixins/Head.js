//
//  components/types/mixins/Meta.js

export default {
    head() {
        const {head} = this.$content.config;
        return {
            title: head.title,
            htmlAttrs: {
                lang: "en"
            },
            bodyAttrs: {
                class: "__body"
            },
            link: [
                { rel: "icon", type: "image/x-icon", href: `${head.url}/favicon.ico` },
                { rel: "canonical", href: `${head.url}${this.$route.path}` },
            ],
            meta: [
                { charset: "utf-8" },

                { hid: "viewport", name: "viewport", content: "width=device-width, initial-scale=1" },
                { hid: "msapplication-TileColor", name: "msapplication-TileColor", content:"#000" },
                { hid: "theme-color", name: "theme-color", content:"#000" },

                { hid: "description", name: "description", content: 'meta:description' },

                { hid: "og:locale", property: "og:locale", content: "en" },
                { hid: "og:title", property: "og:title", content: head.title },
                { hid: "og:type", property: "og:type", content: "website" },
                { hid: "og:url", property: "og:url", content: `${head.url}${this.$route.path}` },
                { hid: "og:site_name", property: "og:site_name", content: head.title },
                { hid: "og:description", property: "og:description", content: 'meta:description' },
                { hid: "og:image", property: "og:image", content: head.ogImage },
                { hid: "og:image:secure_url", property: "og:image:secure_url", content: head.ogImage },

                { hid: "twitter:card", name: "twitter:card", content: "summary" },
                { hid: "twitter:site", name: "twitter:site", content: `@${head.twUser}` },
                { hid: "twitter:creator", name: "twitter:creator", content: `@${head.twUser}` },
                { hid: "twitter:title", name: "twitter:title", content: head.title },
                { hid: "twitter:description", name: "twitter:description", content: 'meta:description' },
                { hid: "twitter:image", name: "twitter:image", content: head.twImage }
            ]
        }
    }
}
