<?php
require_once('libs/configs.php');

//echo'<pre>'.print_r($_SERVER,true).'</pre>';

$id = (isset($_GET['id'])?$_GET['id']:false);
if($_SERVER['REQUEST_METHOD'] === 'POST') {
	if($id) {
		$db->update_block($id, $_POST);
	} else {
		$db->create_block($_POST);
	}
	header("Location: http://".$_SERVER['HTTP_HOST']."/manage.php");
	die();
}
$block_title = 'New Block';
if($id) {
	$block = $db->get_block_by_id($id);
	$block_title = $block['name'];
}

$title = ($id?'Edit Block':'New Block');
require('layouts/top.php');
require('layouts/header.php');
require('layouts/nav.php');
?>

<h2><?php echo $block_title; ?></h2>

<form id="block_form" method="post" action="">
	<input type="text" name="name" value="<?php echo (isset($block['name'])?$block['name']:''); ?>">
	<textarea name="code"><?php echo (isset($block['code'])?$block['code']:''); ?></textarea>
	<button type="submit">Save</button>
</form>

<?php
require('layouts/footer.php');
require('layouts/bottom.php');
?>
