"use strict";

$(function () {
  init();

  function init() {
    eventList();
  }

  function eventList() {
    $(".get_code_btn").on("tap", function () {
      var mobile_txt = $("input[name='mobile']").val().trim();

      if (!checkPhone(mobile_txt)) {
        mui.toast("手机号码错误");
        return;
      }

      $.post("http://api.pyg.ak48.xyz/api/public/v1/users/get_reg_code", {
        mobile: mobile_txt
      }, function (result) {
        if (result.meta.status == 200) {
          console.log(result);
          $(".get_code_btn").attr("disabled", "disabled");
          var time = 5;
          $(".get_code_btn").text("".concat(time, " \u79D2\u540E\u518D\u83B7\u53D6"));
          var timeId = setInterval(function () {
            time--;
            $(".get_code_btn").text("".concat(time, " \u79D2\u540E\u518D\u83B7\u53D6"));

            if (time == 0) {
              clearInterval(timeId);
              $(".get_code_btn").removeAttr("disabled").text("获取验证码");
            }
          }, 1000);
        } else {
          console.log("失败", result);
        }
      });
    });
    $(".register_btn").on("tap", function () {
      var mobile_text = $("input[name='mobile']").val().trim();
      var code_text = $("input[name='code']").val().trim();
      var email_text = $("input[name='email']").val().trim();
      var pwd_text = $("input[name='pwd']").val().trim();
      var pwd2_text = $("input[name='pwd2']").val().trim();
      var gender_text = $("input[name='gender']").val().trim();

      if (!checkPhone(mobile_text)) {
        mui.toast("手机号码错误");
        return;
      }

      if (code_text.length != 4) {
        mui.toast("验证码不合法");
        return;
      }

      if (!checkEmail(email_text)) {
        mui.toast("邮箱不合法");
        return;
      }

      if (pwd_text.length < 6) {
        mui.toast("密码格式不对");
        return;
      }

      if (pwd2_text != pwd_text) {
        mui.toast("两次密码不一致！");
        return;
      }

      $.post("http://api.pyg.ak48.xyz/api/public/v1/users/reg", {
        mobile: mobile_text,
        code: code_text,
        email: email_text,
        pwd: pwd_text,
        gender: gender_text
      }, function (result) {
        if (result.meta.status == 200) {
          mui.toast("注册成功");
          setTimeout(function () {
            location.href = "login.html";
          }, 1000);
        } else {
          mui.toast(result.meta.msg);
        }
      });
    });
  }

  function checkPhone(phone) {
    if (!/^1[34578]\d{9}$/.test(phone)) {
      return false;
    } else {
      return true;
    }
  }

  function checkEmail(myemail) {
    var myReg = /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;

    if (myReg.test(myemail)) {
      return true;
    } else {
      return false;
    }
  }
});
//# sourceMappingURL=register.js.map
