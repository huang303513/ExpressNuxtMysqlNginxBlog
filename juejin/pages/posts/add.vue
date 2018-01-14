<template>
    <div class="addRoot">
        <div class="addHeader">
            <label>标题*</label>
            <input type="text" v-model="title">
        </div>
        <div class="addContent">
            <textarea v-model="content"></textarea>
        </div>
        <button @click="submitArticle" class="submitButton">发布</button>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        data() {
            return {
                title: "",
                content: ""
            }
        },
        methods: {
            async submitArticle() {
                var url = "/api/posts/create";
                if (!(this.title.length >= 1)) {
                    alert('名字请限制在 1-10 个字符');
                    return;
                }
                if (this.content.length < 1) {
                    alert('内容不能为空');
                    return;
                }
                let result = await axios({
                    method: "post",
                    url: url,
                    data: {
                        title: this.title,
                        content: this.content
                    }
                }).catch(error => {
                    alert(error && error.message || "发布出错");
                    console.log("===============error==========", error);
                });
                console.log("=======result===========", result);
                // var user;
                if (result.data && !result.data.err && result.data.post) {
                    // window.location
                    this.$eventHub.$emit("REFRESHPOSTS", {
						name: "参数"
                    });
                    setTimeout(function() {
                         window.location.replace("/posts/" + result.data.post._id);
                    },1000);
                    
                }else{
                    alert(result.data.err && result.data.err.message || "发布出错");
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "~assets/less/define.less";
    .addRoot {
        position: relative;
        background-color: white;
        padding: 1rem;
        width: 100%;
        height: 100%;
        .addHeader {
            // background-color: green;
            height: 4rem;
            width: 100%;
            label {
                display: block;
                font-size: 1.2rem;
                font-weight: bold;
            }
            input {
                margin-top: .5rem;
                width: 100%;
                line-height: 2.5rem;
                height: 2.5rem;
                font-size: 1.5rem;
                border-radius: 5px;
                border: 1px solid @defaultBGColor;
                ;
            }
        }
        .addContent {
            position: absolute;
            // height: 100%;
            // width: 100%;
            top: 6rem;
            bottom: 3.5rem;
            right: 1rem;
            left: 1rem;
            // margin-top: 2rem;
            //  margin-bottom: 2rem;
            border-radius: 5px;
            border: 1px solid @defaultBGColor;
            textarea {
                font-size: 1.2rem;
                padding: 5px;
                border: 0px;
                // background-color: green;
                height: 100%;
                width: 100%;
            }
        }
        .submitButton {
            position: absolute;
            // background-color: red;
            padding: .5rem .7rem;
            bottom: .5rem;
            right: 1rem;
            display: inline-block;
            // height: 2rem;
            // width: 100%;
            // line-height: 2rem;
            border-radius: 5px;
            text-align: center;
            font-size: 1rem;
            font-weight: 200;
            color: #ffffff;
            background: @defaultBlue;
            box-sizing: content-box;
        }
    }
</style>


