import { hw_complain_imagebtn } from "./btns/hw_complain_imagebtn";
import { hw_complain_btnsubmit } from "./btns/hw_complain_btnsubmit";
import { hw_complain_config } from "../hw_complain_config";
import { hw_complain_utils } from "./utils/hw_complain_utils";
import { hw_complain_btnclose } from "./btns/hw_complain_btnclose";
import { hw_complain_btnitem } from "./btns/hw_complain_btnitem";

export class hw_complain1 extends Laya.Sprite {

	static Left: number = 30;
	static Color_Navigate: string = "#f2f2f2";
	static Color_line: string = "#d8d7dc";
	static Color_Bg: string = "#F2F1F6";
	static Color_Bg2: string = "#f2f1f6";
	static Color_Text_Gray: string = "#87868b";
	static Color_White: string = "#ffffff";
	static Color_Green: string = "#1aac19";
	static ItemData: any[] = [
		{
			txt: "充值", sub:
				[
					{ txt: "充值失败" },
					{ txt: "充值未到账" },
					{ txt: "购买道具未到账" },
					{ txt: "恶意扣费" }
				]
		},
		{
			txt: "账号异常", sub:
				[
					{ txt: "恶意封号" },
					{ txt: "登录失败" }
				]
		},
		{ txt: "欺诈赌博" },
		{ txt: "恶意营销" },
		{ txt: "色情" },
		{
			txt: "诱导", sub:
				[
					{ txt: "诱导分享" },
					{ txt: "诱导关注" },
					{ txt: "诱导下载" }
				]
		},
		{ txt: "骚扰" },
		{ txt: "违法犯罪" },
		{ txt: "侵权 (冒名、诽谤、抄袭)" },
		{ txt: "隐私信息收集" },
		{ txt: "其他" }
	];

	private _offsetY: number = 0;
	private _group: Laya.Sprite;

	private _navigatorgroup: Laya.Sprite;
	private _navigator_text: Laya.Text;

	private _scroll: Laya.VScrollBar;
	private _scrollSprite: Laya.Sprite;

	private _icongroup: Laya.Sprite;
	private _iconBit: Laya.Sprite;

	private _descgroup: Laya.Sprite;
	private _descInput: Laya.TextInput;


	private _imagegroup: Laya.Sprite;//上传图
	private _imageBtnlist: hw_complain_imagebtn[] = null;
	private _imageCountTxt: Laya.Text;

	private _submitBtn: hw_complain_btnsubmit;

	private _curdata: any;

	public constructor(gameid: number = null, gamename: string = null, iconurl: string = null, offsety: number = 0) {
		super();
		this.mouseEnabled = true;
		this.size(720, 1280);
		if (gameid) hw_complain_config.GameId = gameid;
		if (gamename) hw_complain_config.GameName = gamename;
		if (iconurl) hw_complain_config.Iconurl = iconurl;
		this._offsetY = offsety;
		this.on(Laya.Event.ADDED, this, this.onStage);
		this.on(Laya.Event.REMOVED, this, this.onRemoveStage);
		this.loadIcon();
	}


	private loadIcon(): void {
		this._iconBit = new Laya.Sprite();
		this._iconBit.loadImage(hw_complain_config.Iconurl, Laya.Handler.create(this, () => {//,0,0,100,100
			trace("[laya log complain]加载了投诉图标", !this._icongroup);
			this._iconBit.width = 100; this._iconBit.height = 100;
			if (this._icongroup) {
				this.addIcon();
			}
		}));
	}
	private onStage(e: any): void {
		this.init();
	}

	private onRemoveStage(e: any): void {

	}

	private init(): void {

		this.createBG();
		this._group = new Laya.Sprite();
		this._group.mouseEnabled = true;
		this.addChild(this._group);

		this.createNavgation();
		this.loadIcon();
		this.createScroll();
		this.setItem(hw_complain1.ItemData);
	}

	//创建背景
	private createBG(): void {
		var bg: Laya.Sprite = new Laya.Sprite();
		bg.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#D2E3F2");
		this.addChild(bg);
	}

	//创建导航栏
	private createNavgation(): void {
		this._navigatorgroup = new Laya.Sprite();
		this._navigatorgroup.mouseEnabled = true;
		this._group.addChild(this._navigatorgroup);
		this._navigatorgroup.y = this._offsetY;

		var sp: Laya.Sprite = hw_complain_utils.createBGShape(
			Laya.stage.width,
			80,
			hw_complain1.Color_Navigate,
			hw_complain1.Color_line
		);
		this._navigatorgroup.addChild(sp);

		var closebtn: hw_complain_btnclose = new hw_complain_btnclose();
		closebtn.size(80, 80);
		closebtn.mouseEnabled = true;
		this._navigatorgroup.addChild(closebtn);

		var tousu: Laya.Text = hw_complain_utils.createText("投诉", 34);
		tousu.x = closebtn.x + 80;
		tousu.y = (80 - 34) / 2;
		tousu.mouseEnabled = false;
		this._navigatorgroup.addChild(tousu);

		var bar: Laya.Sprite = hw_complain_utils.createBGShape(
			Laya.stage.width,
			74,
			hw_complain1.Color_Bg2,
			hw_complain1.Color_line
		);
		this._navigatorgroup.addChild(bar);
		bar.y = 80;

		this._navigator_text = hw_complain_utils.createText("请选择投诉原因", 28, hw_complain1.Color_Text_Gray);
		this._navigator_text.x = hw_complain1.Left;
		this._navigator_text.y = bar.y + (74 - 28) / 2;
		this._navigator_text.mouseEnabled = false;
		this._navigatorgroup.addChild(this._navigator_text);

		closebtn.on(Laya.Event.CLICK, this, this.onClose);
	}

