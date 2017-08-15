function tool() {}
var _pro = tool.prototype;
_pro.isObject = function(obj) {
    return (typeof obj == 'object') && obj.constructor == Object;
};
_pro.isString = function(str) {
    return (typeof str == 'string') && str.constructor == String;
};
_pro.setTemStorage = function(key, value) {
    var _this = this;
    if (!window.localStorage) {
        alert("建议您使用高版本浏览器：IE8+,FireFox,Chrome");
    }
    if (!_this.isString(value)) {
        localStorage.setItem(key, JSON.stringify(value));
    } else {
        localStorage.setItem(key, value);
    }
};
_pro.getTemStorage = function(key) {
    if (!window.localStorage) {
        alert("建议您使用高版本浏览器：IE8+,FireFox,Chrome");
    }
    var tem = localStorage.getItem(key);
    if (!tem) {
        return;
    }
    return JSON.parse(tem);
};
_pro.getCityName = function(val) {
    var _this = this;
    if (!val) {
        return "";
    }
    val = _this.GetPrivenceName(val);
    var citys = Enum.citys;
    var len = citys.length;
    for (var i = 0; i < len; i++) {
        if (citys[i][val]) {
            val = citys[i][val];
            break;
        }
    }
    return val;
}
_pro.GetPrivenceName = function(val) {
    var privence = "";
    $.each(Enum.privence, function(i, obj) {
        if (obj.p == val) {
            privence = obj.p;
            return;
        } else {
            $.each(obj.c, function(j, item) {
                if (item.n == val) {
                    privence = obj.p;
                    return;
                }
            });
        }
    });
    return privence;
}
_pro.isLicenseNo = function(val) {
    if (!val) return false;
    var reg = /^[\u4e00-\u9fa5]{1}[A-z]{1}[\da-zA-Z]{4,5}$/;
    return reg.test(val);
}

function _tadInitTool() {
    return new tool();
};
window.tadTool = _tadInitTool();