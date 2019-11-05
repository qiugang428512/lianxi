/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class btn_nextmore_reward extends fairygui.GButton {

	public c1:fairygui.Controller;
	public n7:fairygui.GImage;
	public n6:fairygui.GImage;
	public n8:fairygui.GImage;
	public n9:fairygui.GImage;

	public static URL:string = "ui://isxx5ak7np2abq";

	public static createInstance():btn_nextmore_reward {
		return <btn_nextmore_reward><any>(fairygui.UIPackage.createObject("game","btn_nextmore_reward"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.c1 = this.getControllerAt(0);
		this.n7 = <fairygui.GImage><any>(this.getChildAt(0));
		this.n6 = <fairygui.GImage><any>(this.getChildAt(1));
		this.n8 = <fairygui.GImage><any>(this.getChildAt(2));
		this.n9 = <fairygui.GImage><any>(this.getChildAt(3));
	}
}