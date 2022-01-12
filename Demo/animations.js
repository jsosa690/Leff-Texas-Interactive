document.getElementById("sup_div").addEventListener('wheel', () => {
    document.body.style.setProperty('--scroll', document.getElementById("sup_div").scrollTop / window.innerHeight);
}, false);
document.getElementById("sup_div").addEventListener('touchstart', () => {
    document.body.style.setProperty('--scroll', document.getElementById("sup_div").scrollTop / window.innerHeight);
}, false);
document.getElementById("sup_div").addEventListener('touchend', () => {
    document.body.style.setProperty('--scroll', document.getElementById("sup_div").scrollTop / window.innerHeight);
}, false);
document.getElementById("sup_div").addEventListener('touchmove', () => {
    document.body.style.setProperty('--scroll', document.getElementById("sup_div").scrollTop / window.innerHeight);
}, false);

document.getElementById("sup_div").addEventListener('scroll', () => {
    document.body.style.setProperty('--scroll', document.getElementById("sup_div").scrollTop / window.innerHeight);
}, false);


document.getElementById("dem_div").addEventListener('wheel', updateDemandChart, false);
document.getElementById("dem_div").addEventListener('touchstart', updateDemandChart, false);
document.getElementById("dem_div").addEventListener('touchend', updateDemandChart, false);
document.getElementById("dem_div").addEventListener('touchmove', updateDemandChart, false);
document.getElementById("dem_div").addEventListener('scroll', updateDemandChart, false);


function updateDemandChart() {
    
    let slide = document.getElementById("dem_div").scrollTop / (window.innerHeight*4);
    if (slide < 0.2) {
        document.getElementsByClassName("dem_img")[0].style.opacity = "1";
        document.getElementsByClassName("dem_img2")[0].style.opacity = "0";
        document.getElementsByClassName("dem_img3")[0].style.opacity = "0";
        document.getElementsByClassName("dem_img4")[0].style.opacity = "0";
        document.getElementsByClassName("dem_img5")[0].style.opacity = "0";
    } else if (slide < 0.4) {
        document.getElementsByClassName("dem_img")[0].style.opacity = "0";
        document.getElementsByClassName("dem_img2")[0].style.opacity = "1";
        document.getElementsByClassName("dem_img3")[0].style.opacity = "0";
        document.getElementsByClassName("dem_img4")[0].style.opacity = "0";
        document.getElementsByClassName("dem_img5")[0].style.opacity = "0";
    } else if (slide < 0.6) {
        document.getElementsByClassName("dem_img")[0].style.opacity = "0";
        document.getElementsByClassName("dem_img2")[0].style.opacity = "0";
        document.getElementsByClassName("dem_img3")[0].style.opacity = "1";
        document.getElementsByClassName("dem_img4")[0].style.opacity = "0";
        document.getElementsByClassName("dem_img5")[0].style.opacity = "0";
    } else if (slide < 0.8) {
        document.getElementsByClassName("dem_img")[0].style.opacity = "0";
        document.getElementsByClassName("dem_img2")[0].style.opacity = "0";
        document.getElementsByClassName("dem_img3")[0].style.opacity = "0";
        document.getElementsByClassName("dem_img4")[0].style.opacity = "1";
        document.getElementsByClassName("dem_img5")[0].style.opacity = "0";
    } else {
        document.getElementsByClassName("dem_img")[0].style.opacity = "0";
        document.getElementsByClassName("dem_img2")[0].style.opacity = "0";
        document.getElementsByClassName("dem_img3")[0].style.opacity = "0";
        document.getElementsByClassName("dem_img4")[0].style.opacity = "0";
        document.getElementsByClassName("dem_img5")[0].style.opacity = "1";
    }
}