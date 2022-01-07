<?php

//Logout eliminar variables de session y reload to login
session_start();
unset($_SESSION["id_usuario"]);
unset($_SESSION["email_usuario"]);
unset($_SESSION["name_usuario"]);

echo ("<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <meta name='viewport' content='width=device-width, initial-scale=1.0'>
    <head>
        <meta http-equiv='refresh' content='0; URL=../html/login.html' />
    <title>WorkFlows: Saliendo del sistema!</title>
</head>
<body></body>
</html>");
?>