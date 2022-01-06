window.localStorage.clear();

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
    notificador.innerHTML="";
    notificador.innerHTML=msg;
    setTimeout(function(htmlobj){htmlobj.innerHTML="";},5000,notificador);
}


function login(event)
{
    event.preventDefault();
    email=document.getElementById('email1').value;
    password=document.getElementById('password1').value;

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            respuesta=eval(xhttp.responseText);

            if (respuesta[0]==false)
            {
                console.log("Error credenciales");
                messages(respuesta[1].Error);
            }
            else
            {
                //alert("Login Exitoso")
                //localStorage.setItem("id_usuario", respuesta[1].id_usuario);
                //localStorage.setItem("email_usuario", respuesta[1].email_usuario);
                //getWorkflows();
                window.location.href="workflowsList.html"
            }
        }
    };

    xhttp.open('POST', '../php/login.php');

    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`email=${email}&password=${password}`);     
    
}
