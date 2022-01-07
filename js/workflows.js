/* Variables globales */
let mapaColumnas= new Map(); //Almacena la información de cada una de las columnas generadas en el workflow
let mapaNotas= new Map();    //Almacena la información de cada una de las notas generadas en el workflow
var ind = 1;
let cantColum = 3;           //Variable que indica que ya hay 3 columna generadas inicialmente en cada workflow
getPosXYElement2();          //Función que guarda en "mapaColumnas (linea 3) la información de las columnas generadas inicialmente" 
 
/* Función encangada de identificar cuando una nota es seleccionada con el mose, además de calcular la posición en tiempo real
   por donde se va desplasando, esto hasta soltar el click, indicando la posición final obtenida */
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

/* Variables encargadas de llevar el conteo de las notas creadas y de si se hizo o no cambio de color a la nota */
var contadorNotas = 1;
var tarjetaFocus=null;
const tarjetas = [];

/* Función encargada de generar dinámicamente cada una de las notas indicadas */
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
  tarjetas.push(newNote);
  
  insertNoteDB(`${contadorNotas}n`, text.textContent, posicionNote);

  contadorNotas = contadorNotas + 1;

}

/* Función encargada de generar cada una de las columnas del workflow, además de actualizar sus posiciones en "mapaColumnas" (linea 3) */
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

/* Función que elimina del Dom la colunma indicada, desapareciendo esta del workflow */
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

/* Función encargada de generar el cambio de color de forma manual en las notas */
function cambiarColor(selectorColor){
  window.localStorage.setItem(tarjetaFocus.id,selectorColor.value)
  bg=selectorColor.value;
  tarjetaFocus.style.background=bg;
  editColorNoteDB(bg);
}

/* Función encargada de eliminar del Dom la nota indicada */
function deleteNote(idNoteDeleted){
  const notaEliminada = document.getElementById(idNoteDeleted+'n');
  notaEliminada.parentNode.removeChild(notaEliminada);
  deleteNoteDB(idNoteDeleted+'n');
}

/* Función que cambia el ícono de borrado de la nota */
function changeIcon(idIcon){
  document.getElementById(idIcon).src = '../assets/trashOpen.png';
}

/* Función que cambia el ícono de borrado de la nota */
function changeIconClose(idIcon){
  document.getElementById(idIcon).src = '../assets/trashClose.png';
}

/* Función encargada de obtener la posicion de las columnas del workflow para ser almacenadas en "mapaColumna" y asi poder comparar con esto donde
   están las notas */
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

/* Función encargada de obtener la posicion de las notas del workflow, también se encarga de comparar la posición de las notas con las columnas, y dependiendo de donde
   se encuentre cada nota, le asigna al título el nombre de la columna del workflow donde se encuentra*/
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

//obtener notas
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


//insertar notas
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
//delete notas
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

//Crear notas obtenidas desde la base de datos
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

  tarjetas.push(newNote);

  getPosXYElement(existNote.id_note)

}


//Editar nota

function editPositionNoteDB(elmnt, top, left) {

  var p = elmnt.getBoundingClientRect()

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

//Editar color de nota
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

//Editar descripcion
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

//Inicio Speech

const utter = new SpeechSynthesisUtterance();

function lectura_tarjeta(texto){
  //console.log(htmlObj.texto_lectura);
  voices = window.speechSynthesis.getVoices()
  //utter.voice = voices[4];
  utter.lang = 'es-ES'; 
  utter.volume = 0.7;

  utter.onend = function(){
      //alert('La lectura ha finalizado');
  }
  utter.text = texto;

  //synth
  window.speechSynthesis.speak(utter);

}


function modoInclusivo(){

 for (let x = 0; x < tarjetas.length; x++) {
     //console.log(tarjetas)
     texto_lectura="Texto de la tarjeta:" + tarjetas[x].textContent;
     //console.log(texto_lectura);
    lectura_tarjeta(texto_lectura);
   
 }
 
  
 }



var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var colors = [ 'Modo inclusivo' , 'modo inclusivo' , 'inclusivo'];
var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'

var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = " ";

document.body.onclick = function() {
  recognition.start();
  console.log('Ready to receive a color command.');
}

recognition.onresult = function(event) {
  var color = event.results[0][0].transcript;
  diagnostic = 'Result received: ' + color + '.';
  console.log('Confidence: ' + event.results[0][0].confidence);
  modoInclusivo();
}

recognition.onspeechend = function() {
  recognition.stop();
}

recognition.onnomatch = function(event) {
  diagnostic.textContent = "I didn't recognise that color.";
}

recognition.onerror = function(event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
}


let hablar = true;
let synth = window.speechSynthesis;
const sonidoTecla = (e) =>{   
  e.preventDefault();      
  if(e.keyCode === 32) {      
    if(hablar){
      synth.pause()
      hablar = false
    } 
    else{
      synth.resume();       
      hablar = true 
    }             
  } 
  
  }
document.body.addEventListener('keyup', sonidoTecla, true);
