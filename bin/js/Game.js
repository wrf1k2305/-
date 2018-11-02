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
        this.pictureArr = ["../laya/assets/imgres/IMG1.png", "../laya/assets/imgres/IMG2.png", "../laya/assets/imgres/IMG3.png"];
        this.scrollPictureArr = ["../laya/assets/imgres/img_1.png", "../laya/assets/imgres/img_2.png", "../laya/assets/imgres/img_3.png"];
        this.chooseMenu = new ui.chooseMenuUI();
        Laya.stage.addChild(this.chooseMenu);
        //监听事件
        this.chooseMenu._easy.on(Laya.Event.CLICK, this, this.gameInit, ["easy"]);
        this.chooseMenu._normal.on(Laya.Event.CLICK, this, this.gameInit, ["normal"]);
        this.chooseMenu._hard.on(Laya.Event.CLICK, this, this.gameInit, ["hard"]);
        var url = ["../laya/assets/imgres/IMG1.png", "../laya/assets/imgres/IMG2.png", "../laya/assets/imgres/IMG3.png",
            "../laya/assets/imgres/img_1.png", "../laya/assets/imgres/img_2.png", "../laya/assets/imgres/img_3.png"];
        Laya.loader.load(url, Laya.Handler.create(this, this.gameInit, ["easy"]));
    }
    Game.prototype.gameInit = function (text) {
        if (text === "easy") {
            this.selectPic = Laya.loader.getRes(this.pictureArr[0]);
            this.selectScrollPictureurl = this.scrollPictureArr[0];
        }
        else if (text === "normal") {
            this.selectPic = Laya.loader.getRes(this.pictureArr[1]);
            this.selectScrollPictureurl = this.scrollPictureArr[1];
        }
        else if (text === "hard") {
            this.selectPic = Laya.loader.getRes(this.pictureArr[2]);
            this.selectScrollPictureurl = this.scrollPictureArr[2];
        }
        this.reBegin();
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
        this.scrollSprite.y = this.sprite.y;
        Laya.stage.addChild(this.sprite);
        Laya.stage.addChild(this.scrollSprite);
        //将缩略图放置在右边
        this.scrollSprite.x = this.sprite.x + this.sprite.width + 20;
        this.scrollSprite.y = this.sprite.y;
        this.initScrollSprite(this.selectScrollPictureurl);
        //将菜单界面放置在图片左边
        this.chooseMenu.x = this.sprite.x - 100;
        this.chooseMenu.y = this.sprite.y;
        this.chooseMenu.graphics.drawRect(0, 0, 80, this.sprite.height, "#333333");
    };
    /**
     * 存放缩略图
     *
     */
    Game.prototype.initScrollSprite = function (url) {
        var img = new Laya.Image(url);
        this.scrollSprite.addChild(img);
    };
    Game.prototype.addLittlePic = function () {
        this.littlePicArr = [];
        this.oldPicArr = [];
        //设置小图位置
        var offx = 0;
        var offy = 0;
        //创建小图并保存到小图集合中
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
            //设置灰色滤镜
            var colorMatrix = [
                0.3086, 0.6094, 0.0820, 0, 0,
                0.3086, 0.6094, 0.0820, 0, 0,
                0.3086, 0.6094, 0.0820, 0, 0,
                0, 0, 0, 1, 0,
            ];
            //创建灰色颜色滤镜
            var GrayFilter = new Laya.ColorFilter(colorMatrix);
            this.selectImg.filters = [GrayFilter];
        }
        else {
            //若现在选中的图片存在，则交换这两个图片位置并设置选中的图片为空
            this.exchange(this.selectImg, img);
            //恢复
            this.selectImg.filters = [];
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
        if (img2.x - img1.x > -1 && img2.x - img1.x < 1 && img2.y + this._h - img1.y < 1 && img2.y + this._h - img1.y > -1) //img2在img1上面
         {
            //交换图片
            Laya.Tween.to(img1, { x: _img2x, y: _img2y }, 1000, Laya.Ease.elasticOut, null, 0);
            Laya.Tween.to(img2, { x: _img1x, y: _img1y }, 1000, Laya.Ease.elasticOut, null, 0);
            this.exchangeImginLittArr(img1, img2);
        }
        else if (img2.x - img1.x > -1 && img2.x - img1.x < 1 && img2.y - this._h - img1.y < 1 && img2.y - this._h - img1.y > -1) //img2在img1下面
         {
            Laya.Tween.to(img1, { x: _img2x, y: _img2y }, 1000, Laya.Ease.elasticOut, null, 0);
            Laya.Tween.to(img2, { x: _img1x, y: _img1y }, 1000, Laya.Ease.elasticOut, null, 0);
            this.exchangeImginLittArr(img1, img2);
        }
        else if (img2.y - img1.y > -1 && img2.y - img1.y < 1 && img2.x + this._w - img1.x < 1 && img2.x + this._w - img1.x > -1) //img2在img1左边
         {
            Laya.Tween.to(img1, { x: _img2x, y: _img2y }, 1000, Laya.Ease.elasticOut, null, 0);
            Laya.Tween.to(img2, { x: _img1x, y: _img1y }, 1000, Laya.Ease.elasticOut, null, 0);
            this.exchangeImginLittArr(img1, img2);
        }
        else if (img2.y - img1.y > -1 && img2.y - img1.y < 1 && img2.x - this._w - img1.x < 1 && img2.x - this._w - img1.x > -1) //img2在img1右边
         {
            Laya.Tween.to(img1, { x: _img2x, y: _img2y }, 1000, Laya.Ease.elasticOut, null, 0);
            Laya.Tween.to(img2, { x: _img1x, y: _img1y }, 1000, Laya.Ease.elasticOut, null, 0);
            this.exchangeImginLittArr(img1, img2);
        }
        else {
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
        //先清除绘制的纹理
        if (this.sprite) {
            this.sprite.graphics.clear();
        }
        //删除两个容器
        if (this.sprite) {
            this.sprite.removeSelf();
        }
        if (this.scrollSprite) {
            this.scrollSprite.removeSelf();
        }
        this.createGameScence();
    };
    return Game;
}());
//# sourceMappingURL=Game.js.map