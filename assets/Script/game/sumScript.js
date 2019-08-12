cc.Class({
    extends: cc.Component,
    properties: {
        numberArr:{
            default:[],
            type:[cc.SpriteFrame],
        },
    },
    setSum(num){
        num *= 1;
        var thousand = parseInt(num/1000);
        var hundred = parseInt(num/100)%10;
        var ten = parseInt((num%100)/10);
        var one = parseInt(num%10);
        var bol = true;
        if (thousand == 0) {
            cc.find('Canvas/background/surplus/coins/thousand').active = false;
        }
        if (thousand == 0 && hundred == 0) {
            cc.find('Canvas/background/surplus/coins/hundred').active = false;
        }
        cc.find('Canvas/background/surplus/coins/thousand').getComponent(cc.Sprite).spriteFrame = this.numberArr[thousand];
        cc.find('Canvas/background/surplus/coins/hundred').getComponent(cc.Sprite).spriteFrame = this.numberArr[hundred];
        cc.find('Canvas/background/surplus/coins/ten').getComponent(cc.Sprite).spriteFrame = this.numberArr[ten];
        cc.find('Canvas/background/surplus/coins/one').getComponent(cc.Sprite).spriteFrame = this.numberArr[one];
    },
});
