import hw_platform_interface from "./hw_platform_interface";
import hw_platform_wx from "./hw_platform_wx";
import hw_platform_web from "./hw_platform_web";
import hw_common from "../hw_common";
import hw_common_def from "../hw_common_def";

/**
 * 运行平台相关接口
 * @author yahu
 * @version 0.0.1 修改为通用模板
 */
export default class hw_common_platform {
    private _platform: hw_platform_interface;
    private _shareTime: number;//开始分享的时间戳
    private _phoneMarginTop: number = -1;//刘海屏高度缓存
    private _shareSuccessCallBack: Function;//分享成功回调
    private _shareFailCallBack: Function;//分享失败回调
    private _shareFailCNT: number = -1;//分享失败次数,-1表示未开启,用于第一次分享必定失败,>=0按照配置计数
    private _loginSceneId: number = 0;//登陆场景值
    private _isHotStart = false; //是否是热启动
    private _tryPlayCallBack: Function = null;//试玩其他游戏的回调
    /**
     * 获取平台用户信息
     * @see https://developers.weixin.qq.com/minigame/dev/api/open-api/user-info/UserInfo.html
     */
    public get userInfo(): { avatarUrl: string, nickName: string, gender: number, province: string, city: string } {
        return this._platform.userInfo;
    }
    /**网络是否正常连接 */
    public get netConnect(): boolean {
        return this._platform.netConnect;
    }
    /**广告是否显示状态 */
    public get bannerShowed(): boolean {
        return this._platform.bannerShowed;
    }
    /**是否web开发平台 */
    public get isweb(): boolean {
        return this._platform instanceof hw_platform_web;
    }
    /**是否微信小游戏 */
    public get iswxgame(): boolean {
        return window["wx"] != undefined && window["wx"]["getSystemInfo"] != undefined;
    }
    /**
	 * 获取刘海屏高度
     * 非刘海屏返回0,
     * 刘海屏返回刘海屏高度(pixel)
	 */
    public get phoneMarginTop(): number {
        if (this._phoneMarginTop >= 0) {
            return this._phoneMarginTop;
        }
        try {
            let sysinfo = hw_common.platform.getSystemInfoSync();
            if (sysinfo == null) return 0;
            let screenW: number = sysinfo.screenWidth;
            let screenH: number = sysinfo.screenHeight;
            if (!sysinfo.statusBarHeight) {
                this._phoneMarginTop = 0;
                return 0;
            }
            let ratio = screenH / screenW;//长宽比
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
            trace("hw_common_platform::phoneMarginTop->", "获取系统信息失败")
            return 0;
        }
    }

    /**
     * @inner 初始化
     */
    public _init(): void {
        if (hw_common.platform.iswxgame) {
            this._platform = new hw_platform_wx();
        }
        else {
            this._platform = new hw_platform_web();
        }
        this._platform.Init();
        hw_common.event.on(hw_common_def.EVT_MPSDK_ACCOUNT_OK, this, this._onAccount);
        hw_common.event.on(hw_common_def.EVT_PLATFORM_ONSHOW, this, this._onShowGame);
    }

    private _onAccount(): void {
        this._platform.preloadVideoAd();
    }

    /**
     * 获取数据域的显示图像
     * @param stoptime 经过stoptime时间后图像保持静止不刷新,提高性能 默认0是一直刷新
     * @returns 返回一个Sprite,可以添加在显示列表的任意位置
     */
    public getShareSprite(stoptime: number = 0): Laya.Sprite {
        return this._platform.getShareBitmap(stoptime);
    }

    /**
     * 向共享域发送消息
     * @param obj @example { command: "openrank", value: "friend", top: this._ranY }
     */
    public postMessage(obj: any): void {
        return this._platform.postMessage(obj);
    }

    /**
     * 存储共享域使用的排行数据
     * @param kvobj @example [{ key: DataDef.CloudStorage_BestScore, value: this._data.levelData.level + "" }]
     */
    public setUserCloudStorage(kvobj: any[]): void {
        this._platform.setUserCloudStorage(kvobj);
    }

    /**刷新广告内容 */
    public refreshBanner(): void {
        this._platform.refreshBanner();
    }

    /**
     * 显示或隐藏banner广告
     * @param show true:显示广告 close:关闭广告
     */
    public showBannerAd(show: boolean): void {
        this._platform.showBannerAd(show);
    }

    /**
     * 获取登陆参数
     * @returns 登陆参数 @see https://developers.weixin.qq.com/minigame/dev/api/base/app/life-cycle/wx.getLaunchOptionsSync.html
     */
    public getLaunchOptionsSync(): any {
        let obj: any = this._platform.getLaunchOptionsSync();
        trace("hw_platform::getLaunchOptionsSync->获取登陆参数:", obj);
        return obj;
    }

    /**
     * 获取设备信息
     * @returns 设备信息列表 @see https://developers.weixin.qq.com/minigame/dev/api/base/system/system-info/wx.getSystemInfoSync.html
     */
    public getSystemInfoSync(): any {
        let obj: any = this._platform.getSystemInfoSync();
        trace("hw_platform::getSystemInfoSync->获取平台信息:", obj);
        return obj;
    }

