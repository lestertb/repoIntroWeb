<?php
    session_start();
    include 'conn.php';

    if(isset($_REQUEST['name']) && isset($_REQUEST['email']) && isset($_REQUEST['password'])){

        $dbconn = obtener_coneccion();
        $sql = "insert into usuarios(name,email,password)values('".$_REQUEST['name']."','".$_REQUEST['email']."','".md5($_REQUEST['passw'])."')";
        $ret = ejecutar_query($dbconn, $sql);
        if($ret){
                echo "Data saved Successfully";
        }else{
                echo "Something Went Wrong";
        }
        pg_close($conn);
    }

?>