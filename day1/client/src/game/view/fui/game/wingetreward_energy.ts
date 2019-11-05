/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class wingetreward_energy extends fairygui.GComponent {

	public state:fairygui.Controller;
	public n3:fairygui.GImage;
	public n4:fairygui.GImage;
	public n5:fairygui.GImage;

	public static URL:string = "ui://isxx5ak7xsvo8j";

	public static createInstance():wingetreward_energy {
		return <wingetreward_energy><any>(fairygui.UIPackage.createObject("game","wingetreward_energy"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.state = this.getControllerAt(0);
		this.n3 = <fairygui.GImage><any>(this.getChildAt(0));
		this.n4 = <fairygui.GImage><any>(this.getChildAt(1));
		this.n5 = <fairygui.GImage><any>(this.getChildAt(2));
	}
}