/** 
 * 区分平台的全局配置
 * web下使用WebPlatformConfig
 * 微信下使用微信工程中的PlatformConfig
 * 好处是不用编译打包,某些参数可以直接在微信工程中改
 * 
 */
declare interface Platform {
    debug: boolean;
    version: string;
    cdnURL: string;
    bannerId: string;
    videoId: string;
    interstitialAdId: string;
}
declare let platform: Platform;
declare interface Window {
    platform: Platform
}





