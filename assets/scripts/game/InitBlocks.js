cc.Class({
    extends: cc.Component,

    properties: {
        blocksPrefab: cc.Prefab,
    },

    onLoad() {
        this.initView();
    },

    start() {

    },

    update(dt) {

    },

    initView() {
        this.blocks = [];
        for (let i = 0; i < 3; i++) {
            let block = cc.instantiate(this.blocksPrefab);
            block.setLocalZOrder(10);
            block.x = (i - 1) * 220;
            block.y -= 60;
            block.setScale(0.7);
            this.node.addChild(block);
            this.blocks.push(block);
        }
    }
});
