(function () {
    $.fn.extend({
        /**
         * 获取图片验证码
         * @param url 获取图片验证码的接口链接
         */
        getVcode: function (url, fired) {
            var btn = $(this).click(function () {
                $(this).attr('src', url + '?v=' + (Math.random()));
            });
            fired && btn.click();
            return $(this);
        },
        /**
         * 点击开始倒计时
         * @param options
         */
        clickCountdown: function (options) {
            var defaults = {
                    abort: false, //是否中止，取消倒数，默认false;
                    interval: 60, //时间间隔秒数，默认60s;
                    beforeText: '', //等待期间的显示内容 = beforeText + interval + afterText;
                    afterText: '', //等待期间的显示内容 = beforeText + interval + afterText;
                    countingClass: 'countdown', //倒数期间的class属性
                    endText: null, //等待结束后显示的内容;如果 endText == null，则显示原内容
                    onInit: null, //初化化完成的回调函数
                    onCountInit: null, //倒讲时初始化完成的回调函数
                    onCountStart: null, //开始倒数的回调函数
                    onCountEnd: null //倒数结束的回调函数
                },
                setting = $.extend({}, defaults, options),
                abort = setting.abort,
                interval = setting.interval,
                beforeText = setting.beforeText,
                afterText = setting.afterText,
                endText = setting.endText,
                countingClass = setting.countingClass,
                onInit = setting.onInit,
                onCountInit = setting.onCountInit,
                onCountStart = setting.onCountStart,
                onCountEnd = setting.onCountEnd,
                obj = {
                    target: $(this)
                };
            obj.target.unbind('click').bind('click', function () {
                var check = typeof abort === 'function' ? abort.call(this) : abort;
                if (check) return;
                $(this).countdown({
                    interval: interval,
                    beforeText: beforeText,
                    afterText: afterText,
                    endText: endText,
                    countingClass: countingClass,
                    onInit: onCountInit,
                    onStart: onCountStart,
                    onEnd: onCountEnd
                });
            });
            onInit && onInit(obj);
        },
        /**
         * 倒计时
         * @param options
         */
        countdown: function (options) {
            var defaults = {
                    interval: 60, //时间间隔秒数，默认60s;
                    beforeText: '', //等待期间的显示内容 = beforeText + interval + afterText;
                    afterText: '', //等待期间的显示内容 = beforeText + interval + afterText;
                    endText: null, //等待结束后显示的内容;如果 endText == null，则显示原内容,
                    countingClass: 'countdown', //倒数期间的class属性
                    onInit: null, //初始化完成的回调函数
                    onStart: null, //开始倒数的回调函数
                    onEnd: null //倒数结束的回调函数
                },
                setting = $.extend({}, defaults, options),
                interval = setting.interval,
                beforeText = setting.beforeText,
                afterText = setting.afterText,
                endText = setting.endText,
                countingClass = setting.countingClass,
                onInit = setting.onInit,
                onStart = setting.onStart,
                onEnd = setting.onEnd,
                obj = {
                    target: $(this)
                },
                btn = obj.target;

            if (btn.hasClass(countingClass)) return;

            if (!interval || typeof interval !== "number") interval = 60;
            if (endText == null) endText = btn.text();
            onStart && onStart(obj);
            btn.text(beforeText + interval + 's' + afterText);
            obj.intervalId = setInterval(function () {
                btn.addClass(countingClass).text(beforeText + (--interval) + 's' + afterText);
                if (interval < 0) {
                    obj.finish();
                }
            }, 1000);
            obj.finish = function () {
                clearInterval(this.intervalId);
                btn.removeClass(countingClass).text(endText);
                onEnd && onEnd(obj);
            };
            onInit && onInit(obj);
        },
        /**
         * 提交表单
         * @param fn 提交表单处理函数
         * @param [{Boolean,Function}] discontinue 是否停止提交，为true或函数返回true，则停止注册，默认true;
         */
        submitForm: function (fn, discontinue) {
            return this.unbind('submit').bind('submit', function (e) {
                e.preventDefault();
                var check = discontinue;
                if (typeof discontinue === 'function') check = discontinue.call(this);
                if (!check) return;
                fn.call(this);
            });
        },
        /**
         * 获取表单数据的JSON格式
         * @return {{JSON}}
         */
        serializeJSON: function () {
            var array = $(this).serializeArray(),
                json = {};
            for (var i = 0, len = array.length; i < len; i++) {
                var item = array[i],
                    name = item['name'],
                    value = item['value'];
                json[name] = value;
            }
            return json;
        },
        loginForm: function () {
            return this.each(function () {
                $(this).find('.login-form input').on('blur', function () {
                    $(this).parents('.login-form').loginFormCheckAll();
                })
            });
        },
        loginFormCheckAll: function () {
            var result = true;
            this.each(function () {
                var container = $(this),
                    check = $.loginFormCheck;
                if (!container.hasClass('login-form')) container = container.find('.login-form');

                container.find('input').each(function () {
                    if (!checkAll(this)) result = false;
                });

                function checkAll(obj) {
                    return check.checkInputRequired(obj) &&
                        check.checkInputEqual(obj) &&
                        check.checkInputMaxlength(obj) &&
                        check.checkInputMinlength(obj) &&
                        check.checkInputUsername(obj) &&
                        check.checkInputAccount(obj) &&
                        check.checkInputMobile(obj) &&
                        check.checkInputEmail(obj) &&
                        check.checkInputPattern(obj)
                }
            });
            return result;
        },
        setDisable: function (disable) {
            return this.attr('data-disable', !(disable === false));
        },
        isDisable: function () {
            // var result = false;
            return this.attr('data-disable') == 'true';
            // this.each(function () {
            //     if ($(this).attr('data-disable') == 'true') result = true;
            // });
            // return result;
        },
        /**
         * 历史选项
         */
        historyData: function (options) {
            var defaults = {
                    nameSpace: 'history-data',
                    addBtn: '',
                    max: 5,
                    onSelected: null,
                }, setting = $.extend({}, defaults, options),
                nameSpace = setting.nameSpace + '-',
                containerClass = nameSpace + 'container',
                itemClass = nameSpace + 'item',
                inputClass = nameSpace + 'input',
                max = setting.max,
                addBtn = setting.addBtn,
                onSelected = setting.onSelected;
            if (addBtn) addBtn = $(addBtn);

            this.each(function () {
                var c = $(this),
                    cWidth = c.outerWidth(),
                    cHeight = c.outerHeight(),
                    input = c.find('.' + inputClass);
                var options = $(getList()).css({
                    display: 'none',
                    position: 'absolute',
                    // top: cHeight + 'px',
                    left: 0,
                    width: '100%',
                    listStyle: 'none',
                    overflowX: 'hidden',
                    zIndex: 9
                }).addClass(containerClass).hover(function () {
                    $(this).addClass('active');
                }, function () {
                    $(this).removeClass('active');
                });

                var items = options.children().addClass(itemClass).click(function () {//点击选择
                    input.val($(this).text());
                    options.hide();
                    onSelected && onSelected(input, $(this));
                });

                c.append(options);

                if (items.length) {
                    input.click(function () {//点击显示
                        options.show();
                        items.hide();
                        $(this).keyup();
                    }).keyup(function () {//输入时过滤
                        var val = $(this).val(),
                            cur = null;
                        if (val == '') {
                            cur = items.show(0);
                        } else {
                            cur = items.filter('[data-value*="' + val + '"]').show();
                            items.not(cur).hide(0);
                        }
                        overflow(options, cur);
                    }).blur(function () {//失去焦点时隐藏
                        !options.hasClass('active') && options.hide();
                    });
                }

                //添加记录
                addBtn && addBtn.click(function () {
                    var val = input.val().replace(/(^\s*)|(\s*$)/g, '');
                    if (val == '') return;
                    addData(val);
                });
            });
            //显示条数超出出现滚动条
            function overflow(options, curItems) {
                if (curItems.length > max) {
                    options.css({
                        'height': curItems.outerHeight() * max,
                        'overflowY': 'scroll'
                    });
                } else {
                    options.css({
                        'height': 'auto',
                        'overflowY': 'auto'
                    });
                }
            }

            //添加记录
            function addData(str) {
                var c = getData();
                c = str + (c ? ',' : '') + c;//最新的在最前
                var arr = c.split(',');
                if (arr.length > 20) {//清除旧数据
                    c = '';
                    for (var i = 0, len = 20; i < len; i++) {
                        c += (c ? ',' : '') + arr[i]
                    }
                }
                $.cookie('historyData', c, {expires: 365, path: '/'});
            }

            function getData() {
                return $.cookie('historyData') || '';
            }

            function getArr() {
                var c = getData();
                return c ? getData().split(',') : [];
            }

            function getList() {
                var arr = getArr(),
                    html = '';
                for (var i = 0, len = arr.length; i < len; i++) {
                    html += '<li data-value="' + arr[i] + '">' + arr[i] + '</li>'
                }
                html = '<ul>' + html + '</ul>';
                return html;
            }
        },
    });

    $.extend({
        /**
         * 引入外部文件，获取指定的html
         * 用法1: $.getHtml('tpl.html','#tpl',function(html){$('#container')})
         * @param url {string} 文件路径
         * @param filter {jQueryObject} 获取对象
         * @param callback {function} 成功后回调，传入获取到的html，如果此参数有传，则是异步调用
         * @return {string} 如果callback没有传,则获取到的html,即同步调用
         */
        getHtml: function (url, filter, callback) {
            var result = '';
            var async = !!(typeof callback == 'function');
            $.ajax(url, {
                type: 'GET',
                dataType: 'html',
                async: async,
                success: function (html) {
                    result = $(html).find(filter).html();
                    callback && callback(result);
                }
            });
            if (!async) return result;
        },
        arrayHas: function (str, array, pattern) {
            switch (pattern) {
                case '^':
                    var getPattern = function (str) {
                        return '^(' + str + ')';
                    };
                    break;
                case '*':
                    getPattern = function (str) {
                        return '(' + str + ')';
                    };
                    break;
                case '$':
                    getPattern = function (str) {
                        return '(' + str + ')$';
                    };
                    break;
                default:
                    getPattern = function (str) {
                        return '^(' + str + ')$';
                    };
            }
            var reg = new RegExp();
            for (var i = 0; i < array.length; i++) {
                reg.compile(getPattern(array[i]));
                if (reg.test(str)) return true;
            }
            return false;
        },
        /**
         * 获取url参数部分全部内容
         * @param {String}  被取参数的url,可选，默认为location.href;
         * @returns {JSON} 返回"?"之后的数据
         */
        getURLParams: function (url) {
            if (!url) url = location.href;
            var param = url.replace(/(.*\?)|(#.*)/g, ''),
                paramArray = param ? param.split('&') : [],
                keyValue = "",
                json = "";
            for (var i = 0; i < paramArray.length; i++) {
                var keyValueArray = paramArray[i].split('='),
                    newText = '"' + keyValueArray[0] + '"' + ":" + '"' + keyValueArray[1] + '"';
                keyValue = keyValue == "" ? newText : keyValue + "," + newText;
            }
            if (keyValue != "" && keyValue != ":")
                json == "" ? json = keyValue : json = json + "," + keyValue;
            json = "{" + json + "}";
            return JSON.parse(json);
        },
        /**
         * 转化成链接参数
         * 参数可以是：key,value,key1,value1,key2,value2
         * 也可以是：[{'key':'a','value':'apple'},{'key':'b','value':'blue'}]
         * @return {string} 如：key=value&key1=value1&key2=value2
         */
        parseURLString: function () {
            var len = arguments.length / 2,
                str = '';
            if (Math.round(len) === len) {
                for (var i = 0; i < len; i++) {
                    var key = arguments[i * 2],
                        value = arguments[i * 2 + 1];
                    str += (str ? '&' : '') + key + '=' + value;
                }
            } else if (arguments[0] instanceof Array) {
                var params = arguments[0];
                len = params.length;
                for (var i = 0; i < len; i++) {
                    var item = params[i],
                        key = item['key'],
                        value = item['value'];
                    str += (str ? '&' : '') + key + '=' + value;
                }
            }
            return str
        },
        /**
         * 对Date的扩展，将 Date 转化为指定格式的String
         * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
         * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
         * 例子：
         * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
         * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
         */
        dateFormat: function (date, fmt) { //author: meizz
            var o = {
                "M+": date.getMonth() + 1, //月份
                "d+": date.getDate(), //日
                "h+": date.getHours(), //小时
                "m+": date.getMinutes(), //分
                "s+": date.getSeconds(), //秒
                "q+": Math.floor((date.getMonth() + 3) / 3), //季度
                "S": date.getMilliseconds() //毫秒
            };
            if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            return fmt;
        },
        getUUID: function () {
            var s = [];
            var hexDigits = "0123456789abcdef";
            for (var i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
            s[8] = s[13] = s[18] = s[23] = "-";

            var uuid = s.join("");
            return uuid;
        },
        loginFormCheck: {
            checkInputRequired: function (inputs) {
                inputs = $(inputs).filter('[data-required="true"]');
                var valid = true;
                inputs.each(function () {
                    var tips = $(this).attr('data-required-tips') || '必须填写此项',
                        result = $(this).val() !== '';
                    result ? $(this).parents('.login-form').removeClass('error').find('.tips').text('')
                        : $(this).parents('.login-form').addClass('error').find('.tips').text(tips);
                    if (!result) valid = false;
                });
                return valid;
            },
            checkInputEqual: function (inputs) {
                inputs = $(inputs).filter('[data-equal]');
                var valid = true;
                inputs.each(function () {
                    var input2 = $(this),
                        input1 = $('#' + input2.attr('data-equal')),
                        tips = input2.attr('data-equal-tips') || '再次输入不一致';
                    var result = input1.val() === input2.val();
                    result ? input2.parents('.login-form').removeClass('error').find('.tips').text('')
                        : input2.parents('.login-form').addClass('error').find('.tips').text(tips);
                    if (!result) valid = false;
                });
                return valid;
            },
            checkInputMaxlength: function (inputs) {
                inputs = $(inputs).filter('[data-maxlength]');
                var valid = true;
                inputs.each(function () {
                    var max = parseInt($(this).attr('data-maxlength')),
                        tips = $(this).attr('data-maxlength-tips') || '不能多于' + max + '个字符',
                        result = $(this).val().length <= max;
                    result ? $(this).parents('.login-form').removeClass('error').find('.tips').text('')
                        : $(this).parents('.login-form').addClass('error').find('.tips').text(tips);
                    if (!result) valid = false;
                });
                return valid;
            },
            checkInputMinlength: function (inputs) {
                inputs = $(inputs).filter('[data-minlength]');
                var valid = true;
                inputs.each(function () {
                    var min = parseInt($(this).attr('data-minlength')),
                        tips = $(this).attr('data-minlength-tips') || '不能少于' + min + '个字符',
                        result = $(this).val().length >= min;
                    result ? $(this).parents('.login-form').removeClass('error').find('.tips').text('')
                        : $(this).parents('.login-form').addClass('error').find('.tips').text(tips);
                    if (!result) valid = false;
                });
                return valid;
            },
            checkInputUsername: function (inputs) {
                inputs = $(inputs).filter('[data-username="true"]');
                var valid = true;
                inputs.each(function () {
                    var reg = $.regObj.username;
                    var tips = $(this).attr('data-username-tips') || '用户名为3-16位非数字开头的字母、数字、中文的组合',
                        result = reg.test($(this).val());
                    result ? $(this).parents('.login-form').removeClass('error').find('.tips').text('')
                        : $(this).parents('.login-form').addClass('error').find('.tips').text(tips);
                    if (!result) valid = false;
                });
                return valid;
            },
            checkInputAccount: function (inputs) {
                inputs = $(inputs).filter('[data-account="true"]');
                var valid = true;
                inputs.each(function () {
                    var reg = $.regObj.account;
                    var tips = $(this).attr('data-account-tips') || '请输入正确的账号、手机或邮箱',
                        result = reg.test($(this).val());
                    result ? $(this).parents('.login-form').removeClass('error').find('.tips').text('')
                        : $(this).parents('.login-form').addClass('error').find('.tips').text(tips);
                    if (!result) valid = false;
                });
                return valid;
            },
            checkInputMobile: function (inputs) {
                inputs = $(inputs).filter('[data-mobile="true"]');
                var valid = true;
                inputs.each(function () {
                    var reg = $.regObj.mobile;
                    var tips = $(this).attr('data-mobile-tips') || '请输入正确的号码',
                        val = $(this).val(),
                        result = reg.test(val);
                    result ? $(this).parents('.login-form').removeClass('error').find('.tips').text('')
                        : $(this).parents('.login-form').addClass('error').find('.tips').text(tips);
                    if (!result) valid = false;
                });
                return valid;
            },
            checkInputEmail: function (inputs) {
                inputs = $(inputs).filter('[data-email="true"]');
                var valid = true;
                inputs.each(function () {
                    var reg = $.regObj.email;
                    var tips = $(this).attr('data-email-tips') || '请输入正确的邮箱地址',
                        result = reg.test($(this).val());
                    result ? $(this).parents('.login-form').removeClass('error').find('.tips').text('')
                        : $(this).parents('.login-form').addClass('error').find('.tips').text(tips);
                    if (!result) valid = false;
                });
                return valid;
            },
            checkInputPattern: function (inputs) {
                inputs = $(inputs).filter('[data-pattern]');
                var valid = true;
                inputs.each(function () {
                    var reg = new RegExp(inputs.attr('data-pattern'));
                    var tips = $(this).attr('data-pattern-tips') || '请输入正确的格式',
                        result = reg.test($(this).val());
                    result ? $(this).parents('.login-form').removeClass('error').find('.tips').text('')
                        : $(this).parents('.login-form').addClass('error').find('.tips').text(tips);
                    if (!result) valid = false;
                });
                return valid;
            }
        },
        regObj: {
            //用户名\手机\邮箱
            account: /(^[a-zA-Z\u4E00-\u9FA5][a-zA-Z0-9\u4E00-\u9FA5]{2,15}$)|(^1(3|4|5|7|8)\d{9}$)|(^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$)/,
            //用户名为3-16位非数字开头的字母、数字、中文的组合
            username: /^[a-zA-Z\u4E00-\u9FA5][a-zA-Z0-9\u4E00-\u9FA5]{2,15}$/,
            mobile: /^1(3|4|5|7|8)\d{9}$/,
            email: /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/
        },
        bindLoadMore: function (options) {
            var defaults = {
                    btn: '#load-more-btn',
                    pageSize: 10,
                    btnData: [],
                    api: null,
                    fired: false,
                    noneDataShow: '',
                    noneDataHide: '',
                    success: null,
                    failure: null,
                    loading: true,
                    loadingText: '正在加载...',
                    loadEndText: '加载更多'
                },
                setting = $.extend({}, defaults, options),
                loadMoreBtn = $(setting['btn']),
                pageSize = setting['pageSize'],
                loadSuccess = setting['success'],
                loadFailure = setting['failure'],
                btnData = setting['btnData'],
                api = setting['api'],
                noneDataShow = $(setting['noneDataShow']),
                noneDataHide = $(setting['noneDataHide']),
                loading = setting['loading'],
                loadingText = setting['loadingText'],
                loadEndText = setting['loadEndText'],
                fired = setting['fired'];
            var getOtherParams = function (btn, btnData) {
                var json = {};
                for (var i = 0, len = btnData.length; i < len; i++) {
                    var item = btnData[i],
                        key = item['key'],
                        value = '';
                    if (item['value']) {
                        value = item['value'];
                    } else if (item['data']) {
                        value = btn.attr(item['data']);
                    } else if (item['fn']) {
                        value = item['fn']();
                    }
                    json[key] = value;
                }
                return json;
            };
            loadMoreBtn.unbind('click').bind('click', function () {
                if ($(this).isDisable()) return;
                var btn = $(this).setDisable().hide().text(loadingText),
                    page = parseInt(btn.attr('data-page') || 0) + 1,
                    success = function (data) {
                        console.log('成功加载列表');
                        var total = data['total'],
                            list = data['data'],
                            maxPage = Math.ceil(total / pageSize);
                        if (page == maxPage || !maxPage) {
                            btn.hide()
                        } else {
                            btn.show();
                        }
                        btn.attr('data-page', page);
                        if (page == 1 && total == 0) { //一条数据都没有的时候
                            noneDataShow.show();
                            noneDataHide.hide();
                        } else {
                            noneDataShow.hide();
                            noneDataHide.show();
                        }
                        btn.setDisable(false).text(loadEndText);
                        loadSuccess && loadSuccess(list);
                    },
                    failure = function (data) {
                        console.log('加载列表失败');
                        btn.setDisable(false).text(loadEndText);
                        loadFailure && loadFailure(data);
                    };
                var data = {
                        'userId': publicFuns.user.getUserId(),
                        'pageNum': page,
                        'pageSize': pageSize
                    },
                    others = getOtherParams(btn, btnData);
                $.extend(data, others);
                api && api({
                    "data": data,
                    "loading": loading,
                    "success": success,
                    "failure": failure
                });
            });
            fired && loadMoreBtn.click();
        },
        /**
         * 获取两个时间相差的天数
         * @param from 必须 开始时间
         * @param to 必须 结束时间 时间差为 to - form 的处理结果
         * @param [format {string}] 可选 返回格式,默认'dd天hh小时mm分ss秒'
         * @param [ceil {boolean}] 可选 是否上舍入，如果真，相差不足 1 的计 1，否则计 0，默认true
         * @return {number} 相关的天数
         */
        getDiffDate: function (from, to, format, ceil) {

            if (typeof from === "string") {
                from = new Date(from);
            } else if (!(from instanceof Date)) {
                return;
            }

            if (typeof to === "string") {
                to = new Date(to);
            } else if (!(to instanceof Date)) {
                return;
            }

            if (typeof format === 'boolean') ceil = format;

            if (typeof format !== 'string') format = 'dd天hh小时mm分ss秒';


            var diff = to.valueOf() - from.valueOf();
            var mathFn = ceil === false ? Math.round : Math.ceil;

            if (/d+/.test(format)) { //从天算起
                return getFromDays(format)
            } else if (/h+/.test(format)) { //从小时算起
                return getFromHours(format);
            } else if (/m+/.test(format)) { //从分钟算起
                return getFromMinutes(format);
            } else if (/s+/.test(format)) { //从秒算起
                return getFromSeconds(format);
            }

            function getFromDays(format) { //从天算起
                var fns = (function () {

                    if (/d+h+m+s+/.test(format)) {
                        return {
                            "days": parseInt,
                            "hours": parseInt,
                            "minutes": parseInt,
                            "seconds": mathFn
                        }

                    } else if (/d+h+m+/.test(format)) {

                        return {
                            "days": parseInt,
                            "hours": parseInt,
                            "minutes": mathFn,
                            "seconds": mathFn
                        }

                    } else if (/d+h+/.test(format)) {

                        return {
                            "days": parseInt,
                            "hours": mathFn,
                            "minutes": mathFn,
                            "seconds": mathFn
                        }

                    } else if (/d+/.test(format)) {
                        return {
                            "days": mathFn,
                            "hours": mathFn,
                            "minutes": mathFn,
                            "seconds": mathFn
                        }
                    }
                })();

                var isMinus = diff < 0; //是否负数

                if (isMinus) diff = Math.abs(diff);

                //计算出相差天数
                var days = fns.days(diff / (24 * 3600 * 1000));

                //计算出小时数
                var leave1 = diff % (24 * 3600 * 1000);//计算天数后剩余的毫秒数
                var hours = fns.hours(leave1 / (3600 * 1000));

                //计算相差分钟数
                var leave2 = leave1 % (3600 * 1000);//计算小时数后剩余的毫秒数
                var minutes = fns.minutes(leave2 / (60 * 1000));

                //计算相差秒数
                var leave3 = leave2 % (60 * 1000);//计算分钟数后剩余的毫秒数
                var seconds = fns.seconds(leave3 / 1000);

                if (isMinus) {
                    return formatFn({
                        "days": 0 - days,
                        "hours": 0 - hours,
                        "minutes": 0 - minutes,
                        "seconds": 0 - seconds
                    }, format);
                } else {
                    return formatFn({
                        "days": days,
                        "hours": hours,
                        "minutes": minutes,
                        "seconds": seconds
                    }, format);
                }
            }

            function getFromHours(format) { //从小时算起
                var fns = (function () {

                    if (/h+m+s+/.test(format)) {

                        return {
                            "hours": parseInt,
                            "minutes": parseInt,
                            "seconds": mathFn
                        }

                    } else if (/h+m+/.test(format)) {

                        return {
                            "hours": parseInt,
                            "minutes": mathFn,
                            "seconds": mathFn
                        }

                    } else if (/h+/.test(format)) {

                        return {
                            "hours": mathFn,
                            "minutes": mathFn,
                            "seconds": mathFn
                        }

                    }

                })();

                var isMinus = diff < 0; //是否负数

                if (isMinus) diff = Math.abs(diff);

                //计算出小时数
                var hours = fns.hours(diff / (3600 * 1000));

                //计算相差分钟数
                var leave2 = diff % (3600 * 1000);//计算小时数后剩余的毫秒数
                var minutes = fns.minutes(leave2 / (60 * 1000));

                //计算相差秒数
                var leave3 = leave2 % (60 * 1000);//计算分钟数后剩余的毫秒数
                var seconds = fns.seconds(leave3 / 1000);

                if (isMinus) {
                    return formatFn({
                        "days": 0,
                        "hours": 0 - hours,
                        "minutes": 0 - minutes,
                        "seconds": 0 - seconds
                    }, format);
                } else {
                    return formatFn({
                        "days": 0,
                        "hours": hours,
                        "minutes": minutes,
                        "seconds": seconds
                    }, format);
                }
            }

            function getFromMinutes(format) { //从分钟算起
                var fns = (function () {

                    if (/m+s+/.test(format)) {

                        return {
                            "minutes": parseInt,
                            "seconds": mathFn
                        }

                    } else if (/m+/.test(format)) {

                        return {
                            "minutes": mathFn,
                            "seconds": mathFn
                        }

                    }

                })();

                var isMinus = diff < 0; //是否负数

                if (isMinus) diff = Math.abs(diff);

                //计算相差分钟数
                var minutes = fns.minutes(diff / (60 * 1000));

                //计算相差秒数
                var leave3 = diff % (60 * 1000);//计算分钟数后剩余的毫秒数
                var seconds = fns.seconds(leave3 / 1000);

                if (isMinus) {
                    return formatFn({
                        "days": 0,
                        "hours": 0,
                        "minutes": 0 - minutes,
                        "seconds": 0 - seconds
                    }, format);
                } else {
                    return formatFn({
                        "days": 0,
                        "hours": 0,
                        "minutes": minutes,
                        "seconds": seconds
                    }, format);
                }

            }

            function getFromSeconds(format) { //从秒算起

                var isMinus = diff < 0; //是否负数

                if (isMinus) diff = Math.abs(diff);

                //计算相差秒数
                var seconds = mathFn(diff / 1000);

                if (isMinus) {
                    return formatFn({
                        "days": 0,
                        "hours": 0,
                        "minutes": 0,
                        "seconds": 0 - seconds
                    }, format);
                } else {
                    return formatFn({
                        "days": 0,
                        "hours": 0,
                        "minutes": 0,
                        "seconds": seconds
                    }, format);
                }

            }

            function formatFn(date, fmt) {
                var o = {
                    "d+": date['days'], //日
                    "h+": date['hours'], //小时
                    "m+": date['minutes'], //分
                    "s+": date['seconds'] //秒
                };

                var isMinus = false; //是否负数;
                for (var k in o) {
                    if (new RegExp("(" + k + ")").test(fmt)) {
                        fmt = fmt.replace(RegExp.$1, (function () {
                            var int = o[k],
                                maxlen = RegExp.$1.length, //最小长度
                                str = '' + Math.abs(int);

                            if (!isMinus) isMinus = int < 0;

                            if (str.length < maxlen) { //补0
                                str = (10 * (maxlen - str.length) + '').replace('1', '') + str;
                            }

                            return str;
                        })());
                        // fmt = fmt.replace(RegExp.$1, (o[k] < 0 ? '-' : '') + ((RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length))));
                    }
                }

                return (isMinus ? '-' : '') + fmt;
            }
        },
        apiCall: function (options) {
            var defaults = {
                    api: '', //接口
                    data: '', //数据
                    type: 'POST', //请求方式
                    dataType: 'json', //请求数据类型
                    fullData: false, //调用成功传入数据时，是否传入原始数据
                    alertError: true, //调用失败时，是否弹出错误信息
                    onlySuccess: false, //调用成功后，是否无论返回成功，都调用success回调函数
                    success: null, //调用成功，接口返回成功时回调
                    failure: null, //调用成功，接口的返回失败时回调
                    complete: null, //调用完成后都回调
                    error: null, //请求出错时回调
                    async: true, //是否同步
                    loading: true //是否开启加载层
                }, setting = $.extend({}, defaults, options),
                api = setting['api'],
                data = setting['data'] || {},
                type = setting['type'],
                dataType = setting['dataType'],
                fullData = setting['fullData'],
                alertError = setting['alertError'],
                onlySuccess = setting['onlySuccess'],
                success = setting['success'],
                failure = setting['failure'],
                complete = setting['complete'],
                error = setting['error'],
                async = setting['async'],
                loading = setting['loading'];
            if (loading) var idx = layer.load(2);
            var ajaxSuccess = function (data) {
                    if (!onlySuccess && data['ret'] != 0) {
                        alertError && layer.msg(data['message']);
                        if (data['ret'] === 4) console.log('登录超时：' + api);
                        if (data['ret'] === 4) publicFuns.user.gotoLogin();
                        failure && failure(data);
                        return;
                    }
                    success && success(fullData ? data : data['result']);
                },
                ajaxFailure = function (XMLHttpRequest, textStatus, errorThrown) {
                    console.error("Api Error: " + api);
                    error && error();
                },
                ajaxComplete = function () {
                    loading && layer.close(idx); //关闭加载窗
                    complete && complete();
                };

            //自定义配置优先
            data = $.extend({}, {
                "userId": publicFuns.user.getUserId()
            }, data);

            $.ajax(api, {
                async: async,
                data: data,
                dataType: dataType,
                type: type,
                success: ajaxSuccess,
                error: ajaxFailure,
                complete: ajaxComplete
                // crossDomain: true,
                // xhrFields: {
                //     withCredentials: true
                // }
            });
        },
        /**
         * 将驼峰命名法的字符串，转换成下划线命名法的字符串
         * @param str 驼峰命名法的字符串
         * @returns {void|string|XML}
         */
        underscoresString: function (str) {
            var re = /([A-Z])/g;
            return str.replace(re, function ($0, $1) {
                return '_' + $1.toLowerCase();
            });
        },
        /**
         * 将下划线命名法的字符串，转换成驼峰命名法的字符串
         * @param str 下划线命名法的字符串
         * @param lower 首字母是否小写，默认true，即默认为小驼峰
         * @returns {void|string|XML}
         */
        camelCaseString: function (str, lower) {
            if (typeof str !== "string") return str;
            var rs = str.replace(/_(\w)/g, function ($0, $1) {
                return $1.toUpperCase()
            });
            if (lower === false) {
                rs = rs.replace(/^(\w)/, function ($0, $1) {
                    return $1.toUpperCase()
                });
            }
            return rs
        },
        /**
         * 将JSON的key转换成下滑线式
         * @param json
         * @param depth 是否深度替换，默认true，如果true，则会搜索所有是JSON的key值并操作，否则只会搜索第一层的key来操作
         * @returns {*}
         */
        underscoresJson: function (json, depth) {
            if (!$.isJson(json)) return json;
            depth = !(depth === false);
            var newJson = $.isArray(json) ? [] : {};
            for (var key in json) {
                var val = json[key],
                    newKey = $.underscoresString(key);
                newJson[newKey] = depth ? arguments.callee(val) : val;
            }
            return newJson;
        },
        /**
         * 将JSON的key转换成驼峰式
         * @param json
         * @param depth 是否深度替换，默认true，如果true，则会搜索所有是JSON的key值并操作，否则只会搜索第一层的key来操作
         * @returns {*}
         */
        camelCaseJson: function (json, depth) {
            if (!$.isJson(json)) return json;
            depth = !(depth === false);
            var newJson = $.isArray(json) ? [] : {};
            for (var key in json) {
                var val = json[key],
                    newKey = $.camelCaseString(key);
                newJson[newKey] = depth ? arguments.callee(val) : val;
            }
            return newJson;
        },
        /**
         * 替换一个JSON的key为指定的key
         * @param json 被替换的JSON
         * @param regexp 被替换的key 和String.replace()的第一参数一样
         * @param replacement 替换成目标key 和String.replace()的第二参数一样
         * @param depth 是否深度替换，默认true，如果true，则会搜索所有是JSON的key值并操作，否则只会搜索第一层的key来操作
         * @returns {*}
         */
        replaceJsonKey: function (json, regexp, replacement, depth) {
            if (!$.isJson(json)) return json;
            depth = !(depth === false);
            for (var key in json) {
                var newKey = key.replace(regexp, replacement);
                json[newKey] = depth ? arguments.callee(json[key]) : json[key];
                if (newKey != key) delete json[key];
            }
            return json;
        },
        /**
         * 判断一个对象是不是JSON对象
         * @param obj 被判断的对象
         * @param arrayAlso {boolean} 是否将数组也认为是JSON,默认true
         * @returns {boolean}
         */
        isJson: function (obj, arrayAlso) {
            if ($.isArray(obj) && !(arrayAlso === false)) return true;
            var isjson = typeof(obj) == "object" && Object.prototype.toString.call(obj).toLowerCase() == "[object object]" && !obj.length;
            return isjson;
        },
        /**
         * 判断一个字符串是不是JSON字条串
         * @param string 被判断的字符串
         */
        isJsonString: function (string) {
            try {
                JSON.parse(string);
                return true;
            } catch (err) {
                return false;
            }
        },
        /**
         * 判断一个对象是否是数组类型
         * @param obj
         * @returns {boolean}
         */
        isArray: function (obj) {
            return Object.prototype.toString.call(obj) === '[object Array]'
        },
        //判断客户端的类型
        userAgent: function (options) {
            var defaults = {
                    pc: null,
                    mobile: null,
                    ipad: null,
                    iphone: null,
                    android: null,
                    other: null
                }, settings = $.extend({}, defaults, options),
                pc = settings.pc,
                mobile = settings.mobile,
                ipad = settings.ipad,
                iphone = settings.iphone,
                android = settings.android,
                other = settings.other;

            var ua = navigator.userAgent;
            var isIpad = ua.match(/(iPad).*OS\s([\d_]+)/),
                isIphone = !isIpad && ua.match(/(iPhone\sOS)\s([\d_]+)/),
                isAndroid = ua.match(/(Android)\s+([\d.]+)/),
                isMobile = isIphone || isAndroid;

            if (isMobile) {
                mobile && mobile();
            } else {
                pc && pc();
            }

            //或者单独判断iphone或android
            if (isIphone) {
                iphone && iphone();
            } else if (isIpad) {
                ipad && ipad();
            } else {
                if (isAndroid) {
                    android && android();
                } else {
                    other && other();
                }
            }
        }
    });
})(jQuery);

var publicFuns = (function ($) {
    return {
        user: {
            /**
             * 检测账号、手机、邮箱是否注册过
             * @param account 账号、手机、邮箱
             */
            isExist: function (account) {
                var isExist = false;
                apiCall.user.checkExist({
                    "data": {"checkName": account},
                    "alertError": false,
                    "success": function () {
                        //已注册过
                        isExist = true;
                    },
                    "async": false,
                    "loading": false
                });
                return isExist;
            },
            /**
             * 检测是否已注册
             * @param input {jQueryObject} 检查的表单
             * @param reg {RegExp} 正则对象
             * @param tips {string} 已注册的提示
             * @param existError {boolean} 是否 存在的话 就显示警示提示，false的话则 不存在显示警示提示，默认是true
             * @return {boolean} 如果existError值为true,则存在返回false，不存在返回true;否则反之; 即显示提示则返回false，没有提示则返回true
             */
            checkExist: function (input, reg, tips, existError) {
                if (existError !== false) existError = true;
                input = $(input);
                var val = input.val(),
                    isError = false;
                if (reg.test(val)) {
                    var isExist = publicFuns.user.isExist(val);
                    console.log(isExist);
                    if (isExist && existError) {
                        isError = true;
                        input.parents('.login-form').addClass('error').find('.tips').text(tips || "已经注册过");
                    } else if (!isExist && !existError) {
                        isError = true;
                        input.parents('.login-form').addClass('error').find('.tips').text(tips || "尚未注册");
                    }
                }
                return !isError;
            },
            /**
             * 设置跳转页面
             */
            setRedirect: function () {
                var except = constants.USER_GOTO_EXPECT,
                    special = constants.USER_GOTO_SPECIAL,
                    pathName = location.pathname,
                    //如果当前链接属于except，则不需要修改cookie;
                    //如果当前链接属于special，则跳转到默认页面;
                    //否则，将当前链接设置为登录后跳转页面;
                    prevUrl = pathName == '/' ? constants.USER_GOTO_DEFAULT : $.arrayHas(pathName, except, '*') ? '' : $.arrayHas(pathName, special, '*') ?
                                constants.USER_GOTO_DEFAULT : location.href;
                if (prevUrl) $.cookie(constants.COOKIE_URL_GOTO_MART, prevUrl);
            },
            /**
             * 跳转到登录页面
             */
            gotoLogin: function () {
                this.setRedirect();
                location.href = 'login.html';
            },
            /**
             * 跳转到登录页面
             * @param regType 0：手机注册，1：邮箱注册
             */
            gotoReg: function (regType) {
                this.setRedirect();
                var shareId = this.getShareId(),
                    search = shareId ? '?shareUserId=' + shareId : '';
                location.href = (regType ? 'reg_email.html' : 'reg.html') + search;
            },
            /**
             * 获取注册时的分享ID
             * @return {*}
             */
            getShareId: function () {
                return $.getURLParams()['shareUserId'];
            },
            /**
             * 是否已登录
             * @returns {boolean}
             */
            hasLogin: function () {
                return !!$.cookie('SSOID');
            },
            /**
             * 未登录前往登录
             */
            notLoginToLogin: function () {
                !this.hasLogin() && this.gotoLogin();
            },
            /**
             * 已登录则隐藏，否则显示
             * @param filter
             */
            hiddenForLogin: function (filter) {
                this.hasLogin() ? $(filter).hide() : $(filter).show();
            },
            /**
             * 已登录则显示，否则隐藏
             * @param filter
             */
            showForLogin: function (filter) {
                this.hasLogin() ? $(filter).show() : $(filter).hide();
            },
            /**
             * 更新cookie的用户账号信息
             */
            updateCookieUserInfo: function () {
                apiCall.user.getUserInfo({
                    'userId': publicFuns.user.getUserId()
                }, function (list) {
                    publicFuns.user.updateUserInfo(list[0]);
                }, null, false)
            },
            /**
             * 保存用户信息
             */
            saveUserInfo: function (info) {
                info = typeof info === 'string' ? info : JSON.stringify(info);
                $.cookie(constants.COOKIE_USER_INFO, info);
            },
            /**
             * 读取用户信息
             * @param {string} itemKey 任意个子信息键值参数，如果只传一个，则返回字符串，如果传多个，则返回json，如果没有传，则返回所有信息
             * @return {string||json}
             */
            getUserInfo: function (itemKey) {
                var info = $.cookie(constants.COOKIE_USER_INFO);
                try {
                    info = info && JSON.parse(info);
                } catch (err) {
                    info = '';
                }
                if (arguments.length > 1) {
                    var json = {};
                    for (var i = 0; i < arguments.length; i++) {
                        var key = arguments[i];
                        json[key] = info[key] || '';
                    }
                    info = json;
                } else {
                    info = arguments.length && info ? info[arguments[0]] || '' : info;
                }
                return info;
            },
            /**
             * 获取用户ID
             */
            getUserId: function () {
                return this.getUserInfo('user_id');
            },
            /**
             * 获取用户手机
             */
            getUserMobile: function () {
                return this.getUserInfo('mobile');
            },
            /**
             * 获取用户邮箱
             */
            getUserEmail: function () {
                return this.getUserInfo('email');
            },
            /**
             * 获取用户QQ
             */
            getUserQQ: function () {
                return this.getUserInfo('qq');
            },
            /**
             * 获取用户微信
             */
            getUserWX: function () {
                return this.getUserInfo('wx');
            },
            /**
             * 移除用户信息
             * @param {string} itemKey 任意个子信息键值参数，如果只传一个，则返回字符串，如果传多个，则返回json，如果没有传，则返回所有信息
             * @return {string||json}
             */
            removeUserInfo: function (itemKey) {
                var info = $.cookie(constants.COOKIE_USER_INFO);
                try {
                    info = info && JSON.parse(info);
                } catch (err) {
                    info = '';
                }
                if (arguments.length && info) { //有传入参数，且info有数据
                    var json = {};
                    for (var i = 0; i < arguments.length; i++) { //把参数传成json
                        var key = arguments[i];
                        json[key] = '';
                    }
                    $.extend(info, json);
                    for (var key in info) { //删除值为''的属性
                        if (info[key] === '') delete info[key];
                    }
                    if (info == {}) info = '';
                } else {
                    info = '';
                }
                if (info) {
                    info = JSON.stringify(info);
                    $.cookie(constants.COOKIE_USER_INFO, info);
                } else {
                    $.removeCookie(constants.COOKIE_USER_INFO);
                }
                return info;
            },
            /**
             * 移除用户手机
             */
            removeUserMobile: function () {
                return this.removeUserInfo('mobile');
            },
            /**
             * 移除用户邮箱
             */
            removeUserEmail: function () {
                return this.removeUserInfo('email');
            },
            /**
             * 移除用户QQ
             */
            removeUserQQ: function () {
                return this.removeUserInfo('qq_open_id');
            },
            /**
             * 移除用户微信
             */
            removeUserWX: function () {
                return this.removeUserInfo('wx_open_id');
            },
            /**
             * 更新用户信息
             * @param {string} newInfo
             * @return {string||json}
             */
            updateUserInfo: function (newInfo) {
                var info = $.cookie(constants.COOKIE_USER_INFO);
                try {
                    info = info && JSON.parse(info);
                } catch (err) {
                    info = '';
                }
                if (info) {
                    $.extend(info, newInfo);
                    $.cookie(constants.COOKIE_USER_INFO, JSON.stringify(info));
                }
                return info;
            },
            /**
             * 更新用户手机
             */
            updateUserMobile: function (value) {
                return this.updateUserInfo({'mobile': value});
            },
            /**
             * 更新用户邮箱
             */
            updateUserEmail: function (value) {
                return this.updateUserInfo({'email': value});
            },
            /**
             * 更新用户QQ
             */
            updateUserQQ: function (value) {
                return this.updateUserInfo({'qq_open_id': value});
            },
            /**
             * 更新用户微信
             */
            updateUserWX: function (value) {
                return this.updateUserInfo({'wx_open_id': value});
            },
            /**
             * 保存登录错误次数
             * @param errorNum 错误次数
             */
            saveLoginErrorNum: function (errorNum) {
                $.cookie(constants.COOKIE_LOGIN_ERROR, errorNum);
            },
            /**
             * 获取登录错误次数
             * @returns {number} 错误次数
             */
            getLoginErrorNum: function () {
                return $.cookie(constants.COOKIE_LOGIN_ERROR) || 0;
            },
            /**
             * 清除登录错误次数
             */
            clearLoginErrorNum: function () {
                $.removeCookie(constants.COOKIE_LOGIN_ERROR);
            },
            /**
             * 登录错误次数过多，则显示;正常情况，则隐藏;
             * @param filter {string} jQuery 选择器;
             */
            showForLoginError: function (filter) {
                var isMax = this.getLoginErrorNum() >= 5;
                isMax ? $(filter).show() : $(filter).hide();
                return isMax;
            },
            /**
             * 获取第三方信息
             */
            getThirdInfo: function () {
                try {
                    var info = $.cookie(constants.COOKIE_THIRD_INFO);
                    return JSON.parse(info);
                } catch (err) {
                    return false;
                }
            },
            /**
             * 记住账号
             */
            saveLocalAccount: function (inputId) {
                $.cookie('localInfo', $('#' + inputId).val(), {expires: 7});
            },
            /**
             * 取消记住账号
             */
            removeLocalAccount: function () {
                $.cookie('localInfo', '', {expires: -1});
            },
            /**
             * 取出本地账号
             */
            getLocalAccount: function () {
                return $.cookie('localInfo');
            },
            updateHtmlUserImg: function () {
                var url = publicFuns.user.getUserInfo('portrait_url') || "images/avatar_default.png";
                $('img.user-head-img').attr('src', url);
            }
        },
        market: {
            race: {
                user: {
                    release: {
                        closeProject: function () {

                        }
                    }
                }
            },
            trust: {
                hadApplyManger: function () {
                    var result = null;
                    apiCall.market.trust.user.hadApplyManger({
                        "data": {"userId": publicFuns.user.getUserId()},
                        "success": function (data) {
                            result = {
                                "chief": data['g'],
                                "manager": data['j']
                            };
                        },
                        "async": false
                    });
                    return result;
                }
            },
            crowd: {
                gotoMyRelease: function () {
                    var pathName = 'project_crowd.html', //目标路径
                        hash = '#1', //目标锚
                        curPathName = location.pathname, //当前路径
                        curHash = location.hash; //当前锚

                    //只取路径最后的文件名
                    curPathName = curPathName.slice(curPathName.lastIndexOf('/') + 1);

                    if (curPathName === pathName) { //当前路径与目标路径一样

                        if (curHash !== hash) { //当前锚与目标锚不一样时，跳转页面，并刷新页面
                            location.href = pathName + hash;
                            location.reload();
                        }

                        //当前路径和目标路径完全一样，不用做任何处理

                    } else { //当前路径与目标路径不一样，直接跳转
                        location.href = pathName + hash;
                    }

                },
                gotoMyJoin: function () {
                    var pathName = 'project_crowd.html', //目标路径
                        hash = '#7', //目标锚
                        curPathName = location.pathname, //当前路径
                        curHash = location.hash; //当前锚

                    //只取路径最后的文件名
                    curPathName = curPathName.slice(curPathName.lastIndexOf('/') + 1);

                    if (curPathName === pathName) { //当前路径与目标路径一样

                        if (curHash !== hash) { //当前锚与目标锚不一样时，跳转页面，并刷新页面
                            location.href = pathName + hash;
                            location.reload();
                        }

                        //当前路径和目标路径完全一样，不用做任何处理

                    } else { //当前路径与目标路径不一样，直接跳转
                        location.href = pathName + hash;
                    }

                }
            },
            pay: {
                getWeChatCode: function (type, orderId) {
                    return apiPath.market.pay.weChat + '?' + $.parseURLString('orderId', orderId, 'tag', type);
                },
            },
            message: {
                //消息即时推送
                websocket: function () {
                    var websocket = null;

                    function initWebSocket() {
                        if ('WebSocket' in window) {
                            websocket = new WebSocket("ws://www.jpingtai.com:80/messapi/ws");
                        } else if ('MozWebSocket' in window) {
                            websocket = new MozWebSocket("ws://www.jpingtai.com:80/messapi/ws");
                        } else if (typeof SockJS === 'function') {
                            websocket = new SockJS("http://www.jpingtai.com:80/messapi/ws/sockjs");
                        } else {
                            console.error("浏览器不支持webSoket");
                            return;
                        }

                        websocket.onopen = function (event) {
                            console.log("WebSocket:已连接");
                        };

                        websocket.onmessage = function (event) {
                            console.log(event);
                            sysMsgAppend(event);
                        };

                        websocket.onerror = function (event) {
                            console.error("WebSocket:发生错误 ");
                        };

                        websocket.onclose = function (event) {
                            initWebSocket();
                            console.log("WebSocket:已关闭");
                        };
                    }

                    initWebSocket();

                    function sysMsgAppend(event) {//即时消息加载到页面
                        //更新未读数量
                        publicFuns.market.message.updateNotReadCount('.list-container');
                    }
                },
                //更新是否有未读消息状态
                updateNotReadCount: function () {
                    var data = {"userId": publicFuns.user.getUserId()};

                    apiCall.market.message.getUserNotReadCount({
                        "success": function (data) {
                            var hasNotRead = false;
                            for (var key in data) {
                                if (!hasNotRead) hasNotRead = data[key] > 0;
                            }

                            var containers = $('.jDiv');
                            containers.length && containers.each(function () {
                                var container = $(this),
                                    type = container.attr('data-type'),
                                    btn = $('.jNav > li > a[data-type="' + type + '"]'),
                                    field = '';
                                switch (type) {
                                    case '0':
                                        field = 'trade';
                                        break;
                                    case '1':
                                        field = 'notice';
                                        break;
                                    case '2':
                                        field = 'advert';
                                        break;
                                }
                                //按钮未读红点
                                data[field] > 0 ? btn.find('s').addClass('cur') : btn.find('s').removeClass('cur');

                                //"未读"标签后的数字
                                //container.find('.project-message-select > a[data-status="0"]').text('未读(' + data[field] + ')');
                            });

                            //侧边菜单未读消息红点
                            var point = $('.jCenter .jCenterNav > li.message > a > span > s');
                            if (hasNotRead) {
                                point.addClass('cur');
                            } else {
                                point.removeClass('cur');
                            }
                        }
                    });
                }
            },
            other: {
                //到个人主页
                gotoUserHome: function (obj) {
                    $(obj).attr('href', apiPath.pService + '/account_info.html').removeAttr('onclick').click();
                },
                //到个人预览主页
                gotoUserPrevHome: function (obj) {
                    $(obj).attr('href', apiPath.pService + '/home.html?uid=' + $(obj).attr('data-uid')).removeAttr('onclick').click();
                }
            }
        },
        third: {
            qiniu: {
                uploadFile: function (options) {
                    var defaults = {
                            getTokenApi: apiPath.third.qiniu.getToken0,
                            getTokenData: null,
                            fileInputId: "qinuifile",//上传控件ID
                            // uptoken: '',
                            // getToken: null,
                            // maxSize: '',
                            filters: null,
                            type: 0, //0:普通上传, 1:个人上传 2:公共上传 3:前置资料
                            authSuccess: null, //授权成功
                            authFailure: null, //授权失败
                            success: null, //上传成功回调
                            failure: null, //上传失败回调
                            onInit: null, //插件初始化完成后回调
                            onAdd: null, //每次添加文件后回调
                            onUploadBefore: null, //每次文件上传前回调,
                            onUploading: null, //每次文件上传时回调,
                            uploadComplete: null, //队列文件处理完毕后,
                        },
                        setting = $.extend({}, defaults, options),
                        type = setting.type,
                        getTokenApi = setting.getTokenApi,
                        getTokenData = setting.getTokenData,
                        fileInputId = setting.fileInputId,
                        authSuccess = setting.authSuccess,
                        authFailure = setting.authFailure,
                        onInit = setting.onInit,
                        onAdd = setting.onAdd,
                        onUploadBefore = setting.onUploadBefore,
                        onUploading = setting.onUploading,
                        uploadComplete = setting.uploadComplete,
                        success = setting.success,
                        failure = setting.failure;

                    getTokenApi = apiPath.third.qiniu['getToken' + type];

                    var filters = setting.filters;
                    if (!filters) {
                        apiCall.yun.getFileFilter({
                            "success": function (data) {
                                filters = data;
                            },
                            "failure": function () {
                                filters = undefined;
                            },
                            "async": false
                        });
                    }

                    var mime_types = (function (arr) {
                        if (!(arr instanceof Array)) return;
                        var text = '';
                        for (var i = 0, len = arr.length; i < len; i++) {
                            arr[i]["extensions"] && (text += (text !== '' ? ',' : '') + arr[i]["extensions"]);
                        }
                        return text;
                    })(filters["mime_types"]);

                    //初始化全局对象
                    if (!(window.qiniuArr instanceof Array)) window.qiniuArr = [], window.uploaderArr = [], window.emptyIndexArr = [];

                    var arrIndex = 0,
                        newQiniu = null;

                    var emptyIndex = publicFuns.third.qiniu.getEmptyIndex();
                    if (emptyIndex) { //有可用索引
                        emptyIndexArr.splice(0, 1); //移除可用索引
                        arrIndex = emptyIndex;
                    } else { //新的索引
                        arrIndex = qiniuArr.length;
                        newQiniu = new QiniuJsSDK();
                        qiniuArr.push(newQiniu);
                    }
                    var cloudName = '';
                    var uploader = qiniuArr[arrIndex].uploader({
                        runtimes: 'html5,flash,html4',      // 上传模式，依次退化
                        browse_button: fileInputId,         // 上传选择的点选按钮，必需
                        uptoken_func: function (file) {    // 在需要获取uptoken时，该方法会被调用
                            var uptoken = "";
                            var data = {"fileName": file.name, "userId": publicFuns.user.getUserId()};
                            data = $.extend({}, data, getTokenData ? getTokenData() : {});
                            var res = $.ajax({
                                type: "post",
                                data: data,
                                url: getTokenApi,
                                async: false,
                                success: function (data) {
                                    data = JSON.parse(data);
                                    cloudName = data.result.cloudName;
                                    uptoken = data.result.token;
                                    authSuccess && authSuccess(file, data.result);
                                },
                                errer: function (e) {
                                    authFailure && authFailure(file);
                                }
                            });
                            return uptoken;
                        },
                        get_new_uptoken: true,             // 设置上传文件的时候是否每次都重新获取新的uptoken
                        unique_names: false,              // 默认false，key为文件名。若开启该选项，JS-SDK会为每个文件自动生成key（文件名）
                        save_key: false,                  // 默认false。若在服务端生成uptoken的上传策略中指定了sava_key，则开启，SDK在前端将不对key进行任何处理
                        domain: 'dome',     				// bucket域名，下载资源时用到，必需
                        // container: 'container',             // 上传区域DOM ID，默认是browser_button的父元素
                        max_file_size: filters['max_file_size'],             // 最大文件体积限制
                        flash_swf_url: 'path/of/plupload/Moxie.swf',  //引入flash，相对路径
                        max_retries: 0,                     // 上传失败最大重试次数
                        dragdrop: false,                     // 开启可拖曳上传
                        // drop_element: 'container',          // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
                        chunk_size: '0',                  // 分块上传时，每块的体积
                        auto_start: true,                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
                        multi_selection: false,             // 设置一次只能选择一个文件
                        // 可以使用该参数来限制上传文件的类型，大小等，该参数以对象的形式传入，它包括三个属性：
                        // filters: filters,
                        init: {
                            'Init': function (up, files) {
                                onInit && onInit(up, files);
                            },
                            'FilesAdded': function (up, files) {
                                plupload.each(files, function (file) {
                                    // 文件添加进队列后，处理相关的事情
                                    onAdd && onAdd(file);
                                });
                            },
                            'BeforeUpload': function (up, file) {
                                // 每个文件上传前，处理相关的事情
                                if (publicFuns.third.qiniu.isAcceptMime(file.name, mime_types)) {
                                    onUploadBefore && onUploadBefore(file);
                                } else { //不允许此文件类型
                                    up.removeFile(file);
                                    up.stop();
                                    failure && failure('允许上传的文件类型: ' + mime_types);
                                }
                            },
                            'UploadProgress': function (up, file) {
                                // 每个文件上传时，处理相关的事情
                                onUploading && onUploading(file);
                            },
                            'FileUploaded': function (up, file, info) {
                                var res = eval('(' + info + ')'),
                                    data = res.result;
                                if (res.ret != 0) {
                                    failure && failure(res.message);
                                } else {
                                    success && success(file, data);
                                }
                            },
                            'Error': function (up, err, errTip) {
                                //上传出错时，处理相关的事情
                                failure && failure(errTip);
                            },
                            'UploadComplete': function () {
                                //队列文件处理完毕后，处理相关的事情
                                uploadComplete && uploadComplete();
                            },
                            'Key': function (up, file) {
                                var key = cloudName;
                                return key
                            },
                            'CancelUpload': function () {
                            }
                        }
                    });

                    if (emptyIndex) { //有可用索引
                        uploaderArr[emptyIndex] = uploader;
                    } else { //新的索引
                        uploaderArr.push(uploader);
                    }

                    return arrIndex;
                },
                /**
                 * 是否为允许的文件类型
                 * @param fileName {string} 文件名
                 * @param mimeTypes {string} 允许的文件类型
                 * @param noSuffix {boolean} 是否允许的没有文件类型的文件，默认false
                 */
                isAcceptMime: function (fileName, mimeTypes, noSuffix) {
                    var suffix = fileName.slice(fileName.lastIndexOf('.') + 1);
                    var mimeArr = mimeTypes.split(','),
                        accept = false;
                    for (var i = 0, len = mimeArr.length; i < len; i++) {
                        if (mimeArr[i] === suffix) {
                            accept = true;
                            break;
                        }
                    }
                    if (!accept && noSuffix && suffix === '') accept = true;
                    return accept;
                },
                //通过索引获取uploader对象
                getUploader: function (index) {
                    if (uploaderArr instanceof Array && index < uploaderArr.length) return uploaderArr[index];
                },
                //移除索引所在的uploader对象
                removeUploader: function (index) {
                    if (uploaderArr instanceof Array && index < uploaderArr.length) {
                        emptyIndexArr.push(index);//加入到可用索引数组
                        uploaderArr[index] = null;
                        return true;
                    }
                    return false;
                },
                //获取储存的首个可用索引
                getEmptyIndex: function () {
                    if (emptyIndexArr instanceof Array && emptyIndexArr.length) return emptyIndexArr[0];
                }
            }
        },
        other: {
            getProfile: function (type) {
                apiCall.other.getProfile({
                    "data": {"column": type},
                    "success": function (data) {
                        $('head > title').html(data['title'] + '-J平台');
                        $('.arctile-content .title').text(data['title']);
                        $('.arctile-content .content').html(data['content']);
                    }
                });
            },
            setLogo: function (type) {  //1：J平台一 2：J平台二 3：J市场
                apiCall.other.getLogo({
                    "data": {"column": type},
                    "success": function (data) {
                        $('img.logo-img').attr('src', data['logo_url']);
                    }
                });
            },
            setSeo: function (type) { //  1：J平台-首页 2：J平台-项目管理 3：J平台-协同设计 4：J平台-云资料柜 5：J平台-项目讨论 6：J市场-首页 7：J市场-竞赛大厅 8：J市场-托管服务 9：J市场-校审服务
                apiCall.other.getLogo({
                    "data": {"column": type},
                    "success": function (data) {
                        $('head > meta').eq(0).after('<meta name="keyword" content="' + data['seo_crux'] + '">' +
                            '<meta name="description" content="' + data['seo_describe'] + '">');
                    }
                });
            },
        },

        /**
         * 获取地区名称数据
         * @param areaJsonString {string} "{'province':{'code':string,'value':string},'city':{'code':string,'value':string}}" 取出value值
         * @returns {{province: string, city: string}}
         */
        getAreaData: function (areaJsonString) {
            var result = {
                "province": "",
                "city": ""
            };
            if (!$.isJsonString(areaJsonString)) return result;
            var data = JSON.parse(areaJsonString);
            result["province"] = data['province'] ? data['province']['value'] : '';
            result["city"] = data['city'] ? data['city']['value'] : '';
            return result
        },

        /**
         * 获取单位名称
         * @param uniteJsonString {string} "{'name':string,'value':string}" 取出name值
         * @returns {string}
         */
        getUniteData: function (uniteJsonString) {
            var result = "";
            if (!$.isJsonString(uniteJsonString)) return result;
            return JSON.parse(uniteJsonString)['name'] || ''
        }
    };
})(jQuery);

var constants = {
    USER_BASE_INFO_TYPE: 0,
    USER_EDU_INFO_TYPE: 1,
    USER_WORK_INFO_TYPE: 2,
    USER_PROJECT_INFO_TYPE: 3,
    USER_LABEL_TYPE: 4,

    USER_GOTO_DEFAULT: 'project_crowd.html',
    USER_GOTO_EXPECT: ['login',
        'reg',
        'reset',
        'connect',
        'success'
    ],
    USER_GOTO_SPECIAL: ['index'],

    COOKIE_LOGIN_ERROR: 'loginErrorNum',
    COOKIE_URL_GOTO: 'prevUrl',
    COOKIE_URL_GOTO_MART: 'martPrevUrl',
    COOKIE_USER_INFO: 'userInfo',
    COOKIE_THIRD_INFO: 'TX',

    COOKIE_PROJECT_INFO: 'proinfo',
    COOKIE_PROJECT_TYPE: 'project_type',
    COOKIE_PROJECT_IMG: 'portrait_url',

    COOKIE_KEY_PROJECTID: 'proid',
    COOKIE_KEY_PROJECTID_TEMP: 'proid_temp',
    COOKIE_KEY_FILE_INFO: 'fileInfo',

    QQ_TYPE: 0,
    WX_TYPE: 1,
    MOBILE_TYPE: 2,
    EMAIL_TYPE: 3,
    QQ_APPID: '101354112',
    QQ_APPKEY: 'a216f8c9377e79179a9c75554147b4e3',
    WX_APPID: 'wx1649d02823aa73b3',
    WX_APPSECRET: '4310039dda38885574a9a42ce5577086',
    QQ_REDIRECT_URL: 'http://deakin.e2.luyouxia.net:31733/connect.html',

    //市场服务
    SERVICE_TYPE_RACE: 0, //竞赛服务
    SERVICE_TYPE_TRUST: 1, //托管服务
    SERVICE_TYPE_PROOF: 2, //校审服务
    SERVICE_TYPE_CROWD: 3, //众包服务

    URL_KEY_USER_ID: 'uid', //项目ID
    URL_KEY_PROJECT_ID: 'pid', //项目ID
    URL_KEY_DISCUSS_ID: 'did', //讨论ID
    URL_KEY_TASK_ID: 'tid', //任务ID
    URL_KEY_TEAM_MEMBER_ID: 'mid', //团队会员ID
    URL_KEY_TEAM_MEMBER_USER_ID: 'musrid', //团队会员ID
    URL_KEY_STAGE_ID: 'sid', //阶段ID
    URL_KEY_PROJECT_STAGE_ID: 'psid', //阶段ID
    URL_KEY_STAGE_NAME: 'sname', //阶段名称
    URL_KEY_STAGESPECIAL_ID: 'ssid', //阶段专业ID
    URL_KEY_STAGESPECIAL_NAME: 'ssname', //阶段专业ID
    URL_KEY_SPECIALTY_ID: 'spid', //专业ID
    URL_KEY_SPECIALTY_NAME: 'spname', //专业名称
    URL_KEY_MILESTONE_ID: 'msid', //里程碑ID

    URL_KEY_ORDER_ID: 'oid', //订单ID
    URL_KEY_TYPE: 'tp', //类型
    URL_KEY_SERVICE_TYPE: 'svtp', //服务类型


    FIELD_ROLE_CODE_CREATE: 'creater', //创建人
    FIELD_ROLE_CODE_LEADER: 'leader', //负责人
    FIELD_ROLE_CODE_MEMBER: 'member', //成员

    DATA_FIELD_MILESTONE: 'milestoneInfo', //里程碑数据

    ERROR_ACCOUNT_EXIST: '此账号已被注册',
    ERROR_ACCOUNT_NOTEXIST: '不存在此账号',
    ERROR_USERNAME_EXIST: '此用户名已被注册',
    ERROR_USERNAME_NOTEXIST: '不存在此账号',
    ERROR_MOBILE_EXIST: '此手机号已被注册或绑定',
    ERROR_MOBILE_NOTEXIST: '此手机号尚未注册或绑定',
    ERROR_EMAIL_EXIST: '此邮箱已被注册或绑定',
    ERROR_EMAIL_NOTEXIST: '此邮箱尚未注册或绑定'
};

var selectOption = {
    fn: {
        getOptHtmlStr: function (dataList, options) {
            var defaults = {
                    "textField": "name",
                    "valueField": "code",
                    "render": function (value, text) {
                        return '<option value="' + value + '">' + text + '</option>';
                    }
                }, setting = $.extend({}, defaults, options),
                textField = setting["textField"],
                valueField = setting["valueField"],
                render = setting["render"];
            var optHtmlStr = "";
            if (!(dataList instanceof Array)) dataList = [];
            for (var i = 0, len = dataList.length; i < len; i++) {
                var data = dataList[i];
                optHtmlStr += render(data[valueField], data[textField], i);
            }
            return optHtmlStr;
        },
        getOptText: function (dataList, optVal, options) {
            var defaults = {
                    "textField": "name",
                    "valueField": "code",
                    "splitSeparator": ",",
                    "joinSeparator": "、"
                }, setting = $.extend({}, defaults, options),
                textField = setting["textField"],
                valueField = setting["valueField"],
                splitSeparator = setting["splitSeparator"],
                joinSeparator = setting["joinSeparator"];
            if (!(dataList instanceof Array)) return "";
            optVal += '';
            var arr = optVal.split(splitSeparator),
                result = '';
            for (var k = 0, l = arr.length; k < l; k++) {
                var id = arr[k];
                for (var i = 0, len = dataList.length; i < len; i++) {
                    var data = dataList[i];
                    if (data[valueField] == id) {
                        result += (result ? joinSeparator : '') + (data[textField] || "");
                    }
                }
            }
            return result;
        }
    },
    data: {
        //项目类型
        projectType: [
            {
                'name': '新建项目',
                'code': '1001'
            },
            {
                'name': '扩建项目',
                'code': '1002'
            },
            {
                'name': '迁建项目',
                'code': '1003'
            },
            {
                'name': '恢复项目',
                'code': '1004'
            }
        ],
        //项目规模
        projectScale: [
            {
                'name': '小型项目',
                'code': '2001'
            },
            {
                'name': '中型项目',
                'code': '2002'
            },
            {
                'name': '大型项目',
                'code': '2003'
            }
        ],
        //职位
        workPost: [
            {
                'name': '设计总监',
                'code': '3001'
            },
            {
                'name': '主创设计师',
                'code': '3002'
            },
            {
                'name': '设计师',
                'code': '3003'
            },
            {
                'name': '项目负责人',
                'code': '3004'
            },
            {
                'name': '造价师',
                'code': '3005'
            },
            {
                'name': '造价员',
                'code': '3006'
            },
            {
                'name': '其他',
                'code': '3007'
            }
        ],
        //学历
        degree: [
            {
                'name': '本科以下',
                'code': '4001'
            },
            {
                'name': '本科',
                'code': '4002'
            },
            {
                'name': '硕士',
                'code': '4003'
            },
            {
                'name': '博士及以上',
                'code': '4004'
            }
        ],
        //人员规模
        staffScale: [
            {
                'name': '1-20人',
                'code': '1'
            },
            {
                'name': '21-50人',
                'code': '2'
            },
            {
                'name': '51-100人',
                'code': '3'
            },
            {
                'name': '101-200人',
                'code': '4'
            },
            {
                'name': '200人以上',
                'code': '5'
            }
        ],
        //团队规模
        teamScale: [
            {
                'name': '1-20人',
                'code': '1'
            },
            {
                'name': '21-50人',
                'code': '2'
            },
            {
                'name': '51-100人',
                'code': '3'
            },
            {
                'name': '101-200人',
                'code': '4'
            },
            {
                'name': '200人以上',
                'code': '5'
            }
        ],
        //资质
        aptitude: [
            {
                'name': '要求资质证书',
                'code': '7001'
            }
        ],
        //发票类型
        invoiceType: [
            {
                'name': '增值税普通发票',
                'code': '8001'
            },
            {
                'name': '增值税专用发票',
                'code': '8002'
            }
        ],
    }
};

function RenderList(options) {
    var selfObj = this;
    var defaults = {
            "container": '', //列表容器
            "tpl": '', //渲染模板
            "itemClass": 'list-item', //用于识别列表项的class属性
            "dataField": 'listItemInfo', //列表项储存数据时的字段
            "extendName": '', //列表项储存数据时的拓展数据的字段
            "extendValue": '', //列表项储存数据时的拓展数据的值
            "indexName": 'list_index', //如果设置了，就给数据增加一个此值的字段名，并储存索引值
            "saveIndex": false, //是否将"indexName"的数据储存起来，默认false
            "saveExtend": false, //是否将"extendValue"的数据储存起来，默认false
        }, $ = jQuery,
        setting = $.extend({}, defaults, options),
        tpl = setting["tpl"],
        dataField = setting["dataField"],
        indexName = setting["indexName"],
        saveExtend = setting["saveExtend"],
        saveIndex = setting["saveIndex"];

    this.container = $(setting["container"]);
    this.tpl = setting["tpl"];
    this.extendName = setting["extendName"];
    this.extendValue = setting["extendValue"];
    this.itemClass = setting["itemClass"];

    this.getOption = function () {
        return options;
    };
    this.getSetting = function () {
        return setting;
    };

    //获取所有列表项
    this.getListItems = function () {
        return selfObj.container.find('.' + selfObj.itemClass);
    };

    //获取列表项数据
    this.setItemData = function (item, info) {
        return item.data(dataField, info);
    };

    //设置列表项数据
    this.getItemData = function (item) {
        var data = $(item).data(dataField);
        return data;
    };
    //获取待渲染的列表项
    this.getListItem = function (info) {

        //合并数据
        var extend = {};
        if (selfObj.extendName && selfObj.extendValue) {
            extend[selfObj.extendName] = selfObj.extendValue;
        } else if (selfObj.extendValue) {
            extend = selfObj.extendValue;
        }
        info = $.extend({}, info, extend);

        //渲染
        var render = laytpl(selfObj.tpl).render(info);
        var item = $(render).addClass(selfObj.itemClass);

        //是否储存索引
        if (!saveIndex) delete info[indexName];

        //是否储存扩展数据
        if (!saveExtend) {
            if (selfObj.extendName) {
                delete info[selfObj.extendName];
            } else {
                for (var key in selfObj.extendValue) {
                    delete info[key];
                }
            }
        }

        //储存数据
        selfObj.setItemData(item, info);

        return item;
    };
    //添加到列表
    this.addListItems = function (list) {
        if (!(Object.prototype.toString.call(list) === '[object Array]')) list = [list];
        var arr = [];
        if (indexName) var index = selfObj.getListItems().length;
        for (var i = 0, len = list.length; i < len; i++) {
            if (indexName) list[i][indexName] = index + i;
            var item = selfObj.getListItem(list[i]);
            arr.push(item);
            selfObj.container.append(item);
        }
        return arr;
    };

    //载入列表
    this.loadListItems = function (list) {
        selfObj.container.empty();
        return selfObj.addListItems(list);
    };
    //更新列表项
    this.updateListItem = function (item, newInfo) {
        var info = $.extend({}, selfObj.getItemData(item), newInfo);
        var render = selfObj.getListItem(info);
        $(item).replaceWith(render);
        return render;
    };

    this.updateContainer = function (container) {
        container ? selfObj.container = $(container) : selfObj.container = $(setting["container"]);
        return selfObj;
    };

    this.each = function (arr, fn) {
        for (var i = 0, len = arr.length; i < len; i++) {
            if (fn.call(arr[i]) === false) break;
        }
    }
}

function RenderContainer(options) {
    var selfObj = this;
    var defaults = {
            "container": '', //列表容器
            "tpl": '', //渲染模板
            "dataField": 'containerInfo', //列表项储存数据时的字段
            "extendName": '', //列表项储存数据时的拓展数据的字段
            "extendValue": '', //列表项储存数据时的拓展数据的值
        }, $ = jQuery,
        setting = $.extend({}, defaults, options),
        tpl = setting["tpl"],
        itemClass = setting["itemClass"],
        dataField = setting["dataField"];

    this.container = $(setting["container"]);
    this.tpl = setting["tpl"];
    this.extendName = setting["extendName"];
    this.extendValue = setting["extendValue"];

    //获取传入的配置
    this.getOption = function () {
        return options;
    };

    //获取实际配置
    this.getSetting = function () {
        return setting;
    };

    //获取数据
    this.setData = function (info) {
        return selfObj.container.data(dataField, info);
    };

    //设置数据
    this.getData = function () {
        return selfObj.container.data(dataField);
    };

    //获取待渲染的内容
    this.getContent = function (info) {
        var extend = {};
        if (selfObj.extendName && selfObj.extendValue) {
            extend[selfObj.extendName] = selfObj.extendValue;
        } else if (selfObj.extendValue) {
            extend = selfObj.extendValue;
        }
        info = $.extend({}, info, extend);
        var render = laytpl(selfObj.tpl).render(info);
        return render;
    };

    //渲染
    this.render = function (data) {
        var content = selfObj.getContent(data);
        selfObj.container.html(content);
        selfObj.setData(data);
        return selfObj.container;
    };

    //更新容器
    this.updateContainer = function (container) {
        container ? selfObj.container = $(container) : selfObj.container = $(setting["container"]);
        return selfObj;
    };

    //更新
    this.update = function (newInfo) {
        var info = $.extend({}, selfObj.getData(), newInfo);
        return selfObj.render(info);
    };
}