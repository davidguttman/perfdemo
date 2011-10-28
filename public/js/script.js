(function() {
  var CoachPerf;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  CoachPerf = (function() {
    CoachPerf.prototype.url_opts = function() {
      var opts;
      return opts = {
        hn: 'number of holes in a row',
        dot_radius: 'the radius of each dot',
        r_speed: 'rotation_speed'
      };
    };
    function CoachPerf(opts) {
      this.draw = __bind(this.draw, this);
      this.mouse_move = __bind(this.mouse_move, this);      this.init_canvas();
      $(window).bind('hashchange', __bind(function() {
        return this.set_url_config(true);
      }, this));
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
      this.hn = 10;
      this.dot_radius = 20;
      this.r_speed = 0.1;
      return this.set_url_config();
    };
    CoachPerf.prototype.set_url_config = function(reload) {
      var arg, args, hash, key, kv, val, valid_keys, _i, _len;
      valid_keys = _.keys(this.url_opts());
      hash = _.ltrim(window.location.hash, ['#', '/']);
      args = hash.split(',');
      for (_i = 0, _len = args.length; _i < _len; _i++) {
        arg = args[_i];
        kv = arg.split(':');
        key = kv[0];
        val = parseFloat(kv[1]);
        console.log("key", key);
        console.log("val", val);
        if (_.include(valid_keys, key)) {
          console.log("Setting '" + key + "' to " + val);
          this[key] = val;
        }
      }
      if (reload) {
        return this.constructor();
      }
    };
    CoachPerf.prototype.mouse_move = function(event) {
      return this.mouse_point = event.point;
    };
    CoachPerf.prototype.init_canvas = function(canvas_id) {
      $('body').empty();
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
      this.df1 = this.draw_dot_field('#111');
      return this.df2 = this.df1.clone();
    };
    CoachPerf.prototype.draw_dot_row = function(x_start, n, y, r, even) {
      var dot, dr, i, row_dots, x;
      row_dots = [];
      for (i = 1; 1 <= n ? i <= n : i >= n; 1 <= n ? i++ : i--) {
        if (this.dot_radius > 1) {
          dr = this.dot_radius;
        } else {
          dr = this.dot_radius * r / 4;
        }
        x = r * i + x_start - (4 * dr);
        if (even) {
          x -= 0.50 * r;
        }
        dot = new this.p.Path.Circle([x, y], dr);
        row_dots.push(dot);
        this.dots_rendered += 1;
      }
      return row_dots;
    };
    CoachPerf.prototype.draw_dot_field = function(color) {
      var bg, dot, dot_field, dot_field_r, even, field_dots, h, hn, i, max_dimension, r, row_dots, vd, vn, w, x_start, y, y_start, _i, _len;
      w = this.v.size.width;
      h = this.v.size.height;
      if (w > h) {
        max_dimension = w;
      } else {
        max_dimension = h;
      }
      x_start = (w - max_dimension) / 2;
      y_start = (h - max_dimension) / 2;
      bg = new this.p.Path.Rectangle([x_start, y_start], [max_dimension, max_dimension]);
      hn = this.hn;
      r = max_dimension / hn;
      vd = r / 4;
      vn = Math.floor(max_dimension / vd);
      field_dots = [bg];
      this.total_dots = vn * hn;
      this.dots_rendered = 0;
      for (i = 1; 1 <= vn ? i < vn : i > vn; 1 <= vn ? i++ : i--) {
        y = i * vd + y_start;
        if (i % 2 === 0) {
          even = true;
        } else {
          even = false;
        }
        row_dots = this.draw_dot_row(x_start, hn, y, r, even);
        for (_i = 0, _len = row_dots.length; _i < _len; _i++) {
          dot = row_dots[_i];
          field_dots.push(dot);
        }
        console.log("Rendering: " + this.dots_rendered + "/" + this.total_dots + " (" + (100 * this.dots_rendered / this.total_dots) + "%)");
      }
      console.log("Creating compound path...");
      dot_field = new this.p.CompoundPath(field_dots);
      console.log("Creating compound path COMPLETE");
      dot_field.fillColor = color;
      console.log("Rasterizing...");
      dot_field_r = dot_field.rasterize();
      console.log("Rasterizing COMPLETE");
      dot_field.remove();
      return dot_field_r;
    };
    CoachPerf.prototype.draw = function(event) {
      return this.df2.rotate(this.r_speed, this.df2.center);
    };
    return CoachPerf;
  })();
  $(document).ready(function() {
    return this.coach_perf = new CoachPerf();
  });
}).call(this);
