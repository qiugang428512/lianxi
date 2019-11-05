/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class btn_col_next extends fairygui.GButton {

	public n13:fairygui.GImage;
	public n14:fairygui.GImage;

	public static URL:string = "ui://isxx5ak7bxhoa1";

	public static createInstance():btn_col_next {
		return <btn_col_next><any>(fairygui.UIPackage.createObject("game","btn_col_next"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n13 = <fairygui.GImage><any>(this.getChildAt(0));
		this.n14 = <fairygui.GImage><any>(this.getChildAt(1));
	}
}