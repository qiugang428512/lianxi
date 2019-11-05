var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DebugPlatform = /** @class */ (function () {
    function DebugPlatform() {
        this.debug = true;
        this.version = "1.0.7";
        this.cdnURL = "https://cdn-xyx.raink.com.cn/bszdk/wx/v8/rescdn/"; //外网机;
        this.bannerId = "adunit-43f20d5c4841e7da";
        this.videoId = "adunit-d07780367ec7fabb";
        this.interstitialAdId = "adunit-471252d239c10836";
    }
    return DebugPlatform;
}());
if (!window.platform) {
    window.platform = new DebugPlatform();
}
var ViewMgr_1 = require("./game/control/ViewMgr");
var ProcessMgr_1 = require("./game/control/ProcessMgr");
var GMMgr_1 = require("./game/control/game/GMMgr");
var hw_common_1 = require("./com/hw_common/hw_common");
var EngineUtility_1 = require("./com/hw_utils/EngineUtility");
// 程序入口
var Main = /** @class */ (function () {
    function Main() {
        //初始化微信小游戏
        // Laya.MiniAdpter.init(true, false);
        //初始化引擎
        Laya["EngineUtility"] = EngineUtility_1.default;
        Laya.init(720, 1280, Laya.WebGL);
        EngineUtility_1.default.Initilaize();
        hw_common_1.default.init(5690, "bspdkn", "https://cdn-xyx.raink.com.cn/bspdkn/20190909004.jpg", "你能看出图片有哪些地方不一样吗?");
        //适配模式
        Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
        Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
        //开启统计信息
        // Laya.enableDebugPanel();
        mpsdk.Env.showLog = false;
        // platform.debug && Laya.Stat.show();
        ViewMgr_1.default.Inst.init();
        ProcessMgr_1.default.Inst.Start();
        GMMgr_1.GMMgr.Inst.init();
    }
    return Main;
}());
new Main();
},{"./com/hw_common/hw_common":2,"./com/hw_utils/EngineUtility":18,"./game/control/ProcessMgr":26,"./game/control/ViewMgr":28,"./game/control/game/GMMgr":30}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hw_common_platform_1 = require("./inner_platform/hw_common_platform");
var hw_common_config_1 = require("./inner_config/hw_common_config");
var hw_common_servertime_1 = require("./inner_servertime/hw_common_servertime");
var hw_common_mpsdk_1 = require("./inner_mpsdk/hw_common_mpsdk");
var hw_common_share_1 = require("./inner_share/hw_common_share");
var hw_common_serverdata_1 = require("./inner_serverdata/hw_common_serverdata");
var hw_common_event_1 = require("./inner_event/hw_common_event");
var hw_sound_wx_1 = require("./inner_sound/hw_sound_wx");
var hw_sound_web_1 = require("./inner_sound/hw_sound_web");
/**
 * 好玩平台通用组件,均使用惰性初始化
 * @author yahu
 * @property platform 运行平台接口 @example 微信,网页调试
 * @property config 运营后台配置 @example safe等后台开关
 * @property sound 音频播放接口 @example 微信,网页调试
 * @property servertime 服务器时间相关接口 @example servertime,logintime等服务器时间
 * @property mpsdk mpsdk接口 @example reportEvent等日志打点接口和mpsdk接口
 * @property share 通用分享规则 @example 分享和视频的选择判断,分享周期等
 * @property serverdata 服务器数据接口 @example 数据存储,题库获取等
 */
var hw_common = /** @class */ (function () {
    function hw_common() {
    }
    /**
     * 好玩组件初始化
     * @param gameid 好玩平台游戏id,向运营或策划索要
     * @param gamepath 好玩平台游戏路径,向运营或策划索要
     * @param defaultshareimage 游戏默认分享图地址,向运营或策划索要
     * @param defaultsharetitle 游戏默认分享标题,向运营或策划索要
     */
    hw_common.init = function (gameid, gamepath, defaultshareimage, defaultsharetitle) {
        this.config._init(gameid, gamepath, defaultshareimage, defaultsharetitle);
        this.serverdata._init();
        this.platform._init();
        this.share._init();
        this.mpsdk._init();
        this.servertime.init();
    };
    Object.defineProperty(hw_common, "platform", {
        /**好玩通用组件-平台接口 */
        get: function () {
            if (this._platform == null)
                this._platform = new hw_common_platform_1.default();
            return this._platform;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_common, "config", {
        /**好玩通用组件-运营配置 */
        get: function () {
            if (this._config == null)
                this._config = new hw_common_config_1.default();
            return this._config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_common, "sound", {
        /**好玩通用组件-音效接口 */
        get: function () {
            if (this._sound == null) {
                this._sound = Laya.Browser.onWeiXin ? new hw_sound_wx_1.default() : new hw_sound_web_1.default();
            }
            return this._sound;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_common, "servertime", {
        /**好玩通用组件-服务器时间接口 */
        get: function () {
            if (this._servertime == null)
                this._servertime = new hw_common_servertime_1.default();
            return this._servertime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_common, "mpsdk", {
        /**好玩通用组件-mpsdk接口 */
        get: function () {
            if (this._mpsdk == null)
                this._mpsdk = new hw_common_mpsdk_1.default();
            return this._mpsdk;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_common, "serverdata", {
        /**好玩通用组件-服务器数据接口 */
        get: function () {
            if (this._serverdata == null)
                this._serverdata = new hw_common_serverdata_1.default();
            return this._serverdata;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_common, "share", {
        /**好玩通用组件-分享接口 */
        get: function () {
            if (this._share == null)
                this._share = new hw_common_share_1.default();
            return this._share;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_common, "event", {
        /**好玩通用组件-通用事件 */
        get: function () {
            if (this._event == null)
                this._event = new hw_common_event_1.default();
            return this._event;
        },
        enumerable: true,
        configurable: true
    });
    return hw_common;
}());
exports.default = hw_common;
},{"./inner_config/hw_common_config":4,"./inner_event/hw_common_event":5,"./inner_mpsdk/hw_common_mpsdk":6,"./inner_platform/hw_common_platform":7,"./inner_serverdata/hw_common_serverdata":11,"./inner_servertime/hw_common_servertime":12,"./inner_share/hw_common_share":13,"./inner_sound/hw_sound_web":15,"./inner_sound/hw_sound_wx":16}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hw_common_def = /** @class */ (function () {
    function hw_common_def() {
    }
    /**新用户测试 */
    hw_common_def.DEBUG_NEWPLAYER = false;
    /**web环境下测试account */
    hw_common_def.DEBUG_ACCOUNT = {
        openid: "测试通用openid",
        unionid: null,
        lastLoginTime: 1,
        createTime: null,
        shareTime: null,
        sid: null,
        anonymous_openid: null,
        sourceType: null,
        sourceId: null
    };
    //----------------------------------------------------------------------------------------LTV广告测试配置
    /**是否开启lvt广告测试 */
    hw_common_def.LTV_TEST = false;
    /**微信后台配置的广告id*/
    hw_common_def.LTV_TEST_LIST = {
        "chaping": {
            "chaping_1": "adunit-4b33a708ca8cbdd8",
            "chaping_2": "adunit-a2e46bcee030abc4",
            "chaping_3": "adunit-eb3780a59f7a3c73",
            "chaping_4": "adunit-a60ce3572f419d8a",
            "chaping_5": "adunit-0414d0979796c26b",
            "chaping_6": "adunit-09c4a141781e11ad",
            "chaping_7": "adunit-0be7d0cc640484a6",
            "chaping_8": "adunit-1f7c4ce858d7986a",
            "chaping_9": "adunit-95f3aa2fab78c89e",
            "chaping_10": "adunit-e6b64686b714e51f",
            "chaping_11": "adunit-cb2126d3237ab3ae",
            "chaping_12": "adunit-a8af339bf8e69031",
            "chaping_13": "adunit-3a014f801da91f10",
            "chaping_14": "adunit-68e2256dd68fe99c",
            "chaping_15": "adunit-56cff36d4b1e8083"
        },
        "video": {
            "video_1": "adunit-4e356721fec25748",
            "video_2": "adunit-efaf3ecf4ad395f3",
            "video_3": "adunit-d0dde2a084e61e4a",
            "video_4": "adunit-e41b1caa0b44c43b",
            "video_5": "adunit-fbd84a88432809d2",
            "video_6": "adunit-b00dee4af24eb108",
            "video_7": "adunit-568cb7c83b5cc673",
            "video_8": "adunit-ebf00bac8e6c4b31",
            "video_9": "adunit-52e27f39b6c2e4f9",
            "video_10": "adunit-d6b19567ff0a0486",
            "video_11": "adunit-3f0b3849b9829bb3",
            "video_12": "adunit-6ded661ba2e11b13",
            "video_13": "adunit-1b6f67db922ad7be",
            "video_14": "adunit-aeab117fc6e5cd04",
            "video_15": "adunit-24ab0a81b26494b1"
        },
        "banner": {
            "banner_1": "adunit-439f5742cc1f7ea9",
            "banner_2": "adunit-85dff309adb4126f",
            "banner_3": "adunit-f63203f26f61e006",
            "banner_4": "adunit-aa1007cb23b7e372",
            "banner_5": "adunit-b530be687c23cfb7",
            "banner_6": "adunit-7ac488b355e03903",
            "banner_7": "adunit-83c8782ead4c8714",
            "banner_8": "adunit-1b5991039eca1153",
            "banner_9": "adunit-04a832e12e1e73e2",
            "banner_10": "adunit-28394dbd9ed7e52b",
            "banner_11": "adunit-dc486f39f7b78cfd",
            "banner_12": "adunit-10435acf12ca09c1",
            "banner_13": "adunit-aaf5dd25907059a3",
            "banner_14": "adunit-ef4166cb9907c725",
            "banner_15": "adunit-6d5039946b154882"
        }
    };
    //----------------------------------------------------------------------------------------本次存储定义
    /**周期内分享记录 */
    hw_common_def.LOCS_SHARE_CYCINFOLIST = "LOCS_SHARE_CYCINFOLIST";
    /**大数据对比版本号 */
    hw_common_def.LOCS_SD_VER = "LOCS_SD_VER";
    //----------------------------------------------------------------------------------------通用全局定义
    /**好友列表心跳同步时间间隔 */
    hw_common_def.DEF_FRIENDREFRESH = 2 * 60 * 1000;
    /**分享周期 */
    hw_common_def.DEF_SHARELIMIT_CYCLE = 1000 * 60 * 120;
    /**分享周期内次数限制 */
    hw_common_def.DEF_SHARELIMIT_MAX = 999;
    /**服务器地址 */
    hw_common_def.URL_GET_VERSIONEND = "https://xyxcck-friend.raink.com.cn/MiniFriend/data/getBigDataVersion.action"; //gameId=xxx&openId=xxx&dataKey=xxx
    hw_common_def.URL_POST_SAVEEND = "https://xyxcck-friend.raink.com.cn/MiniFriend/data/saveBigData.action"; //{"gameId":xxx,"openId":xxx,"dataKey":xxx,"version":xxx,"data":xxx}
    hw_common_def.URL_Get_GetEnd = "https://xyxcck-friend.raink.com.cn/MiniFriend/data/getBigData.action"; //gameId=xxx&openId=xxx&dataKey=xxx
    hw_common_def.URL_GET_QUZI = "https://xyx-mainland-quizlib.raink.com.cn/MiniQuesLib/data/getMiniQues.action";
    hw_common_def.URL_GET_CSGIFT = "https://xyxcck-friend.raink.com.cn//MiniFriend/data/getCSBonus.action";
    hw_common_def.URL_GET_SUBSCRIPTION = "https://xyx-mainland-messagepush.raink.com.cn/MiniMessageSubscribe/data/duationMessIntoPool.action"; //发送订阅
    //----------------------------------------------------------------------------------------通用日志埋点
    //平台组件的事件埋点全部为负数,游戏内的分享埋点全部为正数
    /**通用上报-mpsdk.init初始化的延时 param1:(1:成功,0:失败),param2:成功或失败花费时间 */
    hw_common_def.REPORT_MPSDKINIT = -1;
    /**通用上报-账号获取成功 param1:(1:从服务器请求数据,0:没有从服务器请求),param2:成功或失败花费时间 */
    hw_common_def.REPORT_ACCOUNT_OK = -2;
    /**通用上报-平台配置获取成功 param1:(1:从服务器请求数据,0:没有从服务器请求),param2:成功或失败花费时间 */
    hw_common_def.REPORT_PLATFORMCONFIG_OK = -3;
    /**通用上报-服务器存档获取成功 param1:(1:从服务器请求数据,0:没有从服务器请求),param2:成功或失败花费时间 */
    hw_common_def.REPORT_SERVERDATA_OK = -4;
    /**通用上报-服务器题库获取成功 param1:(1:题库id),param2:报错id */
    hw_common_def.REPORT_LOADQUIZ_OK = -5;
    /**通用上报-游戏切到前台 param1:sceneid, */
    hw_common_def.REPORT_ONSHOW = -6;
    /**通用上报-显示banner广告 param1 = 1 广告id  param2 = 0创建广告 1加载完成  2加载失败 */
    hw_common_def.REPORT_BANNERAD = -21;
    /**通用上报-显示视频广告 param1 = 1 分享点  param2 = 0点击视频 1看完  2未看完 3调起失败 */
    hw_common_def.REPORT_VIDEOAD = -31;
    /**通用上报-显示插屏广告 */
    hw_common_def.REPORT_INTERSTITIAL_SHOW = -41;
    /**通用上报-关闭插屏广告 */
    hw_common_def.REPORT_INTERSTITIAL_CLOSE = -42;
    /**通用上报-插屏广告报错 */
    hw_common_def.REPORT_INTERSTITIAL_ERROR = -43;
    /**通用上报-分享 param1 = 1 分享点  param2 = 0点击分享 1分享成功 2分享失败 */
    hw_common_def.REPORT_SHARE = -51;
    //----------------------------------------------------------------------------------------通用消息事件
    /**运行平台游戏切到前台 param:场景值id */
    hw_common_def.EVT_PLATFORM_ONSHOW = "EVT_PLATFORM_ONSHOW";
    /**运行平台游戏切到后台  */
    hw_common_def.EVT_PLATFORM_ONHIDE = "EVT_PLATFORM_ONHIDE";
    /**mpsk获取到上次真实分享时间戳*/
    hw_common_def.EVT_MPSDK_LASTTRUESHARETM_OK = "EVT_MPSDK_LASTTRUESHARETM_OK";
    /**获取到运营平台配置 */
    hw_common_def.EVT_MPSDK_PLATFORMCONFIG_OK = "EVT_MPSDK_PLATFORMCONFIG_OK";
    /**获取到账号信息 */
    hw_common_def.EVT_MPSDK_ACCOUNT_OK = "EVT_MPSDK_ACCOUNT_OK";
    /**serverdata同步账号数据完成,附带参数为null(没有同步服务器存档，使用本地存档)，附带参数不为空：服务器存档数据，使用服务器存档 */
    hw_common_def.EVT_SD_SERVERDATA_OK = "EVT_SD_SERVERDATA_OK";
    /**获取到服务器数据  */
    hw_common_def.EVT_SERVER_DATA_OK = "EVT_SERVER_DATA_TIME_OK";
    return hw_common_def;
}());
exports.default = hw_common_def;
},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hw_common_1 = require("../hw_common");
var MathUtils_1 = require("../../hw_utils/MathUtils");
var hw_common_def_1 = require("../hw_common_def");
var TimeUtils_1 = require("../../hw_utils/TimeUtils");
/**
 * hw运营平台配置,
 * @author yahu
 * 为了防止断网状态,所有平台配置相关的参数均需要和策划约定一个默认值
 * 配置尽量做到所有游戏能通用,非通用的配置不要写到这个类里
 */
var hw_common_config = /** @class */ (function () {
    function hw_common_config() {
        this._gameid = 0;
        this._gamePath = "";
        this._defaultShareImage = "";
        this._defaultShareTitle = "";
    }
    Object.defineProperty(hw_common_config.prototype, "defaultShareTitle", {
        /**游戏默认分享文字,向运营或策划索要*/
        get: function () {
            return this._defaultShareTitle;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_common_config.prototype, "defaultShareImage", {
        /**游戏默认分享图,向运营或策划索要*/
        get: function () {
            return this._defaultShareImage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_common_config.prototype, "gamePath", {
        /**好玩平台游戏配置,向运营或策划索要*/
        get: function () {
            return this._gamePath;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_common_config.prototype, "gameid", {
        /**好玩平台游戏配置,向运营或策划索要*/
        get: function () {
            return this._gameid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_common_config.prototype, "platformConfig", {
        /**运营平台后台配置,所有游戏开关信息 */
        get: function () {
            return this._platformConfig;
        },
        enumerable: true,
        configurable: true
    });
    hw_common_config.prototype._setPlatformConfig = function (data) {
        this._platformConfig = data;
        hw_common_1.default.event.event(hw_common_def_1.default.EVT_MPSDK_PLATFORMCONFIG_OK, data);
    };
    /**
     * @inner 内部调用
     * @param gameid
     * @param gamepath
     * @param defaultshareimage
     * @param defaultsharetitle
     */
    hw_common_config.prototype._init = function (gameid, gamepath, defaultshareimage, defaultsharetitle) {
        this._gameid = gameid;
        this._gamePath = gamepath;
        this._defaultShareImage = defaultshareimage;
        this._defaultShareTitle = defaultsharetitle;
        hw_common_1.default.event.on(hw_common_def_1.default.EVT_MPSDK_PLATFORMCONFIG_OK, this, this._onPlatformConfigGet);
    };
    //加载到运营平台配置
    hw_common_config.prototype._onPlatformConfigGet = function (config) {
        this._platformConfig = config;
    };
    Object.defineProperty(hw_common_config.prototype, "safe", {
        /**
         * 是否非审核的安全状态
         * false:审核时屏蔽所有违规功能
         * true:非审核状态,安全期
         */
        get: function () {
            trace("hw_common_config::safe->开始检测敏感信息");
            if (hw_common_1.default.platform.iswxgame == false) {
                return true;
            }
            if (this._platformConfig == null || this._platformConfig.status == undefined) {
                trace("hw_common_config::safe->没有拉取到服务器配置信息");
                return true;
            }
            if (this._platformConfig.level == '0') {
                //关闭所有敏感功能 高级限制保护 = 最低开放程度
                trace("hw_common_config::safe->关闭所有敏感功能");
                return false;
            }
            else if (this._platformConfig.level == '1') {
                //开放部分敏感功能 中级限制保护 = 中等开放程度
                trace("hw_common_config::safe->开放部分敏感功能");
                return false;
            }
            else if (this._platformConfig.level == '2') {
                //可全开敏感功能 低级限制保护 = 完全开放程度
                trace("hw_common_config::safe->可全开敏感功能");
                return true;
            }
            else {
                trace("hw_common_config::safe->其他情况");
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_common_config.prototype, "isStrongFission", {
        /**是否可以强裂变*/
        get: function () {
            var istrong = mpsdk.Hack.isStrongFission();
            trace("hw_common_config::safe->判断是否强烈变用户", istrong);
            return istrong;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_common_config.prototype, "AdChange", {
        /**广告刷新次数 */
        get: function () {
            var num = 2;
            if (this._platformConfig && this._platformConfig.AdChange) {
                num = +this._platformConfig.AdChange;
            }
            if (!num || num <= 0) {
                return 2;
            }
            return num;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_common_config.prototype, "csrewards_energy", {
        /**客服奖励_精力个数*/
        get: function () {
            var num = 0;
            if (this._platformConfig && this._platformConfig.csrewards_energy) {
                num = +this._platformConfig.csrewards_energy;
            }
            return num;
        },
        enumerable: true,
        configurable: true
    });
    hw_common_config.prototype._getSharePointJson = function (str) {
        if (str == null || str == "") {
            return null;
        }
        str = str.replace(/\s*/g, "");
        var alist = str.split("<");
        var obj = {};
        try {
            for (var _i = 0, alist_1 = alist; _i < alist_1.length; _i++) {
                var i = alist_1[_i];
                var blist = i.split(">");
                var key = blist[0];
                var value = blist[1];
                obj[key] = value;
            }
            return obj;
        }
        catch (error) {
            return null;
        }
    };
    /**
     * 从分享点列表中获取一个分享配置,100代表分享,200代表视频,个位数代表次数
     * @example:default必须
     * 	inactive>101|102:140,101|102:60<
     * 	default>101|102<
     * 	point1>101|102:100,101|102:60<
     *  point2>101|102:40,101|102:60<
     *  point3>101|102:40<
     * @param key 对应以上配置的key
     * @returns 单条配置 @example [101,102]
     */
    hw_common_config.prototype.getSharePointFromList = function (key) {
        if (!key)
            key = "default";
        var jsonstr_default = 'inactive>101|102:140,101|102:60<default>101|102<';
        var jsonstr = jsonstr_default;
        var jsonobj;
        var spstr;
        if (this._platformConfig && this._platformConfig.sharepointlist) {
            jsonstr = this._platformConfig.sharepointlist;
        }
        else {
            console.error("hw_common_config::getSharePointFromList->没有sharepointlist配置,使用默认配置");
        }
        jsonobj = this._getSharePointJson(jsonstr);
        if (!jsonobj) {
            console.error("hw_common_config::getSharePointFromList->json解析失败:", jsonstr);
        }
        var createTimeInterval = 5;
        var lastShareTimeInterval = 300;
        var onedayms = 24 * 3600 * 1000;
        var nowTime = hw_common_1.default.servertime.now;
        if (this._platformConfig && this._platformConfig.createTimeInterval) {
            createTimeInterval = +this._platformConfig.createTimeInterval;
        }
        if (this._platformConfig && this._platformConfig.lastShareTimeInterval) {
            lastShareTimeInterval = +this._platformConfig.lastShareTimeInterval;
        }
        if (createTimeInterval && lastShareTimeInterval &&
            hw_common_1.default.mpsdk.account && hw_common_1.default.mpsdk.account.createTime) {
            if (hw_common_1.default.servertime.loginTime - hw_common_1.default.mpsdk.account.createTime > createTimeInterval * onedayms &&
                hw_common_1.default.servertime.loginTime - hw_common_1.default.share.lastTrueShareTime > lastShareTimeInterval * onedayms) {
                spstr = jsonobj.inactive;
                trace("hw_common_config::getSharePointFromList: 使用不活跃配置", spstr);
            }
        }
        if (spstr == undefined) {
            spstr = jsonobj[key];
            trace("hw_common_config::getSharePointFromList->获取对应key值: key:", key, " value:", spstr);
        }
        if (spstr == undefined) {
            spstr = jsonobj.default;
            console.error("hw_common_config::getSharePointFromList->没有对应key值,使用默认配置:", spstr);
        }
        if (spstr) {
            var value = MathUtils_1.default.getRDFromStr_1(spstr);
            trace("hw_common_config::getSharePointFromList->随机到字符串:", value);
            if (value) {
                var list = value.split("|");
                var nlist = [];
                for (var i = 0; i < list.length; i++) {
                    nlist[i] = +list[i];
                }
                return nlist;
            }
        }
        console.error("hw_common_config::getSharePointFromList->未知错误默认返回视频:", spstr);
        return [201];
    };
    Object.defineProperty(hw_common_config.prototype, "sharepoint_advancetype", {
        /**
         * 获取sharepoint推进类型
         * @returns 0 普通推进: 分享成功,视频成功后推进
         * @returns 1 优先视频: 分享成功,失败,视频失败后推进,视频成功不推进
         */
        get: function () {
            var advtype = 0;
            if (this._platformConfig && this._platformConfig.sharepoint_advancetype) {
                advtype = +this._platformConfig.sharepoint_advancetype;
            }
            return advtype;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_common_config.prototype, "NotShowAppId", {
        /**
         * 不显示的appid
         * @returns [,,,]
         */
        get: function () {
            var disable = "";
            if (this._platformConfig && this._platformConfig.NotShowAppId) {
                disable = this._platformConfig.NotShowAppId;
            }
            var d1 = disable.split(",");
            return d1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_common_config.prototype, "Adshow", {
        /** 猜你喜欢和banner的显示切换*/
        get: function () {
            var show = 1;
            if (this._platformConfig && this._platformConfig.Adshow) {
                show = +this._platformConfig.Adshow;
            }
            return show == 1;
        },
        enumerable: true,
        configurable: true
    });
    hw_common_config.prototype._getAdFromList = function (type) {
        var t1 = hw_common_1.default.mpsdk.account.createTime;
        var t2 = hw_common_1.default.servertime.now;
        var day = TimeUtils_1.default.GetDayCntFromTime2(t1, t2) + 1;
        var flag = type;
        console.log("hw_common_config::_getAdFromList->创建时间:", t1, "系统时间:", t2);
        if (hw_common_def_1.default.LTV_TEST_LIST[flag][flag + "_" + day]) {
            console.log("hw_common_config::_getAdFromList->获取广告id", " type: ", flag, " day: ", day, " id: ", hw_common_def_1.default.LTV_TEST_LIST[flag][flag + "_" + day]);
            return hw_common_def_1.default.LTV_TEST_LIST[flag][flag + "_" + day];
        }
        else {
            console.log("hw_common_config::_getAdFromList->获取广告id", " type: ", flag, " day: ", day, " id: ", hw_common_def_1.default.LTV_TEST_LIST[flag][flag + "_" + 15]);
            return hw_common_def_1.default.LTV_TEST_LIST[flag][flag + "_" + 15];
        }
    };
    Object.defineProperty(hw_common_config.prototype, "bannerid", {
        /**服务器配置的bannerid */
        get: function () {
            if (hw_common_def_1.default.LTV_TEST) {
                return this._getAdFromList("banner");
            }
            else {
                if (this._platformConfig && this._platformConfig.bannerid) {
                    trace("hw_common_config::BannerId->获取服务器bannerid成功:", this._platformConfig.bannerid);
                    return this._platformConfig.bannerid;
                }
                trace("hw_common_config::BannerId->获取服务器bannerid失败");
                return platform.bannerId;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_common_config.prototype, "videoid", {
        /**服务器配置的videoid */
        get: function () {
            if (hw_common_def_1.default.LTV_TEST) {
                return this._getAdFromList("video");
            }
            else {
                if (this._platformConfig && this._platformConfig.videoid) {
                    trace("hw_common_config::BannerId->获取服务器videoid成功:", this._platformConfig.videoid);
                    return this._platformConfig.videoid;
                }
                trace("hw_common_config::BannerId->获取服务器videoid失败");
                return platform.videoId;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_common_config.prototype, "interstitialAdId", {
        /**服务器配置的interstitialAdId */
        get: function () {
            if (hw_common_def_1.default.LTV_TEST) {
                return this._getAdFromList("chaping");
            }
            else {
                if (this._platformConfig && this._platformConfig.interstitialAdId) {
                    trace("hw_common_config::interstitialAdId->获取服务器InterstitialAdId成功:", this._platformConfig.interstitialAdId);
                    return this._platformConfig.interstitialAdId;
                }
                trace("hw_common_config::interstitialAdId->获取服务器InterstitialAdId失败");
                return platform.interstitialAdId;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_common_config.prototype, "sharemode", {
        /**
         * 强制分享开关
         * 1:分享失败系统弹窗不显示取消按钮,只有确定按钮
         * 0:分享失败系统弹窗显示取消按钮
         * @returns
         */
        get: function () {
            if (this._platformConfig && this._platformConfig.sharemode) {
                return +this._platformConfig.sharemode;
            }
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_common_config.prototype, "videomode", {
        /**
         * 关视频后的提示
         * 1:开启后弹出系统确认框,点击确定继续拉视频和取消
         * 0:不开启是浮动tips显示文字
         * @returns
         */
        get: function () {
            if (this._platformConfig && this._platformConfig.videomode) {
                return +this._platformConfig.videomode;
            }
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_common_config.prototype, "forceShare", {
        /** 是否强制分享:不成功一直弹提示框*/
        get: function () {
            try {
                if (this.sharemode != 1) {
                    trace("hw_common_config::forceShare->强制分享成功功能:后台开关关闭");
                    return false;
                }
                if (this.shareLimitByCity) {
                    trace("hw_common_config::forceShare->强制分享成功功能:因为城市限制关闭");
                    return false;
                }
                var timestr = "";
                if (this._platformConfig && this._platformConfig.sharemodetime) {
                    timestr = this._platformConfig.sharemodetime;
                }
                var timeArr = timestr.split(",");
                var timeArr2 = [];
                for (var _i = 0, timeArr_1 = timeArr; _i < timeArr_1.length; _i++) {
                    var i = timeArr_1[_i];
                    if (i == null || i == "") {
                        continue;
                    }
                    var arr = i.split("_");
                    if (arr.length == 2) {
                        timeArr2.push(arr);
                    }
                }
                var curTime = hw_common_1.default.servertime.now;
                var hour = new Date(curTime).getHours();
                for (var _a = 0, timeArr2_1 = timeArr2; _a < timeArr2_1.length; _a++) {
                    var i = timeArr2_1[_a];
                    if (+i[0] <= hour && hour <= +i[1]) {
                        trace("hw_common_config::forceShare->强制分享成功功能:因时间关闭");
                        return false;
                    }
                }
                trace("hw_common_config::forceShare->强制分享成功功能：返回true");
                return true;
            }
            catch (e) {
                trace("hw_common_config::forceShare->强制分享成功功能:报错", e);
                return false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_common_config.prototype, "sharetime_success", {
        /** 调起分享的时间限制 */
        get: function () {
            var sharetime_success = 3000;
            if (this._platformConfig && this._platformConfig.sharetime_success) {
                sharetime_success = +this._platformConfig.sharetime_success;
            }
            return sharetime_success;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_common_config.prototype, "sharetime_success_android", {
        /** 调起分享的时间限制android版本 */
        get: function () {
            var sharetime_success_android = this.sharetime_success;
            if (this._platformConfig && this._platformConfig.sharetime_success_android) {
                sharetime_success_android = +this._platformConfig.sharetime_success_android;
            }
            return sharetime_success_android;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_common_config.prototype, "sharefail_chance", {
        /** 分享失败的概率*/
        get: function () {
            var sharefail_chance = 0.3;
            if (this._platformConfig && this._platformConfig.sharefail_chance) {
                sharefail_chance = +this._platformConfig.sharefail_chance;
            }
            return sharefail_chance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_common_config.prototype, "sharefail_chance_android", {
        /** 分享失败的概率android版本*/
        get: function () {
            var sharefail_chance_android = this.sharefail_chance;
            if (this._platformConfig && this._platformConfig.sharefail_chance_android) {
                sharefail_chance_android = +this._platformConfig.sharefail_chance_android;
            }
            return sharefail_chance_android;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_common_config.prototype, "first_sharefail", {
        /** 后台控制第一次分享是否会失败*/
        get: function () {
            var first_sharefail = 1;
            if (this._platformConfig && this._platformConfig.first_sharefail) {
                first_sharefail = +this._platformConfig.first_sharefail;
            }
            return first_sharefail == 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_common_config.prototype, "shareFailToastTips", {
        /** 后台配分享失败提示语 */
        get: function () {
            var shareFailToastTips = "";
            if (this.safe && this.isStrongFission) {
                if (this._platformConfig && this._platformConfig.shareFailToastTips) {
                    shareFailToastTips = this._platformConfig.shareFailToastTips;
                    if (shareFailToastTips) {
                        var value = MathUtils_1.default.getRDFromStr_1(shareFailToastTips);
                        trace("hw_common_config::shareFailToastTips->随机到字符串:", value);
                        return value;
                    }
                }
                shareFailToastTips = "分享失败，请分享到不同群";
            }
            return shareFailToastTips;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_common_config.prototype, "shareFailModalTips", {
        /**
         * 后台配强制分享失败微信提示框提示语
         */
        get: function () {
            var shareFailModalTips = "";
            if (this._platformConfig && this._platformConfig.shareFailModalTips) {
                shareFailModalTips = this._platformConfig.shareFailModalTips;
                if (shareFailModalTips) {
                    var value = MathUtils_1.default.getRDFromStr_1(shareFailModalTips);
                    trace("hw_common_config::shareFailModalTips->随机到字符串:", value);
                    return value;
                }
            }
            return "分享失败,请重新尝试";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_common_config.prototype, "sharefail_modaltips_android", {
        /**
         * 后台配强制分享失败微信提示框提示语android版本
         */
        get: function () {
            var sharefail_modaltips_android = "";
            if (this._platformConfig && this._platformConfig.sharefail_modaltips_android) {
                sharefail_modaltips_android = this._platformConfig.sharefail_modaltips_android;
                if (sharefail_modaltips_android) {
                    var value = MathUtils_1.default.getRDFromStr_1(sharefail_modaltips_android);
                    trace("hw_common_config::sharefail_modaltips_android->随机到字符串:", value);
                    return value;
                }
            }
            return this.shareFailModalTips;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_common_config.prototype, "sharefail_secondui", {
        /**
         * 后台配强制分享失败微信提示框提示语android版本
         */
        get: function () {
            var sharefail_secondui = "";
            if (this._platformConfig && this._platformConfig.sharefail_secondui) {
                sharefail_secondui = this._platformConfig.sharefail_secondui;
                if (sharefail_secondui) {
                    var value = MathUtils_1.default.getRDFromStr_1(sharefail_secondui);
                    trace("hw_common_config:: sharefail_secondui->随机到字符串:", value);
                    return value;
                }
            }
            return this.shareFailModalTips;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_common_config.prototype, "gm_state", {
        /**
         * gm开启状态
         * @returns 0关闭,1开启
         */
        get: function () {
            var gm_state = 0;
            if (this._platformConfig && this._platformConfig.gm_state) {
                gm_state = +this._platformConfig.gm_state;
            }
            return gm_state;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_common_config.prototype, "gm_whitelist", {
        /** GM白名单*/
        get: function () {
            var whitelist = "";
            if (this._platformConfig && this._platformConfig.gm_whitelist) {
                whitelist = this._platformConfig.gm_whitelist;
            }
            var d1 = whitelist.split(",");
            return d1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_common_config.prototype, "gm_open", {
        /**
         * 判断自己是否在GM的白名单内,并且GM是开启状态
         */
        get: function () {
            var selfopenid = hw_common_1.default.mpsdk.openid;
            if (!selfopenid) {
                console.error("hw_common_config::inGMWhiteList->还未获得玩家openid,不能判断是否在白名单内");
                return false;
            }
            if (!this.gm_state)
                return;
            var wlist = this.gm_whitelist;
            for (var _i = 0, wlist_1 = wlist; _i < wlist_1.length; _i++) {
                var i = wlist_1[_i];
                if (i == selfopenid) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_common_config.prototype, "interstitialAdConfig", {
        /**
         * 插屏广告配置
         * @returns [当前关卡,关卡间隔,视频间隔]
         */
        get: function () {
            try {
                var value = "15,3,60";
                if (this._platformConfig && this._platformConfig.interstitialAdConfig) {
                    value = this._platformConfig.interstitialAdConfig;
                }
                var slist = value.split(",");
                if (slist.length != 3) {
                    return [15, 3, 60];
                }
                var numList = [];
                for (var _i = 0, slist_1 = slist; _i < slist_1.length; _i++) {
                    var i = slist_1[_i];
                    numList.push(+i);
                }
                return numList;
            }
            catch (e) {
                return [15, 3, 60];
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_common_config.prototype, "shareLimitByCity", {
        /** 判断当前城市是否在分享限制黑名单中 */
        get: function () {
            if (this._platformConfig) {
                return mpsdk.Hack.checkShareCityLimit(this._platformConfig);
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_common_config.prototype, "onlyVideoByCity", {
        /** 判断当前城市是否只视频 */
        get: function () {
            var isonly = false;
            if (this._platformConfig) {
                isonly = mpsdk.Hack.checkCityLimit(this._platformConfig, "shareshutdowncity");
            }
            trace("hw_common_config::onlyVideoByCity->判断是否仅视频城市:", isonly);
            return isonly;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 查看功能是否开启,功能id和策划约定 @example 101:0,102:1
     * @param funcid 功能id:和策划约定
     * @returns 0:未开启,1:开启
     */
    hw_common_config.prototype.getGameFuncOpen = function (funcid) {
        var gamefuncopen = "";
        if (this._platformConfig && this._platformConfig.gamefuncopen) {
            var str = this._platformConfig.gamefuncopen;
            var tips = str.split(",");
            for (var _i = 0, tips_1 = tips; _i < tips_1.length; _i++) {
                var i = tips_1[_i];
                var tag = i.split(":");
                var id = +tag[0];
                var openstuts = +tag[1];
                if (id == funcid) {
                    return openstuts;
                }
            }
        }
        return 1;
    };
    return hw_common_config;
}());
exports.default = hw_common_config;
},{"../../hw_utils/MathUtils":19,"../../hw_utils/TimeUtils":21,"../hw_common":2,"../hw_common_def":3}],5:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var hw_common_event = /** @class */ (function (_super) {
    __extends(hw_common_event, _super);
    function hw_common_event() {
        return _super.call(this) || this;
    }
    /**
     * 检查 EventDispatcher 对象是否为特定事件类型注册了任何侦听器。
     * @param	type 事件的类型。
     * @return 如果指定类型的侦听器已注册，则值为 true；否则，值为 false。
     */
    hw_common_event.prototype.hasListener = function (type) {
        return _super.prototype.hasListener.call(this, type);
    };
    /**
     * 派发事件。
     * @param type	事件类型。
     * @param data	（可选）回调数据。<b>注意：</b>如果是需要传递多个参数 p1,p2,p3,...可以使用数组结构如：[p1,p2,p3,...] ；如果需要回调单个参数 p ，且 p 是一个数组，则需要使用结构如：[p]，其他的单个参数 p ，可以直接传入参数 p。
     * @return 此事件类型是否有侦听者，如果有侦听者则值为 true，否则值为 false。
     */
    hw_common_event.prototype.event = function (type, data) {
        return _super.prototype.event.call(this, type, data);
    };
    /**
     * 使用 EventDispatcher 对象注册指定类型的事件侦听器对象，以使侦听器能够接收事件通知。
     * @param type		事件的类型。
     * @param caller	事件侦听函数的执行域。
     * @param listener	事件侦听函数。
     * @param args		（可选）事件侦听函数的回调参数。
     * @return 此 EventDispatcher 对象。
     */
    hw_common_event.prototype.on = function (type, caller, listener, args) {
        return _super.prototype.on.call(this, type, caller, listener, args);
    };
    /**
     * 使用 EventDispatcher 对象注册指定类型的事件侦听器对象，以使侦听器能够接收事件通知，此侦听事件响应一次后自动移除。
     * @param type		事件的类型。
     * @param caller	事件侦听函数的执行域。
     * @param listener	事件侦听函数。
     * @param args		（可选）事件侦听函数的回调参数。
     * @return 此 EventDispatcher 对象。
     */
    hw_common_event.prototype.once = function (type, caller, listener, args) {
        return _super.prototype.once.call(this, type, caller, listener, args);
    };
    /**
     * 从 EventDispatcher 对象中删除侦听器。
     * @param type		事件的类型。
     * @param caller	事件侦听函数的执行域。
     * @param listener	事件侦听函数。
     * @param onceOnly	（可选）如果值为 true ,则只移除通过 once 方法添加的侦听器。
     * @return 此 EventDispatcher 对象。
     */
    hw_common_event.prototype.off = function (type, caller, listener, onceOnly) {
        return _super.prototype.off.call(this, type, caller, listener, onceOnly);
    };
    /**
     * 从 EventDispatcher 对象中删除指定事件类型的所有侦听器。
     * @param type	（可选）事件类型，如果值为 null，则移除本对象所有类型的侦听器。
     * @return 此 EventDispatcher 对象。
     */
    hw_common_event.prototype.offAll = function (type) {
        return _super.prototype.offAll.call(this, type);
    };
    /**
     * 移除caller为target的所有事件监听
     * @param	caller caller对象
     */
    hw_common_event.prototype.offAllCaller = function (caller) {
        return _super.prototype.offAllCaller.call(this, caller);
    };
    return hw_common_event;
}(laya.events.EventDispatcher));
exports.default = hw_common_event;
},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hw_common_1 = require("../hw_common");
var hw_common_def_1 = require("../hw_common_def");
/*
* mpsdk接口组件
*/
var hw_common_mpsdk = /** @class */ (function () {
    function hw_common_mpsdk() {
        this._friendList = [];
        this._friendOpenIdList = [];
        this._invateUpdateTime = 0;
    }
    Object.defineProperty(hw_common_mpsdk.prototype, "openid", {
        /**服务器从微信换取的openid */
        get: function () {
            if (this._openid)
                return this._openid;
            if (this._account)
                return this._account.openid;
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_common_mpsdk.prototype, "account", {
        /**
         * 获取账号信息
         * @returns mpsdk.IAccount
         */
        get: function () {
            return this._account;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_common_mpsdk.prototype, "newPlayer", {
        /**是否新用户 */
        get: function () {
            if (hw_common_def_1.default.DEBUG_NEWPLAYER) {
                console.error('hw_common_mpsdk::newPlayer->正在进行新手测试,请注意关闭!!');
                return true;
            }
            if (!this._account) {
                console.warn('hw_common_mpsdk::newPlayer->还没有获取到账号信息,不能判断新老用户');
                return false;
            }
            return !this._account.lastLoginTime || this._account.lastLoginTime == this._account.createTime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_common_mpsdk.prototype, "friendlist", {
        /**平台通过邀请链接创建的好友列表 */
        get: function () {
            return this._friendList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_common_mpsdk.prototype, "friendOpenidlist", {
        /**平台通过邀请链接创建的好友列表 */
        get: function () {
            return this._friendOpenIdList;
        },
        enumerable: true,
        configurable: true
    });
    hw_common_mpsdk.prototype._init = function () {
        this._inittime = Date.now();
        this._initMpsdk();
        this._initAccount(); //拿到openid才能请求数据
        this._getOpenLevel();
    };
    hw_common_mpsdk.prototype._initMpsdk = function () {
        var _this = this;
        var launchoption = hw_common_1.default.platform.getLaunchOptionsSync();
        mpsdk.init(hw_common_1.default.config.gameid, hw_common_1.default.config.gamePath, launchoption).then(function (openid) {
            trace('hw_common_mpsdk::init->获取到openid:', openid, launchoption);
            _this._openid = openid;
            mpsdk.Report.reportLogin(0, 0, 0);
            _this.invateAccept(launchoption);
            _this._secondUpdate();
            _this.reportEvent(hw_common_def_1.default.REPORT_MPSDKINIT, "1", _this._getPasstime() + "");
        }).catch(function (res) {
            console.error('hw_common_mpsdk::init->登陆失败:', res);
            _this.reportEvent(hw_common_def_1.default.REPORT_MPSDKINIT, "0", _this._getPasstime() + "");
            hw_common_1.default.platform.showModal("登陆失败，请重试(" + res + ")", function () { });
        });
    };
    /**
     * 加载玩家账号信息
     */
    hw_common_mpsdk.prototype._initAccount = function () {
        var _this = this;
        if (platform.debug) {
            Laya.timer.once(1, this, function () {
                var account = hw_common_def_1.default.DEBUG_ACCOUNT;
                _this._account = account;
                hw_common_1.default.event.event(hw_common_def_1.default.EVT_SD_SERVERDATA_OK);
                hw_common_1.default.event.event(hw_common_def_1.default.EVT_MPSDK_LASTTRUESHARETM_OK, 0);
                hw_common_1.default.event.event(hw_common_def_1.default.EVT_MPSDK_ACCOUNT_OK);
            });
            return;
        }
        mpsdk.Account.getAccountSafe().then(function (res) {
            trace('hw_common_mpsdk::loadAccount->初始化账号成功:', res);
            _this._account = res;
            _this._getLastTrueShareTime();
            hw_common_1.default.event.event(hw_common_def_1.default.EVT_MPSDK_ACCOUNT_OK);
            _this.reportEvent(hw_common_def_1.default.REPORT_ACCOUNT_OK, "1", _this._getPasstime() + "");
        }).catch(function (e) {
            console.error("hw_common_mpsdk::loadAccount->无法拿到账号信息,退出游戏");
            _this.reportEvent(hw_common_def_1.default.REPORT_ACCOUNT_OK, "0", _this._getPasstime() + "");
            hw_common_1.default.platform.showModal("账号初始化失败，请重新打开游戏", function () {
                hw_common_1.default.platform.exitMiniProgram();
            });
        });
    };
    /**
     * 获取运营平台配置文件
     */
    hw_common_mpsdk.prototype._getOpenLevel = function () {
        var _this = this;
        mpsdk.getOpenLevel(platform.version, hw_common_1.default.config.gameid).then(function (data) {
            trace('hw_common_mpsdk::_getOpenLevel->获取到运营配置信息:', data);
            hw_common_1.default.config._setPlatformConfig(data);
            _this.reportEvent(hw_common_def_1.default.REPORT_PLATFORMCONFIG_OK, "1", _this._getPasstime() + "");
        }).catch(function (e) {
            console.error("hw_common_mpsdk::_getOpenLevel->无法拿到运营配置信息");
            _this.reportEvent(hw_common_def_1.default.REPORT_PLATFORMCONFIG_OK, "0", _this._getPasstime() + "");
        });
    };
    hw_common_mpsdk.prototype._getPasstime = function () {
        return Date.now() - this._inittime;
    };
    /**
     * 每秒更新一次,用于好友列表同步等心跳数据
     */
    hw_common_mpsdk.prototype._secondUpdate = function () {
        Laya.timer.loop(1000, this, this.updateInvateList);
    };
    /**
     * 获取上次真实分享得时间
     */
    hw_common_mpsdk.prototype._getLastTrueShareTime = function () {
        mpsdk.Account.getLastShareTime().then(function (time) {
            trace("hw_common_mpsdk::init->getLastShareTime->获取到openid:上次分享时间：", time);
            hw_common_1.default.event.event(hw_common_def_1.default.EVT_MPSDK_LASTTRUESHARETM_OK, time);
        });
    };
    /**
     * 数据打点 游戏事件id不允许为负值
     * @param eventid
     * @param param1
     * @param param2
     */
    hw_common_mpsdk.prototype.reportEvent = function (eventid, param1, param2) {
        if (param1 === void 0) { param1 = null; }
        if (param2 === void 0) { param2 = null; }
        mpsdk.Report.reportEvent(eventid, param1, param2);
        trace("hw_common_mpsdk::reportEvent->打点数据上报:", eventid, param1, param2);
    };
    /**
     * 如果有邀请功能,记录邀请列表
     * @param obj
     */
    hw_common_mpsdk.prototype.invateAccept = function (obj) {
        if (obj == null || obj.query == null) {
            trace('hw_common_mpsdk::invateAccept->没有分享参数:');
            return;
        }
        if (obj.query.userid == null || (obj.query.invite == null)) {
            trace('hw_common_mpsdk::invateAccept->没有分享参数[userid][fieldid]');
            return;
        }
        if (this._openid == obj.query.userid) {
            trace('hw_common_mpsdk::invateAccept->自己分享出去的连接');
            return;
        }
        trace('hw_common_mpsdk::invateAccept->接受好友邀请1,userid:', obj.query.userid, "myopenid:", this._openid);
        var str = JSON.stringify({ invite: obj.query.invite });
        str = encodeURIComponent(str);
        mpsdk.Account.getAccountSafe().then(function (iAcount) {
            var lasttime = iAcount.lastLoginTime;
            if (obj.query) {
                if (obj.query.userid) {
                    var payload = str + "_" + hw_common_1.default.servertime.now;
                    mpsdk.SNS.inviteAccept(obj.query.userid, payload, 1, lasttime);
                    trace('hw_common_mpsdk::invateAccept->接受好友邀请2:', lasttime);
                }
            }
        }).catch(function (res) {
            console.warn("hw_common_mpsdk::invateAccept->", res);
        });
    };
    /**
     * 更新好友列表
     */
    hw_common_mpsdk.prototype.updateInvateList = function () {
        var _this = this;
        var nowtime = hw_common_1.default.servertime.now;
        if (nowtime - this._invateUpdateTime < hw_common_def_1.default.DEF_FRIENDREFRESH) {
            return;
        }
        this._invateUpdateTime = nowtime;
        mpsdk.SNS.inviteResultList(1).then(function (list) {
            trace("hw_common_mpsdk::_updateInvateList->加载好友列表:", list);
            if (list == null) {
                return;
            }
            _this._friendList = list.friends;
            _this._friendOpenIdList = list.openId;
        });
    };
    return hw_common_mpsdk;
}());
exports.default = hw_common_mpsdk;
},{"../hw_common":2,"../hw_common_def":3}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hw_platform_wx_1 = require("./hw_platform_wx");
var hw_platform_web_1 = require("./hw_platform_web");
var hw_common_1 = require("../hw_common");
var hw_common_def_1 = require("../hw_common_def");
/**
 * 运行平台相关接口
 * @author yahu
 * @version 0.0.1 修改为通用模板
 */
var hw_common_platform = /** @class */ (function () {
    function hw_common_platform() {
        this._phoneMarginTop = -1; //刘海屏高度缓存
        this._shareFailCNT = -1; //分享失败次数,-1表示未开启,用于第一次分享必定失败,>=0按照配置计数
        this._loginSceneId = 0; //登陆场景值
        this._isHotStart = false; //是否是热启动
        this._tryPlayCallBack = null; //试玩其他游戏的回调
    }
    Object.defineProperty(hw_common_platform.prototype, "userInfo", {
        /**
         * 获取平台用户信息
         * @see https://developers.weixin.qq.com/minigame/dev/api/open-api/user-info/UserInfo.html
         */
        get: function () {
            return this._platform.userInfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_common_platform.prototype, "netConnect", {
        /**网络是否正常连接 */
        get: function () {
            return this._platform.netConnect;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_common_platform.prototype, "bannerShowed", {
        /**广告是否显示状态 */
        get: function () {
            return this._platform.bannerShowed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_common_platform.prototype, "isweb", {
        /**是否web开发平台 */
        get: function () {
            return this._platform instanceof hw_platform_web_1.default;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_common_platform.prototype, "iswxgame", {
        /**是否微信小游戏 */
        get: function () {
            return window["wx"] != undefined && window["wx"]["getSystemInfo"] != undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_common_platform.prototype, "phoneMarginTop", {
        /**
         * 获取刘海屏高度
         * 非刘海屏返回0,
         * 刘海屏返回刘海屏高度(pixel)
         */
        get: function () {
            if (this._phoneMarginTop >= 0) {
                return this._phoneMarginTop;
            }
            try {
                var sysinfo = hw_common_1.default.platform.getSystemInfoSync();
                if (sysinfo == null)
                    return 0;
                var screenW = sysinfo.screenWidth;
                var screenH = sysinfo.screenHeight;
                if (!sysinfo.statusBarHeight) {
                    this._phoneMarginTop = 0;
                    return 0;
                }
                var ratio = screenH / screenW; //长宽比
                if (sysinfo.statusBarHeight > 25 && ratio > 1.9) {
                    this._phoneMarginTop = 60;
                    return 60;
                }
                else {
                    this._phoneMarginTop = 0;
                    return 0;
                }
            }
            catch (e) {
                trace("hw_common_platform::phoneMarginTop->", "获取系统信息失败");
                return 0;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @inner 初始化
     */
    hw_common_platform.prototype._init = function () {
        if (hw_common_1.default.platform.iswxgame) {
            this._platform = new hw_platform_wx_1.default();
        }
        else {
            this._platform = new hw_platform_web_1.default();
        }
        this._platform.Init();
        hw_common_1.default.event.on(hw_common_def_1.default.EVT_MPSDK_ACCOUNT_OK, this, this._onAccount);
        hw_common_1.default.event.on(hw_common_def_1.default.EVT_PLATFORM_ONSHOW, this, this._onShowGame);
    };
    hw_common_platform.prototype._onAccount = function () {
        this._platform.preloadVideoAd();
    };
    /**
     * 获取数据域的显示图像
     * @param stoptime 经过stoptime时间后图像保持静止不刷新,提高性能 默认0是一直刷新
     * @returns 返回一个Sprite,可以添加在显示列表的任意位置
     */
    hw_common_platform.prototype.getShareSprite = function (stoptime) {
        if (stoptime === void 0) { stoptime = 0; }
        return this._platform.getShareBitmap(stoptime);
    };
    /**
     * 向共享域发送消息
     * @param obj @example { command: "openrank", value: "friend", top: this._ranY }
     */
    hw_common_platform.prototype.postMessage = function (obj) {
        return this._platform.postMessage(obj);
    };
    /**
     * 存储共享域使用的排行数据
     * @param kvobj @example [{ key: DataDef.CloudStorage_BestScore, value: this._data.levelData.level + "" }]
     */
    hw_common_platform.prototype.setUserCloudStorage = function (kvobj) {
        this._platform.setUserCloudStorage(kvobj);
    };
    /**刷新广告内容 */
    hw_common_platform.prototype.refreshBanner = function () {
        this._platform.refreshBanner();
    };
    /**
     * 显示或隐藏banner广告
     * @param show true:显示广告 close:关闭广告
     */
    hw_common_platform.prototype.showBannerAd = function (show) {
        this._platform.showBannerAd(show);
    };
    /**
     * 获取登陆参数
     * @returns 登陆参数 @see https://developers.weixin.qq.com/minigame/dev/api/base/app/life-cycle/wx.getLaunchOptionsSync.html
     */
    hw_common_platform.prototype.getLaunchOptionsSync = function () {
        var obj = this._platform.getLaunchOptionsSync();
        trace("hw_platform::getLaunchOptionsSync->获取登陆参数:", obj);
        return obj;
    };
    /**
     * 获取设备信息
     * @returns 设备信息列表 @see https://developers.weixin.qq.com/minigame/dev/api/base/system/system-info/wx.getSystemInfoSync.html
     */
    hw_common_platform.prototype.getSystemInfoSync = function () {
        var obj = this._platform.getSystemInfoSync();
        trace("hw_platform::getSystemInfoSync->获取平台信息:", obj);
        return obj;
    };
    /**
     * 不推荐使用该接口,推荐使用hw_common.share里面的shareGet接口
     * 获取平台分享数据并拉起分享
     * @param shareid 跟策划或运营约定的分享id
     * @param arg 分享参数
     * @param success 分享成功回调
     * @param fail 分享失败回调
     * @param customobj 自定义分享方法,比如自己画图分享等 @example { mothed: Function, sharefunparam?: any } mothed:自定义分享方法,param:自定义分享参数
     */
    hw_common_platform.prototype._share = function (shareid, arg, success, fail, customobj) {
        var _this = this;
        if (arg === void 0) { arg = null; }
        if (success === void 0) { success = null; }
        if (fail === void 0) { fail = null; }
        this._shareTime = Date.now();
        if (success) {
            this._shareSuccessCallBack = function () {
                if (success)
                    success();
            };
        }
        if (fail) {
            this._shareFailCallBack = function () {
                if (fail)
                    fail();
            };
        }
        if (customobj) {
            return customobj.mothed.apply(customobj.thisarg, customobj.args);
        }
        var info = mpsdk.Share.commonShare({ serial: shareid, params: arg, version: platform.version }, null, function () {
            if (_this._shareFailCallBack) {
                if (!_this.isweb)
                    _this._shareFailCallBack();
                _this._shareFailCallBack = null;
                _this._shareSuccessCallBack = null;
            }
        }, this);
        this._platform.shareAppMessage(info, success);
    };
    //这是一个动态生成分享图的例子:底图+文字
    hw_common_platform.prototype.newfun = function (chengyu, pingyin) {
        var _this = this;
        var canvas = wx.createCanvas();
        var context = canvas.getContext("2d");
        var image = wx.createImage();
        context.clearRect(0, 0, 400, 320);
        image.onload = function () {
            context.drawImage(image, 0, 0);
            context.font = "bold 55px SimSun";
            context.fillStyle = "#dd3e3e";
            context.textAlign = "center";
            context.textBaseline = "top";
            for (var u = chengyu.length, s = 0; s < u; ++s) {
                context.strokeText(chengyu[s], 65 + 80 * s, 145);
                context.fillText(chengyu[s], 65 + 80 * s, 145);
            }
            context.font = "bold 30px SimSun";
            context.fillStyle = "#000000";
            var plist = pingyin.split(" ");
            for (var u = plist.length, s = 0; s < u; ++s) {
                context.fillText(plist[s], 65 + 80 * s, 90);
            }
            var url = canvas.toTempFilePathSync({
                x: 0,
                y: 0,
                width: 400,
                height: 320,
                destWidth: 400,
                destHeight: 320
            });
            var info = mpsdk.Share.commonShare({ serial: 0, params: null, image: url }, null, null, _this);
            if (url) {
                info.imageUrl = url;
                info.title = "@你 又会了一个新成语，来看看你会几个！";
            }
            _this._platform.shareAppMessage(info);
        };
        image.src = "res/assets/other/shareBg.png";
    };
    /**
     * 主动拉起分享界面
     * @param shareObj mpsdk.Share.commonShare接口返回的分享数据
     * @param successfun 分享成功方法,已经被微信作废
     */
    hw_common_platform.prototype.shareAppMessage = function (shareInfo, successfun) {
        this._platform.shareAppMessage(shareInfo, successfun);
    };
    //检测分享是否成功
    hw_common_platform.prototype._checkShareSuccess = function (show2) {
        var successtime = show2 ? hw_common_1.default.config.sharetime_success_android : hw_common_1.default.config.sharetime_success;
        if (Date.now() - this._shareTime < successtime) {
            //时间没有到n秒，不算成功
            trace("hw_platform::checkShareSuccess->时间没有达到失败");
            return false;
        }
        if (hw_common_1.default.config.first_sharefail) {
            if (this._shareFailCNT < 0) {
                trace("hw_platform::checkShareSuccess->第一次分享失败");
                this._shareFailCNT = 0;
                return false;
            }
        }
        var sharefail_chance = show2 ? hw_common_1.default.config.sharefail_chance_android : hw_common_1.default.config.sharefail_chance;
        if (Math.random() <= sharefail_chance) {
            this._shareFailCNT++;
            trace("hw_platform::checkShareSuccess->概率失败");
            return false;
        }
        trace("hw_platform::checkShareSuccess->分享成功");
        this._shareFailCNT = 0;
        return true;
    };
    /**
     * 不推荐使用该接口,推荐使用hw_common.share里面的videoGet接口
     * 观看视频,微信没有提供作用域,请用箭头函数或bind指定作用域
     * @param okfun 视频观看成功
     * @param closefun 提前关闭视频
     * @param errorfun 视频观看异常
     * @param param 附加参数,暂无作用
     */
    hw_common_platform.prototype._showVideo = function (okfun, closefun, errorfun, param) {
        this._platform.showRewardedVideoAd(okfun, closefun, errorfun, param);
    };
    /**
     * 判断是否从某场景值进入游戏
     * @param sceneid 微信后台的场景值列表 @see https://developers.weixin.qq.com/minigame/dev/reference/scene-list.html
     */
    hw_common_platform.prototype.ShowInBy = function (wxsceneid) {
        var sceneid = 0;
        var loginobj = this.getLaunchOptionsSync();
        if (this._loginSceneId) {
            sceneid = this._loginSceneId;
        }
        else if (loginobj) {
            sceneid = loginobj.scene;
        }
        else {
            trace("hw_platform::ShowInBy->没有发现进入场景值");
            return false;
        }
        if (sceneid == wxsceneid) {
            return true;
        }
        return false;
    };
    /**
     * 小游戏进入前台时的处理
     * @inner 内部使用,外部不要调用
     * @param res 平台切入前台的参数
     */
    hw_common_platform.prototype._onShowGame = function (res) {
        var _this = this;
        trace("hw_common_platform::_OnShowGame 小游戏回到前台", res);
        if (res.scene)
            this._loginSceneId = res.scene; //设置场景值
        if (!this._isHotStart)
            this._isHotStart = true; //第二次就标记为热启动
        //需要延时处理的
        Laya.timer.once(100, this, function () {
            _this._onShowShare();
        });
        hw_common_1.default.mpsdk.reportEvent(hw_common_def_1.default.REPORT_ONSHOW, this._loginSceneId + "");
    };
    //切到前台判断分享
    hw_common_platform.prototype._onShowShare = function () {
        var _this = this;
        if (this._shareSuccessCallBack) {
            mpsdk.Share.checkValidShare()
                .then(function (success) {
                if (success) {
                    if (_this._checkShareSuccess(true)) {
                        trace("hw_common_platform::onShowShare->分享成功");
                        if (_this._shareSuccessCallBack)
                            _this._shareSuccessCallBack();
                    }
                    else {
                        trace("hw_common_platform::onShowShare->分享失败1");
                        hw_common_1.default.share.shareFailType = 2;
                        if (_this._shareFailCallBack)
                            _this._shareFailCallBack();
                    }
                }
                else {
                    trace("hw_common_platform::onShowShare->分享失败2");
                    hw_common_1.default.share.shareFailType = 1;
                    if (_this._shareFailCallBack)
                        _this._shareFailCallBack();
                }
                _this._shareSuccessCallBack = null;
                _this._shareFailCallBack = null;
            }).catch(function () {
                if (_this._checkShareSuccess(false)) {
                    trace("hw_common_platform::onShowShare->catch分享成功");
                    if (_this._shareSuccessCallBack)
                        _this._shareSuccessCallBack();
                }
                else {
                    hw_common_1.default.share.shareFailType = 0;
                    trace("hw_common_platform::onShowShare->catch分享失败");
                    if (_this._shareFailCallBack)
                        _this._shareFailCallBack();
                }
                _this._shareSuccessCallBack = null;
                _this._shareFailCallBack = null;
            });
        }
    };
    //切到前台,判断游戏试玩
    hw_common_platform.prototype._onShowTryPlay = function () {
        var _this = this;
        //试玩回调
        Laya.timer.once(500, this, function () {
            if (_this._tryPlayCallBack) {
                _this._tryPlayCallBack();
                _this._tryPlayCallBack = null;
            }
        });
    };
    /**
     * 微信模态提示框
     * @param content 提示内容
     * @param okfun 确定回调
     * @param showcancel 是否显示取消按钮
     * @param confirmText 确定按钮文字
     * @param cancelText 取消按钮文字
     * @param cancelfun 取消回调
     */
    hw_common_platform.prototype.showModal = function (content, okfun, showcancel, confirmText, cancelText, cancelfun) {
        if (okfun === void 0) { okfun = null; }
        if (showcancel === void 0) { showcancel = false; }
        if (confirmText === void 0) { confirmText = "确定"; }
        if (cancelText === void 0) { cancelText = "取消"; }
        if (cancelfun === void 0) { cancelfun = null; }
        this._platform.showModal(content, okfun, showcancel, confirmText, cancelText, cancelfun);
    };
    /**
     * 平台浮动提示
     * @param content
     * @param args https://developers.weixin.qq.com/minigame/dev/api/ui/interaction/wx.showToast.html
     */
    hw_common_platform.prototype.showToast = function (content, args) {
        if (args === void 0) { args = { icon: "none" }; }
        if (content == null || content == "") {
            return;
        }
        this._platform.showToast(content, args);
    };
    /**主动退出游戏*/
    hw_common_platform.prototype.exitMiniProgram = function () {
        trace("hw_platform::exitMiniProgram->主动退出游戏");
        this._platform.exitMiniProgram({
            success: null,
            fail: null,
            complete: null
        });
    };
    /**
     * 获取用户授权,没有授权的会在全屏放置一个透明按钮,点击任意位置弹出授权
     * @returns 用户信息Promise
     */
    hw_common_platform.prototype.getUserInfo = function () {
        return this._platform.getUserInfo();
    };
    /**
     * 跳转到客服对话
     * @param obj @see https://developers.weixin.qq.com/minigame/dev/api/open-api/customer-message/wx.openCustomerServiceConversation.html
     */
    hw_common_platform.prototype.openCustomerServiceConversation = function (obj) {
        this._platform.openCustomerServiceConversation(obj);
    };
    /**
     * 现实加载框
     * @param title 显示文字
     * @param mask 是否遮罩
     */
    hw_common_platform.prototype.showLoading = function (title, mask) {
        if (title === void 0) { title = "加载中"; }
        if (mask === void 0) { mask = true; }
        this._platform.showLoading(title, mask);
    };
    /**隐藏平台loading*/
    hw_common_platform.prototype.hideLoading = function () {
        this._platform.hideLoading();
    };
    /**显示插屏广告 */
    hw_common_platform.prototype.showInterstitialAd = function () {
        this._platform.showInterstitialAd();
    };
    /**短震动*/
    hw_common_platform.prototype.vibrateShort = function () {
        this._platform.vibrateShort();
    };
    /**长震动*/
    hw_common_platform.prototype.vibrateLong = function () {
        this._platform.vibrateLong();
    };
    /**
     * 消息订阅
     */
    hw_common_platform.prototype.RequestSubscribeMessage = function (tmplIds, success, fail, complete) {
        if (success === void 0) { success = null; }
        if (fail === void 0) { fail = null; }
        if (complete === void 0) { complete = null; }
        this._platform.requestSubscribeMessage(tmplIds, success, fail, complete);
    };
    return hw_common_platform;
}());
exports.default = hw_common_platform;
},{"../hw_common":2,"../hw_common_def":3,"./hw_platform_web":9,"./hw_platform_wx":10}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**微信平台共享域 */
var hw_platform_sharecanvas_wx = /** @class */ (function () {
    function hw_platform_sharecanvas_wx() {
        var _this = this;
        this._stoptime = 0;
        this._startstop = 0;
        this._cleared = true;
        this._initSprite();
        //因为laya瞬间拿到的舞台宽高不对.所以要延迟一点
        Laya.timer.once(1000, this, function () {
            _this._initTexture();
        });
    }
    Object.defineProperty(hw_platform_sharecanvas_wx.prototype, "shareSprite", {
        get: function () {
            return this._sprite;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_platform_sharecanvas_wx.prototype, "stopTime", {
        set: function (time) {
            this._stoptime = time;
            this._startstop = Date.now();
        },
        enumerable: true,
        configurable: true
    });
    hw_platform_sharecanvas_wx.prototype._initSprite = function () {
        if (Laya.Browser.onMiniGame) {
            this._sprite = new Laya.Sprite(); //投影仪的图片；
            this._sprite.name = "guntain";
            this._sprite.zOrder = 10086;
            this._sprite.visible = true;
        }
    };
    hw_platform_sharecanvas_wx.prototype._initTexture = function () {
        var stageW = Laya.stage.width;
        var stageH = Laya.stage.height;
        var sharedCanvas = Laya.Browser.window.sharedCanvas;
        sharedCanvas.width = stageW;
        sharedCanvas.height = stageH;
        var tex = new Laya.Texture();
        if (Laya["Texture2D"]) {
            tex.bitmap = new Laya["Texture2D"]();
            this._sprite.texture = this._texture = tex;
        }
        else {
            throw new Error("OpenDataMgr:webgl not found!");
        }
        this._startFrame();
    };
    hw_platform_sharecanvas_wx.prototype._startFrame = function () {
        if (Laya.Browser.onMiniGame) {
            Laya.timer.frameLoop(2, this, this._frameRender);
        }
    };
    hw_platform_sharecanvas_wx.prototype._frameRender = function () {
        var _this = this;
        if (this._texture == null || this._sprite.parent == null) {
            //延时清除渲染残留
            if (this._cleared == false) {
                this._cleared = true;
                Laya.timer.once(200, this, function () {
                    _this._texture.bitmap.loadImageSource(Laya.Browser.window.sharedCanvas);
                });
            }
            return;
        }
        if (this._stoptime > 0 && (Date.now() - this._startstop) > this._stoptime) {
            return;
        }
        this._cleared = false;
        this._texture.bitmap.loadImageSource(Laya.Browser.window.sharedCanvas);
    };
    hw_platform_sharecanvas_wx.prototype.dispose = function () {
        Laya.timer.clear(this, this._frameRender);
        this._texture.destroy(true);
    };
    return hw_platform_sharecanvas_wx;
}());
exports.default = hw_platform_sharecanvas_wx;
},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
* 网页
*/
var hw_platform_web = /** @class */ (function () {
    function hw_platform_web() {
        this.netConnect = true;
        this.bannerShowed = false;
    }
    hw_platform_web.prototype.Init = function () {
        this._shareBitmap = new Laya.Sprite();
    };
    hw_platform_web.prototype.preloadVideoAd = function () { };
    hw_platform_web.prototype.getShareBitmap = function () {
        return this._shareBitmap;
    };
    hw_platform_web.prototype.postMessage = function (data) {
    };
    hw_platform_web.prototype.setUserCloudStorage = function (kvlist) {
    };
    hw_platform_web.prototype.showBannerAd = function (isShow) {
        if (isShow === void 0) { isShow = false; }
        trace("hw_platform_web::showBannerAd->创建广告");
    };
    hw_platform_web.prototype.getLaunchOptionsSync = function () {
        trace("hw_platform_web::getLaunchOptionsSync->获取登陆信息");
        return {};
    };
    hw_platform_web.prototype.shareAppMessage = function (obj, success) {
        if (success === void 0) { success = null; }
        trace("hw_platform_web::shareAppMessage->分享,shareObj", obj);
        if (success) {
            success();
        }
    };
    hw_platform_web.prototype.showRewardedVideoAd = function (okfun, closefun, errorfun) {
        trace("hw_platform_web::createRewardedVideoAd->创建视频广告,id");
        if (okfun)
            okfun();
    };
    hw_platform_web.prototype.getSystemInfoSync = function () {
        trace("hw_platform_web::getSystemInfoSync->获取信息");
        return {};
    };
    hw_platform_web.prototype.onShow = function (callback) {
        callback();
    };
    hw_platform_web.prototype.showModal = function (content, okfun, showcancel, confirmText, cancelText, cancelfun) {
        if (showcancel === void 0) { showcancel = false; }
        if (confirmText === void 0) { confirmText = "确定"; }
        if (cancelText === void 0) { cancelText = "取消"; }
        trace("hw_platform_web::showModal" + content);
        if (okfun) {
            okfun();
        }
    };
    hw_platform_web.prototype.showToast = function (content, args) {
        trace("hw_platform_web::showToast" + content);
    };
    hw_platform_web.prototype.exitMiniProgram = function (any) {
        trace("hw_platform_web::exitMiniProgram");
    };
    hw_platform_web.prototype.getUserInfo = function () {
        return new Promise(function () { });
    };
    hw_platform_web.prototype.openCustomerServiceConversation = function (any) {
        trace("hw_platform_web::openCustomerServiceConversation客服");
    };
    hw_platform_web.prototype.showInterstitialAd = function (isCreate) {
        trace("hw_platform_web::showInterstitialAd->显示插屏广告");
    };
    hw_platform_web.prototype.vibrateShort = function () {
    };
    hw_platform_web.prototype.vibrateLong = function () {
    };
    hw_platform_web.prototype.refreshBanner = function () {
    };
    hw_platform_web.prototype.showLoading = function () {
    };
    hw_platform_web.prototype.hideLoading = function () {
    };
    hw_platform_web.prototype.requestSubscribeMessage = function () {
    };
    return hw_platform_web;
}());
exports.default = hw_platform_web;
},{}],10:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hw_common_1 = require("../hw_common");
var hw_platform_sharecanvas_wx_1 = require("./hw_platform_sharecanvas_wx");
var hw_common_def_1 = require("../hw_common_def");
/**
 * 微信平台
 * @author yahu
 */
var hw_platform_wx = /** @class */ (function () {
    function hw_platform_wx() {
        this._bannerShowed = false;
        this._videoPreloadCNT = 1;
        this._netConnect = true;
        this._showInterstitialCnt = 0;
    }
    Object.defineProperty(hw_platform_wx.prototype, "netConnect", {
        /**网络是否连接 */
        get: function () {
            return this._netConnect;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_platform_wx.prototype, "bannerShowed", {
        /**广告是否显示 */
        get: function () {
            return this._bannerShowed;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_platform_wx.prototype, "userInfo", {
        /**平台用户信息 */
        get: function () {
            return this._userInfo;
        },
        enumerable: true,
        configurable: true
    });
    hw_platform_wx.prototype.Init = function () {
        this._sysInfo = wx.getSystemInfoSync();
        this._initUserInfo();
        this._initOnShow();
        this._initNetState();
        this._initShareCanvas();
        this._initShareMenu();
    };
    //注册
    hw_platform_wx.prototype._initMemWarning = function () {
    };
    /**预加载视频 */
    hw_platform_wx.prototype.preloadVideoAd = function () {
        var _this = this;
        if (!wx.createRewardedVideoAd) {
            return;
        }
        if (this._video == null) {
            this._video = wx.createRewardedVideoAd({ adUnitId: hw_common_1.default.config.videoid });
        }
        this._video.load().then(function (e) {
            trace('hw_platform_wx:preloadVideoAd->视频加载完成');
            _this._video.offError();
        });
        this._video.onError(function () {
            console.warn('hw_platform_wx:preloadVideoAd->视频加载失败5秒后自动重复加载');
            if (_this._videoPreloadCNT === 1) {
                Laya.timer.once(5000, _this, function () {
                    _this._videoPreloadCNT += 1;
                    _this.preloadVideoAd();
                });
            }
        });
    };
    //初始化网络监听器
    hw_platform_wx.prototype._initNetState = function () {
        var _this = this;
        wx.getNetworkType({
            success: function (res) {
                if (res.networkType == "none") {
                    _this._netConnect = false;
                }
                else {
                    _this._netConnect = true;
                }
                wx.onNetworkStatusChange(function (res) {
                    if (res.isConnected == false || res.networkType == "none") {
                        _this._netConnect = false;
                    }
                    else {
                        _this._netConnect = true;
                    }
                });
            }
        });
    };
    //如果用户授权过,初始化用户信息
    hw_platform_wx.prototype._initUserInfo = function () {
        var _this = this;
        wx.getUserInfo({
            withCredentials: true,
            lang: "zh_CN",
            complete: function () {
            },
            fail: function () {
            },
            success: function (res) {
                if (res.userInfo) {
                    _this._userInfo = (res.userInfo);
                }
            }
        });
    };
    //初始化用户默认分享
    hw_platform_wx.prototype._initShareMenu = function () {
        var _this = this;
        wx.updateShareMenu({
            withShareTicket: true,
            success: function () { },
            fail: function () { },
            complete: function () { },
        });
        //分享菜单
        wx.showShareMenu({
            withShareTicket: true,
            success: function () { },
            fail: function () { },
            complete: function () { },
        });
        wx.onShareAppMessage(function () {
            var shareurl = hw_common_1.default.config.defaultShareImage;
            var sharetitle = hw_common_1.default.config.defaultShareTitle;
            var info = mpsdk.Share.commonShare({ serial: 0, params: null, image: shareurl }, null, null, _this);
            if (shareurl) {
                info.imageUrl = shareurl;
                info.title = info.prefix + sharetitle;
            }
            hw_common_1.default.mpsdk.reportEvent(hw_common_def_1.default.REPORT_SHARE, "0", "0");
            return info;
        });
    };
    hw_platform_wx.prototype._initShareCanvas = function () {
        this._shareCanvas = new hw_platform_sharecanvas_wx_1.default();
        this._openDataContext = wx.getOpenDataContext();
        this.postMessage({ command: "loadop" });
    };
    /////////////////////////////////////////////共享域
    hw_platform_wx.prototype.getShareBitmap = function (stoptime) {
        this._shareCanvas.stopTime = stoptime;
        return this._shareCanvas.shareSprite;
    };
    hw_platform_wx.prototype.postMessage = function (data) {
        this._openDataContext.postMessage(data);
    };
    hw_platform_wx.prototype.setUserCloudStorage = function (kvlist) {
        wx.setUserCloudStorage({
            KVDataList: kvlist,
            success: function (res) {
                trace('共享域数据存储成功', res);
            },
            fail: function (res) {
                trace('共享域数据存储失败', res);
            }
        });
    };
    hw_platform_wx.prototype.refreshBanner = function () {
        if (this._banner) {
            this._banner.destroy();
            this._banner = null;
        }
        this.showBannerAd(this._bannerShowed);
    };
    /**
     * 显示落地广告
     * @param isShow 是否显示
     */
    hw_platform_wx.prototype.showBannerAd = function (isShow) {
        var _this = this;
        this._bannerShowed = isShow;
        if (this._banner) {
            //隐藏
            if (isShow == false) {
                this._banner.hide();
            }
            else {
                this._banner.show();
            }
            return;
        }
        else {
            if (isShow == false)
                return;
        }
        trace("hw_platform_wx::showBannerAd->开始创建广告");
        var bannerID = hw_common_1.default.config.bannerid;
        hw_common_1.default.mpsdk.reportEvent(hw_common_def_1.default.REPORT_BANNERAD, bannerID + "", "0");
        try {
            this._banner = wx.createBannerAd({
                adUnitId: bannerID,
                style: {
                    left: 0,
                    top: 0,
                    width: this._sysInfo.screenWidth,
                }
            });
            if (this._banner) {
                this._banner.onResize(function (res) {
                    if (res) {
                        var bannerHeight = res.height;
                        var bannerY = _this._sysInfo.screenHeight - bannerHeight - 10; //-10是因为微信要求全面屏手机(ipx)需要下面留一点空隙
                        _this._banner.style.top = bannerY; //下对齐
                    }
                });
                var errorfun = function (res) {
                    try {
                        if (_this._banner) {
                            _this._banner.destroy();
                            _this._banner = null;
                        }
                    }
                    catch (t) {
                        console.warn("hw_platform_wx::showBannerAd->销毁Banner错误:", JSON.stringify(t));
                    }
                    hw_common_1.default.mpsdk.reportEvent(hw_common_def_1.default.REPORT_BANNERAD, bannerID + "", "2");
                };
                var loadfun = function (res) {
                    trace("hw_platform_wx::showBannerAd->广告加载成功", _this._bannerShowed);
                    if (_this._bannerShowed == false) {
                        _this._banner.hide();
                    }
                    hw_common_1.default.mpsdk.reportEvent(hw_common_def_1.default.REPORT_BANNERAD, bannerID + "", "1");
                };
                if (this._bannerShowed) {
                    this._banner.show();
                }
                this._banner.onError(errorfun);
                this._banner.onLoad(loadfun);
            }
        }
        catch (error) {
            error("hw_platform_wx::showBannerAd->创建Banner错误:", JSON.stringify(error));
        }
    };
    hw_platform_wx.prototype.getLaunchOptionsSync = function () {
        return wx.getLaunchOptionsSync();
    };
    hw_platform_wx.prototype.getSystemInfoSync = function () {
        return this._sysInfo;
    };
    hw_platform_wx.prototype.shareAppMessage = function (shareobj) {
        wx.shareAppMessage(shareobj);
    };
    /**
     * 播放激烈视频
     * @param okfun 播放完成回调
     * @param closefun 主动关闭回调
     * @param errorfun 播放错误回调
     * @param param
     */
    hw_platform_wx.prototype.showRewardedVideoAd = function (okfun, closefun, errorfun, param) {
        var _this = this;
        this._videoOkFunc = okfun;
        this._videoCloseFunc = closefun;
        this._videoErrorFunc = errorfun;
        if (this._video == null) {
            this._video = wx.createRewardedVideoAd({ adUnitId: hw_common_1.default.config.videoid });
        }
        if (this._video == null) {
            if (this._videoErrorFunc) {
                this._videoErrorFunc();
                this.restVideoCallBack();
            }
            return;
        }
        if (this._wxVideoCloseFunc)
            this._video.offClose(this._wxVideoCloseFunc);
        if (this._wxVideoErrorFunc)
            this._video.offError(this._wxVideoErrorFunc);
        if (this._wxVideoLoadFunc)
            this._video.offLoad(this._wxVideoLoadFunc);
        this._wxVideoCloseFunc = function (res) {
            if (_this._sysInfo.SDKVersion >= "2.0.4" && res) {
                if (res.isEnded) {
                    if (_this._videoOkFunc) {
                        _this._videoOkFunc();
                    }
                }
                else {
                    if (_this._videoCloseFunc) {
                        _this._videoCloseFunc();
                    }
                }
            }
            else {
                if (_this._videoErrorFunc) {
                    _this._videoErrorFunc();
                }
            }
            _this.restVideoCallBack();
            trace("hw_platform_wx::showRewardedVideoAd->视频看完：", res);
            _this._video.offClose(_this._wxVideoCloseFunc);
            _this._video.load();
        };
        this._wxVideoErrorFunc = function (res) {
            if (_this._videoErrorFunc) {
                _this._videoErrorFunc();
                _this.restVideoCallBack();
            }
            if (_this._sysInfo.SDKVersion >= "2.0.4" && res) {
                console.error("hw_platform_wx::showRewardedVideoAd->视频加载错误信息：", res.errMsg, "错误码：", res.errCode);
            }
            _this._video.offError(_this._wxVideoErrorFunc);
            _this._video.load();
        };
        this._wxVideoLoadFunc = function (res) {
            _this._video.offLoad(_this._wxVideoLoadFunc);
        };
        this._video.onClose((this._wxVideoCloseFunc));
        this._video.onError(this._wxVideoErrorFunc);
        this._video.onLoad(this._wxVideoLoadFunc);
        this._video.load().then(function () {
            _this._video.show();
        });
    };
    /**
     * 重置激励视频回调函数
     */
    hw_platform_wx.prototype.restVideoCallBack = function () {
        this._videoErrorFunc = null;
        this._videoOkFunc = null;
        this._videoCloseFunc = null;
        this._wxVideoCloseFunc = null;
        this._wxVideoErrorFunc = null;
        this._wxVideoLoadFunc = null;
    };
    /**
     * 获取用户信息
     */
    hw_platform_wx.prototype.getUserInfo = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // 查看是否授权
            wx.getSetting({
                complete: function () { },
                fail: function () { reject(0); },
                success: function (res) {
                    if (res.authSetting['scope.userInfo']) {
                        // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                        wx.getUserInfo({
                            withCredentials: true,
                            lang: "zh_CN",
                            complete: function () { },
                            fail: function () { reject(0); },
                            success: function (res) {
                                if (res.userInfo) {
                                    _this._userInfo = res.userInfo;
                                    resolve(res.userInfo);
                                }
                            }
                        });
                    }
                    else {
                        var button_1 = wx.createUserInfoButton({
                            type: 'text',
                            text: '',
                            style: {
                                left: 0,
                                top: 0,
                                width: 750,
                                height: 1334,
                                lineHeight: 42,
                                backgroundColor: '',
                                color: '',
                                textAlign: 'center',
                                fontSize: 16,
                                borderRadius: 4
                            }
                        });
                        button_1.onTap(function (res) {
                            trace("hw_platform_wx::getUserInfo->用户授权:", res);
                            var userInfo = res.userInfo;
                            _this._userInfo = userInfo;
                            button_1.destroy();
                            if (userInfo) {
                                resolve(userInfo);
                            }
                            else {
                                reject(0);
                            }
                        });
                    }
                }
            });
        });
    };
    /**
     * 初始化监听切换前后台
     */
    hw_platform_wx.prototype._initOnShow = function () {
        wx.onShow(function (res) {
            hw_common_1.default.event.event(hw_common_def_1.default.EVT_PLATFORM_ONSHOW, [res]);
        });
        wx.onHide(function (res) {
            hw_common_1.default.event.event(hw_common_def_1.default.EVT_PLATFORM_ONHIDE, [res]);
        });
    };
    /**
     * 调用微信接口弹出选择框
     * @param content 提示内容
     * @param okfun 确认回调
     * @param showcancel 是否显示取消按钮
     * @param confirmText 确认按钮文字提示 最多 4 个字符
     * @param cancelText 取消按钮文字提示 最多 4 个字符
     * @param cancelfun 取消回调
     */
    hw_platform_wx.prototype.showModal = function (content, okfun, showcancel, confirmText, cancelText, cancelfun) {
        if (showcancel === void 0) { showcancel = false; }
        if (confirmText === void 0) { confirmText = "确定"; }
        if (cancelText === void 0) { cancelText = "取消"; }
        if (wx.showModal)
            wx.showModal({
                title: "提示",
                content: content,
                cancelText: cancelText,
                confirmText: confirmText,
                showCancel: showcancel,
                success: function (res) {
                    if (res.confirm) {
                        if (okfun)
                            okfun();
                    }
                    else if (res.cancel) {
                        if (cancelfun)
                            cancelfun();
                    }
                }
            });
    };
    /**
     * 调用微信接口弹出提示弹窗
     * @param content 提示的内容
     * @param args TO:https://developers.weixin.qq.com/minigame/dev/api/ui/interaction/wx.showToast.html
     * @param duration 弹窗持续时间
     */
    hw_platform_wx.prototype.showToast = function (content, args, duration) {
        if (duration === void 0) { duration = 2500; }
        args.title = content;
        args.duration = duration;
        if (wx.showToast)
            wx.showToast(args);
    };
    hw_platform_wx.prototype.exitMiniProgram = function (any) {
        if (wx.exitMiniProgram)
            wx.exitMiniProgram(any);
    };
    hw_platform_wx.prototype.openCustomerServiceConversation = function (any) {
        if (wx.openCustomerServiceConversation)
            wx.openCustomerServiceConversation(any);
    };
    /**
     * 显示插屏广告
     */
    hw_platform_wx.prototype.showInterstitialAd = function () {
        try {
            if (!wx.createInterstitialAd) {
                console.warn("hw_platform_wx::showInterstitialAd->版本低,不显示插屏广告");
                return;
            }
            var config = hw_common_1.default.config.interstitialAdConfig;
            if (this._showInterstitialCnt++ % config[1] != 0) {
                console.warn("hw_platform_wx::showInterstitialAd->关卡间隔未到,不显示广告");
                return;
            }
            hw_common_1.default.mpsdk.reportEvent(hw_common_def_1.default.REPORT_INTERSTITIAL_SHOW);
            if (this._interstitial == null) {
                this._interstitial = wx.createInterstitialAd({ adUnitId: hw_common_1.default.config.interstitialAdId });
            }
            //这里是无用的判断，现在不能判断创建的视频组件是否正常，只能播放的时候判断报错 以后可能会有其他处理方法
            if (this._interstitial == null) {
                return;
            }
            if (this._interstitialCloseFunc)
                this._interstitial.offClose(this._interstitialCloseFunc);
            if (this._interstitialErrorFunc)
                this._interstitial.offError(this._interstitialErrorFunc);
            if (this._interstitialLoadFunc)
                this._interstitial.offLoad(this._interstitialLoadFunc);
            this._interstitialCloseFunc = function () {
                trace("hw_platform_wx::showInterstitialAd-> close");
                hw_common_1.default.mpsdk.reportEvent(hw_common_def_1.default.REPORT_INTERSTITIAL_CLOSE);
            };
            this._interstitialErrorFunc = function (res) {
                console.warn("hw_platform_wx::showInterstitialAd-> error", res);
                hw_common_1.default.mpsdk.reportEvent(hw_common_def_1.default.REPORT_INTERSTITIAL_ERROR, "" + res.errCode);
            };
            this._interstitialLoadFunc = function (res) {
                trace("hw_platform_wx::showInterstitialAd-> load", res);
            };
            this._interstitial.onLoad(this._interstitialLoadFunc);
            this._interstitial.onClose((this._interstitialCloseFunc));
            this._interstitial.onError(this._interstitialErrorFunc);
            this._interstitial.show().catch(function (err) {
                hw_common_1.default.mpsdk.reportEvent(hw_common_def_1.default.REPORT_INTERSTITIAL_ERROR, err.errCode + "");
                trace("hw_platform_wx::showInterstitialAd-> error", err);
            });
        }
        catch (e) {
            trace("hw_platform_wx::showInterstitialAd-> 未知错误", e);
            hw_common_1.default.mpsdk.reportEvent(hw_common_def_1.default.REPORT_INTERSTITIAL_ERROR, "-1");
        }
    };
    /**
     * 短震动
     */
    hw_platform_wx.prototype.vibrateShort = function () {
        if (wx.vibrateShort)
            wx.vibrateShort({});
    };
    /**
     * 长震动
     */
    hw_platform_wx.prototype.vibrateLong = function () {
        if (wx.vibrateLong)
            wx.vibrateLong({});
    };
    /**
     * 显示微信加载借口（只会显示加载图标或图标+文字）
     * @param title 提示
     * @param mask 底部是否添加遮罩
     */
    hw_platform_wx.prototype.showLoading = function (title, mask) {
        if (wx.showLoading)
            wx.showLoading({ title: title, mask: mask });
    };
    /**
     * 隐藏加载
     */
    hw_platform_wx.prototype.hideLoading = function () {
        if (wx.hideLoading)
            wx.hideLoading();
    };
    /**
     * 消息订阅
     */
    hw_platform_wx.prototype.requestSubscribeMessage = function (tmplIds, success, fail, complete) {
        if (success === void 0) { success = null; }
        if (fail === void 0) { fail = null; }
        if (complete === void 0) { complete = null; }
        if (wx.getSystemInfoSync().SDKVersion < "2.8.2" || !wx.requestSubscribeMessage) {
            trace("微信版本低,不支持订阅功能");
            return;
        }
        wx.requestSubscribeMessage({
            tmplIds: tmplIds,
            success: success,
            fail: fail,
            complete: complete
        });
    };
    return hw_platform_wx;
}());
exports.default = hw_platform_wx;
},{"../hw_common":2,"../hw_common_def":3,"./hw_platform_sharecanvas_wx":8}],11:[function(require,module,exports){
"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var hw_common_1 = require("../hw_common");
var hw_common_def_1 = require("../hw_common_def");
var hw_common_serverdata = /** @class */ (function () {
    function hw_common_serverdata() {
    }
    hw_common_serverdata.prototype._init = function () {
        this._starttime = Date.now();
        hw_common_1.default.event.once(hw_common_def_1.default.EVT_MPSDK_ACCOUNT_OK, this, this._getServerVersion);
    };
    hw_common_serverdata.prototype._getVersion = function () {
        var ver = +Laya.LocalStorage.getItem(hw_common_def_1.default.LOCS_SD_VER);
        return ver;
    };
    hw_common_serverdata.prototype._addVersion = function () {
        var ver = this._getVersion();
        ver++;
        Laya.LocalStorage.setItem(hw_common_def_1.default.LOCS_SD_VER, ver + "");
    };
    hw_common_serverdata.prototype._setVerion = function (ver) {
        Laya.LocalStorage.setItem(hw_common_def_1.default.LOCS_SD_VER, ver + "");
    };
    hw_common_serverdata.prototype._loadDataOver = function (data) {
        if (data === void 0) { data = null; }
        var hasdata = data != null ? "1" : "0";
        var cost = Date.now() - this._starttime;
        hw_common_1.default.event.event(hw_common_def_1.default.EVT_SD_SERVERDATA_OK, data);
        hw_common_1.default.mpsdk.reportEvent(hw_common_def_1.default.REPORT_SERVERDATA_OK, hasdata, cost + "");
    };
    //获取存档版本号
    hw_common_serverdata.prototype._getServerVersion = function () {
        if (platform.debug) {
            Laya.timer.once(1, this, function () {
                hw_common_1.default.event.event(hw_common_def_1.default.EVT_SD_SERVERDATA_OK);
            });
            return;
        }
        var url = hw_common_def_1.default.URL_GET_VERSIONEND + "?gameId=" + hw_common_1.default.config.gameid + "&openId=" + hw_common_1.default.mpsdk.openid + "&dataKey=" + hw_common_1.default.config.gamePath;
        var xhr = new Laya.HttpRequest();
        xhr.http.timeout = 2000; //设置超时时间；
        xhr.once(Laya.Event.COMPLETE, this, this.onVersion);
        xhr.once(Laya.Event.ERROR, this, this.onServerError);
        xhr.send(url, "", "get", "text");
    };
    hw_common_serverdata.prototype.onServerError = function (data) {
        trace("hw_common_serverdata::onServerError->", data);
        hw_common_1.default.platform.showModal("网络连接失败，请重试", function () {
            hw_common_1.default.platform.exitMiniProgram();
        });
    };
    hw_common_serverdata.prototype.onVersion = function (e) {
        var serverdata = JSON.parse(e);
        hw_common_1.default.event.event(hw_common_def_1.default.EVT_SERVER_DATA_OK, [serverdata]);
        var version = this._getVersion();
        trace("hw_common_serverdata::onVersion->服务器版本信息", serverdata, "本地版本:", version);
        if (version) {
            if (serverdata.version == null || serverdata.version > 999999)
                serverdata.version = 0;
            //本地有存档
            if (version >= serverdata.version) {
                //本地版本高,进游戏,发送本地数据给服务器
                trace("hw_common_serverdata::onVersion->本地版本高,使用本地版本");
                this._loadDataOver();
            }
            else if (version < serverdata.version) {
                //本地版本低,使用服务器存档
                trace("hw_common_serverdata::onVersion->本地版本低,使用服务器存档", version, serverdata.version);
                this._serverversion = serverdata.version;
                this.getServerData();
            }
            else {
                //版本号相等，啥都不干
                trace("hw_common_serverdata::onVersion->版本号相等，啥都不干", version, serverdata.version);
                this._loadDataOver();
            }
        }
        else {
            //本地无存档
            if (serverdata.version) {
                //服务器有存档,使用服务器存档
                trace("hw_common_serverdata::onVersion->服务器有存档,使用服务器存档", version, serverdata.version);
                this._serverversion = serverdata.version;
                this.getServerData();
            }
            else {
                //服务器无存档->新用户
                trace("hw_common_serverdata::onVersion->服务器无存档->新用户", version, serverdata.version);
                this._loadDataOver();
            }
        }
    };
    /**
     * 发送本地数据
     * @param data:any类型可以转为json的数据
     */
    hw_common_serverdata.prototype.sendDataToServer = function (data) {
        if (platform.debug) {
            return;
        }
        //需要压缩的大数据
        if (data == null) {
            console.error("hw_common_serverdata::SendDataToServer->发送数据错误");
            return;
        }
        try {
            var str = JSON.stringify(data);
        }
        catch (error) {
            error("hw_common_serverdata::SendDataToServer->Json转换错误", error);
            return;
        }
        this._addVersion();
        var zip = new JSZip();
        zip.file("data.txt", str);
        var content = zip.generate({ 'compression': 'DEFLATE' });
        var data = {};
        data.gameId = hw_common_1.default.config.gameid + "";
        data.openId = hw_common_1.default.mpsdk.openid + "";
        data.version = this._getVersion() + "";
        data.data = content + "";
        data.dataKey = hw_common_1.default.config.gamePath + "";
        data = JSON.stringify(data);
        var url = hw_common_def_1.default.URL_POST_SAVEEND;
        var xhr = new Laya.HttpRequest();
        xhr.http.timeout = 2000; //设置超时时间；
        xhr.once(Laya.Event.COMPLETE, this, function (data) { trace("hw_common_serverdata::sendDataToServer->发送成功", data); });
        xhr.once(Laya.Event.ERROR, this, function (data) { trace("hw_common_serverdata::sendDataToServer->发送失败", data); });
        xhr.send(url, data, "post", "text", ["Content-Type", "text/plain;charset=UTF-8"]);
        trace("hw_common_serverdata::sendDataToServer->本地版本高,发送本地数据给服务器", "version:", data.version);
    };
    hw_common_serverdata.prototype.getServerData = function () {
        var url = hw_common_def_1.default.URL_Get_GetEnd + "?gameId=" + hw_common_1.default.config.gameid + "&openId=" + hw_common_1.default.mpsdk.openid + "&dataKey=" + hw_common_1.default.config.gamePath;
        var xhr = new Laya.HttpRequest();
        xhr.http.timeout = 2000; //设置超时时间；
        xhr.once(Laya.Event.COMPLETE, this, this.onServerData);
        xhr.once(Laya.Event.ERROR, this, this.onServerError);
        xhr.send(url, "", "get", "text");
        trace("hw_common_serverdata::getServerData->服务器版本高,同步服务器数据");
    };
    hw_common_serverdata.prototype.onServerData = function (e) {
        //使用服务器数据
        try {
            var obj = JSON.parse(e);
        }
        catch (error) {
            error("hw_common_serverdata::onServerData->接收服务器数据成功,解析json失败", error);
            return;
        }
        var zip = new JSZip(obj.data, { base64: true });
        var content = zip.file("data.txt").asText();
        var alldata = JSON.parse(content);
        this._setVerion(this._serverversion);
        this._loadDataOver(alldata);
        trace("hw_common_serverdata::onServerData->解析服务器数据成功", alldata);
    };
    /**
     * 获取题库
     * @param level 题库的关卡id
     */
    hw_common_serverdata.prototype.loadQuiz = function (level) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var url = hw_common_def_1.default.URL_GET_QUZI + "?gameId=" + hw_common_1.default.config.gameid + "&openId=" + hw_common_1.default.mpsdk.openid + "&quizId=" + level;
                        if (platform.debug) {
                            url = hw_common_def_1.default.URL_GET_QUZI + "?gameId=" + hw_common_1.default.config.gameid + "&openId=ofnCZ5ZQLAlKWnSBhhzcRzhrEzzz&quizId=" + level;
                        }
                        var xhr = new Laya.HttpRequest();
                        xhr.http.timeout = 5000; //设置超时时间；
                        xhr.once(Laya.Event.COMPLETE, _this, function (e) {
                            var serverdata = JSON.parse(e);
                            trace("hw_common_serverdata::loadQuiz->获取服务器数据成功:", serverdata);
                            if (serverdata && serverdata.Ques && serverdata.Ques.quiz) {
                                resolve(serverdata.Ques.quiz);
                            }
                            else if (serverdata && serverdata.error == 1001) {
                                console.warn("hw_common_serverdata::loadQuiz->账号登陆失败,请重新登陆~");
                                reject(serverdata);
                            }
                            else if (serverdata && serverdata.error == 1003) {
                                console.warn("hw_common_serverdata::loadQuiz->后续关卡正在加急制作中，请稍后~");
                                reject(serverdata);
                            }
                            else if (serverdata && serverdata.error == 1002) {
                                console.warn("hw_common_serverdata::loadQuiz->未知错误,请重新登陆~");
                                reject(serverdata);
                            }
                            hw_common_1.default.mpsdk.reportEvent(hw_common_def_1.default.REPORT_LOADQUIZ_OK, level + "", serverdata.error + "");
                        });
                        xhr.once(Laya.Event.ERROR, _this, function (e) {
                            console.warn("hw_common_serverdata::loadQuiz->题库获取失败,请检查网络连接~");
                            reject({ error: 1004 });
                            hw_common_1.default.mpsdk.reportEvent(hw_common_def_1.default.REPORT_LOADQUIZ_OK, level + "", "1003");
                        });
                        xhr.send(url, "", "get", "text");
                    })];
            });
        });
    };
    /**
     * 获取客服奖励
     */
    hw_common_serverdata.prototype.getOpenCSGift = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            trace("hw_common_serverdata::getOpenCSGift->开始领取客服体力");
            var url = hw_common_def_1.default.URL_GET_CSGIFT + "?gameId=" + hw_common_1.default.config.gameid + "&openId=" + hw_common_1.default.mpsdk.openid;
            var xhr = new Laya.HttpRequest();
            xhr.http.timeout = 5000; //设置超时时间；
            xhr.once(Laya.Event.COMPLETE, _this, function (e) {
                var serverdata = JSON.parse(e);
                trace("hw_common_serverdata::getOpenCSGift->获取到服务器数据:", serverdata);
                if (serverdata && (serverdata.result == 1 || serverdata.result == "1")) {
                    trace("hw_platform::_onCSGift->获取客服奖励成功");
                    resolve(serverdata);
                }
                else {
                    trace("hw_platform::_onCSGift->获取客服奖励失败");
                    reject(serverdata);
                }
            });
            xhr.once(Laya.Event.ERROR, _this, function (e) {
                console.warn("hw_platform::_onCSGift->获取客服奖励异常");
                reject(e);
            });
            xhr.send(url, "", "get", "text");
        });
    };
    return hw_common_serverdata;
}());
exports.default = hw_common_serverdata;
},{"../hw_common":2,"../hw_common_def":3}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hw_common_1 = require("../hw_common");
var hw_common_def_1 = require("../hw_common_def");
/*
* 服务器时间
*/
var hw_common_servertime = /** @class */ (function () {
    function hw_common_servertime() {
        /*登录累计时间  */
        this._loginpass = 0;
    }
    /**
     * 初始化
     */
    hw_common_servertime.prototype.init = function () {
        hw_common_1.default.event.once(hw_common_def_1.default.EVT_SERVER_DATA_OK, this, this._setServertime);
    };
    Object.defineProperty(hw_common_servertime.prototype, "now", {
        /**
         * 服务器毫秒时间戳
         */
        get: function () {
            if (!this._logintime) {
                return Laya.timer.currTimer;
            }
            else {
                return this._logintime + this._loginpass;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_common_servertime.prototype, "loginTime", {
        /**
         * 登陆时间
         */
        get: function () {
            return this._logintime;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @inner 设置服务器时间
     * @param time
     */
    hw_common_servertime.prototype._setServertime = function (serverdata) {
        var time = serverdata.server_time;
        if (!this._logintime) {
            Laya.timer.frameLoop(1, this, this._updateTime);
        }
        this._logintime = time;
    };
    /**
     * 使用帧间隔来同步服务器时间,防止修改系统时间
     */
    hw_common_servertime.prototype._updateTime = function () {
        this._loginpass += Laya.timer.delta;
    };
    return hw_common_servertime;
}());
exports.default = hw_common_servertime;
},{"../hw_common":2,"../hw_common_def":3}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hw_common_1 = require("../hw_common");
var hw_common_def_1 = require("../hw_common_def");
/*
* 分享管理;
*/
var hw_common_share = /** @class */ (function () {
    function hw_common_share() {
        this._getTrueShareFlag = false; //是否拉取到有效分享值
        this._lastTrueShareTm = 0; //上次有效分享时间,平台请求获得
        this._sharefailtype = 0; //0:猜测失败,1:真实失败,2:打开二级分享界面后猜测失败
    }
    Object.defineProperty(hw_common_share.prototype, "lastTrueShareTime", {
        /**上次有效分享得时间 */
        get: function () {
            return this._lastTrueShareTm;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_common_share.prototype, "shareFailType", {
        /**上次分享得失败类型0:猜测失败,1:真实失败,2:打开二级分享界面后猜测失败*/
        set: function (type) {
            this._sharefailtype = type;
        },
        enumerable: true,
        configurable: true
    });
    hw_common_share.prototype._init = function () {
        var str = Laya.LocalStorage.getItem(hw_common_def_1.default.LOCS_SHARE_CYCINFOLIST);
        try {
            if (str) {
                this._cycInfoList = JSON.parse(str);
            }
        }
        catch (error) {
            this._cycInfoList = {};
        }
        if (!this._cycInfoList)
            this._cycInfoList = {};
        hw_common_1.default.event.on(hw_common_def_1.default.EVT_MPSDK_LASTTRUESHARETM_OK, this, this._getlastTrueShareTm);
    };
    //获取到上次真实分享时间
    hw_common_share.prototype._getlastTrueShareTm = function (time) {
        this._lastTrueShareTm = time;
        this._getTrueShareFlag = true;
    };
    hw_common_share.prototype._getCycInfo = function (key) {
        if (!key)
            key = "default";
        if (!this._cycInfoList[key]) {
            this._cycInfoList[key] = {
                key: key,
                count: 0,
                sharecount: 0,
                starttime: 0,
                sharepointindex: 0
            };
        }
        return this._cycInfoList[key];
    };
    hw_common_share.prototype._saveCycInfo = function () {
        var str = JSON.stringify(this._cycInfoList);
        if (hw_common_1.default.platform.iswxgame) {
            wx.setStorage({ key: hw_common_def_1.default.LOCS_SHARE_CYCINFOLIST, data: str });
        }
        else {
            Laya.LocalStorage.setItem(hw_common_def_1.default.LOCS_SHARE_CYCINFOLIST, str);
        }
    };
    /**
     * 根据当前的分享周期决定是弹出分享还是弹出视频
     * 1:根据服务器sharepointlist配置决定
     * 2:不需要考虑分享失败成功的文字提示,全部用统一的,只需要考虑游戏逻辑
     * 3:不需要打点,该方法会针对shareid对各种状态打点
     * @param shareinfo
     * @param shareinfo.shareid 【必填】后台分析统计用的分享埋点id
     * @param shareinfo.sharekey 该分享使用的sharepointlist配置中的key值 @default: "default"
     * @param shareinfo.caller 分享方法作用域
     * @param shareinfo.success 分享成功方法
     * @param shareinfo.successargs 分享成功参数,数组类型,根据回调函数的参数决定
     * @param shareinfo.fail 分享失败方法
     * @param shareinfo.failargs 分享失败参数,数组类型,根据回调函数的参数决定
     */
    hw_common_share.prototype.normalGet = function (shareinfo) {
        if (this.canShare(shareinfo.sharekey)) {
            this.shareGet(shareinfo);
        }
        else {
            this.videoGet(shareinfo);
        }
    };
    /**
     * 观看视频,如果视频失败后根据配置决定是否拉起分享
     * 1:根据服务器sharepointlist配置决定
     * 2:不需要考虑分享失败成功的文字提示,全部用统一的,只需要考虑游戏逻辑
     * 3:不需要打点,该方法会针对shareid对各种状态打点
     * @param shareinfo
     * @param shareinfo.shareid 后台分析统计用的分享id
     * @param shareinfo.sharekey 该分享使用的sharepointlist配置中的key值 @default: "default"
     * @param shareinfo.caller 分享方法作用域
     * @param shareinfo.success 分享成功方法
     * @param shareinfo.successargs 分享成功参数,数组类型,根据回调函数的参数决定
     * @param shareinfo.fail 分享失败方法
     * @param shareinfo.failargs 分享失败参数,数组类型,根据回调函数的参数决定
     *
     * @param advance 是否推进sharepoint周期
     */
    hw_common_share.prototype.videoGet = function (shareinfo, advance) {
        var _this = this;
        if (advance === void 0) { advance = true; }
        hw_common_1.default.mpsdk.reportEvent(hw_common_def_1.default.REPORT_VIDEOAD, shareinfo.shareid + "", "0");
        hw_common_1.default.platform._showVideo(function () {
            hw_common_1.default.platform.showToast("获取成功");
            if (hw_common_1.default.config.sharepoint_advancetype == 0 && advance)
                hw_common_1.default.share.addCycCnt(shareinfo.sharekey, false);
            if (shareinfo.success)
                shareinfo.success.apply(shareinfo.caller, shareinfo.successargs);
            hw_common_1.default.mpsdk.reportEvent(hw_common_def_1.default.REPORT_VIDEOAD, shareinfo.shareid + "", "1");
        }, function () {
            var closefun = function () {
                hw_common_1.default.platform.showToast("视频未看完，无法获得奖励");
                hw_common_1.default.mpsdk.reportEvent(hw_common_def_1.default.REPORT_VIDEOAD, shareinfo.shareid + "", "2");
                trace("hw_common_share::videoGet->", hw_common_1.default.config.sharepoint_advancetype, advance);
                if (hw_common_1.default.config.sharepoint_advancetype == 1 && advance)
                    hw_common_1.default.share.addCycCnt(shareinfo.sharekey, false);
                if (shareinfo.fail)
                    shareinfo.fail.apply(shareinfo.caller, shareinfo.failargs);
            };
            trace("hw_common_share::videoGet->", hw_common_1.default.config.videomode);
            if (hw_common_1.default.config.videomode == 1) {
                hw_common_1.default.platform.showModal("视频未看完,无法获得奖励,是否重新观看", function () {
                    _this.videoGet(shareinfo, advance);
                }, true, "继续观看", "取消", closefun);
            }
            else {
                closefun();
            }
        }, function () {
            var safe = hw_common_1.default.config.safe;
            var ischeck = !_this._checkCycLimit(shareinfo.sharekey);
            if (safe && ischeck) {
                _this.shareGet(shareinfo, advance);
            }
            else {
                var str = "";
                str = "视频无法播放，过一会再试试吧。";
                hw_common_1.default.platform.showToast(str);
                if (shareinfo.fail)
                    shareinfo.fail.apply(shareinfo.caller, shareinfo.failargs);
            }
            hw_common_1.default.mpsdk.reportEvent(hw_common_def_1.default.REPORT_VIDEOAD, shareinfo.shareid + "", "3");
        });
    };
    /**
     * 拉起分享,不需要考虑分享失败成功的文字提示,全部用统一的
     * 1:根据服务器sharepointlist配置决定
     * 2:不需要考虑分享失败成功的文字提示,全部用统一的,只需要考虑游戏逻辑
     * 3:不需要打点,该方法会针对shareid对各种状态打点
     * @param shareinfo
     * @param shareinfo.shareid 后台分析统计用的分享id
     * @param shareinfo.sharekey 该分享使用的sharepointlist配置中的key值 @default: "default"
     * @param shareinfo.caller 分享方法作用域
     * @param shareinfo.success 分享成功方法
     * @param shareinfo.successargs 分享成功参数,数组类型,根据回调函数的参数决定
     * @param shareinfo.fail 分享失败方法
     * @param shareinfo.failargs 分享失败参数,数组类型,根据回调函数的参数决定
     *
     * @param advance 是否推进sharepoint周期
     */
    hw_common_share.prototype.shareGet = function (shareinfo, advance) {
        var _this = this;
        if (advance === void 0) { advance = true; }
        hw_common_1.default.mpsdk.reportEvent(hw_common_def_1.default.REPORT_SHARE, shareinfo.shareid + "", "0");
        hw_common_1.default.platform._share(shareinfo.shareid, shareinfo.shareparam, function () {
            if (advance)
                hw_common_1.default.share.addCycCnt(shareinfo.sharekey, true);
            if (shareinfo.success)
                shareinfo.success.apply(shareinfo.caller, shareinfo.successargs);
            hw_common_1.default.mpsdk.reportEvent(hw_common_def_1.default.REPORT_SHARE, shareinfo.shareid + "", "1");
        }, function () {
            var showcancel = !hw_common_1.default.config.forceShare;
            var sharetips = _this._getShareTips();
            hw_common_1.default.platform.showModal(sharetips, function () {
                _this.shareGet(shareinfo);
            }, showcancel, "去分享", "取消", function () {
                if (hw_common_1.default.config.sharepoint_advancetype == 1 && advance)
                    hw_common_1.default.share.addCycCnt(shareinfo.sharekey, true);
                if (shareinfo.fail)
                    shareinfo.fail.apply(shareinfo.caller, shareinfo.failargs);
            });
            hw_common_1.default.mpsdk.reportEvent(hw_common_def_1.default.REPORT_SHARE, shareinfo.shareid + "", "2");
        });
    };
    hw_common_share.prototype._getShareTips = function () {
        switch (this._sharefailtype) {
            case 1:
                return hw_common_1.default.config.sharefail_secondui;
            case 2:
                return hw_common_1.default.config.sharefail_modaltips_android;
            case 0:
                return hw_common_1.default.config.shareFailModalTips;
            default:
                break;
        }
    };
    /**
     * 添加周期内次数
     * @param share 是否分享
     */
    hw_common_share.prototype.addCycCnt = function (sharekey, share) {
        this._updateCyc(sharekey);
        var cycinfo = this._getCycInfo(sharekey);
        if (share)
            cycinfo.sharecount++;
        cycinfo.count++;
        this._saveCycInfo();
        trace("hw_common_share::addCycCnt->增加周期内循环次数,sharekey:", cycinfo.key, "cycinfo:", cycinfo);
    };
    /**
     * 当前是该分享还是视频
     * 调用前请先自行判断游戏条件@example 每日通关数大于50不可分享
     * 分享或看视频完成后请调用addCycCnt() 增加计数
     * @param sharekey 分享周期列表key值
     * @returns true:可以分享,false,不可分享,显示视频或其他
     */
    hw_common_share.prototype.canShare = function (sharekey) {
        if (sharekey === void 0) { sharekey = "default"; }
        if (hw_common_1.default.config.safe == false || hw_common_1.default.config.onlyVideoByCity == true || hw_common_1.default.config.isStrongFission == false) {
            trace("hw_common_share::canShare->不可分享,配置限制");
            return false;
        }
        if (this._checkCycLimit(sharekey)) {
            trace("hw_common_share::canShare->分享周期次数限制");
            return false;
        }
        //100代表分享,200代表视频
        var cycinfo = this._getCycInfo(sharekey);
        if (!cycinfo.sharepointlist) {
            cycinfo.sharepointlist = hw_common_1.default.config.getSharePointFromList(sharekey);
        }
        var top = cycinfo.sharepointlist[cycinfo.sharepointindex];
        if (cycinfo.count >= top % 100) {
            cycinfo.sharepointindex++;
            if (cycinfo.sharepointindex >= cycinfo.sharepointlist.length) {
                cycinfo.sharepointindex = 0;
            }
            cycinfo.count = 0;
            this._saveCycInfo();
        }
        top = cycinfo.sharepointlist[cycinfo.sharepointindex];
        trace("hw_common_share::canShare->shareinfo:", cycinfo);
        if (top >= 100 && top < 200) {
            return true;
        }
        else if (top >= 200) {
            return false;
        }
        return true;
    };
    //更新分享周期
    hw_common_share.prototype._updateCyc = function (sharekey) {
        var cycinfo = this._getCycInfo(sharekey);
        var passtime = hw_common_1.default.servertime.now - cycinfo.starttime;
        if (passtime > hw_common_def_1.default.DEF_SHARELIMIT_CYCLE) {
            var getTrueShareP = hw_common_1.default.config.platformConfig && this._getTrueShareFlag;
            cycinfo.sharecount = 0;
            cycinfo.starttime = hw_common_1.default.servertime.now;
            var sharepointlist = hw_common_1.default.config.getSharePointFromList(sharekey);
            if (getTrueShareP) {
                cycinfo.sharepointlist = sharepointlist;
            }
            this._saveCycInfo();
            trace("hw_common_share::updateCyc->精力周期超过,重置精力周期 key:", cycinfo.key, "cycinfo:", cycinfo);
        }
    };
    //是否达到周期内分享限制
    hw_common_share.prototype._checkCycLimit = function (sharekey) {
        this._updateCyc(sharekey);
        var shareinfo = this._getCycInfo(sharekey);
        return hw_common_1.default.servertime.now - shareinfo.starttime < hw_common_def_1.default.DEF_SHARELIMIT_CYCLE &&
            shareinfo.sharecount > hw_common_def_1.default.DEF_SHARELIMIT_MAX;
    };
    return hw_common_share;
}());
exports.default = hw_common_share;
var CycInfo = /** @class */ (function () {
    function CycInfo() {
    }
    return CycInfo;
}());
},{"../hw_common":2,"../hw_common_def":3}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EngineUtility_1 = require("../../hw_utils/EngineUtility");
/**音效基类 */
var hw_sound_interface = /** @class */ (function () {
    /**
     * 构造
     */
    function hw_sound_interface() {
        // 请根据玩家具体数据赋值
        this._bgmState = 1;
        this._soundState = 1;
    }
    Object.defineProperty(hw_sound_interface.prototype, "bgmState", {
        /**
        * 背景音乐开关
        */
        get: function () {
            return this._bgmState;
        },
        /**
        * 背景音乐开关
        */
        set: function (value) {
            this._bgmState = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(hw_sound_interface.prototype, "soundState", {
        /**
         * 音效开关
         */
        get: function () {
            return this._soundState;
        },
        /**
         * 音效开关
         */
        set: function (value) {
            this._soundState = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
    * 播放背景音乐。背景音乐同时只能播放一个，如果在播放背景音乐时再次调用本方法，会先停止之前的背景音乐，再播发当前的背景音乐。
    * @param url   声音文件地址。
    * @param loop    是否循环
    * @param volume    音量
    */
    hw_sound_interface.prototype.playMusic = function (url, loop, volume) {
        if (loop === void 0) { loop = true; }
        if (volume === void 0) { volume = 1; }
        EngineUtility_1.default.assert(false, "请在子类实现！");
    };
    /**
    * 停止播放背景音乐（不包括音效）。
    */
    hw_sound_interface.prototype.stopMusic = function () {
        EngineUtility_1.default.assert(false, "请在子类实现！");
    };
    /**
    * 播放音效
    * @param url 音效地址
    * @param loop 是否循环
    * @param volume    音量
    */
    hw_sound_interface.prototype.playSound = function (url, loop, volume) {
        if (loop === void 0) { loop = false; }
        if (volume === void 0) { volume = 1; }
        EngineUtility_1.default.assert(false, "请在子类实现！");
    };
    /**
    * 停止音效
    * @param url 音效地址
    */
    hw_sound_interface.prototype.stopSound = function (url) {
        EngineUtility_1.default.assert(false, "请在子类实现！");
    };
    /**
    * 设置背景音乐音量。音量范围从 0（静音）至 1（最大音量）。
    * @param volume  音量。初始值为1。音量范围从 0（静音）至 1（最大音量）。
    */
    hw_sound_interface.prototype.setMusicVolume = function (volume) {
        EngineUtility_1.default.assert(false, "请在子类实现！");
    };
    /**
    * 设置声音音量
    * @param volume  音量。初始值为1。音量范围从 0（静音）至 1（最大音量）。
    */
    hw_sound_interface.prototype.setSoundVolume = function (volume) {
        EngineUtility_1.default.assert(false, "请在子类实现！");
    };
    return hw_sound_interface;
}());
exports.default = hw_sound_interface;
},{"../../hw_utils/EngineUtility":18}],15:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var hw_sound_interface_1 = require("./hw_sound_interface");
/**
 * 声音管理器 网页版
 */
var hw_sound_web = /** @class */ (function (_super) {
    __extends(hw_sound_web, _super);
    /**
     * 构造
      */
    function hw_sound_web() {
        return _super.call(this) || this;
    }
    /**
     * 播放背景音乐。背景音乐同时只能播放一个，如果在播放背景音乐时再次调用本方法，会先停止之前的背景音乐，再播发当前的背景音乐。
     * @param url   声音文件地址。
     * @param loop    是否循环
     * @param volume    音量
    */
    hw_sound_web.prototype.playMusic = function (url, loop, volume) {
        if (loop === void 0) { loop = true; }
        if (volume === void 0) { volume = 1; }
        if (this.bgmState) {
            url = Laya.URL.formatURL(url);
            var musicChannel = Laya.SoundManager.playMusic(url, loop ? 0 : 1);
            if (musicChannel) {
                musicChannel.volume = volume;
            }
        }
    };
    /**
    * 停止播放背景音乐（不包括音效）。
    */
    hw_sound_web.prototype.stopMusic = function () {
        Laya.SoundManager.stopMusic();
    };
    /**
    * 播放音效
    * @param url 音效地址
    * @param loop 是否循环
    * @param volume    音量
    */
    hw_sound_web.prototype.playSound = function (url, loop, volume) {
        if (loop === void 0) { loop = false; }
        if (volume === void 0) { volume = 1; }
        if (this.soundState) {
            url = Laya.URL.formatURL(url);
            var soundChannel = Laya.SoundManager.playSound(url, loop ? 0 : 1);
            if (soundChannel) {
                soundChannel.volume = volume;
            }
        }
    };
    /**
    * 停止音效
    * @param url 音效地址
    */
    hw_sound_web.prototype.stopSound = function (url) {
        Laya.SoundManager.stopSound(url);
    };
    /**
    * 设置背景音乐音量。音量范围从 0（静音）至 1（最大音量）。
    * @param volume  音量。初始值为1。音量范围从 0（静音）至 1（最大音量）。
    */
    hw_sound_web.prototype.setMusicVolume = function (volume) {
        Laya.SoundManager.setMusicVolume(volume);
        Laya.SoundManager.musicMuted = (0 == volume);
    };
    /**
    * 设置声音音量
    * @param volume  音量。初始值为1。音量范围从 0（静音）至 1（最大音量）。
    */
    hw_sound_web.prototype.setSoundVolume = function (volume) {
        Laya.SoundManager.setSoundVolume(volume);
        Laya.SoundManager.soundMuted = (0 == volume);
    };
    return hw_sound_web;
}(hw_sound_interface_1.default));
exports.default = hw_sound_web;
},{"./hw_sound_interface":14}],16:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var hw_sound_interface_1 = require("./hw_sound_interface");
var Dictionary_1 = require("../../hw_utils/Dictionary");
/**
 * 声音管理器 微信版
 */
var hw_sound_wx = /** @class */ (function (_super) {
    __extends(hw_sound_wx, _super);
    /**
     * 构造
     */
    function hw_sound_wx() {
        var _this = _super.call(this) || this;
        /**音效字典 */
        _this._soundDic = null;
        /**背景音乐地址  */
        _this._bgUrl = "";
        /**微信背景音频 */
        _this._bgAudio = null;
        _this._soundDic = new Dictionary_1.default();
        return _this;
    }
    /**
    * 播放背景音乐。背景音乐同时只能播放一个，如果在播放背景音乐时再次调用本方法，会先停止之前的背景音乐，再播发当前的背景音乐。
    * @param url   声音文件地址。
    * @param loop    是否循环
    * @param volume    音量
    */
    hw_sound_wx.prototype.playMusic = function (url, loop, volume) {
        if (loop === void 0) { loop = true; }
        if (volume === void 0) { volume = 1; }
        if (this.bgmState) {
            url = Laya.URL.formatURL(url);
            if (this._bgUrl == url && this._bgAudio != null) {
                this._bgAudio.loop = loop;
                this._bgAudio.volume = volume;
                this._bgAudio.play();
            }
            else {
                this._bgUrl = url;
                if (this._bgAudio != null) {
                    this._bgAudio.destroy();
                    this._bgAudio = null;
                }
                this._bgAudio = wx.createInnerAudioContext();
                this._bgAudio.autoplay = true;
                this._bgAudio.loop = loop;
                this._bgAudio.volume = volume;
                this._bgAudio.src = this._bgUrl;
            }
        }
    };
    /**
    * 停止播放背景音乐（不包括音效）
    */
    hw_sound_wx.prototype.stopMusic = function () {
        if (this._bgAudio != null) {
            this._bgAudio.stop();
        }
    };
    /**
    * 播放音效
    * @param url 音效地址
    * @param loop 是否循环
    * @param volume    音量
    */
    hw_sound_wx.prototype.playSound = function (url, loop, volume) {
        if (loop === void 0) { loop = false; }
        if (volume === void 0) { volume = 1; }
        if (this.soundState) {
            url = Laya.URL.formatURL(url);
            var audio = this._soundDic.getValue(url);
            if (null == audio) {
                audio = wx.createInnerAudioContext();
                audio.src = url;
                audio.volume = volume;
                audio.loop = loop;
                audio.play();
                this._soundDic.setValue(url, audio);
            }
            else {
                if (Laya.Browser.onIOS) {
                    audio.seek(0);
                }
                else {
                    audio.stop();
                }
                audio.play();
            }
        }
    };
    /**
    * 停止音效
    * @param url 音效地址
    */
    hw_sound_wx.prototype.stopSound = function (url) {
        url = Laya.URL.formatURL(url);
        var audio = this._soundDic.getValue(url);
        if (audio != null) {
            audio.stop();
        }
    };
    /**
    * 设置背景音乐音量。音量范围从 0（静音）至 1（最大音量）。
    * @param volume  音量。初始值为1。音量范围从 0（静音）至 1（最大音量）。
    */
    hw_sound_wx.prototype.setMusicVolume = function (volume) {
        if (this._bgAudio != null) {
            this._bgAudio.volume = volume;
        }
    };
    /**
    * 设置声音音量
    * @param volume  音量。初始值为1。音量范围从 0（静音）至 1（最大音量）。
    */
    hw_sound_wx.prototype.setSoundVolume = function (volume) {
        this._soundDic.values.forEach(function (element) {
            if (element != null) {
                element.volume = volume;
            }
        });
    };
    return hw_sound_wx;
}(hw_sound_interface_1.default));
exports.default = hw_sound_wx;
},{"../../hw_utils/Dictionary":17,"./hw_sound_interface":14}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 字典类
 * by Neil
 */
var Dictionary = /** @class */ (function () {
    /**
     * 构造函数
     */
    function Dictionary() {
        /**键名集合 */
        this._keys = null;
        /**值集合 */
        this._values = null;
        this._keys = new Array();
        this._values = new Array();
    }
    /**
     * 销毁函数
     */
    Dictionary.prototype.destroy = function () {
    };
    /**
     * 给指定的键名设置值。
     * @param key 键名
     * @param value 值
     */
    Dictionary.prototype.setValue = function (key, value) {
        var index = this.indexOf(key);
        if (index >= 0) {
            this._values[index] = value;
            return;
        }
        this._keys.push(key);
        this._values.push(value);
    };
    /**
     * 获取指定对象的键名索引
     * @param key 键名对象
     * @return 键名索引
     */
    Dictionary.prototype.indexOf = function (key) {
        return this._keys.indexOf(key);
    };
    /**
     * 是否包含键名
     * @param key
     */
    Dictionary.prototype.containsKey = function (key) {
        return this._keys.indexOf(key) != -1;
    };
    /**
     * 返回指定键名的值
     * @param key 键名对象
     * @return 指定键名的值
     */
    Dictionary.prototype.getValue = function (key) {
        var index = this.indexOf(key);
        return index < 0 ? null : this._values[index];
    };
    /**
     * 移除指定键名的值
     * @param key 键名对象
     * @return 是否成功移除
     */
    Dictionary.prototype.remove = function (key) {
        var index = this.indexOf(key);
        if (index >= 0) {
            this._keys.splice(index, 1);
            this._values.splice(index, 1);
            return true;
        }
        return false;
    };
    /**
     * 清除此对象的键名列表和键值列表。
     */
    Dictionary.prototype.clear = function () {
        this._values.splice(0, this._values.length);
        this._keys.splice(0, this._keys.length);
    };
    Object.defineProperty(Dictionary.prototype, "values", {
        /**
         * 获取所有的值列表
         */
        get: function () {
            return this._values;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Dictionary.prototype, "keys", {
        /**
         * 获取所有的键名列表
         */
        get: function () {
            return this._keys;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 遍历
     * @param callback
     */
    Dictionary.prototype.forEach = function (callback) {
        for (var index = 0; index < this._keys.length; index++) {
            var key = this._keys[index];
            var value = this._values[index];
            var ret = callback(key, value);
            if (ret === false) {
                return;
            }
        }
    };
    Object.defineProperty(Dictionary.prototype, "length", {
        /**
         * 获取长度
         * @return 长度
         */
        get: function () {
            return this._values.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 是否为空
     * @return 是否
     */
    Dictionary.prototype.isEmpty = function () {
        return this._values.length <= 0;
    };
    return Dictionary;
}());
exports.default = Dictionary;
},{}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EngineUtility = /** @class */ (function () {
    function EngineUtility() {
    }
    EngineUtility.Initilaize = function () {
        var _this = this;
        // HACK in Laya engine core.
        for (var _i = 0, _a = this.InitCallback; _i < _a.length; _i++) {
            var callback = _a[_i];
            if (callback) {
                callback();
            }
        }
        // Press shortcut to do some debug operation
        if (this.bIsDebug) {
            Laya.stage.on(Laya.Event.KEY_UP, this, function (e) {
                if (e.ctrlKey) {
                    var x = event["which"] || event["keyCode"];
                    if (e["keyCode"] == 84) //'KEY_T'
                     {
                        _this.DumpAllFontAtlasTexture();
                        //this.DumpAllActiveTextures();
                    }
                }
            });
        }
        // Report error when load failed
        Laya.loader.on(laya.events.Event.ERROR, this, function (path) {
            EngineUtility.assert(false, "Load file " + path + " failed!");
        });
    };
    EngineUtility.showDebugBall = function (bShow, pos, radius, bEnableDepthTest, color) {
        if (radius === void 0) { radius = 1; }
        if (bEnableDepthTest === void 0) { bEnableDepthTest = true; }
        if (color === void 0) { color = new Laya.Vector4(1.0, 0, 0, 1); }
        if (this.bIsDebug) {
            if (bShow) {
                var debugBall = new Laya.MeshSprite3D(Laya.PrimitiveMesh.createSphere(1.0));
                var material = new Laya.BlinnPhongMaterial();
                material.depthWrite = true;
                material.albedoColor = color;
                material.blend = Laya.RenderState.BLEND_DISABLE;
                debugBall.meshRenderer.material = material;
                material.depthTest = bEnableDepthTest ? Laya.RenderState.DEPTHTEST_LESS : Laya.RenderState.DEPTHTEST_ALWAYS;
                debugBall.transform.scale.x = radius;
                debugBall.transform.scale.y = radius;
                debugBall.transform.scale.z = radius;
                //SceneMgr.GetInstance().curScene.addChild(debugBall);
                debugBall.transform.position = pos;
                this.debugMeshList.push(debugBall);
            }
            else {
                for (var _i = 0, _a = this.debugMeshList; _i < _a.length; _i++) {
                    var debugball = _a[_i];
                    debugball.removeSelf();
                }
            }
        }
    };
    EngineUtility.showDebugBox = function (bShow, minPos, maxPos, bEnableDepthTest, color) {
        if (bEnableDepthTest === void 0) { bEnableDepthTest = true; }
        if (color === void 0) { color = new Laya.Vector4(1.0, 0, 0, 1); }
        if (this.bIsDebug) {
            if (bShow) {
                var long = Math.abs(maxPos.x - minPos.x);
                var height = Math.abs(maxPos.y - minPos.y);
                var width = Math.abs(maxPos.z - minPos.z);
                var boxMesh = new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(long, height, width));
                var material = new Laya.BlinnPhongMaterial();
                material.depthWrite = true;
                material.albedoColor = color;
                material.blend = Laya.RenderState.BLEND_DISABLE;
                boxMesh.meshRenderer.material = material;
                material.depthTest = bEnableDepthTest ? Laya.RenderState.DEPTHTEST_LESS : Laya.RenderState.DEPTHTEST_ALWAYS;
                //SceneMgr.GetInstance().curScene.addChild(boxMesh);
                var centerPos = new Laya.Vector3();
                Laya.Vector3.add(maxPos, minPos, centerPos);
                Laya.Vector3.scale(centerPos, 0.5, centerPos);
                boxMesh.transform.position = centerPos;
                this.debugMeshList.push(boxMesh);
            }
            else {
                for (var _i = 0, _a = this.debugMeshList; _i < _a.length; _i++) {
                    var debugball = _a[_i];
                    debugball.removeSelf();
                }
            }
        }
    };
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
    EngineUtility.log = function (key) {
        var message = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            message[_i - 1] = arguments[_i];
        }
        if (this.bIsDebug) {
            console.log("[" + Laya.Browser.now().toString() + "]: " + this.nestFmt(key, message));
        }
    };
    //Radomn
    EngineUtility.setRandomSeed = function (seed) {
        EngineUtility.randomSeed = seed;
    };
    EngineUtility.getRandomNumber = function () {
        EngineUtility.randomSeed = (EngineUtility.randomSeed * 214013 + 2531011) & 0xFFFFFFFF;
        var randomRet = ((EngineUtility.randomSeed >> 16) & 0x7fff);
        return randomRet;
    };
    EngineUtility.GetRandRange = function (minValue, maxValue) {
        return minValue + Math.round((maxValue - minValue) * this.getRandomNumber() / 0x7fff);
    };
    EngineUtility.EncodeBase64 = function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = EngineUtility._utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            }
            else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                EngineUtility._keyStr.charAt(enc1) + EngineUtility._keyStr.charAt(enc2) +
                EngineUtility._keyStr.charAt(enc3) + EngineUtility._keyStr.charAt(enc4);
        }
        return output;
    };
    EngineUtility.DecodeBase64 = function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = EngineUtility._keyStr.indexOf(input.charAt(i++));
            enc2 = EngineUtility._keyStr.indexOf(input.charAt(i++));
            enc3 = EngineUtility._keyStr.indexOf(input.charAt(i++));
            enc4 = EngineUtility._keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = EngineUtility._utf8_decode(output);
        return output;
    };
    EngineUtility._utf8_encode = function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    };
    EngineUtility._utf8_decode = function (utftext) {
        var string = "";
        var i = 0;
        var c = 0;
        var c1 = 0;
        var c2 = 0;
        var c3 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    };
    //Perform
    EngineUtility.PerformMark = function (name) {
        if (this.enablePerformDetect) {
            this.assert(this.FindPerformMark(name) == null, "same perform mark " + name + " is detected!");
            this.performData.push({ "name": name, "time": performance.now() });
        }
    };
    EngineUtility.PeformDuration = function (startMark, endMark) {
        var startTime = this.FindPerformMark(startMark);
        var endTime = this.FindPerformMark(endMark);
        this.assert(startTime != null, "find perform start mark " + startMark + " failed!");
        this.assert(endTime != null, "find perform end mark " + endMark + " failed!");
        return endTime - startTime;
    };
    EngineUtility.FindPerformMark = function (name) {
        for (var i = 0; i < this.performData.length; ++i) {
            if (this.performData[i].name == name) {
                return this.performData[i];
            }
        }
        return null;
    };
    EngineUtility.PerformReset = function () {
        if (this.enablePerformDetect) {
            if (Laya.timer.delta > 25) {
                console.log("PERFORM REPORT START frame:%d dt:%d========================", Laya.timer.currFrame, Laya.timer.delta);
                var elapsedTime = 0;
                if (this.performData.length > 1) {
                    for (var i = 0; i < this.performData.length - 1; ++i) {
                        var startPerformData = this.performData[i];
                        var endPerformData = this.performData[i + 1];
                        var retTime = endPerformData.time - startPerformData.time;
                        if (!this.silencePerformMode || retTime != 0) {
                            console.log("from %s to %s: %d", startPerformData.name, endPerformData.name, retTime);
                        }
                    }
                    elapsedTime = this.performData[this.performData.length - 1].time - this.performData[0].time;
                }
                console.log("PERFORM REPORT END " + elapsedTime + " ms deltaTime: " + Laya.timer.delta + " ms clearDuration: " + (performance.now() - this.lastResetTime) + " ms========================");
            }
            this.lastResetTime = performance.now();
            this.performData = [];
        }
    };
    EngineUtility.DumpAllFontAtlasTexture = function () {
        var textAtlases = laya.resource.Context['_textRender'].textAtlases;
        var index = 0;
        for (var _i = 0, textAtlases_1 = textAtlases; _i < textAtlases_1.length; _i++) {
            var n = textAtlases_1[_i];
            var textAtlas = n;
            this.saveTextureToFile(textAtlas.texture._source, textAtlas.texWidth, textAtlas.texHeight, "textAtlas" + index++ + ".png");
        }
    };
    EngineUtility.DumpAllActiveTextures = function () {
        var counter = 0;
        for (var _i = 0, _a = Laya.WebGLContext._activeTextures; _i < _a.length; _i++) {
            var activeTex = _a[_i];
            if (activeTex) {
                EngineUtility.log("Dump texture id %s", activeTex.toString());
                this.saveTextureToFile(activeTex, 2048, 2048, "activeTexture_" + counter++ + ".png");
            }
        }
    };
    //
    EngineUtility.saveTextureToFile = function (webGLtexture, width, height, fileName) {
        var gl = laya.layagl.LayaGL.instance;
        var fb = gl.createFramebuffer();
        // make this the current frame buffer
        gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
        // attach the texture to the framebuffer.
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, webGLtexture, 0);
        // check if you can read from this type of texture.
        var canRead = (gl.checkFramebufferStatus(gl.FRAMEBUFFER) == gl.FRAMEBUFFER_COMPLETE);
        if (canRead) {
            // bind the framebuffer
            gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
            var data = new Uint8Array(width * height * 4);
            // read the pixels
            gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, data);
            var canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext("2d");
            var imageData = ctx.createImageData(width, height);
            for (var i = 0; i < imageData.data.length; i++) {
                imageData.data[i] = data[i];
            }
            ctx.putImageData(imageData, 0, 0);
            var tmp = canvas.toDataURL("image/png");
            var download = document.createElement('a');
            download.href = tmp;
            download.download = fileName;
            download.click();
        }
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
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
    EngineUtility.nestFmt = function (key) {
        var argv = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            argv[_i - 1] = arguments[_i];
        }
        if (argv.length > 0) {
            return vsprintf(key, argv[0]);
        }
        else {
            return key;
        }
    };
    EngineUtility.addOutlineSprite = function (sprite, recursive) {
        if (recursive === void 0) { recursive = false; }
        var texture = sprite.texture;
        if (texture) {
            var outline = sprite.getChildByName("outline_dbg");
            if (outline == null) {
                outline = new Laya.Sprite();
                outline.name = "outline_dbg";
                sprite.addChild(outline);
            }
            outline.graphics.clear();
            outline.graphics.drawRect(0, 0, texture.sourceWidth, texture.sourceHeight, null, 0x00FF00, 1);
            outline.graphics.drawRect(texture.offsetX, texture.offsetY, texture.width, texture.height, null, 0x0000FF, 1);
            if (recursive && EngineUtility.outlineStackIndex < 3) {
                EngineUtility.outlineStackIndex++;
                for (var _i = 0, _a = sprite._children; _i < _a.length; _i++) {
                    var child = _a[_i];
                    this.addOutlineSprite(child, true);
                }
                EngineUtility.outlineStackIndex--;
            }
        }
    };
    EngineUtility.bIsDebug = false;
    EngineUtility.debugMeshList = new Array();
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
    EngineUtility.enableSpriteOutline = false; //精灵边缘绘制开关
    EngineUtility.enableSpriteBigOutline = false; //精灵大外框绘制开关
    EngineUtility.enableSpriteCenterDraw = false; //精灵坐标点绘制开关
    EngineUtility.enableHitRectOutline = false; //碰撞区域绘制开关
    //Base64
    // private property  
    EngineUtility._keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    EngineUtility.outlineStackIndex = 0;
    return EngineUtility;
}());
exports.default = EngineUtility;
},{}],19:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 数学工具类
 */
var MathUtils = /** @class */ (function () {
    function MathUtils() {
    }
    /**
     * 从两个数字之间随机取一个浮点数
     * @param low 小值
     * @param high 大值,不填就是0~小值
     */
    MathUtils.randomBetween = function (low, high) {
        if (high === void 0) { high = null; }
        if (high == null) {
            high = low;
            low = 0;
        }
        var ran = low + Math.floor(Math.random() * (high - low));
        return ran;
    };
    /**
     * 从两个数字之间随机取一个整数
     * @param low 小值
     * @param high 大值,不填就是0~小值
     */
    MathUtils.randomBetween_Int = function (min, max) {
        var n = MathUtils.randomBetween(min, max);
        return Math.floor(n);
    };
    /**
     * 随机打乱数组
     * @param list
     */
    MathUtils.randomSort = function (list) {
        if (list == null) {
            return null;
        }
        list.sort(function (a, b) {
            return 0.5 - Math.random();
        });
        return list;
    };
    /**
     * 从数组中随机取出一个值
     * @param list
     */
    MathUtils.getRDFromList = function (list) {
        var len = list.length;
        var id = Math.floor(Math.random() * len);
        return list[id];
    };
    /**
     * 权重随机取一个值
     * @param str 根据冒号后的值计算权重 @example a:30,b:50,c:70,d:100
     * @returns string
     */
    MathUtils.getRDFromStr_1 = function (str) {
        var slist = str.split(",");
        var vlist = [];
        var max = 0;
        for (var i = 0; i < slist.length; i++) {
            var vstr = slist[i];
            var varr = vstr.split(":");
            var v = +varr[1];
            if (isNaN(v))
                v = 0;
            var kv = { key: varr[0], value: v };
            max += v;
            vlist.push(kv);
        }
        if (vlist.length == 1) {
            return vlist[0].key;
        }
        var r = Math.random() * max;
        var last = 0;
        for (var i_1 = 0; i_1 < vlist.length; i_1++) {
            if (r >= last && r < (last + vlist[i_1].value)) {
                var key = vlist[i_1].key;
                return key;
            }
            last += vlist[i_1].value;
        }
        return null;
    };
    return MathUtils;
}());
exports.default = MathUtils;
},{}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
  * 微信场景值
  */
var SceneID_WX;
(function (SceneID_WX) {
    SceneID_WX[SceneID_WX["COLLECT"] = 1089] = "COLLECT";
    SceneID_WX[SceneID_WX["FLOATWIN"] = 1131] = "FLOATWIN";
    SceneID_WX[SceneID_WX["SHARECARD_FRIEND"] = 1007] = "SHARECARD_FRIEND";
})(SceneID_WX = exports.SceneID_WX || (exports.SceneID_WX = {}));
},{}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 时间工具类
 */
var TimeUtils = /** @class */ (function () {
    function TimeUtils() {
    }
    /**
     * 根据时间戳获取日期字符串
     * 1:tag为空时->xx年xx月xx日
     * 2:tag假设为- xx-xx-xx
     * @param  {number} t
     * @param  {string=null} tag
     * @returns string
     */
    TimeUtils.getYMD = function (t, tag) {
        if (tag === void 0) { tag = null; }
        var str = "";
        var date = new Date(t);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        if (tag == null) {
            return y + "年" + m + "月" + d + "日";
        }
        else {
            return [y, m, d].join(tag);
        }
    };
    /**
     * 获取年月日小时分钟秒
     * 20160803090501
     * @param timer
     */
    TimeUtils.getYMDHHMS = function (timer) {
        var date = new Date(timer);
        var y = date.getFullYear();
        var m = TimeUtils.fix0(date.getMonth() + 1);
        var d = TimeUtils.fix0(date.getDate());
        var ss = Math.floor(timer / 1000);
        var mm = Math.floor(ss / 60);
        var hh = TimeUtils.fix0(Math.floor(mm / 60) % 24);
        var vs = TimeUtils.fix0(ss % 60);
        var vm = TimeUtils.fix0(mm % 60);
        return y + m + d + hh + vm + vs;
    };
    /**
     * 根据时间戳返回时间格式字符串
     * 1:tag为空时->xx年xx月xx日
     * 2:tag假设为- xx-xx-xx
     * @param timer
     */
    TimeUtils.getHHMMSS = function (timer, tag) {
        if (tag === void 0) { tag = null; }
        var str = "";
        var ss = Math.floor(timer / 1000);
        var mm = Math.floor(ss / 60);
        var hh = Math.floor(mm / 60);
        var vs = ss % 60;
        var vm = mm % 60;
        if (hh > 0) {
            str += hh + tag == null ? "小时" : tag;
        }
        if (vm > 0 || hh > 0) {
            str += vm + tag == null ? "分钟" : tag;
        }
        if (vs >= 0 || hh > 0 || mm > 0) {
            str += vs + tag == null ? "秒" : tag;
        }
        return str;
    };
    /**
     * 获取时间格式 00:00
     * @param time
     */
    TimeUtils.getTimeMMSS = function (time) {
        if (time < 0)
            time = 0;
        time = Math.ceil(time / 1000);
        var timeShow = "";
        var minute = Math.floor(time / 60);
        var second = time % 60;
        timeShow = this.fix0(minute) + ":" + this.fix0(second);
        return timeShow;
    };
    //获取时间格式 00:00:00
    TimeUtils.getTimeHHMMSS0 = function (time) {
        var timeShow = "";
        var secondTemp = Math.ceil(time / 1000);
        var minuteTemp = Math.floor(secondTemp / 60);
        var hour = Math.floor(minuteTemp / 60);
        var minute = minuteTemp % 60;
        var second = secondTemp % 60;
        timeShow = (hour >= 10 ? hour + "" : "0" + hour) + ":" + (minute >= 10 ? minute + "" : "0" + minute) + ":" + (second >= 10 ? second + "" : "0" + second);
        return timeShow;
    };
    /**
     * 判断是否相同天,0点对比
     * @param t1 时间戳
     * @param t2 时间戳
     */
    TimeUtils.IsSameDay = function (t1, t2) {
        if (t1 == null || t2 == null) {
            return false;
        }
        var date1 = new Date(t1);
        var y1 = date1.getFullYear();
        var m1 = date1.getMonth() + 1;
        var d1 = date1.getDate();
        var date2 = new Date(t2);
        var y2 = date2.getFullYear();
        var m2 = date2.getMonth() + 1;
        var d2 = date2.getDate();
        if (y1 == y2 && m1 == m2 && d1 == d2) {
            return true;
        }
        return false;
    };
    /**
     * 根据参照点判断两天是否相等
     * @param  {number} start 参照时间点,比如xx天上午4点整的时间戳
     * @param  {number} day1 时间戳
     * @param  {number} day2 时间戳
     */
    TimeUtils.IsSameDayByStart = function (start, day1, day2) {
        var d1 = Math.floor((day1 - start) / (1000 * 60 * 60 * 24));
        var d2 = Math.floor((day2 - start) / (1000 * 60 * 60 * 24));
        return d1 == d2;
    };
    /**
     * 判断是否同一周,周一0点分割
     * @param old
     * @param now
     */
    TimeUtils.isSameWeek = function (old, now) {
        var oneDayTime = 1000 * 60 * 60 * 24;
        var old_count = Math.floor(old / oneDayTime);
        var now_other = Math.floor(now / oneDayTime);
        return Math.floor((old_count + 4) / 7) == Math.floor((now_other + 4) / 7);
    };
    /**
     * 获取某月有多少天
     * @param  {any} year
     * @param  {any} month
     */
    TimeUtils.getMonthTotalDay = function (year, month) {
        var d = new Date(year, month, 0);
        return d.getDate();
    };
    /**
     * 返回某月1日到月底的时间文本
     * 例子说明一切: 2018年5月1日-2018年5月31日
     * @param  {number} t
     * @returns string
     */
    TimeUtils.getMonthRangeStr = function (t) {
        var str = "";
        var date = new Date(t);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var totalday = TimeUtils.getMonthTotalDay(y, m);
        return y + "年" + m + "月" + "1日-" + y + "年" + m + "月" + totalday + "日";
    };
    /**
     * 检查now时间戳是否在mon时间戳的所在月
     * @param  {number} now 检测时间
     * @param  {number} mon 化身为月的时间
     * @returns string
     */
    TimeUtils.checkInMonth = function (now, mon) {
        var date1 = new Date(mon);
        var date2 = new Date(now);
        if (date1.getFullYear() === date2.getFullYear() && date1.getMonth() == date2.getMonth()) {
            return true;
        }
        return false;
    };
    /**
     * 判断是否同一小时
     * @param  {number} t1
     * @param  {number} t2
     * @returns boolean
     */
    TimeUtils.CheckSameHours = function (t1, t2) {
        var date1 = new Date(t1);
        var date2 = new Date(t2);
        if (date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate() &&
            date1.getHours() === date2.getHours()) {
            return true;
        }
        return false;
    };
    /**
     * 根据两个时间点差值获取间隔天数,同一天返回0
     * @param t1
     * @param t2
     */
    TimeUtils.GetDayCntFromTime2 = function (t1, t2) {
        var dec = Math.abs(t1 - t2);
        var daydec = dec / (24 * 60 * 60 * 1000);
        var day = Math.floor(daydec);
        return day;
    };
    /**
     * 个位数补零
     * @param n
     */
    TimeUtils.fix0 = function (n) {
        if (n < 10) {
            return "0" + n;
        }
        return "" + n;
    };
    return TimeUtils;
}());
exports.default = TimeUtils;
},{}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 节点工具
 */
var ViewUtils = /** @class */ (function () {
    /**
     * 构造函数
     */
    function ViewUtils() {
    }
    /**
     * 从父节点移除自己
     * @param dis 需要移除的节点
     */
    ViewUtils.removeSelf = function (dis) {
        if (dis == null || dis.parent == null) {
            trace("ViewUtils::RemoveFromeParent->找不到父对象");
            return;
        }
        if (dis instanceof Laya.Node) {
            dis.parent.removeChild(dis);
        }
        else if (dis instanceof fairygui.GComponent) {
            dis.removeFromParent();
        }
    };
    /**
     * 将子元素移到最前面
     * @param dis 节点
     */
    ViewUtils.transChildToTop = function (dis) {
        if (dis == null || dis.parent == null) {
            trace("ViewUtils::RemoveFromeParent->找不到父对象");
            return;
        }
        dis.parent.addChild(dis);
    };
    /**
     * 置灰
     * @param dis 节点
     * @param isCancel 是否取消
     */
    ViewUtils.grayed = function (dis, isCancel) {
        if (isCancel === void 0) { isCancel = false; }
        if (isCancel) {
            dis.filters = [];
            return;
        }
        var grayscaleMat = [
            0, 0, 0, 0, 100,
            0, 0, 0, 0, 100,
            0, 0, 0, 0, 100,
            0, 0, 0, 1, 0
        ];
        //创建一个颜色滤镜对象，灰图
        var grayscaleFilter = new Laya.ColorFilter(grayscaleMat);
        dis.filters = [grayscaleFilter];
    };
    /**
    * 震屏
    * @param root
    * @param shakeX
    * @param shakeY
    */
    ViewUtils.shakeScreen = function (root, shakeX, shakeY) {
        if (this._timeLine) {
            return;
        }
        var shakeToX = root.x + shakeX;
        var shakeToY = root.y + shakeY;
        var shakeFromX = root.x - shakeX;
        var shakeFromY = root.y - shakeY;
        this._timeLine = new Laya.TimeLine();
        this._timeLine.to(root, { x: shakeToX, y: shakeToY }, this.ShakeIntervalTime, Laya.Ease.backOut, 0).to(root, { x: shakeToX, y: shakeFromY }, this.ShakeIntervalTime, Laya.Ease.bounceIn, 0).to(root, { x: shakeFromX, y: shakeFromY }, this.ShakeIntervalTime, Laya.Ease.bounceOut, 0).to(root, { x: shakeFromX, y: shakeToY }, this.ShakeIntervalTime, Laya.Ease.bounceIn, 0).to(root, { x: shakeToX, y: shakeToY }, this.ShakeIntervalTime, Laya.Ease.bounceOut, 0).to(root, { x: shakeFromX, y: shakeFromY }, this.ShakeIntervalTime, Laya.Ease.bounceIn, 0).to(root, { x: root.x, y: root.y }, this.ShakeIntervalTime, Laya.Ease.bounceOut, 0);
        this._timeLine.once(Laya.Event.COMPLETE, this, this.onShakeOver);
        this._timeLine.play();
    };
    /**
    * 震屏结束
    */
    ViewUtils.onShakeOver = function () {
        this._timeLine.reset();
        this._timeLine.destroy();
        this._timeLine = null;
    };
    /**单次震动时间  */
    ViewUtils.ShakeIntervalTime = 80;
    return ViewUtils;
}());
exports.default = ViewUtils;
},{}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LevelConfig_1 = require("../model/confvo/LevelConfig");
var LoadDef_1 = require("../def/LoadDef");
var ConfigDef_1 = require("../def/ConfigDef");
var LevelGift_1 = require("../model/confvo/LevelGift");
var ConfigMgr = /** @class */ (function () {
    function ConfigMgr() {
        this.allConfig = {};
        this._maxlevel = 0;
    }
    Object.defineProperty(ConfigMgr.prototype, "MaxLevel", {
        get: function () {
            return this._maxlevel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigMgr, "Inst", {
        get: function () {
            if (ConfigMgr._INST == null) {
                ConfigMgr._INST = new ConfigMgr();
            }
            return ConfigMgr._INST;
        },
        enumerable: true,
        configurable: true
    });
    ConfigMgr.prototype.init = function () {
        trace("ConfigMgr::Init->开始读取配置表");
        var byte = Laya.loader.getRes(LoadDef_1.default.ConfigUrl);
        var zip = new JSZip(byte);
        var reg = /.*?/;
        var jlist = zip.file(reg);
        for (var _i = 0, jlist_1 = jlist; _i < jlist_1.length; _i++) {
            var i = jlist_1[_i];
            trace("ConfigMgr::Init->开始读取配置表", i.name);
            this.allConfig[i.name] = this.resetData(i.name, JSON.parse(i.asText()));
        }
        trace("ConfigMgr::Init->配置表读取完成");
        this._setMaxLevel();
    };
    ConfigMgr.prototype._setMaxLevel = function () {
        var oblist = this.GetConfigByName(ConfigDef_1.default.LevelData);
        var ml = 0;
        for (var _i = 0, oblist_1 = oblist; _i < oblist_1.length; _i++) {
            var i = oblist_1[_i];
            if (i.id > ml) {
                ml = i.id;
            }
        }
        this._maxlevel = ml;
    };
    ConfigMgr.prototype.resetData = function (name, obj) {
        var itemcls = null;
        switch (name) {
            case ConfigDef_1.default.LevelData:
                itemcls = LevelConfig_1.default;
                break;
            case ConfigDef_1.default.LevelGift:
                itemcls = LevelGift_1.default;
                break;
            default:
                break;
        }
        if (itemcls) {
            for (var i in obj) {
                var ic = new itemcls(obj[i]);
                obj[i] = ic;
            }
        }
        return obj;
    };
    /**
    * 根据配置表文件名获取配置文件,宏定义在LoadDef中
    */
    ConfigMgr.prototype.GetConfigByName = function (configresname) {
        var obj = this.allConfig[configresname];
        return obj;
    };
    /**
     * 根据配置表文件名和id获取数据条目
     */
    ConfigMgr.prototype.GetVOByNameAndID = function (configresname, configid, idname) {
        if (idname === void 0) { idname = "id"; }
        var obj = this.allConfig[configresname];
        if (obj == null || configid == null) {
            trace("ConfigMgr::GetVOByNameAndID->没有发现该名字的配置");
            return null;
        }
        for (var _i = 0, obj_1 = obj; _i < obj_1.length; _i++) {
            var i = obj_1[_i];
            if (i[idname] == configid) {
                return i;
            }
        }
        return null;
    };
    return ConfigMgr;
}());
exports.default = ConfigMgr;
},{"../def/ConfigDef":34,"../def/LoadDef":42,"../model/confvo/LevelConfig":47,"../model/confvo/LevelGift":48}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EDataType_1 = require("../def/EDataType");
var DataMgr = /** @class */ (function () {
    function DataMgr() {
    }
    Object.defineProperty(DataMgr, "Inst", {
        get: function () {
            if (DataMgr._INST == null) {
                DataMgr._INST = new DataMgr();
            }
            return DataMgr._INST;
        },
        enumerable: true,
        configurable: true
    });
    DataMgr.prototype.getDataByKey = function (key, type) {
        var data = Laya.LocalStorage.getItem(key);
        switch (type) {
            case EDataType_1.EDataType.Number:
                return +data;
            case EDataType_1.EDataType.String:
                if (data == "" || data == null) {
                    return null;
                }
                return data;
            case EDataType_1.EDataType.Any:
                if (data == "" || data == null) {
                    return null;
                }
                return JSON.parse(data);
            default:
                return data;
        }
    };
    DataMgr.prototype.setDataByKey = function (key, data, type) {
        var str;
        switch (type) {
            case EDataType_1.EDataType.Number:
                str = data + "";
                break;
            case EDataType_1.EDataType.String:
                str = data;
                break;
            case EDataType_1.EDataType.Any:
                if (data == "" || data == null) {
                    trace("[error]DataMgr::SetDataByKey->为啥存了一个空Json??");
                    return;
                }
                str = JSON.stringify(data);
                break;
            default:
                str = data;
        }
        if (window["wx"]) {
            //因为这个是微信的异步存储,不会引起游戏卡顿.所以用这个.这样修改后,同一个线程不允许先写后读;
            wx.setStorage({ key: key, data: str });
        }
        else {
            Laya.LocalStorage.setItem(key, str);
        }
    };
    return DataMgr;
}());
exports.default = DataMgr;
},{"../def/EDataType":37}],25:[function(require,module,exports){
"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var ConfigMgr_1 = require("./ConfigMgr");
var GameMgr_1 = require("./game/GameMgr");
var LoadDef_1 = require("../def/LoadDef");
var EventDef_1 = require("../def/EventDef");
var EventMgr_1 = require("./event/EventMgr");
/**
 * 加载控制器
 */
var LoadMgr = /** @class */ (function () {
    function LoadMgr() {
        this.isLoadGameResOver = false; //是否加载完"game"组的资源
        this.isLoadOldUserRes = false; //是否加载高级用户的资源
    }
    Object.defineProperty(LoadMgr, "Inst", {
        get: function () {
            if (LoadMgr._INST == null) {
                LoadMgr._INST = new LoadMgr();
                LoadMgr._INST.init();
            }
            return LoadMgr._INST;
        },
        enumerable: true,
        configurable: true
    });
    LoadMgr.prototype.init = function () {
    };
    Object.defineProperty(LoadMgr.prototype, "loadingReport", {
        set: function (rp) {
            this._progres = rp;
        },
        enumerable: true,
        configurable: true
    });
    //加载loading所需的资源
    LoadMgr.prototype.loadLoading = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                Laya.loader.load(LoadDef_1.default.RES_LOADING, Laya.Handler.create(this, function (res) {
                    trace("LoadMgr::loadLoading->加载完成", res);
                    EventMgr_1.default.Inst.event(EventDef_1.default.RES_LOADINGOVER);
                }), null, null, 0).once(Laya.Event.ERROR, this, function (e) {
                    trace("[error]LoadMgr::LoadLoading->加载异常", e);
                });
                return [2 /*return*/];
            });
        });
    };
    //加载游戏所需的资源
    LoadMgr.prototype.loadGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                this._resetGameGroup();
                Laya.loader.load(LoadDef_1.default.Res_Game, Laya.Handler.create(this, function () {
                    LoadMgr.Inst.isLoadGameResOver = true;
                    EventMgr_1.default.Inst.event(EventDef_1.default.RES_GAMEOVER);
                }), Laya.Handler.create(this, function (curProgress) {
                    _this._progres.OnProgress(curProgress, LoadDef_1.default.Res_Game.length);
                }, null, false), null, 0).once(Laya.Event.ERROR, this, function (e) {
                    trace("[error]LoadMgr::Res_Game=>加载异常", e);
                });
                return [2 /*return*/];
            });
        });
    };
    //根据游戏存档数据,动态设置加载资源
    LoadMgr.prototype._resetGameGroup = function () {
        var list = LoadDef_1.default.Res_Game;
    };
    //后台加载动态资源
    LoadMgr.prototype.loadDynamic = function () {
    };
    LoadMgr.prototype.getLevelImage = function (conf) {
        var urllist = [];
        if (conf.rimg1) {
            urllist[0] = conf.rimg1;
        }
        else {
            urllist[0] = this._getloadUrl(conf.img1);
        }
        if (conf.rimg2) {
            urllist[1] = conf.rimg2;
        }
        else {
            urllist[1] = this._getloadUrl(conf.img2);
        }
        return urllist;
    };
    LoadMgr.prototype._getloadUrl = function (url) {
        if (GameMgr_1.default.Inst.level > ConfigMgr_1.default.Inst.MaxLevel) {
            return platform.cdnURL + "levelimage/" + url + ".jpg";
        }
        else {
            return "res/quizimg/" + url + ".jpg";
        }
    };
    return LoadMgr;
}());
exports.default = LoadMgr;
},{"../def/EventDef":40,"../def/LoadDef":42,"./ConfigMgr":23,"./event/EventMgr":29,"./game/GameMgr":31}],26:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var hw_common_1 = require("../../com/hw_common/hw_common");
var hw_common_def_1 = require("../../com/hw_common/hw_common_def");
var EventDef_1 = require("../def/EventDef");
var LoadMgr_1 = require("./LoadMgr");
var SceneLoading_1 = require("../view/scenes/loading/SceneLoading");
var ViewMgr_1 = require("./ViewMgr");
var ReportDef_1 = require("../def/ReportDef");
var GameMgr_1 = require("./game/GameMgr");
var EventMgr_1 = require("./event/EventMgr");
var ConfigMgr_1 = require("./ConfigMgr");
var LobbyScene_1 = require("../view/scenes/lobby/LobbyScene");
var SoundDef_1 = require("../def/SoundDef");
var LoadDef_1 = require("../def/LoadDef");
var SceneID_WX_1 = require("../../com/hw_utils/SceneID_WX");
var WinOfflineBox_1 = require("../view/windows/WinOfflineBox");
var GameDef_1 = require("../def/GameDef");
var WinGetReward_1 = require("../view/windows/WinGetReward");
var ECurrencyType_1 = require("../def/ECurrencyType");
/**
 * 流程控制器
 */
var ProcessMgr = /** @class */ (function () {
    function ProcessMgr() {
        this._dataOk = false;
        this._loadingOk = false;
    }
    Object.defineProperty(ProcessMgr, "Inst", {
        get: function () {
            if (ProcessMgr._INST == null) {
                ProcessMgr._INST = new ProcessMgr();
            }
            return ProcessMgr._INST;
        },
        enumerable: true,
        configurable: true
    });
    ProcessMgr.prototype.Start = function () {
        hw_common_1.default.event.once(hw_common_def_1.default.EVT_SD_SERVERDATA_OK, this, this._dataOver);
        EventMgr_1.default.Inst.once(EventDef_1.default.RES_LOADINGOVER, this, this._loadingOver);
        LoadMgr_1.default.Inst.loadLoading();
    };
    ProcessMgr.prototype._loadingOver = function () {
        ViewMgr_1.default.Inst.bindFUI(LoadDef_1.default.PKGNAME_LOADING);
        LoadMgr_1.default.Inst.loadingReport = ViewMgr_1.default.Inst.showScene(SceneLoading_1.default);
        this._loadingOk = true;
        this._toLoadGame();
        hw_common_1.default.mpsdk.reportEvent(ReportDef_1.default.EVENT_SHOWLOADING);
    };
    ProcessMgr.prototype._dataOver = function (serverdata) {
        this._dataOk = true;
        GameMgr_1.default.Inst.init(serverdata);
        this._toLoadGame();
    };
    ProcessMgr.prototype._toLoadGame = function () {
        if (this._dataOk && this._loadingOk) {
            this._loadGame();
        }
    };
    ProcessMgr.prototype._loadGame = function () {
        EventMgr_1.default.Inst.once(EventDef_1.default.RES_GAMEOVER, this, this._loadGameOver);
        LoadMgr_1.default.Inst.loadGame();
        this._loadgameStartTM = hw_common_1.default.servertime.now;
    };
    ProcessMgr.prototype._loadGameOver = function () {
        ViewMgr_1.default.Inst.bindFUI(LoadDef_1.default.PkgName_Game);
        ConfigMgr_1.default.Inst.init();
        this._enterGame();
        var delay = hw_common_1.default.servertime.now - this._loadgameStartTM;
        hw_common_1.default.mpsdk.reportEvent(ReportDef_1.default.EVENT_LOADINGOVER, delay + "");
    };
    ProcessMgr.prototype._enterGame = function () {
        trace("进入游戏！！！！！！！！！！！！");
        if (GameMgr_1.default.Inst.level < 2) {
            GameMgr_1.default.Inst.goGame();
            hw_common_1.default.mpsdk.reportEvent(ReportDef_1.default.EVENT_INLOBBY);
        }
        else {
            ViewMgr_1.default.Inst.showScene(LobbyScene_1.default);
            hw_common_1.default.mpsdk.reportEvent(ReportDef_1.default.EVENT_INLOBBY);
        }
        LoadMgr_1.default.Inst.loadDynamic();
        this._exeLoginWin();
    };
    //处理登陆弹窗
    ProcessMgr.prototype._exeLoginWin = function () {
        //监听游戏切到前台
        hw_common_1.default.event.on(hw_common_def_1.default.EVT_PLATFORM_ONSHOW, this, this._onPlatformShow);
        //进入游戏后先触发一次,判断游戏进入场景值
        this._onPlatformShow(false);
        this.showOffLineBox();
    };
    //游戏切到前台
    ProcessMgr.prototype._onPlatformShow = function (ishot) {
        if (ishot === void 0) { ishot = true; }
        trace("ProcessMgr::_onPlatformShow->小游戏切到前台");
        this._onShowWhereIn();
        this._onShowTryPlay();
        hw_common_1.default.platform.ShowInBy(SceneID_WX_1.SceneID_WX.COLLECT);
        if (hw_common_1.default.sound.bgmState)
            hw_common_1.default.sound.playMusic(SoundDef_1.default.BGM);
        ;
    };
    ProcessMgr.prototype.showOffLineBox = function () {
        trace("判断离线宝箱:");
        if (hw_common_1.default.servertime.now - GameMgr_1.default.Inst.data.other.gotofflinetm > GameDef_1.default.OFFLINEREWARDS_DELAY) {
            ViewMgr_1.default.Inst.showWindowByQueue(WinOfflineBox_1.default);
        }
    };
    //切到前台,判断场景值
    ProcessMgr.prototype._onShowWhereIn = function () {
        if (!GameMgr_1.default.Inst.getHasGetDailyColReward() && hw_common_1.default.platform.ShowInBy(SceneID_WX_1.SceneID_WX.COLLECT)) {
            this._getColReward();
        }
        if (!GameMgr_1.default.Inst.isHadGetFloatingWindow() && hw_common_1.default.platform.ShowInBy(SceneID_WX_1.SceneID_WX.FLOATWIN)) {
            this._getFloatingWinReward();
        }
    };
    //获取收藏奖励
    ProcessMgr.prototype._getColReward = function () {
        ViewMgr_1.default.Inst.showWindowByQueue(WinGetReward_1.default, new WinGetReward_1.WinGetReward_Param(ECurrencyType_1.ECurrencyType.ENERGY, GameDef_1.default.COLLECTREWARDS_ENERGY_NUM, true, "", SceneID_WX_1.SceneID_WX.COLLECT));
    };
    //获取浮窗奖励
    ProcessMgr.prototype._getFloatingWinReward = function () {
        ViewMgr_1.default.Inst.showWindowByQueue(WinGetReward_1.default, new WinGetReward_1.WinGetReward_Param(ECurrencyType_1.ECurrencyType.ENERGY, GameDef_1.default.FLOATREWARDS_ENERGY_NUM, true, "", SceneID_WX_1.SceneID_WX.FLOATWIN));
    };
    ProcessMgr.prototype._onShowTryPlay = function () {
    };
    return ProcessMgr;
}());
exports.default = ProcessMgr;
},{"../../com/hw_common/hw_common":2,"../../com/hw_common/hw_common_def":3,"../../com/hw_utils/SceneID_WX":20,"../def/ECurrencyType":36,"../def/EventDef":40,"../def/GameDef":41,"../def/LoadDef":42,"../def/ReportDef":43,"../def/SoundDef":45,"../view/scenes/loading/SceneLoading":163,"../view/scenes/lobby/LobbyScene":164,"../view/windows/WinGetReward":173,"../view/windows/WinOfflineBox":178,"./ConfigMgr":23,"./LoadMgr":25,"./ViewMgr":28,"./event/EventMgr":29,"./game/GameMgr":31}],27:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
* 时间管理器
* 时间轮触发器
*/
var TimeMgr = /** @class */ (function () {
    function TimeMgr() {
        this._gameTime = 0;
        this._delta = 0;
        this._timeBindList = [];
        this.init();
    }
    Object.defineProperty(TimeMgr, "Inst", {
        get: function () {
            if (TimeMgr._INST == null) {
                TimeMgr._INST = new TimeMgr();
            }
            return TimeMgr._INST;
        },
        enumerable: true,
        configurable: true
    });
    TimeMgr.prototype.init = function () {
        Laya.timer.frameLoop(1, this, this.UpdateFrame);
    };
    Object.defineProperty(TimeMgr.prototype, "delta", {
        get: function () {
            return this._delta;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 每针更新一次
     * 每秒更新一次
     */
    TimeMgr.prototype.UpdateFrame = function () {
        this._fps++;
        this._gameTime += Laya.timer.delta;
        this._delta /= Laya.timer.delta;
        this.UpdateSecond();
        this.updateBind();
    };
    /**
     * 更新时间绑定事件
     */
    TimeMgr.prototype.updateBind = function () {
        var len = this._timeBindList.length;
        for (var i = len - 1; i >= 0; i--) {
            var tmp = this._timeBindList[i];
            if (tmp.WaitRemove) {
                this._timeBindList.splice(i, 1);
                continue;
            }
            var delay = this._gameTime;
            var dec = this._gameTime - tmp.StartTime;
            if (tmp.Delay <= 16 || dec >= tmp.Delay) {
                tmp.Func.apply(tmp.Target, [dec]);
                //预防在调用方法中移除了事件侦听导致报错
                if (tmp.WaitRemove) {
                    this._timeBindList.splice(i, 1);
                    continue;
                }
                if (tmp.Type == TimeBindType.Loop) {
                    tmp.StartTime = this._gameTime;
                }
                else if (tmp.Type == TimeBindType.Delay) {
                    this._timeBindList.splice(i, 1);
                    continue;
                }
            }
        }
    };
    /**
     * 每秒更新一次
     */
    TimeMgr.prototype.UpdateSecond = function () {
        if (this._fps < 60) {
            return;
        }
    };
    /**
     * 将事件绑定在时间轮中,定时执行
     * prior:优先级,决定执行先后顺序 0为优先级最低
     */
    TimeMgr.prototype.addTimeEvent = function (delay, type, callback, thisobj, prior) {
        if (thisobj === void 0) { thisobj = null; }
        if (prior === void 0) { prior = 0; }
        for (var _i = 0, _a = this._timeBindList; _i < _a.length; _i++) {
            var i = _a[_i];
            if (i.Target == thisobj && callback == i.Func) {
                trace("TimeMgr::addEvent->没有移除就添加了新的事件,覆盖以前老的事件更新");
                i.WaitRemove = false;
                i.Delay = delay;
                return;
            }
        }
        var tb = new TimeBind();
        tb.WaitRemove = false;
        tb.Delay = delay;
        tb.Func = callback;
        tb.Target = thisobj;
        tb.Type = type;
        tb.StartTime = this._gameTime;
        tb.Prior = prior;
        this._timeBindList.push(tb);
        this._timeBindList.sort(function (a, b) {
            if (a.Prior > b.Prior) {
                return 1;
            }
            else if (a.Prior < b.Prior) {
                return -1;
            }
            return 0;
        });
    };
    TimeMgr.prototype.removeTimeEvent = function (callback, thisobj) {
        var len = this._timeBindList.length;
        for (var i = len - 1; i >= 0; i--) {
            var tb = this._timeBindList[i];
            if (tb.Target == thisobj && callback == tb.Func) {
                tb.WaitRemove = true;
                ;
            }
        }
    };
    return TimeMgr;
}());
exports.default = TimeMgr;
var TimeBindType;
(function (TimeBindType) {
    TimeBindType[TimeBindType["Loop"] = 0] = "Loop";
    TimeBindType[TimeBindType["Delay"] = 1] = "Delay";
})(TimeBindType = exports.TimeBindType || (exports.TimeBindType = {}));
var TimeBind = /** @class */ (function () {
    function TimeBind() {
        this.WaitRemove = false;
        this.Type = 0; //0:Loop
    }
    return TimeBind;
}());
},{}],28:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LoadDef_1 = require("../def/LoadDef");
var gameBinder_1 = require("../view/fui/game/gameBinder");
var loadingBinder_1 = require("../view/fui/loading/loadingBinder");
var EventMgr_1 = require("./event/EventMgr");
var EventDef_1 = require("../def/EventDef");
var ViewMgr = /** @class */ (function () {
    function ViewMgr() {
        this._stage = null;
        this._winList = [];
        this._queueList = [];
        this._sceneList = [];
        this._bindPkgList = [];
    }
    Object.defineProperty(ViewMgr, "Inst", {
        get: function () {
            if (ViewMgr._INST == null) {
                ViewMgr._INST = new ViewMgr();
            }
            return ViewMgr._INST;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewMgr.prototype, "currentScene", {
        get: function () {
            return this._currentScene;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewMgr.prototype, "stage", {
        get: function () {
            return this._stage;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewMgr.prototype, "stageWidth", {
        get: function () {
            return this._stage.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewMgr.prototype, "stageHeight", {
        get: function () {
            return this._stage.height;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 是否已经绑定了包
     * @param pkgname
     */
    ViewMgr.prototype.pkgBinded = function (pkgname) {
        return this._bindPkgList.indexOf(pkgname) >= 0;
    };
    ViewMgr.prototype.setStage = function (s) {
        if (this._stage) {
            trace("[error]ViewMgr::Stage->舞台不可赋值两次");
            return;
        }
        this._stage = s;
    };
    ViewMgr.prototype.init = function () {
        this.setStage(Laya.stage);
        this.initFUI();
    };
    ViewMgr.prototype.initFUI = function () {
        fairygui.UIConfig.packageFileExtension = "obj";
        fairygui.UIConfig.defaultFont = "微软雅黑";
        fairygui.UIConfig.modalLayerColor = "rgba(0,0,0,0.9)";
        Laya.stage.addChild(fairygui.GRoot.inst.displayObject);
        fairygui.GRoot.inst.width = Laya.stage.width;
        fairygui.GRoot.inst.height = Laya.stage.height;
    };
    /**
     * 绑定fairgui的资源包,在使用某个资源包前一定要绑定该资源包
     * @param pkgname
     */
    ViewMgr.prototype.bindFUI = function (pkgname) {
        if (this._bindPkgList.indexOf(pkgname) >= 0) {
            return;
        }
        switch (pkgname) {
            case LoadDef_1.default.PkgName_Game:
                fairygui.UIPackage.addPackage(pkgname);
                gameBinder_1.default.bindAll();
                this._bindPkgList.push(pkgname);
                break;
            case LoadDef_1.default.PKGNAME_LOADING:
                fairygui.UIPackage.addPackage(pkgname);
                loadingBinder_1.default.bindAll();
                this._bindPkgList.push(pkgname);
                break;
            default:
                break;
        }
    };
    /**
     * 根据队列显示窗口,在队列中的窗口会按顺序依次显示
     * @param cls
     * @param param
     */
    ViewMgr.prototype.showWindowByQueue = function (cls, param) {
        if (param === void 0) { param = null; }
        if (this._queueList.length == 0) {
            this.showWindow(cls, param);
        }
        else {
            this._pushQueue(cls, param);
        }
    };
    ViewMgr.prototype._pushQueue = function (cls, param) {
        if (param === void 0) { param = null; }
        var wq = new WinQueue();
        wq.wincls = cls;
        wq.param = param;
        this._queueList.push(wq);
    };
    /**判断某窗口是否在队列中 */
    ViewMgr.prototype.isWindowInQueue = function (win) {
        for (var i = this._queueList.length - 1; i >= 0; i--) {
            var wq = this._queueList[i];
            if (win instanceof wq.wincls) {
                return true;
            }
        }
        return false;
    };
    /**隐藏窗口不显示 */
    ViewMgr.prototype.hideWindow = function (win) {
        var inquene = false;
        for (var i = 0; i < this._queueList.length; i++) {
            var wq = this._queueList[i];
            if (win instanceof wq.wincls) {
                inquene = true;
                this._queueList.splice(i, 1);
                break;
            }
        }
        if (inquene && this._queueList.length > 0) {
            this.showWindow(this._queueList[0].wincls, this._queueList[0].param);
        }
        EventMgr_1.default.Inst.event(EventDef_1.default.UI_HIDEWINDOW, win);
    };
    /**
     * 显示窗口
     * @param cls 窗口类
     * @param param 窗口显示需要的参数
     */
    ViewMgr.prototype.showWindow = function (cls, param) {
        if (param === void 0) { param = null; }
        for (var i = this._winList.length - 1; i >= 0; i--) {
            var win_1 = this._winList[i];
            if (win_1 instanceof cls) {
                this._winList.splice(i, 1);
                this._showWin(win_1, param);
                return;
            }
        }
        var win = new cls();
        this._showWin(win, param);
    };
    ViewMgr.prototype._showWin = function (win, param) {
        this._winList.push(win);
        win.show(param);
        EventMgr_1.default.Inst.event(EventDef_1.default.UI_SHOWWINDOW, win);
    };
    /**
     * 获取缓存的单例窗口
     * @param cls
     */
    ViewMgr.prototype.getWindow = function (cls) {
        for (var _i = 0, _a = this._winList; _i < _a.length; _i++) {
            var i = _a[_i];
            if (i instanceof cls) {
                return i;
            }
        }
        return null;
    };
    /**判断某窗口是否正在显示中 */
    ViewMgr.prototype.isWindowShow = function (cls) {
        for (var _i = 0, _a = this._winList; _i < _a.length; _i++) {
            var i = _a[_i];
            if (i instanceof cls) {
                return i.isShowing;
            }
        }
        return false;
    };
    /**
     * 显示场景
     * @param  {any} cls 类
     * @param  {any=null} param
     * @returns {view.SceneBase}
     */
    ViewMgr.prototype.showScene = function (cls, param) {
        if (param === void 0) { param = null; }
        if (this._currentScene instanceof cls) {
            trace("[error]ViewMgr::CreateScene->创建场景与当前场景相同");
            return;
        }
        if (this._currentScene) {
            this._currentScene.hide();
            this._currentScene = null;
        }
        for (var _i = 0, _a = this._sceneList; _i < _a.length; _i++) {
            var i = _a[_i];
            if (i instanceof cls) {
                i.show(param);
                this._currentScene = i;
                return i;
            }
        }
        this._currentScene = new cls();
        this._currentScene.init();
        this._currentScene.show(param);
        this._sceneList.push(this._currentScene);
        return this._currentScene;
    };
    /**
     * 获取缓存的单例场景
     * @param cls
     */
    ViewMgr.prototype.getScene = function (cls) {
        for (var _i = 0, _a = this._sceneList; _i < _a.length; _i++) {
            var i = _a[_i];
            if (i instanceof cls) {
                return i;
            }
        }
        return null;
    };
    /**添加游戏版本号 */
    ViewMgr.prototype.addVersionLabel = function (str) {
        if (str === void 0) { str = ""; }
        if (this._versiontxt == null) {
            this._versiontxt = new Laya.Text();
            this._versiontxt.color = "666666";
            this._versiontxt.fontSize = 20;
            this._versiontxt.bold = true;
        }
        this._versiontxt.text = platform.version + ":" + str;
        ViewMgr.Inst.stage.addChild(this._versiontxt);
        this._versiontxt.x = ViewMgr.Inst.stageWidth - this._versiontxt.width;
    };
    return ViewMgr;
}());
exports.default = ViewMgr;
var WinQueue = /** @class */ (function () {
    function WinQueue() {
    }
    return WinQueue;
}());
},{"../def/EventDef":40,"../def/LoadDef":42,"../view/fui/game/gameBinder":104,"../view/fui/loading/loadingBinder":152,"./event/EventMgr":29}],29:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var EventMgr = /** @class */ (function (_super) {
    __extends(EventMgr, _super);
    function EventMgr() {
        return _super.call(this) || this;
    }
    Object.defineProperty(EventMgr, "Inst", {
        get: function () {
            if (EventMgr._INST == null) {
                EventMgr._INST = new EventMgr();
            }
            return EventMgr._INST;
        },
        enumerable: true,
        configurable: true
    });
    return EventMgr;
}(laya.events.EventDispatcher));
exports.default = EventMgr;
},{}],30:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameMgr_1 = require("./GameMgr");
var hw_common_1 = require("../../../com/hw_common/hw_common");
var hw_common_def_1 = require("../../../com/hw_common/hw_common_def");
var ECurrencyType_1 = require("../../def/ECurrencyType");
/*
* name;
*/
var GMMgr = /** @class */ (function () {
    function GMMgr() {
    }
    Object.defineProperty(GMMgr, "Inst", {
        get: function () {
            if (GMMgr._INST == null) {
                GMMgr._INST = new GMMgr();
            }
            return GMMgr._INST;
        },
        enumerable: true,
        configurable: true
    });
    GMMgr.prototype.init = function () {
        if (!hw_common_1.default.config.platformConfig || !hw_common_1.default.mpsdk.openid) {
            hw_common_1.default.event.on(hw_common_def_1.default.EVT_MPSDK_PLATFORMCONFIG_OK, this, this._checkShow);
            hw_common_1.default.event.on(hw_common_def_1.default.EVT_MPSDK_ACCOUNT_OK, this, this._checkShow);
        }
        else {
            this._checkShow();
        }
    };
    GMMgr.prototype._checkShow = function () {
        if (!hw_common_1.default.config.platformConfig || !hw_common_1.default.mpsdk.openid) {
            return;
        }
        if (hw_common_1.default.config.gm_open) {
            this._show();
        }
    };
    GMMgr.prototype._show = function () {
        var tx = new Laya.Input();
        tx.x = tx.y = 0;
        tx.width = Laya.stage.width;
        tx.bgColor = "#ffffff";
        tx.color = "#000000";
        tx.align = "center";
        tx.fontSize = 30;
        this._txt = tx;
        Laya.stage.addChild(tx);
        tx.zOrder = 9999;
        var sp = new Laya.Sprite();
        sp.graphics.drawRect(0, 0, 100, 30, "#ff0000");
        Laya.stage.addChild(sp);
        sp.width = 100;
        sp.height = 30;
        sp.x = 0;
        sp.y = tx.height;
        sp.on(Laya.Event.CLICK, this, this.onEnter);
        sp.zOrder = 999;
    };
    /**
     * lv 关卡id//修改当前关卡id
     */
    GMMgr.prototype.onEnter = function (e) {
        trace("输入gm命令");
        var str = this._txt.text.split(" ");
        var key = str[0].toLocaleLowerCase();
        var value = str[1];
        this._txt.text = "";
        switch (key) {
            case "lv":
                GameMgr_1.default.Inst.data.levelData.level = +value;
                GameMgr_1.default.Inst.levelConfig = null;
                break;
            case "tl":
                GameMgr_1.default.Inst.addCurrency(ECurrencyType_1.ECurrencyType.ENERGY, +value);
                break;
            default:
                break;
        }
    };
    return GMMgr;
}());
exports.GMMgr = GMMgr;
},{"../../../com/hw_common/hw_common":2,"../../../com/hw_common/hw_common_def":3,"../../def/ECurrencyType":36,"./GameMgr":31}],31:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameDataVO_1 = require("../../model/datavo/GameDataVO");
var TimeMgr_1 = require("../TimeMgr");
var DataMgr_1 = require("../DataMgr");
var DataDef_1 = require("../../def/DataDef");
var EDataType_1 = require("../../def/EDataType");
var hw_common_1 = require("../../../com/hw_common/hw_common");
var GameDef_1 = require("../../def/GameDef");
var ECurrencyType_1 = require("../../def/ECurrencyType");
var EventDef_1 = require("../../def/EventDef");
var EventMgr_1 = require("../event/EventMgr");
var LevelDataVO_1 = require("../../model/datavo/LevelDataVO");
var CurrencyDataVO_1 = require("../../model/datavo/CurrencyDataVO");
var ViewMgr_1 = require("../ViewMgr");
var GameWinScene_1 = require("../../view/scenes/gameover/GameWinScene");
var ConfigMgr_1 = require("../ConfigMgr");
var ConfigDef_1 = require("../../def/ConfigDef");
var LoadMgr_1 = require("../LoadMgr");
var GameScene_1 = require("../../view/scenes/game/GameScene");
var WinEnergyOver_1 = require("../../view/windows/WinEnergyOver");
var TimeUtils_1 = require("../../../com/hw_utils/TimeUtils");
var com_level_stars_1 = require("../../view/fui/game/com_level_stars");
var ShellScene_1 = require("../../view/scenes/shell/ShellScene");
var WinCollectionGame_1 = require("../../view/windows/WinCollectionGame");
var OtherDataVO_1 = require("../../model/datavo/OtherDataVO");
var WinAddFloat_1 = require("../../view/windows/WinAddFloat");
var WinServiceEnergy_1 = require("../../view/windows/WinServiceEnergy");
var WinMustShare_1 = require("../../view/windows/WinMustShare");
var EFuncOpenID_1 = require("../../def/EFuncOpenID");
var LobbyScene_1 = require("../../view/scenes/lobby/LobbyScene");
/**
 * 游戏控制器
 */
var GameMgr = /** @class */ (function () {
    function GameMgr() {
        this._passlevelRefreshBanner = 0; //本次上线通关次数;
        this._levelLoading = false;
    }
    Object.defineProperty(GameMgr.prototype, "levelConfig", {
        get: function () {
            return this._levelconfig;
        },
        set: function (conf) {
            this._levelconfig = conf;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameMgr.prototype, "passlevelRefreshBanner", {
        get: function () {
            return this._passlevelRefreshBanner;
        },
        set: function (v) {
            this._passlevelRefreshBanner = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameMgr.prototype, "level", {
        get: function () {
            if (!this._data || !this._data.levelData)
                return 0;
            return this._data.levelData.level;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameMgr.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameMgr, "Inst", {
        get: function () {
            if (GameMgr._INST == null) {
                GameMgr._INST = new GameMgr();
            }
            return GameMgr._INST;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 游戏管理器
     * @param serverdata 同步服务器的数据
     */
    GameMgr.prototype.init = function (serverdata) {
        this._setServerData(serverdata);
        this._setNullData();
        TimeMgr_1.default.Inst.addTimeEvent(1000, TimeMgr_1.TimeBindType.Loop, this._updateEnergy, this);
    };
    GameMgr.prototype._onPlatformShow = function (sceneid) {
    };
    GameMgr.prototype._setNullData = function () {
        if (this._data == null) {
            var data = DataMgr_1.default.Inst.getDataByKey(DataDef_1.DataDef.GAMEDATA, EDataType_1.EDataType.Any);
            if (data == null) {
                data = this.createNewData();
            }
            this._checkData(data);
            this._data = data;
        }
    };
    GameMgr.prototype._setServerData = function (data) {
        if (data == null)
            return;
        this._checkData(data);
        this._data = data;
        this.SaveData();
    };
    GameMgr.prototype._updateEnergy = function () {
        var nowtime = hw_common_1.default.servertime.now;
        if (this.data.currency.energy >= GameDef_1.default.ENERGYMAX) {
            this.data.energyStartTime = 0;
            return;
        }
        if (!this.data.energyStartTime)
            this.data.energyStartTime = nowtime;
        var starttime = this.data.energyStartTime;
        var passtime = nowtime - starttime;
        var energycnt = Math.floor(passtime / GameDef_1.default.ENERGYRECOVERTIME);
        var onepass = passtime % GameDef_1.default.ENERGYRECOVERTIME;
        if (this.data.currency.energy + energycnt >= GameDef_1.default.ENERGYMAX) {
            energycnt = GameDef_1.default.ENERGYMAX - this.data.currency.energy;
        }
        if (energycnt > 0) {
            GameMgr.Inst.addCurrency(ECurrencyType_1.ECurrencyType.ENERGY, energycnt);
            this.data.energyStartTime = nowtime - onepass;
            GameMgr.Inst.SaveData();
            if (this.data.currency.energy >= GameDef_1.default.ENERGYMAX) {
                this.data.energyStartTime = 0;
            }
        }
    };
    GameMgr.prototype.getNextEnergyTime = function () {
        if (!this.data.energyStartTime)
            return 0;
        var nowtime = hw_common_1.default.servertime.now;
        var begintime = nowtime - this.data.energyStartTime;
        var hastime = GameDef_1.default.ENERGYRECOVERTIME - begintime;
        return hastime;
    };
    /**
     * 增加资源数值,负值为消耗
     * @param type
     * @param num
     */
    GameMgr.prototype.addCurrency = function (type, num) {
        switch (type) {
            case ECurrencyType_1.ECurrencyType.GOLD:
                this.data.currency.gold += num;
                this.data.currency.gold < 0 && (this.data.currency.gold = 0);
                EventMgr_1.default.Inst.event(EventDef_1.default.GAME_CURRENCYCHANGE, type + "");
                break;
            case ECurrencyType_1.ECurrencyType.ENERGY:
                this.data.currency.energy += num;
                this.data.currency.energy < 0 && (this.data.currency.energy = 0);
                EventMgr_1.default.Inst.event(EventDef_1.default.GAME_CURRENCYCHANGE, type + "");
                break;
            case ECurrencyType_1.ECurrencyType.LUCKNUM:
                this.data.currency.luck_num += num;
                this.data.currency.luck_num < 0 && (this.data.currency.luck_num = 0);
                EventMgr_1.default.Inst.event(EventDef_1.default.LUCK_NUMCHANGE, type + "");
                break;
            case ECurrencyType_1.ECurrencyType.NEXTMORE:
                this.data.currency.nextmore = num;
                this.data.currency.nextmore < 0 && (this.data.currency.nextmore = 0);
                break;
            default:
                break;
        }
        this.SaveData();
    };
    //数据修正,防止新老数据不兼容
    GameMgr.prototype._checkData = function (data) {
        if (data.levelData == null) {
            var leveldata = new LevelDataVO_1.default();
            leveldata.level = 1;
            data.levelData = leveldata;
        }
        if (data.currency == null) {
            var currencydata = new CurrencyDataVO_1.default();
            currencydata.gold = 0;
            currencydata.energy = GameDef_1.default.ENERGYMAX;
            currencydata.luck_num = 0;
            data.currency = currencydata;
        }
        if (data.currency.energy == undefined) {
            data.currency.energy = GameDef_1.default.ENERGYMAX;
        }
        if (data.guideOverList == null) {
            data.guideOverList = [];
        }
        if (data.energyStartTime == null) {
            data.energyStartTime = hw_common_1.default.servertime.now;
        }
        if (data.other == null) {
            data.other = new OtherDataVO_1.default();
            data.other.showmustshare = 0;
        }
        if (!data.other.gotofflinetm)
            data.other.gotofflinetm = 0;
        if (data.savetime == null) {
            data.savetime = hw_common_1.default.servertime.now;
        }
        if (data.version != platform.version) {
            trace("GameMgr::checkData->版本更新,重置题库", data.version, platform.version);
            data.version = platform.version;
        }
    };
    //创建新玩家数据
    GameMgr.prototype.createNewData = function () {
        var data = new GameDataVO_1.default();
        var leveldata = new LevelDataVO_1.default();
        leveldata.level = 1;
        var currencydata = new CurrencyDataVO_1.default();
        currencydata.gold = 0;
        currencydata.energy = GameDef_1.default.ENERGYMAX;
        currencydata.luck_num = 0;
        var otherdata = new OtherDataVO_1.default();
        otherdata.hadGetCsReward = false;
        otherdata.hadGetFloatingWindow = false;
        otherdata.hadGetColReward = false;
        otherdata.hasGetDaliyColReward = null;
        otherdata.showmustshare = 0;
        otherdata.gotofflinetm = 0;
        data.levelData = leveldata;
        data.guideOverList = [];
        data.currency = currencydata;
        data.energyStartTime = hw_common_1.default.servertime.now;
        data.savetime = hw_common_1.default.servertime.now;
        data.other = otherdata;
        return data;
    };
    GameMgr.prototype.PassLevel = function () {
        var _this = this;
        this._data.levelData.level++;
        this._passlevelRefreshBanner++;
        this._levelconfig = null;
        this.SaveData();
        hw_common_1.default.serverdata.sendDataToServer(this._data);
        hw_common_1.default.platform.setUserCloudStorage([{ key: DataDef_1.DataDef.CloudStorage_BestScore, value: this._data.levelData.level + "" }]);
        ViewMgr_1.default.Inst.showScene(GameWinScene_1.default);
        //上传排行榜
        if (hw_common_1.default.platform.userInfo) {
            var obj = {};
            obj.avatarUrl = hw_common_1.default.platform.userInfo.avatarUrl;
            obj.nickName = hw_common_1.default.platform.userInfo.nickName;
            var str = encodeURIComponent(JSON.stringify(obj));
            mpsdk.SNS.rankUpload(DataDef_1.DataDef.CloudStorage_BestScore, this._data.levelData.level + "", str);
        }
        //预加载下一关
        this.LoadLevel(function () {
            _this.loadLevelAsset(_this._levelconfig); //顺便加载图片
        });
        if (this.level == GameDef_1.default.CCSFJUMPLEVEL) {
            // this.CCSFJump();
        }
    };
    GameMgr.prototype.CCSFJump = function () {
        if (!GameMgr.Inst.getHasGetDailyColReward()) {
            ViewMgr_1.default.Inst.showWindow(WinCollectionGame_1.default);
            return;
        }
        if (!GameMgr.Inst.isHadGetCSRewards()) {
            ViewMgr_1.default.Inst.showWindow(WinServiceEnergy_1.default);
            return;
        }
        if (!GameMgr.Inst.isHadGetFloatingWindow()) {
            ViewMgr_1.default.Inst.showWindow(WinAddFloat_1.default);
            return;
        }
    };
    GameMgr.prototype.LoadLevel = function (sucess, error) {
        var _this = this;
        if (sucess === void 0) { sucess = null; }
        if (error === void 0) { error = null; }
        var localconf = this._levelconfig;
        if (localconf) {
            if (sucess)
                sucess();
            return;
        }
        var conf = ConfigMgr_1.default.Inst.GetVOByNameAndID(ConfigDef_1.default.LevelData, this._data.levelData.level);
        if (conf) {
            this._levelconfig = conf;
            if (sucess)
                sucess();
            return;
        }
        if (!hw_common_1.default.platform.netConnect) {
            if (error)
                error({ error: 1004 });
            return;
        }
        hw_common_1.default.serverdata.loadQuiz(this.level).then(function (res) {
            _this._levelconfig = res;
            if (sucess)
                sucess();
        }).catch(function (err) {
            if (error)
                error(err);
        });
    };
    GameMgr.prototype.loadLevelAsset = function (conf, sucess, fail) {
        var _this = this;
        var urllist = LoadMgr_1.default.Inst.getLevelImage(conf);
        var img1 = urllist[0];
        var img2 = urllist[1];
        var loadcnt = 0;
        var checkfun = function () {
            if (loadcnt == 2) {
                if (sucess)
                    sucess();
            }
        };
        var loadfun = function (imageurl) {
            if (!Laya.loader.getRes(imageurl)) {
                if (!hw_common_1.default.platform.netConnect) {
                    if (fail)
                        fail();
                    fail = null;
                    return;
                }
                Laya.loader.load(imageurl, Laya.Handler.create(_this, function (res) {
                    if (res) {
                        loadcnt++;
                        checkfun();
                    }
                    else {
                        if (fail)
                            fail();
                        fail = null;
                        return;
                    }
                }), null, Laya.Loader.IMAGE, 0, true);
            }
            else {
                loadcnt++;
            }
        };
        loadfun(img1);
        loadfun(img2);
        checkfun();
    };
    GameMgr.prototype.SaveData = function () {
        this._data.savetime = hw_common_1.default.servertime.now;
        DataMgr_1.default.Inst.setDataByKey(DataDef_1.DataDef.GAMEDATA, this._data, EDataType_1.EDataType.Any);
    };
    GameMgr.prototype.goGame = function (aniFun) {
        var _this = this;
        if (aniFun === void 0) { aniFun = null; }
        if (!hw_common_1.default.config.safe && platform.debug == false) {
            ViewMgr_1.default.Inst.showScene(ShellScene_1.ShellScene);
            return;
        }
        if (hw_common_1.default.config.getGameFuncOpen(EFuncOpenID_1.EFuncOpenID.MUSTSHARE) &&
            this.level > 1 &&
            (this.level) % GameDef_1.default.MUSTSHARELEVEL == 1 &&
            this.data.other.showmustshare != this.level &&
            ViewMgr_1.default.Inst.isWindowShow(WinMustShare_1.WinMustShare) == false) {
            ViewMgr_1.default.Inst.showWindow(WinMustShare_1.WinMustShare);
            return;
        }
        if (this._levelLoading)
            return;
        hw_common_1.default.platform.showLoading("加载中");
        this._levelLoading = true;
        this.LoadLevel(function () {
            var config = _this._levelconfig;
            _this.loadLevelAsset(config, function () {
                if (_this.data.currency.energy > 0) {
                    GameMgr.Inst.addCurrency(ECurrencyType_1.ECurrencyType.ENERGY, -1);
                    GameMgr.Inst.SaveData();
                    if (aniFun) {
                        aniFun().then(function (res) {
                            hw_common_1.default.platform.hideLoading();
                            _this._levelLoading = false;
                            ViewMgr_1.default.Inst.showScene(GameScene_1.default);
                        });
                        return;
                    }
                    else {
                        hw_common_1.default.platform.hideLoading();
                        _this._levelLoading = false;
                        ViewMgr_1.default.Inst.showScene(GameScene_1.default);
                        return;
                    }
                }
                else {
                    hw_common_1.default.platform.hideLoading();
                    _this._levelLoading = false;
                    ViewMgr_1.default.Inst.showWindow(WinEnergyOver_1.WinEnergyOver);
                }
            }, function () {
                hw_common_1.default.platform.hideLoading();
                _this._levelLoading = false;
                hw_common_1.default.platform.showModal("网络不稳定,请检查网络稍后再试,按确定按钮重新连接,按取消按钮返回主页", function () {
                    _this.goGame(aniFun);
                }, true, "确定", "取消", function () {
                    ViewMgr_1.default.Inst.showScene(LobbyScene_1.default);
                    return;
                });
            });
        }, function (err) {
            hw_common_1.default.platform.hideLoading();
            _this._levelLoading = false;
            var str;
            if (err && err.error == 1001) {
                str = ("账号登陆失败,请重新登陆~");
            }
            else if (err && err.error == 1003) {
                err = ("后续关卡正在加急制作中，请稍后~");
            }
            else if (err && err.error == 1002) {
                str = ("未知错误,请重新登陆~");
            }
            else if (err && err.error == 1004) {
                str = ("题库获取失败,请检查网络连接~");
            }
            hw_common_1.default.platform.showModal(str, function () {
                _this.goGame(aniFun);
            }, true, "确定", "取消", function () {
                ViewMgr_1.default.Inst.showScene(LobbyScene_1.default);
                return;
            });
        });
    };
    GameMgr.prototype.getAchievementData = function () {
        var level = GameMgr.Inst.level;
        var dataList = ConfigMgr_1.default.Inst.GetConfigByName(ConfigDef_1.default.Achievement);
        var nowLevelData;
        var index;
        for (var i = 0; i < dataList.length; i++) {
            if (i == dataList.length - 1) {
                nowLevelData = dataList[dataList.length - 1];
                index = dataList.length - 1;
            }
            else {
                if (dataList[i].throughLevel >= level) {
                    nowLevelData = dataList[i];
                    index = i;
                    break;
                }
            }
        }
        return { index: index, data: nowLevelData };
    };
    /**
     * 是否曾经领取过浮窗奖励
     */
    GameMgr.prototype.isHadGetFloatingWindow = function () {
        return this._data.other && this._data.other.hadGetFloatingWindow;
    };
    /**
     * 是否曾经领取过客服奖励
     */
    GameMgr.prototype.isHadGetCSRewards = function () {
        return this._data.other && this._data.other.hadGetCsReward;
    };
    GameMgr.prototype.setHadGetReward = function (type, bool) {
        if (!this._data.other) {
            this._data.other = new OtherDataVO_1.default;
        }
        switch (type) {
            case 'floatWindow':
                this._data.other.hadGetFloatingWindow = bool;
                break;
            case 'addMyGame':
                this.saveHasGetDailyColReward();
                break;
            default:
                console.log('都没有');
                break;
        }
        this.SaveData();
    };
    /**
     * 获取当天是否已经领取收藏奖励
     */
    GameMgr.prototype.getHasGetDailyColReward = function () {
        var DailyCount = this._data.other && this._data.other.hasGetDaliyColReward ? this._data.other.hasGetDaliyColReward : '';
        var nowTime = +new Date();
        if (DailyCount == null || DailyCount == "") {
            return false;
        }
        var d1 = DailyCount.split(":");
        var last = +d1[0];
        var count = +d1[1];
        return TimeUtils_1.default.IsSameDay(last, nowTime) && count > 0;
    };
    /**
    * 存每日领取收藏小游戏奖励
    */
    GameMgr.prototype.saveHasGetDailyColReward = function () {
        var DailyCount = this._data.other && this._data.other.hasGetDaliyColReward ? this._data.other.hasGetDaliyColReward : '';
        var newData = "";
        var nowTime = +new Date;
        if (DailyCount == null || DailyCount == "") {
            newData = nowTime + ":" + "1";
        }
        else {
            var d1 = DailyCount.split(":");
            var last = +d1[0];
            var count = +d1[1];
            if (TimeUtils_1.default.IsSameDay(last, nowTime)) {
                if (count > 0) {
                    count++;
                }
                else {
                    count = 1;
                }
                newData = nowTime + ":" + count;
            }
            else {
                newData = nowTime + ":" + "1";
            }
        }
        this._data.other.hasGetDaliyColReward = newData;
    };
    /**
     * 是否曾经领取过收藏奖励
     */
    GameMgr.prototype.IsHadGetColReward = function () {
        return this._data.other && this._data.other.hadGetColReward;
    };
    GameMgr.prototype.updateLevelComponent = function (component) {
        var nowAchievementLevel = GameMgr.Inst.getAchievementData();
        var levelDifference = nowAchievementLevel.data.throughLevel - GameMgr.Inst.level;
        var throughNum = nowAchievementLevel.data.starNum * nowAchievementLevel.data.leveladdstar;
        var nextGrading = Math.floor(levelDifference / throughNum);
        var nowGrading = nextGrading + 1;
        var nextTitle = nowAchievementLevel.data.name;
        if (nextGrading == 0 && nowAchievementLevel.index < ConfigMgr_1.default.Inst.GetConfigByName(ConfigDef_1.default.Achievement).length - 1) {
            var nextAchievementData = ConfigMgr_1.default.Inst.GetConfigByName(ConfigDef_1.default.Achievement)[nowAchievementLevel.index + 1];
            nextGrading = nextAchievementData.gradingNum;
            nextTitle = nextAchievementData.name;
        }
        console.log('当前段位：', nowAchievementLevel.data.name + nowGrading);
        component.n11.text = "\u8FD8\u5DEE" + (levelDifference % throughNum + 1) + "\u5173\u664B\u7EA7" + nextTitle + nextGrading;
        component.icon_img.url = platform.cdnURL + "achievementimage/" + nowAchievementLevel.data.icon + ".png";
        component.levelname_img.url = platform.cdnURL + "achievementimage/" + nowAchievementLevel.data.levelname + ".png";
        component.levelname_level.url = platform.cdnURL + "achievementimage/no" + nowGrading + ".png";
        component.stars_group.removeChildren();
        var interval = 8;
        var lastAchievementLevelThroughLevel = nowAchievementLevel.index > 0 ? ConfigMgr_1.default.Inst.GetConfigByName(ConfigDef_1.default.Achievement)[nowAchievementLevel.index - 1].throughLevel : 0;
        for (var i = 0; i < nowAchievementLevel.data.starNum; i++) {
            var starsItem = com_level_stars_1.default.createInstance();
            var startX = (component.stars_group.width - (interval * (nowAchievementLevel.data.starNum - 1) + nowAchievementLevel.data.starNum * starsItem.width)) / 2;
            starsItem.x = startX + i * (interval + starsItem.width);
            starsItem.state.selectedIndex = Math.floor((this.level - lastAchievementLevelThroughLevel - 1) % (nowAchievementLevel.data.starNum * nowAchievementLevel.data.leveladdstar) / nowAchievementLevel.data.leveladdstar) > i ? 1 : 0;
            component.stars_group.addChild(starsItem);
        }
    };
    return GameMgr;
}());
exports.default = GameMgr;
},{"../../../com/hw_common/hw_common":2,"../../../com/hw_utils/TimeUtils":21,"../../def/ConfigDef":34,"../../def/DataDef":35,"../../def/ECurrencyType":36,"../../def/EDataType":37,"../../def/EFuncOpenID":38,"../../def/EventDef":40,"../../def/GameDef":41,"../../model/datavo/CurrencyDataVO":49,"../../model/datavo/GameDataVO":50,"../../model/datavo/LevelDataVO":51,"../../model/datavo/OtherDataVO":52,"../../view/fui/game/com_level_stars":98,"../../view/scenes/game/GameScene":160,"../../view/scenes/gameover/GameWinScene":162,"../../view/scenes/lobby/LobbyScene":164,"../../view/scenes/shell/ShellScene":165,"../../view/windows/WinAddFloat":167,"../../view/windows/WinCollectionGame":168,"../../view/windows/WinEnergyOver":169,"../../view/windows/WinMustShare":177,"../../view/windows/WinServiceEnergy":182,"../ConfigMgr":23,"../DataMgr":24,"../LoadMgr":25,"../TimeMgr":27,"../ViewMgr":28,"../event/EventMgr":29}],32:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var guidefinger_1 = require("../../view/fui/game/guidefinger");
var GameMgr_1 = require("./GameMgr");
/**
* created by yahu
*
*/
var GuideMgr = /** @class */ (function () {
    /**
    * 构造函数
    */
    function GuideMgr() {
    }
    Object.defineProperty(GuideMgr.prototype, "CurrentGuide", {
        get: function () {
            return this._currentGuide;
        },
        set: function (id) {
            this._currentGuide = id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GuideMgr.prototype, "GuideFinger", {
        get: function () {
            if (this._guidefinger == null) {
                this._guidefinger = guidefinger_1.default.createInstance();
            }
            return this._guidefinger;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GuideMgr.prototype, "Guiding", {
        get: function () {
            if (this._guidefinger && this._guidefinger.parent) {
                return true;
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GuideMgr, "Inst", {
        get: function () {
            if (GuideMgr._INST == null) {
                GuideMgr._INST = new GuideMgr();
            }
            return GuideMgr._INST;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 从列表中按照顺序找到没有做过的引导返回,
     * @param list
     */
    GuideMgr.prototype.GuideShowByList = function (list) {
        for (var i = 0; i < list.length; i++) {
            if (this.GuideShowById(list[i])) {
                return list[i];
            }
        }
        return null;
    };
    /**
     * 是否显示这个引导
     * 判断依据为这个引导有没有做过
     * @param guideid
     */
    GuideMgr.prototype.GuideShowById = function (guideid) {
        var guideoverlist = GameMgr_1.default.Inst.data.guideOverList;
        if (guideoverlist.indexOf(guideid) >= 0) {
            return false;
        }
        return true;
    };
    /**
     * 从一个列表中找到当前正在显示中的引导id,并关闭保存它
     * 当前正在显示的引导必须提前设置
     * @param list
     */
    GuideMgr.prototype.GuideOverList = function (list) {
        if (list == null || list.length < 1) {
            return;
        }
        for (var i = 0; i < list.length; i++) {
            if (this._currentGuide == list[i]) {
                this.GuideOver(list[i]);
            }
        }
    };
    /**
     * 结束一个引导并保存
     * @param guideid
     */
    GuideMgr.prototype.GuideOver = function (guideid) {
        this.GuideFinger.removeFromParent();
        var guideoverlist = GameMgr_1.default.Inst.data.guideOverList;
        if (guideoverlist.indexOf(guideid) >= 0) {
            trace("[error]GuideMgr::GuideOver->不能保存一个已经做完的引导");
            return;
        }
        guideoverlist.push(guideid);
        GameMgr_1.default.Inst.SaveData();
    };
    return GuideMgr;
}());
exports.default = GuideMgr;
},{"../../view/fui/game/guidefinger":114,"./GameMgr":31}],33:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataDef_1 = require("../../def/DataDef");
var TimeUtils_1 = require("../../../com/hw_utils/TimeUtils");
/**
 * 红点管理
 */
var RedPointMgr = /** @class */ (function () {
    function RedPointMgr() {
    }
    Object.defineProperty(RedPointMgr, "Inst", {
        get: function () {
            if (RedPointMgr._INST == null) {
                RedPointMgr._INST = new RedPointMgr();
            }
            return RedPointMgr._INST;
        },
        enumerable: true,
        configurable: true
    });
    RedPointMgr.prototype.CheckMainUpRedPoint = function () {
        // if (PlayerMgr.Inst.canAddWife == true || PlayerMgr.Inst.canUpPlayer == true || PlayerMgr.Inst.canUpHouse == true) {
        //     return true;
        // }
        return false;
    };
    // 获取红点数据
    RedPointMgr.prototype.getRedPointData = function () {
        return JSON.parse(Laya.LocalStorage.getItem(DataDef_1.DataDef.REDPOINTDATA) || '{}');
    };
    // 判断按钮是否有红点
    RedPointMgr.prototype.judeFloatWinRedPoint = function (type) {
        var redPointDatas1 = this.getRedPointData();
        var data = redPointDatas1[type] || null;
        console.log('是否是同一天：', TimeUtils_1.default.IsSameDay(data, +new Date()));
        return data && TimeUtils_1.default.IsSameDay(data, +new Date());
    };
    // 保存点击红点数据
    RedPointMgr.prototype.saveRedPoint = function (type) {
        var redPointData = this.getRedPointData() || {};
        redPointData[type] = +new Date();
        Laya.LocalStorage.setItem(DataDef_1.DataDef.REDPOINTDATA, JSON.stringify(redPointData));
    };
    return RedPointMgr;
}());
exports.default = RedPointMgr;
var RedPointType;
(function (RedPointType) {
    RedPointType[RedPointType["floatWindow"] = 0] = "floatWindow";
    RedPointType[RedPointType["service"] = 1] = "service";
    RedPointType[RedPointType["addMyGame"] = 2] = "addMyGame";
})(RedPointType = exports.RedPointType || (exports.RedPointType = {}));
},{"../../../com/hw_utils/TimeUtils":21,"../../def/DataDef":35}],34:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ConfigDef = /** @class */ (function () {
    function ConfigDef() {
    }
    ConfigDef.LevelData = "LevelClient_Data.json"; //关卡数据表
    ConfigDef.LevelGift = "levelgift_Sheet1.json"; //关卡奖励
    ConfigDef.Achievement = 'achievement_Sheet1.json'; //成就等级
    return ConfigDef;
}());
exports.default = ConfigDef;
},{}],35:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DataDef = /** @class */ (function () {
    function DataDef() {
    }
    DataDef.SaveVersion = "SaveVersion";
    DataDef.GAMEDATA = "GAMEDATA";
    DataDef.TODAYPASSLEVELCNT = "TODAYPASSLEVELCNT"; //当天通关数
    DataDef.CloudStorage_BestScore = "CloudStorage_BestScore";
    DataDef.CloudStorage_CompTime = "CloudStorage_CompTime";
    DataDef.CloudStorage_BestPVPScore = "CloudStorage_BestPVPScore";
    DataDef.Date_UnfamiliarWordList = "Date_UnfamiliarWordList";
    DataDef.REDPOINTDATA = 'redPointData';
    return DataDef;
}());
exports.DataDef = DataDef;
},{}],36:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
  * 数据存储类型
  */
var ECurrencyType;
(function (ECurrencyType) {
    ECurrencyType[ECurrencyType["GOLD"] = 0] = "GOLD";
    ECurrencyType[ECurrencyType["ENERGY"] = 1] = "ENERGY";
    ECurrencyType[ECurrencyType["LUCKNUM"] = 2] = "LUCKNUM";
    ECurrencyType[ECurrencyType["NEXTMORE"] = 3] = "NEXTMORE";
})(ECurrencyType = exports.ECurrencyType || (exports.ECurrencyType = {}));
},{}],37:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
  * 数据存储类型
  */
var EDataType;
(function (EDataType) {
    EDataType[EDataType["Number"] = 0] = "Number";
    EDataType[EDataType["String"] = 1] = "String";
    EDataType[EDataType["Any"] = 2] = "Any";
})(EDataType = exports.EDataType || (exports.EDataType = {}));
},{}],38:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
* 功能开启id
*/
var EFuncOpenID;
(function (EFuncOpenID) {
    EFuncOpenID[EFuncOpenID["MUSTSHARE"] = 101] = "MUSTSHARE"; //每过N关必须分享才能解锁
})(EFuncOpenID = exports.EFuncOpenID || (exports.EFuncOpenID = {}));
},{}],39:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 引导id
 */
var EGuideID;
(function (EGuideID) {
    EGuideID[EGuideID["GameLevel1"] = 0] = "GameLevel1";
})(EGuideID = exports.EGuideID || (exports.EGuideID = {}));
},{}],40:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventDef = /** @class */ (function () {
    function EventDef() {
    }
    //加载事件
    EventDef.RES_LOADINGOVER = "RES_LOADINGOVER"; //加载loading结束
    EventDef.RES_GAMEOVER = "RES_GAMEOVER"; //加载game结束
    EventDef.NET_DATAOK = "NET_DATAOK"; //数据同步成功
    EventDef.PLATFORMCONFIGOVER = "PlatformConfigOver"; //配置拿到了.
    //环境事件
    EventDef.ENV_BADFRAME = "ENV_BADFRAME"; //帧频较差
    //UI事件
    EventDef.UI_SHOWWINDOW = "UI_SHOWWINDOW"; //窗口显示 param:窗口
    EventDef.UI_HIDEWINDOW = "UI_HIDEWINDOW"; //窗口关闭 param:窗
    EventDef.UI_WINFAILVIDEOOK = "UI_WINFAILVIDEOOK"; //游戏失败看视频成功
    EventDef.UI_WINFAILRESTART = "UI_WINFAILRESTART"; //游戏失败重新开始
    //游戏事件
    EventDef.GAME_CURRENCYCHANGE = "GAME_CURRENCYCHANGE"; //货币资源数值更改
    EventDef.GAME_GETREWARDCOLLECTION = "GAME_GETREWARDCOLLECTION"; //获得收藏奖励
    EventDef.GAME_GETREWARDCS = "GAME_GETREWARDCS"; //获得客服奖励
    EventDef.LUCK_NUMCHANGE = 'LUCK_NUMCHANGE'; //抽獎次數改變
    return EventDef;
}());
exports.default = EventDef;
},{}],41:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameDef = /** @class */ (function () {
    function GameDef() {
    }
    GameDef.LEVELMAXANSWER = 5; //游戏中最大答案数;
    GameDef.ENERGYMAX = 5; //最大精力;
    GameDef.LEVELDEFAULTLEN = 50; //游戏圆形选择区域的默认半径
    GameDef.LEVELVIDEODELAY = 60; //看视频获得的游戏延时时间(s);
    GameDef.LEVELWRONGDECTIME = 20; //答错扣除的时间;
    GameDef.GAMINGBANNERHEIGHT = 1480; //舞台高超过这个数字在游戏中显示广告
    GameDef.BANNERREFRESHBYGAME = 2; //N局游戏刷新一次广告
    GameDef.ENERGYRECOVERTIME = platform.debug ? 10 * 60 * 50 : 5 * 60 * 1000; //精力恢复时间
    GameDef.OFFLINEREWARDS_DELAY = 2 * 60 * 1000; //离线奖励间隔
    //精力奖励
    GameDef.OFFLINEREWARDS_ENERGY_NUM = 2; //离线奖励个数
    GameDef.ENERGYCLICK_ENERGY_NUM = 2; //精力点击个数
    GameDef.FLOATREWARDS_ENERGY_NUM = 2; //浮窗进入奖励个数
    GameDef.COLLECTREWARDS_ENERGY_NUM = 2; //收藏进入奖励个数
    GameDef.RANKUPREWARDS_ENERGY_NUM = 2; //段位提升奖励个数
    GameDef.TREASURE_ENERGY_NUM = 2; //荣耀宝箱奖励个数
    GameDef.ENERGYOVER_ENERGY_NUM = 2; //体力不足奖励个数
    GameDef.LUCKNUM_FIRST_NUM = 3; //第一次赠送的奖励次数
    GameDef.GAMEHELPANIDELAY = 5000; //求助按钮的动画等待时间
    GameDef.CCSFJUMPLEVEL = 6; //通关第n关时需要跳出的界面;
    GameDef.MUSTSHARELEVEL = 10; //每通关X关弹出一次必须解锁
    GameDef.WINPROMOTIONSHOWLEVEL = 10; //N关以后弹出晋级面板
    return GameDef;
}());
exports.default = GameDef;
},{}],42:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LoadDef = /** @class */ (function () {
    function LoadDef() {
    }
    LoadDef.GAME_SOUND = "res/sound/";
    /**fui的pkg包名,也是loading资源路径前缀 */
    LoadDef.PKGNAME_LOADING = "res/fui/loading";
    LoadDef.RES_LOADING = [
        { url: LoadDef.PKGNAME_LOADING + "_atlas0.png", type: Laya.Loader.IMAGE },
        { url: LoadDef.PKGNAME_LOADING + ".obj", type: Laya.Loader.BUFFER }
    ];
    //游戏界面需要的资源
    LoadDef.PkgName_Game = "res/fui/game";
    LoadDef.ConfigUrl = "res/config/config.zip";
    LoadDef.PATICLE_TRAIL_SETTING = "res/ani/star1.part";
    LoadDef.PATICLE_TRAIL_PNG = "res/ani/texture.png";
    LoadDef.Res_Game = [
        { url: LoadDef.ConfigUrl, type: Laya.Loader.BUFFER },
        { url: LoadDef.PkgName_Game + ".obj", type: Laya.Loader.BUFFER },
        { url: LoadDef.PkgName_Game + "_atlas0.png", type: Laya.Loader.IMAGE },
        { url: LoadDef.PkgName_Game + "_atlas_l4929h.jpg", type: Laya.Loader.IMAGE },
        { url: LoadDef.PkgName_Game + "_atlas_l84y78.jpg", type: Laya.Loader.IMAGE },
        { url: LoadDef.PkgName_Game + "_atlas_l84y79.jpg", type: Laya.Loader.IMAGE },
        { url: LoadDef.PATICLE_TRAIL_SETTING, type: Laya.Loader.JSON },
        { url: LoadDef.PATICLE_TRAIL_PNG, type: Laya.Loader.IMAGE }
    ];
    LoadDef.ANI_GUIDE_COLLECT = "res/ani/zxj_ske.sk"; //收藏引导动画
    return LoadDef;
}());
exports.default = LoadDef;
},{}],43:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 打点统计
 * mpsdk.reportEvent上报事件,默认从1001开始分配
 */
var ReportDef = /** @class */ (function () {
    function ReportDef() {
    }
    //****************************分享统计*本游戏***************************************************************//
    ReportDef.SHARE_MENU = 0; //菜单分享,默认胶囊菜单分享永远是0,不可以更改和自定义
    ReportDef.SHARE_ENERGYOVER = 1; //精力不足弹窗
    ReportDef.SHARE_GOLDBTN = 2; //顶部金币按钮
    ReportDef.SHARE_GAMEHELP = 3; //游戏中提示按钮
    ReportDef.SHARE_GAMEOVERDELAY = 4; //游戏结束延时继续按钮;
    ReportDef.SHARE_REWARDSDOUBLE = 5; //奖励面板双倍按钮
    ReportDef.SHARE_LUCKDRAW = 6; //抽奖界面分享
    ReportDef.SHARE_WINTREASUREBOX = 7; //荣耀宝箱分享
    ReportDef.SHARE_GAMESHARE = 8; //游戏中求助好友按钮
    ReportDef.SHARE_OFFLINEBOXBTN = 9; //离线宝箱按钮
    ReportDef.SHARE_ENERGYBTNCLICK = 10; //精力状态栏按钮
    ReportDef.SHARE_ENERGYMUSTSHARE = 11; //每10关必须分享才能玩游戏
    ReportDef.SHARE_PROMOTIONSHARE = 12; //段位升级弹出面板
    ReportDef.SHARE_REWARDSNEXTMORE = 13; //奖励面板下次N倍奖励
    ReportDef.SHARE_OTHER = 100; //其他未定义的分享
    //****************************打点统计*通用***************************************************************//
    ReportDef.EVENT_SHOWLOADING = 1001; //显示loading界面
    ReportDef.EVENT_LOADINGOVER = 1002; //主loading加载时间,加载完游戏资源的时间 
    ReportDef.EVENT_INLOBBY = 1003; //用户登陆后第一次进入大厅
    ReportDef.Event_PASSLEVEL = 1; //成功通关  param1 = 关卡数  param2 = 使用求助次数_剩余时间
    ReportDef.EVENT_CLICKLEFTRECOMMEND = 2; //用户点击侧边栏
    ReportDef.Event_FAIL = 3; //失败  param1 = 关卡数  param2 = 使用求助次数_剩余时间
    ReportDef.EVENT_CSCLICK = 7; //点击客服
    ReportDef.EVENT_COLLECTGETENERGY = 21; //每日收藏
    ReportDef.EVENT_GETFLOATINGWINGIFT = 33; //获得浮窗奖励
    ReportDef.EVENT_GETCSWINGIFT = 33; //获得客服奖励
    ReportDef.EVENT_NEW_LEVLE1 = 102; //新用户成功进入第一关,param1:0:进入游戏,点击1,2,3,4,5处
    ReportDef.EVENT_NEW_CLICKHONOR = 108; //新用户点击称号
    ReportDef.EVENT_INGAME = 121; //用户每次进入游戏.param1:关卡数
    ReportDef.EVENT_GAMELINKICON = 122; //点击游戏场景的跳转icon;
    return ReportDef;
}());
exports.default = ReportDef;
},{}],44:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SharePointKeyDef = /** @class */ (function () {
    function SharePointKeyDef() {
    }
    SharePointKeyDef.RONGYAO = "rongyao"; //荣耀宝箱
    SharePointKeyDef.CHOUJIANG = "choujiang"; //荣耀宝箱
    SharePointKeyDef.LIXIAN = "lixian"; //荣耀宝箱
    SharePointKeyDef.QIUZHU = "qiuzhu"; //荣耀宝箱
    SharePointKeyDef.TILI = "tili"; //荣耀宝箱
    return SharePointKeyDef;
}());
exports.default = SharePointKeyDef;
},{}],45:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SoundDef = /** @class */ (function () {
    function SoundDef() {
    }
    SoundDef.BGM = "res/sound/bgm.mp3";
    SoundDef.BTN = "res/sound/click.mp3";
    SoundDef.CLICK = "res/sound/click.mp3";
    SoundDef.LOOSE = "res/sound/loose.mp3";
    SoundDef.RIGHT1 = "res/sound/right1.mp3";
    SoundDef.RIGHT2 = "res/sound/right2.mp3";
    SoundDef.RIGHT3 = "res/sound/right3.mp3";
    SoundDef.RIGHT4 = "res/sound/right4.mp3";
    SoundDef.RIGHT5 = "res/sound/right5.mp3";
    SoundDef.WIN = "res/sound/win.mp3";
    SoundDef.WRONG = "res/sound/wrong.mp3";
    SoundDef.SECOND10 = "res/sound/second10.mp3";
    SoundDef.SECOND30 = "res/sound/second30.mp3";
    return SoundDef;
}());
exports.default = SoundDef;
},{}],46:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
* created by yahu
*
*/
var BaseVO = /** @class */ (function () {
    /**
    * 构造函数
    */
    function BaseVO(obj) {
        if (obj === void 0) { obj = null; }
        //如果数据的变量类型都是简单类型可以用super()方法自动复制,否则请不要用super方法复制
        if (obj == null) {
            return;
        }
        for (var i in obj) {
            this[i] = obj[i];
        }
    }
    /**
     * 深克隆
     */
    BaseVO.prototype.deepClone = function () {
        var proto = Object.getPrototypeOf(this);
        var obj = Object.assign({}, Object.create(proto), this);
        return obj;
    };
    return BaseVO;
}());
exports.default = BaseVO;
},{}],47:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseVO_1 = require("../BaseVO");
var LevelConfig = /** @class */ (function (_super) {
    __extends(LevelConfig, _super);
    function LevelConfig(obj) {
        if (obj === void 0) { obj = null; }
        return _super.call(this, obj) || this;
    }
    return LevelConfig;
}(BaseVO_1.default));
exports.default = LevelConfig;
},{"../BaseVO":46}],48:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BaseVO_1 = require("../BaseVO");
var LevelGift = /** @class */ (function (_super) {
    __extends(LevelGift, _super);
    function LevelGift(obj) {
        if (obj === void 0) { obj = null; }
        return _super.call(this, obj) || this;
    }
    return LevelGift;
}(BaseVO_1.default));
exports.default = LevelGift;
},{"../BaseVO":46}],49:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
* created by yahu
* 仅作为存储any数据的代码提示糖使用,没实际内存存储
* 资源存储
*/
var CurrencyDataVO = /** @class */ (function () {
    function CurrencyDataVO() {
    }
    return CurrencyDataVO;
}());
exports.default = CurrencyDataVO;
},{}],50:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
* created by yahu
* 仅作为存储any数据的代码提示糖使用,没实际内存存储
*/
var GameDataVO = /** @class */ (function () {
    function GameDataVO() {
    }
    return GameDataVO;
}());
exports.default = GameDataVO;
},{}],51:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
* created by yahu
* 仅作为存储any数据的代码提示糖使用,没实际内存存储
*/
var LevelDataVO = /** @class */ (function () {
    function LevelDataVO() {
    }
    return LevelDataVO;
}());
exports.default = LevelDataVO;
},{}],52:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
* created by yahu
* 仅作为存储any数据的代码提示糖使用,没实际内存存储
* 资源存储
*/
var OtherDataVO = /** @class */ (function () {
    function OtherDataVO() {
    }
    return OtherDataVO;
}());
exports.default = OtherDataVO;
},{}],53:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Button_IKnow = /** @class */ (function (_super) {
    __extends(Button_IKnow, _super);
    function Button_IKnow() {
        return _super.call(this) || this;
    }
    Button_IKnow.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "Button_IKnow"));
    };
    Button_IKnow.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.button = this.getControllerAt(0);
        this.n1 = (this.getChildAt(0));
    };
    Button_IKnow.URL = "ui://isxx5ak7quq862";
    return Button_IKnow;
}(fairygui.GButton));
exports.default = Button_IKnow;
},{}],54:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var animation_gameover = /** @class */ (function (_super) {
    __extends(animation_gameover, _super);
    function animation_gameover() {
        return _super.call(this) || this;
    }
    animation_gameover.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "animation_gameover"));
    };
    animation_gameover.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n1 = (this.getChildAt(0));
        this.n2 = (this.getChildAt(1));
        this.n3 = (this.getChildAt(2));
        this.n4 = (this.getChildAt(3));
        this.n5 = (this.getChildAt(4));
        this.n7 = (this.getChildAt(5));
        this.n8 = (this.getChildAt(6));
    };
    animation_gameover.URL = "ui://isxx5ak7s4otat";
    return animation_gameover;
}(fairygui.GComponent));
exports.default = animation_gameover;
},{}],55:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var btn_back = /** @class */ (function (_super) {
    __extends(btn_back, _super);
    function btn_back() {
        return _super.call(this) || this;
    }
    btn_back.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "btn_back"));
    };
    btn_back.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.button = this.getControllerAt(0);
        this.n4 = (this.getChildAt(0));
    };
    btn_back.URL = "ui://isxx5ak77suj22";
    return btn_back;
}(fairygui.GButton));
exports.default = btn_back;
},{}],56:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var btn_back_home = /** @class */ (function (_super) {
    __extends(btn_back_home, _super);
    function btn_back_home() {
        return _super.call(this) || this;
    }
    btn_back_home.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "btn_back_home"));
    };
    btn_back_home.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.button = this.getControllerAt(0);
        this.n5 = (this.getChildAt(0));
    };
    btn_back_home.URL = "ui://isxx5ak7seb11h";
    return btn_back_home;
}(fairygui.GButton));
exports.default = btn_back_home;
},{}],57:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var btn_close = /** @class */ (function (_super) {
    __extends(btn_close, _super);
    function btn_close() {
        return _super.call(this) || this;
    }
    btn_close.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "btn_close"));
    };
    btn_close.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n6 = (this.getChildAt(0));
    };
    btn_close.URL = "ui://isxx5ak7seb11o";
    return btn_close;
}(fairygui.GButton));
exports.default = btn_close;
},{}],58:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var btn_col_last = /** @class */ (function (_super) {
    __extends(btn_col_last, _super);
    function btn_col_last() {
        return _super.call(this) || this;
    }
    btn_col_last.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "btn_col_last"));
    };
    btn_col_last.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n21 = (this.getChildAt(0));
        this.n22 = (this.getChildAt(1));
    };
    btn_col_last.URL = "ui://isxx5ak7bxhoa5";
    return btn_col_last;
}(fairygui.GButton));
exports.default = btn_col_last;
},{}],59:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var btn_col_next = /** @class */ (function (_super) {
    __extends(btn_col_next, _super);
    function btn_col_next() {
        return _super.call(this) || this;
    }
    btn_col_next.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "btn_col_next"));
    };
    btn_col_next.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n13 = (this.getChildAt(0));
        this.n14 = (this.getChildAt(1));
    };
    btn_col_next.URL = "ui://isxx5ak7bxhoa1";
    return btn_col_next;
}(fairygui.GButton));
exports.default = btn_col_next;
},{}],60:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var btn_confirm = /** @class */ (function (_super) {
    __extends(btn_confirm, _super);
    function btn_confirm() {
        return _super.call(this) || this;
    }
    btn_confirm.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "btn_confirm"));
    };
    btn_confirm.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n23 = (this.getChildAt(0));
        this.n26 = (this.getChildAt(1));
        this.n27 = (this.getChildAt(2));
    };
    btn_confirm.URL = "ui://isxx5ak77suj3c";
    return btn_confirm;
}(fairygui.GButton));
exports.default = btn_confirm;
},{}],61:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var btn_delay = /** @class */ (function (_super) {
    __extends(btn_delay, _super);
    function btn_delay() {
        return _super.call(this) || this;
    }
    btn_delay.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "btn_delay"));
    };
    btn_delay.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.button = this.getControllerAt(0);
        this.c1 = this.getControllerAt(1);
        this.n3 = (this.getChildAt(0));
        this.n5 = (this.getChildAt(1));
        this.n7 = (this.getChildAt(2));
        this.n8 = (this.getChildAt(3));
    };
    btn_delay.URL = "ui://isxx5ak7h5b52i";
    return btn_delay;
}(fairygui.GButton));
exports.default = btn_delay;
},{}],62:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var btn_energy_close = /** @class */ (function (_super) {
    __extends(btn_energy_close, _super);
    function btn_energy_close() {
        return _super.call(this) || this;
    }
    btn_energy_close.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "btn_energy_close"));
    };
    btn_energy_close.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n3 = (this.getChildAt(0));
    };
    btn_energy_close.URL = "ui://isxx5ak7e0dy5i";
    return btn_energy_close;
}(fairygui.GButton));
exports.default = btn_energy_close;
},{}],63:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var btn_gameshare = /** @class */ (function (_super) {
    __extends(btn_gameshare, _super);
    function btn_gameshare() {
        return _super.call(this) || this;
    }
    btn_gameshare.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "btn_gameshare"));
    };
    btn_gameshare.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.button = this.getControllerAt(0);
        this.n0 = (this.getChildAt(0));
        this.n9 = (this.getChildAt(1));
    };
    btn_gameshare.URL = "ui://isxx5ak7nqrsay";
    return btn_gameshare;
}(fairygui.GButton));
exports.default = btn_gameshare;
},{}],64:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var btn_gift = /** @class */ (function (_super) {
    __extends(btn_gift, _super);
    function btn_gift() {
        return _super.call(this) || this;
    }
    btn_gift.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "btn_gift"));
    };
    btn_gift.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.button = this.getControllerAt(0);
        this.n0 = (this.getChildAt(0));
        this.n4 = (this.getChildAt(1));
        this.redpoint = (this.getChildAt(2));
    };
    btn_gift.URL = "ui://isxx5ak7ubk7z";
    return btn_gift;
}(fairygui.GButton));
exports.default = btn_gift;
},{}],65:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var btn_img = /** @class */ (function (_super) {
    __extends(btn_img, _super);
    function btn_img() {
        return _super.call(this) || this;
    }
    btn_img.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "btn_img"));
    };
    btn_img.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.button = this.getControllerAt(0);
        this.n0 = (this.getChildAt(0));
        this.n4 = (this.getChildAt(1));
    };
    btn_img.URL = "ui://isxx5ak7ubk710";
    return btn_img;
}(fairygui.GButton));
exports.default = btn_img;
},{}],66:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var btn_luckdraw = /** @class */ (function (_super) {
    __extends(btn_luckdraw, _super);
    function btn_luckdraw() {
        return _super.call(this) || this;
    }
    btn_luckdraw.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "btn_luckdraw"));
    };
    btn_luckdraw.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.button = this.getControllerAt(0);
        this.state = this.getControllerAt(1);
        this.n3 = (this.getChildAt(0));
        this.n2 = (this.getChildAt(1));
        this.n4 = (this.getChildAt(2));
        this.n5 = (this.getChildAt(3));
        this.n6 = (this.getChildAt(4));
        this.n8 = (this.getChildAt(5));
    };
    btn_luckdraw.URL = "ui://isxx5ak7e0dy57";
    return btn_luckdraw;
}(fairygui.GButton));
exports.default = btn_luckdraw;
},{}],67:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var btn_lucky = /** @class */ (function (_super) {
    __extends(btn_lucky, _super);
    function btn_lucky() {
        return _super.call(this) || this;
    }
    btn_lucky.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "btn_lucky"));
    };
    btn_lucky.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.btn_lucky = (this.getChildAt(0));
        this.redpoint = (this.getChildAt(1));
    };
    btn_lucky.URL = "ui://isxx5ak7e0dy3u";
    return btn_lucky;
}(fairygui.GButton));
exports.default = btn_lucky;
},{}],68:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var btn_more = /** @class */ (function (_super) {
    __extends(btn_more, _super);
    function btn_more() {
        return _super.call(this) || this;
    }
    btn_more.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "btn_more"));
    };
    btn_more.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.btn_more = (this.getChildAt(0));
    };
    btn_more.URL = "ui://isxx5ak7quq85y";
    return btn_more;
}(fairygui.GButton));
exports.default = btn_more;
},{}],69:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var btn_moregame = /** @class */ (function (_super) {
    __extends(btn_moregame, _super);
    function btn_moregame() {
        return _super.call(this) || this;
    }
    btn_moregame.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "btn_moregame"));
    };
    btn_moregame.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.button = this.getControllerAt(0);
        this.n0 = (this.getChildAt(0));
        this.n2 = (this.getChildAt(1));
    };
    btn_moregame.URL = "ui://isxx5ak7e0dy4t";
    return btn_moregame;
}(fairygui.GButton));
exports.default = btn_moregame;
},{}],70:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var btn_next = /** @class */ (function (_super) {
    __extends(btn_next, _super);
    function btn_next() {
        return _super.call(this) || this;
    }
    btn_next.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "btn_next"));
    };
    btn_next.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.button = this.getControllerAt(0);
        this.n7 = (this.getChildAt(0));
        this.n8 = (this.getChildAt(1));
        this.n9 = (this.getChildAt(2));
        this.n10 = (this.getChildAt(3));
    };
    btn_next.URL = "ui://isxx5ak7seb11i";
    return btn_next;
}(fairygui.GButton));
exports.default = btn_next;
},{}],71:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var btn_nextmore_reward = /** @class */ (function (_super) {
    __extends(btn_nextmore_reward, _super);
    function btn_nextmore_reward() {
        return _super.call(this) || this;
    }
    btn_nextmore_reward.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "btn_nextmore_reward"));
    };
    btn_nextmore_reward.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.c1 = this.getControllerAt(0);
        this.n7 = (this.getChildAt(0));
        this.n6 = (this.getChildAt(1));
        this.n8 = (this.getChildAt(2));
        this.n9 = (this.getChildAt(3));
    };
    btn_nextmore_reward.URL = "ui://isxx5ak7np2abq";
    return btn_nextmore_reward;
}(fairygui.GButton));
exports.default = btn_nextmore_reward;
},{}],72:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var btn_open = /** @class */ (function (_super) {
    __extends(btn_open, _super);
    function btn_open() {
        return _super.call(this) || this;
    }
    btn_open.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "btn_open"));
    };
    btn_open.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n25 = (this.getChildAt(0));
        this.n26 = (this.getChildAt(1));
    };
    btn_open.URL = "ui://isxx5ak7quq86p";
    return btn_open;
}(fairygui.GComponent));
exports.default = btn_open;
},{}],73:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var btn_rank = /** @class */ (function (_super) {
    __extends(btn_rank, _super);
    function btn_rank() {
        return _super.call(this) || this;
    }
    btn_rank.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "btn_rank"));
    };
    btn_rank.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.button = this.getControllerAt(0);
        this.n0 = (this.getChildAt(0));
        this.n4 = (this.getChildAt(1));
    };
    btn_rank.URL = "ui://isxx5ak7ubk7x";
    return btn_rank;
}(fairygui.GButton));
exports.default = btn_rank;
},{}],74:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var btn_receive = /** @class */ (function (_super) {
    __extends(btn_receive, _super);
    function btn_receive() {
        return _super.call(this) || this;
    }
    btn_receive.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "btn_receive"));
    };
    btn_receive.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.button = this.getControllerAt(0);
        this.state = this.getControllerAt(1);
        this.n10 = (this.getChildAt(0));
        this.n7 = (this.getChildAt(1));
        this.n9 = (this.getChildAt(2));
        this.n8 = (this.getChildAt(3));
    };
    btn_receive.URL = "ui://isxx5ak7seb11v";
    return btn_receive;
}(fairygui.GButton));
exports.default = btn_receive;
},{}],75:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var btn_receive_reward = /** @class */ (function (_super) {
    __extends(btn_receive_reward, _super);
    function btn_receive_reward() {
        return _super.call(this) || this;
    }
    btn_receive_reward.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "btn_receive_reward"));
    };
    btn_receive_reward.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.c1 = this.getControllerAt(0);
        this.n7 = (this.getChildAt(0));
        this.n6 = (this.getChildAt(1));
        this.n8 = (this.getChildAt(2));
        this.n9 = (this.getChildAt(3));
    };
    btn_receive_reward.URL = "ui://isxx5ak7quq86y";
    return btn_receive_reward;
}(fairygui.GButton));
exports.default = btn_receive_reward;
},{}],76:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var btn_recommend_close = /** @class */ (function (_super) {
    __extends(btn_recommend_close, _super);
    function btn_recommend_close() {
        return _super.call(this) || this;
    }
    btn_recommend_close.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "btn_recommend_close"));
    };
    btn_recommend_close.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n1 = (this.getChildAt(0));
    };
    btn_recommend_close.URL = "ui://isxx5ak7quq86q";
    return btn_recommend_close;
}(fairygui.GComponent));
exports.default = btn_recommend_close;
},{}],77:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var btn_restart = /** @class */ (function (_super) {
    __extends(btn_restart, _super);
    function btn_restart() {
        return _super.call(this) || this;
    }
    btn_restart.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "btn_restart"));
    };
    btn_restart.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.button = this.getControllerAt(0);
        this.n3 = (this.getChildAt(0));
        this.n5 = (this.getChildAt(1));
        this.n7 = (this.getChildAt(2));
        this.n8 = (this.getChildAt(3));
    };
    btn_restart.URL = "ui://isxx5ak7h5b52f";
    return btn_restart;
}(fairygui.GButton));
exports.default = btn_restart;
},{}],78:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var btn_setting = /** @class */ (function (_super) {
    __extends(btn_setting, _super);
    function btn_setting() {
        return _super.call(this) || this;
    }
    btn_setting.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "btn_setting"));
    };
    btn_setting.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.button = this.getControllerAt(0);
        this.n0 = (this.getChildAt(0));
        this.n4 = (this.getChildAt(1));
    };
    btn_setting.URL = "ui://isxx5ak7ubk7y";
    return btn_setting;
}(fairygui.GButton));
exports.default = btn_setting;
},{}],79:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var btn_start = /** @class */ (function (_super) {
    __extends(btn_start, _super);
    function btn_start() {
        return _super.call(this) || this;
    }
    btn_start.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "btn_start"));
    };
    btn_start.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n0 = (this.getChildAt(0));
        this.start_btn_level = (this.getChildAt(1));
    };
    btn_start.URL = "ui://isxx5ak7ubk7t";
    return btn_start;
}(fairygui.GButton));
exports.default = btn_start;
},{}],80:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var btn_tip = /** @class */ (function (_super) {
    __extends(btn_tip, _super);
    function btn_tip() {
        return _super.call(this) || this;
    }
    btn_tip.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "btn_tip"));
    };
    btn_tip.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.button = this.getControllerAt(0);
        this.c1 = this.getControllerAt(1);
        this.n0 = (this.getChildAt(0));
        this.n6 = (this.getChildAt(1));
        this.n7 = (this.getChildAt(2));
        this.n9 = (this.getChildAt(3));
        this.redpoint = (this.getChildAt(4));
    };
    btn_tip.URL = "ui://isxx5ak7seb11d";
    return btn_tip;
}(fairygui.GButton));
exports.default = btn_tip;
},{}],81:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var btn_yellowgetreward = /** @class */ (function (_super) {
    __extends(btn_yellowgetreward, _super);
    function btn_yellowgetreward() {
        return _super.call(this) || this;
    }
    btn_yellowgetreward.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "btn_yellowgetreward"));
    };
    btn_yellowgetreward.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.c1 = this.getControllerAt(0);
        this.n3 = (this.getChildAt(0));
        this.n4 = (this.getChildAt(1));
        this.n5 = (this.getChildAt(2));
        this.n7 = (this.getChildAt(3));
    };
    btn_yellowgetreward.URL = "ui://isxx5ak7xsvo8h";
    return btn_yellowgetreward;
}(fairygui.GButton));
exports.default = btn_yellowgetreward;
},{}],82:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var closebtn = /** @class */ (function (_super) {
    __extends(closebtn, _super);
    function closebtn() {
        return _super.call(this) || this;
    }
    closebtn.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "closebtn"));
    };
    closebtn.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.button = this.getControllerAt(0);
        this.n1 = (this.getChildAt(0));
    };
    closebtn.URL = "ui://isxx5ak7pkb0ah";
    return closebtn;
}(fairygui.GButton));
exports.default = closebtn;
},{}],83:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var collectgame_anipanel = /** @class */ (function (_super) {
    __extends(collectgame_anipanel, _super);
    function collectgame_anipanel() {
        return _super.call(this) || this;
    }
    collectgame_anipanel.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "collectgame_anipanel"));
    };
    collectgame_anipanel.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n22 = (this.getChildAt(0));
    };
    collectgame_anipanel.URL = "ui://isxx5ak7kbrpa7";
    return collectgame_anipanel;
}(fairygui.GComponent));
exports.default = collectgame_anipanel;
},{}],84:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var com_addfloat = /** @class */ (function (_super) {
    __extends(com_addfloat, _super);
    function com_addfloat() {
        return _super.call(this) || this;
    }
    com_addfloat.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "com_addfloat"));
    };
    com_addfloat.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n4 = (this.getChildAt(0));
        this.btn_reward = (this.getChildAt(1));
        this.n3 = (this.getChildAt(2));
        this.n5 = (this.getChildAt(3));
        this.n6 = (this.getChildAt(4));
    };
    com_addfloat.URL = "ui://isxx5ak7e0dy4g";
    return com_addfloat;
}(fairygui.GComponent));
exports.default = com_addfloat;
},{}],85:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var com_addmy = /** @class */ (function (_super) {
    __extends(com_addmy, _super);
    function com_addmy() {
        return _super.call(this) || this;
    }
    com_addmy.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "com_addmy"));
    };
    com_addmy.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n5 = (this.getChildAt(0));
        this.n2 = (this.getChildAt(1));
        this.btn_reward = (this.getChildAt(2));
        this.n4 = (this.getChildAt(3));
        this.n6 = (this.getChildAt(4));
    };
    com_addmy.URL = "ui://isxx5ak7seb11u";
    return com_addmy;
}(fairygui.GComponent));
exports.default = com_addmy;
},{}],86:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var com_back_game = /** @class */ (function (_super) {
    __extends(com_back_game, _super);
    function com_back_game() {
        return _super.call(this) || this;
    }
    com_back_game.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "com_back_game"));
    };
    com_back_game.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n2 = (this.getChildAt(0));
        this.n4 = (this.getChildAt(1));
    };
    com_back_game.URL = "ui://isxx5ak7quq85r";
    return com_back_game;
}(fairygui.GButton));
exports.default = com_back_game;
},{}],87:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var com_box_close = /** @class */ (function (_super) {
    __extends(com_box_close, _super);
    function com_box_close() {
        return _super.call(this) || this;
    }
    com_box_close.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "com_box_close"));
    };
    com_box_close.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n9 = (this.getChildAt(0));
    };
    com_box_close.URL = "ui://isxx5ak7evk28r";
    return com_box_close;
}(fairygui.GComponent));
exports.default = com_box_close;
},{}],88:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var com_energy = /** @class */ (function (_super) {
    __extends(com_energy, _super);
    function com_energy() {
        return _super.call(this) || this;
    }
    com_energy.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "com_energy"));
    };
    com_energy.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.state = this.getControllerAt(0);
        this.n0 = (this.getChildAt(0));
        this.txt = (this.getChildAt(1));
        this.n4 = (this.getChildAt(2));
        this.n5 = (this.getChildAt(3));
        this.txt_time = (this.getChildAt(4));
        this.txt2 = (this.getChildAt(5));
        this.txt_min = (this.getChildAt(6));
        this.t0 = this.getTransitionAt(0);
    };
    com_energy.URL = "ui://isxx5ak7u6cb1";
    return com_energy;
}(fairygui.GButton));
exports.default = com_energy;
},{}],89:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var com_energy_reward = /** @class */ (function (_super) {
    __extends(com_energy_reward, _super);
    function com_energy_reward() {
        return _super.call(this) || this;
    }
    com_energy_reward.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "com_energy_reward"));
    };
    com_energy_reward.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.c1 = this.getControllerAt(0);
        this.n12 = (this.getChildAt(0));
        this.n10 = (this.getChildAt(1));
        this.n11 = (this.getChildAt(2));
        this.n13 = (this.getChildAt(3));
    };
    com_energy_reward.URL = "ui://isxx5ak7e0dy5h";
    return com_energy_reward;
}(fairygui.GButton));
exports.default = com_energy_reward;
},{}],90:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var com_gameicon = /** @class */ (function (_super) {
    __extends(com_gameicon, _super);
    function com_gameicon() {
        return _super.call(this) || this;
    }
    com_gameicon.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "com_gameicon"));
    };
    com_gameicon.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n0 = (this.getChildAt(0));
        this.t1 = this.getTransitionAt(0);
    };
    com_gameicon.URL = "ui://isxx5ak7ndfe9d";
    return com_gameicon;
}(fairygui.GComponent));
exports.default = com_gameicon;
},{}],91:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var com_gameicon_item = /** @class */ (function (_super) {
    __extends(com_gameicon_item, _super);
    function com_gameicon_item() {
        return _super.call(this) || this;
    }
    com_gameicon_item.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "com_gameicon_item"));
    };
    com_gameicon_item.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n1 = (this.getChildAt(0));
        this.icon_img = (this.getChildAt(1));
    };
    com_gameicon_item.URL = "ui://isxx5ak7ndfe9c";
    return com_gameicon_item;
}(fairygui.GComponent));
exports.default = com_gameicon_item;
},{}],92:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var com_gold = /** @class */ (function (_super) {
    __extends(com_gold, _super);
    function com_gold() {
        return _super.call(this) || this;
    }
    com_gold.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "com_gold"));
    };
    com_gold.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n0 = (this.getChildAt(0));
        this.txt = (this.getChildAt(1));
        this.n4 = (this.getChildAt(2));
        this.n5 = (this.getChildAt(3));
    };
    com_gold.URL = "ui://isxx5ak7ubk7p";
    return com_gold;
}(fairygui.GButton));
exports.default = com_gold;
},{}],93:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var com_img1 = /** @class */ (function (_super) {
    __extends(com_img1, _super);
    function com_img1() {
        return _super.call(this) || this;
    }
    com_img1.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "com_img1"));
    };
    com_img1.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n5 = (this.getChildAt(0));
        this.imgloader = (this.getChildAt(1));
        this.panel = (this.getChildAt(2));
        this.t0 = this.getTransitionAt(0);
    };
    com_img1.URL = "ui://isxx5ak7seb11b";
    return com_img1;
}(fairygui.GComponent));
exports.default = com_img1;
},{}],94:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var com_imgdebug = /** @class */ (function (_super) {
    __extends(com_imgdebug, _super);
    function com_imgdebug() {
        return _super.call(this) || this;
    }
    com_imgdebug.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "com_imgdebug"));
    };
    com_imgdebug.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.c1 = this.getControllerAt(0);
        this.n0 = (this.getChildAt(0));
        this.n1 = (this.getChildAt(1));
        this.n2 = (this.getChildAt(2));
    };
    com_imgdebug.URL = "ui://isxx5ak7uymj65";
    return com_imgdebug;
}(fairygui.GComponent));
exports.default = com_imgdebug;
},{}],95:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var com_imgright = /** @class */ (function (_super) {
    __extends(com_imgright, _super);
    function com_imgright() {
        return _super.call(this) || this;
    }
    com_imgright.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "com_imgright"));
    };
    com_imgright.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.c1 = this.getControllerAt(0);
        this.n1 = (this.getChildAt(0));
        this.n2 = (this.getChildAt(1));
        this.n3 = (this.getChildAt(2));
    };
    com_imgright.URL = "ui://isxx5ak7h5b529";
    return com_imgright;
}(fairygui.GComponent));
exports.default = com_imgright;
},{}],96:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var com_imgwrong = /** @class */ (function (_super) {
    __extends(com_imgwrong, _super);
    function com_imgwrong() {
        return _super.call(this) || this;
    }
    com_imgwrong.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "com_imgwrong"));
    };
    com_imgwrong.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n2 = (this.getChildAt(0));
    };
    com_imgwrong.URL = "ui://isxx5ak7h5b52a";
    return com_imgwrong;
}(fairygui.GComponent));
exports.default = com_imgwrong;
},{}],97:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var com_level = /** @class */ (function (_super) {
    __extends(com_level, _super);
    function com_level() {
        return _super.call(this) || this;
    }
    com_level.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "com_level"));
    };
    com_level.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.icon_img = (this.getChildAt(0));
        this.levelname_img = (this.getChildAt(1));
        this.levelname_level = (this.getChildAt(2));
        this.title_text = (this.getChildAt(3));
        this.n11 = (this.getChildAt(4));
        this.stars_group = (this.getChildAt(5));
    };
    com_level.URL = "ui://isxx5ak7seb11f";
    return com_level;
}(fairygui.GComponent));
exports.default = com_level;
},{}],98:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var com_level_stars = /** @class */ (function (_super) {
    __extends(com_level_stars, _super);
    function com_level_stars() {
        return _super.call(this) || this;
    }
    com_level_stars.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "com_level_stars"));
    };
    com_level_stars.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.state = this.getControllerAt(0);
        this.n12 = (this.getChildAt(0));
    };
    com_level_stars.URL = "ui://isxx5ak791wl82";
    return com_level_stars;
}(fairygui.GComponent));
exports.default = com_level_stars;
},{}],99:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var com_loader = /** @class */ (function (_super) {
    __extends(com_loader, _super);
    function com_loader() {
        return _super.call(this) || this;
    }
    com_loader.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "com_loader"));
    };
    com_loader.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.img = (this.getChildAt(0));
        this.n5 = (this.getChildAt(1));
    };
    com_loader.URL = "ui://isxx5ak7brav3f";
    return com_loader;
}(fairygui.GComponent));
exports.default = com_loader;
},{}],100:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var com_progress = /** @class */ (function (_super) {
    __extends(com_progress, _super);
    function com_progress() {
        return _super.call(this) || this;
    }
    com_progress.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "com_progress"));
    };
    com_progress.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.state = this.getControllerAt(0);
        this.n36 = (this.getChildAt(0));
        this.n37 = (this.getChildAt(1));
        this.n38 = (this.getChildAt(2));
        this.n39 = (this.getChildAt(3));
        this.n40 = (this.getChildAt(4));
        this.r1 = (this.getChildAt(5));
        this.r2 = (this.getChildAt(6));
        this.r3 = (this.getChildAt(7));
        this.r4 = (this.getChildAt(8));
        this.r5 = (this.getChildAt(9));
    };
    com_progress.URL = "ui://isxx5ak7seb11e";
    return com_progress;
}(fairygui.GComponent));
exports.default = com_progress;
},{}],101:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var com_service = /** @class */ (function (_super) {
    __extends(com_service, _super);
    function com_service() {
        return _super.call(this) || this;
    }
    com_service.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "com_service"));
    };
    com_service.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n4 = (this.getChildAt(0));
        this.btn_reward = (this.getChildAt(1));
        this.n3 = (this.getChildAt(2));
        this.n5 = (this.getChildAt(3));
        this.n6 = (this.getChildAt(4));
    };
    com_service.URL = "ui://isxx5ak7e0dy4h";
    return com_service;
}(fairygui.GComponent));
exports.default = com_service;
},{}],102:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var com_switch = /** @class */ (function (_super) {
    __extends(com_switch, _super);
    function com_switch() {
        return _super.call(this) || this;
    }
    com_switch.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "com_switch"));
    };
    com_switch.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.state = this.getControllerAt(0);
        this.n6 = (this.getChildAt(0));
        this.n5 = (this.getChildAt(1));
        this.n3 = (this.getChildAt(2));
    };
    com_switch.URL = "ui://isxx5ak77suj23";
    return com_switch;
}(fairygui.GComponent));
exports.default = com_switch;
},{}],103:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var com_wrongnum = /** @class */ (function (_super) {
    __extends(com_wrongnum, _super);
    function com_wrongnum() {
        return _super.call(this) || this;
    }
    com_wrongnum.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "com_wrongnum"));
    };
    com_wrongnum.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.txt = (this.getChildAt(0));
    };
    com_wrongnum.URL = "ui://isxx5ak7brav3e";
    return com_wrongnum;
}(fairygui.GComponent));
exports.default = com_wrongnum;
},{}],104:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
Object.defineProperty(exports, "__esModule", { value: true });
var shellscene_1 = require("./shellscene");
var winluckydraw_1 = require("./winluckydraw");
var itemreward_1 = require("./itemreward");
var winsetting_1 = require("./winsetting");
var btn_back_1 = require("./btn_back");
var com_switch_1 = require("./com_switch");
var winmoregame_1 = require("./winmoregame");
var winpromotionreward_1 = require("./winpromotionreward");
var btn_confirm_1 = require("./btn_confirm");
var com_level_stars_1 = require("./com_level_stars");
var guidefinger_1 = require("./guidefinger");
var com_wrongnum_1 = require("./com_wrongnum");
var com_loader_1 = require("./com_loader");
var wincollectiongame_1 = require("./wincollectiongame");
var btn_col_next_1 = require("./btn_col_next");
var btn_col_last_1 = require("./btn_col_last");
var btn_lucky_1 = require("./btn_lucky");
var wintreasurebox_1 = require("./wintreasurebox");
var com_addfloat_1 = require("./com_addfloat");
var com_service_1 = require("./com_service");
var btn_moregame_1 = require("./btn_moregame");
var btn_luckdraw_1 = require("./btn_luckdraw");
var winenergyover_1 = require("./winenergyover");
var com_energy_reward_1 = require("./com_energy_reward");
var btn_energy_close_1 = require("./btn_energy_close");
var com_box_close_1 = require("./com_box_close");
var com_imgright_1 = require("./com_imgright");
var com_imgwrong_1 = require("./com_imgwrong");
var wingamefail_1 = require("./wingamefail");
var btn_restart_1 = require("./btn_restart");
var btn_delay_1 = require("./btn_delay");
var goservice_1 = require("./goservice");
var collectgame_anipanel_1 = require("./collectgame_anipanel");
var getreward_btnget_1 = require("./getreward_btnget");
var promotion_close_1 = require("./promotion_close");
var winmustshare_1 = require("./winmustshare");
var mustshare_btnok_1 = require("./mustshare_btnok");
var gamesheel_bgm_1 = require("./gamesheel_bgm");
var winofflinebox_1 = require("./winofflinebox");
var com_gameicon_item_1 = require("./com_gameicon_item");
var com_gameicon_1 = require("./com_gameicon");
var getreward_btn_1 = require("./getreward_btn");
var btn_nextmore_reward_1 = require("./btn_nextmore_reward");
var guidemask_1 = require("./guidemask");
var guidemaskcircle_1 = require("./guidemaskcircle");
var gamerecommenditem_1 = require("./gamerecommenditem");
var guidemaskclick_1 = require("./guidemaskclick");
var btn_gameshare_1 = require("./btn_gameshare");
var rankbtn2_1 = require("./rankbtn2");
var closebtn_1 = require("./closebtn");
var rankbtn1_1 = require("./rankbtn1");
var rankrender_1 = require("./rankrender");
var headicon_1 = require("./headicon");
var winrecommend_1 = require("./winrecommend");
var recommenditem_1 = require("./recommenditem");
var com_back_game_1 = require("./com_back_game");
var itemmoregame_1 = require("./itemmoregame");
var btn_more_1 = require("./btn_more");
var winaddfloat_1 = require("./winaddfloat");
var Button_IKnow_1 = require("./Button_IKnow");
var wincsrewards_1 = require("./wincsrewards");
var btn_open_1 = require("./btn_open");
var btn_recommend_close_1 = require("./btn_recommend_close");
var wingetreward_1 = require("./wingetreward");
var btn_receive_reward_1 = require("./btn_receive_reward");
var itemrenderpanel_1 = require("./itemrenderpanel");
var item_com_1 = require("./item_com");
var animation_gameover_1 = require("./animation_gameover");
var gamescene_1 = require("./gamescene");
var gamewinscene_1 = require("./gamewinscene");
var com_img1_1 = require("./com_img1");
var btn_tip_1 = require("./btn_tip");
var com_progress_1 = require("./com_progress");
var com_level_1 = require("./com_level");
var btn_back_home_1 = require("./btn_back_home");
var btn_next_1 = require("./btn_next");
var gameover_progress_1 = require("./gameover_progress");
var winlevel_1 = require("./winlevel");
var btn_close_1 = require("./btn_close");
var item_level_1 = require("./item_level");
var com_addmy_1 = require("./com_addmy");
var btn_receive_1 = require("./btn_receive");
var lobbyscene_1 = require("./lobbyscene");
var com_energy_1 = require("./com_energy");
var btn_img_1 = require("./btn_img");
var winfreeenergy_1 = require("./winfreeenergy");
var winrank_1 = require("./winrank");
var com_gold_1 = require("./com_gold");
var btn_start_1 = require("./btn_start");
var btn_rank_1 = require("./btn_rank");
var btn_setting_1 = require("./btn_setting");
var btn_gift_1 = require("./btn_gift");
var com_imgdebug_1 = require("./com_imgdebug");
var winauthor_1 = require("./winauthor");
var gamebtn_back_1 = require("./gamebtn_back");
var btn_yellowgetreward_1 = require("./btn_yellowgetreward");
var wingetreward_energy_1 = require("./wingetreward_energy");
var gameBinder = /** @class */ (function () {
    function gameBinder() {
    }
    gameBinder.bindAll = function () {
        fairygui.UIObjectFactory.setPackageItemExtension(shellscene_1.default.URL, shellscene_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(winluckydraw_1.default.URL, winluckydraw_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(itemreward_1.default.URL, itemreward_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(winsetting_1.default.URL, winsetting_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(btn_back_1.default.URL, btn_back_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(com_switch_1.default.URL, com_switch_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(winmoregame_1.default.URL, winmoregame_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(winpromotionreward_1.default.URL, winpromotionreward_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(btn_confirm_1.default.URL, btn_confirm_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(com_level_stars_1.default.URL, com_level_stars_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(guidefinger_1.default.URL, guidefinger_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(com_wrongnum_1.default.URL, com_wrongnum_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(com_loader_1.default.URL, com_loader_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(wincollectiongame_1.default.URL, wincollectiongame_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(btn_col_next_1.default.URL, btn_col_next_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(btn_col_last_1.default.URL, btn_col_last_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(btn_lucky_1.default.URL, btn_lucky_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(wintreasurebox_1.default.URL, wintreasurebox_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(com_addfloat_1.default.URL, com_addfloat_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(com_service_1.default.URL, com_service_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(btn_moregame_1.default.URL, btn_moregame_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(btn_luckdraw_1.default.URL, btn_luckdraw_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(winenergyover_1.default.URL, winenergyover_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(com_energy_reward_1.default.URL, com_energy_reward_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(btn_energy_close_1.default.URL, btn_energy_close_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(com_box_close_1.default.URL, com_box_close_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(com_imgright_1.default.URL, com_imgright_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(com_imgwrong_1.default.URL, com_imgwrong_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(wingamefail_1.default.URL, wingamefail_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(btn_restart_1.default.URL, btn_restart_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(btn_delay_1.default.URL, btn_delay_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(goservice_1.default.URL, goservice_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(collectgame_anipanel_1.default.URL, collectgame_anipanel_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(getreward_btnget_1.default.URL, getreward_btnget_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(promotion_close_1.default.URL, promotion_close_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(winmustshare_1.default.URL, winmustshare_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(mustshare_btnok_1.default.URL, mustshare_btnok_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(gamesheel_bgm_1.default.URL, gamesheel_bgm_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(winofflinebox_1.default.URL, winofflinebox_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(com_gameicon_item_1.default.URL, com_gameicon_item_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(com_gameicon_1.default.URL, com_gameicon_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(getreward_btn_1.default.URL, getreward_btn_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(btn_nextmore_reward_1.default.URL, btn_nextmore_reward_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(guidemask_1.default.URL, guidemask_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(guidemaskcircle_1.default.URL, guidemaskcircle_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(gamerecommenditem_1.default.URL, gamerecommenditem_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(guidemaskclick_1.default.URL, guidemaskclick_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(btn_gameshare_1.default.URL, btn_gameshare_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(rankbtn2_1.default.URL, rankbtn2_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(closebtn_1.default.URL, closebtn_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(rankbtn1_1.default.URL, rankbtn1_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(rankrender_1.default.URL, rankrender_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(headicon_1.default.URL, headicon_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(winrecommend_1.default.URL, winrecommend_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(recommenditem_1.default.URL, recommenditem_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(com_back_game_1.default.URL, com_back_game_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(itemmoregame_1.default.URL, itemmoregame_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(btn_more_1.default.URL, btn_more_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(winaddfloat_1.default.URL, winaddfloat_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(Button_IKnow_1.default.URL, Button_IKnow_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(wincsrewards_1.default.URL, wincsrewards_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(btn_open_1.default.URL, btn_open_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(btn_recommend_close_1.default.URL, btn_recommend_close_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(wingetreward_1.default.URL, wingetreward_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(btn_receive_reward_1.default.URL, btn_receive_reward_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(itemrenderpanel_1.default.URL, itemrenderpanel_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(item_com_1.default.URL, item_com_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(animation_gameover_1.default.URL, animation_gameover_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(gamescene_1.default.URL, gamescene_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(gamewinscene_1.default.URL, gamewinscene_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(com_img1_1.default.URL, com_img1_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(btn_tip_1.default.URL, btn_tip_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(com_progress_1.default.URL, com_progress_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(com_level_1.default.URL, com_level_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(btn_back_home_1.default.URL, btn_back_home_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(btn_next_1.default.URL, btn_next_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(gameover_progress_1.default.URL, gameover_progress_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(winlevel_1.default.URL, winlevel_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(btn_close_1.default.URL, btn_close_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(item_level_1.default.URL, item_level_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(com_addmy_1.default.URL, com_addmy_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(btn_receive_1.default.URL, btn_receive_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(lobbyscene_1.default.URL, lobbyscene_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(com_energy_1.default.URL, com_energy_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(btn_img_1.default.URL, btn_img_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(winfreeenergy_1.default.URL, winfreeenergy_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(winrank_1.default.URL, winrank_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(com_gold_1.default.URL, com_gold_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(btn_start_1.default.URL, btn_start_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(btn_rank_1.default.URL, btn_rank_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(btn_setting_1.default.URL, btn_setting_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(btn_gift_1.default.URL, btn_gift_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(com_imgdebug_1.default.URL, com_imgdebug_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(winauthor_1.default.URL, winauthor_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(gamebtn_back_1.default.URL, gamebtn_back_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(btn_yellowgetreward_1.default.URL, btn_yellowgetreward_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(wingetreward_energy_1.default.URL, wingetreward_energy_1.default);
    };
    return gameBinder;
}());
exports.default = gameBinder;
},{"./Button_IKnow":53,"./animation_gameover":54,"./btn_back":55,"./btn_back_home":56,"./btn_close":57,"./btn_col_last":58,"./btn_col_next":59,"./btn_confirm":60,"./btn_delay":61,"./btn_energy_close":62,"./btn_gameshare":63,"./btn_gift":64,"./btn_img":65,"./btn_luckdraw":66,"./btn_lucky":67,"./btn_more":68,"./btn_moregame":69,"./btn_next":70,"./btn_nextmore_reward":71,"./btn_open":72,"./btn_rank":73,"./btn_receive":74,"./btn_receive_reward":75,"./btn_recommend_close":76,"./btn_restart":77,"./btn_setting":78,"./btn_start":79,"./btn_tip":80,"./btn_yellowgetreward":81,"./closebtn":82,"./collectgame_anipanel":83,"./com_addfloat":84,"./com_addmy":85,"./com_back_game":86,"./com_box_close":87,"./com_energy":88,"./com_energy_reward":89,"./com_gameicon":90,"./com_gameicon_item":91,"./com_gold":92,"./com_img1":93,"./com_imgdebug":94,"./com_imgright":95,"./com_imgwrong":96,"./com_level":97,"./com_level_stars":98,"./com_loader":99,"./com_progress":100,"./com_service":101,"./com_switch":102,"./com_wrongnum":103,"./gamebtn_back":105,"./gameover_progress":106,"./gamerecommenditem":107,"./gamescene":108,"./gamesheel_bgm":109,"./gamewinscene":110,"./getreward_btn":111,"./getreward_btnget":112,"./goservice":113,"./guidefinger":114,"./guidemask":115,"./guidemaskcircle":116,"./guidemaskclick":117,"./headicon":118,"./item_com":119,"./item_level":120,"./itemmoregame":121,"./itemrenderpanel":122,"./itemreward":123,"./lobbyscene":124,"./mustshare_btnok":125,"./promotion_close":126,"./rankbtn1":127,"./rankbtn2":128,"./rankrender":129,"./recommenditem":130,"./shellscene":131,"./winaddfloat":132,"./winauthor":133,"./wincollectiongame":134,"./wincsrewards":135,"./winenergyover":136,"./winfreeenergy":137,"./wingamefail":138,"./wingetreward":139,"./wingetreward_energy":140,"./winlevel":141,"./winluckydraw":142,"./winmoregame":143,"./winmustshare":144,"./winofflinebox":145,"./winpromotionreward":146,"./winrank":147,"./winrecommend":148,"./winsetting":149,"./wintreasurebox":150}],105:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var gamebtn_back = /** @class */ (function (_super) {
    __extends(gamebtn_back, _super);
    function gamebtn_back() {
        return _super.call(this) || this;
    }
    gamebtn_back.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "gamebtn_back"));
    };
    gamebtn_back.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n10 = (this.getChildAt(0));
        this.n11 = (this.getChildAt(1));
    };
    gamebtn_back.URL = "ui://isxx5ak7whiu5d";
    return gamebtn_back;
}(fairygui.GButton));
exports.default = gamebtn_back;
},{}],106:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var gameover_progress = /** @class */ (function (_super) {
    __extends(gameover_progress, _super);
    function gameover_progress() {
        return _super.call(this) || this;
    }
    gameover_progress.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "gameover_progress"));
    };
    gameover_progress.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.total_progress = (this.getChildAt(0));
        this.bar = (this.getChildAt(1));
        this.n7 = (this.getChildAt(2));
        this.title = (this.getChildAt(3));
    };
    gameover_progress.URL = "ui://isxx5ak7seb11j";
    return gameover_progress;
}(fairygui.GProgressBar));
exports.default = gameover_progress;
},{}],107:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var gamerecommenditem = /** @class */ (function (_super) {
    __extends(gamerecommenditem, _super);
    function gamerecommenditem() {
        return _super.call(this) || this;
    }
    gamerecommenditem.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "gamerecommenditem"));
    };
    gamerecommenditem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n0 = (this.getChildAt(0));
        this.n1 = (this.getChildAt(1));
    };
    gamerecommenditem.URL = "ui://isxx5ak7np2ac2";
    return gamerecommenditem;
}(fairygui.GButton));
exports.default = gamerecommenditem;
},{}],108:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var gamescene = /** @class */ (function (_super) {
    __extends(gamescene, _super);
    function gamescene() {
        return _super.call(this) || this;
    }
    gamescene.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "gamescene"));
    };
    gamescene.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n8 = (this.getChildAt(0));
        this.btn_gold = (this.getChildAt(1));
        this.txt_level = (this.getChildAt(2));
        this.txt_time = (this.getChildAt(3));
        this.btn_tip = (this.getChildAt(4));
        this.rightcnt = (this.getChildAt(5));
        this.btn_back = (this.getChildAt(6));
        this.btn_share = (this.getChildAt(7));
        this.word_img1 = (this.getChildAt(8));
        this.word_img2 = (this.getChildAt(9));
        this.n17 = (this.getChildAt(10));
        this.linkicon_1 = (this.getChildAt(11));
        this.n18 = (this.getChildAt(12));
        this.n10 = (this.getChildAt(13));
        this.guidemask = (this.getChildAt(14));
        this.txt_guidetips = (this.getChildAt(15));
    };
    gamescene.URL = "ui://isxx5ak7seb119";
    return gamescene;
}(fairygui.GComponent));
exports.default = gamescene;
},{}],109:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var gamesheel_bgm = /** @class */ (function (_super) {
    __extends(gamesheel_bgm, _super);
    function gamesheel_bgm() {
        return _super.call(this) || this;
    }
    gamesheel_bgm.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "gamesheel_bgm"));
    };
    gamesheel_bgm.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.bgm = (this.getChildAt(0));
    };
    gamesheel_bgm.URL = "ui://isxx5ak7mo28ba";
    return gamesheel_bgm;
}(fairygui.GComponent));
exports.default = gamesheel_bgm;
},{}],110:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var gamewinscene = /** @class */ (function (_super) {
    __extends(gamewinscene, _super);
    function gamewinscene() {
        return _super.call(this) || this;
    }
    gamewinscene.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "gamewinscene"));
    };
    gamewinscene.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n5 = (this.getChildAt(0));
        this.n3 = (this.getChildAt(1));
        this.com_progress = (this.getChildAt(2));
        this.sharepanel = (this.getChildAt(3));
        this.btn_energy = (this.getChildAt(4));
        this.btn_gold = (this.getChildAt(5));
        this.btn_rightgift = (this.getChildAt(6));
        this.n11 = (this.getChildAt(7));
        this.n12 = (this.getChildAt(8));
        this.btn_next = (this.getChildAt(9));
        this.btn_back = (this.getChildAt(10));
        this.btn_leftgift = (this.getChildAt(11));
        this.n10 = (this.getChildAt(12));
        this.n14 = (this.getChildAt(13));
        this.n15 = (this.getChildAt(14));
        this.t1 = this.getTransitionAt(0);
        this.t2 = this.getTransitionAt(1);
    };
    gamewinscene.URL = "ui://isxx5ak7seb11a";
    return gamewinscene;
}(fairygui.GComponent));
exports.default = gamewinscene;
},{}],111:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var getreward_btn = /** @class */ (function (_super) {
    __extends(getreward_btn, _super);
    function getreward_btn() {
        return _super.call(this) || this;
    }
    getreward_btn.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "getreward_btn"));
    };
    getreward_btn.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n17 = (this.getChildAt(0));
    };
    getreward_btn.URL = "ui://isxx5ak7np2abp";
    return getreward_btn;
}(fairygui.GButton));
exports.default = getreward_btn;
},{}],112:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var getreward_btnget = /** @class */ (function (_super) {
    __extends(getreward_btnget, _super);
    function getreward_btnget() {
        return _super.call(this) || this;
    }
    getreward_btnget.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "getreward_btnget"));
    };
    getreward_btnget.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.reward_num = (this.getChildAt(0));
        this.n13 = (this.getChildAt(1));
        this.n14 = (this.getChildAt(2));
    };
    getreward_btnget.URL = "ui://isxx5ak7mfc0bc";
    return getreward_btnget;
}(fairygui.GComponent));
exports.default = getreward_btnget;
},{}],113:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var goservice = /** @class */ (function (_super) {
    __extends(goservice, _super);
    function goservice() {
        return _super.call(this) || this;
    }
    goservice.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "goservice"));
    };
    goservice.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.button = this.getControllerAt(0);
        this.n0 = (this.getChildAt(0));
        this.n1 = (this.getChildAt(1));
    };
    goservice.URL = "ui://isxx5ak7k97h7q";
    return goservice;
}(fairygui.GButton));
exports.default = goservice;
},{}],114:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var guidefinger = /** @class */ (function (_super) {
    __extends(guidefinger, _super);
    function guidefinger() {
        return _super.call(this) || this;
    }
    guidefinger.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "guidefinger"));
    };
    guidefinger.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.c1 = this.getControllerAt(0);
        this.n2 = (this.getChildAt(0));
        this.n3 = (this.getChildAt(1));
        this.n1 = (this.getChildAt(2));
        this.n5 = (this.getChildAt(3));
        this.t0 = this.getTransitionAt(0);
        this.t1 = this.getTransitionAt(1);
    };
    guidefinger.URL = "ui://isxx5ak7arz367";
    return guidefinger;
}(fairygui.GComponent));
exports.default = guidefinger;
},{}],115:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var guidemask = /** @class */ (function (_super) {
    __extends(guidemask, _super);
    function guidemask() {
        return _super.call(this) || this;
    }
    guidemask.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "guidemask"));
    };
    guidemask.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n6 = (this.getChildAt(0));
        this.circle = (this.getChildAt(1));
        this.btn_down = (this.getChildAt(2));
        this.btn_up = (this.getChildAt(3));
        this.n14 = (this.getChildAt(4));
        this.n15 = (this.getChildAt(5));
        this.n16 = (this.getChildAt(6));
        this.n17 = (this.getChildAt(7));
        this.t1 = this.getTransitionAt(0);
        this.t3 = this.getTransitionAt(1);
    };
    guidemask.URL = "ui://isxx5ak7np2abs";
    return guidemask;
}(fairygui.GComponent));
exports.default = guidemask;
},{}],116:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var guidemaskcircle = /** @class */ (function (_super) {
    __extends(guidemaskcircle, _super);
    function guidemaskcircle() {
        return _super.call(this) || this;
    }
    guidemaskcircle.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "guidemaskcircle"));
    };
    guidemaskcircle.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.circle1 = (this.getChildAt(0));
        this.circle2 = (this.getChildAt(1));
    };
    guidemaskcircle.URL = "ui://isxx5ak7np2abw";
    return guidemaskcircle;
}(fairygui.GComponent));
exports.default = guidemaskcircle;
},{}],117:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var guidemaskclick = /** @class */ (function (_super) {
    __extends(guidemaskclick, _super);
    function guidemaskclick() {
        return _super.call(this) || this;
    }
    guidemaskclick.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "guidemaskclick"));
    };
    guidemaskclick.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n11 = (this.getChildAt(0));
    };
    guidemaskclick.URL = "ui://isxx5ak7np2ac3";
    return guidemaskclick;
}(fairygui.GComponent));
exports.default = guidemaskclick;
},{}],118:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var headicon = /** @class */ (function (_super) {
    __extends(headicon, _super);
    function headicon() {
        return _super.call(this) || this;
    }
    headicon.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "headicon"));
    };
    headicon.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.gload_head = (this.getChildAt(0));
        this.contain = (this.getChildAt(1));
    };
    headicon.URL = "ui://isxx5ak7pkb0ar";
    return headicon;
}(fairygui.GComponent));
exports.default = headicon;
},{}],119:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var item_com = /** @class */ (function (_super) {
    __extends(item_com, _super);
    function item_com() {
        return _super.call(this) || this;
    }
    item_com.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "item_com"));
    };
    item_com.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n0 = (this.getChildAt(0));
        this.itemicon = (this.getChildAt(1));
    };
    item_com.URL = "ui://isxx5ak7quq871";
    return item_com;
}(fairygui.GComponent));
exports.default = item_com;
},{}],120:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var item_level = /** @class */ (function (_super) {
    __extends(item_level, _super);
    function item_level() {
        return _super.call(this) || this;
    }
    item_level.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "item_level"));
    };
    item_level.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.state = this.getControllerAt(0);
        this.n14 = (this.getChildAt(0));
        this.n13 = (this.getChildAt(1));
        this.n15 = (this.getChildAt(2));
        this.level_title = (this.getChildAt(3));
        this.level_instructions = (this.getChildAt(4));
        this.n16 = (this.getChildAt(5));
        this.level_icon = (this.getChildAt(6));
    };
    item_level.URL = "ui://isxx5ak7seb11p";
    return item_level;
}(fairygui.GComponent));
exports.default = item_level;
},{}],121:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var itemmoregame = /** @class */ (function (_super) {
    __extends(itemmoregame, _super);
    function itemmoregame() {
        return _super.call(this) || this;
    }
    itemmoregame.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "itemmoregame"));
    };
    itemmoregame.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n0 = (this.getChildAt(0));
        this.n1 = (this.getChildAt(1));
        this.txt_num = (this.getChildAt(2));
        this.txt_name = (this.getChildAt(3));
    };
    itemmoregame.URL = "ui://isxx5ak7quq85s";
    return itemmoregame;
}(fairygui.GButton));
exports.default = itemmoregame;
},{}],122:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var itemrenderpanel = /** @class */ (function (_super) {
    __extends(itemrenderpanel, _super);
    function itemrenderpanel() {
        return _super.call(this) || this;
    }
    itemrenderpanel.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "itemrenderpanel"));
    };
    itemrenderpanel.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n0 = (this.getChildAt(0));
        this.item_icon = (this.getChildAt(1));
    };
    itemrenderpanel.URL = "ui://isxx5ak7quq870";
    return itemrenderpanel;
}(fairygui.GComponent));
exports.default = itemrenderpanel;
},{}],123:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var itemreward = /** @class */ (function (_super) {
    __extends(itemreward, _super);
    function itemreward() {
        return _super.call(this) || this;
    }
    itemreward.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "itemreward"));
    };
    itemreward.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.state = this.getControllerAt(0);
        this.n9 = (this.getChildAt(0));
        this.icon_img = (this.getChildAt(1));
        this.n8 = (this.getChildAt(2));
        this.reward_text = (this.getChildAt(3));
    };
    itemreward.URL = "ui://isxx5ak77suj20";
    return itemreward;
}(fairygui.GComponent));
exports.default = itemreward;
},{}],124:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var lobbyscene = /** @class */ (function (_super) {
    __extends(lobbyscene, _super);
    function lobbyscene() {
        return _super.call(this) || this;
    }
    lobbyscene.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "lobbyscene"));
    };
    lobbyscene.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n0 = (this.getChildAt(0));
        this.com_energy = (this.getChildAt(1));
        this.com_gold = (this.getChildAt(2));
        this.btn_open = (this.getChildAt(3));
        this.n24 = (this.getChildAt(4));
        this.n23 = (this.getChildAt(5));
        this.com_level = (this.getChildAt(6));
        this.btn_start = (this.getChildAt(7));
        this.btn_rank = (this.getChildAt(8));
        this.btn_gift = (this.getChildAt(9));
        this.btn_setting = (this.getChildAt(10));
        this.btn_img = (this.getChildAt(11));
        this.btn_lucky = (this.getChildAt(12));
        this.btn_more = (this.getChildAt(13));
        this.n22 = (this.getChildAt(14));
    };
    lobbyscene.URL = "ui://isxx5ak7u6cb0";
    return lobbyscene;
}(fairygui.GComponent));
exports.default = lobbyscene;
},{}],125:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var mustshare_btnok = /** @class */ (function (_super) {
    __extends(mustshare_btnok, _super);
    function mustshare_btnok() {
        return _super.call(this) || this;
    }
    mustshare_btnok.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "mustshare_btnok"));
    };
    mustshare_btnok.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n13 = (this.getChildAt(0));
        this.n14 = (this.getChildAt(1));
        this.n15 = (this.getChildAt(2));
    };
    mustshare_btnok.URL = "ui://isxx5ak7mfc0bh";
    return mustshare_btnok;
}(fairygui.GComponent));
exports.default = mustshare_btnok;
},{}],126:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var promotion_close = /** @class */ (function (_super) {
    __extends(promotion_close, _super);
    function promotion_close() {
        return _super.call(this) || this;
    }
    promotion_close.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "promotion_close"));
    };
    promotion_close.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n27 = (this.getChildAt(0));
        this.n28 = (this.getChildAt(1));
    };
    promotion_close.URL = "ui://isxx5ak7mfc0bf";
    return promotion_close;
}(fairygui.GComponent));
exports.default = promotion_close;
},{}],127:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var rankbtn1 = /** @class */ (function (_super) {
    __extends(rankbtn1, _super);
    function rankbtn1() {
        return _super.call(this) || this;
    }
    rankbtn1.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "rankbtn1"));
    };
    rankbtn1.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.button = this.getControllerAt(0);
        this.n0 = (this.getChildAt(0));
        this.n1 = (this.getChildAt(1));
        this.n3 = (this.getChildAt(2));
    };
    rankbtn1.URL = "ui://isxx5ak7pkb0aj";
    return rankbtn1;
}(fairygui.GButton));
exports.default = rankbtn1;
},{}],128:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var rankbtn2 = /** @class */ (function (_super) {
    __extends(rankbtn2, _super);
    function rankbtn2() {
        return _super.call(this) || this;
    }
    rankbtn2.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "rankbtn2"));
    };
    rankbtn2.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.button = this.getControllerAt(0);
        this.n0 = (this.getChildAt(0));
        this.n1 = (this.getChildAt(1));
        this.n3 = (this.getChildAt(2));
    };
    rankbtn2.URL = "ui://isxx5ak7nqrsb5";
    return rankbtn2;
}(fairygui.GButton));
exports.default = rankbtn2;
},{}],129:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var rankrender = /** @class */ (function (_super) {
    __extends(rankrender, _super);
    function rankrender() {
        return _super.call(this) || this;
    }
    rankrender.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "rankrender"));
    };
    rankrender.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.state = this.getControllerAt(0);
        this.rank3 = this.getControllerAt(1);
        this.n0 = (this.getChildAt(0));
        this.n2 = (this.getChildAt(1));
        this.gload_rank = (this.getChildAt(2));
        this.txt_name = (this.getChildAt(3));
        this.txt_score = (this.getChildAt(4));
        this.txt_rank = (this.getChildAt(5));
        this.gload_head = (this.getChildAt(6));
    };
    rankrender.URL = "ui://isxx5ak7pkb0am";
    return rankrender;
}(fairygui.GComponent));
exports.default = rankrender;
},{}],130:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var recommenditem = /** @class */ (function (_super) {
    __extends(recommenditem, _super);
    function recommenditem() {
        return _super.call(this) || this;
    }
    recommenditem.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "recommenditem"));
    };
    recommenditem.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n0 = (this.getChildAt(0));
        this.n1 = (this.getChildAt(1));
        this.txt_num = (this.getChildAt(2));
        this.txt_name = (this.getChildAt(3));
    };
    recommenditem.URL = "ui://isxx5ak7quq85m";
    return recommenditem;
}(fairygui.GButton));
exports.default = recommenditem;
},{}],131:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var shellscene = /** @class */ (function (_super) {
    __extends(shellscene, _super);
    function shellscene() {
        return _super.call(this) || this;
    }
    shellscene.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "shellscene"));
    };
    shellscene.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n49 = (this.getChildAt(0));
        this.btn_gold = (this.getChildAt(1));
        this.txt_level = (this.getChildAt(2));
        this.txt_time = (this.getChildAt(3));
        this.btn_tip = (this.getChildAt(4));
        this.rightcnt = (this.getChildAt(5));
        this.btn_back = (this.getChildAt(6));
        this.bg0 = (this.getChildAt(7));
        this.bg1 = (this.getChildAt(8));
        this.bg2 = (this.getChildAt(9));
        this.bg3 = (this.getChildAt(10));
        this.bg4 = (this.getChildAt(11));
        this.bgm = (this.getChildAt(12));
        this.txt_guidetips = (this.getChildAt(13));
    };
    shellscene.URL = "ui://isxx5ak77suj1w";
    return shellscene;
}(fairygui.GComponent));
exports.default = shellscene;
},{}],132:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var winaddfloat = /** @class */ (function (_super) {
    __extends(winaddfloat, _super);
    function winaddfloat() {
        return _super.call(this) || this;
    }
    winaddfloat.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "winaddfloat"));
    };
    winaddfloat.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n43 = (this.getChildAt(0));
        this.n21 = (this.getChildAt(1));
        this.btn_Close = (this.getChildAt(2));
        this.n30 = (this.getChildAt(3));
        this.n31 = (this.getChildAt(4));
        this.n32 = (this.getChildAt(5));
        this.n33 = (this.getChildAt(6));
        this.n34 = (this.getChildAt(7));
        this.n37 = (this.getChildAt(8));
        this.n41 = (this.getChildAt(9));
        this.n42 = (this.getChildAt(10));
    };
    winaddfloat.URL = "ui://isxx5ak7quq861";
    return winaddfloat;
}(fairygui.GComponent));
exports.default = winaddfloat;
},{}],133:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var winauthor = /** @class */ (function (_super) {
    __extends(winauthor, _super);
    function winauthor() {
        return _super.call(this) || this;
    }
    winauthor.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "winauthor"));
    };
    winauthor.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n1 = (this.getChildAt(0));
        this.btn_ok = (this.getChildAt(1));
        this.t2 = (this.getChildAt(2));
        this.t1 = (this.getChildAt(3));
    };
    winauthor.URL = "ui://isxx5ak7vni6b9";
    return winauthor;
}(fairygui.GComponent));
exports.default = winauthor;
},{}],134:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var wincollectiongame = /** @class */ (function (_super) {
    __extends(wincollectiongame, _super);
    function wincollectiongame() {
        return _super.call(this) || this;
    }
    wincollectiongame.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "wincollectiongame"));
    };
    wincollectiongame.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.state = this.getControllerAt(0);
        this.n1 = (this.getChildAt(0));
        this.n0 = (this.getChildAt(1));
        this.n2 = (this.getChildAt(2));
        this.n3 = (this.getChildAt(3));
        this.n18 = (this.getChildAt(4));
        this.n17 = (this.getChildAt(5));
        this.n13 = (this.getChildAt(6));
        this.n19 = (this.getChildAt(7));
        this.n21 = (this.getChildAt(8));
        this.anipanel = (this.getChildAt(9));
    };
    wincollectiongame.URL = "ui://isxx5ak7bxho9n";
    return wincollectiongame;
}(fairygui.GComponent));
exports.default = wincollectiongame;
},{}],135:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var wincsrewards = /** @class */ (function (_super) {
    __extends(wincsrewards, _super);
    function wincsrewards() {
        return _super.call(this) || this;
    }
    wincsrewards.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "wincsrewards"));
    };
    wincsrewards.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.btn_close = (this.getChildAt(0));
        this.n36 = (this.getChildAt(1));
        this.n37 = (this.getChildAt(2));
        this.n38 = (this.getChildAt(3));
        this.n39 = (this.getChildAt(4));
        this.n40 = (this.getChildAt(5));
        this.n41 = (this.getChildAt(6));
        this.n42 = (this.getChildAt(7));
        this.btn_Start = (this.getChildAt(8));
        this.n44 = (this.getChildAt(9));
        this.n45 = (this.getChildAt(10));
        this.t0 = this.getTransitionAt(0);
    };
    wincsrewards.URL = "ui://isxx5ak7quq868";
    return wincsrewards;
}(fairygui.GComponent));
exports.default = wincsrewards;
},{}],136:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var winenergyover = /** @class */ (function (_super) {
    __extends(winenergyover, _super);
    function winenergyover() {
        return _super.call(this) || this;
    }
    winenergyover.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "winenergyover"));
    };
    winenergyover.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n0 = (this.getChildAt(0));
        this.n8 = (this.getChildAt(1));
        this.n2 = (this.getChildAt(2));
        this.btn_close = (this.getChildAt(3));
        this.txt_tips = (this.getChildAt(4));
        this.btn_get = (this.getChildAt(5));
        this.n7 = (this.getChildAt(6));
        this.n9 = (this.getChildAt(7));
    };
    winenergyover.URL = "ui://isxx5ak7e0dy5a";
    return winenergyover;
}(fairygui.GComponent));
exports.default = winenergyover;
},{}],137:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var winfreeenergy = /** @class */ (function (_super) {
    __extends(winfreeenergy, _super);
    function winfreeenergy() {
        return _super.call(this) || this;
    }
    winfreeenergy.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "winfreeenergy"));
    };
    winfreeenergy.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n0 = (this.getChildAt(0));
        this.n8 = (this.getChildAt(1));
        this.n6 = (this.getChildAt(2));
        this.n7 = (this.getChildAt(3));
        this.btn_addmy = (this.getChildAt(4));
        this.btn_addfloat = (this.getChildAt(5));
        this.btn_service = (this.getChildAt(6));
        this.btn_Close = (this.getChildAt(7));
    };
    winfreeenergy.URL = "ui://isxx5ak7ubk717";
    return winfreeenergy;
}(fairygui.GComponent));
exports.default = winfreeenergy;
},{}],138:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var wingamefail = /** @class */ (function (_super) {
    __extends(wingamefail, _super);
    function wingamefail() {
        return _super.call(this) || this;
    }
    wingamefail.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "wingamefail"));
    };
    wingamefail.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n15 = (this.getChildAt(0));
        this.btn_energy = (this.getChildAt(1));
        this.btn_gold = (this.getChildAt(2));
        this.n7 = (this.getChildAt(3));
        this.btn_restart = (this.getChildAt(4));
        this.btn_back = (this.getChildAt(5));
        this.btn_delay = (this.getChildAt(6));
        this.n12 = (this.getChildAt(7));
        this.n13 = (this.getChildAt(8));
        this.n14 = (this.getChildAt(9));
        this.n16 = (this.getChildAt(10));
        this.n10 = (this.getChildAt(11));
        this.t0 = this.getTransitionAt(0);
    };
    wingamefail.URL = "ui://isxx5ak7h5b52b";
    return wingamefail;
}(fairygui.GComponent));
exports.default = wingamefail;
},{}],139:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var wingetreward = /** @class */ (function (_super) {
    __extends(wingetreward, _super);
    function wingetreward() {
        return _super.call(this) || this;
    }
    wingetreward.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "wingetreward"));
    };
    wingetreward.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.state = this.getControllerAt(0);
        this.n0 = (this.getChildAt(0));
        this.n13 = (this.getChildAt(1));
        this.n9 = (this.getChildAt(2));
        this.n1 = (this.getChildAt(3));
        this.other_icon = (this.getChildAt(4));
        this.reward_num = (this.getChildAt(5));
        this.btn_double_receive = (this.getChildAt(6));
        this.n10 = (this.getChildAt(7));
        this.btn_receive = (this.getChildAt(8));
        this.n14 = (this.getChildAt(9));
        this.n15 = (this.getChildAt(10));
        this.btn_close = (this.getChildAt(11));
        this.btn_nextmore = (this.getChildAt(12));
        this.n19 = (this.getChildAt(13));
        this.txt_nextmore = (this.getChildAt(14));
        this.n21 = (this.getChildAt(15));
        this.reward_nextmore = (this.getChildAt(16));
        this.t0 = this.getTransitionAt(0);
        this.t1 = this.getTransitionAt(1);
    };
    wingetreward.URL = "ui://isxx5ak7quq86r";
    return wingetreward;
}(fairygui.GComponent));
exports.default = wingetreward;
},{}],140:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var wingetreward_energy = /** @class */ (function (_super) {
    __extends(wingetreward_energy, _super);
    function wingetreward_energy() {
        return _super.call(this) || this;
    }
    wingetreward_energy.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "wingetreward_energy"));
    };
    wingetreward_energy.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.state = this.getControllerAt(0);
        this.n3 = (this.getChildAt(0));
        this.n4 = (this.getChildAt(1));
        this.n5 = (this.getChildAt(2));
    };
    wingetreward_energy.URL = "ui://isxx5ak7xsvo8j";
    return wingetreward_energy;
}(fairygui.GComponent));
exports.default = wingetreward_energy;
},{}],141:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var winlevel = /** @class */ (function (_super) {
    __extends(winlevel, _super);
    function winlevel() {
        return _super.call(this) || this;
    }
    winlevel.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "winlevel"));
    };
    winlevel.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n0 = (this.getChildAt(0));
        this.n7 = (this.getChildAt(1));
        this.n4 = (this.getChildAt(2));
        this.n5 = (this.getChildAt(3));
        this.level_list = (this.getChildAt(4));
        this.btn_Close = (this.getChildAt(5));
    };
    winlevel.URL = "ui://isxx5ak7seb11n";
    return winlevel;
}(fairygui.GComponent));
exports.default = winlevel;
},{}],142:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var winluckydraw = /** @class */ (function (_super) {
    __extends(winluckydraw, _super);
    function winluckydraw() {
        return _super.call(this) || this;
    }
    winluckydraw.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "winluckydraw"));
    };
    winluckydraw.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n5 = (this.getChildAt(0));
        this.com_gold = (this.getChildAt(1));
        this.com_energy = (this.getChildAt(2));
        this.btn_back = (this.getChildAt(3));
        this.list_luck = (this.getChildAt(4));
        this.n24 = (this.getChildAt(5));
        this.n22 = (this.getChildAt(6));
        this.n23 = (this.getChildAt(7));
        this.sel_box = (this.getChildAt(8));
        this.btn_moregame = (this.getChildAt(9));
        this.btn_luck = (this.getChildAt(10));
        this.luck_num = (this.getChildAt(11));
        this.n21 = (this.getChildAt(12));
    };
    winluckydraw.URL = "ui://isxx5ak77suj1y";
    return winluckydraw;
}(fairygui.GComponent));
exports.default = winluckydraw;
},{}],143:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var winmoregame = /** @class */ (function (_super) {
    __extends(winmoregame, _super);
    function winmoregame() {
        return _super.call(this) || this;
    }
    winmoregame.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "winmoregame"));
    };
    winmoregame.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n0 = (this.getChildAt(0));
        this.back_game = (this.getChildAt(1));
        this.n5 = (this.getChildAt(2));
        this.game_list = (this.getChildAt(3));
        this.n8 = (this.getChildAt(4));
        this.n9 = (this.getChildAt(5));
        this.n10 = (this.getChildAt(6));
        this.n11 = (this.getChildAt(7));
    };
    winmoregame.URL = "ui://isxx5ak77suj2v";
    return winmoregame;
}(fairygui.GComponent));
exports.default = winmoregame;
},{}],144:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var winmustshare = /** @class */ (function (_super) {
    __extends(winmustshare, _super);
    function winmustshare() {
        return _super.call(this) || this;
    }
    winmustshare.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "winmustshare"));
    };
    winmustshare.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n1 = (this.getChildAt(0));
        this.btn_ok = (this.getChildAt(1));
        this.t1 = (this.getChildAt(2));
        this.btn_share = (this.getChildAt(3));
    };
    winmustshare.URL = "ui://isxx5ak7mfc0bg";
    return winmustshare;
}(fairygui.GComponent));
exports.default = winmustshare;
},{}],145:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var winofflinebox = /** @class */ (function (_super) {
    __extends(winofflinebox, _super);
    function winofflinebox() {
        return _super.call(this) || this;
    }
    winofflinebox.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "winofflinebox"));
    };
    winofflinebox.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n10 = (this.getChildAt(0));
        this.n6 = (this.getChildAt(1));
        this.n1 = (this.getChildAt(2));
        this.n2 = (this.getChildAt(3));
        this.n3 = (this.getChildAt(4));
        this.n7 = (this.getChildAt(5));
        this.n8 = (this.getChildAt(6));
        this.n9 = (this.getChildAt(7));
        this.t0 = this.getTransitionAt(0);
        this.t1 = this.getTransitionAt(1);
    };
    winofflinebox.URL = "ui://isxx5ak7n6f69m";
    return winofflinebox;
}(fairygui.GComponent));
exports.default = winofflinebox;
},{}],146:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var winpromotionreward = /** @class */ (function (_super) {
    __extends(winpromotionreward, _super);
    function winpromotionreward() {
        return _super.call(this) || this;
    }
    winpromotionreward.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "winpromotionreward"));
    };
    winpromotionreward.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n9 = (this.getChildAt(0));
        this.n14 = (this.getChildAt(1));
        this.level_name_icon = (this.getChildAt(2));
        this.n12 = (this.getChildAt(3));
        this.n13 = (this.getChildAt(4));
        this.n24 = (this.getChildAt(5));
        this.n15 = (this.getChildAt(6));
        this.btn_promotion_reward = (this.getChildAt(7));
        this.n25 = (this.getChildAt(8));
        this.n29 = (this.getChildAt(9));
        this.n30 = (this.getChildAt(10));
    };
    winpromotionreward.URL = "ui://isxx5ak77suj2w";
    return winpromotionreward;
}(fairygui.GComponent));
exports.default = winpromotionreward;
},{}],147:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var winrank = /** @class */ (function (_super) {
    __extends(winrank, _super);
    function winrank() {
        return _super.call(this) || this;
    }
    winrank.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "winrank"));
    };
    winrank.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.state = this.getControllerAt(0);
        this.n1 = (this.getChildAt(0));
        this.btn_close = (this.getChildAt(1));
        this.n4 = (this.getChildAt(2));
        this.n5 = (this.getChildAt(3));
        this.n6 = (this.getChildAt(4));
        this.myrender = (this.getChildAt(5));
        this.n8 = (this.getChildAt(6));
        this.n9 = (this.getChildAt(7));
        this.n10 = (this.getChildAt(8));
    };
    winrank.URL = "ui://isxx5ak7ubk718";
    return winrank;
}(fairygui.GComponent));
exports.default = winrank;
},{}],148:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var winrecommend = /** @class */ (function (_super) {
    __extends(winrecommend, _super);
    function winrecommend() {
        return _super.call(this) || this;
    }
    winrecommend.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "winrecommend"));
    };
    winrecommend.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.state = this.getControllerAt(0);
        this.n0 = (this.getChildAt(0));
        this.btn_close = (this.getChildAt(1));
        this.game_list = (this.getChildAt(2));
        this.n4 = (this.getChildAt(3));
        this.n2 = (this.getChildAt(4));
    };
    winrecommend.URL = "ui://isxx5ak7quq85j";
    return winrecommend;
}(fairygui.GComponent));
exports.default = winrecommend;
},{}],149:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var winsetting = /** @class */ (function (_super) {
    __extends(winsetting, _super);
    function winsetting() {
        return _super.call(this) || this;
    }
    winsetting.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "winsetting"));
    };
    winsetting.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n0 = (this.getChildAt(0));
        this.btn_back = (this.getChildAt(1));
        this.n2 = (this.getChildAt(2));
        this.n3 = (this.getChildAt(3));
        this.sound_switch = (this.getChildAt(4));
        this.n15 = (this.getChildAt(5));
        this.n16 = (this.getChildAt(6));
        this.music_switch = (this.getChildAt(7));
        this.n19 = (this.getChildAt(8));
        this.n20 = (this.getChildAt(9));
        this.vibration_switch = (this.getChildAt(10));
        this.back_home = (this.getChildAt(11));
        this.btn_more = (this.getChildAt(12));
        this.n26 = (this.getChildAt(13));
    };
    winsetting.URL = "ui://isxx5ak77suj21";
    return winsetting;
}(fairygui.GComponent));
exports.default = winsetting;
},{}],150:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var wintreasurebox = /** @class */ (function (_super) {
    __extends(wintreasurebox, _super);
    function wintreasurebox() {
        return _super.call(this) || this;
    }
    wintreasurebox.createInstance = function () {
        return (fairygui.UIPackage.createObject("game", "wintreasurebox"));
    };
    wintreasurebox.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n10 = (this.getChildAt(0));
        this.n6 = (this.getChildAt(1));
        this.n1 = (this.getChildAt(2));
        this.n3 = (this.getChildAt(3));
        this.n7 = (this.getChildAt(4));
        this.n8 = (this.getChildAt(5));
        this.n9 = (this.getChildAt(6));
        this.n2 = (this.getChildAt(7));
        this.t0 = this.getTransitionAt(0);
        this.t1 = this.getTransitionAt(1);
    };
    wintreasurebox.URL = "ui://isxx5ak7e0dy3x";
    return wintreasurebox;
}(fairygui.GComponent));
exports.default = wintreasurebox;
},{}],151:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var com_icon = /** @class */ (function (_super) {
    __extends(com_icon, _super);
    function com_icon() {
        return _super.call(this) || this;
    }
    com_icon.createInstance = function () {
        return (fairygui.UIPackage.createObject("loading", "com_icon"));
    };
    com_icon.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.n18 = (this.getChildAt(0));
        this.search_img = (this.getChildAt(1));
        this.t0 = this.getTransitionAt(0);
    };
    com_icon.URL = "ui://irx2sm8qcn1u7";
    return com_icon;
}(fairygui.GComponent));
exports.default = com_icon;
},{}],152:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
Object.defineProperty(exports, "__esModule", { value: true });
var sceneloading_1 = require("./sceneloading");
var com_icon_1 = require("./com_icon");
var loadingBinder = /** @class */ (function () {
    function loadingBinder() {
    }
    loadingBinder.bindAll = function () {
        fairygui.UIObjectFactory.setPackageItemExtension(sceneloading_1.default.URL, sceneloading_1.default);
        fairygui.UIObjectFactory.setPackageItemExtension(com_icon_1.default.URL, com_icon_1.default);
    };
    return loadingBinder;
}());
exports.default = loadingBinder;
},{"./com_icon":151,"./sceneloading":154}],153:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var sceneloading = /** @class */ (function (_super) {
    __extends(sceneloading, _super);
    function sceneloading() {
        return _super.call(this) || this;
    }
    sceneloading.createInstance = function () {
        return (fairygui.UIPackage.createObject("loading", "sceneloading"));
    };
    sceneloading.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.state = this.getControllerAt(0);
        this.n3 = (this.getChildAt(0));
        this.txt_loading = (this.getChildAt(1));
        this.n8 = (this.getChildAt(2));
        this.n10 = (this.getChildAt(3));
        this.n16 = (this.getChildAt(4));
        this.n18 = (this.getChildAt(5));
        this.ver_text = (this.getChildAt(6));
        this.t0 = this.getTransitionAt(0);
    };
    sceneloading.URL = "ui://irx2sm8q7suj2";
    return sceneloading;
}(fairygui.GComponent));
exports.default = sceneloading;
},{}],154:[function(require,module,exports){
"use strict";
/** This is an automatically generated class by FairyGUI. Please do not modify it. **/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var sceneloading = /** @class */ (function (_super) {
    __extends(sceneloading, _super);
    function sceneloading() {
        return _super.call(this) || this;
    }
    sceneloading.createInstance = function () {
        return (fairygui.UIPackage.createObject("loading", "sceneloading"));
    };
    sceneloading.prototype.constructFromXML = function (xml) {
        _super.prototype.constructFromXML.call(this, xml);
        this.state = this.getControllerAt(0);
        this.n3 = (this.getChildAt(0));
        this.txt_loading = (this.getChildAt(1));
        this.n8 = (this.getChildAt(2));
        this.n10 = (this.getChildAt(3));
        this.n16 = (this.getChildAt(4));
        this.n18 = (this.getChildAt(5));
        this.ver_text = (this.getChildAt(6));
        this.t0 = this.getTransitionAt(0);
    };
    sceneloading.URL = "ui://irx2sm8q7suj2";
    return sceneloading;
}(fairygui.GComponent));
exports.default = sceneloading;
},{}],155:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var com_gameicon_1 = require("../fui/game/com_gameicon");
var TimeMgr_1 = require("../../control/TimeMgr");
var GameMgr_1 = require("../../control/game/GameMgr");
var IconAdComponetn = /** @class */ (function () {
    function IconAdComponetn() {
    }
    Object.defineProperty(IconAdComponetn, "Inst", {
        get: function () {
            if (!this._ins) {
                this._ins = new IconAdComponetn();
            }
            return this._ins;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param parent 添加到的容器
     * @param startY 开始的Y坐标
     * @param paramet {width:图标宽,height:图标高,lineSpacing:图标行距,columnSpacing:图标列距}
     * @param columnNum 列数
     * @param lineSpacing 行间距
     * @param columnSpacing 列间距
     * @param maxLen 最多的icon数
     * @param isBoth 是否是两侧边的广告，若为true，则列数强行为2行
     * @param bothInterval 到两侧边到icon的距离
     */
    IconAdComponetn.prototype.addSymmetryGameIcon = function (parent, startY, columnNum, paramet, maxLen, isBoth, bothInterval) {
        var _this = this;
        if (startY === void 0) { startY = 0; }
        if (columnNum === void 0) { columnNum = 1; }
        if (maxLen === void 0) { maxLen = 0; }
        if (isBoth === void 0) { isBoth = false; }
        if (bothInterval === void 0) { bothInterval = 20; }
        mpsdk.Ad.getSuggestList(true, maxLen, GameMgr_1.default.Inst.level)
            .then(function (data) {
            trace("开始创建广告图标:", data);
            var _loop_1 = function (i) {
                var itemIcon = com_gameicon_1.default.createInstance();
                itemIcon.width = paramet.width || 100;
                itemIcon.height = paramet.height || 100;
                if (isBoth) {
                    columnNum = 2; //如果是侧边广告则默认两列
                    itemIcon.x = i % columnNum == 0 ? bothInterval : parent.width - itemIcon.width - bothInterval;
                }
                else {
                    itemIcon.x = (parent.width - itemIcon.width * columnNum - paramet.columnSpacing * (columnNum - 1)) / 2 + i % columnNum * (itemIcon.width + paramet.columnSpacing);
                }
                itemIcon.y = startY + Math.floor(i / columnNum) * (itemIcon.width + paramet.lineSpacing);
                parent.addChild(itemIcon);
                //动态图
                // itemIcon.displayListContainer.addChild(mpsdk.ui.LayaADSingleUI.Create(data[i], 100, false));
                // if (data[i].icon.indexOf(".gif") >= 0) {
                itemIcon.n0.icon_img.url = data[i].icon;
                itemIcon.onClick(_this, function () {
                    mpsdk.Ad.click(data[i]);
                });
                // }
                setTimeout(function () {
                    TimeMgr_1.default.Inst.addTimeEvent(3000, TimeMgr_1.TimeBindType.Loop, function () {
                        itemIcon.t1.play(null, 1);
                    });
                }, Math.random() * 200);
            };
            for (var i = 0; i < data.length; i++) {
                _loop_1(i);
            }
        });
    };
    IconAdComponetn.prototype.addBuoyAd = function (parent, x, y) {
        var _this = this;
        if (!this.buoyAdIcon) {
            this.buoyAdIcon = com_gameicon_1.default.createInstance();
            this.buoyAdIcon.width = 100;
            this.buoyAdIcon.height = 100;
            this.buoyAdIcon.x = x;
            this.buoyAdIcon.y = y;
        }
        this.updateIcon();
        parent.addChild(this.buoyAdIcon);
        this.startTiming();
        setTimeout(function () {
            TimeMgr_1.default.Inst.addTimeEvent(3000, TimeMgr_1.TimeBindType.Loop, function () {
                _this.buoyAdIcon.t1.play(null, 1);
            });
        }, 200);
        return this.buoyAdIcon;
    };
    IconAdComponetn.prototype.updateIcon = function () {
        var _this = this;
        if (this.buoyAdIcon) {
            mpsdk.Ad.getRecommendInfo()
                .then(function (res) {
                _this.buoyAdIcon.n0.icon_img.url = res.icon;
                _this.nowIconData = res;
                _this.buoyAdIcon.offClick(_this, _this.clickIcon);
                _this.buoyAdIcon.onClick(_this, _this.clickIcon);
            });
        }
    };
    IconAdComponetn.prototype.clickIcon = function () {
        mpsdk.Ad.click(this.nowIconData);
    };
    IconAdComponetn.prototype.startTiming = function () {
        var UPDATE_TIME = 2000;
        TimeMgr_1.default.Inst.addTimeEvent(UPDATE_TIME, TimeMgr_1.TimeBindType.Loop, this.updateIcon, this);
    };
    IconAdComponetn.prototype.removeTiming = function () {
        TimeMgr_1.default.Inst.removeTimeEvent(this.updateIcon, this);
    };
    return IconAdComponetn;
}());
exports.default = IconAdComponetn;
var iconAdType;
(function (iconAdType) {
    iconAdType[iconAdType["both"] = 0] = "both";
    iconAdType[iconAdType["lineAndcolumn"] = 1] = "lineAndcolumn";
})(iconAdType = exports.iconAdType || (exports.iconAdType = {}));
},{"../../control/TimeMgr":27,"../../control/game/GameMgr":31,"../fui/game/com_gameicon":90}],156:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventMgr_1 = require("../../control/event/EventMgr");
var TimeMgr_1 = require("../../control/TimeMgr");
var EventDef_1 = require("../../def/EventDef");
var GameMgr_1 = require("../../control/game/GameMgr");
var TimeUtils_1 = require("../../../com/hw_utils/TimeUtils");
var GameDef_1 = require("../../def/GameDef");
var ViewMgr_1 = require("../../control/ViewMgr");
var ECurrencyType_1 = require("../../def/ECurrencyType");
var WinGetReward_1 = require("../windows/WinGetReward");
var WinEnergyOver_1 = require("../windows/WinEnergyOver");
var ProxyEnergyBtn = /** @class */ (function () {
    function ProxyEnergyBtn(view) {
        this.view = view;
        this.view.onClick(this, this._clickEnergy);
        this._updateCurrency();
        EventMgr_1.default.Inst.on(EventDef_1.default.GAME_CURRENCYCHANGE, this, this._updateCurrency);
        TimeMgr_1.default.Inst.addTimeEvent(1000, TimeMgr_1.TimeBindType.Loop, this._updateEnergyTime, this);
    }
    ProxyEnergyBtn.prototype._updateEnergyTime = function () {
        var hastime = GameMgr_1.default.Inst.getNextEnergyTime();
        this.view.txt_time.visible = hastime > 0;
        if (this.view.txt_time.visible) {
            this.view.txt_time.text = TimeUtils_1.default.getTimeMMSS(hastime);
        }
    };
    ProxyEnergyBtn.prototype._updateCurrency = function () {
        this._updateEnergyTxt(this.view);
        this._updateEnergyTime();
    };
    ProxyEnergyBtn.prototype._updateEnergyTxt = function (energy) {
        var energycnt = GameMgr_1.default.Inst.data.currency.energy;
        var txt;
        if (energycnt >= GameDef_1.default.ENERGYMAX) {
            txt = "已满";
            energy.state.selectedIndex = 1;
            energy.txt.text = energy.txt2.text = txt;
            energy.txt_min.text = "" + energycnt;
        }
        // else if (energycnt > GameDef.ENERGYMAX) {
        //     txt = "已满+" + (energycnt - GameDef.ENERGYMAX);
        //     energy.state.selectedIndex = 1;
        //     energy.txt.text = energy.txt2.text = txt;
        // }
        else {
            txt = "" + energycnt;
            energy.state.selectedIndex = 0;
            energy.txt.text = energy.txt2.text = txt;
            energy.txt_min.text = "" + energycnt;
        }
    };
    ProxyEnergyBtn.prototype._clickEnergy = function () {
        ViewMgr_1.default.Inst.showWindow(WinEnergyOver_1.WinEnergyOver);
    };
    ProxyEnergyBtn.prototype._getRewards = function () {
        ViewMgr_1.default.Inst.showWindow(WinGetReward_1.default, new WinGetReward_1.WinGetReward_Param(ECurrencyType_1.ECurrencyType.ENERGY, GameDef_1.default.ENERGYCLICK_ENERGY_NUM, true));
    };
    return ProxyEnergyBtn;
}());
exports.default = ProxyEnergyBtn;
},{"../../../com/hw_utils/TimeUtils":21,"../../control/TimeMgr":27,"../../control/ViewMgr":28,"../../control/event/EventMgr":29,"../../control/game/GameMgr":31,"../../def/ECurrencyType":36,"../../def/EventDef":40,"../../def/GameDef":41,"../windows/WinEnergyOver":169,"../windows/WinGetReward":173}],157:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EventMgr_1 = require("../../control/event/EventMgr");
var EventDef_1 = require("../../def/EventDef");
var hw_common_1 = require("../../../com/hw_common/hw_common");
var SoundDef_1 = require("../../def/SoundDef");
var GameMgr_1 = require("../../control/game/GameMgr");
var ECurrencyType_1 = require("../../def/ECurrencyType");
var ReportDef_1 = require("../../def/ReportDef");
var ProxyGoldBtn = /** @class */ (function () {
    function ProxyGoldBtn(view) {
        this.view = view;
        this.view.onClick(this, this._clickGold);
        this._updateCurrency();
        EventMgr_1.default.Inst.on(EventDef_1.default.GAME_CURRENCYCHANGE, this, this._updateCurrency);
    }
    ProxyGoldBtn.prototype._clickGold = function (e) {
        var _this = this;
        hw_common_1.default.platform.showModal("分享成功即可获得50金币", function () {
            _this._chooseShare();
        }, true, "领取", "取消");
        hw_common_1.default.sound.playSound(SoundDef_1.default.CLICK);
    };
    ProxyGoldBtn.prototype._chooseShare = function () {
        hw_common_1.default.share.normalGet({ shareid: ReportDef_1.default.SHARE_GOLDBTN, caller: this, success: this._getRewards });
    };
    ProxyGoldBtn.prototype._getRewards = function (e) {
        if (e === void 0) { e = null; }
        var adcnt = 50;
        hw_common_1.default.platform.showToast("金币+" + adcnt);
        GameMgr_1.default.Inst.addCurrency(ECurrencyType_1.ECurrencyType.GOLD, adcnt);
    };
    ProxyGoldBtn.prototype._updateCurrency = function () {
        this.view.txt.text = "" + GameMgr_1.default.Inst.data.currency.gold;
    };
    return ProxyGoldBtn;
}());
exports.default = ProxyGoldBtn;
},{"../../../com/hw_common/hw_common":2,"../../control/event/EventMgr":29,"../../control/game/GameMgr":31,"../../def/ECurrencyType":36,"../../def/EventDef":40,"../../def/ReportDef":43,"../../def/SoundDef":45}],158:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ViewUtils_1 = require("../../../com/hw_utils/ViewUtils");
/**
 * 代理组件基类
 * 降外面的显示对象传进来,进行功能上的代理操作
 */
var CompBase = /** @class */ (function () {
    function CompBase() {
    }
    CompBase.prototype.Init = function (view) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.view = view;
    };
    CompBase.prototype.Dispose = function () {
        ViewUtils_1.default.removeSelf(this.view);
    };
    return CompBase;
}());
exports.default = CompBase;
},{"../../../com/hw_utils/ViewUtils":22}],159:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 场景基类
 *
 */
var SceneBase = /** @class */ (function () {
    function SceneBase() {
    }
    SceneBase.prototype.init = function (param) {
        if (param === void 0) { param = null; }
    };
    SceneBase.prototype.show = function (param) {
        if (param === void 0) { param = null; }
        fairygui.GRoot.inst.addChild(this.view);
    };
    SceneBase.prototype.hide = function () {
        this.view.removeFromParent();
    };
    SceneBase.prototype.dispose = function () {
    };
    return SceneBase;
}());
exports.default = SceneBase;
},{}],160:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var SceneBase_1 = require("../SceneBase");
var gamescene_1 = require("../../fui/game/gamescene");
var GameRoot_1 = require("./component/GameRoot");
var LobbyScene_1 = require("../lobby/LobbyScene");
var ViewMgr_1 = require("../../../control/ViewMgr");
var ReportDef_1 = require("../../../def/ReportDef");
var GameMgr_1 = require("../../../control/game/GameMgr");
var EventMgr_1 = require("../../../control/event/EventMgr");
var EventDef_1 = require("../../../def/EventDef");
var SoundDef_1 = require("../../../def/SoundDef");
var ProxyGoldBtn_1 = require("../../proxy/ProxyGoldBtn");
var GameDef_1 = require("../../../def/GameDef");
var LoadMgr_1 = require("../../../control/LoadMgr");
var hw_common_1 = require("../../../../com/hw_common/hw_common");
var TimeMgr_1 = require("../../../control/TimeMgr");
var SharePointKeyDef_1 = require("../../../def/SharePointKeyDef");
var ViewUtils_1 = require("../../../../com/hw_utils/ViewUtils");
var GuideMgr_1 = require("../../../control/game/GuideMgr");
var GameScene = /** @class */ (function (_super) {
    __extends(GameScene, _super);
    function GameScene() {
        return _super.call(this) || this;
    }
    GameScene.prototype.init = function () {
        _super.prototype.init.call(this);
        this._initFui();
        this._addEvent();
        this._initComp();
        this._updateHelpBtn();
    };
    GameScene.prototype.show = function (iscomp) {
        if (iscomp === void 0) { iscomp = false; }
        _super.prototype.show.call(this);
        this._gameRoot.Start();
        this._hideBanner(true);
        this._updateLinkIcon();
        this._starthelpAni();
        this._showBeyond();
        TimeMgr_1.default.Inst.addTimeEvent(10000, TimeMgr_1.TimeBindType.Loop, this._updateLinkIcon, this);
    };
    //排行榜示例
    GameScene.prototype._showBeyond = function () {
        if (GameMgr_1.default.Inst.level < 2) {
            return;
        }
        var topy = this.view.btn_tip.localToGlobal(0, 0).y;
        hw_common_1.default.platform.postMessage({ command: "close" });
        hw_common_1.default.platform.postMessage({ command: "beyond", value: GameMgr_1.default.Inst.level, top: topy + 10 });
        this.view.displayListContainer.addChild(hw_common_1.default.platform.getShareSprite(2000));
    };
    GameScene.prototype.hide = function () {
        _super.prototype.hide.call(this);
        this._gameRoot.Stop();
        this._showBanner();
        hw_common_1.default.platform.postMessage({ command: "close" });
        ViewUtils_1.default.removeSelf(hw_common_1.default.platform.getShareSprite());
        ViewUtils_1.default.removeSelf(GuideMgr_1.default.Inst.GuideFinger);
        TimeMgr_1.default.Inst.removeTimeEvent(this._onSecLoop, this);
        TimeMgr_1.default.Inst.removeTimeEvent(this._updateLinkIcon, this);
    };
    GameScene.prototype._starthelpAni = function () {
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this._onStageDown);
        TimeMgr_1.default.Inst.addTimeEvent(1000, TimeMgr_1.TimeBindType.Loop, this._onSecLoop, this);
        this._onStageDown();
    };
    GameScene.prototype._onSecLoop = function () {
        if (Date.now() - this._helpAniTM >= GameDef_1.default.GAMEHELPANIDELAY) {
            this._onStageDown();
            this._showHelpAni();
        }
    };
    GameScene.prototype._showHelpAni = function () {
        if (GameMgr_1.default.Inst.level <= 1) {
            this._gameRoot.ExeHelp(true);
        }
        else {
            this._playHelpAni();
        }
    };
    GameScene.prototype._playHelpAni = function () {
        var _this = this;
        Laya.Tween.clearAll(this.view.btn_tip);
        Laya.Tween.to(this.view.btn_tip, { scaleX: 1.15, scaleY: 1.15 }, 200, null, Laya.Handler.create(this, function () {
            Laya.Tween.to(_this.view.btn_tip, { scaleX: 1, scaleY: 1 }, 200, null, Laya.Handler.create(_this, function () {
                Laya.Tween.to(_this.view.btn_tip, { scaleX: 1.15, scaleY: 1.15 }, 200, null, Laya.Handler.create(_this, function () {
                    Laya.Tween.to(_this.view.btn_tip, { scaleX: 1, scaleY: 1 }, 200, null, Laya.Handler.create(_this, function () {
                        Laya.Tween.to(_this.view.btn_tip, { scaleX: 1.15, scaleY: 1.15 }, 200, null, Laya.Handler.create(_this, function () {
                            Laya.Tween.to(_this.view.btn_tip, { scaleX: 1, scaleY: 1 }, 200, null, Laya.Handler.create(_this, function () {
                            }));
                        }));
                    }));
                }));
            }));
        }));
    };
    GameScene.prototype._onStageDown = function () {
        this._helpAniTM = Date.now();
    };
    GameScene.prototype._failCloseBanner = function () {
        if (ViewMgr_1.default.Inst.stageHeight < GameDef_1.default.GAMINGBANNERHEIGHT) {
            hw_common_1.default.platform.showBannerAd(false);
        }
        else {
            hw_common_1.default.platform.showBannerAd(true);
        }
    };
    GameScene.prototype._showBanner = function () {
        if (ViewMgr_1.default.Inst.stageHeight < GameDef_1.default.GAMINGBANNERHEIGHT) {
            hw_common_1.default.platform.showBannerAd(true);
        }
    };
    GameScene.prototype._hideBanner = function (refresh) {
        if (refresh === void 0) { refresh = false; }
        if (ViewMgr_1.default.Inst.stageHeight < GameDef_1.default.GAMINGBANNERHEIGHT) {
            hw_common_1.default.platform.showBannerAd(false);
        }
        if (refresh && GameMgr_1.default.Inst.passlevelRefreshBanner == GameDef_1.default.BANNERREFRESHBYGAME) {
            hw_common_1.default.platform.refreshBanner();
            GameMgr_1.default.Inst.passlevelRefreshBanner = 0;
        }
    };
    GameScene.prototype._initComp = function () {
        this._gameRoot = new GameRoot_1.default();
        this._gameRoot.Init(this.view);
        new ProxyGoldBtn_1.default(this.view.btn_gold);
    };
    GameScene.prototype._initFui = function () {
        this.view = gamescene_1.default.createInstance();
        this.view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        fairygui.GRoot.inst.addChild(this.view);
    };
    GameScene.prototype._addEvent = function () {
        this.view.btn_back.onClick(this, this._clickBack);
        this.view.btn_tip.onClick(this, this._clickHelp);
        this.view.btn_share.onClick(this, this._clickShare);
        EventMgr_1.default.Inst.on(EventDef_1.default.UI_WINFAILVIDEOOK, this, this._failCloseBanner);
        EventMgr_1.default.Inst.on(EventDef_1.default.UI_WINFAILRESTART, this, this._failCloseBanner);
    };
    GameScene.prototype._clickBack = function (e) {
        ViewMgr_1.default.Inst.showScene(LobbyScene_1.default);
        hw_common_1.default.sound.playSound(SoundDef_1.default.CLICK);
    };
    GameScene.prototype._updateHelpBtn = function () {
        this._canShare = hw_common_1.default.share.canShare(SharePointKeyDef_1.default.QIUZHU);
        if (this._canShare) {
            this.view.btn_tip.c1.selectedIndex = 0;
        }
        else {
            this.view.btn_tip.c1.selectedIndex = 1;
        }
    };
    GameScene.prototype._updateLinkIcon = function () {
        var _this = this;
        mpsdk.Ad.getSuggestList(false, 2, GameMgr_1.default.Inst.level).then(function (list) {
            for (var i = 1; i <= 1; i++) {
                if (list && list[i]) {
                    var data = list[i];
                    _this.view["linkicon_" + i].n0.item_icon.url = data.icon;
                    _this.view["linkicon_" + i].onClick(_this, _this._clickLinkIcon, [_this.view["linkicon_" + i], data]);
                }
            }
        });
    };
    GameScene.prototype._clickLinkIcon = function (target, data) {
        mpsdk.Ad.click(data);
        target.offClick(this, this._clickLinkIcon);
        this._updateLinkIcon();
        hw_common_1.default.mpsdk.reportEvent(ReportDef_1.default.EVENT_GAMELINKICON);
    };
    GameScene.prototype._getRewards = function (e) {
        if (e === void 0) { e = null; }
        this._gameRoot.Pause = false;
        this._updateHelpBtn();
        this._gameRoot.ExeHelp(false);
    };
    GameScene.prototype._failShare = function () {
        this._updateHelpBtn();
        this._gameRoot.Pause = false;
    };
    GameScene.prototype._clickShare = function (e) {
        hw_common_1.default.platform._share(ReportDef_1.default.SHARE_GAMESHARE, null, function () {
            hw_common_1.default.platform.showToast("恭喜你，你已成功分享给好友");
        }, function () {
        }, { mothed: this._sharefun, thisarg: this });
        hw_common_1.default.sound.playSound(SoundDef_1.default.CLICK);
    };
    GameScene.prototype._sharefun = function () {
        var urllist = LoadMgr_1.default.Inst.getLevelImage(GameMgr_1.default.Inst.levelConfig);
        var url = urllist[0];
        var info = mpsdk.Share.commonShare({ serial: ReportDef_1.default.SHARE_OTHER, params: null, imageId: 0, image: url, title: "@你 又会了一个新成语，来看看你会几个！" }, null, null, this);
        info.imageUrl = url;
        hw_common_1.default.platform.shareAppMessage(info);
    };
    GameScene.prototype._clickHelp = function (e) {
        this._gameRoot.Pause = true;
        if (platform.debug) {
            this._getRewards();
        }
        else {
            this._chooseShare();
        }
        hw_common_1.default.sound.playSound(SoundDef_1.default.CLICK);
    };
    GameScene.prototype._chooseShare = function () {
        hw_common_1.default.share.normalGet({
            shareid: ReportDef_1.default.SHARE_GAMEHELP,
            sharekey: SharePointKeyDef_1.default.QIUZHU,
            caller: this,
            success: this._getRewards,
            fail: this._failShare
        });
    };
    return GameScene;
}(SceneBase_1.default));
exports.default = GameScene;
},{"../../../../com/hw_common/hw_common":2,"../../../../com/hw_utils/ViewUtils":22,"../../../control/LoadMgr":25,"../../../control/TimeMgr":27,"../../../control/ViewMgr":28,"../../../control/event/EventMgr":29,"../../../control/game/GameMgr":31,"../../../control/game/GuideMgr":32,"../../../def/EventDef":40,"../../../def/GameDef":41,"../../../def/ReportDef":43,"../../../def/SharePointKeyDef":44,"../../../def/SoundDef":45,"../../fui/game/gamescene":108,"../../proxy/ProxyGoldBtn":157,"../SceneBase":159,"../lobby/LobbyScene":164,"./component/GameRoot":161}],161:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var CompBase_1 = require("../../CompBase");
var GameMgr_1 = require("../../../../control/game/GameMgr");
var LoadMgr_1 = require("../../../../control/LoadMgr");
var LoadDef_1 = require("../../../../def/LoadDef");
var com_img1_1 = require("../../../fui/game/com_img1");
var GameDef_1 = require("../../../../def/GameDef");
var com_imgright_1 = require("../../../fui/game/com_imgright");
var com_imgwrong_1 = require("../../../fui/game/com_imgwrong");
var TimeMgr_1 = require("../../../../control/TimeMgr");
var ViewMgr_1 = require("../../../../control/ViewMgr");
var WinGameFail_1 = require("../../../windows/WinGameFail");
var EventMgr_1 = require("../../../../control/event/EventMgr");
var EventDef_1 = require("../../../../def/EventDef");
var com_wrongnum_1 = require("../../../fui/game/com_wrongnum");
var com_imgdebug_1 = require("../../../fui/game/com_imgdebug");
var GuideMgr_1 = require("../../../../control/game/GuideMgr");
var EGuideID_1 = require("../../../../def/EGuideID");
var SoundDef_1 = require("../../../../def/SoundDef");
var ReportDef_1 = require("../../../../def/ReportDef");
var TimeUtils_1 = require("../../../../../com/hw_utils/TimeUtils");
var hw_common_1 = require("../../../../../com/hw_common/hw_common");
var GameRoot = /** @class */ (function (_super) {
    __extends(GameRoot, _super);
    function GameRoot() {
        var _this = _super.call(this) || this;
        _this.TIMECOLOR_NORMAL = "#4849B0";
        _this.TIMECOLOR_WRONG = "#ff0000";
        _this._answerList = [];
        _this._rightPool = [];
        _this._wrongPool = [];
        _this._wrongNumPool = [];
        _this._rightAniPool = [];
        _this._pause = false;
        _this._helptCnt = 0; //求助次数;
        return _this;
    }
    Object.defineProperty(GameRoot.prototype, "Pause", {
        set: function (b) {
            this._pause = b;
        },
        enumerable: true,
        configurable: true
    });
    GameRoot.prototype.Init = function (view) {
        _super.prototype.Init.call(this, view);
        this._addEvent();
    };
    GameRoot.prototype.Start = function () {
        this._pause = false;
        this._helptCnt = 0;
        this.view.guidemask.visible = false;
        this._clearAllPanel();
        this._updateData();
        this._updateImage();
        this._updateTimer();
        this._updateDebug();
        this._updateGuide();
        TimeMgr_1.default.Inst.addTimeEvent(1000, TimeMgr_1.TimeBindType.Loop, this._updateTimer, this);
        hw_common_1.default.mpsdk.reportEvent(ReportDef_1.default.EVENT_INGAME, this._levelConfig.id + "");
    };
    GameRoot.prototype.ExeHelp = function (free) {
        if (!free)
            this._helptCnt++;
        this._showGuide();
    };
    GameRoot.prototype._updateGuide = function () {
        var showguide = GuideMgr_1.default.Inst.GuideShowById(EGuideID_1.EGuideID.GameLevel1);
        if (!showguide) {
            this.view.txt_guidetips.visible = false;
            return;
        }
        var index = this._answerList.length + 1;
        var level1 = 1, level3 = 3, level5 = GameDef_1.default.LEVELMAXANSWER;
        if (index < level3) {
            this.view.txt_guidetips.text = "这是第" + index + "个不同,请点击手指引导的位置";
            this._showGuide();
        }
        else if (index >= level5) {
            GuideMgr_1.default.Inst.GuideOver(EGuideID_1.EGuideID.GameLevel1);
        }
        hw_common_1.default.mpsdk.reportEvent(ReportDef_1.default.EVENT_NEW_LEVLE1, this._answerList.length + "");
    };
    GameRoot.prototype._showGuide = function () {
        for (var i = 1; i <= GameDef_1.default.LEVELMAXANSWER; i++) {
            if (this._checkAnswered(i)) {
                continue;
            }
            var point = this._getPointFromConfig(i);
            var centerpoint = this._getCenterPoint(point);
            var gp = this.view.word_img2.panel.localToGlobal(centerpoint.x, centerpoint.y);
            this.view.guidemask.circle.x = gp.x;
            this.view.guidemask.circle.y = gp.y;
            // if (this._levelConfig.id == 1 && this._answerList.length < 2) {
            this.view.guidemask.setMask(this.view.guidemask.circle.displayObject, true);
            this.view.guidemask.visible = true;
            // } else {
            // 	this.view.addChild(GuideMgr.Inst.GuideFinger);
            // 	GuideMgr.Inst.GuideFinger.x = gp.x;
            // 	GuideMgr.Inst.GuideFinger.y = gp.y;
            // 	GuideMgr.Inst.GuideFinger.touchable = false;
            // 	GuideMgr.Inst.GuideFinger.c1.selectedIndex = 1;
            // }
            return;
        }
    };
    GameRoot.prototype._getPointFromConfig = function (index) {
        var point = this._levelConfig["point" + index].concat();
        if (point.length == 2) {
            point.push(GameDef_1.default.LEVELDEFAULTLEN);
        }
        return point;
    };
    GameRoot.prototype._updateDebug = function () {
        if (!hw_common_1.default.config.gm_open)
            return;
        for (var i = 1; i <= GameDef_1.default.LEVELMAXANSWER; i++) {
            var point = this._getPointFromConfig(i);
            var debug = com_imgdebug_1.default.createInstance();
            if (point.length == 3) {
                debug.c1.selectedIndex = 0;
                this.view.word_img1.panel.addChild(debug);
                debug.x = point[0];
                debug.y = point[1];
                debug.width = debug.height = point[2] * 2;
            }
            else if (point.length == 4) {
                debug.c1.selectedIndex = 1;
                this.view.word_img1.panel.addChild(debug);
                debug.x = point[0] + point[2] / 2;
                debug.y = point[1] + point[3] / 2;
                debug.width = point[2];
                debug.height = point[3];
            }
        }
    };
    GameRoot.prototype._addEvent = function () {
        this.view.word_img1.touchable = true;
        this.view.word_img1.on(Laya.Event.MOUSE_DOWN, this, this._clkImage);
        this.view.word_img2.on(Laya.Event.MOUSE_DOWN, this, this._clkImage);
        this.view.guidemask.btn_down.on(Laya.Event.MOUSE_DOWN, this, this._clkMask);
        this.view.guidemask.btn_up.on(Laya.Event.MOUSE_DOWN, this, this._clkMask);
        EventMgr_1.default.Inst.on(EventDef_1.default.UI_WINFAILVIDEOOK, this, this._getReward);
        EventMgr_1.default.Inst.on(EventDef_1.default.UI_WINFAILRESTART, this, this._onRestart);
    };
    GameRoot.prototype._onRestart = function () {
        this.Start();
    };
    GameRoot.prototype._getReward = function () {
        this._pause = false;
        this._leveltime = GameDef_1.default.LEVELVIDEODELAY * 1000;
        TimeMgr_1.default.Inst.addTimeEvent(1000, TimeMgr_1.TimeBindType.Loop, this._updateTimer, this);
    };
    GameRoot.prototype._clkMask = function (e) {
        var target = com_img1_1.default.cast(e.currentTarget);
        var targetimage;
        if (target == this.view.guidemask.btn_up) {
            targetimage = this.view.word_img1;
        }
        else {
            targetimage = this.view.word_img2;
        }
        var localpoint = targetimage.globalToLocal(target.x, target.y);
        this._checkAnswer(localpoint, targetimage);
    };
    GameRoot.prototype._clkImage = function (e) {
        if (this._pause)
            return;
        var target = com_img1_1.default.cast(e.currentTarget);
        var localpoint = target.globalToLocal(e.stageX, e.stageY);
        this._checkAnswer(localpoint, target);
    };
    GameRoot.prototype._checkAnswer = function (localpoint, target) {
        for (var i = 1; i <= GameDef_1.default.LEVELMAXANSWER; i++) {
            if (this._checkAnswered(i)) {
                continue;
            }
            var point = this._getPointFromConfig(i);
            ;
            var right = false;
            if (point.length == 3) {
                right = this._checkCircle(localpoint, point);
            }
            else if (point.length == 4) {
                right = this._checkRect(localpoint, point);
            }
            if (right) {
                this._answerRight(i, target);
                return;
            }
        }
        this._answerWrong(localpoint, target);
    };
    GameRoot.prototype._answerWrong = function (point, target) {
        this._wrongAni(point, target);
        this._wrongnumAni(point, target);
        hw_common_1.default.platform.vibrateLong();
        hw_common_1.default.sound.playSound(SoundDef_1.default.WRONG);
    };
    GameRoot.prototype._wrongAni = function (point, target) {
        var _this = this;
        var com_wrong = this._getWrongInst();
        Laya.Tween.clearAll(com_wrong);
        target.panel.addChildAt(com_wrong, 0);
        com_wrong.x = point.x;
        com_wrong.y = point.y;
        com_wrong.scaleX = com_wrong.scaleY = com_wrong.alpha = 1;
        Laya.Tween.to(com_wrong, { scaleX: 0, scaleY: 0, alpha: 0 }, 400, null, Laya.Handler.create(this, function () {
            com_wrong.removeFromParent();
            _this._wrongPool.push(com_wrong);
        }));
    };
    GameRoot.prototype._rightAni = function (localpoint, target) {
        var _this = this;
        var targetitem = this.view.rightcnt["r" + this.view.rightcnt.state.selectedIndex];
        if (!targetitem)
            return;
        var gp = target.localToGlobal(localpoint.x, localpoint.y);
        var point = this.view.globalToLocal(gp.x, gp.y);
        var targetgobal = targetitem.localToGlobal(targetitem.width / 2, targetitem.height / 2);
        var targetpoint = this.view.globalToLocal(targetgobal.x, targetgobal.y);
        var toy1 = point.y - 50;
        var com_wrong = this._getRightAniInst();
        Laya.Tween.clearAll(com_wrong);
        Laya.Tween.clearAll(targetitem);
        this.view.addChild(com_wrong);
        com_wrong.x = point.x;
        com_wrong.y = point.y;
        com_wrong.scaleX = com_wrong.scaleY = 0;
        targetitem.scaleX = targetitem.scaleY = 0;
        var partical = this._getPartical();
        this.view.displayObject.addChild(partical);
        partical.x = com_wrong.x;
        partical.y = com_wrong.y;
        partical.emitter.start(1.2);
        partical.play();
        Laya.Tween.to(partical, { x: targetpoint.x, y: targetpoint.y }, 400, null, Laya.Handler.create(this, function () {
            partical.removeSelf();
            partical.stop();
            partical.destroy(true);
        }), 500);
        Laya.Tween.to(com_wrong, { scaleX: 1, scaleY: 1, y: toy1 }, 500, null, Laya.Handler.create(this, function () {
            Laya.Tween.to(com_wrong, { scaleX: 0, scaleY: 0, x: targetpoint.x, y: targetpoint.y }, 400, null, Laya.Handler.create(_this, function () {
                com_wrong.removeFromParent();
                _this._rightAniPool.push(com_wrong);
                _this._leveltime < 0 && (_this._leveltime = 0);
                Laya.Tween.to(targetitem, { scaleX: 1, scaleY: 1 }, 300, Laya.Ease.backOut);
            }));
        }));
    };
    GameRoot.prototype._wrongnumAni = function (localpoint, target) {
        var _this = this;
        var gp = target.localToGlobal(localpoint.x, localpoint.y);
        var point = this.view.globalToLocal(gp.x, gp.y);
        var toy1 = point.y - 50;
        var tox2 = this.view.txt_time.x + this.view.txt_time.width / 2;
        var toy2 = this.view.txt_time.y + this.view.txt_time.height / 2;
        var com_wrong = this._getWrongNumInst();
        Laya.Tween.clearAll(com_wrong);
        this.view.addChild(com_wrong);
        this.view.txt_time.color = this.TIMECOLOR_WRONG;
        com_wrong.x = point.x;
        com_wrong.y = point.y;
        com_wrong.scaleX = com_wrong.scaleY = 0;
        Laya.Tween.to(com_wrong, { scaleX: 1, scaleY: 1, y: toy1 }, 500, null, Laya.Handler.create(this, function () {
            Laya.Tween.to(com_wrong, { scaleX: 0, scaleY: 0, x: tox2, y: toy2 }, 400, null, Laya.Handler.create(_this, function () {
                com_wrong.removeFromParent();
                _this._wrongNumPool.push(com_wrong);
                _this._leveltime -= GameDef_1.default.LEVELWRONGDECTIME * 1000;
                _this._leveltime < 0 && (_this._leveltime = 0);
                _this.view.txt_time.color = _this.TIMECOLOR_NORMAL;
            }));
        }));
    };
    GameRoot.prototype._getCenterPoint = function (plist) {
        if (plist.length == 4) {
            return new Laya.Point(plist[0] + plist[2] / 2, plist[1] + plist[3] / 2);
        }
        else {
            return new Laya.Point(plist[0], plist[1]);
        }
    };
    GameRoot.prototype._answerRight = function (index, target) {
        this._answerList.push(index);
        this.view.rightcnt.state.selectedIndex = this._answerList.length;
        var point = this._levelConfig["point" + index];
        var centerpoint = this._getCenterPoint(point);
        this._addRight(this.view.word_img1.panel, centerpoint);
        this._addRight(this.view.word_img2.panel, centerpoint);
        if (this._answerList.length >= 5) {
            this._win();
        }
        hw_common_1.default.platform.vibrateShort();
        this._rightGuide();
        this._rightAni(centerpoint, target);
        hw_common_1.default.sound.playSound(SoundDef_1.default["RIGHT" + this._answerList.length]);
    };
    GameRoot.prototype._rightGuide = function () {
        var _this = this;
        var has = GameDef_1.default.LEVELMAXANSWER - this._answerList.length;
        this.view.txt_guidetips.text = "很好,再找出" + has + "个不同就能过关了";
        GuideMgr_1.default.Inst.GuideFinger.removeFromParent();
        this.view.guidemask.visible = false;
        if (this._levelConfig.id == 1 && this._answerList.length < 2) {
            this._updateGuide();
        }
        else {
            TimeMgr_1.default.Inst.addTimeEvent(2000, TimeMgr_1.TimeBindType.Delay, function () {
                _this._updateGuide();
            }, this);
        }
    };
    GameRoot.prototype._addRight = function (panel, point) {
        var com_right = this._getRightInst();
        panel.addChildAt(com_right, 0);
        com_right.x = point.x;
        com_right.y = point.y;
    };
    GameRoot.prototype._getRightInst = function () {
        var cmr;
        if (this._rightPool.length > 0) {
            cmr = this._rightPool.pop();
        }
        else {
            cmr = com_imgright_1.default.createInstance();
        }
        cmr.c1.selectedIndex = 0;
        cmr.scaleX = cmr.scaleY = 1;
        cmr.touchable = false;
        return cmr;
    };
    GameRoot.prototype._getWrongInst = function () {
        if (this._wrongPool.length > 0) {
            return this._wrongPool.pop();
        }
        var cmr = com_imgwrong_1.default.createInstance();
        cmr.touchable = false;
        return cmr;
    };
    GameRoot.prototype._getWrongNumInst = function () {
        if (this._wrongNumPool.length > 0) {
            return this._wrongNumPool.pop();
        }
        var cmr = com_wrongnum_1.default.createInstance();
        cmr.txt.text = "-20";
        cmr.touchable = false;
        return cmr;
    };
    GameRoot.prototype._getRightAniInst = function () {
        if (this._rightAniPool.length > 0) {
            return this._rightAniPool.pop();
        }
        var cmr = new fairygui.GLoader();
        cmr.url = "ui://game/tickmark";
        cmr.autoSize = true;
        cmr.setPivot(0.5, 0.5, true);
        return cmr;
    };
    //laya粒子不能用对象池,会有显示问题
    GameRoot.prototype._getPartical = function () {
        var pset = Laya.loader.getRes(LoadDef_1.default.PATICLE_TRAIL_SETTING);
        pset.textureName = LoadDef_1.default.PATICLE_TRAIL_PNG;
        pset.maxPartices = 180;
        var partical = new Laya.Particle2D(pset);
        return partical;
    };
    GameRoot.prototype._checkAnswered = function (i) {
        return this._answerList.indexOf(i) >= 0;
    };
    GameRoot.prototype._checkCircle = function (localpoint, circlepoint) {
        var decx = circlepoint[0] - localpoint.x;
        var decy = circlepoint[1] - localpoint.y;
        var circlelen = circlepoint[2] * circlepoint[2];
        var declen = decx * decx + decy * decy;
        return declen <= circlelen;
    };
    GameRoot.prototype._checkRect = function (localpoint, rectpoint) {
        if (localpoint.x > rectpoint[0] && localpoint.x < (rectpoint[0] + rectpoint[2]) &&
            localpoint.y > rectpoint[1] && localpoint.y < (rectpoint[1] + rectpoint[3])) {
            return true;
        }
        return false;
    };
    GameRoot.prototype._updateData = function () {
        this._levelConfig = GameMgr_1.default.Inst.levelConfig;
        this._answerList = [];
        this.view.rightcnt.state.selectedIndex = this._answerList.length;
        this._leveltime = this._levelConfig.time * 1000;
        this.view.txt_level.text = "第 " + this._levelConfig.id + " 关";
    };
    GameRoot.prototype._updateImage = function () {
        var urllist = LoadMgr_1.default.Inst.getLevelImage(this._levelConfig);
        var img1 = urllist[0];
        var img2 = urllist[1];
        this.view.word_img1.imgloader.img.url = img1;
        this.view.word_img2.imgloader.img.url = img2;
    };
    GameRoot.prototype._updateTimer = function (delay) {
        var _this = this;
        if (delay === void 0) { delay = 0; }
        if (this._pause)
            return;
        this._leveltime -= 1000;
        this._playSound();
        var fmttime = TimeUtils_1.default.getTimeMMSS(this._leveltime);
        var second30 = 30000;
        this.view.txt_time.text = fmttime;
        this.view.txt_time.color = this.TIMECOLOR_NORMAL;
        if (this._leveltime <= 0) {
            hw_common_1.default.platform.showToast("时间到");
            this._pause = true;
            Laya.timer.once(2000, this, function () {
                _this._lost();
            });
            return;
        }
    };
    GameRoot.prototype._playSound = function () {
        var second30 = 30000;
        var second10 = 10000;
        if (this._leveltime >= 0 && this._leveltime < second10) {
            hw_common_1.default.sound.playSound(SoundDef_1.default.SECOND10);
        }
        else if (this._leveltime == second30) {
            hw_common_1.default.sound.playSound(SoundDef_1.default.SECOND30);
        }
    };
    GameRoot.prototype._clearAllPanel = function () {
        this._clearPanel(this.view.word_img1.panel);
        this._clearPanel(this.view.word_img2.panel);
    };
    GameRoot.prototype._clearPanel = function (panel) {
        while (panel.numChildren > 0) {
            var child = panel.removeChildAt(0);
            if (child instanceof com_imgright_1.default) {
                this._rightPool.push(child);
            }
            else if (child instanceof com_imgwrong_1.default) {
                this._wrongPool.push(child);
            }
        }
    };
    GameRoot.prototype._lost = function () {
        this.Stop();
        ViewMgr_1.default.Inst.showWindow(WinGameFail_1.default);
        hw_common_1.default.sound.playSound(SoundDef_1.default.LOOSE);
        hw_common_1.default.mpsdk.reportEvent(ReportDef_1.default.Event_FAIL, this._levelConfig.id + "", this._helptCnt + "_" + this._answerList.length);
    };
    GameRoot.prototype._win = function () {
        var _this = this;
        this._pause = true;
        this.Stop();
        TimeMgr_1.default.Inst.addTimeEvent(2000, TimeMgr_1.TimeBindType.Delay, function () {
            var urllist = LoadMgr_1.default.Inst.getLevelImage(_this._levelConfig);
            var img1 = urllist[0];
            var img2 = urllist[1];
            Laya.loader.clearRes(img1);
            Laya.loader.clearRes(img2);
            GameMgr_1.default.Inst.PassLevel();
        });
        this._winAni();
        hw_common_1.default.sound.playSound(SoundDef_1.default.WIN);
        hw_common_1.default.mpsdk.reportEvent(ReportDef_1.default.Event_PASSLEVEL, this._levelConfig.id + "", this._helptCnt + "_" + this._leveltime);
    };
    GameRoot.prototype._winAni = function () {
        this._panelChildWinAni(this.view.word_img1.panel, 1);
        this._panelChildWinAni(this.view.word_img2.panel, 2);
        this._rightcntWinAni();
    };
    GameRoot.prototype._rightcntWinAni = function () {
        var _loop_1 = function (i) {
            var child = this_1.view.rightcnt["r" + i];
            Laya.Tween.to(child, { scaleX: 1.5, scaleY: 1.5 }, 200, null, Laya.Handler.create(this_1, function () {
                Laya.Tween.to(child, { scaleX: 1, scaleY: 1 }, 300, null);
            }), i * 100);
        };
        var this_1 = this;
        for (var i = 1; i <= GameDef_1.default.LEVELMAXANSWER; i++) {
            _loop_1(i);
        }
    };
    GameRoot.prototype._panelChildWinAni = function (panel, index) {
        var len = panel.numChildren;
        var _loop_2 = function (i) {
            var child = panel.getChildAt(i);
            if (child instanceof com_imgright_1.default) {
                Laya.Tween.to(child, { scaleX: 1.3, scaleY: 1.3 }, 300, Laya.Ease.backOut, Laya.Handler.create(this_2, function () {
                    child.c1.selectedIndex = index;
                }), i * 300);
            }
        };
        var this_2 = this;
        for (var i = 0; i < len; i++) {
            _loop_2(i);
        }
    };
    GameRoot.prototype.Stop = function () {
        TimeMgr_1.default.Inst.removeTimeEvent(this._updateTimer, this);
    };
    return GameRoot;
}(CompBase_1.default));
exports.default = GameRoot;
},{"../../../../../com/hw_common/hw_common":2,"../../../../../com/hw_utils/TimeUtils":21,"../../../../control/LoadMgr":25,"../../../../control/TimeMgr":27,"../../../../control/ViewMgr":28,"../../../../control/event/EventMgr":29,"../../../../control/game/GameMgr":31,"../../../../control/game/GuideMgr":32,"../../../../def/EGuideID":39,"../../../../def/EventDef":40,"../../../../def/GameDef":41,"../../../../def/LoadDef":42,"../../../../def/ReportDef":43,"../../../../def/SoundDef":45,"../../../fui/game/com_img1":93,"../../../fui/game/com_imgdebug":94,"../../../fui/game/com_imgright":95,"../../../fui/game/com_imgwrong":96,"../../../fui/game/com_wrongnum":103,"../../../windows/WinGameFail":171,"../../CompBase":158}],162:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var SceneBase_1 = require("../SceneBase");
var gamewinscene_1 = require("../../fui/game/gamewinscene");
var ViewMgr_1 = require("../../../control/ViewMgr");
var ProxyEnergyBtn_1 = require("../../proxy/ProxyEnergyBtn");
var ProxyGoldBtn_1 = require("../../proxy/ProxyGoldBtn");
var IconAdComponetn_1 = require("../../proxy/IconAdComponetn");
var GameMgr_1 = require("../../../control/game/GameMgr");
var hw_common_1 = require("../../../../com/hw_common/hw_common");
var WinLevel_1 = require("../../windows/WinLevel");
var SoundDef_1 = require("../../../def/SoundDef");
var WinPromotionReward_1 = require("../../windows/WinPromotionReward");
var ReportDef_1 = require("../../../def/ReportDef");
var ConfigMgr_1 = require("../../../control/ConfigMgr");
var ConfigDef_1 = require("../../../def/ConfigDef");
var WinTreasureBox_1 = require("../../windows/WinTreasureBox");
var ECurrencyType_1 = require("../../../def/ECurrencyType");
var WinLuckDraw_1 = require("../../windows/WinLuckDraw");
var WinMoreGame_1 = require("../../windows/WinMoreGame");
var LobbyScene_1 = require("../lobby/LobbyScene");
var ViewUtils_1 = require("../../../../com/hw_utils/ViewUtils");
var GameDef_1 = require("../../../def/GameDef");
var EventMgr_1 = require("../../../control/event/EventMgr");
var EventDef_1 = require("../../../def/EventDef");
var WinEnergyOver_1 = require("../../windows/WinEnergyOver");
var GameWinScene = /** @class */ (function (_super) {
    __extends(GameWinScene, _super);
    function GameWinScene() {
        var _this = _super.call(this) || this;
        _this._ifWaiting = false;
        return _this;
    }
    GameWinScene.prototype.init = function () {
        _super.prototype.init.call(this);
        this._initFui();
        this._initComp();
        this._addEvent();
    };
    GameWinScene.prototype._initFui = function () {
        this.view = gamewinscene_1.default.createInstance();
        this.view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        fairygui.GRoot.inst.addChild(this.view);
    };
    GameWinScene.prototype._initComp = function () {
        new ProxyEnergyBtn_1.default(this.view.btn_energy);
        new ProxyGoldBtn_1.default(this.view.btn_gold);
        var btn_leftgift_spacing = 30; //广告列表开始的y坐标距离btn_leftgift的距离
        IconAdComponetn_1.default.Inst.addSymmetryGameIcon(this.view, this.view.btn_leftgift.height + this.view.btn_leftgift.y + btn_leftgift_spacing, 2, {
            lineSpacing: 20,
            columnSpacing: 20
        }, 10, true);
    };
    GameWinScene.prototype.show = function () {
        _super.prototype.show.call(this);
        // this._showRank();
        this._updateProgress();
        this.addLevelIconAnimation();
        this.delayLoadingWindow();
        GameMgr_1.default.Inst.updateLevelComponent(this.view.n3);
        hw_common_1.default.platform.showInterstitialAd();
        this._updateBtn();
    };
    GameWinScene.prototype._updateBtn = function () {
        this.view.btn_leftgift.redpoint.visible = GameMgr_1.default.Inst.data.currency.luck_num > 0;
    };
    GameWinScene.prototype._addEvent = function () {
        this.view.btn_back.onClick(this, this._onClickLobby);
        this.view.btn_next.onClick(this, this._onClickOk);
        this.view.btn_leftgift.onClick(this, this._onClickLGift);
        this.view.btn_rightgift.onClick(this, this._onClickRGift);
        this.view.n3.onClick(this, this.clickComLevel);
        EventMgr_1.default.Inst.on(EventDef_1.default.UI_HIDEWINDOW, this, this._updateBtn);
    };
    GameWinScene.prototype.clickComLevel = function () {
        ViewMgr_1.default.Inst.showWindow(WinLevel_1.default);
        hw_common_1.default.sound.playSound(SoundDef_1.default.CLICK);
    };
    GameWinScene.prototype.delayLoadingWindow = function () {
        var _this = this;
        setTimeout(function () {
            _this.openWhichWin();
            _this._updateAchievement();
            _this._checkEnergyOver();
        }, 200);
    };
    GameWinScene.prototype._checkEnergyOver = function () {
        if (GameMgr_1.default.Inst.data.currency.energy < 1) {
            ViewMgr_1.default.Inst.showWindowByQueue(WinEnergyOver_1.WinEnergyOver);
        }
    };
    //成就宝箱-大段弹出
    GameWinScene.prototype._updateAchievement = function () {
        var nowAchievementData = GameMgr_1.default.Inst.getAchievementData();
        var lastAchievementLevel = nowAchievementData.index > 0 ? ConfigMgr_1.default.Inst.GetConfigByName(ConfigDef_1.default.Achievement)[nowAchievementData.index - 1].throughLevel : 0;
        if (GameMgr_1.default.Inst.level > GameDef_1.default.WINPROMOTIONSHOWLEVEL && GameMgr_1.default.Inst.level - lastAchievementLevel === 1) {
            ViewMgr_1.default.Inst.showWindowByQueue(WinPromotionReward_1.default);
            hw_common_1.default.mpsdk.reportEvent(ReportDef_1.default.EVENT_NEW_CLICKHONOR);
        }
    };
    GameWinScene.prototype._updateProgress = function () {
        var nowLevel = GameMgr_1.default.Inst.level - 1;
        var configlist = ConfigMgr_1.default.Inst.GetConfigByName(ConfigDef_1.default.LevelGift);
        var type = 0;
        if (nowLevel > configlist.length) {
            var MAX_PROGRESS = 5;
            this.view.com_progress.max = MAX_PROGRESS;
            for (var i = 0; i < 5; i++) {
                if ((nowLevel + i) % 5 == 0) {
                    this.view.com_progress.value = MAX_PROGRESS - i;
                    break;
                }
            }
        }
        else {
            var last = 0;
            var max = 5;
            var nextid = 0;
            for (var i = 0; i < configlist.length; i++) {
                var oneconfig = configlist[i];
                if (oneconfig.type == 1) {
                    if (oneconfig.id >= nowLevel) {
                        nextid = oneconfig.id;
                        break;
                    }
                    else {
                        last = oneconfig.id;
                    }
                }
            }
            if (nextid == 0) {
                nextid = 30;
            }
            max = nextid - last;
            this.view.com_progress.max = max;
            this.view.com_progress.value = max - (nextid - nowLevel);
        }
    };
    //弹出哪个窗口
    GameWinScene.prototype.openWhichWin = function () {
        var nowLevel = GameMgr_1.default.Inst.level - 1;
        var configlist = ConfigMgr_1.default.Inst.GetConfigByName(ConfigDef_1.default.LevelGift);
        var type = 0;
        if (nowLevel > configlist.length) {
            if (nowLevel % 5 == 0) {
                type = 1;
            }
            else if (nowLevel % 5 == 2) {
                type = 2;
            }
        }
        else {
            type = ConfigMgr_1.default.Inst.GetVOByNameAndID(ConfigDef_1.default.LevelGift, nowLevel).type;
        }
        if (type == 1) {
            ViewMgr_1.default.Inst.showWindowByQueue(WinTreasureBox_1.default);
        }
        else if (type == 2) {
            this.openWinLuckDraw();
        }
    };
    //抽奖-每过5关
    GameWinScene.prototype.openWinLuckDraw = function () {
        var freenum = 1;
        if (!GameMgr_1.default.Inst.data.other.gotfirstfreeluck) {
            freenum = GameDef_1.default.LUCKNUM_FIRST_NUM;
            GameMgr_1.default.Inst.data.other.gotfirstfreeluck = true;
        }
        GameMgr_1.default.Inst.addCurrency(ECurrencyType_1.ECurrencyType.LUCKNUM, freenum);
        ViewMgr_1.default.Inst.showWindowByQueue(WinLuckDraw_1.default);
        GameMgr_1.default.Inst.SaveData();
        hw_common_1.default.platform.showToast("获得" + freenum + "次免费抽奖次数");
    };
    GameWinScene.prototype._onClickLGift = function () {
        ViewMgr_1.default.Inst.showWindow(WinLuckDraw_1.default);
        hw_common_1.default.sound.playSound(SoundDef_1.default.CLICK);
    };
    GameWinScene.prototype._onClickRGift = function () {
        ViewMgr_1.default.Inst.showWindow(WinMoreGame_1.default);
        hw_common_1.default.sound.playSound(SoundDef_1.default.CLICK);
    };
    GameWinScene.prototype._updateLevel = function () {
        var achievement = ConfigMgr_1.default.Inst.GetConfigByName(ConfigDef_1.default.Achievement);
        var level = GameMgr_1.default.Inst.level;
        var nowLevelData;
        var Index;
        for (var i = 0; i < achievement.length; i++) {
            if (achievement[i].throughNum >= level) {
                Index = i;
                nowLevelData = achievement[i];
                break;
            }
        }
    };
    GameWinScene.prototype._showRank = function () {
        var _this = this;
        if (GameMgr_1.default.Inst.level <= 3)
            return;
        hw_common_1.default.platform.postMessage({ command: "close" });
        this._getTempImgUrl(GameMgr_1.default.Inst.level.toString()).then(function (tempUrl) {
            console.log("tempUrl--", tempUrl);
            var offy = _this.view.sharepanel.displayListContainer.localToGlobal(new Laya.Point(0, 0)).y;
            hw_common_1.default.platform.postMessage({ command: "surpass", value: GameMgr_1.default.Inst.level, top: offy, tempUrl: tempUrl, width: fairygui.GRoot.inst.width, height: fairygui.GRoot.inst.height });
            _this.view.sharepanel.displayListContainer.addChild(hw_common_1.default.platform.getShareSprite());
        });
    };
    GameWinScene.prototype._getTempImgUrl = function (str) {
        return new Promise(function (resolve, reject) {
            if (!Laya.Browser.onWeiXin) {
                reject();
            }
            var canvas = wx.createCanvas();
            var context = canvas.getContext("2d");
            var image = wx.createImage();
            image.src = "res/other/kefubtn.png";
            context.clearRect(0, 0, 400, 320);
            image.onload = function () {
                context.drawImage(image, 0, 0);
                context.font = "bold 55px SimSun";
                context.fillStyle = "#dd3e3e";
                context.textAlign = "center";
                context.textBaseline = "top";
                for (var u = str.length, s = 0; s < u; ++s) {
                    context.strokeText(str[s], 65 + 80 * s, 145);
                    context.fillText(str[s], 65 + 80 * s, 145);
                }
                context.font = "bold 30px SimSun";
                context.fillStyle = "#000000";
                var url = canvas.toTempFilePathSync({
                    x: 0,
                    y: 0,
                    width: 400,
                    height: 320,
                    destWidth: 400,
                    destHeight: 320
                });
                resolve(url);
            };
        });
    };
    GameWinScene.prototype.addLevelIconAnimation = function () {
        var _this = this;
        Laya.Tween.clearTween(this.view.n3.icon_img);
        Laya.Tween.to(this.view.n3.icon_img, { y: this.view.n3.icon_img.y - 20 }, 800, null, Laya.Handler.create(this, function () {
            Laya.Tween.to(_this.view.n3.icon_img, { y: _this.view.n3.icon_img.y + 20 }, 800, null, Laya.Handler.create(_this, function () {
                _this.addLevelIconAnimation();
            }));
        }));
    };
    GameWinScene.prototype._onClickLobby = function (e) {
        ViewMgr_1.default.Inst.showScene(LobbyScene_1.default);
        hw_common_1.default.sound.playSound(SoundDef_1.default.CLICK);
    };
    GameWinScene.prototype._onClickOk = function (e) {
        GameMgr_1.default.Inst.goGame(this._aniGoGame.bind(this));
        hw_common_1.default.sound.playSound(SoundDef_1.default.CLICK);
    };
    GameWinScene.prototype._aniGoGame = function () {
        var _this = this;
        if (this._flyAni == null) {
            this._flyAni = new fairygui.GLoader();
            this._flyAni.url = "ui://game/img_energy";
            this._flyAni.touchable = false;
        }
        this.view.addChild(this._flyAni);
        this._flyAni.setXY(this.view.btn_energy.x, this.view.btn_energy.y);
        hw_common_1.default.platform.showLoading();
        return new Promise(function (resolve, reject) {
            Laya.Tween.to(_this._flyAni, {
                x: _this.view.btn_next.x + _this.view.btn_next.width / 2,
                y: _this.view.btn_next.y + _this.view.btn_next.height / 2
            }, 400, null, Laya.Handler.create(_this, function () {
                hw_common_1.default.platform.hideLoading();
                _this._flyAni.removeFromParent();
                resolve(true);
            }));
        });
    };
    GameWinScene.prototype.hide = function () {
        _super.prototype.hide.call(this);
        hw_common_1.default.platform.postMessage({ command: "close" });
        ViewUtils_1.default.removeSelf(hw_common_1.default.platform.getShareSprite());
        Laya.Tween.clearTween(this.view.n3.icon_img);
        this.view.n3.icon_img.y = 0;
    };
    GameWinScene.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.hide();
    };
    return GameWinScene;
}(SceneBase_1.default));
exports.default = GameWinScene;
},{"../../../../com/hw_common/hw_common":2,"../../../../com/hw_utils/ViewUtils":22,"../../../control/ConfigMgr":23,"../../../control/ViewMgr":28,"../../../control/event/EventMgr":29,"../../../control/game/GameMgr":31,"../../../def/ConfigDef":34,"../../../def/ECurrencyType":36,"../../../def/EventDef":40,"../../../def/GameDef":41,"../../../def/ReportDef":43,"../../../def/SoundDef":45,"../../fui/game/gamewinscene":110,"../../proxy/IconAdComponetn":155,"../../proxy/ProxyEnergyBtn":156,"../../proxy/ProxyGoldBtn":157,"../../windows/WinEnergyOver":169,"../../windows/WinLevel":174,"../../windows/WinLuckDraw":175,"../../windows/WinMoreGame":176,"../../windows/WinPromotionReward":179,"../../windows/WinTreasureBox":184,"../SceneBase":159,"../lobby/LobbyScene":164}],163:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var SceneBase_1 = require("../SceneBase");
var LoadMgr_1 = require("../../../control/LoadMgr");
var sceneLoading_1 = require("../../fui/loading/sceneLoading");
var hw_common_1 = require("../../../../com/hw_common/hw_common");
var SceneLoading = /** @class */ (function (_super) {
    __extends(SceneLoading, _super);
    function SceneLoading() {
        var _this = _super.call(this) || this;
        _this._gameList = [];
        _this._stopAnimation = false;
        _this.loadIdx = 0;
        return _this;
    }
    SceneLoading.prototype.init = function () {
        _super.prototype.init.call(this);
        this.view = sceneLoading_1.default.createInstance();
        this.view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        if (hw_common_1.default.platform.iswxgame == true) {
            var screenW = wx.getSystemInfoSync().screenWidth;
            var screenH = wx.getSystemInfoSync().screenHeight;
            // 苹果手机 Laya loading界面适配没起作用，手动调整
            var stageW = Laya.stage.width;
            var stageH = Laya.stage.height;
            if (stageW == 720 && stageH == 1280) { //没有自动适配好，手动适配
                var adapteH = Math.ceil(screenH / screenW * 720);
                this.view.height = adapteH;
            }
        }
        fairygui.GRoot.inst.addChild(this.view);
        this.addSearchAnimation();
    };
    SceneLoading.prototype.addSearchAnimation = function (index) {
        var _this = this;
        var posArr = [{ x: -30, y: -30 }, { x: 0, y: 30 }, { x: 30, y: 0 }]; //坐标
        index = index || 0;
        Laya.Tween.to(this.view.n18.search_img, { x: this.view.n18.search_img.x + posArr[index].x, y: this.view.n18.search_img.y + posArr[index].y }, 300, null, Laya.Handler.create(this, function () {
            index++;
            if (index >= posArr.length) {
                index = 0;
            }
            _this.addSearchAnimation(index);
        }));
    };
    SceneLoading.prototype.OnProgress = function (current, total) {
        this.loadIdx += 1;
        var text = "玩命加载中...";
        if (LoadMgr_1.default.Inst.isLoadGameResOver) {
            text = "题库加载中...";
        }
        var str = (current * 100).toFixed(2);
        this.view.txt_loading.text = text + "(" + ("" + str) + "%)";
        trace("Loading..." + current + "/" + total);
    };
    SceneLoading.prototype.hide = function () {
        _super.prototype.hide.call(this);
        Laya.Tween.clearTween(this.view.n18.search_img);
    };
    return SceneLoading;
}(SceneBase_1.default));
exports.default = SceneLoading;
},{"../../../../com/hw_common/hw_common":2,"../../../control/LoadMgr":25,"../../fui/loading/sceneLoading":153,"../SceneBase":159}],164:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var SceneBase_1 = require("../SceneBase");
var ViewMgr_1 = require("../../../control/ViewMgr");
var hw_common_1 = require("../../../../com/hw_common/hw_common");
var SoundDef_1 = require("../../../def/SoundDef");
var WinMoreGame_1 = require("../../windows/WinMoreGame");
var WinLevel_1 = require("../../windows/WinLevel");
var WinRecommend_1 = require("../../windows/WinRecommend");
var WinSetting_1 = require("../../windows/WinSetting");
var WinLuckDraw_1 = require("../../windows/WinLuckDraw");
var WinFreeEnergy_1 = require("../../windows/WinFreeEnergy");
var GameMgr_1 = require("../../../control/game/GameMgr");
var EventMgr_1 = require("../../../control/event/EventMgr");
var EventDef_1 = require("../../../def/EventDef");
var IconAdComponetn_1 = require("../../proxy/IconAdComponetn");
var ProxyEnergyBtn_1 = require("../../proxy/ProxyEnergyBtn");
var ProxyGoldBtn_1 = require("../../proxy/ProxyGoldBtn");
var WinRank_1 = require("../../windows/WinRank");
var lobbyscene_1 = require("../../fui/game/lobbyscene");
var RedPointMgr_1 = require("../../../control/game/RedPointMgr");
var LobbyScene = /** @class */ (function (_super) {
    __extends(LobbyScene, _super);
    function LobbyScene() {
        var _this = _super.call(this) || this;
        _this._len = 0;
        return _this;
    }
    LobbyScene.prototype.init = function () {
        _super.prototype.init.call(this);
        this._initFui();
        this._initComp();
        this._addEvent();
    };
    LobbyScene.prototype.show = function () {
        _super.prototype.show.call(this);
        this._updateLevel();
        this.addLevelIconAnimation();
        hw_common_1.default.platform.showBannerAd(true);
        this._len++;
        if (this._len == 2) {
            var btn_lucky_spacing = 25; //广告列表开始的y坐标距离btn_lucky的距离
            IconAdComponetn_1.default.Inst.addSymmetryGameIcon(this.view, this.view.btn_lucky.height + this.view.btn_lucky.y + btn_lucky_spacing, 2, {
                lineSpacing: 18,
                columnSpacing: 20
            }, 10, true);
            this.view.removeChild(this._iconAd);
            IconAdComponetn_1.default.Inst.removeTiming();
        }
        this._updateBtn();
    };
    LobbyScene.prototype._updateBtn = function () {
        this.view.btn_lucky.redpoint.visible = GameMgr_1.default.Inst.data.currency.luck_num > 0;
        this.view.btn_gift.redpoint.visible = !GameMgr_1.default.Inst.getHasGetDailyColReward() || !GameMgr_1.default.Inst.isHadGetFloatingWindow() || !RedPointMgr_1.default.Inst.judeFloatWinRedPoint(RedPointMgr_1.RedPointType.service);
    };
    LobbyScene.prototype._updateLevel = function () {
        this.view.btn_start.start_btn_level.text = "第" + GameMgr_1.default.Inst.level + "关";
        GameMgr_1.default.Inst.updateLevelComponent(this.view.com_level);
    };
    LobbyScene.prototype.addLevelIconAnimation = function () {
        var _this = this;
        Laya.Tween.clearTween(this.view.com_level.icon_img);
        Laya.Tween.to(this.view.com_level.icon_img, { y: this.view.com_level.icon_img.y - 20 }, 800, null, Laya.Handler.create(this, function () {
            Laya.Tween.to(_this.view.com_level.icon_img, { y: _this.view.com_level.icon_img.y + 20 }, 800, null, Laya.Handler.create(_this, function () {
                _this.addLevelIconAnimation();
            }));
        }));
    };
    LobbyScene.prototype._initFui = function () {
        this.view = lobbyscene_1.default.createInstance();
        this.view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        fairygui.GRoot.inst.addChild(this.view);
    };
    LobbyScene.prototype._initComp = function () {
        new ProxyEnergyBtn_1.default(this.view.com_energy);
        new ProxyGoldBtn_1.default(this.view.com_gold);
        var offsetX = 20;
        var offsetY = 30;
        this._iconAd = IconAdComponetn_1.default.Inst.addBuoyAd(this.view, this.view.btn_more.x + offsetX, this.view.btn_more.y + this.view.btn_more.height + offsetY);
    };
    LobbyScene.prototype._addEvent = function () {
        this.view.btn_rank.onClick(this, this.onClickRank);
        this.view.btn_img.onClick(this, this.onClickImg);
        this.view.btn_gift.onClick(this, this._clickGift);
        this.view.btn_start.onClick(this, this._clickStart);
        this.view.btn_lucky.onClick(this, this._clickLucky);
        this.view.btn_setting.onClick(this, this._clickSetting);
        this.view.btn_open.onClick(this, this._clickOpenRecommend);
        this.view.btn_more.onClick(this, this._clickMoreGame);
        this.view.com_level.onClick(this, this._clickComLevel);
        EventMgr_1.default.Inst.on(EventDef_1.default.UI_HIDEWINDOW, this, this._updateBtn);
    };
    LobbyScene.prototype._clickEnergy = function () {
        ViewMgr_1.default.Inst.showWindow(WinFreeEnergy_1.default);
    };
    LobbyScene.prototype._clickComLevel = function () {
        ViewMgr_1.default.Inst.showWindow(WinLevel_1.default);
        hw_common_1.default.sound.playSound(SoundDef_1.default.CLICK);
    };
    LobbyScene.prototype._clickMoreGame = function () {
        ViewMgr_1.default.Inst.showWindow(WinMoreGame_1.default);
        hw_common_1.default.sound.playSound(SoundDef_1.default.CLICK);
    };
    LobbyScene.prototype._clickOpenRecommend = function () {
        ViewMgr_1.default.Inst.showWindow(WinRecommend_1.default);
        hw_common_1.default.sound.playSound(SoundDef_1.default.CLICK);
    };
    LobbyScene.prototype._clickSetting = function () {
        ViewMgr_1.default.Inst.showWindow(WinSetting_1.default);
        hw_common_1.default.sound.playSound(SoundDef_1.default.CLICK);
    };
    LobbyScene.prototype._clickLucky = function () {
        ViewMgr_1.default.Inst.showWindow(WinLuckDraw_1.default);
        hw_common_1.default.sound.playSound(SoundDef_1.default.CLICK);
    };
    LobbyScene.prototype._clickStart = function () {
        GameMgr_1.default.Inst.goGame(this._aniGoGame.bind(this));
        hw_common_1.default.sound.playSound(SoundDef_1.default.CLICK);
    };
    LobbyScene.prototype._clickGift = function () {
        ViewMgr_1.default.Inst.showWindow(WinFreeEnergy_1.default);
        hw_common_1.default.sound.playSound(SoundDef_1.default.CLICK);
    };
    LobbyScene.prototype._aniGoGame = function () {
        var _this = this;
        if (this._flyAni == null) {
            this._flyAni = new fairygui.GLoader();
            this._flyAni.url = "ui://game/img_energy";
            this._flyAni.touchable = false;
        }
        this.view.addChild(this._flyAni);
        this._flyAni.setXY(this.view.com_energy.x, this.view.com_energy.y);
        hw_common_1.default.platform.showLoading();
        return new Promise(function (resolve, reject) {
            Laya.Tween.to(_this._flyAni, {
                x: _this.view.btn_start.x + _this.view.btn_start.width / 2,
                y: _this.view.btn_start.y + _this.view.btn_start.height / 2
            }, 400, null, Laya.Handler.create(_this, function () {
                _this._flyAni.removeFromParent();
                hw_common_1.default.platform.hideLoading();
                resolve(true);
            }));
        });
    };
    LobbyScene.prototype.onClickRank = function (e) {
        ViewMgr_1.default.Inst.showWindow(WinRank_1.WinRank, "排行榜");
        hw_common_1.default.sound.playSound(SoundDef_1.default.CLICK);
    };
    LobbyScene.prototype.onClickImg = function (e) {
        hw_common_1.default.platform.showToast("暂未开通");
        hw_common_1.default.sound.playSound(SoundDef_1.default.CLICK);
    };
    LobbyScene.prototype.hide = function () {
        _super.prototype.hide.call(this);
        Laya.Tween.clearTween(this.view.com_level.icon_img);
        this.view.com_level.icon_img.y = 0;
    };
    LobbyScene.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return LobbyScene;
}(SceneBase_1.default));
exports.default = LobbyScene;
},{"../../../../com/hw_common/hw_common":2,"../../../control/ViewMgr":28,"../../../control/event/EventMgr":29,"../../../control/game/GameMgr":31,"../../../control/game/RedPointMgr":33,"../../../def/EventDef":40,"../../../def/SoundDef":45,"../../fui/game/lobbyscene":124,"../../proxy/IconAdComponetn":155,"../../proxy/ProxyEnergyBtn":156,"../../proxy/ProxyGoldBtn":157,"../../windows/WinFreeEnergy":170,"../../windows/WinLevel":174,"../../windows/WinLuckDraw":175,"../../windows/WinMoreGame":176,"../../windows/WinRank":180,"../../windows/WinRecommend":181,"../../windows/WinSetting":183,"../SceneBase":159}],165:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var SceneBase_1 = require("../SceneBase");
var GameShellRoot_1 = require("./component/GameShellRoot");
var hw_common_1 = require("../../../../com/hw_common/hw_common");
var LobbyScene_1 = require("../lobby/LobbyScene");
var ViewMgr_1 = require("../../../control/ViewMgr");
var shellscene_1 = require("../../fui/game/shellscene");
var hw_common_def_1 = require("../../../../com/hw_common/hw_common_def");
var ShellScene = /** @class */ (function (_super) {
    __extends(ShellScene, _super);
    function ShellScene() {
        return _super.call(this) || this;
    }
    ShellScene.prototype.init = function () {
        _super.prototype.init.call(this);
        this._initFui();
        this._addEvent();
        this._initComp();
    };
    ShellScene.prototype.show = function (iscomp) {
        if (iscomp === void 0) { iscomp = false; }
        _super.prototype.show.call(this);
        this._gameRoot.Start();
        hw_common_1.default.platform.showBannerAd(false);
    };
    ShellScene.prototype._initComp = function () {
        this._gameRoot = new GameShellRoot_1.GameShellRoot();
        this._gameRoot.Init(this.view);
    };
    ShellScene.prototype._initFui = function () {
        this.view = shellscene_1.default.createInstance();
        this.view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        fairygui.GRoot.inst.addChild(this.view);
    };
    ShellScene.prototype._addEvent = function () {
        this.view.btn_tip.onClick(this, this._onClkTips);
        this.view.btn_back.onClick(this, this._onClkBack);
        hw_common_1.default.event.on(hw_common_def_1.default.EVT_MPSDK_PLATFORMCONFIG_OK, this, this._onConfigOver);
    };
    ShellScene.prototype._onClkBack = function (e) {
        ViewMgr_1.default.Inst.showScene(LobbyScene_1.default);
    };
    ShellScene.prototype._onClkTips = function () {
        hw_common_1.default.platform.showToast("暂时没有视频观看!");
    };
    ShellScene.prototype._onConfigOver = function () {
        if (hw_common_1.default.config.safe) {
            ViewMgr_1.default.Inst.showScene(LobbyScene_1.default);
        }
    };
    ShellScene.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return ShellScene;
}(SceneBase_1.default));
exports.ShellScene = ShellScene;
},{"../../../../com/hw_common/hw_common":2,"../../../../com/hw_common/hw_common_def":3,"../../../control/ViewMgr":28,"../../fui/game/shellscene":131,"../SceneBase":159,"../lobby/LobbyScene":164,"./component/GameShellRoot":166}],166:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var CompBase_1 = require("../../CompBase");
var ConfigMgr_1 = require("../../../../control/ConfigMgr");
var ConfigDef_1 = require("../../../../def/ConfigDef");
var MathUtils_1 = require("../../../../../com/hw_utils/MathUtils");
var LoadMgr_1 = require("../../../../control/LoadMgr");
var TimeMgr_1 = require("../../../../control/TimeMgr");
var GameMgr_1 = require("../../../../control/game/GameMgr");
var LoadDef_1 = require("../../../../def/LoadDef");
var hw_common_1 = require("../../../../../com/hw_common/hw_common");
var SoundDef_1 = require("../../../../def/SoundDef");
var GameDef_1 = require("../../../../def/GameDef");
var TimeUtils_1 = require("../../../../../com/hw_utils/TimeUtils");
var com_imgwrong_1 = require("../../../fui/game/com_imgwrong");
var com_wrongnum_1 = require("../../../fui/game/com_wrongnum");
var ViewMgr_1 = require("../../../../control/ViewMgr");
var WinGameFail_1 = require("../../../windows/WinGameFail");
var EventMgr_1 = require("../../../../control/event/EventMgr");
var EventDef_1 = require("../../../../def/EventDef");
var GameShellRoot = /** @class */ (function (_super) {
    __extends(GameShellRoot, _super);
    function GameShellRoot() {
        var _this = _super.call(this) || this;
        _this.TIMECOLOR_NORMAL = "#4849B0";
        _this.TIMECOLOR_WRONG = "#ff0000";
        _this._imglist = [];
        _this._fromPoint = new Laya.Point();
        _this._rightCnt = 0;
        _this._wrongPool = [];
        _this._wrongNumPool = [];
        return _this;
    }
    GameShellRoot.prototype.Init = function (view) {
        _super.prototype.Init.call(this, view);
        EventMgr_1.default.Inst.on(EventDef_1.default.UI_WINFAILVIDEOOK, this, this._getReward);
        EventMgr_1.default.Inst.on(EventDef_1.default.UI_WINFAILRESTART, this, this._onRestart);
    };
    GameShellRoot.prototype._onRestart = function () {
        this.Start();
    };
    GameShellRoot.prototype._getReward = function () {
        hw_common_1.default.platform.showBannerAd(false);
        this._leveltime = GameDef_1.default.LEVELVIDEODELAY * 1000;
        TimeMgr_1.default.Inst.addTimeEvent(1000, TimeMgr_1.TimeBindType.Loop, this._updateTimer, this);
    };
    GameShellRoot.prototype.Start = function () {
        hw_common_1.default.platform.showBannerAd(false);
        this._clearImage();
        this._initData();
        TimeMgr_1.default.Inst.addTimeEvent(3000, TimeMgr_1.TimeBindType.Delay, this._startAni, this);
    };
    GameShellRoot.prototype._startAni = function () {
        this._aniCnt = GameMgr_1.default.Inst.level;
        this._aniStTm = Date.now();
        this._anitime = (0.0076 * this._aniCnt * this._aniCnt - 0.2228 * this._aniCnt + 2.2152) * 1000;
        if (this._anitime < 800)
            this._anitime = 800;
        if (this._anitime > 2000)
            this._anitime = 2000;
        this._playStartAni();
    };
    GameShellRoot.prototype._playStartAni = function () {
        var _this = this;
        for (var _i = 0, _a = this._imglist; _i < _a.length; _i++) {
            var i = _a[_i];
            var tox = this.view.bgm.x + Math.random() * (this.view.bgm.width - i.width * i.scaleX);
            var toy = this.view.bgm.y + Math.random() * (this.view.bgm.height - i.height * i.scaleY);
            Laya.Tween.to(i, { x: tox, y: toy }, this._anitime);
        }
        this._aniCnt--;
        if (this._aniCnt <= 0 || Date.now() - this._aniStTm >= 3000) {
            Laya.timer.once(this._anitime, this, function () {
                _this._startDrag();
            });
            return;
        }
        else {
            this._playStartAni();
        }
    };
    GameShellRoot.prototype._startDrag = function () {
        for (var _i = 0, _a = this._imglist; _i < _a.length; _i++) {
            var i = _a[_i];
            i.touchable = true;
            i.on(Laya.Event.MOUSE_DOWN, this, this._onImageDown);
        }
    };
    GameShellRoot.prototype._onImageDown = function (e) {
        var image = fairygui.GLoader.cast(e.currentTarget);
        this._fromPoint.x = image.x;
        this._fromPoint.y = image.y;
        image.off(Laya.Event.MOUSE_DOWN, this, this._onImageDown);
        image.on(Laya.Event.MOUSE_UP, this, this._onImageUp);
        image.startDrag();
        hw_common_1.default.sound.playSound(SoundDef_1.default.CLICK);
    };
    GameShellRoot.prototype._onImageUp = function (e) {
        var image = fairygui.GLoader.cast(e.currentTarget);
        var bg = image.data;
        if (e.stageX > bg.x && e.stageX < (bg.x + bg.width) &&
            e.stageY > bg.y && e.stageY < (bg.y + bg.height)) {
            image.x = bg.x;
            image.y = bg.y;
            image.touchable = false;
            this._rightAni(image.x + image.width / 2, image.y + image.height / 2);
        }
        else {
            image.x = this._fromPoint.x;
            image.y = this._fromPoint.y;
            image.touchable = true;
            image.on(Laya.Event.MOUSE_DOWN, this, this._onImageDown);
            this._answerWrong(this._fromPoint);
        }
        image.stopDrag();
        image.off(Laya.Event.MOUSE_UP, this, this._onImageUp);
        image.off(Laya.Event.MOUSE_OUT, this, this._onImageUp);
        hw_common_1.default.sound.playSound(SoundDef_1.default.CLICK);
    };
    GameShellRoot.prototype._answerWrong = function (point) {
        this._wrongAni(point);
        this._wrongnumAni(point);
        hw_common_1.default.platform.vibrateLong();
        hw_common_1.default.sound.playSound(SoundDef_1.default.WRONG);
    };
    GameShellRoot.prototype._wrongAni = function (point) {
        var _this = this;
        var com_wrong = this._getWrongInst();
        Laya.Tween.clearAll(com_wrong);
        this.view.bgm.addChildAt(com_wrong, 0);
        com_wrong.x = point.x;
        com_wrong.y = point.y;
        com_wrong.scaleX = com_wrong.scaleY = com_wrong.alpha = 1;
        Laya.Tween.to(com_wrong, { scaleX: 0, scaleY: 0, alpha: 0 }, 400, null, Laya.Handler.create(this, function () {
            com_wrong.removeFromParent();
            _this._wrongPool.push(com_wrong);
        }));
    };
    GameShellRoot.prototype._getWrongInst = function () {
        if (this._wrongPool.length > 0) {
            return this._wrongPool.pop();
        }
        var cmr = com_imgwrong_1.default.createInstance();
        cmr.touchable = false;
        return cmr;
    };
    GameShellRoot.prototype._wrongnumAni = function (localpoint) {
        var _this = this;
        var gp = this.view.bgm.localToGlobal(localpoint.x, localpoint.y);
        var point = this.view.globalToLocal(gp.x, gp.y);
        var toy1 = point.y - 50;
        var tox2 = this.view.txt_time.x + this.view.txt_time.width / 2;
        var toy2 = this.view.txt_time.y + this.view.txt_time.height / 2;
        var com_wrong = this._getWrongNumInst();
        Laya.Tween.clearAll(com_wrong);
        this.view.addChild(com_wrong);
        this.view.txt_time.color = this.TIMECOLOR_WRONG;
        com_wrong.x = point.x;
        com_wrong.y = point.y;
        com_wrong.scaleX = com_wrong.scaleY = 0;
        Laya.Tween.to(com_wrong, { scaleX: 1, scaleY: 1, y: toy1 }, 500, null, Laya.Handler.create(this, function () {
            Laya.Tween.to(com_wrong, { scaleX: 0, scaleY: 0, x: tox2, y: toy2 }, 400, null, Laya.Handler.create(_this, function () {
                com_wrong.removeFromParent();
                _this._wrongNumPool.push(com_wrong);
                _this._leveltime -= GameDef_1.default.LEVELWRONGDECTIME * 1000;
                _this._leveltime < 0 && (_this._leveltime = 0);
                _this.view.txt_time.color = _this.TIMECOLOR_NORMAL;
            }));
        }));
    };
    GameShellRoot.prototype._getWrongNumInst = function () {
        if (this._wrongNumPool.length > 0) {
            return this._wrongNumPool.pop();
        }
        var cmr = com_wrongnum_1.default.createInstance();
        cmr.txt.text = "-20";
        cmr.touchable = false;
        return cmr;
    };
    GameShellRoot.prototype._rightAni = function (fx, fy) {
        var _this = this;
        this._rightCnt++;
        this.view.rightcnt.state.selectedIndex = this._rightCnt;
        var targetitem = this.view.rightcnt["r" + this.view.rightcnt.state.selectedIndex];
        if (!targetitem)
            return;
        var targetgobal = targetitem.localToGlobal(targetitem.width / 2, targetitem.height / 2);
        var targetpoint = this.view.globalToLocal(targetgobal.x, targetgobal.y);
        var partical = this._getPartical();
        this.view.displayObject.addChild(partical);
        partical.x = fx;
        partical.y = fy;
        partical.emitter.start(1.2);
        partical.play();
        Laya.Tween.to(partical, { x: targetpoint.x, y: targetpoint.y }, 400, null, Laya.Handler.create(this, function () {
            partical.removeSelf();
            partical.stop();
            partical.destroy(true);
            if (_this._rightCnt >= 5)
                _this._win();
        }), 500);
    };
    GameShellRoot.prototype._win = function () {
        TimeMgr_1.default.Inst.addTimeEvent(2000, TimeMgr_1.TimeBindType.Delay, function () {
            GameMgr_1.default.Inst.PassLevel();
        });
        this._winAni();
        hw_common_1.default.sound.playSound(SoundDef_1.default.WIN);
    };
    GameShellRoot.prototype._winAni = function () {
        this._rightcntWinAni();
    };
    GameShellRoot.prototype._rightcntWinAni = function () {
        var _loop_1 = function (i) {
            var child = this_1.view.rightcnt["r" + i];
            Laya.Tween.to(child, { scaleX: 1.5, scaleY: 1.5 }, 200, null, Laya.Handler.create(this_1, function () {
                Laya.Tween.to(child, { scaleX: 1, scaleY: 1 }, 300, null);
            }), i * 100);
        };
        var this_1 = this;
        for (var i = 1; i <= GameDef_1.default.LEVELMAXANSWER; i++) {
            _loop_1(i);
        }
    };
    //laya粒子不能用对象池,会有显示问题
    GameShellRoot.prototype._getPartical = function () {
        var pset = Laya.loader.getRes(LoadDef_1.default.PATICLE_TRAIL_SETTING);
        pset.textureName = LoadDef_1.default.PATICLE_TRAIL_PNG;
        pset.maxPartices = 180;
        var partical = new Laya.Particle2D(pset);
        return partical;
    };
    GameShellRoot.prototype._initData = function () {
        this.view.rightcnt.state.selectedIndex = this._rightCnt = 0;
        this.view.txt_level.text = "关卡" + GameMgr_1.default.Inst.level;
        this._leveltime = 120 * 1000;
        TimeMgr_1.default.Inst.addTimeEvent(1000, TimeMgr_1.TimeBindType.Loop, this._updateTimer, this);
        var config = ConfigMgr_1.default.Inst.GetConfigByName(ConfigDef_1.default.LevelData);
        var useconfig = config.concat();
        MathUtils_1.default.randomSort(useconfig);
        for (var i = 0; i < 5; i++) {
            var lc = useconfig[i];
            var url = LoadMgr_1.default.Inst.getLevelImage(lc)[0];
            var image = new fairygui.GLoader();
            image.url = url;
            this.view.addChild(image);
            image.width = this.view["bg" + i].width;
            image.height = this.view["bg" + i].height;
            image.fill = fairygui.LoaderFillType.ScaleFree;
            image.x = this.view["bg" + i].x;
            image.y = this.view["bg" + i].y;
            image.touchable = false;
            image.data = this.view["bg" + i];
            this._imglist.push(image);
        }
    };
    GameShellRoot.prototype._updateTimer = function (delay) {
        if (delay === void 0) { delay = 0; }
        this._leveltime -= 1000;
        this._playSound();
        if (this._leveltime <= 0) {
            this._lost();
            return;
        }
        var fmttime = TimeUtils_1.default.getTimeMMSS(this._leveltime);
        this.view.txt_time.text = fmttime;
        this.view.txt_time.color = this.TIMECOLOR_NORMAL;
    };
    GameShellRoot.prototype._lost = function () {
        this.Stop();
        ViewMgr_1.default.Inst.showWindow(WinGameFail_1.default);
        hw_common_1.default.sound.playSound(SoundDef_1.default.LOOSE);
    };
    GameShellRoot.prototype.Stop = function () {
        TimeMgr_1.default.Inst.removeTimeEvent(this._updateTimer, this);
    };
    GameShellRoot.prototype._playSound = function () {
        var second30 = 30000;
        var second10 = 10000;
        if (this._leveltime >= 0 && this._leveltime < second10) {
            hw_common_1.default.sound.playSound(SoundDef_1.default.SECOND10);
        }
        else if (this._leveltime == second30) {
            hw_common_1.default.sound.playSound(SoundDef_1.default.SECOND30);
        }
    };
    GameShellRoot.prototype._clearImage = function () {
        for (var _i = 0, _a = this._imglist; _i < _a.length; _i++) {
            var i = _a[_i];
            i.removeFromParent();
        }
        this._imglist = [];
    };
    return GameShellRoot;
}(CompBase_1.default));
exports.GameShellRoot = GameShellRoot;
},{"../../../../../com/hw_common/hw_common":2,"../../../../../com/hw_utils/MathUtils":19,"../../../../../com/hw_utils/TimeUtils":21,"../../../../control/ConfigMgr":23,"../../../../control/LoadMgr":25,"../../../../control/TimeMgr":27,"../../../../control/ViewMgr":28,"../../../../control/event/EventMgr":29,"../../../../control/game/GameMgr":31,"../../../../def/ConfigDef":34,"../../../../def/EventDef":40,"../../../../def/GameDef":41,"../../../../def/LoadDef":42,"../../../../def/SoundDef":45,"../../../fui/game/com_imgwrong":96,"../../../fui/game/com_wrongnum":103,"../../../windows/WinGameFail":171,"../../CompBase":158}],167:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var winaddfloat_1 = require("../fui/game/winaddfloat");
var WindowBase_1 = require("./WindowBase");
var hw_common_1 = require("../../../com/hw_common/hw_common");
var SoundDef_1 = require("../../def/SoundDef");
var WinAddFloat = /** @class */ (function (_super) {
    __extends(WinAddFloat, _super);
    function WinAddFloat() {
        var _this = _super.call(this) || this;
        _this.modal = true;
        return _this;
    }
    WinAddFloat.prototype.onInit = function () {
        this.contentPane = winaddfloat_1.default.createInstance();
        this.center();
        this.contentPane.btn_Close.onClick(this, this.onClose);
    };
    WinAddFloat.prototype.show = function (param) {
        _super.prototype.show.call(this);
        trace("WinTips::Show->接收到窗口参数:", param);
        hw_common_1.default.platform.showBannerAd(false);
    };
    WinAddFloat.prototype.onShown = function () {
    };
    WinAddFloat.prototype.onClose = function () {
        this.hide();
        hw_common_1.default.sound.playSound(SoundDef_1.default.CLICK);
        hw_common_1.default.platform.showBannerAd(true);
    };
    return WinAddFloat;
}(WindowBase_1.default));
exports.default = WinAddFloat;
},{"../../../com/hw_common/hw_common":2,"../../def/SoundDef":45,"../fui/game/winaddfloat":132,"./WindowBase":185}],168:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var wincollectiongame_1 = require("../fui/game/wincollectiongame");
var WindowBase_1 = require("./WindowBase");
var LoadDef_1 = require("../../def/LoadDef");
var hw_common_1 = require("../../../com/hw_common/hw_common");
var SoundDef_1 = require("../../def/SoundDef");
var WinCollectionGame = /** @class */ (function (_super) {
    __extends(WinCollectionGame, _super);
    function WinCollectionGame() {
        var _this = _super.call(this) || this;
        _this.modal = true;
        return _this;
    }
    WinCollectionGame.prototype.onInit = function () {
        var _this = this;
        this.contentPane = wincollectiongame_1.default.createInstance();
        this.center();
        this._initSK();
        this.contentPane.n13.onClick(this, function () {
            _this.contentPane.state.selectedIndex = 1;
            _this._sk.play("idle", true, true);
        });
        this.contentPane.n21.onClick(this, function () {
            _this.contentPane.state.selectedIndex = 0;
        });
        this.contentPane.n2.onClick(this, this.onClose);
    };
    WinCollectionGame.prototype._initSK = function () {
        this._sk = new Laya.Skeleton();
        this._sk.load(LoadDef_1.default.ANI_GUIDE_COLLECT);
        this.contentPane.anipanel.displayListContainer.addChild(this._sk);
        this._sk.x = this.contentPane.anipanel.width / 2;
        this._sk.y = this.contentPane.anipanel.height / 2;
    };
    WinCollectionGame.prototype.show = function (param) {
        _super.prototype.show.call(this);
        this.contentPane.state.selectedIndex = 0;
        trace("WinTips::Show->接收到窗口参数:", param);
    };
    WinCollectionGame.prototype.onShown = function () {
    };
    WinCollectionGame.prototype.onClose = function () {
        this.hide();
        hw_common_1.default.sound.playSound(SoundDef_1.default.BTN);
    };
    return WinCollectionGame;
}(WindowBase_1.default));
exports.default = WinCollectionGame;
},{"../../../com/hw_common/hw_common":2,"../../def/LoadDef":42,"../../def/SoundDef":45,"../fui/game/wincollectiongame":134,"./WindowBase":185}],169:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var WindowBase_1 = require("./WindowBase");
var winenergyover_1 = require("../fui/game/winenergyover");
var hw_common_1 = require("../../../com/hw_common/hw_common");
var TimeMgr_1 = require("../../control/TimeMgr");
var GameMgr_1 = require("../../control/game/GameMgr");
var TimeUtils_1 = require("../../../com/hw_utils/TimeUtils");
var ViewMgr_1 = require("../../control/ViewMgr");
var WinGetReward_1 = require("./WinGetReward");
var ECurrencyType_1 = require("../../def/ECurrencyType");
var SoundDef_1 = require("../../def/SoundDef");
var ReportDef_1 = require("../../def/ReportDef");
var GameDef_1 = require("../../def/GameDef");
var SharePointKeyDef_1 = require("../../def/SharePointKeyDef");
var WinEnergyOver = /** @class */ (function (_super) {
    __extends(WinEnergyOver, _super);
    function WinEnergyOver() {
        var _this = _super.call(this) || this;
        _this.modal = true;
        return _this;
    }
    WinEnergyOver.prototype.onInit = function () {
        this.contentPane = winenergyover_1.default.createInstance();
        this.center();
        this.contentPane.btn_close.onClick(this, this.onClose);
        this.contentPane.btn_get.onClick(this, this._onGet);
        this._updateHelpBtn();
    };
    WinEnergyOver.prototype.show = function (param) {
        _super.prototype.show.call(this);
        this._updateTips();
        TimeMgr_1.default.Inst.addTimeEvent(1000, TimeMgr_1.TimeBindType.Loop, this._updateTips, this);
    };
    WinEnergyOver.prototype._updateTips = function () {
        var hastime = GameMgr_1.default.Inst.getNextEnergyTime();
        if (hastime > 0) {
            this.contentPane.txt_tips.text = "还需要" + TimeUtils_1.default.getTimeMMSS(hastime) + "分钟恢复一点体力";
        }
        else {
            this.contentPane.txt_tips.text = "精力已满";
        }
    };
    WinEnergyOver.prototype._onGet = function () {
        var _this = this;
        hw_common_1.default.share.normalGet({
            shareid: ReportDef_1.default.SHARE_GOLDBTN,
            sharekey: SharePointKeyDef_1.default.TILI,
            caller: this,
            success: this._getRewards,
            fail: function () {
                _this._updateHelpBtn();
            }
        });
    };
    WinEnergyOver.prototype._updateHelpBtn = function () {
        this._canShare = hw_common_1.default.share.canShare(SharePointKeyDef_1.default.TILI);
        if (this._canShare) {
            this.contentPane.btn_get.c1.selectedIndex = 0;
        }
        else {
            this.contentPane.btn_get.c1.selectedIndex = 1;
        }
    };
    WinEnergyOver.prototype._getRewards = function (e) {
        if (e === void 0) { e = null; }
        this._updateHelpBtn();
        ViewMgr_1.default.Inst.showWindow(WinGetReward_1.default, new WinGetReward_1.WinGetReward_Param(ECurrencyType_1.ECurrencyType.ENERGY, GameDef_1.default.ENERGYOVER_ENERGY_NUM));
        this.hide();
    };
    WinEnergyOver.prototype.onShown = function () {
    };
    WinEnergyOver.prototype.onClose = function () {
        this.hide();
        hw_common_1.default.sound.playSound(SoundDef_1.default.CLICK);
    };
    return WinEnergyOver;
}(WindowBase_1.default));
exports.WinEnergyOver = WinEnergyOver;
},{"../../../com/hw_common/hw_common":2,"../../../com/hw_utils/TimeUtils":21,"../../control/TimeMgr":27,"../../control/ViewMgr":28,"../../control/game/GameMgr":31,"../../def/ECurrencyType":36,"../../def/GameDef":41,"../../def/ReportDef":43,"../../def/SharePointKeyDef":44,"../../def/SoundDef":45,"../fui/game/winenergyover":136,"./WinGetReward":173,"./WindowBase":185}],170:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var WindowBase_1 = require("./WindowBase");
var winfreeenergy_1 = require("../fui/game/winfreeenergy");
var EventDef_1 = require("../../def/EventDef");
var EventMgr_1 = require("../../control/event/EventMgr");
var RedPointMgr_1 = require("../../control/game/RedPointMgr");
var WinCollectionGame_1 = require("./WinCollectionGame");
var ViewMgr_1 = require("../../control/ViewMgr");
var GameMgr_1 = require("../../control/game/GameMgr");
var WinAddFloat_1 = require("./WinAddFloat");
var WinServiceEnergy_1 = require("./WinServiceEnergy");
var SoundDef_1 = require("../../def/SoundDef");
var hw_common_1 = require("../../../com/hw_common/hw_common");
var WinFreeEnergy = /** @class */ (function (_super) {
    __extends(WinFreeEnergy, _super);
    function WinFreeEnergy() {
        var _this = _super.call(this) || this;
        _this._btn_state = {
            showRedPoint: 0,
            hideRedPoint: 1,
            grey: 2
        }; //更改按钮状态,0：没有领取且今天没有点击，有红点；1：今天有点击但是没有领取过，没有红点 2：领取过奖励了，没有红点且按钮变灰
        _this.modal = true;
        return _this;
    }
    WinFreeEnergy.prototype.onInit = function () {
        this.contentPane = winfreeenergy_1.default.createInstance();
        this.center();
        this.contentPane.btn_Close.onClick(this, this.onClose);
        this.contentPane.btn_service.btn_reward.onClick(this, this.clickService);
        EventMgr_1.default.Inst.on(EventDef_1.default.GAME_CURRENCYCHANGE, this, this.initBtn);
    };
    WinFreeEnergy.prototype.show = function (param) {
        _super.prototype.show.call(this);
        trace("WinTips::Show->接收到窗口参数:", param);
        this.initBtn();
    };
    WinFreeEnergy.prototype.clickAddmy = function () {
        if (this.contentPane.btn_addmy.btn_reward.state.selectedIndex == this._btn_state.grey) {
            return;
        }
        RedPointMgr_1.default.Inst.saveRedPoint(RedPointMgr_1.RedPointType.addMyGame);
        this.contentPane.btn_addmy.btn_reward.state.selectedIndex = this._btn_state.hideRedPoint;
        ViewMgr_1.default.Inst.showWindow(WinCollectionGame_1.default);
    };
    WinFreeEnergy.prototype.initBtn = function () {
        this.contentPane.btn_addmy.btn_reward.offClick(this, this.clickAddmy);
        this.contentPane.btn_addfloat.btn_reward.offClick(this, this.clickAddfloat);
        if (GameMgr_1.default.Inst.isHadGetFloatingWindow()) {
            this.contentPane.btn_addfloat.btn_reward.state.selectedIndex = this._btn_state.grey;
        }
        else {
            this.contentPane.btn_addfloat.btn_reward.state.selectedIndex = RedPointMgr_1.default.Inst.judeFloatWinRedPoint(RedPointMgr_1.RedPointType.floatWindow) ? this._btn_state.hideRedPoint : this._btn_state.showRedPoint;
            this.contentPane.btn_addfloat.btn_reward.onClick(this, this.clickAddfloat);
        }
        if (GameMgr_1.default.Inst.getHasGetDailyColReward()) {
            this.contentPane.btn_addmy.btn_reward.state.selectedIndex = this._btn_state.grey;
        }
        else {
            this.contentPane.btn_addmy.btn_reward.state.selectedIndex = RedPointMgr_1.default.Inst.judeFloatWinRedPoint(RedPointMgr_1.RedPointType.addMyGame) ? this._btn_state.hideRedPoint : this._btn_state.showRedPoint;
            this.contentPane.btn_addmy.btn_reward.onClick(this, this.clickAddmy);
        }
        this.contentPane.btn_service.btn_reward.state.selectedIndex = RedPointMgr_1.default.Inst.judeFloatWinRedPoint(RedPointMgr_1.RedPointType.service) ? this._btn_state.hideRedPoint : this._btn_state.showRedPoint;
    };
    WinFreeEnergy.prototype.clickAddfloat = function () {
        if (this.contentPane.btn_addfloat.btn_reward.state.selectedIndex == this._btn_state.grey) {
            return;
        }
        RedPointMgr_1.default.Inst.saveRedPoint(RedPointMgr_1.RedPointType.floatWindow);
        this.contentPane.btn_addfloat.btn_reward.state.selectedIndex = this._btn_state.hideRedPoint;
        ViewMgr_1.default.Inst.showWindow(WinAddFloat_1.default);
    };
    WinFreeEnergy.prototype.clickService = function () {
        if (this.contentPane.btn_service.btn_reward.state.selectedIndex == this._btn_state.grey) {
            return;
        }
        this.contentPane.btn_service.btn_reward.state.selectedIndex = this._btn_state.hideRedPoint;
        ViewMgr_1.default.Inst.showWindow(WinServiceEnergy_1.default);
    };
    WinFreeEnergy.prototype.onShown = function () {
    };
    WinFreeEnergy.prototype.onClose = function () {
        this.hide();
        hw_common_1.default.sound.playSound(SoundDef_1.default.CLICK);
    };
    return WinFreeEnergy;
}(WindowBase_1.default));
exports.default = WinFreeEnergy;
},{"../../../com/hw_common/hw_common":2,"../../control/ViewMgr":28,"../../control/event/EventMgr":29,"../../control/game/GameMgr":31,"../../control/game/RedPointMgr":33,"../../def/EventDef":40,"../../def/SoundDef":45,"../fui/game/winfreeenergy":137,"./WinAddFloat":167,"./WinCollectionGame":168,"./WinServiceEnergy":182,"./WindowBase":185}],171:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var WindowBase_1 = require("./WindowBase");
var wingamefail_1 = require("../fui/game/wingamefail");
var ProxyEnergyBtn_1 = require("../proxy/ProxyEnergyBtn");
var ProxyGoldBtn_1 = require("../proxy/ProxyGoldBtn");
var IconAdComponetn_1 = require("../proxy/IconAdComponetn");
var hw_common_1 = require("../../../com/hw_common/hw_common");
var ViewMgr_1 = require("../../control/ViewMgr");
var WinMoreGame_1 = require("./WinMoreGame");
var SoundDef_1 = require("../../def/SoundDef");
var EventDef_1 = require("../../def/EventDef");
var EventMgr_1 = require("../../control/event/EventMgr");
var ReportDef_1 = require("../../def/ReportDef");
var LobbyScene_1 = require("../scenes/lobby/LobbyScene");
var GameMgr_1 = require("../../control/game/GameMgr");
var WinEnergyOver_1 = require("./WinEnergyOver");
var ECurrencyType_1 = require("../../def/ECurrencyType");
var SharePointKeyDef_1 = require("../../def/SharePointKeyDef");
var WinGameFail = /** @class */ (function (_super) {
    __extends(WinGameFail, _super);
    function WinGameFail() {
        return _super.call(this) || this;
    }
    WinGameFail.prototype.onInit = function () {
        _super.prototype.init.call(this);
        this._initFui();
        this._initComp();
        this._addEvent();
        this._updateHelpBtn();
    };
    WinGameFail.prototype._initFui = function () {
        this.contentPane = wingamefail_1.default.createInstance();
        this.contentPane.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
    };
    WinGameFail.prototype._initComp = function () {
        new ProxyEnergyBtn_1.default(this.contentPane.btn_energy);
        new ProxyGoldBtn_1.default(this.contentPane.btn_gold);
        var next_btn_spacing = 30; //广告列表开始的y坐标距离列表上面的按钮的距离
        IconAdComponetn_1.default.Inst.addSymmetryGameIcon(this.contentPane, this.contentPane.n16.height + this.contentPane.n16.y + next_btn_spacing, 2, {
            columnSpacing: 20,
            lineSpacing: 20
        }, 10, true);
    };
    WinGameFail.prototype.show = function () {
        _super.prototype.show.call(this);
        hw_common_1.default.platform.showBannerAd(true);
        hw_common_1.default.platform.showInterstitialAd();
        // GameMgr.Inst.CCSFJump();
    };
    WinGameFail.prototype._addEvent = function () {
        this.contentPane.btn_back.onClick(this, this._onClickLobby);
        this.contentPane.btn_restart.onClick(this, this._onClickOk);
        this.contentPane.btn_delay.onClick(this, this._onClickDelay);
        this.contentPane.n16.onClick(this, this._clickMoreGame);
    };
    WinGameFail.prototype._clickMoreGame = function () {
        ViewMgr_1.default.Inst.showWindow(WinMoreGame_1.default);
        hw_common_1.default.sound.playSound(SoundDef_1.default.BTN);
    };
    WinGameFail.prototype._updateHelpBtn = function () {
        this._canShare = hw_common_1.default.share.canShare(SharePointKeyDef_1.default.TILI);
        if (this._canShare) {
            this.contentPane.btn_delay.c1.selectedIndex = 0;
        }
        else {
            this.contentPane.btn_delay.c1.selectedIndex = 1;
        }
    };
    WinGameFail.prototype._onClickDelay = function () {
        this._videoOrShare();
        hw_common_1.default.sound.playSound(SoundDef_1.default.CLICK);
    };
    WinGameFail.prototype._getRewards = function () {
        this.hide();
        this._updateHelpBtn();
        EventMgr_1.default.Inst.event(EventDef_1.default.UI_WINFAILVIDEOOK);
        hw_common_1.default.sound.playSound(SoundDef_1.default.CLICK);
    };
    WinGameFail.prototype._videoOrShare = function () {
        var _this = this;
        hw_common_1.default.share.normalGet({
            shareid: ReportDef_1.default.SHARE_GAMEOVERDELAY,
            sharekey: SharePointKeyDef_1.default.TILI,
            caller: this,
            success: this._getRewards,
            fail: function () {
                _this._updateHelpBtn();
            }
        });
    };
    WinGameFail.prototype._onClickLobby = function (e) {
        ViewMgr_1.default.Inst.showScene(LobbyScene_1.default);
        this.hide();
        hw_common_1.default.sound.playSound(SoundDef_1.default.CLICK);
    };
    WinGameFail.prototype._onClickOk = function (e) {
        if (GameMgr_1.default.Inst.data.currency.energy <= 0) {
            ViewMgr_1.default.Inst.showWindow(WinEnergyOver_1.WinEnergyOver);
            return;
        }
        this._aniGoGame();
        hw_common_1.default.sound.playSound(SoundDef_1.default.CLICK);
    };
    WinGameFail.prototype._aniGoGame = function () {
        var _this = this;
        if (this._flyAni == null) {
            this._flyAni = new fairygui.GLoader();
            this._flyAni.url = "ui://game/img_energy";
            this._flyAni.touchable = false;
        }
        this.contentPane.addChild(this._flyAni);
        this._flyAni.setXY(this.contentPane.btn_energy.x, this.contentPane.btn_energy.y);
        hw_common_1.default.platform.showLoading();
        Laya.Tween.to(this._flyAni, {
            x: this.contentPane.btn_restart.x + this.contentPane.btn_restart.width / 2,
            y: this.contentPane.btn_restart.y + this.contentPane.btn_restart.height / 2
        }, 400, null, Laya.Handler.create(this, function () {
            hw_common_1.default.platform.hideLoading();
            _this._flyAni.removeFromParent();
            GameMgr_1.default.Inst.addCurrency(ECurrencyType_1.ECurrencyType.ENERGY, -1);
            EventMgr_1.default.Inst.event(EventDef_1.default.UI_WINFAILRESTART);
            _this.hide();
        }));
    };
    WinGameFail.prototype.hide = function () {
        _super.prototype.hide.call(this);
    };
    WinGameFail.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
        this.hide();
    };
    return WinGameFail;
}(WindowBase_1.default));
exports.default = WinGameFail;
},{"../../../com/hw_common/hw_common":2,"../../control/ViewMgr":28,"../../control/event/EventMgr":29,"../../control/game/GameMgr":31,"../../def/ECurrencyType":36,"../../def/EventDef":40,"../../def/ReportDef":43,"../../def/SharePointKeyDef":44,"../../def/SoundDef":45,"../fui/game/wingamefail":138,"../proxy/IconAdComponetn":155,"../proxy/ProxyEnergyBtn":156,"../proxy/ProxyGoldBtn":157,"../scenes/lobby/LobbyScene":164,"./WinEnergyOver":169,"./WinMoreGame":176,"./WindowBase":185}],172:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var WindowBase_1 = require("./WindowBase");
var winauthor_1 = require("../fui/game/winauthor");
var SoundDef_1 = require("../../def/SoundDef");
var hw_common_1 = require("../../../com/hw_common/hw_common");
var WinGetAuthor = /** @class */ (function (_super) {
    __extends(WinGetAuthor, _super);
    function WinGetAuthor() {
        var _this = _super.call(this) || this;
        _this._number = 1;
        _this._text = "";
        _this.modal = true;
        return _this;
    }
    WinGetAuthor.prototype.onInit = function () {
        this.contentPane = winauthor_1.default.createInstance();
        this.center();
        this.contentPane.btn_ok.onClick(this, this.onBtnGoon);
    };
    WinGetAuthor.prototype.show = function (param) {
        this._win = param.win;
        this._text = param.text;
        this._isFailShow = param.isFailShow;
        _super.prototype.show.call(this);
    };
    WinGetAuthor.prototype.onShown = function () {
        var _this = this;
        trace("显示");
        this.contentPane.t2.text = this._text;
        hw_common_1.default.sound.playSound(SoundDef_1.default.CLICK);
        hw_common_1.default.platform.getUserInfo().then(function (res) {
            _this.hide();
            if (res) {
                trace("拉取授权test1", res);
                var temp = {};
                temp.avatarUrl = res.avatarUrl;
                temp.gender = res.gender;
                temp.nickName = res.nickName;
                mpsdk.Account.setAccountInfo(temp);
                if (hw_common_1.default.platform.userInfo.gender == null) {
                    mpsdk.Account.setAccountActive(mpsdk.constant.ActiveType.GET_USER_INFO, 0);
                }
                else {
                    mpsdk.Account.setAccountActive(mpsdk.constant.ActiveType.GET_USER_INFO, hw_common_1.default.platform.userInfo.gender);
                }
                if (_this._win.ShowGlobal) {
                    _this._win.ShowGlobal();
                }
            }
            else {
                trace("拉取授权test2", res);
                hw_common_1.default.platform.showToast("拉取授权失败，请稍后重试");
                if (_this._isFailShow == true) {
                    if (_this._win.ShowGlobal) {
                        _this._win.ShowGlobal();
                    }
                }
            }
        }).catch(function (e) {
            trace("拉取授权test3", e);
            hw_common_1.default.platform.showToast("拉取授权失败，请稍后重试");
            _this.hide();
        });
    };
    WinGetAuthor.prototype.onBtnGoon = function () {
        this.hide();
    };
    return WinGetAuthor;
}(WindowBase_1.default));
exports.WinGetAuthor = WinGetAuthor;
},{"../../../com/hw_common/hw_common":2,"../../def/SoundDef":45,"../fui/game/winauthor":133,"./WindowBase":185}],173:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var WindowBase_1 = require("./WindowBase");
var wingetreward_1 = require("../fui/game/wingetreward");
var GameMgr_1 = require("../../control/game/GameMgr");
var ECurrencyType_1 = require("../../def/ECurrencyType");
var TimeMgr_1 = require("../../control/TimeMgr");
var IconAdComponetn_1 = require("../proxy/IconAdComponetn");
var hw_common_1 = require("../../../com/hw_common/hw_common");
var ReportDef_1 = require("../../def/ReportDef");
var SoundDef_1 = require("../../def/SoundDef");
var SceneID_WX_1 = require("../../../com/hw_utils/SceneID_WX");
var EventMgr_1 = require("../../control/event/EventMgr");
var EventDef_1 = require("../../def/EventDef");
var WinGetReward_Param = /** @class */ (function () {
    function WinGetReward_Param(type, num, showdouble, iconImg, other, nextmore) {
        if (showdouble === void 0) { showdouble = true; }
        if (iconImg === void 0) { iconImg = ''; }
        if (other === void 0) { other = null; }
        if (nextmore === void 0) { nextmore = 0; }
        this.type = type;
        this.num = num;
        this.showdouble = showdouble;
        this.iconImg = iconImg;
        this.other = other;
        this.nextmore = nextmore;
    }
    return WinGetReward_Param;
}());
exports.WinGetReward_Param = WinGetReward_Param;
var WinGetReward = /** @class */ (function (_super) {
    __extends(WinGetReward, _super);
    function WinGetReward() {
        var _this = _super.call(this) || this;
        _this.modal = true;
        return _this;
    }
    WinGetReward.prototype.onInit = function () {
        this.contentPane = wingetreward_1.default.createInstance();
        this.center();
        this._updateHelpBtn();
        this.contentPane.btn_receive.onClick(this, this.clickReward);
        this.contentPane.btn_close.onClick(this, this.onClose);
        this.contentPane.btn_nextmore.onClick(this, this.clickNextMore);
        this.contentPane.btn_double_receive.onClick(this, this.clickDoubleReceive);
        var next_btn_spacing = 30; //广告列表开始的y坐标距离列表上面的按钮的距离
        IconAdComponetn_1.default.Inst.addSymmetryGameIcon(this.contentPane, this.contentPane.n10.y + next_btn_spacing, 2, {
            columnSpacing: 20,
            lineSpacing: 20
        }, 10, true);
    };
    WinGetReward.prototype.show = function (param) {
        var _this = this;
        _super.prototype.show.call(this);
        this._param = param;
        switch (this._param.type) {
            case ECurrencyType_1.ECurrencyType.ENERGY:
                this.contentPane.state.selectedIndex = 1;
                break;
            case ECurrencyType_1.ECurrencyType.GOLD:
                this.contentPane.state.selectedIndex = 0;
                break;
            case ECurrencyType_1.ECurrencyType.NEXTMORE:
                this.contentPane.txt_nextmore.text = "下次" + this._param.num + '倍奖励';
                this.contentPane.state.selectedIndex = 3;
                break;
            default:
                this.contentPane.state.selectedIndex = 2;
                break;
        }
        if (this._param.nextmore) {
            this.contentPane.reward_nextmore.text = this._param.nextmore + '倍奖励';
            var frome = Math.floor(this._param.num / this._param.nextmore);
            this.contentPane.reward_num.text = "" + frome;
            TimeMgr_1.default.Inst.addTimeEvent(750, TimeMgr_1.TimeBindType.Delay, function () {
                _this.contentPane.reward_num.text = _this._param.num + '';
            });
        }
        else {
            this.contentPane.reward_nextmore.text = "";
            this.contentPane.reward_num.text = this._param.num + '';
        }
        this.contentPane.btn_receive.visible = true;
        this.contentPane.btn_double_receive.visible = this._param.showdouble;
        if (this._param.iconImg) {
            this.contentPane.other_icon.url = this._param.iconImg;
            var CUSTOM_IMG_STATE = 2;
            if (this.contentPane.state.selectedIndex != 3)
                this.contentPane.state.selectedIndex = CUSTOM_IMG_STATE;
        }
        this._showReport();
    };
    WinGetReward.prototype._showReport = function () {
        switch (this._param.other) {
            case SceneID_WX_1.SceneID_WX.FLOATWIN:
                GameMgr_1.default.Inst.setHadGetReward('floatWindow', true);
                hw_common_1.default.mpsdk.reportEvent(ReportDef_1.default.EVENT_GETFLOATINGWINGIFT);
                break;
            case SceneID_WX_1.SceneID_WX.COLLECT:
                GameMgr_1.default.Inst.setHadGetReward('addMyGame', true);
                hw_common_1.default.mpsdk.reportEvent(ReportDef_1.default.EVENT_COLLECTGETENERGY, '');
                EventMgr_1.default.Inst.event(EventDef_1.default.GAME_GETREWARDCOLLECTION);
                break;
            default:
                break;
        }
    };
    WinGetReward.prototype.onShown = function () {
    };
    WinGetReward.prototype.clickReward = function () {
        GameMgr_1.default.Inst.addCurrency(this._param.type, this._param.num);
        hw_common_1.default.platform.showToast("领取成功");
        this.onClose();
    };
    WinGetReward.prototype.clickNextMore = function () {
        if (platform.debug) {
            this.clickReward();
        }
        else {
            this._chooseShareNextMore();
        }
    };
    WinGetReward.prototype._chooseShareNextMore = function () {
        var _this = this;
        hw_common_1.default.share.normalGet({
            shareid: ReportDef_1.default.SHARE_REWARDSNEXTMORE,
            caller: this,
            success: this.clickReward,
            fail: function () {
                _this._updateHelpBtn();
            }
        });
    };
    WinGetReward.prototype.clickDoubleReceive = function () {
        if (platform.debug) {
            this._getRewardDoubles();
        }
        else {
            this._chooseShareDouble();
        }
    };
    WinGetReward.prototype._updateHelpBtn = function () {
        this._canShare = hw_common_1.default.share.canShare();
        if (this._canShare) {
            this.contentPane.btn_nextmore.c1.selectedIndex = 0;
            this.contentPane.btn_double_receive.c1.selectedIndex = 0;
        }
        else {
            this.contentPane.btn_nextmore.c1.selectedIndex = 1;
            this.contentPane.btn_double_receive.c1.selectedIndex = 1;
        }
    };
    WinGetReward.prototype._getRewardDoubles = function () {
        var _this = this;
        this._updateHelpBtn();
        this.contentPane.btn_receive.visible = false;
        this.contentPane.btn_double_receive.visible = false;
        var cnum = this._param.num * 2;
        GameMgr_1.default.Inst.addCurrency(this._param.type, cnum);
        this.contentPane.t1.play(null, 1);
        TimeMgr_1.default.Inst.addTimeEvent(750, TimeMgr_1.TimeBindType.Delay, function () {
            _this.contentPane.reward_num.text = "" + cnum;
        });
        TimeMgr_1.default.Inst.addTimeEvent(2000, TimeMgr_1.TimeBindType.Delay, function () {
            _this.onClose();
        });
    };
    WinGetReward.prototype._chooseShareDouble = function () {
        var _this = this;
        hw_common_1.default.share.normalGet({
            shareid: ReportDef_1.default.SHARE_REWARDSDOUBLE,
            caller: this,
            success: this._getRewardDoubles,
            fail: function () {
                _this._updateHelpBtn();
            }
        });
    };
    WinGetReward.prototype.onClose = function () {
        this.hide();
        hw_common_1.default.sound.playSound(SoundDef_1.default.CLICK);
    };
    return WinGetReward;
}(WindowBase_1.default));
exports.default = WinGetReward;
},{"../../../com/hw_common/hw_common":2,"../../../com/hw_utils/SceneID_WX":20,"../../control/TimeMgr":27,"../../control/event/EventMgr":29,"../../control/game/GameMgr":31,"../../def/ECurrencyType":36,"../../def/EventDef":40,"../../def/ReportDef":43,"../../def/SoundDef":45,"../fui/game/wingetreward":139,"../proxy/IconAdComponetn":155,"./WindowBase":185}],174:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var winlevel_1 = require("../fui/game/winlevel");
var WindowBase_1 = require("./WindowBase");
var ConfigMgr_1 = require("../../control/ConfigMgr");
var ConfigDef_1 = require("../../def/ConfigDef");
var GameMgr_1 = require("../../control/game/GameMgr");
var hw_common_1 = require("../../../com/hw_common/hw_common");
var SoundDef_1 = require("../../def/SoundDef");
var WinLevel = /** @class */ (function (_super) {
    __extends(WinLevel, _super);
    function WinLevel() {
        var _this = _super.call(this) || this;
        _this.modal = true;
        return _this;
    }
    WinLevel.prototype.onInit = function () {
        this.contentPane = winlevel_1.default.createInstance();
        this.center();
        this.contentPane.btn_Close.onClick(this, this.onClose);
        this.initData();
    };
    WinLevel.prototype.show = function (param) {
        _super.prototype.show.call(this);
        trace("WinTips::Show->接收到窗口参数:", param);
        this.initPos();
        this.initList();
    };
    WinLevel.prototype.onShown = function () {
    };
    WinLevel.prototype.initPos = function () {
        var nowAchievementData = GameMgr_1.default.Inst.getAchievementData().data;
        for (var i = 0; i < this._listData.length; i++) {
            if (JSON.stringify(this._listData[i]) == JSON.stringify(nowAchievementData)) {
                this._pos = i;
                break;
            }
        }
    };
    WinLevel.prototype.initData = function () {
        this._listData = JSON.parse(JSON.stringify(ConfigMgr_1.default.Inst.GetConfigByName(ConfigDef_1.default.Achievement)));
        this._listData.sort(function (a, b) {
            return b.id - a.id;
        });
    };
    WinLevel.prototype.initList = function () {
        var _this = this;
        this.contentPane.level_list.numItems = 0;
        this.contentPane.level_list.setVirtual();
        this.contentPane.level_list.itemRenderer = Laya.Handler.create(this, this.getListItemResource, null, false);
        this.contentPane.level_list.numItems = this._listData.length;
        setTimeout(function () {
            _this.contentPane.level_list.scrollPane.scrollDown(_this._pos);
        }, 100);
    };
    WinLevel.prototype.getListItemResource = function (index, obj) {
        var item = obj;
        var data = this._listData[index];
        item.touchable = true;
        item.level_title.text = index >= this._pos ? data.name : '?????';
        item.level_instructions.text = '完成关卡' + data.throughLevel;
        if (index == this._pos) {
            item.state.selectedIndex = 1;
        }
        else {
            item.state.selectedIndex = index > this._pos ? 2 : 0;
        }
        item.level_icon.url = platform.cdnURL + "achievementimage/" + this._listData[index].icon + ".png";
    };
    WinLevel.prototype.onClose = function () {
        this.hide();
        hw_common_1.default.sound.playSound(SoundDef_1.default.CLICK);
    };
    return WinLevel;
}(WindowBase_1.default));
exports.default = WinLevel;
},{"../../../com/hw_common/hw_common":2,"../../control/ConfigMgr":23,"../../control/game/GameMgr":31,"../../def/ConfigDef":34,"../../def/SoundDef":45,"../fui/game/winlevel":141,"./WindowBase":185}],175:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var winluckydraw_1 = require("../fui/game/winluckydraw");
var WindowBase_1 = require("./WindowBase");
var itemreward_1 = require("../fui/game/itemreward");
var ViewMgr_1 = require("../../control/ViewMgr");
var WinMoreGame_1 = require("./WinMoreGame");
var WinGetReward_1 = require("./WinGetReward");
var ECurrencyType_1 = require("../../def/ECurrencyType");
var EventMgr_1 = require("../../control/event/EventMgr");
var GameMgr_1 = require("../../control/game/GameMgr");
var ProxyEnergyBtn_1 = require("../proxy/ProxyEnergyBtn");
var ProxyGoldBtn_1 = require("../proxy/ProxyGoldBtn");
var IconAdComponetn_1 = require("../proxy/IconAdComponetn");
var EventDef_1 = require("../../def/EventDef");
var hw_common_1 = require("../../../com/hw_common/hw_common");
var ReportDef_1 = require("../../def/ReportDef");
var SoundDef_1 = require("../../def/SoundDef");
var SharePointKeyDef_1 = require("../../def/SharePointKeyDef");
var WinLuckDraw = /** @class */ (function (_super) {
    __extends(WinLuckDraw, _super);
    function WinLuckDraw() {
        var _this = _super.call(this) || this;
        _this._listData = [];
        _this.DEVIATION = 50;
        _this.modal = true;
        return _this;
    }
    WinLuckDraw.prototype.onInit = function () {
        this.contentPane = winluckydraw_1.default.createInstance();
        this.contentPane.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        this.contentPane.btn_back.onClick(this, this.onClose);
        this._listData = [
            { type: ECurrencyType_1.ECurrencyType.ENERGY, num: 1, weight1: 0, weight2: 250, weight3: 200, icon: 'energy1.png' },
            { type: ECurrencyType_1.ECurrencyType.ENERGY, num: 2, weight1: 0, weight2: 350, weight3: 250, icon: 'energy1.png' },
            { type: ECurrencyType_1.ECurrencyType.ENERGY, num: 3, weight1: 0, weight2: 250, weight3: 250, icon: 'energy2.png' },
            { type: ECurrencyType_1.ECurrencyType.ENERGY, num: 4, weight1: 0, weight2: 100, weight3: 250, icon: 'energy3.png' },
            { type: ECurrencyType_1.ECurrencyType.GOLD, num: 25, weight1: 0, weight2: 0, weight3: 0, icon: 'gold1.png' },
            { type: ECurrencyType_1.ECurrencyType.GOLD, num: 50, weight1: 0, weight2: 0, weight3: 0, icon: 'gold2.png' },
            { type: ECurrencyType_1.ECurrencyType.GOLD, num: 100, weight1: 0, weight2: 0, weight3: 0, icon: 'gold3.png' },
            { type: ECurrencyType_1.ECurrencyType.GOLD, num: 150, weight1: 0, weight2: 0, weight3: 0, icon: 'gold4.png' },
            { type: ECurrencyType_1.ECurrencyType.GOLD, num: 200, weight1: 0, weight2: 0, weight3: 0, icon: 'gold5.png' },
            { type: ECurrencyType_1.ECurrencyType.GOLD, num: 250, weight1: 0, weight2: 0, weight3: 0, icon: 'gold6.png' },
            { type: ECurrencyType_1.ECurrencyType.NEXTMORE, num: 2, weight1: 200, weight2: 0, weight3: 50, icon: 'nextmore2.png' },
            { type: ECurrencyType_1.ECurrencyType.NEXTMORE, num: 3, weight1: 800, weight2: 0, weight3: 50, icon: 'nextmore3.png' },
        ];
        new ProxyEnergyBtn_1.default(this.contentPane.com_energy);
        new ProxyGoldBtn_1.default(this.contentPane.com_gold);
        this.initLists();
        this.initPos();
        this.addEvent();
        this.updateLuckNum();
        var list_luckt_spacing = 30; //广告列表开始的y坐标距离列表list_luck的距离
        IconAdComponetn_1.default.Inst.addSymmetryGameIcon(this.contentPane, this.contentPane.list_luck.height + this.contentPane.list_luck.y + list_luckt_spacing, 2, {
            columnSpacing: 20,
            lineSpacing: 20
        }, 8, true);
    };
    WinLuckDraw.prototype.show = function (param) {
        _super.prototype.show.call(this);
        trace("WinTips::Show->接收到窗口参数:", param);
        Laya.Tween.clearAll(this.contentPane.n24);
        this._updateHelpBtn();
        // this.contentPane.n24.x = 0;
        // Laya.Tween.to(this.contentPane.n24, { x: -500 }, 30000, Laya.Ease.linearNone);
    };
    WinLuckDraw.prototype.onShown = function () {
    };
    WinLuckDraw.prototype.addEvent = function () {
        var _this = this;
        this.contentPane.btn_luck.onClick(this, this.clickLuckDrawBtn);
        this.contentPane.btn_moregame.onClick(this, this.clickMoreGame);
        EventMgr_1.default.Inst.on(EventDef_1.default.LUCK_NUMCHANGE, this, this.updateLuckNum);
        EventMgr_1.default.Inst.on(EventDef_1.default.UI_HIDEWINDOW, this, function () {
            _this._updateHelpBtn();
        });
    };
    WinLuckDraw.prototype.clickMoreGame = function () {
        ViewMgr_1.default.Inst.showWindow(WinMoreGame_1.default);
    };
    WinLuckDraw.prototype.clickLuckDrawBtn = function () {
        if (GameMgr_1.default.Inst.data.currency.luck_num < 1) {
            this.clickDoubleReceive();
        }
        else {
            this.luckDraw();
            GameMgr_1.default.Inst.addCurrency(ECurrencyType_1.ECurrencyType.LUCKNUM, -1);
        }
    };
    WinLuckDraw.prototype.luckDraw = function () {
        var _this = this;
        var randomIndex = this.randomReward();
        var newIndex = Math.floor(Math.abs(this.contentPane.n24.x - (this.contentPane.sel_box.x + this.DEVIATION)) / this.REWARD_ITEM_WIDTH);
        var ROLL_NUM = 3;
        var total_pos_x = (randomIndex + this._listData.length * ROLL_NUM) * this.REWARD_ITEM_WIDTH - (this.contentPane.sel_box.x + this.DEVIATION);
        console.log(this.contentPane.width, randomIndex, newIndex);
        this.contentPane.touchable = false;
        Laya.Tween.clearAll(this.contentPane.n24);
        Laya.Tween.to(this.contentPane.n24, { x: -total_pos_x }, 4000, Laya.Ease.quartOut, Laya.Handler.create(this, function () {
            var nowIndex = Math.floor(Math.abs(_this.contentPane.n24.x - (_this.contentPane.sel_box.x + _this.DEVIATION)) / _this.REWARD_ITEM_WIDTH) % _this._listData.length;
            //当目前的跳转坐标在2之前有空白，为保证左边没有空白，所做的处理
            if (nowIndex < 2) {
                nowIndex += _this._listData.length;
            }
            _this.contentPane.n24.x = -nowIndex * _this.REWARD_ITEM_WIDTH + _this.contentPane.sel_box.x + _this.DEVIATION;
            _this.openRewardWin(nowIndex);
            _this.contentPane.touchable = true;
        }));
        this._updateHelpBtn();
    };
    WinLuckDraw.prototype.randomReward = function () {
        //type:1 只能抽中2倍3倍,type:2:只能抽中精力,type:3:都可抽中
        var type = 0;
        if (GameMgr_1.default.Inst.data.currency.nextmore > 0) {
            type = 2;
        }
        else if (GameMgr_1.default.Inst.data.currency.luck_num > 0) {
            type = 1;
        }
        else {
            type = 3;
        }
        var totalWeight = 0;
        for (var i = 0; i < this._listData.length; i++) {
            totalWeight += this._listData[i]["weight" + type];
        }
        var weight = 0;
        var randomWeight = Math.floor(Math.random() * totalWeight);
        console.log('随机位置：', randomWeight);
        for (var i = 0; i < this._listData.length; i++) {
            if (randomWeight <= weight + this._listData[i]["weight" + type]) {
                return i;
            }
            else {
                weight += this._listData[i]["weight" + type];
            }
        }
    };
    WinLuckDraw.prototype.luckDraw1 = function () {
        var _this = this;
        var randomIndex = Math.floor(Math.random() * this._listData.length);
        var nowIndex = Math.floor((this.contentPane.list_luck.scrollPane.posX + this.contentPane.sel_box.x) / this.REWARD_ITEM_WIDTH) % this._listData.length;
        var TOTAL_POS_X = (randomIndex + this._listData.length * 2) * this.REWARD_ITEM_WIDTH;
        var MIN_STOP = 3.5;
        var SLOW_DOWN = 100;
        var SPEED;
        var nowPosX = TOTAL_POS_X - this.contentPane.list_luck.scrollPane.posX;
        var MIN_THRESHOLD = 3000;
        if (nowPosX < MIN_THRESHOLD) {
            TOTAL_POS_X += this._listData.length * this.REWARD_ITEM_WIDTH;
        }
        console.log('目前的index：', nowIndex, randomIndex, Math.floor(TOTAL_POS_X / this.REWARD_ITEM_WIDTH) % this._listData.length, TOTAL_POS_X, this.contentPane.list_luck.scrollPane.posX);
        this.contentPane.touchable = false;
        this.setinter = setInterval(function () {
            nowPosX = TOTAL_POS_X - _this.contentPane.list_luck.scrollPane.posX;
            SPEED = nowPosX / SLOW_DOWN;
            if (SPEED < MIN_STOP) {
                clearInterval(_this.setinter);
                var index = Math.round((_this.contentPane.list_luck.scrollPane.posX + _this.contentPane.sel_box.x) / _this.REWARD_ITEM_WIDTH) % _this._listData.length;
                var posx = index * _this.REWARD_ITEM_WIDTH - _this.contentPane.sel_box.x;
                if (posx < 0) {
                    posx = (_this._listData.length + index) * _this.REWARD_ITEM_WIDTH - _this.contentPane.sel_box.x;
                }
                _this.contentPane.list_luck.scrollPane.setPosX(posx - _this.DEVIATION);
                _this.contentPane.touchable = true;
                console.log('最后的Index：', Math.floor((_this.contentPane.list_luck.scrollPane.posX + _this.contentPane.sel_box.x + _this.DEVIATION) / _this.REWARD_ITEM_WIDTH) % _this._listData.length, randomIndex);
                var newIndex = Math.floor((_this.contentPane.list_luck.scrollPane.posX + _this.contentPane.sel_box.x + _this.DEVIATION) / _this.REWARD_ITEM_WIDTH) % _this._listData.length;
                _this.openRewardWin(newIndex);
            }
            _this.contentPane.list_luck.scrollPane.setPosX(_this.contentPane.list_luck.scrollPane.posX + SPEED);
        }, 30);
    };
    WinLuckDraw.prototype.initPos = function () {
        var currentIndex = 3;
        this.contentPane.n24.x = -this.REWARD_ITEM_WIDTH * currentIndex + this.contentPane.sel_box.x + this.DEVIATION;
    };
    WinLuckDraw.prototype.initLists = function () {
        this.contentPane.list_luck.visible = false;
        var ROLL_TOTAL_NUM = 5;
        for (var i = 0; i < this._listData.length * ROLL_TOTAL_NUM; i++) {
            var itemReward = itemreward_1.default.createInstance();
            itemReward.x = itemReward.width * i;
            if (this._listData[i % this._listData.length].type == ECurrencyType_1.ECurrencyType.NEXTMORE) {
                itemReward.reward_text.text = "下次" + this._listData[i % this._listData.length].num + "倍奖励";
            }
            else {
                itemReward.reward_text.text = this._listData[i % this._listData.length].num + '';
            }
            itemReward.icon_img.url = "res/goldandenergyicon/" + this._listData[i % this._listData.length].icon;
            this.contentPane.n24.addChild(itemReward);
            console.log(itemReward.width);
            this.REWARD_ITEM_WIDTH = itemReward.width;
        }
    };
    WinLuckDraw.prototype.initList = function () {
        this.contentPane.list_luck.setVirtualAndLoop();
        this.contentPane.list_luck.itemRenderer = Laya.Handler.create(this, this.getListItemResource, null, false);
        this.contentPane.list_luck.numItems = this._listData.length;
    };
    WinLuckDraw.prototype.getListItemResource = function (index, obj) {
        var item = obj;
        if (this._listData[index].type == ECurrencyType_1.ECurrencyType.NEXTMORE) {
            item.reward_text.text = "下次" + this._listData[index].num + "倍奖励";
        }
        else {
            item.reward_text.text = this._listData[index].num + '';
        }
        item.icon_img.url = "res/goldandenergyicon/" + (index < 3 ? 'energy' + (index + 1) : 'gold' + (index - 2)) + ".png";
        this.REWARD_ITEM_WIDTH = item.width;
    };
    WinLuckDraw.prototype.openRewardWin = function (index) {
        index = index % this._listData.length;
        var rewardData = this._listData[index];
        var num = rewardData.num;
        var showdouble = rewardData.type != ECurrencyType_1.ECurrencyType.NEXTMORE;
        var nextmore = 0;
        if (GameMgr_1.default.Inst.data.currency.nextmore > 0) {
            num *= GameMgr_1.default.Inst.data.currency.nextmore;
            nextmore = GameMgr_1.default.Inst.data.currency.nextmore;
        }
        GameMgr_1.default.Inst.data.currency.nextmore = 0;
        ViewMgr_1.default.Inst.showWindow(WinGetReward_1.default, new WinGetReward_1.WinGetReward_Param(rewardData.type, num, showdouble, "res/goldandenergyicon/" + this._listData[index].icon, null, nextmore));
        GameMgr_1.default.Inst.SaveData();
        this._updateHelpBtn();
    };
    WinLuckDraw.prototype.updateLuckNum = function () {
        this.contentPane.luck_num.text = '今日免费次数：' + GameMgr_1.default.Inst.data.currency.luck_num;
        var button_state = { show: 0, hide: 1 };
        // this.contentPane.btn_luck.state.selectedIndex = GameMgr.Inst.data.currency.luck_num > 0 ? button_state.show : button_state.hide;
    };
    WinLuckDraw.prototype.clickDoubleReceive = function () {
        if (platform.debug) {
            this.luckDraw();
        }
        else {
            this._chooseShare();
        }
    };
    WinLuckDraw.prototype._updateHelpBtn = function () {
        this._canShare = hw_common_1.default.share.canShare(SharePointKeyDef_1.default.CHOUJIANG);
        var isfree = GameMgr_1.default.Inst.data.currency.luck_num > 0;
        if (isfree) {
            this.contentPane.btn_luck.state.selectedIndex = 0;
        }
        else if (this._canShare) {
            this.contentPane.btn_luck.state.selectedIndex = 2;
        }
        else {
            this.contentPane.btn_luck.state.selectedIndex = 1;
        }
    };
    WinLuckDraw.prototype._chooseShare = function () {
        var _this = this;
        hw_common_1.default.share.normalGet({
            shareid: ReportDef_1.default.SHARE_LUCKDRAW,
            sharekey: SharePointKeyDef_1.default.CHOUJIANG,
            caller: this,
            success: this.luckDraw,
            fail: function () {
                _this._updateHelpBtn();
            }
        });
    };
    WinLuckDraw.prototype.onClose = function () {
        this.hide();
        clearInterval(this.setinter);
        hw_common_1.default.sound.playSound(SoundDef_1.default.CLICK);
    };
    return WinLuckDraw;
}(WindowBase_1.default));
exports.default = WinLuckDraw;
},{"../../../com/hw_common/hw_common":2,"../../control/ViewMgr":28,"../../control/event/EventMgr":29,"../../control/game/GameMgr":31,"../../def/ECurrencyType":36,"../../def/EventDef":40,"../../def/ReportDef":43,"../../def/SharePointKeyDef":44,"../../def/SoundDef":45,"../fui/game/itemreward":123,"../fui/game/winluckydraw":142,"../proxy/IconAdComponetn":155,"../proxy/ProxyEnergyBtn":156,"../proxy/ProxyGoldBtn":157,"./WinGetReward":173,"./WinMoreGame":176,"./WindowBase":185}],176:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var WindowBase_1 = require("./WindowBase");
var winmoregame_1 = require("../fui/game/winmoregame");
var GameMgr_1 = require("../../control/game/GameMgr");
var SoundDef_1 = require("../../def/SoundDef");
var hw_common_1 = require("../../../com/hw_common/hw_common");
var MathUtils_1 = require("../../../com/hw_utils/MathUtils");
var WinMoreGame = /** @class */ (function (_super) {
    __extends(WinMoreGame, _super);
    function WinMoreGame() {
        var _this = _super.call(this) || this;
        _this.modal = true;
        return _this;
    }
    WinMoreGame.prototype.onInit = function () {
        this.contentPane = winmoregame_1.default.createInstance();
        this.contentPane.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        this.initListSouce();
        this.contentPane.back_game.onClick(this, this.onClose);
    };
    WinMoreGame.prototype.show = function (param) {
        _super.prototype.show.call(this);
        trace("WinTips::Show->接收到窗口参数:", param);
    };
    WinMoreGame.prototype.onShown = function () {
    };
    WinMoreGame.prototype.initListSouce = function () {
        var _this = this;
        this.contentPane.game_list.numItems = 0;
        mpsdk.Ad.getSuggestList(true, 0, GameMgr_1.default.Inst.level).then(function (list) {
            _this.gameList = list;
            trace(_this.gameList);
            _this.initList();
            _this.updateList();
        });
    };
    WinMoreGame.prototype.updateList = function () {
        this.contentPane.game_list.numItems = this.gameList.length;
    };
    WinMoreGame.prototype.initList = function () {
        this.contentPane.game_list.setVirtual();
        this.contentPane.game_list.itemRenderer = Laya.Handler.create(this, this.getListItemResource, null, false);
    };
    WinMoreGame.prototype.getListItemResource = function (index, obj) {
        var item = obj;
        item.touchable = true;
        //动态图
        // item.displayListContainer.addChild(mpsdk.ui.LayaADSingleUI.Create(this.gameList[index], 140, false))
        // if (this.gameList[index].icon.indexOf(".gif") >= 0) {
        item.n0.itemicon.url = this.gameList[index].icon;
        item.txt_name.text = this.gameList[index].title;
        item.txt_num.text = MathUtils_1.default.randomBetween_Int(140000, 180000) + "人在玩";
        item.onClick(this, this.onClickItem, [this.gameList[index]]);
        // }
    };
    WinMoreGame.prototype.onClickItem = function (obj) {
        console.log(obj);
        if (obj) {
            mpsdk.Ad.click(obj);
        }
    };
    WinMoreGame.prototype.onClose = function () {
        this.hide();
        hw_common_1.default.sound.playSound(SoundDef_1.default.CLICK);
    };
    return WinMoreGame;
}(WindowBase_1.default));
exports.default = WinMoreGame;
},{"../../../com/hw_common/hw_common":2,"../../../com/hw_utils/MathUtils":19,"../../control/game/GameMgr":31,"../../def/SoundDef":45,"../fui/game/winmoregame":143,"./WindowBase":185}],177:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var WindowBase_1 = require("./WindowBase");
var hw_common_1 = require("../../../com/hw_common/hw_common");
var winmustshare_1 = require("../fui/game/winmustshare");
var ReportDef_1 = require("../../def/ReportDef");
var GameMgr_1 = require("../../control/game/GameMgr");
var ECurrencyType_1 = require("../../def/ECurrencyType");
var ViewMgr_1 = require("../../control/ViewMgr");
var GameScene_1 = require("../scenes/game/GameScene");
var TimeMgr_1 = require("../../control/TimeMgr");
var WinMustShare = /** @class */ (function (_super) {
    __extends(WinMustShare, _super);
    function WinMustShare() {
        var _this = _super.call(this) || this;
        _this.modal = true;
        return _this;
    }
    WinMustShare.prototype.onInit = function () {
        this.contentPane = winmustshare_1.default.createInstance();
        this.center();
        this.contentPane.btn_share.onClick(this, this._onShare);
        this.contentPane.btn_ok.onClick(this, this.onBtnGoon);
    };
    WinMustShare.prototype.show = function () {
        _super.prototype.show.call(this);
    };
    WinMustShare.prototype.onShown = function () {
    };
    WinMustShare.prototype._onShare = function () {
        if (hw_common_1.default.config.safe) {
            hw_common_1.default.share.shareGet({ shareid: ReportDef_1.default.SHARE_ENERGYMUSTSHARE, caller: this, success: this._getRewards }, false);
        }
        else {
            hw_common_1.default.share.videoGet({ shareid: ReportDef_1.default.SHARE_ENERGYMUSTSHARE, caller: this, success: this._getRewards });
        }
    };
    WinMustShare.prototype._getRewards = function () {
        var _this = this;
        GameMgr_1.default.Inst.data.other.showmustshare = GameMgr_1.default.Inst.level;
        GameMgr_1.default.Inst.LoadLevel(function () {
            var config = GameMgr_1.default.Inst.levelConfig;
            GameMgr_1.default.Inst.loadLevelAsset(config); //顺便加载图片
            if (GameMgr_1.default.Inst.data.currency.energy >= 1) {
                GameMgr_1.default.Inst.addCurrency(ECurrencyType_1.ECurrencyType.ENERGY, -1);
            }
            ViewMgr_1.default.Inst.showScene(GameScene_1.default);
            GameMgr_1.default.Inst.SaveData();
        }, function (errtips) {
            TimeMgr_1.default.Inst.addTimeEvent(500, TimeMgr_1.TimeBindType.Delay, function () {
                hw_common_1.default.platform.showToast(errtips);
            }, _this);
        });
    };
    WinMustShare.prototype.onBtnGoon = function () {
        this.hide();
    };
    return WinMustShare;
}(WindowBase_1.default));
exports.WinMustShare = WinMustShare;
},{"../../../com/hw_common/hw_common":2,"../../control/TimeMgr":27,"../../control/ViewMgr":28,"../../control/game/GameMgr":31,"../../def/ECurrencyType":36,"../../def/ReportDef":43,"../fui/game/winmustshare":144,"../scenes/game/GameScene":160,"./WindowBase":185}],178:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var WindowBase_1 = require("./WindowBase");
var winofflinebox_1 = require("../fui/game/winofflinebox");
var IconAdComponetn_1 = require("../proxy/IconAdComponetn");
var ViewMgr_1 = require("../../control/ViewMgr");
var WinGetReward_1 = require("./WinGetReward");
var ECurrencyType_1 = require("../../def/ECurrencyType");
var ReportDef_1 = require("../../def/ReportDef");
var hw_common_1 = require("../../../com/hw_common/hw_common");
var SoundDef_1 = require("../../def/SoundDef");
var GameDef_1 = require("../../def/GameDef");
var SharePointKeyDef_1 = require("../../def/SharePointKeyDef");
var GameMgr_1 = require("../../control/game/GameMgr");
var WinOfflineBox = /** @class */ (function (_super) {
    __extends(WinOfflineBox, _super);
    function WinOfflineBox() {
        var _this = _super.call(this) || this;
        _this.modal = true;
        return _this;
    }
    WinOfflineBox.prototype.onInit = function () {
        this.contentPane = winofflinebox_1.default.createInstance();
        this.center();
        this.contentPane.n9.onClick(this, this.onClose);
        this.contentPane.n3.onClick(this, this._chooseShare);
        this._updateHelpBtn();
        var next_btn_spacing = 30; //广告列表开始的y坐标距离列表上面的按钮的距离
        IconAdComponetn_1.default.Inst.addSymmetryGameIcon(this.contentPane, this.contentPane.n2.y + next_btn_spacing, 2, {
            columnSpacing: 20,
            lineSpacing: 20
        }, 10, true);
    };
    WinOfflineBox.prototype.show = function (param) {
        _super.prototype.show.call(this);
        trace("WinTips::Show->接收到窗口参数:", param);
    };
    WinOfflineBox.prototype.onShown = function () {
    };
    WinOfflineBox.prototype._getRewards = function () {
        this._updateHelpBtn();
        ViewMgr_1.default.Inst.showWindow(WinGetReward_1.default, new WinGetReward_1.WinGetReward_Param(ECurrencyType_1.ECurrencyType.ENERGY, GameDef_1.default.OFFLINEREWARDS_ENERGY_NUM, false));
        GameMgr_1.default.Inst.data.other.gotofflinetm = hw_common_1.default.servertime.now;
        this.hide();
    };
    WinOfflineBox.prototype._updateHelpBtn = function () {
        this._canShare = hw_common_1.default.share.canShare(SharePointKeyDef_1.default.LIXIAN);
        if (this._canShare) {
            this.contentPane.n3.c1.selectedIndex = 0;
        }
        else {
            this.contentPane.n3.c1.selectedIndex = 1;
        }
    };
    WinOfflineBox.prototype._chooseShare = function () {
        var _this = this;
        hw_common_1.default.share.normalGet({
            shareid: ReportDef_1.default.SHARE_OFFLINEBOXBTN,
            sharekey: SharePointKeyDef_1.default.LIXIAN,
            caller: this,
            success: this._getRewards,
            fail: function () {
                _this._updateHelpBtn();
            }
        });
    };
    WinOfflineBox.prototype.onClose = function () {
        this.hide();
        hw_common_1.default.sound.playSound(SoundDef_1.default.BTN);
    };
    return WinOfflineBox;
}(WindowBase_1.default));
exports.default = WinOfflineBox;
},{"../../../com/hw_common/hw_common":2,"../../control/ViewMgr":28,"../../control/game/GameMgr":31,"../../def/ECurrencyType":36,"../../def/GameDef":41,"../../def/ReportDef":43,"../../def/SharePointKeyDef":44,"../../def/SoundDef":45,"../fui/game/winofflinebox":145,"../proxy/IconAdComponetn":155,"./WinGetReward":173,"./WindowBase":185}],179:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var WindowBase_1 = require("./WindowBase");
var winpromotionreward_1 = require("../fui/game/winpromotionreward");
var GameMgr_1 = require("../../control/game/GameMgr");
var ECurrencyType_1 = require("../../def/ECurrencyType");
var hw_common_1 = require("../../../com/hw_common/hw_common");
var SoundDef_1 = require("../../def/SoundDef");
var ReportDef_1 = require("../../def/ReportDef");
var ViewMgr_1 = require("../../control/ViewMgr");
var WinGetReward_1 = require("./WinGetReward");
var GameDef_1 = require("../../def/GameDef");
var WinPromotionReward = /** @class */ (function (_super) {
    __extends(WinPromotionReward, _super);
    function WinPromotionReward() {
        var _this = _super.call(this) || this;
        _this.REWARD_GOLD = 100;
        _this.modal = true;
        return _this;
    }
    WinPromotionReward.prototype.onInit = function () {
        this.contentPane = winpromotionreward_1.default.createInstance();
        this.center();
        this.contentPane.btn_promotion_reward.onClick(this, this.clickReward);
        this.contentPane.n25.onClick(this, this.onClose);
    };
    WinPromotionReward.prototype.clickReward = function () {
        hw_common_1.default.share.shareGet({
            shareid: ReportDef_1.default.SHARE_PROMOTIONSHARE,
            caller: this,
            success: this._getRewards
        }, false);
    };
    WinPromotionReward.prototype._getRewards = function () {
        ViewMgr_1.default.Inst.showWindow(WinGetReward_1.default, new WinGetReward_1.WinGetReward_Param(ECurrencyType_1.ECurrencyType.ENERGY, GameDef_1.default.RANKUPREWARDS_ENERGY_NUM, true));
        this.onClose();
    };
    WinPromotionReward.prototype.show = function (param) {
        _super.prototype.show.call(this);
        trace("WinTips::Show->接收到窗口参数:", param);
        this.updateLevelInfo();
    };
    WinPromotionReward.prototype.onShown = function () {
    };
    WinPromotionReward.prototype.updateLevelInfo = function () {
        var nowAchievementLevel = GameMgr_1.default.Inst.getAchievementData();
        this.contentPane.level_name_icon.url = platform.cdnURL + "achievementimage/" + nowAchievementLevel.data.levelname + ".png";
    };
    WinPromotionReward.prototype.onClose = function () {
        this.hide();
        hw_common_1.default.sound.playSound(SoundDef_1.default.BTN);
    };
    return WinPromotionReward;
}(WindowBase_1.default));
exports.default = WinPromotionReward;
},{"../../../com/hw_common/hw_common":2,"../../control/ViewMgr":28,"../../control/game/GameMgr":31,"../../def/ECurrencyType":36,"../../def/GameDef":41,"../../def/ReportDef":43,"../../def/SoundDef":45,"../fui/game/winpromotionreward":146,"./WinGetReward":173,"./WindowBase":185}],180:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var WindowBase_1 = require("./WindowBase");
var winrank_1 = require("../fui/game/winrank");
var DataDef_1 = require("../../def/DataDef");
var GameMgr_1 = require("../../control/game/GameMgr");
var ViewMgr_1 = require("../../control/ViewMgr");
var WinGetAuthor_1 = require("./WinGetAuthor");
var ViewUtils_1 = require("../../../com/hw_utils/ViewUtils");
var hw_common_1 = require("../../../com/hw_common/hw_common");
var SoundDef_1 = require("../../def/SoundDef");
var WinRank = /** @class */ (function (_super) {
    __extends(WinRank, _super);
    function WinRank() {
        var _this = _super.call(this) || this;
        _this.modal = true;
        return _this;
    }
    WinRank.prototype.onInit = function () {
        this.contentPane = winrank_1.default.createInstance();
        this.contentPane.btn_close.onClick(this, this.onClose);
        this.contentPane.state.selectedIndex = 1;
        this.contentPane.state.on(fairygui.Events.STATE_CHANGED, this, this.onStageChange);
        this._ranY = this.contentPane.n6.displayObject.localToGlobal(new Laya.Point(0, 0)).y;
        this.contentPane.myrender.txt_name.text = "我";
        this.contentPane.myrender.txt_score.text = "未授权暂无关卡数据";
        this.initList();
    };
    WinRank.prototype.initList = function () {
        this.contentPane.n6.setVirtual();
        this.contentPane.n6.itemRenderer = Laya.Handler.create(this, this.updateGobalList, null, false);
    };
    WinRank.prototype.updateGobalList = function (index, obj) {
        var item = obj;
        var data = this._gobalList[index];
        var str = decodeURIComponent(data.show);
        var vaobj = JSON.parse(str);
        this.showItem(item, vaobj.avatarUrl, vaobj.nickName, data.dataValue, index + 1, false);
    };
    WinRank.prototype.show = function () {
        _super.prototype.show.call(this);
        hw_common_1.default.platform.showBannerAd(false);
    };
    WinRank.prototype.showItem = function (item, avatar, name, level, id, isme) {
        trace("显示排行:", avatar, level);
        item.gload_head.contain.url = avatar;
        item.txt_name.text = name;
        item.txt_score.text = "第 " + level + " 关";
        item.state.selectedIndex = isme ? 1 : 0;
        item.rank3.selectedIndex = id <= 3 ? 0 : 1;
        item.gload_rank.url = null;
        if (id == 0) {
            item.txt_rank.text = "";
        }
        else if (id <= 3) {
            item.gload_rank.url = "openDataContext/assets/" + id + ".png";
        }
        else {
            item.txt_rank.text = "" + id;
        }
    };
    WinRank.prototype.onStageChange = function (e) {
        this.updateShow();
        hw_common_1.default.sound.playSound(SoundDef_1.default.CLICK);
    };
    WinRank.prototype.updateShow = function () {
        if (this.contentPane.state.selectedIndex == 0) {
            hw_common_1.default.platform.postMessage({ command: "close" });
            hw_common_1.default.platform.getShareSprite().removeSelf();
            if (hw_common_1.default.platform.userInfo == null) {
                ViewMgr_1.default.Inst.showWindow(WinGetAuthor_1.WinGetAuthor, { win: this, text: "可在排行榜中显示您的头像和昵称", isFailShow: true });
            }
            else {
                this.ShowGlobal();
            }
        }
        else if (this.contentPane.state.selectedIndex == 1) {
            hw_common_1.default.platform.postMessage({ command: "close" });
            hw_common_1.default.platform.postMessage({ command: "openrank", value: "friend", top: this._ranY });
            Laya.stage.addChild(hw_common_1.default.platform.getShareSprite());
        }
    };
    //排行榜示例
    WinRank.prototype.showRank = function () {
        hw_common_1.default.platform.postMessage({ command: "close" });
        hw_common_1.default.platform.postMessage({ command: "openrank", value: "friend", top: this._ranY });
        this.contentPane.displayListContainer.addChild(hw_common_1.default.platform.getShareSprite());
    };
    WinRank.prototype.ShowGlobal = function () {
        var _this = this;
        mpsdk.SNS.rankList(DataDef_1.DataDef.CloudStorage_BestScore).then(function (rankdata) {
            trace("所有玩家排行榜::", rankdata);
            _this._gobalList = rankdata.rank;
            _this.contentPane.n6.numItems = _this._gobalList.length;
            _this.showItem(_this.contentPane.myrender, hw_common_1.default.platform.userInfo.avatarUrl, hw_common_1.default.platform.userInfo.nickName, GameMgr_1.default.Inst.level + 1, rankdata.order, true);
        });
    };
    WinRank.prototype.onShown = function () {
        this.contentPane.state.selectedIndex = 1;
        this.updateShow();
    };
    WinRank.prototype.onClose = function () {
        this.hide();
        hw_common_1.default.platform.postMessage({ command: "close" });
        ViewUtils_1.default.removeSelf(hw_common_1.default.platform.getShareSprite());
        hw_common_1.default.sound.playSound(SoundDef_1.default.CLICK);
        hw_common_1.default.platform.showBannerAd(true);
    };
    return WinRank;
}(WindowBase_1.default));
exports.WinRank = WinRank;
},{"../../../com/hw_common/hw_common":2,"../../../com/hw_utils/ViewUtils":22,"../../control/ViewMgr":28,"../../control/game/GameMgr":31,"../../def/DataDef":35,"../../def/SoundDef":45,"../fui/game/winrank":147,"./WinGetAuthor":172,"./WindowBase":185}],181:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var WindowBase_1 = require("./WindowBase");
var winrecommend_1 = require("../fui/game/winrecommend");
var GameMgr_1 = require("../../control/game/GameMgr");
var hw_common_1 = require("../../../com/hw_common/hw_common");
var ReportDef_1 = require("../../def/ReportDef");
var SoundDef_1 = require("../../def/SoundDef");
var MathUtils_1 = require("../../../com/hw_utils/MathUtils");
var WinRecommend = /** @class */ (function (_super) {
    __extends(WinRecommend, _super);
    function WinRecommend() {
        var _this = _super.call(this) || this;
        _this.modal = true;
        return _this;
    }
    WinRecommend.prototype.onInit = function () {
        this.contentPane = winrecommend_1.default.createInstance();
        this.center();
        this.initListSouce();
        this.contentPane.btn_close.onClick(this, this.clickClose);
    };
    WinRecommend.prototype.show = function (param) {
        _super.prototype.show.call(this);
        trace("WinTips::Show->接收到窗口参数:", param);
        this.contentPane.state.selectedIndex = 1;
        hw_common_1.default.mpsdk.reportEvent(ReportDef_1.default.EVENT_CLICKLEFTRECOMMEND);
    };
    WinRecommend.prototype.onShown = function () {
    };
    WinRecommend.prototype.initListSouce = function () {
        var _this = this;
        this.contentPane.game_list.numItems = 0;
        mpsdk.Ad.getSuggestList(true, 0, GameMgr_1.default.Inst.level).then(function (list) {
            _this.gameList = list;
            trace(_this.gameList);
            _this.initList();
            _this.updateList();
        });
    };
    WinRecommend.prototype.updateList = function () {
        this.contentPane.game_list.numItems = this.gameList.length;
    };
    WinRecommend.prototype.initList = function () {
        this.contentPane.game_list.setVirtual();
        this.contentPane.game_list.itemRenderer = Laya.Handler.create(this, this.getListItemResource, null, false);
    };
    WinRecommend.prototype.getListItemResource = function (index, obj) {
        var item = obj;
        item.touchable = true;
        //动态图
        // item.displayListContainer.addChild(mpsdk.ui.LayaADSingleUI.Create(this.gameList[index], 110, false));
        // if (this.gameList[index].icon.indexOf(".gif") >= 0) {
        item.n0.item_icon.url = this.gameList[index].icon;
        item.txt_name.text = this.gameList[index].title;
        item.txt_num.text = MathUtils_1.default.randomBetween_Int(140000, 180000) + "人在玩";
        item.onClick(this, this.onClickItem, [this.gameList[index]]);
        // }
    };
    WinRecommend.prototype.onClickItem = function (obj) {
        if (obj) {
            mpsdk.Ad.click(obj);
        }
    };
    WinRecommend.prototype.clickClose = function () {
        var _this = this;
        var delayTime = 300;
        this.contentPane.state.selectedIndex = 0;
        hw_common_1.default.sound.playSound(SoundDef_1.default.BTN);
        setTimeout(function () {
            _this.hide();
        }, delayTime);
    };
    WinRecommend.prototype.onClose = function () {
        this.hide();
        this.contentPane.state.selectedIndex = 0;
        hw_common_1.default.sound.playSound(SoundDef_1.default.BTN);
    };
    return WinRecommend;
}(WindowBase_1.default));
exports.default = WinRecommend;
},{"../../../com/hw_common/hw_common":2,"../../../com/hw_utils/MathUtils":19,"../../control/game/GameMgr":31,"../../def/ReportDef":43,"../../def/SoundDef":45,"../fui/game/winrecommend":148,"./WindowBase":185}],182:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var WindowBase_1 = require("./WindowBase");
var wincsrewards_1 = require("../fui/game/wincsrewards");
var hw_common_1 = require("../../../com/hw_common/hw_common");
var hw_common_def_1 = require("../../../com/hw_common/hw_common_def");
var ReportDef_1 = require("../../def/ReportDef");
var EventMgr_1 = require("../../control/event/EventMgr");
var EventDef_1 = require("../../def/EventDef");
var ViewMgr_1 = require("../../control/ViewMgr");
var WinGetReward_1 = require("./WinGetReward");
var ECurrencyType_1 = require("../../def/ECurrencyType");
var SoundDef_1 = require("../../def/SoundDef");
var GameMgr_1 = require("../../control/game/GameMgr");
var RedPointMgr_1 = require("../../control/game/RedPointMgr");
var WinServiceEnergy = /** @class */ (function (_super) {
    __extends(WinServiceEnergy, _super);
    function WinServiceEnergy() {
        var _this = _super.call(this) || this;
        _this.modal = true;
        return _this;
    }
    WinServiceEnergy.prototype.onInit = function () {
        this.contentPane = wincsrewards_1.default.createInstance();
        this.center();
        this.contentPane.btn_close.onClick(this, this.onClose);
        this.contentPane.btn_Start.onClick(this, this.clickReward);
    };
    WinServiceEnergy.prototype.clickReward = function () {
        var _this = this;
        this.hide();
        hw_common_1.default.platform.openCustomerServiceConversation({
            sessionFrom: "getenergy",
            showMessageCard: true,
            sendMessageTitle: "我要领体力",
            sendMessagePath: "index",
            sendMessageImg: "res/other/kefubtn.jpg",
            success: function () {
                trace("客服消息发送成功");
                hw_common_1.default.event.once(hw_common_def_1.default.EVT_PLATFORM_ONSHOW, _this, _this._onShowCS);
                hw_common_1.default.mpsdk.reportEvent(ReportDef_1.default.EVENT_CSCLICK);
            },
            fail: function () {
                trace("客服消息发送失败");
            },
            complete: function () {
                trace("客服消息发送完成");
            }
        });
    };
    WinServiceEnergy.prototype.show = function (param) {
        _super.prototype.show.call(this);
        trace("WinTips::Show->接收到窗口参数:", param);
        RedPointMgr_1.default.Inst.saveRedPoint(RedPointMgr_1.RedPointType.service);
    };
    //判断是否客服奖励
    WinServiceEnergy.prototype._onShowCS = function () {
        if (hw_common_1.default.config.csrewards_energy > 0) {
            hw_common_1.default.serverdata.getOpenCSGift().then(function (res) {
                trace("WinServiceEnergy::_onShowCS->获取客服奖励成功");
                EventMgr_1.default.Inst.event(EventDef_1.default.GAME_GETREWARDCS);
                ViewMgr_1.default.Inst.showWindow(WinGetReward_1.default, new WinGetReward_1.WinGetReward_Param(ECurrencyType_1.ECurrencyType.ENERGY, hw_common_1.default.config.csrewards_energy));
                GameMgr_1.default.Inst.data.other.hadGetCsReward = true;
                hw_common_1.default.mpsdk.reportEvent(ReportDef_1.default.EVENT_GETFLOATINGWINGIFT);
            }).catch(function (error) {
                trace("WinServiceEnergy::_onShowCS->", error);
            });
        }
    };
    WinServiceEnergy.prototype.onShown = function () {
    };
    WinServiceEnergy.prototype.onClose = function () {
        this.hide();
        hw_common_1.default.sound.playSound(SoundDef_1.default.BTN);
    };
    return WinServiceEnergy;
}(WindowBase_1.default));
exports.default = WinServiceEnergy;
},{"../../../com/hw_common/hw_common":2,"../../../com/hw_common/hw_common_def":3,"../../control/ViewMgr":28,"../../control/event/EventMgr":29,"../../control/game/GameMgr":31,"../../control/game/RedPointMgr":33,"../../def/ECurrencyType":36,"../../def/EventDef":40,"../../def/ReportDef":43,"../../def/SoundDef":45,"../fui/game/wincsrewards":135,"./WinGetReward":173,"./WindowBase":185}],183:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var WindowBase_1 = require("./WindowBase");
var winsetting_1 = require("../fui/game/winsetting");
var ViewMgr_1 = require("../../control/ViewMgr");
var LobbyScene_1 = require("../scenes/lobby/LobbyScene");
var WinMoreGame_1 = require("./WinMoreGame");
var IconAdComponetn_1 = require("../proxy/IconAdComponetn");
var hw_common_1 = require("../../../com/hw_common/hw_common");
var SoundDef_1 = require("../../def/SoundDef");
var WinSetting = /** @class */ (function (_super) {
    __extends(WinSetting, _super);
    function WinSetting() {
        var _this = _super.call(this) || this;
        _this._quake = 1;
        _this.modal = true;
        return _this;
    }
    WinSetting.prototype.onInit = function () {
        this.contentPane = winsetting_1.default.createInstance();
        this.contentPane.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        this.contentPane.btn_back.onClick(this, this._onClose);
        this.contentPane.back_home.onClick(this, this._clickBackHome);
        this.contentPane.sound_switch.onClick(this, this._clickSwitch, [{ type: 'sound' }]);
        this.contentPane.music_switch.onClick(this, this._clickSwitch, [{ type: 'music' }]);
        this.contentPane.vibration_switch.onClick(this, this._clickSwitch, [{ type: 'vibration' }]);
        this.contentPane.btn_more.onClick(this, this._clickMoreGame);
        var btn_more_spacing = 40; //广告列表开始的y坐标距离btn_more更多按钮的距离
        IconAdComponetn_1.default.Inst.addSymmetryGameIcon(this.contentPane, this.contentPane.btn_more.height + this.contentPane.btn_more.y + btn_more_spacing, 5, {
            width: 110,
            height: 110,
            columnSpacing: 20,
            lineSpacing: 20
        }, 10);
    };
    WinSetting.prototype.show = function (param) {
        _super.prototype.show.call(this);
        trace("WinTips::Show->接收到窗口参数:", param);
        this._updateState();
    };
    WinSetting.prototype._updateState = function () {
        this.contentPane.sound_switch.state.selectedIndex = hw_common_1.default.sound.soundState;
        this.contentPane.music_switch.state.selectedIndex = hw_common_1.default.sound.bgmState;
        this.contentPane.vibration_switch.state.selectedIndex = this._quake;
    };
    WinSetting.prototype.onShown = function () {
    };
    WinSetting.prototype._clickMoreGame = function () {
        ViewMgr_1.default.Inst.showWindow(WinMoreGame_1.default);
    };
    WinSetting.prototype._clickSwitch = function (obj) {
        var switchs = { 'sound': this.contentPane.sound_switch, 'music': this.contentPane.music_switch, 'vibration': this.contentPane.vibration_switch };
        if (obj && obj.type) {
            var state = switchs[obj.type].state.selectedIndex === 0 ? 1 : 0;
            switchs[obj.type].state.selectedIndex = state;
            switch (obj.type) {
                case 'sound':
                    hw_common_1.default.sound.soundState = state;
                    break;
                case 'music':
                    hw_common_1.default.sound.bgmState = state;
                    break;
                case 'vibration':
                    this._quake = state;
                    break;
            }
        }
    };
    WinSetting.prototype._clickBackHome = function () {
        this.hide();
        ViewMgr_1.default.Inst.showScene(LobbyScene_1.default);
        hw_common_1.default.sound.playSound(SoundDef_1.default.BTN);
    };
    WinSetting.prototype._onClose = function () {
        this.hide();
        hw_common_1.default.sound.playSound(SoundDef_1.default.BTN);
    };
    return WinSetting;
}(WindowBase_1.default));
exports.default = WinSetting;
},{"../../../com/hw_common/hw_common":2,"../../control/ViewMgr":28,"../../def/SoundDef":45,"../fui/game/winsetting":149,"../proxy/IconAdComponetn":155,"../scenes/lobby/LobbyScene":164,"./WinMoreGame":176,"./WindowBase":185}],184:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var WindowBase_1 = require("./WindowBase");
var wintreasurebox_1 = require("../fui/game/wintreasurebox");
var ECurrencyType_1 = require("../../def/ECurrencyType");
var ViewMgr_1 = require("../../control/ViewMgr");
var WinGetReward_1 = require("./WinGetReward");
var IconAdComponetn_1 = require("../proxy/IconAdComponetn");
var hw_common_1 = require("../../../com/hw_common/hw_common");
var ReportDef_1 = require("../../def/ReportDef");
var SoundDef_1 = require("../../def/SoundDef");
var GameDef_1 = require("../../def/GameDef");
var SharePointKeyDef_1 = require("../../def/SharePointKeyDef");
var WinTreasureBox = /** @class */ (function (_super) {
    __extends(WinTreasureBox, _super);
    function WinTreasureBox() {
        var _this = _super.call(this) || this;
        _this.modal = true;
        return _this;
    }
    WinTreasureBox.prototype.onInit = function () {
        this.contentPane = wintreasurebox_1.default.createInstance();
        this.center();
        this.contentPane.n9.onClick(this, this.onClose);
        this.contentPane.n3.onClick(this, this._chooseShare);
        var next_btn_spacing = 30; //广告列表开始的y坐标距离列表上面的按钮的距离
        IconAdComponetn_1.default.Inst.addSymmetryGameIcon(this.contentPane, this.contentPane.n2.y + next_btn_spacing, 2, {
            columnSpacing: 20,
            lineSpacing: 20
        }, 10, true);
    };
    WinTreasureBox.prototype.show = function (param) {
        _super.prototype.show.call(this);
        this._updateHelpBtn();
        trace("WinTips::Show->接收到窗口参数:", param);
        this.contentPane.t1.play(null, 1, 0, 0);
    };
    WinTreasureBox.prototype.onShown = function () {
    };
    WinTreasureBox.prototype._updateHelpBtn = function () {
        this._canShare = hw_common_1.default.share.canShare(SharePointKeyDef_1.default.RONGYAO);
        if (this._canShare) {
            this.contentPane.n3.c1.selectedIndex = 0;
        }
        else {
            this.contentPane.n3.c1.selectedIndex = 1;
        }
    };
    WinTreasureBox.prototype._getRewards = function () {
        this._updateHelpBtn();
        ViewMgr_1.default.Inst.showWindow(WinGetReward_1.default, new WinGetReward_1.WinGetReward_Param(ECurrencyType_1.ECurrencyType.ENERGY, GameDef_1.default.TREASURE_ENERGY_NUM));
        this.hide();
    };
    WinTreasureBox.prototype._chooseShare = function () {
        var _this = this;
        hw_common_1.default.share.normalGet({
            shareid: ReportDef_1.default.SHARE_GOLDBTN,
            sharekey: SharePointKeyDef_1.default.RONGYAO,
            caller: this,
            success: this._getRewards,
            fail: function () {
                _this._updateHelpBtn();
            }
        });
    };
    WinTreasureBox.prototype.onClose = function () {
        this.hide();
        hw_common_1.default.sound.playSound(SoundDef_1.default.BTN);
    };
    return WinTreasureBox;
}(WindowBase_1.default));
exports.default = WinTreasureBox;
},{"../../../com/hw_common/hw_common":2,"../../control/ViewMgr":28,"../../def/ECurrencyType":36,"../../def/GameDef":41,"../../def/ReportDef":43,"../../def/SharePointKeyDef":44,"../../def/SoundDef":45,"../fui/game/wintreasurebox":150,"../proxy/IconAdComponetn":155,"./WinGetReward":173,"./WindowBase":185}],185:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ViewMgr_1 = require("../../control/ViewMgr");
var WindowBase = /** @class */ (function (_super) {
    __extends(WindowBase, _super);
    function WindowBase() {
        return _super.call(this) || this;
    }
    WindowBase.prototype.init = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        _super.prototype.init.call(this);
    };
    WindowBase.prototype.show = function (param) {
        if (param === void 0) { param = null; }
        _super.prototype.show.call(this);
    };
    WindowBase.prototype.hide = function () {
        _super.prototype.hide.call(this);
        ViewMgr_1.default.Inst.hideWindow(this);
    };
    WindowBase.prototype.dispose = function () {
    };
    return WindowBase;
}(fairygui.Window));
exports.default = WindowBase;
},{"../../control/ViewMgr":28}]},{},[1])