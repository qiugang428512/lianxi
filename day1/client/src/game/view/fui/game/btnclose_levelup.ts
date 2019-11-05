/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class btnclose_levelup extends fairygui.GButton {

	public n25:fairygui.GImage;

	public static URL:string = "ui://isxx5ak7xsvo8l";

	public static createInstance():btnclose_levelup {
		return <btnclose_levelup><any>(fairygui.UIPackage.createObject("game","btnclose_levelup"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n25 = <fairygui.GImage><any>(this.getChildAt(0));
	}
}