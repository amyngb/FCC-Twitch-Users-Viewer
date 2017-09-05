// ********** DOCUMENT READY *************
$(document).ready(function() {
    triangleDrop();
    apiCall();
    
    
   

}); 

// ********** GET DATA **************
function apiCall(){
    $.ajax({
        url: 'https://api.twitch.tv/kraken/streams/freecodecamp' ,
        headers: {
        "Client-ID": 'amyngb',
        },
        success: function(json){
            console.log(json);
        }
    });
        
        
}



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