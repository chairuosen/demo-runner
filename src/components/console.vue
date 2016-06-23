<style lang="less" rel="stylesheet/less" scoped>
    .log{
        color:#333;
    }
    .warn{
        color:#cccc00;
    }
    .error{
        color:red;
    }
</style>
<template>
    <div style="position:relative;height:100%;">
        <p v-for="item in console" :class="item.event">
            {{ print(item) }}
        </p>
    </div>

</template>
<script>


    module.exports = {
        props:{
            console:Array
        },
        data: function () {
            return {

            }
        },
        computed:{

        },
        methods: {
            print:function (item) {
                return item.args.map(function (a) {
                    switch (typeof a){
                        case 'object':
                            return JSON.stringify(a);
                            break;
                        case 'string':
                            return a;
                        default:
                            return a.toString();
                    }
                }).join(', ');
            }
        },
        watch:{

        },
        components: {},
        ready: function () {
            var vm = this;

        }
    }
</script>