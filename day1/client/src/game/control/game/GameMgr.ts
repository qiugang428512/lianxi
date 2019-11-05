import GameDataVO from "../../model/datavo/GameDataVO";
import LevelConfig from "../../model/confvo/LevelConfig";
import TimeMgr, { TimeBindType } from "../TimeMgr";
import DataMgr from "../DataMgr";
import { DataDef } from "../../def/DataDef";
import { EDataType } from "../../def/EDataType";
import hw_common from "../../../com/hw_common/hw_common";
import GameDef from "../../def/GameDef";
import { ECurrencyType } from "../../def/ECurrencyType";
import EventDef from "../../def/EventDef";
import EventMgr from "../event/EventMgr";
import LevelDataVO from "../../model/datavo/LevelDataVO";
import CurrencyDataVO from "../../model/datavo/CurrencyDataVO";
import ViewMgr from "../ViewMgr";
import GameWinScene from "../../view/scenes/gameover/GameWinScene";
import ConfigMgr from "../ConfigMgr";
import ConfigDef from "../../def/ConfigDef";
import LoadMgr from "../LoadMgr";
import GameScene from "../../view/scenes/game/GameScene";
import { WinEnergyOver } from "../../view/windows/WinEnergyOver";
import TimeUtils from "../../../com/hw_utils/TimeUtils";
import com_level from "../../view/fui/game/com_level";
import com_level_stars from "../../view/fui/game/com_level_stars";
import { ShellScene } from "../../view/scenes/shell/ShellScene";
import WinCollectionGame from "../../view/windows/WinCollectionGame";
import OtherDataVO from "../../model/datavo/OtherDataVO";
import WinAddFloat from "../../view/windows/WinAddFloat";
import WinServiceEnergy from "../../view/windows/WinServiceEnergy";
import { WinMustShare } from "../../view/windows/WinMustShare";
import { EFuncOpenID } from "../../def/EFuncOpenID";
import LobbyScene from "../../view/scenes/lobby/LobbyScene";

/**
 * 游戏控制器
 */
export default class GameMgr {
	private static _INST: GameMgr;
	private _data: GameDataVO;
	private _levelconfig: LevelConfig;
	private _passlevelRefreshBanner: number = 0;//本次上线通关次数;
	private _levelLoading: boolean = false;

	public get levelConfig(): LevelConfig {
		return this._levelconfig;
	}

	public set levelConfig(conf: LevelConfig) {
		this._levelconfig = conf;
	}

	public get passlevelRefreshBanner(): number {
		return this._passlevelRefreshBanner;
	}

	public set passlevelRefreshBanner(v: number) {
		this._passlevelRefreshBanner = v;
	}

	public get level(): number {
		if (!this._data || !this._data.levelData) return 0;
		return this._data.levelData.level;
	}

	public get data(): GameDataVO {
		return this._data;
	}

	public constructor() {
	}

	public static get Inst(): GameMgr {
		if (GameMgr._INST == null) {
			GameMgr._INST = new GameMgr();
		}
		return GameMgr._INST;
	}

	/**
	 * 游戏管理器
	 * @param serverdata 同步服务器的数据 
	 */
	public init(serverdata: any): void {
		this._setServerData(serverdata);
		this._setNullData();
		TimeMgr.Inst.addTimeEvent(1000, TimeBindType.Loop, this._updateEnergy, this);
	}

	private _onPlatformShow(sceneid: number): void {

	}

	private _setNullData(): void {
		if (this._data == null) {
			let data: any = DataMgr.Inst.getDataByKey(DataDef.GAMEDATA, EDataType.Any);
			if (data == null) {
				data = this.createNewData();
			}
			this._checkData(data);
			this._data = data;
		}
	}

	private _setServerData(data: any): void {
		if (data == null) return;
		this._checkData(data);
		this._data = data;
		this.SaveData();
	}

