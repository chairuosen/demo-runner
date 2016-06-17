<style lang="less" rel="stylesheet/less">
    
</style>
<template>
    <router-view></router-view>
</template>
<script>
    module.exports = {
        replace:false,
        data: function () {
            return {}
        },
        methods: {},
        components: {},
        ready: function () {
            function getCharFromCode(code){
                return String.fromCharCode(code).toLowerCase();
            }
            $(document).off('.preview').on('keydown.preview', function(e) {
                if((e.ctrlKey||e.metaKey) && (getCharFromCode(e.which) == 's')) {
                    e.preventDefault();
                    $(document).trigger('save');
                    return false;
                }
            });
        }
    }
</script>