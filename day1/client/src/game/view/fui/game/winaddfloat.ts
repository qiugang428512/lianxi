/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import Button_IKnow from "./Button_IKnow";

export default class winaddfloat extends fairygui.GComponent {

	public n43:fairygui.GGraph;
	public n21:fairygui.GTextField;
	public btn_Close:Button_IKnow;
	public n30:fairygui.GImage;
	public n31:fairygui.GImage;
	public n32:fairygui.GImage;
	public n33:fairygui.GTextField;
	public n34:fairygui.GTextField;
	public n37:fairygui.GTextField;
	public n41:fairygui.GImage;
	public n42:fairygui.GImage;

	public static URL:string = "ui://isxx5ak7quq861";

	public static createInstance():winaddfloat {
		return <winaddfloat><any>(fairygui.UIPackage.createObject("game","winaddfloat"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n43 = <fairygui.GGraph><any>(this.getChildAt(0));
		this.n21 = <fairygui.GTextField><any>(this.getChildAt(1));
		this.btn_Close = <Button_IKnow><any>(this.getChildAt(2));
		this.n30 = <fairygui.GImage><any>(this.getChildAt(3));
		this.n31 = <fairygui.GImage><any>(this.getChildAt(4));
		this.n32 = <fairygui.GImage><any>(this.getChildAt(5));
		this.n33 = <fairygui.GTextField><any>(this.getChildAt(6));
		this.n34 = <fairygui.GTextField><any>(this.getChildAt(7));
		this.n37 = <fairygui.GTextField><any>(this.getChildAt(8));
		this.n41 = <fairygui.GImage><any>(this.getChildAt(9));
		this.n42 = <fairygui.GImage><any>(this.getChildAt(10));
	}
}