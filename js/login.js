//target the main element 
var submit = document.getElementById("submit")
var email = document.querySelector("input[type='email']")
var password = document.querySelector("input[type='password']")
var checkBox = document.querySelector("input[type='checkbox']")
var fbLogin = document.querySelector(".fa-facebook-f")
var allert = document.querySelector(".allert")



// get data From local Storage 
getDataFromLocalStorage()



// data Will be push to database
var dataL = {}

// array to store User Data To Local Storage
let arrayUserData = []


// get data form user from Our Site
submit.addEventListener("click", function(event) {
    event.preventDefault()
    dataL.email = email.value
    dataL.password = password.value
    console.log(dataL)
    if (email.value == "" || password == "") {
        // display allert
        allert.style.display = "block";
    }
    if (email.value != "" && checkBox.checked && password != "") {
        // Call function to store New Data To Local Storage
        addUserDataToArray(dataL.email, dataL.password)
        addDataToLocalStorage(arrayUserData)
        console.log(arrayUserData)
        console.log(JSON.stringify(arrayUserData))
    }

    // POST request using fetch()
    fetch("#", {

        // Adding method type
        method: "POST",

        // Adding body or contents to send
        body: JSON.stringify(dataL),

        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

    // Converting to JSON
    .then(response => response.json())

    // Displaying results to console
    .then(json => console.log(json));
});

// function to store New Data To Local Storage
function addUserDataToArray(email, password) {
    // User Data 
    const UserData = {
        email: email,
        password: password
    }
    arrayUserData.push(UserData)
}

allert.addEventListener("click", function() {
    allert.style.display = "none";
})

// to add Data to local Storage
function addDataToLocalStorage(arrayUserData) {
    window.localStorage.setItem("User Data", JSON.stringify(arrayUserData))
}

// Function To get Data From Local Storage
function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("User Data")
    if (data) {
        let UserDataFromLocal = JSON.parse(data)
        console.log(UserDataFromLocal)
        email.value = UserDataFromLocal[UserDataFromLocal.length - 1].email
        password.value = UserDataFromLocal[UserDataFromLocal.length - 1].password
    }
}





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
    dataL.email = profile.getEmail()
    dataL.password = id_token.substring(0, 25)
    console.log(dataL)

    // POST request using fetch()
    fetch("#", {

        // Adding method type
        method: "POST",

        // Adding body or contents to send
        body: JSON.stringify(dataL),

        // Adding headers to the request
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })

    // Converting to JSON
    .then(response => response.json())

    // Displaying results to console
    .then(json => console.log(json));
}






// To Back end developer 
/*/
    * The data you will be sending : 
    - dataL.email            // User Email              
    - dataL.password         // User Password
*/