	public _updateEnergy(): void {
		let nowtime: number = hw_common.servertime.now;
		if (this.data.currency.energy >= GameDef.ENERGYMAX) {
			this.data.energyStartTime = 0;
			return;
		}
		if (!this.data.energyStartTime) this.data.energyStartTime = nowtime;
		let starttime: number = this.data.energyStartTime;
		let passtime: number = nowtime - starttime;
		let energycnt: number = Math.floor(passtime / GameDef.ENERGYRECOVERTIME);
		let onepass: number = passtime % GameDef.ENERGYRECOVERTIME;
		if (this.data.currency.energy + energycnt >= GameDef.ENERGYMAX) {
			energycnt = GameDef.ENERGYMAX - this.data.currency.energy;
		}
		if (energycnt > 0) {
			GameMgr.Inst.addCurrency(ECurrencyType.ENERGY, energycnt);
			this.data.energyStartTime = nowtime - onepass;
			GameMgr.Inst.SaveData();
			if (this.data.currency.energy >= GameDef.ENERGYMAX) {
				this.data.energyStartTime = 0;
			}
		}
	}

	public getNextEnergyTime(): number {
		if (!this.data.energyStartTime) return 0;
		let nowtime: number = hw_common.servertime.now;
		let begintime: number = nowtime - this.data.energyStartTime;
		let hastime: number = GameDef.ENERGYRECOVERTIME - begintime;
		return hastime;
	}
	/**
	 * 增加资源数值,负值为消耗
	 * @param type 
	 * @param num 
	 */
	public addCurrency(type: ECurrencyType, num: number): void {
		switch (type) {
			case ECurrencyType.GOLD:
				this.data.currency.gold += num;
				this.data.currency.gold < 0 && (this.data.currency.gold = 0);
				EventMgr.Inst.event(EventDef.GAME_CURRENCYCHANGE, type + "");
				break;
			case ECurrencyType.ENERGY:
				this.data.currency.energy += num;
				this.data.currency.energy < 0 && (this.data.currency.energy = 0);
				EventMgr.Inst.event(EventDef.GAME_CURRENCYCHANGE, type + "");
				break;
			case ECurrencyType.LUCKNUM:
				this.data.currency.luck_num += num;
				this.data.currency.luck_num < 0 && (this.data.currency.luck_num = 0);
				EventMgr.Inst.event(EventDef.LUCK_NUMCHANGE, type + "");
				break;
			case ECurrencyType.NEXTMORE:
				this.data.currency.nextmore = num;
				this.data.currency.nextmore < 0 && (this.data.currency.nextmore = 0);
				break;
			default:
				break;
		}
		this.SaveData();
	}

	//数据修正,防止新老数据不兼容
	private _checkData(data: GameDataVO): void {
		if (data.levelData == null) {
			let leveldata: LevelDataVO = new LevelDataVO();
			leveldata.level = 1;
			data.levelData = leveldata;
		}

		if (data.currency == null) {
			let currencydata: CurrencyDataVO = new CurrencyDataVO();
			currencydata.gold = 0;
			currencydata.energy = GameDef.ENERGYMAX;
			currencydata.luck_num = 0;
			data.currency = currencydata;
		}
		if (data.currency.energy == undefined) {
			data.currency.energy = GameDef.ENERGYMAX;
		}

		if (data.guideOverList == null) {
			data.guideOverList = [];
		}

		if (data.energyStartTime == null) {
			data.energyStartTime = hw_common.servertime.now;
		}

		if (data.other == null) {
			data.other = new OtherDataVO();
			data.other.showmustshare = 0;
		}
		if (!data.other.gotofflinetm) data.other.gotofflinetm = 0;

		if (data.savetime == null) {
			data.savetime = hw_common.servertime.now;
		}
		if (data.version != platform.version) {
			trace("GameMgr::checkData->版本更新,重置题库", data.version, platform.version);
			data.version = platform.version;
		}
	}

	//创建新玩家数据
	private createNewData(): GameDataVO {
		let data = new GameDataVO();

		let leveldata: LevelDataVO = new LevelDataVO();
		leveldata.level = 1;

		let currencydata: CurrencyDataVO = new CurrencyDataVO();
		currencydata.gold = 0;
		currencydata.energy = GameDef.ENERGYMAX;
		currencydata.luck_num = 0;

		let otherdata: OtherDataVO = new OtherDataVO();
		otherdata.hadGetCsReward = false;
		otherdata.hadGetFloatingWindow = false;
		otherdata.hadGetColReward = false;
		otherdata.hasGetDaliyColReward = null;
		otherdata.showmustshare = 0;
		otherdata.gotofflinetm = 0;

		data.levelData = leveldata;
		data.guideOverList = [];
		data.currency = currencydata;
		data.energyStartTime = hw_common.servertime.now;
		data.savetime = hw_common.servertime.now;
		data.other = otherdata
		return data;
	}

