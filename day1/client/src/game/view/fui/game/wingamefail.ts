/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import com_energy from "./com_energy";
import com_gold from "./com_gold";
import btn_restart from "./btn_restart";
import btn_back_home from "./btn_back_home";
import btn_delay from "./btn_delay";
import btn_more from "./btn_more";

export default class wingamefail extends fairygui.GComponent {

	public n15:fairygui.GGraph;
	public btn_energy:com_energy;
	public btn_gold:com_gold;
	public n7:fairygui.GImage;
	public btn_restart:btn_restart;
	public btn_back:btn_back_home;
	public btn_delay:btn_delay;
	public n12:fairygui.GImage;
	public n13:fairygui.GImage;
	public n14:fairygui.GImage;
	public n16:btn_more;
	public n10:fairygui.GGroup;
	public t0:fairygui.Transition;

	public static URL:string = "ui://isxx5ak7h5b52b";

	public static createInstance():wingamefail {
		return <wingamefail><any>(fairygui.UIPackage.createObject("game","wingamefail"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n15 = <fairygui.GGraph><any>(this.getChildAt(0));
		this.btn_energy = <com_energy><any>(this.getChildAt(1));
		this.btn_gold = <com_gold><any>(this.getChildAt(2));
		this.n7 = <fairygui.GImage><any>(this.getChildAt(3));
		this.btn_restart = <btn_restart><any>(this.getChildAt(4));
		this.btn_back = <btn_back_home><any>(this.getChildAt(5));
		this.btn_delay = <btn_delay><any>(this.getChildAt(6));
		this.n12 = <fairygui.GImage><any>(this.getChildAt(7));
		this.n13 = <fairygui.GImage><any>(this.getChildAt(8));
		this.n14 = <fairygui.GImage><any>(this.getChildAt(9));
		this.n16 = <btn_more><any>(this.getChildAt(10));
		this.n10 = <fairygui.GGroup><any>(this.getChildAt(11));
		this.t0 = this.getTransitionAt(0);
	}
}