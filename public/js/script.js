(function() {
  var CoachPerf;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  CoachPerf = (function() {
    function CoachPerf(opts) {
      this.init_canvas();
      this.p = paper;
      this.p.setup(this.canvas[0]);
      this.v = paper.view;
      this.setup();
      this.v.onFrame = this.draw;
    }
    CoachPerf.prototype.init_canvas = function(canvas_id) {
      this.canvas = this.create_canvas(canvas_id || 'paper_canvas');
      this.resize_canvas();
      return $(window).resize(__bind(function() {
        return this.resize_canvas;
      }, this));
    };
    CoachPerf.prototype.create_canvas = function(canvas_id) {
      var canvas;
      canvas = $("<canvas id='" + canvas_id + "' resize></canvas>");
      canvas.appendTo($('body'));
      return canvas;
    };
    CoachPerf.prototype.resize_canvas = function() {
      this.canvas.width($(window).width());
      return this.canvas.height($(window).height());
    };
    CoachPerf.prototype.setup = function() {
      var center, hex, radius;
      center = this.v.center;
      radius = this.v.size.width / 6;
      hex = new this.p.Path.RegularPolygon(center, 6, radius);
      hex.fillColor = new this.p.GrayColor(0.8);
      console.log("hex", hex);
      return this.v.draw();
    };
    CoachPerf.prototype.draw = function(event) {};
    return CoachPerf;
  })();
  $(document).ready(function() {
    return this.coach_perf = new CoachPerf();
  });
}).call(this);
