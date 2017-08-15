/**
 * Created by Administrator on 2016/11/10.
 */
!(function($, doc) {
    //缓存获取不到city 重新掉接口获取
    function reGetCity() {
        $.ajax({
            url: '/GetCityListAndSource',
            type: "GET",
            cache: false,
            success: function(resd) {
                if (resd == 0) {
                    return;
                }
                if (resd.BusinessStatus === 1) {
                    if (!resd.AgentCity && resd.AgentCity.length <= 0) {
                        console.log("无法获取到投保地区资源，请联系客服人员！");
                        return;
                    }
                    tadTool.setTemStorage(Enum.AreaInfo, JSON.stringify(resd.AgentCity));
                }
            }
        });
    }
    reGetCity();
})(jQuery, document);