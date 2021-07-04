const utils = {

    getDelta(e) {
        if (e.wheelDelta) {
            return e.wheelDelta;
        } else {
            return e.detail;
        }
    },
    throttle(method, delay, context) {
        let inThrottle = false;
        return function () {
            if (!inThrottle) {
                inThrottle = true;
                method.apply(context, arguments);
                setTimeout(() => {
                    inThrottle = false;
                }, delay);
            }
        }
    },
    debounce(method, delay, context) {
        let inDebounce;
        return function () {
            clearTimeout(method.inDebounce);
            inDebounce = setTimeout(() => {
                method.apply(context, arguments);
            }, delay);
        }
    }
}

class ScrollPages {

    constructor(currentPageNumber, totalPageNumber, pages, scrollSpeed) {
        this.currentPageNumber = currentPageNumber;
        this.totalPageNumber = totalPageNumber;
        this.pages = pages;
        this.viewHeight = document.documentElement.clientHeight;
        this.scrollSpeed = scrollSpeed;
    }

    getContainers(e) {
        let nodesName = ['HEADER', 'SECTION', 'ASIDE'];
        this.nodesName = Array.prototype.slice.call(nodesName);

        if (this.nodesName.includes(e.target.nodeName)) {
            this.nextContainer = e.target.nextElementSibling,
                this.prevContainer = e.target.previousElementSibling,
                this.curContainer = e.target;
        } else {
            this.nextContainer = e.target.closest(this.nodesName).nextElementSibling,
                this.prevContainer = e.target.closest(this.nodesName).previousElementSibling,
                this.curContainer = e.target.closest(this.nodesName);
        }

        //console.log(this.prevContainer);
    }

    getScrollableEl() {

        const idName = ['supply_scrolly', 'demand_scrolly'];

        const scrollableEls = [$('#scrollableSection_supply'), $('#scrollableSection_demand')];
        let index = idName.indexOf(this.curContainer.id);

        let scrollableEl = scrollableEls[index];

        this.scrollableSection = this.nodesName[2];

        if (scrollableEl != null) {
            this.scrollTop = scrollableEl.scrollTop();
            this.scrollInnerHeight = scrollableEl.innerHeight();
            this.scrollHeight = scrollableEl[0].scrollHeight;
        }
    }

    mouseScroll(e) {

        let delta = utils.getDelta(e);
        if (delta < 0) {
            this.navScrollDown();
            //this.scrollUp(e);
            
            console.log('scroll down!');
            console.log(this.nextContainer);
            console.log(this.currentPageNumber);
            //console.log(window.pageYOffset);

        } else {
            this.navScrollUp();
            //this.scrollDown(e);
            console.log('scroll up!');
            console.log(this.prevContainer);
            console.log(this.currentPageNumber);
            //console.log(window.pageYOffset);

        }
    }
    navScrollDown() {
        if (this.currentPageNumber !== this.totalPageNumber) {
            this.pages.style.top = (-this.viewHeight * this.currentPageNumber) + 'px';
            this.currentPageNumber++;
            this.updateNav();
            this.textFadeInOut();
        }
        console.log("navScrollDown_top: " + this.pages.style.top);
    }
    navScrollUp() {
        if (this.currentPageNumber !== 1) {
            this.pages.style.top = (-this.viewHeight * (this.currentPageNumber - 2)) + 'px';
            this.currentPageNumber--;
            this.updateNav();
            this.textFadeInOut();
        }
        console.log("navScrollUp_top: " + this.pages.style.top);
    }

    scrollUp(e) {
        this.getContainers(e);
        this.getScrollableEl();
        let cur = this.curContainer;
        let prev = this.prevContainer;
        let next = this.nextContainer;
        let scrollableSection = this.scrollableSection;
        let scrollTop = this.scrollTop;
        let scrollInnerHeight = this.scrollInnerHeight;
        let scrollHeight = this.scrollHeight;

        // wheel scroll up --> page scroll down 
        if (prev != null && this.nodesName.includes(prev.nodeName)) {
            if (cur.nodeName !== scrollableSection) {
                e.preventDefault();
                this.verticalScroll(prev, this.scrollSpeed * 0.7, 'easeInOutCubic');
                e.target.closest(this.nodesName).classList.remove('active')

                prev.classList.add('active')
                //console.log(e.target.closest(this.nodesNames));
            } else if (cur.nodeName === scrollableSection && scrollTop <= 0) {
                e.preventDefault();
                this.verticalScroll(prev, this.scrollSpeed * 0.7, 'easeInOutCubic');
                e.target.closest(this.nodesName).classList.remove('active')
                prev.classList.add('active')
                //console.log("top reach!");
            }
        }

        // function fullpageScrollDown() {
        //     e.preventDefault();
        //     this.verticalScroll(prev, this.scrollSpeed * 0.7, 'easeInOutCubic');
        //     e.target.closest(this.nodesNames).classList.remove('active')
        //     prev.classList.add('active')
        // }
    }

