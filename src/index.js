'use strict'

const ejs = require('ejs')
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const fs = require('fs')
const app = express()

app
  .use(express.static(path.join(__dirname, 'static')))
  .use(bodyParser.urlencoded({ extended: true }))
  .set('view engine', 'ejs')
  .get('/', index)
  .post('/', addList)
  .post('/remove/:id', removeList)
  .get('/:name', detail)
  .post('/:name', addTask)
  .post('/save/:name', saveTasks)
  .post('/delete/:name/:id', removeTask)
  .listen(process.env.PORT || 1999)

function index(req, res) {
  console.log("index")

  const data = JSON.parse(fs.readFileSync('static/db/lists.json', 'UTF8'))

  res.render('main.ejs', {
    lists: data
  })
}

function addList(req, res) {
  console.log("redirect to list")

  const data = JSON.parse(fs.readFileSync('static/db/lists.json', 'UTF8'))

  if (req.body.list.length > 0) {

    const newList = {
      name: req.body.list.toLowerCase(),
      date: new Date().toDateString(),
      items: []
    }

    data.push(newList)

    fs.writeFileSync('static/db/lists.json', JSON.stringify(data))
    res.redirect('/' + newList.name)
  } else {
    res.redirect('/')
  }

}

function removeList(req, res, err){
  console.log("remove list")
  const data = JSON.parse(fs.readFileSync('static/db/lists.json', 'UTF8'))

  let id = req.params.id

  const updatedLists = data.filter(list => list.name !== id)

  fs.writeFileSync('static/db/lists.json', JSON.stringify(updatedLists))

  res.redirect('/')
}

function detail(req, res) {
  console.log("detail")

  const data = JSON.parse(fs.readFileSync('static/db/lists.json', 'UTF8'))

  const list = data.find(list => list.name === req.params.name.toLowerCase())
  const totalLists = data

  if (!list) {
    // bestaat niet, dus render 404
    return res.render('error.ejs')
  }

  res.render('listDetail', {
    name: req.params.name.toLowerCase(),
    list: list,
    lists: data
  })
}

function addTask(req, res, err) {
  console.log("add product to list")

  const data = JSON.parse(fs.readFileSync('static/db/lists.json', 'UTF8'))

  if (req.body.product.length > 0) {
    let list
    data.forEach((obj) => {
      if(obj.name === req.params.name){
        list = obj
      }
    })

    const newProduct = {
      name: req.body.product,
      quantity: req.body.quantity,
      checkbox: "off"
    }

    list.items.push(newProduct)

    fs.writeFileSync('static/db/lists.json', JSON.stringify(data))
  }

  res.redirect('/'+req.params.name.toLowerCase())
}

function saveTasks(req, res, err) {
  console.log("save tasks")

  const data = JSON.parse(fs.readFileSync('static/db/lists.json', 'UTF8'))
  const body = Object.entries(req.body)
  const list = data.find(list => list.name === req.params.name.toLowerCase())

  if (!list) {
    // bestaat niet, dus render 404
    return res.render('error.ejs')
  }

  const newList = list.items.map(item => {
    // {name: doeg, ...}
    const filtered = body.filter(input => {
      const inputFull = input[0] // quantity_doeg, checkbox_doeg

      const split = inputFull.split('_') // [quantity, doeg]
      const inputName = split[1] // doeg
      return inputName === item.name
    })
    // filtered : [[quantity_doeg, 1], [checkbox_doeg, 'on']]

    const relevant = {}

    filtered.forEach(input => {
      // input : ['quantity_doeg' , 1]
      const key = input[0].split('_')[0]
      const value = input[1]
      relevant[key] = value
    })

    // relevant = alle inputs die bij item doeg horen (dus {quantity: 1, checkbox: 'on'})

    const quantity = relevant.quantity

    const checkbox = relevant.checkbox || 'off'

    return {name: item.name, quantity, checkbox }
  })

  list.items = []

  for (var i = 0; i < newList.length; i++) {
    list.items.push(newList[i])
  }

  fs.writeFileSync('static/db/lists.json', JSON.stringify(data))

  res.redirect('/'+req.params.name.toLowerCase())
}

function removeTask(req, res) {
  console.log("remove task")

  const data = JSON.parse(fs.readFileSync('static/db/lists.json', 'UTF8'))

  const name = req.params.name
  let id = req.params.id

  const list = data.find(list => list.name === name)

  const updatedItems = list.items.filter(item => item.name !== id)

  list.items = updatedItems

  fs.writeFileSync('static/db/lists.json', JSON.stringify(data))

  res.redirect('/'+req.params.name.toLowerCase())
}
