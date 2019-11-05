
declare function sprintf(key, ...argv);
declare function vsprintf(fmt, argv);

export default class EngineUtility {
    static bIsDebug: boolean = false;
    static debugMeshList: Array<Laya.MeshSprite3D> = new Array<Laya.MeshSprite3D>();
    //Random
    static randomSeed: number = 0;
    //Perfromance
    static enablePerformDetect: boolean = false;
    static performData = [];
    static lastResetTime: number = 0;
    static silencePerformMode = true;

    //Log switcher
    static renderSubmitLog: boolean = false;
    static InitCallback = [];

    static enableMultiTextureSampler = true;            //多纹理采样开关
    static enableSpriteOutline = false;                  //精灵边缘绘制开关
    static enableSpriteBigOutline = false;               //精灵大外框绘制开关
    static enableSpriteCenterDraw = false;               //精灵坐标点绘制开关
    static enableHitRectOutline = false;                //碰撞区域绘制开关

    public static Initilaize() {
        // HACK in Laya engine core.
        for (let callback of this.InitCallback) {
            if (callback) {
                callback();
            }
        }
        // Press shortcut to do some debug operation
        if (this.bIsDebug) {
            Laya.stage.on(Laya.Event.KEY_UP, this, (e) => {
                if (e.ctrlKey) {
                    var x = event["which"] || event["keyCode"];
                    if (e["keyCode"] == 84)//'KEY_T'
                    {
                        this.DumpAllFontAtlasTexture();
                        //this.DumpAllActiveTextures();
                    }
                }
            });
        }
        // Report error when load failed
        Laya.loader.on(laya.events.Event.ERROR, this, (path: string) => {
            EngineUtility.assert(false, "Load file " + path + " failed!");
        });
    }

    public static showDebugBall(bShow: Boolean, pos: Laya.Vector3, radius: number = 1, bEnableDepthTest: boolean = true, color: Laya.Vector4 = new Laya.Vector4(1.0, 0, 0, 1)) {
        if (this.bIsDebug) {
            if (bShow) {
                let debugBall = new Laya.MeshSprite3D(Laya.PrimitiveMesh.createSphere(1.0));
                var material: Laya.BlinnPhongMaterial = new Laya.BlinnPhongMaterial();
                material.depthWrite = true;
                material.albedoColor = color;
                material.blend = Laya.RenderState.BLEND_DISABLE;
                debugBall.meshRenderer.material = material;

                material.depthTest = bEnableDepthTest ? Laya.RenderState.DEPTHTEST_LESS : Laya.RenderState.DEPTHTEST_ALWAYS;
                debugBall.transform.scale.x = radius;
                debugBall.transform.scale.y = radius;
                debugBall.transform.scale.z = radius;
                //SceneMgr.GetInstance().curScene.addChild(debugBall);
                debugBall.transform.position = pos;
                this.debugMeshList.push(debugBall);
            }
            else {
                for (let debugball of this.debugMeshList) {
                    debugball.removeSelf();
                }
            }
        }
    }

    public static showDebugBox(bShow: Boolean, minPos: Laya.Vector3, maxPos: Laya.Vector3, bEnableDepthTest: boolean = true, color: Laya.Vector4 = new Laya.Vector4(1.0, 0, 0, 1)) {
        if (this.bIsDebug) {
            if (bShow) {
                let long = Math.abs(maxPos.x - minPos.x);
                let height = Math.abs(maxPos.y - minPos.y);
                let width = Math.abs(maxPos.z - minPos.z);
                let boxMesh = new Laya.MeshSprite3D(Laya.PrimitiveMesh.createBox(long, height, width));
                var material: Laya.BlinnPhongMaterial = new Laya.BlinnPhongMaterial();
                material.depthWrite = true;
                material.albedoColor = color;
                material.blend = Laya.RenderState.BLEND_DISABLE;
                boxMesh.meshRenderer.material = material;

                material.depthTest = bEnableDepthTest ? Laya.RenderState.DEPTHTEST_LESS : Laya.RenderState.DEPTHTEST_ALWAYS;
                //SceneMgr.GetInstance().curScene.addChild(boxMesh);
                let centerPos = new Laya.Vector3();
                Laya.Vector3.add(maxPos, minPos, centerPos);
                Laya.Vector3.scale(centerPos, 0.5, centerPos);
                boxMesh.transform.position = centerPos;
                this.debugMeshList.push(boxMesh);
            }
            else {
                for (let debugball of this.debugMeshList) {
                    debugball.removeSelf();
                }
            }
        }
    }

