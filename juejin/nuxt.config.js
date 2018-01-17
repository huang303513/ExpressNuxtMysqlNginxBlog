// var session = require('express-session');
// var MySQLStore = require('express-mysql-session')(session);
// import bodyParser from 'body-parser'

module.exports = {
    /*
     ** Headers of the page
     */
    head: {
        script: [{
            src: 'https://www.huangchengdu.com/javascripts/screen.js'
        },{
            src: 'https://hm.baidu.com/hm.js?96b0d09e8d132a6e61f66ea86b479b70'
        },{
            src:'https://www.huangchengdu.com/javascripts/googleAsys.js'
        }],
        title: '黄成都的技术博客',
        meta: [{
                charset: 'utf-8'
            },
            {
                name: 'viewport',
                content: 'width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no,minimal-ui'
            },
            {
                hid: 'description',
                name: 'description',
                content: '黄成都的技术博客'
            },
            {
                name:"keywords",
                content:"黄成都,技术博客,黄成都的技术博客,iOS,Vue,Nuxt,Vue开发,AFNetWorking源码,SDWebImage源码,AFNetWorking,SDWebImage,JSONP,JavaScript,JavascriptCoreBridge,SSR,服务端渲染"
            },
            {
                name:'subject',
                content:'技术博客'
            },
            {
                name:'robots',
                content:'index,follow'
            },
            {
                name:'googlebot',
                content:'index,follow'
            },
            {
                name:'owner',
                content:"黄成都"
            },
            // /*优先使用 IE 最新版本和 Chrome  */
            {
                name: 'renderer',
                content: 'webkit'
            },
            {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge'
            },
            /* iOS 设备 */
            {
                name: 'author',
                content: '黄成都'
            },
            {
                name: 'apple-mobile-web-app-title',
                content: '黄成都的技术博客'
            },
            {
                name: 'apple-mobile-web-app-capable',
                content: 'yes'
            },
            {
                name: 'apple-mobile-web-app-status-bar-style',
                content: '#263238'
            },
            /*fullscreen and app mode*/
            {
                name: 'screen-orientation',
                content: 'portrait'
            },
            {
                name: 'x5-orientation',
                content: 'portrait'
            },
            {
                name: 'full-screen',
                content: 'yes'
            },
            {
                name: 'x5-fullscreen',
                content: 'true'
            },
            {
                name: 'browsermode',
                content: 'application'
            },
            {
                name: 'x5-page-mode',
                content: 'app'
            },
            /*webkit*/
            {
                name: 'theme-color',
                content: '#263238'
            }
        ],
        link: [{
            rel: 'icon',
            type: 'image/x-icon',
            href: '/img/favicon.ico'
        }]
    },
    css: [{
        src: '~assets/less/main.less',
        lang: 'less'
    }],
    /*
     ** Build configuration
     */
    build: {
        vendor: ['axios', 'vue-notification'],
        /*
         ** Run ESLint on save
         */
        // extend(config, ctx) {
        // 	if (ctx.dev && ctx.isClient) {
        // 		config.module.rules.push({
        // 			enforce: 'pre',
        // 			test: /\.(js|vue)$/,
        // 			loader: 'eslint-loader',
        // 			exclude: /(node_modules)/
        // 		})
        // 	}
        // }
    },
    loading: {
        // color: '#04acf7',
        // height: '4px',
        // failedColor: 'red'
        // loading: '~/components/loading.vue'
    },
    //页面的过渡效果
    transition: {
        name: 'page'
    },
    //配置路由
    router: {
        middleware: 'adminAuth'
    },
    //插件
    plugins: [{
            src: '~plugins/axios'
        },
        {
            src: '~plugins/vue-notification',
            ssr: false
        }
    ],
    serverMiddleware: [
        // body-parser middleware
        // bodyParser.json(),
        // session middleware
        // session({
        //   secret: 'super-secret-key',
        //   resave: false,
        //   saveUninitialized: false,
        //   cookie: { maxAge: 60000 }
        // }),
        // Api middleware
        // We add /api/login & /api/logout routes
        // '~/api'
    ],
    render: {
        bundleRenderer: {
            cache: require('lru-cache')({
                max: 1000,
                maxAge: 1000 * 60 * 10
            })
        }
    }
}
