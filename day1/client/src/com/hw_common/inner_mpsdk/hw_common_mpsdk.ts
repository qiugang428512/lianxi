import hw_common from "../hw_common";
import hw_common_def from "../hw_common_def";

/*
* mpsdk接口组件
*/
export default class hw_common_mpsdk {
    private _friendList: any[] = [];
    private _friendOpenIdList: any[] = [];
    private _invateUpdateTime: number = 0;
    private _openid: string;
    private _inittime: number;
    private _account: mpsdk.IAccount;

    /**服务器从微信换取的openid */
    public get openid(): string {
        if (this._openid) return this._openid;
        if (this._account) return this._account.openid;
        return null;
    }

    /**
     * 获取账号信息
     * @returns mpsdk.IAccount
     */
    public get account(): mpsdk.IAccount {
        return this._account;
    }

    /**是否新用户 */
    public get newPlayer(): boolean {
        if (hw_common_def.DEBUG_NEWPLAYER) {
            console.error('hw_common_mpsdk::newPlayer->正在进行新手测试,请注意关闭!!');
            return true;
        }
        if (!this._account) {
            console.warn('hw_common_mpsdk::newPlayer->还没有获取到账号信息,不能判断新老用户');
            return false;
        }
        return !this._account.lastLoginTime || this._account.lastLoginTime == this._account.createTime;

    }

    /**平台通过邀请链接创建的好友列表 */
    public get friendlist(): any[] {
        return this._friendList;
    }

    /**平台通过邀请链接创建的好友列表 */
    public get friendOpenidlist(): any[] {
        return this._friendOpenIdList;
    }

    public _init(): void {
        this._inittime = Date.now();
        this._initMpsdk();
        this._initAccount();//拿到openid才能请求数据
        this._getOpenLevel();
    }

    private _initMpsdk(): void {
        let launchoption: any = hw_common.platform.getLaunchOptionsSync();
        mpsdk.init(hw_common.config.gameid, hw_common.config.gamePath, launchoption).then(openid => {
            trace('hw_common_mpsdk::init->获取到openid:', openid, launchoption);
            this._openid = openid;
            mpsdk.Report.reportLogin(0, 0, 0);
            this.invateAccept(launchoption);
            this._secondUpdate();
            this.reportEvent(hw_common_def.REPORT_MPSDKINIT, "1", this._getPasstime() + "");
        }).catch((res) => {
            console.error('hw_common_mpsdk::init->登陆失败:', res);
            this.reportEvent(hw_common_def.REPORT_MPSDKINIT, "0", this._getPasstime() + "");
            hw_common.platform.showModal("登陆失败，请重试(" + res + ")", () => { });
        });
    }

    /**
     * 加载玩家账号信息
     */
    private _initAccount() {
        if (platform.debug) {
            Laya.timer.once(1, this, () => {
                let account: mpsdk.IAccount = hw_common_def.DEBUG_ACCOUNT;
                this._account = account;
                hw_common.event.event(hw_common_def.EVT_SD_SERVERDATA_OK);
                hw_common.event.event(hw_common_def.EVT_MPSDK_LASTTRUESHARETM_OK, 0);
                hw_common.event.event(hw_common_def.EVT_MPSDK_ACCOUNT_OK);
            });
            return;
        }
        mpsdk.Account.getAccountSafe().then((res: mpsdk.IAccount) => {
            trace('hw_common_mpsdk::loadAccount->初始化账号成功:', res);
            this._account = res;
            this._getLastTrueShareTime();
            hw_common.event.event(hw_common_def.EVT_MPSDK_ACCOUNT_OK);
            this.reportEvent(hw_common_def.REPORT_ACCOUNT_OK, "1", this._getPasstime() + "");
        }).catch((e) => {
            console.error("hw_common_mpsdk::loadAccount->无法拿到账号信息,退出游戏");
            this.reportEvent(hw_common_def.REPORT_ACCOUNT_OK, "0", this._getPasstime() + "");
            hw_common.platform.showModal("账号初始化失败，请重新打开游戏", () => {
                hw_common.platform.exitMiniProgram();
            });
        })
    }

