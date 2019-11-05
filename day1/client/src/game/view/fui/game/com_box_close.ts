/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class com_box_close extends fairygui.GComponent {

	public n9:fairygui.GImage;

	public static URL:string = "ui://isxx5ak7evk28r";

	public static createInstance():com_box_close {
		return <com_box_close><any>(fairygui.UIPackage.createObject("game","com_box_close"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n9 = <fairygui.GImage><any>(this.getChildAt(0));
	}
}