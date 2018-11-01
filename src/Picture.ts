/**
 * 小图对象
 * 
 * 小图大小：150 * 150
 */

class Picture extends Laya.Sprite {

    /**
     * 
     * @param textureName 纹理图片
     * @param offx 分割起点x
     * @param offy 分割起点y
     * @param num 
     */
    constructor(textureName: Laya.Texture, offx: number, offy: number, num: number, _w: number, _h: number) {
        super();
        this.num = num;
        if (num) {
            let texture = Laya.Texture.create(textureName, offx, offy, _w, _h);
            //显示图片
            this.graphics.drawTexture(texture);
            this.width = _w;
            this.height = _h;
        } else {
            //空白
            this.graphics.drawRect(0, 0, _w, _h, "#ffffff");
            this.alpha = 1;

            this.width = _w;
            this.height = _h;
        }
    }
    //小图编号
    num: number;
}