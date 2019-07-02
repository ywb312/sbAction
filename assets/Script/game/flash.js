cc.Class({
    extends: cc.Component,
    properties: {
    },
    start () {
    },
    onEnable(){
        this.node.runAction(cc.sequence(
            cc.fadeIn(0.1),cc.fadeOut(0.1),cc.fadeIn(0.1),cc.fadeOut(0.1)
        ))
        this.scheduleOnce(function(){
            this.node.active = false;
        },0.4);
    },
});
