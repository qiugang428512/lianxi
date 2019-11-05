import BaseVO from "../BaseVO";

/**
* created by yahu
* 仅作为存储any数据的代码提示糖使用,没实际内存存储
* 资源存储
*/
export default class OtherDataVO {
    public showmustshare: number;//是否弹出了必须解锁 关卡id小于等于值则认为需要弹出
    public hadGetFloatingWindow: boolean;//浮窗奖励
    public hadGetColReward: boolean;//收藏奖励
    public hadGetCsReward: boolean;//客服奖励
    public hasGetDaliyColReward: any//当天是否已经获得收藏奖励
    public hasfreelucknum: boolean;//是否含有免费抽奖次数
    public hasdoublenum: boolean;//是否有2,3倍奖励
    public gotfirstfreeluck: boolean;//是否已经获得第一次免费奖励(第一次要3个奖励)
    public gotofflinetm: number;
}