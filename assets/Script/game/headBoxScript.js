cc.Class({
    extends: cc.Component,
    properties: {
        picNode : cc.Node,
        headPicArr:{
            default:[],
            type: [cc.SpriteFrame],
        },
    },
    headPos () {
        var sum = cc.find('resident').getComponent('residentScript').userList.length;
        for (let i = 1; i <= sum; i++) {
            cc.find('Canvas/headBox/player'+i).active = true;
        }
        switch (sum) {
            case 1:
                cc.find('Canvas/headBox/player1').x = 896;
                break;
            case 2:
                cc.find('Canvas/headBox/player1').x = 736;
                cc.find('Canvas/headBox/player2').x = 1056;
                break;
            case 3:
                cc.find('Canvas/headBox/player1').x = 686;
                cc.find('Canvas/headBox/player2').x = 896;
                cc.find('Canvas/headBox/player3').x = 1106;
                break;
            case 4:
                cc.find('Canvas/headBox/player1').x = 656;
                cc.find('Canvas/headBox/player2').x = 816;
                cc.find('Canvas/headBox/player3').x = 976;
                cc.find('Canvas/headBox/player4').x = 1136;
                break;
            case 5:
                cc.find('Canvas/headBox/player1').x = 616;
                cc.find('Canvas/headBox/player2').x = 756;
                cc.find('Canvas/headBox/player3').x = 896;
                cc.find('Canvas/headBox/player4').x = 1036;
                cc.find('Canvas/headBox/player5').x = 1176;
                break;
            case 6:
                cc.find('Canvas/headBox/player1').x = 596;
                cc.find('Canvas/headBox/player2').x = 716;
                cc.find('Canvas/headBox/player3').x = 836;
                cc.find('Canvas/headBox/player4').x = 956;
                cc.find('Canvas/headBox/player5').x = 1076;
                cc.find('Canvas/headBox/player6').x = 1196;
                break;
            default:
                break;
        }
    },
    setColor(num){
        this.picNode.getComponent(cc.Sprite).spriteFrame = this.headPicArr[num];
    }
});
