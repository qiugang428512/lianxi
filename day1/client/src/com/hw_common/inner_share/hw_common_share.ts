import hw_common from "../hw_common";
import hw_common_event from "../inner_event/hw_common_event";
import hw_common_def from "../hw_common_def";

/*
* 分享管理;
*/
export default class hw_common_share {
    private _cycInfoList: any;//周期分享信息列表
    private _getTrueShareFlag: boolean = false;//是否拉取到有效分享值
    private _lastTrueShareTm: number = 0;//上次有效分享时间,平台请求获得
    private _sharefailtype: number = 0;//0:猜测失败,1:真实失败,2:打开二级分享界面后猜测失败
    /**上次有效分享得时间 */
    public get lastTrueShareTime(): number {
        return this._lastTrueShareTm;
    }
    /**上次分享得失败类型0:猜测失败,1:真实失败,2:打开二级分享界面后猜测失败*/
    public set shareFailType(type: number) {
        this._sharefailtype = type;
    }
    public _init() {
        let str: string = Laya.LocalStorage.getItem(hw_common_def.LOCS_SHARE_CYCINFOLIST);
        try {
            if (str) {
                this._cycInfoList = JSON.parse(str);
            }
        } catch (error) {
            this._cycInfoList = {};
        }
        if (!this._cycInfoList) this._cycInfoList = {};
        hw_common.event.on(hw_common_def.EVT_MPSDK_LASTTRUESHARETM_OK, this, this._getlastTrueShareTm);
    }
    //获取到上次真实分享时间
    private _getlastTrueShareTm(time: number): void {
        this._lastTrueShareTm = time;
        this._getTrueShareFlag = true;
    }
    private _getCycInfo(key: string): CycInfo {
        if (!key) key = "default";
        if (!this._cycInfoList[key]) {
            this._cycInfoList[key] = {
                key: key,
                count: 0,
                sharecount: 0,
                starttime: 0,
                sharepointindex: 0
            }
        }
        return this._cycInfoList[key];
    }
    private _saveCycInfo(): void {
        let str: string = JSON.stringify(this._cycInfoList);
        if (hw_common.platform.iswxgame) {
            wx.setStorage({ key: hw_common_def.LOCS_SHARE_CYCINFOLIST, data: str });
        }
        else {
            Laya.LocalStorage.setItem(hw_common_def.LOCS_SHARE_CYCINFOLIST, str);
        }
    }
    /**
     * 根据当前的分享周期决定是弹出分享还是弹出视频
     * 1:根据服务器sharepointlist配置决定
     * 2:不需要考虑分享失败成功的文字提示,全部用统一的,只需要考虑游戏逻辑
     * 3:不需要打点,该方法会针对shareid对各种状态打点
     * @param shareinfo 
     * @param shareinfo.shareid 【必填】后台分析统计用的分享埋点id
     * @param shareinfo.sharekey 该分享使用的sharepointlist配置中的key值 @default: "default"
     * @param shareinfo.caller 分享方法作用域
     * @param shareinfo.success 分享成功方法
     * @param shareinfo.successargs 分享成功参数,数组类型,根据回调函数的参数决定
     * @param shareinfo.fail 分享失败方法
     * @param shareinfo.failargs 分享失败参数,数组类型,根据回调函数的参数决定
     */
    public normalGet(shareinfo: {
        shareid: number,
        sharekey?: string,
        shareparam?: any,
        caller?: any,
        success?: Function,
        successargs?: Array<any>,
        fail?: Function,
        failargs?: Array<any>,
    }): void {
        if (this.canShare(shareinfo.sharekey)) {
            this.shareGet(shareinfo);
        }
        else {
            this.videoGet(shareinfo);
        }
    }

