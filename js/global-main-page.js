{


    window.addEventListener("click", function(e) {
        h2S = document.querySelectorAll("h2")
        h2S.forEach(function(el) {
            if (el === e.target) {
                console.log(e.target.classList[0])
                fetch(`https://localhost:44349/api/Media/GetSpecificMedia?mediaId=${e.target.classList[0]}&commentsTotalCount=10&repliesTotalCount=10`, {
                        method: "GET",
                        headers: {
                            "Authorization": `Bearer ${JSON.parse( window.sessionStorage.getItem("Access token"))}`,
                            "Content-type": "application/json; charset=UTF-8"
                        }
                    })
                    .then(response => response.json())
                    .then(function(json) {
                        console.log(json)
                        if (json.hasError === false) {
                            window.sessionStorage.setItem("Get Post", JSON.stringify(json.data))
                            window.location = "../active-vedieo.html"
                        }
                    })
                    .catch(err => console.log(err))
            }
        })
    })


    const firstContent = document.querySelector(".header-content")
    const sliderContainer = Array.from(document.querySelectorAll(".sliderShow img"))
    const thirdContent = document.querySelectorAll(".header-content")[2]
    const SecondContenet = document.querySelectorAll(".header-content")[1]
    const FullName = document.querySelector(".UserName")

    FullName.innerHTML = "Hi, " + JSON.parse(window.sessionStorage.getItem("Username"))

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

    //Change password Button
    const changePassBtn = document.querySelector(".change")
    const recentPassch = document.querySelector(".recentChange")
    const newPass = document.querySelector(".newPass")
    changePassBtn.addEventListener("click", function(e) {
        e.preventDefault()
        data = {
            oldPassword: recentPassch.value,
            newPassword: newPass.value
        }
        if (data.oldPassword != "" && data.newPassword != "") {
            fetch("https://localhost:44349/api/Account/ChangePassword", {
                    method: "POST",

                    headers: {
                        "Authorization": `Bearer ${JSON.parse( window.sessionStorage.getItem("Access token"))}`,
                        "Content-type": "application/json; charset=UTF-8"
                    },
                    body: JSON.stringify(data)

                })
                .then(response => response.json())
                .then(function(json) {
                    console.log(json)
                    if (json.hasError == false) {
                        changePassBtn.value = "Password changed"
                        setTimeout(() => {
                            changePassBtn.value = "Submit"
                        }, 5000);
                    } else {
                        if (json.errorsDictionary.FormValidationError_Password === "Invalid Credintials!") {
                            recentPassch.value = ""
                            recentPassch.setAttribute("placeholder", json.errorsDictionary.FormValidationError_Password)
                        } else {
                            newPass.value = ""
                            newPass.setAttribute("placeholder", json.errorsDictionary.FormValidationError_Password)
                        }
                    }
                })
                .catch(err => console.log(err))
        }
    })

    const freeze = document.querySelector(".freezeBtn")
    const passFreeze = document.querySelector(".passNow")
    const freezeConvertValue = document.querySelector("select").value
    let numberOfDay
    freeze.addEventListener("click", function(e) {
        if (freezeConvertValue === "24 Hour") {
            numberOfDay = 1
        } else if (freezeConvertValue === "1 Week") {
            numberOfDay = 7
        } else if (freezeConvertValue === "1 Month") {
            numberOfDay = 30
        } else if (freezeConvertValue === "3 Month") {
            numberOfDay = 90
        } else if (freezeConvertValue === "6 Month") {
            numberOfDay = 180
        } else if (freezeConvertValue === "1 Year") {
            numberOfDay = 365
        }
        data = {}
        data.password = document.querySelector(".passNow").value
        console.log(passFreeze.value)
        data.daysCount = numberOfDay
        e.preventDefault()
        if (passFreeze != "") {
            fetch("https://localhost:44349/api/Account/FreezeAccount", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${JSON.parse( window.sessionStorage.getItem("Access token"))}`,
                        "Content-type": "application/json; charset=UTF-8"
                    },
                    body: JSON.stringify(data)
                })
                .then(response => response.json())
                .then(function(json) {
                    console.log(json)
                    if (json.hasError == false) {

                    } else {
                        passFreeze.value = ""
                        passFreeze.setAttribute("placeholder", json.errorsDictionary.FormValidationError_Password)
                    }
                })
                .catch(err => console.log(err))
        }
    })

    const signout = document.querySelector(".signout")
    signout.addEventListener("click", function() {
        window.sessionStorage.removeItem("Access token")
        window.location = "../login-page.html"
    })
}