/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class btn_open extends fairygui.GComponent {

	public n25:fairygui.GImage;
	public n26:fairygui.GImage;

	public static URL:string = "ui://isxx5ak7quq86p";

	public static createInstance():btn_open {
		return <btn_open><any>(fairygui.UIPackage.createObject("game","btn_open"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n25 = <fairygui.GImage><any>(this.getChildAt(0));
		this.n26 = <fairygui.GImage><any>(this.getChildAt(1));
	}
}