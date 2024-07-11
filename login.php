<?php
session_start();
include 'db.php';

$email = $_POST['email'];
$password = $_POST['password'];

$sql = "SELECT * FROM users WHERE email='$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    if (password_verify($password, $user['password'])) {
        $_SESSION['user'] = [
            'email' => $user['email']
        ];
        // Définir un cookie pour rester connecté
        setcookie('user', $user['email'], time() + (86400 * 30), "/"); // 86400 = 1 jour
        header("Location: account.php");
    } else {
        echo "Mot de passe incorrect.";
    }
} else {
    echo "Utilisateur non trouvé.";
}

$conn->close();
?>
