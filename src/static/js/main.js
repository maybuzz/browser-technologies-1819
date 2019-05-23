const form = document.getElementsByName("form")
const inputs = selectorChecker(".checkbox")
const quantity = selectorChecker(".quantity")
const checked = selectorChecker(".checked")
const progressBar = selectorChecker(".progressbar-bar")
const progressLabel = selectorChecker(".progressbar-label")
const saveBtn = selectorChecker(".saveBtn")

saveBtn[0].classList.add('none')

for (var i = 0; i < inputs.length; i++) {
  saveBtn[0].classList.add('none')
  inputs[i].addEventListener("change", () => {
    form[0].submit()
  })
}

for (var i = 0; i < quantity.length; i++) {
  saveBtn[0].classList.add('none')
  quantity[i].addEventListener("change", () => {
    form[0].submit()
  })
}

progress()

function progress() {
  let count = inputs.length
  let done = checked.length

  // total blocks
  for(var i = 0; i < count; i++){
     var newDiv = document.createElement('div')
     newDiv.setAttribute('class', 'block')
     progressBar[0].appendChild(newDiv)
  }

  // done blocks
  for(var i = 0; i < done; i++){
     var newnewDiv = selectorChecker('.block')
     newnewDiv[i].classList.add("done")
  }

  // percentage
  if(done > 0 ) {
    var percentage = parseInt(((done / count) * 100),10)
    var text = document.createElement('p')
       text.setAttribute('class', 'progressbar-label')
       text.textContent = percentage +  "%"
       progressBar[0].appendChild(text)
  }
}

function selectorChecker(q) {
    if ("querySelectorAll" in document) {
        return document.querySelectorAll(q)
    } else {
        q = q.substr(1)
        return document.getElementsByClassName(q)[0]
    }
}
