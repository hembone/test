<?php

$src = 'scan_this';
$res = scandir($src);
$files = array();
foreach($res as $filename) {
	if($filename!='.' && $filename!='..') {
		$files[] = $filename;
	}
}
exit(json_encode($files));

?>