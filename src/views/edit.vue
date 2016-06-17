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
    .height-50{
        height:50%;
    }
    .overflow-scroll{
        overflow:scroll;
    }
    .edit-area{
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
        <div class="edit-area" style="height:50%;" name="html">
            <editor :content.sync="source.html" lang="html" ></editor>
        </div>
        <div class="edit-area" style="height:50%;" name="js">
            <editor :content.sync="source.js" lang="javascript" ></editor>
        </div>

    </div>
    <div class="right">

        <div class="edit-area" style="height:10%;" name="external">
            <external :resource="resource"></external>
        </div>
        <div class="edit-area" style="height:40%;" name="less">
            <editor :content.sync="source.less" lang="less" ></editor>
        </div>
        <div class="edit-area" style="height:50%;" name="result">
            <previewer :html="source.html" :less="source.less" :resource="resource" :js="source.js"></previewer>
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
                },
                resource:[]
            }
        },
        methods: {},
        components: {
            editor:require('components/editor'),
            previewer:require('components/previewer'),
            external:require('components/external')
        },
        ready: function () {
            function getCharFromCode(code){
                return String.fromCharCode(code).toLowerCase();
            }
            $(document).off('.preview').on('keydown.preview', function(e) {
                if((e.ctrlKey||e.metaKey) && (getCharFromCode(e.which) == 's')) {
                    e.preventDefault();
                    $(document).trigger('save');
                    return false;
                }
            });
        }
    }
</script>