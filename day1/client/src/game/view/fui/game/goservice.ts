/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class goservice extends fairygui.GButton {

	public button:fairygui.Controller;
	public n0:fairygui.GImage;
	public n1:fairygui.GImage;

	public static URL:string = "ui://isxx5ak7k97h7q";

	public static createInstance():goservice {
		return <goservice><any>(fairygui.UIPackage.createObject("game","goservice"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.button = this.getControllerAt(0);
		this.n0 = <fairygui.GImage><any>(this.getChildAt(0));
		this.n1 = <fairygui.GImage><any>(this.getChildAt(1));
	}
}