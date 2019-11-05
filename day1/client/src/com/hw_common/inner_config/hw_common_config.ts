import hw_common from "../hw_common";
import MathUtils from "../../hw_utils/MathUtils";
import hw_common_def from "../hw_common_def";
import hw_common_platform from "../inner_platform/hw_common_platform";
import TimeUtils from "../../hw_utils/TimeUtils";

/**
 * hw运营平台配置,
 * @author yahu 
 * 为了防止断网状态,所有平台配置相关的参数均需要和策划约定一个默认值
 * 配置尽量做到所有游戏能通用,非通用的配置不要写到这个类里
 */
export default class hw_common_config {

	private _gameid: number = 0;
	private _gamePath: string = "";
	private _defaultShareImage: string = "";
	private _defaultShareTitle: string = "";
	private _platformConfig: any;

	/**游戏默认分享文字,向运营或策划索要*/
	public get defaultShareTitle(): string {
		return this._defaultShareTitle;
	}

	/**游戏默认分享图,向运营或策划索要*/
	public get defaultShareImage(): string {
		return this._defaultShareImage;
	}

	/**好玩平台游戏配置,向运营或策划索要*/
	public get gamePath(): string {
		return this._gamePath;
	}

	/**好玩平台游戏配置,向运营或策划索要*/
	public get gameid(): number {
		return this._gameid;
	}

	/**运营平台后台配置,所有游戏开关信息 */
	public get platformConfig(): any {
		return this._platformConfig;
	}
	public _setPlatformConfig(data: any): void {
		this._platformConfig = data;
		hw_common.event.event(hw_common_def.EVT_MPSDK_PLATFORMCONFIG_OK, data);
	}

	/**
	 * @inner 内部调用
	 * @param gameid 
	 * @param gamepath 
	 * @param defaultshareimage 
	 * @param defaultsharetitle 
	 */
	public _init(gameid: number, gamepath: string, defaultshareimage: string, defaultsharetitle: string): void {
		this._gameid = gameid;
		this._gamePath = gamepath;
		this._defaultShareImage = defaultshareimage;
		this._defaultShareTitle = defaultsharetitle;
		hw_common.event.on(hw_common_def.EVT_MPSDK_PLATFORMCONFIG_OK, this, this._onPlatformConfigGet);
	}

	//加载到运营平台配置
	private _onPlatformConfigGet(config: any): void {
		this._platformConfig = config;
	}

	/**
	 * 是否非审核的安全状态
	 * false:审核时屏蔽所有违规功能
	 * true:非审核状态,安全期
	 */
	public get safe(): boolean {
		trace("hw_common_config::safe->开始检测敏感信息");
		if (hw_common.platform.iswxgame == false) {
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
		} else if (this._platformConfig.level == '1') {
			//开放部分敏感功能 中级限制保护 = 中等开放程度
			trace("hw_common_config::safe->开放部分敏感功能");
			return false;
		} else if (this._platformConfig.level == '2') {
			//可全开敏感功能 低级限制保护 = 完全开放程度
			trace("hw_common_config::safe->可全开敏感功能");
			return true;
		}
		else {
			trace("hw_common_config::safe->其他情况");
			return false;
		}
	}

	/**是否可以强裂变*/
	public get isStrongFission(): boolean {
		let istrong: boolean = mpsdk.Hack.isStrongFission();
		trace("hw_common_config::safe->判断是否强烈变用户", istrong);
		return istrong;
	}

	/**广告刷新次数 */
	public get AdChange(): number {
		let num = 2;
		if (this._platformConfig && this._platformConfig.AdChange) {
			num = +this._platformConfig.AdChange;
		}

		if (!num || num <= 0) {
			return 2;
		}
		return num;
	}

	/**客服奖励_精力个数*/
	public get csrewards_energy(): number {
		let num: number = 0;
		if (this._platformConfig && this._platformConfig.csrewards_energy) {
			num = +this._platformConfig.csrewards_energy;
		}
		return num;
	}

