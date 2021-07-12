// new fullpage('#fullpage', {
// 	//options here
//     menu: '#menu',
//     lockAnchors: true,
// 	anchors:['firstPage', 'secondPage'],
// 	navigation: true,
// 	navigationPosition: 'right',
// 	navigationTooltips: ['firstSlide', 'secondSlide'],
// 	autoScrolling:true,
// 	scrollHorizontally: true,
//     licenseKey: ' GNU GPL license v3',
//     sectionsColor: ['yellow', 'orange', '#C0C0C0', '#ADD8E6'],
//     parallax: true,
//     scrollOverflowReset: true,
// });

var myFullpage = new fullpage('#fullpage', {
	//Navigation
	menu: '#menu',
	lockAnchors: true,
	anchors:['firstPage', 'secondPage'],
	navigation: true,
	navigationPosition: 'right',
	navigationTooltips: ['firstSlide', 'secondSlide', 'thirdSlide'],
	showActiveTooltip: true,
	slidesNavigation: true,
	slidesNavPosition: 'bottom',

	//Scrolling
	css3: true,
	scrollingSpeed: 700,
	autoScrolling: true,
	fitToSection: true,
	fitToSectionDelay: 1000,
	scrollBar: true,
	easing: 'easeInOutCubic',
	easingcss3: 'ease',
	loopBottom: true,
	loopTop: true,
	loopHorizontal: true,
	continuousVertical: true,
	continuousHorizontal: true,
	scrollHorizontally: true,
	interlockedSlides: true,
	dragAndMove: true,
	offsetSections: true,
	resetSliders: true,
	fadingEffect: true,
	normalScrollElements: '#element1, .element2',
	scrollOverflow: true,
	scrollOverflowReset: true,
	scrollOverflowOptions: null,
	touchSensitivity: 15,
	bigSectionsDestination: null,

	//Accessibility
	keyboardScrolling: true,
	animateAnchor: true,
	recordHistory: true,

	//Design
	controlArrows: true,
	verticalCentered: true,
	sectionsColor : ['#ccc', '#aaa'],
	paddingTop: '3em',
	paddingBottom: '10px',
	fixedElements: '#header, .footer',
	responsiveWidth: 0,
	responsiveHeight: 0,
	responsiveSlides: true,
	parallax: true,
	parallaxOptions: {type: 'reveal', percentage: 62, property: 'translate'},
	dropEffect: true,
	dropEffectOptions: { speed: 2300, color: '#F82F4D', zIndex: 9999},
	waterEffect: true,
	waterEffectOptions: { animateContent: true, animateOnMouseMove: true},
	cards: true,
	cardsOptions: {perspective: 100, fadeContent: true, fadeBackground: true},

	//Custom selectors
	sectionSelector: '.section',
	slideSelector: '.slide',

	lazyLoading: true,

	//events
	onLeave: function(origin, destination, direction){},
	afterLoad: function(origin, destination, direction){},
	afterRender: function(){},
	afterResize: function(width, height){},
	afterReBuild: function(){},
	afterResponsive: function(isResponsive){},
	afterSlideLoad: function(section, origin, destination, direction){},
	onSlideLeave: function(section, origin, destination, direction){}
});