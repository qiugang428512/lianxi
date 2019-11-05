/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class btn_receive extends fairygui.GButton {

	public button:fairygui.Controller;
	public state:fairygui.Controller;
	public n10:fairygui.GImage;
	public n7:fairygui.GImage;
	public n9:fairygui.GImage;
	public n8:fairygui.GImage;

	public static URL:string = "ui://isxx5ak7seb11v";

	public static createInstance():btn_receive {
		return <btn_receive><any>(fairygui.UIPackage.createObject("game","btn_receive"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.button = this.getControllerAt(0);
		this.state = this.getControllerAt(1);
		this.n10 = <fairygui.GImage><any>(this.getChildAt(0));
		this.n7 = <fairygui.GImage><any>(this.getChildAt(1));
		this.n9 = <fairygui.GImage><any>(this.getChildAt(2));
		this.n8 = <fairygui.GImage><any>(this.getChildAt(3));
	}
}