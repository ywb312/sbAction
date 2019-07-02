cc.Class({
    extends: cc.Component,
    properties: {
    },
    // 控制下落
    start () {
        // 初始速度
        this.setX = Math.random()*61-30;
        this.setY = Math.random()*10+4;
        // 加速度
        var ay = 1.2;
        // this.node.runAction(cc.sequence(cc.scaleTo(1.2,1.6),cc.scaleTo(1.2,0.8)));
        // 初次下落超过1070
        let allow = 0;
        this.schedule(function(){
            var pos = this.node.convertToWorldSpaceAR(cc.find('Canvas/background').position);
            // 进入区域
            if (pos.y<1050) {
                allow = 1;
            }
            // 设定区域 x轴
            if (pos.x<=2700) {
                this.setX = -this.setX;
                this.node.x-=this.setX/2;
            }else if (pos.x>=3420) {
                this.setX = -this.setX;
                this.node.x-=this.setX/2;
            }
            // Y轴
            if (pos.y<=30) {
                this.setY = -this.setY;
                this.node.y-=this.setY/2;
            } else if (pos.y>=1080 && allow==1) {
                this.setY = -this.setY;
                this.node.y-=this.setY/2;
            }
            this.setY += ay;
            this.node.x-=this.setX;
            this.node.y-=this.setY;
            if (pos.y<-60 || pos.x <=2600 || pos.x>=3510) {
                this.node.parent.destroy();
                cc.find('Canvas/control').getComponent('gameScript').checkPrefab();
            }
        },0.04);
    },
    // 碰撞到杯壁
    coinCrash(str){
        if (str == 'x') {
            this.setX = -this.setX;
        }else if (str == 'y') {
            this.setY = -this.setY;
        }
        this.node.x-=this.setX;
        this.node.y-=this.setY;
        this.node.getParent().getChildByName('light').active = true;
        clearTimeout(this.light);
        this.light = setTimeout(()=>{
            this.node.getParent().getChildByName('light').active = false;
        },100);
    }
});
