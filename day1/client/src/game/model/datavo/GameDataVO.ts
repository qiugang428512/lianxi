import BaseVO from "../BaseVO";
import LevelDataVO from "./LevelDataVO";
import CurrencyDataVO from "./CurrencyDataVO";
import OtherDataVO from "./OtherDataVO";

/**
* created by yahu
* 仅作为存储any数据的代码提示糖使用,没实际内存存储
*/
export default class GameDataVO {
    public levelData: LevelDataVO;//关卡数据
    public currency: CurrencyDataVO;//资源数据
    public guideOverList: number[];
    public energyStartTime: number;//精力恢复开始计时时间
    public other: OtherDataVO;//其他数据
    public savetime: number;//存档时间
    public version: string;//游戏版本号,每次版本号的时候清楚版本敏感数据
}