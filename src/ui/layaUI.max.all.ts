
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class chooseMenuUI extends View {
		public _easy:game.labelRuntime;
		public _normal:game.labelRuntime;
		public _hard:game.labelRuntime;

        public static  uiView:any ={"type":"View","props":{"width":80,"height":600},"child":[{"type":"VBox","props":{"y":0,"x":0,"space":100,"align":"center"},"child":[{"type":"Label","props":{"var":"_easy","text":"easy","runtime":"game.labelRuntime","fontSize":25,"font":"Helvetica","color":"#ffffff"}},{"type":"Label","props":{"y":10,"x":10,"var":"_normal","text":"normal","runtime":"game.labelRuntime","fontSize":25,"font":"Helvetica","color":"#ffffff"}},{"type":"Label","props":{"y":81,"x":14,"var":"_hard","text":"hard","runtime":"game.labelRuntime","fontSize":25,"font":"Helvetica","color":"#ffffff"}}]}]};
        constructor(){ super()}
        createChildren():void {
        			View.regComponent("game.labelRuntime",game.labelRuntime);

            super.createChildren();
            this.createView(ui.chooseMenuUI.uiView);

        }

    }
}

module ui {
    export class showSuccessPageUI extends Dialog {
		public _close:Laya.Button;

        public static  uiView:any ={"type":"Dialog","props":{"width":400,"height":400},"child":[{"type":"Image","props":{"y":0,"x":0,"width":400,"skin":"comp/bg.png","sizeGrid":"31,25,13,10","height":56}},{"type":"Label","props":{"y":25,"x":16,"width":400,"text":"恭喜完成！","height":25,"fontSize":25,"font":"Helvetica","bold":false,"align":"center"}},{"type":"Button","props":{"y":2,"x":370,"var":"_close","skin":"comp/btn_close.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.showSuccessPageUI.uiView);

        }

    }
}