	public PassLevel(): void {
		this._data.levelData.level++;
		this._passlevelRefreshBanner++;
		this._levelconfig = null;
		this.SaveData();
		hw_common.serverdata.sendDataToServer(this._data);
		hw_common.platform.setUserCloudStorage([{ key: DataDef.CloudStorage_BestScore, value: this._data.levelData.level + "" }]);
		ViewMgr.Inst.showScene(GameWinScene);
		//上传排行榜
		if (hw_common.platform.userInfo) {
			let obj: any = {};
			obj.avatarUrl = hw_common.platform.userInfo.avatarUrl;
			obj.nickName = hw_common.platform.userInfo.nickName;
			let str: string = encodeURIComponent(JSON.stringify(obj));
			mpsdk.SNS.rankUpload(DataDef.CloudStorage_BestScore, this._data.levelData.level + "", str);
		}
		//预加载下一关
		this.LoadLevel(() => {
			this.loadLevelAsset(this._levelconfig);//顺便加载图片
		});

		if (this.level == GameDef.CCSFJUMPLEVEL) {
			// this.CCSFJump();
		}
	}
	public CCSFJump(): void {
		if (!GameMgr.Inst.getHasGetDailyColReward()) {
			ViewMgr.Inst.showWindow(WinCollectionGame);
			return;
		}
		if (!GameMgr.Inst.isHadGetCSRewards()) {
			ViewMgr.Inst.showWindow(WinServiceEnergy);
			return;
		}
		if (!GameMgr.Inst.isHadGetFloatingWindow()) {
			ViewMgr.Inst.showWindow(WinAddFloat);
			return;
		}
	}
	public LoadLevel(sucess: Function = null, error: Function = null): void {
		let localconf: LevelConfig = this._levelconfig;
		if (localconf) {
			if (sucess) sucess();
			return;
		}
		let conf: LevelConfig = ConfigMgr.Inst.GetVOByNameAndID(ConfigDef.LevelData, this._data.levelData.level);
		if (conf) {
			this._levelconfig = conf;
			if (sucess) sucess();
			return;
		}
		if (!hw_common.platform.netConnect) {
			if (error) error({ error: 1004 });
			return;
		}
		hw_common.serverdata.loadQuiz(this.level).then(
			res => {
				this._levelconfig = res;
				if (sucess) sucess();
			}
		).catch(
			err => {
				if (error) error(err);
			}
		)
	}

	public loadLevelAsset(conf: LevelConfig, sucess?: Function, fail?: Function): void {
		let urllist: string[] = LoadMgr.Inst.getLevelImage(conf);
		let img1: string = urllist[0];
		let img2: string = urllist[1];
		let loadcnt: number = 0;
		let checkfun: Function = () => {
			if (loadcnt == 2) {
				if (sucess) sucess();
			}
		}
		let loadfun: Function = (imageurl: string) => {
			if (!Laya.loader.getRes(imageurl)) {
				if (!hw_common.platform.netConnect) {
					if (fail) fail();
					fail = null;
					return;
				}
				Laya.loader.load(imageurl, Laya.Handler.create(this, (res) => {
					if (res) {
						loadcnt++;
						checkfun();
					}
					else {
						if (fail) fail();
						fail = null;
						return;
					}
				}), null, Laya.Loader.IMAGE, 0, true);
			}
			else {
				loadcnt++;
			}
		}
		loadfun(img1);
		loadfun(img2);
		checkfun();
	}

	public SaveData(): void {
		this._data.savetime = hw_common.servertime.now;
		DataMgr.Inst.setDataByKey(DataDef.GAMEDATA, this._data, EDataType.Any);
	}

