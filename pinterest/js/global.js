var colorThief = new ColorThief();

function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            //$('img').attr('src', e.target.result);
            var img = $('img').attr('src', e.target.result)[0];
      
            image.color = colorThief.getColor(img);
            image.palette = colorThief.getPalette(img);
      
            $('#palette div').css({
                background: function(){
                    var color = getValsparColor(image.color).color;
                    $('#palette div').attr('data-name',color.name);
                    return 'rgb('+color.r+','+color.g+','+color.b+')';
                }
            });
      
            $('#palette ul').each(function(){
                $(this).html('');
                var colors = getValsparColorPalette(image.palette);
                var output;
                for(i in colors){
                    console.log(i);
                    var color = colors[i].color;
                    $('<li />',{
                        'class': 'c'+i,
                        'data-name': color.name
                    }).css({
                        background: 'rgb('+color.r+','+color.g+','+color.b+')'
                    }).appendTo(this);
                }
            });
        }

        reader.readAsDataURL(input.files[0]);
    }
}

$("#upload").change(function(){
    readURL(this);
});

$(function() {
  
  $.ajax({
  	type: 'GET',
  	datatype: 'json',
  	url: 'color-wall.json'
  }).done(function(json){
  	var colors = typeof json == 'object'? json.data : JSON.parse(json).data;
    window.Colors = [];
    
    for(i in colors){
      var color = colors[i].colors;
      var len = color.length;
      var r,g,b;
      r=g=b=0;
      
      for(s in color){
        var c = color[s].rgb;
        Colors.push({
          name: color[s].name,
          r: c.r,
          g: c.g,
          b: c.b,
          difference: function(r,g,b){
            return Math.sqrt(Math.pow((this.r - r),2) + Math.pow((this.g - g),2) + Math.pow((this.b - b),2));
          },
          orig: color[s]
        })
        
      }
    }
    
    $('#imgwrap').fadeIn(function(){
      window.image = {};
      
      var img = $('img', this)[0]
      
      image.color = colorThief.getColor(img);
      image.palette = colorThief.getPalette(img);
      
      $('#palette div').css({
          background: function(){
              var color = getValsparColor(image.color).color;
              $('#palette div').attr('data-name',color.name);
              return 'rgb('+color.r+','+color.g+','+color.b+')';
          }
      });
      
      $('#palette ul').each(function(){
          $(this).html('');
          var colors = getValsparColorPalette(image.palette);
          var output;
          for(i in colors){
              console.log(i);
              var color = colors[i].color;
              $('<li />',{
                  'class': 'c'+i,
                  'data-name': color.name
              }).css({
                  background: 'rgb('+color.r+','+color.g+','+color.b+')'
              }).appendTo(this);
          }
      });
      
    });
    
  });
  
  
  
    
    $('img').on('click', function(e) {
        
      var width= $(this).width(),
          height = $(this).height();
        
        if(!this.canvas) {
            this.canvas = $('<canvas />')[0];
        }
        
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.getContext('2d').drawImage(this, 0, 0, width, height);
        
        window.colorMatch = {diff:null,color:null};
        var pixelData = this.canvas.getContext('2d').getImageData(event.offsetX, event.offsetY, 1, 1).data;
        var difference = Math.sqrt(Math.pow((244 - pixelData[0]),2) + Math.pow((151 - pixelData[1]),2) + Math.pow((135 - pixelData[2]),2));
        
        if(Colors.length) {
          for(i in Colors){
            var comp = Colors[i].difference(pixelData[0],pixelData[1],pixelData[2]);
            var diff = colorMatch.diff;
            if(diff==null || comp<diff) colorMatch.diff=comp,colorMatch.color=Colors[i];
          }
          
          var m = colorMatch.color;
          
          $('#color1').fadeIn().css('background','rgb('+m.r+','+m.g+','+m.b+')');
          
          $('#colorName').text(m.name);
          
        }
        
        var av = (pixelData[0]+pixelData[1]+pixelData[2])/3;
        
        //$('#output').html('R: ' + pixelData[0] + '<br>G: ' + pixelData[1] + '<br>B: ' + pixelData[2] + '<br>A: ' + pixelData[3] + '<br>Difference:' + difference);
        $('#color').css({
            background: 'rgba('+pixelData[0]+','+pixelData[1]+','+pixelData[2]+','+pixelData[3]/255+')',
            color: av>160? '#000':'#fff' 
        });
    
    
    });


});

function getValsparColor(a){
  if ( !Colors.length ) return 'Colors not loaded';
  
  var match = {diff:null,color:null};
  
  for(i in Colors){
    var comp = Colors[i].difference(a[0],a[1],a[2]);
    var diff = match.diff;
    if(diff==null || comp<diff) match.diff=comp,match.color=Colors[i];
  }
  
  return match;
  
}

function getValsparColorPalette(a){
  if ( !Colors.length ) return 'Colors not loaded';
  
  matches = {};
  
  for(i in a){
    matches[i] = getValsparColor( a[i] );
  }
  
  return matches;
  
}