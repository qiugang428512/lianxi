/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class Button_IKnow extends fairygui.GButton {

	public button:fairygui.Controller;
	public n1:fairygui.GImage;

	public static URL:string = "ui://isxx5ak7quq862";

	public static createInstance():Button_IKnow {
		return <Button_IKnow><any>(fairygui.UIPackage.createObject("game","Button_IKnow"));
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