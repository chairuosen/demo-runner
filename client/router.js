module.exports = function (router) {
    var defaultTitle = document.title;
    router.map(require('./route.js').route);
    router.alias({
        '/':"/index",
    });

    router.redirect({
        '*': '/'
    });

    var timer = 0;
    setInterval(function(){
        timer = 0;
    },1000);

    window.$router = router;

    router.beforeEach(function(transition){
        var to = transition.to;
        timer++;
        if(timer>=5){ // 路由频率限制。
            console.error('Too Many RouteChanges!');
            return ;
        }
        console.log(" %c Route change: ","font-weight:bold;",to.path);

        function changeTitle(title){
            document.title = ( title || defaultTitle )
        }

        changeTitle(transition.to.title);
        $(document).on('change_title',function (e,data) {
            changeTitle(data);
        });

        transition.next();
    })
}