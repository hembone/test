<h2>Index.php</h2>

<?php

define("MONGO_DBHOST", "localhost");
define("MONGO_DBNAME", "paccar");
define("MONGO_DBUSER", "");
define("MONGO_DBPASS", "");

require_once 'mongoHelper_class.php';

$mongodb = new mongoHelper();


$multiplier = 0.000621371192;
$latitude = 41.878114;
$longitude = -87.629798;
$filters = array(
    'Oil Change'
);
$brand = 'kw';


if(!empty($filters)) {
    $service_filters[] = array('brand' => $brand);
    foreach($filters as $filter) {
        $service_filters[] = array('services' => array(
            '$in' => array($filter)
        ));
    }
    $filters_query = array('$and' => $service_filters);
} else {
	$filters_query = array('brand' => $brand);
}

$query = array(
    'geoNear' => 'dealers'
    ,'near' => array(
        'type' => 'Point'
        ,'coordinates' => array(floatval($longitude), floatval($latitude))
    )
    ,'maxDistance' => 321869 // 200 miles converted to meters
    ,'distanceMultiplier' => $multiplier
    ,'spherical' => true
    ,'query' => $filters_query
    ,'num' => 1000
);
$res = $mongodb->command($query);


echo '<pre>'.print_r($filters_query, true).'</pre>';
echo '<pre>'.print_r($res, true).'</pre>';


?>