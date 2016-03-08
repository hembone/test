<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Test Page</title>
<script>
    window.pAsyncInit = function() {
        PDK.init({
            appId: "4822219281081058781",
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
</script>
</head>
<body>




<script>
PDK.request('/v1/me/pins/', function (response) { // Make sure to change the board_id
    console.log(response);
    if (!response || response.error) {
        alert('Error occurred');
    } else {
        
        if (response.hasNext) {
            response.next(); // this will recursively go to this same callback
        }
    }
});
</script>
</body>
</html>
