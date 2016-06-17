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
            <input type="text" v-model="newResource.url">
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
                newResource:{
                    type:"style",
                    url:""
                }
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
        components: {},
        ready: function () {

        }
    }
</script>