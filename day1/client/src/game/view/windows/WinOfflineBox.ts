import WindowBase from "./WindowBase";
import winofflinebox from "../fui/game/winofflinebox";
import IconAdComponetn from "../proxy/IconAdComponetn";
import ViewMgr from "../../control/ViewMgr";
import WinGetReward, { WinGetReward_Param } from "./WinGetReward";
import { ECurrencyType } from "../../def/ECurrencyType";
import ReportDef from "../../def/ReportDef";
import hw_common from "../../../com/hw_common/hw_common";
import SoundDef from "../../def/SoundDef";
import GameDef from "../../def/GameDef";
import SharePointKeyDef from "../../def/SharePointKeyDef";
import GameMgr from "../../control/game/GameMgr";

export default class WinOfflineBox extends WindowBase {
    public contentPane: winofflinebox;
    private _clkTarget: fairygui.GObject;
    private _canShare: boolean;
    public constructor() {
        super();
        this.modal = true;
    }

    protected onInit(): void {
        this.contentPane = winofflinebox.createInstance();
        this.center();
        this.contentPane.n9.onClick(this, this.onClose);
        this.contentPane.n3.onClick(this, this._chooseShare);
        this._updateHelpBtn();
        let next_btn_spacing = 30;//广告列表开始的y坐标距离列表上面的按钮的距离
        IconAdComponetn.Inst.addSymmetryGameIcon(this.contentPane, this.contentPane.n2.y + next_btn_spacing, 2, {
            columnSpacing: 20,
            lineSpacing: 20
        }, 10, true);
    }
    public show(param: any) {
        super.show();
        trace("WinTips::Show->接收到窗口参数:", param);
    }

    protected onShown(): void {

    }

    private _getRewards() {
        this._updateHelpBtn();
        ViewMgr.Inst.showWindow(WinGetReward, new WinGetReward_Param(ECurrencyType.ENERGY, GameDef.OFFLINEREWARDS_ENERGY_NUM, false));
        GameMgr.Inst.data.other.gotofflinetm = hw_common.servertime.now;
        this.hide();
    }
    private _updateHelpBtn(): void {
        this._canShare = hw_common.share.canShare(SharePointKeyDef.LIXIAN);
        if (this._canShare) {
            this.contentPane.n3.c1.selectedIndex = 0;
        }
        else {
            this.contentPane.n3.c1.selectedIndex = 1;
        }
    }
    private _chooseShare(): void {
        hw_common.share.normalGet({
            shareid: ReportDef.SHARE_OFFLINEBOXBTN,
            sharekey: SharePointKeyDef.LIXIAN,
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