import com_energy from "../fui/game/com_energy";
import EventMgr from "../../control/event/EventMgr";
import TimeMgr, { TimeBindType } from "../../control/TimeMgr";
import EventDef from "../../def/EventDef";
import GameMgr from "../../control/game/GameMgr";
import TimeUtils from "../../../com/hw_utils/TimeUtils";
import GameDef from "../../def/GameDef";
import hw_common from "../../../com/hw_common/hw_common";
import ViewMgr from "../../control/ViewMgr";
import WinFreeEnergy from "../windows/WinFreeEnergy";
import ReportDef from "../../def/ReportDef";
import { ECurrencyType } from "../../def/ECurrencyType";
import WinGetReward, { WinGetReward_Param } from "../windows/WinGetReward";
import { WinEnergyOver } from "../windows/WinEnergyOver";

export default class ProxyEnergyBtn {
    protected view: com_energy;
    constructor(view: com_energy) {
        this.view = view;
        this.view.onClick(this, this._clickEnergy);
        this._updateCurrency();
        EventMgr.Inst.on(EventDef.GAME_CURRENCYCHANGE, this, this._updateCurrency);
        TimeMgr.Inst.addTimeEvent(1000, TimeBindType.Loop, this._updateEnergyTime, this);
    }
    private _updateEnergyTime(): void {
        let hastime: number = GameMgr.Inst.getNextEnergyTime();
        this.view.txt_time.visible = hastime > 0;
        if (this.view.txt_time.visible) {
            this.view.txt_time.text = TimeUtils.getTimeMMSS(hastime);
        }
    }
    private _updateCurrency() {
        this._updateEnergyTxt(this.view);
        this._updateEnergyTime();
    }
    private _updateEnergyTxt(energy: com_energy): void {
        let energycnt: number = GameMgr.Inst.data.currency.energy;
        let txt: string;
        if (energycnt >= GameDef.ENERGYMAX) {
            txt = "已满";
            energy.state.selectedIndex = 1;
            energy.txt.text = energy.txt2.text = txt;
            energy.txt_min.text = "" + energycnt;
        }
        // else if (energycnt > GameDef.ENERGYMAX) {
        //     txt = "已满+" + (energycnt - GameDef.ENERGYMAX);
        //     energy.state.selectedIndex = 1;
        //     energy.txt.text = energy.txt2.text = txt;
        // }
        else {
            txt = "" + energycnt;
            energy.state.selectedIndex = 0;
            energy.txt.text = energy.txt2.text = txt;
            energy.txt_min.text = "" + energycnt;
        }
    }
    private _clickEnergy(): void {
        ViewMgr.Inst.showWindow(WinEnergyOver);
    }
    private _getRewards(): void {
        ViewMgr.Inst.showWindow(WinGetReward, new WinGetReward_Param(ECurrencyType.ENERGY, GameDef.ENERGYCLICK_ENERGY_NUM, true));
    }
}