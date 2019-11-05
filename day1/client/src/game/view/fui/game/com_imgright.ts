/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class com_imgright extends fairygui.GComponent {

	public c1:fairygui.Controller;
	public n1:fairygui.GImage;
	public n2:fairygui.GImage;
	public n3:fairygui.GImage;

	public static URL:string = "ui://isxx5ak7h5b529";

	public static createInstance():com_imgright {
		return <com_imgright><any>(fairygui.UIPackage.createObject("game","com_imgright"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.c1 = this.getControllerAt(0);
		this.n1 = <fairygui.GImage><any>(this.getChildAt(0));
		this.n2 = <fairygui.GImage><any>(this.getChildAt(1));
		this.n3 = <fairygui.GImage><any>(this.getChildAt(2));
	}
}