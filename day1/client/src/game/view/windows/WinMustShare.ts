import WindowBase from "./WindowBase";
import winauthor from "../fui/game/winauthor";
import SoundDef from "../../def/SoundDef";
import hw_common from "../../../com/hw_common/hw_common";
import winmustshare from "../fui/game/winmustshare";
import ReportDef from "../../def/ReportDef";
import GameMgr from "../../control/game/GameMgr";
import { ECurrencyType } from "../../def/ECurrencyType";
import ViewMgr from "../../control/ViewMgr";
import GameScene from "../scenes/game/GameScene";
import LevelConfig from "../../model/confvo/LevelConfig";
import TimeMgr, { TimeBindType } from "../../control/TimeMgr";

export class WinMustShare extends WindowBase {
	public contentPane: winmustshare;
	public constructor() {
		super();
		this.modal = true;
	}

	protected onInit(): void {
		this.contentPane = winmustshare.createInstance();
		this.center();
		this.contentPane.btn_share.onClick(this, this._onShare);
		this.contentPane.btn_ok.onClick(this, this.onBtnGoon);
	}
	public show(): void {
		super.show();
	}
	protected onShown(): void {
	}
	protected _onShare(): void {
		if (hw_common.config.safe) {
			hw_common.share.shareGet({ shareid: ReportDef.SHARE_ENERGYMUSTSHARE, caller: this, success: this._getRewards }, false);
		}
		else {
			hw_common.share.videoGet({ shareid: ReportDef.SHARE_ENERGYMUSTSHARE, caller: this, success: this._getRewards });
		}
	}
	private _getRewards(): void {
		GameMgr.Inst.data.other.showmustshare = GameMgr.Inst.level;
		GameMgr.Inst.LoadLevel(
			() => {
				let config: LevelConfig = GameMgr.Inst.levelConfig;
				GameMgr.Inst.loadLevelAsset(config);//顺便加载图片
				if (GameMgr.Inst.data.currency.energy >= 1) {
					GameMgr.Inst.addCurrency(ECurrencyType.ENERGY, -1);
				}
				ViewMgr.Inst.showScene(GameScene);
				GameMgr.Inst.SaveData();
			},
			(errtips) => {
				TimeMgr.Inst.addTimeEvent(500, TimeBindType.Delay, () => {
					hw_common.platform.showToast(errtips);
				}, this);
			}
		);

	}
	protected onBtnGoon(): void {
		this.hide();
	}

}