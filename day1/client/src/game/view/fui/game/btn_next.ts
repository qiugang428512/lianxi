/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class btn_next extends fairygui.GButton {

	public button:fairygui.Controller;
	public n7:fairygui.GImage;
	public n8:fairygui.GImage;
	public n9:fairygui.GImage;
	public n10:fairygui.GImage;

	public static URL:string = "ui://isxx5ak7seb11i";

	public static createInstance():btn_next {
		return <btn_next><any>(fairygui.UIPackage.createObject("game","btn_next"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.button = this.getControllerAt(0);
		this.n7 = <fairygui.GImage><any>(this.getChildAt(0));
		this.n8 = <fairygui.GImage><any>(this.getChildAt(1));
		this.n9 = <fairygui.GImage><any>(this.getChildAt(2));
		this.n10 = <fairygui.GImage><any>(this.getChildAt(3));
	}
}