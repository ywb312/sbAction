cc.Class({
    extends: cc.Component,
    properties: {
        publicMusic : {
            default:null,
            type : cc.AudioClip,
        },
        homeTalk : {
            default:null,
            type : cc.AudioClip,
        },
        haveRed : {
            default:null,
            type : cc.AudioClip,
        },
        alertMusic : {
            default:null,
            type : cc.AudioClip,
        },
        btnMusic : {
            default:null,
            type : cc.AudioClip,
        },
        qrCodeNode: cc.Node,
    },
    onLoad () {
        this.preload = 100;
    },
    start () {
        let _self = this;
        cc.director.preloadScene('game',()=>{
            this.preload = 0;
        });
        this.ajaxEnter();
        // this.ajaxUsers();
        // 加载条显示
        // cc.find('Canvas/loading').active = true;
        // cc.find('Canvas/loading').runAction(cc.repeatForever(cc.rotateBy(2,360)));
        // cc.director.loadScene('game');
        cc.find('resident').on('homeHeadShow',function(data){
            if (cc.find('Canvas/home/headBox/player1')!=null) {
                for (let i = 0; i < data.length; i++) {
                    var j = i+1;
                    if (j>3) {
                        return;
                    }
                    cc.loader.load({url:data[i].avatar,type:'jpg'},function(err,ttt){
                        var newFra = new cc.SpriteFrame;
                        newFra.setTexture(ttt);
                        cc.find('Canvas/home/headBox/player'+j+'/img/headImg').getComponent(cc.Sprite).spriteFrame = newFra;
                    });
                    cc.find('Canvas/home/headBox/player'+j+'/name').getComponent(cc.Label).string = data[i].nickname;
                    // 满三人
                    cc.find('Canvas/home/headBox/player'+j).active = true;
                }
            }
        });
        // 玩家加入
        cc.find('resident').on('startGame',function(data){
            // if (data.istrial == 0) {//非新手
            //     if (cc.find('Canvas/bz')==null) {
            //         cc.director.loadScene('game');
            //     }
            // } else {
                // 教学情况下 至少3人才能跳转
                // if (data.numbers>=3 && cc.find('Canvas/bz')==null) {
                if (cc.find('Canvas/bz')==null) {
                    cc.director.loadScene('game');
                }
            // }
        });
        // 跳转至引导付费页
        cc.find('resident').on('moveToAgain',function(data){
            var playing = cc.find('resident').getComponent('residentScript').playing;
            if (playing == 0) {
                _self.scheduleOnce(()=>{
                    cc.find('resident').getComponent('residentScript').fee = data.fee;
                    cc.director.loadScene('again');
                },2);
            }
        });
    },
    ajaxEnter(){
        var _self = this;
        var baseURL = cc.find('resident').getComponent('residentScript').dealHost('enter');
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var res = JSON.parse(xhr.responseText);
                cc.find('resident').getComponent('residentScript').changeQRcode(res.url,_self.qrCodeNode);
            }
        }
        xhr.open('post', baseURL);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send();
    },
    ajaxUsers(){
        var baseURL = cc.find('resident').getComponent('residentScript').dealHost('users');
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var res = JSON.parse(xhr.responseText);
                cc.find('resident').getComponent('residentScript').joinList = res.users;
                cc.find('resident').emit('homeHeadShow',cc.find('resident').getComponent('residentScript').joinList);
            }
        }
        xhr.open('post', baseURL);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send();
    }
});
