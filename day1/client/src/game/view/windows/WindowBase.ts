import ViewMgr from "../../control/ViewMgr";

export default class WindowBase extends fairygui.Window {
	public contentPane: fairygui.GComponent;
	public constructor() {
		super();
	}

	public init(...args): void {
		super.init();
	}

	public show(param: any = null): void {
		super.show();
	}

	public hide(): void {
		super.hide();
		ViewMgr.Inst.hideWindow(this);
	}

	public dispose(): void {
	}
}