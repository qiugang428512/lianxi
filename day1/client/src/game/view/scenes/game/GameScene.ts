import SceneBase from "../SceneBase";
import gamescene from "../../fui/game/gamescene";
import GameRoot from "./component/GameRoot";
import LoadDef from "../../../def/LoadDef";
import gameBinder from "../../fui/game/gameBinder";
import LobbyScene from "../lobby/LobbyScene";
import ViewMgr from "../../../control/ViewMgr";
import ReportDef from "../../../def/ReportDef";
import GameMgr from "../../../control/game/GameMgr";
import EventMgr from "../../../control/event/EventMgr";
import EventDef from "../../../def/EventDef";
import SoundDef from "../../../def/SoundDef";
import { ECurrencyType } from "../../../def/ECurrencyType";
import ProxyGoldBtn from "../../proxy/ProxyGoldBtn";
import GameDef from "../../../def/GameDef";
import LoadMgr from "../../../control/LoadMgr";
import GameEvent from "../../../control/event/GameEvent";
import hw_common from "../../../../com/hw_common/hw_common";
import TimeMgr, { TimeBindType } from "../../../control/TimeMgr";
import SharePointKeyDef from "../../../def/SharePointKeyDef";
import ViewUtils from "../../../../com/hw_utils/ViewUtils";
import GuideMgr from "../../../control/game/GuideMgr";

export default class GameScene extends SceneBase {

