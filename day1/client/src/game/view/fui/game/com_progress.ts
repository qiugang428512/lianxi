/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class com_progress extends fairygui.GComponent {

	public state:fairygui.Controller;
	public n36:fairygui.GImage;
	public n37:fairygui.GImage;
	public n38:fairygui.GImage;
	public n39:fairygui.GImage;
	public n40:fairygui.GImage;
	public r1:fairygui.GImage;
	public r2:fairygui.GImage;
	public r3:fairygui.GImage;
	public r4:fairygui.GImage;
	public r5:fairygui.GImage;

	public static URL:string = "ui://isxx5ak7seb11e";

	public static createInstance():com_progress {
		return <com_progress><any>(fairygui.UIPackage.createObject("game","com_progress"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.state = this.getControllerAt(0);
		this.n36 = <fairygui.GImage><any>(this.getChildAt(0));
		this.n37 = <fairygui.GImage><any>(this.getChildAt(1));
		this.n38 = <fairygui.GImage><any>(this.getChildAt(2));
		this.n39 = <fairygui.GImage><any>(this.getChildAt(3));
		this.n40 = <fairygui.GImage><any>(this.getChildAt(4));
		this.r1 = <fairygui.GImage><any>(this.getChildAt(5));
		this.r2 = <fairygui.GImage><any>(this.getChildAt(6));
		this.r3 = <fairygui.GImage><any>(this.getChildAt(7));
		this.r4 = <fairygui.GImage><any>(this.getChildAt(8));
		this.r5 = <fairygui.GImage><any>(this.getChildAt(9));
	}
}