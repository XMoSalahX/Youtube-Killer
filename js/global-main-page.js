const firstContent = document.querySelector(".header-content")
const sliderContainer = Array.from(document.querySelectorAll(".sliderShow img"))
const thirdContent = document.querySelectorAll(".header-content")[2]
const SecondContenet = document.querySelectorAll(".header-content")[1]
setTimeout(() => {
    if (window.sessionStorage.getItem("target") == "firstSection") {
        console.log(window.sessionStorage.getItem("target"))
        firstContent.scrollIntoView({
            behavior: "smooth",
            block: "start"
        })

    } else if (window.sessionStorage.getItem("target") == "secondSection") {
        SecondContenet.scrollIntoView({
            behavior: "smooth",
            block: "start"
        })

    } else if (window.sessionStorage.getItem("target") == "thirdContent") {
        console.log(window.sessionStorage.getItem("target"))
        thirdContent.scrollIntoView({
            behavior: "smooth",
            block: "start"
        })
    }
    setTimeout(() => {
        window.sessionStorage.removeItem("target")
    }, 2000);

}, 2000);


var x = 1
setInterval(() => {
    sliderContainer.forEach(element => {
        element.classList.remove("active")

    });
    if (x >= 8) {
        x = 1
    }
    sliderContainer[x].classList.add("active")
    x++

}, 4000);

// scroll to target Element
function Scrool(target, button) {
    if (target) {
        button.addEventListener("click", function() {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            })
        })
    }
}

// to scroll into heading 
const startButton = document.querySelector(".start")
const heading = document.querySelector(".heading")
Scrool(heading, startButton)


// to scroll into first topic
const firstLi = document.querySelector("li")

Scrool(firstContent, firstLi)

// To Scroll into the Second Topic
const SecondLi = document.querySelector("li:nth-child(2)")

Scrool(SecondContenet, SecondLi)

// Scroll Into Third Topic
const ThirdLi = document.querySelector("li:last-child")

Scrool(thirdContent, ThirdLi)


// to open website Setting
const setting = document.querySelector(".Setting")
const blurE = document.querySelector(".blur")
const pop = document.querySelector(".pop")
setting.addEventListener("click", function() {
    blurE.classList.toggle("enablePop")
    blurE.classList.toggle("enable")
    pop.classList.toggle("enablePop")
})

// Close Website Setting
blurE.addEventListener("click", function() {
    blurE.classList.remove("enablePop")
    blurE.classList.remove("enable")
    pop.classList.remove("enablePop")
    navNone.classList.toggle("navToggle")
})

const buttonCancel = document.querySelectorAll("form button")
buttonCancel[0].addEventListener("click", function(e) {
    e.preventDefault()
    blurE.classList.remove("enablePop")
    pop.classList.remove("enablePop")
})
buttonCancel[1].addEventListener("click", function(e) {
    e.preventDefault()
    blurE.classList.remove("enablePop")
    pop.classList.remove("enablePop")
})
buttonCancel[2].addEventListener("click", function(e) {
    e.preventDefault()
    blurE.classList.remove("enablePop")
    pop.classList.remove("enablePop")
})

// to display setting 
const displaySetting = document.querySelector(".Icon")
const navNone = document.querySelector(".navControl")
displaySetting.addEventListener("click", function() {
    navNone.classList.toggle("navToggle")
    blurE.classList.add("enablePop")
})

navNone.addEventListener("click", function() {
    navNone.classList.toggle("navToggle")
    blurE.classList.remove("enablePop")
})