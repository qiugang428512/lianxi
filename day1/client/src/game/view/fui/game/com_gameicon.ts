/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import com_gameicon_item from "./com_gameicon_item";

export default class com_gameicon extends fairygui.GComponent {

	public n0:com_gameicon_item;
	public t1:fairygui.Transition;

	public static URL:string = "ui://isxx5ak7ndfe9d";

	public static createInstance():com_gameicon {
		return <com_gameicon><any>(fairygui.UIPackage.createObject("game","com_gameicon"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n0 = <com_gameicon_item><any>(this.getChildAt(0));
		this.t1 = this.getTransitionAt(0);
	}
}