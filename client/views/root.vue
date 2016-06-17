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
        <div id="editor" class="editor">111</div>
    </div>
    <div class="right">
        <iframe v-el:iframe frameborder="0"></iframe>
    </div>
</template>

<script>
    var ace = require('brace');
    require('brace/mode/javascript');
    require('brace/theme/monokai');



    module.exports = {
        data: function () {
            return {
                source:{
                    html:""
                }
            }
        },
        methods: {
            preview:function (html) {
                var iframe = this.$els.iframe;
                var _window = iframe.contentWindow;
                _window.document.documentElement.innerHTML = html;
            }
        },
        watch:{
            'source.html':function (val) {
                this.preview(val);
            }
        },
        components: {},
        ready: function () {
            var editor = ace.edit('editor');
            editor.getSession().setMode('ace/mode/javascript');
            editor.setTheme('ace/theme/monokai');
        }
    }
</script>