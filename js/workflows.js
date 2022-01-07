let mapaColumnas= new Map();
let mapaNotas= new Map();
var ind = 1;
let cantColum = 3;
getPosXYElement2();
 

function dragElement(elmnt1) {
  
  elmnt = document.getElementById(elmnt1);

  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if(elmnt  !== null){
    if (document.getElementById(elmnt.id + "header")) {
      /* if present, the header is where you move the DIV from:*/
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      /* otherwise, move the DIV from anywhere inside the DIV:*/
      elmnt.onmousedown = dragMouseDown;
    }
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
    editPositionNoteDB(elmnt, (elmnt.offsetTop - pos2) , (elmnt.offsetLeft - pos1));
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
    getPosXYElement(elmnt.id);
    rect = document.getElementById(elmnt.id).getBoundingClientRect();
  }

}

var contadorNotas = 1;
var tarjetaFocus=null;

function addNote(textNote){
  const newNote = document.createElement("div");
  newNote.setAttribute("onclick","dragElement(id)");
  newNote.setAttribute("tabindex","0");

  newNote.innerHTML = '<img style="position: absolute; bottom:75%; right:4px; width:30px;height:30px;" id="'+ contadorNotas +'icon" src="../assets/trashClose.png" alt="" onmouseenter="changeIcon(id)" onmouseleave="changeIconClose(id)" onclick="deleteNote('+ contadorNotas +'n)"></img>';
  newNote.innerHTML += '<input style="position: absolute; bottom:4px; right:4px; width: 30px; height: 20px;" onchange="cambiarColor(this)" type="color">'; 
  newNote.innerHTML += '<i class="pin"></i>';
  
  newNote.setAttribute("class", "mydiv");
  newNote.setAttribute("id",contadorNotas + "n");
  var randomNumber = Math.random()*6|0 || -6;
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
  
  document.body.appendChild(newNote);

  newP.innerHTML = '<p contenteditable="false" id="nameColum'+contadorNotas+'"></p>';
  newP.innerHTML += '<p onkeyup="editDescriDB(this)" contenteditable="true" id="'+contadorNotas+'p">'+text.textContent + '</p>';
  newNote.appendChild(newNote2);
  newNote.appendChild(newP);

  posicionNote = newNote.getBoundingClientRect();
  
  insertNoteDB(`${contadorNotas}n`, text.textContent, posicionNote);

  contadorNotas = contadorNotas + 1;

}


function addColum(textColum){
  cantColum = cantColum + 1;
  const conteiner = document.getElementById('conteiner');
  const newColum = document.createElement('div');
  const text = document.createTextNode(document.getElementById(textColum).value);

  if (text.textContent === ""){
    alert("Los estados no pueden estar sin título");
    return
  }

  newColum.setAttribute('class', 'grid-item');
  newColum.setAttribute('id', cantColum);
  
  newColum.innerHTML += '<p id="p'+ cantColum+'" contenteditable="true" style="display: inline;">'+ text.textContent + '</p>'
  newColum.innerHTML += '<button id=' + cantColum + ' onclick="deleteColum(this)" class="button-8" role="button">Eliminar</button>'

  if (cantColum <= 8)
    conteiner.setAttribute('style', 'grid-template-columns: repeat('+ cantColum +', 1fr);')
  else
    conteiner.setAttribute('style', 'grid-template-columns: repeat('+ 8 +', 1fr);')

  conteiner.appendChild(newColum);
  getPosXYElement2();
}

function deleteColum(idEliminar) {
  const columnaEliminar = document.getElementById(idEliminar.id);
  columnaEliminar.parentNode.removeChild(columnaEliminar);

  cantColum =  cantColum - 1;

  const conteiner = document.getElementById('conteiner');
  if (cantColum <= 8)
    conteiner.setAttribute('style', 'grid-template-columns: repeat('+ cantColum +', 1fr);')
  else
    conteiner.setAttribute('style', 'grid-template-columns: repeat('+ 8 +', 1fr);')
  getPosXYElement2();
}

function cambiarColor(selectorColor){
  window.localStorage.setItem(tarjetaFocus.id,selectorColor.value)
  bg=selectorColor.value;
  tarjetaFocus.style.background=bg;
  editColorNoteDB(bg);
}


