const express = require('express')
const handlebars = require('express-handlebars')

const app = express()

app.use(express.urlencoded({extended:true}))

app.engine('handlebars', handlebars.engine())

app.set('views', './views')

app.set('view engine', 'handlebars')

let productos = []

app.get('/',(req,res)=>{
    res.render('formulario') 
})

app.post('/',(req,res)=>{
    productos.push(req.body)
    res.redirect('/')
})

app.get('/productos',(req,res)=>{
    res.render('historial',{productos}) 
    console.log(productos);
})

const server = app.listen(8080)