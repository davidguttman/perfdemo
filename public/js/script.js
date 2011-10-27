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
      this.draw_dot_field();
      return this.v.draw();
    };
    CoachPerf.prototype.draw_dot_row = function(n, y, r, even) {
      var circ, i, x, _results;
      _results = [];
      for (i = 1; 1 <= n ? i <= n : i >= n; 1 <= n ? i++ : i--) {
        x = r * i;
        if (even) {
          x -= 0.50 * r;
        }
        circ = new this.p.Path.Circle([x, y], 5);
        _results.push(circ.fillColor = 'white');
      }
      return _results;
    };
    CoachPerf.prototype.draw_dot_field = function(offset) {
      var even, h, hn, i, r, vd, vn, w, y, _results;
      w = this.v.size.width;
      h = this.v.size.height;
      hn = 20;
      r = w / 20;
      vd = r / 4;
      vn = Math.floor(h / vd);
      _results = [];
      for (i = 1; 1 <= vn ? i <= vn : i >= vn; 1 <= vn ? i++ : i--) {
        y = i * vd;
        if (i % 2 === 0) {
          even = true;
        } else {
          even = false;
        }
        _results.push(this.draw_dot_row(hn, y, r, even));
      }
      return _results;
    };
    CoachPerf.prototype.draw = function(event) {};
    return CoachPerf;
  })();
  $(document).ready(function() {
    return this.coach_perf = new CoachPerf();
  });
}).call(this);
