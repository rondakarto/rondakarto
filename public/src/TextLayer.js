var TextLayer = cc.Layer.extend({

    init:function () {
        // 1. super init first
        this._super();

        // ask the window size
        var size = cc.winSize;

        var helloLabel = new cc.LabelTTF("RONDA KARTO", "Arial", 10);
        helloLabel.setPosition( size.width/2, size.height/10*9);
        this.addChild(helloLabel);

        game.scoreText = new cc.LabelTTF( 'Score: 0', 'Arial', '20' );
        game.scoreText.setPosition( size.width/8*7, size.height/8*7);
        this.addChild(game.scoreText);

        return true;
    }
});