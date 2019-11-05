/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class guidemaskclick extends fairygui.GComponent {

	public n11:fairygui.GImage;

	public static URL:string = "ui://isxx5ak7np2ac3";

	public static createInstance():guidemaskclick {
		return <guidemaskclick><any>(fairygui.UIPackage.createObject("game","guidemaskclick"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n11 = <fairygui.GImage><any>(this.getChildAt(0));
	}
}