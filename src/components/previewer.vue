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

    var loadStyleUrl = function loadStyleUrl(url) {
        var link  = document.createElement('link');
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.href = url;
        document.getElementsByTagName('head')[0].appendChild(link);
    };



    var loadScriptUrl = function loadScriptUrl(src) {
        var script = document.createElement('script');
        script.src = src;
        document.getElementsByTagName("head")[0].appendChild(script);
    }

    module.exports = {
        props:{
            html:String,
            js:String,
            less:String,
            resource:Array
        },
        data:function () {
            return {
                css:""
            }
        },
        methods: {
            setHtml:function (html,js,resource) {
                var iframe = this.$els.iframe;
                var _window = iframe.contentWindow;
                _window.document.documentElement.innerHTML = html;
                _window.eval(loadScriptUrl.toString());
                _window.eval(loadStyleUrl.toString());
                resource.forEach(function (item) {
                    if(item.type=='style'){
                        _window.eval('loadStyleUrl("'+item.url+'")');
                    }else if(item.type =='script'){
                        _window.eval('loadScriptUrl("'+item.url+'")');
                    }
                });
                _window.eval(js);
            },
            preview:function () {
                var vm = this;
                less.render(this.less||"").then(function(res){
                    vm.css = res.css;
                    require('vue').nextTick(function () {
                        var html = $(vm.$els.template).html();
                        vm.setHtml(html,vm.js,vm.resource||[]);
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