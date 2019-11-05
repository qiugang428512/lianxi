import { DataDef } from "../../def/DataDef";
import TimeUtils from "../../../com/hw_utils/TimeUtils";

/**
 * 红点管理
 */
export default class RedPointMgr {
    private static _INST: RedPointMgr;
    constructor() {

    }
    public static get Inst(): RedPointMgr {
        if (RedPointMgr._INST == null) {
            RedPointMgr._INST = new RedPointMgr();
        }
        return RedPointMgr._INST;
    }

    public CheckMainUpRedPoint(): boolean {
        // if (PlayerMgr.Inst.canAddWife == true || PlayerMgr.Inst.canUpPlayer == true || PlayerMgr.Inst.canUpHouse == true) {
        //     return true;
        // }
        return false;
    }

    // 获取红点数据
    private getRedPointData() {
        return JSON.parse(Laya.LocalStorage.getItem(DataDef.REDPOINTDATA) || '{}');
    }
    // 判断按钮是否有红点
    public judeFloatWinRedPoint(type: RedPointType) {
        let redPointDatas1 = this.getRedPointData();
        let data = redPointDatas1[type] || null;
        console.log('是否是同一天：', TimeUtils.IsSameDay(data, +new Date()));
        return data && TimeUtils.IsSameDay(data, +new Date());
    }
    // 保存点击红点数据
    public saveRedPoint(type: RedPointType) {
        let redPointData = this.getRedPointData() || {};
        redPointData[type] = +new Date();
        Laya.LocalStorage.setItem(DataDef.REDPOINTDATA, JSON.stringify(redPointData));
    }
}
export enum RedPointType {
    floatWindow,//浮窗按钮
    service,//客服会话
    addMyGame,//收藏到我的小程序
}