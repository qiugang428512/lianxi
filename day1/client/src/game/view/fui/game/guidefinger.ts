/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class guidefinger extends fairygui.GComponent {

	public c1:fairygui.Controller;
	public n2:fairygui.GGraph;
	public n3:fairygui.GGraph;
	public n1:fairygui.GImage;
	public n5:fairygui.GImage;
	public t0:fairygui.Transition;
	public t1:fairygui.Transition;

	public static URL:string = "ui://isxx5ak7arz367";

	public static createInstance():guidefinger {
		return <guidefinger><any>(fairygui.UIPackage.createObject("game","guidefinger"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.c1 = this.getControllerAt(0);
		this.n2 = <fairygui.GGraph><any>(this.getChildAt(0));
		this.n3 = <fairygui.GGraph><any>(this.getChildAt(1));
		this.n1 = <fairygui.GImage><any>(this.getChildAt(2));
		this.n5 = <fairygui.GImage><any>(this.getChildAt(3));
		this.t0 = this.getTransitionAt(0);
		this.t1 = this.getTransitionAt(1);
	}
}