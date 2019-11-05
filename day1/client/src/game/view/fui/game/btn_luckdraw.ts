/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class btn_luckdraw extends fairygui.GButton {

	public button:fairygui.Controller;
	public state:fairygui.Controller;
	public n3:fairygui.GImage;
	public n2:fairygui.GImage;
	public n4:fairygui.GImage;
	public n5:fairygui.GImage;
	public n6:fairygui.GImage;
	public n8:fairygui.GImage;

	public static URL:string = "ui://isxx5ak7e0dy57";

	public static createInstance():btn_luckdraw {
		return <btn_luckdraw><any>(fairygui.UIPackage.createObject("game","btn_luckdraw"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.button = this.getControllerAt(0);
		this.state = this.getControllerAt(1);
		this.n3 = <fairygui.GImage><any>(this.getChildAt(0));
		this.n2 = <fairygui.GImage><any>(this.getChildAt(1));
		this.n4 = <fairygui.GImage><any>(this.getChildAt(2));
		this.n5 = <fairygui.GImage><any>(this.getChildAt(3));
		this.n6 = <fairygui.GImage><any>(this.getChildAt(4));
		this.n8 = <fairygui.GImage><any>(this.getChildAt(5));
	}
}