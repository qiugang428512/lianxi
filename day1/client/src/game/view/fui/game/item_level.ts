/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class item_level extends fairygui.GComponent {

	public state:fairygui.Controller;
	public n14:fairygui.GImage;
	public n13:fairygui.GImage;
	public n15:fairygui.GImage;
	public level_title:fairygui.GTextField;
	public level_instructions:fairygui.GTextField;
	public n16:fairygui.GImage;
	public level_icon:fairygui.GLoader;

	public static URL:string = "ui://isxx5ak7seb11p";

	public static createInstance():item_level {
		return <item_level><any>(fairygui.UIPackage.createObject("game","item_level"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.state = this.getControllerAt(0);
		this.n14 = <fairygui.GImage><any>(this.getChildAt(0));
		this.n13 = <fairygui.GImage><any>(this.getChildAt(1));
		this.n15 = <fairygui.GImage><any>(this.getChildAt(2));
		this.level_title = <fairygui.GTextField><any>(this.getChildAt(3));
		this.level_instructions = <fairygui.GTextField><any>(this.getChildAt(4));
		this.n16 = <fairygui.GImage><any>(this.getChildAt(5));
		this.level_icon = <fairygui.GLoader><any>(this.getChildAt(6));
	}
}