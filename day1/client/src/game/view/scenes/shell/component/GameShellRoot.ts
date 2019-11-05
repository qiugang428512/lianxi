import CompBase from "../../CompBase";
import gameScene from "../../../fui/game/gameScene";
import shellscene from "../../../fui/game/shellscene";
import LevelConfig from "../../../../model/confvo/LevelConfig";
import ConfigMgr from "../../../../control/ConfigMgr";
import ConfigDef from "../../../../def/ConfigDef";
import MathUtils from "../../../../../com/hw_utils/MathUtils";
import LoadMgr from "../../../../control/LoadMgr";
import TimeMgr, { TimeBindType } from "../../../../control/TimeMgr";
import GameMgr from "../../../../control/game/GameMgr";
import LoadDef from "../../../../def/LoadDef";
import hw_common from "../../../../../com/hw_common/hw_common";
import SoundDef from "../../../../def/SoundDef";
import GameDef from "../../../../def/GameDef";
import TimeUtils from "../../../../../com/hw_utils/TimeUtils";
import com_imgwrong from "../../../fui/game/com_imgwrong";
import com_wrongnum from "../../../fui/game/com_wrongnum";
import ViewMgr from "../../../../control/ViewMgr";
import WinGameFail from "../../../windows/WinGameFail";
import EventMgr from "../../../../control/event/EventMgr";
import EventDef from "../../../../def/EventDef";

export class GameShellRoot extends CompBase {
	private TIMECOLOR_NORMAL: string = "#4849B0";
	private TIMECOLOR_WRONG: string = "#ff0000";
	protected view: shellscene;
	private _imglist: fairygui.GLoader[] = [];
	private _aniCnt: number;
	private _anitime: number;
	private _aniStTm: number;
	private _fromPoint: Laya.Point = new Laya.Point();
	private _rightCnt: number = 0;
	private _leveltime: number;
	private _wrongPool: com_imgwrong[] = [];
	private _wrongNumPool: com_wrongnum[] = [];

	public constructor() {
		super();
	}

	public Init(view: shellscene): void {
		super.Init(view);
		EventMgr.Inst.on(EventDef.UI_WINFAILVIDEOOK, this, this._getReward);
		EventMgr.Inst.on(EventDef.UI_WINFAILRESTART, this, this._onRestart);
	}

	private _onRestart(): void {
		this.Start();
	}

	private _getReward(): void {
		hw_common.platform.showBannerAd(false);
		this._leveltime = GameDef.LEVELVIDEODELAY * 1000;
		TimeMgr.Inst.addTimeEvent(1000, TimeBindType.Loop, this._updateTimer, this);
	}

	public Start(): void {
		hw_common.platform.showBannerAd(false);
		this._clearImage();
		this._initData();
		TimeMgr.Inst.addTimeEvent(3000, TimeBindType.Delay, this._startAni, this);
	}

	private _startAni(): void {
		this._aniCnt = GameMgr.Inst.level;
		this._aniStTm = Date.now();
		this._anitime = (0.0076 * this._aniCnt * this._aniCnt - 0.2228 * this._aniCnt + 2.2152) * 1000;
		if (this._anitime < 800) this._anitime = 800;
		if (this._anitime > 2000) this._anitime = 2000;
		this._playStartAni();
	}

	private _playStartAni(): void {
		for (let i of this._imglist) {
			let tox: number = this.view.bgm.x + Math.random() * (this.view.bgm.width - i.width * i.scaleX);
			let toy: number = this.view.bgm.y + Math.random() * (this.view.bgm.height - i.height * i.scaleY);
			Laya.Tween.to(i, { x: tox, y: toy }, this._anitime);
		}
		this._aniCnt--;
		if (this._aniCnt <= 0 || Date.now() - this._aniStTm >= 3000) {
			Laya.timer.once(this._anitime, this, () => {
				this._startDrag();
			})
			return;
		}
		else {
			this._playStartAni();
		}
	}

	private _startDrag(): void {
		for (let i of this._imglist) {
			i.touchable = true;
			i.on(Laya.Event.MOUSE_DOWN, this, this._onImageDown);
		}
	}

	private _onImageDown(e: Laya.Event): void {
		let image: fairygui.GLoader = <fairygui.GLoader>fairygui.GLoader.cast(e.currentTarget);
		this._fromPoint.x = image.x;
		this._fromPoint.y = image.y;
		image.off(Laya.Event.MOUSE_DOWN, this, this._onImageDown);
		image.on(Laya.Event.MOUSE_UP, this, this._onImageUp);
		image.startDrag();
		hw_common.sound.playSound(SoundDef.CLICK);
	}

