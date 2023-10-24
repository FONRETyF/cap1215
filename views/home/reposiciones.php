<?php
    require_once("/var/www/html/cap1215/views/head/header.php");

    if(empty($_SESSION['usuario'])){
        header("Location:login.php");
    }

?>

<section class="contenidoGral">
    <form class="FormcontenidoGral" action="" method="POST" name="" id="form_ReposicionCheq">
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
        <section id="secReposCheqs">
            <div id="divTitleReposheqs">REPOSICION DE CHEQUES</div>
            <div>
                <div id="divReposiciones">
                    <div id="divtitlenumcheq"># cheque: </div>
                    <div><input type="text" id="numCheqCancel" name="numCheqCancel"></div>
                    <div><button type="submit" id="BttnBuscarCheq" name="BttnBuscarCheq">...</button></div>
                </div>
            </div>
            <div id="tabChequeC">
                <table id="chequeC_data" class="table display responsive nowrap">
                    <caption>Cheque cancelado</caption>
                    <thead id="tabConsultCheqC">
                        <tr>
                            <th style="width: 5px;"> Entrega </th>
                            <th style="width: 150px;"> Nombre </th>
                            <th style="width: 25px;"> Estatus  </th>
                            <th style="width: 25px;"> Motiv Cancel</th>
                            <th style="width: 15px;"> Observaciones </th>
                        </tr>
                    </thead>
                    <tbody id="resultBusqCheqs">

                    </tbody>
                </table>
            </div>
            <div class="divDatsReposCheq" id="divDatsReposCheq">
              <div class="TitledivDatsReposCheq">Datos del nuevo cheque</div>
              <div class="titlesDatosCheqs">
                <div class="titleDatocheqRepos" id="titleNomBenef">Nombre</div>
                <div class="titleDatocheqRepos" id="titleMonBenef">Monto</div>
                <div class="titleDatocheqRepos" id="titleMonBenefLet">Monto Letra</div>
              </div>
              <div class="datsCheqRepos">
                <div class="inputNomBenef" id="inputNomBenef"><input type="text" name="NomBenefRepos" id="NomBenefRepos"> </div>
                <div class="inputMonBenef" id="inputMonBenef"><input type="text" name="MontBenefRepos" id="MontBenefRepos" class="MontBenefRepos"></div>
                <div class="inputMonBenefLet" id="inputMonBenefLet"><input type="text" name="MontLetRepos" id="MontLetRepos" disabled></div>
              </div>

            </div>
            <div id="divReposicion">
                <div id="divFolNuevo">Folio nuevo: <input type="text" id="numCheqRepos" name="numCheqRepos"></div>
                <div id="divFechRepos"><input type="date" id="fechRepos" name="fechRepos"></div>
                <div id="divOficRepos"></div>
            </div>
            <div id="divObservRepos">
                <div id="divObserv">Observaciones: <input type="text" id="observRepos" name="observRepos"></div>
            </div>
            <div id="divButtonCancel" class="divsCancels">
                <button type="submit" id="reposCheque" name="reposCheque" >REPONER</button>
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

<script type="text/javascript" src="../../asset/js/reposiciones.js"></script>

<?php require_once("/var/www/html/cap1215/views/head/footer.php"); ?>
