speed = 20000

move = function(){
   $('#img-one').animate({'left':'-3593'}, speed, 'linear', reset)
   $('#img-one').animate({'left':'-3593'}, 1, 'linear')
}

reset = function() {
   $('#img-one').animate({'left':'130'}, 1, 'linear', move)
   $('#img-two').animate({'left':'-7186'}, speed, 'linear')
}

$(document).ready( function() {
   move()
}); 

$(".button").click( function() {
   $('#thoughts > img').attr({
         'src':"images/waves/waves-" + (this).id + ".jpg"
      });
});  