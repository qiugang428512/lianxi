/**
 * 场景基类
 * 
 */
export default class SceneBase {

	protected view: fairygui.GComponent;

	public constructor() {

	}

	public init(param: any = null): void {

	}

	public show(param: any = null): void {
		fairygui.GRoot.inst.addChild(this.view);
	}

	public hide(): void {
		this.view.removeFromParent();
	}

	public dispose(): void {

	}
}