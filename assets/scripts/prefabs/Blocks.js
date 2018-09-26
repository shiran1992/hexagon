const blocksJ = require("BlocksJson");
cc.Class({
    extends: cc.Component,

    properties: {
        blocks: [cc.Node],
        spriteFrames: [cc.SpriteFrame],
    },

    onLoad() {
        this.initView();
        this.node.on(cc.Node.EventType.TOUCH_START, this.touchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touchCancel, this);

        this.boxes = this.getBoxes();
    },

    initView() {
        let blocksJson = blocksJ.blocks;
        let random = Math.floor(Math.random() * blocksJson.length);
        //赋值当前滑块的配置
        this.blocksJson = blocksJson[random];
        let blocksData = blocksJson[random].block;
        this.frameIndex = blocksJson[random].color;
        for (let i = 0; i < blocksData.length; i++) {
            let point = blocksData[i];
            //按照配置表来改变组件形状
            this.blocks[i].setPosition(point.x, point.y);
            this.blocks[i].active = true;
            //按照配置表中的颜色，来显示组件的颜色（node类型不可以直接指定资源）
            this.blocks[i].getComponent(cc.Sprite).spriteFrame = this.spriteFrames[this.frameIndex];
        }
    },

    //获取里面boxes
    getBoxes() {
        let boxes = [];
        let centerNode = cc.find('Canvas/baseView/center');
        if (centerNode && centerNode.childrenCount) {
            boxes = centerNode.children;
        }
        return boxes;
    },

    touchStart() {
        this.startPosition = this.node.position;//起始坐标
        this.node.setLocalZOrder(1);
        let moveBy = cc.moveBy(0.3, 0, 100);
        let scaleTo = cc.scaleTo(0.3, 1);
        let actions = cc.spawn([moveBy, scaleTo, cc.callFunc(() => {
            for (let i = 0; i < this.blocks.length; i++) {
                this.blocks[i].runAction(cc.scaleTo(0.3, 0.8));
            }
        })]);
        this.node.runAction(actions);
    },

    touchMove(event) {
        let p = this.node.parent.convertTouchToNodeSpaceAR(event);
        this.node.setPosition(p.x, p.y + 100);
 
        //手指的世界坐标
        let wFingerPoint = event.getLocation();
        //block中心的世界坐标
        let wBlocksPoint = cc.v2(wFingerPoint.x, wFingerPoint.y + 100);
        
        let boxesIndex = [];
        for (let i = 0; i < this.blocks.length; i++) {
            let block = this.blocks[i];
            //blocks中的每一个相对于整体的坐标
            let position = block.getPosition();
            //整体加起来，就是每个格子的最终世界坐标
            let bPosition = cc.v2(wBlocksPoint.x + position.x, wBlocksPoint.y + position.y);
            for (let j = 0; j < this.boxes.length; j++) {
                let box = this.boxes[j].getComponent("Box");
                if (cc.rectContainsPoint(box.checkBox.getBoundingBoxToWorld(), bPosition)) {
                    boxesIndex.push(j);
                }
            }
        }
        //将背景颜色显示出来
        if(this.blocks.length == boxesIndex.length) {
            for(let i = 0; i<this.blocks.length; i++){
                let box = this.boxes[boxesIndex[i]].getComponent("Box");
                box.showBackgroung(this.blocksJson.color);
            }
        }
    },

    touchEnd() {
        this.node.setLocalZOrder(0);
        let moveTo = cc.moveTo(0.5, this.startPosition);
        let scaleTo = cc.scaleTo(0.3, 0.7);
        let actions = cc.spawn([moveTo, scaleTo, cc.callFunc(() => {
            for (let i = 0; i < this.blocks.length; i++) {
                this.blocks[i].runAction(cc.scaleTo(0.3, 1));
            }
        })]);
        this.node.runAction(actions);
    },

    touchCancel() {
        this.node.setLocalZOrder(0);
        let moveTo = cc.moveTo(0.5, this.startPosition);
        let scaleTo = cc.scaleTo(0.3, 0.7);
        let actions = cc.spawn([moveTo, scaleTo]);
        this.node.runAction(actions);
    },
});
