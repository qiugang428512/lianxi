/*
* 时间管理器
* 时间轮触发器
*/
export default class TimeMgr {
    private static _INST: TimeMgr;
    private _fps: number;
    private _gameTime: number = 0;
    private _delta: number = 0;
    private _timeBindList: TimeBind[] = [];
    constructor() {
        this.init();
    }
    public static get Inst(): TimeMgr {
        if (TimeMgr._INST == null) {
            TimeMgr._INST = new TimeMgr();
        }
        return TimeMgr._INST;
    }

    private init(): void {
        Laya.timer.frameLoop(1, this, this.UpdateFrame);
    }

    public get delta() {
        return this._delta
    }
    /**
     * 每针更新一次
     * 每秒更新一次
     */
    private UpdateFrame(): void {
        this._fps++;
        this._gameTime += Laya.timer.delta;
        this._delta /= Laya.timer.delta;
        this.UpdateSecond();
        this.updateBind();
    }

    /**
     * 更新时间绑定事件
     */
    private updateBind(): void {
        let len: number = this._timeBindList.length;
        for (let i: number = len - 1; i >= 0; i--) {
            let tmp: TimeBind = this._timeBindList[i];
            if (tmp.WaitRemove) {
                this._timeBindList.splice(i, 1);
                continue;
            }
            let delay: number = this._gameTime;
            let dec: number = this._gameTime - tmp.StartTime;
            if (tmp.Delay <= 16 || dec >= tmp.Delay) {
                tmp.Func.apply(tmp.Target, [dec]);
                //预防在调用方法中移除了事件侦听导致报错
                if (tmp.WaitRemove) {
                    this._timeBindList.splice(i, 1);
                    continue;
                }
                if (tmp.Type == TimeBindType.Loop) {
                    tmp.StartTime = this._gameTime;
                }
                else if (tmp.Type == TimeBindType.Delay) {
                    this._timeBindList.splice(i, 1);
                    continue;
                }
            }
        }
    }

    /**
     * 每秒更新一次
     */
    private UpdateSecond(): void {
        if (this._fps < 60) {
            return;
        }
    }

    /**
     * 将事件绑定在时间轮中,定时执行
     * prior:优先级,决定执行先后顺序 0为优先级最低
     */
    public addTimeEvent(delay: number, type: TimeBindType, callback: Function, thisobj: any = null, prior: number = 0): void {
        for (let i of this._timeBindList) {
            if (i.Target == thisobj && callback == i.Func) {
                trace("TimeMgr::addEvent->没有移除就添加了新的事件,覆盖以前老的事件更新");
                i.WaitRemove = false;
                i.Delay = delay;
                return;
            }
        }
        let tb: TimeBind = new TimeBind();
        tb.WaitRemove = false;
        tb.Delay = delay;
        tb.Func = callback;
        tb.Target = thisobj;
        tb.Type = type;
        tb.StartTime = this._gameTime;
        tb.Prior = prior;
        this._timeBindList.push(tb);
        this._timeBindList.sort((a: TimeBind, b: TimeBind) => {
            if (a.Prior > b.Prior) {
                return 1;
            }
            else if (a.Prior < b.Prior) {
                return -1;
            }
            return 0;
        })
    }

    public removeTimeEvent(callback: Function, thisobj: any): void {
        let len: number = this._timeBindList.length;
        for (let i: number = len - 1; i >= 0; i--) {
            let tb: TimeBind = this._timeBindList[i];
            if (tb.Target == thisobj && callback == tb.Func) {
                tb.WaitRemove = true;;
            }
        }
    }
}

export enum TimeBindType {
    Loop,
    Delay,
}

class TimeBind {
    public WaitRemove: boolean = false;
    public Type: number = 0;//0:Loop
    public Target: any;
    public Func: Function;
    public Delay: number;
    public StartTime: number;
    public Prior: number;
}

