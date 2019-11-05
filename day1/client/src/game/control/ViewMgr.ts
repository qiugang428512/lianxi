import SceneBase from "../view/scenes/SceneBase";
import WindowBase from "../view/windows/WindowBase";
import LoadDef from "../def/LoadDef";
import gameBinder from "../view/fui/game/gameBinder";
import loadingBinder from "../view/fui/loading/loadingBinder";
import EventMgr from "./event/EventMgr";
import EventDef from "../def/EventDef";

export default class ViewMgr {
	private static _INST: ViewMgr;

	private _stage: Laya.Stage = null;
	private _currentScene: SceneBase;
	private _winList: WindowBase[] = [];
	private _queueList: WinQueue[] = [];
	private _sceneList: SceneBase[] = [];
	private _bindPkgList: string[] = [];
	private _versiontxt: Laya.Text;

	public constructor() {
	}

	public static get Inst(): ViewMgr {
		if (ViewMgr._INST == null) {
			ViewMgr._INST = new ViewMgr();
		}
		return ViewMgr._INST;
	}

	public get currentScene(): SceneBase {
		return this._currentScene;
	}

	public get stage(): Laya.Stage {
		return this._stage;
	}

	public get stageWidth(): number {
		return this._stage.width;
	}

	public get stageHeight(): number {
		return this._stage.height;
	}

	/**
	 * 是否已经绑定了包
	 * @param pkgname 
	 */
	public pkgBinded(pkgname: string): boolean {
		return this._bindPkgList.indexOf(pkgname) >= 0;
	}

	private setStage(s: Laya.Stage) {
		if (this._stage) {
			trace("[error]ViewMgr::Stage->舞台不可赋值两次");
			return;
		}
		this._stage = s;
	}

	public init(): void {
		this.setStage(Laya.stage);
		this.initFUI();
	}

	private initFUI(): void {
		fairygui.UIConfig.packageFileExtension = "obj";
		fairygui.UIConfig.defaultFont = "微软雅黑";
		fairygui.UIConfig.modalLayerColor = "rgba(0,0,0,0.9)";
		Laya.stage.addChild(fairygui.GRoot.inst.displayObject);
		fairygui.GRoot.inst.width = Laya.stage.width;
		fairygui.GRoot.inst.height = Laya.stage.height;
	}

	/**
	 * 绑定fairgui的资源包,在使用某个资源包前一定要绑定该资源包
	 * @param pkgname 
	 */
	public bindFUI(pkgname: string): void {
		if (this._bindPkgList.indexOf(pkgname) >= 0) {
			return;
		}
		switch (pkgname) {
			case LoadDef.PkgName_Game:
				fairygui.UIPackage.addPackage(pkgname);
				gameBinder.bindAll();
				this._bindPkgList.push(pkgname);
				break;
			case LoadDef.PKGNAME_LOADING:
				fairygui.UIPackage.addPackage(pkgname);
				loadingBinder.bindAll();
				this._bindPkgList.push(pkgname);
				break;
			default:
				break;
		}
	}

	/**
	 * 根据队列显示窗口,在队列中的窗口会按顺序依次显示
	 * @param cls 
	 * @param param 
	 */
	public showWindowByQueue(cls: any, param: any = null): void {
		if (this._queueList.length == 0) {
			this.showWindow(cls, param);
		}
		else {
			this._pushQueue(cls, param);
		}

	}

	private _pushQueue(cls: any, param: any = null): void {
		let wq: WinQueue = new WinQueue();
		wq.wincls = cls;
		wq.param = param;
		this._queueList.push(wq);
	}

	/**判断某窗口是否在队列中 */
	public isWindowInQueue(win: WindowBase): boolean {
		for (let i: number = this._queueList.length - 1; i >= 0; i--) {
			let wq: WinQueue = this._queueList[i];
			if (win instanceof wq.wincls) {
				return true;
			}
		}
		return false;
	}

	/**隐藏窗口不显示 */
	public hideWindow(win: WindowBase): void {
		let inquene: boolean = false;
		for (let i: number = 0; i < this._queueList.length; i++) {
			let wq: WinQueue = this._queueList[i];
			if (win instanceof wq.wincls) {
				inquene = true;
				this._queueList.splice(i, 1);
				break;
			}
		}
		if (inquene && this._queueList.length > 0) {
			this.showWindow(this._queueList[0].wincls, this._queueList[0].param);
		}
		EventMgr.Inst.event(EventDef.UI_HIDEWINDOW, win);
	}

	/**
	 * 显示窗口
	 * @param cls 窗口类
	 * @param param 窗口显示需要的参数
	 */
	public showWindow(cls: any, param: any = null): void {
		for (var i: number = this._winList.length - 1; i >= 0; i--) {
			let win: WindowBase = this._winList[i];
			if (win instanceof cls) {
				this._winList.splice(i, 1);
				this._showWin(win, param);
				return;
			}
		}
		let win: WindowBase = new cls();
		this._showWin(win, param);
	}

	private _showWin(win: WindowBase, param: any): void {
		this._winList.push(win);
		win.show(param);
		EventMgr.Inst.event(EventDef.UI_SHOWWINDOW, win);
	}

	/**
	 * 获取缓存的单例窗口
	 * @param cls 
	 */
	public getWindow(cls: any): fairygui.Window {
		for (var i of this._winList) {
			if (i instanceof cls) {
				return i;
			}
		}
		return null;
	}

	/**判断某窗口是否正在显示中 */
	public isWindowShow(cls: any): boolean {
		for (var i of this._winList) {
			if (i instanceof cls) {
				return i.isShowing;
			}
		}
		return false;
	}

	/**
	 * 显示场景
	 * @param  {any} cls 类
	 * @param  {any=null} param
	 * @returns {view.SceneBase}
	 */
	public showScene(cls: any, param: any = null): SceneBase {
		if (this._currentScene instanceof cls) {
			trace("[error]ViewMgr::CreateScene->创建场景与当前场景相同");
			return;
		}
		if (this._currentScene) {
			this._currentScene.hide();
			this._currentScene = null;
		}
		for (var i of this._sceneList) {
			if (i instanceof cls) {
				i.show(param);
				this._currentScene = i;
				return i;
			}
		}
		this._currentScene = new cls();
		this._currentScene.init();
		this._currentScene.show(param);
		this._sceneList.push(this._currentScene);
		return this._currentScene;
	}

	/**
	 * 获取缓存的单例场景
	 * @param cls
	 */
	public getScene(cls: any): SceneBase {
		for (var i of this._sceneList) {
			if (i instanceof cls) {
				return i;
			}
		}
		return null;
	}

	/**添加游戏版本号 */
	public addVersionLabel(str: string = ""): void {
		if (this._versiontxt == null) {
			this._versiontxt = new Laya.Text();
			this._versiontxt.color = "666666";
			this._versiontxt.fontSize = 20;
			this._versiontxt.bold = true;
		}
		this._versiontxt.text = platform.version + ":" + str;
		ViewMgr.Inst.stage.addChild(this._versiontxt);
		this._versiontxt.x = ViewMgr.Inst.stageWidth - this._versiontxt.width;
	}
}

class WinQueue {
	public wincls: any;
	public param: any;
}