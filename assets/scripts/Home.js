cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {

    },

    start() {

    },

    update(dt) {

    },

    //开始游戏
    onClickStart() {
        cc.director.loadScene("game");
        /*let params = {
            appId: 'wx2c91b4701b985e39',
            path: '?p=1&m=2&ald_media_id=2629&ald_link_key=f73125a93b6a2c25&ald_position_id=0',
            extraData: '?a=8&b=9&ald_media_id=2629&ald_link_key=dda4dc7bca83b4e3&ald_position_id=0'
        };
        wx.navigateToMiniProgram(params);*/
    }
});