	private _onImageUp(e: Laya.Event): void {
		let image: fairygui.GLoader = <fairygui.GLoader>fairygui.GLoader.cast(e.currentTarget);
		let bg: fairygui.GGraph = <fairygui.GGraph>image.data;
		if (e.stageX > bg.x && e.stageX < (bg.x + bg.width) &&
			e.stageY > bg.y && e.stageY < (bg.y + bg.height)
		) {
			image.x = bg.x;
			image.y = bg.y;
			image.touchable = false;
			this._rightAni(image.x + image.width / 2, image.y + image.height / 2);
		}
		else {
			image.x = this._fromPoint.x;
			image.y = this._fromPoint.y;
			image.touchable = true;
			image.on(Laya.Event.MOUSE_DOWN, this, this._onImageDown);
			this._answerWrong(this._fromPoint);
		}
		image.stopDrag();
		image.off(Laya.Event.MOUSE_UP, this, this._onImageUp);
		image.off(Laya.Event.MOUSE_OUT, this, this._onImageUp);
		hw_common.sound.playSound(SoundDef.CLICK);
	}

	private _answerWrong(point: Laya.Point): void {
		this._wrongAni(point);
		this._wrongnumAni(point);
		hw_common.platform.vibrateLong();
		hw_common.sound.playSound(SoundDef.WRONG);
	}

	private _wrongAni(point: Laya.Point): void {
		let com_wrong: com_imgwrong = this._getWrongInst();
		Laya.Tween.clearAll(com_wrong);
		this.view.bgm.addChildAt(com_wrong, 0);
		com_wrong.x = point.x;
		com_wrong.y = point.y;
		com_wrong.scaleX = com_wrong.scaleY = com_wrong.alpha = 1;
		Laya.Tween.to(com_wrong, { scaleX: 0, scaleY: 0, alpha: 0 }, 400, null, Laya.Handler.create(this, () => {
			com_wrong.removeFromParent();
			this._wrongPool.push(com_wrong);
		}))
	}

	private _getWrongInst(): com_imgwrong {
		if (this._wrongPool.length > 0) {
			return this._wrongPool.pop();
		}
		let cmr: com_imgwrong = com_imgwrong.createInstance();
		cmr.touchable = false;
		return cmr;
	}

	private _wrongnumAni(localpoint: Laya.Point): void {
		let gp: Laya.Point = this.view.bgm.localToGlobal(localpoint.x, localpoint.y);
		let point: Laya.Point = this.view.globalToLocal(gp.x, gp.y);
		let toy1: number = point.y - 50;
		let tox2: number = this.view.txt_time.x + this.view.txt_time.width / 2;
		let toy2: number = this.view.txt_time.y + this.view.txt_time.height / 2;
		let com_wrong: com_wrongnum = this._getWrongNumInst();
		Laya.Tween.clearAll(com_wrong);
		this.view.addChild(com_wrong);
		this.view.txt_time.color = this.TIMECOLOR_WRONG;
		com_wrong.x = point.x;
		com_wrong.y = point.y;
		com_wrong.scaleX = com_wrong.scaleY = 0;
		Laya.Tween.to(com_wrong, { scaleX: 1, scaleY: 1, y: toy1 }, 500, null, Laya.Handler.create(this, () => {
			Laya.Tween.to(com_wrong, { scaleX: 0, scaleY: 0, x: tox2, y: toy2 }, 400, null, Laya.Handler.create(this, () => {
				com_wrong.removeFromParent();
				this._wrongNumPool.push(com_wrong);
				this._leveltime -= GameDef.LEVELWRONGDECTIME * 1000;
				this._leveltime < 0 && (this._leveltime = 0);
				this.view.txt_time.color = this.TIMECOLOR_NORMAL;
			}));

		}))
	}

	private _getWrongNumInst(): com_wrongnum {
		if (this._wrongNumPool.length > 0) {
			return this._wrongNumPool.pop();
		}
		let cmr: com_wrongnum = com_wrongnum.createInstance();
		cmr.txt.text = "-20";
		cmr.touchable = false;
		return cmr;
	}

