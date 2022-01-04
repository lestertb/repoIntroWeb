<?php
    session_start();
    include 'conn.php';

    if(isset($_POST['name']) && isset($_POST['email']) && isset($_POST['password'])){

        $dbconn = obtener_coneccion();
        $sql = "insert into usuarios(name,email,password)values('".$_POST['name']."','".$_POST['email']."',HASHBYTES('MD5','".$_POST['password']."'))";
        $ret = ejecutar_query($dbconn, $sql);
        if($ret){
                echo "Data saved Successfully";
        }else{
                echo "Something Went Wrong";
        }
        sqlsrv_close( $dbconn);
    }


?>