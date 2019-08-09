cc.Class({
    extends: cc.Component,
    properties: {
    },
    start () {
        cc.find("Canvas/yunLow/man").runAction(cc.repeatForever(cc.sequence(
            [
                cc.spawn(cc.moveTo(1.5,cc.p(235,606)),cc.scaleTo(1.5,1.5)),
                cc.spawn(cc.moveTo(1.5,cc.p(0,606)),cc.scaleTo(1.5,1.1)),
                cc.spawn(cc.moveTo(1.5,cc.p(-235,606)),cc.scaleTo(1.5,1.5)),
                cc.spawn(cc.moveTo(1.5,cc.p(0,606)),cc.scaleTo(1.5,1.1))
            ]
        )));
    },
    run(){
        cc.find("Canvas/yunLow/man/man1").active=false;
        cc.find("Canvas/yunLow/man/man2").active=true;
        // this.scheduleOnce(()=>{
        //     cc.find("Canvas/yunLow/man/man2").active=false;
        //     cc.find("Canvas/yunLow/man/man3").active=true;
        // },0.15);
        // this.scheduleOnce(()=>{
        //     cc.find("Canvas/yunLow/man/man3").active=false;
        //     cc.find("Canvas/yunLow/man/man4").active=true;
        // },0.3);
        this.scheduleOnce(()=>{
            this.stop();
        },1);
    },
    stop(){
        cc.find("Canvas/yunLow/man/man1").active=true;
        cc.find("Canvas/yunLow/man/man2").active=false;
        cc.find("Canvas/yunLow/man/man3").active=false;
        cc.find("Canvas/yunLow/man/man4").active=false;
    },
 });
