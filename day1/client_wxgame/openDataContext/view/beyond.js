import Utils from '../utils';
import Sprite from '../engine/sprite';
import Bitmap from '../engine/bitmap';
import Def from '../def';
import Text from '../engine/text';
export default class Beyond {
    constructor(stage) {
        this.stage = stage;
    }
    show(score, top) {
        this.top = top;
        this.score = score;
        Utils.loadCloudData([Def.CLOUDKEY_BESTSCORE], this.render.bind(this));
    }
    render(listdata) {
        if (!listdata || !listdata.length) return;
        let data = Utils.getSortedListData(listdata, Def.CLOUDKEY_BESTSCORE);
        let beyonddata = Utils.getBeyondData(this.score, data);
        if (!beyonddata) return;

        let decscore = beyonddata.score - this.score;

        var sp = new Sprite();
        sp.width = 240;
        sp.height = 83;
        sp.y = this.top;
        sp.x = 70;

        this._bg = new Bitmap();
        this._bg.width = 240;
        this._bg.height = 83;
        sp.addChildAt(this._bg, 0);

        var headicon = new Bitmap();
        headicon.height = headicon.width = 64;
        headicon.x = 8;
        headicon.y = 8;
        headicon.skin = beyonddata.src;
        sp.addChild(headicon);

        let txt1 = this.createText("还差" + decscore + "关");
        sp.addChild(txt1);
        txt1.x = 75;
        txt1.y = 10;

        let txt2 = this.createText("超越TA");
        sp.addChild(txt2);
        txt2.x = 75;
        txt2.y = 45;

        this.stage.addChild(sp);
    }

    createText(str) {
        let txt = new Text();
        txt.color = "#552e14";
        txt.fontSize = 25;

        txt.width = 160;
        txt.height = 70;
        txt.valign = 'top';
        txt.align = 'left';
        txt.text = str;
        return txt;
    }

}