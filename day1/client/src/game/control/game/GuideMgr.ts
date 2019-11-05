import { EGuideID } from "../../def/EGuideID";
import guidefinger from "../../view/fui/game/guidefinger";
import GameMgr from "./GameMgr";

/**
* created by yahu
* 
*/
export default class GuideMgr {
    private static _INST: GuideMgr;
    private _guidefinger: guidefinger;
    private _currentGuide: EGuideID;
    /**
    * 构造函数
    */
    constructor() {
    }

    public set CurrentGuide(id: EGuideID) {
        this._currentGuide = id;
    }

    public get CurrentGuide(): EGuideID {
        return this._currentGuide;
    }

    public get GuideFinger(): guidefinger {
        if (this._guidefinger == null) {
            this._guidefinger = guidefinger.createInstance();
        }
        return this._guidefinger;
    }

    public get Guiding(): boolean {
        if (this._guidefinger && this._guidefinger.parent) {
            return true;
        }
        return false;
    }

    public static get Inst(): GuideMgr {
        if (GuideMgr._INST == null) {
            GuideMgr._INST = new GuideMgr();
        }
        return GuideMgr._INST;
    }

    /**
     * 从列表中按照顺序找到没有做过的引导返回,
     * @param list 
     */
    public GuideShowByList(list: EGuideID[]): EGuideID {
        for (let i: number = 0; i < list.length; i++) {
            if (this.GuideShowById(list[i])) {
                return list[i];
            }
        }
        return null;
    }

    /**
     * 是否显示这个引导
     * 判断依据为这个引导有没有做过
     * @param guideid 
     */
    public GuideShowById(guideid: EGuideID): boolean {
        let guideoverlist: number[] = GameMgr.Inst.data.guideOverList;
        if (guideoverlist.indexOf(guideid) >= 0) {
            return false;
        }
        return true;
    }

    /**
     * 从一个列表中找到当前正在显示中的引导id,并关闭保存它
     * 当前正在显示的引导必须提前设置
     * @param list 
     */
    public GuideOverList(list: EGuideID[]): void {
        if (list == null || list.length < 1) {
            return;
        }
        for (let i: number = 0; i < list.length; i++) {
            if (this._currentGuide == list[i]) {
                this.GuideOver(list[i]);
            }
        }
    }

    /**
     * 结束一个引导并保存
     * @param guideid 
     */
    public GuideOver(guideid: EGuideID): void {
        this.GuideFinger.removeFromParent();
        let guideoverlist: number[] = GameMgr.Inst.data.guideOverList;
        if (guideoverlist.indexOf(guideid) >= 0) {
            trace("[error]GuideMgr::GuideOver->不能保存一个已经做完的引导");
            return;
        }
        guideoverlist.push(guideid);
        GameMgr.Inst.SaveData();
    }
}