import ConfigMgr from "./ConfigMgr";
import GameMgr from "./game/GameMgr";
import GameDef from "../def/GameDef";
import LevelConfig from "../model/confvo/LevelConfig";
import hw_common from "../../com/hw_common/hw_common";
import LoadDef from "../def/LoadDef";
import EventDef from "../def/EventDef";
import EventMgr from "./event/EventMgr";

/**
 * 加载控制器
 */
export default class LoadMgr {

	private static _INST: LoadMgr;
	private _progres: interfaces.IProgress;

	public isLoadGameResOver = false; //是否加载完"game"组的资源
	public isLoadOldUserRes = false;//是否加载高级用户的资源

	public constructor() {

	}

	public static get Inst(): LoadMgr {
		if (LoadMgr._INST == null) {
			LoadMgr._INST = new LoadMgr();
			LoadMgr._INST.init();
		}
		return LoadMgr._INST;
	}

	private init(): void {
	}

	public set loadingReport(rp: interfaces.IProgress) {
		this._progres = rp;
	}

	//加载loading所需的资源
	public async loadLoading() {
		Laya.loader.load(LoadDef.RES_LOADING, Laya.Handler.create(this, (res) => {
			trace("LoadMgr::loadLoading->加载完成", res);
			EventMgr.Inst.event(EventDef.RES_LOADINGOVER);
		}), null, null, 0).once(Laya.Event.ERROR, this, (e) => {
			trace("[error]LoadMgr::LoadLoading->加载异常", e);
		});
	}

	//加载游戏所需的资源
	public async loadGame() {
		this._resetGameGroup();
		Laya.loader.load(LoadDef.Res_Game, Laya.Handler.create(this, () => {
			LoadMgr.Inst.isLoadGameResOver = true;
			EventMgr.Inst.event(EventDef.RES_GAMEOVER);
		}), Laya.Handler.create(this, (curProgress) => {
			this._progres.OnProgress(curProgress, LoadDef.Res_Game.length);
		}, null, false), null, 0).once(Laya.Event.ERROR, this, (e) => {
			trace("[error]LoadMgr::Res_Game=>加载异常", e);
		});
	}

	//根据游戏存档数据,动态设置加载资源
	private _resetGameGroup(): void {
		let list: any[] = LoadDef.Res_Game;
	}

	//后台加载动态资源
	public loadDynamic(): void {

	}

	public getLevelImage(conf: LevelConfig): string[] {
		let urllist: string[] = [];
		if (conf.rimg1) {
			urllist[0] = conf.rimg1
		} else {
			urllist[0] = this._getloadUrl(conf.img1)
		}
		if (conf.rimg2) {
			urllist[1] = conf.rimg2
		} else {
			urllist[1] = this._getloadUrl(conf.img2)
		}
		return urllist;
	}

	private _getloadUrl(url: string): string {
		if (GameMgr.Inst.level > ConfigMgr.Inst.MaxLevel) {
			return platform.cdnURL + "levelimage/" + url + ".jpg";
		}
		else {
			return "res/quizimg/" + url + ".jpg";
		}
	}
}