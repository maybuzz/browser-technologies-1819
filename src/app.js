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

const lists = [
  {
    name: "ontbijt",
    date: "22/3/2019",
    items: [ { name: "brood", quantity: 1 }, { name: "melk", quantity: 1 }, { name: "eieren", quantity: 6 } ]
  },
  {
    name: "lunch",
    date: "22/3/2019",
    items: [ { name: "croissantjes", quantity: 4}, { name: "jam", quantity: 1}, { name: "pesto", quantity: 1}, { name: "kaas", quantity: 1}]
  },
  {
    name: "diner",
    date: "22/3/2019",
    items: [ { name: "pasta", quantity: 1 }, { name: "tomaten", quantity: 4}, { name: "prei", quantity: 1}, { name: "saus", quantity: 1}, { name: "wortel", quantity: 4}, { name: "toetjes", quantity: 4}]
  }
]

function index(req, res) {
  console.log("index")

  res.render('main.ejs', {
    lists: lists
  })
}

function form (req, res) {
  console.log("add new list")

  res.render('newList.ejs')
}

function addList(req, res) {
  console.log("redirect to list")

  const ts = new Date()
  const date = ts.toDateString()
  const list = lists

  const newList = req.body.list.toLowerCase()

  list.push({name: newList, date: date, items: []})

  res.redirect('/' + newList)
}

function detail(req, res) {
  console.log("detail", req.params.name)

  const name = req.params.name
  const list = lists.find(list => list.name === req.params.name)
  const totalLists = lists

  if (!list) {
    // bestaat niet, dus render 404
    return res.end('Not found')
  }

  res.render('listDetail.ejs', {
    name: name,
    list: list,
    lists: lists
  })
}

function addProduct(req, res) {
  console.log("add product to list")
  let currentList = req.params.name

  var newProduct = req.body.product.toLowerCase()
  var quantity = req.body.quantity


  const found = lists.find(item => item.name.toLowerCase() === req.params.name.toLowerCase())

  if (!found) {
    // lijst bestaat niet
  }

  found.items.push({name: newProduct, quantity: quantity})


  res.redirect('/'+req.params.name)

}
