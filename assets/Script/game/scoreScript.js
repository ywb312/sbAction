cc.Class({
    extends: cc.Component,
    properties: {
    },
    // 更新成绩
    change() {
        cc.find('Canvas/bz/bz1/headBox/label').getComponent(cc.Label).string = cc.find('resident').getComponent('residentScript').player1Score.now;
        cc.find('Canvas/bz/bz2/headBox/label').getComponent(cc.Label).string = cc.find('resident').getComponent('residentScript').player2Score.now;
        cc.find('Canvas/bz/bz3/headBox/label').getComponent(cc.Label).string = cc.find('resident').getComponent('residentScript').player3Score.now;
        cc.find('Canvas/bz/bz4/headBox/label').getComponent(cc.Label).string = cc.find('resident').getComponent('residentScript').player4Score.now;
    },
});
