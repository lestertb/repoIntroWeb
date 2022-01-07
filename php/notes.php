<?php
    session_start();
    include 'conn.php';

    if (!isset($_SESSION["id_usuario"]))
    {
        echo ("[false,{'Error':'El usuario no ha realizado login'}]");
        exit();
    }



    //Get notes
    if( isset($_REQUEST["type"]) && isset($_REQUEST['id_workflow'])){

        $type=$_REQUEST["type"];

        if ($type === "0") {
            $dbconn = obtener_coneccion();
            $sql = "select * from notes where id_workflow = ".$_POST['id_workflow']."";
            $result = ejecutar_query($dbconn, $sql);

            $res = [];
    
            if( $result ) {
        
                if (sqlsrv_has_rows( $result ) === true) {
        
                    while( $row = sqlsrv_fetch_array( $result, SQLSRV_FETCH_ASSOC)) {
                        $res[] = $row; 
                    }
                    echo json_encode($res);
        
                }else{
                    echo "[true,{'Error':'No se encontraron notes en este workflows'}]";
                }
        
            }
           
            sqlsrv_close($dbconn);

        }
    }



    if( isset($_REQUEST["type"]) &&isset($_REQUEST['id_note']) && isset($_REQUEST['id_workflow']) && isset($_REQUEST['description'])  && isset($_REQUEST['p_top'])
    && isset($_REQUEST['p_right']) && isset($_REQUEST['p_bottom']) && isset($_REQUEST['p_left']) && isset($_REQUEST['color'])){

        $type=$_REQUEST["type"];

        //Insert
        if ($type === "1") {
            $dbconn = obtener_coneccion();
            $sql = "insert into notes values('".$_POST['id_note']."','".$_POST['id_workflow']."','".$_POST['description']."','".$_POST['p_top']."','".$_POST['p_right']."','".$_POST['p_bottom']."','".$_POST['p_left']."','".$_POST['color']."')";
            $ret = ejecutar_query($dbconn, $sql);
            if($ret){
                    echo "[true,{'Message':'Se insertó'}]";
            }else{
                echo "[false,{'Message':'No se insertó'}]";
            }
            sqlsrv_close( $dbconn);
        }
    }


    //Update

    if( isset($_REQUEST["type"]) &&isset($_REQUEST['id_note']) && isset($_REQUEST['id_workflow']) && isset($_REQUEST['p_top'])
    && isset($_REQUEST['p_right']) && isset($_REQUEST['p_bottom']) && isset($_REQUEST['p_left'])){

        $type=$_REQUEST["type"];

        if ($type === "4") {
            $dbconn = obtener_coneccion();
            $sql = "update notes set p_top = ".$_POST['p_top'].", p_bottom = ".$_POST['p_bottom'].", p_left = ".$_POST['p_left'].", p_right = ".$_POST['p_right']." where id_note = '".$_POST['id_note']."' and id_workflow = ".$_POST['id_workflow'].";";
            $ret = ejecutar_query($dbconn, $sql);
            if($ret){
                    echo "[true,{'Message':'Se modificó'}]";
            }else{
                echo "[false,{'Message':'No se modificó'}]";
            }
            sqlsrv_close( $dbconn);
        }
    }

    if( isset($_REQUEST["type"]) &&isset($_REQUEST['id_note']) && isset($_REQUEST['id_workflow']) && isset($_REQUEST['color'])){

        $type=$_REQUEST["type"];

        if ($type === "5") {
            $dbconn = obtener_coneccion();
            $sql = "update notes set color = '".$_POST['color']."' where id_note = '".$_POST['id_note']."' and id_workflow = ".$_POST['id_workflow'].";";
            $ret = ejecutar_query($dbconn, $sql);
            if($ret){
                    echo "[true,{'Message':'Se modificó'}]";
            }else{
                echo "[false,{'Message':'No se modificó'}]";
            }
            sqlsrv_close( $dbconn);
        }
    }










    if( isset($_REQUEST["type"]) &&isset($_REQUEST['id_note']) && isset($_REQUEST['id_workflow'])){

        $type=$_REQUEST["type"];
    
        //Delete
        if ($type === "3") {
            $dbconn = obtener_coneccion();
            $sql = "delete from notes where id_note = '".$_POST['id_note']."' and id_workflow = ".$_POST['id_workflow']."";
            $ret = ejecutar_query($dbconn, $sql);
            if($ret){
                    echo "[true,{'Message':'Se eliminó'}]";
            }else{
                echo "[false,{'Message':'No se eliminó'}]";
            }
            sqlsrv_close( $dbconn);
        }
    }
?>


