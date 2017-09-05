// ********** DOCUMENT READY *************
$(document).ready(function() {
    triangleDrop();

    $.ajax({
        url: 'https://api.twitch.tv/kraken/streams/freecodecamp?callback=?stream_type', 
        jsonp: false,
        jsonpCallback: 'logMe'
    });

    function logMe (data) {
        console.log(data);
    }
   

}); 

// ********** GET DATA **************


// ********* MODIFY UI ***********

    // Setup triangle dropdown menus
function triangleDrop() {
    $('#all').on('mouseenter', function(){
        $('#tri1 span').css('visibility', 'visible');
    });
    $('#all').on('mouseleave', function(){
        $('#tri1 span').css('visibility', 'hidden');
    });
    $('#online').on('mouseenter', function(){
        $('#tri2 span').css('visibility', 'visible');
    });
    $('#online').on('mouseleave', function(){
        $('#tri2 span').css('visibility', 'hidden');
    });

    $('#offline').on('mouseenter', function(){
        $('#tri3 span').css('visibility', 'visible');
    });
    $('#offline').on('mouseleave', function(){
        $('#tri3 span').css('visibility', 'hidden');
    });
}