import BaseVO from "../BaseVO";

export default class LevelGift extends BaseVO {
    public id: number;
    public type: number;//0:无,1:荣耀,2:抽奖
    constructor(obj: any = null) {
        super(obj);
    }
}