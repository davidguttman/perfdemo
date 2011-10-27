(function() {
  var CoachPerf;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  CoachPerf = (function() {
    function CoachPerf(opts) {
      this.draw = __bind(this.draw, this);
      this.mouse_move = __bind(this.mouse_move, this);      this.init_canvas();
      this.set_config();
      this.p = paper;
      this.p.setup(this.canvas[0]);
      this.v = paper.view;
      this.setup();
      this.v.onFrame = this.draw;
      this.tool = new this.p.Tool;
      this.tool.onMouseMove = this.mouse_move;
    }
    CoachPerf.prototype.set_config = function() {
      this.dot_radius = 10;
      return this.mat_color = '#333';
    };
    CoachPerf.prototype.mouse_move = function(event) {
      console.log("event", event);
      return this.mouse_point = event.point;
    };
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
      this.df1 = this.draw_dot_field();
      this.df2 = this.draw_dot_field();
      return this.v.draw();
    };
    CoachPerf.prototype.draw_dot_row = function(n, y, r, even) {
      var dot, i, i2, row_dots, x;
      row_dots = [];
      for (i = 1; 1 <= n ? i <= n : i >= n; 1 <= n ? i++ : i--) {
        i2 = i - n / 2;
        x = r * i;
        if (even) {
          x -= 0.50 * r;
        }
        dot = new this.p.Path.Circle([x, y], this.dot_radius);
        row_dots.push(dot);
      }
      return row_dots;
    };
    CoachPerf.prototype.draw_dot_field = function(offset) {
      var bg, dot, dot_field, dot_field_r, even, field_dots, h, hn, i, r, row_dots, vd, vn, w, y, _i, _len;
      w = this.v.size.width * 1.20;
      h = this.v.size.height;
      bg = new this.p.Path.Rectangle([0 - (0.1 * w), 0], [w, w]);
      bg.fillColor = this.mat_color;
      hn = 20;
      r = w / 20;
      vd = r / 4;
      vn = Math.floor(w / vd);
      field_dots = [bg];
      for (i = 1; 1 <= vn ? i <= vn : i >= vn; 1 <= vn ? i++ : i--) {
        y = i * vd;
        if (i % 2 === 0) {
          even = true;
        } else {
          even = false;
        }
        row_dots = this.draw_dot_row(hn, y, r, even);
        for (_i = 0, _len = row_dots.length; _i < _len; _i++) {
          dot = row_dots[_i];
          field_dots.push(dot);
        }
      }
      dot_field = new this.p.CompoundPath(field_dots);
      dot_field_r = dot_field.rasterize();
      dot_field.remove;
      return dot_field_r;
    };
    CoachPerf.prototype.draw = function(event) {
      var center;
      center = this.mouse_point || this.v.center;
      return this.df2.rotate(0.1, center);
    };
    return CoachPerf;
  })();
  $(document).ready(function() {
    return this.coach_perf = new CoachPerf();
  });
}).call(this);
