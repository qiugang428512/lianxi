import wincollectiongame from "../fui/game/wincollectiongame";
import WindowBase from "./WindowBase";
import LoadDef from "../../def/LoadDef";
import hw_common from "../../../com/hw_common/hw_common";
import SoundDef from "../../def/SoundDef";

export default class WinCollectionGame extends WindowBase {
	public contentPane: wincollectiongame;
	private _sk: Laya.Skeleton;
	public constructor() {
		super();
		this.modal = true;
	}

	protected onInit(): void {
		this.contentPane = wincollectiongame.createInstance();
		this.center();
		this._initSK();
		this.contentPane.n13.onClick(this, () => {
			this.contentPane.state.selectedIndex = 1;
			this._sk.play("idle", true, true);
		})
		this.contentPane.n21.onClick(this, () => {
			this.contentPane.state.selectedIndex = 0;
		})
		this.contentPane.n2.onClick(this, this.onClose);
	}

	private _initSK(): void {
		this._sk = new Laya.Skeleton();
		this._sk.load(LoadDef.ANI_GUIDE_COLLECT);
		this.contentPane.anipanel.displayListContainer.addChild(this._sk);
		this._sk.x = this.contentPane.anipanel.width / 2;
		this._sk.y = this.contentPane.anipanel.height / 2;
	}

	public show(param: any) {
		super.show();
		this.contentPane.state.selectedIndex = 0;
		trace("WinTips::Show->接收到窗口参数:", param);
	}

	protected onShown(): void {

	}

	protected onClose(): void {
		this.hide();
		hw_common.sound.playSound(SoundDef.BTN);
	}
}