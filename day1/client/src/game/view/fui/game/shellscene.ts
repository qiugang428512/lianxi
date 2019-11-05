/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import com_gold from "./com_gold";
import btn_tip from "./btn_tip";
import com_progress from "./com_progress";
import gamebtn_back from "./gamebtn_back";
import gamesheel_bgm from "./gamesheel_bgm";

export default class shellscene extends fairygui.GComponent {

	public n49:fairygui.GGraph;
	public btn_gold:com_gold;
	public txt_level:fairygui.GTextField;
	public txt_time:fairygui.GTextField;
	public btn_tip:btn_tip;
	public rightcnt:com_progress;
	public btn_back:gamebtn_back;
	public bg0:fairygui.GGraph;
	public bg1:fairygui.GGraph;
	public bg2:fairygui.GGraph;
	public bg3:fairygui.GGraph;
	public bg4:fairygui.GGraph;
	public bgm:gamesheel_bgm;
	public txt_guidetips:fairygui.GTextField;

	public static URL:string = "ui://isxx5ak77suj1w";

	public static createInstance():shellscene {
		return <shellscene><any>(fairygui.UIPackage.createObject("game","shellscene"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n49 = <fairygui.GGraph><any>(this.getChildAt(0));
		this.btn_gold = <com_gold><any>(this.getChildAt(1));
		this.txt_level = <fairygui.GTextField><any>(this.getChildAt(2));
		this.txt_time = <fairygui.GTextField><any>(this.getChildAt(3));
		this.btn_tip = <btn_tip><any>(this.getChildAt(4));
		this.rightcnt = <com_progress><any>(this.getChildAt(5));
		this.btn_back = <gamebtn_back><any>(this.getChildAt(6));
		this.bg0 = <fairygui.GGraph><any>(this.getChildAt(7));
		this.bg1 = <fairygui.GGraph><any>(this.getChildAt(8));
		this.bg2 = <fairygui.GGraph><any>(this.getChildAt(9));
		this.bg3 = <fairygui.GGraph><any>(this.getChildAt(10));
		this.bg4 = <fairygui.GGraph><any>(this.getChildAt(11));
		this.bgm = <gamesheel_bgm><any>(this.getChildAt(12));
		this.txt_guidetips = <fairygui.GTextField><any>(this.getChildAt(13));
	}
}