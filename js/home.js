// Verify that the user has permissions to access the page or not

fetch("https://localhost:44349/api/Media/HomeData", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${JSON.parse( window.sessionStorage.getItem("Access token"))}`,
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(response => response.json())
    .then(function(json) {
        console.log(json)
        let backData = json.data
        console.log(backData)

        if (json.hasError === false) {
            const recent = document.querySelector(".Recent")
            console.log(json.data.Recent.length)

            for (i = 0; i < json.data.Recent.length; i++) {
                console.log(i)
                let box = document.createElement("div")
                box.classList = "box"
                recent.appendChild(box)
                let divImg = document.createElement("div")
                divImg.classList = "img"
                box.appendChild(divImg)
                let realImg = document.createElement("img")
                realImg.setAttribute("src", json.data.Recent[i].coverSource)
                divImg.appendChild(realImg)
                let content = document.createElement("div")
                content.classList = "boxContent"
                box.appendChild(content)
                let h2 = document.createElement("h2")
                h2.innerHTML = json.data.Recent[i].title
                h2.classList = json.data.Recent[i].id
                content.appendChild(h2)
                let p = document.createElement("p")
                p.innerHTML = json.data.Recent[i].description + "......"
                content.appendChild(p)
                let view = document.createElement("div")
                view.classList = "veiws"
                view.innerHTML = "Views: " + json.data.Recent[i].viewsCount
                content.appendChild(view)
            }
            const Recommended = document.querySelector(".Recommended")
            for (i = 0; i < json.data.Recommended.length; i++) {
                console.log(i)
                let box = document.createElement("div")
                box.classList = "box"
                Recommended.appendChild(box)
                let divImg = document.createElement("div")
                divImg.classList = "img"
                box.appendChild(divImg)
                let realImg = document.createElement("img")
                realImg.setAttribute("src", json.data.Recommended[i].coverSource)
                divImg.appendChild(realImg)
                let content = document.createElement("div")
                content.classList = "boxContent"
                box.appendChild(content)
                let h2 = document.createElement("h2")
                h2.innerHTML = json.data.Recommended[i].title
                h2.classList = json.data.Recommended[i].id
                content.appendChild(h2)
                let p = document.createElement("p")
                p.innerHTML = json.data.Recommended[i].description + "......"
                content.appendChild(p)
                let view = document.createElement("div")
                view.classList = "veiws"
                view.innerHTML = "Views: " + json.data.Recommended[i].viewsCount
                content.appendChild(view)
            }
            const cartoons = document.querySelector(".Cartoons")
            console.log(json.data.Cartoons.length)
            for (i = 0; i < json.data.Cartoons.length; i++) {
                console.log(i)
                let box = document.createElement("div")
                box.classList = "box"
                cartoons.appendChild(box)
                let divImg = document.createElement("div")
                divImg.classList = "img"
                box.appendChild(divImg)
                let realImg = document.createElement("img")
                realImg.setAttribute("src", json.data.Cartoons[i].coverSource)
                divImg.appendChild(realImg)
                let content = document.createElement("div")
                content.classList = "boxContent"
                box.appendChild(content)
                let h2 = document.createElement("h2")
                h2.innerHTML = json.data.Cartoons[i].title
                h2.classList = json.data.Cartoons[i].id
                content.appendChild(h2)
                let p = document.createElement("p")
                p.innerHTML = json.data.Cartoons[i].description + "......"
                content.appendChild(p)
                let view = document.createElement("div")
                view.classList = "veiws"
                view.innerHTML = "Views: " + json.data.Cartoons[i].viewsCount
                content.appendChild(view)
            }

            const Movies = document.querySelector(".Movies")
            for (i = 0; i < json.data.Movies.length; i++) {
                console.log(i)
                let box = document.createElement("div")
                box.classList = "box"
                Movies.appendChild(box)
                let divImg = document.createElement("div")
                divImg.classList = "img"
                box.appendChild(divImg)
                let realImg = document.createElement("img")
                realImg.setAttribute("src", json.data.Movies[i].coverSource)
                divImg.appendChild(realImg)
                let content = document.createElement("div")
                content.classList = "boxContent"
                box.appendChild(content)
                let h2 = document.createElement("h2")
                h2.innerHTML = json.data.Movies[i].title
                h2.classList = json.data.Movies[i].id
                content.appendChild(h2)
                let p = document.createElement("p")
                p.innerHTML = json.data.Movies[i].description + "......"
                content.appendChild(p)
                let view = document.createElement("div")
                view.classList = "veiws"
                view.innerHTML = "Views: " + json.data.Movies[i].viewsCount
                content.appendChild(view)
            }

            const Series = document.querySelector(".Series")
            for (i = 0; i < json.data.Series.length; i++) {
                console.log(i)
                let box = document.createElement("div")
                box.classList = "box"
                Series.appendChild(box)
                let divImg = document.createElement("div")
                divImg.classList = "img"
                box.appendChild(divImg)
                let realImg = document.createElement("img")
                realImg.setAttribute("src", json.data.Series[i].coverSource)
                divImg.appendChild(realImg)
                let content = document.createElement("div")
                content.classList = "boxContent"
                box.appendChild(content)
                let h2 = document.createElement("h2")
                h2.innerHTML = json.data.Series[i].title
                h2.classList = json.data.Series[i].id
                content.appendChild(h2)
                let p = document.createElement("p")
                p.innerHTML = json.data.Series[i].description + "......"
                content.appendChild(p)
                let view = document.createElement("div")
                view.classList = "veiws"
                view.innerHTML = "Views: " + json.data.Series[i].viewsCount
                content.appendChild(view)
            }
        } else {
            console.log("Server Error")
        }
    })