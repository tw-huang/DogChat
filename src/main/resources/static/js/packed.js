$(document).ready(function () {


    function init() {
        if (typeof (WebSocket) === "undefined") {
            alert("您的浏览器不支持WebSocket! 请使用Chrome、Firefox等浏览器。")
        }
        $(window).focus(function () {

        });
    }

    //初始化入口
    init();
});