    /**
     * 不推荐使用该接口,推荐使用hw_common.share里面的shareGet接口
     * 获取平台分享数据并拉起分享
     * @param shareid 跟策划或运营约定的分享id
     * @param arg 分享参数
     * @param success 分享成功回调
     * @param fail 分享失败回调
     * @param customobj 自定义分享方法,比如自己画图分享等 @example { mothed: Function, sharefunparam?: any } mothed:自定义分享方法,param:自定义分享参数
     */
    public _share(shareid: number, arg: any = null, success: Function = null, fail: Function = null, customobj?: { mothed: Function, thisarg: any, args?: Array<any> }): void {
        this._shareTime = Date.now();
        if (success) {
            this._shareSuccessCallBack = () => {
                if (success) success();
            }
        }
        if (fail) {
            this._shareFailCallBack = () => {
                if (fail) fail();
            }
        }
        if (customobj) {
            return customobj.mothed.apply(customobj.thisarg, customobj.args);
        }
        const info = mpsdk.Share.commonShare({ serial: shareid, params: arg, version: platform.version },
            null,
            () => {
                if (this._shareFailCallBack) {
                    if (!this.isweb) this._shareFailCallBack();
                    this._shareFailCallBack = null;
                    this._shareSuccessCallBack = null;
                }
            },
            this);
        this._platform.shareAppMessage(
            info,
            success
        );
    }

    //这是一个动态生成分享图的例子:底图+文字
    private newfun(chengyu: string, pingyin: string): void {
        let canvas = wx.createCanvas();
        let context = canvas.getContext("2d");
        let image = wx.createImage();
        context.clearRect(0, 0, 400, 320);
        image.onload = () => {
            context.drawImage(image, 0, 0);
            context.font = "bold 55px SimSun";
            context.fillStyle = "#dd3e3e";
            context.textAlign = "center";
            context.textBaseline = "top";
            for (let u = chengyu.length, s = 0; s < u; ++s) {
                context.strokeText(chengyu[s], 65 + 80 * s, 145);
                context.fillText(chengyu[s], 65 + 80 * s, 145);
            }
            context.font = "bold 30px SimSun";
            context.fillStyle = "#000000";
            let plist = pingyin.split(" ");
            for (let u = plist.length, s = 0; s < u; ++s) {
                context.fillText(plist[s], 65 + 80 * s, 90);
            }
            let url = canvas.toTempFilePathSync({
                x: 0,
                y: 0,
                width: 400,
                height: 320,
                destWidth: 400,
                destHeight: 320
            });
            const info = mpsdk.Share.commonShare({ serial: 0, params: null, image: url },
                null,
                null,
                this);
            if (url) {
                info.imageUrl = url;
                info.title = "@你 又会了一个新成语，来看看你会几个！"
            }
            this._platform.shareAppMessage(
                info,
            );
        }
        image.src = "res/assets/other/shareBg.png";
    }

    /**
     * 主动拉起分享界面
     * @param shareObj mpsdk.Share.commonShare接口返回的分享数据
     * @param successfun 分享成功方法,已经被微信作废
     */
    public shareAppMessage(shareInfo: any, successfun?: Function): void {
        this._platform.shareAppMessage(shareInfo, successfun)
    }

    //检测分享是否成功
    private _checkShareSuccess(show2: boolean): boolean {
        let successtime: number = show2 ? hw_common.config.sharetime_success_android : hw_common.config.sharetime_success;
        if (Date.now() - this._shareTime < successtime) {
            //时间没有到n秒，不算成功
            trace("hw_platform::checkShareSuccess->时间没有达到失败");
            return false;
        }
        if (hw_common.config.first_sharefail) {
            if (this._shareFailCNT < 0) {
                trace("hw_platform::checkShareSuccess->第一次分享失败")
                this._shareFailCNT = 0;
                return false;
            }
        }
        let sharefail_chance: number = show2 ? hw_common.config.sharefail_chance_android : hw_common.config.sharefail_chance;
        if (Math.random() <= sharefail_chance) {
            this._shareFailCNT++;
            trace("hw_platform::checkShareSuccess->概率失败")
            return false;
        }
        trace("hw_platform::checkShareSuccess->分享成功");
        this._shareFailCNT = 0;
        return true;
    }

    /**
     * 不推荐使用该接口,推荐使用hw_common.share里面的videoGet接口
     * 观看视频,微信没有提供作用域,请用箭头函数或bind指定作用域
     * @param okfun 视频观看成功
     * @param closefun 提前关闭视频
     * @param errorfun 视频观看异常
     * @param param 附加参数,暂无作用
     */
    public _showVideo(okfun: Function, closefun: Function, errorfun: Function, param?: any): void {
        this._platform.showRewardedVideoAd(okfun, closefun, errorfun, param);
    }

    /**
     * 判断是否从某场景值进入游戏
     * @param sceneid 微信后台的场景值列表 @see https://developers.weixin.qq.com/minigame/dev/reference/scene-list.html
     */
    public ShowInBy(wxsceneid: number): boolean {
        let sceneid: number = 0;
        let loginobj: any = this.getLaunchOptionsSync();
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
    }

