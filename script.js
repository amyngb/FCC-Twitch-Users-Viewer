// ********** DOCUMENT READY *************
$(document).ready(function() {
    triangleDrop();
    apiCall();
    
    
   

}); 

// ********** GET AND STORE DATA **************
var twitchApi = 'https://api.twitch.tv/kraken/streams/'
var twitchUser = ['esl_sc2', 'freecodecamp', 'sacriel', 'ninja', 'drdisrespectlive', 'andymilonakis']
var twitchActive = [];
var twitchInactive = [];
function apiCall(){
    for (var i = 0; i < twitchUser.length; i++) {
        $.ajax({
            url: twitchApi +  twitchUser[i],
            headers: {
            "Client-ID": 'amyngb',
            },
            success: function(json){
                //put each user into an active or inactive object
                console.log(json);
                if (json.stream) {
                    var activeUser = {};
                    activeUser.userName = json.stream.channel.display_name;
                    activeUser.userIcon= json.stream.channel.logo;
                    activeUser.streamLink= json.stream.channel.url;
                    activeUser.streamDeets= json.stream.channel.game;
                    twitchActive.push(activeUser);
                }
                else {
                    var inactiveUser = {};
                    var inactiveUserUrl = json.
                    twitchInactive.push(inactiveUser);
                }
            }
        });
    }  
    console.log(twitchActive, twitchInactive);     
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