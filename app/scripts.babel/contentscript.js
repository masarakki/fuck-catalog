import $ from 'jquery';

$("<button>").text("show/hide header").prependTo($("body")).on('click', () => {
  $(".m-header").toggle();
});
$(".m-header").hide();
$(".m-headitem").hide();
$(".m-pr").hide();
$(".m-section2-head").hide();

$("<button>").text("show/hide filter").prependTo($(".m-area")).on('click', () => {
  $("#view-filter").parent().toggle();
});
$(".m-area > .m-section2:eq(0) > div:eq(0)").hide();
$(".m-area > .m-section2:eq(0) > div:eq(1)").hide();
$(".m-footer").hide();

const circles = $(".cut-tile");
let current = 0;

let pagination = {};
$(".m-pagination-nav > a").each((idx, link) => {
  if ($(link).text() == '次>') {
    pagination['next'] = $(link).attr('href');
  }
  if ($(link).text() == '<前') {
    pagination['prev'] = $(link).attr('href');
  }
});

$("body").on('keydown', e => {
  let keyCode = e.which;
  if (!(keyCode >= 37 && keyCode <= 40)) {
    keyCode = String.fromCharCode(keyCode);
  }
  switch(keyCode) {
  case "N":
    move_next();
    break;
  case "P":
    move_prev();
    break;
  case "J":
  case "S":
  case 40:
    move_next();
    break;
  case "K":
  case "W":
  case 38:
    move_prev();
    break;
  case "H":
  case "A":
  case 37:
    move_cursor(-1); // left
    break;
  case "L":
  case "D":
  case 39:
    move_cursor(+1); // right
    break;
  }
  checker_event(e);
});

$('body').on('keyup', e => {
  const key = e.which;
  if (49 <= key && key <= 57) { // number
    e.preventDefault();
    e.stopPropagation();
  }
});

const move_next = () => {
  if (pagination['next']) {
    window.location = pagination['next'];
  }
};

const move_prev = () => {
  if (pagination['prev']) {
    window.location = pagination['prev'];
  }
};

const cursor = () => {
  $(".cut-tile").css("border-color", "#030404");
  $(circles[current]).css("border-color", "#ff0000");
};

const move_cursor = (dir) => {
  current += dir;
  if (current < 0) {
    return move_prev();
  }
  if (current >= circles.length) {
    return move_next();
  }
  cursor();
};

const checker_event = (e) => {
  const key = e.which;
  if (49 <= key && key <= 57) { // number
    change_color(key - 48);
  }
};

const change_color = (color) => {
  $(`input[name='favorite-color'][value='${color}']`).click();
};

circles.on('click', 'a', (e) => {
  window.open($(e.currentTarget).attr('href'));
  e.preventDefault();
});

cursor();
