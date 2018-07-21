# cmacmillanmarin.com

## Tech Overview
- [NUXT.js](https://nuxtjs.org//): Nuxt.js is a framework for creating Universal Vue.js Applications. Its main scope is UI rendering while abstracting away the client/server distribution.

### Requires
- Node ^v9.4.0.
- NPM ^v5.6.0.

### Libraries
- [GSAP](https://greensock.com/): GreenSock Animation Platform (GSAP) is a suite of tools for scripted, high-performance HTML5 animations in all major browsers. Popular, reliable, and fast.
- [Lodash](https://lodash.com/): A JavaScript utility library delivering consistency, modularity, performance, & extras.
- [Autoprefixer](https://www.npmjs.com/package/autoprefixer): PostCSS plugin to parse CSS and add vendor prefixes to CSS rules using values from Can I Use.
- [cross-env](https://www.npmjs.com/package/cross-env): Run scripts that set and use environment variables across platforms. Standardize NODE_ENV for windows. If working on MACOS or LINUX you can remove it. 


## Setup & Development

### Server
- `npm install`
- Run development server: `npm run dev` and go to `localhost:3000` / `0.0.0.0:3000`
    

## Compile the code for production or staging
This process will compile the html templates, scss & JS.

- Explain generate routes module. 
- If you want to share this in a folder change nuxt.config.js base varible and meta base on app.html
- *Production:* `npm run build`
