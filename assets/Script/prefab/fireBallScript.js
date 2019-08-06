cc.Class({
    extends: cc.Component,
    properties: {
    },
    move (setX,setY) {
        // 设定火球的一定范围及运动轨迹(反弹) 07-12取消回弹
        this.schedule(function(){
            var pos = this.node.convertToWorldSpaceAR(cc.find('Canvas/shenshou').position);//3352 1148  //3800 1148 
            // if (pos.x>=4200 || pos.y<=0) {
            //     this.node.destroy();
            // }
            if(pos.x<=2900){
                setX=-setX;
            }
            pos.x-=setX;
            pos.y-=setY;
            console.log(pos);
            var final = this.node.parent.convertToNodeSpaceAR(pos);
            console.log(final)
            this.node.setPosition(final);
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
            cc.find('Canvas/background').runAction(cc.sequence(
                cc.scaleTo(0.08,1.1),
                cc.scaleTo(0.05,1.05),cc.scaleTo(0.05,1.1),
                cc.scaleTo(0.05,1.05),cc.scaleTo(0.05,1.1),
                cc.scaleTo(0.05,1.05),cc.scaleTo(0.05,1.1),
                cc.scaleTo(0.05,1.05),cc.scaleTo(0.05,1.1),
                cc.scaleTo(0.05,1.05),cc.scaleTo(0.05,1.1),
                cc.scaleTo(0.05,1.05),cc.scaleTo(0.05,1.1),
                cc.scaleTo(0.08,1)
            ));
            // 添加后续操作
            cc.find('resident').emit('upAnimals',data);
        }
    },
});
