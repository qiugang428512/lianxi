import { hw_complain_btnbase } from "./hw_complain_btnbase";

export class hw_complain_btnclose extends hw_complain_btnbase {

	public constructor() {
		super(80, 80,0);
		this.init();
	}

	private init(): void {
		this.createX();
	}

	private createX(): void {
		var sp: Laya.Sprite = new Laya.Sprite();
		sp.graphics.drawLine(0, 0,30, 30,"#000000",3);
		// sp.graphics.lineStyle(3, 0x000000);
		// sp.graphics.moveTo(0, 0)
		// sp.graphics.lineTo(30, 30);
		sp.graphics.drawLine(0, 30,30, 0,"#000000",3);
		// sp.graphics.moveTo(0, 30);
		// sp.graphics.lineTo(30, 0);
		// sp.graphics.endFill();
		this.addChild(sp);
		sp.x = sp.y = 25;
	}
}