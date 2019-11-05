/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class mustshare_btnok extends fairygui.GComponent {

	public n13:fairygui.GImage;
	public n14:fairygui.GTextField;
	public n15:fairygui.GImage;

	public static URL:string = "ui://isxx5ak7mfc0bh";

	public static createInstance():mustshare_btnok {
		return <mustshare_btnok><any>(fairygui.UIPackage.createObject("game","mustshare_btnok"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n13 = <fairygui.GImage><any>(this.getChildAt(0));
		this.n14 = <fairygui.GTextField><any>(this.getChildAt(1));
		this.n15 = <fairygui.GImage><any>(this.getChildAt(2));
	}
}