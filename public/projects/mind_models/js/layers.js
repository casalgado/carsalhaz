colorIndex = 0;
colors = [
  "red",
  "green",
  "purple",
  "orange",
  "gray",
  "magenta",
  "lightblue",
  "darkgreen",
  "cyan",
  "blue",
];

$("#m-button").click(function () {
  $("#layer").animate(
    {
      opacity: ".6",
    },
    14000,
    "easeInQuart",
    function () {
      $("#layer").animate(
        {
          opacity: "1",
          height: "80px",
          width: "80px",
          top: "200px",
          left: "200px",
        },
        12000,
        "easeInBack",
        function () {
          setTimeout(function () {
            newLayer(colors[colorIndex % 10]);
            colorIndex += 1;
          }, 8000);
        }
      );
    }
  );
});

var newLayer = function (active_color) {
  $("#layer").css({
    width: "480px",
    height: "480px",
    top: "-10px",
    left: "-10px",
    opacity: "0",
    "background-color": active_color,
  });
};
