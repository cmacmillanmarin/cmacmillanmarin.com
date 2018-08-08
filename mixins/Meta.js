//
//  components/types/mixins/Meta.js

export default {
    head() {
        return {
            title: this.$t("meta:title"),
            bodyAttrs: {
                class: "__body"
            },
            link: [
                {
                    rel: "icon",
                    type: "image/x-icon",
                    href: "/favicon.ico"
                }
            ],
            meta: [
                {
                    charset: "utf-8"
                },
                {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1"
                },
                {
                    hid: "description",
                    name: "description",
                    content: this.$t("meta:description")
                },
                {
                    hid: "keywords",
                    name: "keywords",
                    content: this.$t("meta:keywords")
                },
                {
                    hid: "og:url",
                    name: "og:url",
                    content: this.$t("meta:url")
                },
                {
                    hid: "og:title",
                    name: "og:title",
                    content: this.$t("meta:title")
                },
                {
                    hid: "og:description",
                    name: "og:description",
                    content: this.$t("meta:description")
                },
                {
                    hid: "og:image",
                    name: "og:image",
                    content: this.$t("meta:og:image")
                },
                {
                    hid: "twitter:card",
                    name: "twitter:card",
                    content: "summary_large_image"
                },
                {
                    hid: "twitter:site",
                    name: "twitter:site",
                    content: "@cmacmillanmarin"
                },
                {
                    hid: "twitter:title",
                    name: "twitter:title",
                    content: this.$t("meta:title")
                },
                {
                    hid: "twitter:description",
                    name: "twitter:description",
                    content: this.$t("meta:description")
                },
                {
                    hid: "twitter:image",
                    name: "twitter:image",
                    content: this.$t("meta:twitter:image")
                }
            ]
        }
    }
}
