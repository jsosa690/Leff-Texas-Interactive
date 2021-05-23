
 // using d3 for convenience
 var main = d3.select("main");
 var scrolly = main.select("#scrolly");
 var figure = scrolly.select("figure");
 var article = scrolly.select("article");
 var step = article.selectAll(".step");

 const image = {
   0: "intro_1",
   1: "intro_2",
   2: "intro_3",
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
   console.log(response);
   console.log(response.direction);
   // response = { element, direction, index }

   // add color to current step only
   step.classed("is-active", function(d, i) {
     return i === response.index;
   });

   // update graphic based on step
   var index = response.index; 
   $('figure').css("backgroundImage", "url(" + "images/" + image[index] + ".jpeg" + ")")
   console.log(image[response.index]);
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