//dragElement(document.getElementById("mydiv"));

function dragElement(elmnt1) {

  console.log(elmnt1);

  elmnt = document.getElementById(elmnt1);

  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }

}

var contadorNotas = 1;

function addNote(textNote){
  const newNote = document.createElement("div");
  const text = document.createTextNode(document.getElementById(textNote).value);

  console.log(text);

  if (text.textContent === ""){
    alert("Las notas no pueden estar en blanco");
    return
  }

  var color = Math.floor(Math.random() * (4 - 1)) + 1;
  console.log(color);

  if (color === 1){
    newNote.setAttribute("style","top: 429px; left: 534px; background: linear-gradient(to bottom, #e7da8f 20% , #faec9b 20%);");
  }else if (color === 2) {
    newNote.setAttribute("style","top: 429px; left: 534px; background: linear-gradient(to bottom, #739ebb 20% , #8ec2e4 20%);");
  }else if (color === 3){
    newNote.setAttribute("style","top: 429px; left: 534px; background: linear-gradient(to bottom, #cea680 20% , #e4b88e 20%);");
  }else{

  }

  newNote.setAttribute("id",contadorNotas);
  newNote.setAttribute("class","note");
  newNote.setAttribute("onclick","dragElement(id)");
  //newNote.setAttribute("style","top: 429px; left: 534px; background: #" + randomColor);
  
  document.body.appendChild(newNote)
  newNote.appendChild(text)

  contadorNotas = contadorNotas + 1;

}