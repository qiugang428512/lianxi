/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class com_gold extends fairygui.GButton {

	public n0:fairygui.GImage;
	public txt:fairygui.GTextField;
	public n4:fairygui.GImage;
	public n5:fairygui.GImage;

	public static URL:string = "ui://isxx5ak7ubk7p";

	public static createInstance():com_gold {
		return <com_gold><any>(fairygui.UIPackage.createObject("game","com_gold"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n0 = <fairygui.GImage><any>(this.getChildAt(0));
		this.txt = <fairygui.GTextField><any>(this.getChildAt(1));
		this.n4 = <fairygui.GImage><any>(this.getChildAt(2));
		this.n5 = <fairygui.GImage><any>(this.getChildAt(3));
	}
}