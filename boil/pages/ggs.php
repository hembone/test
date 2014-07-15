<?php
$title = 'Home';
require('layouts/header.php');
?>

<header>
	<div class="wrapper">
		<h1>A Golden Demonstration</h1>
		<h2>
			Try resizing your browser or viewing this page on different devices. Use the icon in the upper right corner to see an overlay of the grid.
		</h2>
	</div>
</header>

<article id="twoway">
	<section class="wrapper">
		<h3>A two-way split</h3>
		<p>
			These two blocks of text will float side by side with some empty columns on the sides on large screens. On medium-sized screens the empty columns will disappear, and on small screens the blocks will be stacked vertically.
		</p>
	</section>
	<section class="wrapper">
		<h3>By the way</h3>
		<p>
			If you're viewing this page on an iOS device, it might zoom in wonkily when you rotate your device. This is because of <a href="http://filamentgroup.com/examples/iosScaleBug/">a Mobile Safari bug</a>.
		</p>
	</section>
</article>

<?php
require('layouts/footer.php');
?>