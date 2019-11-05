/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import com_gold from "./com_gold";
import btn_tip from "./btn_tip";
import com_progress from "./com_progress";
import gamebtn_back from "./gamebtn_back";
import btn_gameshare from "./btn_gameshare";
import com_img1 from "./com_img1";
import gamerecommenditem from "./gamerecommenditem";
import guidemask from "./guidemask";

export default class gamescene extends fairygui.GComponent {

	public n8:fairygui.GGraph;
	public btn_gold:com_gold;
	public txt_level:fairygui.GTextField;
	public txt_time:fairygui.GTextField;
	public btn_tip:btn_tip;
	public rightcnt:com_progress;
	public btn_back:gamebtn_back;
	public btn_share:btn_gameshare;
	public word_img1:com_img1;
	public word_img2:com_img1;
	public n17:fairygui.GGraph;
	public linkicon_1:gamerecommenditem;
	public n18:fairygui.GTextField;
	public n10:fairygui.GGroup;
	public guidemask:guidemask;
	public txt_guidetips:fairygui.GTextField;

	public static URL:string = "ui://isxx5ak7seb119";

	public static createInstance():gamescene {
		return <gamescene><any>(fairygui.UIPackage.createObject("game","gamescene"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n8 = <fairygui.GGraph><any>(this.getChildAt(0));
		this.btn_gold = <com_gold><any>(this.getChildAt(1));
		this.txt_level = <fairygui.GTextField><any>(this.getChildAt(2));
		this.txt_time = <fairygui.GTextField><any>(this.getChildAt(3));
		this.btn_tip = <btn_tip><any>(this.getChildAt(4));
		this.rightcnt = <com_progress><any>(this.getChildAt(5));
		this.btn_back = <gamebtn_back><any>(this.getChildAt(6));
		this.btn_share = <btn_gameshare><any>(this.getChildAt(7));
		this.word_img1 = <com_img1><any>(this.getChildAt(8));
		this.word_img2 = <com_img1><any>(this.getChildAt(9));
		this.n17 = <fairygui.GGraph><any>(this.getChildAt(10));
		this.linkicon_1 = <gamerecommenditem><any>(this.getChildAt(11));
		this.n18 = <fairygui.GTextField><any>(this.getChildAt(12));
		this.n10 = <fairygui.GGroup><any>(this.getChildAt(13));
		this.guidemask = <guidemask><any>(this.getChildAt(14));
		this.txt_guidetips = <fairygui.GTextField><any>(this.getChildAt(15));
	}
}