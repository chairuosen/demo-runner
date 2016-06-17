<style lang="less" rel="stylesheet/less">
    
</style>
<template>
    <div>
        <div v-el:template class="template" style="display:none;">
            <style>{{{css}}}</style>
            {{{html}}}
        </div>
        <iframe v-el:iframe frameborder="0"></iframe>
    </div>
</template>
<script>
    var less = require('less');
    module.exports = {
        props:{
            html:String,
            js:String,
            less:String
        },
        data:function () {
            return {
                css:""
            }
        },
        methods: {
            setHtml:function (html,js) {
                var iframe = this.$els.iframe;
                var _window = iframe.contentWindow;
                _window.document.documentElement.innerHTML = html;
                _window.eval(js);
            },
            preview:function () {
                var vm = this;
                less.render(this.less||"").then(function(res){
                    vm.css = res.css;
                    require('vue').nextTick(function () {
                        var html = $(vm.$els.template).html();
                        vm.setHtml(html,vm.js);
                    })
                });
            }
        },
        components: {},
        ready:function () {
            var vm = this;

            $(document).on('save',function () {
                vm.preview();
            })
        }
    }
</script>