function deleteNote(idNoteDeleted){
  const notaEliminada = document.getElementById(idNoteDeleted+'n');
  notaEliminada.parentNode.removeChild(notaEliminada);
  deleteNoteDB(idNoteDeleted+'n');
}

function changeIcon(idIcon){
  document.getElementById(idIcon).src = '../assets/trashOpen.png';
}

function changeIconClose(idIcon){
  document.getElementById(idIcon).src = '../assets/trashClose.png';
}

var rect2;
function getPosXYElement2(){
  var index = 1;
  while (index <= cantColum){
    rect2 = document.getElementById(index).getBoundingClientRect();
    mapaColumnas.set('ID'+index,index);
    mapaColumnas.set("top"+index,Math.round(rect2.top));
    mapaColumnas.set("right"+index,Math.round(rect2.right));
    mapaColumnas.set("bottom"+index,Math.round(rect2.bottom));
    mapaColumnas.set("left"+index,Math.round(rect2.left));
    index = index + 1;
  }
}

var rect;
function getPosXYElement(id){
  rect = document.getElementById(id).getBoundingClientRect();
  mapaNotas.set('ID'+id,id);
  mapaNotas.set("top"+id,Math.round(rect.top));
  mapaNotas.set("right"+id,Math.round(rect.right));
  mapaNotas.set("bottom"+id,Math.round(rect.bottom));
  mapaNotas.set("left"+id,Math.round(rect.left));

  // mapaNotas.forEach((valor,clave) => {
  //   console.log(valor + ": " + clave);
  // });
  
  var indiceActual;
  mapaColumnas.forEach((valor,clave)=> {
    if(clave[0] === "I"){
      indiceActual = clave[2];
      if (Math.round(rect.left) >= mapaColumnas.get("left"+indiceActual)){
        if(Math.round(rect.right) <= mapaColumnas.get("right"+indiceActual)){
          const columaActual = document.getElementById("p"+mapaColumnas.get("ID"+indiceActual));
          const notaEditada = document.getElementById('nameColum'+id[0]);
          if(notaEditada.innerText === '  '){
            const text = document.createTextNode(columaActual.innerText);
            notaEditada.appendChild(text);
          }else{
            notaEditada.innerHTML = '';
            const text = document.createTextNode(columaActual.innerText);
            notaEditada.appendChild(text);
          }
        }else{
          const notaEditada = document.getElementById('nameColum'+id[0]).innerText = '';
        }
      }
    } 
  })
}


//Services db notes


function getNotesDB(){

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() 
  {
      if (this.readyState == 4 && this.status == 200) 
      {   
      
          respuesta=eval(xhttp.responseText);
    
          if (respuesta[0]==true)
          {
              console.log(respuesta[1].Message);
          }
          else
          {
              //Crear note

              for (let index = 0; index < respuesta.length; index++) {
                  addNoteFromDB(respuesta[index]);
              }

          }
      }
  };

  xhttp.open('POST', '../php/notes.php');
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhttp.send(`type=0&id_workflow=${window.localStorage.getItem('id_workFlow')}`);    

}

getNotesDB()



function insertNoteDB(idNote, description, posicionNote){

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() 
  {
      if (this.readyState == 4 && this.status == 200) 
      {   
      
          respuesta=eval(xhttp.responseText);

          if (respuesta[0]==false)
          {
              console.log(respuesta[1].Message);
          }
          else
          {
              console.log(respuesta[1].Message);
          }
      }
  };

  xhttp.open('POST', '../php/notes.php');
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhttp.send(`type=1&id_note=${idNote}&id_workflow=${window.localStorage.getItem('id_workFlow')}&description=${description}&p_top=${Math.round(posicionNote.top)}&p_right=${Math.round(posicionNote.right)}&p_bottom=${Math.round(posicionNote.bottom)}&p_left=${Math.round(posicionNote.left)}&color=#eae672`);   

}

function deleteNoteDB(idNote){

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() 
  {
      if (this.readyState == 4 && this.status == 200) 
      {         
          respuesta=eval(xhttp.responseText);

          if (respuesta[0]==false)
          {
              console.log(respuesta[1].Message);
          }
          else
          {
              console.log(respuesta[1].Message);
          }
      }
  };

  xhttp.open('POST', '../php/notes.php');
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhttp.send(`type=3&id_note=${idNote}&id_workflow=${window.localStorage.getItem('id_workFlow')}`);   

}


