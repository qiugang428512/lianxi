/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class btn_energy_close extends fairygui.GButton {

	public n3:fairygui.GImage;

	public static URL:string = "ui://isxx5ak7e0dy5i";

	public static createInstance():btn_energy_close {
		return <btn_energy_close><any>(fairygui.UIPackage.createObject("game","btn_energy_close"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n3 = <fairygui.GImage><any>(this.getChildAt(0));
	}
}