/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import closebtn from "./closebtn";

export default class winauthor extends fairygui.GComponent {

	public n1:fairygui.GImage;
	public btn_ok:closebtn;
	public t2:fairygui.GTextField;
	public t1:fairygui.GTextField;

	public static URL:string = "ui://isxx5ak7vni6b9";

	public static createInstance():winauthor {
		return <winauthor><any>(fairygui.UIPackage.createObject("game","winauthor"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n1 = <fairygui.GImage><any>(this.getChildAt(0));
		this.btn_ok = <closebtn><any>(this.getChildAt(1));
		this.t2 = <fairygui.GTextField><any>(this.getChildAt(2));
		this.t1 = <fairygui.GTextField><any>(this.getChildAt(3));
	}
}