<style lang="less" rel="stylesheet/less">
    .editor{
        height:100%;
        width:100%;
    }
</style>
<template>
    <div class="editor" :style="{height:height+'px',width:width+'px'}"></div>
</template>
<script>
    var ace = require('brace');

    module.exports = {
        props:{
            content:{
                type:String,
                twoWay:true,
                required:true
            },
            lang:String,
            theme:String,
            height:true,
            width:true
        },
        data: function () {
            return {
                editor:null,
                contentBackup:""
            }
        },
        methods: {},
        components: {},
        watch:{
            content:function (val) {
                if(this.contentBackup !== val)
                    this.editor.setValue(val,1);
            }
        },
        ready: function () {
            var vm = this;
            var lang = this.lang||'text';
            var theme = this.theme||'chrome';
            require('brace/mode/'+lang);
            require('brace/theme/'+theme);
            window.emmet = require('emmet/emmet').emmet;
            require('brace/ext/emmet');

            var editor = vm.editor = ace.edit(this.$el);
            editor.$blockScrolling = Infinity;
            editor.setOption("enableEmmet", true);

            editor.getSession().setMode('ace/mode/'+lang);
            editor.setTheme('ace/theme/'+theme);

            editor.setValue(this.content,1);
            window.editor = editor;

            editor.on('change',function () {
                vm.content = editor.getValue();
                vm.contentBackup = vm.content;
            });

        }
    }
</script>