	protected view: gamescene;
	private _gameRoot: GameRoot;
	private _canShare: boolean;
	private _helpAniTM: number;
	public constructor() {
		super();
	}
	public init(): void {
		super.init();
		this._initFui();
		this._addEvent();
		this._initComp();
		this._updateHelpBtn();
	}
	public show(iscomp: boolean = false): void {
		super.show();
		this._gameRoot.Start();
		this._hideBanner(true);
		this._updateLinkIcon();
		this._starthelpAni();
		this._showBeyond();
		TimeMgr.Inst.addTimeEvent(10000, TimeBindType.Loop, this._updateLinkIcon, this);
	}
	//排行榜示例
	private _showBeyond(): void {
		if (GameMgr.Inst.level < 2) {
			return;
		}
		let topy: number = this.view.btn_tip.localToGlobal(0, 0).y;
		hw_common.platform.postMessage({ command: "close" });
		hw_common.platform.postMessage({ command: "beyond", value: GameMgr.Inst.level, top: topy + 10 });
		this.view.displayListContainer.addChild(hw_common.platform.getShareSprite(2000));
	}
	public hide(): void {
		super.hide();
		this._gameRoot.Stop();
		this._showBanner();
		hw_common.platform.postMessage({ command: "close" });
		ViewUtils.removeSelf(hw_common.platform.getShareSprite());
		ViewUtils.removeSelf(GuideMgr.Inst.GuideFinger);
		TimeMgr.Inst.removeTimeEvent(this._onSecLoop, this);
		TimeMgr.Inst.removeTimeEvent(this._updateLinkIcon, this);
	}
	private _starthelpAni(): void {
		Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this._onStageDown);
		TimeMgr.Inst.addTimeEvent(1000, TimeBindType.Loop, this._onSecLoop, this);
		this._onStageDown();
	}
	private _onSecLoop(): void {
		if (Date.now() - this._helpAniTM >= GameDef.GAMEHELPANIDELAY) {
			this._onStageDown();
			this._showHelpAni();
		}
	}
	private _showHelpAni(): void {
		if (GameMgr.Inst.level <= 1) {
			this._gameRoot.ExeHelp(true);
		}
		else {
			this._playHelpAni();
		}
	}
	private _playHelpAni(): void {
		Laya.Tween.clearAll(this.view.btn_tip);
		Laya.Tween.to(this.view.btn_tip, { scaleX: 1.15, scaleY: 1.15 }, 200, null, Laya.Handler.create(this, () => {
			Laya.Tween.to(this.view.btn_tip, { scaleX: 1, scaleY: 1 }, 200, null, Laya.Handler.create(this, () => {
				Laya.Tween.to(this.view.btn_tip, { scaleX: 1.15, scaleY: 1.15 }, 200, null, Laya.Handler.create(this, () => {
					Laya.Tween.to(this.view.btn_tip, { scaleX: 1, scaleY: 1 }, 200, null, Laya.Handler.create(this, () => {
						Laya.Tween.to(this.view.btn_tip, { scaleX: 1.15, scaleY: 1.15 }, 200, null, Laya.Handler.create(this, () => {
							Laya.Tween.to(this.view.btn_tip, { scaleX: 1, scaleY: 1 }, 200, null, Laya.Handler.create(this, () => {

							}));
						}));
					}));
				}));
			}));
		}))
	}
	private _onStageDown(): void {
		this._helpAniTM = Date.now();
	}
	private _failCloseBanner(): void {
		if (ViewMgr.Inst.stageHeight < GameDef.GAMINGBANNERHEIGHT) {
			hw_common.platform.showBannerAd(false);
		}
		else {
			hw_common.platform.showBannerAd(true);
		}
	}

	private _showBanner(): void {
		if (ViewMgr.Inst.stageHeight < GameDef.GAMINGBANNERHEIGHT) {
			hw_common.platform.showBannerAd(true);
		}
	}

	private _hideBanner(refresh: boolean = false): void {
		if (ViewMgr.Inst.stageHeight < GameDef.GAMINGBANNERHEIGHT) {
			hw_common.platform.showBannerAd(false);
		}
		if (refresh && GameMgr.Inst.passlevelRefreshBanner == GameDef.BANNERREFRESHBYGAME) {
			hw_common.platform.refreshBanner();
			GameMgr.Inst.passlevelRefreshBanner = 0;
		}
	}

	private _initComp(): void {
		this._gameRoot = new GameRoot();
		this._gameRoot.Init(this.view);
		new ProxyGoldBtn(this.view.btn_gold);
	}

	private _initFui(): void {
		this.view = gamescene.createInstance();
		this.view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
		fairygui.GRoot.inst.addChild(this.view);
	}

	private _addEvent(): void {
		this.view.btn_back.onClick(this, this._clickBack);
		this.view.btn_tip.onClick(this, this._clickHelp);
		this.view.btn_share.onClick(this, this._clickShare);
		EventMgr.Inst.on(EventDef.UI_WINFAILVIDEOOK, this, this._failCloseBanner);
		EventMgr.Inst.on(EventDef.UI_WINFAILRESTART, this, this._failCloseBanner);
	}
	private _clickBack(e: Laya.Event) {
		ViewMgr.Inst.showScene(LobbyScene);
		hw_common.sound.playSound(SoundDef.CLICK);
	}
	private _updateHelpBtn(): void {
		this._canShare = hw_common.share.canShare(SharePointKeyDef.QIUZHU);
		if (this._canShare) {
			this.view.btn_tip.c1.selectedIndex = 0;
		}
		else {
			this.view.btn_tip.c1.selectedIndex = 1;
		}
	}
	private _updateLinkIcon(): void {
		mpsdk.Ad.getSuggestList(false, 2, GameMgr.Inst.level).then((list: any[]) => {
			for (var i: number = 1; i <= 1; i++) {
				if (list && list[i]) {
					let data: any = list[i];
					this.view["linkicon_" + i].n0.item_icon.url = data.icon;
					(<fairygui.GComponent>this.view["linkicon_" + i]).onClick(this, this._clickLinkIcon, [this.view["linkicon_" + i], data]);
				}

			}
		});
	}
	private _clickLinkIcon(target: fairygui.GComponent, data: any): void {
		mpsdk.Ad.click(data);
		target.offClick(this, this._clickLinkIcon);
		this._updateLinkIcon();
		hw_common.mpsdk.reportEvent(ReportDef.EVENT_GAMELINKICON);

	}
	private _getRewards(e: GameEvent = null): void {
		this._gameRoot.Pause = false;
		this._updateHelpBtn();
		this._gameRoot.ExeHelp(false);
	}

	private _failShare(): void {
		this._updateHelpBtn();
		this._gameRoot.Pause = false;
	}

	private _clickShare(e: Laya.Event): void {
		hw_common.platform._share(
			ReportDef.SHARE_GAMESHARE,
			null,
			() => {
				hw_common.platform.showToast("恭喜你，你已成功分享给好友");
			},
			() => {

			},
			{ mothed: this._sharefun, thisarg: this }
		);
		hw_common.sound.playSound(SoundDef.CLICK);
	}

	private _sharefun(): void {
		let urllist: string[] = LoadMgr.Inst.getLevelImage(GameMgr.Inst.levelConfig);
		let url: string = urllist[0];
		const info = mpsdk.Share.commonShare({ serial: ReportDef.SHARE_OTHER, params: null, imageId: 0, image: url, title: "@你 又会了一个新成语，来看看你会几个！" },
			null,
			null,
			this);
		info.imageUrl = url;
		hw_common.platform.shareAppMessage(
			info,
		);
	}

	private _clickHelp(e: Laya.Event): void {
		this._gameRoot.Pause = true;
		if (platform.debug) {
			this._getRewards();
		}
		else {
			this._chooseShare();
		}
		hw_common.sound.playSound(SoundDef.CLICK);
	}

	private _chooseShare(): void {
		hw_common.share.normalGet({
			shareid: ReportDef.SHARE_GAMEHELP,
			sharekey: SharePointKeyDef.QIUZHU,
			caller: this,
			success: this._getRewards,
			fail: this._failShare
		});
	}
}