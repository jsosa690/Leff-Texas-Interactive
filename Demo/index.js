const helper = {
    getDelta(event) {
        if (event.wheelDelta) {
            this.getWheelDelta = event => -event.wheelDelta;
            return -event.wheelDelta;
        } else {
            this.getWheelDelta = event => -event.detail;
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
        clearTimeout(method.inDebounce);    
        inDebounce = setTimeout(() => {
            method.apply(context, arguments);
        }, delay); 
    }
}

class ScrollPages {
    constructor(currentPageNumber, totalPageNumber, pages) {
        this.currentPageNumber = currentPageNumber;
        this.totalPageNumber = totalPageNumber;
        this.pages = pages;
        this.viewHeight = document.documentElement.clientHeight;
    }

    mouseScroll(event) {
        let delta = helper.getDelta(event);
        console.log(delta);
            if (delta < 0) {
                this.scrollUp(event);
                console.log('scroll down!');
                } else {
                this.scrollDown(event);
                console.log('scroll up!');
                }
    }

    getContainers(e) {
        let nodesName = ['HEADER', 'SECTION', 'ASIDE'];
        this.nodesName = Array.prototype.slice.call(nodesName);

        if (this.nodesName.includes(e.target.nodeName)) {

                this.curContainer = e.target;
        } else {

                this.curContainer = e.target.closest(this.nodesName);
        }
        //console.log("get the container!");
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
    
    scrollDown(event) {
        if (event.type === 'wheel' || event.type == 'DOMMouseScroll' || event.type === 'touchend') {
            this.getContainers(event);
            this.getScrollableEl();

            if (this.currentPageNumber !== this.totalPageNumber) {
                if (this.currentPageNumber == 5 && Math.round(document.getElementById("sup_div").scrollTop) < document.documentElement.clientHeight) {
                    document.body.style.setProperty('--scroll', Math.round(document.getElementById("sup_div").scrollTop) / window.innerHeight);
                    //left intentionally blank
                } else if (this.currentPageNumber == 7 && document.getElementById("dem_div").scrollTop < (document.documentElement.clientHeight * 4)) {
                    //left intentionally blank

                } else if (this.curContainer.nodeName !== this.scrollableSection) {
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
        this.updateGraphs();
    }

    scrollUp(event) {
        if (event.type === 'wheel' || event.type == 'DOMMouseScroll' || event.type === 'touchend') {
            this.getContainers(event);
            this.getScrollableEl();

            if (this.currentPageNumber !== 1) {
                if (this.currentPageNumber == 5 && Math.round(document.getElementById("sup_div").scrollTop) > 0) {
                    document.body.style.setProperty('--scroll', Math.round(document.getElementById("sup_div").scrollTop) / window.innerHeight);
                    //left intentionally blank
                } else if (this.currentPageNumber == 7 && document.getElementById("dem_div").scrollTop > 0) {
                    //left intentionally blank
                } else if (this.curContainer.nodeName !== this.scrollableSection) {
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
        this.updateGraphs();
    }

    scrollTo(targetPageNumber, event) {
        while (this.currentPageNumber !== targetPageNumber) {
            if (this.currentPageNumber > targetPageNumber) {
                this.scrollUp(event);
            } else {
                this.scrollDown(event);
            }
        }
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
        textContainerInSight.classList.add('in-sight')
    }

    updateGraphs() {
        if (this.currentPageNumber == 5) {
            document.getElementsByClassName("sup_img")[0].style.visibility = "visible";
            document.getElementsByClassName("sup_img2")[0].style.visibility = "visible";
        } else {
            document.getElementsByClassName("sup_img")[0].style.visibility = "hidden";
            document.getElementsByClassName("sup_img2")[0].style.visibility = "hidden";
        }

        if (this.currentPageNumber == 7) {
            document.getElementsByClassName("dem_img")[0].style.visibility = "visible";
            document.getElementsByClassName("dem_img2")[0].style.visibility = "visible";
            document.getElementsByClassName("dem_img3")[0].style.visibility = "visible";
            document.getElementsByClassName("dem_img4")[0].style.visibility = "visible";
            document.getElementsByClassName("dem_img5")[0].style.visibility = "visible";
        } else {
            document.getElementsByClassName("dem_img")[0].style.visibility = "hidden";
            document.getElementsByClassName("dem_img2")[0].style.visibility = "hidden";
            document.getElementsByClassName("dem_img3")[0].style.visibility = "hidden";
            document.getElementsByClassName("dem_img4")[0].style.visibility = "hidden";
            document.getElementsByClassName("dem_img5")[0].style.visibility = "hidden";
        }
    }

    init() {
        let handleMouseWheel = helper.throttle(this.mouseScroll, 1200, this);
        let handleResize = helper.debounce(this.resize, 500, this);
        this.pages.style.height = this.viewHeight + 'px';
        this.createNav();
        this.textFadeInOut();

        window.addEventListener('scroll', () => {
            handleMouseWheel;
          }, false);
 
        if (navigator.userAgent.toLowerCase().indexOf('firefox') === -1) {
            document.addEventListener('scroll', handleMouseWheel ,false);
            document.addEventListener('wheel', handleMouseWheel, false);
        } else {
            document.addEventListener('DOMMouseScroll', handleMouseWheel, false);
        }
        document.addEventListener('touchstart', (event) => {
            this.startY = event.touches[0].pageY;
        });
        document.addEventListener('touchend', (event) => {
            let endY = event.changedTouches[0].pageY;
            if (this.startY - endY < 0) {
                this.scrollUp(event);
            }
            if (this.startY - endY > 0) {
                this.scrollDown(event);
            }
        });
        document.addEventListener('touchmove', (event) => {
            event.preventDefault();
        });
        window.addEventListener('resize', handleResize);

        document.getElementById('backToTop').addEventListener('click', (event) => {
            this.scrollTo(1, event); //console.log("button got clicked!");
            var supplyScroll = document.getElementById("sup_div");
            var demandScroll = document.getElementById("scrollableSection_demand");
            supplyScroll.scrollTo(0,0);
            demandScroll.scrollTo(0,0);
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var s = new ScrollPages(1, 9, document.getElementById('all-pages'));
    s.init();
})