	//排行容器
	private createScroll(): void {
		this._scroll = new Laya.VScrollBar();
		this._scroll.hide = true;
		this._scrollSprite = new Laya.Sprite();
		this._scroll.target = this._scrollSprite;
		this._scroll.width = Laya.stage.width;
		this._scroll.height = Laya.stage.height - (160) - this._offsetY;
		this._scroll.height = 1000;
		this._scroll.pos(0, this._navigatorgroup.y + 160);
		this._scroll.elasticDistance = 20;
		this._scroll.min = 0;
		this._scroll.max = 100;
		this._scrollSprite.y = this._navigatorgroup.y + 160;
		this._group.addChild(this._scrollSprite);
		this._group.addChild(this._scroll);
	}

	//设置元素
	private setItem(datalist: any): void {
		this._scrollSprite.removeChildren();
		for (var i: number = 0; i < datalist.length; i++) {
			let data: any = datalist[i];
			let item: hw_complain_btnitem = new hw_complain_btnitem(Laya.stage.width, data);
			this._scrollSprite.addChild(item);
			item.y = i * 90;
			item.on(Laya.Event.CLICK, this, function (e: any): void {
				this._curdata = data;
				if (data.sub) {
					this.setItem(data.sub);
				}
				else {
					this.createSubmit(data);
				}
			});
		}
		this._scroll.value = 0;
	}

	//创建提交页
	private createSubmit(data: any): void {
		this._navigator_text.text = "投诉对象";
		this.createIcon();
		this.createDesc();
		this.createImage();
		this.createSubmitBtn();
	}

	//icon
	private createIcon(): void {
		this._scrollSprite.removeChildren();
		if (this._icongroup) {
			return;
		}
		//图标栏
		this._icongroup = new Laya.Sprite();
		this._group.addChild(this._icongroup);
		this._icongroup.y = this._navigatorgroup.y + 160;

		var sp: Laya.Sprite = hw_complain_utils.createBGShape(
			Laya.stage.width,
			120,
			hw_complain1.Color_White,
			hw_complain1.Color_line
		);
		this._icongroup.addChild(sp);

		if (this._iconBit) {
			this.addIcon();
		}

		var nametxt: Laya.Text = hw_complain_utils.createText(hw_complain_config.GameName);
		this._icongroup.addChild(nametxt);
		nametxt.x = 150;
		nametxt.y = (120 - 34) / 2;;
	}

	private addIcon(): void {
		this._icongroup.addChild(this._iconBit);
		this._iconBit.x = hw_complain1.Left;
		this._iconBit.y = (120 - 100) / 2;
	}

	//描述
	private createDesc(): void {
		this._descgroup = new Laya.Sprite();
		this._group.addChild(this._descgroup);
		this._descgroup.y = this._icongroup.y + 120;//;

		var bar: Laya.Sprite = hw_complain_utils.createBGShape(
			Laya.stage.width,
			74,
			hw_complain1.Color_Bg2,
			hw_complain1.Color_line
		);
		this._descgroup.addChild(bar);

		var text: Laya.Text = hw_complain_utils.createText("投诉描述", 28, hw_complain1.Color_Text_Gray);
		text.x = hw_complain1.Left;
		text.y = bar.y + (74 - 34) / 2;
		this._descgroup.addChild(text);

		var item: hw_complain_btnitem = new hw_complain_btnitem(Laya.stage.width, { txt: this._curdata.txt });
		item.mouseEnabled = false;
		item.y = bar.y + 74;
		this._descgroup.addChild(item);

		var contentBG: Laya.Sprite = hw_complain_utils.createBGShape(
			Laya.stage.width,
			230,
			hw_complain1.Color_White,
			hw_complain1.Color_line,
			hw_complain1.Left
		);
		contentBG.y = item.y + 90;
		this._descgroup.addChild(contentBG);

		this._descInput = hw_complain_utils.createInputText();
		this._descInput.height = 180;
		this._descInput.width = 660;
		this._descInput.multiline = true;
		this._descInput.x = hw_complain1.Left;
		this._descInput.y = contentBG.y + (230 - this._descInput.height) / 2;
		this._descInput.maxChars = 200;

		var tipstxt: Laya.Text = hw_complain_utils.createText("请输入投诉内容", 28, hw_complain1.Color_Text_Gray);
		tipstxt.x = this._descInput.x;
		tipstxt.y = this._descInput.y;
		tipstxt.mouseEnabled = false;
		this._descgroup.addChild(tipstxt);
		this._descgroup.addChild(this._descInput);

		var lastrect: Laya.Rectangle = this._descInput.getBounds();
		var counttxt: Laya.Text = hw_complain_utils.createText("0/200", 28, hw_complain1.Color_Text_Gray);
		counttxt.width = 200;
		counttxt.x = lastrect.right - counttxt.width - 20;
		counttxt.y = lastrect.bottom - 28 - 10;
		counttxt.align = "right";
		this._descgroup.addChild(counttxt);
		counttxt.mouseEnabled = false;

		let focusinfun = function (e: any): void {
			if (tipstxt.text == "请输入投诉内容") {
				tipstxt.text = "";
			}
		}

		let focusoutfun = function (e: any): void {
			if (this._descInput.text == "") {
				tipstxt.text = "请输入投诉内容";
			}
		}

		let txtchange = function (): void {
			var count: number = this._descInput.text.length;
			counttxt.text = count + "/" + 200;
		}

		this._descInput.on(Laya.Event.FOCUS, this, focusinfun);
		this._descInput.on(Laya.Event.FOCUS_CHANGE, this, focusoutfun);
		this._descInput.on(Laya.Event.CHANGE, this, txtchange);
	}

