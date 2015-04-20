<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Testing</title>
<link rel="stylesheet" href="main.css">
</head>
<body>
<div class="main_wrap">
<!--///////////////////////////////////////-->

<?php
if(isset($_GET['code'])) {

	$apiData = array(
		'grant_type' => 'authorization_code'
		,'client_id' => 'd1c028dbb8254ca889b337f530ba5997'
		,'client_secret' => 'afd53f5808624a9193871346e998399b'
		,'redirect_uri' => 'http://test.jasonhemmy.com/'
		,'code' => $_GET['code']
	);
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, 'https://api.instagram.com/oauth/access_token');
	curl_setopt($ch, CURLOPT_POST, count($apiData));
	curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($apiData));
	curl_setopt($ch, CURLOPT_HTTPHEADER, array('Accept: application/json'));
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	$jsonData = curl_exec($ch);
	curl_close($ch);
	$res = json_decode($jsonData);
	$access_token = $res->access_token;
	//echo '<pre>Token: '.print_r($res,true).'</pre>';


	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL, 'https://api.instagram.com/v1/users/self/feed?access_token='.$access_token);
	curl_setopt($ch, CURLOPT_HTTPHEADER, array('Accept: application/json'));
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	$jsonData = curl_exec($ch);
	curl_close($ch);
	$res = json_decode($jsonData);
	//echo '<pre>Feed: '.print_r($res,true).'</pre>';

	foreach($res->data as $data) {
		echo '<img src="'.$data->images->thumbnail->url.'"/>';
	}

}
?>
<!--
<form action="" method="post" enctype="multipart/form-data">
    Select image to upload:
    <input type="file" name="fileToUpload" id="fileToUpload">
    <input type="submit" value="Upload Image" name="submit">
</form>
-->
<br/><br/>

<div>
	<a href="https://api.instagram.com/oauth/authorize/?client_id=d1c028dbb8254ca889b337f530ba5997&redirect_uri=http://test.jasonhemmy.com/&response_type=code">Upload from Instagram</a>
</div>


<!--///////////////////////////////////////-->
</div>
<script src="main.js"></script>
</body>
</html>