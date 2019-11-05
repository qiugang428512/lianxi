/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class gamebtn_back extends fairygui.GButton {

	public n10:fairygui.GImage;
	public n11:fairygui.GGraph;

	public static URL:string = "ui://isxx5ak7whiu5d";

	public static createInstance():gamebtn_back {
		return <gamebtn_back><any>(fairygui.UIPackage.createObject("game","gamebtn_back"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n10 = <fairygui.GImage><any>(this.getChildAt(0));
		this.n11 = <fairygui.GGraph><any>(this.getChildAt(1));
	}
}