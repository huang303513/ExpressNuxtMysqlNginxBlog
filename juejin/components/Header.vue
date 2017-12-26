<template>
    <div class="header">
        <div class="header-div">
            <div class="header-div-span">
                <img class="header-img" src="/img/headIcon.png">
                <p class="header-title">{{desc}}</p>
            </div>
            <div class="header-div-span">
                <button type="button">写文章</button>
                <button type="button">登陆</button>
                <button type="button">注册</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                desc: "万事开头难,然后中间难,最后结尾难",
                posts: []
            };
        },
        async asyncData({params}) {
            var self = this;
            let result =  await axios.get(`https://my-api/posts/${params.id}`);    
            console.log("返回数据=======>",JSON.stringify(result));
        }
    }
</script>

<style lang="less" scoped>
    @import '~assets/less/header.less';
</style>

