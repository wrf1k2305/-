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
var game;
(function (game) {
    var labelRuntime = /** @class */ (function (_super) {
        __extends(labelRuntime, _super);
        function labelRuntime() {
            var _this = _super.call(this) || this;
            _this.on(Laya.Event.MOUSE_OVER, _this, _this.overMouse);
            _this.on(Laya.Event.MOUSE_OUT, _this, _this.outMouse);
            return _this;
        }
        labelRuntime.prototype.overMouse = function () {
            this.bgColor = "#666666";
        };
        labelRuntime.prototype.outMouse = function () {
            this.bgColor = "#333333";
        };
        return labelRuntime;
    }(Laya.Label));
    game.labelRuntime = labelRuntime;
})(game || (game = {}));
//# sourceMappingURL=labelRuntime.js.map