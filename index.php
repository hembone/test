<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Test Page</title>
</head>
<body>

<form id="demo_form" method="post" action="">

<div><input type="text" data-validate="required"/></div>

<div>
<input type="radio" name="color" value="red">Red<br/>
<input type="radio" name="color" value="blue">Blue
</div>

<button type="submit">Submit Form</button>

</form>


<script type="text/javascript" src="validate/jquery-1.11.1.min.js"></script>
<script type="text/javascript" src="validate/jquery.validate.js"></script>
<script>
$(function() {
    $('#demo_form').validate();
});
</script>
</body>
</html>