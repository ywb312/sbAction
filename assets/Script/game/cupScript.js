cc.Class({
    extends: cc.Component,
    properties: {
        cupNode: {
            type: cc.Node,
            default: null
        },
        cupPic : cc.Node,
        head : cc.Node,
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
        this.comboTimer = null;
        this.coinTimer = null;
    },
    // 杯子编号
    setNum(num){
        this.num = num;
    },
    // 每次收到users都会调用     设置位置切换图片
    setCupPosition(i,obj){
        if (i == this.num) {
            this.openid = obj.user.openid;
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
            this.node.setPosition(obj.x+896,obj.y);
            //  杯子类型 0 200 300
            var list = [];
            //  筛选出使用哪个数组 
            //  道具随机生成
            switch (obj.tool) {
                case 0:     //杯子  碰撞体位置
                    list = this.tool1;
                    this.head.setPosition(-38,-50);
                    this.node.getComponents(cc.BoxCollider)[0].offset = cc.v2(-8,20);
                    this.node.getComponents(cc.BoxCollider)[0].size.width = 50;
                    this.node.getComponents(cc.BoxCollider)[1].offset = cc.v2(-8,-16);
                    this.node.getComponents(cc.BoxCollider)[1].size.width = 55;
                    this.node.getComponents(cc.BoxCollider)[1].size.height = 65;
                    this.node.getComponents(cc.BoxCollider)[2].offset = cc.v2(-8,-55);
                    this.node.getComponents(cc.BoxCollider)[2].size.width = 55;
                    if (obj.n == 3) {
                        cc.find('Canvas/bz/bz'+i+'/mid').getComponent('cupAddCoinScript').boomNone();
                    }
                    break;
                case "200":     // 啤酒瓶   碰撞体位置
                    list = this.tool2;
                    this.head.setPosition(-30,-40);
                    this.node.getComponents(cc.BoxCollider)[0].offset = cc.v2(0,14);
                    this.node.getComponents(cc.BoxCollider)[0].size.width = 50;
                    this.node.getComponents(cc.BoxCollider)[1].offset = cc.v2(0,-25);
                    this.node.getComponents(cc.BoxCollider)[1].size.width = 50;
                    this.node.getComponents(cc.BoxCollider)[1].size.height = 60;
                    this.node.getComponents(cc.BoxCollider)[2].offset = cc.v2(0,-60);
                    this.node.getComponents(cc.BoxCollider)[2].size.width = 50;
                    if (obj.n == 3) {
                        cc.find('Canvas/bz/bz'+i+'/mid').getComponent('cupAddCoinScript').boomNone();
                    }
                    break;
                case "300":     //茅台  碰撞体位置
                    list = this.tool3;
                    this.head.setPosition(-50,-15);
                    this.node.getComponents(cc.BoxCollider)[0].offset = cc.v2(-5,20);
                    this.node.getComponents(cc.BoxCollider)[0].size.width = 44;
                    this.node.getComponents(cc.BoxCollider)[1].offset = cc.v2(-5,-25);
                    this.node.getComponents(cc.BoxCollider)[1].size.width = 44;
                    this.node.getComponents(cc.BoxCollider)[1].size.height = 60;
                    this.node.getComponents(cc.BoxCollider)[2].offset = cc.v2(-5,60);
                    this.node.getComponents(cc.BoxCollider)[2].size.width = 44;
                    if (obj.n == 3) {
                        cc.find('Canvas/bz/bz'+i+'/mid').getComponent('cupAddCoinScript').boomNone();
                    }
                    break;
                // case "":      // 碗  碰撞体位置
                //     list = tool4;
                //     this.head.setPosition(-50,-15);
                //     this.node.getComponents(cc.BoxCollider)[0].offset = cc.v2(0,-15);
                //     this.node.getComponents(cc.BoxCollider)[0].size.width = 90;
                //     this.node.getComponents(cc.BoxCollider)[1].offset = cc.v2(0,-37);
                //     this.node.getComponents(cc.BoxCollider)[1].size.width = 90;
                //     this.node.getComponents(cc.BoxCollider)[1].size.height = 36;
                //     this.node.getComponents(cc.BoxCollider)[2].offset = cc.v2(0,-60);
                //     this.node.getComponents(cc.BoxCollider)[2].size.width = 50;
                //     if (obj.n == 3) {
                //         cc.find('Canvas/bz/bz'+i+'/mid').getComponent('cupAddCoinScript').boomNone();
                //     }
                //     break;
                default:
                    break;
            }
            //由复活保护罩的显示 改为 抖动动画          无敌
            if (obj.t == 1 || obj.d == 1){
                console.log('抖动');
                console.log('d'+obj.d);
                this.node.runAction(this.shakeAction);
            } else {
                this.node.stopAllActions();
            }
            this.cupPic.getComponent(cc.Sprite).spriteFrame = list[obj.n];
        }
    },
    // 监听碰撞
    onCollisionEnter:function(other,self){
        // 只有接收到金币才会显示
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
    }
});