<?php

    function obtener_coneccion()
    {
        $host = "localhost";
        $port = "5432";
        $dbname = "db_introweb";
        $user = "postgres";
        $password = "1234";
        $connection = "host={$host} port={$port} dbname={$dbname} user={$user} password={$password} ";
        $dbconn = pg_connect($connection);
        if (!$dbconn) 
        {
            echo "[false,{'error':'No se pudo conectar con la base de datos'}]";
            exit;
        }
        return ($dbconn);
    }

    function ejecutar_query($dbconn,$query)
    {
        $result = pg_query($dbconn, $query);
        if (!$result) 
        {
            $result_error=pg_result_error($result);
            echo "[false,{'error':'No es posible ejecutar la consulta','detalles':'$result_error'}]";
            exit;
        }
        return ($result);
    }

?>

