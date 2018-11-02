import WebGL = Laya.WebGL;
// 程序入口
class GameMain {
    constructor() {
        Laya.init(Laya.Browser.clientWidth, Laya.Browser.clientHeight, WebGL);
        Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        Laya.stage.bgColor = "#999999";
        let res: Array<string> = [
            "../laya/assets/comp.atlas"
        ];
        //加载拼图资源
        Laya.loader.load(res, Laya.Handler.create(this, this.onLoaded));
    }

    private onLoaded(): void {
         new Game();
    }

}
new GameMain();