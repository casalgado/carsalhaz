offset = 0
var mouseX
var mouseY
var increase = 10


$(document).mousemove( function(e) {
   mouseX = e.pageX - 158 - offset; 
   mouseY = e.pageY - 60 - offset;
   $('#mind').css({'top':mouseY,'left':mouseX});
   $('#thoughts').css({'top':-mouseY,'left':-mouseX});
});  

$("#m-button").click( function() {
   $('#mind').animate({
   		'width':"+=" + increase,
   		'height':"+=" + increase
   	}, 1000, 'linear');
   offset += increase
});  






