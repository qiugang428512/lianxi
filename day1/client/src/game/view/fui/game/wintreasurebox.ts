/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import btn_yellowgetreward from "./btn_yellowgetreward";
import com_box_close from "./com_box_close";

export default class wintreasurebox extends fairygui.GComponent {

	public n10:fairygui.GImage;
	public n6:fairygui.GImage;
	public n1:fairygui.GImage;
	public n3:btn_yellowgetreward;
	public n7:fairygui.GImage;
	public n8:fairygui.GImage;
	public n9:com_box_close;
	public n2:fairygui.GTextField;
	public t0:fairygui.Transition;
	public t1:fairygui.Transition;

	public static URL:string = "ui://isxx5ak7e0dy3x";

	public static createInstance():wintreasurebox {
		return <wintreasurebox><any>(fairygui.UIPackage.createObject("game","wintreasurebox"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n10 = <fairygui.GImage><any>(this.getChildAt(0));
		this.n6 = <fairygui.GImage><any>(this.getChildAt(1));
		this.n1 = <fairygui.GImage><any>(this.getChildAt(2));
		this.n3 = <btn_yellowgetreward><any>(this.getChildAt(3));
		this.n7 = <fairygui.GImage><any>(this.getChildAt(4));
		this.n8 = <fairygui.GImage><any>(this.getChildAt(5));
		this.n9 = <com_box_close><any>(this.getChildAt(6));
		this.n2 = <fairygui.GTextField><any>(this.getChildAt(7));
		this.t0 = this.getTransitionAt(0);
		this.t1 = this.getTransitionAt(1);
	}
}