import WindowBase from "./WindowBase";
import winenergyover from "../fui/game/winenergyover";
import hw_common from "../../../com/hw_common/hw_common";
import TimeMgr, { TimeBindType } from "../../control/TimeMgr";
import GameMgr from "../../control/game/GameMgr";
import TimeUtils from "../../../com/hw_utils/TimeUtils";
import ViewMgr from "../../control/ViewMgr";
import WinGetReward, { WinGetReward_Param } from "./WinGetReward";
import { ECurrencyType } from "../../def/ECurrencyType";
import GameEvent from "../../control/event/GameEvent";
import SoundDef from "../../def/SoundDef";
import ReportDef from "../../def/ReportDef";
import GameDef from "../../def/GameDef";
import SharePointKeyDef from "../../def/SharePointKeyDef";

export class WinEnergyOver extends WindowBase {
	public contentPane: winenergyover;

	private _canShare: boolean;
	public constructor() {
		super();
		this.modal = true;
	}

	protected onInit(): void {
		this.contentPane = winenergyover.createInstance();
		this.center();
		this.contentPane.btn_close.onClick(this, this.onClose);
		this.contentPane.btn_get.onClick(this, this._onGet);
		this._updateHelpBtn();
	}

	public show(param: any) {
		super.show();
		this._updateTips();
		TimeMgr.Inst.addTimeEvent(1000, TimeBindType.Loop, this._updateTips, this);
	}

	private _updateTips(): void {
		let hastime: number = GameMgr.Inst.getNextEnergyTime();
		if (hastime > 0) {
			this.contentPane.txt_tips.text = "还需要" + TimeUtils.getTimeMMSS(hastime) + "分钟恢复一点体力";
		}
		else {
			this.contentPane.txt_tips.text = "精力已满";
		}
	}

	private _onGet(): void {
		hw_common.share.normalGet({
			shareid: ReportDef.SHARE_GOLDBTN,
			sharekey: SharePointKeyDef.TILI,
			caller: this,
			success: this._getRewards,
			fail: () => {
				this._updateHelpBtn();
			}
		});
	}

	private _updateHelpBtn(): void {
		this._canShare = hw_common.share.canShare(SharePointKeyDef.TILI);
		if (this._canShare) {
			this.contentPane.btn_get.c1.selectedIndex = 0;
		}
		else {
			this.contentPane.btn_get.c1.selectedIndex = 1;
		}
	}

	private _getRewards(e: GameEvent = null): void {
		this._updateHelpBtn();
		ViewMgr.Inst.showWindow(WinGetReward, new WinGetReward_Param(ECurrencyType.ENERGY, GameDef.ENERGYOVER_ENERGY_NUM));
		this.hide();
	}

	protected onShown(): void {

	}

	protected onClose(): void {
		this.hide();
		hw_common.sound.playSound(SoundDef.CLICK);
	}
}