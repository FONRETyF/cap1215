<?php
    session_start();
?>

<div id="editarNomMae" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content" id="contenidoModal">
            <form method="post" action="" class="formulario" id="edita_NomMae">
                <div class="modal-body">
                    <div class="modal-header" id="modalHeader">
                        <h4 id="modal-title"></h4>
                    </div>
                    
                    
                    <section id="ContenNomMae">
                        <section id="DatsNomMae">
                            <div id="DatNomMaeModif">
								<input type="hidden" id="cvemae" name="cvemae">
                                <div id="DivApePat">Apellido paterno:<input type="text" id="apepatModif" name="apepatModif"></div>
                                <div id="DivApeMat">Apellido materno<input type="text" id="apematModif" name="apematModif"></div>
                                <div id="DivNomMae">Nombre (s):<input type="text" id="nommaeModif" name="nommaeModif"></div>
                                <div id="DivNomCom"><input type="text" id="nomcomModif" name="nomcomModif" disabled></div>
                            </div>
                        </section>
                    </section>
                    <div id="modal-footer">
                        <!--<button type="button" class="btn btn-rounded btn-default" data-dismiss="modal">Cerrar</button>-->
                        <button type="submit" name="action" id="updNomMae" value="add" class="btn btn-rounded btn-primary">Guardar</button>  
                    </div> 
                </div> 
            </form>
        </div>
    </div>
</div>