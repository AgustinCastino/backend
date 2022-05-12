const express = require('express')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set('views', './views')

app.set('view engine', 'pug')

let productos = []
let cont = 0

app.get('/',(req,res)=>{
    res.render('inicio')
})

app.post('/', (req,res)=>{
    productos.push(req.body)
    res.redirect('/')
    console.log(productos);
})

app.get('/productos', (req,res)=>{

    res.render('historial', {productos})
    cont ++
})

const server = app.listen(8080)