const express = require('express')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set('view engine', 'ejs')

let productos = []

app.get('/',(req,res)=>{
    res.render('inicio')
})

app.post('/',(req,res)=>{
    productos.push(req.body)
    res.redirect('/')
})

app.get('/productos',(req,res)=>{
    res.render('historial', {productos})
})

const server = app.listen(8080)


