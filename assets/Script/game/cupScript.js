cc.Class({
    extends: cc.Component,
    properties: {
        cupNode: {
            type: cc.Node,
            default: null
        },
        cupPic : cc.Node,
        head : cc.Node,
        invincible : cc.Node,
        cupOne:{
            default:[],
            type: [cc.SpriteFrame],
        },
        cupTwo:{
            default:[],
            type: [cc.SpriteFrame],
        },
        cupThree:{
            default:[],
            type: [cc.SpriteFrame],
        },
        cupFour:{
            default:[],
            type: [cc.SpriteFrame],
        },
        cupFive:{
            default:[],
            type: [cc.SpriteFrame],
        },
        cupSix:{
            default:[],
            type: [cc.SpriteFrame],
        },
        penOne:{
            default:[],
            type: [cc.SpriteFrame],
        },
        penTwo:{
            default:[],
            type: [cc.SpriteFrame],
        },
        penThree:{
            default:[],
            type: [cc.SpriteFrame],
        },
        penFour:{
            default:[],
            type: [cc.SpriteFrame],
        },
        penFive:{
            default:[],
            type: [cc.SpriteFrame],
        },
        penSix:{
            default:[],
            type: [cc.SpriteFrame],
        },
        gangOne:{
            default:[],
            type: [cc.SpriteFrame],
        },
        gangTwo:{
            default:[],
            type: [cc.SpriteFrame],
        },
        gangThree:{
            default:[],
            type: [cc.SpriteFrame],
        },
        gangFour:{
            default:[],
            type: [cc.SpriteFrame],
        },
        gangFive:{
            default:[],
            type: [cc.SpriteFrame],
        },
        gangSix:{
            default:[],
            type: [cc.SpriteFrame],
        },
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
        //碰撞碎片
        otherGlassPic:{
            default:[],
            type: [cc.SpriteFrame],
        },
    },
    // 每个杯子的函数
    // 杯子编号
    setNum(num){
        this.num = num;
    },
    start(){
        this.tool = 0;
        this.bol = false;
        // 闪烁动画
        this.timer = setInterval(()=>{
            this.node.active = !this.node.active;
            if (this.bol) {
                clearInterval(this.timer);
            }
        },1500);
        // 抖动动画
        this.shakeAction = cc.repeatForever(
            cc.sequence(
                cc.rotateTo(0.05,-3),
                cc.rotateTo(0.05,0),
                cc.rotateTo(0.05,3),
                cc.rotateTo(0.05,-3),
                cc.rotateTo(0.05,0),
                cc.rotateTo(0.05,3),
                cc.rotateTo(0.05,-3),
                cc.rotateTo(0.05,0),
                cc.rotateTo(0.05,3),
                cc.rotateTo(0.05,0),
            )
        );
    },
    // 每次收到users都会调用     设置位置切换图片
    setCupPosition(i,obj){
        if (i == this.num) {
            //每次碰撞变成
            this.tool  = obj.tool;
            if (obj.ck == 1) {
                this.bol = true;
            }
            let cupList = [this.cupOne,this.cupTwo,this.cupThree,this.cupFour,this.cupFive,this.cupSix];
            let penList = [this.penOne,this.penTwo,this.penThree,this.penFour,this.penFive,this.penSix];
            let gangList = [this.gangOne,this.gangTwo,this.gangThree,this.gangFour,this.gangFive,this.gangSix];   
            // 设置位置
                // 利用动画的方式
                // this.node.stopAllActions();
                // this.node.runAction(cc.moveTo(0.04,obj.x,obj.y));
            this.node.setPosition(obj.x+896,obj.y);
            // 杯子类型 0 200 300
            var list = [];
            // 筛选出使用哪个数组
            switch (obj.tool) {
                case 0:
                    //颜色
                    list = cupList[obj.c-1];
                    this.head.setPosition(-38,-50);
                    this.invincible.setPosition(0,0);
                    this.node.getComponents(cc.BoxCollider)[0].offset = cc.v2(0,38);
                    this.node.getComponents(cc.BoxCollider)[0].size.width = 80;
                    this.node.getComponents(cc.BoxCollider)[1].offset = cc.v2(0,-2);
                    this.node.getComponents(cc.BoxCollider)[1].size.width = 80;
                    this.node.getComponents(cc.BoxCollider)[1].size.height = 75;
                    this.node.getComponents(cc.BoxCollider)[2].offset = cc.v2(0,-45);
                    this.node.getComponents(cc.BoxCollider)[2].size.width = 80;
                    if (obj.n == 3) {
                        cc.find('Canvas/bz/bz'+i+'/mid').getComponent('cupAddCoinScript').boomNone();
                    }
                    break;
                case "200":
                    list = gangList[obj.c-1];
                    this.head.setPosition(-30,-40);
                    this.invincible.setPosition(6,8);
                    this.node.getComponents(cc.BoxCollider)[0].offset = cc.v2(1,45);
                    this.node.getComponents(cc.BoxCollider)[0].size.width = 80;
                    this.node.getComponents(cc.BoxCollider)[1].offset = cc.v2(0,5);
                    this.node.getComponents(cc.BoxCollider)[1].size.width = 80;
                    this.node.getComponents(cc.BoxCollider)[1].size.height = 75;
                    this.node.getComponents(cc.BoxCollider)[2].offset = cc.v2(0,-38);
                    this.node.getComponents(cc.BoxCollider)[2].size.width = 80;
                    if (obj.n == 4) {
                        cc.find('Canvas/bz/bz'+i+'/mid').getComponent('cupAddCoinScript').boomNone();
                    }
                    break;
                case "300":
                    list = penList[obj.c-1];
                    this.head.setPosition(-50,-15);
                    this.invincible.setPosition(-4,20);
                    this.node.getComponents(cc.BoxCollider)[0].offset = cc.v2(0,32);
                    this.node.getComponents(cc.BoxCollider)[0].size.width = 130;
                    this.node.getComponents(cc.BoxCollider)[1].offset = cc.v2(0,8);
                    this.node.getComponents(cc.BoxCollider)[1].size.width = 130;
                    this.node.getComponents(cc.BoxCollider)[1].size.height = 40;
                    this.node.getComponents(cc.BoxCollider)[2].offset = cc.v2(0,-15);
                    this.node.getComponents(cc.BoxCollider)[2].size.width = 130;
                    if (obj.n == 3) {
                        cc.find('Canvas/bz/bz'+i+'/mid').getComponent('cupAddCoinScript').boomNone();
                    }
                    break;
                default:
                    break;
            }
            //由复活保护罩的显示 改为 抖动动画
            if (obj.t == 1){
                // this.invincible.active = true;
                this.node.runAction(this.shakeAction);
            } else {
                this.node.stopAllActions();
                // this.invincible.active = false;
            }
            this.cupPic.getComponent(cc.Sprite).spriteFrame = list[obj.n];
        }
    },
    // 监听碰撞
    onCollisionEnter:function(other,self){
        if (other.node.group == 'coin') {
            if (self.tag == 1) {
                this.getCoin(other,1);
            }else if(self.tag == 2){
                other.node.getComponent('coinScript').coinCrash("x");
            }else if(self.tag == 3){
                other.node.getComponent('coinScript').coinCrash("y");
            }
        }
        if (other.node.group == 'silver') {
            if (self.tag==1) {
                this.getCoin(other,5);
            }else if(self.tag == 2){
                other.node.getComponent('ybScript').coinCrash("x");
            }else if(self.tag == 3){
                other.node.getComponent('ybScript').coinCrash("y");
            }
        }
        if (other.node.group == 'yuanbao') {
            if (self.tag==1) {
                this.getCoin(other,10);
            }else if(self.tag == 2){
                other.node.getComponent('ybScript').coinCrash("x");
            }else if(self.tag == 3){
                other.node.getComponent('ybScript').coinCrash("y");
            }
        }
    },
    //碰撞后调用
    getCoin(obj,type){
        cc.audioEngine.play(this.getMoney,false,1);
        obj.node.parent.destroy();
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
            case 5:
                score = cc.find('resident').getComponent('residentScript').player5Score;
                break;
            case 6:
                score = cc.find('resident').getComponent('residentScript').player6Score;
                break;
        }
        // 接到金币的类型 (金币 银元宝 金元宝)
        switch(type){
            case 1:
                score.coin++;
                break;
            case 5:
                score.silver++;
                break;
            case 10:
                score.yb++;
                break;
        }
        score.once++;
        // 杯中金币数量
        if (score.once<5) {
            if (this.tool == 0) {
                cc.find('Canvas/bz/bz'+this.num+'/mid').getComponent('cupAddCoinScript').createCoin(type);
            }
        } else {
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
});