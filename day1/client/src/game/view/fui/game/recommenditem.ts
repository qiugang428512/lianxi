/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import itemrenderpanel from "./itemrenderpanel";

export default class recommenditem extends fairygui.GButton {

	public n0:itemrenderpanel;
	public n1:fairygui.GImage;
	public txt_num:fairygui.GTextField;
	public txt_name:fairygui.GTextField;

	public static URL:string = "ui://isxx5ak7quq85m";

	public static createInstance():recommenditem {
		return <recommenditem><any>(fairygui.UIPackage.createObject("game","recommenditem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n0 = <itemrenderpanel><any>(this.getChildAt(0));
		this.n1 = <fairygui.GImage><any>(this.getChildAt(1));
		this.txt_num = <fairygui.GTextField><any>(this.getChildAt(2));
		this.txt_name = <fairygui.GTextField><any>(this.getChildAt(3));
	}
}