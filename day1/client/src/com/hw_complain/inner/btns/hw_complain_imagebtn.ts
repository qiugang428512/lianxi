import { hw_complain1 } from "../hw_complain1";
import { hw_complain_utils } from "../utils/hw_complain_utils";

export class hw_complain_imagebtn extends Laya.Sprite {

	static HWLen: number = 156;
	private _bit: Laya.Sprite = null;
	public constructor() {
		super();
		this.init();
	}

	private init(): void {
		this.graphics.drawRect(0, 0, hw_complain_imagebtn.HWLen, hw_complain_imagebtn.HWLen, hw_complain1.Color_White, hw_complain1.Color_line, 2);
		this.graphics.drawLine(hw_complain_imagebtn.HWLen / 4, hw_complain_imagebtn.HWLen / 2,
			hw_complain_imagebtn.HWLen / 4 * 3, hw_complain_imagebtn.HWLen / 2, hw_complain1.Color_line, 2);
		this.graphics.drawLine(hw_complain_imagebtn.HWLen / 2, hw_complain_imagebtn.HWLen / 4,
			hw_complain_imagebtn.HWLen / 2, hw_complain_imagebtn.HWLen / 4 * 3, hw_complain1.Color_line, 2);
	}

	public SetBit(bit: Laya.Sprite): void {
		if (bit == null) {
			return;
		}
		if (this._bit) {
			hw_complain_utils.removeSelf(this._bit);
		}
		this._bit = bit;
		this.addChild(this._bit);
		this._bit.width = this._bit.height = hw_complain_imagebtn.HWLen;
	}
}