/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import closebtn from "./closebtn";
import mustshare_btnok from "./mustshare_btnok";

export default class winmustshare extends fairygui.GComponent {

	public n1:fairygui.GImage;
	public btn_ok:closebtn;
	public t1:fairygui.GTextField;
	public btn_share:mustshare_btnok;

	public static URL:string = "ui://isxx5ak7mfc0bg";

	public static createInstance():winmustshare {
		return <winmustshare><any>(fairygui.UIPackage.createObject("game","winmustshare"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n1 = <fairygui.GImage><any>(this.getChildAt(0));
		this.btn_ok = <closebtn><any>(this.getChildAt(1));
		this.t1 = <fairygui.GTextField><any>(this.getChildAt(2));
		this.btn_share = <mustshare_btnok><any>(this.getChildAt(3));
	}
}