'use strict'

const ejs = require('ejs')
const mongo = require('mongodb')
const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

require('dotenv').config()

const connectDb = function () {
  return mongoose.connect(process.env.DB_URL, {useNewUrlParser: true})
}

connectDb().then(async () => {
  app.listen(process.env.PORT, () =>
    console.log(`Listening on port ${process.env.DB_PORT}!`)
  )
})

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

const createListWithProduct = async function () {
  const list1 = new models.List({
    listName: 'first',
  })

  const list2 = new models.List({
    listName: 'second',
  })

  const product1 = new models.Product({
    productName: 'Tomaten',
    listName: list1.id,
  })

  const product2 = new models.Product({
    productName: 'Bier',
    listName: list2.id,
  })

  const product3 = new models.Product({
    productName: 'Brood',
    listName: list2.id,
  })

  await product1.save()
  await product2.save()
  await product3.save()

  await list1.save()
  await list2.save()
}

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
