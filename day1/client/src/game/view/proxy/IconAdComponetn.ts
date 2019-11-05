import com_gameicon from "../fui/game/com_gameicon";
import TimeMgr, { TimeBindType } from "../../control/TimeMgr";
import GameMgr from "../../control/game/GameMgr";

export default class IconAdComponetn {
    private static _ins: IconAdComponetn;
    public static get Inst() {
        if (!this._ins) {
            this._ins = new IconAdComponetn();
        }
        return this._ins;
    }
	/**
	 * @param parent 添加到的容器
	 * @param startY 开始的Y坐标
     * @param paramet {width:图标宽,height:图标高,lineSpacing:图标行距,columnSpacing:图标列距}
	 * @param columnNum 列数
	 * @param lineSpacing 行间距
	 * @param columnSpacing 列间距
	 * @param maxLen 最多的icon数
	 * @param isBoth 是否是两侧边的广告，若为true，则列数强行为2行
	 * @param bothInterval 到两侧边到icon的距离
	 */
    public addSymmetryGameIcon(parent: any, startY: number = 0, columnNum: number = 1, paramet: { width?: number, height?: number, lineSpacing: number, columnSpacing: number }, maxLen: number = 0, isBoth: boolean = false, bothInterval: number = 20) {
        mpsdk.Ad.getSuggestList(true, maxLen, GameMgr.Inst.level)
            .then((data: any) => {
                trace("开始创建广告图标:", data);
                for (let i = 0; i < data.length; i++) {
                    let itemIcon: com_gameicon = com_gameicon.createInstance();
                    itemIcon.width = paramet.width || 100;
                    itemIcon.height = paramet.height || 100;
                    if (isBoth) {
                        columnNum = 2;//如果是侧边广告则默认两列
                        itemIcon.x = i % columnNum == 0 ? bothInterval : parent.width - itemIcon.width - bothInterval;
                    } else {
                        itemIcon.x = (parent.width - itemIcon.width * columnNum - paramet.columnSpacing * (columnNum - 1)) / 2 + i % columnNum * (itemIcon.width + paramet.columnSpacing);
                    }
                    itemIcon.y = startY + Math.floor(i / columnNum) * (itemIcon.width + paramet.lineSpacing);

                    parent.addChild(itemIcon);

                    //动态图
                    // itemIcon.displayListContainer.addChild(mpsdk.ui.LayaADSingleUI.Create(data[i], 100, false));
                    // if (data[i].icon.indexOf(".gif") >= 0) {
                    itemIcon.n0.icon_img.url = data[i].icon;
                    itemIcon.onClick(this, () => {
                        mpsdk.Ad.click(data[i]);
                    });
                    // }
                    setTimeout(() => {
                        TimeMgr.Inst.addTimeEvent(3000, TimeBindType.Loop, () => {
                            itemIcon.t1.play(null, 1)
                        })
                    }, Math.random() * 200);
                }
            });
    }
    /**
     * 添加浮标广告
     */
    private buoyAdIcon: com_gameicon;
    private nowIconData: any;
    public addBuoyAd(parent: any, x: number, y: number) {
        if (!this.buoyAdIcon) {
            this.buoyAdIcon = com_gameicon.createInstance();
            this.buoyAdIcon.width = 100;
            this.buoyAdIcon.height = 100;
            this.buoyAdIcon.x = x;
            this.buoyAdIcon.y = y;
        }
        this.updateIcon();
        parent.addChild(this.buoyAdIcon);
        this.startTiming();
        setTimeout(() => {
            TimeMgr.Inst.addTimeEvent(3000, TimeBindType.Loop, () => {
                this.buoyAdIcon.t1.play(null, 1)
            })
        }, 200);
        return this.buoyAdIcon;
    }
    private updateIcon() {
        if (this.buoyAdIcon) {
            mpsdk.Ad.getRecommendInfo()
                .then(res => {
                    this.buoyAdIcon.n0.icon_img.url = res.icon;
                    this.nowIconData = res;
                    this.buoyAdIcon.offClick(this, this.clickIcon);
                    this.buoyAdIcon.onClick(this, this.clickIcon);
                })
        }
    }
    private clickIcon() {
        mpsdk.Ad.click(this.nowIconData);
    }
    private startTiming() {
        let UPDATE_TIME: number = 2000;
        TimeMgr.Inst.addTimeEvent(UPDATE_TIME, TimeBindType.Loop, this.updateIcon, this);
    }
    public removeTiming() {
        TimeMgr.Inst.removeTimeEvent(this.updateIcon, this);
    }

}
export enum iconAdType {
    both,//两侧广告
    lineAndcolumn,//行列广告
}