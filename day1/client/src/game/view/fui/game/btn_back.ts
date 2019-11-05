/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class btn_back extends fairygui.GButton {

	public button:fairygui.Controller;
	public n4:fairygui.GImage;

	public static URL:string = "ui://isxx5ak77suj22";

	public static createInstance():btn_back {
		return <btn_back><any>(fairygui.UIPackage.createObject("game","btn_back"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.button = this.getControllerAt(0);
		this.n4 = <fairygui.GImage><any>(this.getChildAt(0));
	}
}