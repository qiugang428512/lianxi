import SceneBase from "../SceneBase";
import gamewinscene from "../../fui/game/gamewinscene";
import LoadDef from "../../../def/LoadDef";
import ViewMgr from "../../../control/ViewMgr";
import ProxyEnergyBtn from "../../proxy/ProxyEnergyBtn";
import ProxyGoldBtn from "../../proxy/ProxyGoldBtn";
import IconAdComponetn from "../../proxy/IconAdComponetn";
import GameMgr from "../../../control/game/GameMgr";
import hw_common from "../../../../com/hw_common/hw_common";
import WinLevel from "../../windows/WinLevel";
import SoundDef from "../../../def/SoundDef";
import WinPromotionReward from "../../windows/WinPromotionReward";
import ReportDef from "../../../def/ReportDef";
import ConfigMgr from "../../../control/ConfigMgr";
import ConfigDef from "../../../def/ConfigDef";
import WinTreasureBox from "../../windows/WinTreasureBox";
import { ECurrencyType } from "../../../def/ECurrencyType";
import WinLuckDraw from "../../windows/WinLuckDraw";
import WinMoreGame from "../../windows/WinMoreGame";
import LobbyScene from "../lobby/LobbyScene";
import ViewUtils from "../../../../com/hw_utils/ViewUtils";
import GameDef from "../../../def/GameDef";
import LevelGift from "../../../model/confvo/LevelGift";
import EventMgr from "../../../control/event/EventMgr";
import EventDef from "../../../def/EventDef";
import { WinEnergyOver } from "../../windows/WinEnergyOver";

export default class GameWinScene extends SceneBase {

	protected view: gamewinscene;
	private _idiom: string[];
	private _flyAni: fairygui.GLoader;
	private _ifWaiting: boolean = false;
	public constructor() {
		super();
	}

	public init(): void {
		super.init();
		this._initFui();
		this._initComp();
		this._addEvent();
	}

	private _initFui(): void {
		this.view = gamewinscene.createInstance();
		this.view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
		fairygui.GRoot.inst.addChild(this.view);
	}

	private _initComp(): void {
		new ProxyEnergyBtn(this.view.btn_energy);
		new ProxyGoldBtn(this.view.btn_gold);
		let btn_leftgift_spacing = 30;//广告列表开始的y坐标距离btn_leftgift的距离
		IconAdComponetn.Inst.addSymmetryGameIcon(this.view, this.view.btn_leftgift.height + this.view.btn_leftgift.y + btn_leftgift_spacing, 2, {
			lineSpacing: 20,
			columnSpacing: 20
		}, 10, true);
	}

	public show(): void {
		super.show();
		// this._showRank();
		this._updateProgress();
		this.addLevelIconAnimation();
		this.delayLoadingWindow();
		GameMgr.Inst.updateLevelComponent(this.view.n3);
		hw_common.platform.showInterstitialAd();
		this._updateBtn();
	}
	private _updateBtn(): void {
		this.view.btn_leftgift.redpoint.visible = GameMgr.Inst.data.currency.luck_num > 0;
	}

	private _addEvent(): void {
		this.view.btn_back.onClick(this, this._onClickLobby);
		this.view.btn_next.onClick(this, this._onClickOk);
		this.view.btn_leftgift.onClick(this, this._onClickLGift);
		this.view.btn_rightgift.onClick(this, this._onClickRGift);
		this.view.n3.onClick(this, this.clickComLevel);
		EventMgr.Inst.on(EventDef.UI_HIDEWINDOW, this, this._updateBtn);
	}
	private clickComLevel() {
		ViewMgr.Inst.showWindow(WinLevel);
		hw_common.sound.playSound(SoundDef.CLICK);
	}
	private delayLoadingWindow() {
		setTimeout(() => {
			this.openWhichWin();
			this._updateAchievement();
			this._checkEnergyOver();
		}, 200);
	}

