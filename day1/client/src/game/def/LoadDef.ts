export default class LoadDef {
	static GAME_SOUND: string = "res/sound/";
	/**fui的pkg包名,也是loading资源路径前缀 */
	static PKGNAME_LOADING: string = "res/fui/loading";
	static RES_LOADING =
		[
			{ url: LoadDef.PKGNAME_LOADING + "_atlas0.png", type: Laya.Loader.IMAGE },
			{ url: LoadDef.PKGNAME_LOADING + ".obj", type: Laya.Loader.BUFFER }
		];

	//游戏界面需要的资源
	static PkgName_Game: string = "res/fui/game";
	static ConfigUrl: string = "res/config/config.zip";
	static PATICLE_TRAIL_SETTING: string = "res/ani/star1.part";
	static PATICLE_TRAIL_PNG: string = "res/ani/texture.png";
	static Res_Game =
		[
			{ url: LoadDef.ConfigUrl, type: Laya.Loader.BUFFER },
			{ url: LoadDef.PkgName_Game + ".obj", type: Laya.Loader.BUFFER },
			{ url: LoadDef.PkgName_Game + "_atlas0.png", type: Laya.Loader.IMAGE },
			{ url: LoadDef.PkgName_Game + "_atlas_l4929h.jpg", type: Laya.Loader.IMAGE },
			{ url: LoadDef.PkgName_Game + "_atlas_l84y78.jpg", type: Laya.Loader.IMAGE },
			{ url: LoadDef.PkgName_Game + "_atlas_l84y79.jpg", type: Laya.Loader.IMAGE },
			{ url: LoadDef.PATICLE_TRAIL_SETTING, type: Laya.Loader.JSON },
			{ url: LoadDef.PATICLE_TRAIL_PNG, type: Laya.Loader.IMAGE }
		];
	static ANI_GUIDE_COLLECT: string = "res/ani/zxj_ske.sk";//收藏引导动画
}