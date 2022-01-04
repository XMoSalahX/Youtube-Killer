//target the main element 
var submit = document.getElementById("submit")
var email = document.querySelector("input[type='email']")
var fbLogin = document.querySelector(".fa-facebook-f")
var allert = document.querySelector(".allert")

// data Will be push to database
var dataF = {}


// get data form user from Our Site
submit.addEventListener("click", function(event) {
    event.preventDefault()
    data.email = email.value

    console.log(data)
    if (email.value != "") {
        // display allert
        allert.style.display = "block";
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
}


// To Back end developer 
/*/
    * The data you will be sending : 
    - dataF.email            // User Email              
*/