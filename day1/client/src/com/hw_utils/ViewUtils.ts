/**
 * 节点工具
 */
export default class ViewUtils {
	/** 时间轴动画  */
	private static _timeLine: Laya.TimeLine;
	/**单次震动时间  */
	private static readonly ShakeIntervalTime = 80;

	/**
	 * 构造函数
	 */
	public constructor() {

	}

	/**
	 * 从父节点移除自己
	 * @param dis 需要移除的节点
	 */
	public static removeSelf(dis: Laya.Node | fairygui.GObject): void {
		if (dis == null || dis.parent == null) {
			trace("ViewUtils::RemoveFromeParent->找不到父对象")
			return;
		}
		if (dis instanceof Laya.Node) {
			dis.parent.removeChild(dis);
		}
		else if (dis instanceof fairygui.GComponent) {
			dis.removeFromParent();
		}
	}

	/**
	 * 将子元素移到最前面
	 * @param dis 节点
	 */
	public static transChildToTop(dis: Laya.Node): void {
		if (dis == null || dis.parent == null) {
			trace("ViewUtils::RemoveFromeParent->找不到父对象")
			return;
		}
		dis.parent.addChild(dis);
	}

	/**
	 * 置灰
	 * @param dis 节点
	 * @param isCancel 是否取消
	 */
	public static grayed(dis: Laya.Sprite, isCancel: boolean = false): void {
		if (isCancel) {
			dis.filters = [];
			return;
		}

		var grayscaleMat: Array<number> = [
			0, 0, 0, 0, 100,
			0, 0, 0, 0, 100,
			0, 0, 0, 0, 100,
			0, 0, 0, 1, 0
		];
		//创建一个颜色滤镜对象，灰图
		var grayscaleFilter: Laya.ColorFilter = new Laya.ColorFilter(grayscaleMat);
		dis.filters = [grayscaleFilter];
	}

	/**
	* 震屏
	* @param root 
	* @param shakeX
	* @param shakeY
	*/
	public static shakeScreen(root: Laya.Sprite, shakeX: number, shakeY: number): void {
		if (this._timeLine) {
			return;
		}
		var shakeToX: number = root.x + shakeX;
		var shakeToY: number = root.y + shakeY;
		var shakeFromX: number = root.x - shakeX;
		var shakeFromY: number = root.y - shakeY;

		this._timeLine = new Laya.TimeLine();
		this._timeLine.to(root, { x: shakeToX, y: shakeToY }, this.ShakeIntervalTime, Laya.Ease.backOut, 0).to(root,
			{ x: shakeToX, y: shakeFromY }, this.ShakeIntervalTime, Laya.Ease.bounceIn, 0).to(root,
				{ x: shakeFromX, y: shakeFromY }, this.ShakeIntervalTime, Laya.Ease.bounceOut, 0).to(root,
					{ x: shakeFromX, y: shakeToY }, this.ShakeIntervalTime, Laya.Ease.bounceIn, 0).to(root,
						{ x: shakeToX, y: shakeToY }, this.ShakeIntervalTime, Laya.Ease.bounceOut, 0).to(root,
							{ x: shakeFromX, y: shakeFromY }, this.ShakeIntervalTime, Laya.Ease.bounceIn, 0).to(root,
								{ x: root.x, y: root.y }, this.ShakeIntervalTime, Laya.Ease.bounceOut, 0);
		this._timeLine.once(Laya.Event.COMPLETE, this, this.onShakeOver);
		this._timeLine.play();
	}

	/**
	* 震屏结束
	*/
	private static onShakeOver(): void {
		this._timeLine.reset();
		this._timeLine.destroy();
		this._timeLine = null;
	}
}