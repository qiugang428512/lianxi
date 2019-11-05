import hw_common from "../hw_common";
import hw_common_def from "../hw_common_def";

export default class hw_common_serverdata {
	private _starttime: number;
	private _serverversion: number;
	public _init() {
		this._starttime = Date.now();
		hw_common.event.once(hw_common_def.EVT_MPSDK_ACCOUNT_OK, this, this._getServerVersion);
	}
	private _getVersion(): number {
		let ver: number = +Laya.LocalStorage.getItem(hw_common_def.LOCS_SD_VER);
		return ver;
	}
	private _addVersion(): void {
		let ver: number = this._getVersion();
		ver++;
		Laya.LocalStorage.setItem(hw_common_def.LOCS_SD_VER, ver + "");
	}
	private _setVerion(ver: number): void {
		Laya.LocalStorage.setItem(hw_common_def.LOCS_SD_VER, ver + "");
	}
	private _loadDataOver(data: any = null): void {
		let hasdata: string = data != null ? "1" : "0";
		let cost: number = Date.now() - this._starttime;
		hw_common.event.event(hw_common_def.EVT_SD_SERVERDATA_OK, data);
		hw_common.mpsdk.reportEvent(hw_common_def.REPORT_SERVERDATA_OK, hasdata, cost + "");
	}
	//获取存档版本号
	private _getServerVersion(): void {
		if (platform.debug) {
			Laya.timer.once(1, this, () => {
				hw_common.event.event(hw_common_def.EVT_SD_SERVERDATA_OK);
			});
			return;
		}
		var url: string = hw_common_def.URL_GET_VERSIONEND + "?gameId=" + hw_common.config.gameid + "&openId=" + hw_common.mpsdk.openid + "&dataKey=" + hw_common.config.gamePath;
		var xhr: Laya.HttpRequest = new Laya.HttpRequest();
		xhr.http.timeout = 2000;//设置超时时间；
		xhr.once(Laya.Event.COMPLETE, this, this.onVersion);
		xhr.once(Laya.Event.ERROR, this, this.onServerError);
		xhr.send(url, "", "get", "text");
	}
	private onServerError(data: any): void {
		trace("hw_common_serverdata::onServerError->", data);
		hw_common.platform.showModal("网络连接失败，请重试", () => {
			hw_common.platform.exitMiniProgram();
		});
	}

	private onVersion(e: any): void {
		let serverdata = JSON.parse(e);
		hw_common.event.event(hw_common_def.EVT_SERVER_DATA_OK, [serverdata]);
		let version: number = this._getVersion();
		trace("hw_common_serverdata::onVersion->服务器版本信息", serverdata, "本地版本:", version);
		if (version) {
			if (serverdata.version == null || serverdata.version > 999999) serverdata.version = 0;
			//本地有存档
			if (version >= serverdata.version) {
				//本地版本高,进游戏,发送本地数据给服务器
				trace("hw_common_serverdata::onVersion->本地版本高,使用本地版本")
				this._loadDataOver();
			}
			else if (version < serverdata.version) {
				//本地版本低,使用服务器存档
				trace("hw_common_serverdata::onVersion->本地版本低,使用服务器存档", version, serverdata.version);
				this._serverversion = serverdata.version;
				this.getServerData();
			}
			else {
				//版本号相等，啥都不干
				trace("hw_common_serverdata::onVersion->版本号相等，啥都不干", version, serverdata.version);
				this._loadDataOver();
			}
		}
		else {
			//本地无存档
			if (serverdata.version) {
				//服务器有存档,使用服务器存档
				trace("hw_common_serverdata::onVersion->服务器有存档,使用服务器存档", version, serverdata.version);
				this._serverversion = serverdata.version;
				this.getServerData();
			}
			else {
				//服务器无存档->新用户
				trace("hw_common_serverdata::onVersion->服务器无存档->新用户", version, serverdata.version);
				this._loadDataOver();
			}
		}
	}
	/**
	 * 发送本地数据
	 * @param data:any类型可以转为json的数据
	 */
	public sendDataToServer(data: any): void {
		if (platform.debug) {
			return;
		}
		//需要压缩的大数据
		if (data == null) {
			console.error("hw_common_serverdata::SendDataToServer->发送数据错误");
			return;
		}
		try {
			var str: string = JSON.stringify(data);
		} catch (error) {
			error("hw_common_serverdata::SendDataToServer->Json转换错误", error);
			return;
		}
		this._addVersion();
		var zip = new JSZip();
		zip.file("data.txt", str);
		var content: string = zip.generate({ 'compression': 'DEFLATE' });
		var data: any = {};
		data.gameId = hw_common.config.gameid + "";
		data.openId = hw_common.mpsdk.openid + "";
		data.version = this._getVersion() + "";
		data.data = content + "";
		data.dataKey = hw_common.config.gamePath + "";
		data = JSON.stringify(data);
		var url: string = hw_common_def.URL_POST_SAVEEND;
		var xhr: Laya.HttpRequest = new Laya.HttpRequest();
		xhr.http.timeout = 2000;//设置超时时间；
		xhr.once(Laya.Event.COMPLETE, this, (data: any) => { trace("hw_common_serverdata::sendDataToServer->发送成功", data) });
		xhr.once(Laya.Event.ERROR, this, (data: any) => { trace("hw_common_serverdata::sendDataToServer->发送失败", data) });
		xhr.send(url, data, "post", "text", ["Content-Type", "text/plain;charset=UTF-8"]);
		trace("hw_common_serverdata::sendDataToServer->本地版本高,发送本地数据给服务器", "version:", data.version);
	}
	private getServerData(): void {
		var url: string = hw_common_def.URL_Get_GetEnd + "?gameId=" + hw_common.config.gameid + "&openId=" + hw_common.mpsdk.openid + "&dataKey=" + hw_common.config.gamePath;
		var xhr: Laya.HttpRequest = new Laya.HttpRequest();
		xhr.http.timeout = 2000;//设置超时时间；
		xhr.once(Laya.Event.COMPLETE, this, this.onServerData);
		xhr.once(Laya.Event.ERROR, this, this.onServerError);
		xhr.send(url, "", "get", "text");
		trace("hw_common_serverdata::getServerData->服务器版本高,同步服务器数据");
	}
	private onServerData(e: any): void {
		//使用服务器数据
		try {
			var obj: any = JSON.parse(e);
		} catch (error) {
			error("hw_common_serverdata::onServerData->接收服务器数据成功,解析json失败", error);
			return;
		}
		let zip: JSZip = new JSZip(obj.data, { base64: true });
		var content: string = zip.file("data.txt").asText();
		var alldata: any = JSON.parse(content);
		this._setVerion(this._serverversion);
		this._loadDataOver(alldata);
		trace("hw_common_serverdata::onServerData->解析服务器数据成功", alldata);
	}

