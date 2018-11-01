/**
 * 游戏逻辑类
 */
var Game = /** @class */ (function () {
    function Game() {
        //设置当前选择的图片纹理
        this.selectPic = null;
        //小图集合
        this.littlePicArr = [];
        //图片原始顺序
        this.oldPicArr = [];
        if (this.selectPic == null) {
            this.selectPic = Laya.loader.getRes("../laya/assets/res/img1.png");
            this.selectPic.url = "../laya/assets/res/img1.png";
        }
        this.gameInit();
    }
    Game.prototype.gameInit = function () {
        this.createGameScence();
    };
    /**
     * 创建游戏场景
     */
    Game.prototype.createGameScence = function () {
        this.sprite = new Laya.Sprite();
        this.scrollSprite = new Laya.Sprite();
        this._w = this.selectPic.width / 3;
        this._h = this.selectPic.height / 4;
        var _w = this.selectPic.width;
        var _h = this.selectPic.height;
        this.sprite.graphics.drawRect(0, 0, _w, _h, '#2F4F2F');
        //150*3 = 450 
        //150*6 = 900
        this.sprite.width = _w;
        this.sprite.height = _h;
        //放置在舞台中央
        this.sprite.x = (Laya.stage.width - this.sprite.width) / 2;
        this.sprite.y = (Laya.stage.height - this.sprite.height) / 2;
        //切分大图
        this.addLittlePic();
        this.scrollSprite.x = this.sprite.x + this.sprite.width / 2;
        this.scrollSprite.y = this.sprite.y + this.sprite.height + 20;
        Laya.stage.addChild(this.sprite);
        Laya.stage.addChild(this.scrollSprite);
        this.initScrollSprite(this.selectPic.url);
    };
    Game.prototype.initScrollSprite = function (url) {
        var img = new Laya.Image(url);
        img.scale(0.5, 0.5);
        this.scrollSprite.addChild(img);
    };
    Game.prototype.addLittlePic = function () {
        this.littlePicArr = [];
        this.oldPicArr = [];
        //设置小图位置
        var offx = 0;
        var offy = 0;
        //创建小图并保存到小图集合中(15张)
        for (var i = 1; i <= 12; i++) {
            if (offx >= 3 * this._w) {
                offx = 0;
                offy = offy + this._h;
            }
            var pic = new Picture(this.selectPic, offx, offy, i, this._w, this._h);
            offx = offx + this._w;
            this.littlePicArr.push(pic);
            this.oldPicArr.push(pic);
        }
        //打乱图片排序
        this.randArr(this.littlePicArr);
        //设置小图位置
        offx = 0;
        offy = 0;
        //添加到容器上
        for (var i = 0; i < this.littlePicArr.length; i++) {
            if (offx >= 3 * this._w) //说明此时进入到下一行图片
             {
                offx = 0;
                offy = offy + this._h;
            }
            this.littlePicArr[i].x = offx;
            this.littlePicArr[i].y = offy;
            offx = offx + this._w;
            this.sprite.addChild(this.littlePicArr[i]);
            this.littlePicArr[i].on(Laya.Event.CLICK, this, this.clickImg, [this.littlePicArr[i]]);
        }
    };
    Game.prototype.clickImg = function (img) {
        if (this.selectImg == null) {
            this.selectImg = img;
            this.selectImg.alpha = 0.5;
        }
        else {
            //若现在选中的图片存在，则交换这两个图片位置并设置选中的图片为空
            this.exchange(this.selectImg, img);
            this.selectImg.alpha = 1;
            this.selectImg = null;
        }
    };
    Game.prototype.randArr = function (arr) {
        function randomsort(a, b) {
            return Math.random() > 0.5 ? -1 : 1;
        }
        arr.sort(randomsort);
    };
    /**
     * 交换2张图片在数组中的位置
     * @param img1 要交换的图片1
     * @param img2 要交换的图片2
     */
    Game.prototype.exchangeImginLittArr = function (img1, img2) {
        var index1 = this.littlePicArr.indexOf(img1);
        var index2 = this.littlePicArr.indexOf(img2);
        this.littlePicArr[index1] = img2;
        this.littlePicArr[index2] = img1;
    };
    Game.prototype.exchange = function (img1, img2) {
        //只有当img2在img1周围时才可以交换
        var _img1x = img1.x;
        var _img1y = img1.y;
        var _img2x = img2.x;
        var _img2y = img2.y;
        //以下四种情况可以交换
        if (img2.x == img1.x && img2.y + this._h - img1.y < 10 && img2.y + this._h - img1.y > -10) //img2在img1上面
         {
            //交换图片
            Laya.Tween.to(img1, { x: _img2x, y: _img2y }, 1000, Laya.Ease.elasticOut, null, 0);
            Laya.Tween.to(img2, { x: _img1x, y: _img1y }, 1000, Laya.Ease.elasticOut, null, 0);
            this.exchangeImginLittArr(img1, img2);
        }
        else if (img2.x == img1.x && img2.y - this._h - img1.y < 10 && img2.y - this._h - img1.y > -10) //img2在img1下面
         {
            Laya.Tween.to(img1, { x: _img2x, y: _img2y }, 1000, Laya.Ease.elasticOut, null, 0);
            Laya.Tween.to(img2, { x: _img1x, y: _img1y }, 1000, Laya.Ease.elasticOut, null, 0);
            this.exchangeImginLittArr(img1, img2);
        }
        else if (img2.y == img1.y && img2.x + this._w - img1.x < 10 && img2.x + this._w - img1.x > -10) //img2在img1左边
         {
            Laya.Tween.to(img1, { x: _img2x, y: _img2y }, 1000, Laya.Ease.elasticOut, null, 0);
            Laya.Tween.to(img2, { x: _img1x, y: _img1y }, 1000, Laya.Ease.elasticOut, null, 0);
            this.exchangeImginLittArr(img1, img2);
        }
        else if (img2.y == img1.y && img2.x - this._w - img1.x < 10 && img2.x - this._w - img1.x > -10) //img2在img1右边
         {
            Laya.Tween.to(img1, { x: _img2x, y: _img2y }, 1000, Laya.Ease.elasticOut, null, 0);
            Laya.Tween.to(img2, { x: _img1x, y: _img1y }, 1000, Laya.Ease.elasticOut, null, 0);
            this.exchangeImginLittArr(img1, img2);
        }
        //完成标志
        var isComplete = true;
        //交换完毕后判断当前是否完成
        for (var i = 0; i < this.oldPicArr.length; i++) {
            if (this.littlePicArr[i] !== this.oldPicArr[i]) //只要不相等
             {
                isComplete = false;
            }
        }
        if (isComplete) {
            this.showSuccess();
        }
    };
    Game.prototype.showSuccess = function () {
        var dialog = new ui.showSuccessPageUI();
        dialog.show();
        dialog._close.on("click", this, function (dialog, obj) {
            dialog.close();
            obj.reBegin();
        }, [dialog, this]);
    };
    Game.prototype.reBegin = function () {
        //清除舞台上所有内容
        Laya.stage.removeChildren(0, Laya.stage.numChildren);
        this.createGameScence();
    };
    return Game;
}());
//# sourceMappingURL=Game.js.map