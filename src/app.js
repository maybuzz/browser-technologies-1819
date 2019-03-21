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
  .post('/', addList)
  .get('/:name', detail)
  // .post('/:name', addProduct)
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
  list: ["Thuis", "School", "Blub"]
}

const product = {
  product: function () {}
}

function index(req, res) {
  console.log("index")

  const lists = list.list

  res.render('main.ejs', {
    list: lists
  })

}

function detail(req, res) {
  console.log("index")

  res.render('listDetail.ejs', {
    page: 1
  })
}

function addList(req, res) {
  var lists = list.list
  console.log(lists)
  var newList = req.body.list

  lists.push(newList)

  res.redirect('/' + newList, {list: lists})

  // db.collection('lists').insert({
  //   name: req.body.list,
  // }, done)

  // function done(err, data) {
  //   if (err) {
  //     res.status(404).render('error.ejs', {
  //       id: 404,
  //       title: 'Not found',
  //       detail: 'Oops, er gaat wat mis...'
  //     })
  //   } else {
  //     req.body.list = name
  //     res.redirect('/' + name)
  //   }
  // }
}
