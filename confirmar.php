<?php
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

$servername = "localhost"; 
$username = "root";        
$password = "";            
$dbname = "invitacionesmya"; // Asegúrate de que sea el nombre correcto

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    echo json_encode(["status" => "error", "message" => "Error de conexión: " . $conn->connect_error]);
    exit();
}

// Verificar si los datos fueron enviados
if (!isset($_POST['codigo']) || empty($_POST['codigo']) || !isset($_POST['confirmadas']) || empty($_POST['confirmadas'])) {
    echo json_encode(["status" => "error", "message" => "Faltan datos. Introduce un código y el número de invitados."]);
    exit();
}

$codigo = $conn->real_escape_string($_POST['codigo']);
$confirmadas = intval($_POST['confirmadas']);

// Buscar si el código existe
$sql = "SELECT nombre, invitaciones_disponibles, invitaciones_confirmadas FROM invitados WHERE codigo = '$codigo'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $invitaciones_disponibles = intval($row['invitaciones_disponibles']);
    $invitaciones_confirmadas = intval($row['invitaciones_confirmadas']);

    // Verificar que el usuario no confirme más de lo permitido
    if ($confirmadas > $invitaciones_disponibles) {
        echo json_encode(["status" => "error", "message" => "No puedes confirmar más de $invitaciones_disponibles invitados."]);
        exit();
    }

    // Calcular los nuevos valores
    $nueva_disponible = $invitaciones_disponibles - $confirmadas;
    $nueva_confirmada = $invitaciones_confirmadas + $confirmadas;

    // Actualizar la base de datos
    $sqlUpdate = "UPDATE invitados SET 
                  invitaciones_disponibles = $nueva_disponible, 
                  invitaciones_confirmadas = $nueva_confirmada 
                  WHERE codigo = '$codigo'";

    if ($conn->query($sqlUpdate) === TRUE) {
        echo json_encode([
            "status" => "success",
            "confirmadas" => $confirmadas,
            "nueva_disponible" => $nueva_disponible,
            "nueva_confirmada" => $nueva_confirmada,
            "message" => "Confirmación exitosa: $confirmadas invitados."
        ]);
    } else {
        echo json_encode(["status" => "error", "message" => "Error al actualizar la base de datos."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Código no encontrado."]);
}

$conn->close();
?>
