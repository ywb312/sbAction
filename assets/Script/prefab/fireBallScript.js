cc.Class({
    extends: cc.Component,
    properties: {
        img:cc.Node,
        ball:{
            default:[],
            type: [cc.SpriteFrame],
        },
    },
    start(){
        let num = 0;
        this.timer = setInterval(()=>{
            this.img.getComponent(cc.Sprite).spriteFrame = this.ball[num];
            num++;
            if (num > 5) {
                clearInterval(this.timer);
            }
        },200);
    },
    move (setX,setY) {
        let bol = true;
        // 设定火球的一定范围及运动轨迹(反弹) 07-12取消回弹
        this.schedule(function(){
            var pos = this.node.convertToWorldSpaceAR(cc.find('Canvas/shenshou').position);//3352 1148  //3800 1148 
            if (pos.x>=1100 || pos.y<=-500) {
                clearInterval(this.timer);
                this.node.destroy();
            }
            if(pos.x<=10 && bol){
                setX = -setX;
                bol = false;
                this.node.setRotation(50);
            }
            this.node.x-=setX;
            this.node.y-=setY;
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
