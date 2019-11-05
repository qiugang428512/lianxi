import FriendRank from './view/rank/friendRank'
import GroupRank from './view/rank/groupRank'
import MiniCanvas from './engine/index';
import Def from './def';
import Beyond from './view/beyond';


const stage = new MiniCanvas(sharedCanvas);

export default class Main {
    constructor() {
        this._initMessage();
        this._initMyInfo();
        this._initView();
    }

    _initMyInfo() {
        wx.getUserInfo({
            openIdList: ['selfOpenId'],
            lang: 'zh_CN',
            success: res => {
                let it = res.data[0];
                Def.myUserInfo = it;
            },
            fail: () => {

            },
            complete: () => {

            }
        })
    }

    _initView() {

    }

    _initMessage() {
        wx.onMessage(data => {
            stage.width = sharedCanvas.width;
            stage.height = sharedCanvas.height;
            switch (data.command) {
                case 'openrank':
                    this._renderFriendRank(data.top);
                    break;
                case 'showGroupRank':
                    this._renderGroupRank(data.shareTickets);
                    break;
                case 'beyond':
                    this._renderBeyond(data.value, data.top);
                    break;
                case 'over':
                    break;
                case 'close':
                    stage.destroy();
                    break;
            }
        });
    }

    _renderFriendRank(top) {
        if (this._friendRank == null) {
            this._friendRank = new FriendRank(stage);
        }
        this._friendRank.show(top);
    }
    _renderGroupRank(top) {
        if (this._groupRank == null) {
            this._groupRank = new GroupRank(stage);
        }
        this._groupRank.show(top);
    }
    _renderBeyond(score, top) {
        if (this._beyond == null) {
            this._beyond = new Beyond(stage);
        }
        this._beyond.show(score, top);
    }


}
new Main();

