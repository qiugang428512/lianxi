/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import btn_close from "./btn_close";

export default class winlevel extends fairygui.GComponent {

	public n0:fairygui.GImage;
	public n7:fairygui.GImage;
	public n4:fairygui.GImage;
	public n5:fairygui.GImage;
	public level_list:fairygui.GList;
	public btn_Close:btn_close;

	public static URL:string = "ui://isxx5ak7seb11n";

	public static createInstance():winlevel {
		return <winlevel><any>(fairygui.UIPackage.createObject("game","winlevel"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n0 = <fairygui.GImage><any>(this.getChildAt(0));
		this.n7 = <fairygui.GImage><any>(this.getChildAt(1));
		this.n4 = <fairygui.GImage><any>(this.getChildAt(2));
		this.n5 = <fairygui.GImage><any>(this.getChildAt(3));
		this.level_list = <fairygui.GList><any>(this.getChildAt(4));
		this.btn_Close = <btn_close><any>(this.getChildAt(5));
	}
}