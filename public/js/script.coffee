class CoachPerf
  
  constructor: (opts) ->
    @canvas = @create_canvas 'paper_canvas'
    paper.setup @canvas
    @setup()
    @view = paper.view
    @view.onFrame = @draw
    
  create_canvas: (canvas_id) ->
    canvas = $("<canvas id='#{canvas_id}' resize></canvas>")
    canvas.appendTo $('body')
    canvas.width $(window).width()
    canvas.height $(window).height()
    return canvas[0]

  setup: ->
    path = new paper.Path();
    console.log "path", path
    # Give the stroke a color
    path.strokeColor = 'black';
    start = new paper.Point(100, 100);
    # Move to start and draw a line from there
    path.moveTo(start);
    # Note that the plus operator on Point objects does not work
    # in JavaScript. Instead, we need to call the add() function:
    path.lineTo(start.add([ 200, -50 ]));
    # Draw the view now:
    paper.view.draw();
    
  draw: (event) ->
    console.log "event", event
  
$(document).ready ->
  @coach_perf = new CoachPerf()