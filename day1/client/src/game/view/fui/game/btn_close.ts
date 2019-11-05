/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class btn_close extends fairygui.GButton {

	public n6:fairygui.GImage;

	public static URL:string = "ui://isxx5ak7seb11o";

	public static createInstance():btn_close {
		return <btn_close><any>(fairygui.UIPackage.createObject("game","btn_close"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n6 = <fairygui.GImage><any>(this.getChildAt(0));
	}
}