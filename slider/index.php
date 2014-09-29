<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>slider</title>
</head>
<body>


<div id="sequence">
    <ul class="sequence-canvas">
        <li>
            <!--Frame 1 content here-->
        </li>
        <li>
            <!--Frame 2 content here-->
        </li>
        <li>
            <!--Frame 3 content here-->
        </li>
    </ul>
</div>


<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
<script src="jquery.sequence-min.js"></script>
<script type="text/javascript">
    $(document).ready(function(){
        var sequence = $("#sequence").sequence().data("sequence");
    });
</script>
</body>
</html>
