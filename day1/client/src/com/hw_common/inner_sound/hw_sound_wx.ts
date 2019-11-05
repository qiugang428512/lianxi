import hw_sound_interface from "./hw_sound_interface";
import Dictionary from "../../hw_utils/Dictionary";

/**
 * 声音管理器 微信版
 */
export default class hw_sound_wx extends hw_sound_interface {
	/**音效字典 */
	private _soundDic: Dictionary<string, any> = null;
	/**背景音乐地址  */
	private _bgUrl: string = "";
	/**微信背景音频 */
	private _bgAudio: any = null;

	/**
	 * 构造
	 */
	constructor() {
		super();
		this._soundDic = new Dictionary<string, any>();
	}

	/**
	* 播放背景音乐。背景音乐同时只能播放一个，如果在播放背景音乐时再次调用本方法，会先停止之前的背景音乐，再播发当前的背景音乐。
	* @param url   声音文件地址。
	* @param loop    是否循环
	* @param volume    音量
	*/
	public playMusic(url: string, loop: boolean = true, volume: number = 1): void {
		if (this.bgmState) {
			url = Laya.URL.formatURL(url);
			if (this._bgUrl == url && this._bgAudio != null) {
				this._bgAudio.loop = loop;
				this._bgAudio.volume = volume;
				this._bgAudio.play();
			}
			else {
				this._bgUrl = url;
				if (this._bgAudio != null) {
					this._bgAudio.destroy();
					this._bgAudio = null;
				}
				this._bgAudio = wx.createInnerAudioContext();
				this._bgAudio.autoplay = true;
				this._bgAudio.loop = loop;
				this._bgAudio.volume = volume;
				this._bgAudio.src = this._bgUrl;
			}
		}
	}

	/**
	* 停止播放背景音乐（不包括音效）
	*/
	public stopMusic(): void {
		if (this._bgAudio != null) {
			this._bgAudio.stop();
		}
	}

	/**
	* 播放音效
	* @param url 音效地址
	* @param loop 是否循环
	* @param volume    音量
	*/
	public playSound(url: string, loop: boolean = false, volume: number = 1): void {
		if (this.soundState) {
			url = Laya.URL.formatURL(url);
			let audio = this._soundDic.getValue(url);
			if (null == audio) {
				audio = wx.createInnerAudioContext();
				audio.src = url;
				audio.volume = volume;
				audio.loop = loop;
				audio.play();
				this._soundDic.setValue(url, audio);
			}
			else {
				if (Laya.Browser.onIOS) {
					audio.seek(0);
				}
				else {
					audio.stop();
				}
				audio.play();
			}
		}
	}

	/**
	* 停止音效
	* @param url 音效地址
	*/
	public stopSound(url: string): void {
		url = Laya.URL.formatURL(url);
		let audio = this._soundDic.getValue(url);
		if (audio != null) {
			audio.stop();
		}
	}

	/**
	* 设置背景音乐音量。音量范围从 0（静音）至 1（最大音量）。
	* @param volume  音量。初始值为1。音量范围从 0（静音）至 1（最大音量）。
	*/
	public setMusicVolume(volume: number): void {
		if (this._bgAudio != null) {
			this._bgAudio.volume = volume;
		}
	}

	/**
	* 设置声音音量
	* @param volume  音量。初始值为1。音量范围从 0（静音）至 1（最大音量）。
	*/
	public setSoundVolume(volume: number): void {
		this._soundDic.values.forEach(element => {
			if (element != null) {
				element.volume = volume;
			}
		});
	}
}