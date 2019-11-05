import hw_common from "../../com/hw_common/hw_common";
import hw_common_def from "../../com/hw_common/hw_common_def";
import EventDef from "../def/EventDef";
import LoadMgr from "./LoadMgr";
import SceneLoading from "../view/scenes/loading/SceneLoading";
import ViewMgr from "./ViewMgr";
import ReportDef from "../def/ReportDef";
import GameMgr from "./game/GameMgr";
import EventMgr from "./event/EventMgr";
import ConfigMgr from "./ConfigMgr";
import LobbyScene from "../view/scenes/lobby/LobbyScene";
import SoundDef from "../def/SoundDef";
import LoadDef from "../def/LoadDef";
import { SceneID_WX } from "../../com/hw_utils/SceneID_WX";
import WinOfflineBox from "../view/windows/WinOfflineBox";
import GameDef from "../def/GameDef";
import WinGetReward, { WinGetReward_Param } from "../view/windows/WinGetReward";
import { ECurrencyType } from "../def/ECurrencyType";
import WinLuckDraw from "../view/windows/WinLuckDraw";
import WinSetting from "../view/windows/WinSetting";
/**
 * 流程控制器
 */
export default class ProcessMgr {
	private static _INST: ProcessMgr;
	private _dataOk: boolean = false;
	private _loadingOk: boolean = false;
	private _loadgameStartTM: number;

	public constructor() {
	}

	public static get Inst(): ProcessMgr {
		if (ProcessMgr._INST == null) {
			ProcessMgr._INST = new ProcessMgr();
		}
		return ProcessMgr._INST;
	}

	public Start(): void {
		hw_common.event.once(hw_common_def.EVT_SD_SERVERDATA_OK, this, this._dataOver);
		EventMgr.Inst.once(EventDef.RES_LOADINGOVER, this, this._loadingOver);
		LoadMgr.Inst.loadLoading();
	}

	private _loadingOver(): void {
		ViewMgr.Inst.bindFUI(LoadDef.PKGNAME_LOADING);
		LoadMgr.Inst.loadingReport = <SceneLoading>ViewMgr.Inst.showScene(SceneLoading);
		this._loadingOk = true;
		this._toLoadGame();
		hw_common.mpsdk.reportEvent(ReportDef.EVENT_SHOWLOADING);
	}

	private _dataOver(serverdata: any): void {
		this._dataOk = true;
		GameMgr.Inst.init(serverdata);
		this._toLoadGame();
	}

	private _toLoadGame(): void {
		if (this._dataOk && this._loadingOk) {
			this._loadGame();
		}
	}

	private _loadGame(): void {
		EventMgr.Inst.once(EventDef.RES_GAMEOVER, this, this._loadGameOver);
		LoadMgr.Inst.loadGame();
		this._loadgameStartTM = hw_common.servertime.now;
	}

	private _loadGameOver(): void {
		ViewMgr.Inst.bindFUI(LoadDef.PkgName_Game);
		ConfigMgr.Inst.init();
		this._enterGame();
		let delay: number = hw_common.servertime.now - this._loadgameStartTM;
		hw_common.mpsdk.reportEvent(ReportDef.EVENT_LOADINGOVER, delay + "");
	}

	private _enterGame() {
		trace("进入游戏！！！！！！！！！！！！")
		if (GameMgr.Inst.level < 2) {
			GameMgr.Inst.goGame();
			hw_common.mpsdk.reportEvent(ReportDef.EVENT_INLOBBY);
		}
		else {
			ViewMgr.Inst.showScene(LobbyScene);
			hw_common.mpsdk.reportEvent(ReportDef.EVENT_INLOBBY);
		}
		LoadMgr.Inst.loadDynamic();
		this._exeLoginWin();
	}

	//处理登陆弹窗
	private _exeLoginWin(): void {
		//监听游戏切到前台
		hw_common.event.on(hw_common_def.EVT_PLATFORM_ONSHOW, this, this._onPlatformShow);
		//进入游戏后先触发一次,判断游戏进入场景值
		this._onPlatformShow(false);
		this.showOffLineBox();
	}

	//游戏切到前台
	private _onPlatformShow(ishot: boolean = true): void {
		trace("ProcessMgr::_onPlatformShow->小游戏切到前台");
		this._onShowWhereIn();
		this._onShowTryPlay();
		hw_common.platform.ShowInBy(SceneID_WX.COLLECT);
		if (hw_common.sound.bgmState) hw_common.sound.playMusic(SoundDef.BGM);;
	}

	public showOffLineBox(): void {
		trace("判断离线宝箱:")
		if (hw_common.servertime.now - GameMgr.Inst.data.other.gotofflinetm > GameDef.OFFLINEREWARDS_DELAY) {
			ViewMgr.Inst.showWindowByQueue(WinOfflineBox);
		}
	}

	//切到前台,判断场景值
	private _onShowWhereIn(): void {
		if (!GameMgr.Inst.getHasGetDailyColReward() && hw_common.platform.ShowInBy(SceneID_WX.COLLECT)) {
			this._getColReward();
		}
		if (!GameMgr.Inst.isHadGetFloatingWindow() && hw_common.platform.ShowInBy(SceneID_WX.FLOATWIN)) {
			this._getFloatingWinReward();
		}
	}

	//获取收藏奖励
	private _getColReward(): void {
		ViewMgr.Inst.showWindowByQueue(WinGetReward,
			new WinGetReward_Param(ECurrencyType.ENERGY, GameDef.COLLECTREWARDS_ENERGY_NUM, true, "", SceneID_WX.COLLECT));
	}

	//获取浮窗奖励
	private _getFloatingWinReward(): void {
		ViewMgr.Inst.showWindowByQueue(WinGetReward,
			new WinGetReward_Param(ECurrencyType.ENERGY, GameDef.FLOATREWARDS_ENERGY_NUM, true, "", SceneID_WX.FLOATWIN));
	}
	private _onShowTryPlay(): void {

	}

}