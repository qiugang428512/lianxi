import hw_sound_interface from "./hw_sound_interface";

/**
 * 声音管理器 网页版
 */
export default class hw_sound_web extends hw_sound_interface {
	/**
	 * 构造
	  */
	constructor() {
		super();
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
			let musicChannel = Laya.SoundManager.playMusic(url, loop ? 0 : 1);
			if (musicChannel) {
				musicChannel.volume = volume;
			}
		}
	}

	/**
	* 停止播放背景音乐（不包括音效）。
	*/
	public stopMusic(): void {
		Laya.SoundManager.stopMusic();
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
			let soundChannel = Laya.SoundManager.playSound(url, loop ? 0 : 1);
			if (soundChannel) {
				soundChannel.volume = volume;
			}
		}
	}

	/**
	* 停止音效
	* @param url 音效地址
	*/
	public stopSound(url: string): void {
		Laya.SoundManager.stopSound(url);
	}

	/**
	* 设置背景音乐音量。音量范围从 0（静音）至 1（最大音量）。
	* @param volume  音量。初始值为1。音量范围从 0（静音）至 1（最大音量）。
	*/
	public setMusicVolume(volume: number): void {
		Laya.SoundManager.setMusicVolume(volume);
		Laya.SoundManager.musicMuted = (0 == volume);
	}

	/**
	* 设置声音音量
	* @param volume  音量。初始值为1。音量范围从 0（静音）至 1（最大音量）。
	*/
	public setSoundVolume(volume: number): void {
		Laya.SoundManager.setSoundVolume(volume);
		Laya.SoundManager.soundMuted = (0 == volume);
	}
}