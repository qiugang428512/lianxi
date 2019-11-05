/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import com_level from "./com_level";
import gameover_progress from "./gameover_progress";
import com_energy from "./com_energy";
import com_gold from "./com_gold";
import btn_more from "./btn_more";
import btn_next from "./btn_next";
import btn_back_home from "./btn_back_home";
import btn_lucky from "./btn_lucky";
import animation_gameover from "./animation_gameover";

export default class gamewinscene extends fairygui.GComponent {

	public n5:fairygui.GImage;
	public n3:com_level;
	public com_progress:gameover_progress;
	public sharepanel:fairygui.GComponent;
	public btn_energy:com_energy;
	public btn_gold:com_gold;
	public btn_rightgift:btn_more;
	public n11:fairygui.GImage;
	public n12:fairygui.GImage;
	public btn_next:btn_next;
	public btn_back:btn_back_home;
	public btn_leftgift:btn_lucky;
	public n10:fairygui.GGroup;
	public n14:animation_gameover;
	public n15:animation_gameover;
	public t1:fairygui.Transition;
	public t2:fairygui.Transition;

	public static URL:string = "ui://isxx5ak7seb11a";

	public static createInstance():gamewinscene {
		return <gamewinscene><any>(fairygui.UIPackage.createObject("game","gamewinscene"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n5 = <fairygui.GImage><any>(this.getChildAt(0));
		this.n3 = <com_level><any>(this.getChildAt(1));
		this.com_progress = <gameover_progress><any>(this.getChildAt(2));
		this.sharepanel = <fairygui.GComponent><any>(this.getChildAt(3));
		this.btn_energy = <com_energy><any>(this.getChildAt(4));
		this.btn_gold = <com_gold><any>(this.getChildAt(5));
		this.btn_rightgift = <btn_more><any>(this.getChildAt(6));
		this.n11 = <fairygui.GImage><any>(this.getChildAt(7));
		this.n12 = <fairygui.GImage><any>(this.getChildAt(8));
		this.btn_next = <btn_next><any>(this.getChildAt(9));
		this.btn_back = <btn_back_home><any>(this.getChildAt(10));
		this.btn_leftgift = <btn_lucky><any>(this.getChildAt(11));
		this.n10 = <fairygui.GGroup><any>(this.getChildAt(12));
		this.n14 = <animation_gameover><any>(this.getChildAt(13));
		this.n15 = <animation_gameover><any>(this.getChildAt(14));
		this.t1 = this.getTransitionAt(0);
		this.t2 = this.getTransitionAt(1);
	}
}