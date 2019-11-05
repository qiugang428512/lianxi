/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import sceneloading from "./sceneloading";
import com_icon from "./com_icon";

export default class loadingBinder{
	public static bindAll():void {
		fairygui.UIObjectFactory.setPackageItemExtension(sceneloading.URL, sceneloading);
		fairygui.UIObjectFactory.setPackageItemExtension(com_icon.URL, com_icon);
	}
}