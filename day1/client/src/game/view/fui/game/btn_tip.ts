/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class btn_tip extends fairygui.GButton {

	public button:fairygui.Controller;
	public c1:fairygui.Controller;
	public n0:fairygui.GImage;
	public n6:fairygui.GImage;
	public n7:fairygui.GImage;
	public n9:fairygui.GImage;
	public redpoint:fairygui.GGraph;

	public static URL:string = "ui://isxx5ak7seb11d";

	public static createInstance():btn_tip {
		return <btn_tip><any>(fairygui.UIPackage.createObject("game","btn_tip"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.button = this.getControllerAt(0);
		this.c1 = this.getControllerAt(1);
		this.n0 = <fairygui.GImage><any>(this.getChildAt(0));
		this.n6 = <fairygui.GImage><any>(this.getChildAt(1));
		this.n7 = <fairygui.GImage><any>(this.getChildAt(2));
		this.n9 = <fairygui.GImage><any>(this.getChildAt(3));
		this.redpoint = <fairygui.GGraph><any>(this.getChildAt(4));
	}
}