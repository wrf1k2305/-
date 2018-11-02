var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var View = laya.ui.View;
var Dialog = laya.ui.Dialog;
var ui;
(function (ui) {
    var chooseMenuUI = /** @class */ (function (_super) {
        __extends(chooseMenuUI, _super);
        function chooseMenuUI() {
            return _super.call(this) || this;
        }
        chooseMenuUI.prototype.createChildren = function () {
            View.regComponent("game.labelRuntime", game.labelRuntime);
            _super.prototype.createChildren.call(this);
            this.createView(ui.chooseMenuUI.uiView);
        };
        chooseMenuUI.uiView = { "type": "View", "props": { "width": 80, "height": 600 }, "child": [{ "type": "VBox", "props": { "y": 0, "x": 0, "width": 80, "space": 100, "align": "center" }, "child": [{ "type": "Label", "props": { "width": 80, "var": "_easy", "text": "easy", "runtime": "game.labelRuntime", "height": 25, "fontSize": 20, "font": "Helvetica", "color": "#ffffff", "align": "center" } }, { "type": "Label", "props": { "y": 0, "x": 0, "width": 80, "var": "_normal", "text": "normal", "runtime": "game.labelRuntime", "fontSize": 20, "font": "Helvetica", "color": "#ffffff", "align": "center" } }, { "type": "Label", "props": { "y": 0, "x": 0, "width": 80, "var": "_hard", "text": "hard", "runtime": "game.labelRuntime", "fontSize": 20, "font": "Helvetica", "color": "#ffffff", "align": "center" } }] }] };
        return chooseMenuUI;
    }(View));
    ui.chooseMenuUI = chooseMenuUI;
})(ui || (ui = {}));
(function (ui) {
    var showSuccessPageUI = /** @class */ (function (_super) {
        __extends(showSuccessPageUI, _super);
        function showSuccessPageUI() {
            return _super.call(this) || this;
        }
        showSuccessPageUI.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.createView(ui.showSuccessPageUI.uiView);
        };
        showSuccessPageUI.uiView = { "type": "Dialog", "props": { "width": 400, "height": 400 }, "child": [{ "type": "Image", "props": { "y": 0, "x": 0, "width": 400, "skin": "comp/bg.png", "sizeGrid": "31,25,13,10", "height": 56 } }, { "type": "Label", "props": { "y": 25, "x": 16, "width": 400, "text": "恭喜完成！", "height": 25, "fontSize": 25, "font": "Helvetica", "bold": false, "align": "center" } }, { "type": "Button", "props": { "y": 2, "x": 370, "var": "_close", "skin": "comp/btn_close.png" } }] };
        return showSuccessPageUI;
    }(Dialog));
    ui.showSuccessPageUI = showSuccessPageUI;
})(ui || (ui = {}));
//# sourceMappingURL=layaUI.max.all.js.map