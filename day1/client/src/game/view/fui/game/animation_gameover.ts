/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class animation_gameover extends fairygui.GComponent {

	public n1:fairygui.GImage;
	public n2:fairygui.GImage;
	public n3:fairygui.GImage;
	public n4:fairygui.GImage;
	public n5:fairygui.GImage;
	public n7:fairygui.GImage;
	public n8:fairygui.GImage;

	public static URL:string = "ui://isxx5ak7s4otat";

	public static createInstance():animation_gameover {
		return <animation_gameover><any>(fairygui.UIPackage.createObject("game","animation_gameover"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n1 = <fairygui.GImage><any>(this.getChildAt(0));
		this.n2 = <fairygui.GImage><any>(this.getChildAt(1));
		this.n3 = <fairygui.GImage><any>(this.getChildAt(2));
		this.n4 = <fairygui.GImage><any>(this.getChildAt(3));
		this.n5 = <fairygui.GImage><any>(this.getChildAt(4));
		this.n7 = <fairygui.GImage><any>(this.getChildAt(5));
		this.n8 = <fairygui.GImage><any>(this.getChildAt(6));
	}
}