	private createImage(): void {
		this._imagegroup = new Laya.Sprite();
		this._group.addChild(this._imagegroup);
		this._imagegroup.y = this._descgroup.y + 74 + 90 + 230;

		var contentBG: Laya.Sprite = hw_complain_utils.createBGShape(
			this.stage.width,
			275,
			hw_complain1.Color_White,
			hw_complain1.Color_line,
			hw_complain1.Left
		);
		this._imagegroup.addChild(contentBG);

		var title: Laya.Text = hw_complain_utils.createText("证据截图");
		title.y = 25;
		title.x = hw_complain1.Left;
		this._imagegroup.addChild(title);

		this._imageCountTxt = hw_complain_utils.createText("0/4", 28, hw_complain1.Color_Text_Gray);
		this._imageCountTxt.y = 25;
		this._imageCountTxt.x = 720 - 28 - 70;
		this._imageCountTxt.align = "right";
		this._imagegroup.addChild(this._imageCountTxt);

		this._imageBtnlist = [];
		for (let i: number = 0; i < 4; i++) {
			let imagebtn: hw_complain_imagebtn = new hw_complain_imagebtn();
			this._imagegroup.addChild(imagebtn);
			imagebtn.y = 85;
			imagebtn.x = hw_complain1.Left + i * (hw_complain_imagebtn.HWLen + 10);
			imagebtn.size(hw_complain_imagebtn.HWLen, hw_complain_imagebtn.HWLen);
			imagebtn.mouseEnabled = true;
			imagebtn.visible = i == 0;
			this._imageBtnlist.push(imagebtn);
			imagebtn.on(Laya.Event.CLICK, this, function (e: any): void {
				this.clickImageBtn(e, i);
			});
		}
	}

	private clickImageBtn(e: any, toi: number): void {
		if (window["wx"] != "undefined") {
			window["wx"].chooseImage({
				count: 4,
				sizeType: ['original', 'compressed'],
				sourceType: ['album', 'camera'],
				success: (res: any) => {
					let fileIndex: number = 0;
					var filepath: string[] = res.tempFilePaths;
					for (let i: number = toi; i < toi + filepath.length; i++) {
						var bit: Laya.Sprite = new Laya.Sprite();
						bit.loadImage(filepath[fileIndex++], Laya.Handler.create(this, () => {//,0,0,156,156
							this._imageBtnlist[i].SetBit(bit);
							this._imageBtnlist[i + 1].visible = true;
						}));
					}

				}
			})
		}
	}

	private createSubmitBtn(): void {
		this._submitBtn = new hw_complain_btnsubmit(660, 93, "提交");
		this._submitBtn.size(660, 93);
		this._submitBtn.y = this._imagegroup.y + 275 + 20;
		this._submitBtn.x = (Laya.stage.width - 660) / 2;
		this._group.addChild(this._submitBtn);
		this._submitBtn.on(Laya.Event.CLICK, this, this.submit);
	}

	private submit(e: any): void {
		if (this._descInput.text == "") {
			if (window["wx"] != "undefined") {
				console.log("hw_complain::submit->请输入投诉内容");
				window["wx"].showToast({ title: "请输入投诉内容", icon: "none" });
			}
			return;
		}
		if (window["wx"] != "undefined") {
			window["wx"].request({
				url: hw_complain_config.SUBMIT_URL,
				method: "POST",
				data: {
					gameid: hw_complain_config.GameId,
					type: this._curdata.txt,
					desc: this._descInput.text,
					return: "json",
				},
				header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
				success: (res) => {
					//服务器返回传送成功返回消息
					this.onClose();
					window["wx"].showToast({ title: "投诉成功", icon: "none" });
				},
				fail: (res) => {
					this.onClose();
				},
			})
		}
	}

	private onClose(e: any = null): void {
		hw_complain_utils.removeSelf(this);
	}
}