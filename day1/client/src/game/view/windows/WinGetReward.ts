import WindowBase from "./WindowBase";
import wingetreward from "../fui/game/wingetreward";
import GameMgr from "../../control/game/GameMgr";
import { ECurrencyType } from "../../def/ECurrencyType";
import TimeMgr, { TimeBindType } from "../../control/TimeMgr";
import IconAdComponetn from "../proxy/IconAdComponetn";
import hw_common from "../../../com/hw_common/hw_common";
import ReportDef from "../../def/ReportDef";
import SoundDef from "../../def/SoundDef";
import { SceneID_WX } from "../../../com/hw_utils/SceneID_WX";
import EventMgr from "../../control/event/EventMgr";
import EventDef from "../../def/EventDef";
import SharePointKeyDef from "../../def/SharePointKeyDef";


export class WinGetReward_Param {
	public type: ECurrencyType;//资源类型
	public num: number;//资源数量
	public showdouble: boolean;//显示翻倍按钮
	public iconImg: string;//要显示的图片资源
	public other: any;//其他标记信息
	public nextmore: number;//n倍奖励
	public constructor(type: ECurrencyType, num: number, showdouble: boolean = true, iconImg: string = '', other: any = null, nextmore: number = 0) {
		this.type = type;
		this.num = num;
		this.showdouble = showdouble;
		this.iconImg = iconImg;
		this.other = other;
		this.nextmore = nextmore;
	}
}

export default class WinGetReward extends WindowBase {
	public contentPane: wingetreward;
	private _param: WinGetReward_Param;
	private _canShare: boolean;
	private _clkTarget: fairygui.GObject;
	public constructor() {
		super();
		this.modal = true;
	}

	protected onInit(): void {
		this.contentPane = wingetreward.createInstance();
		this.center();
		this._updateHelpBtn();
		this.contentPane.btn_receive.onClick(this, this.clickReward);
		this.contentPane.btn_close.onClick(this, this.onClose);
		this.contentPane.btn_nextmore.onClick(this, this.clickNextMore);
		this.contentPane.btn_double_receive.onClick(this, this.clickDoubleReceive);

		let next_btn_spacing = 30;//广告列表开始的y坐标距离列表上面的按钮的距离
		IconAdComponetn.Inst.addSymmetryGameIcon(this.contentPane, this.contentPane.n10.y + next_btn_spacing, 2, {
			columnSpacing: 20,
			lineSpacing: 20
		}, 10, true);
	}
	public show(param: WinGetReward_Param) {
		super.show();
		this._param = param;
		switch (this._param.type) {
			case ECurrencyType.ENERGY:
				this.contentPane.state.selectedIndex = 1;
				break;
			case ECurrencyType.GOLD:
				this.contentPane.state.selectedIndex = 0;
				break;
			case ECurrencyType.NEXTMORE:
				this.contentPane.txt_nextmore.text = "下次" + this._param.num + '倍奖励';
				this.contentPane.state.selectedIndex = 3;
				break;
			default:
				this.contentPane.state.selectedIndex = 2;
				break;
		}
		if (this._param.nextmore) {
			this.contentPane.reward_nextmore.text = this._param.nextmore + '倍奖励';
			let frome: number = Math.floor(this._param.num / this._param.nextmore);
			this.contentPane.reward_num.text = "" + frome;
			TimeMgr.Inst.addTimeEvent(750, TimeBindType.Delay, () => {
				this.contentPane.reward_num.text = this._param.num + '';
			});
		}
		else {
			this.contentPane.reward_nextmore.text = "";
			this.contentPane.reward_num.text = this._param.num + '';
		}
		this.contentPane.btn_receive.visible = true;
		this.contentPane.btn_double_receive.visible = this._param.showdouble;
		if (this._param.iconImg) {
			this.contentPane.other_icon.url = this._param.iconImg;
			let CUSTOM_IMG_STATE: number = 2;
			if (this.contentPane.state.selectedIndex != 3) this.contentPane.state.selectedIndex = CUSTOM_IMG_STATE;
		}
		this._showReport();
	}

	private _showReport(): void {
		switch (this._param.other) {
			case SceneID_WX.FLOATWIN:
				GameMgr.Inst.setHadGetReward('floatWindow', true);
				hw_common.mpsdk.reportEvent(ReportDef.EVENT_GETFLOATINGWINGIFT);
				break;
			case SceneID_WX.COLLECT:
				GameMgr.Inst.setHadGetReward('addMyGame', true);
				hw_common.mpsdk.reportEvent(ReportDef.EVENT_COLLECTGETENERGY, '');
				EventMgr.Inst.event(EventDef.GAME_GETREWARDCOLLECTION);
				break;
			default:
				break;
		}
	}

	protected onShown(): void {

	}
	private clickReward() {
		GameMgr.Inst.addCurrency(this._param.type, this._param.num);
		hw_common.platform.showToast("领取成功");
		this.onClose();
	}

	private clickNextMore(): void {
		if (platform.debug) {
			this.clickReward();
		}
		else {
			this._chooseShareNextMore();
		}
	}
	private _chooseShareNextMore(): void {
		hw_common.share.normalGet({
			shareid: ReportDef.SHARE_REWARDSNEXTMORE,
			caller: this,
			success: this.clickReward,
			fail: () => {
				this._updateHelpBtn();
			}
		});
	}

	private clickDoubleReceive() {
		if (platform.debug) {
			this._getRewardDoubles();
		}
		else {
			this._chooseShareDouble();
		}
	}

	private _updateHelpBtn(): void {
		this._canShare = hw_common.share.canShare();
		if (this._canShare) {
			this.contentPane.btn_nextmore.c1.selectedIndex = 0;
			this.contentPane.btn_double_receive.c1.selectedIndex = 0;
		}
		else {
			this.contentPane.btn_nextmore.c1.selectedIndex = 1;
			this.contentPane.btn_double_receive.c1.selectedIndex = 1;
		}
	}

	private _getRewardDoubles(): void {
		this._updateHelpBtn();
		this.contentPane.btn_receive.visible = false;
		this.contentPane.btn_double_receive.visible = false;
		let cnum: number = this._param.num * 2;
		GameMgr.Inst.addCurrency(this._param.type, cnum);
		this.contentPane.t1.play(null, 1);
		TimeMgr.Inst.addTimeEvent(750, TimeBindType.Delay, () => {
			this.contentPane.reward_num.text = "" + cnum;
		});
		TimeMgr.Inst.addTimeEvent(2000, TimeBindType.Delay, () => {
			this.onClose();
		});
	}

	private _chooseShareDouble(): void {
		hw_common.share.normalGet({
			shareid: ReportDef.SHARE_REWARDSDOUBLE,
			caller: this,
			success: this._getRewardDoubles,
			fail: () => {
				this._updateHelpBtn();
			}
		});
	}

	protected onClose(): void {
		this.hide();
		hw_common.sound.playSound(SoundDef.CLICK);
	}
}