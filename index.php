<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Test Page</title>

<style media="screen">
#options {
    display: none;
}
.pin {
    height: 160px;
}
</style>

</head>
<body>

<button id="pinterest">Pinterest</button>
<button id="logout">Logout</button>

<div id="options">
    <button id="pins">Pins</button>
    <button id="boards">Boards</button>
</div>
<div id="container"></div>

<script src="//assets.pinterest.com/sdk/sdk.js"></script>
<script src="//code.jquery.com/jquery-1.12.0.min.js"></script>
<script>
PDK.init({appId: "4822219281081058781", cookie: true});
var pin = {
    accessToken : '',
    userData : '',
    login : function() {
        PDK.login({scope: 'read_public'}, function(res) {
            // console.log(res);
            if(typeof res.error != 'undefined') {
                console.log(res.error);
            } else {
                if(typeof res.session != 'undefined') {
                    console.log('successfully logged in');
                    pin.accessToken = res.session.accessToken;
                    pin.getUserData();
                    $('#options').show();
                } else {
                    console.log('empty');
                }
            }
        });
    },
    getSession : function() {
        var res = PDK.getSession();
        // console.log(res);
        if(typeof res != 'undefined') {
            console.log('already logged in');
            pin.accessToken = res.accessToken;
            pin.getUserData();
            $('#options').show();
        } else {
            pin.login();
        }
    },
    logout : function() {
        PDK.logout();
    },
    getPins : function() {
        $('#container').html('');
        PDK.request('/me/pins/', {fields: 'image'}, function(res) {
            // console.log(res);
            if(!res || res.error) {
                console.log('Error occurred');
            } else {
                pin.displayPins(res.data);
            }
        });
    },
    getBoardPins : function(board) {
        $('#container').html('');
        PDK.request('/boards/'+pin.userData.username+'/'+board+'/pins/', {fields: 'image'}, function(res) {
            // console.log(res);
            if(!res || res.error) {
                console.log('Error occurred');
            } else {
                pin.displayPins(res.data);
            }
        });
    },
    displayPins : function(data) {
        var html = '';
        $.each(data, function(idx, val) {
            html += '<img class="pin" src="'+val.image.original.url+'"/>';
        });
        $('#container').html(html);
    },
    getBoards : function() {
        $('#container').html('');
        PDK.request('/me/boards/', function(res) {
            // console.log(res);
            if(!res || res.error) {
                console.log('Error occurred');
            } else {
                pin.displayBoards(res.data);
            }
        });
    },
    getUserData : function() {
        PDK.request('/me/', {fields: 'username'}, function(res) {
            // console.log(res);
            if(!res || res.error) {
                console.log('Error occurred');
            } else {
                pin.userData = res.data;
            }
        });
    },
    displayBoards : function(data) {
        var html = '';
        $.each(data, function(idx, val) {
            html += '<div class="board">'+val.name+'</div>';
        });
        $('#container').html(html);
    },
};
$(function() {
    $('#pinterest').on('click', function() {
        pin.getSession();
    });
    $('#logout').on('click', function() {
        pin.logout();
    });
    $('#pins').on('click', function() {
        pin.getPins();
    });
    $('#boards').on('click', function() {
        pin.getBoards();
    });
    $(document).on('click', '.board', function() {
        var board = this.innerHTML;
        pin.getBoardPins(board);
    });
});
</script>
</body>
</html>
