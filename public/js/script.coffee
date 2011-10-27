class CoachPerf
  
  constructor: (opts) ->
    @init_canvas()
    
    @p = paper
    @p.setup @canvas[0]

    @v = paper.view

    @setup()
    @v.onFrame = @draw

    @tool = new @p.Tool
    @tool.onMouseMove = @mouse_move
    
  mouse_move: (event) =>
    console.log "event", event
    @mouse_point = event.point
    
    
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
    @df1 = @draw_dot_field()
    @df2 = @draw_dot_field()
    @v.draw()
    
  draw_dot_row: (n, y, r, even) ->
    row_dots = []
    
    for i in [1..n]
      x = r*i 
      
      if even
        x -= 0.50*r
      
      dot = new @p.Path.Circle [x, y], 5
      dot.fillColor = 'white'
      row_dots.push dot
    
    return row_dots
    
  draw_dot_field: (offset) ->
    w = @v.size.width
    h = @v.size.height

    hn = 20
    r = w/20
    
    vd = r/4
    
    vn = Math.floor h/vd
    
    field_dots = []
    
    for i in [1..vn]
      y = i*vd
      
      if i % 2 is 0
        even = true
      else
        even = false

      row_dots = @draw_dot_row hn, y, r, even
      for dot in row_dots
        field_dots.push dot

    dot_field = new @p.Group field_dots
    return dot_field
  
  draw: (event) =>
    center = @mouse_point or @v.center
    @df2.rotate 0.1, center
  
$(document).ready ->
  @coach_perf = new CoachPerf()