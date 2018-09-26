cc.Class({
    extends: cc.Component,

    properties: {
        block: cc.Node,
        bg: cc.Node,
        checkBox: cc.Node,
        spriteFrames: [cc.SpriteFrame],
    },

    showBackgroung(colorIndex) {
        this.block.getComponent(cc.Sprite).spriteFrame = this.spriteFrames[colorIndex];
        this.block.active = true;
        this.block.setLocalZOrder(0);
    }
});
