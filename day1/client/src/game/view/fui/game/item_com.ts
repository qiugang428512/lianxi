/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class item_com extends fairygui.GComponent {

	public n0:fairygui.GGraph;
	public itemicon:fairygui.GLoader;

	public static URL:string = "ui://isxx5ak7quq871";

	public static createInstance():item_com {
		return <item_com><any>(fairygui.UIPackage.createObject("game","item_com"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n0 = <fairygui.GGraph><any>(this.getChildAt(0));
		this.itemicon = <fairygui.GLoader><any>(this.getChildAt(1));
	}
}