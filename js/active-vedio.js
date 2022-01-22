window.addEventListener("click", function(e) {


})
if (window.sessionStorage.getItem("Access token")) {
    console.log("Success")
} else {
    window.location = "login-page.html"
}

if (window.sessionStorage.getItem("Get Post")) {
    document.querySelector(".heading").scrollIntoView({
        behavior: "smooth",
        block: "start"
    })
}


$(document).ready(function() {
    // Target your .container, .wrapper, .post, etc.
    $(".ifram").fitVids();
});

const firstSecion = document.querySelector("ul li")
firstSecion.addEventListener("click", function() {
    window.sessionStorage.setItem("target", "firstSection")
    window.location = "home-page.html"
})

const secondSection = document.querySelector("li:nth-child(2)")
secondSection.addEventListener("click", function() {
    window.sessionStorage.setItem("target", "secondSection")
    window.location = "home-page.html"
})

const thirdSection = document.querySelector("li:nth-child(3)")
thirdSection.addEventListener("click", function() {
    window.sessionStorage.setItem("target", "thirdContent")
    window.location = "home-page.html"
})


const forthSection = document.querySelector("li:nth-child(4)")
forthSection.addEventListener("click", function() {
    window.sessionStorage.setItem("target", "forthContent")
    window.location = "home-page.html"
})

