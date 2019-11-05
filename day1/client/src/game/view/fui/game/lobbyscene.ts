/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import com_energy from "./com_energy";
import com_gold from "./com_gold";
import btn_open from "./btn_open";
import com_level from "./com_level";
import btn_start from "./btn_start";
import btn_rank from "./btn_rank";
import btn_gift from "./btn_gift";
import btn_setting from "./btn_setting";
import btn_img from "./btn_img";
import btn_lucky from "./btn_lucky";
import btn_more from "./btn_more";

export default class lobbyscene extends fairygui.GComponent {

	public n0:fairygui.GImage;
	public com_energy:com_energy;
	public com_gold:com_gold;
	public btn_open:btn_open;
	public n24:fairygui.GImage;
	public n23:fairygui.GImage;
	public com_level:com_level;
	public btn_start:btn_start;
	public btn_rank:btn_rank;
	public btn_gift:btn_gift;
	public btn_setting:btn_setting;
	public btn_img:btn_img;
	public btn_lucky:btn_lucky;
	public btn_more:btn_more;
	public n22:fairygui.GGroup;

	public static URL:string = "ui://isxx5ak7u6cb0";

	public static createInstance():lobbyscene {
		return <lobbyscene><any>(fairygui.UIPackage.createObject("game","lobbyscene"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n0 = <fairygui.GImage><any>(this.getChildAt(0));
		this.com_energy = <com_energy><any>(this.getChildAt(1));
		this.com_gold = <com_gold><any>(this.getChildAt(2));
		this.btn_open = <btn_open><any>(this.getChildAt(3));
		this.n24 = <fairygui.GImage><any>(this.getChildAt(4));
		this.n23 = <fairygui.GImage><any>(this.getChildAt(5));
		this.com_level = <com_level><any>(this.getChildAt(6));
		this.btn_start = <btn_start><any>(this.getChildAt(7));
		this.btn_rank = <btn_rank><any>(this.getChildAt(8));
		this.btn_gift = <btn_gift><any>(this.getChildAt(9));
		this.btn_setting = <btn_setting><any>(this.getChildAt(10));
		this.btn_img = <btn_img><any>(this.getChildAt(11));
		this.btn_lucky = <btn_lucky><any>(this.getChildAt(12));
		this.btn_more = <btn_more><any>(this.getChildAt(13));
		this.n22 = <fairygui.GGroup><any>(this.getChildAt(14));
	}
}