<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Greensock</title>
<style>
#blue {
	width: 60px;
	height: 60px;
	margin: 100px auto;
	background: blue;
	border-radius: 4px;
	position: relative;
}
</style>
</head>
<body>
<button id="spin">Spin</button>
<button id="flip">Flip</button>
<button id="grow">Grow</button>
<button id="shrink">Shrink</button>

<div id="blue"></div>

<script src="//code.jquery.com/jquery-2.1.1.min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/gsap/latest/TweenMax.min.js"></script>
<script>
$(function() {
	$('#spin').on('click', function() {
		TweenLite.to('#blue', 1, {
			rotationY: 180
			,onComplete: function() {
				TweenLite.to('#blue', 0, {
					clearProps: 'transform'
				});
			}
		});
	});
	$('#flip').on('click', function() {
		TweenLite.to('#blue', 1, {
			rotationX: 180
			,onComplete: function() {
				TweenLite.to('#blue', 0, {
					clearProps: 'transform'
				});
			}
		});
	});
	$('#grow').on('click', function() {
		var width = $('#blue').width();
		var height = $('#blue').height();
		TweenLite.to('#blue', 1, {
			width: width+40
			,height: height+40
		});
	});
	$('#shrink').on('click', function() {
		var width = $('#blue').width();
		var height = $('#blue').height();
		TweenLite.to('#blue', 1, {
			width: width-40
			,height: height-40
		});
	});
});
</script>
</body>
</html>