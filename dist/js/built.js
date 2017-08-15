/**
 * Created by Administrator on 2016/11/10.
 */
!(function($,doc) {
    var pageIndex = 0;
    $("#btn").on("click", function (e) {
        e.stopPropagation();
        $.ajax({
            url: "/limitAll",
            type: "post",
            data: {pageIndex: pageIndex},
            success: function (data) {
                pageIndex++;
                console.log(data);
            }
        });
    });
})(jQuery,document);