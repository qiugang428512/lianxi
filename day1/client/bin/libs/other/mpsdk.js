var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var mpsdk;
(function (mpsdk) {
    /**
     * 环境配置模块
     */
    var Env = /** @class */ (function () {
        function Env() {
        }
        /**
         * SDK版本号
         */
        Env.version = '2.15.5';
        /**
         * 编译时间戳
         */
        Env.build = '20191030133151';
        /**
         * 本地缓存键名前缀
         */
        Env.storagePrefix = 'mpsdk_';
        /**
         * 认证服务器
         */
        Env.loginServer = 'https://xyxcck-auth.raink.com.cn';
        /**
         * 认证服务器(qq、微信)
         */
        Env.newLoginServer = 'https://xyxcck-login.raink.com.cn';
        /**
         * 一般日志服务器
         */
        Env.reportServer1 = 'https://xyxcck-log.raink.com.cn';
        /**
         * 重要日志服务器
         */
        Env.reportServer2 = 'https://xyxcck-log-ad.raink.com.cn';
        /**
         * public服务器
         */
        Env.publicServer = 'https://xyx-public.raink.com.cn';
        /**
         * 好友和用户信息服务器
         */
        Env.friendServer = 'https://xyxcck-friend.raink.com.cn';
        /**
         * 资源服务器
         */
        Env.cdnServer = 'https://cdn-xyx.raink.com.cn';
        /**
         * 推广接口
         */
        Env.extServer = 'https://xyx-pdd-api.raink.com.cn';
        /**
         * 盒子接口，游戏项目不适用
         */
        Env.boxServer = 'https://xyx-mainland-api.raink.com.cn';
        /**
         * 跟踪广告转化服务器
         */
        Env.trackAdServer = 'https://mainland-xyxzsdl-wx.raink.com.cn';
        Env.photoServer = 'https://photo-xyx.raink.com.cn';
        /**
         * 是否打印SDK日志
         */
        Env.showLog = true;
        /**
         * SDK是否经过初始化
         */
        Env.init = false;
        Env.isRewardedVideoAd2Back = false;
        Env.isClickRewardedVideoAdDialogOk = false;
        Env.isRewardedVideoAdDialogShow = false;
        Env.phoneModel = '';
        Env.mpsdkChannel = 'mpsdk';
        Env.mpsdkImei = '';
        return Env;
    }());
    mpsdk.Env = Env;
})(mpsdk || (mpsdk = {}));
var mpsdk;
(function (mpsdk) {
    /**
     * 工具模块
     */
    var utils = /** @class */ (function () {
        function utils() {
        }
        /**
         * 分析用户来源
         * @param options 启动参数
         * @returns 用户来源
         */
        utils.parseAccountSource = function (options) {
            var source;
            // 已知type类型share/wxad/std/ad/link/wx
            if (options.query.type == 'share') { //从分享链接进来
                source = {
                    sourceType: options.query.type,
                    sourceId: options.query.shareid
                };
            }
            else if (options.query.type == 'wxad') { //从官方广告进来
                source = {
                    sourceType: options.query.type,
                    sourceId: options.query.adid + '.' + options.query.weixinadinfo
                };
            }
            else if (options.query.type) { //从外链进来type=ad或type=link
                source = {
                    sourceType: options.query.type,
                    sourceId: options.query.adid
                };
            }
            else { //从其他地方进来
                source = {
                    sourceType: 'std',
                    sourceId: options.scene
                };
            }
            return source;
        };
        /**
         * 获取对象属性值
         * @param model 数据对象
         * @param attribute 属性，以.分割层级，如a.b.c
         * @param defaultValue 指定的属性不存在时返回默认值
         */
        utils.value = function (model, attribute, defaultValue) {
            if (defaultValue === void 0) { defaultValue = undefined; }
            if (typeof model == 'undefined') {
                return defaultValue;
            }
            for (var _i = 0, _a = attribute.split('.'); _i < _a.length; _i++) {
                var key = _a[_i];
                if (typeof model[key] != 'undefined') {
                    model = model[key];
                }
                else {
                    return defaultValue;
                }
            }
            return model;
        };
        /**
         * 获取url请求参数
         * @param query http参数
         * @param key 参数名
         */
        utils.getQueryString = function (query, key) {
            var reg = new RegExp('(\\?|&)' + key + "=([^&]*)(&|$)");
            var r = query.match(reg);
            if (r != null) {
                return r[2];
            }
            return '';
        };
        /**
         * 构造http请求参数
         * @param params 键值对
         */
        utils.httpBuildQuery = function (params) {
            var requestParams = '';
            for (var key in params) {
                requestParams += key + '=' + params[key] + '&';
            }
            return requestParams.substr(0, requestParams.length - 1);
        };
        /**
         * 将url中的请求参数解析为键值对
         */
        utils.httpParseQuery = function (url) {
            var result = {};
            //如果url为空则直接返回
            if (!url) {
                return result;
            }
            //取url中的query部分（url也可以是纯query，不包含页面路径）
            var query = url.toString().split('?')[1] || url.toString(); //toString可以防止传入number类型没有split方法
            //如果query中没有键值对则直接返回
            if (query.indexOf('=') == -1) {
                return result;
            }
            //分解键值对
            for (var _i = 0, _a = query.split('&'); _i < _a.length; _i++) {
                var kv = _a[_i];
                var kvSplit = kv.split('=');
                result[kvSplit[0]] = kvSplit[1];
            }
            return result;
        };
        /**
         * 等待数据
         * @param dataProvider 数据提供函数
         * @param thisObject 数据提供函数的this作用域
         * @param interval 尝试获取数据的间隔
         * @param timeout 最大尝试时间
         * @param params 数据提供函数所需的参数
         */
        utils.waitData = function (dataProvider, thisObject, interval, timeout) {
            if (interval === void 0) { interval = 200; }
            if (timeout === void 0) { timeout = 30000; }
            var params = [];
            for (var _i = 4; _i < arguments.length; _i++) {
                params[_i - 4] = arguments[_i];
            }
            return new Promise(function (resolve, reject) {
                var _timerInterval;
                var _timerTimeout;
                _timerInterval = mpsdk.Platform.instance.setInterval(function () {
                    var data = dataProvider.call.apply(dataProvider, [thisObject].concat(params));
                    if (data) {
                        mpsdk.Platform.instance.clearInterval(_timerInterval);
                        mpsdk.Platform.instance.clearTimeout(_timerTimeout);
                        resolve(data);
                    }
                }, interval);
                _timerTimeout = mpsdk.Platform.instance.setTimeout(function () {
                    mpsdk.Platform.instance.clearInterval(_timerInterval);
                }, timeout);
            });
        };
        /**
         * 圆桌随机抽取/排序
         * @param dataList Array 数据列表
         * @param weightKey String 权重字段，权重值必须为正数
         * @param popOne Boolean true表示只抽取一个，false表示返回排序列表
         * @param thresholdUp Number 阀值上限，>=此阀值则必然被抽中，且排在首位；如果有多个超过阀值的数据，则各自按原数据顺序排序
         * @param thresholdLow Number 阀值下限，<=此阀值则无条件丢弃
         */
        utils.tableAlgorithm = function (dataList, weightKey, popOne, thresholdUp, thresholdLow) {
            if (popOne === void 0) { popOne = true; }
            if (thresholdUp === void 0) { thresholdUp = Number.MAX_VALUE; }
            if (thresholdLow === void 0) { thresholdLow = 0; }
            if (!dataList || !dataList.length) {
                return [];
            }
            var headList = []; //上限优选列表
            var tableList = []; //桌面列表
            var tableCount = 0; //桌面大小
            for (var i = 0; i < dataList.length || 0; i++) {
                //剔除权重字段不正确的数据
                if (isNaN(dataList[i][weightKey])) {
                    continue;
                }
                //规范数据类型
                dataList[i][weightKey] = Number(dataList[i][weightKey]);
                //下限过滤
                if (dataList[i][weightKey] <= thresholdLow) {
                    continue;
                }
                //上限优选
                if (dataList[i][weightKey] >= thresholdUp) {
                    headList.push(dataList[i]);
                    continue;
                }
                //构造桌面
                tableList.push(dataList[i]);
                tableCount += dataList[i][weightKey];
            }
            //防止意外出现死循环
            if (!tableCount || !tableList.length) {
                return headList;
            }
            //圆桌排序
            var sortList = []; //排序后的列表
            while (tableList.length) {
                var point = Math.random(); //指针
                var sectorStart = 0; //扇区起始位置
                for (var i = 0; i < tableList.length; i++) {
                    var sectorEnd = sectorStart + tableList[i][weightKey] / tableCount; //扇区终止位置
                    //转盘指针落入区间
                    if (point >= sectorStart && point < sectorEnd) {
                        sortList.push(tableList[i]);
                        tableCount -= tableList[i][weightKey];
                        tableList.splice(i, 1);
                        break;
                    }
                    //移动扇区
                    sectorStart = sectorEnd;
                }
            }
            //拼合结果列表
            var resultList = headList.concat(sortList);
            //返回数据
            if (popOne) {
                return resultList[0];
            }
            else {
                return resultList;
            }
        };
        /**
         * 字符串转ArrayBuffer
         */
        utils.string2Buffer = function (data) {
            var buf = new ArrayBuffer(data.length);
            var bufView = new Uint8Array(buf);
            for (var i = 0; i < data.length; i++) {
                bufView[i] = data.charCodeAt(i);
            }
            return buf;
        };
        /**
         * ArrayBuffer转字符串
         */
        utils.buffer2String = function (data) {
            var charCode = new Array(data.byteLength);
            var dv = new Uint8Array(data);
            for (var i = 0; i < data.byteLength; i++) {
                charCode[i] = String.fromCharCode(dv[i]);
            }
            return charCode.join('');
        };
        /**
         * 深度比较
         */
        utils.deepCompare = function (x, y) {
            // 缓存通道（主要用于处理循环引用的问题）
            var leftChain, rightChain;
            // 子函数
            function compare2Objects(x, y) {
                // 比较NaN
                // typeof NaN == 'number'
                // NaN === NaN = false
                // isNaN(undefined) = true
                if (isNaN(x) && isNaN(y) && typeof x === 'number' && typeof y === 'number') {
                    return true;
                }
                // 相同字符串 或者 相同引用
                if (x === y) {
                    return true;
                }
                // 可以通过toString()方法进行比较的类型
                if ((typeof x === 'function' && typeof y === 'function') ||
                    (x instanceof Date && y instanceof Date) ||
                    (x instanceof RegExp && y instanceof RegExp) ||
                    (x instanceof String && y instanceof String) ||
                    (x instanceof Number && y instanceof Number)) {
                    return x.toString() === y.toString();
                }
                // 两个都是Object
                if (!(x instanceof Object && y instanceof Object)) {
                    return false;
                }
                // 原型链是否存在包含关系
                if (x.isPrototypeOf(y) || y.isPrototypeOf(x)) {
                    return false;
                }
                //构造函数是否相等
                if (x.constructor !== y.constructor) {
                    return false;
                }
                //检查成员是否相等
                if (x.prototype !== y.prototype) {
                    return false;
                }
                // 如果存在于缓存通道之中则说明之前比较久失败了，可以直接返回
                if (leftChain.indexOf(x) > -1 || rightChain.indexOf(y) > -1) {
                    return false;
                }
                for (var p in y) {
                    // 正向检查检查属性名和类型是否相等
                    if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                        return false;
                    }
                    else if (typeof y[p] !== typeof x[p]) {
                        return false;
                    }
                }
                for (var p in x) {
                    // 反向检查检查属性名和类型是否相等
                    if (y.hasOwnProperty(p) !== x.hasOwnProperty(p)) {
                        return false;
                    }
                    else if (typeof y[p] !== typeof x[p]) {
                        return false;
                    }
                    // 迭代检查属性值
                    switch (typeof (x[p])) {
                        case 'object':
                        case 'function':
                            leftChain.push(x);
                            rightChain.push(y);
                            if (!compare2Objects(x[p], y[p])) {
                                return false;
                            }
                            leftChain.pop();
                            rightChain.pop();
                            break;
                        default:
                            if (x[p] !== y[p]) {
                                return false;
                            }
                            break;
                    }
                }
                return true;
            }
            // 参数个数检查
            if (arguments.length < 1) {
                return true;
            }
            // 从左到右依次比较
            for (var i = 1, l = arguments.length; i < l; i++) {
                leftChain = [];
                rightChain = [];
                if (!compare2Objects(arguments[0], arguments[i])) {
                    return false;
                }
            }
            return true;
        };
        /**
        * 绘制圆角矩形
        * @param ctx canvas上下文
        * @param x 圆角矩形选区的左上角 x坐标
        * @param y 圆角矩形选区的左上角 y坐标
        * @param w 圆角矩形选区的宽度
        * @param h 圆角矩形选区的高度
        * @param r 圆角的半径
        * @param lineWidth 边线粗细
        */
        utils.drawRoundRect = function (ctx, x, y, w, h, r, lineWidth) {
            ctx.beginPath();
            ctx.strokeStyle = "#FFF";
            ctx.lineWidth = lineWidth;
            ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5);
            ctx.moveTo(x + r, y);
            ctx.lineTo(x + w - r, y);
            ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2);
            ctx.lineTo(x + w, y + h - r);
            ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5);
            ctx.lineTo(x + r, y + h);
            ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI);
            ctx.lineTo(x, y + r);
            ctx.stroke();
            ctx.closePath();
        };
        utils.generateUUID = function () {
            var d = new Date().getTime();
            // xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
            var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uuid;
        };
        /**
         * 时间戳+随机数生成UUID
         */
        utils.createClientUUID = function () {
            return (new Date()).getTime() + "" + (Math.random() * 10000000).toString(10).substr(0, 6);
        };
        utils.setFirstLaunchOptions = function (launchOptions) {
            if (!launchOptions || !launchOptions.scene) {
                return;
            }
            var oldLaunchOptions = mpsdk.Platform.instance.getStorage('mpsdk_first_into_launch_options');
            if (oldLaunchOptions && oldLaunchOptions.scene) {
                return;
            }
            mpsdk.Platform.instance.setStorage('mpsdk_first_into_launch_options', launchOptions);
        };
        utils.getFirstLaunchOptions = function () {
            return mpsdk.Platform.instance.getStorage('mpsdk_first_into_launch_options');
        };
        utils.checkAbroadCity = function (hackData) {
            var currentProvince = utils.value(hackData, 'ipArea.province'); //当前省份
            var currentCity = utils.value(hackData, 'ipArea.city'); //当前城市
            var currentCountry = utils.value(hackData, 'ipArea.country'); //当前国家
            return currentCountry && currentCountry.indexOf('中国') == -1
                || currentProvince && currentProvince.indexOf('台湾') != -1
                || currentCity && currentCity.indexOf('台湾') != -1
                || currentProvince && currentProvince.indexOf('香港') != -1
                || currentCity && currentCity.indexOf('香港') != -1
                || currentProvince && currentProvince.indexOf('澳门') != -1
                || currentCity && currentCity.indexOf('澳门') != -1;
        };
        utils.nativeAppLogin = function (launchOptions) {
            var openId = mpsdk.Account.getOpenId();
            mpsdk.log('服务端登录开始openid', openId);
            var beginTime = new Date().getTime();
            if (mpsdk.Env.mpsdkChannel) {
                mpsdk.Env.launchOptions = {
                    scene: mpsdk.Env.mpsdkChannel,
                    query: {}
                };
            }
            var accountSource = utils.parseAccountSource(mpsdk.Env.launchOptions);
            mpsdk.Report.reportNewUserLog(mpsdk.constant.NewUserLogEnum.ACTION_PT_LOGIN_BEGIN);
            var phoneMode = mpsdk.Env.phoneModel ? mpsdk.Env.phoneModel : mpsdk.Platform.instance.getSystem().platform;
            var mpsdkImei = mpsdk.Env.mpsdkImei ? mpsdk.Env.mpsdkImei : '';
            return new Promise(function (resolve, reject) {
                var data = {
                    gameId: mpsdk.Env.gameId,
                    unionId: 'false',
                    sourceType: accountSource.sourceType,
                    sourceId: accountSource.sourceId,
                    model: encodeURIComponent(phoneMode),
                    openId: openId,
                    imei: mpsdkImei
                };
                var loginUrl = mpsdk.Env.newLoginServer + '/MiniLogin/data/GetOpenIdApp.action';
                mpsdk.log('nativeAppLogin 参数:', JSON.stringify(data));
                mpsdk.Platform.instance.httpRequest(loginUrl, data, 'get').then(function (res) {
                    mpsdk.log('服务端登录成功', JSON.stringify(res));
                    if (res && res.openid) {
                        mpsdk.Report.reportNewUserLog(mpsdk.constant.NewUserLogEnum.ACTION_PT_LOGIN_END, mpsdk.constant.NewUserLogStatusEnum.STATUS_REPORT_SUCCESS, '' + beginTime, res.openid);
                    }
                    else {
                        mpsdk.Report.reportNewUserLog(mpsdk.constant.NewUserLogEnum.ACTION_PT_LOGIN_END, mpsdk.constant.NewUserLogStatusEnum.STATUS_REPORT_FAILS, beginTime + '_服务器登录成功,但未获取到openid,errorcode=' + res.error);
                    }
                    resolve(res);
                }).catch(function (res) {
                    mpsdk.log('服务端登录失败', JSON.stringify(res));
                    mpsdk.Report.reportNewUserLog(mpsdk.constant.NewUserLogEnum.ACTION_PT_LOGIN_END, mpsdk.constant.NewUserLogStatusEnum.STATUS_REPORT_FAILS, beginTime + '_服务器登录失败：' + JSON.stringify(res));
                    reject(res);
                });
            });
        };
        return utils;
    }());
    mpsdk.utils = utils;
})(mpsdk || (mpsdk = {}));
/// <reference path="Env.ts" />
/// <reference path="utils.ts" />
var mpsdk;
(function (mpsdk) {
    /**
     * 玩一玩平台适配器
     * @external
     */
    var BricksPlatform = /** @class */ (function () {
        function BricksPlatform() {
        }
        BricksPlatform.prototype.writeFile = function (fileName, data) {
            return '';
        };
        BricksPlatform.prototype.getStorage = function (key) {
            var file = "GameSandBox://" + mpsdk.Env.storagePrefix + key;
            if (BK.FileUtil.isFileExist(file)) {
                try {
                    var data = BK.FileUtil.readFile(file).readAsString();
                    return data ? JSON.parse(data) : '';
                }
                catch (e) {
                    return '';
                }
            }
            else {
                return '';
            }
        };
        BricksPlatform.prototype.setStorage = function (key, data) {
            BK.FileUtil.writeFile("GameSandBox://" + mpsdk.Env.storagePrefix + key, JSON.stringify(data));
        };
        BricksPlatform.prototype.httpRequest = function (url, params, method, retryTimes) {
            if (method === void 0) { method = 'get'; }
            if (retryTimes === void 0) { retryTimes = 2; }
            //参数处理
            var requestParams = '';
            if (params) {
                for (var key in params) {
                    requestParams += key + '=' + params[key] + '&';
                }
                if (requestParams) {
                    //去除末尾&
                    requestParams = requestParams.substr(0, requestParams.length - 1);
                    //如果是get请求则直接把参数链接到url后面
                    if (method == 'get') {
                        url += url.indexOf('?') == -1 ? '?' : '&';
                        url += requestParams;
                    }
                }
            }
            return new Promise(function (resolve, reject) {
                var responseHandler = function (resBuffer, code) {
                    if (Number(code) !== 200) {
                        // reject(code);
                    }
                    //读取该死的数据流，鬼知道我都经历了神马！
                    var reslen = resBuffer.bufferLength();
                    var response = resBuffer.readAsString();
                    //当buffer说他有数据但我又没读到任何东西时就一直弄
                    while (response.length == 0 && reslen > 0) {
                        response += resBuffer.readAsString();
                    }
                    //有时候吃多了要吐出来
                    if (response.length > reslen) {
                        response = response.substring(0, reslen);
                    }
                    //最诡异的是就这样了尾部还会有莫名乱入
                    var endPoint = Math.max(response.lastIndexOf(']'), response.lastIndexOf('}')) + 1;
                    response = response.substring(0, endPoint);
                    //解析JSON
                    try {
                        resolve(JSON.parse(response));
                    }
                    catch (e) {
                        // log('尝试解析JSON数据出错', e.toString(), response);
                        resolve(response);
                    }
                };
                if (method == 'get') {
                    var httpget = new BK.HttpUtil(url);
                    httpget.setHttpMethod("get");
                    httpget.requestAsync(responseHandler);
                }
                else {
                    var httppost = new BK.HttpUtil(url);
                    httppost.setHttpMethod("post");
                    httppost.setHttpPostData(requestParams);
                    httppost.requestAsync(responseHandler);
                }
            });
        };
        BricksPlatform.prototype.getUserAccount = function (launchOptions) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { openid: GameStatusInfo.openId }];
                });
            });
        };
        BricksPlatform.prototype.getUserInfo = function () {
            var userInfo = {
                nickName: "",
                avatarUrl: "1",
                gender: GameStatusInfo.sex,
            };
            return new Promise(function (resolve, reject) {
                BK.MQQ.Account.getNick(GameStatusInfo.openId, function (openId, nick) {
                    userInfo.nickName = nick;
                    userInfo.nickName && userInfo.avatarUrl && resolve(userInfo);
                });
                // BK.MQQ.Account.getHead(GameStatusInfo.openId, function (openId: string, BuffInfo: BK.MQQ.HeadBufferInfo) {
                //     userInfo.avatarUrl = '1';
                //     userInfo.nickName && userInfo.avatarUrl && resolve(userInfo);
                // });
            });
        };
        BricksPlatform.prototype.getSystem = function () {
            return { platform: GameStatusInfo.platform };
        };
        BricksPlatform.prototype.getLaunchOptions = function () {
            return {
                scene: GameStatusInfo.src || 0,
                query: GameStatusInfo.gameParam ? mpsdk.utils.httpParseQuery(GameStatusInfo.gameParam) : {},
            };
        };
        BricksPlatform.prototype.launchTo = function (app) {
            return __awaiter(this, void 0, void 0, function () {
                var extendInfo, position;
                return __generator(this, function (_a) {
                    position = app.page.indexOf('?');
                    if (position != -1) {
                        extendInfo = app.page.substring(position + 1);
                    }
                    else {
                        extendInfo = app.page;
                    }
                    BK.QQ.skipGame(Number(app.appid), extendInfo);
                    mpsdk.log('打开其他程序，desGameId=', app.appid, 'extendInfo=', extendInfo);
                    return [2 /*return*/];
                });
            });
        };
        BricksPlatform.prototype.launchToSync = function (app, launchToCallback) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    mpsdk.log('打开其他程序，appId=', app.appid, 'path=', app.page);
                    return [2 /*return*/];
                });
            });
        };
        BricksPlatform.prototype.share = function (shareInfo, success, fail, thisObject) {
            var randomShareInfo = mpsdk.Share.genShareInfo(shareInfo);
            var info = {};
            info.summary = randomShareInfo.title;
            info.picUrl = randomShareInfo.image;
            randomShareInfo.localPicPath && (info.localPicPath = randomShareInfo.localPicPath);
            info.extendInfo = mpsdk.Share.getShareQuery(randomShareInfo.serial, randomShareInfo.params || {}, randomShareInfo.imageId);
            mpsdk.log('分享外链参数 extendInfo =', info.extendInfo);
            BK.QQ.share(info, function (retCode, shareDest, isFirstShare) {
                mpsdk.log('分享结果：(retCode, shareDest, isFirstShare)=>', retCode, shareDest, isFirstShare);
                if (retCode == 0) {
                    mpsdk.Share.reportShareOut(shareInfo.serial, randomShareInfo.imageId.toString(), shareDest.toString(), isFirstShare.toString());
                    success && success.call(thisObject, shareDest, isFirstShare);
                }
                else {
                    fail && fail.call(thisObject, retCode);
                }
            });
            return info;
        };
        BricksPlatform.prototype.getCacheRes = function (url, waitDownload) {
            if (waitDownload === void 0) { waitDownload = false; }
            return Promise.resolve(url);
        };
        BricksPlatform.prototype.setTimeout = function (callback, timeout) {
            var t = new BK.Ticker();
            t.interval = timeout / 1000 * 60;
            t.setTickerCallBack(function (ts, duration) {
                t.paused = true;
                callback.call();
                t.dispose();
            });
            return t;
        };
        BricksPlatform.prototype.setInterval = function (callback, timeout) {
            var t = new BK.Ticker();
            t.interval = timeout / 1000 * 60;
            t.setTickerCallBack(function (ts, duration) {
                callback.call();
            });
            return t;
        };
        BricksPlatform.prototype.clearTimeout = function (t) {
            if (t) {
                t.paused = true;
                t.dispose();
            }
        };
        BricksPlatform.prototype.clearInterval = function (t) {
            if (t) {
                t.paused = true;
                t.dispose();
            }
        };
        BricksPlatform.prototype.checkBannerClick = function (res) {
            throw new Error("Method not implemented.");
        };
        BricksPlatform.prototype.onHide = function () {
        };
        BricksPlatform.prototype.showModal = function (object) {
        };
        return BricksPlatform;
    }());
    mpsdk.BricksPlatform = BricksPlatform;
})(mpsdk || (mpsdk = {}));
/// <reference path="Env.ts" />
/// <reference path="utils.ts" />
var mpsdk;
(function (mpsdk) {
    /**
     * 微信平台适配器
     * @external
     */
    var MinaPlatform = /** @class */ (function () {
        function MinaPlatform() {
        }
        MinaPlatform.prototype.writeFile = function (fileName, data) {
            if (!fileName || !data) {
                return '';
            }
            var fs = wx.getFileSystemManager();
            var rootDir = wx.env.USER_DATA_PATH + '/mpsdkadwx';
            var filePath = rootDir + '/' + fileName;
            try {
                fs.accessSync(rootDir);
            }
            catch (error) {
                fs.mkdirSync(rootDir);
            }
            try {
                fs.accessSync(filePath);
                return filePath;
            }
            catch (error) {
            }
            var fileNameList = new Array();
            try {
                fileNameList = fs.readdirSync(rootDir);
                var nameSplitArray = fileName.split('_');
                var prefixName = nameSplitArray[0];
                for (var i = 0; i < fileNameList.length; i++) {
                    var tempFileName = fileNameList[i];
                    if (tempFileName.indexOf(prefixName + '_') == 0) {
                        fs.unlinkSync(filePath);
                        break;
                    }
                }
            }
            catch (error) {
            }
            try {
                fs.writeFileSync(filePath, data, 'utf-8');
            }
            catch (e) {
                console.log('write file fail. filename:', fileName, ' error:', e);
                filePath = '';
            }
            return filePath;
        };
        MinaPlatform.prototype.getStorage = function (key) {
            return wx.getStorageSync(mpsdk.Env.storagePrefix + key);
        };
        MinaPlatform.prototype.setStorage = function (key, data, isSync) {
            if (isSync === void 0) { isSync = true; }
            try {
                if (isSync) {
                    wx.setStorageSync(mpsdk.Env.storagePrefix + key, data);
                }
                else {
                    wx.setStorage({
                        key: mpsdk.Env.storagePrefix + key,
                        data: data
                    });
                }
            }
            catch (e) {
            }
        };
        MinaPlatform.prototype.httpRequest = function (url, params, method, retryTimes) {
            if (method === void 0) { method = 'get'; }
            if (retryTimes === void 0) { retryTimes = 2; }
            return __awaiter(this, void 0, void 0, function () {
                var network, requestParams, key;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                                wx.getNetworkType({
                                    success: function (res) { resolve(res); },
                                    fail: function (res) { reject(res); }
                                });
                            })];
                        case 1:
                            network = _a.sent();
                            if (network.networkType == 'none') {
                                throw '当前网络不可用';
                            }
                            requestParams = '';
                            if (params) {
                                for (key in params) {
                                    requestParams += key + '=' + params[key] + '&';
                                }
                                if (requestParams) {
                                    //去除末尾&
                                    requestParams = requestParams.substr(0, requestParams.length - 1);
                                    //如果是get请求则直接把参数链接到url后面
                                    if (method == 'get') {
                                        url += url.indexOf('?') == -1 ? '?' : '&';
                                        url += requestParams;
                                    }
                                }
                            }
                            return [4 /*yield*/, new Promise(function (resolve, reject) {
                                    var requestOptions = {
                                        url: url,
                                        header: {
                                            'Content-Type': 'application/json;charset=UTF-8'
                                        }
                                    };
                                    // requestOptions['header']='"Content-Type":"application/json;charset=UTF-8"';
                                    //POST
                                    if (method != 'get') {
                                        requestOptions['method'] = 'POST';
                                        requestOptions['data'] = params;
                                    }
                                    //重试机制
                                    var retryCount = 0;
                                    var retrySend = function (reason) {
                                        if (++retryCount <= retryTimes) {
                                            wx.request(requestOptions);
                                            mpsdk.log('HTTP请求重试(' + retryCount + ')', url);
                                            return true;
                                        }
                                        reject(reason);
                                        return false;
                                    };
                                    //成功
                                    requestOptions.success = function (response) {
                                        if (response.statusCode && response.statusCode >= 200 && response.statusCode < 400) {
                                            resolve(response.data);
                                        }
                                        else {
                                            retrySend(response);
                                        }
                                    };
                                    //失败
                                    requestOptions.fail = function (reason) {
                                        retrySend(reason);
                                    };
                                    //发出请求
                                    wx.request(requestOptions);
                                })];
                        case 2: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        // public getUserAccount(launchOptions: ILaunchOptions): Promise<IAccount> {
        //   return new Promise((resolve, reject) => {
        //     wx.login({
        //       success: (loginResult: { code: string }) => {
        //         wx.getSetting({
        //           success: (settingResult: { authSetting: any }) => {
        //             //如果已经授权则尝试获取unionId
        //             if (settingResult.authSetting['scope.userInfo']) {
        //               wx.getUserInfo({
        //                 withCredentials: true,
        //                 success: (userInfoResult: { encryptedData: string, iv: string }) => {
        //                   let credentials = {
        //                     code: loginResult.code,
        //                     encryptedData: userInfoResult.encryptedData,
        //                     iv: userInfoResult.iv
        //                   }
        //                   this.login(credentials, launchOptions).then(account => {
        //                     resolve(account);
        //                   }).catch(e=>{
        //                     reject(e);
        //                   });
        //                 }
        //               });
        //             }
        //             //没有授权就只获取openId
        //             else {
        //               let credentials = {
        //                 code: loginResult.code,
        //                 encryptedData: '',
        //                 iv: ''
        //               }
        //               this.login(credentials, launchOptions).then(account => {
        //                 resolve(account);
        //               }).catch(e=>{
        //                 reject(e);
        //               });
        //             }
        //           }
        //         });
        //       },
        //       fail:(res)=>{ 
        //       }
        //     });
        //   });
        // }
        MinaPlatform.prototype.getUserAccount = function (launchOptions) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.getUserAccountOnce(launchOptions).then(function (account) {
                    resolve(account);
                }).catch(function (e) {
                    _this.getUserAccountOnce(launchOptions).then(function (account) {
                        resolve(account);
                    }).catch(function (e) {
                        _this.getUserAccountOnce(launchOptions).then(function (account) {
                            resolve(account);
                        }).catch(function (e) {
                            mpsdk.log('login retry over.');
                            reject(e);
                        });
                    });
                });
            });
        };
        MinaPlatform.prototype.getUserAccountOnce = function (launchOptions) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var beginTime = new Date().getTime();
                mpsdk.Report.reportNewUserLog(mpsdk.constant.NewUserLogEnum.ACTION_WX_LOGIN_BEGIN);
                wx.login({
                    success: function (loginResult) {
                        if (!mpsdk.Env.isNeedUnionid) {
                            mpsdk.log('微信登录成功,不需要获取授权信息,继续服务器端登录 ', loginResult.code);
                            mpsdk.Report.reportNewUserLog(mpsdk.constant.NewUserLogEnum.ACTION_WX_LOGIN_END, mpsdk.constant.NewUserLogStatusEnum.STATUS_REPORT_SUCCESS, '' + beginTime);
                            var credentials = {
                                code: loginResult.code,
                                encryptedData: '',
                                iv: ''
                            };
                            _this.login(credentials, launchOptions).then(function (account) {
                                resolve(account);
                            }).catch(function (e) {
                                reject(e);
                            });
                            return;
                        }
                        wx.getSetting({
                            success: function (settingResult) {
                                //如果已经授权则尝试获取unionId
                                if (settingResult.authSetting['scope.userInfo']) {
                                    wx.getUserInfo({
                                        withCredentials: true,
                                        success: function (userInfoResult) {
                                            mpsdk.log('微信授权成功,继续服务器端登录 ', loginResult.code);
                                            mpsdk.Report.reportNewUserLog(mpsdk.constant.NewUserLogEnum.ACTION_WX_LOGIN_END, mpsdk.constant.NewUserLogStatusEnum.STATUS_REPORT_SUCCESS, '' + beginTime);
                                            var credentials = {
                                                code: loginResult.code,
                                                encryptedData: userInfoResult.encryptedData,
                                                iv: userInfoResult.iv
                                            };
                                            _this.login(credentials, launchOptions).then(function (account) {
                                                resolve(account);
                                            }).catch(function (e) {
                                                reject(e);
                                            });
                                        }
                                    });
                                }
                                //没有授权就只获取openId
                                else {
                                    mpsdk.log('微信未授权,继续服务器端登录 ', loginResult.code);
                                    mpsdk.Report.reportNewUserLog(mpsdk.constant.NewUserLogEnum.ACTION_WX_LOGIN_END, mpsdk.constant.NewUserLogStatusEnum.STATUS_REPORT_SUCCESS, '' + beginTime);
                                    var credentials = {
                                        code: loginResult.code,
                                        encryptedData: '',
                                        iv: ''
                                    };
                                    _this.login(credentials, launchOptions).then(function (account) {
                                        resolve(account);
                                    }).catch(function (e) {
                                        reject(e);
                                    });
                                }
                            },
                            fail: function (res) {
                                mpsdk.log('微信获取授权状态失败,继续服务器端登录 ', loginResult.code, res);
                                mpsdk.Report.reportNewUserLog(mpsdk.constant.NewUserLogEnum.ACTION_WX_LOGIN_END, mpsdk.constant.NewUserLogStatusEnum.STATUS_REPORT_SUCCESS, '' + beginTime);
                                var credentials = {
                                    code: loginResult.code,
                                    encryptedData: '',
                                    iv: ''
                                };
                                _this.login(credentials, launchOptions).then(function (account) {
                                    resolve(account);
                                }).catch(function (e) {
                                    reject(e);
                                });
                            }
                        });
                    },
                    fail: function (res) {
                        mpsdk.log('微信登录失败: ', res);
                        mpsdk.Report.reportNewUserLog(mpsdk.constant.NewUserLogEnum.ACTION_WX_LOGIN_END, mpsdk.constant.NewUserLogStatusEnum.STATUS_REPORT_FAILS, '微信登录失败:' + res);
                        reject(res);
                    }
                });
            });
        };
        /**
         * 依靠服务器获取帐号信息
         */
        MinaPlatform.prototype.login = function (credentials, launchOptions) {
            var _this = this;
            var beginTime = new Date().getTime();
            var accountSource = mpsdk.utils.parseAccountSource(launchOptions);
            mpsdk.Report.reportNewUserLog(mpsdk.constant.NewUserLogEnum.ACTION_PT_LOGIN_BEGIN);
            return new Promise(function (resolve, reject) {
                var data = {
                    gameId: mpsdk.Env.gameId,
                    code: credentials.code,
                    encryptedData: encodeURIComponent(credentials.encryptedData),
                    iv: encodeURIComponent(credentials.iv),
                    unionId: credentials.encryptedData && credentials.iv ? 'true' : 'false',
                    sourceType: accountSource.sourceType,
                    sourceId: accountSource.sourceId,
                    model: encodeURIComponent(wx.getSystemInfoSync().model)
                };
                var loginUrl = mpsdk.Env.newLoginServer + '/MiniLogin/data/getOpenId2.action';
                _this.httpRequest(loginUrl, data, 'get', 0).then(function (res) {
                    mpsdk.log('服务端登录成功', res);
                    if (res && res.openid) {
                        mpsdk.Report.reportNewUserLog(mpsdk.constant.NewUserLogEnum.ACTION_PT_LOGIN_END, mpsdk.constant.NewUserLogStatusEnum.STATUS_REPORT_SUCCESS, '' + beginTime, res.openid);
                    }
                    else {
                        mpsdk.Report.reportNewUserLog(mpsdk.constant.NewUserLogEnum.ACTION_PT_LOGIN_END, mpsdk.constant.NewUserLogStatusEnum.STATUS_REPORT_FAILS, beginTime + '_服务器登录成功,但未获取到openid,errorcode=' + res.error);
                    }
                    resolve(res);
                }).catch(function (res) {
                    mpsdk.log('服务端登录失败', res);
                    mpsdk.Report.reportNewUserLog(mpsdk.constant.NewUserLogEnum.ACTION_PT_LOGIN_END, mpsdk.constant.NewUserLogStatusEnum.STATUS_REPORT_FAILS, beginTime + '_服务器登录失败：' + JSON.stringify(res));
                    reject(res);
                });
            });
        };
        MinaPlatform.prototype.getUserInfo = function () {
            return new Promise(function (resolve, reject) {
                wx.getSetting({
                    fail: function (res) {
                        reject();
                    },
                    success: function (settingResult) {
                        if (settingResult.authSetting['scope.userInfo']) {
                            wx.getUserInfo({
                                fail: function (res) {
                                    reject();
                                },
                                success: function (userInfoResult) {
                                    resolve(userInfoResult.userInfo);
                                }
                            });
                        }
                        else {
                            reject();
                        }
                    }
                });
            });
        };
        MinaPlatform.prototype.getSystem = function () {
            var sys = wx.getSystemInfoSync();
            return { platform: sys.platform, model: sys.model };
        };
        MinaPlatform.prototype.getLaunchOptions = function () {
            if (wx.getLaunchOptionsSync) {
                return wx.getLaunchOptionsSync();
            }
            else {
                throw new Error("小程序启动参数请从app.js的onLaunch回调函数中获取");
            }
        };
        MinaPlatform.prototype.launchTo = function (app) {
            return new Promise(function (resolve, reject) {
                //小游戏版本过低不能直接跳转，需要展示二维码
                if (!wx.redirectTo && wx.getSystemInfoSync().SDKVersion < '2.2.0') {
                    wx.previewImage({ urls: [app.ad_image] });
                    resolve();
                    return;
                }
                //小游戏和小程序都是一样的跳转逻辑
                wx.showLoading({ title: '请稍候...', mask: true });
                setTimeout(wx.hideLoading, 5 * 1000); //5秒后超时隐藏
                wx.navigateToMiniProgram({
                    appId: app.appid,
                    path: app.page,
                    success: function (res) {
                        wx.hideLoading();
                        resolve();
                        mpsdk.log('打开其他程序成功，appId=', app.appid, 'path=', app.page);
                    },
                    fail: function (res) {
                        wx.hideLoading();
                        if (app.ad_image && ['.jpg', '.gif', '.png'].indexOf(app.ad_image.substr(-4)) != -1) {
                            wx.previewImage({ urls: [app.ad_image] });
                            resolve();
                            mpsdk.log('直接跳转失败，拉起小程序码，appId=', app.appid, 'path=', app.page);
                        }
                        else {
                            reject();
                            mpsdk.log('直接跳转失败，小程序码未设置，appId=', app.appid, 'path=', app.page, JSON.stringify(res));
                        }
                    }
                });
            });
        };
        /**
         * 跳转
         * launchTo的同步版本
         * @param app
         * @param launchToCallback
         */
        MinaPlatform.prototype.launchToSync = function (app, launchToCallback) {
            //小游戏版本过低不能直接跳转，需要展示二维码
            if (!wx.redirectTo && wx.getSystemInfoSync().SDKVersion < '2.2.0') {
                wx.previewImage({ urls: [app.ad_image] });
                launchToCallback(true);
                return;
            }
            //小游戏和小程序都是一样的跳转逻辑
            wx.showLoading({ title: '请稍候...', mask: true });
            setTimeout(wx.hideLoading, 5 * 1000); //5秒后超时隐藏
            wx.navigateToMiniProgram({
                appId: app.appid,
                path: app.page,
                success: function (res) {
                    wx.hideLoading();
                    launchToCallback(true);
                    mpsdk.log('打开其他程序成功，appId=', app.appid, 'path=', app.page);
                },
                fail: function (res) {
                    wx.hideLoading();
                    if (app.ad_image && ['.jpg', '.gif', '.png'].indexOf(app.ad_image.substr(-4)) != -1) {
                        wx.previewImage({ urls: [app.ad_image] });
                        launchToCallback(true);
                        mpsdk.log('直接跳转失败，拉起小程序码，appId=', app.appid, 'path=', app.page);
                    }
                    else {
                        launchToCallback(false);
                        mpsdk.log('直接跳转失败，小程序码未设置，appId=', app.appid, 'path=', app.page, JSON.stringify(res));
                    }
                }
            });
        };
        MinaPlatform.prototype.share = function (shareInfo, success, fail, thisObject) {
            var randomShareInfo = mpsdk.Share.genShareInfo(shareInfo);
            var info = {};
            info.title = randomShareInfo.title;
            if (randomShareInfo.image) {
                info.imageUrl = mpsdk.Share.genImagePath(randomShareInfo.image);
            }
            else {
                info.imageUrl = randomShareInfo.image;
            }
            info.prefix = randomShareInfo.prefix;
            if (wx.redirectTo) { //小程序
                info.path = mpsdk.Share.getShareLink(shareInfo.serial, shareInfo.path || '/pages/index/index', shareInfo.params || {}, randomShareInfo.imageId);
            }
            else { //小游戏
                info.query = mpsdk.Share.getShareQuery(randomShareInfo.serial, randomShareInfo.params || {}, randomShareInfo.imageId);
            }
            info.success = function (res) {
                success && success.call(thisObject, res);
            };
            info.fail = function (res) {
                fail && fail.call(thisObject, res);
            };
            info.cancel = function (res) {
                fail && fail.call(thisObject, res);
            };
            //由于微信取消了分享事件，只要拉起分享就计算分享次数
            mpsdk.Share.reportShareOut(shareInfo.serial, randomShareInfo.imageId.toString());
            return info;
        };
        MinaPlatform.prototype.getCacheRes = function (url, waitDownload) {
            var _this = this;
            if (waitDownload === void 0) { waitDownload = false; }
            return new Promise(function (resolve, reject) {
                // 微信只支持https打头的路径
                if (url.substr(0, 8).toLowerCase() !== 'https://') {
                    resolve(url);
                    return;
                }
                var cacheFile = wx.env.USER_DATA_PATH + '/mpsdk/' + url.substr(8);
                var fs = wx.getFileSystemManager();
                // 如果路径是一个可访问的文件则直接返回，否则删除掉
                try {
                    fs.accessSync(cacheFile);
                    if (fs.statSync(cacheFile).isFile()) {
                        resolve(cacheFile);
                        return;
                    }
                    else {
                        fs.rmdirSync(cacheFile);
                    }
                }
                catch (e) {
                }
                // 已经在下载队列中的不管选择等不等待都直接返回原地址
                if (MinaPlatform.downloadQueue.indexOf(url) >= 0) {
                    resolve(url);
                    return;
                }
                // 不用等待下载的先返回原地址
                !waitDownload && resolve(url);
                // 加入下载队列
                MinaPlatform.downloadQueue.push(url);
                wx.downloadFile({
                    url: url,
                    success: function (res) {
                        if (res.statusCode === 200) {
                            _this.mkdirRecursiveSync(cacheFile.substring(0, cacheFile.lastIndexOf('/')));
                            fs.saveFileSync(res.tempFilePath, cacheFile);
                            waitDownload && resolve(cacheFile); //下载成功返回缓存路径
                        }
                        else {
                            waitDownload && resolve(url); //下载失败返回原URL
                        }
                    },
                    fail: function () {
                        waitDownload && resolve(url); //下载失败返回原URL
                    },
                    complete: function () {
                        MinaPlatform.downloadQueue.splice(MinaPlatform.downloadQueue.indexOf(url), 1);
                    }
                });
            });
        };
        /**
         * 自动创建多级路径
         * @param dirPath 路径
         */
        MinaPlatform.prototype.mkdirRecursiveSync = function (dirPath) {
            var fs = wx.getFileSystemManager();
            var dirLevel = dirPath.replace(wx.env.USER_DATA_PATH, '').split('/');
            var currentDir = wx.env.USER_DATA_PATH;
            for (var _i = 0, dirLevel_1 = dirLevel; _i < dirLevel_1.length; _i++) {
                var dirName = dirLevel_1[_i];
                if (!dirName) {
                    continue;
                }
                currentDir += '/' + dirName;
                try {
                    fs.accessSync(currentDir);
                    // 如果目标不是文件夹则删掉建立文件夹
                    if (!fs.statSync(currentDir).isDirectory()) {
                        fs.unlinkSync(currentDir);
                        fs.mkdirSync(currentDir);
                    }
                }
                catch (e) {
                    fs.mkdirSync(currentDir);
                }
            }
            return currentDir;
        };
        MinaPlatform.prototype.setTimeout = function (callback, timeout) {
            return setTimeout(callback, timeout);
        };
        MinaPlatform.prototype.setInterval = function (callback, timeout) {
            return setInterval(callback, timeout);
        };
        MinaPlatform.prototype.clearTimeout = function (t) {
            clearTimeout(t);
        };
        MinaPlatform.prototype.clearInterval = function (t) {
            clearInterval(t);
        };
        ////////////////////////////////////////
        //微信小程序平台扩展功能
        ////////////////////////////////////////
        /**
         * 解析微信群ID（使用此方法之前必须设置Env.gameId）
         * @param shareTicket 分享后得到的分享票据
         */
        MinaPlatform.prototype.parseShareTicket = function (shareTicket) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                if (!shareTicket) {
                    reject('shareTicket required');
                    return;
                }
                wx.login({
                    fail: function (err) {
                        reject(err);
                    },
                    success: function (resLogin) {
                        wx.getShareInfo({
                            shareTicket: shareTicket,
                            fail: function (err) {
                                reject(err);
                            },
                            success: function (resShareInfo) {
                                var data = {
                                    gameId: mpsdk.Env.gameId,
                                    code: encodeURIComponent(resLogin.code),
                                    encryptedData: encodeURIComponent(resShareInfo.encryptedData),
                                    iv: resShareInfo.iv
                                };
                                _this.httpRequest(mpsdk.Env.loginServer + '/MiniGame/data/getShareInfo.action', data).then(function (resServer) {
                                    if (resServer.openGId) {
                                        resolve(resServer);
                                    }
                                    else {
                                        reject(resServer);
                                    }
                                }).catch(function (err) {
                                    reject(err);
                                });
                            }
                        });
                    }
                });
            });
        };
        /**
         * 注册微信模板消息
         * @param msgId 后台配置表的消息id,咨询策划获取
         * @param formId form表单id,只有真机情况下才能获取到
         * @param param1 参数填充关键字类型
         */
        MinaPlatform.prototype.subscribe = function (msgId, formId, param1) {
            var _this = this;
            if (param1 === void 0) { param1 = ''; }
            return new Promise(function (resolve, reject) {
                if (formId == "the formId is a mock one") {
                    mpsdk.log('只能在真机环境下才能订阅模板消息');
                    return;
                }
                if (!_this.subscribeEnable(msgId)) {
                    mpsdk.log('订阅有效期内无需重复订阅');
                    return;
                }
                mpsdk.Account.getAccountSafe().then(function (account) {
                    var data = {
                        clockId: msgId,
                        gameId: mpsdk.Env.gameId,
                        openId: account.openid,
                        formId: formId,
                        parameters: param1
                    };
                    _this.httpRequest(mpsdk.Env.loginServer + '/MiniGame/data/regNotify.action', data).then(function (res) {
                        wx.setStorageSync('regnotify_' + msgId + '_endtime', res.time);
                        wx.setStorageSync('regnotify_' + msgId + '_starttime', new Date().getTime());
                        //日志
                        var localDateTime = new Date(res.time).toLocaleDateString() + " " + new Date(res.time).toLocaleTimeString();
                        mpsdk.log('注册模板消息成功', JSON.stringify(data), '有效期至', localDateTime);
                        //
                        resolve();
                    });
                });
            });
        };
        /**
         * 检查当前是否可以订阅模版消息（如果处于上次订阅有效期内则不能重复订阅）
         * @param msgId 后台配置表的消息id,咨询策划获取
         */
        MinaPlatform.prototype.subscribeEnable = function (msgId) {
            var starttime = +wx.getStorageSync('regnotify_' + msgId + '_starttime');
            var endtime = +wx.getStorageSync('regnotify_' + msgId + '_endtime');
            var nowtime = new Date().getTime();
            if (starttime <= nowtime && nowtime <= endtime) {
                return false;
            }
            return true;
        };
        /**
         * 检查玩家是否点击banner；
         * @param res wx.onShow回调信息
         * @returns 如果点击成功返回true，否则返回false
         */
        MinaPlatform.prototype.checkBannerClick = function (res) {
            if (res && res.scene == 1038) {
                if (res.referrerInfo && res.referrerInfo.appId) {
                    return true;
                }
            }
            return false;
        };
        MinaPlatform.prototype.onHide = function () {
            try {
                wx.onAppShow(function (options) {
                    mpsdk.Report.reportAppRun(options);
                    mpsdk.Report.reportHotLaunch(options);
                    mpsdk.Hack.onShow();
                });
                wx.onAppHide(function (options) {
                    mpsdk.Hack.checkRewardedVideoAd2Back(options);
                    var account = mpsdk.Account.getAccount();
                    var hideOptions = {
                        gameId: mpsdk.Env.gameId,
                        gamePath: mpsdk.Env.gamePath,
                        openid: account.openid,
                        unionid: account.unionid,
                        lastLoginTime: account.lastLoginTime,
                        createTime: account.createTime,
                        shareTime: account.shareTime,
                        sid: account.sid,
                        anonymous_openid: account.anonymous_openid,
                        options: options,
                        launchOptions: mpsdk.Env.launchOptions,
                    };
                    mpsdk.Hack.onHide(hideOptions);
                });
            }
            catch (error) {
                // log(error);
            }
            try {
                wx.onShow(function (options) {
                    mpsdk.Report.reportAppRun(options);
                    mpsdk.Report.reportHotLaunch(options);
                    mpsdk.Hack.onShow();
                });
                wx.onHide(function (options) {
                    mpsdk.Hack.checkRewardedVideoAd2Back(options);
                    var account = mpsdk.Account.getAccount();
                    var hideOptions = {
                        gameId: mpsdk.Env.gameId,
                        gamePath: mpsdk.Env.gamePath,
                        openid: account.openid,
                        unionid: account.unionid,
                        lastLoginTime: account.lastLoginTime,
                        createTime: account.createTime,
                        shareTime: account.shareTime,
                        sid: account.sid,
                        anonymous_openid: account.anonymous_openid,
                        options: options,
                        launchOptions: mpsdk.Env.launchOptions,
                    };
                    mpsdk.Hack.onHide(hideOptions);
                });
            }
            catch (error) {
                // log(error);
            }
        };
        MinaPlatform.prototype.showModal = function (object) {
            wx.showModal(object);
        };
        /**
         * 下载队列
         */
        MinaPlatform.downloadQueue = [];
        return MinaPlatform;
    }());
    mpsdk.MinaPlatform = MinaPlatform;
})(mpsdk || (mpsdk = {}));
var mpsdk;
(function (mpsdk) {
    var ext;
    (function (ext) {
        var EgretUI = /** @class */ (function () {
            function EgretUI() {
                this.width = 0;
                this.height = 0;
                this.scrollItemList = [];
                this.showIndex = 0;
            }
            /**
             * 底部猜你喜欢ICON显示
             * @param dataList mpsdk.Ad.getSuggestList()获得
             * @param width 显示宽度
             * @param height 显示高度
             * @param bgColor 背景颜色
             * @param borderColor 边框颜色
             * @returns 返回一个egret.DisplayObjectContainer对象
             */
            EgretUI.prototype.showSuggestBottom = function (dataList, width, height, bgColor, borderColor) {
                if (width === void 0) { width = 600; }
                if (height === void 0) { height = 120; }
                if (bgColor === void 0) { bgColor = 0xffffff; }
                if (borderColor === void 0) { borderColor = 0xffffff; }
                this.width = width;
                this.height = height;
                var container = new egret.DisplayObjectContainer();
                // 创建背景
                var background = new egret.Shape();
                background.graphics.lineStyle(2, borderColor);
                background.graphics.beginFill(bgColor, 0.3);
                background.graphics.drawRoundRect(0, 0, this.width, this.height, 20, 20);
                background.graphics.endFill();
                container.addChild(background);
                // 猜你喜欢字样
                var label = new egret.TextField();
                label.width = 30;
                label.size = 20;
                label.textColor = 0xffffff;
                label.lineSpacing = 5;
                label.text = "猜你喜欢";
                label.y = (this.height - label.height) / 2;
                label.x = 15;
                container.addChild(label);
                // 创建滚动视图
                this.scrollView = new egret.ScrollView();
                this.scrollView.height = this.height;
                this.scrollView.width = this.width - 70;
                this.scrollView.x = 50;
                this.scrollView.verticalScrollPolicy = 'off';
                container.addChild(this.scrollView);
                this.addIcon(dataList);
                this.scrollView.setContent(this.scrollContainer);
                this.setTimeIcon();
                return container;
            };
            // 生成滚动列表
            EgretUI.prototype.addIcon = function (dataList) {
                var _this = this;
                this.scrollContainer = new egret.DisplayObjectContainer();
                var _loop_1 = function (i) {
                    this_1.imageLoader(dataList[i].icon).then(function (texture) {
                        var srcollViewItem = new egret.DisplayObjectContainer();
                        var bitmap = new egret.Bitmap(texture);
                        bitmap.width = _this.height - 20;
                        bitmap.height = _this.height - 20;
                        // 计算可见区域显示图标数
                        var len = Math.floor((_this.scrollView.width) / (bitmap.width));
                        if (len > dataList.length) {
                            len = dataList.length;
                        }
                        srcollViewItem.addChild(bitmap);
                        // 圆角遮罩
                        var mask = new egret.Shape();
                        mask.graphics.beginFill(0xffffff, 1);
                        mask.graphics.drawRoundRect(0, 0, bitmap.width, bitmap.height, 25, 25);
                        mask.graphics.endFill();
                        srcollViewItem.addChild(mask);
                        bitmap.mask = mask;
                        // 设置图标偏移量和x,y坐标
                        srcollViewItem.anchorOffsetX = srcollViewItem.width / 2;
                        srcollViewItem.anchorOffsetY = srcollViewItem.height / 2;
                        srcollViewItem.x = (i * bitmap.width + i * (_this.scrollView.width - len * bitmap.height) / (len - 1)) + srcollViewItem.width / 2;
                        srcollViewItem.y = srcollViewItem.height / 2 + (_this.scrollView.height - bitmap.height) / 2;
                        srcollViewItem.touchEnabled = true;
                        // 绑定图标点击事件
                        srcollViewItem.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                            mpsdk.Ad.click(dataList[i]);
                        }, _this);
                        _this.scrollContainer.addChild(srcollViewItem);
                        _this.scrollItemList[i] = srcollViewItem;
                    });
                };
                var this_1 = this;
                for (var i = 0; i < dataList.length; i++) {
                    _loop_1(i);
                }
            };
            // 图标缩放效果和列表移动
            EgretUI.prototype.setTimeIcon = function () {
                var _this = this;
                clearTimeout(this.scrollTimer);
                this.scrollTimer = setTimeout(function () {
                    var currentIndex = _this.showIndex;
                    var viewAreaWidth = _this.scrollView.width;
                    // 移动scrollView位置
                    if (_this.scrollItemList[currentIndex].x > (viewAreaWidth + _this.scrollView.scrollLeft)) {
                        var scrollViewLeft = _this.scrollItemList[currentIndex].x - _this.scrollItemList[currentIndex].width / 2;
                        if ((scrollViewLeft + viewAreaWidth) > _this.scrollContainer.width) {
                            scrollViewLeft = _this.scrollContainer.width - viewAreaWidth;
                        }
                        _this.scrollView.setScrollLeft(scrollViewLeft, 200);
                    }
                    else if (_this.scrollView.scrollLeft > _this.scrollItemList[currentIndex].x) {
                        _this.scrollView.setScrollLeft(_this.scrollItemList[currentIndex].x - _this.scrollItemList[currentIndex].width / 2, 200);
                    }
                    // 设置深度，让显示的图标保持最高层
                    _this.scrollContainer.setChildIndex(_this.scrollItemList[currentIndex], _this.scrollItemList.length);
                    egret.Tween.get(_this.scrollItemList[currentIndex])
                        .to({ scaleX: 1.2, scaleY: 1.2 }, 700)
                        .to({ scaleX: 1, scaleY: 1 }, 700)
                        .call(function () {
                        _this.scrollContainer.setChildIndex(_this.scrollItemList[currentIndex], 1);
                        egret.Tween.removeTweens(_this.scrollItemList[currentIndex]);
                        _this.setTimeIcon();
                        _this.showIndex++;
                        if (_this.showIndex >= _this.scrollItemList.length) {
                            _this.showIndex = 0;
                        }
                    });
                }, 5000);
            };
            // 加载图片
            EgretUI.prototype.imageLoader = function (source) {
                var _this = this;
                return new Promise(function (resolve, reject) {
                    var imageLoader = new egret.ImageLoader();
                    imageLoader.addEventListener(egret.Event.COMPLETE, function (event) {
                        var imageLoader = event.currentTarget;
                        var texture = new egret.Texture();
                        texture._setBitmapData(imageLoader.data);
                        resolve(texture);
                    }, _this);
                    imageLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, function (event) {
                        reject(event);
                    }, _this);
                    imageLoader.load(source);
                });
            };
            return EgretUI;
        }());
        ext.EgretUI = EgretUI;
    })(ext = mpsdk.ext || (mpsdk.ext = {}));
})(mpsdk || (mpsdk = {}));
/// <reference path="Env.ts" />
/// <reference path="ext/EgretUI.ts" />
var mpsdk;
(function (mpsdk) {
    /**
     * 白鹭平台适配器
     * @external
     */
    var EgretPlatform = /** @class */ (function () {
        function EgretPlatform() {
        }
        EgretPlatform.prototype.writeFile = function (fileName, data) {
            return '';
        };
        EgretPlatform.prototype.getStorage = function (key) {
            try {
                var data = egret.localStorage.getItem(mpsdk.Env.storagePrefix + key);
                return data ? JSON.parse(data) : '';
            }
            catch (e) {
                return '';
            }
        };
        ;
        EgretPlatform.prototype.setStorage = function (key, data) {
            egret.localStorage.setItem(mpsdk.Env.storagePrefix + key, JSON.stringify(data));
        };
        ;
        EgretPlatform.prototype.httpRequest = function (url, params, method, retryTimes) {
            if (method === void 0) { method = 'get'; }
            if (retryTimes === void 0) { retryTimes = 2; }
            //参数处理
            var requestParams = '';
            if (params) {
                for (var key in params) {
                    requestParams += key + '=' + params[key] + '&';
                }
                if (requestParams) {
                    //去除末尾&
                    requestParams = requestParams.substr(0, requestParams.length - 1);
                    //如果是get请求则直接把参数链接到url后面
                    if (method == 'get') {
                        url += url.indexOf('?') == -1 ? '?' : '&';
                        url += requestParams;
                    }
                }
            }
            return new Promise(function (resolve, reject) {
                var responseHandler = function (event) {
                    var response = event.currentTarget.response;
                    try {
                        resolve(JSON.parse(response));
                    }
                    catch (e) {
                        // log('尝试解析JSON数据出错', e.toString(), response);
                        resolve(response);
                    }
                };
                var errorHandler = function (event) {
                    // reject();
                };
                var request = new egret.HttpRequest();
                request.once(egret.Event.COMPLETE, responseHandler, null);
                request.once(egret.IOErrorEvent.IO_ERROR, errorHandler, null);
                if (method == 'get') {
                    request.open(url, egret.HttpMethod.GET);
                    request.send();
                }
                else {
                    request.open(url, egret.HttpMethod.POST);
                    request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    request.send(requestParams);
                }
            });
        };
        EgretPlatform.prototype.writeOpenId2Native = function (account) {
            if (account && account.openid) {
                try {
                    egret.ExternalInterface.call("getNativeAppOpenId", account.openid);
                }
                catch (error) {
                }
            }
        };
        EgretPlatform.prototype.getUserAccount = function (launchOptions) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                if (mpsdk.Account.getOpenId()) {
                    mpsdk.utils.nativeAppLogin(launchOptions).then(function (account) {
                        _this.writeOpenId2Native(account);
                        resolve(account);
                    }).catch(function (e) {
                        reject(e);
                    });
                }
                else {
                    try {
                        egret.ExternalInterface.call("getNativeAppOpenId", "");
                        egret.ExternalInterface.addCallback("getNativeAppOpenId", function (nativeOpenId) {
                            mpsdk.log("egret receive message--getNativeAppOpenId : ", nativeOpenId);
                            if (nativeOpenId) {
                                var account = {
                                    openid: nativeOpenId,
                                };
                                mpsdk.Account.setAccount(account);
                            }
                            mpsdk.utils.nativeAppLogin(launchOptions).then(function (account) {
                                _this.writeOpenId2Native(account);
                                resolve(account);
                            }).catch(function (e) {
                                reject(e);
                            });
                        });
                    }
                    catch (error) {
                        mpsdk.utils.nativeAppLogin(launchOptions).then(function (account) {
                            _this.writeOpenId2Native(account);
                            resolve(account);
                        }).catch(function (e) {
                            reject(e);
                        });
                    }
                }
            });
        };
        EgretPlatform.prototype.getUserInfo = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { nickName: "TestNickName", avatarUrl: '', gender: -1 }];
                });
            });
        };
        EgretPlatform.prototype.getSystem = function () {
            return { platform: egret.Capabilities.os };
        };
        EgretPlatform.prototype.getLaunchOptions = function () {
            return { scene: 0, query: {} };
        };
        EgretPlatform.prototype.launchTo = function (app) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    mpsdk.log('打开其他程序，appId=', app.appid, 'path=', app.page);
                    return [2 /*return*/];
                });
            });
        };
        EgretPlatform.prototype.launchToSync = function (app, launchToCallback) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    mpsdk.log('打开其他程序，appId=', app.appid, 'path=', app.page);
                    return [2 /*return*/];
                });
            });
        };
        EgretPlatform.prototype.share = function (shareInfo, success, fail, thisObject) {
            mpsdk.log('测试分享，success和fail都调用，方便调试');
            success && success.call(thisObject);
            fail && fail.call(thisObject);
        };
        EgretPlatform.prototype.getCacheRes = function (url, waitDownload) {
            if (waitDownload === void 0) { waitDownload = false; }
            return Promise.resolve(url);
        };
        EgretPlatform.prototype.setTimeout = function (callback, timeout) {
            return setTimeout(callback, timeout);
        };
        EgretPlatform.prototype.setInterval = function (callback, timeout) {
            return setInterval(callback, timeout);
        };
        EgretPlatform.prototype.clearTimeout = function (t) {
            clearTimeout(t);
        };
        EgretPlatform.prototype.clearInterval = function (t) {
            clearInterval(t);
        };
        EgretPlatform.prototype.showSuggestBottom = function (dataList, width, height, bgColor, borderColor) {
            if (width === void 0) { width = 600; }
            if (height === void 0) { height = 120; }
            if (bgColor === void 0) { bgColor = 0xffffff; }
            if (borderColor === void 0) { borderColor = 0xffffff; }
            return new mpsdk.ext.EgretUI().showSuggestBottom(dataList, width, height, bgColor, borderColor);
        };
        EgretPlatform.prototype.checkBannerClick = function (res) {
            throw new Error("Method not implemented.");
        };
        EgretPlatform.prototype.onHide = function () {
            try {
                egret.ExternalInterface.call("getPhoneModel", "");
                egret.ExternalInterface.addCallback("getPhoneModel", function (phoneModel) {
                    mpsdk.Env.phoneModel = phoneModel;
                });
            }
            catch (error) {
            }
            try {
                egret.ExternalInterface.call("getMetaDataByKey", "MPSDK_CHANNEL");
                egret.ExternalInterface.addCallback("getMetaDataByKey", function (mpsdkChannel) {
                    mpsdk.Env.mpsdkChannel = mpsdkChannel;
                });
            }
            catch (error) {
            }
            try {
                egret.ExternalInterface.call("getMetaDataByKey", "MPSDK_IMEI");
                egret.ExternalInterface.addCallback("getMetaDataByKey", function (mpsdkImei) {
                    mpsdk.Env.mpsdkImei = mpsdkImei;
                });
            }
            catch (error) {
            }
        };
        EgretPlatform.prototype.showModal = function (object) {
        };
        EgretPlatform.prototype.send2Native = function (message) {
            egret.ExternalInterface.call("sendToNative", message);
        };
        return EgretPlatform;
    }());
    mpsdk.EgretPlatform = EgretPlatform;
})(mpsdk || (mpsdk = {}));
/// <reference path="Env.ts" />
var mpsdk;
(function (mpsdk) {
    /**
     * Cocos平台适配器
     * @external
     */
    var CocosPlatform = /** @class */ (function () {
        function CocosPlatform() {
        }
        CocosPlatform.prototype.writeFile = function (fileName, data) {
            return '';
        };
        CocosPlatform.prototype.getStorage = function (key) {
            try {
                var data = cc.sys.localStorage.getItem(mpsdk.Env.storagePrefix + key);
                return data ? JSON.parse(data) : '';
            }
            catch (e) {
                return '';
            }
        };
        ;
        CocosPlatform.prototype.setStorage = function (key, data) {
            cc.sys.localStorage.setItem(mpsdk.Env.storagePrefix + key, JSON.stringify(data));
        };
        ;
        CocosPlatform.prototype.httpRequest = function (url, params, method, retryTimes) {
            if (method === void 0) { method = 'get'; }
            if (retryTimes === void 0) { retryTimes = 2; }
            //参数处理
            var requestParams = '';
            if (params) {
                for (var key in params) {
                    requestParams += key + '=' + params[key] + '&';
                }
                if (requestParams) {
                    //去除末尾&
                    requestParams = requestParams.substr(0, requestParams.length - 1);
                    //如果是get请求则直接把参数链接到url后面
                    if (method == 'get') {
                        url += url.indexOf('?') == -1 ? '?' : '&';
                        url += requestParams;
                    }
                }
            }
            return new Promise(function (resolve, reject) {
                var xhr = cc.loader.getXMLHttpRequest();
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4 && xhr.status >= 200 && xhr.status < 400) {
                        try {
                            resolve(JSON.parse(xhr.responseText));
                        }
                        catch (e) {
                            // log('尝试解析JSON数据出错', e.toString(), xhr.responseText);
                            resolve(xhr.responseText);
                        }
                    }
                    else {
                        // reject(xhr.status);
                    }
                };
                if (method == 'get') {
                    xhr.open("GET", url, true);
                    xhr.send();
                }
                else {
                    xhr.open("POST", url, true);
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    xhr.send(requestParams);
                }
            });
        };
        CocosPlatform.prototype.writeOpenId2Native = function (account) {
            if (account && account.openid) {
                try {
                    if ('android' == this.getSystem().platform.toLocaleLowerCase()) {
                        jsb.reflection.callStaticMethod("com/qmo/game/mpsdk/utils/MpsdkNativeUtils", "getNativeAppOpenId", "(Ljava/lang/String;)Ljava/lang/String;", account.openid);
                    }
                    else if ('ios' == this.getSystem().platform.toLocaleLowerCase()) {
                        jsb.reflection.callStaticMethod("MpsdkNativeUtils", "getNativeAppOpenId:", account.openid);
                    }
                }
                catch (error) {
                }
            }
        };
        CocosPlatform.prototype.getNativeAppOpenId = function () {
            var nativeOpenid = "";
            try {
                if ('android' == this.getSystem().platform.toLocaleLowerCase()) {
                    nativeOpenid = jsb.reflection.callStaticMethod("com/qmo/game/mpsdk/utils/MpsdkNativeUtils", "getNativeAppOpenId", "(Ljava/lang/String;)Ljava/lang/String;", "");
                }
                else if ('ios' == this.getSystem().platform.toLocaleLowerCase()) {
                    nativeOpenid = jsb.reflection.callStaticMethod("MpsdkNativeUtils", "getNativeAppOpenId:", "");
                }
            }
            catch (error) {
            }
            return nativeOpenid;
        };
        CocosPlatform.prototype.getUserAccount = function (launchOptions) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                if (mpsdk.Account.getOpenId()) {
                    mpsdk.utils.nativeAppLogin(launchOptions).then(function (account) {
                        _this.writeOpenId2Native(account);
                        resolve(account);
                    }).catch(function (e) {
                        reject(e);
                    });
                }
                else {
                    var nativeOpenId = _this.getNativeAppOpenId();
                    mpsdk.log("cocoscreator receive message--getNativeAppOpenId : ", nativeOpenId);
                    if (nativeOpenId) {
                        var account = {
                            openid: nativeOpenId,
                        };
                        mpsdk.Account.setAccount(account);
                    }
                    mpsdk.utils.nativeAppLogin(launchOptions).then(function (account) {
                        _this.writeOpenId2Native(account);
                        resolve(account);
                    }).catch(function (e) {
                        reject(e);
                    });
                }
            });
        };
        CocosPlatform.prototype.getUserInfo = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { nickName: "TestNickName", avatarUrl: '', gender: -1 }];
                });
            });
        };
        CocosPlatform.prototype.getSystem = function () {
            return { platform: cc.sys.os };
        };
        CocosPlatform.prototype.getLaunchOptions = function () {
            return { scene: 0, query: {} };
        };
        CocosPlatform.prototype.launchTo = function (app) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    mpsdk.log('打开其他程序，appId=', app.appid, 'path=', app.page);
                    return [2 /*return*/];
                });
            });
        };
        CocosPlatform.prototype.launchToSync = function (app, launchToCallback) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    mpsdk.log('打开其他程序，appId=', app.appid, 'path=', app.page);
                    return [2 /*return*/];
                });
            });
        };
        CocosPlatform.prototype.share = function (shareInfo, success, fail, thisObject) {
            mpsdk.log('测试分享，success和fail都调用，方便调试');
            success && success.call(thisObject);
            fail && fail.call(thisObject);
        };
        CocosPlatform.prototype.getCacheRes = function (url, waitDownload) {
            if (waitDownload === void 0) { waitDownload = false; }
            return Promise.resolve(url);
        };
        CocosPlatform.prototype.setTimeout = function (callback, timeout) {
            return setTimeout(callback, timeout);
        };
        CocosPlatform.prototype.setInterval = function (callback, timeout) {
            return setInterval(callback, timeout);
        };
        CocosPlatform.prototype.clearTimeout = function (t) {
            clearTimeout(t);
        };
        CocosPlatform.prototype.clearInterval = function (t) {
            clearInterval(t);
        };
        CocosPlatform.prototype.checkBannerClick = function (res) {
            throw new Error("Method not implemented.");
        };
        CocosPlatform.prototype.onHide = function () {
            try {
                if ('android' == this.getSystem().platform.toLocaleLowerCase()) {
                    mpsdk.Env.phoneModel = jsb.reflection.callStaticMethod("com/qmo/game/mpsdk/utils/MpsdkNativeUtils", "getPhoneModel", "()Ljava/lang/String;");
                    mpsdk.Env.mpsdkChannel = jsb.reflection.callStaticMethod("com/qmo/game/mpsdk/utils/MpsdkNativeUtils", "getMetaDataByKey", "(Ljava/lang/String;)Ljava/lang/String;", "MPSDK_CHANNEL");
                    mpsdk.Env.mpsdkImei = jsb.reflection.callStaticMethod("com/qmo/game/mpsdk/utils/MpsdkNativeUtils", "getMetaDataByKey", "(Ljava/lang/String;)Ljava/lang/String;", "MPSDK_IMEI");
                }
                else if ('ios' == this.getSystem().platform.toLocaleLowerCase()) {
                    mpsdk.Env.phoneModel = jsb.reflection.callStaticMethod("MpsdkNativeUtils", "getPhoneModel");
                    mpsdk.Env.mpsdkChannel = jsb.reflection.callStaticMethod("MpsdkNativeUtils", "getMetaDataByKey:", "MPSDK_CHANNEL");
                }
            }
            catch (error) {
            }
        };
        CocosPlatform.prototype.showModal = function (object) {
        };
        return CocosPlatform;
    }());
    mpsdk.CocosPlatform = CocosPlatform;
})(mpsdk || (mpsdk = {}));
/// <reference path="Env.ts" />
var mpsdk;
(function (mpsdk) {
    /**
     * H5平台适配器
     * @external
     */
    var H5Platform = /** @class */ (function () {
        function H5Platform() {
        }
        H5Platform.prototype.writeFile = function (fileName, data) {
            return '';
        };
        H5Platform.prototype.getStorage = function (key) {
            try {
                var data = window.localStorage.getItem(mpsdk.Env.storagePrefix + key);
                return data ? JSON.parse(data) : '';
            }
            catch (e) {
                return '';
            }
        };
        ;
        H5Platform.prototype.setStorage = function (key, data) {
            window.localStorage.setItem(mpsdk.Env.storagePrefix + key, JSON.stringify(data));
        };
        ;
        H5Platform.prototype.httpRequest = function (url, params, method, retryTimes) {
            if (method === void 0) { method = 'get'; }
            if (retryTimes === void 0) { retryTimes = 2; }
            //参数处理
            var requestParams = '';
            if (params) {
                for (var key in params) {
                    requestParams += key + '=' + params[key] + '&';
                }
                if (requestParams) {
                    //去除末尾&
                    requestParams = requestParams.substr(0, requestParams.length - 1);
                    //如果是get请求则直接把参数链接到url后面
                    if (method == 'get') {
                        url += url.indexOf('?') == -1 ? '?' : '&';
                        url += requestParams;
                    }
                }
            }
            return new Promise(function (resolve, reject) {
                var request = new XMLHttpRequest();
                request.onreadystatechange = function () {
                    if (request.readyState == 4) {
                        if (request.status == 200) {
                            try {
                                resolve(JSON.parse(request.responseText));
                            }
                            catch (e) {
                                resolve(request.responseText);
                            }
                        }
                        else {
                            reject('HTTP请求失败，statusCode=' + request.status);
                        }
                    }
                };
                if (method == 'get') {
                    request.open('GET', url);
                    request.send();
                }
                else {
                    request.open('POST', url);
                    request.send(requestParams);
                }
            });
        };
        H5Platform.prototype.getUserAccount = function (launchOptions) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { openid: 'debug-user-openid' }];
                });
            });
        };
        H5Platform.prototype.getUserInfo = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { nickName: "TestNickName", avatarUrl: '', gender: -1 }];
                });
            });
        };
        H5Platform.prototype.getSystem = function () {
            return { platform: navigator.platform };
        };
        H5Platform.prototype.getLaunchOptions = function () {
            return { scene: 0, query: {} };
        };
        H5Platform.prototype.launchTo = function (app) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    mpsdk.log('打开其他程序，appId=', app.appid, 'path=', app.page);
                    return [2 /*return*/];
                });
            });
        };
        H5Platform.prototype.launchToSync = function (app, launchToCallback) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    mpsdk.log('打开其他程序，appId=', app.appid, 'path=', app.page);
                    return [2 /*return*/];
                });
            });
        };
        H5Platform.prototype.share = function (shareInfo, success, fail, thisObject) {
            mpsdk.log('测试分享，success和fail都调用，方便调试');
            success && success.call(thisObject);
            fail && fail.call(thisObject);
        };
        H5Platform.prototype.getCacheRes = function (url, waitDownload) {
            if (waitDownload === void 0) { waitDownload = false; }
            return Promise.resolve(url);
        };
        H5Platform.prototype.setTimeout = function (callback, timeout) {
            return setTimeout(callback, timeout);
        };
        H5Platform.prototype.setInterval = function (callback, timeout) {
            return setInterval(callback, timeout);
        };
        H5Platform.prototype.clearTimeout = function (t) {
            clearTimeout(t);
        };
        H5Platform.prototype.clearInterval = function (t) {
            clearInterval(t);
        };
        H5Platform.prototype.checkBannerClick = function (res) {
            throw new Error("Method not implemented.");
        };
        H5Platform.prototype.onHide = function () {
        };
        H5Platform.prototype.showModal = function (object) {
        };
        return H5Platform;
    }());
    mpsdk.H5Platform = H5Platform;
})(mpsdk || (mpsdk = {}));
/// <reference path="Env.ts" />
/// <reference path="utils.ts" />
var mpsdk;
(function (mpsdk) {
    /**
     * 字节跳动平台适配器
     * @external
     */
    var TTPlatform = /** @class */ (function (_super) {
        __extends(TTPlatform, _super);
        function TTPlatform() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        // public getUserAccount(launchOptions: ILaunchOptions): Promise<IAccount> {
        //   return new Promise((resolve, reject) => {
        //     wx.login({
        //       success: (loginResult: { code: string;anonymousCode:string }) => {
        //         wx.getSetting({
        //           success: (settingResult: { authSetting: any }) => {
        //             //如果已经授权则尝试获取unionId
        //             if (settingResult.authSetting['scope.userInfo']) {
        //               wx.getUserInfo({
        //                 withCredentials: true,
        //                 success: (userInfoResult: { encryptedData: string, iv: string }) => {
        //                   let credentials = {
        //                     code: loginResult.code?loginResult.code:'',
        //                     anonymous_code: loginResult.anonymousCode?loginResult.anonymousCode:'',
        //                     encryptedData: userInfoResult.encryptedData,
        //                     iv: userInfoResult.iv
        //                   }
        //                   this.ttLogin(credentials, launchOptions).then(account => {
        //                     resolve(account);
        //                   });
        //                 }
        //               });
        //             }
        //             //没有授权就只获取openId
        //             else {
        //               let credentials = {
        //                 code: loginResult.code?loginResult.code:'',
        //                 anonymous_code: loginResult.anonymousCode?loginResult.anonymousCode:'',
        //                 encryptedData: '',
        //                 iv: ''
        //               }
        //               this.ttLogin(credentials, launchOptions).then(account => {
        //                 if(!account.openid){
        //                   account.openid = account.anonymous_openid?account.anonymous_openid:"";
        //                 }
        //                 resolve(account);
        //               });
        //             }
        //           }
        //         });
        //       },
        //       fail:(res)=>{
        //         log('login anonymous : ',res);
        //         wx.login({
        //           force:false,
        //           success: (loginResult: { code: string;anonymousCode:string }) => {
        //             let credentials = {
        //               code: loginResult.code?loginResult.code:'',
        //               anonymous_code: loginResult.anonymousCode?loginResult.anonymousCode:'',
        //               encryptedData: '',
        //               iv: ''
        //             }
        //             this.ttLogin(credentials, launchOptions).then(account => {
        //               if(!account.openid){
        //                 account.openid = account.anonymous_openid?account.anonymous_openid:"";
        //               }
        //               resolve(account);
        //             });
        //           }
        //         });
        //       }
        //     });
        //   });
        // }
        TTPlatform.prototype.getUserAccount = function (launchOptions) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.getTTUserAccountOnce(launchOptions).then(function (account) {
                    resolve(account);
                }).catch(function (e) {
                    _this.getTTUserAccountOnce(launchOptions).then(function (account) {
                        resolve(account);
                    }).catch(function (e) {
                        _this.getTTUserAccountOnce(launchOptions).then(function (account) {
                            resolve(account);
                        }).catch(function (e) {
                            mpsdk.log('login retry over.');
                            reject(e);
                        });
                    });
                });
            });
        };
        TTPlatform.prototype.getTTUserAccountOnce = function (launchOptions) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                wx.login({
                    force: false,
                    success: function (loginResult) {
                        wx.getSetting({
                            success: function (settingResult) {
                                //如果已经授权则尝试获取unionId
                                if (settingResult.authSetting['scope.userInfo']) {
                                    wx.getUserInfo({
                                        withCredentials: true,
                                        success: function (userInfoResult) {
                                            mpsdk.log('头条授权成功,继续服务器端登录 ', loginResult);
                                            var credentials = {
                                                code: loginResult.code ? loginResult.code : '',
                                                anonymous_code: loginResult.anonymousCode ? loginResult.anonymousCode : '',
                                                encryptedData: userInfoResult.encryptedData,
                                                iv: userInfoResult.iv
                                            };
                                            _this.ttLogin(credentials, launchOptions).then(function (account) {
                                                if (!account.openid) {
                                                    account.openid = account.anonymous_openid ? account.anonymous_openid : "";
                                                }
                                                resolve(account);
                                            }).catch(function (e) {
                                                reject(e);
                                            });
                                        },
                                        fail: function (res) {
                                            mpsdk.log('头条授权成功,但获取userinfo失败,继续服务器端登录 ', loginResult);
                                            var credentials = {
                                                code: loginResult.code ? loginResult.code : '',
                                                anonymous_code: loginResult.anonymousCode ? loginResult.anonymousCode : '',
                                                encryptedData: '',
                                                iv: ''
                                            };
                                            _this.ttLogin(credentials, launchOptions).then(function (account) {
                                                if (!account.openid) {
                                                    account.openid = account.anonymous_openid ? account.anonymous_openid : "";
                                                }
                                                resolve(account);
                                            }).catch(function (e) {
                                                reject(e);
                                            });
                                        }
                                    });
                                }
                                //没有授权就只获取openId
                                else {
                                    mpsdk.log('头条未授权,继续服务器端登录 ', loginResult);
                                    var credentials = {
                                        code: loginResult.code ? loginResult.code : '',
                                        anonymous_code: loginResult.anonymousCode ? loginResult.anonymousCode : '',
                                        encryptedData: '',
                                        iv: ''
                                    };
                                    _this.ttLogin(credentials, launchOptions).then(function (account) {
                                        if (!account.openid) {
                                            account.openid = account.anonymous_openid ? account.anonymous_openid : "";
                                        }
                                        resolve(account);
                                    }).catch(function (e) {
                                        reject(e);
                                    });
                                }
                            },
                            fail: function (res) {
                                mpsdk.log('头条授权失败,继续服务器端登录 ', loginResult, res);
                                var credentials = {
                                    code: loginResult.code ? loginResult.code : '',
                                    anonymous_code: loginResult.anonymousCode ? loginResult.anonymousCode : '',
                                    encryptedData: '',
                                    iv: ''
                                };
                                _this.ttLogin(credentials, launchOptions).then(function (account) {
                                    resolve(account);
                                }).catch(function (e) {
                                    reject(e);
                                });
                            }
                        });
                    },
                    fail: function (res) {
                        mpsdk.log('头条登录失败，继续匿名登录. ', res);
                        wx.login({
                            force: false,
                            success: function (loginResult) {
                                mpsdk.log('头条匿名登录成功,继续服务器端登录 ', loginResult, res);
                                var credentials = {
                                    code: loginResult.code ? loginResult.code : '',
                                    anonymous_code: loginResult.anonymousCode ? loginResult.anonymousCode : '',
                                    encryptedData: '',
                                    iv: ''
                                };
                                _this.ttLogin(credentials, launchOptions).then(function (account) {
                                    if (!account.openid) {
                                        account.openid = account.anonymous_openid ? account.anonymous_openid : "";
                                    }
                                    resolve(account);
                                }).catch(function (e) {
                                    reject(e);
                                });
                            },
                            fail: function (res) {
                                mpsdk.log('头条匿名登录失败. ', res);
                                reject(res);
                            }
                        });
                    }
                });
            });
        };
        /**
         * 依靠服务器获取帐号信息
         */
        TTPlatform.prototype.ttLogin = function (credentials, launchOptions) {
            var _this = this;
            var accountSource = mpsdk.utils.parseAccountSource(launchOptions);
            return new Promise(function (resolve, reject) {
                var data = {
                    gameId: mpsdk.Env.gameId,
                    code: credentials.code,
                    anonymous_code: credentials.anonymous_code,
                    encryptedData: encodeURIComponent(credentials.encryptedData),
                    iv: encodeURIComponent(credentials.iv),
                    unionId: credentials.encryptedData && credentials.iv ? 'true' : 'false',
                    sourceType: accountSource.sourceType,
                    sourceId: accountSource.sourceId,
                    model: encodeURIComponent(wx.getSystemInfoSync().model)
                };
                var loginUrl = mpsdk.Env.newLoginServer + '/MiniLogin/data/getTTOpenId.action';
                // loginUrl = Env.newLoginServer + '/MiniGame/data/getTTOpenId.action';
                _this.httpRequest(loginUrl, data, 'get', 0).then(function (res) {
                    mpsdk.log('服务端登录成功', res);
                    if (res && res.anonymous_openid) {
                        mpsdk.Report.reportEvent(0, res.anonymous_openid, '');
                    }
                    resolve(res);
                }).catch(function (res) {
                    mpsdk.log('服务端登录失败', res);
                    reject(res);
                });
            });
        };
        TTPlatform.prototype.onHide = function () {
        };
        return TTPlatform;
    }(mpsdk.MinaPlatform));
    mpsdk.TTPlatform = TTPlatform;
})(mpsdk || (mpsdk = {}));
/// <reference path="Env.ts" />
/// <reference path="utils.ts" />
var mpsdk;
(function (mpsdk) {
    /**
     * QQ平台适配器
     * @external
     */
    var QQminiPlatform = /** @class */ (function () {
        function QQminiPlatform() {
        }
        QQminiPlatform.prototype.writeFile = function (fileName, data) {
            if (!fileName || !data) {
                return '';
            }
            var fs = qq.getFileSystemManager();
            var rootDir = qq.env.USER_DATA_PATH + '/mpsdkadqq';
            var filePath = rootDir + '/' + fileName;
            try {
                fs.accessSync(rootDir);
            }
            catch (error) {
                fs.mkdirSync(rootDir);
            }
            try {
                fs.accessSync(filePath);
                return filePath;
            }
            catch (error) {
            }
            var fileNameList = new Array();
            try {
                fileNameList = fs.readdirSync(rootDir);
                var nameSplitArray = fileName.split('_');
                var prefixName = nameSplitArray[0];
                for (var i = 0; i < fileNameList.length; i++) {
                    var tempFileName = fileNameList[i];
                    if (tempFileName.indexOf(prefixName + '_') == 0) {
                        fs.unlinkSync(filePath);
                        break;
                    }
                }
            }
            catch (error) {
            }
            try {
                fs.writeFileSync(filePath, data, 'utf-8');
            }
            catch (e) {
                console.log('write file fail. filename:', fileName, ' error:', e);
                filePath = '';
            }
            return filePath;
        };
        QQminiPlatform.prototype.onHide = function () {
            qq.onShow(function (options) {
                mpsdk.Report.reportAppRun(options);
                mpsdk.Report.reportHotLaunch(options);
                mpsdk.Hack.onShow();
            });
            qq.onHide(function (options) {
                mpsdk.Hack.checkRewardedVideoAd2Back(options);
                var account = mpsdk.Account.getAccount();
                var hideOptions = {
                    gameId: mpsdk.Env.gameId,
                    gamePath: mpsdk.Env.gamePath,
                    openid: account.openid,
                    unionid: account.unionid,
                    lastLoginTime: account.lastLoginTime,
                    createTime: account.createTime,
                    shareTime: account.shareTime,
                    sid: account.sid,
                    anonymous_openid: account.anonymous_openid,
                    options: options,
                    launchOptions: mpsdk.Env.launchOptions,
                };
                mpsdk.Hack.onHide(hideOptions);
            });
        };
        QQminiPlatform.prototype.getStorage = function (key) {
            return qq.getStorageSync(mpsdk.Env.storagePrefix + key);
        };
        QQminiPlatform.prototype.setStorage = function (key, data) {
            qq.setStorageSync(mpsdk.Env.storagePrefix + key, data);
        };
        QQminiPlatform.prototype.httpRequest = function (url, params, method, retryTimes) {
            if (method === void 0) { method = 'get'; }
            if (retryTimes === void 0) { retryTimes = 2; }
            return __awaiter(this, void 0, void 0, function () {
                var network, requestParams, key;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                                qq.getNetworkType({
                                    success: function (res) { resolve(res); },
                                    fail: function (res) { reject(res); }
                                });
                            })];
                        case 1:
                            network = _a.sent();
                            if (network.networkType == 'none') {
                                throw '当前网络不可用';
                            }
                            requestParams = '';
                            if (params) {
                                for (key in params) {
                                    requestParams += key + '=' + params[key] + '&';
                                }
                                if (requestParams) {
                                    //去除末尾&
                                    requestParams = requestParams.substr(0, requestParams.length - 1);
                                    //如果是get请求则直接把参数链接到url后面
                                    if (method == 'get') {
                                        url += url.indexOf('?') == -1 ? '?' : '&';
                                        url += requestParams;
                                    }
                                }
                            }
                            return [4 /*yield*/, new Promise(function (resolve, reject) {
                                    var requestOptions = { url: url };
                                    //POST
                                    if (method != 'get') {
                                        requestOptions['method'] = 'POST';
                                        requestOptions['data'] = params;
                                    }
                                    //重试机制
                                    var retryCount = 0;
                                    var retrySend = function (reason) {
                                        if (++retryCount <= retryTimes) {
                                            qq.request(requestOptions);
                                            mpsdk.log('HTTP请求重试(' + retryCount + ')', url);
                                            return true;
                                        }
                                        reject(reason);
                                        return false;
                                    };
                                    //成功
                                    requestOptions.success = function (response) {
                                        if (response.statusCode && response.statusCode >= 200 && response.statusCode < 400) {
                                            resolve(response.data);
                                        }
                                        else {
                                            retrySend(response);
                                        }
                                    };
                                    //失败
                                    requestOptions.fail = function (reason) {
                                        retrySend(reason);
                                    };
                                    //发出请求
                                    qq.request(requestOptions);
                                })];
                        case 2: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        // public getUserAccount(launchOptions: ILaunchOptions): Promise<IAccount> {
        //   return new Promise((resolve, reject) => {
        //     qq.login({
        //       success: (loginResult: { code: string }) => {
        //         qq.getSetting({
        //           success: (settingResult: { authSetting: any }) => {
        //             //如果已经授权则尝试获取unionId
        //             if (settingResult.authSetting['scope.userInfo']) {
        //               qq.getUserInfo({
        //                 withCredentials: true,
        //                 success: (userInfoResult: { encryptedData: string, iv: string }) => {
        //                   let credentials = {
        //                     code: loginResult.code,
        //                     encryptedData: userInfoResult.encryptedData,
        //                     iv: userInfoResult.iv
        //                   }
        //                   this.login(credentials, launchOptions).then(account => {
        //                     resolve(account);
        //                   });
        //                 }
        //               });
        //             }
        //             //没有授权就只获取openId
        //             else {
        //               let credentials = {
        //                 code: loginResult.code,
        //                 encryptedData: '',
        //                 iv: ''
        //               }
        //               this.login(credentials, launchOptions).then(account => {
        //                 resolve(account);
        //               });
        //             }
        //           }
        //         });
        //       }
        //     });
        //   });
        // }
        QQminiPlatform.prototype.getUserAccount = function (launchOptions) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.getUserAccountOnce(launchOptions).then(function (account) {
                    resolve(account);
                }).catch(function (e) {
                    _this.getUserAccountOnce(launchOptions).then(function (account) {
                        resolve(account);
                    }).catch(function (e) {
                        _this.getUserAccountOnce(launchOptions).then(function (account) {
                            resolve(account);
                        }).catch(function (e) {
                            mpsdk.log('login retry over.');
                            reject(e);
                        });
                    });
                });
            });
        };
        QQminiPlatform.prototype.getUserAccountOnce = function (launchOptions) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                qq.login({
                    success: function (loginResult) {
                        qq.getSetting({
                            success: function (settingResult) {
                                //如果已经授权则尝试获取unionId
                                if (settingResult.authSetting['scope.userInfo']) {
                                    qq.getUserInfo({
                                        withCredentials: true,
                                        success: function (userInfoResult) {
                                            mpsdk.log('QQ授权成功,继续服务器端登录 ', loginResult.code);
                                            var credentials = {
                                                code: loginResult.code,
                                                encryptedData: userInfoResult.encryptedData,
                                                iv: userInfoResult.iv
                                            };
                                            _this.login(credentials, launchOptions).then(function (account) {
                                                resolve(account);
                                            }).catch(function (e) {
                                                reject(e);
                                            });
                                        }
                                    });
                                }
                                //没有授权就只获取openId
                                else {
                                    mpsdk.log('QQ未授权,继续服务器端登录 ', loginResult.code);
                                    var credentials = {
                                        code: loginResult.code,
                                        encryptedData: '',
                                        iv: ''
                                    };
                                    _this.login(credentials, launchOptions).then(function (account) {
                                        resolve(account);
                                    }).catch(function (e) {
                                        reject(e);
                                    });
                                }
                            },
                            fail: function (res) {
                                mpsdk.log('QQ授权失败,继续服务器端登录 ', loginResult.code, res);
                                var credentials = {
                                    code: loginResult.code,
                                    encryptedData: '',
                                    iv: ''
                                };
                                _this.login(credentials, launchOptions).then(function (account) {
                                    resolve(account);
                                }).catch(function (e) {
                                    reject(e);
                                });
                            }
                        });
                    },
                    fail: function (res) {
                        mpsdk.log('QQ登录失败: ', res);
                        reject(res);
                    }
                });
            });
        };
        /**
         * 依靠服务器获取帐号信息
         */
        QQminiPlatform.prototype.login = function (credentials, launchOptions) {
            var _this = this;
            var accountSource = mpsdk.utils.parseAccountSource(launchOptions);
            return new Promise(function (resolve, reject) {
                var data = {
                    gameId: mpsdk.Env.gameId,
                    code: credentials.code,
                    encryptedData: encodeURIComponent(credentials.encryptedData),
                    iv: encodeURIComponent(credentials.iv),
                    unionId: credentials.encryptedData && credentials.iv ? 'true' : 'false',
                    sourceType: accountSource.sourceType,
                    sourceId: accountSource.sourceId,
                    model: encodeURIComponent(qq.getSystemInfoSync().model)
                };
                var loginUrl = mpsdk.Env.newLoginServer + '/MiniLogin/data/getQQOpenId.action';
                _this.httpRequest(loginUrl, data, 'get', 0).then(function (res) {
                    mpsdk.log('服务端登录成功', res);
                    resolve(res);
                }).catch(function (res) {
                    mpsdk.log('服务端登录失败', res);
                    reject(res);
                });
            });
        };
        QQminiPlatform.prototype.getUserInfo = function () {
            return new Promise(function (resolve, reject) {
                qq.getSetting({
                    fail: function (res) {
                        reject();
                    },
                    success: function (settingResult) {
                        if (settingResult.authSetting['scope.userInfo']) {
                            qq.getUserInfo({
                                fail: function (res) {
                                    reject();
                                },
                                success: function (userInfoResult) {
                                    resolve(userInfoResult.userInfo);
                                }
                            });
                        }
                        else {
                            reject();
                        }
                    }
                });
            });
        };
        QQminiPlatform.prototype.getSystem = function () {
            var sys = qq.getSystemInfoSync();
            return { platform: sys.platform };
        };
        QQminiPlatform.prototype.getLaunchOptions = function () {
            if (qq.getLaunchOptionsSync) {
                return qq.getLaunchOptionsSync();
            }
            else {
                throw new Error("小程序启动参数请从app.js的onLaunch回调函数中获取");
            }
        };
        QQminiPlatform.prototype.launchTo = function (app) {
            return new Promise(function (resolve, reject) {
                //小游戏版本过低不能直接跳转，需要展示二维码
                if (!qq.redirectTo && qq.getSystemInfoSync().SDKVersion < '2.2.0') {
                    qq.previewImage({ urls: [app.ad_image] });
                    resolve();
                    return;
                }
                //小游戏和小程序都是一样的跳转逻辑
                qq.showLoading({ title: '请稍候...', mask: true });
                setTimeout(qq.hideLoading, 5 * 1000); //5秒后超时隐藏
                qq.navigateToMiniProgram({
                    appId: app.appid,
                    path: app.page,
                    success: function (res) {
                        qq.hideLoading();
                        resolve();
                        mpsdk.log('打开其他程序成功，appId=', app.appid, 'path=', app.page);
                    },
                    fail: function (res) {
                        qq.hideLoading();
                        if (app.ad_image && ['.jpg', '.gif', '.png'].indexOf(app.ad_image.substr(-4)) != -1) {
                            qq.previewImage({ urls: [app.ad_image] });
                            resolve();
                            mpsdk.log('直接跳转失败，拉起小程序码，appId=', app.appid, 'path=', app.page);
                        }
                        else {
                            reject();
                            mpsdk.log('直接跳转失败，小程序码未设置，appId=', app.appid, 'path=', app.page, JSON.stringify(res));
                        }
                    }
                });
            });
        };
        QQminiPlatform.prototype.launchToSync = function (app, launchToCallback) {
        };
        QQminiPlatform.prototype.share = function (shareInfo, success, fail, thisObject) {
            var randomShareInfo = mpsdk.Share.genShareInfo(shareInfo);
            var info = {};
            info.title = randomShareInfo.title;
            info.imageUrl = randomShareInfo.image;
            if (qq.redirectTo) { //小程序
                info.path = mpsdk.Share.getShareLink(shareInfo.serial, shareInfo.path || '/pages/index/index', shareInfo.params || {}, randomShareInfo.imageId);
            }
            else { //小游戏
                info.query = mpsdk.Share.getShareQuery(randomShareInfo.serial, randomShareInfo.params || {}, randomShareInfo.imageId);
            }
            info.success = function (res) {
                success && success.call(thisObject, res);
            };
            info.fail = function (res) {
                fail && fail.call(thisObject, res);
            };
            info.cancel = function (res) {
                fail && fail.call(thisObject, res);
            };
            //由于qq取消了分享事件，只要拉起分享就计算分享次数
            mpsdk.Share.reportShareOut(shareInfo.serial, randomShareInfo.imageId.toString());
            return info;
        };
        QQminiPlatform.prototype.getCacheRes = function (url, waitDownload) {
            var _this = this;
            if (waitDownload === void 0) { waitDownload = false; }
            return new Promise(function (resolve, reject) {
                // 微信只支持https打头的路径
                if (url.substr(0, 8).toLowerCase() !== 'https://') {
                    resolve(url);
                    return;
                }
                var cacheFile = qq.env.USER_DATA_PATH + '/mpsdk/' + url.substr(8);
                var fs = qq.getFileSystemManager();
                // 如果路径是一个可访问的文件则直接返回，否则删除掉
                try {
                    fs.accessSync(cacheFile);
                    if (fs.statSync(cacheFile).isFile()) {
                        resolve(cacheFile);
                        return;
                    }
                    else {
                        fs.rmdirSync(cacheFile);
                    }
                }
                catch (e) {
                }
                // 已经在下载队列中的不管选择等不等待都直接返回原地址
                if (QQminiPlatform.downloadQueue.indexOf(url) >= 0) {
                    resolve(url);
                    return;
                }
                // 不用等待下载的先返回原地址
                !waitDownload && resolve(url);
                // 加入下载队列
                QQminiPlatform.downloadQueue.push(url);
                qq.downloadFile({
                    url: url,
                    success: function (res) {
                        if (res.statusCode === 200) {
                            _this.mkdirRecursiveSync(cacheFile.substring(0, cacheFile.lastIndexOf('/')));
                            fs.saveFileSync(res.tempFilePath, cacheFile);
                            waitDownload && resolve(cacheFile); //下载成功返回缓存路径
                        }
                        else {
                            waitDownload && resolve(url); //下载失败返回原URL
                        }
                    },
                    fail: function () {
                        waitDownload && resolve(url); //下载失败返回原URL
                    },
                    complete: function () {
                        QQminiPlatform.downloadQueue.splice(QQminiPlatform.downloadQueue.indexOf(url), 1);
                    }
                });
            });
        };
        /**
         * 自动创建多级路径
         * @param dirPath 路径
         */
        QQminiPlatform.prototype.mkdirRecursiveSync = function (dirPath) {
            var fs = qq.getFileSystemManager();
            var dirLevel = dirPath.replace(qq.env.USER_DATA_PATH, '').split('/');
            var currentDir = qq.env.USER_DATA_PATH;
            for (var _i = 0, dirLevel_2 = dirLevel; _i < dirLevel_2.length; _i++) {
                var dirName = dirLevel_2[_i];
                if (!dirName) {
                    continue;
                }
                currentDir += '/' + dirName;
                try {
                    fs.accessSync(currentDir);
                    // 如果目标不是文件夹则删掉建立文件夹
                    if (!fs.statSync(currentDir).isDirectory()) {
                        fs.unlinkSync(currentDir);
                        fs.mkdirSync(currentDir, true);
                    }
                }
                catch (e) {
                    fs.mkdirSync(currentDir, true);
                }
            }
            return currentDir;
        };
        QQminiPlatform.prototype.setTimeout = function (callback, timeout) {
            return setTimeout(callback, timeout);
        };
        QQminiPlatform.prototype.setInterval = function (callback, timeout) {
            return setInterval(callback, timeout);
        };
        QQminiPlatform.prototype.clearTimeout = function (t) {
            clearTimeout(t);
        };
        QQminiPlatform.prototype.clearInterval = function (t) {
            clearInterval(t);
        };
        ////////////////////////////////////////
        //qq小程序平台扩展功能
        ////////////////////////////////////////
        /**
         * 解析qq群ID（使用此方法之前必须设置Env.gameId）
         * @param shareTicket 分享后得到的分享票据
         */
        QQminiPlatform.prototype.parseShareTicket = function (shareTicket) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                if (!shareTicket) {
                    reject('shareTicket required');
                    return;
                }
                qq.login({
                    fail: function (err) {
                        reject(err);
                    },
                    success: function (resLogin) {
                        qq.getShareInfo({
                            shareTicket: shareTicket,
                            fail: function (err) {
                                reject(err);
                            },
                            success: function (resShareInfo) {
                                var data = {
                                    gameId: mpsdk.Env.gameId,
                                    code: encodeURIComponent(resLogin.code),
                                    encryptedData: encodeURIComponent(resShareInfo.encryptedData),
                                    iv: resShareInfo.iv
                                };
                                _this.httpRequest(mpsdk.Env.loginServer + '/MiniGame/data/getShareInfo.action', data).then(function (resServer) {
                                    if (resServer.openGId) {
                                        resolve(resServer);
                                    }
                                    else {
                                        reject(resServer);
                                    }
                                }).catch(function (err) {
                                    reject(err);
                                });
                            }
                        });
                    }
                });
            });
        };
        /**
         * 注册qq模板消息
         * @param msgId 后台配置表的消息id,咨询策划获取
         * @param formId form表单id,只有真机情况下才能获取到
         * @param param1 参数填充关键字类型
         */
        QQminiPlatform.prototype.subscribe = function (msgId, formId, param1) {
            var _this = this;
            if (param1 === void 0) { param1 = ''; }
            return new Promise(function (resolve, reject) {
                if (formId == "the formId is a mock one") {
                    mpsdk.log('只能在真机环境下才能订阅模板消息');
                    return;
                }
                if (!_this.subscribeEnable(msgId)) {
                    mpsdk.log('订阅有效期内无需重复订阅');
                    return;
                }
                mpsdk.Account.getAccountSafe().then(function (account) {
                    var data = {
                        clockId: msgId,
                        gameId: mpsdk.Env.gameId,
                        openId: account.openid,
                        formId: formId,
                        parameters: param1
                    };
                    _this.httpRequest(mpsdk.Env.loginServer + '/MiniGame/data/regNotify.action', data).then(function (res) {
                        qq.setStorageSync('regnotify_' + msgId + '_endtime', res.time);
                        qq.setStorageSync('regnotify_' + msgId + '_starttime', new Date().getTime());
                        //日志
                        var localDateTime = new Date(res.time).toLocaleDateString() + " " + new Date(res.time).toLocaleTimeString();
                        mpsdk.log('注册模板消息成功', JSON.stringify(data), '有效期至', localDateTime);
                        //
                        resolve();
                    });
                });
            });
        };
        /**
         * 检查当前是否可以订阅模版消息（如果处于上次订阅有效期内则不能重复订阅）
         * @param msgId 后台配置表的消息id,咨询策划获取
         */
        QQminiPlatform.prototype.subscribeEnable = function (msgId) {
            var starttime = +qq.getStorageSync('regnotify_' + msgId + '_starttime');
            var endtime = +qq.getStorageSync('regnotify_' + msgId + '_endtime');
            var nowtime = new Date().getTime();
            if (starttime <= nowtime && nowtime <= endtime) {
                return false;
            }
            return true;
        };
        /**
         * 检查玩家是否点击banner；
         * @param res qq.onShow回调信息
         * @returns 如果点击成功返回true，否则返回false
         */
        QQminiPlatform.prototype.checkBannerClick = function (res) {
            if (res && res.scene == 1038) {
                if (res.referrerInfo && res.referrerInfo.appId) {
                    return true;
                }
            }
            return false;
        };
        QQminiPlatform.prototype.showModal = function (object) {
        };
        /**
         * 下载队列
         */
        QQminiPlatform.downloadQueue = [];
        return QQminiPlatform;
    }());
    mpsdk.QQminiPlatform = QQminiPlatform;
})(mpsdk || (mpsdk = {}));
/// <reference path="BricksPlatform.ts" />
/// <reference path="MinaPlatform.ts" />
/// <reference path="EgretPlatform.ts" />
/// <reference path="CocosPlatform.ts" />
/// <reference path="H5Platform.ts" />
/// <reference path="TTPlatform.ts" />
/// <reference path="QQminiPlatform.ts" />
var mpsdk;
(function (mpsdk) {
    /**
     * 平台差异处理模块
     */
    var Platform = /** @class */ (function () {
        function Platform() {
        }
        Object.defineProperty(Platform, "platformType", {
            /**
             * 平台类型（bk/tt/qq/wx/egret/cocos/laya/h5）
             */
            get: function () {
                if (typeof BK == 'object') {
                    return 'bk';
                }
                else if (typeof tt == 'object') {
                    return 'tt';
                }
                else if (typeof qq == 'object') {
                    return 'qq';
                }
                else if (typeof wx == 'object') {
                    return 'wx';
                }
                else if (typeof egret == 'object') {
                    return 'egret';
                }
                else if (typeof cc == 'object') {
                    return 'cocos';
                }
                else if (typeof Laya == 'object') {
                    return 'laya';
                }
                else {
                    return 'unknow';
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Platform, "instance", {
            /**
             * 平台单例
             */
            get: function () {
                if (!this._instance) {
                    switch (this.platformType) {
                        case 'bk':
                            this._instance = new mpsdk.BricksPlatform();
                            mpsdk.log('识别到玩一玩/厘米游戏平台');
                            break;
                        case 'qq':
                            this._instance = new mpsdk.QQminiPlatform();
                            mpsdk.log('识别到QQ平台');
                            break;
                        case 'tt':
                            this._instance = new mpsdk.TTPlatform();
                            mpsdk.log('识别到字节跳动平台');
                            break;
                        case 'wx':
                            this._instance = new mpsdk.MinaPlatform();
                            mpsdk.log('识别到微信平台');
                            break;
                        case 'egret':
                            this._instance = new mpsdk.EgretPlatform();
                            mpsdk.log('识别到Egret引擎');
                            break;
                        case 'cocos':
                            this._instance = new mpsdk.CocosPlatform();
                            mpsdk.log('识别到Cocos引擎');
                            break;
                        case 'laya':
                            this._instance = new mpsdk.LayaPlatform();
                            mpsdk.log('识别到Laya引擎');
                            break;
                        default:
                            mpsdk.log('未能识别平台类型，默认当前处于H5环境');
                            this._instance = new mpsdk.H5Platform();
                    }
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        return Platform;
    }());
    mpsdk.Platform = Platform;
})(mpsdk || (mpsdk = {}));
/// <reference path="Env.ts" />
/// <reference path="Platform.ts" />
/// <reference path="utils.ts" />
var mpsdk;
(function (mpsdk) {
    /**
     * 账号处理模块
     */
    var Account = /** @class */ (function () {
        function Account() {
        }
        /**
         * 加载黑名单
         * @deprecated 已于2019-05-09被停用
         */
        Account.loadBlackNames = function () {
            if (!this.blackNamesPromise) {
                this.blackNamesPromise = new Promise(function (resolve, reject) {
                    //目前只有微信平台有黑名单
                    if (mpsdk.Platform.platformType != 'wx') {
                        resolve();
                        return;
                    }
                    //先取缓存顶上
                    var black_names_ver = mpsdk.Platform.instance.getStorage('black_names_ver');
                    var black_names_data = mpsdk.Platform.instance.getStorage('black_names_data');
                    if (typeof black_names_data == 'object') {
                        // this.blackNames = black_names_data;
                    }
                    //然后才更新数据
                    mpsdk.Platform.instance.httpRequest(mpsdk.Env.cdnServer + '/black_names_ver.json').then(function (verData) {
                        //远程版本无效，无法比较，优先用本地缓存
                        if (!mpsdk.utils.value(verData, mpsdk.Platform.platformType)) {
                            resolve();
                            return;
                        }
                        //版本号未改变，无需重复下载
                        if (mpsdk.utils.value(verData, mpsdk.Platform.platformType) == mpsdk.utils.value(black_names_ver, mpsdk.Platform.platformType)) {
                            resolve();
                            return;
                        }
                        //版本不一致，重新下载
                        mpsdk.Platform.instance.httpRequest(mpsdk.Env.cdnServer + '/black_names_' + mpsdk.Platform.platformType + '.json').then(function (res) {
                            if (typeof res == 'object') {
                                // this.blackNames = res;
                                mpsdk.Platform.instance.setStorage('black_names_ver', verData);
                                mpsdk.Platform.instance.setStorage('black_names_data', res);
                            }
                            resolve();
                            return;
                        });
                    });
                });
            }
            return this.blackNamesPromise;
        };
        /**
         * 设置用户帐号数据
         * @param account 用户帐号对象{"openid":"","unionid":""}
         * @returns 如果用户账号数据正确返回true，否则返回false
         */
        Account.setAccount = function (account) {
            if (!account.openid) {
                mpsdk.log('设置用户帐号失败，请至少设置openid，account=', account);
                return false;
            }
            if (account.createTime) {
                account.sid = account.createTime.toString().slice(2, -4) + account.openid.substr(account.openid.length - 4, account.openid.length);
            }
            if (!account.unionid) {
                account.unionid = '';
            }
            if (account.unionid == '"null"' || account.unionid == 'null') {
                account.unionid = '';
            }
            mpsdk.Platform.instance.setStorage('user_account', account);
            mpsdk.log('更新openid成功', account.openid);
            return true;
        };
        /**
         * 获取当前用户上次分享成功时间
         *
         * 注意并不是实时结果，只在用户登录时从服务器拉取一次
         *
         * 分享成功的定义是有别的玩家点击过当前玩家的分享卡片进入游戏
         *
         * @returns 时间戳（秒）
         * 针对有过成功分享的用户，返回上次分享被点击的时间；
         * 针对当天建号的用户，以建号的时间作为上次分享成功的时间；
         * 否则返回空，表示无效分享用户
         */
        Account.getLastShareTime = function () {
            return __awaiter(this, void 0, void 0, function () {
                var account;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, this.getAccountSafe()];
                        case 1:
                            account = _a.sent();
                            if (account.shareTime) {
                                return [2 /*return*/, Number(account.shareTime)];
                            }
                            // 针对当天建号的用户，以建号的时间作为上次分享成功的时间
                            if (account.createTime && new Date(account.createTime).toLocaleDateString() == new Date().toLocaleDateString()) {
                                return [2 /*return*/, Math.floor(account.createTime / 1000)];
                            }
                            // 否则返回空，表示无效分享用户
                            return [2 /*return*/, undefined];
                    }
                });
            });
        };
        /**
         * 获取用户帐号数据
         * @return 用户帐号对象{"openid":"","unionid":""}
         */
        Account.getAccount = function () {
            var account = mpsdk.Platform.instance.getStorage('user_account');
            if (account && account.openid) {
                account.unionid = account.unionid || '';
                return account;
            }
            return {
                openid: "",
                unionid: "",
                lastLoginTime: 0,
                createTime: 0
            };
        };
        /**
         * 获取用户帐号数据
         *
         * 由于微信平台获取用户账号ID需要走服务器，存在异步问题，本方法可等待账号数据就绪后才返回结果
         */
        Account.getAccountSafe = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                //如果可以拿到帐号就直接返回
                if (_this.getAccount().openid) {
                    resolve(_this.getAccount());
                    return;
                }
                //开启定时探测账号是否就绪
                var _timerInterval;
                var _timerTimeout;
                //循环监听帐号是否准备好
                _timerInterval = mpsdk.Platform.instance.setInterval(function () {
                    if (_this.getAccount().openid) {
                        mpsdk.Platform.instance.clearInterval(_timerInterval);
                        mpsdk.Platform.instance.clearTimeout(_timerTimeout);
                        resolve(_this.getAccount());
                    }
                }, 200);
                //最长30秒放弃
                _timerTimeout = mpsdk.Platform.instance.setTimeout(function () {
                    mpsdk.Platform.instance.clearInterval(_timerInterval);
                }, 30000);
            });
        };
        /**
         * 设置用户来源
         * @param sourceType 用户来源类型
         * @param sourceId 用户来源ID
         */
        Account.setAccountSource = function (sourceType, sourceId) {
            this.getAccountSafe().then(function (account) {
                mpsdk.Platform.instance.httpRequest(mpsdk.Env.friendServer + '/MiniFriend/data/setAccountLogin.action', {
                    gameId: mpsdk.Env.gameId,
                    openId: account.openid,
                    unionId: account.unionid,
                    sourceType: sourceType,
                    sourceId: sourceId,
                }).then(function (res) {
                    mpsdk.log('上报用户来源成功', 'sourceType=', sourceType, 'sourceId=', sourceId);
                });
            }).catch(function () {
                mpsdk.log('openid超时未就绪，上报用户来源失败');
            });
        };
        /**
         * 上报用户信息（并判断该用户是否是黑名单用户）
         * @param userInfo 户信息对象
         * @returns 该用户是否是黑名单用户，true是，false否. 注意：请不要用该返回值判断是否为黑名单用户(该功能已停用)
         */
        Account.setAccountInfo = function (userInfo) {
            // 只有用户信息发生改变后才上传到服务器
            if (!mpsdk.utils.deepCompare(mpsdk.Platform.instance.getStorage('user_info'), userInfo)) {
                mpsdk.Platform.instance.setStorage('user_info', userInfo);
                this.getAccountSafe().then(function (account) {
                    mpsdk.Platform.instance.httpRequest(mpsdk.Env.friendServer + '/MiniFriend/data/setAccountShow.action', {
                        gameId: mpsdk.Env.gameId,
                        openId: account.openid,
                        unionId: account.unionid,
                        show: encodeURIComponent(JSON.stringify(userInfo)),
                    }).then(function (res) {
                        mpsdk.log('上报用户信息成功');
                    });
                }).catch(function () {
                    mpsdk.log('openid超时未就绪，上报用户信息失败');
                });
            }
            return new Promise(function (resolve, reject) {
                resolve(false);
                // this.loadBlackNames().then(() => {
                //   //精确匹配
                //   let assertList: string[] = utils.value(this.blackNames, 'assert', []);
                //   let matchList: string[] = utils.value(this.blackNames, 'match', []);
                //   if (assertList && assertList.length && assertList.indexOf(userInfo.nickName!) != -1) {
                //     resolve(true);
                //     return;
                //   }
                //   //模糊匹配
                //   else if (matchList && matchList.length) {
                //     for (let keyWord of matchList) {
                //       if (userInfo.nickName!.indexOf(keyWord) != -1) {
                //         resolve(true);
                //         return;
                //       }
                //     }
                //   }
                //   //没匹配上则不是黑名单用户
                //   resolve(false);
                //   return;
                // });
            });
        };
        /**
         * 设置当前账号属性
         * @deprecated 请改用saveData保存用户数据
         * @param key 键名（目前只支持4个固定键：paramInt1 / paramInt2 / paramStr1 / paramStr2）
         * @param val 键值（key = paramInt1 || paramInt2 时键值只能是数字；key = paramStr1 || paramStr2 时支持字符串）
         */
        Account.setAccountProperty = function (key, val) {
            this.getAccountSafe().then(function (account) {
                mpsdk.Platform.instance.httpRequest(mpsdk.Env.reportServer1 + '/MiniGameLog/log/updateAccount.action', {
                    gameid: mpsdk.Env.gameId,
                    userid: account.openid,
                    column: key,
                    value: val,
                }).then(function (res) {
                    mpsdk.log('更新账号属性成功', 'key=', key, 'val=', val);
                });
            }).catch(function () {
                mpsdk.log('openid超时未就绪，更新账号属性失败');
            });
        };
        /**
         * 账号激活
         *
         * 激活是指用户达到某种条件后对用户做一个特定标记，
         * 如标识用户是否授权用户信息、是否进入游戏、是否通过新手教程、是否通过第10关、是否提升到10级等等，
         * 主要用于统计买量用户有效性，核算市场推广成本。
         *
         * @param activeType 激活属性类型
         * @param activeValue 激活属性值
         */
        Account.setAccountActive = function (activeType, activeValue) {
            //防止重复上报
            var storageKey = 'activeType_' + activeType;
            if (mpsdk.Platform.instance.getStorage(storageKey) == activeValue) {
                mpsdk.log('重复激活，不再上报数据');
                return;
            }
            this.getAccountSafe().then(function (account) {
                var data = {
                    gameId: mpsdk.Env.gameId,
                    openId: account.openid,
                };
                if (activeType === mpsdk.constant.ActiveType.GET_USER_INFO) {
                    data.acceptStatus = activeValue;
                }
                if (activeType === mpsdk.constant.ActiveType.START_GAME) {
                    data.startGame = activeValue;
                }
                mpsdk.Platform.instance.httpRequest(mpsdk.Env.friendServer + '/MiniFriend/data/setAccountStatus.action', data).then(function (res) {
                    //记录上报历史
                    mpsdk.Platform.instance.setStorage(storageKey, activeValue);
                    mpsdk.log('账号激活成功', JSON.stringify(data));
                });
            }).catch(function () {
                mpsdk.log('openid超时未就绪，账号激活失败');
            });
        };
        /**
         * 更新当前账号数据（数据保存到服务器）
         * @param key 键名
         * @param val 键值
         */
        Account.saveData = function (key, val) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this.getAccountSafe().then(function (account) {
                    var data = {
                        gameId: mpsdk.Env.gameId,
                        openId: account.openid,
                        dataKey: key,
                        dataValue: val,
                    };
                    mpsdk.Platform.instance.httpRequest(mpsdk.Env.loginServer + '/MiniGame/data/saveData.action', data).then(function (res) {
                        if (res && res.error == 0) {
                            resolve();
                            mpsdk.log('更新账号数据成功', 'key=', key, 'val=', val);
                        }
                        else {
                            reject(res);
                            mpsdk.log('更新账号数据失败', JSON.stringify(res));
                        }
                    }).catch(function () {
                        reject('网络错误');
                    });
                }).catch(function () {
                    reject('openid超时未就绪，更新账号数据失败');
                    mpsdk.log('openid超时未就绪，更新账号数据失败');
                });
            });
        };
        /**
         * 从服务器获取当前账号数据
         */
        Account.getData = function (key, openId) {
            return new Promise(function (resolve, reject) {
                Account.getAccountSafe().then(function (account) {
                    var tempOpenId = openId ? openId : account.openid;
                    var data = {
                        gameId: mpsdk.Env.gameId,
                        openId: tempOpenId,
                        dataKey: key
                    };
                    mpsdk.Platform.instance.httpRequest(mpsdk.Env.loginServer + '/MiniGame/data/getData.action', data).then(function (res) {
                        if (res && res.error == 0) {
                            resolve(res.value);
                            mpsdk.log('获取账号数据成功', JSON.stringify(res));
                        }
                        else {
                            reject(res);
                            mpsdk.log('获取账号数据失败', JSON.stringify(res));
                        }
                    }).catch(function () {
                        reject('网络错误');
                    });
                }).catch(function () {
                    reject('openid超时未就绪，更新账号数据失败');
                    mpsdk.log('openid超时未就绪，获取账号数据失败');
                });
            });
        };
        /**
         * 判断Openid是否存在
         */
        Account.isOpenIdExist = function () {
            return Account.getAccount().openid ? true : false;
        };
        /**
         * 判断unionid是否存在
         */
        Account.isUnionIdExist = function () {
            return Account.getAccount().unionid ? true : false;
        };
        Account.getClientUUID = function () {
            var clientUUID = mpsdk.Platform.instance.getStorage("sdk-clent-uuid");
            if (clientUUID) {
                return clientUUID;
            }
            return "";
        };
        Account.clearClientUUID = function () {
            mpsdk.Platform.instance.setStorage("sdk-clent-uuid", "");
        };
        /**
         * 获取客户端用户ID
         */
        Account.getClientUserId = function (stepId) {
            if (stepId === void 0) { stepId = mpsdk.constant.NewUserLogEnum.ACTION_PT_LOGIN_END; }
            if (mpsdk.constant.NewUserLogEnum.ACTION_PT_LOGIN_END < stepId && Account.isOpenIdExist()) {
                return Account.getOpenId();
            }
            var clientUUID = Account.getClientUUID();
            if (clientUUID) {
                return clientUUID;
            }
            var newClientUUID = mpsdk.utils.createClientUUID();
            mpsdk.Platform.instance.setStorage("sdk-clent-uuid", newClientUUID);
            return newClientUUID;
        };
        Account.getOpenId = function () {
            return Account.getAccount().openid;
        };
        return Account;
    }());
    mpsdk.Account = Account;
})(mpsdk || (mpsdk = {}));
/// <reference path="Env.ts" />
/// <reference path="Platform.ts" />
/// <reference path="Account.ts" />
/// <reference path="utils.ts" />
var mpsdk;
(function (mpsdk) {
    /**
     * 广告模块
     */
    var Ad = /** @class */ (function () {
        function Ad() {
        }
        /**
         * 设置或更新用户价值（请在获取广告数据之前设置用户价值，有助于精准投放）
         * @param userValue 用户在当前应用中累计充值金额（可根据用户价值匹配广告）
         */
        Ad.updateUserValue = function (userValue) {
            userValue > this.userValue && (this.userValue = userValue);
        };
        /**
         * 预加载广告配置
         */
        Ad.loadAdData = function () {
            this.loadRecommendData();
            this.loadSuggestData();
        };
        /**
         * 加载其他过滤条件数据
     * gender: -1不限制性别/1男/2女/0未知
         */
        Ad.loadFilterData = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                mpsdk.Platform.instance.getUserInfo().then(function (userInfo) {
                    resolve({
                        os: mpsdk.Platform.instance.getSystem().platform,
                        gender: Number(userInfo.gender),
                        userValue: _this.userValue
                    });
                }).catch(function () {
                    resolve({
                        os: mpsdk.Platform.instance.getSystem().platform,
                        gender: -1,
                        userValue: _this.userValue
                    });
                });
            });
        };
        /**
         * 加载浮标广告
         */
        Ad.loadRecommendData = function () {
            if (!this.recommendPromise) {
                this.recommendPromise = new Promise(function (resolve, reject) {
                    var recommendList = mpsdk.Platform.instance.getStorage('recommendList') || [];
                    mpsdk.Platform.instance.httpRequest(mpsdk.Env.cdnServer + '/ad/' + mpsdk.Env.gamePath + '/advlist.json').then(function (res) {
                        //拉取线上内容失败，自动使用本地缓存
                        if (typeof res != 'object') {
                            mpsdk.log('加载线上浮标广告失败，服务器返回错误', res);
                            resolve(recommendList);
                            return;
                        }
                        //拉取线上内容成功
                        resolve(res);
                        mpsdk.Platform.instance.setStorage('recommendList', res);
                        mpsdk.log('加载线上浮标广告成功', '共' + res.length + '条');
                    }).catch(function (res) {
                        mpsdk.log('加载线上浮标广告失败，HTTP错误', res);
                        resolve(recommendList);
                    });
                });
            }
            return this.recommendPromise;
        };
        /**
         * 加载推荐列表
         */
        Ad.loadSuggestData = function () {
            if (!this.suggestPromise) {
                this.suggestPromise = new Promise(function (resolve, reject) {
                    var suggestList = mpsdk.Platform.instance.getStorage('suggestList') || [];
                    //版本比较
                    mpsdk.Platform.instance.httpRequest(mpsdk.Env.cdnServer + '/ad/' + mpsdk.Env.gamePath + '/version.json').then(function (verData) {
                        if (typeof verData != 'object') {
                            mpsdk.log('检查推荐列表版本失败，服务器返回错误', verData);
                            resolve(suggestList);
                            return;
                        }
                        if (mpsdk.Platform.instance.getStorage('suggestVer') == verData.ver) {
                            mpsdk.log('线上推荐列表版本和本地一致，无需更新');
                            resolve(suggestList);
                            return;
                        }
                        //更新数据
                        mpsdk.Platform.instance.httpRequest(mpsdk.Env.cdnServer + '/ad/' + mpsdk.Env.gamePath + '/' + verData.ver).then(function (sugData) {
                            //拉取线上内容失败，自动使用本地缓存
                            if (typeof sugData != 'object') {
                                mpsdk.log('加载线上推荐列表失败，服务器返回错误', sugData);
                                resolve(suggestList);
                                return;
                            }
                            //拉取线上内容成功
                            resolve(sugData);
                            mpsdk.Platform.instance.setStorage('suggestVer', verData.ver);
                            mpsdk.Platform.instance.setStorage('suggestList', sugData);
                            mpsdk.log('加载线上推荐列表成功', '共' + sugData.length + '条');
                        }).catch(function () {
                            mpsdk.log('加载线上推荐列表失败，HTTP错误');
                            resolve(suggestList);
                        });
                    }).catch(function (res) {
                        mpsdk.log('检查推荐列表版本失败，HTTP错误', res);
                        resolve(suggestList);
                    });
                });
            }
            return this.suggestPromise;
        };
        /**
         * 获取盒子列表数据
         * @param codeVer 当前程序版本
         * @param gender 当前用户性别，-1不限制性别/1男/2女/0未知
         * @param userValue 当前用户价值
         * @param navigateToMiniProgramAppIdList
         */
        Ad.getBoxDataList = function (codeVer, gender, userValue, navigateToMiniProgramAppIdList) {
            if (codeVer === void 0) { codeVer = ''; }
            if (gender === void 0) { gender = -1; }
            if (userValue === void 0) { userValue = 0; }
            if (navigateToMiniProgramAppIdList === void 0) { navigateToMiniProgramAppIdList = []; }
            return __awaiter(this, void 0, void 0, function () {
                var cacheKey, rawData, _i, _a, item, bridge_appid, bridge_path, filterData, hackData, appIdList_1, importantCategory, j, i;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            // 已经有数据则直接返回
                            if (this.boxData) {
                                return [2 /*return*/, this.boxData];
                            }
                            cacheKey = 'cache_data_list';
                            return [4 /*yield*/, mpsdk.Platform.instance.httpRequest(mpsdk.Env.boxServer + '/v1/index/list?box_id=' + mpsdk.Env.gameId)
                                    .then(function (serverData) { serverData && mpsdk.Platform.instance.setStorage(cacheKey, serverData); return serverData; })
                                    .catch(function () { return (mpsdk.Platform.instance.getStorage(cacheKey)); })];
                        case 1:
                            rawData = _b.sent();
                            if (!rawData.category || !rawData.data) {
                                throw '获取数据失败';
                            }
                            //桥接
                            for (_i = 0, _a = rawData.data; _i < _a.length; _i++) {
                                item = _a[_i];
                                bridge_appid = mpsdk.utils.getQueryString(item.page, 'bridge_appid');
                                bridge_path = mpsdk.utils.getQueryString(item.page, 'bridge_path');
                                if (bridge_appid) {
                                    item.page = bridge_path + '?' + item.page
                                        .replace('bridge_appid=' + bridge_appid, 'bridge2appid=' + item.appid)
                                        .replace('bridge_path=' + bridge_path, 'bridge2path=' + item.page.split('?')[0])
                                        .split('?')[1];
                                    item.appid = bridge_appid;
                                }
                            }
                            filterData = { os: mpsdk.Platform.instance.getSystem().platform, gender: gender, userValue: userValue };
                            rawData.data = rawData.data.filter(function (item) {
                                if (item.platform && item.platform != filterData.os && filterData.os != 'devtools') {
                                    //不符合操作系统要求
                                    return false;
                                }
                                else if (item.sex && parseInt(item.sex) != 3 && parseInt(item.sex) != filterData.gender) {
                                    //不符合性别要求
                                    return false;
                                }
                                else if (item.uservalue && parseInt(item.uservalue) < filterData.userValue) {
                                    //不符合用户价值要求
                                    return false;
                                }
                                else if (parseInt(item.table)) {
                                    //曝光概率
                                    var p = parseInt(item.table);
                                    var r = Math.random() * 100; //产生0-100(不包含100)之间的随机数
                                    return r < p;
                                }
                                else {
                                    return true;
                                }
                            });
                            return [4 /*yield*/, mpsdk.Hack.getOpenLevel(codeVer)];
                        case 2:
                            hackData = _b.sent();
                            if (mpsdk.utils.value(hackData, 'serverConfig.ipAddr', '') != '221.237.157.133') {
                                rawData.data = rawData.data.filter(function (item) { return mpsdk.utils.value(item, 'audi', '1') != '2'; });
                            }
                            //审核中仅列出10个固定声明的游戏
                            if (hackData.codeVer == codeVer && hackData.status == '0') {
                                appIdList_1 = [];
                                rawData.data = rawData.data.filter(function (item) {
                                    //不在申明列表中的不要
                                    if (navigateToMiniProgramAppIdList.indexOf(item.appid) == -1) {
                                        return false;
                                    }
                                    //去重处理
                                    if (appIdList_1.indexOf(item.appid) == -1) {
                                        appIdList_1.push(item.appid);
                                        return true;
                                    }
                                    return false;
                                });
                                importantCategory = ['4', '5', '7'];
                                for (j = 0; j < importantCategory.length; j++) {
                                    for (i = j * 4; i < (j + 1) * 4 && i < rawData.data.length; i++) {
                                        rawData.data[i].category = importantCategory[j];
                                    }
                                }
                            }
                            //分解各栏目列表数据
                            rawData.category.forEach(function (category) {
                                category.children = rawData.data.filter(function (item) { return item.category == category.category; });
                            });
                            this.boxData = rawData;
                            this.reportShowBat(rawData.data);
                            return [2 /*return*/, rawData];
                    }
                });
            });
        };
        /**
         * 随机获取一个浮标广告（并自动上报该广告展示数据）
         * @param score 请传入当前玩家的【等级或分数或游戏时长】等可以直观判断玩家级别的数值，用以处理审核期间返回的广告数量
         */
        Ad.getRecommendInfo = function (score) {
            var _this = this;
            if (score === void 0) { score = 0; }
            return new Promise(function (resolve, reject) {
                Promise.all([_this.loadRecommendData(), mpsdk.Hack.getOpenLevel(''), _this.loadFilterData()])
                    .then(function (_a) {
                    var dataList = _a[0], hackData = _a[1], filterData = _a[2];
                    //条件过滤
                    dataList = _this.dataFilter(dataList, filterData, hackData, 'icon');
                    if (!dataList.length) {
                        reject('没有符合条件的项目');
                        return;
                    }
                    //数据矫正
                    dataList = _this.dataFixPip(dataList, filterData.gender, filterData.userValue);
                    var dataListPromise;
                    //检查是否处于广告审查状态中
                    if (_this.checkLimit(hackData, score)) {
                        dataListPromise = new Promise(function (resolve2, reject2) {
                            _this.loadSuggestData().then(function (suggestList) {
                                var aidList = suggestList.map(function (item) { return item.aid; });
                                dataList = dataList.filter(function (item) { return aidList.indexOf(item.aid) != -1; }); //只保留同时出现在推荐列表中的项目
                                dataList.sort(function (a, b) { return parseInt(a.aid) - parseInt(b.aid); }); //按AID升序排列
                                resolve2(dataList.slice(0, 3)); //只保留前3项
                            }).catch(function () {
                                resolve2(dataList);
                            });
                        });
                    }
                    else {
                        dataListPromise = Promise.resolve(dataList);
                    }
                    dataListPromise.then(_this.dataFixCacheRes).then(function (dataList) {
                        var result = mpsdk.utils.tableAlgorithm(dataList, 'table');
                        _this.reportShowBat([result]);
                        resolve(result);
                    });
                }).catch(function (res) {
                    reject('获取浮标广告出错');
                    mpsdk.log('获取浮标广告出错', res);
                });
            });
        };
        /**
         * 获取推荐列表
         * @param original 是否按线上原样返回，如果为false则会使用权重算法排序后返回
         * @param count 截取数量，0为返回全部
         * @param score 请传入当前玩家的【等级或分数或游戏时长】等可以直观判断玩家级别的数值，用以处理审核期间返回的广告数量
         */
        Ad.getSuggestList = function (original, count, score, advType) {
            var _this = this;
            if (original === void 0) { original = true; }
            if (count === void 0) { count = 0; }
            if (score === void 0) { score = 0; }
            if (advType === void 0) { advType = ''; }
            return new Promise(function (resolve, reject) {
                Promise.all([_this.loadSuggestData(), mpsdk.Hack.getOpenLevel(''), _this.loadFilterData()])
                    .then(function (_a) {
                    var dataList = _a[0], hackData = _a[1], filterData = _a[2];
                    // log('SuggestList==',dataList);
                    //条件过滤
                    dataList = _this.dataFilter(dataList, filterData, hackData, advType);
                    if (!dataList.length) {
                        reject('没有符合条件的项目');
                        return;
                    }
                    //数据矫正
                    dataList = _this.dataFixPip(dataList, filterData.gender, filterData.userValue);
                    var dataListPromise;
                    //检查是否处于广告审查状态中
                    if (_this.checkLimit(hackData, score)) {
                        dataListPromise = new Promise(function (resolve2, reject2) {
                            _this.loadRecommendData().then(function (recommendList) {
                                var aidList = recommendList.map(function (item) { return item.aid; });
                                dataList = dataList.filter(function (item) { return aidList.indexOf(item.aid) != -1; }); //只保留同时出现在ICON广告列表中的项目
                                dataList.sort(function (a, b) { return parseInt(a.aid) - parseInt(b.aid); }); //按AID升序排列
                                resolve2(dataList.slice(0, 3)); //只保留前3项
                            }).catch(function () {
                                resolve2(dataList);
                            });
                        });
                    }
                    else {
                        dataListPromise = Promise.resolve(dataList);
                    }
                    dataListPromise.then(_this.dataFixCacheRes).then(function (dataList) {
                        var resultList = original ? dataList : mpsdk.utils.tableAlgorithm(dataList, 'table', false);
                        if (count) {
                            resultList = resultList.slice(0, count);
                        }
                        _this.reportShowBat(resultList);
                        resolve(resultList);
                    });
                }).catch(function (res) {
                    reject('获取推荐列表出错');
                    mpsdk.log('获取推荐列表出错', res);
                });
            });
        };
        /**
             * 随机获取一个banner广告（并自动上报该广告展示数据）
             * @param score 请传入当前玩家的【等级或分数或游戏时长】等可以直观判断玩家级别的数值，用以处理审核期间返回的广告数量
             */
        Ad.getBannerInfo = function (score) {
            var _this = this;
            if (score === void 0) { score = 0; }
            return new Promise(function (resolve, reject) {
                Promise.all([_this.loadSuggestData(), mpsdk.Hack.getOpenLevel(''), _this.loadFilterData()])
                    .then(function (_a) {
                    var dataList = _a[0], hackData = _a[1], filterData = _a[2];
                    // log('bannerList==',dataList);
                    //条件过滤
                    dataList = _this.dataFilter(dataList, filterData, hackData, 'mp_banner');
                    if (!dataList.length) {
                        reject('没有符合条件的项目');
                        mpsdk.log('没有符合条件的banner广告.');
                        return;
                    }
                    //数据矫正
                    dataList = _this.dataFixPip(dataList, filterData.gender, filterData.userValue);
                    var dataListPromise;
                    //检查是否处于广告审查状态中
                    if (_this.checkLimit(hackData, score)) {
                        dataListPromise = new Promise(function (resolve2, reject2) {
                            reject2();
                        });
                    }
                    else {
                        dataListPromise = Promise.resolve(dataList);
                    }
                    dataListPromise.then(_this.dataFixCacheRes).then(function (dataList) {
                        var result = mpsdk.utils.tableAlgorithm(dataList, 'table');
                        _this.reportShowBat([result]);
                        resolve(result);
                    }).catch(function (e) {
                        reject('审核状态下,屏蔽banner广告.');
                        mpsdk.log('审核状态下,屏蔽banner广告.');
                    });
                }).catch(function (res) {
                    reject('获取banner广告出错');
                    mpsdk.log('获取banner广告出错', res);
                });
            });
        };
        /**
             * 获取激励广告列表
             * @param original 是否按线上原样返回，如果为false则会使用权重算法排序后返回
             * @param count 截取数量，0为返回全部
             * @param score 请传入当前玩家的【等级或分数或游戏时长】等可以直观判断玩家级别的数值，用以处理审核期间返回的广告数量
             */
        Ad.getExcitationList = function (original, count, score) {
            if (original === void 0) { original = true; }
            if (count === void 0) { count = 0; }
            if (score === void 0) { score = 0; }
            return this.getSuggestList(original, count, score, 'excitation');
        };
        /**
         * 判断当前是否处于广告素材审查中
         */
        Ad.checkLimit = function (hackData, score) {
            var result = mpsdk.Hack.checkAdTimeLimit(hackData) && mpsdk.Hack.checkAdCityLimit(hackData) && mpsdk.Hack.checkAdScoreLimit(hackData, score);
            mpsdk.log('审查时段', hackData.link_time, '审查城市', hackData.link_city, '审查分值', hackData.link_enable_level || '1');
            mpsdk.log('当前时段', new Date().getHours(), '当前城市', mpsdk.utils.value(hackData, 'ipArea.city'), '当前分值', score);
            mpsdk.log('审查结果', result);
            return result;
        };
        /**
         * 过滤器
         */
        Ad.dataFilter = function (dataList, filterData, hackData, advType) {
            var _this = this;
            if (advType === void 0) { advType = ''; }
            return dataList.filter(function (item) {
                if (item.platform && filterData.os && item.platform != filterData.os && filterData.os != 'devtools') {
                    //不符合系统要求
                    return false;
                }
                else if (item.sex && item.sex != 3 && item.sex != filterData.gender) { // && filterData.gender != -1
                    //不符合性别要求
                    return false;
                }
                else if (item.audi && item.audi == '2' && (!hackData.ipAddr || hackData.ipAddr != '221.237.157.133')) {
                    //规定QA可见，那么对普通用户隐藏
                    return false;
                }
                //不可见城市筛选
                if (_this.checkCityInvisible(hackData, item.city_hide)) {
                    mpsdk.log('广告屏蔽城市过滤：', item.city_hide, ' ; 被过滤广告id:', item.adid);
                    return false;
                }
                //可见城市筛选
                if (!_this.checkCityVisible(hackData, item.city_show)) {
                    mpsdk.log('广告可见城市过滤：', item.city_show, ' ; 被过滤广告id:', item.adid);
                    return false;
                }
                if (advType == 'banner' && item.category !== 2) {
                    //只提取横幅广告
                    return false;
                }
                else if (advType == 'icon' && item.category !== 2) {
                    //只提取浮标广告
                    return false;
                }
                else if (advType == 'video' && item.category !== 3) {
                    //只提取视频广告
                    return false;
                }
                else if (advType == 'excitation' && item.category !== 12) {
                    //只提取激励广告
                    return false;
                }
                else if (advType == 'mp_banner' && item.category !== 13) {
                    //只提取底部banner广告
                    return false;
                }
                if (!advType && item.category == 12) {
                    //猜你喜欢需要排除激励广告
                    return false;
                }
                if (!advType && item.category == 13) {
                    //猜你喜欢需要排除底部banner广告
                    return false;
                }
                return true;
            });
        };
        /**
         * 判断当前城市广告是否可见
         * @param hackData 通过mpsdk.Hack.getOpenLevel()取得
         * @param city ums后台广告配置可见城市（city_show）;如 四川,广州
         * @returns boolean
         */
        Ad.checkCityVisible = function (hackData, city) {
            var currentProvince = mpsdk.utils.value(hackData, 'ipArea.province'); //当前省份
            var currentCity = mpsdk.utils.value(hackData, 'ipArea.city'); //当前城市
            // const currentCountry = utils.value(hackData, 'ipArea.country');//当前城市
            //city_show为空或all表示所有城市可见
            // log('广告可见城市：', city, ' ; 当前城市：', currentCity);
            return (!city || city == 'all') && !mpsdk.utils.checkAbroadCity(hackData)
                || city && currentCity && city.indexOf(currentCity) != -1
                || city && currentProvince && city.indexOf(currentProvince) != -1;
        };
        Ad.checkCityInvisible = function (hackData, city) {
            var currentProvince = mpsdk.utils.value(hackData, 'ipArea.province'); //当前省份
            var currentCity = mpsdk.utils.value(hackData, 'ipArea.city'); //当前城市
            //city_hide为空表示不限制城市，all表示限制所有城市
            // log('广告不可见城市：', city,' ; 当前城市：',currentCity);
            return city == 'all'
                || mpsdk.utils.checkAbroadCity(hackData)
                || city && currentCity && city.indexOf(currentCity) != -1
                || city && currentProvince && city.indexOf(currentProvince) != -1;
        };
        /**
         * 数据修正管道
         * @param dataList 原始数据列表
         * @param gender 性别，用于附加外链参数
         * @param userValue 用户价值，用于附加外链参数
         */
        Ad.dataFixPip = function (dataList, gender, userValue) {
            //由于每次都要修正点击权重，这里必须深拷贝
            var iterationList = JSON.parse(JSON.stringify(dataList));
            for (var _i = 0, iterationList_1 = iterationList; _i < iterationList_1.length; _i++) {
                var item = iterationList_1[_i];
                //当起止时间和计划导量都有值则表示是外部广告，不用添加外链参数，反之则要添加
                if (!item.start_time || !item.end_time || !item.plan_number) {
                    item.page += item.page.indexOf('?') == -1 ? '?' : '&';
                    item.page += 'type=link&adid=' + item.adid + '&gender=' + gender + '&uservalue=' + userValue;
                }
                //桥接
                var bridge_appid = mpsdk.utils.getQueryString(item.page, 'bridge_appid');
                var bridge_path = mpsdk.utils.getQueryString(item.page, 'bridge_path');
                if (bridge_appid) {
                    item.page = bridge_path + '?' + item.page
                        .replace('bridge_appid=' + bridge_appid, 'bridge2appid=' + item.appid)
                        .replace('bridge_path=' + bridge_path, 'bridge2path=' + item.page.split('?')[0])
                        .split('?')[1];
                    item.appid = bridge_appid;
                }
                //资源路径兼容
                if (item.ad_image && item.ad_image.indexOf('http') != 0) { //[二维码/横幅图片/视频]等广告主体
                    item.ad_image = mpsdk.Env.cdnServer + '/ad/images/' + item.ad_image;
                }
                if (item.icon && item.icon.indexOf('http') != 0) { //APP图标
                    item.icon = mpsdk.Env.cdnServer + '/ad/images/' + item.icon;
                }
                if (item.image && item.image.indexOf('http') != 0) {
                    item.image = mpsdk.Env.cdnServer + '/ad/images/' + item.image;
                }
                if (item.banner && item.banner.indexOf('http') != 0) {
                    item.banner = mpsdk.Env.cdnServer + '/ad/images/' + item.banner;
                }
                if (item.atlas_photo && item.atlas_photo.indexOf('http') != 0) {
                    item.atlas_photo = mpsdk.Env.cdnServer + '/atlas/' + item.atlas_photo;
                }
                if (item.atlas_config && item.atlas_config.indexOf('http') != 0) {
                    item.atlas_config = mpsdk.Env.cdnServer + '/atlas/' + item.atlas_config;
                }
                if (item.title_bg && item.title_bg.indexOf('http') != 0) {
                    item.title_bg = mpsdk.Env.cdnServer + '/bgtext/' + item.title_bg;
                }
                //已经点击过的项目权重减半
                item.clicked = !this.checkClickRecord(Number(item.adid));
                if (item.clicked) {
                    item.table = Number(item.table) / 2;
                }
            }
            return iterationList;
        };
        /**
         * 将网络路径转换为本地资源缓存路径
         * @param dataList 数据列表
         */
        Ad.dataFixCacheRes = function (dataList) {
            return __awaiter(this, void 0, void 0, function () {
                var i, _a, _b, _c, _d, atlas_photo, _e, title_bg, _f;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            i = 0;
                            _g.label = 1;
                        case 1:
                            if (!(i < dataList.length)) return [3 /*break*/, 14];
                            if (!dataList[i].ad_image) return [3 /*break*/, 3];
                            _a = dataList[i];
                            return [4 /*yield*/, mpsdk.Platform.instance.getCacheRes(dataList[i].ad_image, false)];
                        case 2:
                            _a.ad_image = _g.sent();
                            _g.label = 3;
                        case 3:
                            if (!dataList[i].icon) return [3 /*break*/, 5];
                            _b = dataList[i];
                            return [4 /*yield*/, mpsdk.Platform.instance.getCacheRes(dataList[i].icon, false)];
                        case 4:
                            _b.icon = _g.sent();
                            _g.label = 5;
                        case 5:
                            if (!dataList[i].image) return [3 /*break*/, 7];
                            _c = dataList[i];
                            return [4 /*yield*/, mpsdk.Platform.instance.getCacheRes(dataList[i].image, false)];
                        case 6:
                            _c.image = _g.sent();
                            _g.label = 7;
                        case 7:
                            if (!dataList[i].banner) return [3 /*break*/, 9];
                            _d = dataList[i];
                            return [4 /*yield*/, mpsdk.Platform.instance.getCacheRes(dataList[i].banner, false)];
                        case 8:
                            _d.banner = _g.sent();
                            _g.label = 9;
                        case 9:
                            atlas_photo = dataList[i].atlas_photo;
                            if (!atlas_photo) return [3 /*break*/, 11];
                            _e = dataList[i];
                            return [4 /*yield*/, mpsdk.Platform.instance.getCacheRes(atlas_photo, false)];
                        case 10:
                            _e.atlas_photo = _g.sent();
                            _g.label = 11;
                        case 11:
                            title_bg = dataList[i].title_bg;
                            if (!title_bg) return [3 /*break*/, 13];
                            _f = dataList[i];
                            return [4 /*yield*/, mpsdk.Platform.instance.getCacheRes(title_bg, false)];
                        case 12:
                            _f.title_bg = _g.sent();
                            _g.label = 13;
                        case 13:
                            i++;
                            return [3 /*break*/, 1];
                        case 14: return [2 /*return*/, dataList];
                    }
                });
            });
        };
        /**
         * 批量上报展示数据
         */
        Ad.reportShowBat = function (appList) {
            mpsdk.Env.init && mpsdk.Account.getAccountSafe().then(function (account) {
                //构造批量数据
                var gameId = [], adId = [], params = [];
                for (var _i = 0, appList_1 = appList; _i < appList_1.length; _i++) {
                    var appItem = appList_1[_i];
                    gameId[gameId.length] = appItem.aid;
                    adId[adId.length] = appItem.adid || appItem.id;
                    params[params.length] = appItem.category.toString();
                }
                var data = {
                    gameid: mpsdk.Env.gameId,
                    userid: account.openid,
                    show_game_id: gameId.join(','),
                    show_ad_id: adId.join(','),
                    param1: params.join(','),
                };
                mpsdk.Platform.instance.httpRequest(mpsdk.Env.reportServer2 + '/MiniGameLog/log/showEvent2.action', data).then(function (res) {
                    mpsdk.log('批量上报展示事件成功', '共' + gameId.length + '条数据', JSON.stringify(data));
                });
            }).catch(function () {
                mpsdk.log('openid超时未就绪，上报展示日志失败');
            });
        };
        /**
         * 单个上报展示数据
         */
        Ad.reportShow = function (appItem) {
            this.reportShowBat([appItem]);
            // Env.init && Account.getAccountSafe().then(account => {
            //   let data = {
            //     gameid: Env.gameId,
            //     userid: account.openid,
            //     show_game_id: appItem.aid,
            //     show_ad_id: appItem.adid || appItem.id,
            //     param1: appItem.category
            //   };
            //   Platform.instance.httpRequest(Env.reportServer2 + '/MiniGameLog/log/showEvent.action', data).then(res => {
            //     log('上报展示事件成功', appItem.title, JSON.stringify(data));
            //   });
            // }).catch(() => {
            //   log('openid超时未就绪，上报展示日志失败');
            // });
        };
        /**
         * 上报点击数据
         * @param appItem 广告数据
         * @param serial 点击广告的位置（请游戏自行设定位置序号，如：1=首页 / 2=过关界面 / 3=失败界面 ...）
         */
        Ad.reportClick = function (appItem, serial) {
            if (serial === void 0) { serial = 0; }
            mpsdk.Env.init && mpsdk.Account.getAccountSafe().then(function (account) {
                var data = {
                    gameid: mpsdk.Env.gameId,
                    userid: account.openid,
                    link_to_game_id: appItem.aid,
                    link_ad_id: appItem.adid || appItem.id,
                    param1: serial
                };
                mpsdk.Platform.instance.httpRequest(mpsdk.Env.reportServer2 + '/MiniGameLog/log/linkEvent.action', data).then(function (res) {
                    mpsdk.log('上报点击事件成功', appItem.title, JSON.stringify(data));
                });
            }).catch(function () {
                mpsdk.log('openid超时未就绪，上报展示日志失败');
            });
        };
        /**
         * 点击广告（不论成败均统计点击次数）
         * @param appItem 广告数据
         * @param serial 点击广告的位置（请游戏自行设定位置序号，如：1=首页 / 2=过关界面 / 3=失败界面 ...）
         * @param returnPromise 设为true可使得返回一个Promise，能确定玩家是否跳转成功（false是不确定玩家是否跳转成功的）
         * @returns 是否是第一次点击该广告
         */
        Ad.click = function (appItem, serial, returnPromise) {
            var _this = this;
            if (serial === void 0) { serial = 0; }
            if (returnPromise === void 0) { returnPromise = false; }
            var clickPromise = new Promise(function (resolve, reject) {
                //判断网络
                wx.getNetworkType({
                    success: function (res) {
                        if (res.networkType == 'none') {
                            wx.showToast({ title: '网络已断开，无法跳转...', icon: 'none' });
                            reject();
                            return;
                        }
                        //上报点击日志
                        _this.reportClick(appItem, serial);
                        //跳转
                        mpsdk.Platform.instance.launchTo(appItem).then(function (res) {
                            resolve(_this.checkClickRecord(Number(appItem.adid), true));
                        }).catch(function (res) {
                            reject();
                        });
                    },
                    fail: function () {
                        reject();
                    }
                });
            });
            if (returnPromise) {
                return clickPromise;
            }
            //只要用户点了，不管跳转成功或失败都记录为已点击
            return this.checkClickRecord(Number(appItem.adid), true);
        };
        /**
         * 点击广告（不论成败均统计点击次数）
         * click的同步版本
         * @param appItem 广告数据
         * @param serial 点击广告的位置（请游戏自行设定位置序号，如：1=首页 / 2=过关界面 / 3=失败界面 ...）
         * @param clickCallback 能确定玩家是否跳转成功，需要设置该参数；否则不设置。 clickCallback(isLaunchToSuccess,isFirstClick)
         * @returns 是否是第一次点击该广告
         */
        Ad.clickSync = function (appItem, serial, clickCallback) {
            var _this = this;
            if (serial === void 0) { serial = 0; }
            var isFirstClick = this.checkClickRecord(Number(appItem.adid), true);
            var mIsLaunchToSuccess = false;
            wx.getNetworkType({
                success: function (res) {
                    if (res.networkType == 'none') {
                        wx.showToast({ title: '网络已断开，无法跳转...', icon: 'none' });
                        mIsLaunchToSuccess = false;
                        if (clickCallback) {
                            clickCallback(mIsLaunchToSuccess, isFirstClick);
                            return;
                        }
                    }
                    else {
                        //上报点击日志
                        _this.reportClick(appItem, serial);
                        //跳转
                        mpsdk.Platform.instance.launchToSync(appItem, function (isLaunchToSuccess) {
                            mIsLaunchToSuccess = isLaunchToSuccess;
                            if (clickCallback) {
                                clickCallback(mIsLaunchToSuccess, isFirstClick);
                                return;
                            }
                        });
                    }
                },
                fail: function () {
                    mIsLaunchToSuccess = false;
                    if (clickCallback) {
                        clickCallback(mIsLaunchToSuccess, isFirstClick);
                        return;
                    }
                }
            });
            //只要用户点了，不管跳转成功或失败都记录为已点击
            return isFirstClick;
        };
        /**
         * 检查是否是第一次点击广告
         * @param adid 广告ID
         * @param save 是否记录广告点击
         * @returns 如果是第一次点击返回true，否则返回false
         */
        Ad.checkClickRecord = function (adid, save) {
            if (save === void 0) { save = false; }
            var isFirstClick = false;
            var record = mpsdk.Platform.instance.getStorage('adClickRecord') || [];
            if (record.indexOf(adid) == -1) {
                isFirstClick = true;
                if (save) {
                    record.push(adid);
                    mpsdk.Platform.instance.setStorage('adClickRecord', record);
                }
            }
            return isFirstClick;
        };
        /**
         * 广告转化行为跟踪
         * @param options 微信小游戏从onShow()回调中获取；微信小程序从onLoad()回调中获取;
         * @param pagePath 创建广告填写的小程序路径
         */
        Ad.trackAdConversion = function (options, pagePath) {
            var _this = this;
            mpsdk.Env.init && mpsdk.Account.getAccountSafe().then(function (account) {
                // if(!account.openid||!Env.gameId||!options.gdt_vid||!options.weixinadinfo||!Env.launchOptions.query.adid){
                //   return;
                // }
                var actionType = '';
                if (account.lastLoginTime == 0) {
                    actionType = 'REGISTER';
                }
                else if (_this.checkSecondaryRetention(account.createTime)) {
                    actionType = 'START_APP';
                }
                if (!actionType) {
                    return;
                }
                var url = '';
                var tempUrl = 'gdt_vid=' + options.gdt_vid + '&weixinadinfo=' + options.weixinadinfo;
                // 获取广告id
                var aid = 0;
                if (options.weixinadinfo) {
                    var weixinadinfoArr = options.weixinadinfo.split('.');
                    aid = weixinadinfoArr[0];
                }
                console.log('来源广告的广告id是:' + aid);
                if (pagePath) {
                    url = pagePath + '&' + tempUrl;
                }
                else {
                    url = tempUrl;
                }
                // let pid=5230;
                // let openid='obvnx5MWJCZruYAKlkkwJ_Jq8s_Q';
                // let source='ad_1192';
                // actionType='START_APP';
                // url='page/item/detail/detail';
                var pid = mpsdk.Env.gameId;
                var openid = account.openid;
                var source = '';
                if (mpsdk.Env.launchOptions.query.adid) {
                    source = mpsdk.Env.launchOptions.query.adid;
                }
                var data = {
                    product_id: pid,
                    openid: openid,
                    action_type: actionType,
                    url: url,
                    source: source //转化数据发生的渠道1)Biz，代表公众号内各种服务或网页2)Web，代表非公众号的其他渠道
                };
                mpsdk.log('上报广告转化事件参数', data);
                mpsdk.Platform.instance.httpRequest(mpsdk.Env.trackAdServer + '/v1/adv/return', data, 'post').then(function (res) {
                    mpsdk.log('上报广告转化事件成功', res, JSON.stringify(data));
                });
            }).catch(function () {
                mpsdk.log('openid超时未就绪，上报广告转化事件失败');
            });
        };
        /**
         * 判断是否是次留
         * @param createTime 时间戳 单位：毫秒
         */
        Ad.checkSecondaryRetention = function (createTime) {
            var date = new Date();
            var year = date.getFullYear();
            var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
            var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            var todayBegin = year + '/' + month + '/' + day + ' 00:00:00';
            var todayEnd = year + '/' + month + '/' + day + ' 23:59:59';
            var yesterdayBeginTime = Date.parse(todayBegin) - (1000 * 3600 * 24);
            var yesterdayEndTime = Date.parse(todayEnd) - (1000 * 3600 * 24);
            return createTime >= yesterdayBeginTime && createTime <= yesterdayEndTime;
        };
        /**
         * 显示激励广告提示对话框
         * 建议在激励广告拉取成功时调用。
         * @param dialogMsg 提示内容
         * @param showDialogDelayTime 提示框显示延迟时间[单位:秒],默认为5s
         */
        Ad.showRewardedVideoAdDialog = function (dialogMsg, showDialogDelayTime) {
            if (dialogMsg === void 0) { dialogMsg = "️️️⬇⬇⬇点击下方绿色按钮获得3倍奖励"; }
            if (showDialogDelayTime === void 0) { showDialogDelayTime = 5; }
            mpsdk.Env.isClickRewardedVideoAdDialogOk = false;
            mpsdk.Env.isRewardedVideoAdDialogShow = false;
            mpsdk.Env.isRewardedVideoAd2Back = false;
            Promise.all([mpsdk.Hack.getOpenLevel('')]).then(function (_a) {
                var hackData = _a[0];
                if (hackData.level == '0') {
                    mpsdk.log('level=0；激励广告提示框不会弹出。');
                    return;
                }
                if (!mpsdk.Hack.isStrongFission()) {
                    return;
                }
                //屏蔽城市检查
                if (mpsdk.Hack.checkCityLimit(hackData, 'video_ad_city')) {
                    return;
                }
                // video_ad_show_prob 开启概率
                if (!Ad.checkVideoAdShowByHitProb(hackData)) {
                    return;
                }
                var showModalObject = {
                    content: dialogMsg,
                    success: function (res) {
                        mpsdk.Env.isClickRewardedVideoAdDialogOk = true;
                        if (res.confirm) {
                            mpsdk.Report.reportEvent(123463);
                            mpsdk.log('上报激励广告提示框点击确认事件,ID=123463');
                        }
                        else if (res.cancel) {
                            mpsdk.Report.reportEvent(123462);
                            mpsdk.log('上报激励广告提示框点击取消事件,ID=123462');
                        }
                    },
                    fail: function (res) {
                        mpsdk.log('激励广告确认框事件：fail:', res);
                    }
                };
                Ad.crrentTimeout = mpsdk.Platform.instance.setTimeout(function () {
                    mpsdk.Env.isRewardedVideoAdDialogShow = true;
                    mpsdk.Report.reportEvent(123461);
                    mpsdk.log('上报激励广告弹出提示框事件,ID=123461');
                    mpsdk.Platform.instance.showModal(showModalObject);
                }, showDialogDelayTime * 1000);
            });
        };
        /**
         * 获取激励广告点击的状态
         * 请在广告关闭的时候使用该方法
         * 并且需要在激励广告拉取成功后使用[mpsdk.Ad.showRewardedVideoAdDialog(dialogMsg="",showDialogDelayTime=5)](mpsdk.ad.html#showrewardedvideoaddialog)来显示提示框
         * @return boolean
         */
        Ad.getRewardedVideoAdClickStatus = function () {
            if (this.crrentTimeout) {
                mpsdk.Platform.instance.clearTimeout(this.crrentTimeout);
                this.crrentTimeout = null;
            }
            mpsdk.Env.isRewardedVideoAdDialogShow = false;
            if (!mpsdk.Env.isClickRewardedVideoAdDialogOk) {
                return false;
            }
            mpsdk.Env.isClickRewardedVideoAdDialogOk = false;
            return mpsdk.Env.isRewardedVideoAd2Back;
        };
        /**
         * 根据概率判断是否弹出激励广告提示框
         * 后台版本配置需要配置"video_ad_show_prob"项：值为[0--100]
         * 未配置或0表示不弹出；100表示弹出
         * @param hackData
         */
        Ad.checkVideoAdShowByHitProb = function (hackData) {
            if (!hackData['video_ad_show_prob']) {
                return false;
            }
            if (hackData['video_ad_show_prob'] == '0') {
                mpsdk.log('激励广告提示框弹出概率；概率:0');
                return false;
            }
            if (hackData['video_ad_show_prob'] == '100') {
                mpsdk.log('激励广告提示框弹出概率；概率:100');
                return true;
            }
            if (isNaN(hackData['video_ad_show_prob'])) {
                return false;
            }
            var myRandom = Math.random() * 100;
            var prob = Number(hackData['video_ad_show_prob']);
            mpsdk.log('激励广告提示框弹出概率；概率:', prob, ';目标值:', myRandom);
            if (myRandom <= prob) {
                return true;
            }
            return false;
        };
        /**
         * 用户在当前应用中累计充值金额（可根据用户价值匹配广告）
         */
        Ad.userValue = 0;
        return Ad;
    }());
    mpsdk.Ad = Ad;
})(mpsdk || (mpsdk = {}));
/// <reference path="Env.ts" />
var mpsdk;
(function (mpsdk) {
    var EngineUtility = /** @class */ (function () {
        function EngineUtility() {
        }
        EngineUtility.assert = function (value) {
            var message = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                message[_i - 1] = arguments[_i];
            }
            if (!value && this.bIsDebug) {
                var reason = "EngineAssert";
                if (message.length > 0) {
                    var key = message[0];
                    message.shift();
                    reason = EngineUtility.fmt(key, message);
                }
                console.error(reason);
                debugger;
                throw new Error(reason);
            }
        };
        EngineUtility.fmt = function (key) {
            var argv = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                argv[_i - 1] = arguments[_i];
            }
            if (argv.length > 0) {
                return vsprintf(key, argv);
            }
            else {
                return key;
            }
        };
        EngineUtility.EncodeNumberToUtf8Character = function (index) {
            var minUtf8Char = 0x4e00;
            var maxUtf8Char = 0x9fa5;
            var utf8Range = maxUtf8Char - minUtf8Char;
            var ret = "";
            if (index > utf8Range) { //Need two character
                var firstPart = String(Math.floor(index / utf8Range));
                var secondPart = String(index % utf8Range);
                var firstIndex = Number(firstPart);
                var secondIndex = Number(secondPart);
                EngineUtility.assert(firstIndex <= utf8Range);
                EngineUtility.assert(secondIndex <= utf8Range);
                ret = String.fromCharCode(minUtf8Char + firstIndex) + String.fromCharCode(minUtf8Char + secondIndex);
            }
            else {
                ret = String.fromCharCode(minUtf8Char + index);
            }
            return ret;
        };
        EngineUtility.DecodeUtf8CharacterToNumber = function (str) {
            var minUtf8Char = 0x4e00;
            var maxUtf8Char = 0x9fa5;
            var utf8Range = maxUtf8Char - minUtf8Char;
            var ret = -1;
            if (str.length == 1) {
                var index = str.charCodeAt(0);
                ret = index - minUtf8Char;
            }
            else if (str.length == 2) {
                var first = str.charCodeAt(0) - minUtf8Char;
                var second = str.charCodeAt(1) - minUtf8Char;
                ret = Number(String(first)) * utf8Range + Number(String(second));
            }
            return ret;
        };
        EngineUtility.bIsDebug = true;
        //Random
        EngineUtility.randomSeed = 0;
        //Perfromance
        EngineUtility.enablePerformDetect = false;
        EngineUtility.performData = [];
        EngineUtility.lastResetTime = 0;
        EngineUtility.silencePerformMode = true;
        //Log switcher
        EngineUtility.renderSubmitLog = false;
        EngineUtility.InitCallback = [];
        EngineUtility.enableMultiTextureSampler = true; //多纹理采样开关
        EngineUtility.enableSpriteOutline = true; //精灵边缘绘制开关
        EngineUtility.enableHitRectOutline = true; //碰撞区域绘制开关
        return EngineUtility;
    }());
    mpsdk.EngineUtility = EngineUtility;
})(mpsdk || (mpsdk = {}));
var mpsdk;
(function (mpsdk) {
    /**
     * 正所谓上有政策下有对策，你懂的。。
     */
    var Hack = /** @class */ (function () {
        function Hack() {
        }
        /**
         * 请求跳出程序
     *
     * 在任何允许wx.onHide的动作中都需要申请跳出
         */
        Hack.outRequest = function () {
            this.outPermission = true;
        };
        Object.defineProperty(Hack, "outCheckEnable", {
            /**
             * 全局开关：是否允许跳出onHide
             */
            set: function (value) {
                if (value) {
                    wx.offHide(this.outCheck.bind(this));
                    wx.onHide(this.outCheck.bind(this));
                }
                else {
                    wx.offHide(this.outCheck.bind(this));
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 检查是否允许跳出（目前只有微信小游戏支持此功能）
     *
     * 本函数用于监听小游戏隐藏到后台事件，可在程序启动时就调用
     *
     * wx.onHide(mpsdk.Ad.outCheck)
         */
        Hack.outCheck = function () {
            // 目前只有微信小游戏支持此功能
            if (mpsdk.Platform.platformType != 'wx' || wx.redirectTo) {
                return;
            }
            // 如果授权跳出则什么也不做
            if (this.outPermission) {
                this.outPermission = false;
                return;
            }
            //在onHide被触发时程序已经跳出，仅能执行主线程代码，像setTimeout/setInterval等子线程将被挂起
            //主线程for/while循环等待批准信号也不行的，因为主线程是单线程的
            while (!this.outPermission) {
                wx.exitMiniProgram({
                    success: function (res) { mpsdk.log(res); },
                    fail: function (res) { mpsdk.log(res); }
                });
            }
        };
        /**
         * 获取当前应用功能限制级别
         *
         * 根据各大平台审核要求，应用需要动态关闭或开放一些程序功能，SDK提供了一个较为通用的做法，以便达到审核标准。
         * @param codeVer 当前程序代码版本
         * @param gameId 平台分配的gameId参数（如果在调用此方法之前已经调用过SDK初始化方法，则可以不传，否则必传）
         * @returns 返回一个object:{ level: string }，程序只需判断level即可，其他字段请忽略。
         */
        Hack.getOpenLevel = function (codeVer, gameId) {
            var _this = this;
            mpsdk.Env.codeVer = codeVer ? codeVer : "";
            gameId = gameId || mpsdk.Env.gameId;
            var p = new Promise(function (resolve, reject) {
                if (!gameId) {
                    mpsdk.log('获取功能限制级别失败，默认启用高级限制保护（请先初始化SDK或传入gameId参数）');
                    resolve({ level: '0' });
                    mpsdk.Env.openLevelData = { level: '0' };
                    return;
                }
                //缓存服务端配置
                if (!_this.serverConfigPromise) {
                    _this.serverConfigPromise = mpsdk.Platform.instance.httpRequest(mpsdk.Env.loginServer + '/MiniGame/data/getIp.action?gameId=' + gameId);
                }
                _this.serverConfigPromise.then(function (res) {
                    if (!res.open) {
                        mpsdk.log('获取功能限制级别失败，默认启用高级限制保护（服务端参数未设置）');
                        resolve({ level: '0' });
                        mpsdk.Env.openLevelData = { level: '0' };
                        return;
                    }
                    var data;
                    //尝试解析json
                    try {
                        data = JSON.parse(res.open);
                        data.ipArea = {
                            "country": mpsdk.utils.value(res, 'country', ''),
                            "province": mpsdk.utils.value(res, 'province', ''),
                            "city": mpsdk.utils.value(res, 'city', ''),
                        };
                        data.ipAddr = mpsdk.utils.value(res, 'ip', '');
                    }
                    catch (e) {
                        mpsdk.log('获取功能限制级别失败，默认启用高级限制保护（解析服务端参数错误）');
                        resolve({ level: '0' });
                        mpsdk.Env.openLevelData = { level: '0' };
                        return;
                    }
                    //审核期间，代码版本相等表示开启限制
                    if (data.codeVer == codeVer && data.status == '0') {
                        mpsdk.log('当前应用版本受到高级限制保护');
                        data.level = '0';
                        resolve(data);
                        mpsdk.Env.openLevelData = data;
                        return;
                    }
                    //IP黑名单0表示开启限制
                    if (res.check === 0) {
                        mpsdk.log('当前地域受到高级限制保护');
                        data.level = '0';
                        resolve(data);
                        mpsdk.Env.openLevelData = data;
                        return;
                    }
                    //时段限制：time7-19=0表示每日[7:00:00 - 19:59:59]之间开启限制
                    var hour = new Date().getHours();
                    for (var key in data) {
                        var match = /^time(\d+)-(\d+)$/.exec(key);
                        if (match && data[key] == '0' && Number(match[1]) <= hour && hour <= Number(match[2])) {
                            mpsdk.log('当前时段受到中级限制保护');
                            data.level = '1';
                            resolve(data);
                            mpsdk.Env.openLevelData = data;
                            return;
                        }
                    }
                    //默认级别2
                    mpsdk.log('当前处于低级保护');
                    data.level = '2';
                    resolve(data);
                    mpsdk.Env.openLevelData = data;
                }).catch(function () {
                    mpsdk.log('获取功能限制级别失败，默认启用高级限制保护（拉取服务端配置失败）');
                    resolve({ level: '0' });
                    mpsdk.Env.openLevelData = { level: '0' };
                });
            });
            //只有传入了版本号才同步一下appStatus
            if (codeVer) {
                p.then(function (res) {
                    _this.appStatus = res;
                    return res;
                });
            }
            return p;
        };
        /**
         * 判断当前时间是否在广告素材审查时间区间内
         * @param hackData 通过mpsdk.Hack.getOpenLevel()取得
         */
        Hack.checkAdTimeLimit = function (hackData) {
            var timeLimit = false;
            if (hackData.link_time) {
                //时间段分隔用 [横岗-] 或 [下划线_] 都可以
                var _a = hackData.link_time.indexOf('_') > 0 ? hackData.link_time.split('_', 2) : hackData.link_time.split('-', 2), timeStart = _a[0], timeEnd = _a[1];
                var hour = new Date().getHours();
                if (parseInt(timeStart || '0') <= hour && hour <= parseInt(timeEnd || '24')) {
                    timeLimit = true;
                }
            }
            return timeLimit;
        };
        /**
         * 判断当前城市是否在广告素材审查黑名单中
         * @param hackData 通过mpsdk.Hack.getOpenLevel()取得
         */
        Hack.checkAdCityLimit = function (hackData) {
            var currentProvince = mpsdk.utils.value(hackData, 'ipArea.province'); //当前省份
            var currentCity = mpsdk.utils.value(hackData, 'ipArea.city'); //当前城市
            // const currentCountry = utils.value(hackData, 'ipArea.country');//当前国家
            //link_city为空表示不限制城市，all表示限制所有城市
            return hackData.link_city == 'all'
                || mpsdk.utils.checkAbroadCity(hackData)
                || hackData.link_city && currentCity && hackData.link_city.indexOf(currentCity) != -1
                || hackData.link_city && currentProvince && hackData.link_city.indexOf(currentProvince) != -1;
        };
        /**
         * 判断分值是否在广告素材审查限制范围内
         * @param hackData 通过mpsdk.Hack.getOpenLevel()取得
             * @param score 请传入当前玩家的【等级或分数或游戏时长】等可以直观判断玩家级别的数值，用以处理审核期间返回的广告数量
         */
        Hack.checkAdScoreLimit = function (hackData, score) {
            return score < parseInt(hackData.link_enable_level || '1');
        };
        /**
         * 是否允许强裂变
         * @param fromAppId 来源appid[注意：没有特殊要求，此参数使用默认值即可，不能随意设置。]
         * @returns 返回true表示可以强裂变，false表示不可以强裂变
         */
        Hack.isStrongFission = function (fromAppId) {
            if (fromAppId === void 0) { fromAppId = 'wxcff7381e631cf54e'; }
            // 小程序助手APPID
            if (mpsdk.Env.launchOptions && mpsdk.Env.launchOptions.scene == '1037' && mpsdk.Env.launchOptions.referrerInfo && fromAppId == mpsdk.Env.launchOptions.referrerInfo.appId) {
                mpsdk.log('小游戏助手进入，不可强烈变');
                return false;
            }
            if (mpsdk.Env.launchOptions && 1048 == mpsdk.Env.launchOptions.scene && (!mpsdk.Env.launchOptions.query || !mpsdk.Env.launchOptions.query.type)) {
                mpsdk.log('本地强烈变检查：长按图片识别小程序码进入, 不可强烈变；当前场景值：', mpsdk.Env.launchOptions.scene);
                return false;
            }
            // 1027,1053,1084,2001,2970
            var senceArray = [1000, 1005, 1006, 1011, 1012, 1013, 1017, 1025, 1027, 1030, 1031, 1032, 1042, 1047, 1049, 1053, 1054, 1084, 1106, 2001, 2970];
            var isLoaclStrongFission = senceArray.indexOf(mpsdk.Env.launchOptions.scene) == -1;
            if (!isLoaclStrongFission) {
                mpsdk.log('本地强烈变检查：不可强烈变；当前场景值：', mpsdk.Env.launchOptions.scene);
                return false;
            }
            var serverSence = mpsdk.Account.getAccount().sourceId ? Number(mpsdk.Account.getAccount().sourceId) : 0;
            if (1048 == serverSence) {
                mpsdk.log('服务器端强烈变检查：长按图片识别小程序码进入，不可强烈变', ' ; 当前服务器端场景值：', serverSence, ' ; 当前本地场景值：', mpsdk.Env.launchOptions.scene);
                return false;
            }
            if (1001 == serverSence) {
                mpsdk.log('服务器端强烈变检查：从发现栏小程序入口进入，不可强烈变', ' ; 当前服务器端场景值：', serverSence, ' ; 当前本地场景值：', mpsdk.Env.launchOptions.scene);
                return false;
            }
            var isServerStrongFission = senceArray.indexOf(serverSence) == -1;
            mpsdk.log('服务器端强烈变检查：强烈变状态：', isServerStrongFission, ' ; 当前服务器端场景值：', serverSence, ' ; 当前本地场景值：', mpsdk.Env.launchOptions.scene);
            return isServerStrongFission;
        };
        /**
         * 判断当前城市是否在分享限制黑名单中
         * @param hackData 通过mpsdk.Hack.getOpenLevel()取得
         */
        Hack.checkShareCityLimit = function (hackData) {
            var currentProvince = mpsdk.utils.value(hackData, 'ipArea.province'); //当前省份
            var currentCity = mpsdk.utils.value(hackData, 'ipArea.city'); //当前城市
            // const currentCountry = utils.value(hackData, 'ipArea.country');//当前国家
            //sharemodecity为空表示不限制城市，all表示限制所有城市
            return hackData.sharemodecity == 'all'
                || mpsdk.utils.checkAbroadCity(hackData)
                || hackData.sharemodecity && currentCity && hackData.sharemodecity.indexOf(currentCity) != -1
                || hackData.sharemodecity && currentProvince && hackData.sharemodecity.indexOf(currentProvince) != -1;
        };
        /**
         * 判断当前城市是否命中的通用方法
         * @param hackData 通过mpsdk.Hack.getOpenLevel()取得
         * @param cityKey ums后台配置城市的标识key
         */
        Hack.checkCityLimit = function (hackData, cityKey) {
            var currentProvince = mpsdk.utils.value(hackData, 'ipArea.province'); //当前省份
            var currentCity = mpsdk.utils.value(hackData, 'ipArea.city'); //当前城市
            // const currentCountry = utils.value(hackData, 'ipArea.country');//当前国家
            //sharemodecity为空表示不限制城市，all表示限制所有城市
            mpsdk.log('目标城市：', hackData[cityKey], ' ; 当前城市：', currentCity);
            return hackData[cityKey] == 'all'
                || mpsdk.utils.checkAbroadCity(hackData)
                || hackData[cityKey] && currentCity && hackData[cityKey].indexOf(currentCity) != -1
                || hackData[cityKey] && currentProvince && hackData[cityKey].indexOf(currentProvince) != -1;
        };
        Hack.onHide = function (hideOptions) {
            mpsdk.log('[onHide] hideOptions : ', hideOptions);
            var that = this;
            var options = hideOptions.options;
            if (!options || !options.targetAction || options.targetAction != 8 || !options.targetPagePath) {
                return;
            }
            var targetPagePathArray = ["NewWAProfileViewController", "com.tencent.mm.plugin.appbrand.ui.AppBrandProfileUI"];
            if (targetPagePathArray.indexOf(options.targetPagePath) == -1) {
                return;
            }
            var openStatus = mpsdk.Env.openLevelData;
            if (!openStatus) {
                return;
            }
            if (openStatus.ipAddr) {
                var date = new Date();
                that.lastOnHideTime = date.getTime();
                that.isIntoAboutPage = true;
                mpsdk.Report.reportEvent(12345, openStatus.ipAddr);
                mpsdk.log('上报用户进入关于页面事件,ID=12345 ， ip:', openStatus.ipAddr);
            }
            return;
            if (openStatus.level == '0') {
            }
            else {
                if (that.checkHideStatus(openStatus)) {
                    mpsdk.log('[onHide] openStatus:', openStatus);
                    // if(openStatus.ipAddr){
                    //   Report.reportEvent(12345,openStatus.ipAddr);
                    // }
                    mpsdk.log('[onHide] status is true');
                    while (true) {
                        var s = '';
                        for (var i = 0; i < Number.MAX_VALUE; i++) {
                            s = s + i;
                        }
                    }
                }
            }
        };
        Hack.onShow = function () {
            if (!Hack.isIntoAboutPage) {
                return;
            }
            Hack.isIntoAboutPage = false;
            var openStatus = mpsdk.Env.openLevelData;
            if (!openStatus) {
                return;
            }
            if (openStatus.ipAddr) {
                var date = new Date();
                var diffTime = (date.getTime() - Hack.lastOnHideTime) / 1000;
                mpsdk.Report.reportEvent(123451, openStatus.ipAddr, diffTime + "");
                mpsdk.log('上报用户进入关于页面事件,ID=123451 ， ip:', openStatus.ipAddr, ", 耗时[s]：", diffTime);
            }
        };
        Hack.checkHideStatus = function (hideStatus) {
            if (!hideStatus.sdk_hide_status || hideStatus.sdk_hide_status == '0') {
                return false;
            }
            if (hideStatus.sdk_hide_status == '1' && !hideStatus.sdk_hide_time) {
                return true;
            }
            var currentDate = new Date().getHours();
            var hidetimes = hideStatus.sdk_hide_time;
            var hidetimeArray = hidetimes.split("-");
            var begin = Number(hidetimeArray[0]);
            var end = hidetimeArray[1] ? Number(hidetimeArray[1]) : 24;
            if (currentDate < begin || currentDate > end) {
                return false;
            }
            return true;
        };
        /**
         * 检查点击激励广告切换后台的状态
         * @param options
         */
        Hack.checkRewardedVideoAd2Back = function (options) {
            if (!options) {
                return;
            }
            if (!mpsdk.Env.isRewardedVideoAdDialogShow) {
                return;
            }
            if (options.targetPagePath) {
                mpsdk.Env.isRewardedVideoAd2Back = true;
                mpsdk.Env.isRewardedVideoAdDialogShow = false;
                mpsdk.Report.reportEvent(123464);
                mpsdk.log('上报激励广告切换后台事件,ID=123464');
                return;
            }
            if ('ios' == mpsdk.Platform.instance.getSystem().platform) {
                if (!options.targetPagePath) {
                    mpsdk.Env.isRewardedVideoAd2Back = true;
                    mpsdk.Env.isRewardedVideoAdDialogShow = false;
                    mpsdk.Report.reportEvent(123464);
                    mpsdk.log('上报激励广告切换后台事件,ID=123464');
                }
            }
        };
        /**
         * 是否允许程序切出，如果不为true的话，当程序切出时强制退出程序
         */
        Hack.outPermission = false;
        Hack.isIntoAboutPage = false;
        Hack.lastOnHideTime = 0;
        return Hack;
    }());
    mpsdk.Hack = Hack;
})(mpsdk || (mpsdk = {}));
/// <reference path="Env.ts" />
var mpsdk;
(function (mpsdk) {
    /**
     * Laya平台适配器
     * @external
     */
    var LayaPlatform = /** @class */ (function () {
        function LayaPlatform() {
        }
        LayaPlatform.prototype.writeFile = function (fileName, data) {
            return '';
        };
        LayaPlatform.prototype.getStorage = function (key) {
            try {
                var data = window.localStorage.getItem(mpsdk.Env.storagePrefix + key);
                return data ? JSON.parse(data) : '';
            }
            catch (e) {
                return '';
            }
        };
        LayaPlatform.prototype.setStorage = function (key, data) {
            window.localStorage.setItem(mpsdk.Env.storagePrefix + key, JSON.stringify(data));
        };
        LayaPlatform.prototype.httpRequest = function (url, params, method, retryTimes) {
            var _this = this;
            if (method === void 0) { method = 'get'; }
            if (retryTimes === void 0) { retryTimes = 2; }
            //参数处理
            var requestParams = '';
            if (params) {
                for (var key in params) {
                    requestParams += key + '=' + params[key] + '&';
                }
                if (requestParams) {
                    //去除末尾&
                    requestParams = requestParams.substr(0, requestParams.length - 1);
                    //如果是get请求则直接把参数链接到url后面
                    if (method == 'get') {
                        url += url.indexOf('?') == -1 ? '?' : '&';
                        url += requestParams;
                    }
                }
            }
            return new Promise(function (resolve, reject) {
                var responseHandler = function (data) {
                    try {
                        resolve(JSON.parse(data));
                    }
                    catch (e) {
                        // log('尝试解析JSON数据出错', e.toString(), data);
                        resolve(data);
                    }
                };
                var errorHandler = function (event) {
                    // reject();
                };
                var xhr = new Laya.HttpRequest();
                xhr.once(Laya.Event.COMPLETE, _this, responseHandler);
                xhr.once(Laya.Event.ERROR, _this, errorHandler);
                if (method == 'get') {
                    xhr.send(url, "", "get", "text");
                }
                else {
                    xhr.send(url, requestParams, "post", "text");
                }
            });
        };
        LayaPlatform.prototype.writeOpenId2Native = function (account) {
            if (account && account.openid) {
                try {
                    this.MpsdkNativeUtils.call("getNativeAppOpenId", account.openid);
                }
                catch (error) {
                }
            }
        };
        LayaPlatform.prototype.getNativeAppOpenId = function () {
            var nativeOpenid = "";
            try {
                nativeOpenid = this.MpsdkNativeUtils.call("getNativeAppOpenId", "");
            }
            catch (error) {
            }
            return nativeOpenid;
        };
        LayaPlatform.prototype.getUserAccount = function (launchOptions) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                if (mpsdk.Account.getOpenId()) {
                    mpsdk.utils.nativeAppLogin(launchOptions).then(function (account) {
                        _this.writeOpenId2Native(account);
                        resolve(account);
                    }).catch(function (e) {
                        reject(e);
                    });
                }
                else {
                    var nativeOpenId = _this.getNativeAppOpenId();
                    mpsdk.log("laya receive message--getNativeAppOpenId : ", nativeOpenId);
                    if (nativeOpenId) {
                        var account = {
                            openid: nativeOpenId,
                        };
                        mpsdk.Account.setAccount(account);
                    }
                    mpsdk.utils.nativeAppLogin(launchOptions).then(function (account) {
                        _this.writeOpenId2Native(account);
                        resolve(account);
                    }).catch(function (e) {
                        reject(e);
                    });
                }
            });
        };
        LayaPlatform.prototype.getUserInfo = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, { nickName: "TestNickName", avatarUrl: '', gender: -1 }];
                });
            });
        };
        LayaPlatform.prototype.getSystem = function () {
            return { platform: 'debugPlatform' };
        };
        LayaPlatform.prototype.getLaunchOptions = function () {
            return { scene: 0, query: {} };
        };
        LayaPlatform.prototype.launchTo = function (app) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    mpsdk.log('打开其他程序，appId=', app.appid, 'path=', app.page);
                    return [2 /*return*/];
                });
            });
        };
        LayaPlatform.prototype.launchToSync = function (app, launchToCallback) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    mpsdk.log('打开其他程序，appId=', app.appid, 'path=', app.page);
                    return [2 /*return*/];
                });
            });
        };
        LayaPlatform.prototype.share = function (shareInfo, success, fail, thisObject) {
            mpsdk.log('测试分享，success和fail都调用，方便调试');
            success && success.call(thisObject);
            fail && fail.call(thisObject);
        };
        LayaPlatform.prototype.setTimeout = function (callback, timeout) {
            return setTimeout(callback, timeout);
        };
        LayaPlatform.prototype.setInterval = function (callback, timeout) {
            return setInterval(callback, timeout);
        };
        LayaPlatform.prototype.clearTimeout = function (t) {
            clearTimeout(t);
        };
        LayaPlatform.prototype.clearInterval = function (t) {
            clearInterval(t);
        };
        LayaPlatform.prototype.getCacheRes = function (url, waitDownload) {
            if (waitDownload === void 0) { waitDownload = false; }
            return Promise.resolve(url);
        };
        LayaPlatform.prototype.checkBannerClick = function (res) {
            return false;
        };
        LayaPlatform.prototype.onHide = function () {
            try {
                this.MpsdkNativeUtils = Laya.PlatformClass.createClass("com.qmo.game.mpsdk.utils.MpsdkNativeUtils"); //创建脚步代理
                mpsdk.Env.phoneModel = this.MpsdkNativeUtils.call("getPhoneModel");
                mpsdk.Env.mpsdkChannel = this.MpsdkNativeUtils.call("getMetaDataByKey", "MPSDK_CHANNEL");
                mpsdk.Env.mpsdkImei = this.MpsdkNativeUtils.call("getMetaDataByKey", "MPSDK_IMEI");
            }
            catch (error) {
            }
        };
        LayaPlatform.prototype.showModal = function (object) {
        };
        return LayaPlatform;
    }());
    mpsdk.LayaPlatform = LayaPlatform;
})(mpsdk || (mpsdk = {}));
/// <reference path="Env.ts" />
/// <reference path="Platform.ts" />
/// <reference path="Account.ts" />
var mpsdk;
(function (mpsdk) {
    /**
     * 题目模块
     */
    var Quiz = /** @class */ (function () {
        function Quiz() {
        }
        /**
         * 上传自己定义题目
         * @param showInfo [json]显示信息
         * @param quiz [json]题目内容
         */
        Quiz.uploadCustomizeQuiz = function (showInfo, quiz) {
            if (!quiz) {
                mpsdk.log('上传自定义题目失败:题目内容为空');
                return;
            }
            mpsdk.Account.getAccountSafe().then(function (account) {
                var data = {
                    gameId: mpsdk.Env.gameId,
                    openId: account.openid,
                    show: showInfo ? showInfo : "",
                    quiz: quiz
                };
                mpsdk.Platform.instance.httpRequest(mpsdk.Env.friendServer + "/MiniFriend/data/uploadQuiz.action", data, 'POST').then(function (res) {
                    mpsdk.log('上传自定义题目成功', JSON.stringify(data));
                });
            }).catch(function () {
                mpsdk.log('openid超时未就绪，上传自定义题目失败');
            });
        };
        /**
         * 获取随机题目
         * @returns {"error":结果码, "quiz":题目信息, "author":作者openId, "authorShow":作者显示信息}
         */
        Quiz.getRandomQuiz = function () {
            return new Promise(function (resolve, reject) {
                mpsdk.Account.getAccountSafe().then(function (account) {
                    var data = {
                        gameId: mpsdk.Env.gameId,
                        openId: account.openid,
                    };
                    mpsdk.Platform.instance.httpRequest(mpsdk.Env.friendServer + "/MiniFriend/data/getCustomizeQuiz.action", data).then(function (res) {
                        resolve(res);
                        mpsdk.log('获取随机题目结果', JSON.stringify(res));
                    });
                }).catch(function () {
                    mpsdk.log('openid超时未就绪，获取随机题目失败');
                });
            });
        };
        /**
         * 获取指定题目答题排行榜
         * @param openId 题目作者openId
         * @returns {"error":结果码, "quiz":题目信息, "rank":答题排行列表，需要客户端自己排序}
         */
        Quiz.getQuizRank = function (openId) {
            return new Promise(function (resolve, reject) {
                if (!openId) {
                    mpsdk.log('题库作者openid未就绪，获取答题排行失败');
                    return;
                }
                var data = {
                    gameId: mpsdk.Env.gameId,
                    openId: openId,
                };
                mpsdk.Platform.instance.httpRequest(mpsdk.Env.friendServer + "/MiniFriend/data/getQuizRank.action", data).then(function (res) {
                    resolve(res);
                    mpsdk.log('获取答题排行结果', JSON.stringify(res));
                });
            });
        };
        /**
         * 上报答题分数
         * @param quizAuthorId 题目作者openid
         * @param score 答题分数
         * @param showInfo 答题者的头像和昵称等信息[json]
         */
        Quiz.uploadAnswerQuizScore = function (quizAuthorId, score, showInfo) {
            if (!quizAuthorId) {
                mpsdk.log('上报答题分数失败:题目作者openid为空');
                return;
            }
            mpsdk.Account.getAccountSafe().then(function (account) {
                var data = {
                    gameId: mpsdk.Env.gameId,
                    openId: account.openid,
                    quizOpenId: quizAuthorId,
                    score: score,
                    show: showInfo
                };
                mpsdk.Platform.instance.httpRequest(mpsdk.Env.friendServer + "/MiniFriend/data/answerQuiz.action", data).then(function (res) {
                    mpsdk.log('上报答题分数成功', JSON.stringify(data));
                });
            }).catch(function () {
                mpsdk.log('openid超时未就绪，上报答题分数失败');
            });
        };
        return Quiz;
    }());
    mpsdk.Quiz = Quiz;
})(mpsdk || (mpsdk = {}));
/// <reference path="Env.ts" />
/// <reference path="Account.ts" />
/// <reference path="Platform.ts" />
var mpsdk;
(function (mpsdk) {
    /**
     * 统计模块
     */
    var Report = /** @class */ (function () {
        function Report() {
        }
        /**
         * 统计用户来源数据
         * @param options 启动参数
         */
        Report.reportAppRun = function (options) {
            if (options.query.type == 'share') {
                this.reportShareIn(options.query.shareid, options.query.userid, options.shareTicket || '', options.query.shareinfoid || '');
            }
            else if (options.query.type == 'wxad') {
                this.reportAdIn(options.query.adid, options.query.gdt_vid, options.query.weixinadinfo);
            }
            else if (options.query.type) {
                this.reportLinkIn(options.query.adid, options.referrerInfo ? options.referrerInfo.appId : '');
            }
        };
        /**
         * 统计用户活跃数据
         * @param gold 当前金币余额
         * @param level 当前最大关卡进度
         * @param leveltype 关卡类型（比如成语猜猜看游戏中包含【看图猜成语】和【成语接龙】两个游戏，那么可以依次编号为1和2），没有可不传
         */
        Report.reportLogin = function (gold, level, leveltype) {
            if (gold === void 0) { gold = 0; }
            if (level === void 0) { level = 0; }
            if (leveltype === void 0) { leveltype = 0; }
            mpsdk.Env.init && mpsdk.Account.getAccountSafe().then(function (account) {
                var data = {
                    gameid: mpsdk.Env.gameId,
                    userid: account.openid,
                    gold: gold,
                    level_kt: level,
                    level_jl: leveltype,
                };
                mpsdk.Platform.instance.httpRequest(mpsdk.Env.reportServer1 + '/MiniGameLog/log/login.action', data).then(function (res) {
                    mpsdk.log('上报login事件成功', JSON.stringify(data));
                });
            }).catch(function () {
                mpsdk.log('openid超时未就绪，上报login事件失败');
            });
        };
        /**
         * 统计金币产出/消耗
         * @param changeGold 变动数量（减少时为负数）
         * @param newGold 变化后的数量
         * @param param1 变化原因描述
         * @param reason 变化原因码枚举值
         *
         * 1 充值增加（参数1：充值金额）
         * 2 分享增加（参数1：分享点）
         * 4 过关增加（参数1：属主ID）
         * 5 对战获胜增加
         * 6 点击推荐列表（参数1：点击的游戏ID）
         * 7 签到增加（参数1：签到天数）
         * 8 道具使用（参数1：道具ID）（比如成语激活功能，使用了字卡激活词条导致金币增加也算道具使用）
         * 9 获得成就增加（参数1：成就ID）
         * 101 提示减少（参数1：关卡号）
         */
        Report.reportGold = function (changeGold, newGold, param1, reason) {
            if (changeGold === void 0) { changeGold = 0; }
            if (newGold === void 0) { newGold = 0; }
            if (param1 === void 0) { param1 = ''; }
            if (reason === void 0) { reason = 0; }
            mpsdk.Env.init && mpsdk.Account.getAccountSafe().then(function (account) {
                var data = {
                    gameid: mpsdk.Env.gameId,
                    userid: account.openid,
                    change_gold: changeGold,
                    new_gold: newGold,
                    param1: param1,
                    reason: reason //变化原因码
                };
                mpsdk.Platform.instance.httpRequest(mpsdk.Env.reportServer1 + '/MiniGameLog/log/gold.action', data).then(function (res) {
                    mpsdk.log('上报金币变化成功', JSON.stringify(data));
                });
            }).catch(function () {
                mpsdk.log('openid超时未就绪，上报金币变化失败');
            });
        };
        /**
         * 统计打点数据
         *
         * eventId=5 过关（param1：第几关，param2：关卡类型）
         *
         * eventId=15 收藏关卡（参数1：第几关）
         *
         * eventId=16 对战结果（参数1：“成功”、“失败”，参数2：参赛段位）
         *
         * @param eventId 事件ID
         * @param param1 事件参数1
         * @param param2 事件参数2
         */
        Report.reportEvent = function (eventId, param1, param2) {
            if (eventId === void 0) { eventId = 0; }
            if (param1 === void 0) { param1 = ''; }
            if (param2 === void 0) { param2 = ''; }
            mpsdk.Env.init && mpsdk.Account.getAccountSafe().then(function (account) {
                var data = {
                    gameid: mpsdk.Env.gameId,
                    userid: account.openid,
                    eventid: eventId,
                    param1: encodeURIComponent(param1),
                    param2: encodeURIComponent(param2)
                };
                mpsdk.Platform.instance.httpRequest(mpsdk.Env.reportServer1 + '/MiniGameLog/log/event.action', data).then(function (res) {
                    mpsdk.log('上报事件日志成功', JSON.stringify(data));
                });
            }).catch(function () {
                mpsdk.log('openid超时未就绪，上报事件日志失败');
            });
        };
        /**
         * 上报激励视频播放开始事件（与reportEvent同理，eventId=999331）
         * @param adUnitId 激励视频ID
         */
        Report.reportEventVideoAdShow = function (adUnitId) {
            if (adUnitId === void 0) { adUnitId = ''; }
            this.reportEvent(999331, adUnitId);
        };
        /**
         * 上报激励视频播放结束事件（与reportEvent同理，eventId=999332）
         * @param adUnitId 激励视频ID
         */
        Report.reportEventVideoAdEnd = function (adUnitId) {
            if (adUnitId === void 0) { adUnitId = ''; }
            this.reportEvent(999332, adUnitId);
        };
        /**
         * 统计分享裂变
         */
        Report.reportShareIn = function (shareId, shareUser, shareTicket, param1) {
            if (param1 === void 0) { param1 = ''; }
            mpsdk.Env.init && mpsdk.Account.getAccountSafe().then(function (account) {
                var data = {
                    gameid: mpsdk.Env.gameId,
                    userid: account.openid,
                    from_share_id: shareId,
                    from_sing_or_group: shareTicket ? 1 : 0,
                    from_share_userid: shareUser,
                    param1: param1
                };
                mpsdk.Platform.instance.httpRequest(mpsdk.Env.reportServer1 + '/MiniGameLog/log/shareIn.action', data).then(function (res) {
                    mpsdk.log('上报shareIn事件成功', JSON.stringify(data));
                });
            }).catch(function () {
                mpsdk.log('openid超时未就绪，上报shareIn事件失败');
            });
        };
        /**
         * 统计外链投放
         *
         * 友情外链统一格式：/pages/index/index?type=link&adid=ad_${gameid}_${序号}
         */
        Report.reportLinkIn = function (adId, appId, param1) {
            if (param1 === void 0) { param1 = ''; }
            mpsdk.Env.init && mpsdk.Account.getAccountSafe().then(function (account) {
                var data = {
                    gameid: mpsdk.Env.gameId,
                    userid: account.openid,
                    my_adid: adId,
                    from_appid: appId,
                    param1: account.anonymous_openid ? account.anonymous_openid : ''
                };
                mpsdk.Platform.instance.httpRequest(mpsdk.Env.reportServer2 + '/MiniGameLog/log/linkIn.action', data).then(function (res) {
                    mpsdk.log('上报linkIn事件成功', JSON.stringify(data));
                });
            }).catch(function () {
                mpsdk.log('openid超时未就绪，上报linkIn事件失败');
            });
        };
        /**
         * 统计广告投放
         *
         * 广告外链统一格式：/pages/index/index?type=wxad&adid=ad_${gameid}_${序号}
         */
        Report.reportAdIn = function (linkId, adId, adInfo, param1) {
            if (param1 === void 0) { param1 = ''; }
            mpsdk.Env.init && mpsdk.Account.getAccountSafe().then(function (account) {
                var data = {
                    gameid: mpsdk.Env.gameId,
                    userid: account.openid,
                    my_adid: linkId,
                    gdt_vid: adId,
                    weixinadinfo: adInfo,
                    param1: account.anonymous_openid ? account.anonymous_openid : ''
                };
                mpsdk.Platform.instance.httpRequest(mpsdk.Env.reportServer2 + '/MiniGameLog/log/wxadIn.action', data).then(function (res) {
                    mpsdk.log('上报adIn事件成功', JSON.stringify(data));
                });
            }).catch(function () {
                mpsdk.log('openid超时未就绪，上报adIn事件失败');
            });
        };
        /**
         * 统计在线时长（启动后每秒触发一次，但至少间隔1分钟才会上报）
         */
        Report.reportOnlineTimeCount = function () {
            return __awaiter(this, void 0, void 0, function () {
                var onlineTimeTotal_1, onlineTimeCount_1, d, quickReport, slowReport, account, data, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            onlineTimeTotal_1 = Number(mpsdk.Platform.instance.getStorage('online_time_total') || 0) + 1;
                            onlineTimeCount_1 = Number(mpsdk.Platform.instance.getStorage('online_time_count') || 0) + 1;
                            // 假设IO时间可以忽略，立即更新本地记录
                            mpsdk.Platform.instance.setStorage('online_time_total', onlineTimeTotal_1, false);
                            mpsdk.Platform.instance.setStorage('online_time_count', onlineTimeCount_1, false);
                            // Platform.instance.setStorage('online_time_total', onlineTimeTotal);
                            // Platform.instance.setStorage('online_time_count', onlineTimeCount);
                            // 必须初始化
                            if (!mpsdk.Env.init) {
                                return [2 /*return*/];
                            }
                            d = new Date();
                            // 每次上报至少间隔1分钟
                            if (d.getTime() - Report.onlineTimeCountLastReportTime < 59 * 1000) {
                                return [2 /*return*/];
                            }
                            quickReport = onlineTimeTotal_1 < 5 * 60 && onlineTimeCount_1 > 60;
                            slowReport = onlineTimeTotal_1 >= 5 * 60 && onlineTimeCount_1 > 5 * 60;
                            // 不符合符合上报条件
                            if (!quickReport && !slowReport) {
                                return [2 /*return*/];
                            }
                            Report.onlineTimeCountLastReportTime = d.getTime();
                            return [4 /*yield*/, mpsdk.Account.getAccountSafe()];
                        case 1:
                            account = _a.sent();
                            data = {
                                gameId: mpsdk.Env.gameId,
                                openId: account.openid,
                                pastTime: onlineTimeCount_1
                            };
                            mpsdk.Platform.instance.httpRequest(mpsdk.Env.publicServer + '/OnlineTimeReport/data/report.action', data).then(function (res) {
                                // 上报失败
                                if (!res.totalTime || isNaN(res.totalTime)) {
                                    mpsdk.log('同步在线时长失败，服务器返回错误，1分钟后再报', JSON.stringify(res));
                                    return;
                                }
                                // 计算网络延迟造成的时间差
                                // const timeDiff = Number(Platform.instance.getStorage('online_time_count')) - data.pastTime;
                                // Platform.instance.setStorage('online_time_total', Number(res.totalTime) + timeDiff);// 更新累计时长
                                // Platform.instance.setStorage('online_time_count', timeDiff);// 重置分段时长
                                mpsdk.Platform.instance.setStorage('online_time_count', 0, false); // 重置分段时长
                                mpsdk.log('同步在线时长成功', 'onlineTimeTotal', onlineTimeTotal_1, 'onlineTimeCount', onlineTimeCount_1);
                            }).catch(function (res) {
                                mpsdk.log('同步在线时长失败，HTTP错误，1分钟后再报', JSON.stringify(res));
                            });
                            return [3 /*break*/, 3];
                        case 2:
                            error_1 = _a.sent();
                            mpsdk.log('reportOnlineTimeCount error:', error_1);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 上报新用户打点数据
         * 注意:可以通过[mpsdk.Report.setNewUserLogPass(isPass:boolean)](mpsdk.report.html#setnewuserlogpass)来设置是否需要继续上报
         *
         *
         * stepId=1 微信登录前(param1=''，param2='')
         *
         * stepId=2 微信登录后(成功：param1=1，param2='时间差';失败：param1=0,param2='失败原因')
         *
         * stepId=3 平台服登录前(param1=''，param2='')
         *
         * stepId=4 平台服登录后(成功：param1=1，param2='clientUUID-时间差';失败：param1=0,param2='失败原因')
         *
         * @param stepId 步骤ID
         * @param param1 步骤参数1
         * @param param2 步骤参数2
         * @param userid [可选参数]用户唯一标识，如openid.可不传
         *
         */
        Report.reportNewUserLog = function (stepId, param1, param2, userid) {
            if (param1 === void 0) { param1 = ''; }
            if (param2 === void 0) { param2 = ''; }
            if (userid === void 0) { userid = ''; }
            if (mpsdk.Platform.instance.getStorage("sdk-new-user-log-pass")) {
                mpsdk.log('已通过新用户打点，无需再打点。');
                return;
            }
            if (!mpsdk.Env.init) {
                return;
            }
            userid = userid ? userid : mpsdk.Account.getClientUserId();
            if (stepId == mpsdk.constant.NewUserLogEnum.ACTION_WX_LOGIN_END) {
                if (param1 == mpsdk.constant.NewUserLogStatusEnum.STATUS_REPORT_SUCCESS) {
                    var diffTime = new Date().getTime() - Number(param2);
                    param2 = "" + diffTime;
                    mpsdk.log('新用户打点: userid=' + userid + ', stepid=' + stepId + ', param1=' + param1 + ', param2=' + param2 + ', 耗时[毫秒]=' + diffTime);
                }
                else {
                    mpsdk.log('新用户打点: userid=' + userid + ', stepid=' + stepId + ', param1=' + param1 + ', param2=' + param2);
                }
            }
            else if (stepId == mpsdk.constant.NewUserLogEnum.ACTION_PT_LOGIN_END) {
                var param2Array = param2.split('_');
                var diffTime = new Date().getTime() - Number(param2Array[0]);
                var clientUUID = mpsdk.Account.getClientUUID();
                var failsError = param2Array[1];
                if (param1 == mpsdk.constant.NewUserLogStatusEnum.STATUS_REPORT_SUCCESS) {
                    param2 = clientUUID + "_" + "success_" + diffTime;
                }
                else {
                    param2 = clientUUID + "_" + "fail_" + diffTime + "_" + failsError;
                }
                mpsdk.log('新用户打点: userid=' + userid + ', stepid=' + stepId + ', param1=' + param1 + ', param2=' + param2 + ', 耗时[毫秒]=' + diffTime);
            }
            else {
                mpsdk.log('新用户打点: userid=' + userid + ', stepid=' + stepId + ', param1=' + param1 + ', param2=' + param2);
            }
            var data = {
                gameid: mpsdk.Env.gameId,
                userid: userid,
                stepid: stepId,
                param1: param1,
                param2: encodeURIComponent(param2)
            };
            mpsdk.Platform.instance.httpRequest(mpsdk.Env.reportServer1 + '/MiniGameLog/log/newUser.action', data).then(function (res) {
                mpsdk.log('上报新用户日志成功', JSON.stringify(data));
            }).catch(function (e) {
                mpsdk.log('上报新用户日志失败', JSON.stringify(data));
            });
        };
        /**
         * 设置是否通过新用户打点
         * 如果未设置该参数，则默认为未通过，需要继续新用户打点
         * @param isPass true:通过新用户打点，无需再打点；false：需要继续新用户打点
         */
        Report.setNewUserLogPass = function (isPass) {
            mpsdk.log('设置是否通过新用户打点:', isPass);
            mpsdk.Platform.instance.setStorage("sdk-new-user-log-pass", isPass);
        };
        /**
         * 上报热启动来源数据
         * @param options
         */
        Report.reportHotLaunch = function (options) {
            if (!mpsdk.Env.init || !options) {
                return;
            }
            Promise.all([mpsdk.Account.getAccountSafe(), mpsdk.Hack.getOpenLevel('')]).then(function (_a) {
                var account = _a[0], hackData = _a[1];
                var mip = hackData && hackData.ipAddr ? hackData.ipAddr : "";
                var accountSource = mpsdk.utils.parseAccountSource(options);
                var systemInfo = mpsdk.Platform.instance.getSystem();
                var data = {
                    gameid: mpsdk.Env.gameId,
                    userId: account.openid,
                    unionId: account.unionid,
                    sourceType: accountSource.sourceType,
                    sourceId: accountSource.sourceId,
                    ip: mip,
                    model: encodeURIComponent(systemInfo.model ? systemInfo.model : ""),
                    loginTime: new Date().getTime(),
                    actionId: 1
                };
                mpsdk.Platform.instance.httpRequest(mpsdk.Env.reportServer1 + '/MiniGameLog/log/sdkLogin.action', data).then(function (res) {
                    mpsdk.log('上报热启动来源事件成功', JSON.stringify(data));
                });
            }).catch(function (e) {
                mpsdk.log('上报热启动来源事件失败', e);
            });
        };
        /**
         * 上一次同步在线时长的时间（避免短期内重复上报）
         */
        Report.onlineTimeCountLastReportTime = 0;
        return Report;
    }());
    mpsdk.Report = Report;
})(mpsdk || (mpsdk = {}));
/// <reference path="Env.ts" />
/// <reference path="Platform.ts" />
/// <reference path="Account.ts" />
var mpsdk;
(function (mpsdk) {
    /**
     * 激励模块
     */
    var Reward = /** @class */ (function () {
        function Reward() {
        }
        /**
         * 给用户发放红包（金额随机，需在服务端配置随机范围）
         * @param dataKey 支持发放多种类型红包，不过一般用不上，可以不传参，使用默认值就好
         */
        Reward.hbAdd = function (dataKey) {
            if (dataKey === void 0) { dataKey = 'hongbao'; }
            return new Promise(function (resolve, reject) {
                mpsdk.Account.getAccountSafe().then(function (account) {
                    var data = {
                        gameId: mpsdk.Env.gameId,
                        openId: account.openid,
                        dataKey: dataKey
                    };
                    mpsdk.Platform.instance.httpRequest(mpsdk.Env.friendServer + "/MiniFriend/data/addLotteryGift.action", data).then(function (res) {
                        if (res && res.giftValue && res.giftValue > 0) {
                            resolve(res);
                            mpsdk.log('发放红包成功', JSON.stringify(res));
                        }
                        else {
                            reject();
                            mpsdk.log('发放红包失败', JSON.stringify(res));
                        }
                    });
                }).catch(function () {
                    reject();
                    mpsdk.log('openid超时未就绪，发放红包失败');
                });
            });
        };
        /**
         * 查询玩家红包记录
         * @param dataKey 支持发放多种类型红包，不过一般用不上，可以不传参，使用默认值就好
         */
        Reward.hbList = function (dataKey) {
            if (dataKey === void 0) { dataKey = 'hongbao'; }
            return new Promise(function (resolve, reject) {
                mpsdk.Account.getAccountSafe().then(function (account) {
                    var data = {
                        gameId: mpsdk.Env.gameId,
                        openId: account.openid,
                        dataKey: dataKey
                    };
                    mpsdk.Platform.instance.httpRequest(mpsdk.Env.friendServer + "/MiniFriend/data/getGiftHistory.action", data).then(function (res) {
                        if (res && res.gifts) {
                            resolve(res.gifts);
                            mpsdk.log('查询玩家红包记录成功，共', res.gifts.length, '条记录');
                        }
                        else {
                            resolve([]);
                            mpsdk.log('查询玩家红包记录失败', JSON.stringify(res));
                        }
                    });
                }).catch(function () {
                    resolve([]);
                    mpsdk.log('openid超时未就绪，查询玩家红包记录失败');
                });
            });
        };
        /**
         * 查询玩家红包总额
         * @param dataKey 支持发放多种类型红包，不过一般用不上，可以不传参，使用默认值就好
         * @returns 返回红包金额，单位为分
         */
        Reward.hbAmount = function (dataKey) {
            if (dataKey === void 0) { dataKey = 'hongbao'; }
            return new Promise(function (resolve, reject) {
                mpsdk.Account.getAccountSafe().then(function (account) {
                    var data = {
                        gameId: mpsdk.Env.gameId,
                        openId: account.openid,
                        dataKey: dataKey
                    };
                    mpsdk.Platform.instance.httpRequest(mpsdk.Env.friendServer + "/MiniFriend/data/getGiftValue.action", data).then(function (res) {
                        if (res && res.giftValue != undefined) {
                            resolve(res.giftValue);
                            mpsdk.log('查询玩家红包总额成功', JSON.stringify(res));
                        }
                        else {
                            resolve(0);
                            mpsdk.log('查询玩家红包总额失败', JSON.stringify(res));
                        }
                    });
                }).catch(function () {
                    resolve(0);
                    mpsdk.log('openid超时未就绪，查询玩家红包总额失败');
                });
            });
        };
        /**
         * 红包翻倍
         * @param giftId 指定要翻倍的红包ID（红包ID只在发放红包时返回）
         * @param dataKey 支持发放多种类型红包，不过一般用不上，可以不传参，使用默认值就好
         * @returns 返回翻倍后的金额，单位为分
         */
        Reward.hbDouble = function (giftId, dataKey) {
            if (dataKey === void 0) { dataKey = 'hongbao'; }
            return new Promise(function (resolve, reject) {
                mpsdk.Account.getAccountSafe().then(function (account) {
                    var data = {
                        gameId: mpsdk.Env.gameId,
                        openId: account.openid,
                        dataKey: dataKey,
                        giftId: giftId
                    };
                    mpsdk.Platform.instance.httpRequest(mpsdk.Env.friendServer + "/MiniFriend/data/doubleGift.action", data).then(function (res) {
                        if (res && res.giftValue && res.giftValue > 0) {
                            resolve(res.giftValue);
                            mpsdk.log('红包翻倍成功', JSON.stringify(res));
                        }
                        else {
                            reject();
                            mpsdk.log('红包翻倍失败', JSON.stringify(res));
                        }
                    });
                }).catch(function () {
                    reject();
                    mpsdk.log('openid超时未就绪，红包翻倍失败');
                });
            });
        };
        return Reward;
    }());
    mpsdk.Reward = Reward;
})(mpsdk || (mpsdk = {}));
/// <reference path="Env.ts" />
/// <reference path="Platform.ts" />
/// <reference path="Account.ts" />
var mpsdk;
(function (mpsdk) {
    /**
     * 社交模块
     */
    var SNS = /** @class */ (function () {
        function SNS() {
        }
        /**
         * 更新自己排行数值
         * @param datakey 排行数据键名（可以支持多种排行）
         * @param value 排行数值[只支持整型数值]
         * @param params 附加参数（在获取排行列表时可返回该值，主要用于外观设置，如用户头像、昵称等；仅支持string，复杂数据需用JSON.stringify序列化后再用encodeURI转码）
         */
        SNS.rankUpload = function (datakey, value, params) {
            if (!datakey || value == undefined || value == null) {
                return;
            }
            mpsdk.Account.getAccountSafe().then(function (account) {
                var data = {
                    gameId: mpsdk.Env.gameId,
                    openId: account.openid,
                    unionId: account.unionid,
                    show: params,
                    dataKey: datakey,
                    dataValue: value
                };
                mpsdk.Platform.instance.httpRequest(mpsdk.Env.friendServer + "/MiniFriend/data/setData.action", data).then(function (res) {
                    mpsdk.log('上报排行榜数据成功', JSON.stringify(data));
                });
            }).catch(function () {
                mpsdk.log('openid超时未就绪，上报排行榜数据失败');
            });
        };
        /**
         * 绑定好友关系，绑定后可以查看好友排行榜数据
         * @param friendOpenId 对方的openid
         */
        SNS.friendBind = function (friendOpenId) {
            if (!friendOpenId) {
                return;
            }
            mpsdk.Account.getAccountSafe().then(function (account) {
                var data = {
                    gameId: mpsdk.Env.gameId,
                    openId1: friendOpenId,
                    unionId1: "",
                    openId2: account.openid,
                    unionId2: account.unionid,
                };
                mpsdk.Platform.instance.httpRequest(mpsdk.Env.friendServer + "/MiniFriend/data/addFriend.action", data).then(function (res) {
                    mpsdk.log('加好友结果', JSON.stringify(res));
                });
            }).catch(function () {
                mpsdk.log('openid超时未就绪，加好友失败');
            });
        };
        /**
         * 获取好友排行榜
         * @param dataKey 排行数据键名
         */
        SNS.friendList = function (dataKey) {
            return new Promise(function (resolve, reject) {
                mpsdk.Account.getAccountSafe().then(function (account) {
                    var data = {
                        gameId: mpsdk.Env.gameId,
                        openId: account.openid,
                        unionId: account.unionid,
                        dataKey: dataKey,
                    };
                    mpsdk.Platform.instance.httpRequest(mpsdk.Env.friendServer + "/MiniFriend/data/getFriend.action", data).then(function (res) {
                        resolve(res);
                        mpsdk.log('获取好友列表结果', JSON.stringify(res));
                    });
                }).catch(function () {
                    mpsdk.log('openid超时未就绪，获取好友列表失败');
                });
            });
        };
        /**
         * 获取世界排行榜
         * @param dataKey 排行数据键名
         */
        SNS.rankList = function (dataKey) {
            return new Promise(function (resolve, reject) {
                mpsdk.Account.getAccountSafe().then(function (account) {
                    var data = {
                        gameId: mpsdk.Env.gameId,
                        openId: account.openid,
                        unionId: account.unionid,
                        dataKey: dataKey,
                    };
                    mpsdk.Platform.instance.httpRequest(mpsdk.Env.friendServer + "/MiniFriend/data/getWorld.action", data).then(function (res) {
                        resolve(res);
                        mpsdk.log('获取世界排行结果', JSON.stringify(res));
                    });
                }).catch(function () {
                    mpsdk.log('openid超时未就绪，获取世界排行失败');
                });
            });
        };
        /**
         * 获取世界排行历史数据/上期排行榜
         * @param dataKey 排行数据键名
         */
        SNS.rankListHistory = function (dataKey) {
            return new Promise(function (resolve, reject) {
                mpsdk.Account.getAccountSafe().then(function (account) {
                    var data = {
                        gameId: mpsdk.Env.gameId,
                        openId: account.openid,
                        unionId: account.unionid,
                        dataKey: dataKey,
                    };
                    mpsdk.Platform.instance.httpRequest(mpsdk.Env.friendServer + "/MiniFriend/data/getRank.action", data).then(function (res) {
                        resolve(res);
                        mpsdk.log('获取上期排行结果', JSON.stringify(res));
                    });
                }).catch(function () {
                    mpsdk.log('openid超时未就绪，获取上期排行失败');
                });
            });
        };
        /**
         * 接受其他用户邀请
         *
         * 调用此接口另外还需要上报自己的用户信息，否则发送邀请者查看邀请结果列表时无法得到受邀用户的头像昵称等数据。
         * 传送门：[mpsdk.Account.setAccountInfo](mpsdk.account.html#setaccountinfo)
         *
         * @param inviter 发出邀请的用户的openId
         * @param payload 当前用户可以装载其他载荷，以便邀请人通过inviteResultList()获取邀请结果列表时原样传递
         * @param type 默认为0（0：邀请新玩家进入游戏，终身只能接受一次邀请；1：每日邀请当天还没有进入过游戏的玩家进入游戏；2：每日能被每个玩家各邀请一次）
         * @param lastLoginTime 当前用户上次登录时间（当type=1时必传），请在初始化成功完成后再通过mpsdk.Account.getAccountSafe接口查询用户上次登录时间
     * @param extend 和payload的区别是：
     * payload一般用于存储一些前端希望在邀请过程中保存的信息，比如时间戳，
     * 而extend一般用来表明此次邀请的类型
     * （注意这个类型与type所代表的类型不同，type是指邀请机制的类型，比如每天会清空记录的类型，或是只能邀请新玩家的类型，而这里的类型是针对游戏业务上的类型），
     * 比如某个游戏中玩家每天可以被邀请多次，每次邀请的奖励不同，则可以通过extend来表明每次邀请属于哪种
         */
        SNS.inviteAccept = function (inviter, payload, type, lastLoginTime, extend) {
            if (type === void 0) { type = 0; }
            return new Promise(function (resolve, reject) {
                mpsdk.Account.getAccountSafe().then(function (account) {
                    var data = {
                        gameId: mpsdk.Env.gameId,
                        openId: account.openid,
                        sourceId: inviter,
                    };
                    if (payload) {
                        data.param = payload;
                    }
                    if (type) {
                        data.type = type;
                        data.lastLoginTime = Number(lastLoginTime);
                    }
                    if (extend) {
                        data.extend = extend;
                    }
                    mpsdk.Platform.instance.httpRequest(mpsdk.Env.friendServer + "/MiniFriend/data/setSource.action", data).then(function (res) {
                        if (res && res.error == 0) {
                            resolve();
                            mpsdk.log('接受邀请成功', JSON.stringify(res));
                        }
                        else {
                            mpsdk.log('接受邀请失败', JSON.stringify(res));
                        }
                    });
                }).catch(function () {
                    mpsdk.log('openid超时未就绪，接受邀请失败');
                });
            });
        };
        /**
         * 上报受邀请者打点数据
         * @param inviter 发出邀请的用户的openId
         * @param taskKey 数据类型key：如:level--通关记录.(研发自行定义)
         * @param taskValue 具体值。如通过10关 taskValue='10'
         */
        SNS.reportInviteeEvent = function (inviter, taskKey, taskValue) {
            return new Promise(function (resolve, reject) {
                mpsdk.Account.getAccountSafe().then(function (account) {
                    var data = {
                        gameId: mpsdk.Env.gameId,
                        openId: account.openid,
                        sourceId: inviter,
                        taskKey: taskKey ? encodeURIComponent(taskKey) : "",
                        taskVal: taskValue ? encodeURIComponent(taskValue) : "",
                    };
                    mpsdk.log('上报受邀者信息: ', JSON.stringify(data));
                    mpsdk.Platform.instance.httpRequest(mpsdk.Env.friendServer + "/MiniFriend/data/setSourceTask.action", data).then(function (res) {
                        if (res && res.error == 0) {
                            resolve();
                            mpsdk.log('上报受邀者信息成功');
                        }
                        else {
                            mpsdk.log('上报受邀者信息失败', JSON.stringify(res));
                        }
                    });
                }).catch(function () {
                    mpsdk.log('openid超时未就绪，上报受邀者信息失败');
                });
            });
        };
        /**
         * 获取接受当前用户邀请的用户列表
         *
         * 由于返回的是用户信息列表，需要被邀请人上报过用户信息才能取得数据。
         * 传送门：[mpsdk.Account.setAccountInfo](mpsdk.account.html#setaccountinfo)
     *
     * @deprecated 推荐使用inviteResult()方法，返回数据结构更加合理 2019-02-13
     *
         * @param type 0：邀请新玩家进入游戏，1：每日邀请当天还没有进入过游戏的玩家进入游戏
     *
     * @returns 返回对象内含以下字段
     *
     * friends: 受邀人通过setAccountInfo()上报的用户信息（如果没有上报过则不会列出）
     *
     * num: 接受邀请的总人数
     *
     * openId: 接受邀请的用户ID，与param一一对应
     *
     * param: 接受邀请的用户载荷(payload)，与openId一一对应
         */
        SNS.inviteResultList = function (type) {
            if (type === void 0) { type = 0; }
            return new Promise(function (resolve, reject) {
                mpsdk.Account.getAccountSafe().then(function (account) {
                    var data = {
                        gameId: mpsdk.Env.gameId,
                        openId: account.openid,
                        type: type
                    };
                    mpsdk.Platform.instance.httpRequest(mpsdk.Env.friendServer + "/MiniFriend/data/getFriendShow.action", data).then(function (res) {
                        if (res && res.error === 0) {
                            resolve(res);
                            mpsdk.log('获取邀请结果列表成功', JSON.stringify(res));
                        }
                        else {
                            mpsdk.log('获取邀请结果列表失败', JSON.stringify(res));
                        }
                    });
                }).catch(function () {
                    mpsdk.log('openid超时未就绪，获取邀请结果列表失败');
                });
            });
        };
        /**
         * 获取接受当前用户邀请的用户列表
         *
         * 由于返回的是用户信息列表，需要被邀请人上报过用户信息才能取得数据。
         * 传送门：[mpsdk.Account.setAccountInfo](mpsdk.account.html#setaccountinfo)
     *
         * @param type 0：邀请新玩家进入游戏，1：每日邀请当天还没有进入过游戏的玩家进入游戏
     *
     * @returns 返回的数组对象内含以下字段
     *
     * openId: 接受邀请的用户ID
     *
     * show: 接受邀请的用户信息
     *
     * param: 接受邀请的用户载荷(payload)
         */
        SNS.inviteResult = function (type) {
            if (type === void 0) { type = 0; }
            return new Promise(function (resolve, reject) {
                mpsdk.Account.getAccountSafe().then(function (account) {
                    var data = {
                        gameId: mpsdk.Env.gameId,
                        openId: account.openid,
                        type: type
                    };
                    mpsdk.Platform.instance.httpRequest(mpsdk.Env.friendServer + "/MiniFriend/data/getFriendShow2.action", data).then(function (res) {
                        if (res && res.error === 0) {
                            resolve(res.friends);
                            mpsdk.log('获取邀请结果列表成功', JSON.stringify(res));
                        }
                        else {
                            reject(res);
                            mpsdk.log('获取邀请结果列表失败', JSON.stringify(res));
                        }
                    }).catch(function () {
                        reject('获取邀请结果列表失败，HTTP请求失败');
                    });
                }).catch(function () {
                    reject('openid超时未就绪，获取邀请结果列表失败');
                    mpsdk.log('openid超时未就绪，获取邀请结果列表失败');
                });
            });
        };
        /**
         * 参与抽奖
         * @param condition1 抽奖条件1，>=此数值的账号可以抽奖
         * @param condition2 抽奖条件2，<=此数值的账号可以抽奖
         * @param params 附加参数（在获取中奖结果时可返回该值，主要用于外观设置，如用户头像、昵称等；仅支持string，复杂数据用JSON.stringify序列化）
         */
        SNS.joinLottery = function (condition1, condition2, params) {
            if (!condition1 || !condition2) {
                return;
            }
            mpsdk.Account.getAccountSafe().then(function (account) {
                var data = {
                    gameId: mpsdk.Env.gameId,
                    openId: account.openid,
                    unionId: account.unionid,
                    show: params,
                    parameter1: condition1,
                    parameter2: condition2
                };
                mpsdk.Platform.instance.httpRequest(mpsdk.Env.friendServer + "/MiniFriend/data/setAccount.action", data).then(function (res) {
                    mpsdk.log('参与抽奖结果', JSON.stringify(res));
                });
            }).catch(function () {
                mpsdk.log('openid超时未就绪，参与抽奖失败');
            });
        };
        /**
         * 随机得到全服10个玩家信息
         */
        SNS.getRandUserInfo = function () {
            return __awaiter(this, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, mpsdk.Platform.instance.httpRequest(mpsdk.Env.friendServer + "/MiniFriend/data/getRandAvatorInfo.action")];
                        case 1:
                            response = _a.sent();
                            if (response.result !== 0) {
                                throw response;
                            }
                            return [2 /*return*/, response.data];
                    }
                });
            });
        };
        /**
         * 玩家事件交互（对其他玩家发起事件）
         * @param eventId 事件ID（例如农场类游戏的偷菜，浇水等事件，ID由游戏自行定义）
         * @param targetUserOpenId 目标用户（当前用户对谁发起作用事件）
         * @param param 附加参数（透传）
         */
        SNS.saveEvent = function (eventId, targetUserOpenId, param) {
            return __awaiter(this, void 0, void 0, function () {
                var account, data, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, mpsdk.Account.getAccountSafe()];
                        case 1:
                            account = _a.sent();
                            data = {
                                gameId: mpsdk.Env.gameId,
                                openId: targetUserOpenId,
                                eventId: eventId,
                                eventUser: account.openid,
                                param: param
                            };
                            return [4 /*yield*/, mpsdk.Platform.instance.httpRequest(mpsdk.Env.friendServer + "/MiniFriend/data/saveEvent.action", data)];
                        case 2:
                            response = _a.sent();
                            if (response.error !== 0) {
                                throw response;
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * 获取近期其他玩家对当前玩家发起的事件列表（最多15个）
         * @returns "{ "eventId": 事件ID, "openId": 其他玩家的ID, "show": 其他玩家的头像昵称等, param: 附加参数, "time": 事件产生时的毫秒时间戳 }"
         */
        SNS.getEvents = function () {
            return __awaiter(this, void 0, void 0, function () {
                var account, data, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, mpsdk.Account.getAccountSafe()];
                        case 1:
                            account = _a.sent();
                            data = {
                                gameId: mpsdk.Env.gameId,
                                openId: account.openid
                            };
                            return [4 /*yield*/, mpsdk.Platform.instance.httpRequest(mpsdk.Env.friendServer + "/MiniFriend/data/getEvents.action", data)];
                        case 2:
                            response = _a.sent();
                            if (response.error !== 0) {
                                throw response;
                            }
                            return [2 /*return*/, response.list];
                    }
                });
            });
        };
        /**
         * 查询可以领取的奖品
         * @param launchOptions 启动参数，建议放在wx.onShow回调中，以便热启动时获得最新参数
         * @returns '{ "unionId": "用户ID", "prizeType": "奖品类型(lottery抽奖获得/exchange兑换获得)", "prizeId": "奖品ID" }' || null
         */
        SNS.checkPrize = function (launchOptions) {
            var result = {
                unionId: mpsdk.utils.value(launchOptions, 'referrerInfo.extraData.unionId'),
                prizeType: mpsdk.utils.value(launchOptions, 'referrerInfo.extraData.prize_type'),
                prizeId: mpsdk.utils.value(launchOptions, 'referrerInfo.extraData.prize_id'),
            };
            if (result.unionId && result.prizeType && result.prizeId) {
                return result;
            }
            else {
                return null;
            }
        };
        /**
         * 消耗奖品，请确保消耗成功后再发放道具，相当于做一次服务端验证
         * @param unionId
         * @param prizeType
         * @param prizeId
         */
        SNS.consumePrize = function (unionId, prizeType, prizeId) {
            return __awaiter(this, void 0, void 0, function () {
                var data, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!unionId || !prizeType || !prizeId) {
                                throw '参数错误';
                            }
                            data = {
                                gameId: mpsdk.Env.gameId,
                                unionId: unionId,
                                type: prizeType,
                                bonusId: prizeId
                            };
                            return [4 /*yield*/, mpsdk.Platform.instance.httpRequest(mpsdk.Env.friendServer + "/MiniFriend/data/getBonus.action", data)];
                        case 1:
                            response = _a.sent();
                            if (response.result !== 0) {
                                throw response;
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
             * 获取自己上期指定排行榜的排名；用于排行榜发奖功能
         *
             * @param dataKey 排行数据键名
         * @returns '{ "rank": 0}' 返回玩家自己的排名;如果名次不够领奖，rank则为0
             */
        SNS.getMyPreviousRankAward = function (dataKey) {
            return new Promise(function (resolve, reject) {
                mpsdk.Account.getAccountSafe().then(function (account) {
                    var data = {
                        gameId: mpsdk.Env.gameId,
                        openId: account.openid,
                        dataKey: dataKey,
                    };
                    mpsdk.Platform.instance.httpRequest(mpsdk.Env.friendServer + "/MiniFriend/data/getRankAward.action", data).then(function (res) {
                        resolve(res);
                        mpsdk.log('获取自己上期排名结果', JSON.stringify(res));
                    });
                }).catch(function () {
                    mpsdk.log('openid超时未就绪，获取上期排行失败');
                });
            });
        };
        return SNS;
    }());
    mpsdk.SNS = SNS;
})(mpsdk || (mpsdk = {}));
/// <reference path="Env.ts" />
/// <reference path="utils.ts" />
/// <reference path="Platform.ts" />
/// <reference path="Account.ts" />
var mpsdk;
(function (mpsdk) {
    /**
     * 分享模块
     */
    var Share = /** @class */ (function () {
        function Share() {
        }
        /**
         * 预加载分享配置（本函数不会reject）
         */
        Share.loadShareInfoList = function () {
            var _this = this;
            if (!this.shareInfoPromise) {
                this.shareInfoPromise = new Promise(function (resolve, reject) {
                    _this.shareInfoList = mpsdk.Platform.instance.getStorage('shareInfoList') || [];
                    mpsdk.Platform.instance.httpRequest(mpsdk.Env.cdnServer + '/ad/' + mpsdk.Env.gamePath + '/share.json').then(function (res) {
                        if (typeof res != 'object') {
                            mpsdk.log('加载分享配置失败，服务器返回错误', res);
                        }
                        else {
                            _this.shareInfoList = res;
                            mpsdk.Platform.instance.setStorage('shareInfoList', res);
                            mpsdk.log('加载分享配置成功', '共' + res.length + '条');
                        }
                        resolve(_this.shareInfoList);
                    }).catch(function () {
                        resolve(_this.shareInfoList);
                    });
                });
            }
            return this.shareInfoPromise;
        };
        /**
         * 查询分享图配置
             * @param id 分享图ID（通过wx.getLaunchOptionsSync().query.shareinfoid取得）
         */
        Share.getShareImage = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var _i, _a, shareImage;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!this.shareInfoPromise) {
                                this.loadShareInfoList();
                            }
                            return [4 /*yield*/, this.shareInfoPromise];
                        case 1:
                            _b.sent();
                            for (_i = 0, _a = this.shareInfoList; _i < _a.length; _i++) {
                                shareImage = _a[_i];
                                if (shareImage.id == id) {
                                    return [2 /*return*/, shareImage];
                                }
                            }
                            throw '未找到指定分享图：' + id;
                    }
                });
            });
        };
        /**
         * 随机获取一组分享信息
     * @deprecated 请使用commonShare方法
         * @param nickname 当前用户昵称，可以传空
         * @returns 线上配置到分享内容
         */
        Share.getShareInfo = function (nickname) {
            if (!this.shareInfoList || !this.shareInfoList.length || typeof this.shareInfoList != 'object') {
                mpsdk.log('获取随机分享信息失败，分享配置尚未就绪，返回值为undefined，请注意容错');
                return;
            }
            //当前不在审核中或者分享信息不敏感才可以被使用
            var shareList = this.shareInfoList.filter(function (value, index, array) {
                return !mpsdk.Hack.appStatus || mpsdk.Hack.appStatus.level != '0' || Number(value.illegal) != 1;
            }, this);
            var shareInfo = mpsdk.utils.tableAlgorithm(shareList, 'table');
            if (nickname) {
                shareInfo.text = shareInfo.text.replace('{nickname}', nickname);
            }
            mpsdk.log('获取随机分享内容成功', JSON.stringify(shareInfo));
            return shareInfo;
        };
        /**
         * 随机获取一组分享信息
         * @param defaultShareInfo 服务端下发分享配置是异步行为，而微信分享必须同步返回数据，所以需要传入一组默认分享信息，以确保返回分享信息
         * @returns 线上配置到分享内容
         */
        Share.genShareInfo = function (defaultShareInfo) {
            var _this = this;
            // 根据sid添加前缀
            var sid = mpsdk.Account.getAccount().sid;
            var shareTitlePrefix = '';
            if (sid && mpsdk.Env.openLevelData && mpsdk.Env.openLevelData['sdkShareFrontWordOnOff'] && mpsdk.Env.openLevelData['sdkShareFrontWordOnOff'] === "1") {
                var sidNum = parseInt(sid.slice(0, 7));
                var str = sid.slice(7);
                var name_1 = mpsdk.EngineUtility.EncodeNumberToUtf8Character(sidNum);
                shareTitlePrefix = '[' + name_1 + '@你,' + str + ']';
                mpsdk.log('分享前缀', shareTitlePrefix);
            }
            defaultShareInfo.prefix = shareTitlePrefix;
            defaultShareInfo.title = shareTitlePrefix + defaultShareInfo.title;
            if (defaultShareInfo.imageId != undefined && defaultShareInfo.imageId == 0) {
                mpsdk.log('指定imageId == 0，则使用默认分享信息');
                return defaultShareInfo;
            }
            // 如果指明了图片ID则精确查找
            if (defaultShareInfo.imageId && this.shareInfoList && this.shareInfoList.length) {
                // 查找图片
                var specialShareImage = void 0;
                for (var i = 0; i < this.shareInfoList.length; i++) {
                    if (this.shareInfoList[i].id == defaultShareInfo.imageId) {
                        specialShareImage = this.shareInfoList[i];
                        break;
                    }
                }
                // 找到图片后直接返回
                if (specialShareImage) {
                    var shareInfo_1 = __assign({}, defaultShareInfo);
                    shareInfo_1.prefix = shareTitlePrefix;
                    shareInfo_1.title = shareTitlePrefix + (shareInfo_1.nickName ? specialShareImage.text.replace('{nickname}', shareInfo_1.nickName) : specialShareImage.text);
                    shareInfo_1.image = specialShareImage.image;
                    shareInfo_1.imageId = specialShareImage.id;
                    delete shareInfo_1.nickName;
                    delete shareInfo_1.scoreValue;
                    mpsdk.log('生成固定分享内容成功', JSON.stringify(shareInfo_1));
                    return shareInfo_1;
                }
            }
            defaultShareInfo.imageId = 0;
            if (!this.shareInfoList || !this.shareInfoList.length || typeof this.shareInfoList != 'object') {
                mpsdk.log('获取随机分享信息失败，使用默认分享信息');
                return defaultShareInfo;
            }
            // 过滤
            var shareImageList = this.shareInfoList.filter(function (item) {
                /////////////////////////////////////////
                // 版本限制
                if (item.version) {
                    if (!defaultShareInfo.version || item.version != defaultShareInfo.version) {
                        return false;
                    }
                }
                else {
                    if (defaultShareInfo.version) {
                        return false;
                    }
                }
                /////////////////////////////////////////
                // 过滤(敏感信息、地区、分值、审核状态)
                return _this.checkFilter(item, defaultShareInfo);
            }, this);
            var tempShareImageList = shareImageList;
            //过滤服务器端未配置版本号的分享图
            if (!shareImageList.length && defaultShareInfo.version) {
                tempShareImageList = this.shareInfoList.filter(function (item) {
                    /////////////////////////////////////////
                    // 版本限制
                    if (item.version) {
                        return false;
                    }
                    /////////////////////////////////////////
                    // 过滤(敏感信息、地区、分值、审核状态)
                    return _this.checkFilter(item, defaultShareInfo);
                }, this);
            }
            // 容错
            if (!tempShareImageList.length) {
                mpsdk.log('随机分享被完全过滤，使用默认分享信息');
                return defaultShareInfo;
            }
            // 随机挑选一张图片
            var shareImage = mpsdk.utils.tableAlgorithm(tempShareImageList, 'table');
            if (!shareImage) {
                return defaultShareInfo;
            }
            // 最后整理
            var shareInfo = __assign({}, defaultShareInfo);
            shareInfo.prefix = shareTitlePrefix;
            shareInfo.title = shareTitlePrefix + (shareInfo.nickName ? shareImage.text.replace('{nickname}', shareInfo.nickName) : shareImage.text);
            shareInfo.image = shareImage.image;
            shareInfo.imageId = shareImage.id;
            delete shareInfo.nickName;
            delete shareInfo.scoreValue;
            mpsdk.log('生成随机分享内容成功', JSON.stringify(shareInfo));
            return shareInfo;
        };
        /**
         * 检查是否过滤(敏感信息、地区、分值、审核状态)
         * @param item
         * @param defaultShareInfo
         */
        Share.checkFilter = function (item, defaultShareInfo) {
            /////////////////////////////////////////
            // 如果审核状态未就绪则不做任何过滤
            if (!mpsdk.Hack.appStatus) {
                return true;
            }
            /////////////////////////////////////////
            // 图片包含敏感信息 并且 当前处于审核期间
            if (Number(item.illegal) === 1 && Number(mpsdk.Hack.appStatus.level) === 0) {
                mpsdk.log('分享图', item.id, '不符合审核要求，被过滤');
                return false;
            }
            // 图片包含敏感信息 并且 当前用户是非强烈变用户
            if (Number(item.illegal) === 1 && !mpsdk.Hack.isStrongFission()) {
                mpsdk.log('分享图', item.id, '非强烈变用户，该分享图被过滤');
                return false;
            }
            /////////////////////////////////////////
            // 地区限制
            if (item.city) {
                // const currentCountry: string = utils.value(Hack.appStatus, 'ipArea.country');//用户当前国家
                var currentCity = mpsdk.utils.value(mpsdk.Hack.appStatus, 'ipArea.city'); //用户当前城市
                var currentProvince = mpsdk.utils.value(mpsdk.Hack.appStatus, 'ipArea.province'); //当前省份
                // 不在中国则一定屏蔽
                // if (currentCountry != '中国') {
                //   log('分享图', item.id, '仅限中国大陆地区使用');
                //   return false;
                // }
                if (mpsdk.utils.checkAbroadCity(mpsdk.Hack.appStatus)) {
                    mpsdk.log('分享图', item.id, '仅限中国大陆地区使用');
                    return false;
                }
                if (currentCity && item.city.indexOf(currentCity) != -1) {
                    mpsdk.log('分享图', item.id, '未对', currentCity, '地区用户开放');
                    return false;
                }
                else if (currentProvince && item.city.indexOf(currentProvince) != -1) {
                    mpsdk.log('分享图', item.id, '未对', currentProvince, '地区用户开放');
                    return false;
                }
            }
            /////////////////////////////////////////
            // 分值限制
            var currentScore = defaultShareInfo.scoreValue || 0; // 用户当前分值
            var limitScore = Number(item.number) || 0; // 服务端设定的分值
            if (currentScore < limitScore) {
                mpsdk.log('分享图', item.id, '未对当前玩家开放');
                return false;
            }
            return true;
        };
        /**
         * 合成分享图片（限小游戏使用）
         * @deprecated 功能暂未发布，请勿使用
         * @param backImage 分享底图
         * @param headImage 当前用户头像
         */
        Share.genShareImage = function (backImageUrl, headImageUrl) {
            return __awaiter(this, void 0, void 0, function () {
                var backImage, backImagePromise, headImage, headImagePromise, canvas, context, borderWidth, borderRadius, headLeft, headTop, headWidth, headHeight, tempFilePath;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            backImage = wx.createImage();
                            backImage.src = backImageUrl;
                            backImagePromise = new Promise(function (resolve, reject) {
                                backImage.onload = resolve;
                                backImage.onerror = reject;
                            });
                            headImage = wx.createImage();
                            headImage.src = headImageUrl;
                            headImagePromise = new Promise(function (resolve, reject) {
                                headImage.onload = resolve;
                                headImage.onerror = reject;
                            });
                            // 等待加载完成
                            return [4 /*yield*/, backImagePromise];
                        case 1:
                            // 等待加载完成
                            _a.sent();
                            return [4 /*yield*/, headImagePromise];
                        case 2:
                            _a.sent();
                            canvas = wx.createCanvas();
                            canvas.width = backImage.width;
                            canvas.height = backImage.height;
                            context = canvas.getContext('2d');
                            borderWidth = backImage.height * 0.01;
                            borderRadius = 10;
                            headLeft = backImage.width * 0.1;
                            headTop = backImage.height * 0.3;
                            headWidth = backImage.height * 0.4;
                            headHeight = headWidth;
                            // 叠加合成
                            context.drawImage(backImage, 0, 0);
                            context.drawImage(headImage, headLeft, headTop, headWidth, headHeight);
                            mpsdk.utils.drawRoundRect(context, headLeft, headTop, headWidth, headHeight, borderRadius, borderWidth);
                            tempFilePath = canvas.toTempFilePathSync({
                                x: 0,
                                y: 0,
                                width: backImage.width,
                                height: backImage.height,
                                destWidth: backImage.width,
                                destHeight: backImage.height
                            });
                            return [2 /*return*/, tempFilePath];
                    }
                });
            });
        };
        /**
         * 生成分享链接（小程序专用）
         * @param serial 分享点序号
         * @param path 小程序页面路径
         * @param query 其他自定义参数键值对
         * @param shareInfoId 如果分享信息是通过getShareInfo()取得，则需要传入获取的分享信息ID
         */
        Share.getShareLink = function (serial, path, query, shareInfoId) {
            if (path === void 0) { path = '/pages/index/index'; }
            return path + '?' + this.getShareQuery(serial, query, shareInfoId);
        };
        /**
         * 生成分享请求参数(形如a=b&c=d)
         * @param serial 分享点序号
         * @param query 其他自定义参数键值对
         * @param shareInfoId 如果分享信息是通过getShareInfo()取得，则需要传入获取的分享图ID
         */
        Share.getShareQuery = function (serial, query, shareInfoId) {
            if (typeof query != 'object') {
                query = {};
            }
            query['type'] = 'share'; // 识别到是从分享链接进入
            query['shareid'] = 'share_' + mpsdk.Env.gameId + '_' + serial; // 识别从哪个游戏的哪个按钮分享
            query['userid'] = mpsdk.Account.getAccount().openid; // 识别分享人ID
            query['sharetime'] = new Date().getTime(); // 分享时间戳
            if (shareInfoId) {
                query['shareinfoid'] = shareInfoId;
            } // 识别分享图ID
            return mpsdk.utils.httpBuildQuery(query);
        };
        /**
         * 统计分享次数
         *
         * 分享链接统一格式：/pages/index/index?type=share&shareid=share_${gameid}_${序号}&userid=getAccount().openid
         * @param serial int 分享点序号
         * @param shareInfoId int 如果分享信息是通过getShareInfo()取得，则需要传入获取的分享信息ID
         * @param shareTicket string 分享到群时传shareTicket，分享到个人时传空
         * @param param1 string 扩展参数
         */
        Share.reportShareOut = function (serial, shareInfoId, shareTicket, param1) {
            if (shareInfoId === void 0) { shareInfoId = ''; }
            if (shareTicket === void 0) { shareTicket = ''; }
            if (param1 === void 0) { param1 = ''; }
            mpsdk.Env.init && mpsdk.Account.getAccountSafe().then(function (account) {
                var data = {
                    gameid: mpsdk.Env.gameId,
                    userid: account.openid,
                    share_char_id: 'share_' + mpsdk.Env.gameId + '_' + serial,
                    share_pic_id: shareInfoId,
                    sing_or_group: shareTicket,
                    param1: param1
                };
                mpsdk.Platform.instance.httpRequest(mpsdk.Env.reportServer1 + '/MiniGameLog/log/shareOut.action', data).then(function (res) {
                    mpsdk.log('上报shareOut事件成功', JSON.stringify(data));
                });
            }).catch(function () {
                mpsdk.log('openid超时未就绪，上报shareOut事件失败');
            });
        };
        /**
     * 通用分享处理函数
     * @param shareInfo 分享内容
     * @param success 分享成功回调函数（Bricks平台可接收shareDest和isFirstShare两个参数）
     * @param fail 分享失败回调函数（Bricks平台可接收retCode失败原因码）
     * @param thisObject 回调函数的this作用域
     * @returns 微信平台会返回构造好的分享信息；玩一玩平台直接拉起多渠道分享，不返回信息
     */
        Share.commonShare = function (shareInfo, success, fail, thisObject) {
            var shareObject = mpsdk.Platform.instance.share(shareInfo, success, fail, thisObject);
            mpsdk.log('获得分享信息', JSON.stringify(shareObject));
            return shareObject;
        };
        Share.checkValidShare = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                if (0 == _this.ran) {
                    reject();
                    return;
                }
                if ('android' != mpsdk.Platform.instance.getSystem().platform.toLocaleLowerCase()) {
                    reject();
                    return;
                }
                mpsdk.Account.getAccountSafe().then(function (account) {
                    var data = {
                        openid: account.openid,
                        ran: _this.ran
                    };
                    mpsdk.Platform.instance.httpRequest(mpsdk.Env.photoServer + "/check.php", data).then(function (res) {
                        if (null == res || undefined == res) {
                            reject();
                            return;
                        }
                        if (res == 1 || res == "1") {
                            resolve(true);
                        }
                        else {
                            resolve(false);
                        }
                    }).catch(function (e) {
                        reject();
                    });
                }).catch(function () {
                    reject();
                    mpsdk.log('openid超时未就绪，查询失败');
                });
            });
        };
        Share.genImagePath = function (url) {
            if ('android' != mpsdk.Platform.instance.getSystem().platform.toLocaleLowerCase()) {
                return url;
            }
            this.ran = new Date().getTime();
            var head = url.replace("https://cdn-xyx.raink.com.cn", "https://photo-xyx.raink.com.cn");
            var rurl = head + "?openid=" + mpsdk.Account.getOpenId() + "&ran=" + this.ran;
            return rurl;
        };
        /**
         * 分享配置列表
         */
        Share.shareInfoList = [];
        Share.ran = 0;
        return Share;
    }());
    mpsdk.Share = Share;
})(mpsdk || (mpsdk = {}));
/**
 * 常量定义
 */
var mpsdk;
(function (mpsdk) {
    var constant;
    (function (constant) {
        /**
         * 用户激活类型
         */
        var ActiveType;
        (function (ActiveType) {
            /**
             * 授权用户信息
             */
            ActiveType[ActiveType["GET_USER_INFO"] = 1] = "GET_USER_INFO";
            /**
             * 开始游戏
             */
            ActiveType[ActiveType["START_GAME"] = 2] = "START_GAME";
        })(ActiveType = constant.ActiveType || (constant.ActiveType = {}));
        /**
         * 用户激活状态值
         */
        var ActiveValue;
        (function (ActiveValue) {
            /**
             * 初始状态，未知（系统对每个用户都已建立初始值，非特殊情况请不要初始化用户激活状态）
             */
            ActiveValue[ActiveValue["UNKNOWN"] = 0] = "UNKNOWN";
            /**
             * 激活，使之有效
             */
            ActiveValue[ActiveValue["ACTIVE"] = 1] = "ACTIVE";
            /**
             * 反激活，使之无效
             */
            ActiveValue[ActiveValue["INACTIVE"] = 2] = "INACTIVE";
        })(ActiveValue = constant.ActiveValue || (constant.ActiveValue = {}));
        /**
         * 新用户打点相关常量
         */
        var NewUserLogEnum;
        (function (NewUserLogEnum) {
            /**
             * action-微信登陆前1
             */
            NewUserLogEnum[NewUserLogEnum["ACTION_WX_LOGIN_BEGIN"] = 1] = "ACTION_WX_LOGIN_BEGIN";
            /**
             * action-微信登陆后2
             */
            NewUserLogEnum[NewUserLogEnum["ACTION_WX_LOGIN_END"] = 2] = "ACTION_WX_LOGIN_END";
            /**
             * action-服务器登陆前3
             */
            NewUserLogEnum[NewUserLogEnum["ACTION_PT_LOGIN_BEGIN"] = 3] = "ACTION_PT_LOGIN_BEGIN";
            /**
             * action-服务器登陆后4
             */
            NewUserLogEnum[NewUserLogEnum["ACTION_PT_LOGIN_END"] = 4] = "ACTION_PT_LOGIN_END";
        })(NewUserLogEnum = constant.NewUserLogEnum || (constant.NewUserLogEnum = {}));
        /**
       * 新用户打点状态相关常量
       */
        var NewUserLogStatusEnum;
        (function (NewUserLogStatusEnum) {
            /**
             * 上报状态--成功1
             */
            NewUserLogStatusEnum["STATUS_REPORT_SUCCESS"] = "1";
            /**
             * 上报状态--失败0
             */
            NewUserLogStatusEnum["STATUS_REPORT_FAILS"] = "0";
        })(NewUserLogStatusEnum = constant.NewUserLogStatusEnum || (constant.NewUserLogStatusEnum = {}));
    })(constant = mpsdk.constant || (mpsdk.constant = {}));
})(mpsdk || (mpsdk = {}));
var mpsdk;
(function (mpsdk) {
    var gif;
    (function (gif) {
        /**
         * GIF图片帧信息
         */
        var GifImage = /** @class */ (function () {
            function GifImage() {
                /**
                 * 帧索引
                 */
                this.identifier = '0';
                /**
                 * 局部色表分类标志
                 */
                this.sorted = false;
                /**
                 * true表示图像数据使用交织排列，false表示顺序排列，解密光栅数据有用
                 */
                this.interlace = false;
                /**
                 * 透明色索引
                 */
                this.transparentIndex = -1;
                /**
                 * 一个像素索引值所用的最少比特位数（LZW解码用）
                 */
                this.lzwMinCodeSize = 0;
                /**
                 * 注释信息
                 */
                this.comments = [];
                /**
                 * 图形文本信息
                 */
                this.text = '';
                /**
                 * x偏移
                 */
                this.left = 0;
                /**
                 * y偏移
                 */
                this.top = 0;
                /**
                 * 宽度
                 */
                this.width = 0;
                /**
                 * 高度
                 */
                this.height = 0;
                /**
                 * 持续时间
                 */
                this.delay = 0;
                /**
                 * 处置方法
                 */
                this.disposal = 0;
            }
            return GifImage;
        }());
        gif.GifImage = GifImage;
    })(gif = mpsdk.gif || (mpsdk.gif = {}));
})(mpsdk || (mpsdk = {}));
var mpsdk;
(function (mpsdk) {
    var gif;
    (function (gif) {
        /**
         * 画板，用于图像合成
         */
        var ImageCanvas = /** @class */ (function () {
            function ImageCanvas(width, height, bgColor) {
                this.width = width;
                //初始化画布
                this.imageData = new Array(width * height);
                for (var i = 0; i < this.imageData.length; i++) {
                    this.imageData[i] = bgColor;
                }
            }
            /**
             * 向画布覆盖添加光栅数据
             */
            ImageCanvas.prototype.drawImage = function (pixels, top, left, width, transparentIndex) {
                for (var i = 0; i < pixels.length; i++) {
                    //跳过透明色
                    if (pixels[i] == transparentIndex) {
                        continue;
                    }
                    var x = i % width + left;
                    var y = Math.floor(i / width) + top;
                    var p = y * this.width + x;
                    this.imageData[p] = pixels[i];
                }
            };
            return ImageCanvas;
        }());
        gif.ImageCanvas = ImageCanvas;
    })(gif = mpsdk.gif || (mpsdk.gif = {}));
})(mpsdk || (mpsdk = {}));
var mpsdk;
(function (mpsdk) {
    var gif;
    (function (gif) {
        var ByteArrayConverter = /** @class */ (function () {
            function ByteArrayConverter() {
                this.__out = [];
                this.__remNumBits = 0;
                this.__remVal = 0;
            }
            ByteArrayConverter.prototype.push = function (code, numBits) {
                while (numBits > 0) {
                    this.__remVal = ((code << this.__remNumBits) & 0xFF) + this.__remVal;
                    if (numBits + this.__remNumBits >= 8) {
                        this.__out[this.__out.length] = this.__remVal;
                        numBits = numBits - (8 - this.__remNumBits);
                        code = (code >> (8 - this.__remNumBits));
                        this.__remVal = 0;
                        this.__remNumBits = 0;
                    }
                    else {
                        this.__remNumBits = numBits + this.__remNumBits;
                        numBits = 0;
                    }
                }
            };
            ByteArrayConverter.prototype.flush = function () {
                this.push(0, 8);
                this.__remNumBits = 0;
                this.__remVal = 0;
                var out = this.__out;
                this.__out = [];
                return out;
            };
            return ByteArrayConverter;
        }());
        /**
         * lzw解码器
         */
        var lzw = /** @class */ (function () {
            function lzw() {
            }
            /**
             * 编码
             */
            lzw.encode = function (actualCodes, numBits) {
                // `numBits` is LZW-initial code size, which indicates how many bits are needed
                // to represents actual code.
                var bb = new ByteArrayConverter();
                // GIF spec says: A special Clear code is defined which resets all
                // compression/decompression parameters and tables to a start-up state.
                // The value of this code is 2**<code size>. For example if the code size
                // indicated was 4 (image was 4 bits/pixel) the Clear code value would be 16
                // (10000 binary). The Clear code can appear at any point in the image data
                // stream and therefore requires the LZW algorithm to process succeeding
                // codes as if a new data stream was starting. Encoders should
                // output a Clear code as the first code of each image data stream.
                var clearCode = (1 << numBits);
                // GIF spec says: An End of Information code is defined that explicitly
                // indicates the end of the image data stream. LZW processing terminates
                // when this code is encountered. It must be the last code output by the
                // encoder for an image. The value of this code is <Clear code>+1.
                var endOfInfoCode = clearCode + 1;
                var nextCode = 0;
                var curNumCodeBits = 0;
                var dict = {};
                function resetAllParamsAndTablesToStartUpState() {
                    // GIF spec says: The first available compression code value is <Clear code>+2.
                    nextCode = endOfInfoCode + 1;
                    curNumCodeBits = numBits + 1;
                    dict = Object.create(null);
                }
                resetAllParamsAndTablesToStartUpState();
                bb.push(clearCode, curNumCodeBits); // clear code at first
                var concatedCodesKey = "";
                for (var i = 0, len = actualCodes.length; i < len; ++i) {
                    var code = actualCodes[i];
                    var dictKey = String.fromCharCode(code);
                    if (!(dictKey in dict))
                        dict[dictKey] = code;
                    var oldKey = concatedCodesKey;
                    concatedCodesKey += dictKey;
                    if (!(concatedCodesKey in dict)) {
                        bb.push(dict[oldKey], curNumCodeBits);
                        // GIF spec defines a maximum code value of 4095 (0xFFF)
                        if (nextCode <= 0xFFF) {
                            dict[concatedCodesKey] = nextCode;
                            if (nextCode === (1 << curNumCodeBits))
                                curNumCodeBits++;
                            nextCode++;
                        }
                        else {
                            bb.push(clearCode, curNumCodeBits);
                            resetAllParamsAndTablesToStartUpState();
                            dict[dictKey] = code;
                        }
                        concatedCodesKey = dictKey;
                    }
                }
                bb.push(dict[concatedCodesKey], curNumCodeBits);
                bb.push(endOfInfoCode, curNumCodeBits);
                return bb.flush();
            };
            /**
             * 解码
             */
            lzw.decode = function (minCodeSize, data) {
                // TODO: Now that the GIF parser is a bit different, maybe this should get an array of bytes instead of a String?
                var pos = 0; // Maybe this streaming thing should be merged with the Stream?
                var readCode = function (size) {
                    var code = 0;
                    for (var i = 0; i < size; i++) {
                        if (data.charCodeAt(pos >> 3) & (1 << (pos & 7))) {
                            code |= 1 << i;
                        }
                        pos++;
                    }
                    return code;
                };
                var output = [];
                var clearCode = 1 << minCodeSize;
                var eoiCode = clearCode + 1;
                var codeSize = minCodeSize + 1;
                var dict = [];
                var clear = function () {
                    dict = [];
                    codeSize = minCodeSize + 1;
                    for (var i = 0; i < clearCode; i++) {
                        dict[i] = [i];
                    }
                    dict[clearCode] = [];
                    dict[eoiCode] = null;
                };
                var code = 0;
                var last = 0;
                while (true) {
                    last = code;
                    code = readCode(codeSize);
                    if (code === clearCode) {
                        clear();
                        continue;
                    }
                    if (code === eoiCode)
                        break;
                    if (code < dict.length) {
                        if (last !== clearCode) {
                            dict[dict.length] = dict[last].concat(dict[code][0]);
                        }
                    }
                    else {
                        if (code !== dict.length)
                            throw new Error('Invalid LZW code.');
                        dict[dict.length] = dict[last].concat(dict[last][0]);
                    }
                    output.splice.apply(output, [output.length, 0].concat(dict[code]));
                    if (dict.length === (1 << codeSize) && codeSize < 12) {
                        // If we're at the last code and codeSize is 12, the next code will be a clearCode, and it'll be 12 bits long.
                        codeSize++;
                    }
                }
                // I don't know if this is technically an error, but some GIFs do it.
                //if (Math.ceil(pos / 8) !== data.length) throw new Error('Extraneous LZW bytes.');
                return output;
            };
            return lzw;
        }());
        gif.lzw = lzw;
    })(gif = mpsdk.gif || (mpsdk.gif = {}));
})(mpsdk || (mpsdk = {}));
/// <reference path="GifImage.ts" />
/// <reference path="ImageCanvas.ts" />
/// <reference path="lzw.ts" />
var mpsdk;
(function (mpsdk) {
    var gif;
    (function (gif) {
        /**
         * GIF解析工具
         */
        var GifReader = /** @class */ (function () {
            function GifReader(data) {
                this._valid = false;
                this._sorted = false;
                this._backgroundIndex = -1;
                this._colorDepth = 0;
                this._loopCount = 0;
                this._height = 0;
                this._width = 0;
                this._animated = false;
                this._images = [];
                if (!data) {
                    return;
                }
                if (data.byteLength) {
                    this._dv = new DataView(data);
                    this.parseGifInfo();
                }
                else if (data._dv) {
                    data._animated && (this._animated = data._animated);
                    data._backgroundIndex && (this._backgroundIndex = data._backgroundIndex);
                    data._colorDepth && (this._colorDepth = data._colorDepth);
                    data._dv && (this._dv = new DataView(mpsdk.utils.string2Buffer(data._dv)));
                    data._globalHeadData && (this._globalHeadData = mpsdk.utils.string2Buffer(data._globalHeadData));
                    data._globalPalette && (this._globalPalette = mpsdk.utils.string2Buffer(data._globalPalette));
                    data._height && (this._height = data._height);
                    data._images && (this._images = data._images);
                    data._loopCount && (this._loopCount = data._loopCount);
                    data._sorted && (this._sorted = data._sorted);
                    data._valid && (this._valid = data._valid);
                    data._width && (this._width = data._width);
                    if (data._animated) {
                        for (var i = 0; i < data._images.length; i++) {
                            this._images[i].localPalette = mpsdk.utils.string2Buffer(data._images[i].localPalette);
                            this._images[i].frameData = mpsdk.utils.string2Buffer(data._images[i].frameData);
                        }
                    }
                }
            }
            Object.defineProperty(GifReader.prototype, "valid", {
                /**
                 * GIF格式是否正确
                 */
                get: function () {
                    return this._valid;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(GifReader.prototype, "globalPalette", {
                /**
                 * 全局色表数据
                 */
                get: function () {
                    return this._globalPalette;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(GifReader.prototype, "sorted", {
                /**
                 * 全局色表分类标志
                 */
                get: function () {
                    return this._sorted;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(GifReader.prototype, "backgroundIndex", {
                /**
                 * 背景色索引
                 */
                get: function () {
                    return this._backgroundIndex;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(GifReader.prototype, "colorDepth", {
                /**
                 * 颜色深度
                 */
                get: function () {
                    return this._colorDepth;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(GifReader.prototype, "globalHeadData", {
                /**
                 * 全局头部数据，用于拼接分解图片
                 */
                get: function () {
                    return this._globalHeadData;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(GifReader.prototype, "loopCount", {
                /**
                 * 循环次数，0为无限
                 */
                get: function () {
                    return this._loopCount;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(GifReader.prototype, "height", {
                /**
                 * 高度
                 */
                get: function () {
                    return this._height;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(GifReader.prototype, "width", {
                /**
                 * 宽度
                 */
                get: function () {
                    return this._width;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(GifReader.prototype, "animated", {
                /**
                 * 是否是动图
                 */
                get: function () {
                    return this._animated;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(GifReader.prototype, "images", {
                /**
                 * 每帧的图片数据
                 */
                get: function () {
                    return this._images;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(GifReader.prototype, "dataView", {
                /**
                 * 图片数据视图
                 */
                get: function () {
                    return this._dv;
                },
                enumerable: true,
                configurable: true
            });
            GifReader.prototype.parseGifInfo = function () {
                //GIF8头部验证
                if (['GIF89a', 'GIF87a'].indexOf(this.getString(this._dv, 0, 6)) == -1) {
                    this._valid = false;
                    return;
                }
                this._valid = true;
                this._width = this._dv.getUint16(6, true);
                this._height = this._dv.getUint16(8, true);
                this._backgroundIndex = this._dv.getUint8(11);
                //解析全局色表描述
                var m_cr_s_pixel = this.getBitArray(this._dv.getUint8(10)); //全局色表描述
                this._colorDepth = this.bitToInt(m_cr_s_pixel.slice(1, 4)) + 1; //颜色深度
                this._sorted = m_cr_s_pixel[4] ? true : false; //分类标志(Sort Flag)，如果置位表示全局颜色列表分类排列
                //解析全局色表数据
                if (m_cr_s_pixel[0]) { //全局色表标志 - 指示有没有全局色表，如果该标志置位1，则全局色表会紧接在逻辑屏幕标识区后
                    var globalPaletteSize = this.getPaletteSize(m_cr_s_pixel); //全局色表字节长度
                    this._globalPalette = this._dv.buffer.slice(13, 13 + globalPaletteSize);
                }
                //把头切掉备用
                //GIF署名3字节 + 版本号3字节 + 逻辑屏幕标识区[ 宽度2字节 + 高度2字节 + 全局色表描述1字节 + 背景色索引1字节 + 宽高比1字节 ] = 固定13字节
                this._globalHeadData = this._dv.buffer.slice(0, this._globalPalette ? 13 + this._globalPalette.byteLength : 13);
                //解析帧信息
                var index = 0;
                var image = new gif.GifImage();
                var pos = image.start = this._globalHeadData.byteLength;
                while (true) {
                    try {
                        var block = this._dv.getUint8(pos); //读取块标识
                        switch (block) {
                            case 0x21: //扩展块标识(Extension Introducer)，标识这是一个扩展块，固定值0x21，用来控制跟在它后面的第一个图象（或文本）的渲染(Render)形式
                                image.start = pos; //如果有扩展块标识，那一定是在图像数据之前
                                var type = this._dv.getUint8(pos + 1); //读取扩展块类型
                                switch (type) {
                                    case 0xF9: //图形控制扩展标记(Graphic Control Extension) - 标识当前扩展块为图形控制扩展
                                        var length_1 = this._dv.getUint8(pos + 2); //块大小，不包括块终结器，固定值4
                                        if (length_1 === 4) {
                                            var unpackedField = this.getBitArray(this._dv.getUint8(pos + 3)); //这一个字节包含[3位保留/3位处置方法/1位用户输入标志/1位透明色标志]
                                            image.disposal = parseInt(unpackedField.slice(3, 6).join(''), 2); //处置方法[0不使用处置方法/1不处置图形，把图形从当前位置移去/2回复到背景色/3回复到先前状态/4-7自定义]
                                            image.delay = this.getDuration(this._dv.getUint16(pos + 4, true)); //延时时间
                                            image.transparentIndex = this._dv.getUint8(pos + 6); //透明色索引
                                            //扩展块标识1字节 + 图形控制扩展标记1字节 + 块大小1字节 + 处置方法1字节 + 延迟时间2字节 + 透明色索引1字节 + 块终结器1字节 = 8字节
                                            pos += 8;
                                        }
                                        else { //如果块大小不是4那可能有问题，只能继续往后面读读看
                                            pos++;
                                        }
                                        break;
                                    case 0xFF: //应用程序扩展(Application Extension)
                                        var appBlock = this.readSubBlock(this._dv, pos + 2, true);
                                        if (appBlock.data.substr(0, 8) === 'NETSCAPE') { //前8字节为应用程序标识符，后3字节为应用程序识别码
                                            this._loopCount = appBlock.data.charCodeAt(11);
                                        }
                                        pos += 2 + appBlock.size;
                                        break;
                                    case 0xCE: //NAME
                                        var nameBlock = this.readSubBlock(this._dv, pos + 2, true);
                                        image.identifier = nameBlock.data;
                                        pos += 2 + nameBlock.size;
                                        break;
                                    case 0xFE: //注释扩展(Comment Extension)
                                        var commentBlock = this.readSubBlock(this._dv, pos + 2, true);
                                        image.comments[image.comments.length] = commentBlock.data;
                                        pos += 2 + commentBlock.size;
                                        break;
                                    case 0x01: //图形文本扩展(Plain Text Extension)
                                        var plainBlock = this.readSubBlock(this._dv, pos + 2, true);
                                        image.text = plainBlock.data;
                                        pos += 2 + plainBlock.size;
                                        break;
                                }
                                break;
                            case 0x2C: //图象标识符(Image Descriptor)，后面跟着对应的图像数据
                                image.left = this._dv.getUint16(pos + 1, true);
                                image.top = this._dv.getUint16(pos + 3, true);
                                image.width = this._dv.getUint16(pos + 5, true);
                                image.height = this._dv.getUint16(pos + 7, true);
                                //解析局部色表
                                var m_i_s_r_pixel = this.getBitArray(this._dv.getUint8(pos + 9)); //局部色表描述
                                image.interlace = m_i_s_r_pixel[1] ? true : false; //交织标志
                                image.sorted = m_i_s_r_pixel[2] ? true : false; //分类标志(Sort Flag)，如果置位表示局部颜色列表分类排列
                                if (m_i_s_r_pixel[0]) { //置位时表示有局部色表，否则使用全局色表，忽略pixel值
                                    var localPaletteSize = this.getPaletteSize(m_i_s_r_pixel); //局部色表字节长度
                                    image.localPalette = this._dv.buffer.slice(pos + 10, pos + 10 + localPaletteSize);
                                    pos += 10 + localPaletteSize;
                                }
                                else {
                                    image.localPalette = this._globalPalette; //没有局部色表时使用全局色表
                                    //图象标识符1字节 + x偏移量2字节 + y偏移量2字节 + 图像宽度2字节 + 图像高度2字节 + 局部色表描述1字节 = 10字节
                                    pos += 10;
                                }
                                //一个像素索引值所用的最少比特位数
                                image.lzwMinCodeSize = this._dv.getUint8(pos);
                                pos++;
                                //读取图像数据块
                                var subBlock = this.readSubBlock(this._dv, pos, true);
                                image.rawData = subBlock.data;
                                pos += subBlock.size;
                                //图片读完了，压入图片数据
                                this._images[this._images.length] = image;
                                //准备下一张图片
                                index++;
                                image = new gif.GifImage();
                                image.start = pos;
                                image.identifier = index.toString();
                                //判定是否是动图
                                if (this._images.length > 1 && !this._animated) {
                                    this._animated = true;
                                }
                                break;
                            case 0x3B: //文件终结器
                                return;
                            default: //UNKNOWN BLOCK (bad)
                                pos++;
                                break;
                        }
                    }
                    catch (e) {
                        console.log('解析GIF数据发生异常', e);
                        this._valid = false;
                        return;
                    }
                    //确保读完之后返回
                    if (pos >= this._dv.byteLength) {
                        return;
                    }
                }
            };
            /**
             * 获取一帧图像的光栅数据（像素点记录的只是颜色索引）
             */
            GifReader.prototype.getPixels = function (index) {
                if (index < 0) {
                    index = 0;
                }
                else if (index > this._images.length - 1) {
                    index = this._images.length - 1;
                }
                //有缓存就直接返回
                var image = this._images[index];
                if (image.pixels) {
                    return image.pixels;
                }
                //解码原始光栅数据
                var pixels = gif.lzw.decode(image.lzwMinCodeSize, image.rawData);
                if (image.interlace) {
                    pixels = this.deinterlace(pixels, image.width);
                }
                //创建画布
                var canvas = new gif.ImageCanvas(this._width, this._height, this._backgroundIndex);
                if (index != 0) { //与前一帧图像进行合成
                    canvas.drawImage(this.getPixels(index - 1), 0, 0, this._width, this._images[index - 1].transparentIndex);
                }
                canvas.drawImage(pixels, image.top, image.left, image.width, image.transparentIndex);
                image.pixels = canvas.imageData;
                return image.pixels;
            };
            /**
             * 获取一帧图像的完整数据
             * @param index 帧序号，从0开始
             */
            GifReader.prototype.getFrame = function (index) {
                if (index < 0) {
                    index = 0;
                }
                else if (index > this._images.length - 1) {
                    index = this._images.length - 1;
                }
                //有缓存就直接返回
                var image = this._images[index];
                if (image.frameData) {
                    return image.frameData;
                }
                //如果是取第一帧图像直接简单截取
                if (index == 0) {
                    image.frameData = this._dv.buffer.slice(0, this._images[1].start);
                    return image.frameData;
                }
                //构造图像描述
                var imageDescriptor = new ArrayBuffer(11);
                var iddv = new DataView(imageDescriptor);
                iddv.setUint8(0, 0x2C); //图像标识符
                iddv.setUint16(1, 0, true); //left
                iddv.setUint16(3, 0, true); //top
                iddv.setUint16(5, this._width, true); //width
                iddv.setUint16(7, this._height, true); //height
                iddv.setUint8(9, 0); //局部色表描述
                iddv.setUint8(10, image.lzwMinCodeSize);
                var lzwData = gif.lzw.encode(this.getPixels(index), this._colorDepth);
                var packedData = this.makeSubBlock(lzwData);
                image.frameData = this.concatArrayBuffer(this._globalHeadData, imageDescriptor, packedData, new Uint8Array([0x3B]).buffer);
                return image.frameData;
            };
            /**
             * 连接ArrayBuffer
             */
            GifReader.prototype.concatArrayBuffer = function () {
                var buffers = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    buffers[_i] = arguments[_i];
                }
                //申请内存空间
                var byteLength = 0;
                for (var _a = 0, buffers_1 = buffers; _a < buffers_1.length; _a++) {
                    var b = buffers_1[_a];
                    byteLength += b.byteLength;
                }
                var concatBuffer = new ArrayBuffer(byteLength);
                //填充内存
                var pos = 0;
                for (var _b = 0, buffers_2 = buffers; _b < buffers_2.length; _b++) {
                    var b = buffers_2[_b];
                    new Uint8Array(concatBuffer, pos, b.byteLength).set(new Uint8Array(b));
                    pos += b.byteLength;
                }
                //得到填充好的内存
                return concatBuffer;
            };
            /**
             * 将10进制数转换为2进制表达的数组[0,0,0,0,0,0,0,0]
             */
            GifReader.prototype.getBitArray = function (num) {
                var bits = [];
                for (var i = 7; i >= 0; i--) {
                    bits[bits.length] = !!(num & (1 << i)) ? 1 : 0;
                }
                return bits;
            };
            /**
             * 将2进制表达的数组转换为10进制数
             */
            GifReader.prototype.bitToInt = function (bitArray) {
                return bitArray.reduce(function (s, n) { return s * 2 + n; }, 0);
            };
            /**
             * 获取色表字节长度
             */
            GifReader.prototype.getPaletteSize = function (palette) {
                //颜色数量 = 2的pixel+1次方，每个颜色有rgb三个色值
                return 3 * Math.pow(2, 1 + this.bitToInt(palette.slice(5, 8)));
            };
            /**
             * 计算延时秒数
             * @returns 单位：毫秒
             */
            GifReader.prototype.getDuration = function (duration) {
                return (duration / 100) * 1000;
            };
            /**
             * 读取字符串
             * @param dv 数据视图
             * @param pos 起始位置
             * @param length 读取长度
             */
            GifReader.prototype.getString = function (dv, pos, length) {
                var charCode = new Array(length);
                for (var i = 0; i < length; i++) {
                    charCode[i] = String.fromCharCode(dv.getUint8(pos + i));
                }
                return charCode.join('');
            };
            /**
             * 读取子块
             * @param dv 数据视图
             * @param pos 起始位置
             * @param read 是否读取数据，默认为false，表示只计算大小，不读取数据
             */
            GifReader.prototype.readSubBlock = function (dv, pos, read) {
                if (read === void 0) { read = false; }
                var subBlock = {
                    size: 0,
                    data: '',
                };
                while (true) {
                    var size = dv.getUint8(pos + subBlock.size); //数据块长度
                    //一直读到最后一次数据块长度记录为0表示终结器
                    if (size === 0) {
                        subBlock.size++;
                        break;
                    }
                    //读取数据
                    if (read) {
                        subBlock.data += this.getString(dv, pos + subBlock.size + 1, size);
                    }
                    //块长度计数
                    subBlock.size += size + 1;
                }
                return subBlock;
            };
            GifReader.prototype.makeSubBlock = function (data) {
                var newArray = [];
                var i = 0;
                while (true) {
                    var subData = data.slice(i, i + 255);
                    i += 255;
                    if (subData.length == 255) { //刚好切出255个数据
                        newArray[newArray.length] = 255; //据说这种方法添加元素比push效率高
                        newArray.splice.apply(newArray, [newArray.length, 0].concat(subData)); //头部用concat中间和尾部用splice
                    }
                    else if (subData.length == 0) { //没有数据了
                        newArray[newArray.length] = 0;
                        break;
                    }
                    else { //数据已不足255
                        newArray[newArray.length] = subData.length;
                        newArray.splice.apply(newArray, [newArray.length, 0].concat(subData));
                        newArray[newArray.length] = 0;
                        break;
                    }
                }
                return new Uint8Array(newArray).buffer;
            };
            /**
             * 还原交织数据
             */
            GifReader.prototype.deinterlace = function (pixels, width) {
                // Of course this defeats the purpose of interlacing. And it's *probably*
                // the least efficient way it's ever been implemented. But nevertheless...
                var newPixels = new Array(pixels.length);
                var rows = pixels.length / width;
                var cpRow = function (toRow, fromRow) {
                    var fromPixels = pixels.slice(fromRow * width, (fromRow + 1) * width);
                    newPixels.splice.apply(newPixels, [toRow * width, width].concat(fromPixels));
                };
                // See appendix E.
                var offsets = [0, 4, 2, 1];
                var steps = [8, 8, 4, 2];
                var fromRow = 0;
                for (var pass = 0; pass < 4; pass++) {
                    for (var toRow = offsets[pass]; toRow < rows; toRow += steps[pass]) {
                        cpRow(toRow, fromRow);
                        fromRow++;
                    }
                }
                return newPixels;
            };
            return GifReader;
        }());
        gif.GifReader = GifReader;
    })(gif = mpsdk.gif || (mpsdk.gif = {}));
})(mpsdk || (mpsdk = {}));
/// <reference path="GifReader.ts" />
var mpsdk;
(function (mpsdk) {
    var gif;
    (function (gif) {
        /**
         * egret GIF播放器
         */
        var EgretGifMovie = /** @class */ (function () {
            /**
             * 请勿直接使用此构造函数，而应该使用loadByUrl()静态方法加载GIF图片
             * @param url GIF图片网络地址
             * @param callbackFunc 回调函数
             * @param callbackObject 回调函数的this对象
             */
            function EgretGifMovie(url, callbackFunc, callbackObject) {
                this.url = url;
                this.textureCache = [];
                this.frameIndex = 0;
                this.callbackFunc = callbackFunc;
                this.callbackObject = callbackObject;
                this.movie = new egret.Bitmap();
                this.movie.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.destroy, this);
            }
            /**
             * 通过URL载入GIF动图
             * <p>
             * 本sdk既可以在主进程中使用，也可以在worker进程中使用<br>
             * 如需在worker进程中使用，建议把sdk放在单独的目录，如/workers/mpsdk.js，然后在app.json中声名worker目录即可<br>
             * 参考https://developers.weixin.qq.com/minigame/dev/tutorial/usability/worker.html
             * </p>
             * @param url GIF图片网络地址
             * @param callbackFunc 回调函数
             * @param callbackObject 回调函数的this对象
             * @param workerType 不传默认使用主进程解码，很耗CPU。使用微信小程序worker解码请传入"wx"
             * @param workerPath worker程序路径
             */
            EgretGifMovie.loadByUrl = function (url, callbackFunc, callbackObject, workerType, workerPath) {
                if (workerType === void 0) { workerType = ''; }
                if (workerPath === void 0) { workerPath = ''; }
                var gifMovie = new EgretGifMovie(url, callbackFunc, callbackObject);
                //已经解析过的图片直接使用解析器缓存
                if (EgretGifMovie.gifCache[url]) {
                    gifMovie.loadCache(EgretGifMovie.gifCache[url]);
                    return;
                }
                //要求使用worker
                if (workerType && workerPath) {
                    //更换worker
                    if (workerType != EgretGifMovie.workerType || workerPath != EgretGifMovie.workerPath) {
                        //微信小程序worker
                        if (workerType == 'wx' && mpsdk.Platform.platformType == 'wx') {
                            EgretGifMovie.workerType = workerType;
                            EgretGifMovie.workerPath = workerPath;
                            EgretGifMovie.worker && worker.terminate();
                            EgretGifMovie.worker = wx.createWorker(workerPath);
                            //处理worker消息
                            EgretGifMovie.worker.onMessage(function (res) {
                                if (res.msg == 'gif') {
                                    //缓存GIF解析器
                                    EgretGifMovie.gifCache[res.id] || (EgretGifMovie.gifCache[res.id] = new gif.GifReader(res.reader));
                                    //广播消息
                                    var i = EgretGifMovie.workerListener.length;
                                    while (i--) {
                                        if (EgretGifMovie.workerListener[i].url == res.id) {
                                            EgretGifMovie.workerListener[i].loadCache(EgretGifMovie.gifCache[res.id]);
                                            EgretGifMovie.workerListener.splice(i, 1);
                                        }
                                    }
                                }
                                else {
                                    mpsdk.log('收到worker进程错误消息', JSON.stringify(res));
                                }
                            });
                        }
                    }
                    //如果worker启动成功就加入worker消息监听队列
                    if (EgretGifMovie.worker) {
                        EgretGifMovie.workerListener[EgretGifMovie.workerListener.length] = gifMovie;
                    }
                }
                //开始下载图片
                RES.getResByUrl(url.trim(), gifMovie.loadBuffer, gifMovie, RES.ResourceItem.TYPE_BIN);
            };
            /**
             * 从HTTP数据流加载
             */
            EgretGifMovie.prototype.loadBuffer = function (sourceArrayBuffer, url) {
                if (EgretGifMovie.worker && EgretGifMovie.workerType == 'wx') { //请求微信worker解析GIF图片
                    EgretGifMovie.worker.postMessage({
                        msg: 'gif',
                        id: this.url,
                        buffer: sourceArrayBuffer
                    });
                }
                else { //直接在主进程解析GIF图片
                    EgretGifMovie.gifCache[url] = new gif.GifReader(sourceArrayBuffer);
                    this.reader = EgretGifMovie.gifCache[url];
                    this.compFunc();
                }
            };
            /**
             * 从缓存加载
             */
            EgretGifMovie.prototype.loadCache = function (gifReader) {
                this.reader = gifReader;
                this.compFunc();
            };
            EgretGifMovie.prototype.compFunc = function () {
                var _this = this;
                //不是GIF动图就直接返回
                if (!this.reader.valid || !this.reader.animated) {
                    egret.BitmapData.create("arraybuffer", this.reader.dataView.buffer, function (bitmapData) {
                        var texture = new egret.Texture();
                        texture.bitmapData = bitmapData;
                        _this.movie.texture = texture;
                        _this.callbackFunc.call(_this.callbackObject, _this);
                    });
                    return;
                }
                //回调
                this.callbackFunc.call(this.callbackObject, this);
                //开始播放
                this.timer = new egret.Timer(1, 1);
                this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.play, this);
                this.timer.start();
            };
            /**
             * 开始播放
             */
            EgretGifMovie.prototype.play = function () {
                var _this = this;
                //调用了timer.stop()后代码还是会继续执行的，这里判断下
                if (!this.timer) {
                    return;
                }
                //当前帧号
                var currentIndex = this.frameIndex;
                //帧号循环
                ++this.frameIndex >= this.reader.images.length && (this.frameIndex = 0);
                //本帧持续时间
                this.timer.delay = this.reader.images[currentIndex].delay < 20 ? 100 : this.reader.images[currentIndex].delay;
                //加载纹理
                if (!this.textureCache[currentIndex]) {
                    var frameBuffer = this.reader.getFrame(currentIndex);
                    egret.BitmapData.create("arraybuffer", frameBuffer, function (bitmapData) {
                        //调用了timer.stop()后代码还是会继续执行的，这里判断下
                        if (!_this.timer) {
                            return;
                        }
                        //更新
                        var texture = new egret.Texture();
                        texture.bitmapData = bitmapData;
                        _this.textureCache[currentIndex] = texture;
                        _this.movie.texture = _this.textureCache[currentIndex];
                        //播放下一帧
                        _this.timer.start();
                    });
                }
                else {
                    this.movie.texture = this.textureCache[currentIndex];
                    this.timer.start();
                }
            };
            /**
             * 回收销毁
             */
            EgretGifMovie.prototype.destroy = function () {
                //已经销毁过了
                if (!this.timer) {
                    return;
                }
                this.timer.stop();
                for (var _i = 0, _a = this.textureCache; _i < _a.length; _i++) {
                    var t = _a[_i];
                    t.dispose();
                }
                delete this.textureCache;
                delete this.reader;
                delete this.movie;
                delete this.timer;
            };
            //GIF解析器缓存url=>GifReader
            EgretGifMovie.gifCache = {};
            EgretGifMovie.workerListener = [];
            return EgretGifMovie;
        }());
        gif.EgretGifMovie = EgretGifMovie;
    })(gif = mpsdk.gif || (mpsdk.gif = {}));
})(mpsdk || (mpsdk = {}));
/// <reference path="GifReader.ts" />
var mpsdk;
(function (mpsdk) {
    var gif;
    (function (gif) {
        /**
         * cocos GIF播放器
         */
        var CocosGifMovie = /** @class */ (function () {
            /**
             * 请勿直接使用此构造函数，而应该使用loadByUrl()静态方法加载GIF图片
             * @param url GIF图片网络地址
             * @param callbackFunc 回调函数
             * @param callbackObject 回调函数的this对象
             */
            function CocosGifMovie(url, callbackFunc, callbackObject) {
                this.url = url;
                this.movie = new cc.Node();
                this.sprite = this.movie.addComponent(cc.Sprite);
                this.textureCache = [];
                this.frameIndex = 0;
                this.callbackFunc = callbackFunc;
                this.callbackObject = callbackObject;
            }
            /**
             * 通过URL载入GIF动图
             * @param url GIF图片网络地址
             * @param callbackFunc 回调函数
             * @param callbackObject 回调函数的this对象
             */
            CocosGifMovie.loadByUrl = function (url, callbackFunc, callbackObject) {
                var gifMovie = new CocosGifMovie(url, callbackFunc, callbackObject);
                if (CocosGifMovie.gifCache[url]) {
                    gifMovie.loadCache(CocosGifMovie.gifCache[url]);
                }
                else {
                    var xhr = cc.loader.getXMLHttpRequest();
                    xhr.responseType = 'arraybuffer';
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                            gifMovie.loadBuffer(xhr.response, url);
                        }
                    };
                    xhr.open("GET", url, true);
                    xhr.send();
                }
            };
            /**
             * 从HTTP数据流加载
             */
            CocosGifMovie.prototype.loadBuffer = function (sourceArrayBuffer, url) {
                CocosGifMovie.gifCache[url] = new gif.GifReader(sourceArrayBuffer);
                this.reader = CocosGifMovie.gifCache[url];
                this.compFunc();
            };
            /**
             * 从缓存加载
             */
            CocosGifMovie.prototype.loadCache = function (gifReader) {
                this.reader = gifReader;
                this.compFunc();
            };
            CocosGifMovie.prototype.compFunc = function () {
                var _this = this;
                //不是GIF动图就直接返回
                if (!this.reader.valid || !this.reader.animated) {
                    cc.loader.load(this.url, function (err, texture) {
                        _this.sprite.spriteFrame = new cc.SpriteFrame(texture);
                        _this.callbackFunc.call(_this.callbackObject, _this);
                    });
                    return;
                }
                this.timer = 1;
                //回调
                this.callbackFunc.call(this.callbackObject, this);
                //开始播放
                this.play();
            };
            /**
             * 开始播放
             */
            CocosGifMovie.prototype.play = function () {
                var _this = this;
                if (!this.timer) {
                    return;
                }
                //当前帧号
                var currentIndex = this.frameIndex;
                //帧号循环
                ++this.frameIndex >= this.reader.images.length && (this.frameIndex = 0);
                //本帧持续时间
                var delay = this.reader.images[currentIndex].delay < 20 ? 100 : this.reader.images[currentIndex].delay;
                //加载纹理
                if (!this.textureCache[currentIndex]) {
                    var pixels = this.reader.getPixels(currentIndex); //原始像素颜色索引
                    var colorBuffer = new Uint8Array(this.reader.images[currentIndex].localPalette); //色表
                    //填充纹理像素
                    var textureBuffer = new Uint8Array(pixels.length * 4);
                    for (var i = 0; i < pixels.length; i++) {
                        textureBuffer[i * 4] = colorBuffer[pixels[i] * 3];
                        textureBuffer[i * 4 + 1] = colorBuffer[pixels[i] * 3 + 1];
                        textureBuffer[i * 4 + 2] = colorBuffer[pixels[i] * 3 + 2];
                        textureBuffer[i * 4 + 3] = 255;
                    }
                    var texture = void 0;
                    // tslint:disable-next-line
                    if (cc['RenderTexture']['initWithSize']) {
                        texture = new cc.RenderTexture();
                        texture.initWithSize(this.reader.width, this.reader.height);
                    }
                    else {
                        texture = new cc.Texture2D();
                    }
                    texture.initWithData(textureBuffer, cc.Texture2D.PixelFormat.RGBA8888, this.reader.width, this.reader.height);
                    //如果已经对node设置了尺寸则使用node的尺寸约束纹理
                    if (this.movie.width && this.movie.height) {
                        texture.width = this.movie.width;
                        texture.height = this.movie.height;
                    }
                    //缓存
                    this.textureCache[currentIndex] = new cc.SpriteFrame(texture);
                }
                //由于更改纹理会导致重设尺寸，需要先记录原来的尺寸，更改纹理后再强设为以前的尺寸
                var width = this.movie.width;
                var height = this.movie.height;
                this.sprite.spriteFrame = this.textureCache[currentIndex];
                if (width && height) {
                    this.movie.width = width;
                    this.movie.height = height;
                }
                //继续播放下一帧
                mpsdk.Platform.instance.setTimeout(function () {
                    _this.play();
                }, delay);
            };
            /**
             * 回收销毁
             */
            CocosGifMovie.prototype.dispose = function () {
                //已经销毁过了
                if (!this.timer) {
                    return;
                }
                this.timer = 0;
                for (var _i = 0, _a = this.textureCache; _i < _a.length; _i++) {
                    var t = _a[_i];
                    t.destroy();
                }
                this.sprite.destroy();
                delete this.textureCache;
                delete this.reader;
            };
            //缓存处理，避免重复解析GIF
            CocosGifMovie.gifCache = {};
            return CocosGifMovie;
        }());
        gif.CocosGifMovie = CocosGifMovie;
    })(gif = mpsdk.gif || (mpsdk.gif = {}));
})(mpsdk || (mpsdk = {}));
/// <reference path="../Env.ts" />
/// <reference path="../Platform.ts" />
/// <reference path="../utils.ts" />
var mpsdk;
(function (mpsdk) {
    var ext;
    (function (ext) {
        var PDD = /** @class */ (function () {
            function PDD() {
            }
            /**
             * 获取12个拼多多的优惠商品
             * @gameId 游戏id
             */
            PDD.getGoodsList = function (gameId) {
                return __awaiter(this, void 0, void 0, function () {
                    var account, goods, oldArr, maxItem, i;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, mpsdk.Account.getAccountSafe()];
                            case 1:
                                account = _a.sent();
                                return [4 /*yield*/, mpsdk.Platform.instance.httpRequest(mpsdk.Env.extServer + '/v1/pdd/recommend', {
                                        openid: account.openid,
                                        game_id: gameId || mpsdk.Env.gameId
                                    }, 'get', 0)];
                            case 2:
                                goods = _a.sent();
                                if (!goods.data) {
                                    return [2 /*return*/, []];
                                }
                                oldArr = new Array();
                                oldArr = oldArr.concat(goods.data);
                                goods.data.sort(function (a, b) { return b.coupon_discount - a.coupon_discount; });
                                maxItem = goods.data[0];
                                for (i = 0; i < oldArr.length; i++) {
                                    if (oldArr[i].goods_id == maxItem.goods_id) {
                                        oldArr.splice(i, 1);
                                    }
                                }
                                oldArr.unshift(maxItem);
                                return [2 /*return*/, oldArr];
                        }
                    });
                });
            };
            /**
             * 获取单个范围内金额的商品
             * @package maxPrice 金额上限
             * @package minPrice 金额下限
             */
            PDD.getRandomGoods = function (maxPrice, minPrice) {
                if (minPrice === void 0) { minPrice = 0; }
                return __awaiter(this, void 0, void 0, function () {
                    var account, data, goodsList;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, mpsdk.Account.getAccountSafe()];
                            case 1:
                                account = _a.sent();
                                data = {
                                    openid: account.openid,
                                    game_id: mpsdk.Env.gameId
                                };
                                return [4 /*yield*/, mpsdk.Platform.instance.httpRequest(mpsdk.Env.extServer + '/v1/pdd/goods', data)];
                            case 2:
                                goodsList = _a.sent();
                                return [2 /*return*/, this.getNeedGoods(goodsList.data.goods_list, minPrice, maxPrice)];
                        }
                    });
                });
            };
            /**
             * 随机获取一个价格区间内的商品
             */
            PDD.getRedbagGoods = function () {
                return __awaiter(this, void 0, void 0, function () {
                    var account, data, goods;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, mpsdk.Account.getAccountSafe()];
                            case 1:
                                account = _a.sent();
                                data = {
                                    openid: account.openid,
                                    game_id: mpsdk.Env.gameId
                                };
                                return [4 /*yield*/, mpsdk.Platform.instance.httpRequest(mpsdk.Env.extServer + '/v1/pdd/recommend', data, 'get', 0)];
                            case 2:
                                goods = _a.sent();
                                return [2 /*return*/, goods.data[Math.floor(Math.random() * goods.data.length)]];
                        }
                    });
                });
            };
            /**
             * 获取对应金额区间商品
             * @param list 商品列表
             * @param minPrice 最低金额
             * @param maxPrice 最高金额
             * @param isRandom 是否随机返回/否则按热度顺序返回
             */
            PDD.getNeedGoods = function (list, minPrice, maxPrice, isRandom) {
                if (isRandom === void 0) { isRandom = true; }
                var needArr = [];
                var pddRepeatList = mpsdk.Platform.instance.getStorage('pdd_repeat_goods') || [];
                if (pddRepeatList.length > 50) {
                    pddRepeatList = [];
                    mpsdk.Platform.instance.setStorage('pdd_repeat_goods', []);
                }
                needArr = list.filter(function (item) {
                    if (item.coupon_discount == 0 || !item.coupon_discount) { //过滤掉没有优惠金额的数据
                        return false;
                    }
                    else if ((item.coupon_discount <= minPrice) || (item.coupon_discount > maxPrice)) { //过滤掉低于最低优惠券金额货高于最高优惠券金额的商品数据
                        return false;
                    }
                    else if (pddRepeatList.indexOf(item.goods_id) != -1) {
                        return false;
                    }
                    return true;
                });
                var item;
                if (needArr.length <= 0) {
                    return null;
                }
                if (isRandom) {
                    item = needArr[Math.floor(Math.random() * needArr.length)];
                }
                else {
                    item = needArr[0];
                }
                pddRepeatList.push(item.goods_id);
                mpsdk.Platform.instance.setStorage('pdd_repeat_goods', pddRepeatList);
                return item;
            };
            return PDD;
        }());
        ext.PDD = PDD;
    })(ext = mpsdk.ext || (mpsdk.ext = {}));
})(mpsdk || (mpsdk = {}));
/// <reference path="Env.ts" />
/// <reference path="Platform.ts" />
/// <reference path="Account.ts" />
/// <reference path="Report.ts" />
/// <reference path="Share.ts" />
/// <reference path="Ad.ts" />
/// <reference path="gif/EgretGifMovie.ts" />
/// <reference path="gif/CocosGifMovie.ts" />
/// <reference path="ext/pdd.ts" />
var mpsdk;
(function (mpsdk) {
    /**
     * SDK初始化，获取openid，处理启动参数
     * @param gameId 平台分配的gameId参数
     * @param gamePath 平台分配的gamePath参数
     * @param options 启动参数（微信小程序必须传此参数，其他可以不传）
     * @param isNeedUnionid 是否需要获取unionid(默认为false--不获取,如需要获取,可设置为true)
     */
    function init(gameId, gamePath, options, isNeedUnionid) {
        if (isNeedUnionid === void 0) { isNeedUnionid = false; }
        // 全局只能进行一次初始化
        if (mpsdk.Env.init) {
            log('请勿重复初始化SDK');
            return mpsdk.Account.getAccountSafe().then(function (account) { return account.openid; });
        }
        // 初始化环境
        mpsdk.Env.gameId = gameId;
        mpsdk.Env.gamePath = gamePath;
        mpsdk.Env.init = true;
        mpsdk.Env.isNeedUnionid = isNeedUnionid;
        if (options) {
            mpsdk.Env.launchOptions = JSON.parse(JSON.stringify(options));
        }
        else {
            mpsdk.Env.launchOptions = mpsdk.Platform.instance.getLaunchOptions();
        }
        // 预加载配置
        // Account.loadBlackNames();
        log('SDK初始化/启动参数', 'gameId=', gameId, 'gamePath=', gamePath, 'launchOptions', JSON.stringify(mpsdk.Env.launchOptions));
        mpsdk.Platform.instance.onHide();
        // 启动在线时长统计
        mpsdk.Platform.instance.setInterval(mpsdk.Report.reportOnlineTimeCount, 1000);
        // 账号登录及相关数据统计
        return new Promise(function (resolve, reject) {
            mpsdk.Platform.instance.getUserAccount(mpsdk.Env.launchOptions).then(function (account) {
                if (mpsdk.Account.setAccount(account)) {
                    var accountSource = mpsdk.utils.parseAccountSource(mpsdk.Env.launchOptions);
                    log('上报用户来源成功', 'sourceType=', accountSource.sourceType, 'sourceId=', accountSource.sourceId);
                    mpsdk.Report.reportAppRun(mpsdk.Env.launchOptions); //上报启动日志
                    resolve(account.openid);
                    // 预加载配置
                    mpsdk.Share.loadShareInfoList();
                    mpsdk.Ad.loadAdData();
                }
                else {
                    log('初始化用户账号失败', JSON.stringify(account));
                    reject('初始化用户账号失败');
                }
            }).catch(function (e) {
                log('初始化失败:', e);
                reject(e);
            });
        });
    }
    mpsdk.init = init;
    /**
     * SDK初始化
     * @param gameId 平台分配的gameId参数
     * @param gamePath 平台分配的gamePath参数
     * @param account 用户账号
     * @param options 启动参数（微信小程序必须传此参数，其他可以不传）
     * @param isNeedUnionid 是否需要获取unionid(默认为false--不获取,如需要获取,可设置为true)
     */
    function initWithAccount(gameId, gamePath, account, options, isNeedUnionid) {
        if (isNeedUnionid === void 0) { isNeedUnionid = false; }
        // 全局只能进行一次初始化
        if (mpsdk.Env.init) {
            log('请勿重复初始化SDK');
            return;
        }
        // 初始化环境
        mpsdk.Env.gameId = gameId;
        mpsdk.Env.gamePath = gamePath;
        mpsdk.Env.init = true;
        mpsdk.Env.isNeedUnionid = isNeedUnionid;
        if (options) {
            mpsdk.Env.launchOptions = JSON.parse(JSON.stringify(options));
        }
        else {
            mpsdk.Env.launchOptions = mpsdk.Platform.instance.getLaunchOptions();
        }
        // 预加载配置
        mpsdk.Share.loadShareInfoList();
        mpsdk.Ad.loadAdData();
        // Account.loadBlackNames();
        log('SDK初始化/启动参数', 'gameId=', gameId, 'gamePath=', gamePath, 'account=', account, 'launchOptions=', JSON.stringify(mpsdk.Env.launchOptions));
        // 启动在线时长统计
        mpsdk.Platform.instance.setInterval(mpsdk.Report.reportOnlineTimeCount, 1000);
        mpsdk.Platform.instance.onHide();
        // 账号登录及相关数据统计
        if (mpsdk.Account.setAccount(account)) {
            var accountSource = mpsdk.utils.parseAccountSource(mpsdk.Env.launchOptions); //解析用户来源
            mpsdk.Account.setAccountSource(accountSource.sourceType, accountSource.sourceId); //登记用户来源
            mpsdk.Report.reportAppRun(mpsdk.Env.launchOptions); //上报启动日志
        }
        else {
            log('初始化用户账号失败', JSON.stringify(account));
        }
    }
    mpsdk.initWithAccount = initWithAccount;
    /**
     * 打印日志（日志前缀统一为mpsdk，方便筛选）
     *
     * 可通过设置`mpsdk.Env.showLog = false`来关闭日志
     */
    function log() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        mpsdk.Env.showLog && console.log.apply(console, ['mpsdk'].concat(args));
    }
    mpsdk.log = log;
    /**
     * 查SDK版本更新
     */
    function checkUpdate() {
        //1天只检查2次
        var d = new Date();
        var lastUpdate = d.toLocaleDateString() + '/' + Math.floor(d.getHours() / 12);
        if (mpsdk.Platform.instance.getStorage('lastUpdate') == lastUpdate) {
            return;
        }
        mpsdk.Platform.instance.setStorage('lastUpdate', lastUpdate);
        //只有调试环境检查
        if (['egret', 'cocos'].indexOf(mpsdk.Platform.platformType) == -1 && mpsdk.Platform.instance.getSystem().platform != 'devtools') {
            return;
        }
        var css = 'background:#CC3399;color:#FFFF99';
        console.log('mpsdk %csdk.funcell123.com仅在调试环境检测SDK版本更新，如果发生错误可关闭合法域名校验或忽略此问题（不必添加到合法域名）', css);
        mpsdk.Platform.instance.httpRequest('http://sdk.funcell123.com/mpsdk/media/version.php').then(function (res) {
            if (res.version != mpsdk.Env.version || res.build != mpsdk.Env.build) {
                console.log('mpsdk %c当前版本号：' + mpsdk.Env.version + ' build ' + mpsdk.Env.build, css);
                console.log('mpsdk %c最新版本号：' + res.version + ' build ' + res.build, css);
                console.log('mpsdk %c建议更新SDK，详情：http://sdk.funcell123.com/mpsdk', css);
            }
        });
    }
    mpsdk.checkUpdate = checkUpdate;
    ////////////////////////////////////
    /**
     * 获取状态控制参数
     *
     * @deprecated 建议使用mpsdk.Hack.getOpenLevel()
     *
     * 当`[codeVer=='当前app代码版本' && status=='0']`时关闭敏感功能（统一约定：0表示关闭/1表示开启）
     * @param gameId 平台分配的gameId参数（如果在调用此方法之前已经调用过SDK初始化方法，则可以不传，否则必传）
     * @returns 返回字段说明：
     * <pre>
     * {
     *   codeVer:作用版本号,
     *   status:状态是否开放,
     *   ipCheck:IP是否符合要求（如果IP不符合要求，SDK自动强制设置status=0）,
     *   ...
     * }
     * </pre>
     */
    function getStatus(gameId) {
        gameId = gameId || mpsdk.Env.gameId;
        return new Promise(function (resolve, reject) {
            if (!gameId) {
                log('获取状态控制参数失败，请先初始化SDK或传入gameId参数');
                return;
            }
            mpsdk.Platform.instance.httpRequest(mpsdk.Env.loginServer + '/MiniGame/data/getIp.action?gameId=' + gameId).then(function (res) {
                if (!res.open) {
                    log('获取状态控制参数失败，服务端状态控制参数未设置');
                    return;
                }
                try {
                    var status_1 = JSON.parse(res.open);
                    status_1.ipCheck = res.check.toString();
                    status_1.ipCheck == '0' && (status_1.status = '0'); //当IP检查不通过时自动关闭总开关
                    resolve(status_1);
                }
                catch (e) {
                    log('获取状态控制参数失败，参数解析错误');
                    return;
                }
            });
        });
    }
    mpsdk.getStatus = getStatus;
    /**
     * 获取当前应用功能限制级别
     *
     * @deprecated 建议使用mpsdk.Hack.getOpenLevel()
     *
     * 根据各大平台审核要求，应用需要动态关闭或开放一些程序功能，SDK提供了一个较为通用的做法，以便达到审核标准。
     * @param codeVer 当前程序代码版本
     * @param gameId 平台分配的gameId参数（如果在调用此方法之前已经调用过SDK初始化方法，则可以不传，否则必传）
     * @returns 返回一个object:{ level: string }，程序只需判断level即可，其他字段请忽略。
     *
     * level=0 高级限制保护 = 最低开放程度
     *
     * level=1 中级限制保护 = 中等开放程度
     *
     * level=2 低级限制保护 = 完全开放程度
     */
    function getOpenLevel(codeVer, gameId) {
        return mpsdk.Hack.getOpenLevel(codeVer, gameId);
    }
    mpsdk.getOpenLevel = getOpenLevel;
    /**
     * 获取服务器时间
     */
    function getServerTime() {
        return __awaiter(this, void 0, void 0, function () {
            var serverTime;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, mpsdk.Platform.instance.httpRequest(mpsdk.Env.friendServer + '/MiniFriend/data/getServerTime.action')];
                    case 1:
                        serverTime = _a.sent();
                        return [2 /*return*/, serverTime.ServerTime];
                }
            });
        });
    }
    mpsdk.getServerTime = getServerTime;
})(mpsdk || (mpsdk = {}));
/// <reference path="mpsdk.ts" />
mpsdk.log('version', mpsdk.Env.version, 'build', mpsdk.Env.build);
if (typeof worker == 'object' && worker.onMessage) { //在微信worker进程中运行
    worker.onMessage(function (res) {
        if (res && res.msg == 'gif' && res.id && res.buffer) {
            //解析GIF图片
            var reader = new mpsdk.gif.GifReader(res.buffer);
            if (reader.valid) {
                for (var i = 0; i < reader.images.length; i++) {
                    reader.getFrame(i);
                }
            }
            //由于进程间通信只能传递基本类型数据，arraybuffer无法传递，需要进行转换
            var serializeReader = reader;
            serializeReader._dv = mpsdk.utils.buffer2String(reader.dataView.buffer);
            if (reader.valid) {
                serializeReader._globalHeadData = mpsdk.utils.buffer2String(reader.globalHeadData);
                serializeReader._globalPalette = mpsdk.utils.buffer2String(reader.globalPalette);
                for (var i = 0; i < reader.images.length; i++) {
                    serializeReader._images[i].localPalette = mpsdk.utils.buffer2String(reader.images[i].localPalette);
                    serializeReader._images[i].frameData = mpsdk.utils.buffer2String(reader.images[i].frameData);
                }
            }
            //发送数据给主进程
            worker.postMessage({
                msg: 'gif',
                id: res.id,
                reader: serializeReader
            });
        }
    });
}
else { //在主进程中运行
    mpsdk.checkUpdate();
    //导出模块
    if (typeof wx == 'object' && !wx.redirectTo) { //微信小游戏需注册到window对象下
        window['mpsdk'] = mpsdk;
    }
    else if (typeof module != 'undefined') { //使用umd方式导出模块
        module.exports = mpsdk;
    }
    else {
        window['mpsdk'] = mpsdk;
    }
}
var mpsdk;
(function (mpsdk) {
    var gif;
    (function (gif) {
        var CocosGifAnim = /** @class */ (function () {
            function CocosGifAnim() {
            }
            /**
             * 展示单个gif动态图集
             * @param pngPath 图集地址
             * @param jsonPath 图集json配置文件地址
             * @param single cc.Node
             */
            CocosGifAnim.getGifAnim = function (pngPath, jsonPath, single) {
                return new Promise(function (resolve, reject) {
                    cc.loader.load([pngPath, jsonPath], function (err, result) {
                        if (err) {
                            console.log(err);
                            reject && reject(err);
                        }
                        else {
                            var json = result.getContent(jsonPath);
                            var png = result.getContent(pngPath);
                            var list = [];
                            // let size: any = null;
                            for (var i = 0; i < json.frames.length; i++) {
                                var index = parseInt(json.frames[i]["filename"].split(".")[0]);
                                var frame = json.frames[i].frame;
                                var mSprite = new cc.SpriteFrame(png, cc.rect(frame.x, frame.y, frame.w, frame.h));
                                list[index] = mSprite;
                                // list[i] = mSprite;
                                // size = cc.size(frame.w, frame.h);
                            }
                            var mAnimation = single.addComponent(cc.Animation);
                            //single.scale = single.height / size.height;
                            var clip = cc.AnimationClip.createWithSpriteFrames(list, 16);
                            clip.name = "gifAnim";
                            clip.wrapMode = cc.WrapMode.Loop;
                            mAnimation.addClip(clip);
                            mAnimation.play("gifAnim");
                            resolve && resolve(mAnimation);
                        }
                    });
                });
            };
            return CocosGifAnim;
        }());
        gif.CocosGifAnim = CocosGifAnim;
    })(gif = mpsdk.gif || (mpsdk.gif = {}));
})(mpsdk || (mpsdk = {}));
var mpsdk;
(function (mpsdk) {
    var gif;
    (function (gif) {
        var LayaGifAnimLoader = /** @class */ (function () {
            function LayaGifAnimLoader() {
            }
            LayaGifAnimLoader.Load = function (pngPath, jsonPath, titlePath, iconname, isBold) {
                var _this = this;
                return new Promise(function (resolve, reject) {
                    if (pngPath.indexOf(".gif") >= 0) {
                        console.log("LayaGifAnimLoader::Load->不支持Gif格式的图", pngPath);
                        reject && reject(null);
                        return;
                    }
                    if (jsonPath) {
                        Laya.loader.load([pngPath, jsonPath], Laya.Handler.create(_this, function (result) {
                            var json = Laya.loader.getRes(jsonPath);
                            var png = Laya.loader.getRes(pngPath);
                            var jsonlist = [];
                            for (var i = 0; i < json.frames.length; i++) {
                                var index = parseInt(json.frames[i]["filename"].split(".")[0]);
                                var frame = json.frames[i].frame;
                                jsonlist[index] = frame;
                            }
                            var move = new LayaGifAnim();
                            move.Init(jsonlist, png, titlePath, iconname, isBold);
                            resolve && resolve(move);
                        }));
                    }
                    else {
                        Laya.loader.load(pngPath, Laya.Handler.create(_this, function (result) {
                            var png = result;
                            var move = new LayaGifAnim();
                            move.Init([], png, titlePath, iconname, isBold);
                            resolve && resolve(move);
                        }));
                    }
                    Laya.loader.on(Laya.Event.ERROR, _this, function (err) {
                        console.log("LayaGifAnimLoader::Load->加载动图出错 ", err);
                        reject && reject(err);
                    });
                });
            };
            LayaGifAnimLoader.Pool = [];
            return LayaGifAnimLoader;
        }());
        gif.LayaGifAnimLoader = LayaGifAnimLoader;
        var LayaGifAnim = /** @class */ (function () {
            function LayaGifAnim() {
                this._nowpage = 0; //当前图片索引
                this._frame = 0;
            }
            LayaGifAnim.prototype.Init = function (jsonlist, tx, titleurl, iconname, isBold) {
                var _this = this;
                this._texList = [];
                this.View = new Laya.Sprite();
                this._icon = new Laya.Sprite();
                this._title = new Laya.Sprite();
                if (jsonlist == null || jsonlist.length == 0) {
                    this._texList.push(tx);
                }
                else {
                    for (var i = 0; i < jsonlist.length; i++) {
                        var frame = jsonlist[i];
                        var tex = Laya.Texture.createFromTexture(tx, frame.x, frame.y, frame.w, frame.h);
                        this._texList.push(tex);
                    }
                }
                this._icon.width = this._texList[0].width;
                this._icon.height = this._texList[0].height;
                this.View.addChild(this._icon);
                if (iconname && iconname.length > 0) {
                    if (titleurl) {
                        Laya.loader.load(titleurl, Laya.Handler.create(this, function (tex) {
                            tex.width = _this._icon.width;
                            tex.height = _this._icon.height / 4;
                            _this._title.texture = tex;
                        }));
                    }
                    this.View.addChild(this._title);
                    this._title.y = this._icon.height;
                    this._title.width = this._icon.width;
                    this._title.height = this._icon.height / 4;
                    if (iconname.length > 5) {
                        iconname = iconname.substr(0, 4) + "...";
                    }
                    this._titleTxt = new Laya.Text();
                    this._titleTxt.width = this._title.width;
                    this._titleTxt.height = this._title.height;
                    // this._titleTxt.fontSize = Math.floor(this._title.width - 10) / iconname.length;
                    this._titleTxt.fontSize = Math.floor(this._title.width - 10) / 5;
                    this._title.addChild(this._titleTxt);
                    this._titleTxt.align = "center";
                    this._titleTxt.valign = "middle";
                    this._titleTxt.zOrder = 10;
                    this._titleTxt.text = iconname;
                    this._titleTxt.bold = isBold;
                }
                this.View.width = this._icon.width;
                this.View.height = this._icon.height + this._title.height;
                this.changeFrame();
            };
            LayaGifAnim.prototype.changeFrame = function () {
                if (this._texList == null) {
                    return;
                }
                if (this._nowpage >= this._texList.length) {
                    this._nowpage = 0;
                }
                this._icon.graphics.clear();
                this._icon.graphics.drawTexture(this._texList[this._nowpage], 0, 0);
                this._nowpage++;
            };
            LayaGifAnim.prototype.Update = function () {
                this._frame++;
                if (this._texList.length > 1 && this._frame % 3 == 0) {
                    this.changeFrame();
                }
            };
            LayaGifAnim.prototype.Destroy = function () {
                this.View.removeSelf();
                this.View.destroy(true);
                for (var _i = 0, _a = this._texList; _i < _a.length; _i++) {
                    var i = _a[_i];
                    i.destroy(true);
                }
                this._texList = [];
            };
            return LayaGifAnim;
        }());
        gif.LayaGifAnim = LayaGifAnim;
    })(gif = mpsdk.gif || (mpsdk.gif = {}));
})(mpsdk || (mpsdk = {}));
var mpsdk;
(function (mpsdk) {
    var ui;
    (function (ui) {
        /**
         * 猜你喜欢九宫格展示，目前展示6格
         */
        var CCADGridUI = /** @class */ (function () {
            function CCADGridUI() {
            }
            /**
             * 初始化单个猜你喜欢
             */
            CCADGridUI.init = function (itemCount) {
                var _this = this;
                this.mWidgetList = [];
                this.mRootNode = new cc.Node("SuggestBottom");
                this.mRootNode.setContentSize(600, 500); //初始大小 
                var tempNode = new cc.Node("bg");
                tempNode.parent = this.mRootNode;
                tempNode.setPosition(cc.Vec2.ZERO);
                var tempWidget = tempNode.addComponent(cc.Widget);
                this.initWidget(tempWidget, 0, 0, 0, 0);
                //初始化背景图片
                this.mBgSprite = tempNode.addComponent(cc.Sprite);
                this.getBase64SpFrame(this.mBgBase64, function (frame) {
                    frame.insetLeft = 22;
                    frame.insetTop = 22;
                    frame.insetRight = 47;
                    frame.insetBottom = 47;
                    _this.mBgSprite.type = cc.Sprite.Type.SLICED;
                    _this.mBgSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                    _this.mBgSprite.spriteFrame = frame;
                });
                var temp1Node = new cc.Node("bgFrame");
                temp1Node.parent = this.mRootNode;
                temp1Node.setPosition(cc.Vec2.ZERO);
                var temp1Widget = tempNode.addComponent(cc.Widget);
                this.initWidget(temp1Widget, 0, 0, 0, 0);
                //初始化背景框
                this.mFrameSprite = temp1Node.addComponent(cc.Sprite);
                this.getBase64SpFrame(this.mFrameBase64, function (frame) {
                    frame.insetLeft = 9;
                    frame.insetTop = 9;
                    frame.insetRight = 9;
                    frame.insetBottom = 9;
                    _this.mFrameSprite.type = cc.Sprite.Type.SLICED;
                    _this.mFrameSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                    _this.mFrameSprite.spriteFrame = frame;
                });
                var nodeScroll = new cc.Node("nodeScroll");
                nodeScroll.parent = this.mRootNode;
                nodeScroll.setPosition(cc.Vec2.ZERO);
                var nodeScrollWidget = nodeScroll.addComponent(cc.Widget);
                this.initWidget(nodeScrollWidget, 0, 0, 0, 0);
                this.mScrollView = nodeScroll.addComponent(cc.ScrollView);
                this.mScrollView.horizontal = false;
                this.mScrollView.vertical = false;
                this.mScrollView.inertia = false;
                var nodeView = new cc.Node("nodeView");
                nodeView.parent = nodeScroll;
                nodeView.setPosition(cc.Vec2.ZERO);
                nodeView.addComponent(cc.Mask);
                var nodeViewWidget = nodeView.addComponent(cc.Widget);
                this.initWidget(nodeViewWidget, 0, 0, 0, 0);
                // this.mNodeView = nodeView;
                this.mContent = new cc.Node("mContent");
                this.mContent.parent = nodeView;
                this.mContent.setPosition(cc.Vec2.ZERO);
                var mContentWidget = this.mContent.addComponent(cc.Widget);
                this.mScrollView.content = this.mContent;
                this.initWidget(mContentWidget, 0, 0, 0, 0);
                console.log(this.mContent.getContentSize());
                var layout = this.mContent.addComponent(cc.Layout);
                layout.type = cc.Layout.Type.GRID;
                layout.resizeMode = cc.Layout.ResizeMode.CONTAINER;
                layout.startAxis = cc.Layout.AxisDirection.HORIZONTAL;
                layout.horizontalDirection = cc.Layout.HorizontalDirection.LEFT_TO_RIGHT;
                layout.verticalDirection = cc.Layout.VerticalDirection.TOP_TO_BOTTOM;
                layout.paddingLeft = 20;
                layout.paddingRight = 20;
                layout.paddingTop = 15;
                layout.paddingBottom = 15;
                layout.spacingX = 10;
                layout.spacingY = 10;
                this.mSignleCache = new cc.Node("itemCacheNode");
                this.mSignleCache.setContentSize(180, 230);
                this.mSignleCache.setPosition(cc.Vec2.ZERO);
                this.mSignleCache.active = true;
                var singleLayout = this.mSignleCache.addComponent(cc.Layout);
                singleLayout.type = cc.Layout.Type.VERTICAL;
                singleLayout.resizeMode = cc.Layout.ResizeMode.NONE;
                singleLayout.verticalDirection = cc.Layout.VerticalDirection.TOP_TO_BOTTOM;
                singleLayout.paddingTop = 0;
                singleLayout.paddingBottom = 0;
                singleLayout.spacingY = 0;
                var itemIconNode = new cc.Node("itemIconNode");
                itemIconNode.setContentSize(180, 180);
                itemIconNode.setPosition(cc.Vec2.ZERO);
                itemIconNode.parent = this.mSignleCache;
                var itemBgSprite = itemIconNode.addComponent(cc.Sprite);
                itemBgSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                itemBgSprite.enabled = true;
                var itemTitleNode = new cc.Node("itemTitleNode");
                itemTitleNode.setContentSize(180, 50);
                itemTitleNode.setPosition(cc.Vec2.ZERO);
                itemTitleNode.parent = this.mSignleCache;
                var itemTitleSprite = itemTitleNode.addComponent(cc.Sprite);
                itemTitleSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                itemTitleSprite.enabled = true;
                var itemTitleLabelNode = new cc.Node("itemTitleLabelNode");
                itemTitleLabelNode.setContentSize(180, 50);
                itemTitleLabelNode.setPosition(cc.Vec2.ZERO);
                itemTitleLabelNode.parent = itemTitleNode;
                var itemTitleLabel = itemTitleLabelNode.addComponent(cc.RichText);
                itemTitleLabel.fontSize = 28;
                itemTitleLabel.horizontalAlign = cc.macro.TextAlignment.CENTER;
                itemTitleLabel.maxWidth = 180;
                itemTitleLabel.lineHeight = 50;
                itemTitleLabel.useSystemFont = true;
                itemTitleLabel.enabled = true;
            };
            /**
             * 展示推荐列表
             * 在获取到推荐列表(Ad.getSuggestList())后使用
             * @param dataList 推荐列表 []
             * @param background 背景颜色 cc.Color
             * @param border 背景边框颜色，可以为空，为空时不显示边框 cc.Color
             * @return cc.Node
             */
            CCADGridUI.create = function (dataList, background, border) {
                var _this = this;
                var itemCount = dataList.length > 6 ? 6 : dataList.length;
                if (this.mRootNode) {
                    this.mRootNode.destroyAllChildren();
                    this.mRootNode.destroy();
                }
                // if (!this.mRootNode) {
                this.init(itemCount);
                this.mHorizonList = [];
                var _loop_2 = function (i) {
                    var mSingle = cc.instantiate(this_2.mSignleCache);
                    mSingle.parent = this_2.mContent;
                    if (dataList[i]["atlas_photo"] && dataList[i]["atlas_config"]) {
                        mpsdk.gif.CocosGifAnim.getGifAnim(dataList[i]["atlas_photo"], dataList[i]["atlas_config"], this_2.getItemIconNode(mSingle)).then(function () {
                        });
                    }
                    else {
                        this_2.loadUrlRes(dataList[i]["icon"], this_2.getItemIconNode(mSingle));
                    }
                    this_2.setItemNameNode(dataList[i], mSingle);
                    mSingle.on(cc.Node.EventType.TOUCH_END, function () {
                        mpsdk.Ad.click(dataList[i]);
                    });
                    this_2.mHorizonList.push(mSingle);
                };
                var this_2 = this;
                for (var i = 0; i < itemCount; i++) {
                    _loop_2(i);
                }
                CCADGridUI.mRootNode.on("size-changed", function () {
                    _this.itemAdapt(itemCount);
                });
                this.mScrollView.node.on(cc.Node.EventType.TOUCH_START, function () {
                    // let list = SuggestListUI.mHorizonList;
                    // for (let i = 0; i < list.length; i++) {
                    //     list[i].getComponent(cc.Sprite).enabled = true;
                    // }
                });
                this.mBgSprite.node.color = new cc.Color(background.getR(), background.getG(), background.getB());
                this.mBgSprite.node.opacity = background.getA();
                // }
                if (border) {
                    this.mFrameSprite.node.active = true;
                    this.mFrameSprite.node.color = new cc.Color(border.getR(), border.getG(), border.getB());
                    this.mFrameSprite.node.opacity = border.getA();
                }
                else {
                    this.mFrameSprite.node.active = false;
                }
                this.itemAdapt(itemCount);
                return this.mRootNode;
            };
            /**
             * 自适应
             */
            CCADGridUI.itemAdapt = function (itemCount) {
                var w = 600;
                var h = 500;
                if (itemCount == 3) {
                    w = 600;
                    h = 260;
                }
                else if (itemCount == 2) {
                    w = 410;
                    h = 260;
                }
                else if (itemCount == 1) {
                    w = 220;
                    h = 260;
                }
                this.mRootNode.setContentSize(w, h);
                for (var _i = 0, _a = this.mWidgetList; _i < _a.length; _i++) {
                    var a = _a[_i];
                    a.updateAlignment();
                }
                // for (let a of this.mHorizonList) {
                //     a.setContentSize(180, 230);
                // }
                var contentLayout = this.mContent.getComponent(cc.Layout);
                contentLayout.updateLayout();
                var itemLayoutArray = contentLayout.getComponentsInChildren(cc.Layout);
                itemLayoutArray.forEach(function (itemLayout) {
                    itemLayout.updateLayout();
                });
                this.mScrollView.scrollToLeft(0);
            };
            CCADGridUI.setItemNameNode = function (itemData, itemNode) {
                if (!itemData || !itemNode)
                    return;
                if (cc.isValid(itemNode)) {
                    var nameNode = itemNode.getChildByName("itemTitleNode");
                    nameNode.width = 180;
                    nameNode.height = 50;
                    var nameLabelNode = nameNode.getChildByName("itemTitleLabelNode");
                    var name_2 = itemData['title'];
                    var nameBg = itemData['title_bg'];
                    var isBold = itemData['is_bold']; //1不加粗；2加粗
                    if (name_2 && name_2.length > 5) {
                        name_2 = name_2.substring(0, 4) + '...';
                    }
                    nameLabelNode.width = 180;
                    nameLabelNode.height = 50;
                    if (nameBg) {
                        this.loadUrlRes(nameBg, nameNode);
                    }
                    if (isBold && isBold == '2') {
                        name_2 = '<b>' + name_2 + '</b>';
                    }
                    nameLabelNode.getComponent(cc.RichText).string = name_2;
                }
            };
            CCADGridUI.getItemIconNode = function (itemNode) {
                var itemIconNode = itemNode.getChildByName("itemIconNode");
                itemIconNode.width = 180;
                itemIconNode.height = 180;
                return itemIconNode;
            };
            CCADGridUI.loadUrlRes = function (url, imgNode) {
                if (!url || !imgNode)
                    return;
                var resetImgScale = function (spriteFrame) {
                    if (cc.isValid(imgNode)) {
                        var w = imgNode.width;
                        var h = imgNode.height;
                        imgNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                        imgNode.width = w;
                        imgNode.height = h;
                    }
                };
                cc.loader.load({ url: url, type: 'png' }, function (err, texture) {
                    if (err) {
                        cc.error(err.message || err);
                        return;
                    }
                    resetImgScale(new cc.SpriteFrame(texture));
                }.bind(this));
            };
            CCADGridUI.getBase64SpFrame = function (baseStr, callback) {
                var img = new Image();
                img.src = baseStr;
                img.onload = function () {
                    var textrue = new cc.Texture2D();
                    textrue.initWithElement(img);
                    textrue.handleLoadedTexture();
                    var newFrame = new cc.SpriteFrame(textrue);
                    callback && callback(newFrame);
                };
            };
            CCADGridUI.initWidget = function (mWidget, top, left, right, bottom) {
                this.mWidgetList.push(mWidget);
                mWidget.alignMode = cc.Widget.AlignMode.ON_WINDOW_RESIZE;
                if (top !== undefined) {
                    mWidget.isAlignTop = true;
                    mWidget.top = top;
                }
                if (left !== undefined) {
                    mWidget.isAlignLeft = true;
                    mWidget.left = left;
                }
                if (right !== undefined) {
                    mWidget.isAlignRight = true;
                    mWidget.right = right;
                }
                if (bottom !== undefined) {
                    mWidget.isAlignBottom = true;
                    mWidget.bottom = bottom;
                }
            };
            /**
             * 设置猜你喜欢外框
             * 请在showSuggestBottom()方法后调用
             * @param mFrame cc.SpriteFrame
             */
            CCADGridUI.setBgFrame = function (mFrame) {
                this.mFrameSprite.spriteFrame = mFrame;
            };
            /**
             * 设置猜你喜欢背景
             * 请在showSuggestBottom()方法后调用
             * @param mBgSprite cc.SpriteFrame
             */
            CCADGridUI.setBg = function (mBgSprite) {
                this.mBgSprite.spriteFrame = mBgSprite;
            };
            CCADGridUI.mBgBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADsAAABoCAYAAABPP4jqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFGRTc0RUYzM0NDMDExRTk5QzdFQTg3RTAxOTlBN0FEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFGRTc0RUY0M0NDMDExRTk5QzdFQTg3RTAxOTlBN0FEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QUZFNzRFRjEzQ0MwMTFFOTlDN0VBODdFMDE5OUE3QUQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QUZFNzRFRjIzQ0MwMTFFOTlDN0VBODdFMDE5OUE3QUQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6tPwHyAAADr0lEQVR42uzcS0hUYRQH8OPozEiSWWpWhBVJb9RKiyJt0dOVWBa1qEVKbwiqTbRo0SaIICLohQUJvegFERRZYDNqqaUTRTHRA9/DZEpkVk7YOTP32ud1amo1c6f/gf9iztyR+5t757ufmxOzfcV0+ovK5Czi5HEWcMZxrBS+6uE0cxo5Do6T8yzUh+JCvF/C2cyZR5FVCZxpWtZpvVrOaU7Zv2JTOCc4xWSemqelgLON4zUeYAnyoQ2cBpNB1VrNeao5/nhl5YDzQw6Ks1LmwiWUxZk0PZtGJI/298JV33q/UPeHDmp+85JcVRX0rOYB+Xx96iHjFUe53oxRFqg0Tr124EBlLVxKRaV7KXVcesReSm9bE90sO0KNVfeMb7VwcjgeeRGbm5FKyjcwf+D+tsRS4abdtHb7fkoYPiKi71s5v7mLC8hmjye3q5b6+/v1txI5kzmXVewOzh71Dwh02ZoSU/1YJ8+cQ1abnV411KhtuXU7ZbXWF6iN6ruz85abDqqXnLecf5C1yL8az1Wfo7LwFG/ZR2au4q37jAuo+HIs2s7o11XNX0FJKWmmxiYlp9Gc/JXG9iKLtgX8tfouWErRUPKYNFSeYHPVzoSps6ICmz5liMN/G49RO4kjU6ICmzgq1dgaK1jboN2S1RYV2CA7PKuF/qMCFlhggQUWWGCBBRZYYIEFFlhggQUWWGCBBRZYYIEFFlhggQUWWGCBBRZYYIEFFlhggQUWWGCBBRZYYIEFFlhggQUWWGCBBRZYYIEFFlhggQUWWGD/d+xntfG1tycqYIZpfVJ9gm1XO58+eqMCG8TRLthBM0Zb37qjAtvkfm5s1QvWoXZcNRVRgXVV3ze2HIJ1qp2Gh3ep+4PH1NDuTg89ddw1tp2CfUKBCbIDP+xrpw6ZGnvt5CHy9X1XW3X6bSw1aD6qfCsVV8+aEirnHeSq+n36RE2RZ1NgXrC/3I2P/WM5J07NNA208tYFunHmsDo+VOomadNC1VmplZz1FJgv6v/AizoHtb1/TekZMyJ6XqoMhr147ADdv3rOCG3lFOp7CRUrDXk4FalHdzS9Iefty+RpeSffAFnt8WSPH0YWS/g2Xz98PurytvPd94juXDpFV44f9F+UILWTU62/iAkyk1zmih7ljDLxGtXF2UXKbOPf7Y3lAPmhXjcp9IZ2/uV/+4+A3Osy7rpUfSxFeNVq57uKAkOch1SoafNlWmT6sz5aX6bmhnu0vuzy27Q9gj5avz7Uh34KMADL1+NYuYA3AwAAAABJRU5ErkJggg==";
            CCADGridUI.mFrameBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAB5SURBVHja7M8xDkFBFEDRM+NXfqKg0SgswR6sSamyDrEGpUqvsgdKtYj8PI0VjKlk7gJOclNErLHFA4GkrB6nFBEX7HHEqBAcMMOuwx0HPP3WDef83Zyr0zirXAMb2MD/Al+VvHfGApNK4DJFxAYrXNEVQgOm6D8DAJXuGl33vXhMAAAAAElFTkSuQmCC";
            CCADGridUI.mHorizonList = [];
            CCADGridUI.mWidgetList = [];
            return CCADGridUI;
        }());
        ui.CCADGridUI = CCADGridUI;
    })(ui = mpsdk.ui || (mpsdk.ui = {}));
})(mpsdk || (mpsdk = {}));
var mpsdk;
(function (mpsdk) {
    var ui;
    (function (ui) {
        var CCADListUI = /** @class */ (function () {
            function CCADListUI() {
            }
            /**
             * 初始化单个猜你喜欢
             */
            CCADListUI.init = function () {
                var _this = this;
                this.nowIndex = 0;
                this.mWidgetList = [];
                this.mRootNode = new cc.Node("SuggestBottom");
                this.mRootNode.setContentSize(630, 200); //初始大小 
                var tempNode = new cc.Node("bg");
                tempNode.parent = this.mRootNode;
                // tempNode.setContentSize(600, 200);
                var tempWidget = tempNode.addComponent(cc.Widget);
                this.initWidget(tempWidget, 0, 0, 0, 0);
                //初始化背景图片
                this.mBgSprite = tempNode.addComponent(cc.Sprite);
                this.getBase64SpFrame(this.mBgBase64, function (frame) {
                    frame.insetLeft = 22;
                    frame.insetTop = 22;
                    frame.insetRight = 47;
                    frame.insetBottom = 47;
                    _this.mBgSprite.type = cc.Sprite.Type.SLICED;
                    _this.mBgSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                    _this.mBgSprite.spriteFrame = frame;
                    // this.mBgSprite.node.setContentSize(600, 260);
                });
                var temp1Node = new cc.Node("bgFrame");
                temp1Node.parent = this.mRootNode;
                // temp1Node.setContentSize(600, 260);
                var temp1Widget = tempNode.addComponent(cc.Widget);
                this.initWidget(temp1Widget, 0, 0, 0, 0);
                //初始化背景框
                this.mFrameSprite = temp1Node.addComponent(cc.Sprite);
                this.getBase64SpFrame(this.mFrameBase64, function (frame) {
                    frame.insetLeft = 9;
                    frame.insetTop = 9;
                    frame.insetRight = 9;
                    frame.insetBottom = 9;
                    _this.mFrameSprite.type = cc.Sprite.Type.SLICED;
                    _this.mBgSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                    _this.mFrameSprite.spriteFrame = frame;
                    // this.mFrameSprite.node.setContentSize(600, 260);
                });
                var nodeScroll = new cc.Node("nodeScroll");
                nodeScroll.parent = this.mRootNode;
                // nodeScroll.setContentSize(600, 200);
                var nodeScrollWidget = nodeScroll.addComponent(cc.Widget);
                this.initWidget(nodeScrollWidget, 0, 50, 5, 0);
                this.mScrollView = nodeScroll.addComponent(cc.ScrollView);
                this.mScrollView.horizontal = true;
                this.mScrollView.vertical = false;
                nodeScroll.setPosition(cc.Vec2.ZERO);
                var nodeView = new cc.Node("nodeView");
                nodeView.parent = nodeScroll;
                // nodeView.setContentSize(600, 200);
                nodeView.setPosition(cc.Vec2.ZERO);
                nodeView.addComponent(cc.Mask);
                this.mNodeView = nodeView;
                var nodeViewWidget = nodeView.addComponent(cc.Widget);
                this.initWidget(nodeViewWidget, 0, 0, 0, 0);
                this.mContent = new cc.Node("mContent");
                this.mContent.parent = nodeView;
                // this.mContent.setContentSize(600, 260);
                this.mContent.setPosition(cc.Vec2.ZERO);
                var mContentWidget = this.mContent.addComponent(cc.Widget);
                this.mScrollView.content = this.mContent;
                this.initWidget(mContentWidget, 15, undefined, undefined, 15);
                console.log(this.mContent.getContentSize());
                var layout = this.mContent.addComponent(cc.Layout);
                layout.type = cc.Layout.Type.HORIZONTAL;
                layout.resizeMode = cc.Layout.ResizeMode.NONE;
                layout.horizontalDirection = cc.Layout.HorizontalDirection.LEFT_TO_RIGHT;
                layout.paddingLeft = 0;
                layout.paddingRight = 0;
                layout.spacingX = 10;
                var nodeLabelLike = new cc.Node();
                nodeLabelLike.parent = this.mRootNode;
                var nodeLabelWidget = nodeLabelLike.addComponent(cc.Widget);
                nodeLabelLike.width = 40;
                // nodeLabelLike.height = 200;
                this.initWidget(nodeLabelWidget, 5, 5, undefined, 5);
                nodeLabelLike.color = cc.Color.WHITE;
                this.mLikeLabel = nodeLabelLike.addComponent(cc.Label);
                this.mLikeLabel.string = "猜你喜欢";
                this.mLikeLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;
                this.mLikeLabel.overflow = cc.Label.Overflow.SHRINK;
                // this.mSignleCache = new cc.Node("single");
                // let sp: cc.Sprite = this.mSignleCache.addComponent(cc.Sprite);
                // sp.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                this.mSignleCache = new cc.Node("itemCacheNode");
                this.mSignleCache.setContentSize(135, 170);
                this.mSignleCache.setPosition(cc.Vec2.ZERO);
                this.mSignleCache.active = true;
                // let mSignleCacheWidget = this.mSignleCache.addComponent(cc.Widget);
                // this.initWidget(mSignleCacheWidget, 15, undefined, 5, 15);
                var singleLayout = this.mSignleCache.addComponent(cc.Layout);
                singleLayout.type = cc.Layout.Type.VERTICAL;
                singleLayout.resizeMode = cc.Layout.ResizeMode.NONE;
                singleLayout.verticalDirection = cc.Layout.VerticalDirection.TOP_TO_BOTTOM;
                singleLayout.paddingTop = 0;
                singleLayout.paddingBottom = 0;
                singleLayout.spacingY = 0;
                var itemIconNode = new cc.Node("itemIconNode");
                itemIconNode.setContentSize(135, 135);
                itemIconNode.setPosition(cc.Vec2.ZERO);
                itemIconNode.parent = this.mSignleCache;
                var itemBgSprite = itemIconNode.addComponent(cc.Sprite);
                itemBgSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                itemBgSprite.enabled = true;
                var itemTitleNode = new cc.Node("itemTitleNode");
                itemTitleNode.setContentSize(135, 35);
                itemTitleNode.setPosition(cc.Vec2.ZERO);
                itemTitleNode.parent = this.mSignleCache;
                var itemTitleSprite = itemTitleNode.addComponent(cc.Sprite);
                itemTitleSprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                itemTitleSprite.enabled = true;
                var itemTitleLabelNode = new cc.Node("itemTitleLabelNode");
                itemTitleLabelNode.setContentSize(135, 35);
                itemTitleLabelNode.setPosition(cc.Vec2.ZERO);
                itemTitleLabelNode.parent = itemTitleNode;
                var itemTitleLabel = itemTitleLabelNode.addComponent(cc.RichText);
                itemTitleLabel.fontSize = 24;
                itemTitleLabel.horizontalAlign = cc.macro.TextAlignment.CENTER;
                itemTitleLabel.maxWidth = 135;
                itemTitleLabel.lineHeight = 35;
                itemTitleLabel.useSystemFont = true;
                itemTitleLabel.enabled = true;
                this.actionAnim = cc.sequence(cc.scaleTo(0.3, 1.3, 1.3), cc.scaleTo(1, 1, 1));
            };
            /**
             * 展示推荐列表
             * 在获取到推荐列表(Ad.getSuggestList())后使用
             * @param dataList 推荐列表 []
             * @param background 背景颜色 cc.Color
             * @param border 背景边框颜色，可以为空，为空时不显示边框 cc.Color
             * @return cc.Node
             */
            CCADListUI.create = function (dataList, background, border) {
                var _this = this;
                this.MaxCount = dataList.length;
                this.MaxPage = Math.max(this.MaxCount - 4, 0);
                this.nowShowCount = this.MaxCount > 4 ? 4 : this.MaxCount;
                if (this.mRootNode) {
                    this.mRootNode.destroyAllChildren();
                    this.mRootNode.destroy();
                }
                // if (!this.mRootNode) {
                this.init();
                this.mHorizonList = [];
                var _loop_3 = function (i) {
                    var mSingle = cc.instantiate(this_3.mSignleCache);
                    mSingle.parent = this_3.mContent;
                    if (dataList[i]["atlas_photo"] && dataList[i]["atlas_config"]) {
                        mpsdk.gif.CocosGifAnim.getGifAnim(dataList[i]["atlas_photo"], dataList[i]["atlas_config"], this_3.getItemIconNode(mSingle)).then(function () {
                        });
                    }
                    else {
                        this_3.loadUrlRes(dataList[i]["icon"], this_3.getItemIconNode(mSingle));
                    }
                    this_3.setItemNameNode(dataList[i], mSingle);
                    mSingle.on(cc.Node.EventType.TOUCH_END, function () {
                        mpsdk.Ad.click(dataList[i]);
                    });
                    this_3.mHorizonList.push(mSingle);
                };
                var this_3 = this;
                for (var i = 0; i < this.MaxCount; i++) {
                    _loop_3(i);
                }
                CCADListUI.mRootNode.on("size-changed", function () {
                    _this.itemAdapt();
                });
                this.mScrollView.node.on(cc.Node.EventType.TOUCH_START, function () {
                    var list = CCADListUI.mHorizonList;
                    for (var i = 0; i < list.length; i++) {
                        // list[i].getComponent(cc.Sprite).enabled = true;
                        _this.getItemIconNode(list[i]).getComponent(cc.Sprite).enabled = true;
                    }
                });
                this.mBgSprite.node.color = new cc.Color(background.getR(), background.getG(), background.getB());
                this.mBgSprite.node.opacity = background.getA();
                // }
                if (border) {
                    this.mFrameSprite.node.active = true;
                    this.mFrameSprite.node.color = new cc.Color(border.getR(), border.getG(), border.getB());
                    this.mFrameSprite.node.opacity = border.getA();
                }
                else {
                    this.mFrameSprite.node.active = false;
                }
                this.itemAdapt();
                this.playAnim();
                return this.mRootNode;
            };
            /**
             * 自适应
             */
            CCADListUI.itemAdapt = function () {
                for (var _i = 0, _a = this.mWidgetList; _i < _a.length; _i++) {
                    var a = _a[_i];
                    a.updateAlignment();
                }
                var MaxWidth = this.mNodeView.width;
                var MaxHeight = this.mNodeView.height;
                var singleWidth = MaxWidth / this.nowShowCount;
                var val = Math.min(singleWidth - 10, MaxHeight);
                val -= 3;
                if (val < 40)
                    return;
                for (var _b = 0, _c = this.mHorizonList; _b < _c.length; _b++) {
                    var a = _c[_b];
                    a.setContentSize(135, 170);
                }
                val = 135;
                var spacing = (MaxWidth - val * this.nowShowCount) / (this.nowShowCount + 1);
                // this.mContent.getComponent(cc.Layout).spacingX = spacing;
                this.mContent.width = (this.mHorizonList.length) * (spacing + val) + val;
                // this.mContent.getComponent(cc.Layout).updateLayout();
                console.log('mContent.width:', this.mContent.width, ' , spacing:', spacing, ' , MaxWidth:', MaxWidth, ' , MaxHeight:', MaxHeight);
                var contentLayout = this.mContent.getComponent(cc.Layout);
                contentLayout.spacingX = spacing;
                contentLayout.updateLayout();
                var itemLayoutArray = contentLayout.getComponentsInChildren(cc.Layout);
                itemLayoutArray.forEach(function (itemLayout) {
                    itemLayout.updateLayout();
                });
                this.MaxPage = Math.max((this.mHorizonList.length - 4), 0);
                this.MaxPage = this.MaxPage > 0 ? this.MaxPage : 0;
                this.mScrollView.scrollToLeft(0);
            };
            CCADListUI.playAnim = function () {
                var _this = this;
                this.mScrollView.unscheduleAllCallbacks();
                this.mScrollView.schedule(function () {
                    if (CCADListUI.nowIndex <= 0) {
                        CCADListUI.nowAngel = 1;
                    }
                    else if (CCADListUI.nowIndex >= CCADListUI.mHorizonList.length - _this.nowShowCount) {
                        CCADListUI.nowAngel = -1;
                    }
                    CCADListUI.nowIndex += CCADListUI.nowAngel > 0 ? 1 : -1;
                    CCADListUI.mScrollView.scrollToPercentHorizontal(CCADListUI.nowIndex / (CCADListUI.mHorizonList.length - _this.nowShowCount), 2);
                    var ran = Math.floor(Math.random() * _this.nowShowCount);
                    var list = CCADListUI.mHorizonList;
                    for (var i = 0; i < list.length; i++) {
                        for (var i_1 = 0; i_1 < list.length; i_1++) {
                            if (i_1 < (CCADListUI.nowIndex - 1) || i_1 > (CCADListUI.nowIndex + _this.nowShowCount)) {
                                _this.getItemIconNode(list[i_1]).getComponent(cc.Sprite).enabled = false;
                            }
                            else {
                                _this.getItemIconNode(list[i_1]).getComponent(cc.Sprite).enabled = true;
                            }
                        }
                    }
                    var currentIndex = ran + CCADListUI.nowIndex;
                    if (currentIndex < 0) {
                        currentIndex = 0;
                    }
                    else if (currentIndex >= list.length) {
                        currentIndex = list.length - 1;
                    }
                    CCADListUI.mHorizonList[currentIndex].runAction(CCADListUI.actionAnim);
                }, 5);
            };
            CCADListUI.setItemNameNode = function (itemData, itemNode) {
                if (!itemData || !itemNode)
                    return;
                if (cc.isValid(itemNode)) {
                    var nameNode = itemNode.getChildByName("itemTitleNode");
                    nameNode.width = 135;
                    nameNode.height = 35;
                    var nameLabelNode = nameNode.getChildByName("itemTitleLabelNode");
                    var name_3 = itemData['title'];
                    var nameBg = itemData['title_bg'];
                    var isBold = itemData['is_bold']; //1不加粗；2加粗
                    if (name_3 && name_3.length > 5) {
                        name_3 = name_3.substring(0, 4) + '...';
                        // name=name.substring(0,5)+'...';
                    }
                    nameLabelNode.width = 135;
                    nameLabelNode.height = 135;
                    if (nameBg) {
                        this.loadUrlRes(nameBg, nameNode);
                    }
                    if (isBold && isBold == '2') {
                        name_3 = '<b>' + name_3 + '</b>';
                    }
                    nameLabelNode.getComponent(cc.RichText).string = name_3;
                }
            };
            CCADListUI.getItemIconNode = function (itemNode) {
                var itemIconNode = itemNode.getChildByName("itemIconNode");
                itemIconNode.width = 135;
                itemIconNode.height = 135;
                return itemIconNode;
            };
            CCADListUI.loadUrlRes = function (url, imgNode) {
                if (!url || !imgNode)
                    return;
                var resetImgScale = function (spriteFrame) {
                    if (cc.isValid(imgNode)) {
                        var w = imgNode.width;
                        var h = imgNode.height;
                        imgNode.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                        imgNode.width = w;
                        imgNode.height = h;
                    }
                };
                cc.loader.load({ url: url, type: 'png' }, function (err, texture) {
                    if (err) {
                        cc.error(err.message || err);
                        return;
                    }
                    resetImgScale(new cc.SpriteFrame(texture));
                }.bind(this));
            };
            // //左右晃动动画
            // static lrSwayAnim(node) {
            //     node.stopAllActions();
            //     node.rotation = 0;
            //     let time = 0.1, dist = 10;
            //     let action1 = cc.delayTime(1);
            //     let action2 = cc.rotateBy(time, -dist);
            //     let action3 = cc.rotateBy(time, dist * 2);
            //     let action4 = cc.rotateBy(time, -dist * 2);
            //     let action5 = cc.rotateBy(time, dist);
            //     let action = cc.sequence(action1, action2, action3, action4, action5);
            //     node.runAction(cc.repeatForever(action))
            // }
            CCADListUI.getBase64SpFrame = function (baseStr, callback) {
                var img = new Image();
                img.src = baseStr;
                img.onload = function () {
                    var textrue = new cc.Texture2D();
                    textrue.initWithElement(img);
                    textrue.handleLoadedTexture();
                    var newFrame = new cc.SpriteFrame(textrue);
                    callback && callback(newFrame);
                };
            };
            CCADListUI.initWidget = function (mWidget, top, left, right, bottom) {
                this.mWidgetList.push(mWidget);
                mWidget.alignMode = cc.Widget.AlignMode.ON_WINDOW_RESIZE;
                if (top !== undefined) {
                    mWidget.isAlignTop = true;
                    mWidget.top = top;
                }
                if (left !== undefined) {
                    mWidget.isAlignLeft = true;
                    mWidget.left = left;
                }
                if (right !== undefined) {
                    mWidget.isAlignRight = true;
                    mWidget.right = right;
                }
                if (bottom !== undefined) {
                    mWidget.isAlignBottom = true;
                    mWidget.bottom = bottom;
                }
            };
            /**
             * 设置猜你喜欢外框
             * 请在showSuggestBottom()方法后调用
             * @param mFrame cc.SpriteFrame
             */
            CCADListUI.setBgFrame = function (mFrame) {
                this.mFrameSprite.spriteFrame = mFrame;
            };
            /**
             * 设置猜你喜欢背景
             * 请在showSuggestBottom()方法后调用
             * @param mBgSprite cc.SpriteFrame
             */
            CCADListUI.setBg = function (mBgSprite) {
                this.mBgSprite.spriteFrame = mBgSprite;
            };
            /**
             * 获取猜你喜欢.可以隐藏，也可自行定制.
             * 请在showSuggestBottom()方法后调用
             * @returns cc.Label
             */
            CCADListUI.getLikeLabel = function () {
                return this.mLikeLabel;
            };
            /**
             * 展示单个gif动态图集
             * @param pngPath 图集地址
             * @param jsonPath 图集json配置文件地址
             * @param single cc.Node
             */
            CCADListUI.getGifAnim = function (pngPath, jsonPath, single) {
                return new Promise(function (resolve, reject) {
                    cc.loader.load([pngPath, jsonPath], function (err, result) {
                        if (err) {
                            console.log(err);
                            reject && reject(err);
                        }
                        else {
                            var json = result.getContent(jsonPath);
                            var png = result.getContent(pngPath);
                            var list = [];
                            // let size: any = null;
                            for (var i = 0; i < json.frames.length; i++) {
                                // let index = parseInt(json.frames[i]["filename"].split(".")[0]);
                                var frame = json.frames[i].frame;
                                var mSprite = new cc.SpriteFrame(png, cc.rect(frame.x, frame.y, frame.w, frame.h));
                                // list[index] = mSprite;
                                list[i] = mSprite;
                                // size = cc.size(frame.w, frame.h);
                            }
                            var mAnimation = single.addComponent(cc.Animation);
                            //single.scale = single.height / size.height;
                            var clip = cc.AnimationClip.createWithSpriteFrames(list, 8);
                            clip.name = "gifAnim";
                            clip.wrapMode = cc.WrapMode.Loop;
                            mAnimation.addClip(clip);
                            mAnimation.play("gifAnim");
                            resolve && resolve(mAnimation);
                        }
                    });
                });
            };
            CCADListUI.mBgBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADsAAABoCAYAAABPP4jqAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFGRTc0RUYzM0NDMDExRTk5QzdFQTg3RTAxOTlBN0FEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFGRTc0RUY0M0NDMDExRTk5QzdFQTg3RTAxOTlBN0FEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QUZFNzRFRjEzQ0MwMTFFOTlDN0VBODdFMDE5OUE3QUQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QUZFNzRFRjIzQ0MwMTFFOTlDN0VBODdFMDE5OUE3QUQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6tPwHyAAADr0lEQVR42uzcS0hUYRQH8OPozEiSWWpWhBVJb9RKiyJt0dOVWBa1qEVKbwiqTbRo0SaIICLohQUJvegFERRZYDNqqaUTRTHRA9/DZEpkVk7YOTP32ud1amo1c6f/gf9iztyR+5t757ufmxOzfcV0+ovK5Czi5HEWcMZxrBS+6uE0cxo5Do6T8yzUh+JCvF/C2cyZR5FVCZxpWtZpvVrOaU7Zv2JTOCc4xWSemqelgLON4zUeYAnyoQ2cBpNB1VrNeao5/nhl5YDzQw6Ks1LmwiWUxZk0PZtGJI/298JV33q/UPeHDmp+85JcVRX0rOYB+Xx96iHjFUe53oxRFqg0Tr124EBlLVxKRaV7KXVcesReSm9bE90sO0KNVfeMb7VwcjgeeRGbm5FKyjcwf+D+tsRS4abdtHb7fkoYPiKi71s5v7mLC8hmjye3q5b6+/v1txI5kzmXVewOzh71Dwh02ZoSU/1YJ8+cQ1abnV411KhtuXU7ZbXWF6iN6ruz85abDqqXnLecf5C1yL8az1Wfo7LwFG/ZR2au4q37jAuo+HIs2s7o11XNX0FJKWmmxiYlp9Gc/JXG9iKLtgX8tfouWErRUPKYNFSeYHPVzoSps6ICmz5liMN/G49RO4kjU6ICmzgq1dgaK1jboN2S1RYV2CA7PKuF/qMCFlhggQUWWGCBBRZYYIEFFlhggQUWWGCBBRZYYIEFFlhggQUWWGCBBRZYYIEFFlhggQUWWGCBBRZYYIEFFlhggQUWWGCBBRZYYIEFFlhggQUWWGD/d+xntfG1tycqYIZpfVJ9gm1XO58+eqMCG8TRLthBM0Zb37qjAtvkfm5s1QvWoXZcNRVRgXVV3ze2HIJ1qp2Gh3ep+4PH1NDuTg89ddw1tp2CfUKBCbIDP+xrpw6ZGnvt5CHy9X1XW3X6bSw1aD6qfCsVV8+aEirnHeSq+n36RE2RZ1NgXrC/3I2P/WM5J07NNA208tYFunHmsDo+VOomadNC1VmplZz1FJgv6v/AizoHtb1/TekZMyJ6XqoMhr147ADdv3rOCG3lFOp7CRUrDXk4FalHdzS9Iefty+RpeSffAFnt8WSPH0YWS/g2Xz98PurytvPd94juXDpFV44f9F+UILWTU62/iAkyk1zmih7ljDLxGtXF2UXKbOPf7Y3lAPmhXjcp9IZ2/uV/+4+A3Osy7rpUfSxFeNVq57uKAkOch1SoafNlWmT6sz5aX6bmhnu0vuzy27Q9gj5avz7Uh34KMADL1+NYuYA3AwAAAABJRU5ErkJggg==";
            CCADListUI.mFrameBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKTWlDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVN3WJP3Fj7f92UPVkLY8LGXbIEAIiOsCMgQWaIQkgBhhBASQMWFiApWFBURnEhVxILVCkidiOKgKLhnQYqIWotVXDjuH9yntX167+3t+9f7vOec5/zOec8PgBESJpHmomoAOVKFPDrYH49PSMTJvYACFUjgBCAQ5svCZwXFAADwA3l4fnSwP/wBr28AAgBw1S4kEsfh/4O6UCZXACCRAOAiEucLAZBSAMguVMgUAMgYALBTs2QKAJQAAGx5fEIiAKoNAOz0ST4FANipk9wXANiiHKkIAI0BAJkoRyQCQLsAYFWBUiwCwMIAoKxAIi4EwK4BgFm2MkcCgL0FAHaOWJAPQGAAgJlCLMwAIDgCAEMeE80DIEwDoDDSv+CpX3CFuEgBAMDLlc2XS9IzFLiV0Bp38vDg4iHiwmyxQmEXKRBmCeQinJebIxNI5wNMzgwAABr50cH+OD+Q5+bk4eZm52zv9MWi/mvwbyI+IfHf/ryMAgQAEE7P79pf5eXWA3DHAbB1v2upWwDaVgBo3/ldM9sJoFoK0Hr5i3k4/EAenqFQyDwdHAoLC+0lYqG9MOOLPv8z4W/gi372/EAe/tt68ABxmkCZrcCjg/1xYW52rlKO58sEQjFu9+cj/seFf/2OKdHiNLFcLBWK8ViJuFAiTcd5uVKRRCHJleIS6X8y8R+W/QmTdw0ArIZPwE62B7XLbMB+7gECiw5Y0nYAQH7zLYwaC5EAEGc0Mnn3AACTv/mPQCsBAM2XpOMAALzoGFyolBdMxggAAESggSqwQQcMwRSswA6cwR28wBcCYQZEQAwkwDwQQgbkgBwKoRiWQRlUwDrYBLWwAxqgEZrhELTBMTgN5+ASXIHrcBcGYBiewhi8hgkEQcgIE2EhOogRYo7YIs4IF5mOBCJhSDSSgKQg6YgUUSLFyHKkAqlCapFdSCPyLXIUOY1cQPqQ28ggMor8irxHMZSBslED1AJ1QLmoHxqKxqBz0XQ0D12AlqJr0Rq0Hj2AtqKn0UvodXQAfYqOY4DRMQ5mjNlhXIyHRWCJWBomxxZj5Vg1Vo81Yx1YN3YVG8CeYe8IJAKLgBPsCF6EEMJsgpCQR1hMWEOoJewjtBK6CFcJg4Qxwicik6hPtCV6EvnEeGI6sZBYRqwm7iEeIZ4lXicOE1+TSCQOyZLkTgohJZAySQtJa0jbSC2kU6Q+0hBpnEwm65Btyd7kCLKArCCXkbeQD5BPkvvJw+S3FDrFiOJMCaIkUqSUEko1ZT/lBKWfMkKZoKpRzame1AiqiDqfWkltoHZQL1OHqRM0dZolzZsWQ8ukLaPV0JppZ2n3aC/pdLoJ3YMeRZfQl9Jr6Afp5+mD9HcMDYYNg8dIYigZaxl7GacYtxkvmUymBdOXmchUMNcyG5lnmA+Yb1VYKvYqfBWRyhKVOpVWlX6V56pUVXNVP9V5qgtUq1UPq15WfaZGVbNQ46kJ1Bar1akdVbupNq7OUndSj1DPUV+jvl/9gvpjDbKGhUaghkijVGO3xhmNIRbGMmXxWELWclYD6yxrmE1iW7L57Ex2Bfsbdi97TFNDc6pmrGaRZp3mcc0BDsax4PA52ZxKziHODc57LQMtPy2x1mqtZq1+rTfaetq+2mLtcu0W7eva73VwnUCdLJ31Om0693UJuja6UbqFutt1z+o+02PreekJ9cr1Dund0Uf1bfSj9Rfq79bv0R83MDQINpAZbDE4Y/DMkGPoa5hpuNHwhOGoEctoupHEaKPRSaMnuCbuh2fjNXgXPmasbxxirDTeZdxrPGFiaTLbpMSkxeS+Kc2Ua5pmutG003TMzMgs3KzYrMnsjjnVnGueYb7ZvNv8jYWlRZzFSos2i8eW2pZ8ywWWTZb3rJhWPlZ5VvVW16xJ1lzrLOtt1ldsUBtXmwybOpvLtqitm63Edptt3xTiFI8p0in1U27aMez87ArsmuwG7Tn2YfYl9m32zx3MHBId1jt0O3xydHXMdmxwvOuk4TTDqcSpw+lXZxtnoXOd8zUXpkuQyxKXdpcXU22niqdun3rLleUa7rrStdP1o5u7m9yt2W3U3cw9xX2r+00umxvJXcM970H08PdY4nHM452nm6fC85DnL152Xlle+70eT7OcJp7WMG3I28Rb4L3Le2A6Pj1l+s7pAz7GPgKfep+Hvqa+It89viN+1n6Zfgf8nvs7+sv9j/i/4XnyFvFOBWABwQHlAb2BGoGzA2sDHwSZBKUHNQWNBbsGLww+FUIMCQ1ZH3KTb8AX8hv5YzPcZyya0RXKCJ0VWhv6MMwmTB7WEY6GzwjfEH5vpvlM6cy2CIjgR2yIuB9pGZkX+X0UKSoyqi7qUbRTdHF09yzWrORZ+2e9jvGPqYy5O9tqtnJ2Z6xqbFJsY+ybuIC4qriBeIf4RfGXEnQTJAntieTE2MQ9ieNzAudsmjOc5JpUlnRjruXcorkX5unOy553PFk1WZB8OIWYEpeyP+WDIEJQLxhP5aduTR0T8oSbhU9FvqKNolGxt7hKPJLmnVaV9jjdO31D+miGT0Z1xjMJT1IreZEZkrkj801WRNberM/ZcdktOZSclJyjUg1plrQr1zC3KLdPZisrkw3keeZtyhuTh8r35CP5c/PbFWyFTNGjtFKuUA4WTC+oK3hbGFt4uEi9SFrUM99m/ur5IwuCFny9kLBQuLCz2Lh4WfHgIr9FuxYji1MXdy4xXVK6ZHhp8NJ9y2jLspb9UOJYUlXyannc8o5Sg9KlpUMrglc0lamUycturvRauWMVYZVkVe9ql9VbVn8qF5VfrHCsqK74sEa45uJXTl/VfPV5bdra3kq3yu3rSOuk626s91m/r0q9akHV0IbwDa0b8Y3lG19tSt50oXpq9Y7NtM3KzQM1YTXtW8y2rNvyoTaj9nqdf13LVv2tq7e+2Sba1r/dd3vzDoMdFTve75TsvLUreFdrvUV99W7S7oLdjxpiG7q/5n7duEd3T8Wej3ulewf2Re/ranRvbNyvv7+yCW1SNo0eSDpw5ZuAb9qb7Zp3tXBaKg7CQeXBJ9+mfHvjUOihzsPcw83fmX+39QjrSHkr0jq/dawto22gPaG97+iMo50dXh1Hvrf/fu8x42N1xzWPV56gnSg98fnkgpPjp2Snnp1OPz3Umdx590z8mWtdUV29Z0PPnj8XdO5Mt1/3yfPe549d8Lxw9CL3Ytslt0utPa49R35w/eFIr1tv62X3y+1XPK509E3rO9Hv03/6asDVc9f41y5dn3m978bsG7duJt0cuCW69fh29u0XdwruTNxdeo94r/y+2v3qB/oP6n+0/rFlwG3g+GDAYM/DWQ/vDgmHnv6U/9OH4dJHzEfVI0YjjY+dHx8bDRq98mTOk+GnsqcTz8p+Vv9563Or59/94vtLz1j82PAL+YvPv655qfNy76uprzrHI8cfvM55PfGm/K3O233vuO+638e9H5ko/ED+UPPR+mPHp9BP9z7nfP78L/eE8/sl0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAB5SURBVHja7M8xDkFBFEDRM+NXfqKg0SgswR6sSamyDrEGpUqvsgdKtYj8PI0VjKlk7gJOclNErLHFA4GkrB6nFBEX7HHEqBAcMMOuwx0HPP3WDef83Zyr0zirXAMb2MD/Al+VvHfGApNK4DJFxAYrXNEVQgOm6D8DAJXuGl33vXhMAAAAAElFTkSuQmCC";
            CCADListUI.mHorizonList = [];
            CCADListUI.MaxCount = 0;
            CCADListUI.MaxPage = 0;
            CCADListUI.nowIndex = 0;
            CCADListUI.animPosX = 0;
            CCADListUI.nowAngel = 1;
            CCADListUI.nowShowCount = 0;
            CCADListUI.mWidgetList = [];
            return CCADListUI;
        }());
        ui.CCADListUI = CCADListUI;
    })(ui = mpsdk.ui || (mpsdk.ui = {}));
})(mpsdk || (mpsdk = {}));
var mpsdk;
(function (mpsdk) {
    var ui;
    (function (ui) {
        var LayaADGridUI = /** @class */ (function () {
            function LayaADGridUI() {
            }
            // private static _anidelay: number = 0;
            LayaADGridUI.createBg = function () {
                this.View.width = this._width;
                this.View.height = this._height;
                if (this._bg == null) {
                    this._bg = new Laya.Sprite();
                    this.View.addChild(this._bg);
                }
                this._bg.graphics.clear();
                this._bg.graphics.drawRect(0, 0, this._width, this._height, this._bgColor, this._lineColor);
                this._bg.width = this._width;
                this._bg.height = this._height;
                this._bg.alpha = 0.6;
                // if (this._cnxhtitle == null) {
                //     this._cnxhtitle = new Laya.Text();
                //     this.View.addChild(this._cnxhtitle);
                // }
                // this._cnxhtitle.x = this._width * 0.02;
                // this._cnxhtitle.y = this._height * 0.1;
                // this._cnxhtitle.width = this._width * 0.06;
                // this._cnxhtitle.height = this._height * 0.8;
                // this._cnxhtitle.leading = 2;
                // this._cnxhtitle.fontSize = Math.floor(this._cnxhtitle.height / 4) - 2;
                // this._cnxhtitle.color = this._lineColor;
                // this._cnxhtitle.text = "猜\n你\n喜\n欢";
                if (this._iconPanel == null) {
                    this._iconPanel = new Laya.Sprite();
                    this._viewPortPanel = new Laya.Sprite();
                    this.View.addChild(this._viewPortPanel);
                    this._viewPortPanel.addChild(this._iconPanel);
                    // this._viewPortPanel.on(Laya.Event.MOUSE_DOWN, this, this.onDown);
                    // this._viewPortPanel.on(Laya.Event.MOUSE_MOVE, this, this.onMove);
                    // this._viewPortPanel.on(Laya.Event.MOUSE_OUT, this, this.onUp);
                    // this._viewPortPanel.on(Laya.Event.MOUSE_UP, this, this.onUp);
                    Laya.timer.frameLoop(1, this, this.update);
                }
                this._viewPortPanel.width = this._iconPanel.width = this._width * 0.9;
                this._viewPortPanel.height = this._iconPanel.height = this._height * 0.8;
                this._viewPortPanel.x = this._width * 0.05;
                this._viewPortPanel.y = this._height * 0.1;
                this._viewPortPanel.scrollRect = new Laya.Rectangle(0, 0, this._viewPortPanel.width, this._viewPortPanel.height);
            };
            LayaADGridUI.createMovieItem = function (data, index) {
                var _this = this;
                var photourl = data["atlas_photo"];
                var configurl = data["atlas_config"];
                var titleurl = data["title_bg"];
                var iconurl = data["icon"];
                var iconname = data["title"];
                var isBold = data["is_bold"] ? data["is_bold"] == 2 : false;
                var pngurl = photourl ? photourl : iconurl;
                if (pngurl == null) {
                    return;
                }
                var w = (this._viewPortPanel.width) / LayaADGridUI._hlen;
                var h = (this._viewPortPanel.height) / LayaADGridUI._vlen;
                var max = w > h ? h : w;
                mpsdk.gif.LayaGifAnimLoader.Load(pngurl, configurl, titleurl, iconname, isBold).then(function (mAnim) {
                    var cw = mAnim.View.width;
                    var ch = mAnim.View.height;
                    var scale = max / ch;
                    var tw = cw * scale;
                    var th = ch * scale;
                    var hgap = max - cw;
                    // let vgap: number = max - ch;
                    mAnim.View.scale(scale, scale);
                    mAnim.View.pivot(cw / 2, th / 2);
                    mAnim.View.x = tw / 2 + (tw + hgap) * (index % LayaADGridUI._hlen);
                    mAnim.View.y = th / 2 + (th + hgap) * Math.floor(index / LayaADGridUI._hlen);
                    _this._iconPanel.addChild(mAnim.View);
                    _this._iconPanel.width = mAnim.View.x + tw - tw / 2;
                    mAnim.View.on(Laya.Event.CLICK, _this, function () {
                        if (_this._downX >= 0) {
                            return;
                        }
                        mpsdk.Ad.click(data);
                    });
                    _this._movieList.push(mAnim);
                }).catch(function () {
                    //动画和单图都加载失败,返回
                    if (photourl == null) {
                        return;
                    }
                    //动画加载失败,尝试单图
                    var tempData = data;
                    tempData['atlas_photo'] = null;
                    tempData['atlas_config'] = null;
                    _this.createMovieItem(tempData, index);
                });
            };
            LayaADGridUI.createMovieList = function (dataList) {
                var len = dataList.length;
                for (var i = 0; i < len; i++) {
                    this.createMovieItem(dataList[i], i);
                }
            };
            LayaADGridUI.removeMovieList = function () {
                if (this._movieList == null) {
                    this._movieList = [];
                    return;
                }
                var len = this._movieList.length;
                for (var i = len - 1; i >= 0; i--) {
                    var m = this._movieList[i];
                    m.Destroy();
                    this._movieList.splice(i, 1);
                }
            };
            LayaADGridUI.updateIconPanel = function () {
                // if (this._downX >= 0) {
                //     return;
                // }
                // let bottom: number = -(this._iconPanel.height - this._viewPortPanel.height);
                // this._anidelay -= Laya.timer.delta;
                // if (bottom > 0 || this._anidelay > 0) {
                //     return;
                // }
                // this._iconPanel.x += this._speed;
                // if (this._iconPanel.y <= bottom) {
                //     this._iconPanel.y = bottom;
                //     this._speed = this.SPEED;
                //     this._anidelay = 1000;
                // }
                // if (this._iconPanel.y >= 0) {
                //     this._iconPanel.y = 0;
                //     this._speed = -this.SPEED;
                //     this._anidelay = 1000;
                // }
            };
            LayaADGridUI.updateMovie = function () {
                for (var _i = 0, _a = this._movieList; _i < _a.length; _i++) {
                    var i = _a[_i];
                    i.Update();
                }
            };
            LayaADGridUI.update = function (e) {
                this.updateIconPanel();
                this.updateMovie();
            };
            /**
             *
             * @param dataList 猜你喜欢参数列表
             * @param background 背景颜色
             * @param border 背景边框颜色，可以为空，为空时不显示边框
             * @return Laya.Sprite 根节点
             */
            LayaADGridUI.Create = function (dataList, bgcolor, linecolor) {
                if (bgcolor === void 0) { bgcolor = "#000000"; }
                if (linecolor === void 0) { linecolor = ''; }
                this._bgColor = bgcolor;
                this._lineColor = linecolor;
                this.removeMovieList();
                this.createBg();
                this.createMovieList(dataList);
                return this.View;
            };
            Object.defineProperty(LayaADGridUI, "View", {
                // private static onDown(e: Laya.Event): void {
                //     this._downX = e.stageX;
                // }
                // private static onMove(e: Laya.Event): void {
                //     if (this._downX < 0) {
                //         return;
                //     }
                //     let dx: number = e.stageX - this._downX;
                //     this._iconPanel.x += dx;
                //     this._downX = e.stageX;
                //     if (dx > 0) this._speed = this.SPEED;
                //     if (dx < 0) this._speed = -this.SPEED;
                // }
                // private static onUp(): void {
                //     this._downX = -1;
                // }
                /**
                 * 获取根节点
                 * @return Laya.Sprite
                 */
                get: function () {
                    if (this._root == null) {
                        this._root = new Laya.Sprite();
                        // this._bgPanel.viewport = new Laya.Rectangle(this._width * 0.15, this._height * 0.1, this._width * 0.8, this._height * 0.8);
                    }
                    return this._root;
                },
                enumerable: true,
                configurable: true
            });
            // private static SPEED: number = 1;
            LayaADGridUI._width = 600;
            LayaADGridUI._height = 500;
            LayaADGridUI._hlen = 3;
            LayaADGridUI._vlen = 2;
            LayaADGridUI._bgColor = "#000000";
            LayaADGridUI._lineColor = "#ffffff";
            LayaADGridUI._downX = -1;
            return LayaADGridUI;
        }());
        ui.LayaADGridUI = LayaADGridUI;
    })(ui = mpsdk.ui || (mpsdk.ui = {}));
})(mpsdk || (mpsdk = {}));
var mpsdk;
(function (mpsdk) {
    var ui;
    (function (ui) {
        var LayaADListUI = /** @class */ (function () {
            function LayaADListUI() {
            }
            LayaADListUI.createBg = function () {
                this.View.width = this._width;
                this.View.height = this._height;
                if (this._bg == null) {
                    this._bg = new Laya.Sprite();
                    this.View.addChild(this._bg);
                }
                this._bg.graphics.clear();
                this._bg.graphics.drawRect(0, 0, this._width, this._height, this._bgColor, this._lineColor);
                this._bg.width = this._width;
                this._bg.height = this._height;
                this._bg.alpha = 0.6;
                if (this._cnxhtitle == null) {
                    this._cnxhtitle = new Laya.Text();
                    this.View.addChild(this._cnxhtitle);
                }
                this._cnxhtitle.x = this._width * 0.02;
                this._cnxhtitle.y = this._height * 0.1;
                this._cnxhtitle.width = this._width * 0.06;
                this._cnxhtitle.height = this._height * 0.8;
                this._cnxhtitle.leading = 2;
                this._cnxhtitle.fontSize = Math.floor(this._cnxhtitle.height / 4) - 2;
                this._cnxhtitle.color = this._lineColor;
                this._cnxhtitle.text = "猜\n你\n喜\n欢";
                if (this._iconPanel == null) {
                    this._iconPanel = new Laya.Sprite();
                    this._viewPortPanel = new Laya.Sprite();
                    this.View.addChild(this._viewPortPanel);
                    this._viewPortPanel.addChild(this._iconPanel);
                    this._viewPortPanel.on(Laya.Event.MOUSE_DOWN, this, this.onDown);
                    this._viewPortPanel.on(Laya.Event.MOUSE_MOVE, this, this.onMove);
                    this._viewPortPanel.on(Laya.Event.MOUSE_OUT, this, this.onUp);
                    this._viewPortPanel.on(Laya.Event.MOUSE_UP, this, this.onUp);
                    Laya.timer.frameLoop(1, this, this.update);
                }
                this._viewPortPanel.width = this._iconPanel.width = this._width * 0.85;
                this._viewPortPanel.height = this._iconPanel.height = this._height * 0.8;
                this._viewPortPanel.x = this._width * 0.1;
                this._viewPortPanel.y = this._height * 0.1;
                this._viewPortPanel.scrollRect = new Laya.Rectangle(0, 0, this._viewPortPanel.width, this._viewPortPanel.height);
            };
            LayaADListUI.createMovieItem = function (data, index) {
                var _this = this;
                var photourl = data["atlas_photo"];
                var configurl = data["atlas_config"];
                var titleurl = data["title_bg"];
                var iconurl = data["icon"];
                var iconname = data["title"];
                var isBold = data["is_bold"] ? data["is_bold"] == 2 : false;
                var pngurl = photourl ? photourl : iconurl;
                if (pngurl == null) {
                    return;
                }
                var w = (this._viewPortPanel.width - 10) / 4;
                // let h: number = this._viewPortPanel.height;
                w = w > LayaADListUI._viewPortPanel.height ? LayaADListUI._viewPortPanel.height : w;
                mpsdk.gif.LayaGifAnimLoader.Load(pngurl, configurl, titleurl, iconname, isBold).then(function (mAnim) {
                    var cw = mAnim.View.width;
                    var scale = w / cw;
                    var tw = cw * scale;
                    mAnim.View.scale(scale, scale);
                    mAnim.View.pivot(cw / 2, cw / 2);
                    mAnim.View.y = 0 + tw / 2;
                    mAnim.View.x = tw / 2 + (tw + 10) * index;
                    _this._iconPanel.addChild(mAnim.View);
                    _this._iconPanel.width = mAnim.View.x + tw - tw / 2;
                    mAnim.View.on(Laya.Event.CLICK, _this, function () {
                        if (_this._downX >= 0) {
                            return;
                        }
                        mpsdk.Ad.click(data);
                    });
                    _this._movieList.push(mAnim);
                }).catch(function () {
                    //动画和单图都加载失败,返回
                    if (photourl == null) {
                        return;
                    }
                    //动画加载失败,尝试单图
                    var tempData = data;
                    tempData['atlas_photo'] = null;
                    tempData['atlas_config'] = null;
                    _this.createMovieItem(tempData, index);
                });
            };
            LayaADListUI.createMovieList = function (dataList) {
                var len = dataList.length;
                for (var i = 0; i < len; i++) {
                    this.createMovieItem(dataList[i], i);
                }
            };
            LayaADListUI.removeMovieList = function () {
                if (this._movieList == null) {
                    this._movieList = [];
                    return;
                }
                var len = this._movieList.length;
                for (var i = len - 1; i >= 0; i--) {
                    var m = this._movieList[i];
                    m.Destroy();
                    this._movieList.splice(i, 1);
                }
            };
            LayaADListUI.updateIconPanel = function () {
                if (this._downX >= 0) {
                    return;
                }
                var right = -(this._iconPanel.width - this._viewPortPanel.width);
                this._anidelay -= Laya.timer.delta;
                if (right > 0 || this._anidelay > 0) {
                    return;
                }
                this._iconPanel.x += this._speed;
                if (this._iconPanel.x <= right) {
                    this._iconPanel.x = right;
                    this._speed = this.SPEED;
                    this._anidelay = 1000;
                }
                if (this._iconPanel.x >= 0) {
                    this._iconPanel.x = 0;
                    this._speed = -this.SPEED;
                    this._anidelay = 1000;
                }
            };
            LayaADListUI.updateMovie = function () {
                for (var _i = 0, _a = this._movieList; _i < _a.length; _i++) {
                    var i = _a[_i];
                    i.Update();
                }
            };
            LayaADListUI.update = function (e) {
                this.updateIconPanel();
                this.updateMovie();
            };
            /**
             *
             * @param dataList 猜你喜欢参数列表
             * @param background 背景颜色
             * @param border 背景边框颜色，可以为空，为空时不显示边框
             * @return Laya.Sprite 根节点
             */
            LayaADListUI.Create = function (dataList, bgcolor, linecolor) {
                if (bgcolor === void 0) { bgcolor = "#000000"; }
                if (linecolor === void 0) { linecolor = "#ffffff"; }
                this._bgColor = bgcolor;
                this._lineColor = linecolor;
                this.removeMovieList();
                this.createBg();
                this.createMovieList(dataList);
                return this.View;
            };
            LayaADListUI.onDown = function (e) {
                this._downX = e.stageX;
            };
            LayaADListUI.onMove = function (e) {
                if (this._downX < 0) {
                    return;
                }
                var dx = e.stageX - this._downX;
                this._iconPanel.x += dx;
                this._downX = e.stageX;
                if (dx > 0)
                    this._speed = this.SPEED;
                if (dx < 0)
                    this._speed = -this.SPEED;
            };
            LayaADListUI.onUp = function () {
                this._downX = -1;
            };
            Object.defineProperty(LayaADListUI, "View", {
                /**
                 * 获取根节点
                 * @return Laya.Sprite 根节点
                 */
                get: function () {
                    if (this._root == null) {
                        this._root = new Laya.Sprite();
                        // this._bgPanel.viewport = new Laya.Rectangle(this._width * 0.15, this._height * 0.1, this._width * 0.8, this._height * 0.8);
                    }
                    return this._root;
                },
                enumerable: true,
                configurable: true
            });
            LayaADListUI.SPEED = 1;
            LayaADListUI._width = 600;
            LayaADListUI._height = 200;
            LayaADListUI._bgColor = "#000000";
            LayaADListUI._lineColor = "#ffffff";
            LayaADListUI._speed = -1;
            LayaADListUI._downX = -1;
            LayaADListUI._anidelay = 0;
            return LayaADListUI;
        }());
        ui.LayaADListUI = LayaADListUI;
    })(ui = mpsdk.ui || (mpsdk.ui = {}));
})(mpsdk || (mpsdk = {}));
var mpsdk;
(function (mpsdk) {
    var ui;
    (function (ui) {
        var LayaADSingleUI = /** @class */ (function () {
            function LayaADSingleUI() {
            }
            LayaADSingleUI.init = function () {
                if (this._movieList == null) {
                    this._movieList = [];
                    Laya.timer.frameLoop(1, this, this.update);
                }
            };
            LayaADSingleUI.createMovieItem = function (data, parent) {
                var _this = this;
                var photourl = data["atlas_photo"];
                var configurl = data["atlas_config"];
                var titleurl = data["title_bg"];
                var iconurl = data["icon"];
                var iconname = data["title"];
                var isBold = data["is_bold"] ? data["is_bold"] == 2 : false;
                if (this._showName == false)
                    iconname = "";
                var pngurl = photourl ? photourl : iconurl;
                if (pngurl == null) {
                    return;
                }
                mpsdk.gif.LayaGifAnimLoader.Load(pngurl, configurl, titleurl, iconname, isBold).then(function (mAnim) {
                    var cw = mAnim.View.width;
                    var scale = _this._size / cw;
                    mAnim.View.scale(scale, scale);
                    mAnim.View.x = 0;
                    mAnim.View.y = 0;
                    parent.addChild(mAnim.View);
                    _this._movieList.push(mAnim);
                    mAnim.View.on(Laya.Event.CLICK, _this, function () {
                        mpsdk.Ad.click(data);
                    });
                }).catch(function () {
                    //动画和单图都加载失败,返回
                    if (photourl == null) {
                        return;
                    }
                    //动画加载失败,尝试单图
                    var tempData = data;
                    tempData['atlas_photo'] = null;
                    tempData['atlas_config'] = null;
                    _this.createMovieItem(tempData, parent);
                });
            };
            LayaADSingleUI.updateMovie = function () {
                var len = this._movieList.length;
                for (var i = len - 1; i >= 0; i--) {
                    if (this._movieList[i] && this._movieList[i].View.parent && this._movieList[i].View.parent.parent) {
                        this._movieList[i].Update();
                    }
                    else {
                        if (this._movieList[i])
                            this._movieList[i].Destroy();
                        this._movieList.splice(i, 1);
                    }
                }
            };
            LayaADSingleUI.update = function (e) {
                this.updateMovie();
            };
            /**
             *
             * @param dataList 猜你喜欢参数列表
             * @param background 背景颜色
             * @param border 背景边框颜色，可以为空，为空时不显示边框
             * @return Laya.Sprite 根节点
             */
            LayaADSingleUI.Create = function (icondata, size, showname) {
                if (size === void 0) { size = 100; }
                if (showname === void 0) { showname = true; }
                this._size = size;
                this._showName = showname;
                this.init();
                var sp = new Laya.Sprite();
                sp.width = sp.height = size;
                this.createMovieItem(icondata, sp);
                return sp;
            };
            return LayaADSingleUI;
        }());
        ui.LayaADSingleUI = LayaADSingleUI;
    })(ui = mpsdk.ui || (mpsdk.ui = {}));
})(mpsdk || (mpsdk = {}));
