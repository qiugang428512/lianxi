/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class com_energy extends fairygui.GButton {

	public state:fairygui.Controller;
	public n0:fairygui.GImage;
	public txt:fairygui.GTextField;
	public n4:fairygui.GImage;
	public n5:fairygui.GImage;
	public txt_time:fairygui.GTextField;
	public txt2:fairygui.GTextField;
	public txt_min:fairygui.GTextField;
	public t0:fairygui.Transition;

	public static URL:string = "ui://isxx5ak7u6cb1";

	public static createInstance():com_energy {
		return <com_energy><any>(fairygui.UIPackage.createObject("game","com_energy"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.state = this.getControllerAt(0);
		this.n0 = <fairygui.GImage><any>(this.getChildAt(0));
		this.txt = <fairygui.GTextField><any>(this.getChildAt(1));
		this.n4 = <fairygui.GImage><any>(this.getChildAt(2));
		this.n5 = <fairygui.GImage><any>(this.getChildAt(3));
		this.txt_time = <fairygui.GTextField><any>(this.getChildAt(4));
		this.txt2 = <fairygui.GTextField><any>(this.getChildAt(5));
		this.txt_min = <fairygui.GTextField><any>(this.getChildAt(6));
		this.t0 = this.getTransitionAt(0);
	}
}