export class hw_complain_btnbase extends Laya.Sprite {
	static Color_Down: string = "#d8d7dc";
	static Color_Up: string = "#ffffff";//"#ffffff";
	private _upAlpha:number;
	protected _w: number;
	protected _h: number;
	protected _downSp: Laya.Sprite;
	protected _upSp: Laya.Sprite;
	public constructor(width: number, height: number,upalpha:number=1) {
		super();
		this._w = width;
		this._h = height;
		this._upAlpha=upalpha;
		this._init();
		this.mouseEnabled=true;
	}

	private _init(): void {
		this.createDownBG();
		this.createUpBG();
		this._downSp.visible = false;
		this._upSp.visible = true;
		this.on(Laya.Event.MOUSE_DOWN,this, this.onBegin);
		this.on(Laya.Event.MOUSE_UP,this, this.onEnd);
		this.on(Laya.Event.MOUSE_OUT,this, this.onEnd);
		// this.on(egret.TouchEvent.TOUCH_CANCEL, this.onEnd, this);
	}

	private createDownBG(): void {
		this._downSp = new Laya.Sprite();
		this._downSp.graphics.drawRect(0, 0, this._w, this._h,hw_complain_btnbase.Color_Down);
		// this._downSp.graphics.beginFill(hw_complain_btnbase.Color_Down, 1);
		// this._downSp.graphics.drawRect(0, 0, this._w, this._h);
		// this._downSp.graphics.endFill();
		this.addChild(this._downSp);
	}

	protected createUpBG(): void {
		this._upSp = new Laya.Sprite();
		this._downSp.graphics.drawRect(0, 0, this._w, this._h,hw_complain_btnbase.Color_Up);
		this._downSp.alpha = this._upAlpha;
		// this._upSp.graphics.beginFill(hw_complain_btnbase.Color_Up, this._upAlpha);
		// this._upSp.graphics.drawRect(0, 0, this._w, this._h);
		// this._upSp.graphics.endFill();
		this.addChild(this._upSp);
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