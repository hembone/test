<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Testing</title>
<link rel="stylesheet" href="agegate.css">
<link rel="stylesheet" href="main.css">
</head>
<body>
<div>
<!--///////////////////////////////////////-->
<?php

// staging
// define("RAPP_KEY", "2iDV9QHK9wY2GqOHl9A6AUTb3eIcdTm8");
// define("RAPP_API_URL", "http://staging.registration.cinq.io:80/api/v1");

// pro
// define("RAPP_KEY", "EKJ38VzRgxkOTY0wve1EY1K9NVjvRoi3");
// define("RAPP_API_URL", "http://registration.cinq.io/api/v1");
//
// $apiData = array(
//     'media_id' => 170
//     ,'status' => 'approved'
// );
// $ch = curl_init();
// curl_setopt($ch, CURLOPT_URL, RAPP_API_URL.'/user/status');
// curl_setopt($ch, CURLOPT_POST, count($apiData));
// curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($apiData));
// curl_setopt($ch, CURLOPT_HTTPHEADER, array('Accept: application/json'));
// curl_setopt($ch, CURLOPT_HTTPHEADER, array('x-api-key: '.RAPP_KEY));
// curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
// curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
// curl_setopt($ch, CURLOPT_VERBOSE, true);
// $jsonData = curl_exec($ch);
// curl_close($ch);
// $res = json_decode($jsonData);
//
// echo '<pre>'.print_r($res,true).'</pre>';

//$jsonData = '{"requestId":"e93aa9c5-4a04-4f93-ad46-abb6e2699af7","responses":[{"recipientSendId":"e93aa9c5-4a04-4f93-ad46-abb6e2699af7","hasErrors":false,"messages":["Queued"]}]}';
$jsonData = '<html><head><title>502 Bad Gateway</title></head><body bgcolor="white"><center><h1>502 Bad Gateway</h1></center><hr><center>nginx/1.6.2</center></body></html>';
//$jsonData = '';
// $res = json_decode($jsonData);
// echo '<pre>'.print_r($res,true).'</pre>';
//
// if(empty($res) || $res->responses[0]->hasErrors) {
//     echo 'failed';
//
//     $to = 'jason.hemmy@fcb.com';
//     $subject = 'RAPP API Down '.date("Y-m-d H:i:s");
//     $message = "The RAPP API is down!\r\n";
//     $message .= "Last Response:\r\n";
//     $message .= $jsonData."\r\n";
//     $headers = 'From: MeowMix <admin@irresistiblemoments.com>' . "\r\n";
//     mail($to, $subject, $message, $headers);
//
// }

?>



<!--///////////////////////////////////////-->
</div>
<script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
<script src="agegate.js"></script>
<script src="main.js"></script>
</body>
</html>
