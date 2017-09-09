// ********** DOCUMENT READY *************
$(document).ready(function() {
    
    triangleDrop();
    getProfile();

}); 

// ********** GET AND STORE DATA **************
var twitchApi = 'https://wind-bow.gomix.me/twitch-api/';
var channels = 'channels/';
var stream = 'streams/';
var twitchUsers = ['ESL_SC2', 'thijshs', 'Freecodecamp', 'Sacriel', 'Ninja', 'Drdisrespectlive', 'Andymilonakis', 'asdlfjkalksd', 'storbeck'];

   
function getProfile(){
    //put each user into an object
    twitchUsers.forEach(function(user){
        $.getJSON(twitchApi + stream + user + '?callback=?', function(response){
            var display_name = '';
            var name = '';
            var game = '';
            var logo = '';
            var url = '';
            var user = user;
            console.log(response);
            if (response.stream) {
                var path = response.stream.channel;
                if (path.hasOwnProperty('name')){
                    name = path.name;
                }
                if (path.hasOwnProperty('display_name')){
                    display_name = path.display_name;
                }
                if (path.hasOwnProperty('logo')) {
                    logo = path.logo;
                }
                if (path.hasOwnProperty('game')){
                    game = path.game;
                }
                if (path.hasOwnProperty('url')) {
                    url = path.url;
                }
                displayUser(display_name, name, game, logo, url);  
                
            }
            
            else {
                getInactiveDeets (name);  
            }
        });
    });
}

function getInactiveDeets (name ) {
    $.$.getJSON('https://api.twitch.tv/kraken/streams/' + channel + '?client_id=9f7hqzad8a9ubdh9zh2diahxalczpm&callback=?', function(response)
    
     {
        var user = user;
        var name = '';
        var logo = '';
        var url = '';
        console.log(response);
        if (!response.hasOwnProperty('error')){
            if (response.hasOwnProperty('name')){
                name = response.name;
            }
            if (response.hasOwnProperty('logo')) {
                logo = response.logo;
            }
            if (response.hasOwnProperty('url')) {
                url = response.url;
            }
            if (response.hasOwnProperty('display_name')){
                display_name = response.display_name;
            }
            
            buildUserDisplay(user, display_name, name, logo, url);
        } 
    });
}


function getStreamStatus(user){
    $.getJSON(twitchApi + stream + user + '?callback=?', function(response){
        if (response.stream) {
            var game = '';
            var streamingStatus = '';
            var userName = '';
            if (response.hasOwnProperty('game')) {
                game = response.stream.channel.game;                 
            }
            var streamingStatus = 'active';  
        }
        else {
            streamingStatus = 'inactive';
        }    
         
        displayUser(user, game, streamingStatus);  
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


function displayUser(display_name, name, game, logo, url) {  
    $(".displayAfter").after('<div class ="row justify-content-center" id = "' + name + '"><div class="userDeets col-9"><a class="link-unstyled"href="'+ url + '" target = "_blank"><div class ="row"><div class="col-2"> <img class="userIcon" src = "' + logo + '"> </div> <div class="col-8"> <h5 class="userName text-left">' + display_name + '</h5> </div>  <div class="col-2"> <i class="userStatus fa fa-2x fa-check" aria-hidden="true"></i> </div>        </div> <div class="row"> <div class="col-2"></div> <div class="col-10">                 <p class="userStreaming text-left">' + game + '"</p>         </div> </div> </a> </div></div>' );

}

function buildUserDisplay (user, display_name, name, logo, url) {
    $(".displayAfter").after('<div class ="row justify-content-center" id = "' + name + '"><div class="userDeets col-9"><a class="link-unstyled"href="'+ url + '" target = "_blank"><div class ="row"><div class="col-2"> <img class="userIcon" src = "' + logo + '"> </div> <div class="col-8"> <h5 class="userName text-left">' + display_name + '</h5> </div>  <div class="col-2"> <i class="userStatus fa fa-2x fa-exclamation" aria-hidden="true"></i> </div> </div> </div> </a> </div>' );
    

}