<?php
session_start();
session_unset();
session_destroy();
setcookie('user', '', time() - 3600, "/"); // Détruire le cookie en le définissant avec une date passée
header("Location: form.html");
exit();
?>
