import $ from 'jquery';
import _ from 'lodash';
import keycode from 'keycode';

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

$("body").on('keydown', e => {
  const keyCode = keycode(e.which);
  switch(keyCode) {
  case 'n':
  case 'j':
  case 's':
  case 'down':
    moveNextPage();
    break;
  case 'k':
  case 'w':
  case 'up':
  case 'p':
    movePrevPage();
    break;
  case 'h':
  case 'a':
  case 'left':
    movePrevCircle();
    break;
  case 'l':
  case 'd':
  case 'right':
    moveNextCircle();
    break;
  }

  if (keyCode == 'esc') {
    checkCircle(0);
  } else {
    checkCircle(Number(keyCode));
  }
});

const moveTo = (text) => {
  const target = _.find($('.m-pagination-nav > a'), x => $(x).text() === text);
  if (target) {
    window.location = $(target).attr('href');
  }
};

const movePrevPage = () => moveTo('<前');

const moveNextPage = () => moveTo('次>');

const movePrevCircle = () => moveCursor(-1);

const moveNextCircle = () => moveCursor(1);

const renderCursor = () => {
  $(".cut-tile").css("border-color", "#030404");
  $(circles[current]).css("border-color", "#ff0000");
};

const moveCursor = (dir) => {
  current += dir;
  if (current < 0) {
    movePrevPage();
  } else if (current >= circles.length) {
    moveNextPage();
  } else {
    renderCursor();
  }
};

const addCheck = (target, color, current) => {
  const event = new Event('contextmenu');
  changeColor(color);
  target.dispatchEvent(event);
  if (current !== 0) {
    setTimeout(() => target.dispatchEvent(event),  100);
  }
};

const removeCheck = (target, current) => {
  const event = new Event('contextmenu');
  if (current !== 0) {
    target.dispatchEvent(event);
  }
};

const checkCircle = (color) => {
  if (!isNaN(color)) {
    const circle = $(circles[current]);
    const target = circles[current].getElementsByTagName('a')[0];
    const matches = $('.circlecut-overlay-favorite', circle).attr('class').match(/favorite-backgroundcolor-(.)/);

    const fav = matches ? Number(matches[1]) : 0;

    if (color === fav)
      return;
    if (color === 0) {
      removeCheck(target, fav);
    } else {
      addCheck(target, color, fav);
    }
  }
};

const changeColor = (color) => {
  $(`input[name='favorite-color'][value='${color}']`).click();
};

circles.on('click', 'a', (e) => {
  window.open($(e.currentTarget).attr('href'));
  e.preventDefault();
});

renderCursor();
