
    window.pAsyncInit = function() {
        PDK.init({
            appId: "4822219281081058781", // Change this
            cookie: true
        });
    };

    (function(d, s, id){
        var js, pjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//assets.pinterest.com/sdk/sdk.js";
        pjs.parentNode.insertBefore(js, pjs);
    }(document, 'script', 'pinterest-jssdk'));



// trigger login


$(function() {
    console.log( "ready!" );



    $( "#pin-login" ).click(function() {
      //alert( "Handler for .click() called." );
      PDK.login({scope : 'read_public'}, function(session) {
      if (!session) {
        alert('We need your permission to tell you which Valspar Color matches your pin.');
      } else {

        // can do things now

        console.log('Thanks for authenticating. Getting your information...');
        PDK.me(function(response) {
          if (!response || response.error) {
            alert('Oops, there was a problem getting your information');
          } else {
            console.log('Welcome,  ' + response.data.first_name + '!');
           $( "#welcome-msg" ).html( '<h1>Here are your pins, ' + response.data.first_name + '!</h1>  Click on a pin to get the pallete or find the Valspar Color match of anything in your pin.' );


           var params = {
              fields: 'id,note,link,image'
            };
            PDK.me('pins', params, function(response) {
              if (!response || response.error) {
                alert('Error occurred');
              } else {
                var pins = response.data;
                console.log(pins);

              $.each(pins, function(key, element) {
                  //alert('key: ' + key + '\n' + 'value: ' + element);
                  //$( "#pin-results" ).append( 'key: ' + key + '<br>' + 'value: ' + element + '<br><br>');
                  console.log(this.id);
                  console.log(this.link);
                  console.log(this.image.original.url);

                  $( "#pin-results" ).append('<img class="pinresult" src=' + this.image.original.url + '>');
              });

               $( "#grid" ).toggle();
               $( "#pin-login" ).toggle();

              }
            });

            // Acr5aowG3xXwtM0yAEZT1-vIxppoE_16vRiskIpCamsAfqAHeQAAAAA

            // https://api.pinterest.com/v1/me/search/pins/?query=cat&access_token=Acr5aowG3xXwtM0yAEZT1-vIxppoE_16vRiskIpCamsAfqAHeQAAAAA

            // pidgets/users/valsparpaint/pins/

            // known pin ID works /pins/101471797831496569/

            // users/genevievegorder/

            // sample board id  boards/101471866543275249/ 101471866543275249

            /// boards/101471866543275249/pins

            // search/pins/

            var params = {
              fields: 'id,note,link,image,created_at, color, media, attribution, metadata'
            };

            PDK.request('/pins/101471797831496569', params, function(response) { // Change this
              if (!response || response.error) {
                alert('Error occurred genevievegorder');
              } else {
                var user = response.data;
                console.log('gen:');
                console.log(user);
              }
            });



          }
        });
      }
    });


    });


});
