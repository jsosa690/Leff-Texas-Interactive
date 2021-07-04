var touchStartY, touchEndY;
var scrollSpeed = 500;


const pageContainer = document.querySelector(".main");

pageContainer.addEventListener('wheel', scrollPage, {capture: false, passive: false});
pageContainer.addEventListener('touchstart', getTouchStartY, {capture: false, passive: false});
pageContainer.addEventListener('touchend', getTouchEndY, {capture: false, passive: false});
pageContainer.addEventListener('touchend', scrollPage, {capture: false, passive: false});
pageContainer.addEventListener('touchmove', event => { event.preventDefault();}, {capture: false, passive: false});
// document.querySelector(".main").addEventListener('mousewheel', scrollPage);
// document.querySelector(".main").addEventListener('DOMMouseScroll', scrollPage);
// document.querySelector(".main").addEventListener('onmousewheel', scrollPage);
// document.querySelector(".main").addEventListener('MozMousePixelScroll', scrollPage);
// document.querySelector(".main").addEventListener('touchmove', scrollPage);

function getTouchStartY(e){
    touchStartY = e.touches[0].pageY;
}
function getTouchEndY(e){
    touchEndY = e.changedTouches[0].pageY;
}

function scrollPage(e) {

    var nodesName = ['HEADER', 'SECTION', 'ASIDE'];
    var idName = ['supply_scrolly', 'demand_scrolly'];
    
    if (nodesName.includes(e.target.nodeName)) {
        var next = e.target.nextElementSibling, prev = e.target.previousElementSibling, cur = e.target;
    } else {
        var next = e.target.closest(nodesName).nextElementSibling, prev = e.target.closest(nodesName).previousElementSibling, cur = e.target.closest(nodesName);
    }
    var scrollableSection = 'ASIDE';
    var scrollableEls = [$('#scrollableSection_supply'), $('#scrollableSection_demand')];
    var index = idName.indexOf(cur.id);
    var scrollableEl = scrollableEls[index];
    
    var scrollTop, scrollInnerHeight, scrollHeight;
    if(scrollableEl != null){
        scrollTop = scrollableEl.scrollTop();
        scrollInnerHeight = scrollableEl.innerHeight();
        scrollHeight = scrollableEl[0].scrollHeight;
    }

    var touchDirection;
    if(touchStartY != null && touchEndY != null){
        // touchDirection < 0; --> endPoint above startPoint: page scroll down!
        // touchDirection >= 0; --> endPoint beneath startPoint: page scroll up!
        touchDirection = touchEndY - touchStartY;
    }

    if (e.deltaY < 0 || touchDirection >= 0) {
        // wheel scroll up --> page scroll down
        if (prev != null && nodesName.includes(prev.nodeName)) {
            if (cur.nodeName !== scrollableSection) {
                fullpageScrollUp();
            } else if (cur.nodeName === scrollableSection && scrollTop <= 0) {
                fullpageScrollUp();
                //console.log("top reach!");
            }
        }
        function fullpageScrollUp() {
            e.preventDefault();
            verticalScroll(prev, scrollSpeed * 0.7, 'easeInOutCubic');
            e.target.closest(nodesName).classList.remove('active')
            prev.classList.add('active')
        }

        // console.log("scroll up!!!");
        // console.log("ScrollBar_up " + scrollTop);
        // console.log("scrollInnerHeight " + scrollInnerHeight);
        // console.log("scrollHeight " + scrollHeight);

    } else if (e.deltaY > 0 || touchDirection < 0) {
        // wheel scroll down --> page scroll up
        if (next != null && nodesName.includes(next.nodeName)) {

            if (cur.nodeName !== scrollableSection) {
                fullpageScrollDown();
            } else if (cur.nodeName === scrollableSection && scrollTop + scrollInnerHeight >= scrollHeight) {
                fullpageScrollDown();
                //console.log("end reach!");
            }
        }
        function fullpageScrollDown() {
            e.preventDefault();
            verticalScroll(next, scrollSpeed, 'easeInOutQuad', runAfter);
            e.target.closest(nodesName).classList.remove('active');
            next.classList.add('active');
        }
        // console.log("scroll down!!!");
        // console.log("ScrollBar_down " + scrollTop);
        // console.log("scrollInnerHeight " + scrollInnerHeight);
        // console.log("scrollHeight " + scrollHeight);
    } else {
        return false;
    }
}

function runAfter() {
    //console.log('after');
}

function runBefore() {
    //console.log('before');
}

function verticalScroll(destination) {
    var duration = arguments.length <= 1 || arguments[1] === undefined ? 200 : arguments[1];
    var easing = arguments.length <= 2 || arguments[2] === undefined ? 'linear' : arguments[2];
    var callback = arguments[3];
    var easings = {
        easeInOutQuad: function easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        },
        easeInCubic(t) {
            return t * t * t;
        },
        easeInOutCubic(t) {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        }
    };

    var start = window.pageYOffset;
    var startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
    var documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
    var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
    var destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
    var destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

    console.log(documentHeight);
    if ('requestAnimationFrame' in window === false) {
        window.scroll(0, destinationOffsetToScroll);
        if (callback) {
            callback();
        }
        return;
    }

    function scroll() {
        var now = 'now' in window.performance ? performance.now() : new Date().getTime();
        var time = Math.min(1, (now - startTime) / duration);
        var timeFunction = easings[easing](time);

        window.scroll(0, Math.ceil(timeFunction * (destinationOffsetToScroll - start) + start));
        console.log("vertical scroll");
        if (window.pageYOffset === destinationOffsetToScroll) {
            if (callback) {
                callback();
            }
            return;
        }
        requestAnimationFrame(scroll);
    }

    scroll();
}

function createNav(){
    const pageNav = document.createElement('div');
    pageNav.className = 'nav-dot-container';
    pageContainer.appendChild(pageNav);
    for(let i = 0; i < 10; i++ ){
        pageNav.innerHTML += '<p class="nav-dot"><span></span></p>';
    }
    var navDots = document.getElementsByClassName('nav-dot');
    navDots = Array.prototype.slice.call(navDots);
    navDots[0].classList.add('dot-active');
    navDots.forEach((e, index) => {
        e.addEventListener('click', event => {

            //scrollTo(index + 1);

            navDots.forEach(e => {
                e.classList.remove('dot-active');
            });
            e.classList.add('dot-active');
        });
    });

}
createNav();