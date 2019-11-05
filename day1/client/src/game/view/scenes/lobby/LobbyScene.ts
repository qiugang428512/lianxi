import SceneBase from "../SceneBase";
import ViewMgr from "../../../control/ViewMgr";
import hw_common from "../../../../com/hw_common/hw_common";
import SoundDef from "../../../def/SoundDef";
import WinMoreGame from "../../windows/WinMoreGame";
import WinLevel from "../../windows/WinLevel";
import WinRecommend from "../../windows/WinRecommend";
import WinSetting from "../../windows/WinSetting";
import WinLuckDraw from "../../windows/WinLuckDraw";
import WinFreeEnergy from "../../windows/WinFreeEnergy";
import GameMgr from "../../../control/game/GameMgr";
import EventMgr from "../../../control/event/EventMgr";
import EventDef from "../../../def/EventDef";
import IconAdComponetn from "../../proxy/IconAdComponetn";
import com_gameicon from "../../fui/game/com_gameicon";
import ProxyEnergyBtn from "../../proxy/ProxyEnergyBtn";
import ProxyGoldBtn from "../../proxy/ProxyGoldBtn";
import { WinRank } from "../../windows/WinRank";
import lobbyscene from "../../fui/game/lobbyscene";
import RedPointMgr, { RedPointType } from "../../../control/game/RedPointMgr";

export default class LobbyScene extends SceneBase {

	protected view: lobbyscene;
	private _flyAni: fairygui.GLoader;
	private _len: number = 0;
	private _iconAd: com_gameicon;
	public constructor() {
		super();
	}

	public init(): void {
		super.init();
		this._initFui();
		this._initComp();
		this._addEvent();
	}

	public show(): void {
		super.show();
		this._updateLevel();
		this.addLevelIconAnimation();
		hw_common.platform.showBannerAd(true);
		this._len++;
		if (this._len == 2) {
			let btn_lucky_spacing = 25;//广告列表开始的y坐标距离btn_lucky的距离
			IconAdComponetn.Inst.addSymmetryGameIcon(this.view, this.view.btn_lucky.height + this.view.btn_lucky.y + btn_lucky_spacing, 2, {
				lineSpacing: 18,
				columnSpacing: 20
			}, 10, true);
			this.view.removeChild(this._iconAd);
			IconAdComponetn.Inst.removeTiming();
		}
		this._updateBtn();
	}

	private _updateBtn(): void {
		this.view.btn_lucky.redpoint.visible = GameMgr.Inst.data.currency.luck_num > 0;
		this.view.btn_gift.redpoint.visible = !GameMgr.Inst.getHasGetDailyColReward() || !GameMgr.Inst.isHadGetFloatingWindow() || !RedPointMgr.Inst.judeFloatWinRedPoint(RedPointType.service);
	}

	private _updateLevel(): void {
		this.view.btn_start.start_btn_level.text = "第" + GameMgr.Inst.level + "关";
		GameMgr.Inst.updateLevelComponent(this.view.com_level);
	}

	private addLevelIconAnimation() {
		Laya.Tween.clearTween(this.view.com_level.icon_img);
		Laya.Tween.to(this.view.com_level.icon_img, { y: this.view.com_level.icon_img.y - 20 }, 800, null, Laya.Handler.create(this, () => {
			Laya.Tween.to(this.view.com_level.icon_img, { y: this.view.com_level.icon_img.y + 20 }, 800, null, Laya.Handler.create(this, () => {
				this.addLevelIconAnimation();
			}))
		}))
	}

	private _initFui(): void {
		this.view = lobbyscene.createInstance();
		this.view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
		fairygui.GRoot.inst.addChild(this.view);
	}

	private _initComp(): void {
		new ProxyEnergyBtn(this.view.com_energy);
		new ProxyGoldBtn(this.view.com_gold);
		let offsetX = 20;
		let offsetY = 30;
		this._iconAd = IconAdComponetn.Inst.addBuoyAd(this.view, this.view.btn_more.x + offsetX, this.view.btn_more.y + this.view.btn_more.height + offsetY);
	}

	private _addEvent(): void {
		this.view.btn_rank.onClick(this, this.onClickRank);
		this.view.btn_img.onClick(this, this.onClickImg);
		this.view.btn_gift.onClick(this, this._clickGift);
		this.view.btn_start.onClick(this, this._clickStart);
		this.view.btn_lucky.onClick(this, this._clickLucky);
		this.view.btn_setting.onClick(this, this._clickSetting);
		this.view.btn_open.onClick(this, this._clickOpenRecommend);
		this.view.btn_more.onClick(this, this._clickMoreGame);
		this.view.com_level.onClick(this, this._clickComLevel);
		EventMgr.Inst.on(EventDef.UI_HIDEWINDOW, this, this._updateBtn);

	}
	private _clickEnergy(): void {
		ViewMgr.Inst.showWindow(WinFreeEnergy);
	}

	private _clickComLevel() {
		ViewMgr.Inst.showWindow(WinLevel);
		hw_common.sound.playSound(SoundDef.CLICK);
	}
	private _clickMoreGame() {
		ViewMgr.Inst.showWindow(WinMoreGame);
		hw_common.sound.playSound(SoundDef.CLICK);
	}
	private _clickOpenRecommend() {
		ViewMgr.Inst.showWindow(WinRecommend);
		hw_common.sound.playSound(SoundDef.CLICK);
	}
	private _clickSetting() {
		ViewMgr.Inst.showWindow(WinSetting);
		hw_common.sound.playSound(SoundDef.CLICK);
	}
	private _clickLucky() {
		ViewMgr.Inst.showWindow(WinLuckDraw);
		hw_common.sound.playSound(SoundDef.CLICK);
	}
	private _clickStart() {
		GameMgr.Inst.goGame(this._aniGoGame.bind(this));
		hw_common.sound.playSound(SoundDef.CLICK);
	}
	private _clickGift(): any {
		ViewMgr.Inst.showWindow(WinFreeEnergy);
		hw_common.sound.playSound(SoundDef.CLICK);
	}

	private _aniGoGame(): Promise<any> {
		if (this._flyAni == null) {
			this._flyAni = new fairygui.GLoader();
			this._flyAni.url = "ui://game/img_energy";
			this._flyAni.touchable = false;
		}
		this.view.addChild(this._flyAni);
		this._flyAni.setXY(this.view.com_energy.x, this.view.com_energy.y);
		hw_common.platform.showLoading();
		return new Promise((resolve, reject) => {
			Laya.Tween.to(this._flyAni, {
				x: this.view.btn_start.x + this.view.btn_start.width / 2,
				y: this.view.btn_start.y + this.view.btn_start.height / 2
			}, 400, null, Laya.Handler.create(this, () => {
				this._flyAni.removeFromParent();
				hw_common.platform.hideLoading();
				resolve(true);
			}));
		});
	}

	private onClickRank(e: Laya.Event): void {
		ViewMgr.Inst.showWindow(WinRank, "排行榜");
		hw_common.sound.playSound(SoundDef.CLICK);
	}

	private onClickImg(e: Laya.Event): void {
		hw_common.platform.showToast("暂未开通");
		hw_common.sound.playSound(SoundDef.CLICK);
	}

	public hide(): void {
		super.hide();
		Laya.Tween.clearTween(this.view.com_level.icon_img);
		this.view.com_level.icon_img.y = 0;
	}

	public dispose(): void {
		super.dispose();
	}

}