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
  .set('view engine', 'ejs')
  .set('views', 'views')
  .get('/', index)
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
  list: function () {
    const listSchema = new mongoose.Schema({
      listName: {
        type: String,
        unique: true
      }
    })

    listSchema.statics.findByName = async function (name) {
      let list = await this.findOne({
        listName: name,
        date: { type: Date, default: Date.now }
      })

      return list
    }

    listSchema.pre('remove', function(next) {
      this.model('Product').deleteMany({ list: this._id }, next)
    })

    const List = mongoose.model('List', listSchema)
  }
}

const product = {
  product: function () {
    const productSchema = new mongoose.Schema({
      productName: String,
      quantity: Number,
      list: { type: mongoose.Schema.Types.ObjectId, ref: 'List' },
    })

    const Product = mongoose.model('Product', productSchema)
  }
}

function index(req, res) {
  console.log("index")

  // res.render('main.ejs', {
  //   page: 0
  // })

  res.render('listDetail.ejs', {
    page: 1
  })
}
