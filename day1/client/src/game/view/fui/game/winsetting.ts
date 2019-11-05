/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import btn_back from "./btn_back";
import com_switch from "./com_switch";
import btn_back_home from "./btn_back_home";
import btn_moregame from "./btn_moregame";

export default class winsetting extends fairygui.GComponent {

	public n0:fairygui.GImage;
	public btn_back:btn_back;
	public n2:fairygui.GImage;
	public n3:fairygui.GTextField;
	public sound_switch:com_switch;
	public n15:fairygui.GImage;
	public n16:fairygui.GTextField;
	public music_switch:com_switch;
	public n19:fairygui.GImage;
	public n20:fairygui.GTextField;
	public vibration_switch:com_switch;
	public back_home:btn_back_home;
	public btn_more:btn_moregame;
	public n26:fairygui.GGroup;

	public static URL:string = "ui://isxx5ak77suj21";

	public static createInstance():winsetting {
		return <winsetting><any>(fairygui.UIPackage.createObject("game","winsetting"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n0 = <fairygui.GImage><any>(this.getChildAt(0));
		this.btn_back = <btn_back><any>(this.getChildAt(1));
		this.n2 = <fairygui.GImage><any>(this.getChildAt(2));
		this.n3 = <fairygui.GTextField><any>(this.getChildAt(3));
		this.sound_switch = <com_switch><any>(this.getChildAt(4));
		this.n15 = <fairygui.GImage><any>(this.getChildAt(5));
		this.n16 = <fairygui.GTextField><any>(this.getChildAt(6));
		this.music_switch = <com_switch><any>(this.getChildAt(7));
		this.n19 = <fairygui.GImage><any>(this.getChildAt(8));
		this.n20 = <fairygui.GTextField><any>(this.getChildAt(9));
		this.vibration_switch = <com_switch><any>(this.getChildAt(10));
		this.back_home = <btn_back_home><any>(this.getChildAt(11));
		this.btn_more = <btn_moregame><any>(this.getChildAt(12));
		this.n26 = <fairygui.GGroup><any>(this.getChildAt(13));
	}
}