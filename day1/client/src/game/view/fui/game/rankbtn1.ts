/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class rankbtn1 extends fairygui.GButton {

	public button:fairygui.Controller;
	public n0:fairygui.GImage;
	public n1:fairygui.GImage;
	public n3:fairygui.GImage;

	public static URL:string = "ui://isxx5ak7pkb0aj";

	public static createInstance():rankbtn1 {
		return <rankbtn1><any>(fairygui.UIPackage.createObject("game","rankbtn1"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.button = this.getControllerAt(0);
		this.n0 = <fairygui.GImage><any>(this.getChildAt(0));
		this.n1 = <fairygui.GImage><any>(this.getChildAt(1));
		this.n3 = <fairygui.GImage><any>(this.getChildAt(2));
	}
}