import { EDataType } from "../def/EDataType";

export default class DataMgr {

	private static _INST: DataMgr;

	public constructor() {
	}

	public static get Inst(): DataMgr {
		if (DataMgr._INST == null) {
			DataMgr._INST = new DataMgr();
		}
		return DataMgr._INST;
	}

	public getDataByKey(key: string, type: EDataType): any {
		let data: string = Laya.LocalStorage.getItem(key);
		switch (type) {
			case EDataType.Number:
				return +data;
			case EDataType.String:
				if (data == "" || data == null) {
					return null;
				}
				return data;
			case EDataType.Any:
				if (data == "" || data == null) {
					return null;
				}
				return JSON.parse(data);
			default:
				return data;
		}
	}

	public setDataByKey(key: string, data: any, type: EDataType): void {
		let str: string;
		switch (type) {
			case EDataType.Number:
				str = data + "";
				break;
			case EDataType.String:
				str = data;
				break;
			case EDataType.Any:
				if (data == "" || data == null) {
					trace("[error]DataMgr::SetDataByKey->为啥存了一个空Json??");
					return;
				}
				str = JSON.stringify(data);
				break;
			default:
				str = data;
		}
		if (window["wx"]) {
			//因为这个是微信的异步存储,不会引起游戏卡顿.所以用这个.这样修改后,同一个线程不允许先写后读;
			wx.setStorage({ key: key, data: str });
		}
		else {
			Laya.LocalStorage.setItem(key, str);
		}
	}
}