	public goGame(aniFun: Function = null): void {
		if (!hw_common.config.safe && platform.debug == false) {
			ViewMgr.Inst.showScene(ShellScene);
			return;
		}
		if (hw_common.config.getGameFuncOpen(EFuncOpenID.MUSTSHARE) &&
			this.level > 1 &&
			(this.level) % GameDef.MUSTSHARELEVEL == 1 &&
			this.data.other.showmustshare != this.level &&
			ViewMgr.Inst.isWindowShow(WinMustShare) == false
		) {
			ViewMgr.Inst.showWindow(WinMustShare);
			return;
		}
		if (this._levelLoading) return;
		hw_common.platform.showLoading("加载中");
		this._levelLoading = true;
		this.LoadLevel(
			() => {
				let config: LevelConfig = this._levelconfig;
				this.loadLevelAsset(config,
					() => {
						if (this.data.currency.energy > 0) {
							GameMgr.Inst.addCurrency(ECurrencyType.ENERGY, -1);
							GameMgr.Inst.SaveData();
							if (aniFun) {
								aniFun().then((res) => {
									hw_common.platform.hideLoading();
									this._levelLoading = false;
									ViewMgr.Inst.showScene(GameScene);
								})
								return;
							}
							else {
								hw_common.platform.hideLoading();
								this._levelLoading = false;
								ViewMgr.Inst.showScene(GameScene);
								return;
							}
						}
						else {
							hw_common.platform.hideLoading();
							this._levelLoading = false;
							ViewMgr.Inst.showWindow(WinEnergyOver);
						}
					},
					() => {
						hw_common.platform.hideLoading();
						this._levelLoading = false;
						hw_common.platform.showModal(
							"网络不稳定,请检查网络稍后再试,按确定按钮重新连接,按取消按钮返回主页",
							() => {
								this.goGame(aniFun);
							},
							true, "确定", "取消",
							() => {
								ViewMgr.Inst.showScene(LobbyScene);
								return;
							}
						)
					}
				);

			},
			(err) => {
				hw_common.platform.hideLoading();
				this._levelLoading = false;
				let str: string;
				if (err && err.error == 1001) {
					str = ("账号登陆失败,请重新登陆~")
				}
				else if (err && err.error == 1003) {
					err = ("后续关卡正在加急制作中，请稍后~")
				}
				else if (err && err.error == 1002) {
					str = ("未知错误,请重新登陆~")
				}
				else if (err && err.error == 1004) {
					str = ("题库获取失败,请检查网络连接~")
				}
				hw_common.platform.showModal(
					str,
					() => {
						this.goGame(aniFun);
					},
					true, "确定", "取消",
					() => {
						ViewMgr.Inst.showScene(LobbyScene);
						return;
					}
				)
			}
		)
	}
	public getAchievementData() {
		let level: number = GameMgr.Inst.level;
		let dataList: any = ConfigMgr.Inst.GetConfigByName(ConfigDef.Achievement);
		let nowLevelData: any;
		let index: number;
		for (let i = 0; i < dataList.length; i++) {
			if (i == dataList.length - 1) {
				nowLevelData = dataList[dataList.length - 1];
				index = dataList.length - 1;
			} else {
				if (dataList[i].throughLevel >= level) {
					nowLevelData = dataList[i];
					index = i;
					break;
				}
			}
		}
		return { index, data: nowLevelData };
	}
	/**
	 * 是否曾经领取过浮窗奖励
	 */
	public isHadGetFloatingWindow(): boolean {
		return this._data.other && this._data.other.hadGetFloatingWindow;
	}
	/**
	 * 是否曾经领取过客服奖励
	 */
	public isHadGetCSRewards(): boolean {
		return this._data.other && this._data.other.hadGetCsReward;
	}


