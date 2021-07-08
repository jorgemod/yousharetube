const express = require('express');
const app = express();
const cors = require('cors');
//para obtener el puerto del servidor
require('dotenv').config();

const port = process.env.PORT;
const httpServer = require('http').createServer(app);

const io = require('socket.io')(httpServer);

//middlewares
app.use(express.static(__dirname + '/public')); //directorio publico por el cual siempre va a pasar


//configuracion de socket

io.on("connection", socket => { 
    console.log("Cliente conectado")
    
});

//open port 
httpServer.listen(port, () => {
    console.log("escuchando en el puerto:",port);
})
