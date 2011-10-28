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
    @df2 = @df1.clone()
    
  draw_dot_row: (x_start, n, y, r, even) ->
    row_dots = []
    
    for i in [1..n]
      if @dot_radius > 1
        dr = @dot_radius
      else
        dr = @dot_radius * r/4
      
      x = r*i + x_start - dr
      
      if even
        x -= 0.50*r
      
      dot = new @p.Path.Circle [x, y], dr
      
      row_dots.push dot
      @dots_rendered += 1
    
    return row_dots
    
  draw_dot_field: (color) ->
    w = @v.size.width
    h = @v.size.height
    if w > h
      max_dimension = w
    else
      max_dimension = h

    
    x_start = (w-max_dimension)/2
    y_start = (h-max_dimension)/2
    
    bg = new @p.Path.Circle @v.center, max_dimension
    # bg = new @p.Path.Rectangle [x_start, y_start], [max_dimension,max_dimension]
    # console.log "color", color
    # bg.fillColor = color

    hn = @hn
    r = max_dimension/hn
    
    vd = r/4
    
    vn = Math.floor max_dimension/vd
    
    field_dots = [bg]
    
    @total_dots = vn*hn
    @dots_rendered = 0
    
    console.log "Rendering #{@total_dots} dots..." 
    for i in [1...vn]
      y = i*vd + y_start
      
      if i % 2 is 0
        even = true
      else
        even = false

      row_dots = @draw_dot_row x_start, hn, y, r, even
      for dot in row_dots
        field_dots.push dot

      # console.log "Rendering: #{@dots_rendered}/#{@total_dots} (#{100*@dots_rendered/@total_dots}%)"

    console.log "Rendering dots COMPLETE"
    console.log "Creating compound path..."
    dot_field = new @p.CompoundPath field_dots
    console.log "Creating compound path COMPLETE"
    dot_field.fillColor = color
    
    console.log "Rasterizing..." 
    dot_field_r = dot_field.rasterize()
    console.log "Rasterizing COMPLETE" 
    dot_field.remove()
    return dot_field_r
  
  draw: (event) =>
    # center = @mouse_point or @v.center
    @df2.rotate @r_speed, @df2.center
  
$(document).ready ->
  @coach_perf = new CoachPerf()