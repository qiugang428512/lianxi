/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import btn_energy_close from "./btn_energy_close";
import com_energy_reward from "./com_energy_reward";

export default class winenergyover extends fairygui.GComponent {

	public n0:fairygui.GImage;
	public n8:fairygui.GImage;
	public n2:fairygui.GImage;
	public btn_close:btn_energy_close;
	public txt_tips:fairygui.GTextField;
	public btn_get:com_energy_reward;
	public n7:fairygui.GImage;
	public n9:fairygui.GGroup;

	public static URL:string = "ui://isxx5ak7e0dy5a";

	public static createInstance():winenergyover {
		return <winenergyover><any>(fairygui.UIPackage.createObject("game","winenergyover"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n0 = <fairygui.GImage><any>(this.getChildAt(0));
		this.n8 = <fairygui.GImage><any>(this.getChildAt(1));
		this.n2 = <fairygui.GImage><any>(this.getChildAt(2));
		this.btn_close = <btn_energy_close><any>(this.getChildAt(3));
		this.txt_tips = <fairygui.GTextField><any>(this.getChildAt(4));
		this.btn_get = <com_energy_reward><any>(this.getChildAt(5));
		this.n7 = <fairygui.GImage><any>(this.getChildAt(6));
		this.n9 = <fairygui.GGroup><any>(this.getChildAt(7));
	}
}