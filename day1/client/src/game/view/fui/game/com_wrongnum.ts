/** This is an automatically generated class by FairyGUI. Please do not modify it. **/



export default class com_wrongnum extends fairygui.GComponent {

	public txt:fairygui.GTextField;

	public static URL:string = "ui://isxx5ak7brav3e";

	public static createInstance():com_wrongnum {
		return <com_wrongnum><any>(fairygui.UIPackage.createObject("game","com_wrongnum"));
	}

	public constructor() {
		super();
	}

	protected constructFromXML(xml: any): void {
		super.constructFromXML(xml);

		this.txt = <fairygui.GTextField><any>(this.getChildAt(0));
	}
}