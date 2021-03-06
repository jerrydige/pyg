"use strict";

$(function () {
  var QueryObj = {
    query: "",
    cid: getUrl("cid"),
    pagenum: 1,
    pagesize: 10
  };
  var TotalPage = 1;
  init();

  function init() {
    eventList();
    mui.init({
      pullRefresh: {
        container: ".pyg_view",
        down: {
          auto: true,
          callback: function callback() {
            var cb = function cb(data) {
              var html = template("mainTpl", {
                arr: data
              });
              console.log(html);
              $(".list").html(html);
              mui(".pyg_view").pullRefresh().endPulldownToRefresh();
              mui('.pyg_view').pullRefresh().refresh(true);
            };

            QueryObj.pagenum = 1;
            goodsSearch(cb);
          }
        },
        up: {
          callback: function callback() {
            if (QueryObj.pagenum >= TotalPage) {
              mui(".pyg_view").pullRefresh().endPullupToRefresh(true);
            } else {
              QueryObj.pagenum++;

              var cb = function cb(data) {
                var html = template("mainTpl", {
                  arr: data
                });
                $(".list").append(html);
                mui(".pyg_view").pullRefresh().endPullupToRefresh(false);
              };

              goodsSearch(cb);
            }
          }
        }
      }
    });
  }

  function eventList() {
    $(".list").on("tap", "a", function () {
      var href = this.href;
      location.href = href;
    });
  }

  function goodsSearch(func) {
    $.get("http://api.pyg.ak48.xyz/api/public/v1/goods/search", QueryObj, function (result) {
      if (result.meta.status == 200) {
        var data = result.data.goods;
        TotalPage = Math.ceil(result.data.total / QueryObj.pagesize);
        console.log(TotalPage);
        func(data);
      } else {
        console.log("失败", result);
      }
    });
  }

  function getUrl(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
  }
});
//# sourceMappingURL=goods_list.js.map
