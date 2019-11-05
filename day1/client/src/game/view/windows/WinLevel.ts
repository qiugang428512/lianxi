import winlevel from "../fui/game/winlevel";
import WindowBase from "./WindowBase";
import ConfigMgr from "../../control/ConfigMgr";
import ConfigDef from "../../def/ConfigDef";
import item_com from "../fui/game/item_com";
import item_level from "../fui/game/item_level";
import GameMgr from "../../control/game/GameMgr";
import hw_common from "../../../com/hw_common/hw_common";
import SoundDef from "../../def/SoundDef";

export default class WinLevel extends WindowBase {
	public contentPane: winlevel;
	private _listData: any[];
	private _pos: number;
	public constructor() {
		super();
		this.modal = true;
	}

	protected onInit(): void {
		this.contentPane = winlevel.createInstance();
		this.center();
		this.contentPane.btn_Close.onClick(this, this.onClose);
		this.initData();
	}

	public show(param: any) {
		super.show();
		trace("WinTips::Show->接收到窗口参数:", param)
		this.initPos();
		this.initList();
	}

	protected onShown(): void {

	}
	private initPos() {
		let nowAchievementData = GameMgr.Inst.getAchievementData().data;
		for (let i = 0; i < this._listData.length; i++) {
			if (JSON.stringify(this._listData[i]) == JSON.stringify(nowAchievementData)) {
				this._pos = i;
				break;
			}
		}
	}
	private initData() {
		this._listData = JSON.parse(JSON.stringify(ConfigMgr.Inst.GetConfigByName(ConfigDef.Achievement)));
		this._listData.sort(function (a, b) {
			return b.id - a.id;
		})
	}
	private initList() {
		this.contentPane.level_list.numItems = 0;
		this.contentPane.level_list.setVirtual();
		this.contentPane.level_list.itemRenderer = Laya.Handler.create(this, this.getListItemResource, null, false);
		this.contentPane.level_list.numItems = this._listData.length;
		setTimeout(() => {
			this.contentPane.level_list.scrollPane.scrollDown(this._pos);
		}, 100);
	}
	private getListItemResource(index: number, obj: any) {
		let item: item_level = <item_level><any>obj;
		let data: any = this._listData[index];
		item.touchable = true;
		item.level_title.text = index >= this._pos ? data.name : '?????';
		item.level_instructions.text = '完成关卡' + data.throughLevel;
		if (index == this._pos) {
			item.state.selectedIndex = 1;
		} else {
			item.state.selectedIndex = index > this._pos ? 2 : 0;
		}
		item.level_icon.url = platform.cdnURL + "achievementimage/" + this._listData[index].icon + ".png";
	}
	protected onClose(): void {
		this.hide();
		hw_common.sound.playSound(SoundDef.CLICK);

	}
}