/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class closebtn extends fairygui.GButton {

	public button:fairygui.Controller;
	public n1:fairygui.GImage;

	public static URL:string = "ui://isxx5ak7pkb0ah";

	public static createInstance():closebtn {
		return <closebtn><any>(fairygui.UIPackage.createObject("game","closebtn"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.button = this.getControllerAt(0);
		this.n1 = <fairygui.GImage><any>(this.getChildAt(0));
	}
}