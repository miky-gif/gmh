<?php
session_start();
include 'db.php';

// Vérifier si l'utilisateur est connecté via une session ou un cookie
if (!isset($_SESSION['user']) && !isset($_COOKIE['user'])) {
    header("Location: form.html");
    exit();
}

$email = isset($_SESSION['user']) ? $_SESSION['user']['email'] : $_COOKIE['user'];

// Récupérer les informations de l'utilisateur depuis la base de données
$sql = "SELECT name, email, phone FROM users WHERE email = '$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
} else {
    echo "Erreur : utilisateur non trouvé.";
    exit();
}

// Inclure le fichier HTML
include __DIR__ . '/compte.html.php';

$conn->close();
?>
