<style lang="less" rel="stylesheet/less">
    *{
        margin:0;
        padding:0;
        box-sizing:border-box;
    }
    html,body{
        height:100%;
    }
    .left,.right{
        position:absolute;
        top:0;
        width:50%;
        height:100%;
    }
    .top,.bottom{
        height:50%;
        width:100%;
        border:1px solid #333;
        &[name]{
            position:relative;
            &:after{
                content:attr(name);
                display:block;
                position:absolute;
                top:0;
                right:0;
                background:rgba(0,0,0,0.2);
                color:#fff;
                padding:0 5px;
                line-height:16px;
                font-size:12px;
            }
        }
    }
    .left {
        left:0;
        .editor{
            width:100%;
            height:100%;
        }
    }
    .right{
        right:0;
    }
</style>
<template>
    <div class="left">
        <div class="top" name="html">
            <editor :content.sync="source.html" lang="html" ></editor>
        </div>
        <div class="bottom" name="less">
            <editor :content.sync="source.less" lang="less" ></editor>
        </div>
    </div>
    <div class="right">
        <div class="top" name="js">
            <editor :content.sync="source.js" lang="javascript" ></editor>
        </div>
        <div class="bottom" name="result">
            <previewer :html="source.html" :less="source.less" :js="source.js"></previewer>
        </div>
    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                source:{
                    html:"",
                    less:"",
                    js:""
                }
            }
        },
        methods: {},
        components: {
            editor:require('components/editor.vue'),
            previewer:require('components/previewer.vue')
        },
        ready: function () {

        }
    }
</script>