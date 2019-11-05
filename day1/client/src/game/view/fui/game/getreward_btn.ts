/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class getreward_btn extends fairygui.GButton {

	public n17:fairygui.GImage;

	public static URL:string = "ui://isxx5ak7np2abp";

	public static createInstance():getreward_btn {
		return <getreward_btn><any>(fairygui.UIPackage.createObject("game","getreward_btn"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n17 = <fairygui.GImage><any>(this.getChildAt(0));
	}
}