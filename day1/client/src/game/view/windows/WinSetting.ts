import WindowBase from "./WindowBase";
import winsetting from "../fui/game/winsetting";
import ViewMgr from "../../control/ViewMgr";
import LobbyScene from "../scenes/lobby/LobbyScene";
import WinMoreGame from "./WinMoreGame";
import IconAdComponetn from "../proxy/IconAdComponetn";
import hw_common from "../../../com/hw_common/hw_common";
import SoundDef from "../../def/SoundDef";

export default class WinSetting extends WindowBase {
	public contentPane: winsetting;
	private _quake: number = 1;
	public constructor() {
		super();
		this.modal = true;
	}

	protected onInit(): void {
		this.contentPane = winsetting.createInstance();
		this.contentPane.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
		this.contentPane.btn_back.onClick(this, this._onClose);
		this.contentPane.back_home.onClick(this, this._clickBackHome);
		this.contentPane.sound_switch.onClick(this, this._clickSwitch, [{ type: 'sound' }]);
		this.contentPane.music_switch.onClick(this, this._clickSwitch, [{ type: 'music' }]);
		this.contentPane.vibration_switch.onClick(this, this._clickSwitch, [{ type: 'vibration' }]);
		this.contentPane.btn_more.onClick(this, this._clickMoreGame);
		let btn_more_spacing = 40;//广告列表开始的y坐标距离btn_more更多按钮的距离
		IconAdComponetn.Inst.addSymmetryGameIcon(this.contentPane, this.contentPane.btn_more.height + this.contentPane.btn_more.y + btn_more_spacing, 5, {
			width: 110,
			height: 110,
			columnSpacing: 20,
			lineSpacing: 20
		}, 10);
	}

	public show(param: any) {
		super.show();
		trace("WinTips::Show->接收到窗口参数:", param);
		this._updateState();
	}

	private _updateState(): void {
		this.contentPane.sound_switch.state.selectedIndex = hw_common.sound.soundState;
		this.contentPane.music_switch.state.selectedIndex = hw_common.sound.bgmState;
		this.contentPane.vibration_switch.state.selectedIndex = this._quake;
	}

	protected onShown(): void {

	}
	private _clickMoreGame() {
		ViewMgr.Inst.showWindow(WinMoreGame);
	}
	private _clickSwitch(obj: any) {
		let switchs = { 'sound': this.contentPane.sound_switch, 'music': this.contentPane.music_switch, 'vibration': this.contentPane.vibration_switch };
		if (obj && obj.type) {
			let state = switchs[obj.type].state.selectedIndex === 0 ? 1 : 0;
			switchs[obj.type].state.selectedIndex = state;
			switch (obj.type) {
				case 'sound':
					hw_common.sound.soundState = state;
					break;
				case 'music':
					hw_common.sound.bgmState = state;
					break;
				case 'vibration':
					this._quake = state;
					break;
			}
		}

	}
	private _clickBackHome() {
		this.hide();
		ViewMgr.Inst.showScene(LobbyScene);
		hw_common.sound.playSound(SoundDef.BTN);
	}
	protected _onClose(): void {
		this.hide();
		hw_common.sound.playSound(SoundDef.BTN);
	}
}