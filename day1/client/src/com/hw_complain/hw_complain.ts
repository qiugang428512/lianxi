import { hw_complain1 } from "./inner/hw_complain1";

/**
* created by yahu
* 
*/
export default class hw_complain {
    private static _sprite: Laya.Sprite;
    /**
     * 伪造一个微信的投诉界面,并把投诉内容上传至hw_complain_config配置的服务器中:
     * @param gameid 游戏gameid,可以配置在hw_complain_config中,也可以手动传入
     * @param gamename 游戏名,可以配置在hw_complain_config中,也可以手动传入
     * @param iconurl 游戏icon,可以配置在hw_complain_config中,也可以手动传入
     * @param offsety 刘海屏向下偏移
     */
    public static create(gameid: number = null, gamename: string = null, iconurl: string = null, offsety: number = 0): Laya.Sprite {
        if (this._sprite == null) {
            this._sprite = new hw_complain1(gameid, gamename, iconurl, offsety)
        }
        return this._sprite;
    }
}