<?php
    session_start();
?>

<div id="editarBenefs" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl" role="document">
        <div class="modal-content" id="contenidoModalBenefs">
            <form method="post" action="" class="formulario" id="edita_Benefs">
                <div class="modal-body">
                    <div class="modal-header" id="modalHeaderBenef">
                        <!--<h4 id="tituto_mod_benefs" id="mdltitulo"></h4>-->
                        Agregar beneficiarios
                    </div>                    
                    <section id="ContenBenefs">
                        <section id="DatsBenefs">
                            <div id="DatBenefsEdit">
                                <div id="DivNumBenefs">Num. beneficiarios: &nbsp<input type="text" id="numsBenefs" name="numsBenefs"><button id="addBenef"  value="agregar"><img src="../../img/add-user.png" alt="Agregar Beneficiario" height="25" width="25"></button></div> 
                                <div id="DivDatsBenef">
                                    <div id="DivBeneficiarios">
                                        <div id="DivNomBenef" class="divsdatsbenef">Nombre:
                                            <div><input type="text" id="nomBenef[]" name="nombenef[]" class="nombenefs" onblur="convierteMayusc(this)"></div>
                                        </div>
                                        <div id="DivCURPBenef" class="divsdatsbenef">CURP:
                                            <div><input type="text" id="curpBenef[]" name="curpbenef[]" class="curpbenefs" minlength="18" maxlength="18" onblur="convierteMayusc(this)"></div>
                                        </div>
                                        <div id="DivParentBenef" class="divsdatsbenef">Parentesco:
                                            <div><select name="parentBenef[]" id="parentBenef[]" class="parentbenefs">
                                                    <option value="E">ESPOSO(A)</option>
                                                    <option value="P">PADRE</option>
                                                    <option value="M">MADRE</option>
                                                    <option value="H">HIJO (A)</option>
                                                    <option value="R">HERMANO (A)</option>
                                                    <option value="S">SOBRINO (A)</option>
                                                    <option value="T">TIO (A)</option>
                                                    <option value="O">PRIMO (A)</option>
                                                    <option value="A">AMIGO (A)</option>
                                                    <option value="C">CONCUBINO (A)</option>
                                                    <option value="D">COMPADRE (COMADRE)</option>
                                                    <option value="V">VECINO (A)</option>
                                                    <option value="PD">PADRASTRO</option>
                                                    <option value="MD">MADRASTRA</option>
                                                    <option value="HM">HERMANASTRO (A)</option>
                                                    <option value="PR">PADRINO</option>
                                                    <option value="MR">MADRINA</option>
                                                    <option value="HJ">AHIJADO (A)</option>
                                                    <option value="N">NIETO (A)</option>
                                                    <option value="HN">NUERA</option>
                                                    <option value="HY">YERNO</option>
                                                    <option value="CN">CUÑADO (A)</option>
                                                    <option value="I">NINGUNO</option>
                                                    <option value="HI">HIJASTRO</option>
                                                    <option value="HA">HIJO ADOPTIVO</option>
                                                    <option value="EE">EX ESPOSO (A)</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div id="DivPorcenBenef" class="divsdatsbenef">%:
                                            <div><input type="text" id="porcentBenef[]" name="porcentBenef[]" class="porcentBenefs"></div>
                                        </div>
                                        <div id="DivEdadBenef" class="divsdatsbenef">Edad:
                                            <div><select name="opcEdoEdadBenef[]" id="opcEdoEdadBenef[]">
                                                <option value="M">Mayor</option>
                                                <option value="N">Menor</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div id="DivEdoVidBenef" class="divsdatsbenef">V/F:                                            
                                            <div><select name="opcEdoVidBenef[]" id="opcEdoVidBenef[]" class="estatedadBenef">
                                                <option value="V">Vivo</option>
                                                <option value="F">Fallecido</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div id="DivfolioBenef" class="divfoliosbenef"># Folio:
                                            <div><input type="text" id="numcheqBenef[]" name="numcheqBenef[]" class="folsBenefs" minlength="5" maxlength="5"></div>
                                        </div>
                                        <div id="DivMontBenef" class="divmontbenef"># Monto:
                                            <div><input type="text" id="montBenef[]" name="montBenef[]" class="montsBenefs" ></div>
                                        </div>
                                        <div id="DivEliminaBenef" class="divsdatsbenef">
                                            <a href="#" class="delete_Benef"><img src="../../img/delete.png" alt="Eliminar" title="Eliminar fecha" height="15" width="20"></a>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </section>
                    </section>
                    <div id="modal-footer">
                        <button type="button" class="btn btn-rounded btn-default" id="cerrarEditBenefs" data-dismiss="modal">Cerrar</button>
                        <button type="submit" name="action" id="#" value="add" class="btn btn-rounded btn-primary">Guardar</button>  
                    </div> 
                </div> 
            </form>
        </div>
    </div>
</div>