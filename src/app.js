'use strict'

const ejs = require('ejs')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app
  .use(express.static('static'))
  .use(bodyParser.urlencoded({ extended: true }))
  .set('view engine', 'ejs')
  .set('views', 'views')
  .get('/', index)
  .get('/add', form)
  .post('/', addList)
  .get('/:name', detail)
  .post('/:name', addProduct)
  .listen(1999)

const list = {
  list: ["Ontbijt", "Lunch", "Avondeten"]
}

const product = {
  products: ["Brood", "Melk", "Eieren"],
  quantity: ["1", "1", "6"]
}

function index(req, res) {
  console.log("index")

  const lists = list.list

  res.render('main.ejs', {
    list: lists
  })
}

function form (req, res) {
  console.log("add new list")

  res.render('newList.ejs')
}

function addList(req, res) {
  console.log("redirect to list")

  var lists = list.list
  console.log(lists)
  var newList = req.body.list

  lists.push(newList)

  res.redirect('/' + newList)
}

function detail(req, res) {
  console.log("detail")

  const products = product.products
  const quantity = product.quantity

  res.render('listDetail.ejs', {
    product: products,
    quantity: quantity
  })
}

function addProduct(req, res) {
  console.log("add product to list")

  var products = product.products
  var quantities = product.quantity

  console.log(products)

  var newProduct = req.body.product
  var quantity = req.body.quantity

  products.push(newProduct)
  quantities.push(quantity)

  res.redirect('/:name')
}
