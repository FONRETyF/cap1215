<?php
    require_once("/var/www/html/cap1215/views/head/header.php");
    if(empty($_SESSION['usuario'])){
        header("Location:login.php");
    }
?>

<section class="contenidoGral">
    <section id="SecEntrDetalle">
        <div class="DatsEntr">
            <div id="DvNumEntrNuev">Num. Entrega:
                <input type="text" class="InptsEntrDetalle" id="InputNumEntr">
            </div> 
            <div id="DvAnioEntrNuev">Año:
                <input type="text" class="InptsEntrDetalle" id="InputAnioEntr">
            </div> 
            <div></div>
            <div id="procesosEntr">
                <!--<img src="../../img/fechEntr.gif" alt="" width="30" height="30" id="AsigFechEntr">-->
                <img src="../../img/NumFolio.gif" alt="" width="30" height="30" id="AsigFolCheq">
            </div>       
        </div>
        <div id="ConslEntrDetalle">
            <div id="consultDetalle">C.S.P o Issemym: 
                <input type="text" id="txtconultDetalle" name="txtconultDetalle" placeholder="CSP, issemym o nombre">
                <button id="BttnBuscar">BUSCAR</button>       
            </div>
        </div>
        
        <section id="SecEntrgDetalle">
            <div id="DetalleEntr">
                <section id="ResultConsltRetr">
                    <table class="tabReslRetrs">
                        <thead class="tablaRet">
                            <tr>   
                                <th class="wd-15p">id</th> 
                                <th class="wd-15p">CSP o Issemym</th>
                                <th class="wd-15p">Nombre del Beneficiario</th>
                                <th class="wd-15p">Motivo</th>
                                <th class="wd-15p"></th>
                                <th class="wd-15p"></th>
                                <th class="wd-15p"></th>
                                <th class="wd-15p"></th>
                                <!--<th> 
                                    <div class="accRet">
                                        <div class="acccionRet"><img src="../../img/MODIFICAR.gif" alt="" width="30" height="30" class="buttonAcc" id="modifRet"></div>
                                        <div class="acccionRet"><img src="../../img/PROCEDENTE.gif" alt="" width="35" height="35" class="buttonAcc" id="procRet"></div>
                                        <div class="acccionRet"><img src="../../img/PENDIENTE.gif" alt="" width="35" height="35" class="buttonAcc" id="pendfRet"></div>
                                        <div class="acccionRet"><img src="../../img/ELIMINAR.gif" alt="" width="30" height="30" class="buttonAcc" id="elimRet"></div>
                                    </div>
                                </th>-->
                            </tr>
                        </thead>
                    </table>
                </section>
            </div>
        </section>

    </section>
</section>


<?php require_once("/var/www/html/cap1215/views/head/footer.php"); ?>