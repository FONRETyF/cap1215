<?php  

    require_once("/var/www/html/cap1215/controller/homeController.php");
    session_start();
    $obj = new homeController();
    $usuario = $obj->limpiarusuario($_POST['usuario']);
    $contraseña = $obj->limpiarcadena($_POST['contraseña']);
    $bandera = $obj->verificarusuario($usuario,$contraseña);

    if($bandera){
        $_SESSION['usuario'] = $usuario;
        header('Location:Inicio.php');
    }else{
        $error = "<li>Las claves son incorrectas</li>";
        header("Location:login.php?error=".$error);
    }
    
?>