	private _checkEnergyOver(): void {
		if (GameMgr.Inst.data.currency.energy < 1) {
			ViewMgr.Inst.showWindowByQueue(WinEnergyOver);
		}
	}
	//成就宝箱-大段弹出
	private _updateAchievement() {
		let nowAchievementData = GameMgr.Inst.getAchievementData();
		let lastAchievementLevel: number = nowAchievementData.index > 0 ? ConfigMgr.Inst.GetConfigByName(ConfigDef.Achievement)[nowAchievementData.index - 1].throughLevel : 0;
		if (GameMgr.Inst.level > GameDef.WINPROMOTIONSHOWLEVEL && GameMgr.Inst.level - lastAchievementLevel === 1) {
			ViewMgr.Inst.showWindowByQueue(WinPromotionReward);
			hw_common.mpsdk.reportEvent(ReportDef.EVENT_NEW_CLICKHONOR);
		}
	}

	private _updateProgress() {
		let nowLevel: number = GameMgr.Inst.level - 1;
		let configlist: LevelGift[] = ConfigMgr.Inst.GetConfigByName(ConfigDef.LevelGift);
		let type: number = 0;
		if (nowLevel > configlist.length) {
			let MAX_PROGRESS: number = 5;
			this.view.com_progress.max = MAX_PROGRESS;
			for (let i: number = 0; i < 5; i++) {
				if ((nowLevel + i) % 5 == 0) {
					this.view.com_progress.value = MAX_PROGRESS - i;
					break;
				}
			}
		}
		else {
			let last: number = 0;
			let max: number = 5;
			let nextid: number = 0;
			for (let i: number = 0; i < configlist.length; i++) {
				let oneconfig: LevelGift = configlist[i];
				if (oneconfig.type == 1) {
					if (oneconfig.id >= nowLevel) {
						nextid = oneconfig.id
						break;
					}
					else {
						last = oneconfig.id;
					}
				}
			}
			if (nextid == 0) {
				nextid = 30;
			}
			max = nextid - last;
			this.view.com_progress.max = max
			this.view.com_progress.value = max - (nextid - nowLevel);
		}
	}
	//弹出哪个窗口
	private openWhichWin() {
		let nowLevel: number = GameMgr.Inst.level - 1;
		let configlist: LevelGift[] = ConfigMgr.Inst.GetConfigByName(ConfigDef.LevelGift);
		let type: number = 0;
		if (nowLevel > configlist.length) {
			if (nowLevel % 5 == 0) {
				type = 1;
			}
			else if (nowLevel % 5 == 2) {
				type = 2;
			}
		}
		else {
			type = ConfigMgr.Inst.GetVOByNameAndID(ConfigDef.LevelGift, nowLevel).type;
		}
		if (type == 1) {
			ViewMgr.Inst.showWindowByQueue(WinTreasureBox);
		}
		else if (type == 2) {
			this.openWinLuckDraw();
		}
	}
	//抽奖-每过5关
	private openWinLuckDraw() {
		let freenum: number = 1;
		if (!GameMgr.Inst.data.other.gotfirstfreeluck) {
			freenum = GameDef.LUCKNUM_FIRST_NUM;
			GameMgr.Inst.data.other.gotfirstfreeluck = true;
		}
		GameMgr.Inst.addCurrency(ECurrencyType.LUCKNUM, freenum);
		ViewMgr.Inst.showWindowByQueue(WinLuckDraw);
		GameMgr.Inst.SaveData();
		hw_common.platform.showToast("获得" + freenum + "次免费抽奖次数");
	}
	private _onClickLGift(): void {
		ViewMgr.Inst.showWindow(WinLuckDraw);
		hw_common.sound.playSound(SoundDef.CLICK);
	}
	private _onClickRGift(): void {
		ViewMgr.Inst.showWindow(WinMoreGame);
		hw_common.sound.playSound(SoundDef.CLICK);
	}
	private _updateLevel() {
		let achievement = ConfigMgr.Inst.GetConfigByName(ConfigDef.Achievement);
		let level = GameMgr.Inst.level;
		let nowLevelData: number;
		let Index: number;
		for (let i = 0; i < achievement.length; i++) {
			if (achievement[i].throughNum >= level) {
				Index = i;
				nowLevelData = achievement[i];
				break;
			}
		}
	}

