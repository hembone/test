<?php

define("SA_DB_HOST", "72.3.232.199");
define("SA_DB_NAME", "vtest8Dev");
define("SA_DB_USER", "CustDev");
define("SA_DB_PASS", "cdpass1");

$dbconn = mssql_connect(SA_DB_HOST, SA_DB_USER, SA_DB_PASS);
if($dbconn) {
	echo 'success';
	//mssql_select_db(SA_DB_NAME, $dbconn);
} else {
	echo 'fail';
}



?>