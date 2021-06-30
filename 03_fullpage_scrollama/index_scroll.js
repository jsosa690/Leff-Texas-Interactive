// using d3 for convenience

let scrolly = d3.select("#scrolly");
let figure = scrolly.select("figure");
let charts = figure.select("#charts");
let article = scrolly.select("article");
let step = article.selectAll(".step");



const image_png = {
  0: "intro_1",
  1: "intro_2",
  2: "intro_3",
  3: "supply_bg",
  4: "supply_bg",
  5: "supply_bg",
  6: "demand_bg",
  7: "demand_bg",
  8: "demand_bg",
  9: "demand_bg",
  10: "demand_bg",
  11: "demand_bg"
}

const image_svg = {
 3: "03",
 4: "04",
 5: "05",
 6: "06",
 7: "07",
 8: "08",
 9: "09",
 10: "10",
 11: "11"
}


// initialize the scrollama
let scroller = scrollama();

// generic window resize listener event
function handleResize() {
  // 1. update height of step elements
  let stepH = Math.floor(window.innerHeight * 0.9);
  step.style("height", stepH + "px");

  let figureHeight = window.innerHeight;
  let figureMarginTop = 0;

  figure
    .style("height", figureHeight + "px")
    .style("top", figureMarginTop + "px");

  // 3. tell scrollama to update new element dimensions
  scroller.resize();
}

// scrollama event handlers
function handleStepEnter(response) {
 //  console.log(response);
 //  console.log(response.direction);
  // response = { element, direction, index }
  // add color to current step only
  step.classed("is-active", function(d, i) {
    return i === response.index;
  });

  // update graphic based on step, if the current background image != the previous image
  let cur_index = response.index; 
  // if (image_png[pre_index] !== image_png[cur_index]){
  //  $('figure').css("backgroundImage", "url(" + "images/" + image_png[cur_index] + ".png" + ")")
  // }
  // let pre_index = cur_index;
  console.log("cur_index:" + cur_index);

  // update the chart based on step


  
 
}

function setupStickyfill() {
  d3.selectAll(".sticky").each(function() {
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
      step: "#scrolly article .step",
      offset: 0.95,
      debug: true
    })
    .onStepEnter(handleStepEnter);

  // setup resize event
  window.addEventListener("resize", handleResize);
}

// kick things off
init();