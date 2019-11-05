/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class btn_more extends fairygui.GButton {

	public btn_more:fairygui.GImage;

	public static URL:string = "ui://isxx5ak7quq85y";

	public static createInstance():btn_more {
		return <btn_more><any>(fairygui.UIPackage.createObject("game","btn_more"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.btn_more = <fairygui.GImage><any>(this.getChildAt(0));
	}
}