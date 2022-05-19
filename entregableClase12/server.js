const express = require('express')
const {Server: HttpServer} = require('http')
const {Server:IOServer} = require('socket.io')
const handlebars = require('express-handlebars')
const fs = require('fs')


const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

app.use(express.urlencoded({extended:true}))

app.engine('handlebars', handlebars.engine())

app.set('views', './views')

app.set('view engine', 'handlebars')

app.use(express.static('./public'))

app.get('/', (req,res)=>{
    res.render('formulario')
})

httpServer.listen(8080,(req,res)=>{
    console.log('Servidor Iniciado');
})

const mensajes = []
const productos = []

async function guardarMensaje(mensajes){
    try{

        fs.promises.writeFile('mensajes.txt', JSON.stringify(mensajes, null, 2))
    }catch(err){
        console.log(err);
    }
}

io.on('connection', (socket)=>{
    console.log('Cliente nuevo conectado');

    socket.emit('messages', mensajes)
    socket.emit('productos', productos)

    socket.on('new-message', data =>{
        mensajes.push(data)
        guardarMensaje(mensajes)


        io.sockets.emit('messages', mensajes)
    })

    socket.on('new-product', data =>{
        productos.push(data)

        io.sockets.emit('productos', productos)
    })
})
