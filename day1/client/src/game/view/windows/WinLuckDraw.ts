import winluckydraw from "../fui/game/winluckydraw";
import WindowBase from "./WindowBase";
import itemreward from "../fui/game/itemreward";
import ViewMgr from "../../control/ViewMgr";
import WinMoreGame from "./WinMoreGame";
import WinGetReward, { WinGetReward_Param } from "./WinGetReward";
import { ECurrencyType } from "../../def/ECurrencyType";
import EventMgr from "../../control/event/EventMgr";
import GameMgr from "../../control/game/GameMgr";
import ProxyEnergyBtn from "../proxy/ProxyEnergyBtn";
import ProxyGoldBtn from "../proxy/ProxyGoldBtn";
import IconAdComponetn from "../proxy/IconAdComponetn";
import EventDef from "../../def/EventDef";
import hw_common from "../../../com/hw_common/hw_common";
import ReportDef from "../../def/ReportDef";
import SoundDef from "../../def/SoundDef";
import SharePointKeyDef from "../../def/SharePointKeyDef";

export default class WinLuckDraw extends WindowBase {

    public contentPane: winluckydraw;
    private _listData: any[] = [];
    private setinter: number;
    private REWARD_ITEM_WIDTH: number;
    private _canShare: boolean;
    private DEVIATION: number = 50;
    public constructor() {
        super();
        this.modal = true;
    }

    protected onInit(): void {
        this.contentPane = winluckydraw.createInstance();
        this.contentPane.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        this.contentPane.btn_back.onClick(this, this.onClose);
        this._listData = [
            { type: ECurrencyType.ENERGY, num: 1, weight1: 0, weight2: 250, weight3: 200, icon: 'energy1.png' },
            { type: ECurrencyType.ENERGY, num: 2, weight1: 0, weight2: 350, weight3: 250, icon: 'energy1.png' },
            { type: ECurrencyType.ENERGY, num: 3, weight1: 0, weight2: 250, weight3: 250, icon: 'energy2.png' },
            { type: ECurrencyType.ENERGY, num: 4, weight1: 0, weight2: 100, weight3: 250, icon: 'energy3.png' },
            { type: ECurrencyType.GOLD, num: 25, weight1: 0, weight2: 0, weight3: 0, icon: 'gold1.png' },
            { type: ECurrencyType.GOLD, num: 50, weight1: 0, weight2: 0, weight3: 0, icon: 'gold2.png' },
            { type: ECurrencyType.GOLD, num: 100, weight1: 0, weight2: 0, weight3: 0, icon: 'gold3.png' },
            { type: ECurrencyType.GOLD, num: 150, weight1: 0, weight2: 0, weight3: 0, icon: 'gold4.png' },
            { type: ECurrencyType.GOLD, num: 200, weight1: 0, weight2: 0, weight3: 0, icon: 'gold5.png' },
            { type: ECurrencyType.GOLD, num: 250, weight1: 0, weight2: 0, weight3: 0, icon: 'gold6.png' },
            { type: ECurrencyType.NEXTMORE, num: 2, weight1: 200, weight2: 0, weight3: 50, icon: 'nextmore2.png' },
            { type: ECurrencyType.NEXTMORE, num: 3, weight1: 800, weight2: 0, weight3: 50, icon: 'nextmore3.png' },
        ];
        new ProxyEnergyBtn(this.contentPane.com_energy);
        new ProxyGoldBtn(this.contentPane.com_gold);
        this.initLists();
        this.initPos();
        this.addEvent();
        this.updateLuckNum();
        let list_luckt_spacing = 30;//广告列表开始的y坐标距离列表list_luck的距离
        IconAdComponetn.Inst.addSymmetryGameIcon(this.contentPane, this.contentPane.list_luck.height + this.contentPane.list_luck.y + list_luckt_spacing, 2, {
            columnSpacing: 20,
            lineSpacing: 20
        }, 8, true);
    }

    public show(param: any) {
        super.show();
        trace("WinTips::Show->接收到窗口参数:", param)
        Laya.Tween.clearAll(this.contentPane.n24);
        this._updateHelpBtn();
        // this.contentPane.n24.x = 0;
        // Laya.Tween.to(this.contentPane.n24, { x: -500 }, 30000, Laya.Ease.linearNone);
    }

