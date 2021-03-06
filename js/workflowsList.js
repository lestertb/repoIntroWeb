
function messages(msg)
{
    notificador=document.getElementById('messages');
    notificador.innerHTML="";
    notificador.innerHTML=msg;
    setTimeout(function(htmlobj){htmlobj.innerHTML="";},5000,notificador);
}

function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

listWorkflows = [];
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

            }
        }
    };
    xhttp.open("GET", "../php/logicWorkflows.php");
    xhttp.send();  
}


/* Create, edit, delete workFlows*/

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
    }

    function createWorkFlowElement(id, description, nombre) {
        const element = document.createElement("textarea");

        element.classList.add("workflow");
        element.value = "Nombre: " +nombre +"\nDescripcion: " + description;
        element.placeholder = "Empty Workflow";

        element.addEventListener("change", () => {
            updateWorkFlow(id, element.value);
        });

        element.addEventListener("dblclick", () => {
            const doDelete = confirm(
            "El WorkFlow se eliminar?? ??Est?? seguro?"
            );

            if (doDelete) {
                deleteWorkFlow(id, element);
            }
        });

        return element;
    }

    function addWorkFlow() {
        const workFlow = getWorkflow();
        var today = new Date();
        var date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear()
        const workFlowObject = {
            id_workflow: Math.floor(Math.random() * 100000),
            name:"",
            description: "",
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
        const workFlows = getWorkflow().filter((workFlow) => workFlow.id != id);

        saveWorkFlow(workFlows);
        workflowContainer.removeChild(element);
    }

}

getWorkflows() 


function insertWorkFlows(newWorkFlow){

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {   
            console.log(xhttp.responseText);
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

function editWorkFlows(WorkFlows) {
    console.log(WorkFlows.content);
}