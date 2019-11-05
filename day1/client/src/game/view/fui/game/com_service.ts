/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import btn_receive from "./btn_receive";

export default class com_service extends fairygui.GComponent {

	public n4:fairygui.GImage;
	public btn_reward:btn_receive;
	public n3:fairygui.GImage;
	public n5:fairygui.GRichTextField;
	public n6:fairygui.GRichTextField;

	public static URL:string = "ui://isxx5ak7e0dy4h";

	public static createInstance():com_service {
		return <com_service><any>(fairygui.UIPackage.createObject("game","com_service"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n4 = <fairygui.GImage><any>(this.getChildAt(0));
		this.btn_reward = <btn_receive><any>(this.getChildAt(1));
		this.n3 = <fairygui.GImage><any>(this.getChildAt(2));
		this.n5 = <fairygui.GRichTextField><any>(this.getChildAt(3));
		this.n6 = <fairygui.GRichTextField><any>(this.getChildAt(4));
	}
}