import Sprite from '../../engine/sprite';
import Bitmap from '../../engine/bitmap';
import Text from '../../engine/text';
import Def from '../../def';

export default class Item extends Sprite {
    constructor(width, height, isme) {
        super();
        this._isme = isme;
        this._bgColor = '';
        this.size(width, height);

        this._initBG();
        this._initHeadIcon();
        this._initScore();
        this._initName();
        this._initIndexTXT();
        this._initIndexImg();
    }

    _initBG() {
        this._bg = new Bitmap();
        this._bg.width = Def.RANKPANEL_WIDTH;
        this._bg.height = 116;
        if (this._isme) {
            this._bg.skin = Def.IMAGE_MYITEMBG;
        }
        else {
            this._bg.skin = Def.IMAGE_MYITEMBG1;
        }
        this.addChildAt(this._bg, 0);
    }
    _initHeadIcon() {
        this.img = new Bitmap();
        this.img.width = 70;
        this.img.height = 70;
        this.img.x = 108;
        this.img.y = (this.height - this.img.height) / 2;
        this.addChild(this.img);
    }
    _initScore() {
        this.scoreText = new Text();
        this.scoreText.color = "#394278";
        this.scoreText.fontSize = 28;
        this.scoreText.x = 500;
        this.scoreText.y = this.height / 2;
        this.scoreText.width = 331;
        this.scoreText.valign = 'middle';
        this.scoreText.align = 'right';
        this.addChild(this.scoreText);
    }
    _initName() {
        this.nickText = new Text();
        this.nickText.color = "#394278";
        this.nickText.fontSize = 28;
        this.nickText.x = 198;
        this.nickText.valign = 'middle';
        this.scoreText.width = 331;
        this.nickText.y = this.height / 2;
        this.addChild(this.nickText);
    }
    _initIndexImg() {
        this.indexImg = new Bitmap();
        this.indexImg.width = 70;
        this.indexImg.height = 70;
        this.indexImg.x = 24;
        this.indexImg.y = (this.height - this.indexImg.height) / 2;
    }
    _initIndexTXT() {
        this.indexText = new Text();
        this.indexText.color = "#394278";
        this.indexText.fontSize = 28;
        this.indexText.x = 55;
        this.indexText.align = 'center';
        this.indexText.valign = 'middle';
        this.indexText.y = this.height / 2;
        this.addChild(this.indexText);
    }
    setHeadImgSrc(src) {
        this.img.src = src;
    }
    setNick(nick) {
        this.nick.text = nick;
    }
    set dataSource(value) {
        this.setData(value);
    }
    setData(data) {
        this.scoreText.text = '第' + (data.score || 0) + '关';
        this.nickText.text = data.nick + '';
        this.indexText.text = data.rank >= 4 ? data.rank + '' : '';
        this.img.skin = data.src;
        this.setIndex(data.rank);
    }
    setScore(score) {
        this.score.text = score;
    }
    setIndex(rank) {
        if (rank >= 4) {
            this.indexImg.removeSelf();
            return;
        }
        this.indexImg.skin="openDataContext/assets/"+rank+".png";
        this.addChild(this.indexImg);
    }
}