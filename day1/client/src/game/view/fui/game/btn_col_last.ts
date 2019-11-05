/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class btn_col_last extends fairygui.GButton {

	public n21:fairygui.GImage;
	public n22:fairygui.GImage;

	public static URL:string = "ui://isxx5ak7bxhoa5";

	public static createInstance():btn_col_last {
		return <btn_col_last><any>(fairygui.UIPackage.createObject("game","btn_col_last"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n21 = <fairygui.GImage><any>(this.getChildAt(0));
		this.n22 = <fairygui.GImage><any>(this.getChildAt(1));
	}
}