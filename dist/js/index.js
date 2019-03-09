"use strict";

$(function () {
  init();

  function init() {
    swiperdata();
    catitems();
  } // 轮播图


  function swiperdata() {
    $.ajax({
      url: "http://api.pyg.ak48.xyz/api/public/v1/home/swiperdata",
      type: "get",
      success: function success(result) {
        if (result.meta.status === 200) {
          var data = result.data;
          var html = template("swiperTpl", {
            arr: data
          });
          $(".pyg_slide").html(html);
          var gallery = mui('.mui-slider');
          gallery.slider({
            interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；

          });
        } else {
          console.log("失败", result);
        }
      }
    });
  } // 分类


  function catitems() {
    $.get("http://api.pyg.ak48.xyz/api/public/v1/home/catitems", function (result) {
      if (result.meta.status === 200) {
        var data = result.data;
        var html = "";

        for (var i = 0; i < data.length; i++) {
          var tmpHtml = "\n        <a href=\"javascript:;\">\n        <img src=\"".concat(data[i].image_src, "\" alt=\"\">\n        </a>\n        ");
          html += tmpHtml;
        }

        $(".pyg_cates").html(html);
      } else {
        console.log("失败", result);
      }
    });
  }
});
//# sourceMappingURL=index.js.map
