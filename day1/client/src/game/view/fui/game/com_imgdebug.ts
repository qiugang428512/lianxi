/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class com_imgdebug extends fairygui.GComponent {

	public c1:fairygui.Controller;
	public n0:fairygui.GGraph;
	public n1:fairygui.GGraph;
	public n2:fairygui.GGraph;

	public static URL:string = "ui://isxx5ak7uymj65";

	public static createInstance():com_imgdebug {
		return <com_imgdebug><any>(fairygui.UIPackage.createObject("game","com_imgdebug"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.c1 = this.getControllerAt(0);
		this.n0 = <fairygui.GGraph><any>(this.getChildAt(0));
		this.n1 = <fairygui.GGraph><any>(this.getChildAt(1));
		this.n2 = <fairygui.GGraph><any>(this.getChildAt(2));
	}
}