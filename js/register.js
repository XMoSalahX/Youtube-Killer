//target the main element 
var submit = document.getElementById("submit")
var fullName = document.querySelector("input[type='text']")
var email = document.querySelector("input[type='email']")
var password = document.querySelector("input[type='password']")
var checkBox = document.querySelector("input[type='checkbox']")
var fbLogin = document.querySelector(".fa-facebook-f")
var googleLogin = document.querySelector(".fab fa-google")
var allert = document.querySelector(".allert")



// data Will be push to database
let data = {}


// get data form user from Our Site
submit.addEventListener("click", function(event) {
    event.preventDefault()
    data.name = fullName.value
    data.email = email.value
    data.password = password.value
    if (checkBox.checked && fullName.value != "" && email.value != "" && password != "") {
        // display allert
        allert.style.display = "block";
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
}


// To Back end developer 
/*/
    * The data you will be sending : 
    - data.name             // Username
    - data.email            // User Email              
    - data.password         // User Password
*/