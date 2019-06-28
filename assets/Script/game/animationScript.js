cc.Class({
    extends: cc.Component,
    properties: {
    },
    start () {
        this.bol = true;
        //云层闪烁
        this.schedule(()=>{
            this.bol = !this.bol;
            cc.find('Canvas/background/sun').active = this.bol;
        },0.5);
    },
});
