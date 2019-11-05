import WindowBase from "./WindowBase";
import wincsrewards from "../fui/game/wincsrewards";
import hw_common from "../../../com/hw_common/hw_common";
import hw_common_def from "../../../com/hw_common/hw_common_def";
import ReportDef from "../../def/ReportDef";
import EventMgr from "../../control/event/EventMgr";
import EventDef from "../../def/EventDef";
import ViewMgr from "../../control/ViewMgr";
import WinGetReward, { WinGetReward_Param } from "./WinGetReward";
import { ECurrencyType } from "../../def/ECurrencyType";
import SoundDef from "../../def/SoundDef";
import GameMgr from "../../control/game/GameMgr";
import RedPointMgr, { RedPointType } from "../../control/game/RedPointMgr";

export default class WinServiceEnergy extends WindowBase {
	public contentPane: wincsrewards;
	public constructor() {
		super();
		this.modal = true;
	}

	protected onInit(): void {
		this.contentPane = wincsrewards.createInstance();
		this.center();
		this.contentPane.btn_close.onClick(this, this.onClose);
		this.contentPane.btn_Start.onClick(this, this.clickReward);
	}
	private clickReward() {
		this.hide();
		hw_common.platform.openCustomerServiceConversation({
			sessionFrom: "getenergy",
			showMessageCard: true,
			sendMessageTitle: "我要领体力",
			sendMessagePath: "index",
			sendMessageImg: "res/other/kefubtn.jpg",
			success: () => {
				trace("客服消息发送成功");
				hw_common.event.once(hw_common_def.EVT_PLATFORM_ONSHOW, this, this._onShowCS);
				hw_common.mpsdk.reportEvent(ReportDef.EVENT_CSCLICK);
			},
			fail: () => {
				trace("客服消息发送失败");
			},
			complete: () => {
				trace("客服消息发送完成");
			}

		});

	}
	public show(param: any) {
		super.show();
		trace("WinTips::Show->接收到窗口参数:", param)
		RedPointMgr.Inst.saveRedPoint(RedPointType.service);
	}

	//判断是否客服奖励
	private _onShowCS(): void {
		if (hw_common.config.csrewards_energy > 0) {
			hw_common.serverdata.getOpenCSGift().then(res => {
				trace("WinServiceEnergy::_onShowCS->获取客服奖励成功");
				EventMgr.Inst.event(EventDef.GAME_GETREWARDCS);
				ViewMgr.Inst.showWindow(WinGetReward, new WinGetReward_Param(ECurrencyType.ENERGY, hw_common.config.csrewards_energy));
				GameMgr.Inst.data.other.hadGetCsReward = true;
				hw_common.mpsdk.reportEvent(ReportDef.EVENT_GETFLOATINGWINGIFT);
			}).catch(error => {
				trace("WinServiceEnergy::_onShowCS->", error);
			});
		}
	}

	protected onShown(): void {
	}

	protected onClose(): void {
		this.hide();
		hw_common.sound.playSound(SoundDef.BTN);
	}
}