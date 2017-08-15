var crypto = require("crypto");
module.exports = {
    MD5: function MD5(str, type) {
        type = type || "utf8";
        var SecCode = "";
        var md5sum = crypto.createHash("md5");
        md5sum.update(str, type);
        return md5sum.digest("hex");
    },
    ToQueryString: function(obj) {
        var _this = this;
        if (typeof obj == "object") {
            var tmp = [];
            for (item in obj) {
                tmp.push(item + "=" + obj[item]);
            }
            obj.SecCode = _this.MD5(tmp.join("&"));
        }
        return obj;
    }
};