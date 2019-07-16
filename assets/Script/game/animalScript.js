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
                onceShow('Canvas/shenshou/fireLine/lineTop',2);
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
        function onceShow(str,a=0){
            cc.find(str).active = true;
            var worldPoint1 = cc.find(str+'/coordinate1').convertToWorldSpaceAR(targetNode);
            var worldPoint2 = cc.find(str+'/coordinate2').convertToWorldSpaceAR(targetNode);
            var worldPoint3 = cc.find(str+'/coordinate3').convertToWorldSpaceAR(targetNode);
            var worldPoint4 = cc.find(str+'/coordinate4').convertToWorldSpaceAR(targetNode);
            data.a = posFloor(cc.find('Canvas/shenshou/fireLine').convertToNodeSpaceAR(worldPoint1));
            data.b  = posFloor(cc.find('Canvas/shenshou/fireLine').convertToNodeSpaceAR(worldPoint2));
            data.c  = posFloor(cc.find('Canvas/shenshou/fireLine').convertToNodeSpaceAR(worldPoint3));
            data.d  = posFloor(cc.find('Canvas/shenshou/fireLine').convertToNodeSpaceAR(worldPoint4));
            if(a == 2){
                cc.find('Canvas/shenshou/fireLine/lineBottom').active = true;
                var worldPoint5 = cc.find('Canvas/shenshou/fireLine/lineBottom/coordinate1').convertToWorldSpaceAR(targetNode);
                var worldPoint6 = cc.find('Canvas/shenshou/fireLine/lineBottom/coordinate2').convertToWorldSpaceAR(targetNode);
                var worldPoint7 = cc.find('Canvas/shenshou/fireLine/lineBottom/coordinate3').convertToWorldSpaceAR(targetNode);
                var worldPoint8 = cc.find('Canvas/shenshou/fireLine/lineBottom/coordinate4').convertToWorldSpaceAR(targetNode);
                data.e = posFloor(cc.find('Canvas/shenshou/fireLine').convertToNodeSpaceAR(worldPoint5));
                data.f  = posFloor(cc.find('Canvas/shenshou/fireLine').convertToNodeSpaceAR(worldPoint6));
                data.g  = posFloor(cc.find('Canvas/shenshou/fireLine').convertToNodeSpaceAR(worldPoint7));
                data.h  = posFloor(cc.find('Canvas/shenshou/fireLine').convertToNodeSpaceAR(worldPoint8));
            }
            cc.find('resident').emit('upAnimals',data);
            setTimeout(()=>{
                cc.find(str).active = false;
                if (a==2) {
                    cc.find('Canvas/shenshou/fireLine/lineBottom').active = false;
                }
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
