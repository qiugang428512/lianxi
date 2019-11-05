import WordStruct from "../model/struct/WordStruct";
import LevelConfig from "../model/confvo/LevelConfig";
import LoadDef from "../def/LoadDef";
import ConfigDef from "../def/ConfigDef";
import LevelGift from "../model/confvo/LevelGift";

export default class ConfigMgr {
	private static _INST: ConfigMgr;
	private allConfig: any = {};
	private _maxlevel: number = 0;
	public get MaxLevel(): number {
		return this._maxlevel;
	}
	public constructor() {
	}

	public static get Inst(): ConfigMgr {
		if (ConfigMgr._INST == null) {
			ConfigMgr._INST = new ConfigMgr();
		}
		return ConfigMgr._INST;
	}

	public init() {
		trace("ConfigMgr::Init->开始读取配置表");
		let byte: ArrayBuffer = Laya.loader.getRes(LoadDef.ConfigUrl);
		let zip = new JSZip(byte);
		let reg: RegExp = /.*?/;
		let jlist: JSZipObject[] = zip.file(reg);
		for (let i of jlist) {
			trace("ConfigMgr::Init->开始读取配置表", i.name);
			this.allConfig[i.name] = this.resetData(i.name, JSON.parse(i.asText()));
		}
		trace("ConfigMgr::Init->配置表读取完成");
		this._setMaxLevel();
	}

	private _setMaxLevel(): void {
		let oblist: LevelConfig[] = this.GetConfigByName(ConfigDef.LevelData);
		let ml: number = 0;
		for (let i of oblist) {
			if (i.id > ml) {
				ml = i.id;
			}
		}
		this._maxlevel = ml;
	}


	private resetData(name: string, obj: any): any {
		let itemcls: any = null;
		switch (name) {
			case ConfigDef.LevelData:
				itemcls = LevelConfig;
				break;
			case ConfigDef.LevelGift:
				itemcls = LevelGift;
				break;
			default:
				break;
		}
		if (itemcls) {
			for (let i in obj) {
				let ic: any = new itemcls(obj[i]);
				obj[i] = ic;
			}
		}
		return obj;
	}

	/**
	* 根据配置表文件名获取配置文件,宏定义在LoadDef中
	*/
	public GetConfigByName(configresname: string): any {
		let obj: any = this.allConfig[configresname];
		return obj;
	}

	/**
     * 根据配置表文件名和id获取数据条目
     */
	public GetVOByNameAndID(configresname: string, configid: number, idname: string = "id"): any {
		let obj: any = this.allConfig[configresname];
		if (obj == null || configid == null) {
			trace("ConfigMgr::GetVOByNameAndID->没有发现该名字的配置");
			return null;
		}
		for (var i of obj) {
			if (i[idname] == configid) {
				return i;
			}
		}
		return null;
	}
}