cc.Class({
    extends: cc.Component,
    properties: {
        testPre:cc.Prefab,
        prefab1:cc.Prefab,
        prefab2:cc.Prefab,
        prefab3:cc.Prefab,
        // 返回的玩家编号
        prefab1Music : {
            default:null,
            type : cc.AudioClip,
        },
        prefab2Music : {
            default:null,
            type : cc.AudioClip,
        },
        prefab3Music : {
            default:null,
            type : cc.AudioClip,
        },
        noticeMusic : {
            default:null,
            type : cc.AudioClip,
        },
        createPrefabMusic : {
            default:null,
            type : cc.AudioClip,
        },
        gameOverMusic : {
            default:null,
            type : cc.AudioClip,
        },
        gameTalk : {
            default:null,
            type : cc.AudioClip,
        },
        testMusic : {
            default:null,
            type : cc.AudioClip,
        },
        testTalkMusic : {
            default:null,
            type : cc.AudioClip,
        },
    },
    onLoad() {
        this.num = 5;
        cc.director.getCollisionManager().enabled=true;
        // 设置杯子的编号
        cc.find('Canvas/bz/bz1').getComponent('cupScript').setNum(1);
        cc.find('Canvas/bz/bz2').getComponent('cupScript').setNum(2);
        cc.find('Canvas/bz/bz3').getComponent('cupScript').setNum(3);
        cc.find('Canvas/bz/bz4').getComponent('cupScript').setNum(4);
    },
    start () {
        let _self = this;
        cc.director.preloadScene('final',()=>{});
        // 屏幕摇晃动画
        this.shake = cc.sequence(
            cc.scaleTo(0.08,1.1),
            cc.scaleTo(0.05,1.05),cc.scaleTo(0.05,1.1),
            cc.scaleTo(0.05,1.05),cc.scaleTo(0.05,1.1),
            cc.scaleTo(0.05,1.05),cc.scaleTo(0.05,1.1),
            cc.scaleTo(0.05,1.05),cc.scaleTo(0.05,1.1),
            cc.scaleTo(0.05,1.05),cc.scaleTo(0.05,1.1),
            cc.scaleTo(0.05,1.05),cc.scaleTo(0.05,1.1),
            cc.scaleTo(0.08,1)
        );
        // 游戏中
        cc.find('resident').getComponent('residentScript').playing = 1;
        // 后台返回玩家的数组
        this.createPrefab();
        // 创建神兽
        this.createShenshou();
        // 控制杯子的显示
        cc.find('resident').on('usersAdv',function(data){
            if (cc.find('Canvas/bz/bz1')!=null) {
                _self.num = 5 * data.length;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].user.avatar!=undefined && cc.find('Canvas/bz/bz1')!=null) {
                        let j = i + 1;
                        // 头像加载
                        cc.loader.load({url:data[i].user.avatar,type:'jpg'},function(err,ttt){
                            var newFra = new cc.SpriteFrame;
                            newFra.setTexture(ttt);
                            cc.find('Canvas/bz/bz'+j+'/headBox/img/headImg').getComponent(cc.Sprite).spriteFrame = newFra;
                        });
                        // 每一个杯子  将数据传至cupScript
                        cc.find('Canvas/bz/bz'+j).getComponent('cupScript').setCupPosition(j,data[i]);
                        cc.find('Canvas/bz/bz'+j).active = true;
                    }
                }
            }
        });
        // 每次收到peng都会调用     设置碰撞点的展示 击杀效果
        cc.find('resident').on('showPeng',function(data){
            if (cc.find('Canvas/shenshou')!=null) {
                cc.find('Canvas/background').stopAllActions();
                let users = data.data;
                let str = "";
                if (users[0].d == 0) {  //0没死 1死了
                    if (users[1].d == 0) {
                    }else{
                        str = users[0].user.nickname +" 击杀了 "+ users[1].user.nickname;
                        dieAction();
                    }
                }else{
                    if (users[1].d == 0) {
                        str = users[1].user.nickname +" 击杀了 "+ users[0].user.nickname;
                        dieAction();
                    }else{
                        str = users[0].user.nickname+" 阵亡 "+users[1].user.nickname;
                        dieAction();
                    }  
                }
                // 有人死亡时调用
                function dieAction(){
                    cc.find('Canvas/flash').active = true;
                    cc.find('Canvas/background').runAction(_self.shake);
                    cc.find('Canvas/background/text').active = true;
                    cc.find('Canvas/background/text').getComponent(cc.Label).string = str;
                    cc.find('Canvas/background/boom').active = true;
                    cc.find('Canvas/background/boom').setPosition(data.pos.x,data.pos.y);
                }
                // 定时关闭阵亡信息
                clearTimeout(_self.pengTimer);
                _self.pengTimer = setTimeout(()=>{
                    cc.find('Canvas/background/text').active = false;
                    cc.find('Canvas/background/boom').active = false;
                },1500);
            }
        });
        cc.find('resident').on('userLeave',function(){
            if (cc.find('Canvas/bz/bz1')!=null) {
                cc.find('Canvas/bz/bz1').active = false;
                cc.find('Canvas/bz/bz2').active = false;
                cc.find('Canvas/bz/bz3').active = false;
                cc.find('Canvas/bz/bz4').active = false;
            }
        });
        cc.find('resident').on('goEnd',function(data){
            if (data.balance <= 0){
               cc.director.loadScene('final');
            }
        });
    },
    // 是否创建金币
    checkPrefab(){
        clearTimeout(this.checkTime);
        this.checkTime = setTimeout(()=>{
            if (cc.find('Canvas/yunLow/prefabListNode').children.length == 0) {
                this.createPrefab();
            }
        },200)
    },
    // 创建金币
    createPrefab(){
        let pre = "";
        let self = this;
        var rad = Math.random();
        if (rad>0.7) {
            cc.audioEngine.play(this.prefab1Music,false,1);
            pre = this.prefab1;
        } else if (rad>0.3) {
            cc.audioEngine.play(this.prefab2Music,false,1);
            pre = this.prefab2;
        }else{
            cc.audioEngine.play(this.prefab3Music,false,1);
            pre = this.prefab3;
        }
        // 在边缘时延迟下落
        if (Math.abs(cc.find("Canvas/yunLow/man").x)>200) {
            self.fallTimer1 = setInterval(() => {
                if (Math.abs(cc.find("Canvas/yunLow/man").x)<200) {
                    create();
                    clearInterval(self.fallTimer1);
                }
            }, 300);
        } else {
            create();
        }
        function create(){
            cc.find('Canvas/yunLow/man').getComponent('manScript').run();
            for (let i = 0; i < self.num ; i++) {
                let newPrefab = cc.instantiate(pre);
                cc.find('Canvas/yunLow/prefabListNode').addChild(newPrefab);
                let a = {
                    x : cc.find('Canvas/yunLow/man').getPosition().x+(Math.random()*141),
                    y : 0
                }
                newPrefab.position = a;
            }
            cc.audioEngine.play(self.createPrefabMusic,false,1);
        }
    },
    // 生成神兽
    createShenshou(){
        let timer = 5;
        // 每5s出现一次神兽
        this.animalTimer = setInterval(()=>{
            switch (Math.floor(Math.random()*3)) {
                case 0:
                    cc.find('Canvas/shenshou').getComponent('animalScript').showLine();
                    break;
                case 1:
                    cc.find('Canvas/shenshou').getComponent('animalScript').showBall();
                    break;
                case 2:
                    cc.find('Canvas/shenshou').getComponent('animalScript').showPlane();
                    break;
            }
            timer = Math.floor(Math.random()*7+4)
        },timer*1000);
    },
    onDestroy(){
        clearTimeout(this.pengTimer);
        clearTimeout(this.checkTime);
        clearInterval(this.animalTimer);
        clearInterval(this.fallTimer1);
    }
});
