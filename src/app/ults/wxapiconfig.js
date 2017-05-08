(function () {
    var https = window.location.href.search(/^https:/) >= 0;
    var isReady = false;
    var Ajax = function () {
        function request(opt) {
            function fn() {
            }

            var url = opt.url || "";
            var async = opt.async !== false, method = opt.method || 'GET', data = opt.data
                || null, success = opt.success || fn, error = opt.failure
                || fn;
            method = method.toUpperCase();
            if (method == 'GET' && data) {
                var args = "";
                if (typeof data == 'string') {
                    //alert("string")
                    args = data;
                } else {
                    //alert("object")
                    var arr = new Array();
                    for (var k in data) {
                        var v = data[k];
                        arr.push(k + "=" + v);
                    }
                    args = arr.join("&");
                }
                url += (url.indexOf('?') == -1 ? '?' : '&') + args;
                data = null;
            }
            var xhr = window.XMLHttpRequest ? new XMLHttpRequest()
                : new ActiveXObject('Microsoft.XMLHTTP');
            xhr.onreadystatechange = function () {
                _onStateChange(xhr, success, error);
            };
            xhr.open(method, url, async);
            if (method == 'POST') {
                xhr.setRequestHeader('Content-type',
                    'application/x-www-form-urlencoded;');
            }
            xhr.send(data);
            return xhr;
        }

        function _onStateChange(xhr, success, failure) {
            if (xhr.readyState == 4) {
                var s = xhr.status;
                if (s >= 200 && s < 300) {
                    success(xhr);
                } else {
                    failure(xhr);
                }
            } else {
            }
        }

        return {
            request: request
        };
    }();
    var init = function (callback) {
        // noncestr 生成随机字符串
        var createNonceStr = function () {
            return Math.random().toString(36).substr(2, 15);
        };

        // timestamp 取当前时间戳
        var createTimeStamp = function () {
            return parseInt(new Date().getTime() / 1000) + '';
        };

        //取当前页面url，不包含#部分
        var getCurrentUrl = function () {
            var url = location.href;
            // var url = location.href.replace(/\/\?#\//g, '/hash/').split('#')[0].replace(/\/hash\//g, '/?#/');
            return url;
        };

        var url = encodeURIComponent(getCurrentUrl());

        var ajaxSuccess = function (xhr) {
            var json = JSON.parse(xhr.responseText);
            var signature = json.signature;
            var nonceStr = json.nonceStr;
            var timestamp = json.timestamp;
            var appid = json.appid;
            var signParm = {"noncestr": nonceStr, "timestamp": timestamp, "signature": signature, "appid": appid};
            callback(signParm);
        };

        Ajax.request({
            url: (https ? 'https' : 'http' ) + '://www.gzyueyun.com/yueyunapi/wx/WxSignController/getSign.hn',
            data: {url: url},
            success: ajaxSuccess
        });

    };
    var onInit = function (signParm) {
        var script = document.createElement('script');
        script.setAttribute('src', 'assets/js/jweixin-1.0.0.js');
        script.onload = function () {
            var appid = signParm.appid,
                timestamp = signParm.timestamp,
                noncestr = signParm.noncestr,
                signature = signParm.signature;
            var apilist = ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone"];
            wx.config({
                debug: false,
                appId: appid,
                timestamp: timestamp,
                nonceStr: noncestr,
                signature: signature,
                jsApiList: apilist
            });
            isReady = true;
        };
        document.body.appendChild(script);
    };
    init(onInit);

    var install = function (options) {
        var initWxApi = function (options) {
            wx.ready(function () {
                var shareConfig = {
                    title: options.title, // 分享标题
                    desc: options.desc, // 分享描述
                    link: options.url, // 分享链接
                    imgUrl: options.logo, // 分享图标
                    success: function () {
                        // 用户确认分享后执行的回调函数
                    },
                    cancel: function () {
                        // 用户取消分享后执行的回调函数
                    }
                };

                // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后
                wx.onMenuShareTimeline(shareConfig);
                wx.onMenuShareAppMessage(shareConfig);
            });

            wx.error(function (res) {
                // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            });
        };

        var interValId = setInterval(function () {
            if (isReady) {
                clearInterval(interValId);
                initWxApi(options);
            }
        }, 100);
    };
    module.exports = install
})()

