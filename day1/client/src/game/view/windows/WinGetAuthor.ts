import WindowBase from "./WindowBase";
import winauthor from "../fui/game/winauthor";
import SoundDef from "../../def/SoundDef";
import hw_common from "../../../com/hw_common/hw_common";

export class WinGetAuthor extends WindowBase {
	public contentPane: winauthor;
	private _number: number = 1;
	private _win: IShowGlobal;
	private _text: string = "";
	private _isFailShow: boolean;
	public constructor() {
		super();
		this.modal = true;
	}

	protected onInit(): void {
		this.contentPane = winauthor.createInstance();
		this.center();

		this.contentPane.btn_ok.onClick(this, this.onBtnGoon);
	}
	public show(param: { win: IShowGlobal, text: string, isFailShow: boolean }): void {
		this._win = param.win;
		this._text = param.text;
		this._isFailShow = param.isFailShow;
		super.show();
	}

	protected onShown(): void {
		trace("显示");
		this.contentPane.t2.text = this._text;
		hw_common.sound.playSound(SoundDef.CLICK);
		hw_common.platform.getUserInfo().then((res) => {
			this.hide();
			if (res) {
				trace("拉取授权test1", res);
				let temp: mpsdk.IUserInfo = {};
				temp.avatarUrl = res.avatarUrl;
				temp.gender = res.gender;
				temp.nickName = res.nickName;
				mpsdk.Account.setAccountInfo(temp);
				if (hw_common.platform.userInfo.gender == null) {
					mpsdk.Account.setAccountActive(mpsdk.constant.ActiveType.GET_USER_INFO, 0)
				}
				else {
					mpsdk.Account.setAccountActive(mpsdk.constant.ActiveType.GET_USER_INFO, hw_common.platform.userInfo.gender)
				}
				if (this._win.ShowGlobal) {
					this._win.ShowGlobal();
				}
			}
			else {
				trace("拉取授权test2", res);
				hw_common.platform.showToast("拉取授权失败，请稍后重试");
				if (this._isFailShow == true) {
					if (this._win.ShowGlobal) {
						this._win.ShowGlobal();
					}
				}
			}

		}).catch((e) => {
			trace("拉取授权test3", e);
			hw_common.platform.showToast("拉取授权失败，请稍后重试");
			this.hide();
		})
	}

	protected onBtnGoon(): void {
		this.hide();
	}

}