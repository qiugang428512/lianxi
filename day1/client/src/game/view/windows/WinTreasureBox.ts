import WindowBase from "./WindowBase";
import wintreasurebox from "../fui/game/wintreasurebox";
import GameMgr from "../../control/game/GameMgr";
import { ECurrencyType } from "../../def/ECurrencyType";
import ViewMgr from "../../control/ViewMgr";
import WinGetReward, { WinGetReward_Param } from "./WinGetReward";
import IconAdComponetn from "../proxy/IconAdComponetn";
import hw_common from "../../../com/hw_common/hw_common";
import ReportDef from "../../def/ReportDef";
import SoundDef from "../../def/SoundDef";
import GameDef from "../../def/GameDef";
import SharePointKeyDef from "../../def/SharePointKeyDef";

export default class WinTreasureBox extends WindowBase {
    public contentPane: wintreasurebox;
    private _canShare: boolean;
    private _clkTarget: fairygui.GObject;
    public constructor() {
        super();
        this.modal = true;
    }

    protected onInit(): void {
        this.contentPane = wintreasurebox.createInstance();
        this.center();
        this.contentPane.n9.onClick(this, this.onClose);
        this.contentPane.n3.onClick(this, this._chooseShare);

        let next_btn_spacing = 30;//广告列表开始的y坐标距离列表上面的按钮的距离
        IconAdComponetn.Inst.addSymmetryGameIcon(this.contentPane, this.contentPane.n2.y + next_btn_spacing, 2, {
            columnSpacing: 20,
            lineSpacing: 20
        }, 10, true);
    }
    public show(param: any) {
        super.show();
        this._updateHelpBtn();
        trace("WinTips::Show->接收到窗口参数:", param)
        this.contentPane.t1.play(null, 1, 0, 0);
    }

    protected onShown(): void {

    }
    private _updateHelpBtn(): void {
        this._canShare = hw_common.share.canShare(SharePointKeyDef.RONGYAO);
        if (this._canShare) {
            this.contentPane.n3.c1.selectedIndex = 0;
        }
        else {
            this.contentPane.n3.c1.selectedIndex = 1;
        }
    }
    private _getRewards() {
        this._updateHelpBtn();
        ViewMgr.Inst.showWindow(WinGetReward, new WinGetReward_Param(ECurrencyType.ENERGY, GameDef.TREASURE_ENERGY_NUM));
        this.hide();
    }
    private _chooseShare(): void {
        hw_common.share.normalGet({
            shareid: ReportDef.SHARE_GOLDBTN,
            sharekey: SharePointKeyDef.RONGYAO,
            caller: this,
            success: this._getRewards,
            fail: () => {
				this._updateHelpBtn();
			}
        });
    }
    protected onClose(): void {
        this.hide();
        hw_common.sound.playSound(SoundDef.BTN);
    }
}