import Sprite from "../../engine/sprite";
import ClipBox from "./listbox";
import List from "../../engine/list";
import Def from "../../def";

export default class ListView extends Sprite {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
        this.render();
    }
    render() {
        let box = new ClipBox(this.width, this.height);
        box.resetHeight();
        box.pos(0, 0);
        this.addChild(box);

        this.list = new List(this.width, this.height, Def.RANKITEM_HEIGHT);
        box.addChild(this.list);
    }
    set array(value) {
        this.list.array = value;
    }
}