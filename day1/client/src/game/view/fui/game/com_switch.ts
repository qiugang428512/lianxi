/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class com_switch extends fairygui.GComponent {

	public state:fairygui.Controller;
	public n6:fairygui.GGraph;
	public n5:fairygui.GGraph;
	public n3:fairygui.GImage;

	public static URL:string = "ui://isxx5ak77suj23";

	public static createInstance():com_switch {
		return <com_switch><any>(fairygui.UIPackage.createObject("game","com_switch"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.state = this.getControllerAt(0);
		this.n6 = <fairygui.GGraph><any>(this.getChildAt(0));
		this.n5 = <fairygui.GGraph><any>(this.getChildAt(1));
		this.n3 = <fairygui.GImage><any>(this.getChildAt(2));
	}
}