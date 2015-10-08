var STATE = {
    LEFT_OR_RIGHT : 'LEFT_OR_RIGHT',
    FIRST_CARD : 'FIRST_CARD',
    SECOND_CARD : 'SECOND_CARD',
    PICKED_CARD : 'PICKED_CARD',
};

var StateLeftOrRight = {
    menu : null,
    onEnter: function(){
        var selectLeftMenu = new cc.MenuItemFont('Select Left', this.onSelectLeft, g_gameLayer );
        var selectRightMenu = new cc.MenuItemFont('Select Right', this.onSelectRight, g_gameLayer );
        var size = cc.winSize;
        selectLeftMenu.setPosition( new cc.Point(size.width/4,size.height/8));
        selectRightMenu.setPosition( new cc.Point(size.width/4*3,size.height/8));
        this.menu = new cc.Menu( selectLeftMenu, selectRightMenu);
        this.menu.setPosition( new cc.Point( 0, 0));
        g_gameLayer.addChild(this.menu);
    },
    onExit: function() {
        g_gameLayer.removeChild(this.menu);
        this.menu = null;
    },
    onSelectLeft : function(){
        console.log('OnSeletLeft');
        g_myCard = g_left;
        g_theOther = g_right;
        changeState( StateOpenCard );
    },
    onSelectRight : function(){
        console.log('OnSeletRight');
        g_myCard = g_right;
        g_theOther = g_left
        changeState( StateOpenCard );
    }
};

var StateOpenCard = {
    order : 0,
    menu:null,
    onEnter:function(){
        this.order++;
        if(this.order < 3 ) {
            g_myCard.initWithFile(res['_'+this.order]);
            var selectMenu = new cc.MenuItemFont('Select', this.onSelect, g_gameLayer );
            var nextMenu = new cc.MenuItemFont('Next', this.onNext, g_gameLayer );
            var size = cc.winSize;
            var offset;
            if(g_myCard===g_left) {
                offset = 1;
            }
            else {
                offset = 5;
            }
            selectMenu.setPosition( new cc.Point(size.width/8*offset,size.height/8));
            nextMenu.setPosition( new cc.Point(size.width/8*(offset+2),size.height/8));
            this.menu = new cc.Menu( selectMenu, nextMenu);
            this.menu.setPosition( new cc.Point( 0, 0));
            g_gameLayer.addChild(this.menu);
        }
        else
        {
            g_myCard.initWithFile(res['_'+this.order]);
            changeState(StateSelectedCard);
        }

    },
    onExit:function(){
        g_gameLayer.removeChild(this.menu);
        this.menu = null;
        if( this.order === 3 ) {
            this.order = 0;
        }
    },
    onSelect:function(){
        this.order = 0;
        changeState(StateSelectedCard);
    },
    onNext:function(){
        changeState(StateOpenCard);
    }
};



var StateSelectedCard = {
    order : 0,
    onEnter:function(){
        setTimeout( StateSelectedCard.openCard, 2000 );
    },
    onExit:function(){

    },
    openCard:function(){
        StateSelectedCard.order++;
        g_theOther.initWithFile(res['_'+(5+StateSelectedCard.order)]);
        if( StateSelectedCard.order < 3 ){
            setTimeout ( StateSelectedCard.openCard, 2000 );
        }
    }
};

function changeState(  next )
{
    if( g_state != null ) {
        g_state.onExit();
    }
    if ( next != null ) {
        next.onEnter();
    }
    g_state = next;
}
