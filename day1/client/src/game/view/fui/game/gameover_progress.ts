/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class gameover_progress extends fairygui.GProgressBar {

	public total_progress:fairygui.GImage;
	public bar:fairygui.GImage;
	public n7:fairygui.GImage;
	public title:fairygui.GTextField;

	public static URL:string = "ui://isxx5ak7seb11j";

	public static createInstance():gameover_progress {
		return <gameover_progress><any>(fairygui.UIPackage.createObject("game","gameover_progress"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.total_progress = <fairygui.GImage><any>(this.getChildAt(0));
		this.bar = <fairygui.GImage><any>(this.getChildAt(1));
		this.n7 = <fairygui.GImage><any>(this.getChildAt(2));
		this.title = <fairygui.GTextField><any>(this.getChildAt(3));
	}
}