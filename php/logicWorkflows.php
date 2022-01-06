<?php
    session_start();

    include 'conn.php';

    if (!isset($_SESSION["id_usuario"]))
    {
        echo ("[false,{'Error':'El usuario no ha realizado login'}]");
        exit();
    }

    if (!isset($_REQUEST["type"]))
    {
        $id_usuario=$_SESSION["id_usuario"];
    
        $conn = obtener_coneccion();
        $result = ejecutar_query($conn, "select id_workflow,name,description from workflows where id_usuario=$id_usuario");
    
        $res = [];
    
        if( $result ) {
    
            if (sqlsrv_has_rows( $result ) === true) {
    
                while( $row = sqlsrv_fetch_array( $result, SQLSRV_FETCH_ASSOC)) {
                    $res[] = $row; 
                }
                echo json_encode($res);
    
            }else{
                echo "[true,{'Error':'No se encontraron workflows'}]";
            }
    
        }
       
        sqlsrv_close($conn);
    }else {

        $type=$_REQUEST["type"];
        $id_usuario=$_SESSION["id_usuario"];
  
        if(isset($_REQUEST['id_workflow']) && isset($_REQUEST['name'])  && isset($_REQUEST['description'])  && isset($_REQUEST['creation_date'])){

            //Insert
            if ($type === "1") {
                $dbconn = obtener_coneccion();
                $sql = "insert into workflows values('".$_REQUEST['id_workflow']."','".$id_usuario."','".$_REQUEST['name']."','".$_REQUEST['description']."','".$_REQUEST['creation_date']."');";
                $ret = ejecutar_query($dbconn, $sql);
                if($ret){
                    echo "[true,{'Message':'Se insertó'}]";
                }else{
                    echo "[false,{'Message':'Error al insertar'}]";
                }
                sqlsrv_close( $dbconn);
            }

            //Update

            //Delete
            
        }


    }


?>