<?php
    require_once("/var/www/html/cap1215/views/head/header.php");
    
    if(empty($_SESSION['usuario'])){
        header("Location:login.php");
    }

?>

<section class="contenidoGral">        
    <form class="FormcontenidoGral" action="" method="POST" name="" id="form_captTramite" enctype="multipart/form-data">
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
        <section id="SecCapturaTram">
            <div class="DatsEntr">
                <div id="DvNumEntrNuev">Num. Entrega:
                    <input type="text" class="InptsEntrDetalle" id="InputNumEntr" name="InputNumEntr" value="<?php echo substr($_GET["identret"],4,2);?>" disabled>
                    <input type="hidden" id="numentr" name="numentr">
                </div> 
                <div id="DvAnioEntrNuev">Año:
                    <input type="text" class="InptsEntrDetalle" id="InputAnioEntr" name="InputAnioEntr" value="<?php echo substr($_GET["identret"],0,4);?>" disabled>
                    <input type="hidden" id="AnioEntr" name="AnioEntr">
                    <input type="hidden" id="IdEntrega" name="IdEntrega">
                </div> 
                <input type="hidden" id="identrega" name="identrega">  
            </div>
            <div id="numfolioTEJI">
                <div># Folio</div><div><input type="text" id="numfolcheqTEJI" name="numfolcheqTEJI" minlength="7" maxlength="7"></div>                   
            </div>
            <div id="causaRetiro">Causa Retiro: &nbsp
                <select name="OpcCauRetiro" id="OpcCauRetiro" placeholder="MOTIVO RET" onchange="">
                    <option selected="true" disabled="disabled">Seleccione Motivo</option>
                    <option value="FRI">INHABILITACION</option>
                    <option value="FRJ">JUBILACION</option>
                    <option value="FRF">FALLECIMIENTO ACT</option>
                    <option value="FMJ">FALLECIMIENTO JUB</option>
                </select>
            </div>
                      
            <div class="CapturaJub">
            <section id="SecDatPerson">
                <div class="DatosCaptura">
                    <p>D A T O S &nbsp &nbsp P E R S O N A L E S</p>                  
                    <div id="DivCveServPub">
                        <div>C.S.P: &nbsp<input type="text" id="cspMaeBusq" class="CSPMae" name="cspMaeBusq" ></div>
                        <div>&nbsp &nbsp &nbsp Clave de ISSEMyM: &nbsp<input type="text" id="cveIMaeBusq" class="cveissemym" name="cveIMaeBusq" minlength="3" maxlength="6"></div>
                        <div id="EstatLaboral">Estatus: &nbsp<input type="text" id="estLaboral" name="estLaboral" ></div>
                        <input type="hidden" id="inputProgramFall" name="inputProgramFall">
						<input type="hidden" id="cvemae" name="cvemae" >
                    </div>
                    <!--<div id="DivInforTram"><h1 id="infoTramite"></h1></div>  -->
                    <div id="DivNomMae">Nombre del maestro: 
                        <div id="DivDatsNomMae">
                            <input type="text" class="DatsNomMae" id="apePatMae" name="apePatMae">
                            <input type="text" class="DatsNomMae" id="apeMatMae" name="apeMatMae">
                            <input type="text" class="DatsNomMae" id="nombreMae" name="nombreMae">
                        </div>    
                        <div id="textnommae">
                            <div class="nomMaestro" id="TextApePat">Apellido Paterno</div>
                            <div class="nomMaestro" id="TextApeMat">Apellido Materno</div>
                            <div class="nomMaestro" id="TextNom">Nombre (s)</div>
                        </div>
                        <div>
                            <input type="text" class="nomComplMae" id="nomComplMae" name="nomComplMae">
                        </div> 
                        <div id="curpRfcMae">
                            <div class="curpRfcMae" id="inputCurpmae">CURP: <input type="text" id="CURPMae" class="inputCURP" name="CURPMae" maxlength="18" onblur="convierteMayusc(this)"></div>
                            <div class="curpRfcMae">RFC: <input type="text" id="RFCMae" name="RFCMae" maxlength="13" onblur="convierteMayusc(this)"></div>
                            <div class="curpRfcMae">Region: <input type="text" id="regsindmae" name="regsindmae"></div>                        
                        </div>   
                    </div>
                </div>
            </section>
            <section id="SecDatTramite">
                <div class="DatosCapTram">
                    <p>D A T O S &nbsp D E L &nbsp T R A M I T E &nbsp D E &nbsp R E T I R O</p>
                    <div id="DivDatSolic">
                        <div class="divNomSolic">Solicitante: <input type="text" id="nomSolic" name="nomSolic" onblur="convierteMayusc(this)"></div>
                        <div class="divFechSolic">Fecha de recibido: <input type="date" id="fechRecibido" name="fechRecibido" min="2000-01-01" max="2050-12-31" pattern="\d{4}-\d{2}-\d{2}" required></div>
                    </div>
                    <div id="DivDictBasePsgs">
                        <div id="DivDictamen"><p>DICTAMEN</p> 
                            <div >Fecha: <input type="date" id="fechDictamen" name="fechDictamen" min="2000-01-01" max="2050-12-31" pattern="\d{4}-\d{2}-\d{2}" required></div></br>
                            <div>Folio: &nbsp &nbspCP<input type="text" id="folioDictamen" name="folioDictamen"></div>
                        </div>
                        <div id="DivBaseBaja"><h4 id="tituto_BasJubBajFall" class="titulosDivs"></h4>
                            <div id="DivInputFechBase"><h5 id="tituto_InptBasJub"></h5><input type="date" id="fechBaseMae" name="fechBaseMae" min="1930-01-01" max="2050-12-31"  pattern="\d{4}-\d{2}-\d{2}" required></div></br>   
                            <div id="DivInputFechBaja"><h4 id="tituto_InptBajFall"></h4><input type="date" id="fechBajaMae" name="fechBajaMae" min="2000-01-01" max="2050-12-31"  pattern="\d{4}-\d{2}-\d{2}" required></div>
                        </div>

                        <div id="DivTestBenefsMae"><p>TESTAMENTO</p>
                            <input type="hidden" id="nomsbenefs" name="nomsbenefs" value="">
                            <input type="hidden" id="curpsbenefs" name="curpsbenefs" value="">
                            <input type="hidden" id="parentsbenefs" name="parentsbenefs" value="">
                            <input type="hidden" id="porcentsbenefs" name="porcentsbenefs" value="">
                            <input type="hidden" id="edadesbenefs" name="edadesbenefs" value="">
                            <input type="hidden" id="vidasbenefs" name="vidasbenefs" value="">
							<input type="hidden" id="foliosbenefs" name="foliosbenefs" value="">
                            <input type="hidden" id="montosbenefs" name="montosbenefs" value="">
                            <div id="DivOpcTestamento">
                                <select name="OpcTestamento" id="OpcTestamento">
                                    <option selected="true" disabled="disabled">Doc Testamentario</option>
                                    <option value="CT">Carta Testamentaria</option>
                                    <option value="J">Juicio</option>
                                </select>
                                <div><input type="date" id="fechCTJuicio" name="fechCTJuicio" max="2050-12-31" pattern="\d{4}-\d{2}-\d{2}" required></div>
                            </div>
                            <div id="DivBenefs">
                                <input type="hidden" id="numbenef" name="numbenef" value="1">
                                <div><button id="editaBefens"><img src="../../img/agrega_benef.png" alt="Edita beneficiarios" title="Editar beneficiarios" height="28" width="28"></button></div>
                                <div># de Benefs: <input type="text" id="numBenefs" name="numBenefs"></div>
                            </div>
                        </div>

                        <div id="DivCalculaRetiro"><p>RETIRO</p>
                            <div id="divPeriLaboral">
                                <input type="hidden" id="DiasServOriginal" name="DiasServOriginal" value="">
                                <div class="DatsPeriodLab"><input type="text" id="aniosServMae" name="aniosServMae"></div>
                            </div>
                            <div id="textPrioLaboral">
                                <div class="textPeriodLab">años de servicio</div>
                            </div>
                        </div>
                    </div>              
                </div>
            </section>
            <section id="SecDatModRet">
                <p>S E G U R O &nbsp; D E &nbsp; R E T I R O &nbsp; </p>
                <div id="DivMontoTotalRet">
                    <input type="hidden" id="monttotret" name="monttotret">
                    <div class="montsRet" id="montRetiro">Monto total del seguro de retiro: &nbsp $<input type="text" id="montRet" name="montRet" value="0"></div></br>
                </div>                          
                <div id="divObservacionesTram">
                    <div>Observaciones</div><div><input type="text" id="observTramite" name="observTramite" maxlength="500"></div>                   
                </div>
                <div id="divAgregaTram">
                    <button type="submit" id="updateTramite" name="updateTramite" >GUARDAR</button>
                </div>
            </section>
            </div>
        </section>
    </form>
</section>

<?php require_once("/var/www/html/cap1215/views/home/editaBeneficiarios.php"); ?>

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
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>

<script type="text/javascript" src="../../asset/js/tramiteUpdate.js"></script>



<?php require_once("/var/www/html/cap1215/views/head/footer.php"); ?>