/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class btn_gift extends fairygui.GButton {

	public button:fairygui.Controller;
	public n0:fairygui.GImage;
	public n4:fairygui.GImage;
	public redpoint:fairygui.GGraph;

	public static URL:string = "ui://isxx5ak7ubk7z";

	public static createInstance():btn_gift {
		return <btn_gift><any>(fairygui.UIPackage.createObject("game","btn_gift"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.button = this.getControllerAt(0);
		this.n0 = <fairygui.GImage><any>(this.getChildAt(0));
		this.n4 = <fairygui.GImage><any>(this.getChildAt(1));
		this.redpoint = <fairygui.GGraph><any>(this.getChildAt(2));
	}
}