	private _showRank(): void {
		if (GameMgr.Inst.level <= 3) return;
		hw_common.platform.postMessage({ command: "close" });
		this._getTempImgUrl(GameMgr.Inst.level.toString()).then((tempUrl) => {
			console.log("tempUrl--", tempUrl);
			let offy: number = this.view.sharepanel.displayListContainer.localToGlobal(new Laya.Point(0, 0)).y;
			hw_common.platform.postMessage({ command: "surpass", value: GameMgr.Inst.level, top: offy, tempUrl: tempUrl, width: fairygui.GRoot.inst.width, height: fairygui.GRoot.inst.height });
			this.view.sharepanel.displayListContainer.addChild(hw_common.platform.getShareSprite());
		});
	}

	private _getTempImgUrl(str: string) {
		return new Promise((resolve, reject) => {
			if (!Laya.Browser.onWeiXin) {
				reject();
			}
			let canvas = wx.createCanvas();
			let context = canvas.getContext("2d");
			let image = wx.createImage();
			image.src = "res/other/kefubtn.png";
			context.clearRect(0, 0, 400, 320);
			image.onload = () => {
				context.drawImage(image, 0, 0);
				context.font = "bold 55px SimSun";
				context.fillStyle = "#dd3e3e";
				context.textAlign = "center";
				context.textBaseline = "top";
				for (let u = str.length, s = 0; s < u; ++s) {
					context.strokeText(str[s], 65 + 80 * s, 145);
					context.fillText(str[s], 65 + 80 * s, 145);
				}
				context.font = "bold 30px SimSun";
				context.fillStyle = "#000000";
				let url = canvas.toTempFilePathSync({
					x: 0,
					y: 0,
					width: 400,
					height: 320,
					destWidth: 400,
					destHeight: 320
				});
				resolve(url);
			}
		});
	}

	private addLevelIconAnimation() {
		Laya.Tween.clearTween(this.view.n3.icon_img);
		Laya.Tween.to(this.view.n3.icon_img, { y: this.view.n3.icon_img.y - 20 }, 800, null, Laya.Handler.create(this, () => {
			Laya.Tween.to(this.view.n3.icon_img, { y: this.view.n3.icon_img.y + 20 }, 800, null, Laya.Handler.create(this, () => {
				this.addLevelIconAnimation();
			}))
		}))
	}

	private _onClickLobby(e: Laya.Event): void {
		ViewMgr.Inst.showScene(LobbyScene);
		hw_common.sound.playSound(SoundDef.CLICK);
	}

	private _onClickOk(e: Laya.Event): void {
		GameMgr.Inst.goGame(this._aniGoGame.bind(this));
		hw_common.sound.playSound(SoundDef.CLICK);
	}
	private _aniGoGame(): Promise<any> {
		if (this._flyAni == null) {
			this._flyAni = new fairygui.GLoader();
			this._flyAni.url = "ui://game/img_energy";
			this._flyAni.touchable = false;
		}
		this.view.addChild(this._flyAni);
		this._flyAni.setXY(this.view.btn_energy.x, this.view.btn_energy.y);
		hw_common.platform.showLoading();
		return new Promise((resolve, reject) => {
			Laya.Tween.to(this._flyAni, {
				x: this.view.btn_next.x + this.view.btn_next.width / 2,
				y: this.view.btn_next.y + this.view.btn_next.height / 2
			}, 400, null, Laya.Handler.create(this, () => {
				hw_common.platform.hideLoading();
				this._flyAni.removeFromParent();
				resolve(true);
			}));
		});
	}

	public hide(): void {
		super.hide();
		hw_common.platform.postMessage({ command: "close" });
		ViewUtils.removeSelf(hw_common.platform.getShareSprite());
		Laya.Tween.clearTween(this.view.n3.icon_img);
		this.view.n3.icon_img.y = 0;
	}

	public dispose(): void {
		super.dispose();
		this.hide();
	}

}