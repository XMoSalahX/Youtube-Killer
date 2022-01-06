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

// scroll to target Element
function Scrool(target, button) {
    button.addEventListener("click", function() {
        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
    })
}

// to scroll into heading 
const startButton = document.querySelector(".start")
const heading = document.querySelector(".heading")
Scrool(heading, startButton)


// to scroll into first topic
const firstLi = document.querySelector("li")
const firstContent = document.querySelector(".header-content")
Scrool(firstContent, firstLi)

// To Scroll into the Second Topic
const SecondLi = document.querySelector("li:nth-child(2)")
const SecondContenet = document.querySelectorAll(".header-content")[1]
Scrool(SecondContenet, SecondLi)

// Scroll Into Third Topic
const ThirdLi = document.querySelector("li:last-child")
const thirdContent = document.querySelectorAll(".header-content")[2]
Scrool(thirdContent, ThirdLi)


// to open website Setting
const setting = document.querySelector(".Setting")
const blurE = document.querySelector(".blur")
const pop = document.querySelector(".pop")
setting.addEventListener("click", function() {
    blurE.classList.add("enable")
    pop.classList.add("enable")
})

// Close Website Setting
blurE.addEventListener("click", function() {
    blurE.classList.remove("enable")
    pop.classList.remove("enable")
})

const buttonCancel = document.querySelectorAll("form button")
buttonCancel[0].addEventListener("click", function(e) {
    e.preventDefault()
    blurE.classList.remove("enable")
    pop.classList.remove("enable")
})
buttonCancel[1].addEventListener("click", function(e) {
    e.preventDefault()
    blurE.classList.remove("enable")
    pop.classList.remove("enable")
})
buttonCancel[2].addEventListener("click", function(e) {
    e.preventDefault()
    blurE.classList.remove("enable")
    pop.classList.remove("enable")
})