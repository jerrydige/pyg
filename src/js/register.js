$(function() {
    init();
    function init() {
        eventList();
    }
    function eventList() {
        $(".get_code_btn").on("tap",function() {
            let mobile_txt = $("input[name='mobile']").val().trim();

            if(!checkPhone(mobile_txt)){
                mui.toast("手机号码错误");
                return;
            }
            $.post("http://api.pyg.ak48.xyz/api/public/v1/users/get_reg_code",{
                mobile:mobile_txt
            },function(result) {
                if(result.meta.status == 200){
                    console.log(result);
                    $(".get_code_btn").attr("disabled","disabled");

                    let time = 5;
                    $(".get_code_btn").text(`${time} 秒后再获取`);
                    let timeId = setInterval(()=>{
                        time--;
                        $(".get_code_btn").text(`${time} 秒后再获取`);
                        if(time == 0 ){
                            clearInterval(timeId);
                            $(".get_code_btn").removeAttr("disabled").text("获取验证码");
                        }
                    },1000)
                } else {
                    console.log("失败",result);
                }
            })
        })

        $(".register_btn").on("tap",function() {
            let mobile_text = $("input[name='mobile']").val().trim();
            let code_text = $("input[name='code']").val().trim();
            let email_text = $("input[name='email']").val().trim();
            let pwd_text = $("input[name='pwd']").val().trim();
            let pwd2_text = $("input[name='pwd2']").val().trim();
            let gender_text = $("input[name='gender']").val().trim();


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

            $.post("http://api.pyg.ak48.xyz/api/public/v1/users/reg",{
                mobile: mobile_text,
                code: code_text,
                email: email_text,
                pwd: pwd_text,
                gender: gender_text
            },function(result) {
                if(result.meta.status == 200){
                    mui.toast("注册成功");
                    setTimeout(() => {
                        location.href = "login.html";
                    }, 1000);
                } else {
                    mui.toast(result.meta.msg);
                }
            })
        })
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
})