    /**
     * 观看视频,如果视频失败后根据配置决定是否拉起分享
     * 1:根据服务器sharepointlist配置决定
     * 2:不需要考虑分享失败成功的文字提示,全部用统一的,只需要考虑游戏逻辑
     * 3:不需要打点,该方法会针对shareid对各种状态打点
     * @param shareinfo 
     * @param shareinfo.shareid 后台分析统计用的分享id
     * @param shareinfo.sharekey 该分享使用的sharepointlist配置中的key值 @default: "default"
     * @param shareinfo.caller 分享方法作用域
     * @param shareinfo.success 分享成功方法
     * @param shareinfo.successargs 分享成功参数,数组类型,根据回调函数的参数决定
     * @param shareinfo.fail 分享失败方法
     * @param shareinfo.failargs 分享失败参数,数组类型,根据回调函数的参数决定
     * 
     * @param advance 是否推进sharepoint周期
     */
    public videoGet(shareinfo: {
        shareid: number,
        sharekey?: string,
        shareparam?: any,
        caller?: any,
        success?: Function,
        successargs?: Array<any>,
        fail?: Function,
        failargs?: Array<any>,
    }, advance: boolean = true): void {
        hw_common.mpsdk.reportEvent(hw_common_def.REPORT_VIDEOAD, shareinfo.shareid + "", "0");
        hw_common.platform._showVideo(() => {
            hw_common.platform.showToast("获取成功");
            if (hw_common.config.sharepoint_advancetype == 0 && advance) hw_common.share.addCycCnt(shareinfo.sharekey, false);
            if (shareinfo.success) shareinfo.success.apply(shareinfo.caller, shareinfo.successargs);
            hw_common.mpsdk.reportEvent(hw_common_def.REPORT_VIDEOAD, shareinfo.shareid + "", "1");
        }, () => {
            let closefun: Function = () => {
                hw_common.platform.showToast("视频未看完，无法获得奖励");
                hw_common.mpsdk.reportEvent(hw_common_def.REPORT_VIDEOAD, shareinfo.shareid + "", "2");
                trace("hw_common_share::videoGet->", hw_common.config.sharepoint_advancetype, advance)
                if (hw_common.config.sharepoint_advancetype == 1 && advance) hw_common.share.addCycCnt(shareinfo.sharekey, false);
                if (shareinfo.fail) shareinfo.fail.apply(shareinfo.caller, shareinfo.failargs);
            }
            trace("hw_common_share::videoGet->", hw_common.config.videomode)
            if (hw_common.config.videomode == 1) {
                hw_common.platform.showModal("视频未看完,无法获得奖励,是否重新观看",
                    () => {
                        this.videoGet(shareinfo, advance);
                    },
                    true, "继续观看", "取消",
                    closefun);
            }
            else {
                closefun();
            }
        }, () => {
            let safe: boolean = hw_common.config.safe;
            let ischeck: boolean = !this._checkCycLimit(shareinfo.sharekey);
            if (safe && ischeck) {
                this.shareGet(shareinfo, advance);
            }
            else {
                let str = "";
                str = "视频无法播放，过一会再试试吧。";
                hw_common.platform.showToast(str);
                if (shareinfo.fail) shareinfo.fail.apply(shareinfo.caller, shareinfo.failargs);
            }
            hw_common.mpsdk.reportEvent(hw_common_def.REPORT_VIDEOAD, shareinfo.shareid + "", "3");
        }, );
    }

