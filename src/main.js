var Vue = require('vue');
var VueRouter = require('vue-router');
var jQuery = require('jquery');
window.$ = jQuery;
window.jQuery = jQuery;
Vue.use(VueRouter);
var router = new VueRouter({
    history:true, // 捕获浏览器回退
    hashbang:false // url = html5mode 如果是true就是 # 风格
});
require("./router.js")(router);
router.start(require('views/root.vue'),'body');