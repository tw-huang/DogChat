//接口地址
const baseUrl = "http://localhost:9100";
const wsUrl = "ws://localhost:9100";
//token过期时间（24小时）
const expireToken = 24 * 60 * 60 * 1000;

Storage.prototype.setExpire = (key, value, expire) => {
    let obj = {
        data: value,
        time: Date.now(),
        expire: expire
    };
    //localStorage 设置的值不能为对象,转为json字符串
    localStorage.setItem(key, JSON.stringify(obj));
};
Storage.prototype.getExpire = key => {
    let val = localStorage.getItem(key);
    if (!val) {
        return val;
    }
    val = JSON.parse(val);
    if (Date.now() - val.time > val.expire) {
        localStorage.removeItem(key);
        return null;
    }
    return val.data;
};

$(document).ready(function () {
    var popupLoading = '<i class="notched circle loading icon green"></i> loading...';

    var pageNo = 1;
    var pageSize = 20;

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

    //渲染一条消息
    function renderMsg(item) {
        if (item.quoteMessageId) {
            var html = "  <div class=\"msg-box\">\n" +
                "                <div class=\"picture\">\n" +
                "                    <img class=\"pop-card\" data-position=\"right center\" data-offset=\"-40\" data-href=\"/user/637\"\n" +
                "                         src=\"" + item?.user?.avatar + "\" alt=\"user\">\n" +
                "                </div>\n" +
                "                <div class=\"msg\">\n" +
                "                    <span class=\"nickname\">" + item?.user?.nickname + "</span>\n" +
                "                    <small class=\"timestamp\"><span class=\"\" \n" +
                "                                                   style=\"\">" + item?.pushTime + "\n" +
                "                                </span></small>\n" +
                "                    <span class=\"message-body\">\n" +
                "                            <blockquote>\n" +
                "                                <p>" + item?.quoteMessage?.body + "</p>\n" +
                "                            </blockquote>\n" +
                "                            <p>" + item?.body + "</p>\n" +
                "                        </span>\n" +
                "                </div>\n" +
                "\n" +
                "                <div class=\"ui icon left center pointing dropdown ellipsis-icon\" tabindex=\"0\">\n" +
                "                    <i class=\"ellipsis horizontal icon\"></i>\n" +
                "                    <div class=\"menu\" data-offset=\"-33\" tabindex=\"-1\">\n" +
                "                        <div class=\"item quote-button\"><i class=\"quote left icon\"></i> Quote</div>\n" +
                "\n" +
                "                        <div class=\"item delete-button\" data-href=\"/message/delete/3171\"\n" +
                "                             onclick=\"confirm(&#39;Are you sure?&#39;)\"><i class=\"delete icon\"></i> Delete\n" +
                "                        </div>\n" +
                "\n" +
                "                    </div>\n" +
                "                </div>\n" +
                "\n" +
                "            </div>";
            $("#message-container").append(html);
        } else {
            var html = "            <div class=\"msg-box\">\n" +
                "                <div class=\"picture\">\n" +
                "                    <img class=\"pop-card\" data-position=\"right center\" data-offset=\"-40\" data-href=\"/user/637\"\n" +
                "                         src=\"" + item?.user?.avatar + "\" alt=\"user\">\n" +
                "                </div>\n" +
                "                <div class=\"msg\">\n" +
                "                    <span class=\"nickname\">" + item?.user?.nickname + "</span>\n" +
                "                    <small class=\"timestamp\"><span class=\"\" \n" +
                "                                                   style=\"\">" + item?.pushTime + "\n" +
                "                                </span></small>\n" +
                "                    <span class=\"message-body\">\n" +
                "                            <p>" + item?.body + "</p>\n" +
                "                        </span>\n" +
                "                </div>\n" +
                "\n" +
                "                <div class=\"ui icon left center pointing dropdown ellipsis-icon\" tabindex=\"0\">\n" +
                "                    <i class=\"ellipsis horizontal icon\"></i>\n" +
                "                    <div class=\"menu\" data-offset=\"-33\" tabindex=\"-1\">\n" +
                "                        <div class=\"item quote-button\"><i class=\"quote left icon\"></i> Quote</div>\n" +
                "\n" +
                "                        <div class=\"item delete-button\" data-href=\"/message/delete/3170\"\n" +
                "                             onclick=\"confirm(&#39;Are you sure?&#39;)\"><i class=\"delete icon\"></i> Delete\n" +
                "                        </div>\n" +
                "\n" +
                "                    </div>\n" +
                "                </div>\n" +
                "\n" +
                "            </div>";
            $("#message-container").append(html);
        }
    }

    //渲染统计人数
    function renderSignUp(onlineCount, registerCount) {
        if (onlineCount != null) {
            $("#onlineCount").replaceWith("<i id=\"onlineCount\">" + onlineCount + "</i>");
        }
        if (registerCount != null) {
            $("#signUpCount").replaceWith("<i id=\"signUpCount\">" + registerCount + "</i>");
        }
    }

    function isLogin() {
        let expire = localStorage.getExpire("token");
        var msgHtml = "";
        if (expire) {
            msgHtml = "            <div class=\"field fluid message-box\">\n" +
                "                    <img class=\"pop-card input-avatar\" data-position=\"bottom left\" data-href=\"/profile/637\"\n" +
                "                         src=\"\">\n" +
                "                    <input id=\"message-textarea\"\n" +
                "                              placeholder=\"Write your message here... Enter to send\"/>\n" +
                "                </div>";
            //动态渲染底部
            $("#message-input").append(msgHtml);
            joinWebsocket(expire);

        } else {
            msgHtml = "       <div class=\"field fluid message-box\">\n" +
                "                    <div class=\"ui floating message\">请先 <a href=\"/login\">登录</a> 或者\n" +
                "                        <a href=\"/register\">注册</a> 再愉快聊天\n" +
                "                    </div>\n" +
                "                </div>";
            //动态渲染底部
            $("#message-input").append(msgHtml);
        }
    }

    function joinWebsocket(token) {
        const url = wsUrl + "/api/user/" + token;
        var ws = new WebSocket(url);
        ws.onopen = function () {
            console.log("ws_onopen");
        };
        ws.onmessage = function (evt) {
            var json = JSON.parse(evt.data);
            if (json.success) {
                if (json.msg === "ConnectSuccess") {
                    console.log("ConnectSuccess");
                    console.log(json.data);
                    renderSignUp(json.data, null);
                }
                if (json.msg === "ConnectClose") {
                    console.log("ConnectClose");
                    console.log(json.data);
                    renderSignUp(json.data, null);
                }
                if (json.msg === "ReceiveMessage") {
                    console.log("ReceiveMessage");
                    renderMsg(json.data);
                }
            }

        };
        ws.onclose = function () {
            console.log("ws_onclose");
        };

        $("#message-textarea").bind('keyup', function (event) {
            //回车事件
            if (event.keyCode === 13) {
                var msg = $("#message-textarea").val();
                if (msg === null || msg === undefined || msg === '' || msg === ' ') {
                    return;
                }
                const json = {
                    body: msg
                };
                ws.send(JSON.stringify(json));
                //清空值
                $("#message-textarea").val("");
            }
        });
    }

    function getMessage() {
        $.ajax({
            type: "get",
            url: baseUrl + "/api/message",
            data: {pageNo: pageNo, pageSize: pageSize},
            dataType: "json",
            success: function (data) {
                if (data.success) {
                    // console.log(data);
                    var records = data.data.records;
                    records.map(function (item, index, ary) {
                        renderMsg(item);
                    })
                }
            },
            error: function (err) {
                window.location.href = "/";
            }
        })
    }

    function getSignUp() {
        $.ajax({
            type: "get",
            url: baseUrl + "/api/user/signUp",
            data: {},
            dataType: "json",
            success: function (data) {
                if (data.success) {
                    var dataMap = data.data;
                    if (dataMap != null) {
                        renderSignUp(dataMap.onlineCount, dataMap.registerCount);
                    }
                }
            },
            error: function (err) {
                window.location.href = "/";
            }
        })
    }

    function init() {
        if (typeof (WebSocket) === "undefined") {
            alert("您的浏览器不支持WebSocket! 请使用Chrome、Firefox等浏览器。")
        }
        //统计人数
        getSignUp();
        //获取数据
        getMessage();
        //是否登录
        isLogin();
        //激活动态菜单
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
                localStorage.setExpire("token", token, expireToken);
                window.location.href = "/";
            }
        },
        error: function (err) {
            window.location.href = "/login";
        }
    })
}


