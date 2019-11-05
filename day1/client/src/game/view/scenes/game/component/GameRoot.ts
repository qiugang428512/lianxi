import CompBase from "../../CompBase";
import gamescene from "../../../fui/game/gameScene";
import LevelConfig from "../../../../model/confvo/LevelConfig";
import GameMgr from "../../../../control/game/GameMgr";
import ConfigMgr from "../../../../control/ConfigMgr";
import ConfigDef from "../../../../def/ConfigDef";
import LoadMgr from "../../../../control/LoadMgr";
import LoadDef from "../../../../def/LoadDef";
import com_img1 from "../../../fui/game/com_img1";
import GameDef from "../../../../def/GameDef";
import com_imgright from "../../../fui/game/com_imgright";
import com_imgwrong from "../../../fui/game/com_imgwrong";
import TimeMgr, { TimeBindType } from "../../../../control/TimeMgr";
import ViewMgr from "../../../../control/ViewMgr";
import GameWinScene from "../../gameover/GameWinScene";
import WinGameFail from "../../../windows/WinGameFail";
import EventMgr from "../../../../control/event/EventMgr";
import EventDef from "../../../../def/EventDef";
import com_wrongnum from "../../../fui/game/com_wrongnum";
import com_imgdebug from "../../../fui/game/com_imgdebug";
import GuideMgr from "../../../../control/game/GuideMgr";
import { EGuideID } from "../../../../def/EGuideID";
import SoundDef from "../../../../def/SoundDef";
import ReportDef from "../../../../def/ReportDef";
import TimeUtils from "../../../../../com/hw_utils/TimeUtils";
import hw_common from "../../../../../com/hw_common/hw_common";
import hw_common_config from "../../../../../com/hw_common/inner_config/hw_common_config";
import guidefinger from "../../../fui/game/guidefinger";
import guidemaskclick from "../../../fui/game/guidemaskclick";

export default class GameRoot extends CompBase {

	protected view: gamescene;
	private TIMECOLOR_NORMAL: string = "#4849B0";
	private TIMECOLOR_WRONG: string = "#ff0000";

	private _levelConfig: LevelConfig;
	private _answerList: number[] = [];
	private _leveltime: number;
	private _rightPool: com_imgright[] = [];
	private _wrongPool: com_imgwrong[] = [];
	private _wrongNumPool: com_wrongnum[] = [];
	private _rightAniPool: fairygui.GLoader[] = [];
	private _pause: boolean = false;
	private _helptCnt: number = 0;//求助次数;
	private _cloneFinger: guidefinger;

	public constructor() {
		super();
	}

	public set Pause(b: boolean) {
		this._pause = b;
	}

	public Init(view: gamescene): void {
		super.Init(view);
		this._addEvent();
	}

	public Start(): void {
		this._pause = false;
		this._helptCnt = 0;
		this.view.guidemask.visible = false;
		this._clearAllPanel();
		this._updateData();
		this._updateImage();
		this._updateTimer();
		this._updateDebug();
		this._updateGuide();
		TimeMgr.Inst.addTimeEvent(1000, TimeBindType.Loop, this._updateTimer, this);
		hw_common.mpsdk.reportEvent(ReportDef.EVENT_INGAME, this._levelConfig.id + "");
	}

	public ExeHelp(free: boolean): void {
		if (!free) this._helptCnt++;
		this._showGuide();
	}

	private _updateGuide(): void {
		let showguide: boolean = GuideMgr.Inst.GuideShowById(EGuideID.GameLevel1);
		if (!showguide) {
			this.view.txt_guidetips.visible = false;
			return;
		}
		let index: number = this._answerList.length + 1;
		let level1: number = 1, level3: number = 3, level5: number = GameDef.LEVELMAXANSWER;
		if (index < level3) {
			this.view.txt_guidetips.text = "这是第" + index + "个不同,请点击手指引导的位置";
			this._showGuide();
		}
		else if (index >= level5) {
			GuideMgr.Inst.GuideOver(EGuideID.GameLevel1);
		}
		hw_common.mpsdk.reportEvent(ReportDef.EVENT_NEW_LEVLE1, this._answerList.length + "");
	}

