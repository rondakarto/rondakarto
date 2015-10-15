

var StateLeftOrRight = {
    name : 'StateLeftOrRight',
    menu : null,

    onEnter: function(){
        console.log('StateLeftOrRight.onEnter');
        var size = cc.winSize;
        if( game.leftCard == null ){
            game.leftCard = new Karto();
            game.leftCard.left = true;
            game.leftCard.attr({
                x: size.width / 4,
                y: size.height / 2
            });
            game.gameLayer.addChild(game.leftCard, 0);
        }
        if( game.rightCard == null ){
            game.rightCard = new Karto();
            game.rightCard.left = false;
            game.rightCard.attr({
                x: size.width / 4 *3 ,
                y: size.height / 2
            });
            game.gameLayer.addChild(game.rightCard, 0);
        }
        game.leftCard.change( 0 );
        game.rightCard.change( 0 );
        game.myOrder = 0;
        game.otherOrder = 0;

        if( this.menu == null ){
            var selectLeftMenu = new cc.MenuItemFont(
                'Select Left',
                function() {
                    this.onSelectLeft();
                }.bind(this),
                game.gameLayer);
            var selectRightMenu = new cc.MenuItemFont(
                'Select Right',
                function() {
                    this.onSelectRight();
                }.bind(this),
                game.gameLayer);
            selectLeftMenu.setPosition( new cc.Point(size.width/4,size.height/8));
            selectRightMenu.setPosition( new cc.Point(size.width/4*3,size.height/8));
            this.menu = new cc.Menu( selectLeftMenu, selectRightMenu);
            this.menu.setPosition( new cc.Point( 0, 0));
        }
        game.gameLayer.addChild (this.menu);

        game.event  =  EVENT[ Math.floor( Math.random() * EVENT.length )];
        if( game.eventText == null ) {
            game.eventText = new cc.LabelTTF( '','Arial',32 );
            game.eventText.setPosition( new cc.Point(size.width/2,size.height/8*6));
            game.textLayer.addChild( game.eventText );
        }
        game.eventText.setString( game.event );

        shuffle( data );
    },
    onExit: function() {
        console.log( 'StateLeftOrRight.onExit');
        game.gameLayer.removeChild(this.menu);
    },
    onSelectLeft : function(){
        console.log('StateLeftOrRight.OnSeletLeft');
        game.myCard = game.leftCard;
        game.otherCard = game.rightCard;
        changeState( StateOpenCard );
    },
    onSelectRight : function(){
        console.log('StateLeftOrRight.OnSeletRight');
        game.myCard = game.rightCard;
        game.otherCard = game.leftCard;
        changeState( StateOpenCard );
    }
};

var StateOpenCard = {
    name : 'StateOpenCard',
    menu:null,
    onEnter:function(){
        console.log('StateOpenCard.onEnter');
        game.myOrder++;
        game.myCard.change( game.myOrder );
        if(game.myOrder == 1 ) {
            if( this.menu == null ) {
                var selectMenu = new cc.MenuItemFont(
                    'Select',
                    function(){
                        this.onSelect();
                    }.bind(this),
                    game.gameLayer );
                var nextMenu = new cc.MenuItemFont(
                    'Next',
                    function() {
                        this.onNext();
                    }.bind(this),
                    game.gameLayer );
                var size = cc.winSize;
                var offset;
                if(game.myCard.left == true) {
                    offset = 1;
                }
                else {
                    offset = 5;
                }
                selectMenu.setPosition( new cc.Point(size.width/8*offset,size.height/8));
                nextMenu.setPosition( new cc.Point(size.width/8*(offset+2),size.height/8));
                this.menu = new cc.Menu( selectMenu, nextMenu);
                this.menu.setPosition( new cc.Point( 0, 0));
            }
            game.gameLayer.addChild(this.menu);
        }
        else if (  game.myOrder == 3 ) {
            this.onSelect();
        }

    },
    onExit:function(){
        console.log('StateOpenCard.onExit');
    },
    onSelect:function(){
        console.log('StateOpenCard.onSelet');
        game.gameLayer.removeChild(this.menu);
        setTimeout( function(){changeState(StateSelectedCard)}, 3000 );
    },
    onNext:function(){
        console.log('StateOpenCard.onNext');
        changeState(StateOpenCard);
    }
};



var StateSelectedCard = {
    name : 'StateSelectedCard',
    onEnter:function(){
        console.log('StateSelectedCard.onEnter');
        game.otherOrder++;
        game.otherCard.change( game.otherOrder );
        console.log( 'my stat: ' + game.myCard.stat);
        console.log( 'other stat: ' + game.otherCard.stat);
        if( game.myCard.stat < game.otherCard.stat ){
            setTimeout( function(){changeState( StateLoose )}, 3000 );
        }
        else if ( game.myCard.stat == game.otherCard.stat )
        {
            if( game.otherOrder < 3 ){
                setTimeout( function(){changeState( StateSelectedCard)}, 3000 );
            }
            else{
                setTimeout( function(){changeState ( StateDraw )}, 3000 );
            }
        }
        else {
            if( game.otherOrder < 3 ){
                setTimeout( function(){changeState(StateSelectedCard)}, 3000 );
            }
            else{
                setTimeout( function(){changeState ( StateWin )}, 3000 );
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
        game.score ++;
        game.scoreText.setString( 'Score: ' + game.score );

        var size = cc.winSize;
        if( this.text == null ) {
            this.text = new cc.LabelTTF('YOU WIN', 'Arial', 5);
            this.text.setPosition(size.width / 2, size.height / 2);
        }

        game.textLayer.addChild(this.text);
        setTimeout( function(){changeState(StateLeftOrRight)}, 5000 );
    },
    onExit : function(){
        console.log('StateWin.onExit');
        game.textLayer.removeChild( this.text );
    }
};

var StateLoose = {
    name : 'StateLoose',
    text : null,
    onEnter : function(){
        console.log('StateLoose.onEnter');
        game.score --;
        if( game.score < 0 ) {
            game.score = 0;
        }
        game.scoreText.setString( 'Score: ' + game.score );
        
        var size = cc.winSize;
        if( this.text == null ) {
            this.text = new cc.LabelTTF('YOU LOOSE', 'Arial', 5);
            this.text.setPosition(size.width / 2, size.height / 2);
        }
        game.textLayer.addChild(this.text);
        setTimeout( function(){changeState(StateLeftOrRight)}, 3000 );
    },
    onExit : function(){
        console.log('StateLoose.onExit');
        game.textLayer.removeChild( this.text );
    }
};

var StateDraw = {
    name : 'StateDraw',
    text : null,
    onEnter : function(){
        console.log('StateDraw.onEnter');
        var size = cc.winSize;
        if( this.text == null ){
            this.text = new cc.LabelTTF( 'DRAW', 'Arial', 5 );
            this.text.setPosition( size.width/2, size.height/2);
        }
        game.gameLayer.addChild(this.text);
        setTimeout( function(){changeState(StateLeftOrRight)}, 5000 );
    },
    onExit : function(){
        console.log('StateDraw.onExit');
        game.textLayer.removeChild( this.text );
    }
};

function changeState(  next )
{
    console.log( 'changeState');
    if( game.state != null ){
        console.log( 'game.currentState: ' + game.state.name );
    }
    if( next != null ){
        console.log( 'next: ' + next.name );
    }

    if( game.state != null ) {
        game.state.onExit();
    }
    game.state = next;
    if( game.state != null ) {
        game.state.onEnter();
    }
}


