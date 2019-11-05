import { hw_complain1 } from "../hw_complain1";

export class hw_complain_utils {
	public constructor() {
	}

	public static createText(str: string, size: number = 34, color: string = "#000000"): Laya.Text {
		var tx: Laya.Text = new Laya.Text();
		tx.autoSize = true;
		tx.text = str;
		tx.font = "微软雅黑";
		tx.color = color;
		// tx.lineSpacing
		tx.fontSize = size;
		tx.width = tx.textWidth;
		tx.height = tx.textHeight;
		return tx;
	}

	public static createInputText(str: string = "", size: number = 34, color: string = "#000000"): Laya.TextInput {
		var tx: Laya.TextInput = new Laya.TextInput();
		tx.autoSize = true;
		tx.text = str;
		tx.font = "微软雅黑";
		tx.color = hw_complain1.Color_Text_Gray;
		// tx.lineSpacing
		tx.fontSize = size;
		tx.multiline = true;
		// tx.lineSpacing = 10;
		tx.width = tx.width;
		tx.height = tx.height;
		// tx.type = egret.TextFieldType.INPUT;
		return tx;
	}

	public static createBGShape(width: number, height: number, fillcolor: string, linecolor: string, lineleft: number = 0): Laya.Sprite {
		var sp: Laya.Sprite = new Laya.Sprite();
		// sp.graphics.beginFill(fillcolor, 1);
		sp.graphics.drawRect(0, 0, width, height, fillcolor, linecolor, 1);
		// sp.graphics.lineStyle(1, linecolor);
		// sp.graphics.moveTo(lineleft, height - 1);
		// sp.graphics.lineTo(width, height - 1);
		// sp.graphics.endFill();
		sp.graphics.drawLine(lineleft, height - 1, width, height - 1, linecolor, 1);
		return sp;
	}

	public static removeSelf(obj: Laya.Node): void {
		if (obj && obj.parent) {
			obj.parent.removeChild(obj);
		}
	}
}