	private _showGuide(): void {
		for (let i: number = 1; i <= GameDef.LEVELMAXANSWER; i++) {
			if (this._checkAnswered(i)) {
				continue;
			}
			let point: number[] = this._getPointFromConfig(i);
			let centerpoint: Laya.Point = this._getCenterPoint(point);
			let gp: Laya.Point = this.view.word_img2.panel.localToGlobal(centerpoint.x, centerpoint.y);
			this.view.guidemask.circle.x = gp.x;
			this.view.guidemask.circle.y = gp.y;
			// if (this._levelConfig.id == 1 && this._answerList.length < 2) {
			this.view.guidemask.setMask(this.view.guidemask.circle.displayObject, true);
			this.view.guidemask.visible = true;
			// } else {
			// 	this.view.addChild(GuideMgr.Inst.GuideFinger);
			// 	GuideMgr.Inst.GuideFinger.x = gp.x;
			// 	GuideMgr.Inst.GuideFinger.y = gp.y;
			// 	GuideMgr.Inst.GuideFinger.touchable = false;
			// 	GuideMgr.Inst.GuideFinger.c1.selectedIndex = 1;
			// }
			return;
		}
	}

	private _getPointFromConfig(index: number): number[] {
		let point: number[] = (this._levelConfig["point" + index] as number[]).concat();
		if (point.length == 2) {
			point.push(GameDef.LEVELDEFAULTLEN);
		}
		return point;
	}

	private _updateDebug(): void {
		if (!hw_common.config.gm_open) return;
		for (let i: number = 1; i <= GameDef.LEVELMAXANSWER; i++) {
			let point: number[] = this._getPointFromConfig(i);
			let debug: com_imgdebug = com_imgdebug.createInstance();
			if (point.length == 3) {
				debug.c1.selectedIndex = 0;
				this.view.word_img1.panel.addChild(debug);
				debug.x = point[0];
				debug.y = point[1];
				debug.width = debug.height = point[2] * 2;
			}
			else if (point.length == 4) {
				debug.c1.selectedIndex = 1;
				this.view.word_img1.panel.addChild(debug);
				debug.x = point[0] + point[2] / 2;
				debug.y = point[1] + point[3] / 2;
				debug.width = point[2];
				debug.height = point[3];
			}
		}
	}

	private _addEvent(): void {
		this.view.word_img1.touchable = true;
		this.view.word_img1.on(Laya.Event.MOUSE_DOWN, this, this._clkImage);
		this.view.word_img2.on(Laya.Event.MOUSE_DOWN, this, this._clkImage);
		this.view.guidemask.btn_down.on(Laya.Event.MOUSE_DOWN, this, this._clkMask);
		this.view.guidemask.btn_up.on(Laya.Event.MOUSE_DOWN, this, this._clkMask);
		EventMgr.Inst.on(EventDef.UI_WINFAILVIDEOOK, this, this._getReward);
		EventMgr.Inst.on(EventDef.UI_WINFAILRESTART, this, this._onRestart);
	}

	private _onRestart(): void {
		this.Start();
	}

	private _getReward(): void {
		this._pause=false;
		this._leveltime = GameDef.LEVELVIDEODELAY * 1000;
		TimeMgr.Inst.addTimeEvent(1000, TimeBindType.Loop, this._updateTimer, this);
	}

	private _clkMask(e: Laya.Event): void {
		let target: guidemaskclick = com_img1.cast(e.currentTarget) as guidemaskclick;
		let targetimage: com_img1;
		if (target == this.view.guidemask.btn_up) {
			targetimage = this.view.word_img1;
		}
		else {
			targetimage = this.view.word_img2;
		}
		let localpoint: Laya.Point = targetimage.globalToLocal(target.x, target.y);
		this._checkAnswer(localpoint, targetimage);
	}

