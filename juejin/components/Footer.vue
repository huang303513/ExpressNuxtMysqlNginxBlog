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
                <a target="_blank" href="http://www.huangchengdu.com">隔壁老黄的个人网站</a>
            </div>
        </div>
    </footer>
</template>white

<style scoped>
    footer {
        margin-top: 1rem;
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
        margin-right: 20px;
    }
</style>
