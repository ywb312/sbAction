cc.Class({
    extends: cc.Component,
    properties: {
        light:cc.Node,
    },
    // 控制下落 
    start () {
        this.setX = Math.random()*61-30;
        this.setY = Math.random()*10+15;
         // 加速度
        var ay = 1.8;
        // this.node.runAction(cc.sequence(cc.scaleTo(1.6,1.4),cc.scaleTo(1.6,0.8)));
        // 初次下落超过1070
        let allow = 0;
        this.schedule(function(){
            var pos = this.node.convertToWorldSpaceAR(cc.find('Canvas/shenshou').position);
            if (pos.y<1050) {
                allow = 1;
            }
            // 设定区域 x轴
            if (pos.x<=10) {
                this.setX = -this.setX;
                this.node.x-=this.setX/2;
            }else if (pos.x>=740) {
                this.setX = -this.setX;
                this.node.x-=this.setX/2;
            }
            // Y轴
            if (pos.y<=30) {
                this.setY = -this.setY;
                this.node.y-=this.setY/2;
            } else if (pos.y>=1280 && allow==1) {
                this.setY = -this.setY;
                this.node.y-=this.setY/2;
            }
            this.setY += ay;
            this.node.x-=this.setX;
            this.node.y-=this.setY;
            if (pos.y<-60 || pos.x <=-150 || pos.x>=900) {
                this.node.parent.destroy();
                cc.find('Canvas/control').getComponent('gameScript').checkPrefab();
            }
        },0.04);
    },
    // 碰撞到杯壁
    coinCrash(str){
        let _self = this;
        if (str == 'x') {
            this.setX = -this.setX;
        }else if (str == 'y') {
            this.setY = -this.setY;
        }
        this.node.x-=this.setX;
        this.node.y-=this.setY;
        // 金币发光
        this.light.active = true;
        clearTimeout(this.lightTimer);
        this.lightTimer = setTimeout(()=>{
            _self.light.active = false;
        },300);
    },
    onDestroy(){
        clearTimeout(this.lightTimer);
    }
});