	private _getSharePointJson(str: string): void {
		if (str == null || str == "") {
			return null;
		}
		str = str.replace(/\s*/g, "");
		let alist: string[] = str.split("<");
		let obj: any = {};
		try {
			for (let i of alist) {
				let blist: string[] = i.split(">");
				let key: string = blist[0];
				let value: string = blist[1];
				obj[key] = value;
			}
			return obj;
		} catch (error) {
			return null;
		}
	}
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
	public getSharePointFromList(key: string): number[] {
		if (!key) key = "default";
		let jsonstr_default: string = 'inactive>101|102:140,101|102:60<default>101|102<';
		let jsonstr: string = jsonstr_default;
		let jsonobj: any;
		let spstr: string;
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

		let createTimeInterval = 5;
		let lastShareTimeInterval = 300;
		let onedayms: number = 24 * 3600 * 1000;
		let nowTime = hw_common.servertime.now;
		if (this._platformConfig && this._platformConfig.createTimeInterval) {
			createTimeInterval = +this._platformConfig.createTimeInterval;
		}
		if (this._platformConfig && this._platformConfig.lastShareTimeInterval) {
			lastShareTimeInterval = +this._platformConfig.lastShareTimeInterval;
		}
		if (createTimeInterval && lastShareTimeInterval &&
			hw_common.mpsdk.account && hw_common.mpsdk.account.createTime) {
			if (hw_common.servertime.loginTime - hw_common.mpsdk.account.createTime > createTimeInterval * onedayms &&
				hw_common.servertime.loginTime - hw_common.share.lastTrueShareTime > lastShareTimeInterval * onedayms) {
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
			let value: string = MathUtils.getRDFromStr_1(spstr);
			trace("hw_common_config::getSharePointFromList->随机到字符串:", value);
			if (value) {
				let list: string[] = value.split("|");
				let nlist: number[] = [];
				for (let i: number = 0; i < list.length; i++) {
					nlist[i] = +list[i];
				}
				return nlist;
			}
		}
		console.error("hw_common_config::getSharePointFromList->未知错误默认返回视频:", spstr);
		return [201];
	}

	/**
	 * 获取sharepoint推进类型
	 * @returns 0 普通推进: 分享成功,视频成功后推进 
	 * @returns 1 优先视频: 分享成功,失败,视频失败后推进,视频成功不推进
	 */
	public get sharepoint_advancetype(): number {
		let advtype: number = 0;
		if (this._platformConfig && this._platformConfig.sharepoint_advancetype) {
			advtype = +this._platformConfig.sharepoint_advancetype;
		}
		return advtype;
	}

	/**
	 * 不显示的appid
	 * @returns [,,,]
	 */
	public get NotShowAppId(): string[] {
		let disable = "";
		if (this._platformConfig && this._platformConfig.NotShowAppId) {
			disable = this._platformConfig.NotShowAppId;
		}
		var d1: string[] = disable.split(",");
		return d1;
	}

	/** 猜你喜欢和banner的显示切换*/
	public get Adshow(): boolean {
		let show = 1;
		if (this._platformConfig && this._platformConfig.Adshow) {
			show = +this._platformConfig.Adshow;
		}
		return show == 1;
	}

	private _getAdFromList(type: string): string {
		let t1: number = hw_common.mpsdk.account.createTime;
		let t2: number = hw_common.servertime.now;
		let day: number = TimeUtils.GetDayCntFromTime2(t1, t2) + 1;
		let flag: string = type;
		console.log("hw_common_config::_getAdFromList->创建时间:", t1, "系统时间:", t2);
		if (hw_common_def.LTV_TEST_LIST[flag][flag + "_" + day]) {
			console.log("hw_common_config::_getAdFromList->获取广告id",
				" type: ", flag,
				" day: ", day,
				" id: ", hw_common_def.LTV_TEST_LIST[flag][flag + "_" + day]
			)
			return hw_common_def.LTV_TEST_LIST[flag][flag + "_" + day];
		}
		else {
			console.log("hw_common_config::_getAdFromList->获取广告id",
				" type: ", flag,
				" day: ", day,
				" id: ", hw_common_def.LTV_TEST_LIST[flag][flag + "_" + 15]
			)
			return hw_common_def.LTV_TEST_LIST[flag][flag + "_" + 15]
		}
	}
	/**服务器配置的bannerid */
	public get bannerid(): string {
		if (hw_common_def.LTV_TEST) {
			return this._getAdFromList("banner");
		}
		else {
			if (this._platformConfig && this._platformConfig.bannerid) {
				trace("hw_common_config::BannerId->获取服务器bannerid成功:", this._platformConfig.bannerid)
				return this._platformConfig.bannerid;
			}
			trace("hw_common_config::BannerId->获取服务器bannerid失败");
			return platform.bannerId;
		}
	}

	/**服务器配置的videoid */
	public get videoid(): string {
		if (hw_common_def.LTV_TEST) {
			return this._getAdFromList("video");
		}
		else {
			if (this._platformConfig && this._platformConfig.videoid) {
				trace("hw_common_config::BannerId->获取服务器videoid成功:", this._platformConfig.videoid)
				return this._platformConfig.videoid;
			}
			trace("hw_common_config::BannerId->获取服务器videoid失败");
			return platform.videoId;
		}
	}

	/**服务器配置的interstitialAdId */
	public get interstitialAdId(): string {
		if (hw_common_def.LTV_TEST) {
			return this._getAdFromList("chaping");
		}
		else {
			if (this._platformConfig && this._platformConfig.interstitialAdId) {
				trace("hw_common_config::interstitialAdId->获取服务器InterstitialAdId成功:", this._platformConfig.interstitialAdId)
				return this._platformConfig.interstitialAdId;
			}
			trace("hw_common_config::interstitialAdId->获取服务器InterstitialAdId失败");
			return platform.interstitialAdId;
		}
	}

	/**
	 * 强制分享开关
	 * 1:分享失败系统弹窗不显示取消按钮,只有确定按钮
	 * 0:分享失败系统弹窗显示取消按钮
	 * @returns 
	 */
	public get sharemode(): number {
		if (this._platformConfig && this._platformConfig.sharemode) {
			return +this._platformConfig.sharemode;
		}
		return 1;
	}

	/**
	 * 关视频后的提示
	 * 1:开启后弹出系统确认框,点击确定继续拉视频和取消
	 * 0:不开启是浮动tips显示文字
	 * @returns 
	 */
	public get videomode(): number {
		if (this._platformConfig && this._platformConfig.videomode) {
			return +this._platformConfig.videomode;
		}
		return 0;
	}

	/** 是否强制分享:不成功一直弹提示框*/
	public get forceShare(): boolean {
		try {
			if (this.sharemode != 1) {
				trace("hw_common_config::forceShare->强制分享成功功能:后台开关关闭")
				return false;
			}
			if (this.shareLimitByCity) {
				trace("hw_common_config::forceShare->强制分享成功功能:因为城市限制关闭")
				return false;
			}
			let timestr = "";
			if (this._platformConfig && this._platformConfig.sharemodetime) {
				timestr = this._platformConfig.sharemodetime;
			}
			let timeArr: string[] = timestr.split(",");
			let timeArr2: string[][] = [];
			for (let i of timeArr) {
				if (i == null || i == "") {
					continue;
				}
				let arr = i.split("_");
				if (arr.length == 2) {
					timeArr2.push(arr);
				}
			}
			let curTime = hw_common.servertime.now;
			let hour: number = new Date(curTime).getHours();
			for (let i of timeArr2) {
				if (+i[0] <= hour && hour <= +i[1]) {
					trace("hw_common_config::forceShare->强制分享成功功能:因时间关闭")
					return false;
				}
			}
			trace("hw_common_config::forceShare->强制分享成功功能：返回true")
			return true;
		}
		catch (e) {
			trace("hw_common_config::forceShare->强制分享成功功能:报错", e)
			return false;
		}
	}

	/** 调起分享的时间限制 */
	public get sharetime_success(): number {
		let sharetime_success: number = 3000;
		if (this._platformConfig && this._platformConfig.sharetime_success) {
			sharetime_success = +this._platformConfig.sharetime_success;
		}
		return sharetime_success;
	}

	/** 调起分享的时间限制android版本 */
	public get sharetime_success_android(): number {
		let sharetime_success_android: number = this.sharetime_success;
		if (this._platformConfig && this._platformConfig.sharetime_success_android) {
			sharetime_success_android = +this._platformConfig.sharetime_success_android;
		}
		return sharetime_success_android;
	}

	/** 分享失败的概率*/
	public get sharefail_chance(): number {
		let sharefail_chance: number = 0.3;
		if (this._platformConfig && this._platformConfig.sharefail_chance) {
			sharefail_chance = +this._platformConfig.sharefail_chance;
		}
		return sharefail_chance;
	}
	/** 分享失败的概率android版本*/
	public get sharefail_chance_android(): number {
		let sharefail_chance_android: number = this.sharefail_chance;
		if (this._platformConfig && this._platformConfig.sharefail_chance_android) {
			sharefail_chance_android = +this._platformConfig.sharefail_chance_android;
		}
		return sharefail_chance_android;
	}

	/** 后台控制第一次分享是否会失败*/
	public get first_sharefail(): boolean {
		let first_sharefail: number = 1;
		if (this._platformConfig && this._platformConfig.first_sharefail) {
			first_sharefail = +this._platformConfig.first_sharefail;
		}
		return first_sharefail == 1;
	}

	/** 后台配分享失败提示语 */
	public get shareFailToastTips(): string {
		let shareFailToastTips: string = "";
		if (this.safe && this.isStrongFission) {
			if (this._platformConfig && this._platformConfig.shareFailToastTips) {
				shareFailToastTips = this._platformConfig.shareFailToastTips;
				if (shareFailToastTips) {
					let value: string = MathUtils.getRDFromStr_1(shareFailToastTips);
					trace("hw_common_config::shareFailToastTips->随机到字符串:", value);
					return value;
				}
			}
			shareFailToastTips = "分享失败，请分享到不同群";
		}
		return shareFailToastTips;
	}

	/**
	 * 后台配强制分享失败微信提示框提示语
	 */
	public get shareFailModalTips(): string {
		let shareFailModalTips: string = "";
		if (this._platformConfig && this._platformConfig.shareFailModalTips) {
			shareFailModalTips = this._platformConfig.shareFailModalTips;
			if (shareFailModalTips) {
				let value: string = MathUtils.getRDFromStr_1(shareFailModalTips);
				trace("hw_common_config::shareFailModalTips->随机到字符串:", value);
				return value;
			}
		}
		return "分享失败,请重新尝试";
	}

	/**
	 * 后台配强制分享失败微信提示框提示语android版本
	 */
	public get sharefail_modaltips_android(): string {
		let sharefail_modaltips_android: string = "";
		if (this._platformConfig && this._platformConfig.sharefail_modaltips_android) {
			sharefail_modaltips_android = this._platformConfig.sharefail_modaltips_android;
			if (sharefail_modaltips_android) {
				let value: string = MathUtils.getRDFromStr_1(sharefail_modaltips_android);
				trace("hw_common_config::sharefail_modaltips_android->随机到字符串:", value);
				return value;
			}
		}
		return this.shareFailModalTips;
	}
	/**
	 * 后台配强制分享失败微信提示框提示语android版本
	 */
	public get sharefail_secondui(): string {
		let sharefail_secondui: string = "";
		if (this._platformConfig && this._platformConfig.sharefail_secondui) {
			sharefail_secondui = this._platformConfig.sharefail_secondui;
			if (sharefail_secondui) {
				let value: string = MathUtils.getRDFromStr_1(sharefail_secondui);
				trace("hw_common_config:: sharefail_secondui->随机到字符串:", value);
				return value;
			}
		}
		return this.shareFailModalTips;
	}

	/**
	 * gm开启状态
	 * @returns 0关闭,1开启
	 */
	public get gm_state(): number {
		let gm_state: number = 0;
		if (this._platformConfig && this._platformConfig.gm_state) {
			gm_state = +this._platformConfig.gm_state;
		}
		return gm_state;
	}

	/** GM白名单*/
	public get gm_whitelist(): string[] {
		let whitelist = "";
		if (this._platformConfig && this._platformConfig.gm_whitelist) {
			whitelist = this._platformConfig.gm_whitelist;
		}
		var d1: string[] = whitelist.split(",");
		return d1;
	}

	/**
	 * 判断自己是否在GM的白名单内,并且GM是开启状态
	 */
	public get gm_open(): boolean {
		let selfopenid: string = hw_common.mpsdk.openid;
		if (!selfopenid) {
			console.error("hw_common_config::inGMWhiteList->还未获得玩家openid,不能判断是否在白名单内");
			return false;
		}
		if (!this.gm_state) return;
		let wlist: string[] = this.gm_whitelist;
		for (let i of wlist) {
			if (i == selfopenid) {
				return true;
			}
		}
		return false;
	}

	/**
	 * 插屏广告配置  
	 * @returns [当前关卡,关卡间隔,视频间隔]
	 */
	public get interstitialAdConfig(): number[] {
		try {
			let value: string = "15,3,60";
			if (this._platformConfig && this._platformConfig.interstitialAdConfig) {
				value = this._platformConfig.interstitialAdConfig;
			}
			let slist: string[] = value.split(",");
			if (slist.length != 3) {
				return [15, 3, 60];
			}
			let numList: number[] = [];
			for (let i of slist) {
				numList.push(+i);
			}
			return numList;
		}
		catch (e) {
			return [15, 3, 60];
		}
	}

	/** 判断当前城市是否在分享限制黑名单中 */
	public get shareLimitByCity(): boolean {
		if (this._platformConfig) {
			return mpsdk.Hack.checkShareCityLimit(this._platformConfig);
		}
		return false;
	}

	/** 判断当前城市是否只视频 */
	public get onlyVideoByCity(): boolean {
		let isonly: boolean = false;
		if (this._platformConfig) {
			isonly = mpsdk.Hack.checkCityLimit(this._platformConfig, "shareshutdowncity");
		}
		trace("hw_common_config::onlyVideoByCity->判断是否仅视频城市:", isonly);
		return isonly;
	}

	/**
	 * 查看功能是否开启,功能id和策划约定 @example 101:0,102:1
	 * @param funcid 功能id:和策划约定
	 * @returns 0:未开启,1:开启
	 */
	public getGameFuncOpen(funcid: number): number {
		let gamefuncopen: string = "";
		if (this._platformConfig && this._platformConfig.gamefuncopen) {
			let str: string = this._platformConfig.gamefuncopen;
			let tips: string[] = str.split(",");
			for (let i of tips) {
				let tag: string[] = i.split(":");
				let id: number = +tag[0];
				let openstuts: number = +tag[1];
				if (id == funcid) {
					return openstuts;
				}
			}
		}
		return 1;
	}
}