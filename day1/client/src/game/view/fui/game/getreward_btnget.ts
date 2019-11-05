/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class getreward_btnget extends fairygui.GComponent {

	public reward_num:fairygui.GTextField;
	public n13:fairygui.GGraph;
	public n14:fairygui.GGraph;

	public static URL:string = "ui://isxx5ak7mfc0bc";

	public static createInstance():getreward_btnget {
		return <getreward_btnget><any>(fairygui.UIPackage.createObject("game","getreward_btnget"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.reward_num = <fairygui.GTextField><any>(this.getChildAt(0));
		this.n13 = <fairygui.GGraph><any>(this.getChildAt(1));
		this.n14 = <fairygui.GGraph><any>(this.getChildAt(2));
	}
}