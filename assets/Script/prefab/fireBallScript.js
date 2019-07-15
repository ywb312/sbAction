cc.Class({
    extends: cc.Component,
    properties: {
    },
    start () {
        // 随机生成
        this.setX = Math.random()*9;
        this.setY = Math.random()*9;
        // 设定火球的一定范围及运动轨迹(反弹) 07-12取消回弹
        this.schedule(function(){
            var pos = this.node.convertToWorldSpaceAR(cc.find('Canvas/background').position);
            // 设定区域 x轴
            // if (pos.x<=2700) {
                // this.setX = -this.setX;
                // this.node.x-=this.setX/2;
            // }else if (pos.x>=3420) {    //两个之间的差值860
                // this.setX = -this.setX;
                // this.node.x-=this.setX/2;
            // }
            // Y轴
            // if (pos.y<=30) {
                // this.setY = -this.setY;
                // this.node.y-=this.setY/2;
            // } else if (pos.y>=1080) {
                // this.setY = -this.setY;
                // this.node.y-=this.setY/2;
            // }
            if (pos.x<=2700 || pos.y<=30 || pos.y>=1080) {
                this.node.destroy();
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
            let data = {
                type : 2,
                openid : playerId
            }
            self.node.destroy();
            // 添加后续操作
            cc.find('resident').emit('upAnimals',data);
        }
    },
});