	private _clkImage(e: Laya.Event): void {
		if (this._pause) return;
		let target: com_img1 = com_img1.cast(e.currentTarget) as com_img1;
		let localpoint: Laya.Point = target.globalToLocal(e.stageX, e.stageY);
		this._checkAnswer(localpoint, target);
	}

	private _checkAnswer(localpoint: Laya.Point, target: com_img1): void {
		for (let i: number = 1; i <= GameDef.LEVELMAXANSWER; i++) {
			if (this._checkAnswered(i)) {
				continue;
			}
			let point: number[] = this._getPointFromConfig(i);;
			let right: boolean = false;
			if (point.length == 3) {
				right = this._checkCircle(localpoint, point);
			}
			else if (point.length == 4) {
				right = this._checkRect(localpoint, point);
			}
			if (right) {
				this._answerRight(i, target);
				return;
			}
		}
		this._answerWrong(localpoint, target);
	}

	private _answerWrong(point: Laya.Point, target: com_img1): void {
		this._wrongAni(point, target);
		this._wrongnumAni(point, target);
		hw_common.platform.vibrateLong();
		hw_common.sound.playSound(SoundDef.WRONG);
	}

	private _wrongAni(point: Laya.Point, target: com_img1): void {
		let com_wrong: com_imgwrong = this._getWrongInst();
		Laya.Tween.clearAll(com_wrong);
		target.panel.addChildAt(com_wrong, 0);
		com_wrong.x = point.x;
		com_wrong.y = point.y;
		com_wrong.scaleX = com_wrong.scaleY = com_wrong.alpha = 1;
		Laya.Tween.to(com_wrong, { scaleX: 0, scaleY: 0, alpha: 0 }, 400, null, Laya.Handler.create(this, () => {
			com_wrong.removeFromParent();
			this._wrongPool.push(com_wrong);
		}))
	}

	private _rightAni(localpoint: Laya.Point, target: com_img1): void {
		let targetitem: fairygui.GImage = this.view.rightcnt["r" + this.view.rightcnt.state.selectedIndex];
		if (!targetitem) return;
		let gp: Laya.Point = target.localToGlobal(localpoint.x, localpoint.y);
		let point: Laya.Point = this.view.globalToLocal(gp.x, gp.y);
		let targetgobal: Laya.Point = targetitem.localToGlobal(targetitem.width / 2, targetitem.height / 2);
		let targetpoint: Laya.Point = this.view.globalToLocal(targetgobal.x, targetgobal.y);
		let toy1: number = point.y - 50;
		let com_wrong: fairygui.GLoader = this._getRightAniInst();
		Laya.Tween.clearAll(com_wrong);
		Laya.Tween.clearAll(targetitem);
		this.view.addChild(com_wrong);
		com_wrong.x = point.x;
		com_wrong.y = point.y;
		com_wrong.scaleX = com_wrong.scaleY = 0;
		targetitem.scaleX = targetitem.scaleY = 0;

		var partical: Laya.Particle2D = this._getPartical();
		this.view.displayObject.addChild(partical);
		partical.x = com_wrong.x;
		partical.y = com_wrong.y;
		partical.emitter.start(1.2);
		partical.play();
		Laya.Tween.to(partical, { x: targetpoint.x, y: targetpoint.y }, 400, null, Laya.Handler.create(this, () => {
			partical.removeSelf();
			partical.stop();
			partical.destroy(true);
		}), 500);

		Laya.Tween.to(com_wrong, { scaleX: 1, scaleY: 1, y: toy1 }, 500, null, Laya.Handler.create(this, () => {
			Laya.Tween.to(com_wrong, { scaleX: 0, scaleY: 0, x: targetpoint.x, y: targetpoint.y }, 400, null, Laya.Handler.create(this, () => {
				com_wrong.removeFromParent();
				this._rightAniPool.push(com_wrong);
				this._leveltime < 0 && (this._leveltime = 0);
				Laya.Tween.to(targetitem, { scaleX: 1, scaleY: 1 }, 300, Laya.Ease.backOut);
			}));
		}))
	}

