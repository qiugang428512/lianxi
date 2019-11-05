/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import guidemaskcircle from "./guidemaskcircle";
import guidemaskclick from "./guidemaskclick";
import guidefinger from "./guidefinger";

export default class guidemask extends fairygui.GComponent {

	public n6:fairygui.GGraph;
	public circle:guidemaskcircle;
	public btn_down:guidemaskclick;
	public btn_up:guidemaskclick;
	public n14:fairygui.GImage;
	public n15:fairygui.GImage;
	public n16:guidefinger;
	public n17:guidefinger;
	public t1:fairygui.Transition;
	public t3:fairygui.Transition;

	public static URL:string = "ui://isxx5ak7np2abs";

	public static createInstance():guidemask {
		return <guidemask><any>(fairygui.UIPackage.createObject("game","guidemask"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n6 = <fairygui.GGraph><any>(this.getChildAt(0));
		this.circle = <guidemaskcircle><any>(this.getChildAt(1));
		this.btn_down = <guidemaskclick><any>(this.getChildAt(2));
		this.btn_up = <guidemaskclick><any>(this.getChildAt(3));
		this.n14 = <fairygui.GImage><any>(this.getChildAt(4));
		this.n15 = <fairygui.GImage><any>(this.getChildAt(5));
		this.n16 = <guidefinger><any>(this.getChildAt(6));
		this.n17 = <guidefinger><any>(this.getChildAt(7));
		this.t1 = this.getTransitionAt(0);
		this.t3 = this.getTransitionAt(1);
	}
}