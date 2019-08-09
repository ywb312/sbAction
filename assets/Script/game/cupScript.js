cc.Class({
    extends: cc.Component,
    properties: {
        cupNode: {
            type: cc.Node,
            default: null
        },
        cupPic : cc.Node,
        headBoxType : cc.Node,
        cupState : cc.Node,
        stateList:{
            default:[],
            type: [cc.SpriteFrame],
        },
        combo2:cc.SpriteFrame,
        combo3:cc.SpriteFrame,
        combo4:cc.SpriteFrame,
        combo5:cc.SpriteFrame,
        getMoney : {
            default:null,
            type : cc.AudioClip,
        },
        touchMusic : {
            default:null,
            type : cc.AudioClip,
        },
        oneMusic : {
            default:null,
            type : cc.AudioClip,
        },
        twoMusic : {
            default:null,
            type : cc.AudioClip,
        },
        threeMusic : {
            default:null,
            type : cc.AudioClip,
        },
        pzTalk : {
            default:null,
            type : cc.AudioClip,
        },
        psTalk : {
            default:null,
            type : cc.AudioClip,
        },
        //新杯子
        tool1:{
            default:[],
            type: [cc.SpriteFrame],
        },
        //酒瓶
        tool2:{
            default:[],
            type: [cc.SpriteFrame],
        },
        //茅台
        tool3:{
            default:[],
            type: [cc.SpriteFrame],
        },
        //碗
        tool4:{
            default:[],
            type: [cc.SpriteFrame],
        },
        // 头像框
        headBox:{
            default:[],
            type: [cc.SpriteFrame],
        }
    },
    start(){
        this.tool = 0;
        this.bol = true;
        this.combo = 0;
        // 闪烁动画
        this.timer = setInterval(()=>{
            this.bol = !this.bol;
            if (this.bol) {
                this.node.opacity = 255; 
            }else{
                this.node.opacity = 0;
            }
        },300);
        // 抖动动画
        
        this.shakeAction = cc.repeatForever(cc.sequence(
            cc.rotateTo(0.05,-4),
            cc.rotateTo(0.05,0),
            cc.rotateTo(0.05,4),
            cc.rotateTo(0.05,-4),
            cc.rotateTo(0.05,0),
            cc.rotateTo(0.05,4),
            cc.rotateTo(0.05,-4),
            cc.rotateTo(0.05,0),
            cc.rotateTo(0.05,4),
            cc.rotateTo(0.05,0),
        ));
        this.comboTimer = null;
        this.coinTimer = null;
    },
    // 杯子编号
    setNum(num){
        this.num = num;
    },
    // 每次收到users都会调用     设置位置切换图片
    setCupPosition(i,obj){
        // 新加参数到resident里面添加
        if (i == this.num) {
            this.openid = obj.user.openid;
            let _self = this;
            //每次碰撞变成
            this.tool  = obj.tool;
            // 拖尾效果  监听是否有点击
            if (obj.ck == 1) {
                clearInterval(this.timer);
                // 最终显示
                this.node.opacity = 255; 
                cc.find('Canvas/bz/bz'+this.num+'/par').active = true;
            }else{
                cc.find('Canvas/bz/bz'+this.num+'/par').active = false;
            }
            // 设置位置
                // 利用动画的方式
                // this.node.stopAllActions();
                // this.node.runAction(cc.moveTo(0.04,obj.x,obj.y));
            this.node.setPosition(obj.x,obj.y);
            //  杯子类型 0 200 300
            var list = [];
            //  道具随机生成
            switch (obj.tool) {
                case "100":     //杯子  碰撞体位置
                    list = this.tool1;
                    this.node.getComponents(cc.BoxCollider)[0].offset = cc.v2(-8,20);
                    this.node.getComponents(cc.BoxCollider)[0].size.width = 60;
                    this.node.getComponents(cc.BoxCollider)[1].offset = cc.v2(-8,-16);
                    this.node.getComponents(cc.BoxCollider)[1].size.width = 55;
                    this.node.getComponents(cc.BoxCollider)[1].size.height = 65;
                    this.node.getComponents(cc.BoxCollider)[2].offset = cc.v2(-8,-55);
                    this.node.getComponents(cc.BoxCollider)[2].size.width = 55;
                    this.headBoxType.getComponent(cc.Sprite).spriteFrame = this.headBox[0];
                    // 碰碎效果
                    if (obj.n == 3) {
                        clearTimeout(_self.timerAction);
                        _self.node.runAction(_self.shakeAction);
                        cc.find('Canvas/bz/bz'+i+'/mid').getComponent('cupAddCoinScript').boomNone();
                        _self.timerAction = setTimeout(() => {
                            _self.node.stopAllActions();
                            _self.node.setRotation(0);
                        }, 2000);
                    }
                    break;
                case "200":     // 啤酒瓶   碰撞体位置
                    list = this.tool2;
                    this.node.getComponents(cc.BoxCollider)[0].offset = cc.v2(0,18);
                    this.node.getComponents(cc.BoxCollider)[0].size.width = 60;
                    this.node.getComponents(cc.BoxCollider)[1].offset = cc.v2(0,-25);
                    this.node.getComponents(cc.BoxCollider)[1].size.width = 50;
                    this.node.getComponents(cc.BoxCollider)[1].size.height = 60;
                    this.node.getComponents(cc.BoxCollider)[2].offset = cc.v2(0,-60);
                    this.node.getComponents(cc.BoxCollider)[2].size.width = 50;
                    this.headBoxType.getComponent(cc.Sprite).spriteFrame = this.headBox[1];
                    if (obj.n == 3) {
                        clearTimeout(_self.timerAction);
                        _self.node.runAction(_self.shakeAction);
                        cc.find('Canvas/bz/bz'+i+'/mid').getComponent('cupAddCoinScript').boomNone();
                        _self.timerAction = setTimeout(() => {
                            _self.node.stopAllActions();
                            _self.node.setRotation(0);
                        }, 2000);
                    }
                    break;
                case "300":     //茅台  碰撞体位置
                    list = this.tool3;
                    this.node.getComponents(cc.BoxCollider)[0].offset = cc.v2(-4,24);
                    this.node.getComponents(cc.BoxCollider)[0].size.width = 60;
                    this.node.getComponents(cc.BoxCollider)[1].offset = cc.v2(-5,-25);
                    this.node.getComponents(cc.BoxCollider)[1].size.width = 50;
                    this.node.getComponents(cc.BoxCollider)[1].size.height = 60;
                    this.node.getComponents(cc.BoxCollider)[2].offset = cc.v2(-5,60);
                    this.node.getComponents(cc.BoxCollider)[2].size.width = 50;
                    this.headBoxType.getComponent(cc.Sprite).spriteFrame = this.headBox[2];
                    if (obj.n == 3) {
                        clearTimeout(_self.timerAction);
                        _self.node.runAction(_self.shakeAction);
                        cc.find('Canvas/bz/bz'+i+'/mid').getComponent('cupAddCoinScript').boomNone();
                        _self.timerAction = setTimeout(() => {
                            _self.node.stopAllActions();
                            _self.node.setRotation(0);
                        }, 2000);
                    }
                    break;
                case "400":      // 碗  碰撞体位置
                    list = this.tool4;
                    this.node.getComponents(cc.BoxCollider)[0].offset = cc.v2(0,-15);
                    this.node.getComponents(cc.BoxCollider)[0].size.width = 90;
                    this.node.getComponents(cc.BoxCollider)[1].offset = cc.v2(0,-37);
                    this.node.getComponents(cc.BoxCollider)[1].size.width = 90;
                    this.node.getComponents(cc.BoxCollider)[1].size.height = 36;
                    this.node.getComponents(cc.BoxCollider)[2].offset = cc.v2(0,-60);
                    this.node.getComponents(cc.BoxCollider)[2].size.width = 50;
                    this.headBoxType.getComponent(cc.Sprite).spriteFrame = this.headBox[3];
                    if (obj.n == 3) {
                        clearTimeout(_self.timerAction);
                        _self.node.runAction(_self.shakeAction);
                        cc.find('Canvas/bz/bz'+i+'/mid').getComponent('cupAddCoinScript').boomNone();
                        _self.timerAction = setTimeout(() => {
                            _self.node.stopAllActions();
                            _self.node.setRotation(0);
                        }, 2000);
                    }
                    break;
            }
            // //由复活保护罩的显示 改为 抖动动画          无敌
            // if (obj.t == 1 || obj.d == 1){
            //     this.node.runAction(this.shakeAction);
            // } else {
            //     this.node.stopAllActions();
            // }
            // 杯子收到神兽的影响  0无效果   1火焰   2冰冻
            switch (obj.g) {
                case 0:
                    this.cupState.active = false;
                    break;
                case 1:
                    this.cupState.active = true;
                    this.cupState.y = 0;
                    this.cupState.getComponent(cc.Sprite).spriteFrame = this.stateList[0];
                    break;
                case 2:
                    this.cupState.active = true;
                    this.cupState.y = -10;
                    this.cupState.getComponent(cc.Sprite).spriteFrame = this.stateList[1];
                    break;
            }
            this.cupPic.getComponent(cc.Sprite).spriteFrame = list[obj.n];
        }
    },
    // 监听碰撞
    onCollisionEnter:function(other,self){
        if(self.tag==1){
            switch (other.node.group) {
                case 'coin':
                    this.getCoin(other,1);
                    break;
                case 'silver':
                    this.getCoin(other,5);
                    break;
                case 'yuanbao':
                    this.getCoin(other,10);
                    break;
            }
        }else if(self.tag == 2){
            if (other.node.group == 'coin') {
                other.node.getComponent('coinScript').coinCrash("x");
            }
            if (other.node.group == 'silver' || other.node.group == 'yuanbao') {
                other.node.getComponent('ybScript').coinCrash("x");
            }
        }else if(self.tag == 3){
            if (other.node.group == 'coin') {
                other.node.getComponent('coinScript').coinCrash("y");
            }
            if (other.node.group == 'silver' || other.node.group == 'yuanbao') {
                other.node.getComponent('ybScript').coinCrash("y");
            }
        }
    },
    //成功接到金币后调用    几连中 接到金币的数量
    getCoin(obj,type){
        // 播放音乐 销毁节点
        cc.audioEngine.play(this.getMoney,false,1);
        obj.node.parent.destroy();
        // 连续接金币效果展示
        this.combo++;
        switch (this.combo) {
            case 2:
                cc.find('Canvas/bz/bz'+this.num+'/text').getComponent(cc.Sprite).spriteFrame = this.combo2;
                cc.find('Canvas/bz/bz'+this.num+'/text').active = true;
                break;
            case 3:
                cc.find('Canvas/bz/bz'+this.num+'/text').getComponent(cc.Sprite).spriteFrame = this.combo3;
                break;
            case 4:
                cc.find('Canvas/bz/bz'+this.num+'/text').getComponent(cc.Sprite).spriteFrame = this.combo4;
                break;
            case 5:
                cc.find('Canvas/bz/bz'+this.num+'/text').getComponent(cc.Sprite).spriteFrame = this.combo5;
                break;
        }
        clearTimeout(this.comboTimer);
        this.comboTimer = setTimeout(()=>{
            this.combo = 0;
            cc.find('Canvas/bz/bz'+this.num+'/text').active = false;
        },2000);
        // +1效果展示
        clearTimeout(this.coinTimer);
        cc.find('Canvas/bz/bz'+this.num+'/addOne').active = true;
        this.coinTimer = setTimeout(()=>{
            cc.find('Canvas/bz/bz'+this.num+'/addOne').active = false;
        },500);
        // 检查元素
        cc.find('Canvas/control').getComponent('gameScript').checkPrefab();
        var score = {};
        //几号玩家
        switch (this.num) { 
            case 1:
                score = cc.find('resident').getComponent('residentScript').player1Score;
                break;
            case 2:
                score = cc.find('resident').getComponent('residentScript').player2Score;
                break;
            case 3:
                score = cc.find('resident').getComponent('residentScript').player3Score;
                break;
            case 4:
                score = cc.find('resident').getComponent('residentScript').player4Score;
                break;
        }
        // 接到金币的类型 (金币 银元宝 金元宝)
        switch(type){
            case 1:
                score.coin++;
                score.now += 1;
                break;
            case 5:
                score.silver++;
                score.now += 5;
                break;
            case 10:
                score.yb++;
                score.now += 10;
                break;
        }
        score.once++;
        //更新成绩
        cc.find('Canvas/bz/bz1/headBox').getComponent('scoreScript').change();
        // 通知手机端改变得分
        clearTimeout(this.throttle);
        this.throttle=setTimeout(()=>{
            cc.find('resident').emit('transpondScore',{score:score.now,openid:score.person.user.openid});
        },100);
        // 杯中金币数量
        if (score.once<5) { //不到5个
            // 不执行杯中金币
            // if (this.tool == 0) {
            //     cc.find('Canvas/bz/bz'+this.num+'/mid').getComponent('cupAddCoinScript').createCoin(type);
            // }
        } else {//到5个
            score.once=0;
            score.sum += score.coin + score.silver * 5 +score.yb * 10;
            cc.find('Canvas/bz/bz'+this.num+'/mid').getComponent('cupAddCoinScript').removeCoin(this.num,type);
        }
    },
    //碰撞产生碎片
    createGlass(){
        var glassPos = cc.v2(0,0);
        var glassNode = new cc.Node;
        this.cupNode.addChild(glassNode);
        glassNode.setPosition(glassPos);
        glassNode.addComponent(cc.Sprite);
        glassNode.getComponent(cc.Sprite).spriteFrame = this.otherGlassPic[Math.floor(Math.random()*this.otherGlassPic.length)];
        glassNode.width = 50;
        glassNode.height = 40;
        glassNode.runAction(cc.moveBy(0.5,cc.v2(0,-50)));
        this.scheduleOnce(function(){glassNode.destroy();},0.5);
    },
    onDestroy(){
        clearTimeout(this.coinTimer);
        clearTimeout(this.comboTimer);
        clearTimeout(this.timerAction);
    }
});