var GameLayer = cc.Layer.extend({
    init:function () {
        // 1. super init first
        this._super();

        var gradient = new cc.LayerGradient( cc.color(0,0,0,255),cc.color(0,102,51,255));
        this.addChild(gradient);

        //cc.eventManager.addListener(listener,this);

        return true;
    },
    start: function(){
        changeState( StateLeftOrRight );
    }

});

//var listener = cc.EventListener.create({
//    event: cc.EventListener.TOUCH_ONE_BY_ONE,
//    swallowTouches:true,
//    onTouchBegan: function(touch,event){
//        console.log("touch began");
//        switch (g_state) {
//            case STATE.LEFT_OR_RIGHT:
//                var select = 0;
//                var l1, l2, cs, rt;
//                l1 = touch.getLocation();
//                l2 = g_left.convertToNodeSpace( l1 );
//                cs = g_left.getContentSize();
//                rt = cc.rect(0,0,cs.width,cs.height);
//
//                if( cc.rectContainsPoint( rt, l2 )){
//                    select = 1;
//                }
//
//                l1 = touch.getLocation();
//                l2 = g_right.convertToNodeSpace( l1 );
//                cs = g_right.getContentSize();
//                rt = cc.rect(0,0,cs.width,cs.height);
//
//                if( cc.rectContainsPoint( rt, l2 )){
//                    select = 2;
//                }
//
//                if( select === 1 ){
//                    g_left.initWithFile( res._0 );
//                    g_myCard = g_left;
//                }
//                else if ( select == 2 ){
//                    g_right.initWithFile(res._1);
//                    g_myCard = g_right;
//                }
//
//                if( select != 0){
//                    g_state = STATE.FIRST_CARD;
//                }
//
//                break;
//            default:
//                break;
//        }
//        return true;
//    },
//    onTouchMoved:function(touch,event){
//        console.log("touch moved");
//        switch (g_state) {
//            case STATE.FIRST_CARD:
//            case STATE.SECOND_CARD:
//                var l1, l2, cs, rt;
//                l1 = touch.getLocation();
//                l2 = g_myCard.convertToNodeSpace( l1 );
//                cs = g_myCard.getContentSize();
//                rt = cc.rect(0,0,cs.width,cs.height);
//
//                if( cc.rectContainsPoint( rt, l2 )){
//                    g_myCard.setPosition( l1.x, l1.y );
//                }
//                break;
//            default:
//                break;
//        }
//        return true;
//    },
//    onTouchEnded:function(touch,event){
//        console.log("touch ended");
//        var size = cc.winSize;
//        switch (g_state) {
//            case STATE.FIRST_CARD:
//            case STATE.SECOND_CARD:
//                if( g_myCard == g_left )
//                {
//                    g_left.attr({
//                        x: size.width / 4,
//                        y: size.height / 2
//                    });
//                }
//                else if( g_myCard == g_right)
//                {
//                    g_right.attr({
//                        x: size.width / 4 *3 ,
//                        y: size.height / 2
//                    });
//                }
//                break;
//            default:
//                break;
//        }
//        return true;
//    }
//
//});