	private _wrongnumAni(localpoint: Laya.Point, target: com_img1): void {
		let gp: Laya.Point = target.localToGlobal(localpoint.x, localpoint.y);
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

	private _getCenterPoint(plist: number[]): Laya.Point {
		if (plist.length == 4) {
			return new Laya.Point(plist[0] + plist[2] / 2, plist[1] + plist[3] / 2);
		}
		else {
			return new Laya.Point(plist[0], plist[1]);
		}

	}

	private _answerRight(index: number, target: com_img1): void {
		this._answerList.push(index);
		this.view.rightcnt.state.selectedIndex = this._answerList.length;
		let point: number[] = this._levelConfig["point" + index];
		let centerpoint: Laya.Point = this._getCenterPoint(point);
		this._addRight(this.view.word_img1.panel, centerpoint);
		this._addRight(this.view.word_img2.panel, centerpoint);
		if (this._answerList.length >= 5) {
			this._win();
		}
		hw_common.platform.vibrateShort();
		this._rightGuide();
		this._rightAni(centerpoint, target);
		hw_common.sound.playSound(SoundDef["RIGHT" + this._answerList.length]);
	}

	private _rightGuide(): void {
		let has: number = GameDef.LEVELMAXANSWER - this._answerList.length;
		this.view.txt_guidetips.text = "很好,再找出" + has + "个不同就能过关了";
		GuideMgr.Inst.GuideFinger.removeFromParent();
		this.view.guidemask.visible = false;
		if (this._levelConfig.id == 1 && this._answerList.length < 2) {
			this._updateGuide();
		}
		else {
			TimeMgr.Inst.addTimeEvent(2000, TimeBindType.Delay, () => {
				this._updateGuide();
			}, this);
		}

	}

	private _addRight(panel: fairygui.GComponent, point: Laya.Point): void {
		let com_right: com_imgright = this._getRightInst();
		panel.addChildAt(com_right, 0);
		com_right.x = point.x;
		com_right.y = point.y;
	}

	private _getRightInst(): com_imgright {
		let cmr: com_imgright;
		if (this._rightPool.length > 0) {
			cmr = this._rightPool.pop();
		}
		else {
			cmr = com_imgright.createInstance();
		}
		cmr.c1.selectedIndex = 0;
		cmr.scaleX = cmr.scaleY = 1;
		cmr.touchable = false;
		return cmr;
	}

	private _getWrongInst(): com_imgwrong {
		if (this._wrongPool.length > 0) {
			return this._wrongPool.pop();
		}
		let cmr: com_imgwrong = com_imgwrong.createInstance();
		cmr.touchable = false;
		return cmr;
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

	private _getRightAniInst(): fairygui.GLoader {
		if (this._rightAniPool.length > 0) {
			return this._rightAniPool.pop();
		}
		let cmr: fairygui.GLoader = new fairygui.GLoader();
		cmr.url = "ui://game/tickmark";
		cmr.autoSize = true;
		cmr.setPivot(0.5, 0.5, true);
		return cmr;
	}

	//laya粒子不能用对象池,会有显示问题
	private _getPartical(): Laya.Particle2D {
		let pset: any = Laya.loader.getRes(LoadDef.PATICLE_TRAIL_SETTING);
		pset.textureName = LoadDef.PATICLE_TRAIL_PNG;
		pset.maxPartices = 180;
		var partical: Laya.Particle2D = new Laya.Particle2D(pset);
		return partical;
	}

	private _checkAnswered(i: number): boolean {
		return this._answerList.indexOf(i) >= 0;
	}

	private _checkCircle(localpoint: Laya.Point, circlepoint: number[]): boolean {
		let decx: number = circlepoint[0] - localpoint.x;
		let decy: number = circlepoint[1] - localpoint.y;
		let circlelen: number = circlepoint[2] * circlepoint[2];
		let declen: number = decx * decx + decy * decy;
		return declen <= circlelen;
	}

	private _checkRect(localpoint: Laya.Point, rectpoint: number[]): boolean {
		if (localpoint.x > rectpoint[0] && localpoint.x < (rectpoint[0] + rectpoint[2]) &&
			localpoint.y > rectpoint[1] && localpoint.y < (rectpoint[1] + rectpoint[3])) {
			return true;
		}
		return false;
	}

	private _updateData(): void {
		this._levelConfig = GameMgr.Inst.levelConfig;
		this._answerList = [];
		this.view.rightcnt.state.selectedIndex = this._answerList.length;
		this._leveltime = this._levelConfig.time * 1000;
		this.view.txt_level.text = "第 " + this._levelConfig.id + " 关";
	}

	private _updateImage(): void {
		let urllist: string[] = LoadMgr.Inst.getLevelImage(this._levelConfig);
		let img1: string = urllist[0];
		let img2: string = urllist[1];
		this.view.word_img1.imgloader.img.url = img1;
		this.view.word_img2.imgloader.img.url = img2;
	}

	private _updateTimer(delay: number = 0): void {
		if (this._pause) return;
		this._leveltime -= 1000;
		this._playSound();
		let fmttime: string = TimeUtils.getTimeMMSS(this._leveltime);
		let second30: number = 30000;
		this.view.txt_time.text = fmttime;
		this.view.txt_time.color = this.TIMECOLOR_NORMAL;
		if (this._leveltime <= 0) {
			hw_common.platform.showToast("时间到");
			this._pause = true;
			Laya.timer.once(2000, this, () => {
				this._lost();
			})
			return;
		}
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

	private _clearAllPanel(): void {
		this._clearPanel(this.view.word_img1.panel);
		this._clearPanel(this.view.word_img2.panel);
	}

	private _clearPanel(panel: fairygui.GComponent): void {
		while (panel.numChildren > 0) {
			let child: fairygui.GObject = panel.removeChildAt(0);
			if (child instanceof com_imgright) {
				this._rightPool.push(child);
			}
			else if (child instanceof com_imgwrong) {
				this._wrongPool.push(child);
			}
		}
	}

	private _lost(): void {
		this.Stop();
		ViewMgr.Inst.showWindow(WinGameFail);
		hw_common.sound.playSound(SoundDef.LOOSE);
		hw_common.mpsdk.reportEvent(ReportDef.Event_FAIL, this._levelConfig.id + "", this._helptCnt + "_" + this._answerList.length);
	}

	private _win(): void {
		this._pause = true;
		this.Stop();
		TimeMgr.Inst.addTimeEvent(2000, TimeBindType.Delay, () => {
			let urllist: string[] = LoadMgr.Inst.getLevelImage(this._levelConfig);
			let img1: string = urllist[0];
			let img2: string = urllist[1];
			Laya.loader.clearRes(img1);
			Laya.loader.clearRes(img2);
			GameMgr.Inst.PassLevel();
		})
		this._winAni();
		hw_common.sound.playSound(SoundDef.WIN);
		hw_common.mpsdk.reportEvent(ReportDef.Event_PASSLEVEL, this._levelConfig.id + "", this._helptCnt + "_" + this._leveltime);
	}

	private _winAni(): void {
		this._panelChildWinAni(this.view.word_img1.panel, 1);
		this._panelChildWinAni(this.view.word_img2.panel, 2);
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

	private _panelChildWinAni(panel: fairygui.GComponent, index: number): void {
		let len: number = panel.numChildren;
		for (let i: number = 0; i < len; i++) {
			let child: com_imgright = panel.getChildAt(i) as com_imgright;
			if (child instanceof com_imgright) {
				Laya.Tween.to(child, { scaleX: 1.3, scaleY: 1.3 }, 300, Laya.Ease.backOut, Laya.Handler.create(this, () => {
					child.c1.selectedIndex = index;
				}), i * 300);
			}
		}
	}

	public Stop(): void {
		TimeMgr.Inst.removeTimeEvent(this._updateTimer, this);
	}

}