    /**
     * 小游戏进入前台时的处理
     * @inner 内部使用,外部不要调用
     * @param res 平台切入前台的参数
     */
    public _onShowGame(res: any): void {
        trace("hw_common_platform::_OnShowGame 小游戏回到前台", res);
        if (res.scene) this._loginSceneId = res.scene;//设置场景值
        if (!this._isHotStart) this._isHotStart = true;//第二次就标记为热启动
        //需要延时处理的
        Laya.timer.once(100, this, () => {
            this._onShowShare();
        });
        hw_common.mpsdk.reportEvent(hw_common_def.REPORT_ONSHOW, this._loginSceneId + "")
    }

    //切到前台判断分享
    private _onShowShare(): void {
        if (this._shareSuccessCallBack) {
            mpsdk.Share.checkValidShare()
                .then((success: boolean) => {
                    if (success) {
                        if (this._checkShareSuccess(true)) {
                            trace("hw_common_platform::onShowShare->分享成功");
                            if (this._shareSuccessCallBack) this._shareSuccessCallBack();
                        }
                        else {
                            trace("hw_common_platform::onShowShare->分享失败1");
                            hw_common.share.shareFailType = 2;
                            if (this._shareFailCallBack) this._shareFailCallBack();
                        }
                    }
                    else {
                        trace("hw_common_platform::onShowShare->分享失败2");
                        hw_common.share.shareFailType = 1;
                        if (this._shareFailCallBack) this._shareFailCallBack();
                    }
                    this._shareSuccessCallBack = null;
                    this._shareFailCallBack = null;
                }).catch(() => {
                    if (this._checkShareSuccess(false)) {
                        trace("hw_common_platform::onShowShare->catch分享成功");
                        if (this._shareSuccessCallBack) this._shareSuccessCallBack();
                    }
                    else {
                        hw_common.share.shareFailType = 0;
                        trace("hw_common_platform::onShowShare->catch分享失败");
                        if (this._shareFailCallBack) this._shareFailCallBack();
                    }
                    this._shareSuccessCallBack = null;
                    this._shareFailCallBack = null;
                })
        }

    }

    //切到前台,判断游戏试玩
    private _onShowTryPlay(): void {
        //试玩回调
        Laya.timer.once(500, this, () => {
            if (this._tryPlayCallBack) {
                this._tryPlayCallBack();
                this._tryPlayCallBack = null;
            }
        });
    }

    /**
     * 微信模态提示框
     * @param content 提示内容 
     * @param okfun 确定回调
     * @param showcancel 是否显示取消按钮
     * @param confirmText 确定按钮文字
     * @param cancelText 取消按钮文字
     * @param cancelfun 取消回调
     */
    public showModal(content: string, okfun: Function = null, showcancel: boolean = false, confirmText: string = "确定", cancelText: string = "取消", cancelfun: Function = null): any {
        this._platform.showModal(content, okfun, showcancel, confirmText, cancelText, cancelfun);
    }

    /**
     * 平台浮动提示 
     * @param content 
     * @param args https://developers.weixin.qq.com/minigame/dev/api/ui/interaction/wx.showToast.html
     */
    public showToast(content: string, args: any = { icon: "none" }): any {
        if (content == null || content == "") {
            return;
        }
        this._platform.showToast(content, args);
    }

    /**主动退出游戏*/
    public exitMiniProgram(): void {
        trace("hw_platform::exitMiniProgram->主动退出游戏");
        this._platform.exitMiniProgram({
            success: null,
            fail: null,
            complete: null
        });
    }

    /**
     * 获取用户授权,没有授权的会在全屏放置一个透明按钮,点击任意位置弹出授权
     * @returns 用户信息Promise
     */
    public getUserInfo(): Promise<any> {
        return this._platform.getUserInfo();
    }

    /**
     * 跳转到客服对话
     * @param obj @see https://developers.weixin.qq.com/minigame/dev/api/open-api/customer-message/wx.openCustomerServiceConversation.html
     */
    public openCustomerServiceConversation(obj: any) {
        this._platform.openCustomerServiceConversation(obj)
    }

    /**
     * 现实加载框
     * @param title 显示文字
     * @param mask 是否遮罩
     */
    public showLoading(title: string = "加载中", mask: boolean = true) {
        this._platform.showLoading(title, mask)
    }

    /**隐藏平台loading*/
    public hideLoading(): void {
        this._platform.hideLoading();
    }

    /**显示插屏广告 */
    public showInterstitialAd(): void {
        this._platform.showInterstitialAd();
    }

    /**短震动*/
    public vibrateShort(): void {
        this._platform.vibrateShort();
    }

    /**长震动*/
    public vibrateLong(): void {
        this._platform.vibrateLong();
    }

    /**
     * 消息订阅
     */
    public RequestSubscribeMessage(tmplIds: string[], success: Function = null, fail: Function = null, complete: Function = null) {
        this._platform.requestSubscribeMessage(tmplIds, success, fail, complete);
    }
}