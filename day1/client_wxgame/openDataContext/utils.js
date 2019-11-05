import Def from "./def";

export default class Utils {

    static loadCloudData(keylist, success, fail) {
        if (!wx.getFriendCloudStorage) {
            success([]);
        }
        wx.getFriendCloudStorage({
            keyList: keylist,
            success: res => {
                if (!res.data.length) success([]);;
                success(res.data);
            },
            fail: err => {
                if (fail) fail();
            }
        });
    }

    /**
     * 格式化微信数据并排序
     * @param {*} list 传入微信返回的数据
     * @param {*} cloudkey 共享数据key值
     * @retrun {score:分值,nick:玩家名,src:玩家头像地址 me:是否本玩家}[]
     */
    static getSortedListData(list, cloudkey) {
        if (!list || !list.length) return [];
        let data = [];
        list.forEach((it, index) => {
            if (it.KVDataList && it.KVDataList.length > 0) {
                for (let obj of it.KVDataList) {
                    if (obj.key === cloudkey) {
                        data.push({
                            score: obj.value,
                            nick: it.nickname,
                            src: it.avatarUrl
                        });
                    }
                }
            }
        }
        );

        data.sort((a, b) => {
            return b.score - a.score;
        });

        data.forEach((it, index) => {
            it.rank = ++index;
            if (it.nick == Def.myUserInfo.nickName && it.src == Def.myUserInfo.avatarUrl) {
                it.me = true;
                this._myData = it;
            }
        });
        return data;
    }

    /**
     * 获取自己格式化后的信息,
     * @param {*} list 
     */
    static getMyData(list) {
        for (var it of list) {
            if (it.me) {
                return it;
            }
        }
    }

    /**
     * 即将超越的数据
     */
    static getBeyondData(score, list) {
        for (let i = 0; i < list.length; i++) {
            let obj = list[i];
            if (obj.score > score && !obj.me) {
                return obj;
            }
        }
    }

}