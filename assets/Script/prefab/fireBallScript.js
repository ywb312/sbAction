cc.Class({
    extends: cc.Component,
    properties: {
    },
    start () {
        // 随机生成
        this.setX = Math.random()*99-49;
        this.setY = Math.random()*99-49;
        // 设定火球的一定范围及运动轨迹(反弹)
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
    // 监听碰撞
    onCollisionEnter:function(other,self){
        // 只有接收到金币才会显示
        if (other.node.group == 'bz') {
            let playerId = other.node.getComponent('cupScript').openid;
            self.node.destroy();
            // 添加后续操作
        }
    },
});
