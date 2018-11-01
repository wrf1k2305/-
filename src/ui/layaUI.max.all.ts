
import View=laya.ui.View;
import Dialog=laya.ui.Dialog;
module ui {
    export class showSuccessPageUI extends Dialog {
		public _close:Laya.Button;

        public static  uiView:any ={"type":"Dialog","props":{"width":400,"height":400},"child":[{"type":"Image","props":{"y":0,"x":0,"width":400,"skin":"comp/bg.png","sizeGrid":"31,25,13,10","height":400}},{"type":"Label","props":{"y":175,"x":0,"width":400,"text":"恭喜完成！","height":50,"fontSize":50,"font":"Helvetica","bold":false,"align":"center"}},{"type":"Button","props":{"y":2,"x":370,"var":"_close","skin":"comp/btn_close.png"}}]};
        constructor(){ super()}
        createChildren():void {
        
            super.createChildren();
            this.createView(ui.showSuccessPageUI.uiView);

        }

    }
}
