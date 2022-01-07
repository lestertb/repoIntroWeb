//Función mostrar mensajes
function messages(msg)
{
    notificador=document.getElementById('messages');
    notificador.innerHTML="";
    notificador.innerHTML=msg;
    setTimeout(function(htmlobj){htmlobj.innerHTML="";},5000,notificador);
}

//Sleep timer
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

//Lista de workFlos
listWorkflows = [];
//Obtener workflows db
function getWorkflows() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            respuesta=eval(xhttp.responseText);
            if (respuesta[0]==false)
            {
                document.getElementById("Loggedout").setAttribute('style', 'display:block;')
                alert(respuesta[1].Error)
                sleep(5000).then(() => {
                    window.location.href="login.html"
                });
            }
            else
            {
                document.getElementById("Loggedin").setAttribute('style', 'display:block;')

                if (respuesta.length > 1) {

                    if (respuesta[1].Error === 'No se encontraron workflows') {
                        listWorkflows=[];
                        workFlowsLogic()
                    }else{
                        listWorkflows=respuesta;
                        workFlowsLogic()
                    }
                    if (respuesta[1] != undefined && respuesta[1].Error != undefined) {
                        alert(respuesta[1].Error)
                    }
                    
                }else{
                    listWorkflows=respuesta;
                    workFlowsLogic()
                }

            }
        }
    };
    xhttp.open("GET", "../php/logicWorkflows.php");
    xhttp.send();  
}

// Get the modal
var modal;
function modalLogic() {
    modal = document.getElementById("myModal");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
         modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
        
    }

}


/* Create, edit, delete workFlows logic*/

function workFlowsLogic() {
    const workflowContainer = document.getElementById("app");
    const addWorkFlowButton = workflowContainer.querySelector(".add-workflow");

    getWorkflow().forEach((workflow) => {
    const workFlowElement = createWorkFlowElement(workflow.id_workflow, workflow.description, workflow.name);
    workflowContainer.insertBefore(workFlowElement, addWorkFlowButton);
    });

    addWorkFlowButton.addEventListener("click", () => addWorkFlow());

    function getWorkflow() {
        return listWorkflows;
    }

    function saveWorkFlow(workFlows, type) {
        if (type === 1) {
            insertWorkFlows(workFlows[workFlows.length-1]);
        }
        if (type ===2) {
            editWorkFlows(workFlows);
        }
        if (type === 3) {
            deleteWorkFlowDB(workFlows)
        }
    }

    function createWorkFlowElement(id, description, nombre) {
        const element = document.createElement("textarea");

        element.classList.add("workflow");
        element.value = "Nombre: " +nombre +"\nDescripcion: " + description;
        element.placeholder = "Empty Workflow";

        //getIdsWorkFlows(id);
        
        element.addEventListener("change", () => {
            updateWorkFlow(id, element.value);
        });

        element.addEventListener("contextmenu", (e) => {
            e.preventDefault();
            localStorage.setItem("id_workFlow", id);
            modalLogic(id,element) 
            document.getElementById("btnOpen").addEventListener("click", () => {
                window.location.href="workflows.html"
            });
            
            document.getElementById("btnDelete").addEventListener("click", () => {
                const doDelete = confirm(
                    "El WorkFlow se eliminará ¿Está seguro?"
                    );
        
                    if (doDelete) {
                        deleteWorkFlow(id, element);
                        modal.style.display = "none";
                        document.location.reload(true);
                        //deleteColWorkFlowDB()
                    }
            });

        });

        return element;
    }

    function addWorkFlow() {
        
        var name = prompt("Digite el nombre del workFlow");
        var description = prompt("Digite la descripción del workFlow");
        const workFlow = getWorkflow();
        var today = new Date();
        var date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear()
        const workFlowObject = {
            id_workflow: Math.floor(Math.random() * 100000),
            name:name,
            description: description,
            creation_date: date
        };

        const workFlowElement = createWorkFlowElement(workFlowObject.id_workflow, workFlowObject.description, workFlowObject.name);
        workflowContainer.insertBefore(workFlowElement, addWorkFlowButton);

        workFlow.push(workFlowObject);
        saveWorkFlow(workFlow,1);
    }

    function updateWorkFlow(id, newContent) {
        const workFlows = getWorkflow();
        const targetWorkFlow = workFlows.filter((workFlow) => workFlow.id_workflow == id)[0];

        targetWorkFlow.content = newContent;
        
        saveWorkFlow(targetWorkFlow,2);
    }

    function deleteWorkFlow(id, element) {
        const workFlows = getWorkflow().filter((workFlow) => workFlow.id_workflow == id)[0];
        saveWorkFlow(workFlows,3);
        workflowContainer.removeChild(element);
    }

}

getWorkflows() 

//Insert workflows db
function insertWorkFlows(newWorkFlow){

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

    xhttp.open('POST', '../php/logicWorkflows.php');
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`type=1&id_workflow=${newWorkFlow.id_workflow}&name=${newWorkFlow.name}&description=${newWorkFlow.description}&creation_date=${newWorkFlow.creation_date}`);     
}
//Edit workflows db
function editWorkFlows(WorkFlows) {
    var textName = WorkFlows.content.slice(7);
    var name = textName.split('Descripcion:')[0];
    var textdescription = WorkFlows.content.split('Descripcion:');
    var description = textdescription[1];

    
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


    xhttp.open('POST', '../php/logicWorkflows.php');
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`type=2&id_workflow=${WorkFlows.id_workflow}&name=${name}&description=${description}`);   

}

//Delete workflows db
function deleteWorkFlowDB(WorkFlows){

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


    xhttp.open('POST', '../php/logicWorkflows.php');
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`type=3&id_workflow=${WorkFlows.id_workflow}`);   

}

//Insert colworkflows db
function insertColWorkFlowDB(id_workFlow, index) {

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

    xhttp.open('POST', '../php/colWorkFlows.php');
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    if (index === 1) {
        description = "Sin Iniciar";
        xhttp.send(`type=1&id_workflow=${id_workFlow}&id_col=${index}&description=${description}`);
    }
    if (index === 2) {
        description = "Iniciado";
        xhttp.send(`type=1&id_workflow=${id_workFlow}&id_col=${index}&description=${description}`);
    }
    if (index === 3) {
        description = "Finalizado";
        xhttp.send(`type=1&id_workflow=${id_workFlow}&id_col=${index}&description=${description}`);
    }
}

//delete  colworkflows db
function deleteColWorkFlowDB() {

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

    xhttp.open('POST', '../php/colWorkFlows.php');
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`type=2&id_workflow=${window.localStorage.getItem('id_workFlow')}`);

}
//Get colworkflows db
contVeces = 1;
function getIdsWorkFlows(id) {

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {           
            respuesta=eval(xhttp.responseText);

            if (respuesta[0]==true)
            {
                for (let index = 1; index < 4; index++) {
                    insertColWorkFlowDB(id, index);
                }
            }
            else
            {
                if (contVeces < 4) {
                    console.log("hola");
                    console.log(contVeces);
                    insertColWorkFlowDB(id, contVeces);
                    contVeces += 1;
                }
                
            }
        }
    };

    xhttp.open('POST', '../php/colWorkFlows.php');
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(`type=3`);

}

