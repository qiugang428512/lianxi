/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import btn_receive from "./btn_receive";

export default class com_addmy extends fairygui.GComponent {

	public n5:fairygui.GImage;
	public n2:fairygui.GRichTextField;
	public btn_reward:btn_receive;
	public n4:fairygui.GImage;
	public n6:fairygui.GRichTextField;

	public static URL:string = "ui://isxx5ak7seb11u";

	public static createInstance():com_addmy {
		return <com_addmy><any>(fairygui.UIPackage.createObject("game","com_addmy"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n5 = <fairygui.GImage><any>(this.getChildAt(0));
		this.n2 = <fairygui.GRichTextField><any>(this.getChildAt(1));
		this.btn_reward = <btn_receive><any>(this.getChildAt(2));
		this.n4 = <fairygui.GImage><any>(this.getChildAt(3));
		this.n6 = <fairygui.GRichTextField><any>(this.getChildAt(4));
	}
}