	public setHadGetReward(type, bool: boolean) {
		if (!this._data.other) {
			this._data.other = new OtherDataVO;
		}
		switch (type) {
			case 'floatWindow':
				this._data.other.hadGetFloatingWindow = bool;
				break;
			case 'addMyGame':
				this.saveHasGetDailyColReward();
				break;
			default:
				console.log('都没有');
				break;
		}

		this.SaveData();
	}
	/**
	 * 获取当天是否已经领取收藏奖励
	 */
	public getHasGetDailyColReward(): boolean {
		let DailyCount: string = this._data.other && this._data.other.hasGetDaliyColReward ? this._data.other.hasGetDaliyColReward : '';
		let nowTime = +new Date();
		if (DailyCount == null || DailyCount == "") {
			return false;
		}
		var d1: string[] = DailyCount.split(":");
		var last: number = +d1[0];
		var count: number = +d1[1];
		return TimeUtils.IsSameDay(last, nowTime) && count > 0;
	}
	/**
	* 存每日领取收藏小游戏奖励
	*/
	public saveHasGetDailyColReward() {
		let DailyCount: string = this._data.other && this._data.other.hasGetDaliyColReward ? this._data.other.hasGetDaliyColReward : '';
		let newData = "";
		let nowTime = +new Date;
		if (DailyCount == null || DailyCount == "") {
			newData = nowTime + ":" + "1";
		}
		else {
			var d1: string[] = DailyCount.split(":");
			var last: number = +d1[0];
			var count: number = +d1[1];
			if (TimeUtils.IsSameDay(last, nowTime)) {
				if (count > 0) {
					count++;
				}
				else {
					count = 1;
				}
				newData = nowTime + ":" + count
			}
			else {
				newData = nowTime + ":" + "1";
			}
		}
		this._data.other.hasGetDaliyColReward = newData;
	}
	/**
	 * 是否曾经领取过收藏奖励
	 */
	public IsHadGetColReward(): boolean {
		return this._data.other && this._data.other.hadGetColReward;
	}
	public updateLevelComponent(component: com_level) {
		let nowAchievementLevel = GameMgr.Inst.getAchievementData();
		let levelDifference = nowAchievementLevel.data.throughLevel - GameMgr.Inst.level;
		let throughNum = nowAchievementLevel.data.starNum * nowAchievementLevel.data.leveladdstar;
		let nextGrading = Math.floor(levelDifference / throughNum);
		let nowGrading = nextGrading + 1;
		let nextTitle = nowAchievementLevel.data.name;
		if (nextGrading == 0 && nowAchievementLevel.index < ConfigMgr.Inst.GetConfigByName(ConfigDef.Achievement).length - 1) {
			let nextAchievementData = ConfigMgr.Inst.GetConfigByName(ConfigDef.Achievement)[nowAchievementLevel.index + 1];
			nextGrading = nextAchievementData.gradingNum;
			nextTitle = nextAchievementData.name;
		}
		console.log('当前段位：', nowAchievementLevel.data.name + nowGrading);
		component.n11.text = `还差${levelDifference % throughNum + 1}关晋级${nextTitle}${nextGrading}`;
		component.icon_img.url = platform.cdnURL + "achievementimage/" + nowAchievementLevel.data.icon + ".png";
		component.levelname_img.url = platform.cdnURL + "achievementimage/" + nowAchievementLevel.data.levelname + ".png";
		component.levelname_level.url = platform.cdnURL + "achievementimage/no" + nowGrading + ".png";
		component.stars_group.removeChildren();
		let interval: number = 8;
		let lastAchievementLevelThroughLevel = nowAchievementLevel.index > 0 ? ConfigMgr.Inst.GetConfigByName(ConfigDef.Achievement)[nowAchievementLevel.index - 1].throughLevel : 0;
		for (let i = 0; i < nowAchievementLevel.data.starNum; i++) {
			let starsItem: com_level_stars = com_level_stars.createInstance();
			let startX = (component.stars_group.width - (interval * (nowAchievementLevel.data.starNum - 1) + nowAchievementLevel.data.starNum * starsItem.width)) / 2;
			starsItem.x = startX + i * (interval + starsItem.width);
			starsItem.state.selectedIndex = Math.floor((this.level - lastAchievementLevelThroughLevel - 1) % (nowAchievementLevel.data.starNum * nowAchievementLevel.data.leveladdstar) / nowAchievementLevel.data.leveladdstar) > i ? 1 : 0;
			component.stars_group.addChild(starsItem);
		}
	}
}