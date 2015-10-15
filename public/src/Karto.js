var Karto = cc.Sprite.extend({
    ctor:function(){
        this._super();
        this.initWithFile(res.back);
        //this.setScale(2);

    },
    left:null,
    level : null,
    statText : null,
    stat : null,
    change : function( order ){
        if(this.statText) {
            game.textLayer.removeChild(this.statText);
        }

        if( order == 0 ) {
            this.initWithFile ( res.back );
        }
        else {
            var d;
            var x, y;
            var size = cc.winSize;
            if( this.left ) {
                d = data[order-1];
                x = size.width/4;
                y = size.height/8 * 6;

            }
            else {
                d = data[order-1+Math.floor(data.length/2)];
                x = size.width/4*3;
                y = size.height/8 * 6;
            }
            this.initWithFile( res[ d.name ] );

            var stt;
            var type = typeof( d[game.event] );
            if( type === 'number'){
                this.stat = d[game.event];
                stt = this.stat.toString();
            }
            else {
                this.stat = d[game.event].value;
                stt = d[game.event].name;
            }

            if( this.statText == null ) {
                this.statText = new cc.LabelTTF( '', 'Arial', 16 );
            }
            this.statText.setString( stt );
            this.statText.setPosition( x, y );
            game.textLayer.addChild( this.statText );
        }

    }


});


