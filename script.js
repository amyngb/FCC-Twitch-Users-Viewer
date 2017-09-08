// ********** DOCUMENT READY *************
$(document).ready(function() {
    
    triangleDrop();
    getProfile();

}); 

// ********** GET AND STORE DATA **************
// var twitchApi = 'https://api.twitch.tv/kraken/streams/'
var twitchApi = 'https://wind-bow.gomix.me/twitch-api/';
var channels = 'channels/';
var stream = 'streams/';
var twitchUsers = ['ESL_SC2', 'thijshs', 'Freecodecamp', 'Sacriel', 'Ninja', 'Drdisrespectlive', 'Andymilonakis'];

   
function getProfile(){
    //put each user into an object
    twitchUsers.forEach(function(user) {
        $.getJSON(twitchApi + channels + user + '?callback=?', function (response) { 
            var user = user;
            var status = '';
            if (response.hasOwnProperty('status')){
                if (response.status == 404){
                    return;
                }
            }
            console.log(response);
            var logo = '';
            var userName = '';
            if (response.hasOwnProperty("logo")) {
                logo = response.logo;                
            }
            if (response.hasOwnProperty("display_name")) {
                userName = response.display_name;  
            }          
            getStreamStatus(user);
            buildUserDisplay(user, userName, logo);
            
        });
    });
} 

function getStreamStatus(user){
    $.getJSON(twitchApi + stream + user + '?callback=?', function(response){
        if (response.stream) {
            var game = '';
            var streamingStatus = '';
            if (response.hasOwnProperty('game')) {
                game= response.stream.channel.game;                 
            }
            var streamingStatus = 'active';  
            displayUser(user);
        }
        else {
            streamingStatus = 'inactive';
        }     
        console.log(game);   
    });  
}           
       
    

 



// function apiCall(){
//     for (var i = 0; i < twitchUser.length; i++) {
//         $.ajax({
//             url: twitchApi + twitchUser[i],
//             headers: {
//             "Client-ID": 'amyngb',
//             },
//             success: function sortJson(json) {
//                 // console.log(json);
//                 if (json.stream) {
//                     var activeUser = {};
//                     activeUser.userName = json.stream.channel.display_name;
//                     activeUser.userIcon= json.stream.channel.logo;
//                     activeUser.streamLink= json.stream.channel.url;
//                     activeUser.streamDeets= json.stream.channel.game;
//                     twitchActive.push(activeUser);
//                 }                   
//             }          
//         });    
//     } 
       
// }  

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

function buildUserDisplay (user, userName, logo) {
    //insert html 
    $(".displayUser").append('<div class ="row justify-content-center" id="' + userName +'><div class="userDeets col-9"><div class="row"><div class="col-2"><i class="userIcon fa fa-2x fa-superpowers" aria-hidden="true"></i></div><div class="col-8"><h5 class="userName text-left">' + userName + '</h5></div><div class="col-2"><i class="userStatus fa fa-2x fa-exclamation" aria-hidden="true"></i></div></div></div></div>');

}
function displayUser (user) {
    //insert html user boxes

    
    //if active
    //if inactive

}