const fifthSection = document.querySelector("li:nth-child(5)")
fifthSection.addEventListener("click", function() {
    window.sessionStorage.setItem("target", "fithContent")
    window.location = "home-page.html"
})
let reload = false
console.log(JSON.parse(window.sessionStorage.getItem("Get Post")).mediaItem.mediaId)
fetch(`https://localhost:44349/api/Media/GetSpecificMedia?mediaId=${JSON.parse(window.sessionStorage.getItem("Get Post")).mediaItem.mediaId}&commentsTotalCount=10&repliesTotalCount=10`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${JSON.parse( window.sessionStorage.getItem("Access token"))}`,
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(response => response.json())
    .then(function(json) {
        console.log(json)
        window.sessionStorage.removeItem("Get Post")
        window.sessionStorage.setItem("Get Post", JSON.stringify(json.data))
        reload = true
        start()

    })
var videoData = JSON.parse(sessionStorage.getItem("Get Post"))
const videoHolder = document.querySelector(".vedioHolder")
videoHolder.innerHTML = `<div class="ifram">
    <iframe src="${videoData.mediaItem.source}" height= "180%" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>
    <div class="controler">
    <h2 class="vedioTitle">${videoData.mediaItem.title}</h2>
    <div class="reaction"> 
      <div class="like"> <i class="far fa-thumbs-up"></i> Like</div>
      <div class="disLike"> <i class="far fa-thumbs-down"></i> DisLike</div>
      <div class="share"> <i class="far fa-share-square"></i> Share</div>
      
    </div>
    
    </div>
    <div class="sharethis-inline-share-buttons" style="margin-bottom:20px"></div> 
    <div class="describtion"> 
    <p class="desc">${videoData.mediaItem.description}</p><span class="timeOfPublish">${videoData.mediaItem.createdAt}</span>
    </div>`

function start() {
    videoData = JSON.parse(sessionStorage.getItem("Get Post"))
    const like = document.querySelector(".like")
    const disLike = document.querySelector(".disLike")

    if (videoData.mediaItem.react === 1) {
        like.style.color = "#2ad4bc"
    } else if (videoData.mediaItem.react === 2) {
        disLike.style.color = "#2ad4bc"
    }

    like.addEventListener("click", function() {
        like.style.color = "#2ad4bc"
        disLike.style.color = "black"
        let data = {}
        data.mediaId = videoData.mediaItem.mediaId
        data.reactTypeId = 1
        fetch("https://localhost:44349/api/Media/AddOrRemoveMediaReact", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${JSON.parse( window.sessionStorage.getItem("Access token"))}`,
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(data)
            }).then(response => response.json())
            .then(function(json) {
                console.log(json)
            })
            .catch(err => console.log(err))
    })


    disLike.addEventListener("click", function() {
        disLike.style.color = "#2ad4bc"
        like.style.color = "black"
        let data = {}
        data.mediaId = videoData.mediaItem.mediaId
        data.reactTypeId = 2
        fetch("https://localhost:44349/api/Media/AddOrRemoveMediaReact", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${JSON.parse( window.sessionStorage.getItem("Access token"))}`,
                    "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(data)
            }).then(response => response.json())
            .then(function(json) {
                console.log(json)
            })
            .catch(err => console.log(err))
    })





    const sidebar = document.querySelector(".boxContainer")
    for (i = 0; i < videoData.suggestedMedia.length; i++) {
        console.log(i)
        let box = document.createElement("div")
        box.classList = "box"
        sidebar.appendChild(box)
        let divImg = document.createElement("div")
        divImg.classList = "img"
        box.appendChild(divImg)
        let realImg = document.createElement("img")
        realImg.setAttribute("src", videoData.suggestedMedia[i].coverSource)
        divImg.appendChild(realImg)
        let content = document.createElement("div")
        content.classList = "boxContent"
        box.appendChild(content)
        let h2 = document.createElement("h2")
        h2.innerHTML = videoData.suggestedMedia[i].title
        h2.classList = videoData.suggestedMedia[i].id
        content.appendChild(h2)
        let p = document.createElement("p")
        p.innerHTML = videoData.suggestedMedia[i].description + "......."
        content.appendChild(p)
        let view = document.createElement("div")
        view.classList = "veiws"
        view.innerHTML = "Views: " + videoData.suggestedMedia[i].viewsCount
        view.style.textAlign = "right"
        view.style.color = "#2ad4bc"
        view.style.marginBlock = "10px"
        content.appendChild(view)
    }




    window.addEventListener("click", function(e) {
        h2S = document.querySelectorAll(".box h2")
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
                            window.location = "active-vedieo.html"
                        }
                    })
                    .catch(err => console.log(err))
            }
        })




        let edit = document.querySelectorAll("button.Edit")
        edit.forEach(function(el) {
            if (e.target === el) {
                console.log(el.classList[1])
                const area = document.querySelector(`textarea.${e.target.classList[1]}`)
                console.log(document.querySelector(`textarea.${e.target.classList[1]}`))
                area.removeAttribute("disabled")
                area.style.backgroundColor = "#d1e7dd"
                const allera = document.querySelector(`.userAndComment.${el.classList[1]}`)
                allera.style.backgroundColor = "#d1e7dd"
                console.log(e.target)
                e.target.style.display = "none"
                const openSubmit = document.querySelector(`.submit.${el.classList[1]}`)
                openSubmit.style.display = "block"
            }
        })
        let subedit = document.querySelectorAll("button.submit")
        subedit.forEach(function(el) {
            if (e.target === el) {
                console.log(`textarea.${el.classList[1]}`)
                const area = document.querySelector(`textarea.${el.classList[1]}`)
                area.setAttribute("disabled", "")
                area.style.backgroundColor = "#EEE"
                const allera = document.querySelector(`.userAndComment.${e.target.classList[1]}`)
                allera.style.backgroundColor = "#EEE"
                let data = {}
                data.commentId = el.classList[1].substring(2)
                data.commentText = area.value
                fetch("https://localhost:44349/api/Media/EditMediaComment", {
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
                    })
                const openSubmit = document.querySelector(`.submit.${el.classList[1]}`)
                openSubmit.style.display = "none"
                const disEd = document.querySelector(`.Edit.${el.classList[1]}`)
                disEd.style.display = "block"
            }
        })
    })
    const addComment = document.querySelector(".addCommentNow")
    let commentFieldClicked = true
    addComment.addEventListener("click", function() {
        if (commentFieldClicked) {
            addComment.innerHTML = ""
            commentFieldClicked = false
        }
    })
    const commentContainer = document.querySelector(".commentBox")
    for (i = 0; i < videoData.mediaItem.comments.length; i++) {
        const buttonControl = document.createElement("div")
        buttonControl.classList = "buttonControl"
        commentContainer.prepend(buttonControl)
        const replay = document.createElement("button")
        replay.classList = `replay id${videoData.mediaItem.comments[i].commentId}`
        buttonControl.append(replay)
        replay.innerHTML = "Reply"

        if (videoData.mediaItem.comments[i].isCurrenctUser) {
            const Edit = document.createElement("button")
            Edit.classList = `Edit id${videoData.mediaItem.comments[i].commentId}`
            Edit.innerHTML = "Edit"
            buttonControl.appendChild(Edit)
        }
        const submit = document.createElement("button")
        submit.classList = `submit id${videoData.mediaItem.comments[i].commentId}`
        submit.innerHTML = "Submit"
        buttonControl.appendChild(submit)
        submit.style.display = "none"
        const userAndComment = document.createElement("div")
        commentContainer.prepend(userAndComment)
        userAndComment.classList = `userAndComment id${videoData.mediaItem.comments[i].commentId}`
        const userData = document.createElement("div")
        userData.classList = "userData"
        userAndComment.append(userData)
        const img = document.createElement("div")
        img.classList = "img"
        userData.append(img)
        img.innerHTML = `<img src="images/User.jpg" alt="User Image"></div>`
        const controlUserData = document.createElement("div")
        controlUserData.classList = "controlUserData"
        userData.append(controlUserData)
        const UserName = document.createElement("div")
        UserName.classList = "UserName"
        UserName.innerHTML = videoData.mediaItem.comments[i].commenterName
        controlUserData.append(UserName)
        const date = document.createElement("div")
        date.classList = "date"
        date.innerHTML = videoData.mediaItem.comments[i].commentCreationTime
        controlUserData.append(date)
        const textarea = document.createElement("textarea")

        textarea.classList = `id${videoData.mediaItem.comments[i].commentId}`
        userAndComment.append(textarea)
        textarea.setAttribute("disabled", "")
        textarea.innerHTML = videoData.mediaItem.comments[i].commentText
    }
    const submitComment = document.querySelector(".submitComment")
    submitComment.addEventListener("click", function() {
        data = {}
        data.mediaId = videoData.mediaItem.mediaId
        data.commentText = addComment.value
        if (addComment.value != "Please Write your Comment on This Video ") {
            if (addComment.value != "") {
                fetch("https://localhost:44349/api/Media/AddMediaComment", {
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
                        const userAndComment = document.createElement("div")

                        userAndComment.style.marginBottom = "10px"
                        userAndComment.classList = "userAndComment"
                        const buttonControl = document.createElement('div')
                        buttonControl.classList = ".buttonControl"
                        commentContainer.prepend(buttonControl)
                        buttonControl.classList = "buttonControl"
                        buttonControl.innerHTML = `
                        <button class="replay">Reply </button>
                        <button class="Edit">Edit</button>
                        <button class="submit" style="display:none">Submit</button>`
                        commentContainer.prepend(userAndComment)
                        const d = new Date();

                        userAndComment.innerHTML = `<div class="userData">
                        <div class="img"> <img src="images/User.jpg" alt="User Image"></div>
                        <div class="controlUserData">
                            <div class="UserName">${JSON.parse(window.sessionStorage.getItem("Username"))}</div>
                            <div class="date">${d.getDay()+"/"+(d.getMonth()+1)+"/"+d.getFullYear()}</div>
                        </div>
                        </div>
                        <textarea id="w3review" disabled>${data.commentText}</textarea>
                    </div>
                    `

                    })
                    .catch(err => console.log(err))
            }
        }
    })
    setTimeout(function() {
        document.querySelector(".st-cmp-settings").style.display = "none"
    }, 1500)
}

document.querySelector(".sharethis-inline-share-buttons").style.visibility = "hidden"
const share = document.querySelector(".share")
share.addEventListener("click", function() {
    document.querySelector(".sharethis-inline-share-buttons").style.visibility = "visible"
})