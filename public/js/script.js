(function() {
  var CoachPerf;
  CoachPerf = (function() {
    function CoachPerf(opts) {
      this.canvas = this.create_canvas('paper_canvas');
      paper.setup(this.canvas);
      this.setup();
      this.view = paper.view;
      this.view.onFrame = this.draw;
    }
    CoachPerf.prototype.create_canvas = function(canvas_id) {
      var canvas;
      canvas = $("<canvas id='" + canvas_id + "' resize></canvas>");
      canvas.appendTo($('body'));
      canvas.width($(window).width());
      canvas.height($(window).height());
      return canvas[0];
    };
    CoachPerf.prototype.setup = function() {
      var path, start;
      path = new paper.Path();
      console.log("path", path);
      path.strokeColor = 'black';
      start = new paper.Point(100, 100);
      path.moveTo(start);
      path.lineTo(start.add([200, -50]));
      return paper.view.draw();
    };
    CoachPerf.prototype.draw = function(event) {
      return console.log("event", event);
    };
    return CoachPerf;
  })();
  $(document).ready(function() {
    return this.coach_perf = new CoachPerf();
  });
}).call(this);
