/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class collectgame_anipanel extends fairygui.GComponent {

	public n22:fairygui.GGraph;

	public static URL:string = "ui://isxx5ak7kbrpa7";

	public static createInstance():collectgame_anipanel {
		return <collectgame_anipanel><any>(fairygui.UIPackage.createObject("game","collectgame_anipanel"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n22 = <fairygui.GGraph><any>(this.getChildAt(0));
	}
}