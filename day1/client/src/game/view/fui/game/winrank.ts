/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import closebtn from "./closebtn";
import rankbtn1 from "./rankbtn1";
import rankbtn2 from "./rankbtn2";
import rankrender from "./rankrender";

export default class winrank extends fairygui.GComponent {

	public state:fairygui.Controller;
	public n1:fairygui.GImage;
	public btn_close:closebtn;
	public n4:rankbtn1;
	public n5:rankbtn2;
	public n6:fairygui.GList;
	public myrender:rankrender;
	public n8:fairygui.GImage;
	public n9:fairygui.GImage;
	public n10:fairygui.GImage;

	public static URL:string = "ui://isxx5ak7ubk718";

	public static createInstance():winrank {
		return <winrank><any>(fairygui.UIPackage.createObject("game","winrank"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.state = this.getControllerAt(0);
		this.n1 = <fairygui.GImage><any>(this.getChildAt(0));
		this.btn_close = <closebtn><any>(this.getChildAt(1));
		this.n4 = <rankbtn1><any>(this.getChildAt(2));
		this.n5 = <rankbtn2><any>(this.getChildAt(3));
		this.n6 = <fairygui.GList><any>(this.getChildAt(4));
		this.myrender = <rankrender><any>(this.getChildAt(5));
		this.n8 = <fairygui.GImage><any>(this.getChildAt(6));
		this.n9 = <fairygui.GImage><any>(this.getChildAt(7));
		this.n10 = <fairygui.GImage><any>(this.getChildAt(8));
	}
}