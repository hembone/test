<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>slider</title>

<link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
<style>
#sequence {
	height: 370px;
	width: 600px;
	overflow: hidden;
	margin: 10px auto;
	position: relative; /* required */
}
#sequence > .sequence-canvas li > * {  /* required */
    position: absolute;
}
#sequence > .sequence-canvas { /* required */
	list-style-type: none;
	margin: 0;
	padding: 0;
    height: 100%; 
    width: 100%;
}
#sequence > .sequence-canvas > li { /* required */
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
}
.title {
	font-family: 'Open Sans', sans-serif;
	white-space: nowrap;
	color: #fff;
	text-shadow:2px 2px 2px #000;
	padding: 1% 2%;
	background: rgba(0, 0, 0, 0.3);
	z-index: 9999;
}
.title1
,.title2
,.title3 {
	opacity: 1;
	-ms-filter:"progid:DXImageTransform.Microsoft.Alpha"(Opacity=100);
	left: -600px;
    -webkit-transition-duration: 0.5s;
    -moz-transition-duration: 0.5s;
    -o-transition-duration: 0.5s;
    -ms-transition-duration: 0.5s;
    transition-duration: 0.5s;
}
.animate-in .title1
,.animate-in .title2
,.animate-in .title3 {
	left: 0;
    -webkit-transition-duration: 1.5s;
    -moz-transition-duration: 1.5s;
    -o-transition-duration: 1.5s;
    -ms-transition-duration: 1.5s;
    transition-duration: 1.5s;
}
.animate-out .title1
,.animate-out .title2
,.animate-out .title3 {
	opacity: 0.00;
	-ms-filter:"progid:DXImageTransform.Microsoft.Alpha"(Opacity=0);
	left: 600px;
    -webkit-transition-duration: 1s;
    -moz-transition-duration: 1s;
    -o-transition-duration: 1s;
    -ms-transition-duration: 1s;
    transition-duration: 1s;
}
.slide {

}
.slide1
,.slide2
,.slide3 {
    left: -600px;
    -webkit-transition-duration: 1s;
    -moz-transition-duration: 1s;
    -o-transition-duration: 1s;
    -ms-transition-duration: 1s;
    transition-duration: 1s;
}
.animate-in .slide1
,.animate-in .slide2
,.animate-in .slide3 {
    left: 0;
    -webkit-transition-duration: 1s;
    -moz-transition-duration: 1s;
    -o-transition-duration: 1s;
    -ms-transition-duration: 1s;
    transition-duration: 1s;
}
.animate-out .slide1
,.animate-out .slide2
,.animate-out .slide3 {
    left: 600px;
    -webkit-transition-duration: 1s;
    -moz-transition-duration: 1s;
    -o-transition-duration: 1s;
    -ms-transition-duration: 1s;
    transition-duration: 1s;
}
</style>

</head>
<body>

<div id="sequence">
	<ul class="sequence-canvas">
		<li class="animate-in">
			<h1 class="title title1">Kenworth Quality</h1>
			<div class="slide slide1">
				<img src="slide1.jpg">
			</div>
		</li>
		<li>
			<h1 class="title title2">Built to Last</h1>
			<div class="slide slide2">
				<img src="slide2.jpg">
			</div>
		</li>
		<li>
			<h1 class="title title3">Outstanding Support</h1>
			<div class="slide slide3">
				<img src="slide3.jpg">
			</div>
		</li>
	</ul>
</div>

<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="jquery.sequence-min.js"></script>
<script type="text/javascript">
	$(document).ready(function(){
		var options = {
			autoPlay: true
			,autoPlayDelay: 4000
			//,animateStartingFrameIn: true
		}
		var sequence = $("#sequence").sequence(options).data("sequence");
	});
</script>
</body>
</html>