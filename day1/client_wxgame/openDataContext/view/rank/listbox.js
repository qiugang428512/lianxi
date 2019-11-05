import Sprite from '../../engine/sprite';
import Graphic from '../../engine/graphic';
export default class ClipBox extends Sprite{
    constructor(width, height){
        super();
        this.width = width;
        this.height = height;
    }
    renderBg() {
        let bg = new Graphic();
        bg.drawRect(0, 0, this.width, this.height, 'rgba(0,0,0,0)');
        this.addChildAt(bg, 0);
    }
    resetHeight(){
        this.clearAction();
        this.clipRect(0, 0, this.width, this.height);
    }
}