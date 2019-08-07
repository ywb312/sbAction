cc.Class({
    extends: cc.Component,
    properties: {
        fireBall:cc.Prefab,
    },
    start () {
        this.rotateLT = cc.repeatForever(cc.sequence(cc.rotateTo(2,25),cc.rotateTo(2,-40)));
        this.rotateLB = cc.repeatForever(cc.sequence(cc.rotateTo(2,25),cc.rotateTo(2,-25)));
        this.rotateRT = cc.repeatForever(cc.sequence(cc.rotateTo(1.6,5),cc.rotateTo(1.6,40)));
        this.rotateRB = cc.repeatForever(cc.sequence(cc.rotateTo(2,-30),cc.rotateTo(2,35)));
        cc.find('Canvas/shenshou/leftTop').runAction(this.rotateLT);
        cc.find('Canvas/shenshou/leftBottom').runAction(this.rotateLB);
        cc.find('Canvas/shenshou/rightTop').runAction(this.rotateRT);
        cc.find('Canvas/shenshou/rightBottom').runAction(this.rotateRB);
    },
    // 控制火线出来
    showLine(){
        let _self = this;
        // 显示火线
        let data = {
            type:1,
            duration:2,
        }
        var targetNode = cc.find('Canvas/shenshou/xy');
        // 火线的展示方式
        switch (Math.floor(Math.random()*3)) {
            case 0:
                onceShow('Canvas/shenshou/leftTop/fireLine/lineTop',1);
                setTimeout(()=>{
                    onceShow('Canvas/shenshou/rightBottom/fireLine/lineBottom',2);
                },2000);
                break;
            case 1:
                onceShow('Canvas/shenshou/rightBottom/fireLine/lineBottom',2);
                setTimeout(()=>{
                    onceShow('Canvas/shenshou/leftTop/fireLine/lineTop',1);
                },2000);
                break;
            case 2:
                onceShow('Canvas/shenshou/leftTop/fireLine/lineTop',1);
                onceShow('Canvas/shenshou/rightBottom/fireLine/lineBottom',2);
                break;
        }
        //获取火线的区域
        function posFloor(data){
            return {
                x:Math.floor(data.x),
                y:Math.floor(data.y),
            }
        }
        //单个显示
        function onceShow(str,p){
            if (str == 'Canvas/shenshou/leftTop/fireLine/lineTop') {
                cc.find('Canvas/shenshou/leftTop').stopAction(_self.rotateLT);
            } else {
                cc.find('Canvas/shenshou/rightBottom').stopAction(_self.rotateRB);
            }
            cc.find(str).active = true;
            let timer = setInterval(()=>{
                cc.find(str).height += 40;
                if (cc.find(str).height>=645) {
                    cc.find(str).height = 645;
                    clearInterval(timer);
                }
            },40);
            var worldPoint1 = cc.find(str+'/coordinate1').convertToWorldSpaceAR(targetNode);
            var worldPoint2 = cc.find(str+'/coordinate2').convertToWorldSpaceAR(targetNode);
            var worldPoint3 = cc.find(str+'/coordinate3').convertToWorldSpaceAR(targetNode);
            var worldPoint4 = cc.find(str+'/coordinate4').convertToWorldSpaceAR(targetNode);
            var worldPoint5 = cc.find(str+'/center').convertToWorldSpaceAR(targetNode);
            data.a = posFloor(targetNode.convertToNodeSpaceAR(worldPoint1));
            data.b  = posFloor(targetNode.convertToNodeSpaceAR(worldPoint2));
            data.c  = posFloor(targetNode.convertToNodeSpaceAR(worldPoint3));
            data.d  = posFloor(targetNode.convertToNodeSpaceAR(worldPoint4));
            data.center  = posFloor(targetNode.convertToNodeSpaceAR(worldPoint5));
            data.w = cc.find(str).width;
            data.h = cc.find(str).height;
            data.p = p;
            cc.find('resident').emit('upAnimals',data);
        }
    },
    // 控制火球出来
    showBall(){
        var targetNode = cc.find('Canvas/shenshou/rightTop/ball');
        var x = 21;
        var y = 14;
        cc.find('Canvas/shenshou/rightTop').stopAction(this.rotateRT);
        // 创建3个火球
        for (let i = 0; i < 3 ; i++) {
            let newPrefab = cc.instantiate(this.fireBall);
            targetNode.addChild(newPrefab);
            let a = {
                x : 280,
                y : 428
            }
            newPrefab.getComponent('fireBallScript').move(x,y);
            newPrefab.position = a;
            // 调整开口角度(三个火球之间的角度)
            x -= 8;
            y += 8;
        }
        setTimeout(()=>{
            cc.find('Canvas/shenshou/rightTop').runAction(this.rotateRT);
        },2800);
    },
    // 控制冰区出来
    showPlane(){
        var targetNode = cc.find('Canvas/shenshou/xy');
        cc.find('Canvas/shenshou/leftBottom/plane').active = true;
        let data = {
            type:3,
            duration:2,
        }
        cc.find('Canvas/shenshou/leftBottom').stopAction(this.rotateLB);
        var worldPoint1 = cc.find('Canvas/shenshou/leftBottom/plane/coordinate1').convertToWorldSpaceAR(targetNode);
        var worldPoint2 = cc.find('Canvas/shenshou/leftBottom/plane/coordinate2').convertToWorldSpaceAR(targetNode);
        var worldPoint3 = cc.find('Canvas/shenshou/leftBottom/plane/coordinate3').convertToWorldSpaceAR(targetNode);
        data.a = posFloor(targetNode.convertToNodeSpaceAR(worldPoint1));
        data.b  = posFloor(targetNode.convertToNodeSpaceAR(worldPoint2));
        data.c  = posFloor(targetNode.convertToNodeSpaceAR(worldPoint3));
        cc.find('resident').emit('upAnimals',data);
        //取整
        function posFloor(data){
            return {
                x:Math.floor(data.x),
                y:Math.floor(data.y),
            }
        }
        setTimeout(()=>{
            cc.find('Canvas/shenshou/leftBottom/plane/img2').active = true;
            setTimeout(()=>{
                cc.find('Canvas/shenshou/leftBottom/plane/img3').active = true;
            },500);
        },500);
    },
    // 后台控制火线的关闭
    hideLine(p){
        if (p == 1) {
            cc.find('Canvas/shenshou/leftTop').stopAllActions();
            cc.find('Canvas/shenshou/leftTop').runAction(this.rotateLT);
            cc.find('Canvas/shenshou/leftTop/fireLine/lineTop').active = false;
            cc.find('Canvas/shenshou/leftTop/fireLine/lineTop').height = 120;
        }else if(p == 2){
            cc.find('Canvas/shenshou/rightBottom').stopAllActions();
            cc.find('Canvas/shenshou/rightBottom').runAction(this.rotateRB);
            cc.find('Canvas/shenshou/rightBottom/fireLine/lineBottom').active = false;
            cc.find('Canvas/shenshou/rightBottom/fireLine/lineBottom').height = 120;
        }
    },
    // 后台控制冰区关闭
    hidePlane(){
        cc.find('Canvas/shenshou/leftBottom').stopAllActions();
        cc.find('Canvas/shenshou/leftBottom').runAction(this.rotateLB);
        cc.find('Canvas/shenshou/leftBottom/plane/img2').active = false;
        cc.find('Canvas/shenshou/leftBottom/plane/img3').active = false;
        cc.find('Canvas/shenshou/leftBottom/plane').active = false;
    }
});
