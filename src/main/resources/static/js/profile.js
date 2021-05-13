//接口地址
const baseUrl = "http://localhost:9100";

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
    $.ajax({
        type: "get",
        url: baseUrl + "/api/user",
        headers: {"token": localStorage.getExpire("token")},
        dataType: "json",
        success: function (data) {
            if (data.success) {
                var nickname = data.data.nickname;
                var github = data.data.github;
                var website = data.data.website;
                var about = data.data.about;
                if (nickname != null && nickname !== '') {
                    $("#nickname").val(nickname);
                }
                if (github != null && github !== '') {
                    $("#github").val(github);
                }
                if (website != null && website !== '') {
                    $("#website").val(website);
                }
                if (about != null && about !== '') {
                    $("#about").val(about);
                }
            }
        },
        error: function (err) {
            window.location.href = "/";
        }
    })
});

function DogChatProfile() {
    //form表单序列化json数据
    const nickname = $("#nickname").val();
    const github = $("#github").val();
    const website = $("#website").val();
    const about = $("#about").val();
    if (nickname === '') {
        return;
    }
    const data = {
        nickname: nickname,
        github: github,
        website: website,
        about: about,
    };
    $.ajax({
        type: "put",
        url: baseUrl + "/api/user",
        contentType: 'application/json;charset=UTF-8',
        headers: {"token": localStorage.getExpire("token")},
        data: JSON.stringify(data),
        dataType: "json",
        success: function (data) {
            if (data.success) {
                window.location.href = "/";
            }
        },
        error: function (err) {
            window.location.href = "/";
        }
    })
}