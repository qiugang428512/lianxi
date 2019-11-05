/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class com_imgwrong extends fairygui.GComponent {

	public n2:fairygui.GImage;

	public static URL:string = "ui://isxx5ak7h5b52a";

	public static createInstance():com_imgwrong {
		return <com_imgwrong><any>(fairygui.UIPackage.createObject("game","com_imgwrong"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n2 = <fairygui.GImage><any>(this.getChildAt(0));
	}
}