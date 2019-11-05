/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class btn_delay extends fairygui.GButton {

	public button:fairygui.Controller;
	public c1:fairygui.Controller;
	public n3:fairygui.GImage;
	public n5:fairygui.GImage;
	public n7:fairygui.GImage;
	public n8:fairygui.GImage;

	public static URL:string = "ui://isxx5ak7h5b52i";

	public static createInstance():btn_delay {
		return <btn_delay><any>(fairygui.UIPackage.createObject("game","btn_delay"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.button = this.getControllerAt(0);
		this.c1 = this.getControllerAt(1);
		this.n3 = <fairygui.GImage><any>(this.getChildAt(0));
		this.n5 = <fairygui.GImage><any>(this.getChildAt(1));
		this.n7 = <fairygui.GImage><any>(this.getChildAt(2));
		this.n8 = <fairygui.GImage><any>(this.getChildAt(3));
	}
}