export default class GameDef {
	public static LEVELMAXANSWER: number = 5;//游戏中最大答案数;
	public static ENERGYMAX: number = 5;//最大精力;
	public static LEVELDEFAULTLEN: number = 50;//游戏圆形选择区域的默认半径
	public static LEVELVIDEODELAY: number = 60;//看视频获得的游戏延时时间(s);
	public static LEVELWRONGDECTIME: number = 20;//答错扣除的时间;
	public static GAMINGBANNERHEIGHT: number = 1480;//舞台高超过这个数字在游戏中显示广告
	public static BANNERREFRESHBYGAME: number = 2;//N局游戏刷新一次广告
	public static ENERGYRECOVERTIME: number = platform.debug ? 10 * 60 * 50 : 5 * 60 * 1000;//精力恢复时间
	public static OFFLINEREWARDS_DELAY: number = 2 * 60 * 1000; //离线奖励间隔
	//精力奖励
	public static OFFLINEREWARDS_ENERGY_NUM: number = 2;//离线奖励个数
	public static ENERGYCLICK_ENERGY_NUM: number = 2;//精力点击个数
	public static FLOATREWARDS_ENERGY_NUM: number = 2;//浮窗进入奖励个数
	public static COLLECTREWARDS_ENERGY_NUM: number = 2;//收藏进入奖励个数
	public static RANKUPREWARDS_ENERGY_NUM: number = 2;//段位提升奖励个数
	public static TREASURE_ENERGY_NUM: number = 2;//荣耀宝箱奖励个数
	public static ENERGYOVER_ENERGY_NUM: number = 2;//体力不足奖励个数

	public static LUCKNUM_FIRST_NUM: number = 3;//第一次赠送的奖励次数
	public static GAMEHELPANIDELAY: number = 5000;//求助按钮的动画等待时间
	public static CCSFJUMPLEVEL: number = 6;//通关第n关时需要跳出的界面;
	public static MUSTSHARELEVEL: number = 10;//每通关X关弹出一次必须解锁
	public static WINPROMOTIONSHOWLEVEL: number = 10;//N关以后弹出晋级面板
}