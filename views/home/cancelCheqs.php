<?php
    require_once("/var/www/html/cap1215/views/head/header.php");

    if(empty($_SESSION['usuario'])){
        header("Location:login.php");
    }

?>

<section class="contenidoGral">
    <form class="FormcontenidoGral" action="" method="POST" name="" id="form_CancelCheqs" enctype="multipart/form-data">
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
        <section id="secCalcelCheqs">
            <div id="divTitleCancelcheqs">CANCELACION DE CHEQUES</div>
            <div id="divCancelaciones" class="divsCancels">
                <div id="titleFolChq"># cheque:
                    <div><input type="text" id="numCheqCalcel" class="folcheque"></div>
                </div>
            </div>
            <div class="divDatsChqs">
                <div id="titleDatsChqs">Datos del cheque</div>
                <div id="datsCheqCancel">
                    <table id="cheque_data" class="table display responsive nowrap">
                        <caption>Cheque encontrado</caption>
                        <thead id="tabCnsltCheque">
                            <tr>
                                <th style="width: 15px;">Entrega</th>
                                <th style="width: 15px;">Fol. cheque</th>
                                <th style="width: 150px;">Nombre Beneficiario</th>
                                <th style="width: 20px;">Monto</th>
                                <th style="width: 20px;">Fecha</th>
                            </tr>
                        </thead>
                        <tbody id="resultsBusqCheq">

                        </tbody>
                    </table>

                </div>
            </div>
            <div class="divDatsCancelChqs">
                <div id="titleDatsCancChqs">Datos de cancelacion</div>
                <div>
                    <select name="motivCancel" id="motivCancel" placeholder="Motivo de cancelacion" required>
                        <option selected="true" disabled="disabled">Motivo</option>
                        <option value="1">ERROR DE IMPRESIÓN</option>
                        <option value="2">ERROR EN EL NOMBRE</option>
                        <option value="3">ERROR EN EL CALCULO</option>
                        <option value="4">ERROR EN LA FECHA</option>
                        <option value="5">ERROR EN LA CANTIDAD CON LETRA</option>
                        <option value="6">DEFECTO DEL CHEQUE</option>
                        <option value="7">EXTRAVIO</option>
                        <option value="8">ROBO</option>
                        <option value="9">DUPLICIDAD</option>
                        <option value="10">ES ADEUDO</option>
                        <option value="11">SIN MOTIVO</option>
                        <option value="12">NO RECOGERLO</option>
                        <option value="13">FALLECIMIENTO DEL MAESTRO (TRAM JUB)</option>
                        <option value="14">FALLECIMIENTO DEL BENEFICIARIO</option>
                        <option value="15">MAL ENDOSO</option>
                        <option value="16">DEFECTO DE USUARIO</option>
                        <option value="17">CHEQUE MUESTRA</option>
                        <option value="18">CAMBIO DE BENEFICIARIO</option>
                        <option value="19">NO ASIGNADO</option>
                        <option value="20">ERROR EN EL MONTO</option>
                        <option value="21">ERROR EN EL MOTIVO DEL RETIRO</option>
                        <option value="22">DEVUELTO POR EL BANCO (CIS)</option>
                        <option value="23">DEVUELTO POR EL BANCO (DATOS DEL CHEQUE)</option>
                        <option value="24">DEVUELTO POR EL BANCO (OTRO BANCO)</option>
                        <option value="25">DUPLICIDAD CHEQUE</option>
                    </select>
                </div>
                <div id="divObservCheque">
                    <div>Observaciones: </div>
                    <div><input type="text" id="observCancelCheque" name="observCancelCheque"></div>
                </div>
            </div>

            <div id="divButtonCancel" class="divsCancels">
                <button type="submit" id="cancelCheque" name="cancelCheque" >CANCELAR</button>
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

<script type="text/javascript" src="../../asset/js/cheques.js"></script>

<?php require_once("/var/www/html/cap1215/views/head/footer.php"); ?>
