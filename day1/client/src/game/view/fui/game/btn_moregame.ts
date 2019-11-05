/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class btn_moregame extends fairygui.GButton {

	public button:fairygui.Controller;
	public n0:fairygui.GImage;
	public n2:fairygui.GImage;

	public static URL:string = "ui://isxx5ak7e0dy4t";

	public static createInstance():btn_moregame {
		return <btn_moregame><any>(fairygui.UIPackage.createObject("game","btn_moregame"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.button = this.getControllerAt(0);
		this.n0 = <fairygui.GImage><any>(this.getChildAt(0));
		this.n2 = <fairygui.GImage><any>(this.getChildAt(1));
	}
}