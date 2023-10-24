<?php
    require_once("/var/www/html/cap1215/views/head/header.php");
    
    if(empty($_SESSION['usuario'])){
        header("Location:login.php");
    }
?>

<section class="contenidoGral">
    <form class="FormcontenidoGral" action="" method="POST" name="" id="form_entrega">
        <section class="sectNavegador">
            <div class="DivBotnsNav">
                <div id="DivBtnatras">
                    <button type="button" class="BtnsNav Btnregresar" id="Btnregresar" name="Btnregresar">ATRAS</></button>
                </div>
                <div id="DivFechaActual">
                    <?php date_default_timezone_set('America/Mexico_City'); echo("Toluca, México a  " .date("d-m-y"));?>
                </div>
            </div>
        </section>
        <section id="secEntregas">Relacion de entregas de FONRETyF
            <div id="ConsultEntregas">
                <div id="AgregaEntr">
                    <a id="entrNueva" href="#"><img src="../../img/add.png" alt="Nueva" title="Nueva Entrega" height="35" width="35"></a>    
                </div>
            </div>
            <div id="ResultConsult">
                <table id ="entrega_data" class="table display responsive nowrap">
                    <thead class="tab_entregas">
                        <tr>
                            <th class="wd-15p"> Num </th>
                            <th class="wd-15p"> Año </th>
                            <th class="wd-15p"> Nombre Entrega </th>
                            <th class="wd-15p"> Estatus </th>
                            <th class="wd-15p"> Fecha Entrega </th>
                            <th class="wd-15p"> Num Trams </th>
                            <th class="wd-15p"> Monto </th>
                            <th class="wd-15p"></th>
                            <th class="wd-15p"></th>
                            <th class="wd-15p"></th>
                        </tr>
                    </thead>
                    <tbody id="tbodEntregas" class="tbodEntregas">
                    </tbody>
                </table>
            </div>
        </section>


        <section class="modalEntrega">
            <div class="modal_contenedorEntr">
                <h2 class="modal_title"></h2>
                <div class="divseparador"></div>
                <section class="DatsEntregaDetalle">
                    <input type="hidden" id="identrega" name="identrega">      
                    <section id="ContenEntregas">
                        <section id="DatsEntrDetalle">
                            <div class="DatsEntrNuv">
                                <div id="DvAnioEntrNuev">Año: 
                                    <input type="text" class="Anioentrega" name="Anioentrega" id="Anioentrega" minlength="4" maxlength="4" required>
                                </div>
                                <div id="DvNumEntrNuev">Num. Entrega:
                                    <input type="text" class="numentrega" name="numentrega" id="numentrega" minlength="1" maxlength="2" required>
                                </div>
                            </div>
                            <div class="DatsEntrNuv">
                                <div id="DvDescEntrNuv">Descripcion:
                                    <input type="text" id="descentrega" name="descentrega">
                                </div>
                            </div>
                            <div id="divFechaEntrega">
                                <div class="fechEntrEdit">Fecha Entrega:
                                    <input type="date" id="fechentrega" name="fechentrega" pattern="\d{4}-\d{2}-\d{2}">
                                </div>
                                <div id="DivAsignaFecha">
                                    <label><input type="checkbox" id="CheckAsigFech" value="checkfechentr"> Asigna Fecha</label for="checkfechentr"><br>
                                </div>
                            </div>
                            <div class="obsrEntrEdit">Observaciones:
                                <input type="text" id="observaciones" name="observaciones">
                            </div>
                        </section>
                    </section>
                </section>
                <section class="divaddEntr">
                    <a href="#" class="addEntrega">Agregar</a>
                    <a href="#" id="updateEntr" class="updateEntr">Guardar</a>
                </section>
                <section class="closeWindowEntr">
                    <a href="#" class="modalE_close">Cerrar</a>
                </section>
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

<script type="text/javascript" src="../../asset/js/entregas.js"></script>

<?php require_once("/var/www/html/cap1215/views/head/footer.php"); ?>