/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import btn_close from "./btn_close";
import btn_col_next from "./btn_col_next";
import btn_col_last from "./btn_col_last";
import collectgame_anipanel from "./collectgame_anipanel";

export default class wincollectiongame extends fairygui.GComponent {

	public state:fairygui.Controller;
	public n1:fairygui.GImage;
	public n0:fairygui.GImage;
	public n2:btn_close;
	public n3:fairygui.GImage;
	public n18:fairygui.GImage;
	public n17:fairygui.GImage;
	public n13:btn_col_next;
	public n19:fairygui.GImage;
	public n21:btn_col_last;
	public anipanel:collectgame_anipanel;

	public static URL:string = "ui://isxx5ak7bxho9n";

	public static createInstance():wincollectiongame {
		return <wincollectiongame><any>(fairygui.UIPackage.createObject("game","wincollectiongame"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.state = this.getControllerAt(0);
		this.n1 = <fairygui.GImage><any>(this.getChildAt(0));
		this.n0 = <fairygui.GImage><any>(this.getChildAt(1));
		this.n2 = <btn_close><any>(this.getChildAt(2));
		this.n3 = <fairygui.GImage><any>(this.getChildAt(3));
		this.n18 = <fairygui.GImage><any>(this.getChildAt(4));
		this.n17 = <fairygui.GImage><any>(this.getChildAt(5));
		this.n13 = <btn_col_next><any>(this.getChildAt(6));
		this.n19 = <fairygui.GImage><any>(this.getChildAt(7));
		this.n21 = <btn_col_last><any>(this.getChildAt(8));
		this.anipanel = <collectgame_anipanel><any>(this.getChildAt(9));
	}
}