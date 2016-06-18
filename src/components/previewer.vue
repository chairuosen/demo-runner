<style lang="less" rel="stylesheet/less">
    
</style>
<template>
    <div>
        <div class="iframe" v-el:iframe></div>
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
            setHtml:function (html,css,js,resource) {
                var $iframe = $('<iframe>');
                $iframe.attr('frameborder','0');
                $iframe.attr('height','100%');
                $iframe.attr('width','100%');
                $(this.$els.iframe).empty().append($iframe);
                var iframe = $iframe[0];
                var _window = iframe.contentWindow;
                var htmlTemplate = "<html><head>__head__</head><body>__body__</body></html>";
                var headHtml = "<style>"+css+"<\/style>";

                resource.forEach(function (item) {
                    if(item.type=='style'){
                        headHtml += ( "<link rel='stylesheet' type='text/css' href='"+item.url+"'>" );
                    }else if(item.type =='script'){
                        headHtml += ( "<script src='"+ item.url +"'><\/script>" );
                    }
                });

                htmlTemplate = htmlTemplate.replace('__head__',headHtml);
                htmlTemplate = htmlTemplate.replace('__body__',html);

                _window.document.open();
                _window.document.write(htmlTemplate);
                _window.document.close();

                var inter = setInterval(function() {
                    if (_window.document.readyState === "complete") {
                        clearInterval(inter);
                        _window.eval(js);
                    }
                }, 100);
            },
            preview:function () {
                var vm = this;
                less.render(this.less||"").then(function(res){
                    vm.setHtml(vm.html,res.css,vm.js,vm.resource||[]);
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