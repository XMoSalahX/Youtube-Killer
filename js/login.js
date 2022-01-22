//target the main element 
{
    var submit = document.getElementById("submit")
    var email = document.querySelector("input[type='email']")
    var password = document.querySelector("input[type='password']")
    var checkBox = document.querySelector("input[type='checkbox']")
    var fbLogin = document.querySelector(".fa-facebook-f")
    var allert = document.querySelector(".allert")
    var alertEmail = document.querySelector(".email")
    var alertpass = document.querySelector(".password")


    let boolMail = false
    let boolPass = false


    function validateEmail(emailAdress) {
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (emailAdress.match(regexEmail)) {
            return true;
        } else {
            return false;
        }
    }

    email.addEventListener("input", function() {
        var value = validateEmail(this.value)
        if (value == false) {
            alertEmail.innerHTML = "Invalid Email"
            alertEmail.style.color = "red"
        } else {
            alertEmail.innerHTML = "Great!"
            alertEmail.style.color = "#2ad4bc"
            boolMail = true
        }
    })


    function passwordCheck(input, allert) {
        input.addEventListener("input", function() {
            if (input.value == "") {
                allert.innerHTML = "Password is empty"
                allert.style.color = "red"
                return false
            } else {
                if (input.value.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)) {
                    allert.innerHTML = "Great!"
                    allert.style.color = "#2ad4bc"

                    boolPass = true
                } else {
                    allert.innerHTML = "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character."
                    allert.style.color = "red"

                }
            }
        })
    }

    passwordCheck(password, alertpass)


    // get data From local Storage 
    getDataFromLocalStorage()



    // data Will be push to database
    var dataL = {}

    // array to store User Data To Local Storage
    let arrayUserData = []


    // get data form user from Our Site
    submit.addEventListener("click", function(event) {

        event.preventDefault()
        if (boolMail === true && boolPass === true) {

            dataL.email = email.value
            dataL.password = password.value
            console.log(dataL)
            if (email.value != "" && checkBox.checked && password != "") {
                // Call function to store New Data To Local Storage
                addUserDataToArray(dataL.email, dataL.password)
                addDataToLocalStorage(arrayUserData)
                console.log(arrayUserData)
                console.log(JSON.stringify(arrayUserData))
            }

            // POST request using fetch()
            fetch("https://localhost:44349/api/Account/GetAccess", {

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
            .then(function(json) {
                    console.log(json)
                    if (json.hasError == false) {
                        allert.style.display = "block"
                        allert.style.backgroundColor = "#d1e7dd"
                        console.log(json.data.token)
                        window.sessionStorage.setItem("Access token", JSON.stringify(json.data.token))
                        window.sessionStorage.setItem("Username", JSON.stringify(json.data.userName))
                        let countRedirect = 5
                        setInterval(() => {
                            allert.innerHTML = `<b>Congrats</b>, and We will now direct you to the home page during ${countRedirect}`

                            countRedirect--
                        }, 1000);
                        setTimeout(() => {
                            window.location = "home-page.html"
                        }, 6000);
                    } else {
                        allert.innerHTML = "<b>Error, </b>" + "Please review the input fields."
                        allert.style.display = "block"
                        alertEmail.style.color = "red"
                        if (json.errorsDictionary.AuthenticatingError) {
                            alertEmail.innerHTML = json.errorsDictionary.AuthenticatingError
                            alertpass.innerHTML = json.errorsDictionary.AuthenticatingError
                            alertpass.style.color = "red"
                        }
                        if (json.errorsDictionary.FormValidationError_Email) {
                            alertEmail.innerHTML = json.errorsDictionary.FormValidationError_Email

                        }
                    }
                })
                .catch(err => console.log(err))
        }
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

    const force = document.querySelector("#force")
    force.addEventListener("click", function() {
        window.location = "register-page.html"
    })

    const force2 = document.querySelector("#force2")
    force2.addEventListener("click", function() {
        window.sessionStorage.setItem("Go To Ver", "Go")
        window.location = "register-page.html"
    })

}