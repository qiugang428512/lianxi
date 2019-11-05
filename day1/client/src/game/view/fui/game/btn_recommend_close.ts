/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class btn_recommend_close extends fairygui.GComponent {

	public n1:fairygui.GImage;

	public static URL:string = "ui://isxx5ak7quq86q";

	public static createInstance():btn_recommend_close {
		return <btn_recommend_close><any>(fairygui.UIPackage.createObject("game","btn_recommend_close"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n1 = <fairygui.GImage><any>(this.getChildAt(0));
	}
}