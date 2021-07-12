let scrolly = d3.select("#scrollableSection_supply");
let figure = scrolly.select("figure");
let charts = figure.select("#supplyChart");
let article = scrolly.select("article");
let step = article.selectAll(".step");
var offsetHeight = 0.8;
var downAndUp;
var prev_cur_index = 0;
var cur_index = 0;
const image_svg = {
  0: "supply_01",
  1: "supply_02"
}

//set original <article></article> position
var scrollEl_sup = $('#sup_step');
var singleStepHeight_sup = d3.select('#sup_step_0').node().getBoundingClientRect().height;

var windowWidth = Math.max(document.body.scrollWidth, document.body.offsetWidth, document.documentElement.clientWidth, document.documentElement.scrollWidth, document.documentElement.offsetWidth);
var windowHeight = Math.min(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);

//console.log(windowWidth);
//console.log(windowHeight);

if( windowWidth <= 600){
  scrollEl_sup.css('margin-top', -(windowHeight + singleStepHeight_sup)/3 + 'px');
} else {
  scrollEl_sup.css('margin-top', -(windowHeight + singleStepHeight_sup)/2 + 'px');
}


//set original chart to the first chart
$('.img_svg_supply').attr("src", "../img/svgChart/" + image_svg[cur_index] + ".svg");

//add event listener to both pc and mobile devices
document.getElementById("supply_scrolly").addEventListener('wheel', getIndex, {passive: true});
document.getElementById("supply_scrolly").addEventListener('touchstart', getIndex, {passive: true});
document.getElementById("supply_scrolly").addEventListener('touchend', getIndex, {passive: true});
document.getElementById("supply_scrolly").addEventListener('touchmove', getIndex, {passive: true});

function getIndex(e) {
  if (e.deltaY < 0) {
    downAndUp = "down";
  } else if (e.deltaY > 0) {
    downAndUp = "up"; 
  }

  var scrollEl_sup = $('#sup_step');
  var scrollTop_sup = scrollEl_sup.position().top - 20;
  var index = [0, 1];
  if(windowWidth <= 600){
    var i = Math.floor((windowHeight - scrollTop_sup + windowHeight/3)/ windowHeight);
  } else {
    var i = Math.floor((windowHeight- scrollTop_sup + windowHeight/2)/ windowHeight);
  }
  

if(index.includes(i)){
  cur_index = i;
  if(prev_cur_index !== cur_index){
    // $('.img_svg_supply').fadeTo(500,0.30, function() {
    //   $('.img_svg_supply').attr("src", "../img/svgChart/" + image_svg[cur_index] + ".svg");
    // }).fadeTo(1000,1);
    $('.img_svg_supply').attr("src", "../img/svgChart/" + image_svg[cur_index] + ".svg");
  }
} else {
  cur_index = 0;
}
prev_cur_index = cur_index;
}

// initialize the scrollama
var scroller = scrollama();

// generic window resize listener event
function handleResize() {
  // 1. update height of step elements
  var stepH = Math.floor(window.innerHeight * 0.9);
  step.style("height", stepH + "px");

  var figureHeight = window.innerHeight;
  var figureMarginTop = 0;

  figure
    .style("height", figureHeight + "px")
    .style("top", figureMarginTop + "px");

  // 3. tell scrollama to update new element dimensions
  scroller.resize();
}

// scrollama event handlers
function handleStepEnter(response) {

  if (downAndUp != null) {
    response.direction = downAndUp;
  }

  step.classed("is-active", function (d, i) {
    return i === response.index;
  });

  // update graphic based on step, if the current background image != the previous image
  cur_index = response.index;
  $('.img_svg_supply').attr("src", "../img/svgChart/" + image_svg[cur_index] + ".svg");
}

function setupStickyfill() {
  d3.selectAll(".sticky").each(function () {
    Stickyfill.add(this);
  });
}

function init() {
  setupStickyfill();

  // 1. force a resize on load to ensure proper dimensions are sent to scrollama
  handleResize();

  // 2. setup the scroller passing options
  // 		this will also initialize trigger observations
  // 3. bind scrollama event handlers (this can be chained like below)
  scroller
    .setup({
      step: "#scrollableSection_supply article .step",
      offset: offsetHeight,
      debug: false
    })
    .onStepEnter(handleStepEnter);

  // setup resize event
  window.addEventListener("resize", handleResize);
}
// kick things off
init();