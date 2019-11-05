/**微信平台共享域 */
export default class hw_platform_sharecanvas_wx {
    private _texture: Laya.Texture;
    private _sprite: Laya.Sprite;
    private _stoptime: number = 0;
    private _startstop: number = 0;
    private _cleared: boolean = true;

    public constructor() {
        this._initSprite();
        //因为laya瞬间拿到的舞台宽高不对.所以要延迟一点
        Laya.timer.once(1000, this, () => {
            this._initTexture();
        });
    }

    public get shareSprite(): Laya.Sprite {
        return this._sprite;
    }

    public set stopTime(time: number) {
        this._stoptime = time;
        this._startstop = Date.now();
    }

    private _initSprite() {
        if (Laya.Browser.onMiniGame) {
            this._sprite = new Laya.Sprite(); //投影仪的图片；
            this._sprite.name = "guntain";
            this._sprite.zOrder = 10086;
            this._sprite.visible = true;
        }
    }

    private _initTexture(): void {
        let stageW: number = Laya.stage.width;
        let stageH: number = Laya.stage.height;
        let sharedCanvas = Laya.Browser.window.sharedCanvas;
        sharedCanvas.width = stageW;
        sharedCanvas.height = stageH;

        var tex = new Laya.Texture();
        if (Laya["Texture2D"]) {
            tex.bitmap = new Laya["Texture2D"]();
            this._sprite.texture = this._texture = tex;
        } else {
            throw new Error("OpenDataMgr:webgl not found!");
        }

        this._startFrame();
    }

    private _startFrame() {
        if (Laya.Browser.onMiniGame) {
            Laya.timer.frameLoop(2, this, this._frameRender);
        }
    }

    private _frameRender() {
        if (this._texture == null || this._sprite.parent == null) {
            //延时清除渲染残留
            if (this._cleared == false) {
                this._cleared = true;
                Laya.timer.once(200, this, () => {
                    this._texture.bitmap.loadImageSource(Laya.Browser.window.sharedCanvas);
                })
            }
            return;
        }
        if (this._stoptime > 0 && (Date.now() - this._startstop) > this._stoptime) {
            return;
        }
        this._cleared = false;
        this._texture.bitmap.loadImageSource(Laya.Browser.window.sharedCanvas);
    }

    public dispose() {
        Laya.timer.clear(this, this._frameRender);
        this._texture.destroy(true);
    }

}