/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class com_gameicon_item extends fairygui.GComponent {

	public n1:fairygui.GGraph;
	public icon_img:fairygui.GLoader;

	public static URL:string = "ui://isxx5ak7ndfe9c";

	public static createInstance():com_gameicon_item {
		return <com_gameicon_item><any>(fairygui.UIPackage.createObject("game","com_gameicon_item"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n1 = <fairygui.GGraph><any>(this.getChildAt(0));
		this.icon_img = <fairygui.GLoader><any>(this.getChildAt(1));
	}
}