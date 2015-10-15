var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        game.gameLayer = new GameLayer();
        game.gameLayer.init();
        this.addChild( game.gameLayer );
        game.textLayer = new TextLayer();
        game.textLayer.init();
        this.addChild( game.textLayer );
        game.gameLayer.start();

    }
});
