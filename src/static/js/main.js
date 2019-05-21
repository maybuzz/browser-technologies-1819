const form = document.getElementsByName("form")
const inputs = document.getElementsByClassName("checkbox")
const checked = document.getElementsByClassName("checked")
const progressBar = document.getElementsByClassName("progressbar-bar")

for (var i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("change", () => {
    form[0].submit()
  })
}

progress()

function progress() {
  // get box count
  let count = inputs.length;
  let done = checked.length;

  console.log(count)
  console.log(done)

  // count total blocks
  for(var i = 0; i < count; i++){
     var newDiv = document.createElement('div')
     newDiv.setAttribute('class', 'block')
     progressBar[0].appendChild(newDiv)
  }

  for(var i = 0; i < done; i++){
     var newnewDiv = document.getElementsByClassName('block')
     newnewDiv[0].classList.add("done")
  }

  // for (var i = 0; i < count; i++) {
  //   inputs[i].addEventListener("change", () => {
  //
  //       // calculate percentage + set label
  //       var percentage = parseInt(((done / count) * 100),10);
  //       document.getElementsByClassName("progressbar-bar").progressbar({
  //               value: percentage
  //           });
  //       $(".progressbar-label").text(percentage + "%")
  //   })
  // }
}
