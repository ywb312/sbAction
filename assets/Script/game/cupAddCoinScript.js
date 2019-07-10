cc.Class({
    extends: cc.Component,
    properties: {
        coin: cc.Prefab,
        yuanbao: cc.Prefab,
        silver: cc.Prefab,
        person: 0,
        pNode: {
            type: cc.Node,
            default: null
        },
        coinPic: cc.SpriteFrame,
        silPic: cc.SpriteFrame,
        ybPic: cc.SpriteFrame,
    },
    start() {
        this.setY = 0;
        this.count = 0;
    },
    //创建杯中金币
    createCoin(type) {
        var coin = new cc.Node;
        coin.addComponent(cc.Sprite);
        switch (type) {
            case 1:
                coin.getComponent(cc.Sprite).spriteFrame = this.coinPic;
                coin.width = 28;
                coin.height = 28;
                break;
            case 5:
                coin.getComponent(cc.Sprite).spriteFrame = this.silPic;
                coin.width = 34;
                coin.height = 28;
                break;
            case 10:
                coin.getComponent(cc.Sprite).spriteFrame = this.ybPic;
                coin.width = 50;
                coin.height = 40;
                break;
            default:
                break;
        }
        this.pNode.addChild(coin);
        this.setY += 8;
        coin.setPosition(Math.floor(Math.random() * 19) - 9, this.setY - 10);
    },
    // 杯子碰碎执行
    boomNone() {
        this.count = 0;
        this.node.parent.scale = 1;
        // 获取货币数量
        switch (this.person) {
            case 1:
                this.fallMoney(cc.find('resident').getComponent('residentScript').player1Score.coin, this.coin);
                this.fallMoney(cc.find('resident').getComponent('residentScript').player1Score.silver, this.silver);
                this.fallMoney(cc.find('resident').getComponent('residentScript').player1Score.yb, this.yuanbao);
                this.clearPlayerMoney(cc.find('resident').getComponent('residentScript').player1Score);
                break;
            case 2:
                this.fallMoney(cc.find('resident').getComponent('residentScript').player2Score.coin, this.coin);
                this.fallMoney(cc.find('resident').getComponent('residentScript').player2Score.silver, this.silver);
                this.fallMoney(cc.find('resident').getComponent('residentScript').player2Score.yb, this.yuanbao);
                this.clearPlayerMoney(cc.find('resident').getComponent('residentScript').player2Score);
                break;
            case 3:
                this.fallMoney(cc.find('resident').getComponent('residentScript').player3Score.coin, this.coin);
                this.fallMoney(cc.find('resident').getComponent('residentScript').player3Score.silver, this.silver);
                this.fallMoney(cc.find('resident').getComponent('residentScript').player3Score.yb, this.yuanbao);
                this.clearPlayerMoney(cc.find('resident').getComponent('residentScript').player3Score);
                break;
            case 4:
                this.fallMoney(cc.find('resident').getComponent('residentScript').player4Score.coin, this.coin);
                this.fallMoney(cc.find('resident').getComponent('residentScript').player4Score.silver, this.silver);
                this.fallMoney(cc.find('resident').getComponent('residentScript').player4Score.yb, this.yuanbao);
                this.clearPlayerMoney(cc.find('resident').getComponent('residentScript').player4Score);
                break;
            case 5:
                this.fallMoney(cc.find('resident').getComponent('residentScript').player5Score.coin, this.coin);
                this.fallMoney(cc.find('resident').getComponent('residentScript').player5Score.silver, this.silver);
                this.fallMoney(cc.find('resident').getComponent('residentScript').player5Score.yb, this.yuanbao);
                this.clearPlayerMoney(cc.find('resident').getComponent('residentScript').player5Score);
                break;
            case 6:
                this.fallMoney(cc.find('resident').getComponent('residentScript').player6Score.coin, this.coin);
                this.fallMoney(cc.find('resident').getComponent('residentScript').player6Score.silver, this.silver);
                this.fallMoney(cc.find('resident').getComponent('residentScript').player6Score.yb, this.yuanbao);
                this.clearPlayerMoney(cc.find('resident').getComponent('residentScript').player6Score);
                break;
        }
    },
    // 金币下落
    fallMoney(num, who) {
        for (let i = 0; i < num; i++) {
            let newPrefab = cc.instantiate(who);
            this.node.addChild(newPrefab);
            let a = {
                x: Math.random() * 141 - 70,
                y: 0
            }
            newPrefab.position = a;
            // 获取杯子位置
            cc.find("Canvas/fall").position = this.node.parent.position;
            newPrefab.setParent(cc.find("Canvas/fall"))
        }
    },
    // 清空杯中成绩
    clearPlayerMoney(obj) {
        obj.coin = 0;
        obj.silver = 0;
        obj.yb = 0;
    },
    // 清空金币
    removeCoin(num, type) {
        this.count++;
        this.setY = 0;
        this.pNode.destroyAllChildren();
        this.schedule(() => {
            this.moveHead(num, type);
        }, 0.1, 4);
        // 上报此次得分
        let obj = {};
        switch (num) {
            case 1:
                var a = cc.find('resident').getComponent('residentScript').player1Score;
                obj.id = cc.find('resident').getComponent('residentScript').player1.user.openid;
                obj.score = a.coin + a.silver*5 + a.yb*10;
                this.clearPlayerMoney(cc.find('resident').getComponent('residentScript').player1Score);
                break;
            case 2:
                var a = cc.find('resident').getComponent('residentScript').player2Score;
                obj.id = cc.find('resident').getComponent('residentScript').player2.user.openid;
                obj.score = a.coin + a.silver*5 + a.yb*10;
                this.clearPlayerMoney(cc.find('resident').getComponent('residentScript').player2Score);
                break;
            case 3:
                var a = cc.find('resident').getComponent('residentScript').player3Score;
                obj.id = cc.find('resident').getComponent('residentScript').player3.user.openid;
                obj.score = a.coin + a.silver*5 + a.yb*10;
                this.clearPlayerMoney(cc.find('resident').getComponent('residentScript').player3Score);
                break;
            case 4:
                var a = cc.find('resident').getComponent('residentScript').player4Score;
                obj.id = cc.find('resident').getComponent('residentScript').player4.user.openid;
                obj.score = a.coin + a.silver*5 + a.yb*10;
                this.clearPlayerMoney(cc.find('resident').getComponent('residentScript').player4Score);
                break;
            case 5:
                var a = cc.find('resident').getComponent('residentScript').player5Score;
                obj.id = cc.find('resident').getComponent('residentScript').player5.user.openid;
                obj.score = a.coin + a.silver*5 + a.yb*10;
                this.clearPlayerMoney(cc.find('resident').getComponent('residentScript').player5Score);
                break;
            case 6:
                var a = cc.find('resident').getComponent('residentScript').player6Score;
                obj.id = cc.find('resident').getComponent('residentScript').player6.user.openid;
                obj.score = a.coin + a.silver*5 + a.yb*10;
                this.clearPlayerMoney(cc.find('resident').getComponent('residentScript').player6Score);
                break;
        }
        cc.find('resident').emit('upCoin',obj);
        if (this.count<=10) {
            if (this.count<=5) {
                this.node.parent.scale += 0.2;
            }
            if (this.count%5 == 0) {
                cc.find('resident').emit('upAttack',obj.id);
            }
        }
    },
    // 移动到头像框
    moveHead(num, type) {
        var move = new cc.Node;
        move.addComponent(cc.Sprite);
        switch (type) {
            case 1:
                move.getComponent(cc.Sprite).spriteFrame = this.coinPic;
                move.width = 28;
                move.height = 28;
                break;
            case 5:
                move.getComponent(cc.Sprite).spriteFrame = this.silPic;
                move.width = 34;
                move.height = 28;
                break;
            case 10:
                move.getComponent(cc.Sprite).spriteFrame = this.ybPic;
                move.width = 50;
                move.height = 40;
                break;
            default:
                break;
        }
        cc.find('Canvas').addChild(move);
        var pos = cc.find('Canvas/bz/bz' + num).position;
        move.position = pos;
        var headPos = cc.find('Canvas/headBox/player' + num).position;
        move.runAction(cc.moveTo(0.8, headPos));
        this.scheduleOnce(() => {
            move.destroy();
        }, 0.8);
        cc.find('Canvas/control').getComponent('gameScript').showScore();
    },
}); 
