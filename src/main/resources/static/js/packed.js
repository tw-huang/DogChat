$(document).ready(function () {


    //激活动态菜单
    function activateSemantics() {
        $('.ui.dropdown').dropdown();
        $('.ui.checkbox').checkbox();
        $('.ui.accordion').accordion();
        $('.message .close').on('click', function () {
            $(this).closest('.message').transition('fade');
        });
        $('#toggle-sidebar').on('click', function () {
            $('.menu.sidebar').sidebar('setting', 'transition', 'overlay').sidebar('toggle');
        });
        $('#show-help-modal').on('click', function () {
            $('.ui.modal.help').modal({blurring: true}).modal('show');
        });
        $('#show-snippet-modal').on('click', function () {
            $('.ui.modal.snippet').modal({blurring: true}).modal('show');
        });
        $('#show-about-modal').on('click', function () {
            $('.ui.modal.about').modal({blurring: true}).modal('show');
        });
        $('.pop-card').popup({
            inline: true,
            on: 'hover',
            hoverable: true,
            html: popupLoading,
            delay: {show: 200, hide: 200},
            onShow: function () {
                var popup = this;
                popup.html(popupLoading);
                $.get({url: $(popup).prev().data('href')}).done(function (data) {
                    popup.html(data);
                }).fail(function () {
                    popup.html('Failed to load profile.');
                });
            }
        });
    }

    function init() {
        if (typeof (WebSocket) === "undefined") {
            alert("您的浏览器不支持WebSocket! 请使用Chrome、Firefox等浏览器。")
        }
        activateSemantics();

    }

    //初始化入口
    init();
});