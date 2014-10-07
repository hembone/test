<?php
require_once('libs/configs.php');
$title = 'Manage';
require('layouts/top.php');
require('layouts/header.php');
require('layouts/nav.php');
?>

<a href="edit-block">New Block</a>

<script>
$(function() {
	EB.init();
});
</script>

<?php
require('layouts/footer.php');
require('layouts/bottom.php');
?>