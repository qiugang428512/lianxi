import SceneBase from "../SceneBase";
import LoadMgr from "../../../control/LoadMgr";
import loadingBinder from "../../fui/loading/loadingBinder";
import sceneLoading from "../../fui/loading/sceneLoading";
import DataMgr from "../../../control/DataMgr";
import ViewMgr from "../../../control/ViewMgr";
import LoadDef from "../../../def/LoadDef";
import hw_common from "../../../../com/hw_common/hw_common";

export default class SceneLoading extends SceneBase implements interfaces.IProgress {
	protected view: sceneLoading;
	private _gameList: any[] = [];
	private _stopAnimation: boolean = false;
	public constructor() {
		super();
	}

	public init(): void {
		super.init();
		this.view = sceneLoading.createInstance();
		this.view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
		if (hw_common.platform.iswxgame == true) {
			let screenW: number = wx.getSystemInfoSync().screenWidth;
			let screenH: number = wx.getSystemInfoSync().screenHeight;
			// 苹果手机 Laya loading界面适配没起作用，手动调整
			let stageW = Laya.stage.width;
			let stageH = Laya.stage.height;
			if (stageW == 720 && stageH == 1280) {//没有自动适配好，手动适配
				let adapteH = Math.ceil(screenH / screenW * 720);
				this.view.height = adapteH;
			}

		}
		fairygui.GRoot.inst.addChild(this.view);
		this.addSearchAnimation();
	}
	private addSearchAnimation(index?: number) {
		let posArr = [{ x: -30, y: -30 }, { x: 0, y: 30 }, { x: 30, y: 0 }];//坐标
		index = index || 0;
		Laya.Tween.to(this.view.n18.search_img, { x: this.view.n18.search_img.x + posArr[index].x, y: this.view.n18.search_img.y + posArr[index].y }, 300, null, Laya.Handler.create(this, () => {
			index++;
			if (index >= posArr.length) {
				index = 0;
			}
			this.addSearchAnimation(index);
		}));
	}
	private loadIdx = 0;
	public OnProgress(current: number, total: number): void {
		this.loadIdx += 1;
		let text = "玩命加载中...";
		if (LoadMgr.Inst.isLoadGameResOver) {
			text = "题库加载中...";
		}
		let str = (current * 100).toFixed(2);
		this.view.txt_loading.text = text + "(" + `${str}` + "%)";
		trace(`Loading...${current}/${total}`);
	}
	public hide(): void {
		super.hide();
		Laya.Tween.clearTween(this.view.n18.search_img);
	}

}