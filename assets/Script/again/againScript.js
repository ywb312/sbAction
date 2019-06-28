cc.Class({
    extends: cc.Component,
    properties: {
        publicBtnMusic: {
            default: null,
            type: cc.AudioClip,
        },
        alertMusic: {
            default: null,
            type: cc.AudioClip,
        },
        // qrCodeNode: cc.Node,
    },
    start() {
        this.setHeadBox();
        let fee = cc.find('resident').getComponent('residentScript').fee;
        let list = cc.find('resident').getComponent('residentScript').joinList;
        let num = fee/100;
        var sum = fee * 4;
        if (list.length>4) {
            sum = fee * list.length;
        }
        cc.find('Canvas/topNum').getComponent('numScript').setTopNum(num);
        cc.find('Canvas/topNum').getComponent('numScript').setBottomNum(sum);
        this.schedule(()=>{
            cc.find('Canvas/sumLabel').getComponent(cc.Label).string = sum/100;
            cc.find('Canvas/sumLabel').active = true;
        },2);
        //聚宝盆亮点闪烁
        var bol = false;
        this.schedule(()=>{
            cc.find('Canvas/pen/light').active = bol;
            bol = !bol;
        },0.3);
        // 背景转圈
        cc.find('Canvas/alone/rotate').runAction(cc.repeatForever(cc.rotateBy(2,-180)));
    },
    setHeadBox(){
        let list = cc.find('resident').getComponent('residentScript').joinList;
        for (let i = 0; i < list.length; i++) {
            let j = i+1;
            cc.loader.load({ url: list[i].user.avatar, type: 'jpg' }, function (err, ttt) {
                var newFra = new cc.SpriteFrame;
                newFra.setTexture(ttt);
                cc.find('Canvas/heads/play'+j+'/img/headImg').getComponent(cc.Sprite).spriteFrame = newFra;
            });
            cc.find('Canvas/heads/play'+j).active = true;
        }
        cc.find('Canvas/heads/play1').runAction(cc.moveTo(0.5,cc.p(-300,0)));
        this.scheduleOnce(()=>{
            cc.find('Canvas/heads/play2').runAction(cc.moveTo(0.5,cc.p(-180,0)));
        },0.5);
        this.scheduleOnce(()=>{
            cc.find('Canvas/heads/play3').runAction(cc.moveTo(0.5,cc.p(-60,0)));
        },1);
        this.scheduleOnce(()=>{
            cc.find('Canvas/heads/play4').runAction(cc.moveTo(0.5,cc.p(60,0)));
        },1.5);
        this.scheduleOnce(()=>{
            cc.find('Canvas/heads/play5').runAction(cc.moveTo(0.5,cc.p(180,0)));
        },2);
        this.scheduleOnce(()=>{
            cc.find('Canvas/heads/play6').runAction(cc.moveTo(0.5,cc.p(300,0)));
        },2.5);
    },
});
 