import winaddfloat from "../fui/game/winaddfloat";
import WindowBase from "./WindowBase";
import hw_common from "../../../com/hw_common/hw_common";
import SoundDef from "../../def/SoundDef";

export default class WinAddFloat extends WindowBase {
	public contentPane: winaddfloat;
	private _isbannerShow: boolean;
	public constructor() {
		super();
		this.modal = true;
	}

	protected onInit(): void {
		this.contentPane = winaddfloat.createInstance();
		this.center();
		this.contentPane.btn_Close.onClick(this, this.onClose);
	}

	public show(param: any) {
		super.show();
		trace("WinTips::Show->接收到窗口参数:", param);
		hw_common.platform.showBannerAd(false);
	}

	protected onShown(): void {

	}

	protected onClose(): void {
		this.hide();
		hw_common.sound.playSound(SoundDef.CLICK);
		hw_common.platform.showBannerAd(true);
	}
}