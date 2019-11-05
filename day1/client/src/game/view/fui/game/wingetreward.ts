/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import wingetreward_energy from "./wingetreward_energy";
import btn_receive_reward from "./btn_receive_reward";
import getreward_btnget from "./getreward_btnget";
import getreward_btn from "./getreward_btn";
import btn_nextmore_reward from "./btn_nextmore_reward";

export default class wingetreward extends fairygui.GComponent {

	public state:fairygui.Controller;
	public n0:fairygui.GImage;
	public n13:fairygui.GGraph;
	public n9:fairygui.GImage;
	public n1:wingetreward_energy;
	public other_icon:fairygui.GLoader;
	public reward_num:fairygui.GTextField;
	public btn_double_receive:btn_receive_reward;
	public n10:fairygui.GImage;
	public btn_receive:getreward_btnget;
	public n14:fairygui.GImage;
	public n15:fairygui.GImage;
	public btn_close:getreward_btn;
	public btn_nextmore:btn_nextmore_reward;
	public n19:fairygui.GImage;
	public txt_nextmore:fairygui.GTextField;
	public n21:fairygui.GGroup;
	public reward_nextmore:fairygui.GTextField;
	public t0:fairygui.Transition;
	public t1:fairygui.Transition;

	public static URL:string = "ui://isxx5ak7quq86r";

	public static createInstance():wingetreward {
		return <wingetreward><any>(fairygui.UIPackage.createObject("game","wingetreward"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.state = this.getControllerAt(0);
		this.n0 = <fairygui.GImage><any>(this.getChildAt(0));
		this.n13 = <fairygui.GGraph><any>(this.getChildAt(1));
		this.n9 = <fairygui.GImage><any>(this.getChildAt(2));
		this.n1 = <wingetreward_energy><any>(this.getChildAt(3));
		this.other_icon = <fairygui.GLoader><any>(this.getChildAt(4));
		this.reward_num = <fairygui.GTextField><any>(this.getChildAt(5));
		this.btn_double_receive = <btn_receive_reward><any>(this.getChildAt(6));
		this.n10 = <fairygui.GImage><any>(this.getChildAt(7));
		this.btn_receive = <getreward_btnget><any>(this.getChildAt(8));
		this.n14 = <fairygui.GImage><any>(this.getChildAt(9));
		this.n15 = <fairygui.GImage><any>(this.getChildAt(10));
		this.btn_close = <getreward_btn><any>(this.getChildAt(11));
		this.btn_nextmore = <btn_nextmore_reward><any>(this.getChildAt(12));
		this.n19 = <fairygui.GImage><any>(this.getChildAt(13));
		this.txt_nextmore = <fairygui.GTextField><any>(this.getChildAt(14));
		this.n21 = <fairygui.GGroup><any>(this.getChildAt(15));
		this.reward_nextmore = <fairygui.GTextField><any>(this.getChildAt(16));
		this.t0 = this.getTransitionAt(0);
		this.t1 = this.getTransitionAt(1);
	}
}