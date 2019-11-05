export default class Def {
    static STAGEWIDTH = 720;
    static STAGEHEIGHT = 1280;

    static CLOUDKEY_BESTSCORE = "CloudStorage_BestScore";

    static IMAGE_MYITEMBG = "openDataContext/assets/bg.png";
    static IMAGE_MYITEMBG1 = "openDataContext/assets/bg1.png";
    static IMAGE_BEYONDBG = "openDataContext/assets/beyond.png";

    static SYSINFO = wx.getSystemInfoSync();
    static VIEWHEIGHT = Def.SYSINFO.windowHeight;
    static VIEWWIDTH = Def.SYSINFO.windowWidth;
    static SCALE = Def.VIEWWIDTH / Def.STAGEWIDTH;

    static RANKPANEL_HEIGHT = 730;
    static RANKPANEL_WIDTH = 548;
    static RANKLIST_HEIGHT = 543;
    static RANKITEM_HEIGHT = 120;

    static myUserInfo = {
        avatarUrl: "",
        city: "",
        country: "",
        gender: 1,
        nickName: "",
        province: ""
    };

}