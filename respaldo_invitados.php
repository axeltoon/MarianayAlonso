<?php

// Configuración de la base de datos
$host = 'localhost';
$usuario = 'root'; // Cambia si tienes otro usuario
$contrasena = ''; // Cambia si tienes contraseña en MySQL
$basedatos = 'invitacionesmya'; // Cambia al nombre real

// Conexión a la base de datos
$conn = new mysqli($host, $usuario, $contrasena, $basedatos);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Consulta para obtener los datos de la tabla invitados
$sql = "SELECT codigo, nombre, invitaciones_disponibles, invitaciones_confirmadas FROM invitados";
$resultado = $conn->query($sql);

if ($resultado->num_rows > 0) {
    $fecha = date("Y-m-d_H-i-s");
    $archivo = "respaldo_invitados_$fecha.csv";

    // Abrir archivo para escritura
    $fp = fopen($archivo, 'w');

    // Encabezados
    fputcsv($fp, array('Codigo', 'Nombre', 'Invitaciones Disponibles', 'Invitaciones Confirmadas'));

    // Escribir los datos
    while ($fila = $resultado->fetch_assoc()) {
        fputcsv($fp, $fila);
    }

    fclose($fp);

    echo "Respaldo generado exitosamente: <a href='$archivo' download>Descargar respaldo</a>";

} else {
    echo "No se encontraron datos en la tabla invitados.";
}

$conn->close();
?>
