/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class com_loader extends fairygui.GComponent {

	public img:fairygui.GLoader;
	public n5:fairygui.GGraph;

	public static URL:string = "ui://isxx5ak7brav3f";

	public static createInstance():com_loader {
		return <com_loader><any>(fairygui.UIPackage.createObject("game","com_loader"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.img = <fairygui.GLoader><any>(this.getChildAt(0));
		this.n5 = <fairygui.GGraph><any>(this.getChildAt(1));
	}
}