    /**
     * 拉起分享,不需要考虑分享失败成功的文字提示,全部用统一的
     * 1:根据服务器sharepointlist配置决定
     * 2:不需要考虑分享失败成功的文字提示,全部用统一的,只需要考虑游戏逻辑
     * 3:不需要打点,该方法会针对shareid对各种状态打点
     * @param shareinfo 
     * @param shareinfo.shareid 后台分析统计用的分享id
     * @param shareinfo.sharekey 该分享使用的sharepointlist配置中的key值 @default: "default"
     * @param shareinfo.caller 分享方法作用域
     * @param shareinfo.success 分享成功方法
     * @param shareinfo.successargs 分享成功参数,数组类型,根据回调函数的参数决定
     * @param shareinfo.fail 分享失败方法
     * @param shareinfo.failargs 分享失败参数,数组类型,根据回调函数的参数决定
     * 
     * @param advance 是否推进sharepoint周期
     */
    public shareGet(shareinfo: {
        shareid: number,
        sharekey?: string,
        shareparam?: any,
        caller?: any,
        success?: Function,
        successargs?: Array<any>,
        fail?: Function,
        failargs?: Array<any>,
    }, advance: boolean = true): void {
        hw_common.mpsdk.reportEvent(hw_common_def.REPORT_SHARE, shareinfo.shareid + "", "0");
        hw_common.platform._share(shareinfo.shareid, shareinfo.shareparam,
            () => {
                if (advance) hw_common.share.addCycCnt(shareinfo.sharekey, true);
                if (shareinfo.success) shareinfo.success.apply(shareinfo.caller, shareinfo.successargs);
                hw_common.mpsdk.reportEvent(hw_common_def.REPORT_SHARE, shareinfo.shareid + "", "1");
            },
            () => {
                let showcancel: boolean = !hw_common.config.forceShare;
                let sharetips: string = this._getShareTips();
                hw_common.platform.showModal(
                    sharetips,
                    () => {
                        this.shareGet(shareinfo);
                    },
                    showcancel,
                    "去分享", "取消",
                    () => {
                        if (hw_common.config.sharepoint_advancetype == 1 && advance) hw_common.share.addCycCnt(shareinfo.sharekey, true);
                        if (shareinfo.fail) shareinfo.fail.apply(shareinfo.caller, shareinfo.failargs);
                    }
                );
                hw_common.mpsdk.reportEvent(hw_common_def.REPORT_SHARE, shareinfo.shareid + "", "2");
            })
    }
    private _getShareTips(): string {
        switch (this._sharefailtype) {
            case 1:
                return hw_common.config.sharefail_secondui;
            case 2:
                return hw_common.config.sharefail_modaltips_android;
            case 0:
                return hw_common.config.shareFailModalTips;
            default:
                break;
        }
    }
    /**
     * 添加周期内次数
     * @param share 是否分享
     */
    public addCycCnt(sharekey: string, share: boolean): void {
        this._updateCyc(sharekey);
        let cycinfo: CycInfo = this._getCycInfo(sharekey);
        if (share) cycinfo.sharecount++;
        cycinfo.count++;
        this._saveCycInfo();
        trace("hw_common_share::addCycCnt->增加周期内循环次数,sharekey:", cycinfo.key, "cycinfo:", cycinfo);
    }
    /**
     * 当前是该分享还是视频
     * 调用前请先自行判断游戏条件@example 每日通关数大于50不可分享
     * 分享或看视频完成后请调用addCycCnt() 增加计数
     * @param sharekey 分享周期列表key值
     * @returns true:可以分享,false,不可分享,显示视频或其他
     */
    public canShare(sharekey: string = "default"): boolean {
        if (hw_common.config.safe == false || hw_common.config.onlyVideoByCity == true || hw_common.config.isStrongFission == false) {
            trace("hw_common_share::canShare->不可分享,配置限制");
            return false;
        }
        if (this._checkCycLimit(sharekey)) {
            trace("hw_common_share::canShare->分享周期次数限制");
            return false;
        }
        //100代表分享,200代表视频
        let cycinfo: CycInfo = this._getCycInfo(sharekey);
        if (!cycinfo.sharepointlist) {
            cycinfo.sharepointlist = hw_common.config.getSharePointFromList(sharekey);
        }
        let top: number = cycinfo.sharepointlist[cycinfo.sharepointindex];
        if (cycinfo.count >= top % 100) {
            cycinfo.sharepointindex++;
            if (cycinfo.sharepointindex >= cycinfo.sharepointlist.length) {
                cycinfo.sharepointindex = 0;
            }
            cycinfo.count = 0;
            this._saveCycInfo();
        }
        top = cycinfo.sharepointlist[cycinfo.sharepointindex]
        trace("hw_common_share::canShare->shareinfo:", cycinfo);
        if (top >= 100 && top < 200) {
            return true;
        }
        else if (top >= 200) {
            return false;
        }
        return true;
    }

    //更新分享周期
    private _updateCyc(sharekey: string): void {
        let cycinfo: CycInfo = this._getCycInfo(sharekey);
        let passtime: number = hw_common.servertime.now - cycinfo.starttime;
        if (passtime > hw_common_def.DEF_SHARELIMIT_CYCLE) {
            let getTrueShareP = hw_common.config.platformConfig && this._getTrueShareFlag;
            cycinfo.sharecount = 0;
            cycinfo.starttime = hw_common.servertime.now;
            let sharepointlist: number[] = hw_common.config.getSharePointFromList(sharekey);
            if (getTrueShareP) {
                cycinfo.sharepointlist = sharepointlist;
            }
            this._saveCycInfo();
            trace("hw_common_share::updateCyc->精力周期超过,重置精力周期 key:", cycinfo.key, "cycinfo:", cycinfo);
        }
    }

    //是否达到周期内分享限制
    private _checkCycLimit(sharekey: string): boolean {
        this._updateCyc(sharekey);
        let shareinfo: CycInfo = this._getCycInfo(sharekey);
        return hw_common.servertime.now - shareinfo.starttime < hw_common_def.DEF_SHARELIMIT_CYCLE &&
            shareinfo.sharecount > hw_common_def.DEF_SHARELIMIT_MAX;
    }
}

class CycInfo {
    key: string;//sharepoint的key
    count: number;//执行次数,分享+视频等
    sharecount: number;//周期内分享次数
    starttime: number;//周期开始时间
    sharepointlist: number[];//分享配置列表
    sharepointindex: number;//分享配置当前数组索引
}