	private _rightAni(fx: number, fy: number): void {
		this._rightCnt++;
		this.view.rightcnt.state.selectedIndex = this._rightCnt;
		let targetitem: fairygui.GImage = this.view.rightcnt["r" + this.view.rightcnt.state.selectedIndex];
		if (!targetitem) return;
		let targetgobal: Laya.Point = targetitem.localToGlobal(targetitem.width / 2, targetitem.height / 2);
		let targetpoint: Laya.Point = this.view.globalToLocal(targetgobal.x, targetgobal.y);
		var partical: Laya.Particle2D = this._getPartical();
		this.view.displayObject.addChild(partical);
		partical.x = fx;
		partical.y = fy;
		partical.emitter.start(1.2);
		partical.play();
		Laya.Tween.to(partical, { x: targetpoint.x, y: targetpoint.y }, 400, null, Laya.Handler.create(this, () => {
			partical.removeSelf();
			partical.stop();
			partical.destroy(true);
			if (this._rightCnt >= 5) this._win();
		}), 500);
	}

	private _win(): void {
		TimeMgr.Inst.addTimeEvent(2000, TimeBindType.Delay, () => {
			GameMgr.Inst.PassLevel();
		})
		this._winAni();
		hw_common.sound.playSound(SoundDef.WIN);
	}

	private _winAni(): void {
		this._rightcntWinAni();
	}

	private _rightcntWinAni(): void {
		for (let i: number = 1; i <= GameDef.LEVELMAXANSWER; i++) {
			let child: fairygui.GImage = this.view.rightcnt["r" + i];
			Laya.Tween.to(child, { scaleX: 1.5, scaleY: 1.5 }, 200, null, Laya.Handler.create(this, () => {
				Laya.Tween.to(child, { scaleX: 1, scaleY: 1 }, 300, null);
			}), i * 100);
		}
	}

	//laya粒子不能用对象池,会有显示问题
	private _getPartical(): Laya.Particle2D {
		let pset: any = Laya.loader.getRes(LoadDef.PATICLE_TRAIL_SETTING);
		pset.textureName = LoadDef.PATICLE_TRAIL_PNG;
		pset.maxPartices = 180;
		var partical: Laya.Particle2D = new Laya.Particle2D(pset);
		return partical;
	}

	private _initData(): void {
		this.view.rightcnt.state.selectedIndex = this._rightCnt = 0;
		this.view.txt_level.text = "关卡" + GameMgr.Inst.level;
		this._leveltime = 120 * 1000;
		TimeMgr.Inst.addTimeEvent(1000, TimeBindType.Loop, this._updateTimer, this);
		let config: LevelConfig[] = ConfigMgr.Inst.GetConfigByName(ConfigDef.LevelData);
		let useconfig: LevelConfig[] = config.concat();
		MathUtils.randomSort(useconfig);
		for (let i: number = 0; i < 5; i++) {
			let lc: LevelConfig = useconfig[i];
			let url: string = LoadMgr.Inst.getLevelImage(lc)[0];
			let image: fairygui.GLoader = new fairygui.GLoader();
			image.url = url;
			this.view.addChild(image);
			image.width = this.view["bg" + i].width;
			image.height = this.view["bg" + i].height;
			image.fill = fairygui.LoaderFillType.ScaleFree;
			image.x = this.view["bg" + i].x;
			image.y = this.view["bg" + i].y;
			image.touchable = false;
			image.data = this.view["bg" + i];
			this._imglist.push(image);
		}
	}

	private _updateTimer(delay: number = 0): void {
		this._leveltime -= 1000;
		this._playSound();
		if (this._leveltime <= 0) {
			this._lost();
			return;
		}
		let fmttime: string = TimeUtils.getTimeMMSS(this._leveltime);
		this.view.txt_time.text = fmttime;
		this.view.txt_time.color = this.TIMECOLOR_NORMAL;
	}

	private _lost(): void {
		this.Stop();
		ViewMgr.Inst.showWindow(WinGameFail);
		hw_common.sound.playSound(SoundDef.LOOSE);
	}

	public Stop(): void {
		TimeMgr.Inst.removeTimeEvent(this._updateTimer, this);
	}

	private _playSound(): void {
		let second30: number = 30000;
		let second10: number = 10000;
		if (this._leveltime >= 0 && this._leveltime < second10) {
			hw_common.sound.playSound(SoundDef.SECOND10);
		}
		else if (this._leveltime == second30) {
			hw_common.sound.playSound(SoundDef.SECOND30);
		}
	}

	private _clearImage(): void {
		for (let i of this._imglist) {
			i.removeFromParent();
		}
		this._imglist = [];
	}

}