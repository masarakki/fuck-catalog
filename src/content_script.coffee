$("<button>").text("show/hide header").prependTo($("body")).on 'click', ->
  $(".m-header").toggle()
$(".m-header").hide()
$(".m-headitem").hide()
$(".m-pr").hide()
$(".m-section2-head").hide()

$("<button>").text("show/hide filter").prependTo($(".m-area")).on 'click', ->
  $("#view-filter").parent().toggle()
$(".m-area > .m-section2:eq(0) > div:eq(0)").hide()
$(".m-area > .m-section2:eq(0) > div:eq(1)").hide()
$(".m-footer").hide()


circles = $(".cut-tile")
current = 0

pagination = {}
for link in $(".m-pagination-nav > a")
  pagination['next'] = $(link).attr('href') if $(link).text() == '次>'
  pagination['prev'] = $(link).attr('href') if $(link).text() == '<前'


$("body").on 'keyup',  (e) ->
  key_code = e.which
  key_code = String.fromCharCode e.which unless key_code >= 37 && key_code <= 40
  switch key_code
    when "N"
      move_next()
    when "P"
      move_prev()
    when "J", "S", 40
      move_next()
    when "K", "W", 38
      move_prev()
    when "H", "A", 37
      move_cursor -1 # "left"
    when "L", "D", 39
      move_cursor +1 # "right"
  checker_event(e)

move_next = ->
  window.location = pagination['next'] if pagination['next']

move_prev = ->
  window.location = pagination['prev'] if pagination['prev']

cursor = ->
  $(".cut-tile").css("border-color", "#030404")
  $(circles[current]).css("border-color", "#ff0000")

move_cursor = (dir) ->
  current += dir
  return move_prev() if current < 0
  return move_next() if current >= circles.length
  cursor()

checker_event = (e) ->
  key = e.which
  if 49 <= key && key <= 57 # number
    change_color(key - 48)
    e.preventDefault()
    e.stopPropagation()

change_color = (color) ->
  $("input[name='favorite-color'][value='#{color}']").click()

circles.on 'click', (e) ->
  window.open $(e.target).parent().attr('href') if $(e.target).parent().attr('href')
  e.preventDefault()

cursor()
