<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>slider</title>

<link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans">
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
		<input id="slide2_title" name="slide2_title" value="Built to Last">
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
		,autoPlayDelay: 4000
		//,animateStartingFrameIn: true
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

});
</script>
</body>
</html>
