/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class gamesheel_bgm extends fairygui.GComponent {

	public bgm:fairygui.GGraph;

	public static URL:string = "ui://isxx5ak7mo28ba";

	public static createInstance():gamesheel_bgm {
		return <gamesheel_bgm><any>(fairygui.UIPackage.createObject("game","gamesheel_bgm"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.bgm = <fairygui.GGraph><any>(this.getChildAt(0));
	}
}