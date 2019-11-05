/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class btn_yellowgetreward extends fairygui.GButton {

	public c1:fairygui.Controller;
	public n3:fairygui.GImage;
	public n4:fairygui.GImage;
	public n5:fairygui.GImage;
	public n7:fairygui.GImage;

	public static URL:string = "ui://isxx5ak7xsvo8h";

	public static createInstance():btn_yellowgetreward {
		return <btn_yellowgetreward><any>(fairygui.UIPackage.createObject("game","btn_yellowgetreward"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.c1 = this.getControllerAt(0);
		this.n3 = <fairygui.GImage><any>(this.getChildAt(0));
		this.n4 = <fairygui.GImage><any>(this.getChildAt(1));
		this.n5 = <fairygui.GImage><any>(this.getChildAt(2));
		this.n7 = <fairygui.GImage><any>(this.getChildAt(3));
	}
}