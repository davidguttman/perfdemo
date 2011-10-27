(function() {
  var create_canvas, initialize;
  create_canvas = function(canvas_id) {
    var canvas;
    canvas = $("<canvas id='" + canvas_id + "' resize></canvas>");
    canvas.appendTo($('body'));
    canvas.width($(window).width());
    canvas.height($(window).height());
    return canvas[0];
  };
  initialize = function() {
    var canvas, path, start;
    canvas = create_canvas('paper_canvas');
    paper.setup(canvas);
    path = new paper.Path();
    console.log("path", path);
    path.strokeColor = 'black';
    start = new paper.Point(100, 100);
    path.moveTo(start);
    path.lineTo(start.add([200, -50]));
    return paper.view.draw();
  };
  $(document).ready(initialize);
}).call(this);
