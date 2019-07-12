cc.Class({
    extends: cc.Component,
    properties: {
    },
    start () {
        this.bol = true;
        //云层闪烁
        this.schedule(()=>{
            this.bol = !this.bol;
            if (this.bol) {
                cc.find('Canvas/background/sun/1').active = true;
                cc.find('Canvas/background/sun/2').active = false;
            } else {
                cc.find('Canvas/background/sun/1').active = false;
                cc.find('Canvas/background/sun/2').active = true;
            }
        },0.5);
    },
});
