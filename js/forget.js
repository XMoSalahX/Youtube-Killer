//target the main element 
var submit = document.getElementById("submit")
var email = document.querySelector("input[type='email']")
var fbLogin = document.querySelector(".fa-facebook-f")
var allert = document.querySelector(".allert")
var alertEmail = document.querySelector(".email")

// data Will be push to database
var dataF = {}


// get data form user from Our Site
submit.addEventListener("click", function(event) {
    event.preventDefault()
    dataF.email = email.value

    console.log(dataF)
    if (email.value != "") {
        // display allert
        allert.style.display = "block";
        fetch(`https://localhost:44349/api/Account/ForgetPassword?email=${email.value}`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(response => response.json())
            .then(function(json) {
                console.log(json)
                if (json.hasError == false) {
                    // display allert
                    allert.style.display = "block";
                    allert.style.backgroundColor = "#d1e7dd"
                    allert.innerHTML = `<b>Congrats</b>, and email has been sent to your email.`
                    alertEmail.style.color = "black"
                    alertEmail.innerHTML = "Please enter your Email Address"
                    let countRedirect = 5
                    setInterval(() => {
                        allert.innerHTML = `<b>Congrats</b>, and email has been sent to your email. We will redirect you ${countRedirect}`
                        countRedirect--
                    }, 1000);
                    setTimeout(() => {
                        window.location = "../login-page.html"
                    }, 6000);
                } else {
                    allert.style.display = "block"
                    allert.innerHTML = `<b>Erorr</b>, Check the fields again.`
                    allert.style.backgroundColor = "#f8d7da"
                    alertEmail.style.color = "red"
                    alertEmail.innerHTML = json.errorsDictionary.FormValidationError_Email
                }
            })
            .catch(function(err) {
                console.log(err)
            })
            // send user to login page
            // setTimeout(() => {
            //     window.location = "../../Youtube-Killer/login-page.html"
            // }, 2000);
    }

});

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
    dataF.email = profile.getEmail()
    console.log(dataF)

    fetch("#", {

        // Adding method type
        method: "POST",

        // Adding body or contents to send
        body: JSON.stringify(dataF),

        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

}