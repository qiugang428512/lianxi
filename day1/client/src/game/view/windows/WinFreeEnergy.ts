import WindowBase from "./WindowBase";
import winfreeenergy from "../fui/game/winfreeenergy";
import EventDef from "../../def/EventDef";
import EventMgr from "../../control/event/EventMgr";
import RedPointMgr, { RedPointType } from "../../control/game/RedPointMgr";
import WinCollectionGame from "./WinCollectionGame";
import ViewMgr from "../../control/ViewMgr";
import GameMgr from "../../control/game/GameMgr";
import WinAddFloat from "./WinAddFloat";
import WinServiceEnergy from "./WinServiceEnergy";
import SoundDef from "../../def/SoundDef";
import hw_common from "../../../com/hw_common/hw_common";

export default class WinFreeEnergy extends WindowBase {
	public contentPane: winfreeenergy;
	private _btn_state = {
		showRedPoint: 0,
		hideRedPoint: 1,
		grey: 2
	};//更改按钮状态,0：没有领取且今天没有点击，有红点；1：今天有点击但是没有领取过，没有红点 2：领取过奖励了，没有红点且按钮变灰
	public constructor() {
		super();
		this.modal = true;
	}

	protected onInit(): void {
		this.contentPane = winfreeenergy.createInstance();
		this.center();
		this.contentPane.btn_Close.onClick(this, this.onClose);
		this.contentPane.btn_service.btn_reward.onClick(this, this.clickService);
		EventMgr.Inst.on(EventDef.GAME_CURRENCYCHANGE, this, this.initBtn);
	}

	public show(param: any) {
		super.show();
		trace("WinTips::Show->接收到窗口参数:", param);
		this.initBtn();
	}

	private clickAddmy() {
		if (this.contentPane.btn_addmy.btn_reward.state.selectedIndex == this._btn_state.grey) {
			return;
		}
		RedPointMgr.Inst.saveRedPoint(RedPointType.addMyGame);
		this.contentPane.btn_addmy.btn_reward.state.selectedIndex = this._btn_state.hideRedPoint;
		ViewMgr.Inst.showWindow(WinCollectionGame);
	}
	private initBtn() {
		this.contentPane.btn_addmy.btn_reward.offClick(this, this.clickAddmy);
		this.contentPane.btn_addfloat.btn_reward.offClick(this, this.clickAddfloat);
		if (GameMgr.Inst.isHadGetFloatingWindow()) {
			this.contentPane.btn_addfloat.btn_reward.state.selectedIndex = this._btn_state.grey;
		} else {
			this.contentPane.btn_addfloat.btn_reward.state.selectedIndex = RedPointMgr.Inst.judeFloatWinRedPoint(RedPointType.floatWindow) ? this._btn_state.hideRedPoint : this._btn_state.showRedPoint;
			this.contentPane.btn_addfloat.btn_reward.onClick(this, this.clickAddfloat);
		}
		if (GameMgr.Inst.getHasGetDailyColReward()) {
			this.contentPane.btn_addmy.btn_reward.state.selectedIndex = this._btn_state.grey;
		} else {
			this.contentPane.btn_addmy.btn_reward.state.selectedIndex = RedPointMgr.Inst.judeFloatWinRedPoint(RedPointType.addMyGame) ? this._btn_state.hideRedPoint : this._btn_state.showRedPoint;
			this.contentPane.btn_addmy.btn_reward.onClick(this, this.clickAddmy);
		}
		this.contentPane.btn_service.btn_reward.state.selectedIndex = RedPointMgr.Inst.judeFloatWinRedPoint(RedPointType.service) ? this._btn_state.hideRedPoint : this._btn_state.showRedPoint;

	}
	private clickAddfloat() {
		if (this.contentPane.btn_addfloat.btn_reward.state.selectedIndex == this._btn_state.grey) {
			return;
		}
		RedPointMgr.Inst.saveRedPoint(RedPointType.floatWindow);
		this.contentPane.btn_addfloat.btn_reward.state.selectedIndex = this._btn_state.hideRedPoint;
		ViewMgr.Inst.showWindow(WinAddFloat);
	}
	private clickService() {
		if (this.contentPane.btn_service.btn_reward.state.selectedIndex == this._btn_state.grey) {
			return;
		}
		this.contentPane.btn_service.btn_reward.state.selectedIndex = this._btn_state.hideRedPoint;
		ViewMgr.Inst.showWindow(WinServiceEnergy);
	}
	protected onShown(): void {

	}

	protected onClose(): void {
		this.hide();
		hw_common.sound.playSound(SoundDef.CLICK);
	}
}