    protected onShown(): void {

    }
    private addEvent() {
        this.contentPane.btn_luck.onClick(this, this.clickLuckDrawBtn);
        this.contentPane.btn_moregame.onClick(this, this.clickMoreGame);
        EventMgr.Inst.on(EventDef.LUCK_NUMCHANGE, this, this.updateLuckNum);
        EventMgr.Inst.on(EventDef.UI_HIDEWINDOW, this, () => {
            this._updateHelpBtn();
        })
    }
    private clickMoreGame() {
        ViewMgr.Inst.showWindow(WinMoreGame);
    }
    private clickLuckDrawBtn() {
        if (GameMgr.Inst.data.currency.luck_num < 1) {
            this.clickDoubleReceive();
        } else {
            this.luckDraw();
            GameMgr.Inst.addCurrency(ECurrencyType.LUCKNUM, -1);
        }
    }
    private luckDraw() {
        let randomIndex = this.randomReward();
        let newIndex = Math.floor(Math.abs(this.contentPane.n24.x - (this.contentPane.sel_box.x + this.DEVIATION)) / this.REWARD_ITEM_WIDTH);
        let ROLL_NUM = 3;
        let total_pos_x = (randomIndex + this._listData.length * ROLL_NUM) * this.REWARD_ITEM_WIDTH - (this.contentPane.sel_box.x + this.DEVIATION);
        console.log(this.contentPane.width, randomIndex, newIndex);
        this.contentPane.touchable = false;
        Laya.Tween.clearAll(this.contentPane.n24);
        Laya.Tween.to(this.contentPane.n24, { x: -total_pos_x }, 4000, Laya.Ease.quartOut, Laya.Handler.create(this, () => {
            let nowIndex = Math.floor(Math.abs(this.contentPane.n24.x - (this.contentPane.sel_box.x + this.DEVIATION)) / this.REWARD_ITEM_WIDTH) % this._listData.length;
            //当目前的跳转坐标在2之前有空白，为保证左边没有空白，所做的处理
            if (nowIndex < 2) {
                nowIndex += this._listData.length;
            }
            this.contentPane.n24.x = -nowIndex * this.REWARD_ITEM_WIDTH + this.contentPane.sel_box.x + this.DEVIATION;
            this.openRewardWin(nowIndex);
            this.contentPane.touchable = true;
        }));
        this._updateHelpBtn();
    }

