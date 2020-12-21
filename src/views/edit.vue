<style lang="less" rel="stylesheet/less">
    *{
        margin:0;
        padding:0;
        box-sizing:border-box;
    }
    html,body,.height100{
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
    <div class="height100" v-show="show">
    <meta name="viewport" content="user-scalable=no,width=device-width,initial-scale=1,user-scalable=0,maximum-scale=1">
        <div v-if="!isPreview">
            <div class="left">
                <div class="edit-area" style="height:40%;position:relative;" name="html">
                    <editor :content.sync="source.html" lang="html" ></editor>
                    <div style="position:absolute;right:0;bottom:0;">
                      <button @click="save()">save</button>
                      <button @click="preview()">preview</button>
                    </div>
                </div>
                <div class="edit-area" style="height:60%;" name="js">
                    <editor :content.sync="source.js" lang="javascript" ></editor>
                </div>

            </div>
            <div class="right">
                <div class="edit-area" style="height:40%;" name="less">
                    <editor :content.sync="source.less" lang="less" ></editor>
                </div>
                <div class="edit-area" style="height:60%;" name="result">
                    <previewer :html="source.html" :less="source.less" :resource="source.resource" :js="source.js"></previewer>
                </div>
            </div>
        </div>
        <div v-if="isPreview" style="height:100%">
            <previewer :html="source.html" :less="source.less" :resource="source.resource" :js="source.js"></previewer>
        </div>
    </div>
</template>

<script>
    var api = require('../api');

    function getCharFromCode(code){
        return String.fromCharCode(code).toLowerCase();
    }
    $(document).off('.save').on('keydown.save', function(e) {
        if((e.ctrlKey||e.metaKey) && (getCharFromCode(e.which) == 's')) {
            e.preventDefault();
            $(document).trigger('save');
            return false;
        }
    });

    function changeLocation(id) {
        window.history.replaceState(null, document.title, "?id="+id);
    }

    function getLocationParam(name) {
        var url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }


    module.exports = {
        data: function () {
            return {
                show:false,
                isPreview: false,
                source:{
                    id:'',
                    html:"",
                    less:"",
                    js:"",
                    resource:[]
                }
            }
        },
        methods: {
            save(){
                var vm = this;
                $(document).trigger('preview');
                return api.saveCode(vm.source).then(function (res) {
                    vm.source.id = res.id;
                    changeLocation(res.id)
                });
            },
            preview(){
                this.save().then(function () {
                    window.open(window.location.href + '&preview=1');
                })
            }
        },
        components: {
            editor:require('vue-ace-editor'),
            previewer:require('components/previewer'),
            external:require('components/external')
        },
        events:{
            'vue-ace-editor:init':function () {
                require('brace/mode/html');
                require('brace/mode/javascript');
                require('brace/mode/less');
                require('brace/theme/chrome');
            }
        },
        ready: function () {
            var vm = this;
            var initId = getLocationParam('id');
            var preview = getLocationParam('preview');
            vm.isPreview = !!preview;
            if(initId){
                api.getCode(initId).then(function (res) {
                    if(res.data){
                        $.extend(vm.source,{
                            id:res.data.id,
                            html:res.data.html,
                            less:res.data.less,
                            js:res.data.js,
                            resource:res.data.resource||[]
                        });
                    }
                    vm.show = true;
                    require('vue').nextTick(function () {
                        $(document).trigger('preview');
                    })
                },function () {
                    vm.show = true;
                });
            }else{
                vm.show = true;
            }
            $(document).on('save',function () {
                vm.save();
            });
        }
    }
</script>
