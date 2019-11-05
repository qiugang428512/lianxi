/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import com_loader from "./com_loader";

export default class com_img1 extends fairygui.GComponent {

	public n5:fairygui.GGraph;
	public imgloader:com_loader;
	public panel:fairygui.GComponent;
	public t0:fairygui.Transition;

	public static URL:string = "ui://isxx5ak7seb11b";

	public static createInstance():com_img1 {
		return <com_img1><any>(fairygui.UIPackage.createObject("game","com_img1"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n5 = <fairygui.GGraph><any>(this.getChildAt(0));
		this.imgloader = <com_loader><any>(this.getChildAt(1));
		this.panel = <fairygui.GComponent><any>(this.getChildAt(2));
		this.t0 = this.getTransitionAt(0);
	}
}