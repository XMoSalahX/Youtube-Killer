var StaticServer = require("static-server")

var server = new StaticServer({
    rootPath: "./dist/",
    port: 8000,
    templates: {
        index: 'login-page.html', // optional, defaults to 'index.html'
        notFound: '404.html' // optional, defaults to undefined
    }
})

server.start(function() {
    console.log("Server running Mohammed")
})