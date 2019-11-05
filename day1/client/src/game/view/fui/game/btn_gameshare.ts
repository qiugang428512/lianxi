/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class btn_gameshare extends fairygui.GButton {

	public button:fairygui.Controller;
	public n0:fairygui.GImage;
	public n9:fairygui.GImage;

	public static URL:string = "ui://isxx5ak7nqrsay";

	public static createInstance():btn_gameshare {
		return <btn_gameshare><any>(fairygui.UIPackage.createObject("game","btn_gameshare"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.button = this.getControllerAt(0);
		this.n0 = <fairygui.GImage><any>(this.getChildAt(0));
		this.n9 = <fairygui.GImage><any>(this.getChildAt(1));
	}
}