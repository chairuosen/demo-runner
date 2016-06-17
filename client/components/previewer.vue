<style lang="less" rel="stylesheet/less">
    
</style>
<template>
    <div>
        <div v-el:template class="template" style="display:none;">
            <style>{{{css}}}</style>
            {{{html}}}
            <script>
                {{{js}}}
            </script>
        </div>
        <iframe v-el:iframe frameborder="0"></iframe>
    </div>
</template>
<script>
    module.exports = {
        props:{
            html:String,
            js:String,
            css:String
        },
        methods: {
            setHtml:function (html) {
                var iframe = this.$els.iframe;
                var _window = iframe.contentWindow;
                _window.document.documentElement.innerHTML = html;
            },
            preview:function () {
                var vm = this;
                require('vue').nextTick(function () {
                    var html = $(vm.$els.template).html();
                    vm.setHtml(html);
                })
            }
        },
        components: {},
        watch:{
            html:function () {
                this.preview();
            },
            js:function () {
                this.preview();
            },
            css:function () {
                this.preview();
            }
        }
    }
</script>