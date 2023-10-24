<?php
    session_start();
    require_once("/var/www/html/cap1215/views/head/header.php");
    /*if(empty($_SESSION['usuario'])){
        header("Location:login.php");
    }*/
?>

<section class="contenidoGral">
    <form class="FormcontenidoGral" action="" method="POST" name="" id="form_retiros">
        <section class="sectNavegador">
            <div class="DivBotnsNav">
                <div id="DivBtnatras">
                    <button type="button" class="BtnsNav Btnregresar"  id="Btnregresar" name="Btnregresar">ATRAS</></button>
                </div>
                <div id="DivBtnInicio">
                    <button type="button" class="BtnsNav" id="Btnnicio" name="Btnnicio">INICIO</></button>
                </div>
                <div id="DivFechaActual">
                    <?php date_default_timezone_set('America/Mexico_City'); echo("Toluca, México a  " .date("d-m-y, h:m:s"));?>
                </div>
            </div>
        </section>
        <section id="secRetiros">
            <div id="divNumEstatEntr">
                <div id="divNumEntr">RELACION DE RETIROS DE LA ENTREGA:
                    <input type="text" id="InputIdentrega" value="<?php echo $_GET["identrega"];?>">
                </div>
            </div>
            <div id="ConsultRetiros">
                <input type="hidden" id="estatentrega" name="estatentrega">
                <div id="operationsEntr">
                    <a id="tramNuevo" class="btnsOperations" href="tratimeCaptura.php?identrega=<?php echo $_GET["identrega"];?>"><img src="../../img/new-document.png" alt="Nuevo tramite" title="Nuevo tramite" height="35" width="35"></a>
                    
                </div>
                <div id="DivEstatEntr">ESTATUS: &nbsp
                    <input type="checkbox" id="checkStatParam" checked onchange='cambiastatus();' data-toggle="toggle" data-onstyle="outline-success" data-offstyle="outline-danger">
                </div>
            </div>
            <div id="ResultConsultRets">
                <table id ="retiros_data" class="table display responsive nowrap despliegue_tabla">
                    <thead class="rets_dats">
                            <tr>
                            <th class="wd-15p"> Clave </th>
                            <th class="wd-15p"> Motivo </th>
                            <th class="wd-15p"> Maestro </th>
                            <th class="wd-15p"> Monto </th>
                            <th class="wd-15p"> Fol. Cheque </th>
                            <th class="wd-15p"> Estatus </th>
                            <th class="wd-15p"></th>
                            <th class="wd-15p"></th>
                            <th class="wd-15p"></th>
                        </tr>
                    </thead>
                </table>
            </div>
        </section>
    </form>
</section>


<script src="../../libs/datatables/jquery-3.6.0.js"></script>
<script src="../../libs/datatables/jquery-3.6.0.min.js"></script>

<script src="../../libs/datatables/moment.js"></script>
<script src="../../libs/datatables/jquery-ui.js"></script>
<script src="../../libs/datatables/jquery.peity.js"></script>
<script src="../../libs/datatables/jquery.dataTables.js"></script>
<script src="../../libs/datatables/jquery.dataTables.min.js"></script>

<script src="../../libs/datatables-responsive/dataTables.responsive.js"></script>
<script src="../../libs/datatables/dataTables.buttons.min.js"></script>
<script src="../../libs/datatables/buttons.html5.min.js"></script>
<script src="../../libs/datatables/buttons.colVis.min.js"></script>
<script src="../../libs/datatables/jszip.min.js"></script>
<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="../../libs/datatables/select2.min.js"></script>

<script type="text/javascript" src="../../asset/js/retiros.js"></script>

<?php require_once("/var/www/html/cap1215/views/home/detalleRetiro.php"); ?>
<?php require_once("/var/www/html/cap1215/views/head/footer.php"); ?>
