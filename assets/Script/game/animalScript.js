cc.Class({
    extends: cc.Component,
    properties: {
        fireBall:cc.Prefab,
    },
    start () {
    },
    // 控制火线出来
    showLine(){
        // 显示火线
        let data = {
            type:1,
            duration:2,
        }
        var targetNode = cc.find('Canvas/shenshou/fireLine');
        switch (Math.floor(Math.random()*3)) {
            case 0:
                onceShow('Canvas/shenshou/fireLine/lineTop');
                setTimeout(()=>{
                    onceShow('Canvas/shenshou/fireLine/lineBottom');
                },2000);
                break;
            case 1:
                onceShow('Canvas/shenshou/fireLine/lineBottom');
                setTimeout(()=>{
                    onceShow('Canvas/shenshou/fireLine/lineTop');
                },2000);
                break;
            case 2:
                onceShow('Canvas/shenshou/fireLine/lineTop');
                onceShow('Canvas/shenshou/fireLine/lineBottom');
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
        function onceShow(str){
            cc.find(str).active = true;
            cc.find(str).runAction(cc.scaleTo(0.16,1,1.2));
            var worldPoint1 = cc.find(str+'/coordinate1').convertToWorldSpaceAR(targetNode);
            var worldPoint2 = cc.find(str+'/coordinate2').convertToWorldSpaceAR(targetNode);
            var worldPoint3 = cc.find(str+'/coordinate3').convertToWorldSpaceAR(targetNode);
            var worldPoint4 = cc.find(str+'/coordinate4').convertToWorldSpaceAR(targetNode);
            var worldPoint5 = cc.find(str+'/center').convertToWorldSpaceAR(targetNode);
            data.a = posFloor(cc.find('Canvas/shenshou/fireLine').convertToNodeSpaceAR(worldPoint1));
            data.b  = posFloor(cc.find('Canvas/shenshou/fireLine').convertToNodeSpaceAR(worldPoint2));
            data.c  = posFloor(cc.find('Canvas/shenshou/fireLine').convertToNodeSpaceAR(worldPoint3));
            data.d  = posFloor(cc.find('Canvas/shenshou/fireLine').convertToNodeSpaceAR(worldPoint4));
            data.center  = posFloor(cc.find('Canvas/shenshou/fireLine').convertToNodeSpaceAR(worldPoint5));
            data.w = cc.find(str).width;
            data.h = cc.find(str).height;
            let timer = setInterval(()=>{
                cc.find('resident').emit('upAnimals',data);
            },50);
            setTimeout(()=>{
                cc.find(str).scaleY = 0.2;
                cc.find(str).active = false;
                clearInterval(timer);
            },2000);
        }
    },
    // 控制火球出来
    showBall(){
        var targetNode = cc.find('Canvas/shenshou/ball');
        var x = 28;
        var y = 16;
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
            x -= 8;
            y += 8;
        }
    },
    // 控制冰区出来
    showPlane(){
        let data = {
            type:3,
            duration:2,
        }
        var targetNode = cc.find('Canvas/shenshou/plane');
        cc.find('resident').emit('upAnimals',data);
    },
});
