/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class com_level extends fairygui.GComponent {

	public icon_img:fairygui.GLoader;
	public levelname_img:fairygui.GLoader;
	public levelname_level:fairygui.GLoader;
	public title_text:fairygui.GImage;
	public n11:fairygui.GTextField;
	public stars_group:fairygui.GComponent;

	public static URL:string = "ui://isxx5ak7seb11f";

	public static createInstance():com_level {
		return <com_level><any>(fairygui.UIPackage.createObject("game","com_level"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.icon_img = <fairygui.GLoader><any>(this.getChildAt(0));
		this.levelname_img = <fairygui.GLoader><any>(this.getChildAt(1));
		this.levelname_level = <fairygui.GLoader><any>(this.getChildAt(2));
		this.title_text = <fairygui.GImage><any>(this.getChildAt(3));
		this.n11 = <fairygui.GTextField><any>(this.getChildAt(4));
		this.stars_group = <fairygui.GComponent><any>(this.getChildAt(5));
	}
}