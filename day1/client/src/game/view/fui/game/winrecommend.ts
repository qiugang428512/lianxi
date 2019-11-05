/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import btn_recommend_close from "./btn_recommend_close";

export default class winrecommend extends fairygui.GComponent {

	public state:fairygui.Controller;
	public n0:fairygui.GImage;
	public btn_close:btn_recommend_close;
	public game_list:fairygui.GList;
	public n4:fairygui.GImage;
	public n2:fairygui.GGroup;

	public static URL:string = "ui://isxx5ak7quq85j";

	public static createInstance():winrecommend {
		return <winrecommend><any>(fairygui.UIPackage.createObject("game","winrecommend"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.state = this.getControllerAt(0);
		this.n0 = <fairygui.GImage><any>(this.getChildAt(0));
		this.btn_close = <btn_recommend_close><any>(this.getChildAt(1));
		this.game_list = <fairygui.GList><any>(this.getChildAt(2));
		this.n4 = <fairygui.GImage><any>(this.getChildAt(3));
		this.n2 = <fairygui.GGroup><any>(this.getChildAt(4));
	}
}