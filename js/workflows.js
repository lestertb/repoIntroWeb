//dragElement(document.getElementById("mydiv"));

function dragElement(elmnt1) {
  
  elmnt = document.getElementById(elmnt1);
  console.log(document.getElementById(elmnt.id + "header"));

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
var tarjetaFocus=null;

function addNote(textNote){
  const newNote = document.createElement("div");
  newNote.setAttribute("onclick","dragElement(id)");

  newNote.innerHTML = '<i class="pin"></i>';
  
  newNote.setAttribute("class", "mydiv");
  newNote.setAttribute("id",contadorNotas + "n");
  var randomNumber = Math.random()*6|0 || -6;
  console.log(randomNumber);
  newNote.setAttribute("style", "top: 345px; left: 855px; transform: rotate("+randomNumber+"deg);")

  const newNote2 = document.createElement("div");
  newNote2.setAttribute("class", "mydivheader")
  newNote2.setAttribute("id",contadorNotas + "nheader");
  

  const newP = document.createElement("p");

  const text = document.createTextNode(document.getElementById(textNote).value);

  if (text.textContent === ""){
    alert("Las notas no pueden estar en blanco");
    return
  }

  newNote.addEventListener('click', function () 
  {
    tarjetaFocus=this;
  })
  
  document.body.appendChild(newNote)

  newNote.innerHTML += '<input style="position: absolute; bottom:4px; right:4px; width: 30px; height: 20px;" onchange="cambiarColor(this)" type="color">'; 

  newP.innerHTML = '<p contenteditable="true">' + text.textContent + '</p>'
  newNote.appendChild(newNote2);
  newNote.appendChild(newP);
  
  contadorNotas = contadorNotas + 1;
}

var cantColum = 3;

function addColum(textColum){
  cantColum = cantColum + 1;
  console.log(cantColum);
  const conteiner = document.getElementById('conteiner');
  const newColum = document.createElement('div');
  const text = document.createTextNode(document.getElementById(textColum).value);

  if (text.textContent === ""){
    alert("Los estados no pueden estar sin título");
    return
  }

  newColum.setAttribute('class', 'grid-item');
  newColum.setAttribute('id', cantColum);
  //newColum.appendChild(text);
  
  newColum.innerHTML += '<p contenteditable="true" style="display: inline;">'+ text.textContent + '</p>'
  newColum.innerHTML += '<button id=' + cantColum + ' onclick="deleteColum(this)" class="button-8" role="button">Eliminar</button>'

  if (cantColum <= 8)
    conteiner.setAttribute('style', 'grid-template-columns: repeat('+ cantColum +', 1fr);')
  else
    conteiner.setAttribute('style', 'grid-template-columns: repeat('+ 8 +', 1fr);')

  conteiner.appendChild(newColum);
}

function deleteColum(idEliminar) {
  console.log(cantColum);
  const columnaEliminar = document.getElementById(idEliminar.id);
  columnaEliminar.parentNode.removeChild(columnaEliminar);

  cantColum =  cantColum - 1;

  const conteiner = document.getElementById('conteiner');
  if (cantColum <= 8)
    conteiner.setAttribute('style', 'grid-template-columns: repeat('+ cantColum +', 1fr);')
  else
    conteiner.setAttribute('style', 'grid-template-columns: repeat('+ 8 +', 1fr);')
}

function cambiarColor(selectorColor){
  console.log(selectorColor.value );
  console.log(selectorColor.value - 100);
  window.localStorage.setItem(tarjetaFocus.id,selectorColor.value)
  bg=selectorColor.value;
  tarjetaFocus.style.background=bg;
}