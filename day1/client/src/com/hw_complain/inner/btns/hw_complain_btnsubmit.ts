import { hw_complain_utils } from "../utils/hw_complain_utils";

export class hw_complain_btnsubmit extends Laya.Sprite {
	static Color_Down: string = "#328736";
	static Color_Up: string = "#1aac19";
	static Color_stoke:string="#328736";
	protected _w: number;
	protected _h: number;
	protected _txt:string;
	protected _downSp: Laya.Sprite;
	protected _upSp: Laya.Sprite;
	public constructor(width: number, height: number,txt:string) {
		super();
		this._w = width;
		this._h = height;
		this._txt=txt;
		this._init();
		this.mouseEnabled=true;
	}

	private _init(): void {
		this.createDownBG();
		this.createUpBG();
		this.createText();
		this._downSp.visible = false;
		this._upSp.visible = true;
		this.on(Laya.Event.MOUSE_DOWN,this, this.onBegin);
		this.on(Laya.Event.MOUSE_UP,this, this.onEnd);
		this.on(Laya.Event.MOUSE_OUT,this, this.onEnd);
		// this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBegin, this);
		// this.addEventListener(egret.TouchEvent.TOUCH_END, this.onEnd, this);
		// this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onEnd, this);
		// this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onEnd, this);
	}

	private createDownBG(): void {
		this._downSp = new Laya.Sprite();
		this._downSp.graphics.drawRect(0, 0, this._w, this._h,hw_complain_btnsubmit.Color_Down,hw_complain_btnsubmit.Color_stoke,1);
		// this._downSp.graphics.beginFill(hw_complain_btnsubmit.Color_Down, 1);
		// this._downSp.graphics.lineStyle(1,hw_complain_btnsubmit.Color_stoke);
		// this._downSp.graphics.drawRoundRect(0, 0, this._w, this._h,15,15);
		// this._downSp.graphics.endFill();
		this.addChild(this._downSp);
	}

	protected createUpBG(): void {
		this._upSp = new Laya.Sprite();
		this._upSp.graphics.drawRect(0, 0, this._w, this._h,hw_complain_btnsubmit.Color_Up,hw_complain_btnsubmit.Color_stoke,1);
		// this._upSp.graphics.beginFill(hw_complain_btnsubmit.Color_Up, 1);
		// this._upSp.graphics.lineStyle(1,hw_complain_btnsubmit.Color_stoke);
		// this._upSp.graphics.drawRoundRect(0, 0, this._w, this._h,15,15);
		// this._upSp.graphics.endFill();
		this.addChild(this._upSp);
	}

	private createText(): void {
		var tousu: Laya.Text = hw_complain_utils.createText(this._txt, 34,"#ffffff");
		tousu.stroke=1;
		tousu.strokeColor=hw_complain_btnsubmit.Color_stoke;
		tousu.x = (this._w - 68)/2;
		tousu.y = (this._h - 34) / 2;
		this.addChild(tousu);
	}

	private onBegin(e: any): void {
		this._downSp.visible = true;
		this._upSp.visible = false;
	}

	private onEnd(e: any): void {
		this._downSp.visible = false;
		this._upSp.visible = true;
	}

}