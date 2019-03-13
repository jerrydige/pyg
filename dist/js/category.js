"use strict";

$(function () {
  var CateDatas; //全局变量

  init();

  function init() {
    categories();
    eventList();
  }

  function eventList(params) {
    $(".left_menu").on("tap", "li", function () {
      $(this).addClass("active").siblings().removeClass("active");
      var index = $(this).index();
      renderRight(index);
    });
  }

  function categories() {
    $.get("http://api.pyg.ak48.xyz/api/public/v1/categories", function (result) {
      if (result.meta.status == 200) {
        CateDatas = result.data;
        renderLeft();
        renderRight(0);
      } else {
        console.log("失败", result);
      }
    });
  }

  function renderLeft() {
    var leftHtml = "";

    for (var i = 0; i < CateDatas.length; i++) {
      var tmpHtml = "\n                <li class=\"".concat(i == 0 ? "active" : "", "\">\n                    ").concat(CateDatas[i].cat_name, "\n                </li>\n            ");
      leftHtml += tmpHtml;
    }

    $(".left_menu").html(leftHtml);
  }

  function renderRight(index) {
    var item2Obj = CateDatas[index];
    var rightData = item2Obj.children;
    var rightHtml = template("rightTpl", {
      arr: rightData
    });
    $(".right_box").html(rightHtml);
    var imgLength = $(".right_box img").length;
    $(".right_box img").on("load", function () {
      imgLength--;

      if (imgLength === 0) {
        var rightScroll = new IScroll(".right_box");
      }
    });
  }
});
//# sourceMappingURL=category.js.map
