var i, checkboxes = document.querySelectorAll('input[type=checkbox]');

var quantity = document.querySelectorAll('input[type=number]');

var list = document.getElementById('page').innerHTML;

function save() {
    for (i = 0; i < checkboxes.length; i++) {
        localStorage.setItem(list+'-'+checkboxes[i].value, checkboxes[i].checked);
    }

    console.log(localStorage);
}

 //for loading
for (i = 0; i < checkboxes.length; i++) {
  checkboxes[i].checked = localStorage.getItem(list+'-'+checkboxes[i].value) === 'true' ? true:false;
}
