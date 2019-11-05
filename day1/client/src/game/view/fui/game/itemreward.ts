/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class itemreward extends fairygui.GComponent {

	public state:fairygui.Controller;
	public n9:fairygui.GGraph;
	public icon_img:fairygui.GLoader;
	public n8:fairygui.GImage;
	public reward_text:fairygui.GTextField;

	public static URL:string = "ui://isxx5ak77suj20";

	public static createInstance():itemreward {
		return <itemreward><any>(fairygui.UIPackage.createObject("game","itemreward"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.state = this.getControllerAt(0);
		this.n9 = <fairygui.GGraph><any>(this.getChildAt(0));
		this.icon_img = <fairygui.GLoader><any>(this.getChildAt(1));
		this.n8 = <fairygui.GImage><any>(this.getChildAt(2));
		this.reward_text = <fairygui.GTextField><any>(this.getChildAt(3));
	}
}