//target the main element 
var submit = document.getElementById("submit")
var fullName = document.querySelector("input[type='text']")
var email = document.querySelector("input[type='email']")
var password = document.querySelector("input[type='password']")
var checkBox = document.querySelector("input[type='checkbox']")
var fbLogin = document.querySelector(".fa-facebook-f")
var googleLogin = document.querySelector(".fab fa-google")
var allert = document.querySelector(".allert")
var alertName = document.querySelector(".name")
var alertEmail = document.querySelector(".email")
var alertPass = document.querySelector(".password")
var form = document.querySelector("#R")
var terms = document.querySelector(".agree")

function catchErorr(target) {
    allert.style.display = "block";
    allert.innerHTML = `<b>Erorr</b>, Check the fields again.`
    allert.style.backgroundColor = "#f8d7da"
    target.style.color = "red"
}
// data Will be push to database
let data = {}
let verificated = false
let boolName = false
let boolPass = false
let boolEmail = false
let boolver = false
let checkName = true
fullName.addEventListener("input", function() {



    if (verificated === false) {
        if (checkName === true) {
            if (fullName.value == "") {

                alertName.innerHTML = "Please write your name"
                alertName.style.color = "red"
            } else if (fullName.value.charAt(0) == " ") {
                alertName.innerHTML = "Your Name Must start with letter"
                alertName.style.color = "red"
            } else if (fullName.value.split(" ").length <= 1) {
                alertName.innerHTML = "The name must be complete"
                alertName.style.color = "red"
            } else {
                fullName.value.split("").forEach(function(e) {
                    if (!isNaN(e) && e != " ") {
                        console.log(e)
                        alertName.innerHTML = "Your name contains a number, which is incorrect"
                        alertName.style.color = "red"
                        fullName.value = ""
                    } else {
                        if (fullName.value.split(" ")[1] == "") {
                            alertName.innerHTML = "The name must be complete"
                            alertName.style.color = "red"
                        } else if (fullName.value.split(" ")[1].length <= 2 || fullName.value.split(" ")[0].length <= 2) {
                            alertName.innerHTML = "No name consists of only two letters or less"
                            alertName.style.color = "red"
                        } else {
                            alertName.innerHTML = "Great!"
                            alertName.style.color = "#2ad4bc"
                            boolName = true
                        }
                    }
                })
            }
        }

    } else {
        let ver = fullName.value.split("-")
        if (ver.length >= 5) {
            if (ver[ver.length - 1] === "") {
                alertName.innerHTML = "verifiction code is wrong"
                alertName.style.color = "red"
                boolver = false
            } else {
                fullName.value.split("").forEach(function(e) {
                    if (e === " ") {
                        alertName.innerHTML = "verifiction code is wrong"
                        alertName.style.color = "red"
                        boolver = false
                    } else {
                        alertName.innerHTML = "Great!"
                        alertName.style.color = "#2ad4bc"
                        boolver = true
                    }
                })

            }
        } else {
            alertName.innerHTML = "verifiction code is wrong"
            alertName.style.color = "red"
            boolver = false
        }
    }

})

email.addEventListener("input", function() {
    if (email.value == "") {
        alertEmail.innerHTML = "Please write your Email"
        alertEmail.style.color = "red"
    } else {
        if (validateEmail(email.value)) {
            alertEmail.innerHTML = "Great!"
            alertEmail.style.color = "#2ad4bc"
            boolEmail = true
        } else {
            alertEmail.innerHTML = "The email is incorrect"
            alertEmail.style.color = "red"
        }
    }
})

password.addEventListener("input", function() {
    if (password.value == "") {
        alertPass.innerHTML = "Password is empty"
        alertPass.style.color = "red"
    } else {
        if (password.value.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)) {
            alertPass.innerHTML = "Great!"
            alertPass.style.color = "#2ad4bc"
            boolPass = true
        } else {
            alertPass.innerHTML = "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character."
            alertPass.style.color = "red"
        }
    }
})

function validateEmail(emailAdress) {
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailAdress.match(regexEmail)) {
        return true;
    } else {
        return false;
    }
}


