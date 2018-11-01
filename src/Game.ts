/**
 * 游戏逻辑类
 */

class Game {

    constructor() {
        if (this.selectPic == null) {
            this.selectPic = Laya.loader.getRes("../laya/assets/res/img1.png");
            this.selectPic.url = "../laya/assets/res/img1.png";
        }

        this.gameInit();
    }

    private gameInit(): void {
        this.createGameScence();
    }

    /**
     * 创建游戏场景
     */
    private createGameScence() {
        this.sprite = new Laya.Sprite();
        this.scrollSprite = new Laya.Sprite();
        this._w = this.selectPic.width / 3;
        this._h = this.selectPic.height / 4;
        let _w: number = this.selectPic.width;
        let _h: number = this.selectPic.height;
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
        this.scrollSprite.y = this.sprite.y + this.sprite.height+ 20;
        Laya.stage.addChild(this.sprite);
        Laya.stage.addChild(this.scrollSprite);

        this.initScrollSprite(this.selectPic.url);
    }

    private initScrollSprite(url: string): void  {
        let img: Laya.Image = new Laya.Image(url);
        img.scale(0.5,0.5);
        this.scrollSprite.addChild(img);
    }
    private addLittlePic(): void {
        this.littlePicArr = [];
        this.oldPicArr = [];
        //设置小图位置
        let offx: number = 0;
        let offy: number = 0;
        //创建小图并保存到小图集合中(15张)
        for (let i: number = 1; i <= 12; i++) {
            if (offx >= 3 * this._w) {
                offx = 0;
                offy = offy + this._h;
            }
            let pic = new Picture(this.selectPic, offx, offy, i, this._w, this._h);
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
        for (let i: number = 0; i < this.littlePicArr.length; i++) {
            if (offx >= 3 * this._w)//说明此时进入到下一行图片
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
    }
    private clickImg(img: Picture): void {
        if (this.selectImg == null) {
            this.selectImg = img;
            this.selectImg.alpha = 0.5;
        } else {
            //若现在选中的图片存在，则交换这两个图片位置并设置选中的图片为空
            this.exchange(this.selectImg, img);
            this.selectImg.alpha = 1;
            this.selectImg = null;
        }
    }

    private randArr(arr: Array<any>): void {
        function randomsort(a, b) {
            return Math.random() > 0.5 ? -1 : 1;
        }
        arr.sort(randomsort);
    }

    /**
     * 交换2张图片在数组中的位置
     * @param img1 要交换的图片1
     * @param img2 要交换的图片2
     */
    private exchangeImginLittArr(img1: Picture, img2: Picture) {

        let index1: number = this.littlePicArr.indexOf(img1);
        let index2: number = this.littlePicArr.indexOf(img2);

        this.littlePicArr[index1] = img2;
        this.littlePicArr[index2] = img1;
    }
    private exchange(img1: Picture, img2: Picture): void {
        //只有当img2在img1周围时才可以交换
        let _img1x: number = img1.x;
        let _img1y: number = img1.y;
        let _img2x: number = img2.x;
        let _img2y: number = img2.y;
        //以下四种情况可以交换
        if (img2.x == img1.x && img2.y + this._h - img1.y < 10 && img2.y + this._h - img1.y > -10)//img2在img1上面
        {
            //交换图片
            Laya.Tween.to(img1, { x: _img2x, y: _img2y }, 1000, Laya.Ease.elasticOut, null, 0);
            Laya.Tween.to(img2, { x: _img1x, y: _img1y }, 1000, Laya.Ease.elasticOut, null, 0);
            this.exchangeImginLittArr(img1, img2);
        } else if (img2.x == img1.x && img2.y - this._h - img1.y < 10 && img2.y - this._h - img1.y > -10)//img2在img1下面
        {
            Laya.Tween.to(img1, { x: _img2x, y: _img2y }, 1000, Laya.Ease.elasticOut, null, 0);
            Laya.Tween.to(img2, { x: _img1x, y: _img1y }, 1000, Laya.Ease.elasticOut, null, 0);
            this.exchangeImginLittArr(img1, img2);
        } else if (img2.y == img1.y && img2.x + this._w - img1.x < 10 && img2.x + this._w - img1.x > -10)//img2在img1左边
        {
            Laya.Tween.to(img1, { x: _img2x, y: _img2y }, 1000, Laya.Ease.elasticOut, null, 0);
            Laya.Tween.to(img2, { x: _img1x, y: _img1y }, 1000, Laya.Ease.elasticOut, null, 0);
            this.exchangeImginLittArr(img1, img2);
        } else if (img2.y == img1.y && img2.x - this._w - img1.x < 10 && img2.x - this._w - img1.x > -10)//img2在img1右边
        {
            Laya.Tween.to(img1, { x: _img2x, y: _img2y }, 1000, Laya.Ease.elasticOut, null, 0);
            Laya.Tween.to(img2, { x: _img1x, y: _img1y }, 1000, Laya.Ease.elasticOut, null, 0);
            this.exchangeImginLittArr(img1, img2);
        }
        //完成标志
        let isComplete: boolean = true;
        //交换完毕后判断当前是否完成
        for (let i: number = 0; i < this.oldPicArr.length; i++) {
            if (this.littlePicArr[i] !== this.oldPicArr[i])//只要不相等
            {
                isComplete = false;
            }
        }
        if (isComplete) {
            this.showSuccess();
        }
    }

    private showSuccess(): void {
        let dialog: ui.showSuccessPageUI = new ui.showSuccessPageUI();
        dialog.show();
        dialog._close.on("click", this, function (dialog: ui.showSuccessPageUI, obj: any) {
            dialog.close();
            obj.reBegin();
        }, [dialog, this]);
    }

    private reBegin(): void {
        //清除舞台上所有内容
        Laya.stage.removeChildren(0, Laya.stage.numChildren);
        this.createGameScence();
    }


    //设置当前选择的图片纹理
    private selectPic: Laya.Texture = null;
    //小图集合
    private littlePicArr: Array<Picture> = [];
    //游戏图片背景
    private sprite: Laya.Sprite;
    //小图宽度和高度
    private _w: number;
    private _h: number;
    //选中的小图
    private selectImg: Picture;
    //图片原始顺序
    private oldPicArr: Array<Picture> = [];
    //放置游戏缩略图的容器
    private scrollSprite: Laya.Sprite;
}