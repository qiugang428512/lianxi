import SceneBase from "../SceneBase";
import { GameShellRoot } from "./component/GameShellRoot";
import EventMgr from "../../../control/event/EventMgr";
import EventDef from "../../../def/EventDef";
import hw_common from "../../../../com/hw_common/hw_common";
import LobbyScene from "../lobby/LobbyScene";
import ViewMgr from "../../../control/ViewMgr";
import shellscene from "../../fui/game/shellscene";
import hw_common_def from "../../../../com/hw_common/hw_common_def";

export class ShellScene extends SceneBase {

	protected view: shellscene;
	private _gameRoot: GameShellRoot;

	public constructor() {
		super();
	}

	public init(): void {
		super.init();
		this._initFui();
		this._addEvent();
		this._initComp();
	}

	public show(iscomp: boolean = false): void {
		super.show();
		this._gameRoot.Start();
		hw_common.platform.showBannerAd(false);
	}

	private _initComp(): void {
		this._gameRoot = new GameShellRoot();
		this._gameRoot.Init(this.view);
	}

	private _initFui(): void {
		this.view = shellscene.createInstance();
		this.view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
		fairygui.GRoot.inst.addChild(this.view);
	}

	private _addEvent(): void {
		this.view.btn_tip.onClick(this, this._onClkTips);
		this.view.btn_back.onClick(this, this._onClkBack);
		hw_common.event.on(hw_common_def.EVT_MPSDK_PLATFORMCONFIG_OK,this,this._onConfigOver);
	}

	private _onClkBack(e: Laya.Event): void {
		ViewMgr.Inst.showScene(LobbyScene);
	}

	private _onClkTips(): void {
		hw_common.platform.showToast("暂时没有视频观看!");
	}

	private _onConfigOver(): void {
		if (hw_common.config.safe) {
			ViewMgr.Inst.showScene(LobbyScene);
		}
	}

	public dispose(): void {
		super.dispose();
	}

}