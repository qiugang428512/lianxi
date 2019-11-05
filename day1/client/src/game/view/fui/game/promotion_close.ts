/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class promotion_close extends fairygui.GComponent {

	public n27:fairygui.GTextField;
	public n28:fairygui.GGraph;

	public static URL:string = "ui://isxx5ak7mfc0bf";

	public static createInstance():promotion_close {
		return <promotion_close><any>(fairygui.UIPackage.createObject("game","promotion_close"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n27 = <fairygui.GTextField><any>(this.getChildAt(0));
		this.n28 = <fairygui.GGraph><any>(this.getChildAt(1));
	}
}