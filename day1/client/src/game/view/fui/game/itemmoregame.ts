/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import item_com from "./item_com";

export default class itemmoregame extends fairygui.GButton {

	public n0:item_com;
	public n1:fairygui.GImage;
	public txt_num:fairygui.GTextField;
	public txt_name:fairygui.GTextField;

	public static URL:string = "ui://isxx5ak7quq85s";

	public static createInstance():itemmoregame {
		return <itemmoregame><any>(fairygui.UIPackage.createObject("game","itemmoregame"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n0 = <item_com><any>(this.getChildAt(0));
		this.n1 = <fairygui.GImage><any>(this.getChildAt(1));
		this.txt_num = <fairygui.GTextField><any>(this.getChildAt(2));
		this.txt_name = <fairygui.GTextField><any>(this.getChildAt(3));
	}
}