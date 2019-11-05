/**平台方法接口 */
export default interface hw_platform_interface {
    netConnect: boolean;
    bannerShowed: boolean;
    userInfo: any;
    Init(): void;
    preloadVideoAd(): void;
    getLaunchOptionsSync(): any;
    shareAppMessage(obj: any, successfun?: Function): Promise<any>;
    getSystemInfoSync();
    showModal(content: string, okfun?: Function, showcancel?: boolean, confirmText?: string, cancelText?: string, cancelfun?: Function);
    showToast(content, args);
    exitMiniProgram(any: any);
    showRewardedVideoAd(okfun: Function, closefun: Function, errorfun: Function, param?: any): any;
    showBannerAd(isShow: boolean): void;
    showInterstitialAd();
    getShareBitmap(stoptime: number): Laya.Sprite;
    postMessage(any: any): void;
    setUserCloudStorage(kvlist: any): void;
    getUserInfo(): Promise<any>;
    openCustomerServiceConversation(any: any): void;
    vibrateShort(): void;
    vibrateLong(): void;
    refreshBanner(): void;
    showLoading(title: string, mask: boolean): void;
    hideLoading(): void;
    requestSubscribeMessage(tmplIds: string[], success: Function, fail: Function, complete: Function): void
}