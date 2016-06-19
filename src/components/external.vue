<style lang="less" rel="stylesheet/less" scoped>
    .list{
        padding-top:30px;
        li{
            border-bottom:1px solid #ccc;
            padding-left:5px;
        }
    }

    .list-container{
        height:100%;
        overflow:scroll;
    }
    .add-area{
        background:#fff;
        position:absolute;
        top:0;
        left:0;
        width:100%;
    }
</style>
<template>
    <div style="position:relative;height:100%;">
        <div class="add-area">
            <select v-model="newResource.type">
                <option v-for="option in types" :value="option">
                    {{ option }}
                </option>
            </select>

            <input type="text" style="width:400px;" placeholder="url" v-model="newResource.url">

            <select v-model="selectedLib">
                <option v-for="option in libOptions" :value="$index">
                    {{ option.name }}
                </option>
            </select>
            <button @click="add(newResource);">Add</button>
        </div>
        <div class="list-container">

            <ul class="list">
                <li v-for="item in resource">
                    <button @click="remove(resource,$index)">Remove</button>[{{item.type}}] : {{item.url}}
                </li>
            </ul>
        </div>
    </div>

</template>
<script>
    function clone(a){
        return JSON.parse(JSON.stringify(a));
    }

    module.exports = {
        props:{
            resource:Array
        },
        data: function () {
            return {
                types:['style','script'],
                libs:{},
                selectedLib:0,
                newResource:{
                    type:"style",
                    url:""
                }
            }
        },
        computed:{
            libOptions:function () {
                var arr = $.map(this.libs,function (v,k) {
                    return {
                        name:k+" "+v.version,
                        type:/\.css$/.test(v.filename)?'style':'script',
                        url:'http://apps.bdimg.com/libs/'+[v.name,v.version,v.filename].join('/')
                    }
                });
                arr.sort(function (a,b) {
                    return a.name>b.name? 1 : a.name<b.name? -1 : 0;
                });
                return [{
                    name:'PopularLibs',
                    type:'',
                    url:''
                }].concat(arr);
            }
        },
        methods: {
            add:function (obj) {
                this.resource.push(clone(obj));
                obj.url = "";
                obj.type = this.types[0];
            },
            remove:function (arr,index) {
                arr.splice(index,1);
            }
        },
        watch:{
            'selectedLib':function (val) {
                var vm = this;
                if(val!=0){
                    var selectedObj = this.libOptions[val];
                    if(selectedObj){
                        this.add({
                            type:selectedObj.type,
                            url:selectedObj.url
                        })
                    }
                    require('vue').nextTick(function () {
                        vm.selectedLib = 0;
                    })
                }
            }
        },
        components: {},
        ready: function () {
            var vm = this;
            $.getScript('http://cdn.code.baidu.com/libs.js').then(function () {
                vm.libs = window.libs;
            });
        }
    }
</script>