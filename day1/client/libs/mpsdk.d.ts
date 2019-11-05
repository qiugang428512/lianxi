declare namespace mpsdk {
    /**
     * 环境配置模块
     */
    class Env {
        /**
         * SDK版本号
         */
        static readonly version: string;
        /**
         * 编译时间戳
         */
        static readonly build: string;
        /**
         * 本地缓存键名前缀
         */
        static readonly storagePrefix: string;
        /**
         * 认证服务器
         */
        static readonly loginServer: string;
        /**
         * 认证服务器(qq、微信)
         */
        static readonly newLoginServer: string;
        /**
         * 一般日志服务器
         */
        static readonly reportServer1: string;
        /**
         * 重要日志服务器
         */
        static readonly reportServer2: string;
        /**
         * public服务器
         */
        static readonly publicServer: string;
        /**
         * 好友和用户信息服务器
         */
        static readonly friendServer: string;
        /**
         * 资源服务器
         */
        static readonly cdnServer: string;
        /**
         * 推广接口
         */
        static readonly extServer: string;
        /**
         * 盒子接口，游戏项目不适用
         */
        static readonly boxServer: string;
        /**
         * 跟踪广告转化服务器
         */
        static readonly trackAdServer: string;
        static readonly photoServer: string;
        /**
         * 应用ID
         */
        static gameId: string | number;
        /**
         * 配置文件路径
         */
        static gamePath: string;
        /**
         * 启动参数
         */
        static launchOptions: ILaunchOptions;
        /**
         * 是否打印SDK日志
         */
        static showLog: boolean;
        /**
         * SDK是否经过初始化
         */
        static init: boolean;
        /**
         * 游戏版本号
         */
        static codeVer: string;
        static openLevelData: any;
        /**
         * 初始化时是否需要获取unionid
         */
        static isNeedUnionid: boolean;
        static isRewardedVideoAd2Back: boolean;
        static isClickRewardedVideoAdDialogOk: boolean;
        static isRewardedVideoAdDialogShow: boolean;
        static phoneModel: string;
        static mpsdkChannel: string;
        static mpsdkImei: string;
    }
}
declare namespace mpsdk {
    /**
     * 工具模块
     */
    class utils {
        /**
         * 分析用户来源
         * @param options 启动参数
         * @returns 用户来源
         */
        static parseAccountSource(options: ILaunchOptions): IAccountSource;
        /**
         * 获取对象属性值
         * @param model 数据对象
         * @param attribute 属性，以.分割层级，如a.b.c
         * @param defaultValue 指定的属性不存在时返回默认值
         */
        static value(model: any, attribute: string, defaultValue?: any): any;
        /**
         * 获取url请求参数
         * @param query http参数
         * @param key 参数名
         */
        static getQueryString(query: string, key: string): string;
        /**
         * 构造http请求参数
         * @param params 键值对
         */
        static httpBuildQuery(params: any): string;
        /**
         * 将url中的请求参数解析为键值对
         */
        static httpParseQuery(url: string): any;
        /**
         * 等待数据
         * @param dataProvider 数据提供函数
         * @param thisObject 数据提供函数的this作用域
         * @param interval 尝试获取数据的间隔
         * @param timeout 最大尝试时间
         * @param params 数据提供函数所需的参数
         */
        static waitData(dataProvider: any, thisObject: any, interval?: number, timeout?: number, ...params: any[]): Promise<any>;
        /**
         * 圆桌随机抽取/排序
         * @param dataList Array 数据列表
         * @param weightKey String 权重字段，权重值必须为正数
         * @param popOne Boolean true表示只抽取一个，false表示返回排序列表
         * @param thresholdUp Number 阀值上限，>=此阀值则必然被抽中，且排在首位；如果有多个超过阀值的数据，则各自按原数据顺序排序
         * @param thresholdLow Number 阀值下限，<=此阀值则无条件丢弃
         */
        static tableAlgorithm(dataList: any[], weightKey: string, popOne?: boolean, thresholdUp?: number, thresholdLow?: number): any[] | any;
        /**
         * 字符串转ArrayBuffer
         */
        static string2Buffer(data: string): ArrayBuffer;
        /**
         * ArrayBuffer转字符串
         */
        static buffer2String(data: ArrayBuffer): string;
        /**
         * 深度比较
         */
        static deepCompare(x: any, y: any): boolean;
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
        static drawRoundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number, lineWidth: number): void;
        static generateUUID(): string;
        /**
         * 时间戳+随机数生成UUID
         */
        static createClientUUID(): string;
        static setFirstLaunchOptions(launchOptions: ILaunchOptions): void;
        static getFirstLaunchOptions(): ILaunchOptions;
        static checkAbroadCity(hackData: IAppStatus): boolean;
        static nativeAppLogin(launchOptions: ILaunchOptions): Promise<IAccount>;
    }
}
declare namespace mpsdk {
    /**
     * 玩一玩平台适配器
     * @external
     */
    class BricksPlatform implements IPlatform {
        writeFile(fileName: string, data: string): string;
        getStorage(key: string): any;
        setStorage(key: string, data: any): void;
        httpRequest(url: string, params?: any, method?: string, retryTimes?: number): Promise<any>;
        getUserAccount(launchOptions: ILaunchOptions): Promise<IAccount>;
        getUserInfo(): Promise<IUserInfo>;
        getSystem(): ISystem;
        getLaunchOptions(): ILaunchOptions;
        launchTo(app: IDataItem): Promise<void>;
        launchToSync(app: IDataItem, launchToCallback: any): Promise<void>;
        share(shareInfo: IShareInfo, success?: any, fail?: any, thisObject?: any): any;
        getCacheRes(url: string, waitDownload?: boolean): Promise<string>;
        setTimeout(callback: any, timeout: number): any;
        setInterval(callback: any, timeout: number): any;
        clearTimeout(t: any): void;
        clearInterval(t: any): void;
        checkBannerClick(res: any): boolean;
        onHide(): void;
        showModal(object: Object): void;
    }
}
declare namespace mpsdk {
    /**
     * 微信平台适配器
     * @external
     */
    class MinaPlatform implements IPlatform {
        writeFile(fileName: string, data: string): string;
        getStorage(key: string): any;
        setStorage(key: string, data: any, isSync?: boolean): void;
        httpRequest(url: string, params?: any, method?: string, retryTimes?: number): Promise<any>;
        getUserAccount(launchOptions: ILaunchOptions): Promise<IAccount>;
        private getUserAccountOnce;
        /**
         * 依靠服务器获取帐号信息
         */
        protected login(credentials: any, launchOptions: ILaunchOptions): Promise<IAccount>;
        getUserInfo(): Promise<IUserInfo>;
        getSystem(): ISystem;
        getLaunchOptions(): ILaunchOptions;
        launchTo(app: IDataItem): Promise<any>;
        /**
         * 跳转
         * launchTo的同步版本
         * @param app
         * @param launchToCallback
         */
        launchToSync(app: IDataItem, launchToCallback: any): void;
        share(shareInfo: IShareInfo, success?: any, fail?: any, thisObject?: any): any;
        /**
         * 下载队列
         */
        static downloadQueue: string[];
        getCacheRes(url: string, waitDownload?: boolean): Promise<string>;
        /**
         * 自动创建多级路径
         * @param dirPath 路径
         */
        mkdirRecursiveSync(dirPath: string): string;
        setTimeout(callback: any, timeout: number): any;
        setInterval(callback: any, timeout: number): any;
        clearTimeout(t: any): void;
        clearInterval(t: any): void;
        /**
         * 解析微信群ID（使用此方法之前必须设置Env.gameId）
         * @param shareTicket 分享后得到的分享票据
         */
        parseShareTicket(shareTicket: string): Promise<any | {
            openid: string;
            openGId: string;
        }>;
        /**
         * 注册微信模板消息
         * @param msgId 后台配置表的消息id,咨询策划获取
         * @param formId form表单id,只有真机情况下才能获取到
         * @param param1 参数填充关键字类型
         */
        subscribe(msgId: string | number, formId: string, param1?: string): Promise<any>;
        /**
         * 检查当前是否可以订阅模版消息（如果处于上次订阅有效期内则不能重复订阅）
         * @param msgId 后台配置表的消息id,咨询策划获取
         */
        subscribeEnable(msgId: string | number): boolean;
        /**
         * 检查玩家是否点击banner；
         * @param res wx.onShow回调信息
         * @returns 如果点击成功返回true，否则返回false
         */
        checkBannerClick(res: any): boolean;
        onHide(): void;
        showModal(object: Object): void;
    }
}
declare namespace mpsdk.ext {
    class EgretUI {
        private width;
        private height;
        private scrollItemList;
        private scrollTimer;
        private scrollView;
        private scrollContainer;
        private showIndex;
        /**
         * 底部猜你喜欢ICON显示
         * @param dataList mpsdk.Ad.getSuggestList()获得
         * @param width 显示宽度
         * @param height 显示高度
         * @param bgColor 背景颜色
         * @param borderColor 边框颜色
         * @returns 返回一个egret.DisplayObjectContainer对象
         */
        showSuggestBottom(dataList: mpsdk.IDataItem[], width?: number, height?: number, bgColor?: number, borderColor?: number): any;
        private addIcon;
        private setTimeIcon;
        private imageLoader;
    }
}
declare namespace mpsdk {
    /**
     * 白鹭平台适配器
     * @external
     */
    class EgretPlatform implements IPlatform {
        writeFile(fileName: string, data: string): string;
        getStorage(key: string): any;
        setStorage(key: string, data: any): void;
        httpRequest(url: string, params?: any, method?: string, retryTimes?: number): Promise<any>;
        private writeOpenId2Native;
        getUserAccount(launchOptions: ILaunchOptions): Promise<IAccount>;
        getUserInfo(): Promise<IUserInfo>;
        getSystem(): ISystem;
        getLaunchOptions(): ILaunchOptions;
        launchTo(app: IDataItem): Promise<void>;
        launchToSync(app: IDataItem, launchToCallback: any): Promise<void>;
        share(shareInfo: IShareInfo, success: any, fail: any, thisObject: any): any;
        getCacheRes(url: string, waitDownload?: boolean): Promise<string>;
        setTimeout(callback: any, timeout: number): any;
        setInterval(callback: any, timeout: number): any;
        clearTimeout(t: any): void;
        clearInterval(t: any): void;
        showSuggestBottom(dataList: mpsdk.IDataItem[], width?: number, height?: number, bgColor?: number, borderColor?: number): any;
        checkBannerClick(res: any): boolean;
        onHide(): void;
        showModal(object: Object): void;
        send2Native(message: string): void;
    }
}
declare namespace mpsdk {
    /**
     * Cocos平台适配器
     * @external
     */
    class CocosPlatform implements IPlatform {
        writeFile(fileName: string, data: string): string;
        getStorage(key: string): any;
        setStorage(key: string, data: any): void;
        httpRequest(url: string, params?: any, method?: string, retryTimes?: number): Promise<any>;
        private writeOpenId2Native;
        private getNativeAppOpenId;
        getUserAccount(launchOptions: ILaunchOptions): Promise<IAccount>;
        getUserInfo(): Promise<IUserInfo>;
        getSystem(): ISystem;
        getLaunchOptions(): ILaunchOptions;
        launchTo(app: IDataItem): Promise<void>;
        launchToSync(app: IDataItem, launchToCallback: any): Promise<void>;
        share(shareInfo: IShareInfo, success: any, fail: any, thisObject: any): any;
        getCacheRes(url: string, waitDownload?: boolean): Promise<string>;
        setTimeout(callback: any, timeout: number): any;
        setInterval(callback: any, timeout: number): any;
        clearTimeout(t: any): void;
        clearInterval(t: any): void;
        checkBannerClick(res: any): boolean;
        onHide(): void;
        showModal(object: Object): void;
    }
}
declare namespace mpsdk {
    /**
     * H5平台适配器
     * @external
     */
    class H5Platform implements IPlatform {
        writeFile(fileName: string, data: string): string;
        getStorage(key: string): any;
        setStorage(key: string, data: any): void;
        httpRequest(url: string, params?: any, method?: string, retryTimes?: number): Promise<any>;
        getUserAccount(launchOptions: ILaunchOptions): Promise<IAccount>;
        getUserInfo(): Promise<IUserInfo>;
        getSystem(): ISystem;
        getLaunchOptions(): ILaunchOptions;
        launchTo(app: IDataItem): Promise<void>;
        launchToSync(app: IDataItem, launchToCallback: any): Promise<void>;
        share(shareInfo: IShareInfo, success: any, fail: any, thisObject: any): any;
        getCacheRes(url: string, waitDownload?: boolean): Promise<string>;
        setTimeout(callback: any, timeout: number): any;
        setInterval(callback: any, timeout: number): any;
        clearTimeout(t: any): void;
        clearInterval(t: any): void;
        checkBannerClick(res: any): boolean;
        onHide(): void;
        showModal(object: Object): void;
    }
}
declare namespace mpsdk {
    /**
     * 字节跳动平台适配器
     * @external
     */
    class TTPlatform extends MinaPlatform {
        getUserAccount(launchOptions: ILaunchOptions): Promise<IAccount>;
        private getTTUserAccountOnce;
        /**
         * 依靠服务器获取帐号信息
         */
        private ttLogin;
        onHide(): void;
    }
}
declare namespace mpsdk {
    /**
     * QQ平台适配器
     * @external
     */
    class QQminiPlatform implements IPlatform {
        writeFile(fileName: string, data: string): string;
        onHide(): void;
        getStorage(key: string): any;
        setStorage(key: string, data: any): void;
        httpRequest(url: string, params?: any, method?: string, retryTimes?: number): Promise<any>;
        getUserAccount(launchOptions: ILaunchOptions): Promise<IAccount>;
        private getUserAccountOnce;
        /**
         * 依靠服务器获取帐号信息
         */
        protected login(credentials: any, launchOptions: ILaunchOptions): Promise<IAccount>;
        getUserInfo(): Promise<IUserInfo>;
        getSystem(): ISystem;
        getLaunchOptions(): ILaunchOptions;
        launchTo(app: IDataItem): Promise<any>;
        launchToSync(app: IDataItem, launchToCallback: any): void;
        share(shareInfo: IShareInfo, success?: any, fail?: any, thisObject?: any): any;
        /**
         * 下载队列
         */
        static downloadQueue: string[];
        getCacheRes(url: string, waitDownload?: boolean): Promise<string>;
        /**
         * 自动创建多级路径
         * @param dirPath 路径
         */
        mkdirRecursiveSync(dirPath: string): string;
        setTimeout(callback: any, timeout: number): any;
        setInterval(callback: any, timeout: number): any;
        clearTimeout(t: any): void;
        clearInterval(t: any): void;
        /**
         * 解析qq群ID（使用此方法之前必须设置Env.gameId）
         * @param shareTicket 分享后得到的分享票据
         */
        parseShareTicket(shareTicket: string): Promise<any | {
            openid: string;
            openGId: string;
        }>;
        /**
         * 注册qq模板消息
         * @param msgId 后台配置表的消息id,咨询策划获取
         * @param formId form表单id,只有真机情况下才能获取到
         * @param param1 参数填充关键字类型
         */
        subscribe(msgId: string | number, formId: string, param1?: string): Promise<any>;
        /**
         * 检查当前是否可以订阅模版消息（如果处于上次订阅有效期内则不能重复订阅）
         * @param msgId 后台配置表的消息id,咨询策划获取
         */
        subscribeEnable(msgId: string | number): boolean;
        /**
         * 检查玩家是否点击banner；
         * @param res qq.onShow回调信息
         * @returns 如果点击成功返回true，否则返回false
         */
        checkBannerClick(res: any): boolean;
        showModal(object: Object): void;
    }
}
declare namespace mpsdk {
    /**
     * 平台差异处理模块
     */
    class Platform {
        /**
         * 单例
         */
        private static _instance;
        /**
         * 平台类型（bk/tt/qq/wx/egret/cocos/laya/h5）
         */
        static readonly platformType: string;
        /**
         * 平台单例
         */
        static readonly instance: IPlatform;
    }
}
declare namespace mpsdk {
    /**
     * 账号处理模块
     */
    class Account {
        /**
         * 黑名单昵称列表
         */
        private static blackNamesPromise;
        /**
         * 加载黑名单
         * @deprecated 已于2019-05-09被停用
         */
        static loadBlackNames(): Promise<any>;
        /**
         * 设置用户帐号数据
         * @param account 用户帐号对象{"openid":"","unionid":""}
         * @returns 如果用户账号数据正确返回true，否则返回false
         */
        static setAccount(account: IAccount): boolean;
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
        static getLastShareTime(): Promise<number | undefined>;
        /**
         * 获取用户帐号数据
         * @return 用户帐号对象{"openid":"","unionid":""}
         */
        static getAccount(): IAccount;
        /**
         * 获取用户帐号数据
         *
         * 由于微信平台获取用户账号ID需要走服务器，存在异步问题，本方法可等待账号数据就绪后才返回结果
         */
        static getAccountSafe(): Promise<IAccount>;
        /**
         * 设置用户来源
         * @param sourceType 用户来源类型
         * @param sourceId 用户来源ID
         */
        static setAccountSource(sourceType: string, sourceId: string | number): void;
        /**
         * 上报用户信息（并判断该用户是否是黑名单用户）
         * @param userInfo 户信息对象
         * @returns 该用户是否是黑名单用户，true是，false否. 注意：请不要用该返回值判断是否为黑名单用户(该功能已停用)
         */
        static setAccountInfo(userInfo: IUserInfo): Promise<boolean>;
        /**
         * 设置当前账号属性
         * @deprecated 请改用saveData保存用户数据
         * @param key 键名（目前只支持4个固定键：paramInt1 / paramInt2 / paramStr1 / paramStr2）
         * @param val 键值（key = paramInt1 || paramInt2 时键值只能是数字；key = paramStr1 || paramStr2 时支持字符串）
         */
        static setAccountProperty(key: string, val: number | string): void;
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
        static setAccountActive(activeType: constant.ActiveType, activeValue: constant.ActiveValue): void;
        /**
         * 更新当前账号数据（数据保存到服务器）
         * @param key 键名
         * @param val 键值
         */
        static saveData(key: string, val: number | string): Promise<any>;
        /**
         * 从服务器获取当前账号数据
         */
        static getData(key: string, openId?: string): Promise<string>;
        /**
         * 判断Openid是否存在
         */
        static isOpenIdExist(): boolean;
        /**
         * 判断unionid是否存在
         */
        static isUnionIdExist(): boolean;
        static getClientUUID(): string;
        static clearClientUUID(): void;
        /**
         * 获取客户端用户ID
         */
        static getClientUserId(stepId?: number): string;
        static getOpenId(): string;
    }
}
declare namespace mpsdk {
    /**
     * 广告模块
     */
    class Ad {
        /**
         * 浮标广告数据
         */
        private static recommendPromise;
        /**
         * 推荐列表数据
         */
        private static suggestPromise;
        /**
         * 盒子数据
         */
        private static boxData;
        /**
         * 用户在当前应用中累计充值金额（可根据用户价值匹配广告）
         */
        private static userValue;
        /**
         * 设置或更新用户价值（请在获取广告数据之前设置用户价值，有助于精准投放）
         * @param userValue 用户在当前应用中累计充值金额（可根据用户价值匹配广告）
         */
        static updateUserValue(userValue: number): void;
        /**
         * 预加载广告配置
         */
        static loadAdData(): void;
        /**
         * 加载其他过滤条件数据
     * gender: -1不限制性别/1男/2女/0未知
         */
        private static loadFilterData;
        /**
         * 加载浮标广告
         */
        static loadRecommendData(): Promise<IDataItem[]>;
        /**
         * 加载推荐列表
         */
        static loadSuggestData(): Promise<IDataItem[]>;
        /**
         * 获取盒子列表数据
         * @param codeVer 当前程序版本
         * @param gender 当前用户性别，-1不限制性别/1男/2女/0未知
         * @param userValue 当前用户价值
         * @param navigateToMiniProgramAppIdList
         */
        static getBoxDataList(codeVer?: string, gender?: number, userValue?: number, navigateToMiniProgramAppIdList?: string[]): Promise<{
            category: ICategory[];
            data: IDataItem[];
        }>;
        /**
         * 随机获取一个浮标广告（并自动上报该广告展示数据）
         * @param score 请传入当前玩家的【等级或分数或游戏时长】等可以直观判断玩家级别的数值，用以处理审核期间返回的广告数量
         */
        static getRecommendInfo(score?: number): Promise<IDataItem>;
        /**
         * 获取推荐列表
         * @param original 是否按线上原样返回，如果为false则会使用权重算法排序后返回
         * @param count 截取数量，0为返回全部
         * @param score 请传入当前玩家的【等级或分数或游戏时长】等可以直观判断玩家级别的数值，用以处理审核期间返回的广告数量
         */
        static getSuggestList(original?: boolean, count?: number, score?: number, advType?: string): Promise<IDataItem[]>;
        /**
             * 随机获取一个banner广告（并自动上报该广告展示数据）
             * @param score 请传入当前玩家的【等级或分数或游戏时长】等可以直观判断玩家级别的数值，用以处理审核期间返回的广告数量
             */
        static getBannerInfo(score?: number): Promise<IDataItem>;
        /**
             * 获取激励广告列表
             * @param original 是否按线上原样返回，如果为false则会使用权重算法排序后返回
             * @param count 截取数量，0为返回全部
             * @param score 请传入当前玩家的【等级或分数或游戏时长】等可以直观判断玩家级别的数值，用以处理审核期间返回的广告数量
             */
        static getExcitationList(original?: boolean, count?: number, score?: number): Promise<IDataItem[]>;
        /**
         * 判断当前是否处于广告素材审查中
         */
        private static checkLimit;
        /**
         * 过滤器
         */
        private static dataFilter;
        /**
         * 判断当前城市广告是否可见
         * @param hackData 通过mpsdk.Hack.getOpenLevel()取得
         * @param city ums后台广告配置可见城市（city_show）;如 四川,广州
         * @returns boolean
         */
        private static checkCityVisible;
        static checkCityInvisible(hackData: IAppStatus, city?: string): boolean;
        /**
         * 数据修正管道
         * @param dataList 原始数据列表
         * @param gender 性别，用于附加外链参数
         * @param userValue 用户价值，用于附加外链参数
         */
        static dataFixPip(dataList: IDataItem[], gender: number, userValue: number): IDataItem[];
        /**
         * 将网络路径转换为本地资源缓存路径
         * @param dataList 数据列表
         */
        static dataFixCacheRes(dataList: IDataItem[]): Promise<IDataItem[]>;
        /**
         * 批量上报展示数据
         */
        static reportShowBat(appList: IDataItem[]): void;
        /**
         * 单个上报展示数据
         */
        static reportShow(appItem: IDataItem): void;
        /**
         * 上报点击数据
         * @param appItem 广告数据
         * @param serial 点击广告的位置（请游戏自行设定位置序号，如：1=首页 / 2=过关界面 / 3=失败界面 ...）
         */
        static reportClick(appItem: IDataItem, serial?: number): void;
        /**
         * 点击广告（不论成败均统计点击次数）
         * @param appItem 广告数据
         * @param serial 点击广告的位置（请游戏自行设定位置序号，如：1=首页 / 2=过关界面 / 3=失败界面 ...）
         * @param returnPromise 设为true可使得返回一个Promise，能确定玩家是否跳转成功（false是不确定玩家是否跳转成功的）
         * @returns 是否是第一次点击该广告
         */
        static click(appItem: IDataItem, serial?: number, returnPromise?: boolean): boolean | Promise<boolean>;
        /**
         * 点击广告（不论成败均统计点击次数）
         * click的同步版本
         * @param appItem 广告数据
         * @param serial 点击广告的位置（请游戏自行设定位置序号，如：1=首页 / 2=过关界面 / 3=失败界面 ...）
         * @param clickCallback 能确定玩家是否跳转成功，需要设置该参数；否则不设置。 clickCallback(isLaunchToSuccess,isFirstClick)
         * @returns 是否是第一次点击该广告
         */
        static clickSync(appItem: IDataItem, serial?: number, clickCallback?: any): boolean | undefined;
        /**
         * 检查是否是第一次点击广告
         * @param adid 广告ID
         * @param save 是否记录广告点击
         * @returns 如果是第一次点击返回true，否则返回false
         */
        private static checkClickRecord;
        /**
         * 广告转化行为跟踪
         * @param options 微信小游戏从onShow()回调中获取；微信小程序从onLoad()回调中获取;
         * @param pagePath 创建广告填写的小程序路径
         */
        static trackAdConversion(options: any, pagePath?: string): void;
        /**
         * 判断是否是次留
         * @param createTime 时间戳 单位：毫秒
         */
        private static checkSecondaryRetention;
        /**
         * 显示激励广告提示对话框
         * 建议在激励广告拉取成功时调用。
         * @param dialogMsg 提示内容
         * @param showDialogDelayTime 提示框显示延迟时间[单位:秒],默认为5s
         */
        static showRewardedVideoAdDialog(dialogMsg?: string, showDialogDelayTime?: number): void;
        private static crrentTimeout;
        /**
         * 获取激励广告点击的状态
         * 请在广告关闭的时候使用该方法
         * 并且需要在激励广告拉取成功后使用[mpsdk.Ad.showRewardedVideoAdDialog(dialogMsg="",showDialogDelayTime=5)](mpsdk.ad.html#showrewardedvideoaddialog)来显示提示框
         * @return boolean
         */
        static getRewardedVideoAdClickStatus(): boolean;
        /**
         * 根据概率判断是否弹出激励广告提示框
         * 后台版本配置需要配置"video_ad_show_prob"项：值为[0--100]
         * 未配置或0表示不弹出；100表示弹出
         * @param hackData
         */
        private static checkVideoAdShowByHitProb;
    }
}
declare function sprintf(key: any, ...argv: any[]): any;
declare function vsprintf(fmt: any, argv: any): any;
declare namespace mpsdk {
    class EngineUtility {
        static bIsDebug: boolean;
        static randomSeed: number;
        static enablePerformDetect: boolean;
        static performData: never[];
        static lastResetTime: number;
        static silencePerformMode: boolean;
        static renderSubmitLog: boolean;
        static InitCallback: never[];
        static enableMultiTextureSampler: boolean;
        static enableSpriteOutline: boolean;
        static enableHitRectOutline: boolean;
        static assert(value: boolean, ...message: any[]): void;
        static fmt(key: string, ...argv: any[]): string;
        static EncodeNumberToUtf8Character(index: number): string;
        static DecodeUtf8CharacterToNumber(str: string): number;
    }
}
declare namespace mpsdk {
    /**
     * 正所谓上有政策下有对策，你懂的。。
     */
    class Hack {
        /**
         * 是否允许程序切出，如果不为true的话，当程序切出时强制退出程序
         */
        static outPermission: boolean;
        /**
         * Promise缓存
         */
        private static serverConfigPromise;
        /**
         * @deprecated 该值仅限Share.getShareInfo()使用
         */
        static appStatus: IAppStatus;
        private static isIntoAboutPage;
        /**
         * 请求跳出程序
     *
     * 在任何允许wx.onHide的动作中都需要申请跳出
         */
        static outRequest(): void;
        /**
         * 全局开关：是否允许跳出onHide
         */
        static outCheckEnable: boolean;
        /**
         * 检查是否允许跳出（目前只有微信小游戏支持此功能）
     *
     * 本函数用于监听小游戏隐藏到后台事件，可在程序启动时就调用
     *
     * wx.onHide(mpsdk.Ad.outCheck)
         */
        private static outCheck;
        /**
         * 获取当前应用功能限制级别
         *
         * 根据各大平台审核要求，应用需要动态关闭或开放一些程序功能，SDK提供了一个较为通用的做法，以便达到审核标准。
         * @param codeVer 当前程序代码版本
         * @param gameId 平台分配的gameId参数（如果在调用此方法之前已经调用过SDK初始化方法，则可以不传，否则必传）
         * @returns 返回一个object:{ level: string }，程序只需判断level即可，其他字段请忽略。
         */
        static getOpenLevel(codeVer: string, gameId?: string | number): Promise<IAppStatus>;
        /**
         * 判断当前时间是否在广告素材审查时间区间内
         * @param hackData 通过mpsdk.Hack.getOpenLevel()取得
         */
        static checkAdTimeLimit(hackData: IAppStatus): boolean;
        /**
         * 判断当前城市是否在广告素材审查黑名单中
         * @param hackData 通过mpsdk.Hack.getOpenLevel()取得
         */
        static checkAdCityLimit(hackData: IAppStatus): boolean;
        /**
         * 判断分值是否在广告素材审查限制范围内
         * @param hackData 通过mpsdk.Hack.getOpenLevel()取得
             * @param score 请传入当前玩家的【等级或分数或游戏时长】等可以直观判断玩家级别的数值，用以处理审核期间返回的广告数量
         */
        static checkAdScoreLimit(hackData: IAppStatus, score: number): boolean;
        /**
         * 是否允许强裂变
         * @param fromAppId 来源appid[注意：没有特殊要求，此参数使用默认值即可，不能随意设置。]
         * @returns 返回true表示可以强裂变，false表示不可以强裂变
         */
        static isStrongFission(fromAppId?: string): boolean;
        /**
         * 判断当前城市是否在分享限制黑名单中
         * @param hackData 通过mpsdk.Hack.getOpenLevel()取得
         */
        static checkShareCityLimit(hackData: IAppStatus): boolean;
        /**
         * 判断当前城市是否命中的通用方法
         * @param hackData 通过mpsdk.Hack.getOpenLevel()取得
         * @param cityKey ums后台配置城市的标识key
         */
        static checkCityLimit(hackData: IAppStatus, cityKey: string): boolean;
        private static lastOnHideTime;
        static onHide(hideOptions: IHideOptions): void;
        static onShow(): void;
        private static checkHideStatus;
        /**
         * 检查点击激励广告切换后台的状态
         * @param options
         */
        static checkRewardedVideoAd2Back(options: any): void;
    }
}
declare namespace mpsdk {
    /**
     * Laya平台适配器
     * @external
     */
    class LayaPlatform implements IPlatform {
        writeFile(fileName: string, data: string): string;
        getStorage(key: string): any;
        setStorage(key: string, data: any): void;
        httpRequest(url: string, params?: any, method?: string, retryTimes?: number): Promise<any>;
        private writeOpenId2Native;
        private getNativeAppOpenId;
        getUserAccount(launchOptions: ILaunchOptions): Promise<IAccount>;
        getUserInfo(): Promise<IUserInfo>;
        getSystem(): ISystem;
        getLaunchOptions(): ILaunchOptions;
        launchTo(app: IDataItem): Promise<void>;
        launchToSync(app: IDataItem, launchToCallback: any): Promise<void>;
        share(shareInfo: IShareInfo, success: any, fail: any, thisObject: any): any;
        setTimeout(callback: any, timeout: number): any;
        setInterval(callback: any, timeout: number): any;
        clearTimeout(t: any): void;
        clearInterval(t: any): void;
        getCacheRes(url: string, waitDownload?: boolean): Promise<string>;
        checkBannerClick(res: any): boolean;
        onHide(): void;
        showModal(object: Object): void;
        private MpsdkNativeUtils;
    }
}
declare namespace mpsdk {
    /**
     * 题目模块
     */
    class Quiz {
        /**
         * 上传自己定义题目
         * @param showInfo [json]显示信息
         * @param quiz [json]题目内容
         */
        static uploadCustomizeQuiz(showInfo: string, quiz: string): void;
        /**
         * 获取随机题目
         * @returns {"error":结果码, "quiz":题目信息, "author":作者openId, "authorShow":作者显示信息}
         */
        static getRandomQuiz(): Promise<any>;
        /**
         * 获取指定题目答题排行榜
         * @param openId 题目作者openId
         * @returns {"error":结果码, "quiz":题目信息, "rank":答题排行列表，需要客户端自己排序}
         */
        static getQuizRank(openId: string): Promise<any>;
        /**
         * 上报答题分数
         * @param quizAuthorId 题目作者openid
         * @param score 答题分数
         * @param showInfo 答题者的头像和昵称等信息[json]
         */
        static uploadAnswerQuizScore(quizAuthorId: string, score: number, showInfo: string): void;
    }
}
declare namespace mpsdk {
    /**
     * 统计模块
     */
    class Report {
        /**
         * 统计用户来源数据
         * @param options 启动参数
         */
        static reportAppRun(options: ILaunchOptions): void;
        /**
         * 统计用户活跃数据
         * @param gold 当前金币余额
         * @param level 当前最大关卡进度
         * @param leveltype 关卡类型（比如成语猜猜看游戏中包含【看图猜成语】和【成语接龙】两个游戏，那么可以依次编号为1和2），没有可不传
         */
        static reportLogin(gold?: number, level?: number, leveltype?: number): void;
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
        static reportGold(changeGold?: number, newGold?: number, param1?: string, reason?: number): void;
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
        static reportEvent(eventId?: number, param1?: string, param2?: string): void;
        /**
         * 上报激励视频播放开始事件（与reportEvent同理，eventId=999331）
         * @param adUnitId 激励视频ID
         */
        static reportEventVideoAdShow(adUnitId?: string): void;
        /**
         * 上报激励视频播放结束事件（与reportEvent同理，eventId=999332）
         * @param adUnitId 激励视频ID
         */
        static reportEventVideoAdEnd(adUnitId?: string): void;
        /**
         * 统计分享裂变
         */
        private static reportShareIn;
        /**
         * 统计外链投放
         *
         * 友情外链统一格式：/pages/index/index?type=link&adid=ad_${gameid}_${序号}
         */
        private static reportLinkIn;
        /**
         * 统计广告投放
         *
         * 广告外链统一格式：/pages/index/index?type=wxad&adid=ad_${gameid}_${序号}
         */
        private static reportAdIn;
        /**
         * 上一次同步在线时长的时间（避免短期内重复上报）
         */
        protected static onlineTimeCountLastReportTime: number;
        /**
         * 统计在线时长（启动后每秒触发一次，但至少间隔1分钟才会上报）
         */
        static reportOnlineTimeCount(): Promise<void>;
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
        static reportNewUserLog(stepId: number, param1?: string, param2?: string, userid?: string): void;
        /**
         * 设置是否通过新用户打点
         * 如果未设置该参数，则默认为未通过，需要继续新用户打点
         * @param isPass true:通过新用户打点，无需再打点；false：需要继续新用户打点
         */
        static setNewUserLogPass(isPass: boolean): void;
        /**
         * 上报热启动来源数据
         * @param options
         */
        static reportHotLaunch(options: ILaunchOptions): void;
    }
}
declare namespace mpsdk {
    /**
     * 激励模块
     */
    class Reward {
        /**
         * 给用户发放红包（金额随机，需在服务端配置随机范围）
         * @param dataKey 支持发放多种类型红包，不过一般用不上，可以不传参，使用默认值就好
         */
        static hbAdd(dataKey?: string): Promise<{
            giftValue: number;
            id: number;
        }>;
        /**
         * 查询玩家红包记录
         * @param dataKey 支持发放多种类型红包，不过一般用不上，可以不传参，使用默认值就好
         */
        static hbList(dataKey?: string): Promise<{
            gameId: number;
            giftKey: string;
            giftTime: number;
            giftValue: number;
            openId: string;
            unionId: string;
        }[]>;
        /**
         * 查询玩家红包总额
         * @param dataKey 支持发放多种类型红包，不过一般用不上，可以不传参，使用默认值就好
         * @returns 返回红包金额，单位为分
         */
        static hbAmount(dataKey?: string): Promise<number>;
        /**
         * 红包翻倍
         * @param giftId 指定要翻倍的红包ID（红包ID只在发放红包时返回）
         * @param dataKey 支持发放多种类型红包，不过一般用不上，可以不传参，使用默认值就好
         * @returns 返回翻倍后的金额，单位为分
         */
        static hbDouble(giftId: number, dataKey?: string): Promise<number>;
    }
}
declare namespace mpsdk {
    /**
     * 社交模块
     */
    class SNS {
        /**
         * 更新自己排行数值
         * @param datakey 排行数据键名（可以支持多种排行）
         * @param value 排行数值[只支持整型数值]
         * @param params 附加参数（在获取排行列表时可返回该值，主要用于外观设置，如用户头像、昵称等；仅支持string，复杂数据需用JSON.stringify序列化后再用encodeURI转码）
         */
        static rankUpload(datakey: string, value: string, params: string): void;
        /**
         * 绑定好友关系，绑定后可以查看好友排行榜数据
         * @param friendOpenId 对方的openid
         */
        static friendBind(friendOpenId: string): void;
        /**
         * 获取好友排行榜
         * @param dataKey 排行数据键名
         */
        static friendList(dataKey: string): Promise<any[]>;
        /**
         * 获取世界排行榜
         * @param dataKey 排行数据键名
         */
        static rankList(dataKey: string): Promise<any[]>;
        /**
         * 获取世界排行历史数据/上期排行榜
         * @param dataKey 排行数据键名
         */
        static rankListHistory(dataKey: string): Promise<any[]>;
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
        static inviteAccept(inviter: string, payload?: string, type?: number, lastLoginTime?: number, extend?: string): Promise<any>;
        /**
         * 上报受邀请者打点数据
         * @param inviter 发出邀请的用户的openId
         * @param taskKey 数据类型key：如:level--通关记录.(研发自行定义)
         * @param taskValue 具体值。如通过10关 taskValue='10'
         */
        static reportInviteeEvent(inviter: string, taskKey?: string, taskValue?: string): Promise<any>;
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
        static inviteResultList(type?: number): Promise<{
            friends: any[];
            num: number;
            openId: string[];
            param: string[];
        }>;
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
        static inviteResult(type?: number): Promise<Array<{
            openId: string;
            show: string;
            param: string;
        }>>;
        /**
         * 参与抽奖
         * @param condition1 抽奖条件1，>=此数值的账号可以抽奖
         * @param condition2 抽奖条件2，<=此数值的账号可以抽奖
         * @param params 附加参数（在获取中奖结果时可返回该值，主要用于外观设置，如用户头像、昵称等；仅支持string，复杂数据用JSON.stringify序列化）
         */
        static joinLottery(condition1: string, condition2: string, params: string): void;
        /**
         * 随机得到全服10个玩家信息
         */
        static getRandUserInfo(): Promise<Array<{
            gameId: number;
            openId: string;
            show: string;
            unionId: string;
        }>>;
        /**
         * 玩家事件交互（对其他玩家发起事件）
         * @param eventId 事件ID（例如农场类游戏的偷菜，浇水等事件，ID由游戏自行定义）
         * @param targetUserOpenId 目标用户（当前用户对谁发起作用事件）
         * @param param 附加参数（透传）
         */
        static saveEvent(eventId: string, targetUserOpenId: string, param: string): Promise<void>;
        /**
         * 获取近期其他玩家对当前玩家发起的事件列表（最多15个）
         * @returns "{ "eventId": 事件ID, "openId": 其他玩家的ID, "show": 其他玩家的头像昵称等, param: 附加参数, "time": 事件产生时的毫秒时间戳 }"
         */
        static getEvents(): Promise<Array<{
            "eventId": string;
            "openId": string;
            "show": string;
            param: string;
            "time": number;
        }>>;
        /**
         * 查询可以领取的奖品
         * @param launchOptions 启动参数，建议放在wx.onShow回调中，以便热启动时获得最新参数
         * @returns '{ "unionId": "用户ID", "prizeType": "奖品类型(lottery抽奖获得/exchange兑换获得)", "prizeId": "奖品ID" }' || null
         */
        static checkPrize(launchOptions: ILaunchOptions): {
            unionId: string;
            prizeType: string;
            prizeId: string;
        } | null;
        /**
         * 消耗奖品，请确保消耗成功后再发放道具，相当于做一次服务端验证
         * @param unionId
         * @param prizeType
         * @param prizeId
         */
        static consumePrize(unionId: string, prizeType: string, prizeId: string): Promise<void>;
        /**
             * 获取自己上期指定排行榜的排名；用于排行榜发奖功能
         *
             * @param dataKey 排行数据键名
         * @returns '{ "rank": 0}' 返回玩家自己的排名;如果名次不够领奖，rank则为0
             */
        static getMyPreviousRankAward(dataKey: string): Promise<{
            rank: number;
        }>;
    }
}
declare namespace mpsdk {
    /**
     * 分享模块
     */
    class Share {
        /**
         * 分享配置列表
         */
        private static shareInfoList;
        /**
         * 分享配置Promise
         */
        private static shareInfoPromise;
        /**
         * 预加载分享配置（本函数不会reject）
         */
        static loadShareInfoList(): Promise<Array<IShareImage>>;
        /**
         * 查询分享图配置
             * @param id 分享图ID（通过wx.getLaunchOptionsSync().query.shareinfoid取得）
         */
        static getShareImage(id: number): Promise<IShareImage>;
        /**
         * 随机获取一组分享信息
     * @deprecated 请使用commonShare方法
         * @param nickname 当前用户昵称，可以传空
         * @returns 线上配置到分享内容
         */
        static getShareInfo(nickname?: string): {
            id: number;
            image: string;
            text: string;
            table: number;
        } | undefined;
        /**
         * 随机获取一组分享信息
         * @param defaultShareInfo 服务端下发分享配置是异步行为，而微信分享必须同步返回数据，所以需要传入一组默认分享信息，以确保返回分享信息
         * @returns 线上配置到分享内容
         */
        static genShareInfo(defaultShareInfo: IShareInfo): IShareInfo;
        /**
         * 检查是否过滤(敏感信息、地区、分值、审核状态)
         * @param item
         * @param defaultShareInfo
         */
        private static checkFilter;
        /**
         * 合成分享图片（限小游戏使用）
         * @deprecated 功能暂未发布，请勿使用
         * @param backImage 分享底图
         * @param headImage 当前用户头像
         */
        static genShareImage(backImageUrl: string, headImageUrl: string): Promise<any>;
        /**
         * 生成分享链接（小程序专用）
         * @param serial 分享点序号
         * @param path 小程序页面路径
         * @param query 其他自定义参数键值对
         * @param shareInfoId 如果分享信息是通过getShareInfo()取得，则需要传入获取的分享信息ID
         */
        static getShareLink(serial: number, path?: string, query?: Object, shareInfoId?: string | number): string;
        /**
         * 生成分享请求参数(形如a=b&c=d)
         * @param serial 分享点序号
         * @param query 其他自定义参数键值对
         * @param shareInfoId 如果分享信息是通过getShareInfo()取得，则需要传入获取的分享图ID
         */
        static getShareQuery(serial: number, query?: any, shareInfoId?: string | number): string;
        /**
         * 统计分享次数
         *
         * 分享链接统一格式：/pages/index/index?type=share&shareid=share_${gameid}_${序号}&userid=getAccount().openid
         * @param serial int 分享点序号
         * @param shareInfoId int 如果分享信息是通过getShareInfo()取得，则需要传入获取的分享信息ID
         * @param shareTicket string 分享到群时传shareTicket，分享到个人时传空
         * @param param1 string 扩展参数
         */
        static reportShareOut(serial: number, shareInfoId?: string, shareTicket?: string, param1?: string): void;
        /**
     * 通用分享处理函数
     * @param shareInfo 分享内容
     * @param success 分享成功回调函数（Bricks平台可接收shareDest和isFirstShare两个参数）
     * @param fail 分享失败回调函数（Bricks平台可接收retCode失败原因码）
     * @param thisObject 回调函数的this作用域
     * @returns 微信平台会返回构造好的分享信息；玩一玩平台直接拉起多渠道分享，不返回信息
     */
        static commonShare(shareInfo: IShareInfo, success?: any, fail?: any, thisObject?: any): any;
        static checkValidShare(): Promise<boolean>;
        private static ran;
        static genImagePath(url: string): string;
    }
}
/**
 * 常量定义
 */
