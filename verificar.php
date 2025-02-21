<?php
header('Content-Type: application/json');
$servername = "localhost"; // Cambia esto si tu servidor es diferente
$username = "root";        // Usuario de la base de datos
$password = "";            // Contraseña de la base de datos
$dbname = "invitacionesmya"; // Cambia al nombre real de tu base de datos

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Error de conexión: " . $conn->connect_error]);
    exit();
}

if (!isset($_POST['codigo']) || empty($_POST['codigo'])) {
    echo json_encode(["status" => "error", "message" => "Código vacío. Introduce un código."]);
    exit();
}

$codigo = $conn->real_escape_string($_POST['codigo']);
$sql = "SELECT nombre, invitaciones_disponibles FROM invitados WHERE codigo = '$codigo'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    echo json_encode([
        "status" => "success",
        "data" => [
            "nombre" => $row['nombre'],
            "invitaciones_disponibles" => $row['invitaciones_disponibles']
        ]
    ]);
} else {
    echo json_encode(["status" => "error", "message" => "Código no encontrado. Verifica e intenta nuevamente."]);
}

$conn->close();
?>
