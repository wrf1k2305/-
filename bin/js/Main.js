var WebGL = Laya.WebGL;
// 程序入口
var GameMain = /** @class */ (function () {
    function GameMain() {
        Laya.init(Laya.Browser.clientWidth, Laya.Browser.clientHeight, WebGL);
        Laya.stage.scaleMode = Laya.Stage.SCALE_SHOWALL;
        Laya.stage.alignH = Laya.Stage.ALIGN_CENTER;
        Laya.stage.alignV = Laya.Stage.ALIGN_MIDDLE;
        Laya.stage.bgColor = "#999999";
        var res = [
            "../laya/assets/comp.atlas"
        ];
        //加载拼图资源
        Laya.loader.load(res, Laya.Handler.create(this, this.onLoaded));
    }
    GameMain.prototype.onLoaded = function () {
        new Game();
    };
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=Main.js.map