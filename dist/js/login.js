"use strict";

$(function () {
  init();

  function init() {
    eventList();
  }

  function eventList() {
    $(".login_btn").on("tap", function () {
      var username_text = $("input[name='username']").val().trim();
      var password_text = $("input[name='password']").val().trim();

      if (!checkPhone(username_text)) {
        mui.toast("手机不合法");
        return;
      }

      if (password_text.length < 6) {
        mui.toast("密码不合法");
        return;
      }

      $.post("http://api.pyg.ak48.xyz/api/public/v1/login", {
        username: username_text,
        password: password_text
      }, function (result) {
        if (result.meta.status == 200) {
          sessionStorage.setItem("userinfo", JSON.stringify(result.data));
          mui.toast("登录成功");
          var pageurl = sessionStorage.getItem("pageurl");

          if (!pageurl) {
            pageurl = "index.html";
          }

          setTimeout(function () {
            location.href = pageurl;
          }, 1000);
        } else {
          mui.toast(result.meta.msg);
        }
      });
    });
  } // 验证 手机合法性


  function checkPhone(phone) {
    if (!/^1[34578]\d{9}$/.test(phone)) {
      return false;
    } else {
      return true;
    }
  }
});
//# sourceMappingURL=login.js.map
