// resource addEventListener: https://stackoverflow.com/questions/42080365/using-addeventlistener-and-getelementsbyclassname-to-pass-an-element-id/42080408
// Monika @monikaas helped me write this save function

// Checking if storage is available in different browsers
function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

if (storageAvailable('localStorage')) {
  const el = document.getElementsByClassName("product__check");
  let i = el.length;
  const quantity = document.getElementsByClassName("product__quantity");
  const list = document.getElementById("page").innerHTML;

  for (let i = 0; i < el.length; i++) {
    (index => {
      el[index].addEventListener("click", save);
    })(i);
  }

  function save() {
    for (i = 0; i < el.length; i++) {
      localStorage.setItem(list + "-" + el[i].value, el[i].checked);
    }
    console.log(localStorage);
  }

  //for loading
  for (i = 0; i < el.length; i++) {
    el[i].checked =
      localStorage.getItem(list + "-" + el[i].value) === "true" ? true : false;
  }
}
else {
  console.alert("localStorage is not detected. Checked boxes will not be saved to the database. Open this is a browser that does support localStorage.")
}
