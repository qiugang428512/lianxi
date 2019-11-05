/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import btn_confirm from "./btn_confirm";
import promotion_close from "./promotion_close";

export default class winpromotionreward extends fairygui.GComponent {

	public n9:fairygui.GImage;
	public n14:fairygui.GImage;
	public level_name_icon:fairygui.GLoader;
	public n12:fairygui.GImage;
	public n13:fairygui.GImage;
	public n24:fairygui.GImage;
	public n15:fairygui.GImage;
	public btn_promotion_reward:btn_confirm;
	public n25:promotion_close;
	public n29:fairygui.GImage;
	public n30:fairygui.GTextField;

	public static URL:string = "ui://isxx5ak77suj2w";

	public static createInstance():winpromotionreward {
		return <winpromotionreward><any>(fairygui.UIPackage.createObject("game","winpromotionreward"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n9 = <fairygui.GImage><any>(this.getChildAt(0));
		this.n14 = <fairygui.GImage><any>(this.getChildAt(1));
		this.level_name_icon = <fairygui.GLoader><any>(this.getChildAt(2));
		this.n12 = <fairygui.GImage><any>(this.getChildAt(3));
		this.n13 = <fairygui.GImage><any>(this.getChildAt(4));
		this.n24 = <fairygui.GImage><any>(this.getChildAt(5));
		this.n15 = <fairygui.GImage><any>(this.getChildAt(6));
		this.btn_promotion_reward = <btn_confirm><any>(this.getChildAt(7));
		this.n25 = <promotion_close><any>(this.getChildAt(8));
		this.n29 = <fairygui.GImage><any>(this.getChildAt(9));
		this.n30 = <fairygui.GTextField><any>(this.getChildAt(10));
	}
}