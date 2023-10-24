<?php 
    require_once "/var/www/html/cap1215/views/head/head.php";
    if(!empty($_SESSION['usuario'])){
      header("Location:inicio.php");
    }
?>

<body> 
  <div id="SecLogin">
  <section >
    <article>
      <div class="contenedor">
        <div class="frame">
          <div ng-app ng-init="checked = false">
  				      <form class="inicses" action="verificar.php" method="POST" name="formulario" class="col-3 login" autocomplete="off">
                  <div class="datsentrad"> 
                    <label for="usuario">Usuario: </label>
                    <br>
                    <input class="inptIniSes" type="text" name="usuario" id="usuario" placeholder="Escriba su clave de usuario" required/>
                    <br>
                    <br>
                  </div>
                  <div class="datsentrad">
                    <label for="exampleInputPassword">Contraseña: </label>
                    <div class="box-eye">
                      <button type="button" onclick="mostrarContraseña('contraseña','eyepassword')">
                        <i id="eyepassword" class="fa-solid fa-eye changePassword fa-eye-slash"></i>
                      </button>
                      <input class="inptIniSes" type="password" name="contraseña" id="contraseña" placeholder="***" required/>
                    </div>
                    <?php if(!empty($_GET['error'])):?>
                      <div id="alertError" style="margin: auto;" class="alert alert-danger mb-2" role="alert">
                        <?= !empty($_GET['error']) ? $_GET['error'] : ""?>
                      </div>
                      <?php endif;?>
                  </div>
                  <div class="boton">
                    <button id="BtnIniSes" name="BtnIniSes" class="BtnIniSes">ENTRAR</button>
                  </div>
                  <div class="IniSesAdi">
                    <a href="">Solicita contraseña</a>
                  </div>
  				      </form>
          </div>
        </div>
      </div>
    </article>
  </section>
  </div>

  <?php
    require_once("/var/www/html/cap1215/views/head/footer.php");
  ?>
