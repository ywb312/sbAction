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
        cc.find('Canvas/shenshou/fireLine').active = true;
        let data = {
            type:1,
            time:2,
        }
        var targetNode = cc.find('Canvas/shenshou/fireLine');
        //获取火线的区域
        var worldPoint1 = cc.find('Canvas/shenshou/fireLine/line/coordinate1').convertToWorldSpaceAR(targetNode);
        var worldPoint2 = cc.find('Canvas/shenshou/fireLine/line/coordinate2').convertToWorldSpaceAR(targetNode);
        var worldPoint3 = cc.find('Canvas/shenshou/fireLine/line/coordinate3').convertToWorldSpaceAR(targetNode);
        var worldPoint4 = cc.find('Canvas/shenshou/fireLine/line/coordinate4').convertToWorldSpaceAR(targetNode);
        data.a = posFloor(cc.find('Canvas/shenshou/fireLine').convertToNodeSpaceAR(worldPoint1));
        data.b  = posFloor(cc.find('Canvas/shenshou/fireLine').convertToNodeSpaceAR(worldPoint2));
        data.c  = posFloor(cc.find('Canvas/shenshou/fireLine').convertToNodeSpaceAR(worldPoint3));
        data.d  = posFloor(cc.find('Canvas/shenshou/fireLine').convertToNodeSpaceAR(worldPoint4));
        function posFloor(data){
            return {
                x:Math.floor(data.x),
                y:Math.floor(data.y),
            }
        }
        cc.find('resident').emit('upAnimals',data);
        // 定时消失
        setTimeout(()=>{
            cc.find('Canvas/shenshou/fireLine').active = false;
        },2000);
    },
    // 控制火球出来
    showBall(){
        let data = {
            type:2,
        }
        var targetNode = cc.find('Canvas/shenshou/ball');
        // 创建3个火球
        for (let i = 0; i < 3 ; i++) {
            let newPrefab = cc.instantiate(this.fireBall);
            targetNode.addChild(newPrefab);
            let a = {
                x : 0,
                y : 0
            }
            newPrefab.position = a;
        }
        cc.find('resident').emit('upAnimals',data);
    },
    // 控制冰区出来
});
