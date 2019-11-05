import hw_common_platform from "./inner_platform/hw_common_platform";
import hw_common_config from "./inner_config/hw_common_config";
import hw_common_servertime from "./inner_servertime/hw_common_servertime";
import hw_common_mpsdk from "./inner_mpsdk/hw_common_mpsdk";
import hw_common_share from "./inner_share/hw_common_share";
import hw_common_serverdata from "./inner_serverdata/hw_common_serverdata";
import hw_common_event from "./inner_event/hw_common_event";
import hw_sound_wx from "./inner_sound/hw_sound_wx";
import hw_sound_web from "./inner_sound/hw_sound_web";
import hw_sound_interface from "./inner_sound/hw_sound_interface";

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
export default class hw_common {
    private static _platform: hw_common_platform;
    private static _config: hw_common_config;
    private static _sound: hw_sound_interface;
    private static _servertime: hw_common_servertime;
    private static _mpsdk: hw_common_mpsdk;
    private static _share: hw_common_share;
    private static _serverdata: hw_common_serverdata;
    private static _event: hw_common_event;

    /**
     * 好玩组件初始化
     * @param gameid 好玩平台游戏id,向运营或策划索要
     * @param gamepath 好玩平台游戏路径,向运营或策划索要
     * @param defaultshareimage 游戏默认分享图地址,向运营或策划索要
     * @param defaultsharetitle 游戏默认分享标题,向运营或策划索要
     */
    public static init(
        gameid: number,
        gamepath: string,
        defaultshareimage: string,
        defaultsharetitle: string
    ): void {
        this.config._init(gameid, gamepath, defaultshareimage, defaultsharetitle);
        this.serverdata._init();
        this.platform._init();
        this.share._init();
        this.mpsdk._init();
        this.servertime.init();
    }

    /**好玩通用组件-平台接口 */
    public static get platform(): hw_common_platform {
        if (this._platform == null) this._platform = new hw_common_platform();
        return this._platform;
    }

    /**好玩通用组件-运营配置 */
    public static get config(): hw_common_config {
        if (this._config == null) this._config = new hw_common_config();
        return this._config;
    }

    /**好玩通用组件-音效接口 */
    public static get sound(): hw_sound_interface {
        if (this._sound == null) {
            this._sound = Laya.Browser.onWeiXin ? new hw_sound_wx() : new hw_sound_web();
        }

        return this._sound;
    }

    /**好玩通用组件-服务器时间接口 */
    public static get servertime(): hw_common_servertime {
        if (this._servertime == null) this._servertime = new hw_common_servertime();
        return this._servertime;
    }

    /**好玩通用组件-mpsdk接口 */
    public static get mpsdk(): hw_common_mpsdk {
        if (this._mpsdk == null) this._mpsdk = new hw_common_mpsdk();
        return this._mpsdk;
    }

    /**好玩通用组件-服务器数据接口 */
    public static get serverdata(): hw_common_serverdata {
        if (this._serverdata == null) this._serverdata = new hw_common_serverdata();
        return this._serverdata;
    }

    /**好玩通用组件-分享接口 */
    public static get share(): hw_common_share {
        if (this._share == null) this._share = new hw_common_share();
        return this._share;
    }

    /**好玩通用组件-通用事件 */
    public static get event(): hw_common_event {
        if (this._event == null) this._event = new hw_common_event();
        return this._event;
    }
}