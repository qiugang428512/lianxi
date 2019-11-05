/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import btn_close from "./btn_close";
import goservice from "./goservice";

export default class wincsrewards extends fairygui.GComponent {

	public btn_close:btn_close;
	public n36:fairygui.GImage;
	public n37:fairygui.GImage;
	public n38:fairygui.GImage;
	public n39:fairygui.GImage;
	public n40:fairygui.GImage;
	public n41:fairygui.GTextField;
	public n42:fairygui.GImage;
	public btn_Start:goservice;
	public n44:fairygui.GTextField;
	public n45:fairygui.GImage;
	public t0:fairygui.Transition;

	public static URL:string = "ui://isxx5ak7quq868";

	public static createInstance():wincsrewards {
		return <wincsrewards><any>(fairygui.UIPackage.createObject("game","wincsrewards"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.btn_close = <btn_close><any>(this.getChildAt(0));
		this.n36 = <fairygui.GImage><any>(this.getChildAt(1));
		this.n37 = <fairygui.GImage><any>(this.getChildAt(2));
		this.n38 = <fairygui.GImage><any>(this.getChildAt(3));
		this.n39 = <fairygui.GImage><any>(this.getChildAt(4));
		this.n40 = <fairygui.GImage><any>(this.getChildAt(5));
		this.n41 = <fairygui.GTextField><any>(this.getChildAt(6));
		this.n42 = <fairygui.GImage><any>(this.getChildAt(7));
		this.btn_Start = <goservice><any>(this.getChildAt(8));
		this.n44 = <fairygui.GTextField><any>(this.getChildAt(9));
		this.n45 = <fairygui.GImage><any>(this.getChildAt(10));
		this.t0 = this.getTransitionAt(0);
	}
}