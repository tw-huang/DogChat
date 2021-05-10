const baseUrl = "http://localhost:9100";

$(document).ready(function () {
    var popupLoading = '<i class="notched circle loading icon green"></i> loading...';

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

//表单校验
$(document).ready(function () {
    //注册表单校验
    $('#registerForm').form({
        inline: true,
        fields: {
            nickname: {
                identifier: 'nickname',
                rules: [{type: 'empty', prompt: '请输入昵称'}, {
                    type: 'maxLength[20]',
                    prompt: '昵称不能超过20个字符'
                }]
            },
            email: {
                identifier: 'email',
                rules: [{type: 'empty', prompt: '请输入邮箱地址'}, {
                    type: 'email',
                    prompt: '请检查邮箱格式'
                }]
            },
            password: {
                identifier: 'password',
                rules: [{type: 'empty', prompt: '请输入登录密码'}, {
                    type: 'minLength[6]',
                    prompt: '密码长度为6-20位'
                }]
            },
            password2: {
                identifier: 'password2',
                rules: [{type: 'empty', prompt: '请重复输入登录密码'}, {
                    type: 'minLength[6]',
                    prompt: '密码长度为6-20位'
                }, {
                    type: 'match[password]',
                    prompt: '重复输入密码不匹配'
                }]
            }
        }
    });
});

//帐号注册
function DogChatRegister() {
    //form表单序列化json数据
    const nickname = $("#nickname").val();
    const email = $("#email").val();
    const password = $("#password").val();
    const password2 = $("#password2").val();
    if (password !== password2) {
        return;
    }
    const data = {
        nickname: nickname,
        email: email,
        password: password,
    };
    $.ajax({
        type: "post",
        url: baseUrl + "/api/user/signUp",
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify(data),
        dataType: "json",
        success: function (data) {
            if (data.success) {
                window.location.href = "/login";
            }
        },
        error: function (err) {
            window.location.href = "/register";
        }
    })
}

//帐号登录
function DogChatLogin() {
    //form表单序列化json数据
    const email = $("#email-input").val();
    const password = $("#password-input").val();
    const data = {
        email: email,
        password: password,
    };
    console.log(data);
    $.ajax({
        type: "post",
        url: baseUrl + "/api/user/signIn",
        contentType: 'application/json;charset=UTF-8',
        data: JSON.stringify(data),
        dataType: "json",
        success: function (data) {
            if (data.success) {
                const token = data.data.token;
                window.localStorage.setItem("token", token);
                window.location.href = "/";
            }
        },
        error: function (err) {
            window.location.href = "/login";
        }
    })
}


