import WindowBase from "./WindowBase";
import winrecommend from "../fui/game/winrecommend";
import recommenditem from "../fui/game/recommenditem";
import GameMgr from "../../control/game/GameMgr";
import hw_common from "../../../com/hw_common/hw_common";
import ReportDef from "../../def/ReportDef";
import SoundDef from "../../def/SoundDef";
import MathUtils from "../../../com/hw_utils/MathUtils";

export default class WinRecommend extends WindowBase {
    public contentPane: winrecommend;
    private gameList: any[];
    public constructor() {
        super();
        this.modal = true;
    }

    protected onInit(): void {
        this.contentPane = winrecommend.createInstance();
        this.center();
        this.initListSouce();
        this.contentPane.btn_close.onClick(this, this.clickClose);
    }
    public show(param: any) {
        super.show();
        trace("WinTips::Show->接收到窗口参数:", param)
        this.contentPane.state.selectedIndex = 1;
        hw_common.mpsdk.reportEvent(ReportDef.EVENT_CLICKLEFTRECOMMEND);
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
        let item: recommenditem = <recommenditem><any>obj;
        item.touchable = true;
        //动态图
        // item.displayListContainer.addChild(mpsdk.ui.LayaADSingleUI.Create(this.gameList[index], 110, false));
        // if (this.gameList[index].icon.indexOf(".gif") >= 0) {
        item.n0.item_icon.url = this.gameList[index].icon;
        item.txt_name.text = this.gameList[index].title;
        item.txt_num.text = MathUtils.randomBetween_Int(140000, 180000) + "人在玩";
        item.onClick(this, this.onClickItem, [this.gameList[index]]);
        // }
    }
    private onClickItem(obj: any) {
        if (obj) {
            mpsdk.Ad.click(obj);
        }
    }
    private clickClose() {
        let delayTime: number = 300;
        this.contentPane.state.selectedIndex = 0;
        hw_common.sound.playSound(SoundDef.BTN);
        setTimeout(() => {
            this.hide();
        }, delayTime)
    }
    protected onClose(): void {
        this.hide();
        this.contentPane.state.selectedIndex = 0;
        hw_common.sound.playSound(SoundDef.BTN);
    }
}