import hw_platform_interface from "./hw_platform_interface";
/*
* 网页
*/
export default class hw_platform_web implements hw_platform_interface {
    public netConnect: boolean = true;
    public bannerShowed: boolean = false;
    public userInfo: any;
    private _shareBitmap: Laya.Sprite;
    public Init(): void {
        this._shareBitmap = new Laya.Sprite();
    }
    public preloadVideoAd(): void { }
    public getShareBitmap(): Laya.Sprite {
        return this._shareBitmap;
    }
    public postMessage(data: any): void {
    }
    public setUserCloudStorage(kvlist: any): void {
    }
    public showBannerAd(isShow: boolean = false): void {
        trace("hw_platform_web::showBannerAd->创建广告");
    }
    public getLaunchOptionsSync(): any {
        trace("hw_platform_web::getLaunchOptionsSync->获取登陆信息");
        return {};
    }
    public shareAppMessage(obj: any, success: Function = null): any {
        trace("hw_platform_web::shareAppMessage->分享,shareObj", obj);
        if (success) {
            success();
        }
    }
    public showRewardedVideoAd(okfun: Function, closefun: Function, errorfun: Function): any {
        trace("hw_platform_web::createRewardedVideoAd->创建视频广告,id");
        if (okfun) okfun();
    }
    public getSystemInfoSync() {
        trace("hw_platform_web::getSystemInfoSync->获取信息");
        return {};
    }
    public onShow(callback: Function): void {
        callback();
    }
    public showModal(content: string, okfun?: Function, showcancel: boolean = false, confirmText: string = "确定", cancelText: string = "取消", cancelfun?: Function) {
        trace("hw_platform_web::showModal" + content);
        if (okfun) {
            okfun()
        }
    }
    public showToast(content, args): void {
        trace("hw_platform_web::showToast" + content);
    }
    public exitMiniProgram(any) {
        trace("hw_platform_web::exitMiniProgram");
    }
    public getUserInfo(): Promise<any> {
        return new Promise(() => { });
    }
    public openCustomerServiceConversation(any) {
        trace("hw_platform_web::openCustomerServiceConversation客服");
    }
    public showInterstitialAd(isCreate?: boolean) {
        trace("hw_platform_web::showInterstitialAd->显示插屏广告");
    }
    public vibrateShort(): void {
    }
    public vibrateLong(): void {
    }
    public refreshBanner(): void {
    }
    public showLoading(): void {
    }
    public hideLoading(): void {
    }
    public requestSubscribeMessage(): void {
    }
}