// resource addEventListener: https://stackoverflow.com/questions/42080365/using-addeventlistener-and-getelementsbyclassname-to-pass-an-element-id/42080408
// Monika @monikaas helped me write this save function

const i, el = document.getElementsByClassName('product__check')
const quantity = document.getElementsByClassName('product__quantity')
const list = document.getElementById('page').innerHTML

for(let i = 0; i < el.length; i++) {
  ((index) => {
    el[index].addEventListener('click', save)
  })(i)
}

function save() {
    for (i = 0; i < el.length; i++) {
        localStorage.setItem(list+'-'+el[i].value, el[i].checked)
    }
    console.log(localStorage)
}

//for loading
for (i = 0; i < el.length; i++) {
  el[i].checked = localStorage.getItem(list+'-'+el[i].value) === 'true' ? true:false
}
