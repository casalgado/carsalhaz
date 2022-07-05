speed = 20000;

move = function () {
  $("#img-one").animate({ left: "-3463" }, speed, "linear", reset);
};

reset = function () {
  $("#img-one").animate({ left: "0" }, 1, "linear", move);
};

$(document).ready(function () {
  move();
});

$(".button").click(function () {
  $("#thoughts > img").attr({
    src: "images/waves/waves-" + this.id + ".jpg",
  });
});
