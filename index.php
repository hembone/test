<h2>Index.php</h2>

<?php

require_once 'myMongo_class.php';

$db = new myMongo();
$res = $db->query();

print_r($res);

?>