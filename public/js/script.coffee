class CoachPerf
  
  url_opts: ->
    opts =
      hn: 'number of holes in a row'
      dot_radius: 'the radius of each dot'
      r_speed: 'rotation_speed'
  
  constructor: (opts) ->
    @init_canvas()
    $(window).bind 'hashchange', =>
      @set_url_config true
      
    @set_config()
    
    @p = paper
    @p.setup @canvas[0]

    @v = paper.view

    @setup()
    @v.onFrame = @draw

    @tool = new @p.Tool
    @tool.onMouseMove = @mouse_move
    
  set_config: ->
    @hn = 10
    @dot_radius = 20
    @r_speed = 0.1
    @set_url_config()
    
  set_url_config: (reload) ->
    valid_keys = _.keys @url_opts()
    
    hash = _.ltrim window.location.hash, ['#','/']
    args = hash.split ','
    for arg in args
      kv = arg.split ':'
      key = kv[0]
      val = parseFloat kv[1]
      console.log "key", key
      console.log "val", val
      if _.include valid_keys, key
        console.log "Setting '#{key}' to #{val}"
        this[key] = val
    
    @constructor() if reload
    
  mouse_move: (event) =>
    @mouse_point = event.point
    
  init_canvas: (canvas_id) ->
    $('body').empty()
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
    @df1 = @draw_dot_field '#111'
    @df2 = @draw_dot_field '#222'
    
  draw_dot_row: (n, y, r, even) ->
    row_dots = []
    
    for i in [1..n]
      x = r*i 
      
      if even
        x -= 0.50*r
      
      dot = new @p.Path.Circle [x, y], @dot_radius
      
      row_dots.push dot
    
    return row_dots
    
  draw_dot_field: (color) ->
    w = @v.size.width
    h = @v.size.height
    
    bg = new @p.Path.Circle @v.center, @v.size.height
    # console.log "color", color
    # bg.fillColor = color

    hn = @hn
    r = w/hn
    
    vd = r/4
    
    vn = Math.floor w/vd
    
    field_dots = [bg]
    
    for i in [1..vn]
      y = i*vd
      
      if i % 2 is 0
        even = true
      else
        even = false

      row_dots = @draw_dot_row hn, y, r, even
      for dot in row_dots
        field_dots.push dot

    dot_field = new @p.CompoundPath field_dots
    dot_field.fillColor = color
    
    dot_field_r = dot_field.rasterize()
    dot_field.remove()
    return dot_field_r
  
  draw: (event) =>
    # center = @mouse_point or @v.center
    @df2.rotate @r_speed, @df2.center
  
$(document).ready ->
  @coach_perf = new CoachPerf()