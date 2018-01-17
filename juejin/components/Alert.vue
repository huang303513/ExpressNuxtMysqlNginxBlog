<template>
    <div v-show="alertOptions&&alertOptions.show" class="alertRoot">
        <div class="alert_box">
            <span v-text="alertOptions&&alertOptions.title" class="alert_box_title"></span>
            <i class="alert_box_i">{{alertOptions&&alertOptions.message}}</i>
            <span class="alert_box_button" @click="close">{{alertOptions&&alertOptions.butttonTitle}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                title: "asdfasdfas"
            }
        },
        methods: {
            close() {
                this.alertOptions.show = false;
            }
        },
        props: {
            alertOptions: {
                default: {
                    show: false
                }
            }
        }
    }
</script>
<style lang="less" scoped>
.alertRoot {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.2);
    z-index: 1001;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    .alert_box {
        position: absolute;
        z-index: 1002;
        top: 50%;
        left: 50%;
        overflow: hidden;
        width: 18rem; // height: 100px;
        text-align: center;
        border-radius: 6px;
        background-color: rgba(255, 255, 255, .8);
        color: black;
        transform: translate3d(-50%, -50%, 0) scale(1);
        span,
        i {
            display: block;
        }
        .alert_box_title {
            // background-color: green;
            margin-top: .3rem;
            font-size: 1rem;
            font-weight: 500;
            height: 2rem;
            line-height: 2rem;
        }
        .alert_box_i {
            margin: .3rem 0 .4rem 0;
            // background-color: red;
            font-family: inherit;
            font-size: .8rem;
            height: 2rem;
            line-height: 2rem;
            &::after {
                display: block;
                position: relative;
                width: 100%;
                height: 1px;
                background-color: rgba(0, 0, 0, 0.2);
                content: '';
            }
        }
        .alert_box_button {
            // background-color: red;
            font-size: 1rem;
            font-weight: 600;
            color: #007aff;
            height: 2rem;
            line-height: 2rem;
        }
    }
}
</style>


