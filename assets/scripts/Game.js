const DefX = -312;//第一个六边形X方向上坐标
const DefY = 380;//第一个六边形Y方向上坐标
cc.Class({
    extends: cc.Component,

    properties: {
        boxPrefab: cc.Prefab,
    },

    onLoad() {
        this.initBoxes();
    },

    start() {

    },

    update(dt) {

    },

    //生成六边形box背景
    initBoxes() {
        //盛放所有六边形的容器
        let centerNode = this.node.getChildByName('center');
        this.boxes = [];
        for (let i = 0; i < 9; i++) {
            let k = Math.abs(4 - i);
            for (let j = 0; j < 9 - k; j++) {
                let box = cc.instantiate(this.boxPrefab);
                box.setPosition(DefX + (40 * k + 78 * j), DefY - (68 * (i + 1)));
                centerNode.addChild(box);
                this.boxes.push(box);
            }
        }
    }
});
