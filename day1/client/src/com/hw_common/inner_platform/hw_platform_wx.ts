import hw_common from "../hw_common";
import hw_platform_interface from "./hw_platform_interface";
import hw_platform_sharecanvas_wx from "./hw_platform_sharecanvas_wx";
import hw_common_def from "../hw_common_def";

/**
 * 微信平台
 * @author yahu
 */
export default class hw_platform_wx implements hw_platform_interface {

    private _sysInfo: any;
    private _userInfo: any;

    private _video: any;
    private _banner: any;
    private _interstitial: any;
    private _bannerShowed: boolean = false;

    private _videoOkFunc: Function;
    private _videoCloseFunc: Function;
    private _videoErrorFunc: Function;
    private _wxVideoCloseFunc: Function;
    private _wxVideoErrorFunc: Function;
    private _wxVideoLoadFunc: Function;

    private _interstitialCloseFunc: Function;
    private _interstitialErrorFunc: Function;
    private _interstitialLoadFunc: Function;

    private _shareCanvas: hw_platform_sharecanvas_wx;
    private _openDataContext: any;

    private _videoPreloadCNT: number = 1;
    private _netConnect: boolean = true;
    private _showInterstitialCnt: number = 0;

    /**网络是否连接 */
    public get netConnect(): boolean {
        return this._netConnect;
    }

    /**广告是否显示 */
    public get bannerShowed(): boolean {
        return this._bannerShowed;
    }

    /**平台用户信息 */
    public get userInfo(): any {
        return this._userInfo;
    }

    constructor() { }

    public Init(): void {
        this._sysInfo = wx.getSystemInfoSync();
        this._initUserInfo();
        this._initOnShow();
        this._initNetState();
        this._initShareCanvas();
        this._initShareMenu();
    }

    //注册
    private _initMemWarning(): void {

    }

    /**预加载视频 */
    public preloadVideoAd(): void {
        if (!wx.createRewardedVideoAd) { return; }
        if (this._video == null) {
            this._video = wx.createRewardedVideoAd({ adUnitId: hw_common.config.videoid });
        }
        this._video.load().then((e) => {
            trace('hw_platform_wx:preloadVideoAd->视频加载完成');
            this._video.offError();
        });
        this._video.onError(() => {
            console.warn('hw_platform_wx:preloadVideoAd->视频加载失败5秒后自动重复加载');
            if (this._videoPreloadCNT === 1) {
                Laya.timer.once(5000, this, () => {
                    this._videoPreloadCNT += 1;
                    this.preloadVideoAd();
                })
            }
        })
    }

    //初始化网络监听器
    private _initNetState(): void {
        wx.getNetworkType({
            success: (res) => {
                if (res.networkType == "none") {
                    this._netConnect = false;
                }
                else {
                    this._netConnect = true;
                }
                wx.onNetworkStatusChange((res) => {
                    if (res.isConnected == false || res.networkType == "none") {
                        this._netConnect = false;
                    }
                    else {
                        this._netConnect = true;
                    }
                })
            }
        });
    }

    //如果用户授权过,初始化用户信息
    private _initUserInfo(): void {
        wx.getUserInfo({
            withCredentials: true,
            lang: "zh_CN",
            complete: () => {
            },
            fail: () => {
            },
            success: (res) => {
                if (res.userInfo) {
                    this._userInfo = (res.userInfo);
                }

            }
        })
    }

    //初始化用户默认分享
    private _initShareMenu(): void {
        wx.updateShareMenu({
            withShareTicket: true,
            success: () => { },
            fail: () => { },
            complete: () => { },
        });
        //分享菜单
        wx.showShareMenu({
            withShareTicket: true,
            success: () => { },
            fail: () => { },
            complete: () => { },
        });
        wx.onShareAppMessage(() => {
            let shareurl: string = hw_common.config.defaultShareImage;
            let sharetitle: string = hw_common.config.defaultShareTitle;
            const info = mpsdk.Share.commonShare({ serial: 0, params: null, image: shareurl },
                null,
                null,
                this);
            if (shareurl) {
                info.imageUrl = shareurl;
                info.title = info.prefix + sharetitle;
            }
            hw_common.mpsdk.reportEvent(hw_common_def.REPORT_SHARE, "0", "0");
            return info;
        });


    }

