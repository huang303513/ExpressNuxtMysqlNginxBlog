<template>
    <footer>
        <div>
            <p>参考网址：</p>
            <div class="links">
                <a target="_blank" href="https://cnodejs.org/">CNode技术社区</a>
                <a target="_blank" href="https://cn.vuejs.org/">Vue.js官网</a>
                <a target="_blank" href="https://zh.nuxtjs.org/">Nuxt.js官网</a>
                <a target="_blank" href="http://www.expressjs.com.cn/">Express.js官网</a>
            </div>
        </div>
        <div>
            <p>友情链接：</p>
            <div class="links">
                <a target="_blank" href="http://www.github.com/huang303513">隔壁老黄的github</a>
                <a target="_blank" href="http://huang303513.github.io/">老博客地址</a>
                <a target="_blank" href="https://github.com/huang303513/ExpressNuxtMysqlNginxBlog">网站源码地址</a>
            </div>
        </div>
    </footer>
</template>white

<style lang="less" scoped>
    @import "~assets/less/define.less";
    footer {
        margin-top: 1rem;
        padding-left: 20px;
        margin-bottom: 1rem;
        background: white;
    }
    
    div {
        padding-bottom: 20px;
    }
    
    footer div:last-child {
        padding-bottom: 0;
    }
    
    p {
        font-size: 16px;
        padding-bottom: 10px;
    }
    
    a {
        margin-left: 20px;
        font-size: 1.2rem;
        margin-left: 10px;
        color: @defaultDarkColor;
        &:hover{
            font-size: 1.5rem;
			color: #222222;
			text-decoration: underline;
        }
    }
</style>