    /**
     * 获取运营平台配置文件
     */
    private _getOpenLevel(): void {
        mpsdk.getOpenLevel(platform.version, hw_common.config.gameid).then(data => {
            trace('hw_common_mpsdk::_getOpenLevel->获取到运营配置信息:', data);
            hw_common.config._setPlatformConfig(data);
            this.reportEvent(hw_common_def.REPORT_PLATFORMCONFIG_OK, "1", this._getPasstime() + "");
        }).catch((e) => {
            console.error("hw_common_mpsdk::_getOpenLevel->无法拿到运营配置信息");
            this.reportEvent(hw_common_def.REPORT_PLATFORMCONFIG_OK, "0", this._getPasstime() + "");
        })
    }

    private _getPasstime(): number {
        return Date.now() - this._inittime;
    }

    /**
     * 每秒更新一次,用于好友列表同步等心跳数据
     */
    private _secondUpdate(): void {
        Laya.timer.loop(1000, this, this.updateInvateList);
    }

    /**
     * 获取上次真实分享得时间
     */
    private _getLastTrueShareTime(): void {
        mpsdk.Account.getLastShareTime().then(time => {
            trace("hw_common_mpsdk::init->getLastShareTime->获取到openid:上次分享时间：", time)
            hw_common.event.event(hw_common_def.EVT_MPSDK_LASTTRUESHARETM_OK, time);
        })
    }

    /**
     * 数据打点 游戏事件id不允许为负值
     * @param eventid 
     * @param param1 
     * @param param2 
     */
    public reportEvent(eventid: number, param1: string = null, param2: string = null): void {
        mpsdk.Report.reportEvent(eventid, param1, param2);
        trace("hw_common_mpsdk::reportEvent->打点数据上报:", eventid, param1, param2);
    }
    /**
     * 如果有邀请功能,记录邀请列表
     * @param obj 
     */
    public invateAccept(obj: any): void {
        if (obj == null || obj.query == null) {
            trace('hw_common_mpsdk::invateAccept->没有分享参数:');
            return;
        }
        if (obj.query.userid == null || (obj.query.invite == null)) {
            trace('hw_common_mpsdk::invateAccept->没有分享参数[userid][fieldid]');
            return;
        }
        if (this._openid == obj.query.userid) {
            trace('hw_common_mpsdk::invateAccept->自己分享出去的连接');
            return;
        }
        trace('hw_common_mpsdk::invateAccept->接受好友邀请1,userid:', obj.query.userid, "myopenid:", this._openid);
        let str: string = JSON.stringify({ invite: obj.query.invite });
        str = encodeURIComponent(str);
        mpsdk.Account.getAccountSafe().then((iAcount) => {
            let lasttime = iAcount.lastLoginTime;
            if (obj.query) {
                if (obj.query.userid) {
                    var payload = str + "_" + hw_common.servertime.now;
                    mpsdk.SNS.inviteAccept(obj.query.userid, payload, 1, lasttime);
                    trace('hw_common_mpsdk::invateAccept->接受好友邀请2:', lasttime);
                }
            }
        }).catch((res) => {
            console.warn("hw_common_mpsdk::invateAccept->", res);
        });

    }

    /**
     * 更新好友列表
     */
    public updateInvateList(): void {
        var nowtime: number = hw_common.servertime.now;
        if (nowtime - this._invateUpdateTime < hw_common_def.DEF_FRIENDREFRESH) {
            return;
        }
        this._invateUpdateTime = nowtime;
        mpsdk.SNS.inviteResultList(1).then((list: any) => {
            trace("hw_common_mpsdk::_updateInvateList->加载好友列表:", list);
            if (list == null) {
                return;
            }
            this._friendList = list.friends;
            this._friendOpenIdList = list.openId;
        })
    }

}