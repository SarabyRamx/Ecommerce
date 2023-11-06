<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET, POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization");

$servidor = "localhost"; $puerto="1800"; $usuario = "root"; $contrasenia = ""; $nombreBaseDatos = "carrito";
$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);

