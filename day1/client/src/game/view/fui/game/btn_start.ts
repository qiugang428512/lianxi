/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class btn_start extends fairygui.GButton {

	public n0:fairygui.GImage;
	public start_btn_level:fairygui.GTextField;

	public static URL:string = "ui://isxx5ak7ubk7t";

	public static createInstance():btn_start {
		return <btn_start><any>(fairygui.UIPackage.createObject("game","btn_start"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n0 = <fairygui.GImage><any>(this.getChildAt(0));
		this.start_btn_level = <fairygui.GTextField><any>(this.getChildAt(1));
	}
}