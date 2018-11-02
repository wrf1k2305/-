
module game {

    export class labelRuntime extends Laya.Label {
        constructor()  {
            super();

            this.on(Laya.Event.MOUSE_OVER, this, this.overMouse);
            this.on(Laya.Event.MOUSE_OUT, this, this.outMouse);
        }

        private overMouse(): void
        {
            this.bgColor = "#666666";
        }

        private outMouse(): void
        {
            this.bgColor = "#333333";
        }
    }
}