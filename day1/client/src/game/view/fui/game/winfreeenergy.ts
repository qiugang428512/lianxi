/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import com_addmy from "./com_addmy";
import com_addfloat from "./com_addfloat";
import com_service from "./com_service";
import btn_close from "./btn_close";

export default class winfreeenergy extends fairygui.GComponent {

	public n0:fairygui.GImage;
	public n8:fairygui.GImage;
	public n6:fairygui.GImage;
	public n7:fairygui.GImage;
	public btn_addmy:com_addmy;
	public btn_addfloat:com_addfloat;
	public btn_service:com_service;
	public btn_Close:btn_close;

	public static URL:string = "ui://isxx5ak7ubk717";

	public static createInstance():winfreeenergy {
		return <winfreeenergy><any>(fairygui.UIPackage.createObject("game","winfreeenergy"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n0 = <fairygui.GImage><any>(this.getChildAt(0));
		this.n8 = <fairygui.GImage><any>(this.getChildAt(1));
		this.n6 = <fairygui.GImage><any>(this.getChildAt(2));
		this.n7 = <fairygui.GImage><any>(this.getChildAt(3));
		this.btn_addmy = <com_addmy><any>(this.getChildAt(4));
		this.btn_addfloat = <com_addfloat><any>(this.getChildAt(5));
		this.btn_service = <com_service><any>(this.getChildAt(6));
		this.btn_Close = <btn_close><any>(this.getChildAt(7));
	}
}