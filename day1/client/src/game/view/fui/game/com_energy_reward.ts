/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class com_energy_reward extends fairygui.GButton {

	public c1:fairygui.Controller;
	public n12:fairygui.GImage;
	public n10:fairygui.GImage;
	public n11:fairygui.GImage;
	public n13:fairygui.GImage;

	public static URL:string = "ui://isxx5ak7e0dy5h";

	public static createInstance():com_energy_reward {
		return <com_energy_reward><any>(fairygui.UIPackage.createObject("game","com_energy_reward"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.c1 = this.getControllerAt(0);
		this.n12 = <fairygui.GImage><any>(this.getChildAt(0));
		this.n10 = <fairygui.GImage><any>(this.getChildAt(1));
		this.n11 = <fairygui.GImage><any>(this.getChildAt(2));
		this.n13 = <fairygui.GImage><any>(this.getChildAt(3));
	}
}