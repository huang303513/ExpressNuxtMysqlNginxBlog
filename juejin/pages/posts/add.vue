<template>
    <div class="addRoot">
        <div class="addHeader">
            <label>标题</label>
            <input type="text" name="title">
        </div>
        <div class="">
            <label>内容</label>
            <textarea name="content" rows="15"></textarea>
        </div>
        <input type="submit" class="" value="发布">
    </div>
</template>

<script>
    export default {
    
    }
</script>

<style lang="less" scoped>
    .addRoot {
        background-color: red;
        width: 100%;
        height: 100%;
        .addHeader{
            width: 100%;
        }
    }
</style>