    public static assert(value: boolean, ...message) {
        if (!value && this.bIsDebug) {
            let reason = "EngineAssert";
            if (message.length > 0) {
                let key = message[0];
                message.shift();
                reason = EngineUtility.fmt(key, message);
            }
            console.error(reason);
            debugger;
            throw new Error(reason);
        }
    }

    public static log(key, ...message) {
        if (this.bIsDebug) {
            console.log("[" + Laya.Browser.now().toString() + "]: " + this.nestFmt(key, message));
        }
    }

    //Radomn
    public static setRandomSeed(seed: number) {
        EngineUtility.randomSeed = seed;
    }

    public static getRandomNumber(): number {
        EngineUtility.randomSeed = (EngineUtility.randomSeed * 214013 + 2531011) & 0xFFFFFFFF;
        let randomRet = ((EngineUtility.randomSeed >> 16) & 0x7fff);
        return randomRet;
    }

    public static GetRandRange(minValue: number, maxValue: number): number {
        return minValue + Math.round((maxValue - minValue) * this.getRandomNumber() / 0x7fff);
    }

    //Base64
    // private property  
    private static _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    public static EncodeBase64(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = EngineUtility._utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                EngineUtility._keyStr.charAt(enc1) + EngineUtility._keyStr.charAt(enc2) +
                EngineUtility._keyStr.charAt(enc3) + EngineUtility._keyStr.charAt(enc4);
        }
        return output;
    }

    public static DecodeBase64(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = EngineUtility._keyStr.indexOf(input.charAt(i++));
            enc2 = EngineUtility._keyStr.indexOf(input.charAt(i++));
            enc3 = EngineUtility._keyStr.indexOf(input.charAt(i++));
            enc4 = EngineUtility._keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = EngineUtility._utf8_decode(output);
        return output;
    }

    private static _utf8_encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    }

    private static _utf8_decode(utftext) {
        var string = "";
        var i = 0;
        var c = 0;
        var c1 = 0;
        var c2 = 0;
        var c3 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }
        return string;
    }

    //Perform

    public static PerformMark(name: string) {
        if (this.enablePerformDetect) {
            this.assert(this.FindPerformMark(name) == null, "same perform mark " + name + " is detected!");
            this.performData.push({ "name": name, "time": performance.now() });
        }
    }

    public static PeformDuration(startMark: string, endMark: string) {
        let startTime = this.FindPerformMark(startMark);
        let endTime = this.FindPerformMark(endMark);
        this.assert(startTime != null, "find perform start mark " + startMark + " failed!");
        this.assert(endTime != null, "find perform end mark " + endMark + " failed!");
        return endTime - startTime;
    }

    private static FindPerformMark(name: string) {
        for (let i = 0; i < this.performData.length; ++i) {
            if (this.performData[i].name == name) {
                return this.performData[i];
            }
        }
        return null;
    }

    public static PerformReset() {
        if (this.enablePerformDetect) {
            if (Laya.timer.delta > 25) {
                console.log("PERFORM REPORT START frame:%d dt:%d========================", Laya.timer.currFrame, Laya.timer.delta);
                let elapsedTime = 0;
                if (this.performData.length > 1) {
                    for (let i = 0; i < this.performData.length - 1; ++i) {
                        let startPerformData = this.performData[i];
                        let endPerformData = this.performData[i + 1];
                        let retTime = endPerformData.time - startPerformData.time;
                        if (!this.silencePerformMode || retTime != 0) {
                            console.log("from %s to %s: %d", startPerformData.name, endPerformData.name, retTime);
                        }
                    }
                    elapsedTime = this.performData[this.performData.length - 1].time - this.performData[0].time;
                }
                console.log("PERFORM REPORT END " + elapsedTime + " ms deltaTime: " + Laya.timer.delta + " ms clearDuration: " + (performance.now() - this.lastResetTime) + " ms========================");
            }
            this.lastResetTime = performance.now();
            this.performData = [];
        }
    }

    public static DumpAllFontAtlasTexture() {
        let textAtlases = laya.resource.Context['_textRender'].textAtlases;
        let index = 0;
        for (let n of textAtlases) {
            let textAtlas = n as Laya.TextAtlas;
            this.saveTextureToFile(textAtlas.texture._source, textAtlas.texWidth, textAtlas.texHeight, "textAtlas" + index++ + ".png");
        }
    }

    public static DumpAllActiveTextures() {
        let counter = 0;
        for (let activeTex of Laya.WebGLContext._activeTextures) {
            if (activeTex) {
                EngineUtility.log("Dump texture id %s", activeTex.toString());
                this.saveTextureToFile(activeTex, 2048, 2048, "activeTexture_" + counter++ + ".png");
            }
        }
    }

    //
    public static saveTextureToFile(webGLtexture: WebGLTexture, width: number, height: number, fileName: string) {
        let gl = laya.layagl.LayaGL.instance;
        let fb = gl.createFramebuffer();

        // make this the current frame buffer
        gl.bindFramebuffer(gl.FRAMEBUFFER, fb);

        // attach the texture to the framebuffer.
        gl.framebufferTexture2D(
            gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0,
            gl.TEXTURE_2D, webGLtexture, 0);

        // check if you can read from this type of texture.
        var canRead = (gl.checkFramebufferStatus(gl.FRAMEBUFFER) == gl.FRAMEBUFFER_COMPLETE);
        if (canRead) {
            // bind the framebuffer
            gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
            var data = new Uint8Array(width * height * 4);
            // read the pixels
            gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, data);
            var canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext("2d");
            var imageData = ctx.createImageData(width, height);

            for (var i = 0; i < imageData.data.length; i++) {
                imageData.data[i] = data[i];
            }

            ctx.putImageData(imageData, 0, 0);
            var tmp = canvas.toDataURL("image/png");
            var download = document.createElement('a');
            download.href = tmp;
            download.download = fileName;
            download.click();
        }
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }

    public static fmt(key: string, ...argv): string {
        if (argv.length > 0) {
            return vsprintf(key, argv);
        }
        else {
            return key;
        }
    }

    public static nestFmt(key: string, ...argv): string {
        if (argv.length > 0) {
            return vsprintf(key, argv[0]);
        }
        else {
            return key;
        }
    }

    static outlineStackIndex = 0;
    public static addOutlineSprite(sprite: Laya.Sprite, recursive: boolean = false) {
        let texture = sprite.texture;
        if (texture)  {
            let outline = sprite.getChildByName("outline_dbg") as Laya.Sprite;
            if (outline == null) {
                outline = new Laya.Sprite();
                outline.name = "outline_dbg";
                sprite.addChild(outline);
            }
            outline.graphics.clear();
            outline.graphics.drawRect(0, 0, texture.sourceWidth, texture.sourceHeight, null, 0x00FF00, 1);
            outline.graphics.drawRect(texture.offsetX, texture.offsetY, texture.width, texture.height, null, 0x0000FF, 1);
            if (recursive && EngineUtility.outlineStackIndex < 3) {
                EngineUtility.outlineStackIndex++;
                for (let child of sprite._children) {
                    this.addOutlineSprite(child, true);
                }
                EngineUtility.outlineStackIndex--;
            }
        }
    }
}