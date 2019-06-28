cc.Class({
    extends: cc.Component,
    properties: {
        headNode:cc.Node,
        nameNode:cc.Node,
        scoreNode:cc.Node,
        bestNode:cc.Node,
    },
    createRank(obj){
        let ht = this;
        cc.loader.load({url:obj.head,type:'jpg'},function(err,ttt){
            var headFra = new cc.SpriteFrame;
            headFra.setTexture(ttt);
            ht.headNode.getComponent(cc.Sprite).spriteFrame = headFra;
        });
        this.nameNode.getComponent(cc.Label).string = obj.name;
        this.scoreNode.getComponent(cc.Label).string = obj.score + '元';
        if (obj.rank == 1) {
            this.bestNode.active = true;
        }
    },
});
