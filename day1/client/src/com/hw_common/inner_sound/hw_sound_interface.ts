import EngineUtility from "../../hw_utils/EngineUtility";

/**音效基类 */
export default class hw_sound_interface {
    /**背景音开关  */
    private _bgmState: number;//0:关闭背景音,1:开启
    /**音效开关  */
    private _soundState: number;//0:关闭音效,1:开启

    /**
     * 构造
     */
    constructor() {
        // 请根据玩家具体数据赋值
        this._bgmState = 1;
        this._soundState = 1;
    }

    /**
    * 背景音乐开关
    */
    public set bgmState(value: number) {
        this._bgmState = value;
    }

    /**
    * 背景音乐开关
    */
    public get bgmState(): number {
        return this._bgmState;
    }

    /**
     * 音效开关
     */
    public get soundState(): number {
        return this._soundState;
    }

	/**
	 * 音效开关
	 */
    public set soundState(value: number) {
        this._soundState = value;
    }

    /**
	* 播放背景音乐。背景音乐同时只能播放一个，如果在播放背景音乐时再次调用本方法，会先停止之前的背景音乐，再播发当前的背景音乐。
	* @param url   声音文件地址。
	* @param loop    是否循环
	* @param volume    音量
	*/
    public playMusic(url: string, loop: boolean = true, volume: number = 1): void {
        EngineUtility.assert(false, "请在子类实现！");
    }

    /**
	* 停止播放背景音乐（不包括音效）。
	*/
    public stopMusic(): void {
        EngineUtility.assert(false, "请在子类实现！");
    }

    /**
	* 播放音效
	* @param url 音效地址
	* @param loop 是否循环
	* @param volume    音量
	*/
    public playSound(url: string, loop: boolean = false, volume: number = 1): void {
        EngineUtility.assert(false, "请在子类实现！");
    }

    /**
	* 停止音效
	* @param url 音效地址
	*/
    public stopSound(url: string): void {
        EngineUtility.assert(false, "请在子类实现！");
    }

    /**
	* 设置背景音乐音量。音量范围从 0（静音）至 1（最大音量）。
	* @param volume  音量。初始值为1。音量范围从 0（静音）至 1（最大音量）。
	*/
    public setMusicVolume(volume: number): void {
        EngineUtility.assert(false, "请在子类实现！");
    }

    /**
	* 设置声音音量
	* @param volume  音量。初始值为1。音量范围从 0（静音）至 1（最大音量）。
	*/
    public setSoundVolume(volume: number): void {
        EngineUtility.assert(false, "请在子类实现！");
    }
}