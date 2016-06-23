<style lang="less" rel="stylesheet/less">
    
</style>
<template>
    <div style="height:100%">
        <div class="iframe" style="height:100%" v-el:iframe></div>
    </div>
</template>
<script>
    var less = require('less');
    var Console = function () {
        var o = {};
        ['log','info','warn','error','table'].forEach(function (name) {
            o[name] = function () {
                var args = [].slice.call(arguments);
                if(_console){
                    _console[name].apply(_console,args);
                }
                window.parent.postMessage({event:name,args:args},"*");
            }
        });
        return o;
    };
    module.exports = {
        props:{
            html:String,
            js:String,
            less:String,
            resource:Array,
            console:Array
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
                this.console = [];
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
                headHtml += ( "<script>window.onload=function(){"+js+"}<\/script>" );

                htmlTemplate = htmlTemplate.replace('__head__',headHtml);
                htmlTemplate = htmlTemplate.replace('__body__',html);

                _window.eval('window._console=window.console;window.console='+Console.toString()+"()");
                _window.document.open();
                _window.document.write(htmlTemplate);
                _window.document.close();
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

            $(document).on('preview',function () {
                vm.preview();
            });
            $(window).on('message',function (e) {
                var consoleEvent = e.originalEvent.data;
                if(consoleEvent.event){
                    vm.console.push(consoleEvent)
                }
            });
        }
    }
</script>