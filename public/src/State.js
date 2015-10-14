

var StateLeftOrRight = {
    name : 'StateLeftOrRight',
    menu : null,
    onEnter: function(){
        console.log('StateLeftOrRight.onEnter');
        g_left.change( 0 );
        g_right.change( 0 );

        var selectLeftMenu = new cc.MenuItemFont('Select Left', this.onSelectLeft, g_gameLayer );
        var selectRightMenu = new cc.MenuItemFont('Select Right', this.onSelectRight, g_gameLayer );
        var size = cc.winSize;
        selectLeftMenu.setPosition( new cc.Point(size.width/4,size.height/8));
        selectRightMenu.setPosition( new cc.Point(size.width/4*3,size.height/8));
        this.menu = new cc.Menu( selectLeftMenu, selectRightMenu);
        this.menu.setPosition( new cc.Point( 0, 0));
        g_gameLayer.addChild (this.menu);

        g_event  =  EVENT[ Math.floor( Math.random() * EVENT.length )];
        if( g_eventText == null ) {
            g_eventText = new cc.LabelTTF( g_event,'Arial',32 );
            g_eventText.setPosition( new cc.Point(size.width/2,size.height/8*6));
            g_gameLayer.addChild(g_eventText);
        }
        g_eventText.setString( g_event );

        shuffle( data );
    },
    onExit: function() {
        console.log( 'StateLeftOrRight.onExit');
        g_gameLayer.removeChild(this.menu);
        this.menu = null;
    },
    onSelectLeft : function(){
        console.log('StateLeftOrRight.OnSeletLeft');
        g_myCard = g_left;
        g_theOther = g_right;
        changeState( StateOpenCard );
    },
    onSelectRight : function(){
        console.log('StateLeftOrRight.OnSeletRight');
        g_myCard = g_right;
        g_theOther = g_left;
        changeState( StateOpenCard );
    }
};

var StateOpenCard = {
    name : 'StateOpenCard',
    order : 0,
    menu:null,
    onEnter:function(){
        console.log('StateOpenCard.onEnter');
        this.order++;
        if(this.order < 3 ) {
            g_myCard.change( this.order );
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
            g_myCard.change( this.order );
            this.onSelect();
        }

    },
    onExit:function(){
        console.log('StateOpenCard.onExit');
        g_gameLayer.removeChild(this.menu);
        this.menu = null;
    },
    onSelect:function(){
        console.log('StateOpenCard.onSelet');
        this.order = 0;
        setTimeout( function(){changeState(StateSelectedCard)}, 1000 );
    },
    onNext:function(){
        changeState(StateOpenCard);
    }
};



var StateSelectedCard = {
    name : 'StateSelectedCard',
    order : 0,
    onEnter:function(){
        console.log('StateSelectedCard.onEnter');
        this.order++;
        g_theOther.change( this.order );
        console.log( 'my stat: ' + g_myCard.stat);
        console.log( 'other stat: ' + g_theOther.stat);
        if( g_myCard.stat < g_theOther.stat ){
            setTimeout( function(){changeState( StateLoose )}, 3000 );
            this.order = 0;
        }
        else if ( g_myCard.stat == g_theOther.stat )
        {
            if( StateSelectedCard.order < 3 ){
                setTimeout( function(){changeState( StateSelectedCard)}, 3000 );
            }
            else{
                setTimeout( function(){changeState ( StateDraw )}, 3000 );
                this.order = 0;
            }
        }
        else {
            if( StateSelectedCard.order < 3 ){
                setTimeout( function(){changeState(StateSelectedCard)}, 3000 );
            }
            else{
                setTimeout( function(){changeState ( StateWin )}, 3000 );
                this.order = 0;
            }
        }
    },
    onExit:function(){
        console.log('StateSelectedCard.onExit');
    }
};

var StateWin = {
    name : 'StateWin',
    text : null,
    onEnter : function(){
        console.log('StateWin.onEnter');
        g_score ++;
        g_scoreText.setString( 'Score: ' + g_score );

        var size = cc.winSize;
        this.text = new cc.LabelTTF( 'YOU WIN', 'Arial', 5 );
        this.text.setPosition( size.width/2, size.height/2);
        g_gameLayer.addChild(this.text);

        setTimeout( function(){changeState(StateLeftOrRight)}, 5000 );
    },
    onExit : function(){
        console.log('StateWin.onExit');
        g_gameLayer.removeChild( this.text );
        g_gameLayer.removeChild( g_myCard.statText );
        g_gameLayer.removeChild( g_theOther.statText );

    }
};

var StateLoose = {
    name : 'StateLoose',
    text : null,
    onEnter : function(){
        console.log('StateLoose.onEnter');
        g_score --;
        if( g_score < 0 ) {
            g_score = 0;
        }
        var size = cc.winSize;
        this.text = new cc.LabelTTF( 'YOU LOOSE', 'Arial', 5 );
        this.text.setPosition( size.width/2, size.height/2);
        g_gameLayer.addChild(this.text);

        setTimeout( function(){changeState(StateLeftOrRight)}, 5000 );
    },
    onExit : function(){
        console.log('StateLoose.onExit');
        g_gameLayer.removeChild( this.text );
        g_gameLayer.removeChild( g_myCard.statText );
        g_gameLayer.removeChild( g_theOther.statText );

    }
};

var StateDraw = {
    name : 'StateDraw',
    text : null,
    onEnter : function(){
        console.log('StateDraw.onEnter');
        var size = cc.winSize;
        this.text = new cc.LabelTTF( 'DRAW', 'Arial', 5 );
        this.text.setPosition( size.width/2, size.height/2);
        g_gameLayer.addChild(this.text);

        setTimeout( function(){changeState(StateLeftOrRight)}, 5000 );
    },
    onExit : function(){
        console.log('StateDraw.onExit');
        g_gameLayer.removeChild( this.text );
        g_gameLayer.removeChild( g_myCard.statText );
        g_gameLayer.removeChild( g_theOther.statText );

    }
};

function changeState(  next )
{
    console.log( 'changeState');
    if( g_state != null ){
        console.log( 'g_state: ' + g_state.name );
    }
    if( next != null ){
        console.log( 'next: ' + next.name );
    }

    if( g_state != null ) {
        g_state.onExit();
    }
    g_state = next;
    if( g_state != null ) {
        g_state.onEnter();
    }


}
