/**
 * Created by Administrator on 2016/11/10.
 */
var common = require("../../webconfig/common");
var apiUrl = require("../../webconfig/ApiUrl");
var Client = require('node-rest-client').Client;
var client = new Client();
var args = { headers: { "Content-Type": "application/json" } };
var Extends = require("../../extends/helper/Extends");

var userInfo = require("../../model/user/user");

var jsonWrite = function(res, ret) {
    if (typeof ret === "undefined") {
        res.json({
            code: "1",
            msg: "操作失败"
        });
    } else {
        res.json(ret);
    }
};
module.exports = {
    login: function(req, res, next) {
        /*
        * agentId:合作做壁虎提供
        * userName：自己平台登录提供
        * secretKey:合作做壁虎提供
        * timestamp:时间戳
        * timeout:session过期时间
        * SecCode:校验码 MD5加密 转大写
        * */
        var con = ["agentId=87974","userName=" + req.body.name, "secretKey=0b9d06e53c7", "timestamp=1494056502","timeout=1300"];
        var data = { userName: req.body.name,agentId:87974 , "timestamp":1494056502,"timeout": 1300,SecCode: Extends.MD5(con.join("&")).toUpperCase() };
        args.data = data;
        client.post(common.UniteUrl + apiUrl.UniteLogin, args, function(data, response,body) {
            if(response.statusCode==200){
                if(data.code==200) {
                    req.session.user=userInfo.userInfo({});
                    req.session.token = data.Token;
                    req.session.agentId = data.agentId;
                    jsonWrite(res, { BusinessStatus: 1, StatusMessage: "成功" });
                }
                else{
                    jsonWrite(res, { BusinessStatus: 0, StatusMessage: "失败" });
                }
            }
        });
    }
};