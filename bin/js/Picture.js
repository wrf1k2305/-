/**
 * 小图对象
 *
 */
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
var Picture = /** @class */ (function (_super) {
    __extends(Picture, _super);
    /**
     *
     * @param textureName 纹理图片
     * @param offx 分割起点x
     * @param offy 分割起点y
     * @param num
     */
    function Picture(textureName, offx, offy, num, _w, _h) {
        var _this = _super.call(this) || this;
        _this.num = num;
        if (num) {
            var texture = Laya.Texture.create(textureName, offx, offy, _w, _h);
            //显示图片
            _this.graphics.drawTexture(texture);
            _this.width = _w;
            _this.height = _h;
        }
        else {
            //空白
            _this.graphics.drawRect(0, 0, _w, _h, "#ffffff");
            _this.alpha = 1;
            _this.width = _w;
            _this.height = _h;
        }
        return _this;
    }
    return Picture;
}(Laya.Sprite));
//# sourceMappingURL=Picture.js.map