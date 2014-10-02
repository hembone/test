<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>slider</title>

<link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Poiret+One|Lobster">
<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="main.css">

</head>
<body>

<div class="slide_controls">
	<i onclick="sequence.pause();" class="fa fa-pause"></i>&nbsp;&nbsp;&nbsp;&nbsp;<i onclick="sequence.unpause();" class="fa fa-play"></i>
</div>

<div id="sequence">
	<ul class="sequence-canvas">
		<li class="animate-in">
			<h1 class="title title1"></h1>
			<div class="slide slide1">
				<img src="slide1.jpg">
			</div>
		</li>
		<li>
			<h1 class="title title2"></h1>
			<div class="bullet_bg"></div>
			<div class="bullet bullet1"></div>
			<div class="bullet bullet2"></div>
			<div class="bullet bullet3"></div>
			<div class="slide slide2">
				<img src="slide2.jpg">
			</div>
		</li>
		<li>
			<h1 class="title title3"></h1>
			<div class="slide slide3">
				<img src="slide3.jpg">
			</div>
		</li>
	</ul>
</div>



<div class="input_fields">
	<div>
		<label>Slide 1 Title</label><br/>
		<input id="slide1_title" name="slide1_title" value="Kenworth Quality">
	</div>
	<div>
		<label>Slide 2 Title</label><br/>
		<input id="slide2_title" name="slide2_title" value="Built to Last"><br/><br/>
		<label>Bullet List</label><br/>
		<input id="bullet1_text" name="bullet1_text" value="Bullet point 1"><br/>
		<input id="bullet2_text" name="bullet2_text" value="Bullet point 2"><br/>
		<input id="bullet3_text" name="bullet3_text" value="Bullet point 3">
	</div>
	<div>
		<label>Slide 3 Title</label><br/>
		<input id="slide3_title" name="slide3_title" value="Outstanding Support">
	</div>
</div>

<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="jquery.sequence-min.js"></script>
<script type="text/javascript">
var sequence;
$(document).ready(function(){
	var options = {
		autoPlay: true
		//,autoPlayDelay: 4000
	}
	sequence = $("#sequence").sequence(options).data("sequence");

	$('.title1').html($('#slide1_title').val());
	$('.title2').html($('#slide2_title').val());
	$('.title3').html($('#slide3_title').val());
	$('#slide1_title').on('keyup blur', function() {
		$('.title1').html($(this).val());
	});
	$('#slide2_title').on('keyup blur', function() {
		$('.title2').html($(this).val());
	});
	$('#slide3_title').on('keyup blur', function() {
		$('.title3').html($(this).val());
	});
	$('.bullet1').html($('#bullet1_text').val());
	$('.bullet2').html($('#bullet2_text').val());
	$('.bullet3').html($('#bullet3_text').val());
	$('#bullet1_text').on('keyup blur', function() {
		$('.bullet1').html($(this).val());
	});
	$('#bullet2_text').on('keyup blur', function() {
		$('.bullet2').html($(this).val());
	});
	$('#bullet3_text').on('keyup blur', function() {
		$('.bullet3').html($(this).val());
	});

});
</script>
</body>
</html>