    private _initShareCanvas(): void {
        this._shareCanvas = new hw_platform_sharecanvas_wx();
        this._openDataContext = wx.getOpenDataContext();
        this.postMessage({ command: "loadop" });
    }

    /////////////////////////////////////////////共享域
    public getShareBitmap(stoptime: number): Laya.Sprite {
        this._shareCanvas.stopTime = stoptime;
        return this._shareCanvas.shareSprite;
    }

    public postMessage(data: any): void {
        this._openDataContext.postMessage(data);
    }

    public setUserCloudStorage(kvlist: any): void {
        wx.setUserCloudStorage({
            KVDataList: kvlist,
            success: res => {
                trace('共享域数据存储成功', res);
            },
            fail: res => {
                trace('共享域数据存储失败', res);
            }
        })
    }

    public refreshBanner(): void {
        if (this._banner) {
            this._banner.destroy();
            this._banner = null;
        }
        this.showBannerAd(this._bannerShowed);
    }

    /**
     * 显示落地广告
     * @param isShow 是否显示
     */
    public showBannerAd(isShow: boolean): any {
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
            if (isShow == false) return;
        }

        trace("hw_platform_wx::showBannerAd->开始创建广告");
        let bannerID = hw_common.config.bannerid;
        hw_common.mpsdk.reportEvent(hw_common_def.REPORT_BANNERAD, bannerID + "", "0");
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
                this._banner.onResize((res) => {
                    if (res) {
                        let bannerHeight = res.height;
                        let bannerY = this._sysInfo.screenHeight - bannerHeight - 10;//-10是因为微信要求全面屏手机(ipx)需要下面留一点空隙
                        this._banner.style.top = bannerY;//下对齐
                    }
                })
                var errorfun = (res: any) => {
                    try {
                        if (this._banner) {
                            this._banner.destroy();
                            this._banner = null;
                        }
                    } catch (t) {
                        console.warn("hw_platform_wx::showBannerAd->销毁Banner错误:", JSON.stringify(t))
                    }
                    hw_common.mpsdk.reportEvent(hw_common_def.REPORT_BANNERAD, bannerID + "", "2");
                };
                var loadfun = (res: any) => {
                    trace("hw_platform_wx::showBannerAd->广告加载成功", this._bannerShowed);
                    if (this._bannerShowed == false) {
                        this._banner.hide();
                    }
                    hw_common.mpsdk.reportEvent(hw_common_def.REPORT_BANNERAD, bannerID + "", "1");
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
    }

    public getLaunchOptionsSync(): void {
        return wx.getLaunchOptionsSync();
    }

    public getSystemInfoSync(): any {
        return this._sysInfo;
    }

    public shareAppMessage(shareobj: any): any {
        wx.shareAppMessage(shareobj);
    }

    /**
     * 播放激烈视频
     * @param okfun 播放完成回调
     * @param closefun 主动关闭回调
     * @param errorfun 播放错误回调
     * @param param 
     */
    public showRewardedVideoAd(okfun: Function, closefun: Function, errorfun: Function, param: any): any {
        this._videoOkFunc = okfun;
        this._videoCloseFunc = closefun;
        this._videoErrorFunc = errorfun;

        if (this._video == null) {
            this._video = wx.createRewardedVideoAd({ adUnitId: hw_common.config.videoid });
        }
        if (this._video == null) {
            if (this._videoErrorFunc) {
                this._videoErrorFunc();
                this.restVideoCallBack();
            }
            return;
        }

        if (this._wxVideoCloseFunc) this._video.offClose(this._wxVideoCloseFunc);
        if (this._wxVideoErrorFunc) this._video.offError(this._wxVideoErrorFunc);
        if (this._wxVideoLoadFunc) this._video.offLoad(this._wxVideoLoadFunc);

        this._wxVideoCloseFunc = (res) => {
            if (this._sysInfo.SDKVersion >= "2.0.4" && res) {
                if (res.isEnded) {
                    if (this._videoOkFunc) {
                        this._videoOkFunc();
                    }
                }
                else {
                    if (this._videoCloseFunc) {
                        this._videoCloseFunc();
                    }
                }
            }
            else {
                if (this._videoErrorFunc) {
                    this._videoErrorFunc();
                }
            }
            this.restVideoCallBack();
            trace("hw_platform_wx::showRewardedVideoAd->视频看完：", res);
            this._video.offClose(this._wxVideoCloseFunc);
            this._video.load();
        }
        this._wxVideoErrorFunc = (res) => {
            if (this._videoErrorFunc) {
                this._videoErrorFunc();
                this.restVideoCallBack();
            }
            if (this._sysInfo.SDKVersion >= "2.0.4" && res) {
                console.error("hw_platform_wx::showRewardedVideoAd->视频加载错误信息：", res.errMsg, "错误码：", res.errCode);
            }
            this._video.offError(this._wxVideoErrorFunc);
            this._video.load();
        }
        this._wxVideoLoadFunc = (res) => {
            this._video.offLoad(this._wxVideoLoadFunc);
        }
        this._video.onClose((this._wxVideoCloseFunc));
        this._video.onError(this._wxVideoErrorFunc);
        this._video.onLoad(this._wxVideoLoadFunc);
        this._video.load().then(() => {
            this._video.show();
        })
    }

