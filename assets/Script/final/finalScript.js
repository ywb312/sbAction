cc.Class({
    extends: cc.Component,
    properties: {
        finalStart : {
            default:null,
            type : cc.AudioClip,
        },
        finalTalk : {
            default:null,
            type : cc.AudioClip,
        },
        finalBgMusic : {
            default:null,
            type : cc.AudioClip,
        },
        publicBtnMusic : {
            default:null,
            type : cc.AudioClip,
        },
        rankPre:cc.Prefab,
    },
    onLoad(){
        this.ajaxEnd();
        cc.audioEngine.play(this.finalStart,false,1);
        cc.audioEngine.play(this.finalTalk,false,1);
        cc.audioEngine.play(this.finalBgMusic,false,1);
    },
    start() {
        // 不在游戏中
        cc.find('resident').getComponent('residentScript').playing = 0;
        // 重置复活
        cc.find('resident').getComponent("residentScript").resurgence = 0;
        // // 我也发红包
        // var isnew = cc.find('resident').getComponent("residentScript").isnew;
        // if (isnew == 0) {
        //     // 菜单的显示隐藏
        //     cc.find('Canvas/testTop/text').active = true;
        //     // cc.find('Canvas/testTop/text').getComponent(cc.Label).string = '财神的聚宝盆红包';
        //     // cc.find('resident').getComponent('residentScript').isnew = 1;
        // } else {
        //     cc.find('Canvas/officialTop/text').active = true;
        //     cc.find('Canvas/officialTop/text').getComponent(cc.Label).string = '从'+'的聚宝盆中接到红包';
        //     cc.find('Canvas/background1').active = false;
        //     cc.find('Canvas/background2').active = true;
        // }
        // cc.find('Canvas/money').getComponent(cc.Label).string = '￥'+cc.find('resident').getComponent("residentScript").toDecimal2(0.00);
        
    },
    ajaxEnd() {
        var _self = this;
        var baseURL = cc.find('resident').getComponent('residentScript').dealHost('end');
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                var res = JSON.parse(xhr.responseText);
                _self.setRank(res.scores);
                cc.find('resident').getComponent('residentScript').userList = [];
            }
        }
        xhr.open('post', baseURL);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.send();
    },
    setRank(data){
        var _self = this;
        for (let i = 0; i < data.length; i++) {
            var obj = {
                rank:data[i].rank,
                head:data[i].avatar,
                name:data[i].nickname,
                score:data[i].score/100,
            }
            var newRankPre = cc.instantiate(_self.rankPre);
            cc.find('Canvas/rankList/list').addChild(newRankPre);
            newRankPre.getComponent('rankScript').createRank(obj);
        }
    },
});
