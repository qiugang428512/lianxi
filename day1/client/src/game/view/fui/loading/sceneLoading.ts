/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import com_icon from "./com_icon";

export default class sceneloading extends fairygui.GComponent {

	public state:fairygui.Controller;
	public n3:fairygui.GGraph;
	public txt_loading:fairygui.GTextField;
	public n8:fairygui.GTextField;
	public n10:fairygui.GTextField;
	public n16:fairygui.GTextField;
	public n18:com_icon;
	public ver_text:fairygui.GTextField;
	public t0:fairygui.Transition;

	public static URL:string = "ui://irx2sm8q7suj2";

	public static createInstance():sceneloading {
		return <sceneloading><any>(fairygui.UIPackage.createObject("loading","sceneloading"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.state = this.getControllerAt(0);
		this.n3 = <fairygui.GGraph><any>(this.getChildAt(0));
		this.txt_loading = <fairygui.GTextField><any>(this.getChildAt(1));
		this.n8 = <fairygui.GTextField><any>(this.getChildAt(2));
		this.n10 = <fairygui.GTextField><any>(this.getChildAt(3));
		this.n16 = <fairygui.GTextField><any>(this.getChildAt(4));
		this.n18 = <com_icon><any>(this.getChildAt(5));
		this.ver_text = <fairygui.GTextField><any>(this.getChildAt(6));
		this.t0 = this.getTransitionAt(0);
	}
}