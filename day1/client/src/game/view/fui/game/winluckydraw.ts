/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import com_gold from "./com_gold";
import com_energy from "./com_energy";
import btn_back from "./btn_back";
import btn_moregame from "./btn_moregame";
import btn_luckdraw from "./btn_luckdraw";

export default class winluckydraw extends fairygui.GComponent {

	public n5:fairygui.GImage;
	public com_gold:com_gold;
	public com_energy:com_energy;
	public btn_back:btn_back;
	public list_luck:fairygui.GList;
	public n24:fairygui.GComponent;
	public n22:fairygui.GImage;
	public n23:fairygui.GImage;
	public sel_box:fairygui.GGroup;
	public btn_moregame:btn_moregame;
	public btn_luck:btn_luckdraw;
	public luck_num:fairygui.GTextField;
	public n21:fairygui.GGroup;

	public static URL:string = "ui://isxx5ak77suj1y";

	public static createInstance():winluckydraw {
		return <winluckydraw><any>(fairygui.UIPackage.createObject("game","winluckydraw"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n5 = <fairygui.GImage><any>(this.getChildAt(0));
		this.com_gold = <com_gold><any>(this.getChildAt(1));
		this.com_energy = <com_energy><any>(this.getChildAt(2));
		this.btn_back = <btn_back><any>(this.getChildAt(3));
		this.list_luck = <fairygui.GList><any>(this.getChildAt(4));
		this.n24 = <fairygui.GComponent><any>(this.getChildAt(5));
		this.n22 = <fairygui.GImage><any>(this.getChildAt(6));
		this.n23 = <fairygui.GImage><any>(this.getChildAt(7));
		this.sel_box = <fairygui.GGroup><any>(this.getChildAt(8));
		this.btn_moregame = <btn_moregame><any>(this.getChildAt(9));
		this.btn_luck = <btn_luckdraw><any>(this.getChildAt(10));
		this.luck_num = <fairygui.GTextField><any>(this.getChildAt(11));
		this.n21 = <fairygui.GGroup><any>(this.getChildAt(12));
	}
}