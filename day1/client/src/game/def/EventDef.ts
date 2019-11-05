export default class EventDef {
	//加载事件
	public static RES_LOADINGOVER: string = "RES_LOADINGOVER";//加载loading结束
	public static RES_GAMEOVER: string = "RES_GAMEOVER";//加载game结束
	public static NET_DATAOK: string = "NET_DATAOK";//数据同步成功
	public static PLATFORMCONFIGOVER: string = "PlatformConfigOver";//配置拿到了.

	//环境事件
	public static ENV_BADFRAME: string = "ENV_BADFRAME";//帧频较差

	//UI事件
	public static UI_SHOWWINDOW: string = "UI_SHOWWINDOW";//窗口显示 param:窗口
	public static UI_HIDEWINDOW: string = "UI_HIDEWINDOW";//窗口关闭 param:窗
	public static UI_WINFAILVIDEOOK: string = "UI_WINFAILVIDEOOK";//游戏失败看视频成功
	public static UI_WINFAILRESTART: string = "UI_WINFAILRESTART";//游戏失败重新开始

	//游戏事件
	public static GAME_CURRENCYCHANGE: string = "GAME_CURRENCYCHANGE";//货币资源数值更改
	public static GAME_GETREWARDCOLLECTION: string = "GAME_GETREWARDCOLLECTION"//获得收藏奖励
	public static GAME_GETREWARDCS: string = "GAME_GETREWARDCS"//获得客服奖励

	public static LUCK_NUMCHANGE: string = 'LUCK_NUMCHANGE';//抽獎次數改變


}