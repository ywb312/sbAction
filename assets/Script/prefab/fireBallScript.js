cc.Class({
    extends: cc.Component,
    properties: {
    },
    start () {
        // 随机生成
        this.setX = Math.random()*61-30;
        this.setY = Math.random()*41-20;
        // 设定火球的一定范围
        this.schedule(function(){
            var pos = this.node.convertToWorldSpaceAR(cc.find('Canvas/background').position);
            // 设定区域 x轴
            if (pos.x<=2700) {
                this.setX = -this.setX;
                this.node.x-=this.setX/2;
            }else if (pos.x>=3420) {    //两个之间的差值860
                this.setX = -this.setX;
                this.node.x-=this.setX/2;
            }
            // Y轴
            if (pos.y<=30) {
                this.setY = -this.setY;
                this.node.y-=this.setY/2;
            } else if (pos.y>=1080) {
                this.setY = -this.setY;
                this.node.y-=this.setY/2;
            }
            this.node.x-=this.setX;
            this.node.y-=this.setY;
        },0.04);
    },
});
