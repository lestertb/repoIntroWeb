const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

function messages(msg)
{
    notificador=document.getElementById('messages');
    notificador.innerHTML=msg;
    setTimeout(function(htmlobj){htmlobj.innerHTML="";},5000,notificador);
}

function register(event)
{
	console.log("hola")
	event.preventDeafult();
	nameUser=document.getElementById('name').value;
    email=document.getElementById('email').value;
    password=document.getElementById('password').value;
    
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "../php/register.php", false);
    var formData = new FormData();
    formData.append("name", nameUser);
	formData.append("email", email);
    formData.append("password", password);
    xhttp.send(formData);     
}
