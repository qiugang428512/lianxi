/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class itemrenderpanel extends fairygui.GComponent {

	public n0:fairygui.GGraph;
	public item_icon:fairygui.GLoader;

	public static URL:string = "ui://isxx5ak7quq870";

	public static createInstance():itemrenderpanel {
		return <itemrenderpanel><any>(fairygui.UIPackage.createObject("game","itemrenderpanel"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n0 = <fairygui.GGraph><any>(this.getChildAt(0));
		this.item_icon = <fairygui.GLoader><any>(this.getChildAt(1));
	}
}