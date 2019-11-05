import com_gold from "../fui/game/com_gold";
import EventMgr from "../../control/event/EventMgr";
import EventDef from "../../def/EventDef";
import hw_common from "../../../com/hw_common/hw_common";
import SoundDef from "../../def/SoundDef";
import GameEvent from "../../control/event/GameEvent";
import GameMgr from "../../control/game/GameMgr";
import { ECurrencyType } from "../../def/ECurrencyType";
import ReportDef from "../../def/ReportDef";

export default class ProxyGoldBtn {
    protected view: com_gold;
    constructor(view: com_gold) {
        this.view = view;
        this.view.onClick(this, this._clickGold);
        this._updateCurrency();
        EventMgr.Inst.on(EventDef.GAME_CURRENCYCHANGE, this, this._updateCurrency);
    }

    private _clickGold(e: Laya.Event): void {
        hw_common.platform.showModal("分享成功即可获得50金币", () => {
            this._chooseShare();
        }, true, "领取", "取消");
        hw_common.sound.playSound(SoundDef.CLICK);
    }

    private _chooseShare(): void {
        hw_common.share.normalGet({ shareid: ReportDef.SHARE_GOLDBTN, caller: this, success: this._getRewards });
    }

    private _getRewards(e: GameEvent = null): void {
        let adcnt: number = 50;
        hw_common.platform.showToast("金币+" + adcnt);
        GameMgr.Inst.addCurrency(ECurrencyType.GOLD, adcnt);
    }

    private _updateCurrency() {
        this.view.txt.text = "" + GameMgr.Inst.data.currency.gold;
    }

}