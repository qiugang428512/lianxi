/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class com_back_game extends fairygui.GButton {

	public n2:fairygui.GImage;
	public n4:fairygui.GImage;

	public static URL:string = "ui://isxx5ak7quq85r";

	public static createInstance():com_back_game {
		return <com_back_game><any>(fairygui.UIPackage.createObject("game","com_back_game"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n2 = <fairygui.GImage><any>(this.getChildAt(0));
		this.n4 = <fairygui.GImage><any>(this.getChildAt(1));
	}
}