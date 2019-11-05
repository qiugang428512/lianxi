/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import com_back_game from "./com_back_game";

export default class winmoregame extends fairygui.GComponent {

	public n0:fairygui.GGraph;
	public back_game:com_back_game;
	public n5:fairygui.GImage;
	public game_list:fairygui.GList;
	public n8:fairygui.GImage;
	public n9:fairygui.GImage;
	public n10:fairygui.GImage;
	public n11:fairygui.GImage;

	public static URL:string = "ui://isxx5ak77suj2v";

	public static createInstance():winmoregame {
		return <winmoregame><any>(fairygui.UIPackage.createObject("game","winmoregame"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n0 = <fairygui.GGraph><any>(this.getChildAt(0));
		this.back_game = <com_back_game><any>(this.getChildAt(1));
		this.n5 = <fairygui.GImage><any>(this.getChildAt(2));
		this.game_list = <fairygui.GList><any>(this.getChildAt(3));
		this.n8 = <fairygui.GImage><any>(this.getChildAt(4));
		this.n9 = <fairygui.GImage><any>(this.getChildAt(5));
		this.n10 = <fairygui.GImage><any>(this.getChildAt(6));
		this.n11 = <fairygui.GImage><any>(this.getChildAt(7));
	}
}