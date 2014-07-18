<h2>Index.php</h2>

<?php

define("MONGO_DBHOST", "localhost");
define("MONGO_DBNAME", "paccar");
define("MONGO_DBUSER", "");
define("MONGO_DBPASS", "");

require_once 'mongoHelper_class.php';

$db = new mongoHelper();

$res = $db->geoNear('hours', -87.629798, 41.878114);




echo '<pre>'.print_r($res, true).'</pre>';


?>