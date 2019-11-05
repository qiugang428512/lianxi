/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class btn_double_receive extends fairygui.GButton {

	public n3:fairygui.GImage;
	public n4:fairygui.GImage;

	public static URL:string = "ui://isxx5ak7quq86z";

	public static createInstance():btn_double_receive {
		return <btn_double_receive><any>(fairygui.UIPackage.createObject("game","btn_double_receive"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n3 = <fairygui.GImage><any>(this.getChildAt(0));
		this.n4 = <fairygui.GImage><any>(this.getChildAt(1));
	}
}