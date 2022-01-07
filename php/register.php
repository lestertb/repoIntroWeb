<?php
    session_start();
    include 'conn.php';

    if(isset($_POST['name']) && isset($_POST['email']) && isset($_POST['password'])){

        $dbconn = obtener_coneccion();
        $sql = "insert into usuarios(name,email,password)values('".$_POST['name']."','".$_POST['email']."',HASHBYTES('MD5','".$_POST['password']."'))";
        $ret = ejecutar_query($dbconn, $sql);
        if($ret){
            echo ("<!DOCTYPE html>
                <html lang='en'>
                <head>
                    <meta charset='UTF-8'>
                    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
                    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                </head>
                <body></body>
                <script> alert('Successfully Sign up'); window.location.href = '../html/login.html'</script>
                </html>");
        }else{
            echo ("<!DOCTYPE html>
            <html lang='en'>
            <head>
                <meta charset='UTF-8'>
                <meta http-equiv='X-UA-Compatible' content='IE=edge'>
                <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            </head>
            <body></body>
            <script> alert('Something Went Wrong');window.location.href = '../html/login.html' </script>
            </html>");
        }
        sqlsrv_close( $dbconn);
    }

?>