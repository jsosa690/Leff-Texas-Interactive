// Implemetion reference: https://juejin.im/post/5aeef41cf265da0ba0630de0
// Background image from free image website: https://pixabay.com/

const helper = {
    getDelta(event) {
        if (event.deltaY) {
            return event.deltaY;
        } else {
            return -event.detail;
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

    mouseScroll(event) {
        let delta = helper.getDelta(event);
        if (delta < 0) {
            //this.analogScrollDown(event);
            this.navScrollDown(event);
            console.log('wheel scroll down!');
            console.log('page scroll up!');
        } else {
            
            //this.analogScrollUp(event);
            this.navScrollUp(event);
            console.log('wheel scroll up!');
            console.log('page scroll down!');
        }
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
        console.log("get the container!");
    }

    getScrollableEl() {

        const idName = ['supply_scrolly', 'demand_scrolly'];
        const scrollableEls = [$('#scrollableSection_supply'), $('#scrollableSection_demand')];
        let index = idName.indexOf(this.curContainer.id);
        let scrollableEl = scrollableEls[index];
        //console.log(scrollableEl);
        this.scrollableSection = this.nodesName[2];
        if (scrollableEl != null) {
            this.scrollTop = scrollableEl.scrollTop();
            this.scrollInnerHeight = scrollableEl.innerHeight();
            this.scrollHeight = scrollableEl[0].scrollHeight;
        }
    }

    // analogScrollDown(e) {
    //     this.getContainers(e);
    //     this.getScrollableEl();
    //     let cur = this.curContainer;
    //     let prev = this.prevContainer;
    //     let next = this.nextContainer;
    //     let scrollableSection = this.scrollableSection;
    //     let scrollTop = this.scrollTop;
    //     let scrollInnerHeight = this.scrollInnerHeight;
    //     let scrollHeight = this.scrollHeight;

    //     // wheel scroll down --> page scroll up 
    //     var allPageTop = this.pages.style;
    //     //console.log(allPageTop);

    //     if(this.currentPageNumber !== 1){
    //         if (prev != null && this.nodesName.includes(prev.nodeName)) {
    //             if (cur.nodeName !== scrollableSection) {
    //                 //e.preventDefault();
    //                 this.verticalScroll(prev, this.scrollSpeed * 0.7, 'easeInOutCubic', allPageTop);
    //                 e.target.closest(this.nodesName).classList.remove('active');
    //                 prev.classList.add('active');
    //                 this.currentPageNumber--;
    //                 this.updateNav();
                    
    //             } else if (cur.nodeName === scrollableSection && scrollTop <= 0) {
    //                 //e.preventDefault();
    //                 this.verticalScroll(prev, this.scrollSpeed * 0.7, 'easeInOutCubic', allPageTop);
    //                 e.target.closest(this.nodesName).classList.remove('active');
    //                 prev.classList.add('active');
    //                 this.currentPageNumber--;
    //                 this.updateNav();
    //                 //console.log("top reach!");
    //             }
    //         }
            
    //     }
        
        
    // }
    // analogScrollUp(e) {
    //     this.getContainers(e);
    //     this.getScrollableEl();
    //     let cur = this.curContainer;
    //     let prev = this.prevContainer;
    //     let next = this.nextContainer;
    //     let scrollableSection = this.scrollableSection;
    //     let scrollTop = this.scrollTop;
    //     let scrollInnerHeight = this.scrollInnerHeight;
    //     let scrollHeight = this.scrollHeight;

    //     var allPageTop = this.pages.style;
    //     //console.log(allPageTop);

    //     // wheel scroll up --> page scroll down
    //     if(this.currentPageNumber !== this.totalPageNumber){
    //         if (next != null && this.nodesName.includes(next.nodeName)) {

    //             if (cur.nodeName !== scrollableSection) {
    //                 //e.preventDefault();
    //                 this.verticalScroll(next, this.scrollSpeed, 'easeInOutQuad', allPageTop);
    //                 e.target.closest(this.nodesName).classList.remove('active');
    //                 next.classList.add('active');
    //                 this.currentPageNumber++;
    //                 this.updateNav();
    //             } else if (cur.nodeName === scrollableSection && scrollTop + scrollInnerHeight >= scrollHeight) {
    //                 //e.preventDefault();
    //                 this.verticalScroll(next, this.scrollSpeed, 'easeInOutQuad', allPageTop);
    //                 e.target.closest(this.nodesName).classList.remove('active');
    //                 next.classList.add('active');
    //                 this.currentPageNumber++;
    //                 this.updateNav();
    //                 //console.log("end reach!");
    //             }
    //         }
            
    //     }
        
    //     console.log("windowPageYOffset: " + window.pageYOffset);
    // }

    // wheel scroll up --> page scroll down
    navScrollUp(event) {
        if (event.type === 'wheel' || event.type === 'DOMMouseScroll' || event.type === 'touchend') {
            this.getContainers(event);
            this.getScrollableEl();

            if (this.currentPageNumber !== this.totalPageNumber) {
                if (this.curContainer.nodeName !== this.scrollableSection) {
                    this.pages.style.top = (-this.viewHeight * this.currentPageNumber) + 'px';
                    this.currentPageNumber++;
                    this.updateNav();
                    this.textFadeInOut();
                } else if (this.curContainer.nodeName === this.scrollableSection && this.scrollTop + this.scrollInnerHeight >= this.scrollHeight) {
                    this.pages.style.top = (-this.viewHeight * this.currentPageNumber) + 'px';
                    this.currentPageNumber++;
                    this.updateNav();
                    this.textFadeInOut();
                }
            }
        } else if (event.type === 'click') {
            //console.log("nav-dot is clicked");
            if (this.currentPageNumber !== this.totalPageNumber) {
                this.pages.style.top = (-this.viewHeight * this.currentPageNumber) + 'px';
                this.currentPageNumber++;
                this.updateNav();
                this.textFadeInOut();
            }
        }
        console.log("viewHeight: " + this.viewHeight);
        console.log("pageTop: " + this.pages.style.top);
        console.log("curPageNum: " + this.currentPageNumber);
    }
    // wheel scroll down --> page scroll up
    navScrollDown(event) {
        if (event.type === 'wheel' || event.type === 'DOMMouseScroll' || event.type === 'touchend') {
            this.getContainers(event);
            this.getScrollableEl();

            if (this.currentPageNumber !== 1) {
                if (this.curContainer.nodeName !== this.scrollableSection) {
                    this.pages.style.top = (-this.viewHeight * (this.currentPageNumber - 2)) + 'px';
                    this.currentPageNumber--;
                    this.updateNav();
                    this.textFadeInOut();
                } else if (this.curContainer.nodeName === this.scrollableSection && this.scrollTop <= 0) {
                    this.pages.style.top = (-this.viewHeight * (this.currentPageNumber - 2)) + 'px';
                    this.currentPageNumber--;
                    this.updateNav();
                }
            }
        } else if (event.type === 'click') {
            //console.log("nav-dot is clicked");
            if (this.currentPageNumber !== 1) {
                this.pages.style.top = (-this.viewHeight * (this.currentPageNumber - 2)) + 'px';
                this.currentPageNumber--;
                this.updateNav();
                this.textFadeInOut();
            }
        }
    }
    scrollTo(targetPageNumber, event) {
        while (this.currentPageNumber !== targetPageNumber) {
            if (this.currentPageNumber > targetPageNumber) {
                //when cur_page > tar_page --> page scroll up --> wheel scroll down
                this.navScrollDown(event);
            } else {
                //when cur_page < tar_page --> page scroll down --> wheel scroll up
                this.navScrollUp(event);
            }
        }
    }

    // verticalScroll(destination) {
    //     var duration = arguments.length <= 1 || arguments[1] === undefined ? 200 : arguments[1];
    //     var easing = arguments.length <= 2 || arguments[2] === undefined ? 'linear' : arguments[2];
    //     var callback = arguments[4];
    //     var pageTop = arguments[3];
    //     var easings = {
    //         easeInOutQuad: function easeInOutQuad(t) {
    //             return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    //         },
    //         easeInCubic(t) {
    //             return t * t * t;
    //         },
    //         easeInOutCubic(t) {
    //             return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    //         }
    //     };

    //     var start = window.pageYOffset;
    //     var startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
    //     var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
    //     var documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight, 9 * windowHeight);

    //     // var documentHeight = document.getElementById('all-pages').offsetHeight;

    //     var destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
    //     var destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);
        
    //     // console.log(destinationOffset);
    //     // console.log(destinationOffsetToScroll);
    //     console.log("documentHeight: " + documentHeight);
    //     // console.log("windowHeight: " + windowHeight);
    //     console.log("_______________");
    //     console.log(destination.offsetTop);
    //     console.log(destinationOffsetToScroll);
    //     if ('requestAnimationFrame' in window === false) {
    //         window.scroll(0, destinationOffsetToScroll);
    //         if (callback) {
    //             callback();
    //         }
    //         return;
    //     }
        
        

    //     function scroll() {    
    //         var now = 'now' in window.performance ? performance.now() : new Date().getTime();
    //         var time = Math.min(1, (now - startTime) / duration);
    //         var timeFunction = easings[easing](time);

    //         //pageTop.top = - Math.ceil(timeFunction * (destinationOffsetToScroll - start) + start) + 'px';
    //         window.scroll(0, Math.ceil(timeFunction * (destinationOffsetToScroll - start) + start));
            
    //         //console.log(Math.ceil(timeFunction * (destinationOffsetToScroll - start) + start));
    //         if (window.pageYOffset === destinationOffsetToScroll) {
    //             if (callback) {
    //                 callback();
    //             }
    //             return;
    //         }
    //         requestAnimationFrame(scroll);
    //     }

    //     scroll();
    // }

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
                this.scrollTo(index + 1, event);
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
        console.log(textContainerInSight);
        textContainerInSight.classList.add('in-sight')
    }
    init() {
        
        let handleMouseWheel = helper.throttle(this.mouseScroll, 500, this);
        let handleResize = helper.debounce(this.resize, 500, this);
        this.pages.style.height = this.viewHeight + 'px';
        this.createNav();
        this.textFadeInOut();
        if (navigator.userAgent.toLowerCase().indexOf('firefox') === -1) {
            document.addEventListener('wheel', handleMouseWheel);
        } else {
            document.addEventListener('DOMMouseScroll', handleMouseWheel);
        }
        document.addEventListener('touchstart', (event) => {
            this.startY = event.touches[0].pageY;
        });
        document.addEventListener('touchend', (event) => {
            let endY = event.changedTouches[0].pageY;
            if (this.startY - endY < 0) {
                this.navScrollDown(event);
            }
            if (this.startY - endY > 0) {
                this.navScrollUp(event);
                
            }
        });
        document.addEventListener('touchmove', (event) => {
            event.preventDefault();
        });
        window.addEventListener('resize', handleResize);
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var s = new ScrollPages(1, 9, document.getElementById('all-pages'), 600);
    s.init();

})