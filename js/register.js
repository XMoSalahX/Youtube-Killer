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
    // get data form user from Our Site
submit.addEventListener("click", function(event) {
    event.preventDefault()
    if (verificated === false) {
        data.name = fullName.value
        data.email = email.value
        data.password = password.value
        data.age = 21
        data.acceptTerms = true
        if (checkBox.checked && fullName.value != "" && email.value != "" && password != "") {

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
                            allert.innerHTML = `<b>Congrats</b>, your account has been created!. We will redirect you ${countRedirect}`
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
                            alertName.innerHTML = "Please Enter your verification code"
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
        // data.verificationCode = "mohammedska sd askjasjasbda s 151 51 51"
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