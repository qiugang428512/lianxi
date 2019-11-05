import Box from './listbox';
import Def from '../../def';
import ListView from './listview';
import Item from './item';
import Utils from '../../utils';

export default class FriendRank {
    constructor(stage) {
        this.stage = stage;
    }
    show(top) {
        this.top = top;
        Utils.loadCloudData([Def.CLOUDKEY_BESTSCORE], this.render.bind(this));
    }
    render(listdata) {
      console.log("显示共享域", listdata)
        if (!listdata || !listdata.length) return;

        let data = Utils.getSortedListData(listdata, Def.CLOUDKEY_BESTSCORE);
        let mydata = Utils.getMyData(data);

        let box = new Box(Def.RANKPANEL_WIDTH, Def.RANKPANEL_HEIGHT);
        box.resetHeight();
        box.x = (Def.STAGEWIDTH - box.width) / 2;
        box.y = this.top;
        this.stage.addChild(box);

        let list = new ListView(Def.RANKPANEL_WIDTH, Def.RANKLIST_HEIGHT);
        list.array = data;
        box.addChild(list);

        let item = new Item(Def.RANKPANEL_WIDTH, Def.RANKITEM_HEIGHT,true);
        item.pos(0, Def.RANKPANEL_HEIGHT - Def.RANKITEM_HEIGHT);
        item.dataSource = mydata;
        box.addChild(item);
    }
}