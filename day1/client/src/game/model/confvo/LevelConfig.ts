import BaseVO from "../BaseVO";

export default class LevelConfig extends BaseVO {
    public id: number;
    public time: number;
    public img1: string;
    public img2: string;
    public rimg1: string;
    public rimg2: string;
    public point1: number[];
    public point2: number[];
    public point3: number[];
    public point4: number[];
    public point5: number[];
    constructor(obj: any = null) {
        super(obj);
    }
}