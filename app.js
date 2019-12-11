const express = require('express')
const app = express()

//static middlewares
app.use(express.static('public'))

//index route -> server ayağa kaltığı zaman, site adresi çağırıldığında bu komut çalışır
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/views/index.html") 
    //sunucuyu çalıştırmak için index.html sayfası oluşturulmalıdır.
})

//listen on port 3000
server = app.listen(3000) //server çalışmaya başlar
console.log("localhost:3000") // ser

const io = require("socket.io")(server) //socket io implement edilir ve server

io.on('connection', (socket) => {
    console.log("New user connected")

    //default username
    socket.username = "Anonymous"

    //listen on change_username
    socket.on("change_username", (data) => {
        console.log(socket.username + " changed name as " + data.username)
        socket.username = data.username
    })

    //listen on new_message
    socket.on("new_message", (data)=>{
        console.log(socket.username + " is said " + data.message)
        //broadcast the new message
        io.sockets.emit("new_message", {message : data.message, username : socket.username})
    })
})