<template>
    <header class="header">
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
    </header>
</template>

<script>
    export default {
        data() {
            return {
                desc: "万事开头难,然后中间难,最后结尾难"
            };
        }
    }
</script>

<style lang="less" scoped>
    @import '~assets/less/define.less';
    .header {
        background-color: white;
        position: fixed;
        z-index: 500;
        top: 0px;
        width: 100%;
        max-width: @defaultWidth;
        height: @headerHeight;
        margin-bottom: @headerHeight;
        ;
        line-height: @headerHeight;
        .header-div {
            justify-content: space-between;
            display: flex;
        }
        .header-div-span {
            align-items: center;
            display: flex;
        }
        .header-img {
            height: @headerHeight - 0.5;
            width: @headerHeight - 1;
            margin-left: .7rem;
        }
        .header-title {
            font-size: 1.2rem;
            margin-left: .7rem;
            color: @defaultDarkColor;
        }
        button {
            color: @defaultBlue;
            font-size: 1.2rem;
            margin-right: .7rem;
            padding: 5px 0px;
            cursor: pointer;
        }
    }
</style>

