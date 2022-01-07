<?php
    session_start();
    include 'conn.php';

    if (!isset($_SESSION["id_usuario"]))
    {
        echo ("[false,{'Error':'El usuario no ha realizado login'}]");
        exit();
    }

    if( isset($_REQUEST["type"]) &&isset($_REQUEST['id_note']) && isset($_REQUEST['id_workflow']) && isset($_REQUEST['description'])  && isset($_REQUEST['p_top'])
    && isset($_REQUEST['p_right']) && isset($_REQUEST['p_bottom']) && isset($_REQUEST['p_left'])){

        $type=$_REQUEST["type"];

        //Insert
        if ($type === "1") {
            $dbconn = obtener_coneccion();
            $sql = "insert into notes values('".$_POST['id_note']."','".$_POST['id_workflow']."','".$_POST['description']."','".$_POST['p_top']."','".$_POST['p_right']."','".$_POST['p_bottom']."','".$_POST['p_left']."')";
            $ret = ejecutar_query($dbconn, $sql);
            if($ret){
                    echo "[true,{'Message':'Se insertó'}]";
            }else{
                echo "[false,{'Message':'No se insertó'}]";
            }
            sqlsrv_close( $dbconn);
        }
        //Update

        //Delete

    }

?>


