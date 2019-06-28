cc.Class({
    extends: cc.Component,
    properties: {
        node1:cc.Node,
        node2:cc.Node,
        speed:0,
    },
    start () {
        this.node2.x = this.node1.x+this.node1.width/2+this.node2.width/2;
        this.schedule(function(){
            this.node1.x-=this.speed;
            this.node2.x-=this.speed;
            if (this.speed>0) {
                if (this.node1.x<=-this.node1.width) {
                    this.node1.x=this.node2.x+this.node2.width/2+this.node1.width/2;
                }
                if (this.node2.x<=-this.node2.width) {
                    this.node2.x=this.node1.x+this.node1.width/2+this.node2.width/2;
                }
            }
            if (this.speed<0) {
                if (this.node1.x>=this.node1.width) {
                    this.node1.x=this.node2.x-this.node2.width/2-this.node1.width/2;
                }
                if (this.node2.x>=this.node2.width) {
                    this.node2.x=this.node1.x-this.node1.width/2-this.node2.width/2;
                }
            }
        },0.05);
    },
    // update (dt) {},
});
