/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class btn_confirm extends fairygui.GButton {

	public n23:fairygui.GImage;
	public n26:fairygui.GImage;
	public n27:fairygui.GImage;

	public static URL:string = "ui://isxx5ak77suj3c";

	public static createInstance():btn_confirm {
		return <btn_confirm><any>(fairygui.UIPackage.createObject("game","btn_confirm"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n23 = <fairygui.GImage><any>(this.getChildAt(0));
		this.n26 = <fairygui.GImage><any>(this.getChildAt(1));
		this.n27 = <fairygui.GImage><any>(this.getChildAt(2));
	}
}