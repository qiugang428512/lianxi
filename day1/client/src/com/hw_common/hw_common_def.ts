export default class hw_common_def {
    /**新用户测试 */
    public static DEBUG_NEWPLAYER: boolean = false;
    /**web环境下测试account */
    public static DEBUG_ACCOUNT: mpsdk.IAccount = {
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
    public static LTV_TEST: boolean = false;
    /**微信后台配置的广告id*/
    public static LTV_TEST_LIST: any = {
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
    }
    //----------------------------------------------------------------------------------------本次存储定义
    /**周期内分享记录 */
    public static LOCS_SHARE_CYCINFOLIST: string = "LOCS_SHARE_CYCINFOLIST";
    /**大数据对比版本号 */
    public static LOCS_SD_VER: string = "LOCS_SD_VER";

    //----------------------------------------------------------------------------------------通用全局定义
    /**好友列表心跳同步时间间隔 */
    public static DEF_FRIENDREFRESH: number = 2 * 60 * 1000;
    /**分享周期 */
    public static DEF_SHARELIMIT_CYCLE: number = 1000 * 60 * 120;
    /**分享周期内次数限制 */
    public static DEF_SHARELIMIT_MAX: number = 999;

    /**服务器地址 */
    public static URL_GET_VERSIONEND: string = "https://xyxcck-friend.raink.com.cn/MiniFriend/data/getBigDataVersion.action";//gameId=xxx&openId=xxx&dataKey=xxx
    public static URL_POST_SAVEEND: string = "https://xyxcck-friend.raink.com.cn/MiniFriend/data/saveBigData.action";//{"gameId":xxx,"openId":xxx,"dataKey":xxx,"version":xxx,"data":xxx}
    public static URL_Get_GetEnd: string = "https://xyxcck-friend.raink.com.cn/MiniFriend/data/getBigData.action";//gameId=xxx&openId=xxx&dataKey=xxx
    public static URL_GET_QUZI: string = "https://xyx-mainland-quizlib.raink.com.cn/MiniQuesLib/data/getMiniQues.action";
    public static URL_GET_CSGIFT: String = "https://xyxcck-friend.raink.com.cn//MiniFriend/data/getCSBonus.action";
    public static URL_GET_SUBSCRIPTION: String = "https://xyx-mainland-messagepush.raink.com.cn/MiniMessageSubscribe/data/duationMessIntoPool.action";//发送订阅

    //----------------------------------------------------------------------------------------通用日志埋点
    //平台组件的事件埋点全部为负数,游戏内的分享埋点全部为正数
    /**通用上报-mpsdk.init初始化的延时 param1:(1:成功,0:失败),param2:成功或失败花费时间 */
    public static REPORT_MPSDKINIT: number = -1;
    /**通用上报-账号获取成功 param1:(1:从服务器请求数据,0:没有从服务器请求),param2:成功或失败花费时间 */
    public static REPORT_ACCOUNT_OK: number = -2;
    /**通用上报-平台配置获取成功 param1:(1:从服务器请求数据,0:没有从服务器请求),param2:成功或失败花费时间 */
    public static REPORT_PLATFORMCONFIG_OK: number = -3;
    /**通用上报-服务器存档获取成功 param1:(1:从服务器请求数据,0:没有从服务器请求),param2:成功或失败花费时间 */
    public static REPORT_SERVERDATA_OK: number = -4;
    /**通用上报-服务器题库获取成功 param1:(1:题库id),param2:报错id */
    public static REPORT_LOADQUIZ_OK: number = -5;
    /**通用上报-游戏切到前台 param1:sceneid, */
    public static REPORT_ONSHOW: number = -6;
    /**通用上报-显示banner广告 param1 = 1 广告id  param2 = 0创建广告 1加载完成  2加载失败 */
    public static REPORT_BANNERAD: number = -21;
    /**通用上报-显示视频广告 param1 = 1 分享点  param2 = 0点击视频 1看完  2未看完 3调起失败 */
    public static REPORT_VIDEOAD: number = -31;
    /**通用上报-显示插屏广告 */
    public static REPORT_INTERSTITIAL_SHOW: number = -41;
    /**通用上报-关闭插屏广告 */
    public static REPORT_INTERSTITIAL_CLOSE: number = -42;
    /**通用上报-插屏广告报错 */
    public static REPORT_INTERSTITIAL_ERROR: number = -43;
    /**通用上报-分享 param1 = 1 分享点  param2 = 0点击分享 1分享成功 2分享失败 */
    public static REPORT_SHARE: number = -51;

    //----------------------------------------------------------------------------------------通用消息事件
    /**运行平台游戏切到前台 param:场景值id */
    public static EVT_PLATFORM_ONSHOW: string = "EVT_PLATFORM_ONSHOW";
    /**运行平台游戏切到后台  */
    public static EVT_PLATFORM_ONHIDE: string = "EVT_PLATFORM_ONHIDE";
    /**mpsk获取到上次真实分享时间戳*/
    public static EVT_MPSDK_LASTTRUESHARETM_OK: string = "EVT_MPSDK_LASTTRUESHARETM_OK";
    /**获取到运营平台配置 */
    public static EVT_MPSDK_PLATFORMCONFIG_OK: string = "EVT_MPSDK_PLATFORMCONFIG_OK";
    /**获取到账号信息 */
    public static EVT_MPSDK_ACCOUNT_OK: string = "EVT_MPSDK_ACCOUNT_OK";
    /**serverdata同步账号数据完成,附带参数为null(没有同步服务器存档，使用本地存档)，附带参数不为空：服务器存档数据，使用服务器存档 */
    public static EVT_SD_SERVERDATA_OK: string = "EVT_SD_SERVERDATA_OK";
    /**获取到服务器数据  */
    public static EVT_SERVER_DATA_OK: string = "EVT_SERVER_DATA_TIME_OK";
}