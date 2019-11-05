// module def {
	/**
	 * 游戏逻辑状态
	 */
	export enum EGameState {
		WaitTouch,//等待操作
		WaitTouchANI,//玩家操作后的等待状态(需要创建新行)
		WaitANI,//等待动画,其他动画情况,如果需要的话再细分
	}
// }