    scrollDown(e) {
        this.getContainers(e);
        this.getScrollableEl();
        let cur = this.curContainer;
        let prev = this.prevContainer;
        let next = this.nextContainer;
        let scrollableSection = this.scrollableSection;
        let scrollTop = this.scrollTop;
        let scrollInnerHeight = this.scrollInnerHeight;
        let scrollHeight = this.scrollHeight;

        // wheel scroll down --> page scroll up
        if (next != null && this.nodesName.includes(next.nodeName)) {

            if (cur.nodeName !== scrollableSection) {
                e.preventDefault();
                this.verticalScroll(next, this.scrollSpeed, 'easeInOutQuad');
                e.target.closest(this.nodesName).classList.remove('active');
                next.classList.add('active');
            } else if (cur.nodeName === scrollableSection && scrollTop + scrollInnerHeight >= scrollHeight) {
                e.preventDefault();
                this.verticalScroll(next, this.scrollSpeed, 'easeInOutQuad');
                e.target.closest(this.nodesName).classList.remove('active');
                next.classList.add('active');
                //console.log("end reach!");
            }
        }

        // function fullpageScrollUp() {
        //     e.preventDefault();
        //     this.verticalScroll(next, this.scrollSpeed, 'easeInOutQuad');
        //     e.target.closest(this.nodesName).classList.remove('active');
        //     next.classList.add('active');
        // }
    }

    scrollTo(targetPageNumber) {
        while (this.currentPageNumber !== targetPageNumber) {
            if (this.currentPageNumber > targetPageNumber) {
                this.navScrollUp();
                this.scrollUp();
            } else {
                this.navScrollDown();
                this.scrollDown();
            }
        }
    }

    verticalScroll(destination) {
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
    createNav() {
        const pageNav = document.createElement('div');
        pageNav.className = 'nav-dot-container';
        this.pages.appendChild(pageNav);
        for (let i = 0; i < this.totalPageNumber; i++) {
            pageNav.innerHTML += '<p class="nav-dot"><span></span></p>';
        }
        const navDots = document.getElementsByClassName('nav-dot');
        this.navDots = Array.prototype.slice.call(navDots);
        this.navDots[0].classList.add('dot-active');
        this.navDots.forEach((e, index) => {
            e.addEventListener('click', event => {
                this.scrollTo(index + 1);
                this.navDots.forEach(e => {
                    e.classList.remove('dot-active');
                });
                e.classList.add('dot-active');
            });
        });
    }
    updateNav() {
        this.navDots.forEach(e => {
            e.classList.remove('dot-active');
        });
        this.navDots[this.currentPageNumber - 1].classList.add('dot-active');
    }
    resize() {
        this.viewHeight = document.documentElement.clientHeight;
        this.pages.style.height = this.viewHeight + 'px';
        this.pages.style.top = -this.viewHeight * (this.currentPageNumber - 1) + 'px';
    }
    textFadeInOut() {
        const containersDom = document.getElementsByClassName('container');
        let textContainers = Array.prototype.slice.call(containersDom);
        textContainers.forEach((e) => {
            e.classList.remove('in-sight');
        });
        let textContainerInSight = textContainers[this.currentPageNumber - 1];
        textContainerInSight.classList.add('in-sight')
    }

    init() {
        // wheel event
        //window.pageYOffset = 0;
        let getContainers = this.getContainers;

        document.addEventListener('wheel', getContainers);

        let handleMouseWheel = utils.throttle(this.mouseScroll, 500, this);
        let handleResize = utils.debounce(this.resize, 500, this);
        this.pages.style.height = this.viewHeight + 'px';
        this.createNav();
        this.textFadeInOut();

        if (navigator.userAgent.toLowerCase().indexOf('firefox') === -1) {
            document.addEventListener('wheel', handleMouseWheel, {
                passive: false
            });
        } else {
            document.addEventListener('DOMMouseScroll', handleMouseWheel, {
                passive: false
            });
        }


        // touch event
        document.addEventListener('touchstart', (event) => {
            this.startY = event.touches[0].pageY;
            this.getContainers;
            this.getScrollableEl;
        });
        document.addEventListener('touchend', (event) => {
            let endY = event.changedTouches[0].pageY;
            if (this.startY - endY < 0) {
                this.scrollUp();
            }
            if (this.startY - endY > 0) {
                this.scrollDown();
            }
        });
        document.addEventListener('touchmove', (event) => {
            event.preventDefault();
        });
        window.addEventListener('resize', handleResize);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var s = new ScrollPages(1, 9, document.getElementById('allPages'), 600);
    s.init();

})