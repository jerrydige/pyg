$(function () {
  init();

  function init() {
    swiperdata();
    catitems();
    goodslist();
  }

  // 轮播图
  function swiperdata() {
    $.ajax({
      url: "http://api.pyg.ak48.xyz/api/public/v1/home/swiperdata",
      type: "get",
      success: function (result) {
        if (result.meta.status === 200) {
          let data = result.data;
          let html = template("swiperTpl", { arr: data });
          $(".pyg_slide").html(html);

          var gallery = mui('.mui-slider');
          gallery.slider({
            interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
          });
        } else {
          console.log("失败", result);
        }
      }
    })
  }

  // 分类
  function catitems() {
    $.get("http://api.pyg.ak48.xyz/api/public/v1/home/catitems", result => {
      if (result.meta.status === 200) {
        let data = result.data;
        let html = "";
        for (let i = 0; i < data.length; i++) {
          let tmpHtml = `
        <a href="javascript:;">
        <img src="${data[i].image_src}" alt="">
        </a>
        `;
          html += tmpHtml;
        }
        $(".pyg_cates").html(html);

      } else {
        console.log("失败", result);
      }
    });
  }

  // 商品列表
  function goodslist() {
    $.get("http://api.pyg.ak48.xyz/api/public/v1/home/goodslist",result=>{
        if(result.meta.status==200){
          let data = result.data;
          let html = template("listTpl",{arr:data});
          $(".pyg_goodslist").html(html);
        } else {
          console.log("失败", result);
        }
    })
  }
})