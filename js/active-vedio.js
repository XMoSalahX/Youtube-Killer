$(document).ready(function() {
    // Target your .container, .wrapper, .post, etc.
    $(".ifram").fitVids();
});

const firstSecion = document.querySelector("ul li")
firstSecion.addEventListener("click", function() {
    window.sessionStorage.setItem("target", "firstSection")
    window.location = "../home-page.html"
})

const secondSection = document.querySelector("li:nth-child(2)")
secondSection.addEventListener("click", function() {
    window.sessionStorage.setItem("target", "secondSection")
    window.location = "../home-page.html"
})

const thirdSection = document.querySelector("li:last-child")
thirdSection.addEventListener("click", function() {
    window.sessionStorage.setItem("target", "thirdContent")
    window.location = "../home-page.html"
})