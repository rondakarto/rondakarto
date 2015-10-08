var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        g_gameLayer = new GameLayer();
        g_gameLayer.init();
        this.addChild(g_gameLayer);
    }
});
