<?php

$debug = true;
$mysql = true;

if($mysql)
{
	define("MYSQL_HOST", "localhost");
	define("MYSQL_NAME", "email_builder");
	define("MYSQL_USER", "root");
	define("MYSQL_PASS", "root");
	require_once 'mysqlHelper_class.php';
	$db = new mysqlHelper();
}

if($debug)
{
	error_reporting(E_ALL);
	ini_set('display_errors', '1');
}

?>