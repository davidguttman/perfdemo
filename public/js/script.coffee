class CoachPerf
  
  constructor: (opts) ->
    @init_canvas()
    
    @p = paper
    @p.setup @canvas[0]

    @v = paper.view

    @setup()
    @v.onFrame = @draw
    
  init_canvas: (canvas_id) ->
    @canvas = @create_canvas (canvas_id or 'paper_canvas')
    @resize_canvas()
    $(window).resize =>
      @resize_canvas
    
  create_canvas: (canvas_id) ->
    canvas = $("<canvas id='#{canvas_id}' resize></canvas>")
    canvas.appendTo $('body')
    return canvas
    
  resize_canvas: ->
    @canvas.width $(window).width()
    @canvas.height $(window).height()

  setup: ->    
    @draw_dot_field()
    @v.draw()
    
  draw_dot_row: (n, y, r, even) ->
    for i in [1..n]
      x = r*i 
      
      if even
        x -= 0.50*r
      
      circ = new @p.Path.Circle [x, y], 5
      circ.fillColor = 'white'
    
  draw_dot_field: (offset) ->
    w = @v.size.width
    h = @v.size.height

    hn = 20
    r = w/20
    
    vd = r/4
    
    vn = Math.floor h/vd
    
    for i in [1..vn]
      y = i*vd
      
      if i % 2 is 0
        even = true
      else
        even = false

      @draw_dot_row hn, y, r, even
  
  draw: (event) ->
    
  
$(document).ready ->
  @coach_perf = new CoachPerf()