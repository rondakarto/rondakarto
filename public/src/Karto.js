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
            g_gameLayer.removeChild(this.statText);
        }
        if( order == 0 ) {
            this.initWithFile ( res.back );
            this.statText = null;
            this.stat = null;
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

            var st,stt;
            var str = typeof( d[g_event] )
            if( str === 'number'){
                st = d[g_event];
                stt = st;
            }
            else {
                st = d[g_event].value;
                stt = d[g_event].name;
            }
            this.stat = st;
            this.statText = new cc.LabelTTF( stt, 'Arial', 16 );
            g_gameLayer.addChild( this.statText );
            this.statText.setPosition( x, y );
        }

    }


});


