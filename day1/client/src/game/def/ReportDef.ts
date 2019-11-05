/**
 * 打点统计
 * mpsdk.reportEvent上报事件,默认从1001开始分配
 */
export default class ReportDef {
	//****************************分享统计*本游戏***************************************************************//
	public static SHARE_MENU: number = 0;//菜单分享,默认胶囊菜单分享永远是0,不可以更改和自定义
	public static SHARE_ENERGYOVER: number = 1;//精力不足弹窗
	public static SHARE_GOLDBTN: number = 2;//顶部金币按钮
	public static SHARE_GAMEHELP: number = 3;//游戏中提示按钮
	public static SHARE_GAMEOVERDELAY: number = 4;//游戏结束延时继续按钮;
	public static SHARE_REWARDSDOUBLE: number = 5;//奖励面板双倍按钮
	public static SHARE_LUCKDRAW: number = 6;//抽奖界面分享
	public static SHARE_WINTREASUREBOX: number = 7;//荣耀宝箱分享
	public static SHARE_GAMESHARE: number = 8;//游戏中求助好友按钮
	public static SHARE_OFFLINEBOXBTN: number = 9;//离线宝箱按钮
	public static SHARE_ENERGYBTNCLICK: number = 10;//精力状态栏按钮
	public static SHARE_ENERGYMUSTSHARE: number = 11;//每10关必须分享才能玩游戏
	public static SHARE_PROMOTIONSHARE: number = 12;//段位升级弹出面板
	public static SHARE_REWARDSNEXTMORE: number = 13;//奖励面板下次N倍奖励
	public static SHARE_OTHER: number = 100;//其他未定义的分享
	//****************************打点统计*通用***************************************************************//
	public static EVENT_SHOWLOADING: number = 1001;//显示loading界面
	public static EVENT_LOADINGOVER: number = 1002;//主loading加载时间,加载完游戏资源的时间 
	public static EVENT_INLOBBY: number = 1003;//用户登陆后第一次进入大厅
	public static Event_PASSLEVEL: number = 1;//成功通关  param1 = 关卡数  param2 = 使用求助次数_剩余时间
	public static EVENT_CLICKLEFTRECOMMEND: number = 2;//用户点击侧边栏
	public static Event_FAIL: number = 3;//失败  param1 = 关卡数  param2 = 使用求助次数_剩余时间
	public static EVENT_CSCLICK: number = 7; //点击客服
	public static EVENT_COLLECTGETENERGY = 21;//每日收藏
	public static EVENT_GETFLOATINGWINGIFT: number = 33; //获得浮窗奖励
	public static EVENT_GETCSWINGIFT: number = 33; //获得客服奖励
	public static EVENT_NEW_LEVLE1: number = 102;//新用户成功进入第一关,param1:0:进入游戏,点击1,2,3,4,5处
	public static EVENT_NEW_CLICKHONOR: number = 108;//新用户点击称号
	public static EVENT_INGAME: number = 121;//用户每次进入游戏.param1:关卡数
	public static EVENT_GAMELINKICON: number = 122;//点击游戏场景的跳转icon;
}