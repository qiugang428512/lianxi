import GameMgr from "./GameMgr";
import hw_common from "../../../com/hw_common/hw_common";
import hw_common_def from "../../../com/hw_common/hw_common_def";
import { ECurrencyType } from "../../def/ECurrencyType";

/*
* name;
*/
export class GMMgr {
    private static _INST: GMMgr;
    private _txt: Laya.Input;
    constructor() {

    }
    public static get Inst(): GMMgr {
        if (GMMgr._INST == null) {
            GMMgr._INST = new GMMgr();
        }
        return GMMgr._INST;
    }

    public init(): void {
        if (!hw_common.config.platformConfig || !hw_common.mpsdk.openid) {
            hw_common.event.on(hw_common_def.EVT_MPSDK_PLATFORMCONFIG_OK, this, this._checkShow);
            hw_common.event.on(hw_common_def.EVT_MPSDK_ACCOUNT_OK, this, this._checkShow);
        }
        else {
            this._checkShow();
        }
    }

    private _checkShow(): void {
        if (!hw_common.config.platformConfig || !hw_common.mpsdk.openid) {
            return;
        }
        if (hw_common.config.gm_open) {
            this._show();
        }
    }

    private _show(): void {
        let tx: Laya.Input = new Laya.Input();
        tx.x = tx.y = 0
        tx.width = Laya.stage.width;
        tx.bgColor = "#ffffff";
        tx.color = "#000000";
        tx.align = "center";
        tx.fontSize = 30;
        this._txt = tx;
        Laya.stage.addChild(tx);
        tx.zOrder = 9999;

        let sp: Laya.Sprite = new Laya.Sprite();
        sp.graphics.drawRect(0, 0, 100, 30, "#ff0000");
        Laya.stage.addChild(sp);
        sp.width = 100;
        sp.height = 30;
        sp.x = 0;
        sp.y = tx.height;
        sp.on(Laya.Event.CLICK, this, this.onEnter);
        sp.zOrder = 999;
    }

    /**
     * lv 关卡id//修改当前关卡id
     */
    private onEnter(e: Laya.Event): void {
        trace("输入gm命令")
        let str: string[] = this._txt.text.split(" ");
        let key: string = str[0].toLocaleLowerCase();
        let value: string = str[1];
        this._txt.text = "";
        switch (key) {
            case "lv":
                GameMgr.Inst.data.levelData.level = +value;
                GameMgr.Inst.levelConfig = null;
                break;
            case "tl":
                GameMgr.Inst.addCurrency(ECurrencyType.ENERGY, +value);
                break;
            default:
                break;
        }
    }
}