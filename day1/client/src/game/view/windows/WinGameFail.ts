import WindowBase from "./WindowBase";
import wingamefail from "../fui/game/wingamefail";
import ProxyEnergyBtn from "../proxy/ProxyEnergyBtn";
import ProxyGoldBtn from "../proxy/ProxyGoldBtn";
import IconAdComponetn from "../proxy/IconAdComponetn";
import hw_common from "../../../com/hw_common/hw_common";
import ViewMgr from "../../control/ViewMgr";
import WinMoreGame from "./WinMoreGame";
import SoundDef from "../../def/SoundDef";
import EventDef from "../../def/EventDef";
import EventMgr from "../../control/event/EventMgr";
import ReportDef from "../../def/ReportDef";
import LobbyScene from "../scenes/lobby/LobbyScene";
import GameMgr from "../../control/game/GameMgr";
import { WinEnergyOver } from "./WinEnergyOver";
import { ECurrencyType } from "../../def/ECurrencyType";
import SharePointKeyDef from "../../def/SharePointKeyDef";

export default class WinGameFail extends WindowBase {
	public contentPane: wingamefail;
	private _flyAni: fairygui.GLoader;
	private _canShare: boolean;
	public constructor() {
		super();
	}

	public onInit(): void {
		super.init();
		this._initFui();
		this._initComp();
		this._addEvent();
		this._updateHelpBtn();
	}

	private _initFui(): void {
		this.contentPane = wingamefail.createInstance();
		this.contentPane.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
	}

	private _initComp(): void {
		new ProxyEnergyBtn(this.contentPane.btn_energy);
		new ProxyGoldBtn(this.contentPane.btn_gold);
		let next_btn_spacing = 30;//广告列表开始的y坐标距离列表上面的按钮的距离
		IconAdComponetn.Inst.addSymmetryGameIcon(this.contentPane, this.contentPane.n16.height + this.contentPane.n16.y + next_btn_spacing, 2, {
			columnSpacing: 20,
			lineSpacing: 20
		}, 10, true);
	}

	public show(): void {
		super.show();
		hw_common.platform.showBannerAd(true);
		hw_common.platform.showInterstitialAd();
		// GameMgr.Inst.CCSFJump();
	}

	private _addEvent(): void {
		this.contentPane.btn_back.onClick(this, this._onClickLobby);
		this.contentPane.btn_restart.onClick(this, this._onClickOk);
		this.contentPane.btn_delay.onClick(this, this._onClickDelay);
		this.contentPane.n16.onClick(this, this._clickMoreGame);
	}

	private _clickMoreGame() {
		ViewMgr.Inst.showWindow(WinMoreGame);
		hw_common.sound.playSound(SoundDef.BTN);
	}
	private _updateHelpBtn(): void {
		this._canShare = hw_common.share.canShare(SharePointKeyDef.TILI);
		if (this._canShare) {
			this.contentPane.btn_delay.c1.selectedIndex = 0;
		}
		else {
			this.contentPane.btn_delay.c1.selectedIndex = 1;
		}
	}
	private _onClickDelay(): void {
		this._videoOrShare();
		hw_common.sound.playSound(SoundDef.CLICK);
	}

	private _getRewards(): void {
		this.hide();
		this._updateHelpBtn();
		EventMgr.Inst.event(EventDef.UI_WINFAILVIDEOOK);
		hw_common.sound.playSound(SoundDef.CLICK);
	}

	private _videoOrShare(): void {
		hw_common.share.normalGet({
			shareid: ReportDef.SHARE_GAMEOVERDELAY,
			sharekey: SharePointKeyDef.TILI,
			caller: this,
			success: this._getRewards,
			fail: () => {
				this._updateHelpBtn();
			}
		});
	}

	private _onClickLobby(e: Laya.Event): void {
		ViewMgr.Inst.showScene(LobbyScene);
		this.hide();
		hw_common.sound.playSound(SoundDef.CLICK);
	}

	private _onClickOk(e: Laya.Event): void {
		if (GameMgr.Inst.data.currency.energy <= 0) {
			ViewMgr.Inst.showWindow(WinEnergyOver);
			return;
		}
		this._aniGoGame();
		hw_common.sound.playSound(SoundDef.CLICK);
	}

	private _aniGoGame(): void {
		if (this._flyAni == null) {
			this._flyAni = new fairygui.GLoader();
			this._flyAni.url = "ui://game/img_energy";
			this._flyAni.touchable = false;
		}
		this.contentPane.addChild(this._flyAni);
		this._flyAni.setXY(this.contentPane.btn_energy.x, this.contentPane.btn_energy.y);
		hw_common.platform.showLoading();
		Laya.Tween.to(this._flyAni, {
			x: this.contentPane.btn_restart.x + this.contentPane.btn_restart.width / 2,
			y: this.contentPane.btn_restart.y + this.contentPane.btn_restart.height / 2
		}, 400, null, Laya.Handler.create(this, () => {
			hw_common.platform.hideLoading();
			this._flyAni.removeFromParent();
			GameMgr.Inst.addCurrency(ECurrencyType.ENERGY, -1);
			EventMgr.Inst.event(EventDef.UI_WINFAILRESTART);
			this.hide();
		}));
	}

	public hide(): void {
		super.hide();
	}

	public dispose(): void {
		super.dispose();
		this.hide();
	}

}