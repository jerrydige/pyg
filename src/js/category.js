$(function () {

    let CateDatas; //全局变量

    init();

    function init() {
        categories();
        eventList();
    }


    function eventList(params) {
        $(".left_menu").on("tap", "li", function () {
            $(this).addClass("active").siblings().removeClass("active");

            let index = $(this).index();
            renderRight(index);
        })
    }

    function categories() {
        $.get("http://api.pyg.ak48.xyz/api/public/v1/categories", result => {
            if (result.meta.status == 200) {
                CateDatas = result.data;
                renderLeft();
                renderRight(0);
            } else {
                console.log("失败", result)
            }
        })
    }

    function renderLeft() {
        let leftHtml = "";
        for (let i = 0; i < CateDatas.length; i++) {
            let tmpHtml = `
                <li class="${i == 0 ? "active":""}">
                    ${CateDatas[i].cat_name}
                </li>
            `;
            leftHtml += tmpHtml;
        }
        $(".left_menu").html(leftHtml);
    }

    function renderRight(index) {

        let item2Obj = CateDatas[index];

        let rightData = item2Obj.children;

        let rightHtml = template("rightTpl", {
            arr: rightData
        });
        $(".right_box").html(rightHtml);

        let imgLength = $(".right_box img").length;

        $(".right_box img").on("load", function () {
            imgLength--;

            if (imgLength === 0) {
                let rightScroll = new IScroll(".right_box");
            }
        })
    }
})