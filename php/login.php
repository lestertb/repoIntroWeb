<?php

    session_start();
    include 'conn.php';

    if (!isset($_REQUEST["email"]) && !isset($_REQUEST["password"]))
    {
        echo ("[false,{'Error':'Debe enviar los parámetros email y password'}]");
        exit();
    }

    $email=$_REQUEST["email"];
    $password=$_REQUEST["password"];

    $conn = obtener_coneccion();
    $result = ejecutar_query($conn, "select id,email,name from usuarios where email='$email' and password=HASHBYTES('MD5','$password');");


    if( sqlsrv_has_rows( $result ) != 1 ) {
        echo "[false,{'Error':'Las credenciales del usuario no son válidas'}]";
    }else
    {
        if( sqlsrv_fetch( $result ) === false) {
            die( print_r( sqlsrv_errors(), true));
       }
        $idUser = sqlsrv_get_field( $result , 0);
        $emailUser = sqlsrv_get_field( $result , 1);
        $nameUser = sqlsrv_get_field( $result , 2);
        $_SESSION["id_usuario"] = $idUser;
        $_SESSION["email_usuario"] = $emailUser;
        $_SESSION["name_usuario"] = $nameUser;
        echo "[true,{'id_usuario':'$idUser','email_usuario':'$emailUser','name_usuario':'$nameUser'}]";
    }
   
    sqlsrv_close($conn);

?>