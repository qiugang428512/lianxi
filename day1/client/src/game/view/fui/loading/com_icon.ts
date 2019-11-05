/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class com_icon extends fairygui.GComponent {

	public n18:fairygui.GImage;
	public search_img:fairygui.GImage;
	public t0:fairygui.Transition;

	public static URL:string = "ui://irx2sm8qcn1u7";

	public static createInstance():com_icon {
		return <com_icon><any>(fairygui.UIPackage.createObject("loading","com_icon"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.n18 = <fairygui.GImage><any>(this.getChildAt(0));
		this.search_img = <fairygui.GImage><any>(this.getChildAt(1));
		this.t0 = this.getTransitionAt(0);
	}
}