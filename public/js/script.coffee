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
    center = @v.center
    radius = @v.size.width/6
    
    hex = new @p.Path.RegularPolygon center, 6, radius
    hex.fillColor = new @p.GrayColor 0.8
    console.log "hex", hex

    # Draw the view now:
    @v.draw()
    
  draw: (event) ->
    
  
$(document).ready ->
  @coach_perf = new CoachPerf()