    /**
     * 重置激励视频回调函数
     */
    private restVideoCallBack(): void {
        this._videoErrorFunc = null;
        this._videoOkFunc = null;
        this._videoCloseFunc = null;

        this._wxVideoCloseFunc = null;
        this._wxVideoErrorFunc = null;
        this._wxVideoLoadFunc = null;
    }

    /**
     * 获取用户信息
     */
    public getUserInfo(): Promise<any> {
        return new Promise((resolve, reject) => {
            // 查看是否授权
            wx.getSetting({
                complete: () => { },
                fail: () => { reject(0); },
                success: (res) => {
                    if (res.authSetting['scope.userInfo']) {
                        // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                        wx.getUserInfo({
                            withCredentials: true,
                            lang: "zh_CN",
                            complete: () => { },
                            fail: () => { reject(0); },
                            success: (res) => {
                                if (res.userInfo) {
                                    this._userInfo = res.userInfo;
                                    resolve(res.userInfo);
                                }
                            }
                        })
                    } else {
                        let button = wx.createUserInfoButton({
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
                        })
                        button.onTap((res) => {
                            trace("hw_platform_wx::getUserInfo->用户授权:", res);
                            var userInfo = res.userInfo;
                            this._userInfo = userInfo;
                            button.destroy();
                            if (userInfo) {
                                resolve(userInfo);
                            }
                            else {
                                reject(0);
                            }
                        });
                    }
                }
            })
        })
    }

    /**
     * 初始化监听切换前后台
     */
    private _initOnShow(): void {
        wx.onShow((res) => {
            hw_common.event.event(hw_common_def.EVT_PLATFORM_ONSHOW, [res]);
        });

        wx.onHide((res) => {
            hw_common.event.event(hw_common_def.EVT_PLATFORM_ONHIDE, [res]);
        })
    }

    /**
     * 调用微信接口弹出选择框
     * @param content 提示内容
     * @param okfun 确认回调
     * @param showcancel 是否显示取消按钮
     * @param confirmText 确认按钮文字提示 最多 4 个字符
     * @param cancelText 取消按钮文字提示 最多 4 个字符
     * @param cancelfun 取消回调
     */
    public showModal(content: string, okfun: Function, showcancel: boolean = false, confirmText: string = "确定", cancelText: string = "取消", cancelfun?: Function): void {
        if (wx.showModal) wx.showModal({
            title: "提示",
            content: content,
            cancelText: cancelText,
            confirmText: confirmText,
            showCancel: showcancel,
            success: (res) => {
                if (res.confirm) {
                    if (okfun) okfun();
                } else if (res.cancel) {
                    if (cancelfun) cancelfun();
                }

            }
        })
    }

    /**
     * 调用微信接口弹出提示弹窗
     * @param content 提示的内容
     * @param args TO:https://developers.weixin.qq.com/minigame/dev/api/ui/interaction/wx.showToast.html
     * @param duration 弹窗持续时间
     */
    public showToast(content: string, args: any, duration: number = 2500): void {
        args.title = content;
        args.duration = duration;
        if (wx.showToast) wx.showToast(args);
    }

    public exitMiniProgram(any: any) {
        if (wx.exitMiniProgram) wx.exitMiniProgram(any);
    }

    public openCustomerServiceConversation(any) {
        if (wx.openCustomerServiceConversation) wx.openCustomerServiceConversation(any);
    }

    /**
     * 显示插屏广告
     */
    public showInterstitialAd(): void {
        try {
            if (!wx.createInterstitialAd) {
                console.warn("hw_platform_wx::showInterstitialAd->版本低,不显示插屏广告");
                return;
            }
            let config: number[] = hw_common.config.interstitialAdConfig;
            if (this._showInterstitialCnt++ % config[1] != 0) {
                console.warn("hw_platform_wx::showInterstitialAd->关卡间隔未到,不显示广告");
                return;
            }

            hw_common.mpsdk.reportEvent(hw_common_def.REPORT_INTERSTITIAL_SHOW);
            if (this._interstitial == null) {
                this._interstitial = wx.createInterstitialAd({ adUnitId: hw_common.config.interstitialAdId });
            }
            //这里是无用的判断，现在不能判断创建的视频组件是否正常，只能播放的时候判断报错 以后可能会有其他处理方法
            if (this._interstitial == null) {
                return;
            }

            if (this._interstitialCloseFunc) this._interstitial.offClose(this._interstitialCloseFunc);
            if (this._interstitialErrorFunc) this._interstitial.offError(this._interstitialErrorFunc);
            if (this._interstitialLoadFunc) this._interstitial.offLoad(this._interstitialLoadFunc);
            this._interstitialCloseFunc = () => {
                trace("hw_platform_wx::showInterstitialAd-> close");
                hw_common.mpsdk.reportEvent(hw_common_def.REPORT_INTERSTITIAL_CLOSE);
            }
            this._interstitialErrorFunc = (res) => {
                console.warn("hw_platform_wx::showInterstitialAd-> error", res)
                hw_common.mpsdk.reportEvent(hw_common_def.REPORT_INTERSTITIAL_ERROR, "" + res.errCode);
            }
            this._interstitialLoadFunc = (res) => {
                trace("hw_platform_wx::showInterstitialAd-> load", res)
            }

            this._interstitial.onLoad(this._interstitialLoadFunc);
            this._interstitial.onClose((this._interstitialCloseFunc));
            this._interstitial.onError(this._interstitialErrorFunc);
            this._interstitial.show().catch((err) => {
                hw_common.mpsdk.reportEvent(hw_common_def.REPORT_INTERSTITIAL_ERROR, err.errCode + "");
                trace("hw_platform_wx::showInterstitialAd-> error", err);
            })
        }
        catch (e) {
            trace("hw_platform_wx::showInterstitialAd-> 未知错误", e);
            hw_common.mpsdk.reportEvent(hw_common_def.REPORT_INTERSTITIAL_ERROR, "-1");
        }
    }

    /**
     * 短震动
     */
    public vibrateShort(): void {
        if (wx.vibrateShort) wx.vibrateShort({});
    }

    /**
     * 长震动
     */
    public vibrateLong(): void {
        if (wx.vibrateLong) wx.vibrateLong({});
    }

    /**
     * 显示微信加载借口（只会显示加载图标或图标+文字）
     * @param title 提示
     * @param mask 底部是否添加遮罩
     */
    public showLoading(title: string, mask: boolean): void {
        if (wx.showLoading) wx.showLoading({ title: title, mask: mask })
    }

    /**
     * 隐藏加载
     */
    public hideLoading(): void {
        if (wx.hideLoading) wx.hideLoading();
    }

    /**
     * 消息订阅
     */
    public requestSubscribeMessage(tmplIds: string[], success: Function = null, fail: Function = null, complete: Function = null) {
        if (wx.getSystemInfoSync().SDKVersion < "2.8.2" || !wx.requestSubscribeMessage) {
            trace("微信版本低,不支持订阅功能")
            return;
        }
        wx.requestSubscribeMessage({
            tmplIds: tmplIds,
            success: success,
            fail: fail,
            complete: complete
        });
    }
}