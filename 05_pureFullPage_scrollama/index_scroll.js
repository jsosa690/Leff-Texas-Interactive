// using d3 for convenience

let scrolly = d3.select("#scrollableSection_supply");
let figure = scrolly.select("figure");
let charts = figure.select("#supplyChart");
let article = scrolly.select("article");
let step = article.selectAll(".step");
var offsetHeight = 0.9;
var downAndUp;
var prev_cur_index = 0;
var cur_index = 0;
const image_svg = {
  0: "supply_01",
  1: "supply_02"
}


$('.img_svg_supply').attr("src", "../images2/svgChart/" + image_svg[cur_index] + ".svg");

document.getElementById("supply_scrolly").addEventListener('wheel', getIndex, {passive: true});

function getIndex(e) {

  if (e.deltaY < 0) {
    downAndUp = "down";
  } else if (e.deltaY > 0) {
    downAndUp = "up";
  }
  // console.log(e.deltaY);
  
 
  var scrollEl = $('#sup_step');
  var scrollTop = scrollEl.position().top - 20;
  
  var index = [0, 1];

  var i = Math.floor((window.innerHeight - scrollTop)/ window.innerHeight);

  console.log("________________________")
  console.log(downAndUp);
  console.log(i);

if(index.includes(i)){
  cur_index = i;
  if(prev_cur_index !== cur_index){
    $('.img_svg_supply').fadeTo(500,0.30, function() {
      $('.img_svg_supply').attr("src", "../images2/svgChart/" + image_svg[cur_index] + ".svg");
    }).fadeTo(1000,1);
  }
} else {
  cur_index = 0;
}
prev_cur_index = cur_index;

//$('.img_svg_supply').attr("src", "../images2/svgChart/" + image_svg[cur_index] + ".svg");


  //console.log("cur_index: " + cur_index);
  //console.log(window.innerHeight);
  //console.log(scrollTop);
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
  //console.log("responseIndex " + response.index);
  //console.log("responseDirection " + response.direction);
  //console.log(response);
  //  console.log(response.direction);
  // response = { element, direction, index }
  // add color to current step only
  step.classed("is-active", function (d, i) {
    return i === response.index;
  });

  // update graphic based on step, if the current background image != the previous image

  cur_index = response.index;
  // if (image_png[pre_index] !== image_png[cur_index]){
  //  $('figure').css("backgroundImage", "url(" + "../images/" + image_png[cur_index] + ".png" + ")")
  // }
  // var pre_index = cur_index;
  // console.log("cur_index:" + cur_index);

  // update the chart based on step

  if (cur_index != null) {
    $('.img_svg').attr("src", "../images2/svgChart/" + image_svg[cur_index] + ".svg");
  } else {
    $('.img_svg').attr("src", "");
  }

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