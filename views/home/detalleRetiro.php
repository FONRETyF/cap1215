<?php
    session_start();
?>

<div id="detalleInfoRatiro" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content" id="contenidoModalDetalleRet">
            <form method="post" action="" class="formulario" id="detalle_retiro">
                <div class="modal-body">
                    <div class="modal-header" id="modalHeaderDetalleRet">
                        <div id="titulomodal">DETALLE DEL TRAMITE</div>
                        <div id="DivDTRecibido" class="DivsFechas">Recibido: <input type="text" id="DTIfechRecib" name="DTIfechRecib" disabled></div>
                        <!--<h4 id="tituto_mod_benefs" id="mdltitulo"></h4>-->
                    </div>                    
                    <section id="informPersonTram">
                        <div id="DivMotivTram">Motivo: <input type="text" id="DTIMotivRet" name="DTIMotivRet" disabled></div>
                        <div id="DivCveNomMae">
                            <div class="infoDetallTram">Clave del maestro:
                                <div id="DTcvemae"><input type="text" id="DTIcvemae" name="DTIcvemae" disabled></div>
                            </div >
                            <div class="infoDetallTram">&nbsp;&nbsp; Nombre del maestro:
                                    <div id="DTnommae"><input type="text" id="DTInommae" name="DTInommae" disabled></div>
                            <div>
                        </div>
                    </section>
                    <section id="informTram">
                        <div id="DivFechsTram">
                            <div id="DivDTBase"  class="DivsFechas">Base/Jub: <input type="text" id="DTIfechBase" name="DTIfechBase" disabled></div>
                            <div id="DivDTBaja"  class="DivsFechas">Baja: <input type="text" id="DTIfechBaja" name="DTIfechBaja" disabled></div>
                        </div>
                        <div id="DivPeriodLab">
                            <div id="DivDTPermisos">Permisos: <input type="text" id="DTIpermisos" name="DTIpermisos" disabled></div>
                            <div id="DivDTDiasPermisos">Dias de permisos: <input type="text" id="DTIdiaspermisos" name="DTIdiaspermisos" disabled></div>
                            <div id="DivDTAniosBase">Años base/jub: <input type="text" id="DTIaniosbase" name="DTIaniosbase" disabled></div>
                        </div>
                        
                    </section>
                    <section id="informRetTram">
                        <div id="DivModRetiro">
                            <div id="DivModalRet">Modo de retiro: <input type="text" name="" id="DTImodret" name="DTImodret" disabled></div>
                            <div id="DivMontodelretiro">
                                <div class="DivsMontretDT">Mont total: <input type="text" id="DTImonttot" name="DTImonttot" disabled></div>
                                <div class="DivsMontretDT">Mont entrega: <input type="text" id="DTImontentr" name="DTImontentr" disabled></div>
                                <div class="DivsMontretDT">Mont Fond. Fallec.: <input type="text" id="DTImontff" name="DTImontff" disabled></div>
                            </div>
                            <div id="DivChequeDT">
                                <div id="DIvStattram">
                                    <div id="DivDTEstattram">Estatus tramite: <input type="text" id="DTIestattram" name="DTIestattram"></div>
                                    <div id="DivDTFechEntr">Fecha entrega: <input type="text" id="DTIfechentre" name="DTIfechentre"></div>
                                </div>
                                <div id="DivDTcheque">
                                    <div id="DivDTFolche">Folio cheque: <input type="text" id="DTIfolche" name="DTIfolche"></div>
                                    <div id="DivDTEstatche">Estatus cheque: <input type="text" id="DTIestatche" name="DTIestatche"></div>
                                </div>
                                <div></div>
                            </div>
                        </div>
                    </section>
                    <div id="detalleObserv">
                        <div>Observaciones</div><div><input type="text" id="observTramite" name="observTramite" maxlength="500"></div>                   
                    </div>
                    <section id="secBenefes">
                        <table id ="benefs_data" class="table display responsive nowrap despliegue_tabla">
                            <thead class="tabBenefs">
                                <tr>
                                    <th>ID</th>
                                    <th>NOMBRE</th>
                                    <th>CURP</th>
                                    <th>P</th>
                                    <th>%</th>
                                    <th>E</th>
                                    <th>V</th>
                                    <th>FOLIO</th>
                                    <th>ST</th>
                                    <th>FECH</th>
                                </tr>
                            </thead>
                            <tbody id="resultDTBenefs">

                            </tbody>
                        </table>
                    </section>
                    <div id="modal-footer">
                        <button type="button" class="btn btn-rounded btn-default" id="cerrarDetalleRet" data-dismiss="modal">Cerrar</button>
                    </div> 
                </div> 
            </form>
        </div>
    </div>
</div>

