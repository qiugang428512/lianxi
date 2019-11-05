/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class btn_img extends fairygui.GButton {

	public button:fairygui.Controller;
	public n0:fairygui.GImage;
	public n4:fairygui.GImage;

	public static URL:string = "ui://isxx5ak7ubk710";

	public static createInstance():btn_img {
		return <btn_img><any>(fairygui.UIPackage.createObject("game","btn_img"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.button = this.getControllerAt(0);
		this.n0 = <fairygui.GImage><any>(this.getChildAt(0));
		this.n4 = <fairygui.GImage><any>(this.getChildAt(1));
	}
}