var WxgamePlatform = /** @class */ (function() {
  function WxgamePlatform() {
    this.debug = true;
    this.version = "1.2.1";
    this.cdnURL ="https://cdn-xyx.raink.com.cn/bszdk/wx/v8/rescdn/";
    this.bannerId = "adunit-56b9d6c3a611597e";
    this.videoId = "adunit-db074096c63d6f91";
    this.interstitialAdId = "adunit-27246cb2e681e736";
  }
  return WxgamePlatform;
}());
window.platform = new WxgamePlatform();