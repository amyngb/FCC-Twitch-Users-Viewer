/********Protect keys********/
//SET ENV Variable so it exists even if a person doesn't include their credentials.

var env = {
    clientSecret:'',
    clientId: '',
    game_id: ''
};
// NOW  Import variables if present (from env.js)
if(window.__env) {
  Object.assign(env, window.__env);
}

// ********** GET AND STORE DATA **************
// var twitchApi = 'https://wind-bow.gomix.me/twitch-api/';
var streams_url = "https://api.twitch.tv/helix/streams?user_login=";
var games_url = 'https://api.twitch.tv/helix/games?id='
var user_url = 'https://api.twitch.tv/helix/users?login='
var twitchUsers = ['esl_sc2', 'thijshs', 'Freecodecamp', 'Sacriel', 'Ninja', 'Drdisrespectlive', 'Andymilonakis'];


// ********** DOCUMENT READY *************
$(document).ready(function() {
   
    getToken();

}); 

//*****Get Access Token*****
function getToken () {
    $.ajax({
        type: "POST",
        url: 'https://api.twitch.tv/kraken/oauth2/token?client_id=' + env.clientId 
        + '&client_secret=' + env.clientSecret 
        + '&grant_type=client_credentials',
        dataType: 'json',
        success: function (response) {
            access_token = response.access_token;
            getProfile(access_token);
            clickMenu();
        }
    })
}

function getProfile(access_token){
    //for each user
    twitchUsers.forEach(function(user){
        //get user info for online AND offline
        setTimeout(function() {
            var access_token = ''; 
            var display_name = '';
            var game = '';
            var logo = '';
            var url = '';
            var path;
            
            //get user info
            $.ajax({
                type: "GET",
                url: user_url + user, 
                dataType: 'json',
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Client-ID', env.clientId);
                    xhr.setRequestHeader('Authorization', 'Oauth' + access_token);
                },
                success: function (response) {
                    path = response.data[0];                                               
                    url = "https://www.twitch.tv/" + user;
                    if (path.hasOwnProperty('display_name')) {
                        display_name = path.display_name;  
                    }
                    if (path.hasOwnProperty("profile_image_url")){
                        logo = path.profile_image_url;                                
                    }  
                    
                    //get game info for streaming only
                    $.ajax({
                        type: "GET",
                        url: streams_url + user, 
                        dataType: 'json',
                        beforeSend: function (xhr) {
                            xhr.setRequestHeader('Client-ID', env.clientId);
                            xhr.setRequestHeader('Authorization', 'Oauth' + access_token);
                        },
                        success: function (response) {
                            //if user is streaming, get game
                            if (response.data.length !== 0) {
                                path = response.data[0];                                 
                                if (path.hasOwnProperty("game_id")){
                                    game_id = path.game_id;  
                                } 
                                //get game name from id       
                                $.ajax({
                                    type: "GET",
                                    url: games_url + game_id,
                                    dataType: 'json',
                                    beforeSend: function (xhr) {
                                        xhr.setRequestHeader('Client-ID', env.clientId);
                                        xhr.setRequestHeader('Authorization', 'Oauth' + access_token);
                                    },
                                    success: function (response) {
                                         path = response.data[0];                            
                                        if (path.hasOwnProperty("name")){
                                            game = path.name;                                
                                        }
                                        display_name = user;

                                        //*** Update Active UI ***//
 
                                        displayActiveUser(display_name, user, game, logo, url);
                                    }
                                })
                                
                            } else {
                            //*** Update Inactive UI ***//
                            
                                displayInactiveUser (display_name, name, logo, url);  
                    
                            } 
                        } //end success
                    }) //end ajax   
                } //end success
            }) //end ajax
        }, 3000) //end timeout
    }) //end forEach
} //end getProfile
                
             
 
function getUser () {

}

// ********* MODIFY UI ***********

function displayActiveUser(display_name, name, game, logo, url) {  
    $(".displayUser").before('<div class ="row justify-content-center activeUser" id = "' + name + '"><div class="userDeets col-11 col-md-9"><a class="link-unstyled" href="'+ url + '" target = "_blank"><div class ="row"><div class="col-2"> <img class="userIcon" src = "' + logo + '"> </div> <div class="col-8"> <h5 class="userName text-left">' + display_name + '</h5> </div>  <div class="col-2"> <i class="userStatus fa fa-2x fa-check" aria-hidden="true"></i> </div>        </div> <div class="row"> <div class="col-2"></div> <div class="col-10">                 <p class="userStreaming text-left">' + game + '</p> </div> </div> </a> </div></div>' );

}

function displayInactiveUser (display_name, name, logo, url) {
    $(".displayUser").before('<div class ="row justify-content-center inactiveUser" id = "' + name + '"><div class="userDeets col-11 col-md-9"><a class="link-unstyled"href="'+ url + '" target = "_blank"><div class ="row"><div class="col-2"> <img class="userIcon" src = "' + logo + '"> </div> <div class="col-8"> <h5 class="userName text-left">' + display_name + '</h5> </div>  <div class="col-2"> <i class="userStatus fa fa-2x fa-exclamation" aria-hidden="true"></i> </div> </div> </div> </a> </div>' );
    
}

function clickMenu() {
    $('#all').on('click', function(){
        //display users
        $('.inactiveUser').css("display", '');
        $('.activeUser').css("display", '');        
    });

    $('#online').on('click', function(){
        //display users
        $('.inactiveUser').css("display", "none");
        $('.activeUser').css("display", '');    
    });

    $('#offline').on('click', function(){
        //display users
        $('.activeUser').css("display", "none");
        $('.inactiveUser').css("display", '');      
    });
}

// function titleCase(str) {
    
//     str = str.toLowerCase().split(' ');
   
//     str = str.map(function (word) {
//       return word.replace(word[0], word[0].toUpperCase());
//     });
     
//     return str.join(" ");
//   }