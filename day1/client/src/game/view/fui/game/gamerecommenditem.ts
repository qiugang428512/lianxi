/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import itemrenderpanel from "./itemrenderpanel";

export default class gamerecommenditem extends fairygui.GButton {

	public n0:itemrenderpanel;
	public n1:fairygui.GImage;

	public static URL:string = "ui://isxx5ak7np2ac2";

	public static createInstance():gamerecommenditem {
		return <gamerecommenditem><any>(fairygui.UIPackage.createObject("game","gamerecommenditem"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n0 = <itemrenderpanel><any>(this.getChildAt(0));
		this.n1 = <fairygui.GImage><any>(this.getChildAt(1));
	}
}