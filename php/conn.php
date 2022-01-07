<?php
    //Realizar conexion con las variables de mssql
    function obtener_coneccion()
    {
        $serverName = "LESTERTB"; 
        $uid = "testDB";   
        $pwd = "1234";  
        $databaseName = "db_introweb"; 

        $connectionInfo = array( "UID"=>$uid,                            
                                "PWD"=>$pwd,                            
                                "Database"=>$databaseName); 

        $conn = sqlsrv_connect( $serverName, $connectionInfo);  

        if (!$conn) 
        {
            echo "[false,{'error':'No se pudo conectar con la base de datos'}]";
            exit;
        }
        return ($conn);
    }
    //Ejecutar querys
    function ejecutar_query($conn,$query)
    {
        $result = sqlsrv_query($conn, $query);
        if (!$result) 
        {
            echo "[false,{'Error':'Error de petición a base de datos'}]";
            die( print_r( sqlsrv_errors(), true));  
        }
        return ($result);
    }


