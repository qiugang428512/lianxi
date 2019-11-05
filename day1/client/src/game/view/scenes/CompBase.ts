import ViewUtils from "../../../com/hw_utils/ViewUtils";

/**
 * 代理组件基类
 * 降外面的显示对象传进来,进行功能上的代理操作
 */
export default class CompBase {

	protected view: fairygui.GComponent;

	public constructor() {
	}

	public Init(view: fairygui.GComponent, ...args): void {
		this.view = view;
	}

	public Dispose(): void {
		ViewUtils.removeSelf(this.view);
	}
}