declare namespace mpsdk.constant {
    /**
     * 用户激活类型
     */
    enum ActiveType {
        /**
         * 授权用户信息
         */
        GET_USER_INFO = 1,
        /**
         * 开始游戏
         */
        START_GAME = 2
    }
    /**
     * 用户激活状态值
     */
    enum ActiveValue {
        /**
         * 初始状态，未知（系统对每个用户都已建立初始值，非特殊情况请不要初始化用户激活状态）
         */
        UNKNOWN = 0,
        /**
         * 激活，使之有效
         */
        ACTIVE = 1,
        /**
         * 反激活，使之无效
         */
        INACTIVE = 2
    }
    /**
     * 新用户打点相关常量
     */
    enum NewUserLogEnum {
        /**
         * action-微信登陆前1
         */
        ACTION_WX_LOGIN_BEGIN = 1,
        /**
         * action-微信登陆后2
         */
        ACTION_WX_LOGIN_END = 2,
        /**
         * action-服务器登陆前3
         */
        ACTION_PT_LOGIN_BEGIN = 3,
        /**
         * action-服务器登陆后4
         */
        ACTION_PT_LOGIN_END = 4
    }
    /**
   * 新用户打点状态相关常量
   */
    enum NewUserLogStatusEnum {
        /**
         * 上报状态--成功1
         */
        STATUS_REPORT_SUCCESS = "1",
        /**
         * 上报状态--失败0
         */
        STATUS_REPORT_FAILS = "0"
    }
}
declare namespace mpsdk {
    /**
     * 用户账号
     */
    interface IAccount {
        openid: string;
        unionid?: string;
        lastLoginTime?: number;
        createTime?: number;
        shareTime?: number;
        sid?: string;
        anonymous_openid?: string;
        sourceType?: string;
        sourceId?: string;
    }
    /**
     * 用户来源
     */
    interface IAccountSource {
        sourceType: string;
        sourceId: string;
    }
    /**
     * 用户信息
     */
    interface IUserInfo {
        /**
         * 用户昵称
         */
        nickName?: string;
        /**
         * 用户头像
         */
        avatarUrl?: string;
        /**
         * 用户的性别，值为1时是男性，值为2时是女性，值为0时是未知，-1是无法获取
         */
        gender?: number;
    }
    /**
     * 分享信息
     */
    interface IShareInfo {
        /**
         * 分享触发点序号，比如右上角分享点为1，首页分享按钮为2，游戏主界面分享为3，过关炫耀分享为4，等等；CP自行定义或根据运营建议，事后统计时可以确定分享点来源位置即可。
         */
        serial: number;
        /**
         * 分享标题（由于随机分享内容从网络获取，可能会失败，失败后会使用这个默认标题，如果不设置最后也会由对应平台自动设置）
         */
        title?: string;
        /**
         * 分享图片（作用同title）
         */
        image?: string;
        /**
         * 分享图ID（如果imageId=0,则返回默认分享信息;如果指定了图片ID则返回固定分享图配置，否则随机获取分享内容成功后会自动设置）
         */
        imageId?: number;
        /**
         * 【手Q专用】分享至空间、微信、朋友圈时需要的图。（选填，若无该字段，系统使用游戏对应的二维码）
         */
        localPicPath?: string;
        /**
         * 【微信小程序专用】（不传默认为/pages/index/index），点击分享卡片进入的路径（必须是纯路径，不含任何参数，参数请设置到params里）
         */
        path?: string;
        /**
         * app需要带出去的自定义分享参数（键值对）（微信小游戏的query参数也是设置到这里）
         */
        params?: Object;
        /**
         * 当前用户昵称，可用于替换服务端下发的分享图描述信息中的{nickname}占位符
         */
        nickName?: string;
        /**
         * 用户当前分值，请传入当前玩家的【等级或分数或游戏时长】等可以直观判断玩家级别的数值，低于阀值的用户将屏蔽部分敏感图片
         */
        scoreValue?: number;
        /**
        * 分享图当前版本号，请传入当前分享图的版本号。用于获取指定版本号的分享图，或者未配置版本号的分享图
        */
        version?: string;
        /**
         * 分享语前缀
         */
        prefix?: string;
    }
    /**
     * 分享图配置
     */
    interface IShareImage {
        /**
         * 分享图ID
         */
        id: number;
        /**
         * 分享图片地址
         */
        image: string;
        /**
         * 分享图描述
         */
        text: string;
        /**
         * 分享图权重
         */
        table: number;
        /**
         * 是否包含敏感信息（比如带有色诱成分）
         */
        illegal: string;
        /**
         * 城市限制
         */
        city: string;
        /**
         * 分值限制
         */
        number: number;
        /**
         * 版本限制
         */
        version: string;
    }
    /**
     * 启动参数
     */
    interface ILaunchOptions {
        /**
         * 厘米游戏取GameStatusInfo.src
         */
        scene: any;
        /**
         * 厘米游戏取GameStatusInfo.gameParam
         */
        query: any;
        isSticky?: boolean;
        shareTicket?: string;
        referrerInfo?: any;
    }
    /**
     * 设备系统信息
     */
    interface ISystem {
        /**
         * 操作系统ios/android
         */
        platform: string;
        model?: string;
    }
    interface IAppStatus {
        /**
         * level=0 高级限制保护 = 最低开放程度
         *
         * level=1 中级限制保护 = 中等开放程度
         *
         * level=2 低级限制保护 = 完全开放程度
         */
        level: string;
        /**
         * 地理位置
         */
        ipArea?: {
            country: string;
            province: string;
            city: string;
        };
        /**
         * IP地址
         */
        ipAddr?: string;
        status?: string;
        codeVer?: string;
        link_city?: string;
        link_time?: string;
        link_enable_level?: string;
        sharemodecity?: string;
        sdk_hide_status?: string;
        sdk_hide_time?: string;
    }
    /**
     * 栏目数据模型
     */
    interface ICategory {
        title: string;
        icon: string;
        category: string;
        form: string;
        children: IDataItem[];
    }
    /**
     * 广告数据模型
     */
    interface IDataItem {
        id: string;
        adid?: string;
        product_id: string;
        aid: string;
        appid: string;
        image: string;
        icon: string;
        ad_image: string;
        banner: string;
        title: string;
        description: string;
        button_text: string;
        coins: string;
        page: string;
        status: string;
        create_time: string;
        username: string;
        sort: string;
        count: number;
        category: number | string;
        plan_number: string;
        table: number | string;
        start_time: string;
        end_time: string;
        up_time: string;
        platform: string;
        sex: number | string;
        uservalue: string;
        clicked?: boolean;
        audi?: string;
        classify?: number;
        atlas_photo?: string;
        atlas_config?: string;
        city_show?: string;
        title_bg?: string;
        is_bold?: string;
        city_hide?: string;
    }
    /**
     * 拼多多商品数据模型
     */
    interface IPddGoodsItem {
        "avg_desc": number;
        "mall_coupon_remain_quantity": number;
        "category_name": string;
        "coupon_remain_quantity": number;
        "avg_serv": number;
        "avg_lgst": number;
        "serv_pct": number;
        "promotion_rate": number;
        "sold_quantity": number;
        "cat_ids": number[];
        "coupon_min_order_amount": number;
        "lgst_pct": number;
        "category_id": number;
        "mall_coupon_discount_pct": string;
        "mall_id": number;
        "goods_eval_score": number;
        "cat_id": number;
        "mall_name": string;
        "coupon_total_quantity": number;
        "desc_pct": string;
        "mall_coupon_min_order_amount": number;
        "mall_coupon_end_time": number;
        "merchant_type": number;
        "goods_name": string;
        "goods_eval_count": number;
        "goods_id": number;
        "goods_gallery_urls": string[];
        "mall_coupon_id": number;
        "goods_desc": string;
        "opt_name": string;
        "goods_thumbnail_url": string;
        "opt_id": number;
        "opt_ids": number[];
        "goods_image_url": string;
        "min_normal_price": number;
        "has_coupon": boolean;
        "has_mall_coupon": boolean;
        "mall_coupon_start_time": number;
        "mall_rate": number;
        "mall_coupon_total_quantity": number;
        "create_at": number;
        "mall_coupon_max_discount_amount": number;
        "min_group_price": number;
        "mall_cps": number;
        "coupon_start_time": number;
        "coupon_discount": number;
        "coupon_end_time": number;
    }
    /**
     * 平台差异处理接口
     */
    interface IPlatform {
        /**
         * 从设备获取存储的数据
         * @param key 键名
         */
        getStorage(key: string): any;
        /**
         * 存储数据到设备
         * @param key 键名
         * @param data 值
         * @param isSync 同步标识：默认为true-同步;如果需要异步则设为false.
         */
        setStorage(key: string, data: any, isSync?: boolean): void;
        /**
         * 发起HTTP请求
         * @param url 请求地址
         * @param params 请求参数键值对
         * @param method 请求方法
         * @param retryTimes HTTP请求失败重试次数（默认为2次）
         */
        httpRequest(url: string, params?: Object, method?: string, retryTimes?: number): Promise<any>;
        /**
         * 获取用户账号
         * @param launchOptions 启动参数
         */
        getUserAccount(launchOptions: ILaunchOptions): Promise<IAccount>;
        /**
         * 获取用户信息
         */
        getUserInfo(): Promise<IUserInfo>;
        /**
         * 获取设备信息
         */
        getSystem(): ISystem;
        /**
         * 获取启动参数（微信小程序请勿使用）
         */
        getLaunchOptions(): ILaunchOptions;
        /**
         * 跳转到指定app（并自动上报点击数据）
         */
        launchTo(app: IDataItem): Promise<any>;
        /**
         * 跳转到指定app（并自动上报点击数据）
         */
        launchToSync(app: IDataItem, launchToCallback: any): any;
        /**
         * 通用分享处理函数
         * @param shareInfo 分享内容
             * @param score 请传入当前玩家的【等级或分数或游戏时长】等可以直观判断玩家级别的数值，用以屏蔽部分敏感图片
         * @param success 分享成功回调函数（Bricks平台可接收shareDest和isFirstShare两个参数）
         * @param fail 分享失败回调函数（Bricks平台可接收retCode失败原因码）
         * @param thisObject 回调函数的this作用域
         * @returns 微信平台会返回构造号的分享信息；玩一玩平台直接拉起多渠道分享，不返回信息
         */
        share(shareInfo: IShareInfo, score: number, success?: any, fail?: any, thisObject?: any): any;
        /**
         * 获取本地缓存资源路径，如果失败返回原网络路径
         * @param url 原网络路径
         * @param waitDownload true表示等待下载完成（但如果相同URL重复调用则后面的直接返回原路径而不会多次下载）；false表示加入下载队列后先将原地址返回
         */
        getCacheRes(url: string, waitDownload: boolean): Promise<string>;
        /**
         * 定时执行一次
         * @param callback 要执行的函数
         * @param timeout 毫秒
         */
        setTimeout(callback: any, timeout: number): any;
        /**
         * 间隔执行N次
         * @param callback 要执行的函数
         * @param timeout 毫秒
         */
        setInterval(callback: any, timeout: number): any;
        /**
         * 终止定时任务
         */
        clearTimeout(t: any): void;
        /**
         * 终止间隔任务
         */
        clearInterval(t: any): void;
        /**
         * 检查玩家是否点击banner；
         * @param res wx.onShow回调信息
         * @returns 如果点击成功返回true，否则返回false
         */
        checkBannerClick(res: any): boolean;
        onHide(): void;
        showModal(object: Object): void;
        writeFile(fileName: string, data: string): string;
    }
    interface IHideOptions {
        gameId: string | number;
        gamePath: string;
        openid?: string;
        unionid?: string;
        lastLoginTime?: number;
        createTime?: number;
        shareTime?: number;
        sid?: string;
        anonymous_openid?: string;
        options?: any;
        launchOptions?: ILaunchOptions;
    }
}
declare namespace mpsdk.gif {
    /**
     * GIF图片帧信息
     */
    class GifImage {
        /**
         * 帧索引
         */
        identifier: string;
        /**
         * 局部色表数据
         */
        localPalette: ArrayBuffer;
        /**
         * 局部色表分类标志
         */
        sorted: boolean;
        /**
         * true表示图像数据使用交织排列，false表示顺序排列，解密光栅数据有用
         */
        interlace: boolean;
        /**
         * 透明色索引
         */
        transparentIndex: number;
        /**
         * 一个像素索引值所用的最少比特位数（LZW解码用）
         */
        lzwMinCodeSize: number;
        /**
         * 完整的一帧图片数据，可以直接当GIF静图显示哦
         */
        frameData: ArrayBuffer;
        /**
         * 光栅数据，避免多次解码编码
         */
        pixels: number[];
        /**
         * 图像数据块原始数据
         */
        rawData: string;
        /**
         * 图像数据起始位置
         */
        start: number;
        /**
         * 注释信息
         */
        comments: any[];
        /**
         * 图形文本信息
         */
        text: string;
        /**
         * x偏移
         */
        left: number;
        /**
         * y偏移
         */
        top: number;
        /**
         * 宽度
         */
        width: number;
        /**
         * 高度
         */
        height: number;
        /**
         * 持续时间
         */
        delay: number;
        /**
         * 处置方法
         */
        disposal: number;
    }
}
declare namespace mpsdk.gif {
    /**
     * 画板，用于图像合成
     */
    class ImageCanvas {
        /**
         * 画布光栅数据
         */
        imageData: number[];
        private width;
        constructor(width: number, height: number, bgColor: number);
        /**
         * 向画布覆盖添加光栅数据
         */
        drawImage(pixels: number[], top: number, left: number, width: number, transparentIndex: number): void;
    }
}
declare namespace mpsdk.gif {
    /**
     * lzw解码器
     */
    class lzw {
        /**
         * 编码
         */
        static encode(actualCodes: number[], numBits: number): number[];
        /**
         * 解码
         */
        static decode(minCodeSize: number, data: string): number[];
    }
}
declare namespace mpsdk.gif {
    /**
     * GIF解析工具
     */
    class GifReader {
        /**
         * GIF格式是否正确
         */
        readonly valid: boolean;
        private _valid;
        /**
         * 全局色表数据
         */
        readonly globalPalette: ArrayBuffer;
        private _globalPalette;
        /**
         * 全局色表分类标志
         */
        readonly sorted: boolean;
        private _sorted;
        /**
         * 背景色索引
         */
        readonly backgroundIndex: number;
        private _backgroundIndex;
        /**
         * 颜色深度
         */
        readonly colorDepth: number;
        private _colorDepth;
        /**
         * 全局头部数据，用于拼接分解图片
         */
        readonly globalHeadData: ArrayBuffer;
        private _globalHeadData;
        /**
         * 循环次数，0为无限
         */
        readonly loopCount: number;
        private _loopCount;
        /**
         * 高度
         */
        readonly height: number;
        private _height;
        /**
         * 宽度
         */
        readonly width: number;
        private _width;
        /**
         * 是否是动图
         */
        readonly animated: boolean;
        private _animated;
        /**
         * 每帧的图片数据
         */
        readonly images: GifImage[];
        private _images;
        /**
         * 图片数据视图
         */
        readonly dataView: DataView;
        private _dv;
        /**
         * 读取并解析ArrayBuffer
         */
        constructor(sourceArrayBuffer: ArrayBuffer);
        /**
         * 实例被序列化再反序列化后丢失所有方法函数，可以用此方法重建实例
         */
        constructor(serializeData: Object);
        private parseGifInfo;
        /**
         * 获取一帧图像的光栅数据（像素点记录的只是颜色索引）
         */
        getPixels(index: number): number[];
        /**
         * 获取一帧图像的完整数据
         * @param index 帧序号，从0开始
         */
        getFrame(index: number): ArrayBuffer;
        /**
         * 连接ArrayBuffer
         */
        private concatArrayBuffer;
        /**
         * 将10进制数转换为2进制表达的数组[0,0,0,0,0,0,0,0]
         */
        private getBitArray;
        /**
         * 将2进制表达的数组转换为10进制数
         */
        private bitToInt;
        /**
         * 获取色表字节长度
         */
        private getPaletteSize;
        /**
         * 计算延时秒数
         * @returns 单位：毫秒
         */
        private getDuration;
        /**
         * 读取字符串
         * @param dv 数据视图
         * @param pos 起始位置
         * @param length 读取长度
         */
        private getString;
        /**
         * 读取子块
         * @param dv 数据视图
         * @param pos 起始位置
         * @param read 是否读取数据，默认为false，表示只计算大小，不读取数据
         */
        private readSubBlock;
        private makeSubBlock;
        /**
         * 还原交织数据
         */
        private deinterlace;
    }
}
declare namespace mpsdk.gif {
    /**
     * egret GIF播放器
     */
    class EgretGifMovie {
        private url;
        /**
         * 实际类型为egret.Bitmap
         */
        movie: any;
        private reader;
        private textureCache;
        private frameIndex;
        private timer;
        private callbackFunc;
        private callbackObject;
        private static gifCache;
        private static worker;
        private static workerType;
        private static workerPath;
        private static workerListener;
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
        static loadByUrl(url: string, callbackFunc: (gifMovie: EgretGifMovie) => void, callbackObject: any, workerType?: string, workerPath?: string): void;
        /**
         * 请勿直接使用此构造函数，而应该使用loadByUrl()静态方法加载GIF图片
         * @param url GIF图片网络地址
         * @param callbackFunc 回调函数
         * @param callbackObject 回调函数的this对象
         */
        constructor(url: string, callbackFunc: Function, callbackObject: any);
        /**
         * 从HTTP数据流加载
         */
        private loadBuffer;
        /**
         * 从缓存加载
         */
        private loadCache;
        private compFunc;
        /**
         * 开始播放
         */
        private play;
        /**
         * 回收销毁
         */
        destroy(): void;
    }
}
declare namespace mpsdk.gif {
    /**
     * cocos GIF播放器
     */
    class CocosGifMovie {
        private url;
        /**
         * 实际类型为cc.Node，内部包含一个cc.Sprite
         */
        movie: any;
        private sprite;
        private reader;
        private textureCache;
        private frameIndex;
        private timer;
        private callbackFunc;
        private callbackObject;
        private static gifCache;
        /**
         * 通过URL载入GIF动图
         * @param url GIF图片网络地址
         * @param callbackFunc 回调函数
         * @param callbackObject 回调函数的this对象
         */
        static loadByUrl(url: string, callbackFunc: (gifMovie: CocosGifMovie) => void, callbackObject: any): void;
        /**
         * 请勿直接使用此构造函数，而应该使用loadByUrl()静态方法加载GIF图片
         * @param url GIF图片网络地址
         * @param callbackFunc 回调函数
         * @param callbackObject 回调函数的this对象
         */
        constructor(url: string, callbackFunc: Function, callbackObject: any);
        /**
         * 从HTTP数据流加载
         */
        private loadBuffer;
        /**
         * 从缓存加载
         */
        private loadCache;
        private compFunc;
        /**
         * 开始播放
         */
        private play;
        /**
         * 回收销毁
         */
        dispose(): void;
    }
}
declare namespace mpsdk.ext {
    class PDD {
        /**
         * 获取12个拼多多的优惠商品
         * @gameId 游戏id
         */
        static getGoodsList(gameId?: string | number): Promise<IPddGoodsItem[]>;
        /**
         * 获取单个范围内金额的商品
         * @package maxPrice 金额上限
         * @package minPrice 金额下限
         */
        static getRandomGoods(maxPrice: number, minPrice?: number): Promise<IPddGoodsItem>;
        /**
         * 随机获取一个价格区间内的商品
         */
        static getRedbagGoods(): Promise<IPddGoodsItem>;
        /**
         * 获取对应金额区间商品
         * @param list 商品列表
         * @param minPrice 最低金额
         * @param maxPrice 最高金额
         * @param isRandom 是否随机返回/否则按热度顺序返回
         */
        private static getNeedGoods;
    }
}
declare namespace mpsdk {
    /**
     * SDK初始化，获取openid，处理启动参数
     * @param gameId 平台分配的gameId参数
     * @param gamePath 平台分配的gamePath参数
     * @param options 启动参数（微信小程序必须传此参数，其他可以不传）
     * @param isNeedUnionid 是否需要获取unionid(默认为false--不获取,如需要获取,可设置为true)
     */
    function init(gameId: string | number, gamePath: string, options?: ILaunchOptions, isNeedUnionid?: boolean): Promise<any>;
    /**
     * SDK初始化
     * @param gameId 平台分配的gameId参数
     * @param gamePath 平台分配的gamePath参数
     * @param account 用户账号
     * @param options 启动参数（微信小程序必须传此参数，其他可以不传）
     * @param isNeedUnionid 是否需要获取unionid(默认为false--不获取,如需要获取,可设置为true)
     */
    function initWithAccount(gameId: string | number, gamePath: string, account: IAccount, options?: ILaunchOptions, isNeedUnionid?: boolean): void;
    /**
     * 打印日志（日志前缀统一为mpsdk，方便筛选）
     *
     * 可通过设置`mpsdk.Env.showLog = false`来关闭日志
     */
    function log(...args: any[]): void;
    /**
     * 查SDK版本更新
     */
    function checkUpdate(): void;
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
    function getStatus(gameId?: string | number): Promise<any | {
        ipCheck: string;
        status: string;
        codeVer: string;
    }>;
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
    function getOpenLevel(codeVer: string, gameId?: string | number): Promise<{
        level: string;
    }>;
    /**
     * 获取服务器时间
     */
    function getServerTime(): Promise<number | undefined>;
}
declare namespace mpsdk.gif {
    class CocosGifAnim {
        /**
         * 展示单个gif动态图集
         * @param pngPath 图集地址
         * @param jsonPath 图集json配置文件地址
         * @param single cc.Node
         */
        static getGifAnim(pngPath: any, jsonPath: any, single: any): Promise<{}>;
    }
}
declare namespace mpsdk.gif {
    class LayaGifAnimLoader {
        static Pool: LayaGifAnim[];
        static Load(pngPath: any, jsonPath: any, titlePath: any, iconname: any, isBold: any): Promise<LayaGifAnim>;
    }
    class LayaGifAnim {
        View: any;
        private _nowpage;
        private _texList;
        private _icon;
        private _title;
        private _titleTxt;
        private _frame;
        constructor();
        Init(jsonlist: any[], tx: any, titleurl: string, iconname: string, isBold: boolean): void;
        private changeFrame;
        Update(): void;
        Destroy(): void;
    }
}
declare namespace mpsdk.ui {
    /**
     * 猜你喜欢九宫格展示，目前展示6格
     */
    class CCADGridUI {
        static mBgBase64: string;
        static mFrameBase64: string;
        private static mRootNode;
        private static mSignleCache;
        private static mHorizonList;
        private static mBgSprite;
        private static mFrameSprite;
        private static mContent;
        private static mWidgetList;
        private static mScrollView;
        /**
         * 初始化单个猜你喜欢
         */
        private static init;
        /**
         * 展示推荐列表
         * 在获取到推荐列表(Ad.getSuggestList())后使用
         * @param dataList 推荐列表 []
         * @param background 背景颜色 cc.Color
         * @param border 背景边框颜色，可以为空，为空时不显示边框 cc.Color
         * @return cc.Node
         */
        static create(dataList: any, background: any, border?: any): any;
        /**
         * 自适应
         */
        private static itemAdapt;
        private static setItemNameNode;
        private static getItemIconNode;
        private static loadUrlRes;
        private static getBase64SpFrame;
        private static initWidget;
        /**
         * 设置猜你喜欢外框
         * 请在showSuggestBottom()方法后调用
         * @param mFrame cc.SpriteFrame
         */
        static setBgFrame(mFrame: any): void;
        /**
         * 设置猜你喜欢背景
         * 请在showSuggestBottom()方法后调用
         * @param mBgSprite cc.SpriteFrame
         */
        static setBg(mBgSprite: any): void;
    }
}
declare namespace mpsdk.ui {
    class CCADListUI {
        static mBgBase64: string;
        static mFrameBase64: string;
        private static mRootNode;
        private static mSignleCache;
        private static mHorizonList;
        static MaxCount: number;
        static MaxPage: number;
        static nowIndex: number;
        static animPosX: number;
        private static actionAnim;
        static nowAngel: number;
        static nowShowCount: number;
        private static mBgSprite;
        private static mFrameSprite;
        private static mContent;
        private static mWidgetList;
        private static mNodeView;
        private static mLikeLabel;
        private static mScrollView;
        /**
         * 初始化单个猜你喜欢
         */
        private static init;
        /**
         * 展示推荐列表
         * 在获取到推荐列表(Ad.getSuggestList())后使用
         * @param dataList 推荐列表 []
         * @param background 背景颜色 cc.Color
         * @param border 背景边框颜色，可以为空，为空时不显示边框 cc.Color
         * @return cc.Node
         */
        static create(dataList: any, background: any, border?: any): any;
        /**
         * 自适应
         */
        private static itemAdapt;
        private static playAnim;
        private static setItemNameNode;
        private static getItemIconNode;
        private static loadUrlRes;
        private static getBase64SpFrame;
        private static initWidget;
        /**
         * 设置猜你喜欢外框
         * 请在showSuggestBottom()方法后调用
         * @param mFrame cc.SpriteFrame
         */
        static setBgFrame(mFrame: any): void;
        /**
         * 设置猜你喜欢背景
         * 请在showSuggestBottom()方法后调用
         * @param mBgSprite cc.SpriteFrame
         */
        static setBg(mBgSprite: any): void;
        /**
         * 获取猜你喜欢.可以隐藏，也可自行定制.
         * 请在showSuggestBottom()方法后调用
         * @returns cc.Label
         */
        static getLikeLabel(): any;
        /**
         * 展示单个gif动态图集
         * @param pngPath 图集地址
         * @param jsonPath 图集json配置文件地址
         * @param single cc.Node
         */
        static getGifAnim(pngPath: any, jsonPath: any, single: any): Promise<{}>;
    }
}
declare namespace mpsdk.ui {
    class LayaADGridUI {
        private static _width;
        private static _height;
        private static _hlen;
        private static _vlen;
        private static _bgColor;
        private static _lineColor;
        private static _root;
        private static _bg;
        private static _iconPanel;
        private static _viewPortPanel;
        private static _movieList;
        private static _downX;
        private static createBg;
        private static createMovieItem;
        private static createMovieList;
        private static removeMovieList;
        private static updateIconPanel;
        private static updateMovie;
        private static update;
        /**
         *
         * @param dataList 猜你喜欢参数列表
         * @param background 背景颜色
         * @param border 背景边框颜色，可以为空，为空时不显示边框
         * @return Laya.Sprite 根节点
         */
        static Create(dataList: any[], bgcolor?: string, linecolor?: string): any;
        /**
         * 获取根节点
         * @return Laya.Sprite
         */
        static readonly View: any;
    }
}
declare namespace mpsdk.ui {
    class LayaADListUI {
        private static SPEED;
        private static _width;
        private static _height;
        private static _bgColor;
        private static _lineColor;
        private static _root;
        private static _bg;
        private static _iconPanel;
        private static _viewPortPanel;
        private static _cnxhtitle;
        private static _speed;
        private static _movieList;
        private static _downX;
        private static _anidelay;
        private static createBg;
        private static createMovieItem;
        private static createMovieList;
        private static removeMovieList;
        private static updateIconPanel;
        private static updateMovie;
        private static update;
        /**
         *
         * @param dataList 猜你喜欢参数列表
         * @param background 背景颜色
         * @param border 背景边框颜色，可以为空，为空时不显示边框
         * @return Laya.Sprite 根节点
         */
        static Create(dataList: any[], bgcolor?: string, linecolor?: string): any;
        private static onDown;
        private static onMove;
        private static onUp;
        /**
         * 获取根节点
         * @return Laya.Sprite 根节点
         */
        static readonly View: any;
    }
}
declare namespace mpsdk.ui {
    class LayaADSingleUI {
        private static _size;
        private static _showName;
        private static _movieList;
        private static init;
        private static createMovieItem;
        private static updateMovie;
        private static update;
        /**
         *
         * @param dataList 猜你喜欢参数列表
         * @param background 背景颜色
         * @param border 背景边框颜色，可以为空，为空时不显示边框
         * @return Laya.Sprite 根节点
         */
        static Create(icondata: any, size?: number, showname?: boolean): any;
    }
}