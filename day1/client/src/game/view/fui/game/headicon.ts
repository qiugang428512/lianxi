/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class headicon extends fairygui.GComponent {

	public gload_head:fairygui.GGraph;
	public contain:fairygui.GLoader;

	public static URL:string = "ui://isxx5ak7pkb0ar";

	public static createInstance():headicon {
		return <headicon><any>(fairygui.UIPackage.createObject("game","headicon"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.gload_head = <fairygui.GGraph><any>(this.getChildAt(0));
		this.contain = <fairygui.GLoader><any>(this.getChildAt(1));
	}
}