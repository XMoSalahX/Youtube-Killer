const sliderContainer = Array.from(document.querySelectorAll(".sliderShow img"))

var x = 1
setInterval(() => {
    sliderContainer.forEach(element => {
        element.classList.remove("active")

    });
    if (x >= 7) {
        x = 0
    }
    sliderContainer[x].classList.add("active")
    x++

}, 4000);