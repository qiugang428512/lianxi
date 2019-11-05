/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class btn_back_home extends fairygui.GButton {

	public button:fairygui.Controller;
	public n5:fairygui.GImage;

	public static URL:string = "ui://isxx5ak7seb11h";

	public static createInstance():btn_back_home {
		return <btn_back_home><any>(fairygui.UIPackage.createObject("game","btn_back_home"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.button = this.getControllerAt(0);
		this.n5 = <fairygui.GImage><any>(this.getChildAt(0));
	}
}