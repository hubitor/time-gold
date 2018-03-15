/**
 * 操作cookie的相关方法
 */
let CookieUtil = {
    /**
     * 设置cookie
     * @param sKey    cookie键名
     * @param sValue  cookie键值
     * @param oOpts   cookie选项
     */
    set: function(sKey, sValue, oOpts) {
        var arr = [];
        var d, t;
        var cfg = Object.assign({}, {
            expire: null, //有效期，单位秒
            path: '/',
            domain: null,
            secure: null,
            encode: true
        },
        oOpts
        );
        if (cfg.encode == true) {
            sValue = escape(sValue);
        }
        arr.push(sKey + '=' + sValue);
        if (cfg.path != null) {
            arr.push('path=' + cfg.path);
        }
        if (cfg.domain != null) {
            arr.push('domain=' + cfg.domain);
        }
        if (cfg.secure != null) {
            arr.push(cfg.secure);
        }
        if (cfg.expire != null) {
            d = new Date();
            t = d.getTime() + cfg.expire * 1000;
            d.setTime(t);
            arr.push('expires=' + d.toGMTString());
        }
        document.cookie = arr.join(';');
    },
    /**
     * 获取cookie值
     * @param sKey   cookie键名
     * @returns {*}
     */
    get: function(sKey) {
        sKey = sKey.replace(/([\.\[\]\$])/g, '\\$1');
        var rep = new RegExp(sKey + '=([^;]*)?;', 'i');
        var co = document.cookie + ';';
        var res = co.match(rep);
        if (res) {
            return res[1] || '';
        } else {
            return '';
        }
    },
    /**
     * 移除cookie
     * @param sKey    cookie键名
     * @param oOpts   cookie选项
     */
    remove: function(sKey, oOpts) {
        oOpts = oOpts || {};
        oOpts.expire = -10;
        this.set(sKey, '', oOpts);
    }
};

export default CookieUtil;