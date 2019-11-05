import hw_common from "../hw_common";
import hw_common_def from "../hw_common_def";

/*
* 服务器时间
*/
export default class hw_common_servertime {
	/*登录累计时间  */
	private _loginpass: number = 0;
	/**登录时间  */
	private _logintime: number;

	/**
	 * 初始化
	 */
	public init(): void {
		hw_common.event.once(hw_common_def.EVT_SERVER_DATA_OK, this, this._setServertime);
	}

	/**
	 * 服务器毫秒时间戳
	 */
	public get now(): number {
		if (!this._logintime) {
			return Laya.timer.currTimer;
		}
		else {
			return this._logintime + this._loginpass;
		}
	}

	/**
	 * 登陆时间
	 */
	public get loginTime(): number {
		return this._logintime;
	}

	/**
	 * @inner 设置服务器时间
	 * @param time 
	 */
	private _setServertime(serverdata: any) {
		let time: number = serverdata.server_time;
		if (!this._logintime) {
			Laya.timer.frameLoop(1, this, this._updateTime);
		}
		this._logintime = time;
	}

	/**
	 * 使用帧间隔来同步服务器时间,防止修改系统时间
	 */
	private _updateTime(): void {
		this._loginpass += Laya.timer.delta;
	}
}
