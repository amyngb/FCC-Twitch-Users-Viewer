$(document).ready(function() {

// triangle dropdown menus
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

}); 