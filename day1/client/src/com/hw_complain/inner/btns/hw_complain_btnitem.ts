import { hw_complain_btnbase } from "./hw_complain_btnbase";
import { hw_complain1 } from "../hw_complain1";
import { hw_complain_utils } from "../utils/hw_complain_utils";

export class hw_complain_btnitem extends hw_complain_btnbase {

	private _data: any;

	public constructor(width: number, data: any) {
		super(width, 90);
		this._data = data;
		this.autoSize = true;
		this.init();
	}

	private init(): void {
		this.createline();
		this.createText();
		this.createArrow();
	}

	private createline(): void {
		var sp: Laya.Sprite = new Laya.Sprite();
		sp.graphics.drawLine(hw_complain1.Left, 90 - 1,720, 90 - 1,hw_complain1.Color_line,1);
		// sp.graphics.lineStyle(1, hw_complain.Color_line);
		// sp.graphics.moveTo(hw_complain.Left, this.height - 1)
		// sp.graphics.lineTo(this.width, this.height - 1);
		// sp.graphics.endFill();
		this.addChild(sp);
	}

	private createText(): void {
		var tousu: Laya.Text = hw_complain_utils.createText(this._data.txt, 34);
		tousu.x = hw_complain1.Left;
		tousu.y = (90 - 34) / 2;
		this.addChild(tousu);
	}

	private createArrow(): void {
		if (this._data.sub == null) {
			return;
		}
		var tousu: Laya.Text = hw_complain_utils.createText(">", 34,hw_complain1.Color_Text_Gray);
		tousu.x = 720 - tousu.width - 20;
		tousu.y = (90 - 32) / 2;
		this.addChild(tousu);
	}
}