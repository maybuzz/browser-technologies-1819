// Code van Titus Wormer: https://github.com/cmda-be/course-17-18/blob/master/examples/mongodb-server/static/index.js
const deleteButton = document.getElementById('remove')

if (deleteButton.onclick) {
  console.log("clicked to remove");
  sendDelete()
}

console.log(sendDelete());

function sendDelete(event) {
  var name = this.dataset.list
  fetch('/' + name, {method: 'delete'})
    .then(onDelete)
    .then(onSucces, onError)
}

function onDelete(res) {
  res.json()
}

function onSucces() {
  window.location = "/"
}

function onError(err) {
  if(err) {
    console.log('Jammurrrr, kan niet verwijderen!')
  }
}