function addNoteFromDB(existNote){
  const newNote = document.createElement("div");
  newNote.setAttribute("onclick","dragElement(id)");
  newNote.setAttribute("tabindex","0");

  newNote.innerHTML = '<img style="position: absolute; bottom:75%; right:4px; width:30px;height:30px;" id="'+ contadorNotas +'icon" src="../assets/trashClose.png" alt="" onmouseenter="changeIcon(id)" onmouseleave="changeIconClose(id)" onclick="deleteNote('+ contadorNotas +'n)"></img>';
  newNote.innerHTML += '<input style="position: absolute; bottom:4px; right:4px; width: 30px; height: 20px;" onchange="cambiarColor(this)" type="color">'; 
  newNote.innerHTML += '<i class="pin"></i>';
  
  newNote.setAttribute("class", "mydiv");
  newNote.setAttribute("id",contadorNotas + "n");
  var randomNumber = Math.random()*6|0 || -6;
  newNote.setAttribute("style", "top: 345px; left: 855px; transform: rotate("+randomNumber+"deg);")

  const newNote2 = document.createElement("div");
  newNote2.setAttribute("class", "mydivheader")
  newNote2.setAttribute("id",contadorNotas + "nheader");

  const newP = document.createElement("p");

  const text = document.createTextNode(existNote.description);

  newNote.addEventListener('click', function () 
  {
    tarjetaFocus=this;
  })
  
  document.body.appendChild(newNote);

  newP.innerHTML = '<p contenteditable="false" id="nameColum'+contadorNotas+'"></p>';
  newP.innerHTML += '<p onkeyup="editDescriDB(this)" contenteditable="true" id="'+contadorNotas+'p">'+text.textContent + '</p>';
  newNote.appendChild(newNote2);
  newNote.appendChild(newP);

  

  newNote.style.top = (existNote.p_top) + "px";
  //newNote.style.bottom = (newNote.offsetBottom - existNote.p_bottom) + "px";
  newNote.style.left = (existNote.p_left) + "px";
  //newNote.style.right = (newNote.off -  existNote.p_right) + "px";

  newNote.style.background=existNote.color;
  
  contadorNotas = contadorNotas + 1;

  getPosXYElement(existNote.id_note)

}


//Editar

function editPositionNoteDB(elmnt, top, left) {

  var p = elmnt.getBoundingClientRect()

  console.log(p.top);

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() 
  {
      if (this.readyState == 4 && this.status == 200) 
      {         

          respuesta=eval(xhttp.responseText);

          if (respuesta[0]==false)
          {
              console.log(respuesta[1].Message);
          }
          else
          {
              console.log(respuesta[1].Message);
          }
      }
  };

  xhttp.open('POST', '../php/notes.php');
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  

  xhttp.send(`type=4&id_note=${elmnt.id}&id_workflow=${window.localStorage.getItem('id_workFlow')}&p_top=${Math.round(top)}&p_bottom=${Math.round(p.bottom)}&p_left=${Math.round(left)}&p_right=${Math.round(p.right)}`);   
  
}


function editColorNoteDB(color) {
  

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() 
  {
      if (this.readyState == 4 && this.status == 200) 
      {         
          respuesta=eval(xhttp.responseText);

          if (respuesta[0]==false)
          {
              console.log(respuesta[1].Message);
          }
          else
          {
              console.log(respuesta[1].Message);
          }
      }
  };

  xhttp.open('POST', '../php/notes.php');
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  
  xhttp.send(`type=5&id_note=${elmnt.id}&id_workflow=${window.localStorage.getItem('id_workFlow')}&color=${color}`);   
  

}


function editDescriDB(target) {

  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() 
  {
      if (this.readyState == 4 && this.status == 200) 
      {         
          respuesta=eval(xhttp.responseText);

          if (respuesta[0]==false)
          {
              console.log(respuesta[1].Message);
          }
          else
          {
              console.log(respuesta[1].Message);
          }
      }
  };

  xhttp.open('POST', '../php/notes.php');
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  
  xhttp.send(`type=6&id_note=${target.id.replace('p', 'n')}&id_workflow=${window.localStorage.getItem('id_workFlow')}&description=${target.textContent}`);   

}


//colsWorflowsLogic
function insertColsWorkFlow() {
  console.log("holaa");
}