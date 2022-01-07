<?php
    //Iniciar session
    session_start();
    //Include conexion db
    include 'conn.php';

    if (!isset($_SESSION["id_usuario"]))
    {
        echo ("[false,{'Error':'El usuario no ha realizado login'}]");
        exit();
    }

    if( isset($_REQUEST["type"]) && isset($_REQUEST['id_workflow']) && isset($_REQUEST['id_col']) && isset($_REQUEST['description'])){

        $type=$_REQUEST["type"];

        //Insert
        if ($type === "1") {
            $dbconn = obtener_coneccion();
            $sql = "insert into colsWorkFlow values(".$_POST['id_col'].",".$_POST['id_workflow'].",'".$_POST['description']."')";
            $ret = ejecutar_query($dbconn, $sql);
            if($ret){
                    echo "[true,{'Message':'Se insertó'}]";
            }else{
                echo "[false,{'Message':'No se insertó'}]";
            }
            sqlsrv_close( $dbconn);
        }
    }


    if( isset($_REQUEST["type"]) && isset($_REQUEST['id_workflow'])){

        $type=$_REQUEST["type"];

        //Delete
        if ($type === "2") {
            $dbconn = obtener_coneccion();
            $sql = "delete from colsWorkFlow where id_workflow =".$_POST['id_workflow']."";
            $ret = ejecutar_query($dbconn, $sql);
            if($ret){
                    echo "[true,{'Message':'Se insertó'}]";
            }else{
                echo "[false,{'Message':'No se insertó'}]";
            }
            sqlsrv_close( $dbconn);
        }
    }

    if( isset($_REQUEST["type"])){

        $type=$_REQUEST["type"];

        //GET
        if ($type === "3") {
            $dbconn = obtener_coneccion();
            $sql = "select distinct id_workflow from colsWorkFlow";
            $result = ejecutar_query($dbconn, $sql);

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
           
            sqlsrv_close($dbconn);

        }
    }




?>


