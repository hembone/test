<h2>Index.php</h2>

<?php

define("DBHOST", "localhost");
define("DBNAME", "testdb");
define("DBUSER", "");
define("DBPASS", "");

require_once 'mongoHelper_class.php';

$db = new mongoHelper();

$res = $db->get('items');
echo '<pre>'.print_r($res, true).'</pre>';


?>