/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class com_level_stars extends fairygui.GComponent {

	public state:fairygui.Controller;
	public n12:fairygui.GImage;

	public static URL:string = "ui://isxx5ak791wl82";

	public static createInstance():com_level_stars {
		return <com_level_stars><any>(fairygui.UIPackage.createObject("game","com_level_stars"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.state = this.getControllerAt(0);
		this.n12 = <fairygui.GImage><any>(this.getChildAt(0));
	}
}