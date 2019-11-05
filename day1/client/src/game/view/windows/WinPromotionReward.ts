import WindowBase from "./WindowBase";
import winpromotionreward from "../fui/game/winpromotionreward";
import GameMgr from "../../control/game/GameMgr";
import { ECurrencyType } from "../../def/ECurrencyType";
import hw_common from "../../../com/hw_common/hw_common";
import SoundDef from "../../def/SoundDef";
import ReportDef from "../../def/ReportDef";
import ViewMgr from "../../control/ViewMgr";
import WinGetReward, { WinGetReward_Param } from "./WinGetReward";
import GameDef from "../../def/GameDef";

export default class WinPromotionReward extends WindowBase {
	public contentPane: winpromotionreward;
	private REWARD_GOLD: number = 100;
	public constructor() {
		super();
		this.modal = true;
	}

	protected onInit(): void {
		this.contentPane = winpromotionreward.createInstance();
		this.center();
		this.contentPane.btn_promotion_reward.onClick(this, this.clickReward);
		this.contentPane.n25.onClick(this, this.onClose);
	}
	private clickReward() {
		hw_common.share.shareGet({
			shareid: ReportDef.SHARE_PROMOTIONSHARE,
			caller: this,
			success: this._getRewards
		}, false);
	}
	private _getRewards(): void {
		ViewMgr.Inst.showWindow(WinGetReward, new WinGetReward_Param(ECurrencyType.ENERGY, GameDef.RANKUPREWARDS_ENERGY_NUM, true));
		this.onClose();
	}
	public show(param: any) {
		super.show();
		trace("WinTips::Show->接收到窗口参数:", param)
		this.updateLevelInfo();
	}

	protected onShown(): void {

	}

	private updateLevelInfo() {
		let nowAchievementLevel = GameMgr.Inst.getAchievementData();
		this.contentPane.level_name_icon.url = platform.cdnURL + "achievementimage/" + nowAchievementLevel.data.levelname + ".png";
	}

	protected onClose(): void {
		this.hide();
		hw_common.sound.playSound(SoundDef.BTN);
	}
}