	/**
	 * 获取题库
	 * @param level 题库的关卡id
	 */
	public async loadQuiz(level: number): Promise<any> {
		return new Promise((resolve, reject) => {
			var url: string = hw_common_def.URL_GET_QUZI + "?gameId=" + hw_common.config.gameid + "&openId=" + hw_common.mpsdk.openid + "&quizId=" + level;
			if (platform.debug) {
				url = hw_common_def.URL_GET_QUZI + "?gameId=" + hw_common.config.gameid + "&openId=ofnCZ5ZQLAlKWnSBhhzcRzhrEzzz&quizId=" + level;
			}
			var xhr: Laya.HttpRequest = new Laya.HttpRequest();
			xhr.http.timeout = 5000;//设置超时时间；
			xhr.once(Laya.Event.COMPLETE, this, (e) => {
				let serverdata = JSON.parse(e);
				trace("hw_common_serverdata::loadQuiz->获取服务器数据成功:", serverdata);
				if (serverdata && serverdata.Ques && serverdata.Ques.quiz) {
					resolve(serverdata.Ques.quiz);
				}
				else if (serverdata && serverdata.error == 1001) {
					console.warn("hw_common_serverdata::loadQuiz->账号登陆失败,请重新登陆~")
					reject(serverdata);
				}
				else if (serverdata && serverdata.error == 1003) {
					console.warn("hw_common_serverdata::loadQuiz->后续关卡正在加急制作中，请稍后~")
					reject(serverdata);
				}
				else if (serverdata && serverdata.error == 1002) {
					console.warn("hw_common_serverdata::loadQuiz->未知错误,请重新登陆~")
					reject(serverdata);
				}
				hw_common.mpsdk.reportEvent(hw_common_def.REPORT_LOADQUIZ_OK, level + "", serverdata.error + "")
			});
			xhr.once(Laya.Event.ERROR, this, (e) => {
				console.warn("hw_common_serverdata::loadQuiz->题库获取失败,请检查网络连接~");
				reject({ error: 1004 });
				hw_common.mpsdk.reportEvent(hw_common_def.REPORT_LOADQUIZ_OK, level + "", "1003")
			});
			xhr.send(url, "", "get", "text");
		})
	}

	/**
	 * 获取客服奖励
	 */
	public getOpenCSGift(): Promise<any> {
		return new Promise((resolve, reject) => {
			trace("hw_common_serverdata::getOpenCSGift->开始领取客服体力");
			var url: string = hw_common_def.URL_GET_CSGIFT + "?gameId=" + hw_common.config.gameid + "&openId=" + hw_common.mpsdk.openid;
			var xhr: Laya.HttpRequest = new Laya.HttpRequest();
			xhr.http.timeout = 5000;//设置超时时间；
			xhr.once(Laya.Event.COMPLETE, this, (e) => {
				let serverdata = JSON.parse(e);
				trace("hw_common_serverdata::getOpenCSGift->获取到服务器数据:", serverdata);
				if (serverdata && (serverdata.result == 1 || serverdata.result == "1")) {
					trace("hw_platform::_onCSGift->获取客服奖励成功");
					resolve(serverdata);
				}
				else {
					trace("hw_platform::_onCSGift->获取客服奖励失败");
					reject(serverdata);
				}
			});
			xhr.once(Laya.Event.ERROR, this, (e) => {
				console.warn("hw_platform::_onCSGift->获取客服奖励异常");
				reject(e);
			});
			xhr.send(url, "", "get", "text");
		});
	}
}