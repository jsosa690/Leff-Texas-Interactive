// using d3 for convenience

let scrolly2 = d3.select("#scrollableSection_demand");
let figure2 = scrolly2.select("figure");
let charts2 = figure2.select("#demandChart");
let article2 = scrolly2.select("article");
let step2 = article2.selectAll(".step");
var offsetHeight2 = 0.9;
var downAndUp;
var prev_cur_index2 = 0;
var cur_index2 = 0;

const image_svg2 = {
  0: "demand_01",
  1: "demand_02",
  2: "demand_03",
  3: "demand_04",
  4: "demand_05",
}

//set original <article></article> position
var scrollEl_dem = $('#dem_step');
var singleStepHeight_dem = d3.select('#dem_step_0').node().getBoundingClientRect().height;
scrollEl_dem.css('margin-top', -(window.innerHeight + singleStepHeight_dem) / 2 + 'px');

$('.img_svg_demand').attr("src", "../images2/svgChart/" + image_svg2[cur_index2] + ".svg");
document.getElementById("demand_scrolly").addEventListener('wheel', getIndex2, {
  passive: true
});

function getIndex2(e) {

  if (e.deltaY < 0) {
    downAndUp = "down";

  } else if (e.deltaY > 0) {
    downAndUp = "up";
  }

  var scrollEl_dem = $('#dem_step');
  var scrollTop_dem = scrollEl_dem.position().top - 20;
  var index2 = [0, 1, 2, 3, 4];
  var i2 = Math.floor((window.innerHeight - scrollTop_dem + window.innerHeight / 2) / window.innerHeight);


  console.log(scrollTop_dem);
  if (index2.includes(i2)) {
    cur_index2 = i2;
    if (prev_cur_index2 !== cur_index2) {

      // $('.img_svg_demand').fadeTo(500,0.30, function() {
      //     $('.img_svg_demand').attr("src", "../images2/svgChart/" + image_svg2[cur_index2] + ".svg");
      // }).fadeTo(1000,1);
      $('.img_svg_demand').attr("src", "../images2/svgChart/" + image_svg2[cur_index2] + ".svg");
    }
  } else {
    cur_index2 = 0;
  }
  prev_cur_index2 = cur_index2;
}
// initialize the scrollama
var scroller = scrollama();

// generic window resize listener event
function handleResize() {
  // 1. update height of step elements
  var stepH = Math.floor(window.innerHeight * 0.9);
  step2.style("height", stepH + "px");
  var figureHeight = window.innerHeight;
  var figureMarginTop = 0;

  figure2
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
  step2.classed("is-active", function (d, i) {
    return i === response.index;
  });
  cur_index2 = response.index;
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
      step: "#scrollableSection_demand article .step",
      offset: offsetHeight2,
      debug: false
    })
    .onStepEnter(handleStepEnter);

  // setup resize event
  window.addEventListener("resize", handleResize);
}
// kick things off
init();