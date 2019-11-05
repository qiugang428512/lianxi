import WindowBase from "./WindowBase";
import winrank from "../fui/game/winrank";
import rankrender from "../fui/game/rankrender";
import { DataDef } from "../../def/DataDef";
import GameMgr from "../../control/game/GameMgr";
import ViewMgr from "../../control/ViewMgr";
import { WinGetAuthor } from "./WinGetAuthor";
import ViewUtils from "../../../com/hw_utils/ViewUtils";
import hw_common from "../../../com/hw_common/hw_common";
import SoundDef from "../../def/SoundDef";


export class WinRank extends WindowBase implements IShowGlobal {

	public contentPane: winrank;
	private _gobalList: any[];
	private _ranY: number;

	public constructor() {
		super();
		this.modal = true;
	}

	protected onInit(): void {
		this.contentPane = winrank.createInstance();
		this.contentPane.btn_close.onClick(this, this.onClose);
		this.contentPane.state.selectedIndex = 1;
		this.contentPane.state.on(fairygui.Events.STATE_CHANGED, this, this.onStageChange);
		this._ranY = this.contentPane.n6.displayObject.localToGlobal(new Laya.Point(0, 0)).y;
		this.contentPane.myrender.txt_name.text = "我";
		this.contentPane.myrender.txt_score.text = "未授权暂无关卡数据";
		this.initList();
	}

	private initList(): void {
		this.contentPane.n6.setVirtual();
		this.contentPane.n6.itemRenderer = Laya.Handler.create(this, this.updateGobalList, null, false);
	}

	private updateGobalList(index: number, obj: any): void {
		let item: rankrender = <rankrender><any>obj;
		let data = this._gobalList[index];
		let str: string = decodeURIComponent(data.show);
		let vaobj: any = JSON.parse(str);
		this.showItem(item, vaobj.avatarUrl, vaobj.nickName, data.dataValue, index + 1, false);
	}

	public show(): void {
		super.show();
		hw_common.platform.showBannerAd(false);
	}

	public showItem(item: rankrender, avatar: string, name: string, level: number, id: number, isme: boolean): void {
		trace("显示排行:", avatar, level);
		item.gload_head.contain.url = avatar;
		item.txt_name.text = name;
		item.txt_score.text = "第 " + level + " 关";
		item.state.selectedIndex = isme ? 1 : 0;
		item.rank3.selectedIndex = id <= 3 ? 0 : 1;
		item.gload_rank.url = null;
		if (id == 0) {
			item.txt_rank.text = "";
		}
		else if (id <= 3) {
			item.gload_rank.url = "openDataContext/assets/" + id + ".png";
		}
		else {
			item.txt_rank.text = "" + id;
		}
	}

	private onStageChange(e: Laya.Event): void {
		this.updateShow();
		hw_common.sound.playSound(SoundDef.CLICK);
	}

	private updateShow(): void {
		if (this.contentPane.state.selectedIndex == 0) {
			hw_common.platform.postMessage({ command: "close" })
			hw_common.platform.getShareSprite().removeSelf();
			if (hw_common.platform.userInfo == null) {
				ViewMgr.Inst.showWindow(WinGetAuthor, { win: this, text: "可在排行榜中显示您的头像和昵称", isFailShow: true });
			}
			else {
				this.ShowGlobal();
			}
		}
		else if (this.contentPane.state.selectedIndex == 1) {

			hw_common.platform.postMessage({ command: "close" });
			hw_common.platform.postMessage({ command: "openrank", value: "friend", top: this._ranY });
			Laya.stage.addChild(hw_common.platform.getShareSprite());
		}
	}

	//排行榜示例
	private showRank(): void {
		hw_common.platform.postMessage({ command: "close" });
		hw_common.platform.postMessage({ command: "openrank", value: "friend", top: this._ranY });
		this.contentPane.displayListContainer.addChild(hw_common.platform.getShareSprite());
	}

	public ShowGlobal(): void {
		mpsdk.SNS.rankList(DataDef.CloudStorage_BestScore).then((rankdata: any) => {
			trace("所有玩家排行榜::", rankdata);
			this._gobalList = rankdata.rank;
			this.contentPane.n6.numItems = this._gobalList.length;
			this.showItem(this.contentPane.myrender, hw_common.platform.userInfo.avatarUrl, hw_common.platform.userInfo.nickName, GameMgr.Inst.level + 1, rankdata.order, true);
		})

	}


	protected onShown(): void {
		this.contentPane.state.selectedIndex = 1;
		this.updateShow();
	}

	protected onClose(): void {
		this.hide();
		hw_common.platform.postMessage({ command: "close" });
		ViewUtils.removeSelf(hw_common.platform.getShareSprite());
		hw_common.sound.playSound(SoundDef.CLICK);
		hw_common.platform.showBannerAd(true);
	}

}
