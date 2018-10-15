//
//  components/types/mixins/Meta.js

const __baseUrl = "https://cmacmillanmarin.com";
const __googleUser = "+cmacmillanmarin";
const __fbUser = "cmacmillanmarin";
const __twUser = "cmacmillanmarin";
const __twImage = `${__baseUrl}/img/social.jpg`;
const __ogImage = `${__baseUrl}/img/social@2x.jpg`;

export default {
    head() {
        return {
            title: this.$t('meta:title'),
            bodyAttrs: {
                class: "__body"
            },
            link: [
                { rel: "icon", type: "image/x-icon", href: `${__baseUrl}/favicon.ico` },
                { rel: "canonical", href: `${__baseUrl}${this.$route.path}` },
                { rel: "publisher", href: `https://plus.google.com/${__googleUser}` }
            ],
            meta: [
                { charset: "utf-8" },

                { hid: "viewport", name: "viewport", content: "width=device-width, initial-scale=1" },
                { hid: "msapplication-TileColor", name: "msapplication-TileColor", content:"#000" },
                { hid: "theme-color", name: "theme-color", content:"#000" },

                { hid: "description", name: "description", content: this.$t('meta:description') },

                { hid: "og:locale", property: "og:locale", content: this.$route.params.lang },
                { hid: "og:title", property: "og:title", content: this.$t('meta:title') },
                { hid: "og:type", property: "og:type", content: "website" },
                { hid: "og:url", property: "og:url", content: `${__baseUrl}${this.$route.path}` },
                { hid: "og:site_name", property: "og:site_name", content: this.$t('meta:title') },
                { hid: "og:description", property: "og:description", content: this.$t('meta:description') },
                { hid: "og:image", property: "og:image", content: __ogImage },
                { hid: "og:image:secure_url", property: "og:image:secure_url", content: __ogImage },
                { hid: "article:publisher", property: "article:publisher", content: `https://www.facebook.com/${__fbUser}` },

                { hid: "twitter:card", name: "twitter:card", content: "summary" },
                { hid: "twitter:site", name: "twitter:site", content: `@${__twUser}` },
                { hid: "twitter:creator", name: "twitter:creator", content: `@${__twUser}` },
                { hid: "twitter:title", name: "twitter:title", content: this.$t('meta:title') },
                { hid: "twitter:description", name: "twitter:description", content: this.$t('meta:description') },
                { hid: "twitter:image", name: "twitter:image", content: __twImage }
            ]
        }
    }
}
