export class hw_complain_config {
	/**这个可以查询游戏名和游戏icon,可以自己再浏览器中查,也可以代码中调用*/
	public static GetGameInfo_URL: string = "https://xyx-mainland.raink.com.cn/complaint/game?gameid=";

	/**提交地址*/
	public static SUBMIT_URL: string = "https://xyx-mainland.raink.com.cn/complaint/save";
	/**投诉界面显示的游戏图标,可以通过GetGameInfo_URL查询*/
	public static Iconurl: string = "https://cdn-xyx.raink.com.cn/ad/images/5227_201904241332585151.png";
	/**投诉界面显示的游戏名,可以通过GetGameInfo_URL查询*/
	public static GameName: string = "成语接龙记";
	public static GameId: number = 5597;
}