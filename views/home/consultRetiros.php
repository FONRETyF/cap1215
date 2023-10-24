<?php
    require_once("/var/www/html/cap1215/views/head/header.php");
    
    if(empty($_SESSION['usuario'])){
        header("Location:login.php");
    }
?>

<section class="contenidoGral">
    <form id="consulta_Retiro" action="" class="formConsulRet" method="POST">
        <section class="sectNavegador">
            <div class="DivBotnsNav">
                <div id="DivBtnatras">
                    <button type="button" class="BtnsNav Btnregresar"  id="Btnregresar" name="Btnregresar">ATRAS</></button>
                </div>
                <div id="DivBtnInicio">
                    <button type="button" class="BtnsNav" id="Btnnicio" name="Btnnicio">INICIO</></button>
                </div>
                <div id="DivFechaActual">
                    <?php echo("Toluca, México a  " .date("d-m-y"));?>
                </div>
            </div>
        </section>
        <section id="SecConsltRetr">
            <div id="TxtTitConsl">Consulta de Retiros Otorgados por FONRETYF</div>
            <div id="ConsltRetir">
                <div>
                    <div id="TextCSP">C.S.P, issemym o nombre: </div> 
                    <input type="text" id="CveServPub" name="CveServPub" placeholder="Escriba clave del maestro">
                    <button type="submit" id="BttnBuscar" click="">BUSCAR</button>    
                </div>
                <div id="opcRadsBusq">
                    <div class="divsRadBtnsBusq"><input type="radio" id="RadBtnCSP" class="RadBtnsOptionsBusq" name="RadBtnsCriterio" value="CSP"><label for="RadBtnCSP">C S P</label></div>
                    <div class="divsRadBtnsBusq"><input type="radio" id="RadBtnIssemym" class="RadBtnsOptionsBusq" name="RadBtnsCriterio" value="Issemym"><label for="RadBtnIssemym">Issemym</label></div>
                    <div class="divsRadBtnsBusq"><input type="radio" id="RadBtnNombre" class="RadBtnsOptionsBusq" name="RadBtnsCriterio" value="Nombre"><label for="RadBtnNombre">Nombre</label></div>
                    <div class="divsRadBtnsBusq"><input type="radio" id="RadBtnFolio" class="RadBtnsOptionsBusq" name="RadBtnsCriterio" value="Folio"><label for="RadBtnFolio">Folio cheque</label></div>
                </div>   
            </div>            
        </section>
        <section id="ResultConsltRetr">
                <table id="retiro_data" class="table display responsive nowrap">
                    <caption>Retiro (s) entregados</caption>
                    <thead id="tabConsultRet">
                        <tr>   
                            <th style="width: 10px;"> id </th> 
                            <th style="width: 5px;"> Mot </th>
                            <th style="width: 15px;"> Clave </th>
                            <th style="width: 150px;"> Nombre del Beneficiario </th>
                            <th style="width: 25px;"> Monto Tot </th>
                            <th style="width: 25px;"> Monto Ent </th>
                            <th style="width: 15px;"> Folio </th>
                            <th style="width: 30px;"> Fecha R </th>
                            <th style="width: 30px;"> Fecha E</th>
                            <th style="width: 35px;"> Estat T </th>
                            <th style="width: 35px;"> Estat C </th>
                        </tr>
                    </thead>
                    <tbody id="resultBusqRets">

                    </tbody>
                </table>
        </section>
    </form>
</section>

    <script src="../../libs/datatables/jquery-3.6.0.js"></script>
    <script src="../../libs/datatables/jquery-3.6.0.min.js"></script>    
    <script src="../../libs/datatables/jquery.dataTables.js"></script>
    <script src="../../libs/datatables/jquery.dataTables.min.js"></script>
    <script src="../../libs/datatables-responsive/dataTables.responsive.js"></script>

    <script src="../../libs/datatables/dataTables.buttons.min.js"></script>
    <script src="../../libs/datatables/buttons.html5.min.js"></script>
    <script src="../../libs/datatables/buttons.colVis.min.js"></script>
    <script src="../../libs/datatables/jszip.min.js"></script>
    <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="../../libs/datatables/select2.min.js"></script>

    <script type="text/javascript" src="../../asset/js/main.js"></script>
    <script type="text/javascript" src="../../asset/js/tramites.js"></script>

<?php
    require_once("/var/www/html/cap1215/views/head/footer.php");
?>