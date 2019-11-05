/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import headicon from "./headicon";

export default class rankrender extends fairygui.GComponent {

	public state:fairygui.Controller;
	public rank3:fairygui.Controller;
	public n0:fairygui.GImage;
	public n2:fairygui.GImage;
	public gload_rank:fairygui.GLoader;
	public txt_name:fairygui.GTextField;
	public txt_score:fairygui.GTextField;
	public txt_rank:fairygui.GTextField;
	public gload_head:headicon;

	public static URL:string = "ui://isxx5ak7pkb0am";

	public static createInstance():rankrender {
		return <rankrender><any>(fairygui.UIPackage.createObject("game","rankrender"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.state = this.getControllerAt(0);
		this.rank3 = this.getControllerAt(1);
		this.n0 = <fairygui.GImage><any>(this.getChildAt(0));
		this.n2 = <fairygui.GImage><any>(this.getChildAt(1));
		this.gload_rank = <fairygui.GLoader><any>(this.getChildAt(2));
		this.txt_name = <fairygui.GTextField><any>(this.getChildAt(3));
		this.txt_score = <fairygui.GTextField><any>(this.getChildAt(4));
		this.txt_rank = <fairygui.GTextField><any>(this.getChildAt(5));
		this.gload_head = <headicon><any>(this.getChildAt(6));
	}
}