// get data form user from Our Site
submit.addEventListener("click", function(event) {

    if (checkName === true) {
        if (fullName.value == "") {
            alertName.innerHTML = "Please write your name"
            alertName.style.color = "red"
        } else if (fullName.value.charAt(0) == " ") {
            alertName.innerHTML = "Your Name Must start with letter"
            alertName.style.color = "red"
        } else if (fullName.value.split(" ").length <= 1) {
            alertName.innerHTML = "The name must be complete"
            alertName.style.color = "red"
        } else {
            fullName.value.split("").forEach(function(e) {
                if (!isNaN(e) && e != " ") {
                    console.log(e)
                    alertName.innerHTML = "Your name contains a number, which is incorrect"
                    alertName.style.color = "red"
                    fullName.value = ""
                } else {
                    if (fullName.value.split(" ")[1] == "") {
                        alertName.innerHTML = "The name must be complete"
                        alertName.style.color = "red"
                    } else if (fullName.value.split(" ")[1].length <= 2 || fullName.value.split(" ")[0].length <= 2) {
                        alertName.innerHTML = "No name consists of only two letters or less"
                        alertName.style.color = "red"
                    } else {
                        alertName.innerHTML = "Great!"
                        alertName.style.color = "#2ad4bc"
                        boolName = true
                    }
                }
            })
        }
    }
    if (checkName === true) {
        if (password.value == "") {
            alertPass.innerHTML = "Password is empty"
            alertPass.style.color = "red"
        } else {
            if (password.value.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)) {
                alertPass.innerHTML = "Great!"
                alertPass.style.color = "#2ad4bc"
                boolPass = true
            } else {
                alertPass.innerHTML = "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character."
                alertPass.style.color = "red"
            }
        }
    }
    if (email.value == "") {
        alertEmail.innerHTML = "Please write your Email"
        alertEmail.style.color = "red"
    } else {
        if (validateEmail(email.value)) {
            alertEmail.innerHTML = "Great!"
            alertEmail.style.color = "#2ad4bc"
            boolEmail = true
        } else {
            alertEmail.innerHTML = "The email is incorrect"
            alertEmail.style.color = "red"
        }
    }
    if (fullName.value == "") {
        alertName.innerHTML = "Please write your name"
        alertName.style.color = "red"
    }
    if (email.value == "") {
        alertEmail.innerHTML = "Please write your Email"
        alertEmail.style.color = "red"
    }
    if (password.value == "") {
        alertPass.innerHTML = "Password is empty"
        alertPass.style.color = "red"
    }
    if (!checkBox.checked) {
        allert.style.display = "block"
        allert.innerHTML = "You must agree to the terms of service"
        allert.style.backgroundColor = "#f8d7da"
        setTimeout(function() {
            allert.style.display = "none"
        }, 5000)
    }

    if (boolEmail === false || boolPass === false || boolName === false || !checkBox.checked) {
        boolName = false
        boolPass = false
        boolEmail = false
    }
    event.preventDefault()
    if (verificated === false) {
        data.name = fullName.value
        data.email = email.value
        data.password = password.value
        data.age = 21
        data.acceptTerms = true
        if (checkBox.checked && boolName && boolPass && boolEmail) {

            // POST request using fetch()
            fetch("https://localhost:44349/api/Account/Register", {

                    // Adding method type
                    method: "POST",

                    // Adding body or contents to send
                    body: JSON.stringify(data),

                    // Adding headers to the request
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })
                // Converting to JSON
                .then(response => response.json())
                .then(function(json) {
                    console.log(json)
                    if (json.hasError === false) {
                        let countRedirect = 5
                        let timer = setInterval(() => {
                            allert.innerHTML = `<b>Congrats</b>, We received the data!. We will redirect you to verification page ${countRedirect}`
                            allert.style.backgroundColor = "#d1e7dd"
                            countRedirect--
                        }, 1000);
                        allert.style.display = "block"
                        setTimeout(() => {
                            clearInterval(timer)
                            allert.style.display = "none"
                            email.style.display = "none"
                            password.style.display = "none"
                            alertEmail.style.display = "none"
                            alertPass.style.display = "none"
                            checkBox.style.display = "none"
                            terms.style.display = "none"
                            fullName.value = ""
                            fullName.setAttribute("placeholder", "Enter verification code")
                            alertName.innerHTML = ""
                            submit.value = "Verification"
                            verificated = true
                        }, 6000);
                    } else {
                        if (json.errorsDictionary.FormValidationError_Name) {
                            alertName.innerHTML = json.errorsDictionary.FormValidationError_Name
                            catchErorr(alertName)
                        }
                        if (json.errorsDictionary.FormValidationError_Email) {
                            alertEmail.innerHTML = json.errorsDictionary.FormValidationError_Email
                            catchErorr(alertEmail)
                        }
                        if (json.errorsDictionary.FormValidationError_Password) {
                            alertPass.innerHTML = json.errorsDictionary.FormValidationError_Password
                            catchErorr(alertPass)
                        }
                    }
                    data = {}
                })
                .catch(function(err) {
                    console.log(err)
                });
        }
    } else {
        checkName = false

        if (boolver) {
            fetch(`https://localhost:44349/api/Account/VerifyAccount?verificationCode=${fullName.value}`, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json; charset=UTF-8"
                    }
                })
                .then(response => response.json())
                .then(function(json) {
                    console.log(json)
                    if (json.hasError === false) {
                        allert.style.display = "block"
                        let countRedirect = 5
                        let timer = setInterval(() => {
                            allert.innerHTML = `<b>Congrats</b>, your account has been activated!. We will redirect you ${countRedirect}`
                            allert.style.backgroundColor = "#d1e7dd"
                            countRedirect--
                        }, 1000);
                        allert.style.display = "block"
                        setTimeout(() => {
                            window.location = "../login-page.html"
                        }, 6000);
                    } else {
                        alertName.innerHTML = json.errorsDictionary.FormValidationError_VerificationCode
                        catchErorr(alertName)
                    }
                })
                .catch(function(err) {
                    console.log(err)
                });
        } else {
            alertName.innerHTML = "verifiction code is incorrect"
            alertName.style.color = "red"
        }
    }
});



// to hidden allert
allert.addEventListener("click", function() {
    allert.style.display = "none";
})



// // google api to Sign in
function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId());
    // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log("Image URL: " + profile.getImageUrl());
    console.log("Email: " + profile.getEmail());

    // The ID token you need to pass to your backend:
    var id_token = googleUser.getAuthResponse().id_token;
    console.log("ID Token: " + id_token);

    // add main data to our object
    data.name = profile.getName()
    data.email = profile.getEmail()
    data.password = id_token.substring(0, 25)
    console.log(data)

    // POST request using fetch()
    fetch("#", {

        // Adding method type
        method: "POST",

        // Adding body or contents to send
        body: JSON.stringify(data),

        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

    // send user to login page
    setTimeout(() => {
        window.location = "../../Youtube-Killer/login-page.html"
    }, 2000);

}