    private randomReward(): number {
        //type:1 只能抽中2倍3倍,type:2:只能抽中精力,type:3:都可抽中
        let type: number = 0;
        if (GameMgr.Inst.data.currency.nextmore > 0) {
            type = 2;
        }
        else if (GameMgr.Inst.data.currency.luck_num > 0) {
            type = 1;
        }
        else {
            type = 3;
        }
        let totalWeight = 0;
        for (let i = 0; i < this._listData.length; i++) {
            totalWeight += this._listData[i]["weight" + type];
        }
        let weight = 0;
        let randomWeight = Math.floor(Math.random() * totalWeight);
        console.log('随机位置：', randomWeight);
        for (let i = 0; i < this._listData.length; i++) {
            if (randomWeight <= weight + this._listData[i]["weight" + type]) {
                return i;
            } else {
                weight += this._listData[i]["weight" + type];
            }
        }
    }
    private luckDraw1() {
        let randomIndex = Math.floor(Math.random() * this._listData.length);
        let nowIndex = Math.floor((this.contentPane.list_luck.scrollPane.posX + this.contentPane.sel_box.x) / this.REWARD_ITEM_WIDTH) % this._listData.length;
        let TOTAL_POS_X: number = (randomIndex + this._listData.length * 2) * this.REWARD_ITEM_WIDTH;
        let MIN_STOP: number = 3.5;
        let SLOW_DOWN: number = 100;
        let SPEED: number;
        let nowPosX = TOTAL_POS_X - this.contentPane.list_luck.scrollPane.posX;
        let MIN_THRESHOLD: number = 3000;
        if (nowPosX < MIN_THRESHOLD) {
            TOTAL_POS_X += this._listData.length * this.REWARD_ITEM_WIDTH;
        }
        console.log('目前的index：', nowIndex, randomIndex, Math.floor(TOTAL_POS_X / this.REWARD_ITEM_WIDTH) % this._listData.length, TOTAL_POS_X, this.contentPane.list_luck.scrollPane.posX);
        this.contentPane.touchable = false;
        this.setinter = setInterval(() => {
            nowPosX = TOTAL_POS_X - this.contentPane.list_luck.scrollPane.posX;
            SPEED = nowPosX / SLOW_DOWN;
            if (SPEED < MIN_STOP) {
                clearInterval(this.setinter);
                let index = Math.round((this.contentPane.list_luck.scrollPane.posX + this.contentPane.sel_box.x) / this.REWARD_ITEM_WIDTH) % this._listData.length;
                let posx = index * this.REWARD_ITEM_WIDTH - this.contentPane.sel_box.x;
                if (posx < 0) {
                    posx = (this._listData.length + index) * this.REWARD_ITEM_WIDTH - this.contentPane.sel_box.x;
                }
                this.contentPane.list_luck.scrollPane.setPosX(posx - this.DEVIATION);
                this.contentPane.touchable = true;
                console.log('最后的Index：', Math.floor((this.contentPane.list_luck.scrollPane.posX + this.contentPane.sel_box.x + this.DEVIATION) / this.REWARD_ITEM_WIDTH) % this._listData.length, randomIndex);
                let newIndex: number = Math.floor((this.contentPane.list_luck.scrollPane.posX + this.contentPane.sel_box.x + this.DEVIATION) / this.REWARD_ITEM_WIDTH) % this._listData.length;
                this.openRewardWin(newIndex);
            }
            this.contentPane.list_luck.scrollPane.setPosX(this.contentPane.list_luck.scrollPane.posX + SPEED);
        }, 30);
    }
    private initPos() {
        let currentIndex: number = 3;
        this.contentPane.n24.x = -this.REWARD_ITEM_WIDTH * currentIndex + this.contentPane.sel_box.x + this.DEVIATION
    }
    private initLists() {
        this.contentPane.list_luck.visible = false;
        let ROLL_TOTAL_NUM: number = 5;
        for (let i = 0; i < this._listData.length * ROLL_TOTAL_NUM; i++) {
            let itemReward: itemreward = itemreward.createInstance();
            itemReward.x = itemReward.width * i;
            if (this._listData[i % this._listData.length].type == ECurrencyType.NEXTMORE) {
                itemReward.reward_text.text = "下次" + this._listData[i % this._listData.length].num + "倍奖励";
            }
            else {
                itemReward.reward_text.text = this._listData[i % this._listData.length].num + '';
            }
            itemReward.icon_img.url = "res/goldandenergyicon/" + this._listData[i % this._listData.length].icon;
            this.contentPane.n24.addChild(itemReward);
            console.log(itemReward.width);
            this.REWARD_ITEM_WIDTH = itemReward.width;
        }
    }
    private initList() {
        this.contentPane.list_luck.setVirtualAndLoop();
        this.contentPane.list_luck.itemRenderer = Laya.Handler.create(this, this.getListItemResource, null, false);
        this.contentPane.list_luck.numItems = this._listData.length;
    }
    private getListItemResource(index: number, obj: any) {
        let item: itemreward = <itemreward><any>obj;
        if (this._listData[index].type == ECurrencyType.NEXTMORE) {
            item.reward_text.text = "下次" + this._listData[index].num + "倍奖励";
        }
        else {
            item.reward_text.text = this._listData[index].num + '';
        }
        item.icon_img.url = "res/goldandenergyicon/" + (index < 3 ? 'energy' + (index + 1) : 'gold' + (index - 2)) + ".png";
        this.REWARD_ITEM_WIDTH = item.width;
    }
    private openRewardWin(index: number) {
        index = index % this._listData.length;
        let rewardData = this._listData[index];
        let num: number = rewardData.num;
        let showdouble: boolean = rewardData.type != ECurrencyType.NEXTMORE;
        let nextmore: number = 0;
        if (GameMgr.Inst.data.currency.nextmore > 0) {
            num *= GameMgr.Inst.data.currency.nextmore;
            nextmore = GameMgr.Inst.data.currency.nextmore;
        }
        GameMgr.Inst.data.currency.nextmore = 0;
        ViewMgr.Inst.showWindow(WinGetReward, new WinGetReward_Param(rewardData.type, num, showdouble, "res/goldandenergyicon/" + this._listData[index].icon, null, nextmore));
        GameMgr.Inst.SaveData();
        this._updateHelpBtn();
    }

    private updateLuckNum() {
        this.contentPane.luck_num.text = '今日免费次数：' + GameMgr.Inst.data.currency.luck_num;
        let button_state = { show: 0, hide: 1 }
        // this.contentPane.btn_luck.state.selectedIndex = GameMgr.Inst.data.currency.luck_num > 0 ? button_state.show : button_state.hide;
    }

    private clickDoubleReceive() {
        if (platform.debug) {
            this.luckDraw();
        }
        else {
            this._chooseShare();
        }
    }

    private _updateHelpBtn(): void {
        this._canShare = hw_common.share.canShare(SharePointKeyDef.CHOUJIANG);
        let isfree: boolean = GameMgr.Inst.data.currency.luck_num > 0;
        if (isfree) {
            this.contentPane.btn_luck.state.selectedIndex = 0;
        }
        else if (this._canShare) {
            this.contentPane.btn_luck.state.selectedIndex = 2;
        }
        else {
            this.contentPane.btn_luck.state.selectedIndex = 1;
        }
    }

    private _chooseShare(): void {
        hw_common.share.normalGet({
            shareid: ReportDef.SHARE_LUCKDRAW,
            sharekey: SharePointKeyDef.CHOUJIANG,
            caller: this,
            success: this.luckDraw,
            fail: () => {
                this._updateHelpBtn();
            }
        });
    }

    protected onClose(): void {
        this.hide();
        clearInterval(this.setinter);
        hw_common.sound.playSound(SoundDef.CLICK);
    }
}