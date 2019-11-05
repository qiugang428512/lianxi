class DebugPlatform implements Platform {
	debug: boolean = true;
	version: string = "1.0.7";
	cdnURL: string = "https://cdn-xyx.raink.com.cn/bszdk/wx/v8/rescdn/";//外网机;
	bannerId: string = "adunit-43f20d5c4841e7da";
	videoId: string = "adunit-d07780367ec7fabb";
	interstitialAdId: string = "adunit-471252d239c10836";
}

if (!window.platform) {
	window.platform = new DebugPlatform();
}

import ViewMgr from "./game/control/ViewMgr";
import ProcessMgr from "./game/control/ProcessMgr";
import GameMgr from "./game/control/game/GameMgr";
import { GMMgr } from "./game/control/game/GMMgr";
import hw_common from "./com/hw_common/hw_common";
import EngineUtility from "./com/hw_utils/EngineUtility";

// 程序入口
class Main {
	constructor() {
		//初始化微信小游戏
		// Laya.MiniAdpter.init(true, false);
		//初始化引擎
		Laya["EngineUtility"] = EngineUtility;
		Laya.init(720, 1280, Laya.WebGL);
		EngineUtility.Initilaize();
		hw_common.init(
			5690,
			"bspdkn",
			"https://cdn-xyx.raink.com.cn/bspdkn/20190909004.jpg",
			"你能看出图片有哪些地方不一样吗?"
		)

		//适配模式
		Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
		Laya.stage.screenMode = Laya.Stage.SCREEN_VERTICAL;
		//开启统计信息
		// Laya.enableDebugPanel();
		mpsdk.Env.showLog = false;
		// platform.debug && Laya.Stat.show();
		ViewMgr.Inst.init();
		ProcessMgr.Inst.Start();
		GMMgr.Inst.init();
	}
}

new Main();