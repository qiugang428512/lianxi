/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class btn_lucky extends fairygui.GButton {

	public btn_lucky:fairygui.GImage;
	public redpoint:fairygui.GGraph;

	public static URL:string = "ui://isxx5ak7e0dy3u";

	public static createInstance():btn_lucky {
		return <btn_lucky><any>(fairygui.UIPackage.createObject("game","btn_lucky"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.btn_lucky = <fairygui.GImage><any>(this.getChildAt(0));
		this.redpoint = <fairygui.GGraph><any>(this.getChildAt(1));
	}
}