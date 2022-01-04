<?php

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

    function ejecutar_query($conn,$query)
    {
        $result = sqlsrv_query($conn, $query);
        if (!$result) 
        {
            echo "Error in statement execution.\n";  
            die( print_r( sqlsrv_errors(), true));  
        }
        return ($result);
    }


