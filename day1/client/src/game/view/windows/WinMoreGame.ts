import WindowBase from "./WindowBase";
import winmoregame from "../fui/game/winmoregame";
import itemmoregame from "../fui/game/itemmoregame";
import GameMgr from "../../control/game/GameMgr";
import SoundDef from "../../def/SoundDef";
import hw_common from "../../../com/hw_common/hw_common";
import MathUtils from "../../../com/hw_utils/MathUtils";

export default class WinMoreGame extends WindowBase {
    public contentPane: winmoregame;
    private gameList: any[];
    public constructor() {
        super();
        this.modal = true;
    }

    protected onInit(): void {
        this.contentPane = winmoregame.createInstance();
        this.contentPane.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        this.initListSouce();
        this.contentPane.back_game.onClick(this, this.onClose);
    }
    public show(param: any) {
        super.show();
        trace("WinTips::Show->接收到窗口参数:", param)
    }

    protected onShown(): void {

    }
    private initListSouce() {
        this.contentPane.game_list.numItems = 0;
        mpsdk.Ad.getSuggestList(true, 0, GameMgr.Inst.level).then((list: any[]) => {
            this.gameList = list;
            trace(this.gameList);
            this.initList();
            this.updateList();
        })
    }
    private updateList(): void {
        this.contentPane.game_list.numItems = this.gameList.length;
    }
    private initList() {
        this.contentPane.game_list.setVirtual();
        this.contentPane.game_list.itemRenderer = Laya.Handler.create(this, this.getListItemResource, null, false);
    }
    private getListItemResource(index: number, obj: any) {
        let item: itemmoregame = <itemmoregame><any>obj;
        item.touchable = true;
        //动态图
        // item.displayListContainer.addChild(mpsdk.ui.LayaADSingleUI.Create(this.gameList[index], 140, false))
        // if (this.gameList[index].icon.indexOf(".gif") >= 0) {
        item.n0.itemicon.url = this.gameList[index].icon;
        item.txt_name.text = this.gameList[index].title;
        item.txt_num.text = MathUtils.randomBetween_Int(140000, 180000) + "人在玩";
        item.onClick(this, this.onClickItem, [this.gameList[index]]);
        // }
    }
    private onClickItem(obj: any) {
        console.log(obj);
        if (obj) {
            mpsdk.Ad.click(obj);
        }
    }
    protected onClose(): void {
        this.hide();
        hw_common.sound.playSound(SoundDef.CLICK);
    }
}