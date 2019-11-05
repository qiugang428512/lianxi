/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class guidemaskcircle extends fairygui.GComponent {

	public circle1:fairygui.GGraph;
	public circle2:fairygui.GGraph;

	public static URL:string = "ui://isxx5ak7np2abw";

	public static createInstance():guidemaskcircle {
		return <guidemaskcircle><any>(fairygui.UIPackage.createObject("game","guidemaskcircle"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.circle1 = <fairygui.GGraph><any>(this.getChildAt(0));
		this.circle2 = <fairygui.GGraph><any>(this.getChildAt(1));
	}
}