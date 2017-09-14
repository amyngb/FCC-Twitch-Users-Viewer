// ********** DOCUMENT READY *************
$(document).ready(function() {
    
    // triangleDrop();
    getProfile();
    clickMenu();

}); 

// ********** GET AND STORE DATA **************
var twitchApi = 'https://wind-bow.gomix.me/twitch-api/';
var channels = 'channels/';
var stream = 'streams/';
var twitchUsers = ['ESL_SC2', 'thijshs', 'Freecodecamp', 'Sacriel', 'Ninja', 'Drdisrespectlive', 'Andymilonakis'];

   
function getProfile(){
    //put each user into an object
    twitchUsers.forEach(function(user){
        $.getJSON(twitchApi + stream + user + '?callback=?', function(response){
            var display_name = '';
            var game = '';
            var logo = '';
            var url = '';
            console.log(response);
            if (response.stream !== null) {
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
                    game = titleCase(path.game);
                }
                if (path.hasOwnProperty('url')) {
                    url = path.url;
                }
                displayActiveUser(display_name, user, game, logo, url);  
                
            } else {
                getInactiveDeets (user);  
                
            }
                        
        });
    });
}

function getInactiveDeets (user ) {
    // $.getJSON('https://api.twitch.tv/kraken/' + channels + user + '?client_id=9f7hqzad8a9ubdh9zh2diahxalczpm&callback=?', function(response)
    $.getJSON(twitchApi + channels + user + '?callback=?', function(response)
     {
        var user = user;
        var name = '';
        var logo = '';
        var url = '';
        var display_name = '';
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
            
            displayInactiveUser(user, display_name, name, logo, url);
        } 
    });
}

// ********* MODIFY UI ***********

function displayActiveUser(display_name, name, game, logo, url) {  
    $(".displayUser").before('<div class ="row justify-content-center activeUser" id = "' + name + '"><div class="userDeets col-9"><a class="link-unstyled" href="'+ url + '" target = "_blank"><div class ="row"><div class="col-2"> <img class="userIcon" src = "' + logo + '"> </div> <div class="col-8"> <h5 class="userName text-left">' + display_name + '</h5> </div>  <div class="col-2"> <i class="userStatus fa fa-2x fa-check" aria-hidden="true"></i> </div>        </div> <div class="row"> <div class="col-2"></div> <div class="col-10">                 <p class="userStreaming text-left">' + game + '</p> </div> </div> </a> </div></div>' );

}

function displayInactiveUser (user, display_name, name, logo, url) {
    $(".displayUser").before('<div class ="row justify-content-center inactiveUser" id = "' + name + '"><div class="userDeets col-9"><a class="link-unstyled"href="'+ url + '" target = "_blank"><div class ="row"><div class="col-2"> <img class="userIcon" src = "' + logo + '"> </div> <div class="col-8"> <h5 class="userName text-left">' + display_name + '</h5> </div>  <div class="col-2"> <i class="userStatus fa fa-2x fa-exclamation" aria-hidden="true"></i> </div> </div> </div> </a> </div>' );
    
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

function titleCase(str) {
    
    str = str.toLowerCase().split(' ');
   
    str = str.map(function (word) {
      return word.replace(word[0], word[0].toUpperCase());
    });
     
    return str.join(" ");
  }