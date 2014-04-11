<h2>Index.php</h2>

<?php

define("SA_DB_HOST", "72.3.232.199");
define("SA_DB_NAME", "vtest8Dev");
define("SA_DB_USER", "CustDev");
define("SA_DB_PASS", "cdpass1");


$serverName = SA_DB_HOST;
$connectionInfo = array("Database"=>SA_DB_NAME, "UID"=>SA_DB_USER, "PWD"=>SA_DB_PASS);
$conn = sqlsrv_connect($serverName, $connectionInfo);

if($conn) {
	echo 'Connection established.<br />';
}else{
	echo 'Connection could not be established.<br />';
	die('<pre>'.print_r(sqlsrv_errors(), true).'</pre>');
}

$sql = "spUserGetMaxId";
$params = array();

$stmt = sqlsrv_query($conn, $sql, $params);
if($stmt === false) {
	die( print_r(sqlsrv_errors(), true));
}

while($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
	echo '<pre>'.print_r($row, true).'</pre>';
}

sqlsrv_free_stmt($stmt);

?>