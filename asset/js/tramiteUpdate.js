var motivo = "";
var programfallec = "";
var clavemae = "";
var contPSGS = 0;
var idretiro = '';
var paramidret = '';
var numadedsM = 0;
var tipTramit = '';

function init(){
    /*$("#edita_NomMae").on("submit",function(e){
        alert("kdfjlkdsjfldjs");
        actNomMae(e);
    });*/
}

$(document).ready(function () {
    document.getElementById('numentr').value = document.getElementById('InputNumEntr').value;
    document.getElementById('AnioEntr').value = document.getElementById('InputAnioEntr').value;
    document.getElementById('IdEntrega').value = document.getElementById('AnioEntr').value + document.getElementById('numentr').value;
    document.getElementById("DivTestBenefsMae").style.display = "none";
    document.getElementById("DivExcepciones").style.display = "none";
    document.getElementById("DivFechInicioJuicio").style.display = "none";
    document.getElementById("DivDatsAdeudos").style.display = "none";

    $('#tituto_BasJubBajFall').html('BASE Y BAJA');
    $('#tituto_InptBasJub').html('Base: &nbsp');
    $('#tituto_InptBajFall').html('Baja: &nbsp');   
    
    $("#cerrarEditPSGS").click(function () {
        $("#editarPSGS").modal('hide');
    });

    $("#cerrarEditBenefs").click(function () {
        $("#editarBenefs").modal('hide');
    });
    
    var dirurl = window.location.search;
    var paramBusq = new URLSearchParams(dirurl);
    paramidret = paramBusq.get('identret');

    $.post("../../controller/retiros.php?op=getTram",{identret:paramidret},function(data){  
        datTramite = JSON.parse(data);
        var motivoRet = datTramite.motvret;
        var modretiro = datTramite.modretiro;
        var cvemae = datTramite.cvemae;

        motivo = motivoRet;

        if(motivoRet == "J" || motivoRet == "I") {
            $.post("../../controller/retiros.php?op=updateTram",{identret:paramidret,modretiro:modretiro,cvemae:cvemae,motivoRet:motivoRet},function(data){
                datUpdateTram = Object.values(JSON.parse(data));
                var infoTramite = Object.values(datUpdateTram[0]);
                
                idretiro = infoTramite[4];
                
                switch (infoTramite[7]) {
                    case 'I':
                        var estatLabMae = "INHABILITADO";
                        break;
                    case 'J':
                        var estatLabMae = "JUBILADO";
                        break;
                    default:
                        break;
                }
                
                if (infoTramite.length == 79) {
                    $("#OpcCauRetiro").val(infoTramite[7]);
                    $("#numentr").val(infoTramite[5].substr(4,2));
                    $("#AnioEntr").val(infoTramite[5].substr(0,4));
                    $("#IdEntrega").val(infoTramite[5].substr(0,4) + infoTramite[5].substr(4,2));
                    $("#folioTram").val(infoTramite[43]);
                    $("#cspMaeBusq").val(infoTramite[6]);
                    $("#cveIMaeBusq").val(infoTramite[73]);
                    $("#estLaboral").val(estatLabMae);
                    $("#apePatMae").val(infoTramite[73]);
                    $("#apeMatMae").val(infoTramite[74]);
                    $("#nombreMae").val(infoTramite[75]);
                    $("#nomComplMae").val(infoTramite[52]);  
                    $("#CURPMae").val(infoTramite[53]);
                    $("#RFCMae").val(infoTramite[54]);
                    $("#regsindmae").val(infoTramite[55]);
                    $("#TelPartiMae").val(infoTramite[13]);
                    $("#TelCelMae").val(infoTramite[12]);              
                    $("#nomSolic").val(infoTramite[11]);
                    $("#fechRecibido").val(infoTramite[28]);
                    document.getElementById('fechRecibido').disabled = true;
                    $("#fechDictamen").val(infoTramite[9]);
                    $("#folioDictamen").val(infoTramite[8]);
                    $("#fechBaseMae").val(infoTramite[56]);
                    $("#fechBajaMae").val(infoTramite[58]);
                    $("#DiasServOriginal").val(infoTramite[78]);

                    clavemae = document.getElementById("cspMaeBusq").value;

                    if (infoTramite[59] == 0) {
                        document.getElementById('sinPSGS').checked = true;
                        document.getElementById('editaPSGS').disabled = true;
                    } else {
                        document.getElementById('sinPSGS').checked = false;
                        document.getElementById('editaPSGS').disabled = false;
                    }
                    $("#numPsgs").val(infoTramite[59]);
                    document.getElementById('numPsgs').disabled = true;
                    
                    $("#diasPsgs").val(infoTramite[60] );
                    document.getElementById('diasPsgs').disabled = true;

                    contPSGS = infoTramite[59];
                    for (let index = 0; index < infoTramite[59]; index++) {
                        $('#DivFechsPSGSIni').append(
                            '<div><input type="date" name="fechaIni['+ index +']" id="fechaIni['+ index +']"><a href="#" class="delete_fechaI"><img src="../../img/delete.png" alt="Eliminar" title="Eliminar fecha" height="15" width="20"></a></input></div>'
                        );
                        $('#DivFechsPSGSFin').append(
                            '<div><input type="date" name="fechaFin['+ index +']"  id="fechaFin['+ index +']"><a href="#" class="delete_fechaF"><img src="../../img/delete.png" alt="Eliminar" title="Eliminar fecha" height="15" width="20"></a></input></div>'
                        );                        
                    }

                    $("#fechsIniPSGS").val(infoTramite[76]);
                    $("#fechsFinPSGS").val(infoTramite[77]);
                    $("#diasServMae").val(infoTramite[78]);
                    document.getElementById('diasServMae').disabled = true;
                    $("#aniosServMae").val(infoTramite[57]);

                    document.getElementById('aniosServMae').disabled = true;
                    $("#montRet").val(infoTramite[20].replace('$',''));
                    
                    $("#monRetEntr").val(infoTramite[23].replace('$',''));
                    $("#montRetFF").val(infoTramite[25].replace('$',''));
                    $("#montSalMin").val(infoTramite[46].replace('$',''));

                    $("#observTramite").val(infoTramite[27]);

                    $numadedsM = infoTramite[36];
                    if ($numadedsM > 0) {
                        document.getElementById('CheckAdeudos').checked = true;
                        document.getElementById("DivDatsAdeudos").style.display = "block";
                        
                        if (infoTramite[38].replace('$','').replace(',','') > 0) {
                            $("#AdedFajam").val(infoTramite[38].replace('$','').replace(',',''));
                        }
                        if (infoTramite[39].replace('$','').replace(',','') > 0) {
                            $("#AdedTS").val(infoTramite[39]);
                        }
                        if (infoTramite[40].replace('$','').replace(',','') > 0) {
                            $("#AdedFondPension").val(infoTramite[40].replace('$','').replace(',',''));
                        }
                        if (infoTramite[41].replace('$','').replace(',','') > 0) {
                            $("#AdedTurismo").val(infoTramite[41].replace('$','').replace(',',''));
                        }

                        $("#montRetSinAded").val(infoTramite[22]);
                        $("#montAdeudos").val(infoTramite[37]);
                    } else {
                        
                    }

                    if (modretiro == "C") {
                        $("#ModoRetiro").val("C");
                        document.getElementById('DivTpoDiferido').style.display = "none";
                        document.getElementById('montRetFondFall').style.display = "none";
                    } else {
                        $("#ModoRetiro").val("D");
                        if (modretiro == "D50") {
                            document.getElementById('ModRetDiferid50').checked = true;
                        }else if (modretiro == "D100") {
                            document.getElementById('ModRetDiferid100').checked = true;
                        }
                    }
                } else {
					
					
                    $("#OpcCauRetiro").val(infoTramite[7]);
                    $("#motvret").val(infoTramite[7]);
					
					tipTramit = infoTramite[52];
					if ( tipTramit == 0) {
						document.getElementById("tipTramNE").checked = false;
						document.getElementById("numfolioTEJI").style.display = "none";
                    } else{
						document.getElementById("tipTramNE").checked = true;
						document.getElementById("numfolioTEJI").style.display = "block";
						$("#numfolcheqTEJI").val(infoTramite[68]);
					}
					
					
                    $("#numentr").val(infoTramite[2]);
                    $("#AnioEntr").val(infoTramite[1]);
                    $("#IdEntrega").val(infoTramite[3]);
                    $("#folioTram").val(infoTramite[43]);
                    $("#cspMaeBusq").val(infoTramite[6]);
                    $("#cveIMaeBusq").val(infoTramite[73]);
                    $("#estLaboral").val(estatLabMae);
                    $("#apePatMae").val(infoTramite[74]);
                    $("#apeMatMae").val(infoTramite[75]);
                    $("#nombreMae").val(infoTramite[76]);
                    $("#nomComplMae").val(infoTramite[53]);  
                    $("#CURPMae").val(infoTramite[54]);
                    $("#RFCMae").val(infoTramite[55]);
                    $("#regsindmae").val(infoTramite[56]);
                    $("#TelPartiMae").val(infoTramite[13]);
                    $("#TelCelMae").val(infoTramite[12]);              
                    $("#nomSolic").val(infoTramite[11]);
                    $("#fechRecibido").val(infoTramite[28]);
                    document.getElementById('fechRecibido').disabled = true;
                    $("#fechDictamen").val(infoTramite[9]);
                    $("#folioDictamen").val(infoTramite[8]);
                    $("#fechBaseMae").val(infoTramite[57]);
                    $("#fechBajaMae").val(infoTramite[59]);
                    /*$("#DiasServOriginal").val(infoTramite[]);*/
					
					clavemae = document.getElementById("cspMaeBusq").value;				
					
                    if (infoTramite[60] == 0) {
                        document.getElementById('sinPSGS').checked = true;
                        document.getElementById('editaPSGS').disabled = true;
                    } else {
                        
                        document.getElementById('sinPSGS').checked = false;
                        document.getElementById('editaPSGS').disabled = false;
                    }
                    $("#numPsgs").val(infoTramite[60]);
                    document.getElementById('numPsgs').disabled = true;
                    
                    $("#diasPsgs").val(infoTramite[61] );
                    document.getElementById('diasPsgs').disabled = true;
                    contPSGS = infoTramite[60];

                    for (let index = 0; index < infoTramite[60]; index++) {
                        $('#DivFechsPSGSIni').append(
                            '<div><input type="date" name="fechaIni['+ index +']" id="fechaIni['+ index +']"><a href="#" class="delete_fechaI"><img src="../../img/delete.png" alt="Eliminar" title="Eliminar fecha" height="15" width="20"></a></input></div>'
                        );
                        $('#DivFechsPSGSFin').append(
                            '<div><input type="date" name="fechaFin['+ index +']"  id="fechaFin['+ index +']"><a href="#" class="delete_fechaF"><img src="../../img/delete.png" alt="Eliminar" title="Eliminar fecha" height="15" width="20"></a></input></div>'
                        );                        
                    }
                    
                    $("#fechsIniPSGS").val(infoTramite[77]);
                    $("#fechsFinPSGS").val(infoTramite[78]);
                    $("#diasServMae").val(infoTramite[79]);
                    document.getElementById('diasServMae').disabled = true;
                    $("#aniosServMae").val(infoTramite[58]);
                    document.getElementById('aniosServMae').disabled = true;
                    $("#montRet").val(infoTramite[20].replace('$',''));
                    
                    $("#monRetEntr").val(infoTramite[23].replace('$',''));
                    $("#montRetFF").val(infoTramite[25].replace('$',''));
                    $("#montSalMin").val(infoTramite[46].replace('$',''));

                    $("#observTramite").val(infoTramite[27]);

                    if (modretiro == "C") {
                        $("#ModoRetiro").val("C");
                        document.getElementById('DivTpoDiferido').style.display = "none";
                        document.getElementById('montRetFondFall').style.display = "none";
                    } else {
                        $("#ModoRetiro").val("D");
                        if (modretiro == "D50") {
                            document.getElementById('ModRetDiferid50').checked = true;
                        }else if (modretiro == "D100") {
                            document.getElementById('ModRetDiferid100').checked = true;
                        }
                    }
                }
                
                
            });
        }else if (motivoRet == "FA") {
            document.getElementById("DivDictamen").style.display = "none";
            document.getElementById("DivTestBenefsMae").style.display = "block";
            document.getElementById("OpcTestamento").disabled = true;
            $('#tituto_BasJubBajFall').html('JUBILACION Y FALLECIMIENTO');
            $('#tituto_InptBasJub').html('Base: &nbsp');
            $('#tituto_InptBajFall').html('Fallecim.: &nbsp'); 

            $.post("../../controller/retiros.php?op=updateTram",{identret:paramidret,modretiro:modretiro,cvemae:cvemae,motivoRet:motivoRet},function(data){
                datUpdateTram = Object.values(JSON.parse(data));
                var infoTramite = Object.values(datUpdateTram[0]);
                
                idretiro = infoTramite[5];
                var estatLabMae = "FALLECIDO";

                $("#OpcCauRetiro").val(infoTramite[7]);
                $("#numentr").val(infoTramite[2]);
				
				tipTramit = infoTramite[52];
				if ( tipTramit == 0) {
					document.getElementById("tipTramNE").checked = false;
					document.getElementById("numfolioTEJI").style.display = "none";
					document.getElementById("DivfolioBenef").style.display = "none";
                } else{
					document.getElementById("tipTramNE").checked = true;
					document.getElementById("numfolioTEJI").style.display = "none";
					document.getElementById("DivfolioBenef").style.display = "block";
				}
					
                $("#AnioEntr").val(infoTramite[1]);
                $("#IdEntrega").val(infoTramite[3]);
                $("#folioTram").val(infoTramite[43]);
                $("#cspMaeBusq").val(infoTramite[6]);
                $("#cveIMaeBusq").val(infoTramite[64]);
                $("#estLaboral").val(estatLabMae);
                $("#apePatMae").val(infoTramite[65]);
                $("#apeMatMae").val(infoTramite[66]);
                $("#nombreMae").val(infoTramite[67]);
                $("#nomComplMae").val(infoTramite[53]);  
                $("#CURPMae").val(infoTramite[54]);
                $("#RFCMae").val(infoTramite[55]);
                $("#regsindmae").val(infoTramite[56]);
                $("#TelPartiMae").val(infoTramite[13]);
                $("#TelCelMae").val(infoTramite[12]);              
                $("#nomSolic").val(infoTramite[11]);
                $("#fechRecibido").val(infoTramite[28]);
                document.getElementById('fechRecibido').disabled = true;
                $("#fechBaseMae").val(infoTramite[57]);
                $("#fechBajaMae").val(infoTramite[59]);
                $("#DiasServOriginal").val(infoTramite[70]);

                $("#observTramite").val(infoTramite[27]);

                clavemae = document.getElementById("cspMaeBusq").value;

                if (infoTramite[60] == 0) {
                    document.getElementById('sinPSGS').checked = true;
                    document.getElementById('editaPSGS').disabled = true;
                } else {
                    document.getElementById('sinPSGS').checked = false;
                    document.getElementById('editaPSGS').disabled = false;
                }
                $("#numPsgs").val(infoTramite[60]);
                document.getElementById('numPsgs').disabled = true;
                        
                $("#diasPsgs").val(infoTramite[61] );
                document.getElementById('diasPsgs').disabled = true;
    
                contPSGS = infoTramite[60];
                for (let index = 0; index < infoTramite[60]; index++) {
                    $('#DivFechsPSGSIni').append(
                        '<div><input type="date" name="fechaIni['+ index +']" id="fechaIni['+ index +']"><a href="#" class="delete_fechaI"><img src="../../img/delete.png" alt="Eliminar" title="Eliminar fecha" height="15" width="20"></a></input></div>'
                    );
                    $('#DivFechsPSGSFin').append(
                        '<div><input type="date" name="fechaFin['+ index +']"  id="fechaFin['+ index +']"><a href="#" class="delete_fechaF"><img src="../../img/delete.png" alt="Eliminar" title="Eliminar fecha" height="15" width="20"></a></input></div>'
                    );                        
                }
                
                $("#OpcTestamento").val(infoTramite[14]);
                $("#fechCTJuicio").val(infoTramite[15]);
                $("#numBenefs").val(infoTramite[17]);

                numbeneficiarios = infoTramite[17]-1;
                for (let j = 0; j < numbeneficiarios; j++) {
                    var elemntBenef = document.getElementById("DivBeneficiarios");
                    var clonElement = elemntBenef.cloneNode(true);
                    document.getElementById("DivDatsBenef").appendChild(clonElement);
                    contBenefs++;
                    document.getElementById('numsBenefs').value = contBenefs;
                }

                $.post("../../controller/retiros.php?op=updateBenefs",{identret:paramidret,cvemae:cvemae},function(data){
                    datUpdateBenefs = Object.values(JSON.parse(data));

                    var a_nombres = [];
                    var a_curps = [];
                    var a_parentescos = [];
                    var a_porcentajes = [];
                    var a_edades = [];
                    var a_vida = [];
					var a_folsBenefs = [];
										
                    for (let l = 0; l < datUpdateBenefs.length; l++) {
                        var infoBenefs = Object.values(datUpdateBenefs[l]);
                        a_nombres.push(infoBenefs[8]);
                        a_curps.push(infoBenefs[33]);
                        a_parentescos.push(infoBenefs[34]);
                        a_porcentajes.push(infoBenefs[24]);
                        a_edades.push(infoBenefs[35]);
                        a_vida.push(infoBenefs[36]);
						a_folsBenefs.push(infoBenefs[11]);
                    }
                    $("#nomsbenefs").val(a_nombres);
                    $("#curpsbenefs").val(a_curps);
                    $("#parentsbenefs").val(a_parentescos);
                    $("#porcentsbenefs").val(a_porcentajes);
                    $("#edadesbenefs").val(a_edades);
                    $("#vidasbenefs").val(a_vida);
					$("#foliosbenefs").val(a_folsBenefs);
                });

                $("#fechsIniPSGS").val(infoTramite[68]);
                $("#fechsFinPSGS").val(infoTramite[69]);
                $("#diasServMae").val(infoTramite[70]);
                document.getElementById('diasServMae').disabled = true;
                $("#aniosServMae").val(infoTramite[58]);
    
                document.getElementById('aniosServMae').disabled = true;
                $("#montRet").val(infoTramite[20].replace('$',''));
                        
                $("#monRetEntr").val(infoTramite[23].replace('$',''));
                $("#montRetFF").val(infoTramite[25].replace('$',''));
                $("#montSalMin").val(infoTramite[46].replace('$',''));
    
                $numadedsM = infoTramite[36];
                if ($numadedsM > 0) {
                    document.getElementById('CheckAdeudos').checked = true;
                    document.getElementById("DivDatsAdeudos").style.display = "block";
                            
                    if (infoTramite[38].replace('$','').replace(',','') > 0) {
                        $("#AdedFajam").val(infoTramite[38].replace('$','').replace(',',''));
                    }
                    if (infoTramite[39].replace('$','').replace(',','') > 0) {
                        $("#AdedTS").val(infoTramite[39].replace('$','').replace(',',''));
                    }
                    if (infoTramite[40].replace('$','').replace(',','') > 0) {
                        $("#AdedFondPension").val(infoTramite[40].replace('$','').replace(',',''));
                    }
                    if (infoTramite[41].replace('$','').replace(',','') > 0) {
                        $("#AdedTurismo").val(infoTramite[41].replace('$','').replace(',',''));
                    }
    
                    $("#montRetSinAded").val(infoTramite[22]);
                    $("#montAdeudos").val(infoTramite[37]);
                }

                if (modretiro == "C") {
                    $("#ModoRetiro").val("C");
                    document.getElementById('DivTpoDiferido').style.display = "none";
                    document.getElementById('montRetFondFall').style.display = "none";
                }
            });

        }else if (motivoRet == "FJ") {
            document.getElementById("DivDictamen").style.display = "none";
            document.getElementById("DivTestBenefsMae").style.display = "block";
            document.getElementById("DivPsgs").style.display =  "none";
            document.getElementById("OpcTestamento").disabled = true;

            $('#tituto_BasJubBajFall').html('JUBILACION Y FALLECIMIENTO');
            $('#tituto_InptBasJub').html('Jubilacion:&nbsp ');
            $('#tituto_InptBajFall').html('Fallecim.: &nbsp'); 

            $.post("../../controller/retiros.php?op=updateTramFJ",{identret:paramidret,modretiro:modretiro,cvemae:cvemae,motivoRet:motivoRet},function(data){
                datUpdateTram = Object.values(JSON.parse(data));
                var infoTramite = Object.values(datUpdateTram[0]);
                
                idretiro = infoTramite[4];
                var estatLabMae = "FALLECIDO";

                $("#OpcCauRetiro").val(infoTramite[7]);
                $("#numentr").val(infoTramite[2]);
				
				tipTramit = infoTramite[52];
				if ( tipTramit == 0) {
					document.getElementById("tipTramNE").checked = false;
					document.getElementById("numfolioTEJI").style.display = "none";
					document.getElementById("DivfolioBenef").style.display = "none";
                } else{
					document.getElementById("tipTramNE").checked = true;
					document.getElementById("numfolioTEJI").style.display = "none";
					document.getElementById("DivfolioBenef").style.display = "block";
				}
					
                $("#AnioEntr").val(infoTramite[1]);
                $("#IdEntrega").val(infoTramite[3]);
                $("#folioTram").val(infoTramite[43]);
                document.getElementById('cspMaeBusq').disabled = true;
                $("#cveIMaeBusq").val(infoTramite[53]);
                claveisemym =  $("#cveIMaeBusq").val();
                $("#estLaboral").val(estatLabMae);
                $("#apePatMae").val(infoTramite[54]);
                $("#apeMatMae").val(infoTramite[55]);
                $("#nombreMae").val(infoTramite[56]);
                $("#nomComplMae").val(infoTramite[57]);  
                $("#CURPMae").val(infoTramite[58]);
                $("#RFCMae").val(infoTramite[59]);
                $("#regsindmae").val(infoTramite[60]);
                $("#TelPartiMae").val(infoTramite[13]);
                $("#TelCelMae").val(infoTramite[12]);              
                $("#nomSolic").val(infoTramite[11]);
                $("#fechRecibido").val(infoTramite[28]);
                document.getElementById('fechRecibido').disabled = true;
                $("#fechBaseMae").val(infoTramite[61]);
                $("#fechBajaMae").val(infoTramite[62]);
                $("#DiasServOriginal").val(infoTramite[65]);
                $("#OpcTestamento").val(infoTramite[14]);
                $("#fechCTJuicio").val(infoTramite[15]);
                $("#numBenefs").val(infoTramite[17]);

                $("#observTramite").val(infoTramite[27]);
                
                clavemae = document.getElementById("cveIMaeBusq").value;

                numbeneficiarios = infoTramite[17] - 1;
                for (let j = 0; j < numbeneficiarios; j++) {
                    var elemntBenef = document.getElementById("DivBeneficiarios");
                    var clonElement = elemntBenef.cloneNode(true);
                    document.getElementById("DivDatsBenef").appendChild(clonElement);
                    contBenefs++;
                    document.getElementById('numsBenefs').value = contBenefs;
                }

                $.post("../../controller/retiros.php?op=updateBenefs",{identret:paramidret,cvemae:cvemae},function(data){
                    datUpdateBenefs = Object.values(JSON.parse(data));

                    var a_nombres = [];
                    var a_curps = [];
                    var a_parentescos = [];
                    var a_porcentajes = [];
                    var a_edades = [];
                    var a_vida = [];
					var a_folsBenefs = [];

                    for (let l = 0; l < datUpdateBenefs.length; l++) {
                        var infoBenefs = Object.values(datUpdateBenefs[l]);
                        a_nombres.push(infoBenefs[8]);
                        a_curps.push(infoBenefs[33]);
                        a_parentescos.push(infoBenefs[34]);
                        a_porcentajes.push(infoBenefs[24]);
                        a_edades.push(infoBenefs[35]);
                        a_vida.push(infoBenefs[36]);
						a_folsBenefs.push(infoBenefs[11]);
                    }
                    $("#nomsbenefs").val(a_nombres);
                    $("#curpsbenefs").val(a_curps);
                    $("#parentsbenefs").val(a_parentescos);
                    $("#porcentsbenefs").val(a_porcentajes);
                    $("#edadesbenefs").val(a_edades);
                    $("#vidasbenefs").val(a_vida);
					$("#foliosbenefs").val(a_folsBenefs);
					
                });

                $("#diasServMae").val(infoTramite[65]);
                document.getElementById('diasServMae').disabled = true;
                $("#aniosServMae").val(infoTramite[63]);
    
                document.getElementById('aniosServMae').disabled = true;
                $("#montRet").val(infoTramite[20].replace('$',''));
                        
                $("#monRetEntr").val(infoTramite[23].replace('$',''));
                $("#montRetFF").val(infoTramite[25].replace('$',''));
                $("#montSalMin").val(infoTramite[46].replace('$',''));
    
                $numadedsM = infoTramite[36];
                if ($numadedsM > 0) {
                    document.getElementById('CheckAdeudos').checked = true;
                    document.getElementById("DivDatsAdeudos").style.display = "block";
                            
                    if (infoTramite[38].replace('$','').replace(',','') > 0) {
                        $("#AdedFajam").val(infoTramite[38].replace('$','').replace(',',''));
                    }
                    if (infoTramite[39].replace('$','').replace(',','') > 0) {
                        $("#AdedTS").val(infoTramite[39].replace('$','').replace(',',''));
                    }
                    if (infoTramite[40].replace('$','').replace(',','') > 0) {
                        $("#AdedFondPension").val(infoTramite[40].replace('$','').replace(',',''));
                    }
                    if (infoTramite[41].replace('$','').replace(',','') > 0) {
                        $("#AdedTurismo").val(infoTramite[41].replace('$','').replace(',',''));
                    }
    
                    $("#montRetSinAded").val(infoTramite[22]);
                    $("#montAdeudos").val(infoTramite[37]);
                }

                if (modretiro == "C") {
                    $("#ModoRetiro").val("C");
                    document.getElementById('DivTpoDiferido').style.display = "none";
                    document.getElementById('montRetFondFall').style.display = "none";
                }
            });

        }
    });
});

$(".cveissemym").keydown(function (event) {
    var key = window.event ? event.which : event.keyCode;
    if((key < 48 || key > 57) && (key < 96 || key > 105) && key !== 37 && key !==39 && key !==8 && key!==9 && key !==46){
        return false;
    }
});

$('#CURPMae').change(function () {
    document.getElementById('RFCMae').value = document.getElementById('CURPMae').value.substr(0,10).toUpperCase();
});

$('#CURPMae').blur(function () {
    if ($("#CURPMae").val().length > 18 || $("#CURPMae").val().length < 18) {
        Swal.fire(
            'LA CLAVE CURP ES INCORRECTA',
            'deben ser 18 caracteres'
        )
        $("#CURPMae").focus();
        document.getElementById('CURPMae').style.border =  ".1em red solid";
    }else{
        document.getElementById('CURPMae').style.border =  ".1em black solid";
    }
});

$('#RFCMae').keydown(function (event) {
    var key = window.event ? event.which : event.keyCode;
    if((key < 65 || key > 90)  && (key < 97 || key > 122) && (key < 48 || key > 57) && (key < 96 || key > 105) && key !== 37 && key !==39 && key !==8 && key!==9 && key !==46){
        return false;
    }
});

$('#RFCMae').blur(function (event) {
    if ($("#RFCMae").val().length < 10 || $("#RFCMae").val().length > 13) {
        Swal.fire(
            'LA CLAVE RFC ES INCORRECTA',
            'deben ser 10 o 13 caracteres'
        )
        $("#RFCMae").focus();
        document.getElementById('RFCMae').style.border =  ".1em red solid";
    }else{
        document.getElementById('RFCMae').style.border =  ".1em black solid";
    }
});

$(".TelsMae").keydown(function (event){
    var key = window.event ? event.which : event.keyCode;
    if((key < 48 || key > 57) && (key < 96 || key > 105) && key !== 37 && key !==39 && key !==8 && key!==9 && key !==46){
        return false;
    }
});

$("#TelPartiMae").change(function () {
    teleParticular = $("#TelPartiMae").val();

    if (teleParticular.length > 10 || teleParticular.length < 10) {
        Swal.fire(
            'EL NUMERO DE TELEFONO PARTICULAR ES INCORRECTO',
            'deben ser 10 digitos'
        )
        $("#TelPartiMae").focus();
        document.getElementById('TelPartiMae').style.border =  ".1em red solid";
    }else{
        document.getElementById('TelPartiMae').style.border =  ".1em black solid";
    }
});

$("#TelCelMae").change(function () {
    teleCelular = $("#TelCelMae").val();

    if (teleCelular.length > 10 || teleCelular.length < 10) {
        Swal.fire(
            'EL NUMERO DE TELEFONO CELULAR ES INCORRECTO',
            'deben ser 10 digitos'
        )
        $("#TelCelMae").focus();
        document.getElementById('TelCelMae').style.border =  ".1em red solid";
    } else {
        document.getElementById('TelCelMae').style.border =  ".1em black solid";
    }
});

function validacurpBenef(inputCurpBenef){
    if (inputCurpBenef.value.length != 18 ) {
        Swal.fire(
            'DATO INVALIDO',
            'Proporcione la CURP correcta'
        );
    }
}

function validaNomBenef(inputNomBenef) {
    if (inputNomBenef.value.length == "" && inputNomBenef.value.length < 10 ) {
        Swal.fire(
            'DATO INVALIDO',
            'Proporcione un NOMBRE correcto'
        );
    }
}

$("#EditaNombre").on("click", function (e) {
    e.preventDefault();

    $('#modal-title').html('Modificando nombre');
    $.post("../../controller/maestro.php?op=mostrarNom",{clavemae:clavemae},function(data){       
        data = JSON.parse(data);
        $('#cvemae').val(data.csp);
        $('#apepatModif').val(data.apepatmae);
        $('#apematModif').val(data.apematmae);
        $('#nommaeModif').val(data.nommae);
        $('#nomcomModif').val(data.nomcommae);
    });
    $('#editarNomMae').modal('show');
});

$("#updNomMae").on("click", function (event) {
    event.preventDefault();
    actNomMae(event);
});

function actNomMae(e){
    e.preventDefault();
    nomComMae = $('#apepatModif').val() + " " + $('#apematModif').val() + " " + $('#nommaeModif').val();
    $('#nomcomModif').val(nomComMae);
	
	if($('#OpcCauRetiro').val() == "FJ"){
		$.post("../../controller/maestro.php?op=actNomMae",{apepatModif:$('#apepatModif').val(),apematModif:$('#apematModif').val(),nommaeModif:$('#nommaeModif').val(),nomcomModif:$('#nomcomModif').val(),cvemae:$('#cvemae').val()},function(data){ 
			resultadoUpd = Object.values( JSON.parse(data));
			if(resultadoUpd[0] == "actualizado"){
				
				swal.fire(
					'Modificacion!',
					'Los Datos se actualizaron correctamente!!!',
					'success'
				);
				$('#edita_NomMae')[0].reset();
				$("#editarNomMae").modal('hide');
			}else{
				swal.fire(
					'ERROR!!!',
					'Surgio un error consultelo con el administrador dle sistema!!!',
					'success'
				);
			}
		});
		
		clavemae = $("#cveIMaeBusq").val();
	
		$.post("../../controller/maestro.php?op=buscarJub",{claveisemym:clavemae},function(data){ 
			data = JSON.parse(data);
			$('#apePatMae').val(data.apepatmae);
			$('#apeMatMae').val(data.apematmae);
			$('#nombreMae').val(data.nommae);
			//$('#estLaboral').val(estatusMae);
			$('#nomComplMae').val(data.nomcommae);
			$('#nomSolic').val(data.nomcommae); 
		});
	}else{
		var formData = new FormData($("#edita_NomMae")[0]);
		$.ajax({
			url: '../../controller/maestro.php?op=actNomMae',
			type: "POST",
			data: formData,
			contentType: false,
			processData: false,
			success: function(datos){
				$('#edita_NomMae')[0].reset();
				$("#editarNomMae").modal('hide');
				swal.fire(
					'Modificacion!',
					'Los Datos se actualizaron correctamente!!!',
					'success'
				);
			}
		});
		
		//clavemae = $("#cspMaeBusq").val();

		$.post("../../controller/maestro.php?op=buscar",{clavemae:clavemae},function(data){ 
			data = JSON.parse(data);
			$('#apePatMae').val(data.apepatmae);
			$('#apeMatMae').val(data.apematmae);
			$('#nombreMae').val(data.nommae);
			$('#estLaboral').val($("#estLaboral").val());
			$('#nomComplMae').val(data.nomcommae);
			$('#nomSolic').val(data.nomcommae); 
		});
		
	}
}

const accionFechBaja = document.querySelector("#fechBajaMae");
accionFechBaja.addEventListener("blur", function (evento) {
    evento.preventDefault();

    if (parseInt(document.getElementById('fechBajaMae').value.split("-")[0]) < 2019 || parseInt(document.getElementById('fechBajaMae').value.split("-")[0]) > 2024) {
        document.getElementById("fechBajaMae").style.border =  ".1em red solid";
        Swal.fire(
            'ERROR',
            'el año de la fecha no es correcto!!!'
        );
    }else{
        document.getElementById("fechBajaMae").style.border =  ".1em black solid";
        if (motivo == "FJ") {
            document.getElementById("editaBefens").disabled = false;
        } 
    }
});

const accionFechBase = document.querySelector("#fechBaseMae");
accionFechBase.addEventListener("blur", function (evento) {
    evento.preventDefault();

    if (parseInt(document.getElementById('fechBaseMae').value.split("-")[0]) < 1930 || parseInt(document.getElementById('fechBaseMae').value.split("-")[0]) > 2024) {
        document.getElementById("fechBaseMae").style.border =  ".1em red solid";
        Swal.fire(
            'ERROR',
            'el año de la fecha no es correcto!!!'
        );
    }else{
        document.getElementById("fechBaseMae").style.border =  ".1em black solid";
    }
});

var checkBoxTipTram = document.getElementById('tipTramNE');
checkBoxTipTram.addEventListener("change", tramExtra, false);
function tramExtra() {
    var checkedTE = checkBoxTipTram.checked;

	var folsbenefs = document.getElementsByClassName('divfoliosbenef');

    if (checkedTE) {
        if (motivo == 'J' || motivo == 'I') {
            document.getElementById("numfolioTEJI").style.display = "block";
        } else {
            document.getElementById("numfolioTEJI").style.display = "none";
			for(var i=0; i < folsbenefs.length; i++){
				folsbenefs[i].style.display = 'block';
			}
        }
        tipTramit = '1';
    } else {
        document.getElementById("numfolioTEJI").style.display = "none";

		for(var i=0; i < folsbenefs.length; i++){
			folsbenefs[i].style.display = 'none';
		}
	
        tipTramit = '0';
    }
}


var checkboxPSGS = document.getElementById('sinPSGS');
checkboxPSGS.addEventListener("change", validaCheckPSGS, false);
function validaCheckPSGS(){
    var checked = checkboxPSGS.checked;
    if(checked){
        document.getElementById("editaPSGS").disabled =  true;
        document.getElementById('numPsgs').value = 0;
        document.getElementById('diasPsgs').value = 0;
        document.getElementById('fechsIniPSGS').value = "{}";
        document.getElementById('fechsFinPSGS').value = "{}";
        document.getElementById("calcDiasAnios").disabled = false;
    }else{
        document.getElementById("editaPSGS").disabled =  false;
        document.getElementById("calcDiasAnios").disabled = true;
    }
}

var numAgrPSGS=0;
const psgs_max = 30;
const accionPSGS = document.querySelector("#editaPSGS");
accionPSGS.addEventListener("click", function (evento){
    evento.preventDefault();
    if (contPSGS == 0) {
        $('#tituto_mod_psgs').html('Agregar P.S.G.S');
        $('#edita_PSGS')[0].reset();
        document.getElementById('numsPSGS').value = contPSGS;
        $('#editarPSGS').modal('show');
        document.getElementById("calcDiasAnios").disabled = false;
    } else {
        $('#tituto_mod_psgs').html('Agregar P.S.G.S');
        $('#edita_PSGS')[0].reset();
        $("#numsPSGS").val(contPSGS);
        document.getElementById("calcDiasAnios").disabled = false;
        var fechaIn = document.getElementById('fechsIniPSGS').value.replace("{","").replace("}","");
        var fechaFn = document.getElementById('fechsFinPSGS').value.replace("{","").replace("}","");
        var fechasInicio = fechaIn.split(",");
        var fechasFinal = fechaFn.split(",");
        var numerofechas = Object.keys(fechasInicio).length;
        for (i = 0; i < numerofechas; i++) {
            var fechaI = fechasInicio[i].split(":");
            var fechaF = fechasFinal[i].split(":");
            document.getElementById('fechaIni[' + i + ']').value = fechaI[1];
            document.getElementById('fechaFin[' + i + ']').value = fechaF[1];
        }
        $('#editarPSGS').modal('show');
    }
});

$("#edita_PSGS").on("submit",function(evento){
    evento.preventDefault();
    var diasActivo=0;
    var formDataPSGS = new FormData($("#edita_PSGS")[0]);
    $.ajax({
        url: '../../controller/tramites.php?op=diasPSGS',
        type: "POST",
        data: formDataPSGS,
        contentType: false,
        processData: false,
        success: function(datos){
            numAgrPSGS++;
            $('#edita_PSGS')[0].reset();
            $("#editarPSGS").modal('hide');
            if (datos == 0 && document.getElementById('DiasServOriginal').value > 0) {
                diasActivo = parseInt(document.getElementById('diasServMae').value) + parseInt(document.getElementById('diasPsgs').value);
                document.getElementById('numPsgs').value = 0;
                document.getElementById('diasPsgs').value = 0;
                document.getElementById('diasServMae').value = diasActivo;
                document.getElementById('aniosServMae').value = Math.trunc(diasActivo/365);  
                document.getElementById('fechsIniPSGS').value = "{}";
                document.getElementById('fechsFinPSGS').value = "{}";
            } else {
                data = JSON.parse(datos);
                $('#numPsgs').val(data.numPSGS);
                if (document.getElementById('diasServMae').value > 0) {
                    if (document.getElementById('diasServMae').value > 0) {
                        diasActivo = document.getElementById('DiasServOriginal').value - data.diasPSGS;
                    } else {
                        diasActivo = document.getElementById('diasServMae').value - data.diasPSGS;
                    }
                }
                document.getElementById('diasServMae').value = diasActivo;
                document.getElementById('diasPsgs').value = data.diasPSGS;
                document.getElementById('aniosServMae').value = Math.trunc(diasActivo/365);  
                document.getElementById('fechsIniPSGS').value = JSON.stringify(data.fechIni).replaceAll('"','');
                document.getElementById('fechsFinPSGS').value = JSON.stringify(data.fechFin).replaceAll('"','');                
            }
        }
    });   
});

$("#addPSGS").click(function (e) {
    e.preventDefault();
    if (contPSGS < psgs_max) {
        $('#DivFechsPSGSIni').append(
            '<div><input type="date" name="fechaIni['+ contPSGS +']" id="fechaIni['+ contPSGS +']"><a href="#" class="delete_fechaI"><img src="../../img/delete.png" alt="Eliminar" title="Eliminar fecha" height="15" width="20"></a></input></div>'
        );
        $('#DivFechsPSGSFin').append(
            '<div><input type="date" name="fechaFin['+ contPSGS +']"  id="fechaFin['+ contPSGS +']"><a href="#" class="delete_fechaF"><img src="../../img/delete.png" alt="Eliminar" title="Eliminar fecha" height="15" width="20"></a></input></div>'
        );
        contPSGS++
    }
    document.getElementById('numsPSGS').value = contPSGS;
});

$('#DivFechsPSGS').on("click",".delete_fechaI",function(e){
    e.preventDefault();
    $(this).parent('div').remove();
    contPSGS = contPSGS - 0.5;
    document.getElementById('numsPSGS').value = contPSGS;
});

$('#DivFechsPSGS').on("click",".delete_fechaF",function(e){
    e.preventDefault();
    $(this).parent('div').remove();
    contPSGS = contPSGS - 0.5;
    document.getElementById('numsPSGS').value = contPSGS;
});

var programafallec = "";
clavemae = document.getElementById('cspMaeBusq').value;
const accionCalculadora = document.querySelector('#calcDiasAnios');
accionCalculadora.addEventListener("click", function (evento) {
    evento.preventDefault();
    var valorValid = 0;
    var motivo = document.getElementById('OpcCauRetiro').value;

    if (motivo == "I" || motivo == "J" || motivo == "FA") {
        if (motivo == "I" || motivo == "J") {
            var a_fechs = [
                {fecha:"Recibido", nomvar:"fechRecibido", valorF:document.getElementById('fechRecibido').value},
                {fecha:"Dictamen", nomvar:"fechDictamen", valorF:document.getElementById('fechDictamen').value},
                {fecha:"Base", nomvar:"fechBaseMae", valorF:document.getElementById('fechBaseMae').value},
                {fecha:"Baja", nomvar:"fechBajaMae", valorF:document.getElementById('fechBajaMae').value}
            ]
        } else {
            var a_fechs = [
                {fecha:"Recibido", nomvar:"fechRecibido", valorF:document.getElementById('fechRecibido').value},
                {fecha:"Base", nomvar:"fechBaseMae", valorF:document.getElementById('fechBaseMae').value},
                {fecha:"Baja", nomvar:"fechBajaMae", valorF:document.getElementById('fechBajaMae').value}
            ]
        }
    } else {
        var a_fechs = [
            {fecha:"Recibido", nomvar:"fechRecibido", valorF:document.getElementById('fechRecibido').value},
            {fecha:"Base", nomvar:"fechBaseMae", valorF:document.getElementById('fechBaseMae').value},
            {fecha:"Baja", nomvar:"fechBajaMae", valorF:document.getElementById('fechBajaMae').value}
        ]
    } 
    
    a_fechs.forEach(element => {
        if (isNaN(Date.parse(element["valorF"])) || element["valorF"] == "") {
            a_fechs.push({validF:true,descerror:"La fecha de " + element["fecha"] + " no es valida"});
            document.getElementById(element["nomvar"]).style.border =  ".1em red solid";
            valorValid = 0;
            Swal.fire(
                "La fecha de " + element["fecha"] + " no es valida",
                'por favor verifiquela'
            );
        } else {
            a_fechs.push({validF:true,descerror:""});
            //parseInt(element["valorF"].slice(0,4)) > 1930 && parseInt(element["valorF"].slice(0,4)) < 2024
            if (parseInt(element["valorF"].split("-")[0]) > 1930 && parseInt(element["valorF"].split("-")[0]) < 2024) {
                a_fechs.push({validA:true});
                document.getElementById(element["nomvar"]).style.border =  ".1em black solid";
                valorValid = valorValid + 1;
            }else{
                a_fechs.push({validA:false});
                document.getElementById(element["nomvar"]).style.border =  ".1em red solid";
                valorValid = 0;
                Swal.fire(
                    "El año de la fecha " + element["fecha"] + " no es valido",
                    'por favor verifiquela'
                );
            }
        }
    });

    validaFechas(valorValid, a_fechs);
});

function validaFechas(valorValid, a_fechs) {
    if (valorValid == 4) {
        motret = $("#OpcCauRetiro").val();
        NumPersgs = $("#numPsgs").val();
        diasInacPsgs = $("#diasPsgs").val();
        $.post("../../controller/tramites.php?op=validaFechs",{clavemae:clavemae,motret:motret,diasInacPsgs:diasInacPsgs,NumPersgs:NumPersgs,fechRecibido:a_fechs[0]["valorF"],fechDictamen:a_fechs[1]["valorF"],fechBaseMae:a_fechs[2]["valorF"],fechBajaMae:a_fechs[3]["valorF"]},function(data){
            data = JSON.parse(data);
            resultValid = data.descResult;
            switch (resultValid) {
                case 'vigenciaVal':
                    diasServicio = data.diasServ;
                    aniosServicio = Math.trunc(diasServicio/365);
                    if (document.getElementById('numPsgs').value > 0 && document.getElementById('diasPsgs').value !== 0){
                        document.getElementById('DiasServOriginal').value = diasServicio;
                        document.getElementById('diasServMae').value = diasServicio;
                        document.getElementById('aniosServMae').value = aniosServicio;
                        document.getElementById("ModoRetiro").disabled =  false;
                    }else{
                        document.getElementById('numPsgs').value = 0;
                        document.getElementById('diasPsgs').value = 0;
                        document.getElementById('DiasServOriginal').value = diasServicio;
                        document.getElementById('diasServMae').value = diasServicio;
                        document.getElementById('aniosServMae').value = aniosServicio;
                        document.getElementById("ModoRetiro").disabled =  false;
                    }   
                    var aniosserv = Math.floor(document.getElementById('aniosServMae').value);
                    $.post("../../controller/tramites.php?op=obtenRetiro",{aniosserv:aniosserv},function(data){       
                        data = JSON.parse(data);
                        $('#montRet').val(data.montret.toFixed(2));
                        montoRetiro = parseFloat(document.getElementById('montRet').value); //- adeudosMae).toFixed(2);
                        if ($("#ModoRetiro").val() == "C") {
                            document.getElementById("monRetEntr").value = montoRetiro;
                        }else if ($("#ModoRetiro").val() == "D") {
                            document.getElementById("DivTpoDiferido").style.display = "block";
                            document.getElementById("montRetFondFall").style.display = "block";
                            document.getElementById("montSalMin").disabled =  false;
                            if (document.getElementById('ModRetDiferid50').checked){
                                document.getElementById('monRetEntr').value = (montoRetiro / 2).toFixed(2);
                                document.getElementById('montRetFF').value = (montoRetiro / 2).toFixed(2);
                            }else if(document.getElementById('ModRetDiferid100').checked){
                                document.getElementById('monRetEntr').value = "0";
                                document.getElementById('montRetFF').value = montoRetiro;
                            }
                        }
                    });             
                    break;
                
                case 'vigenciaCad':
                    diasServicio = data.diasServ
                    aniosServicio = Math.trunc(diasServicio/365);
                    
                    swal.fire({
                        title:'TRAMITE NO PROCEDENTE',
                        text:"La fecha del tramite excede la vigencia del retiro. Tiene oficio o tarjeta de soporte de autorizacion",
                        showCancelButton: true,
                        confirmButtonText:'Si',
                        cancelButtonText:'No',
                        timer:15000
                    }).then((result) => {
                        if (result.isConfirmed){
                            var divOfTr = document.getElementById("DivExcepciones");
                            divOfTr.style.display = "block";
                            document.getElementById("ModoRetiro").disabled =  false;
                            document.getElementById("calcDiasAnios").disabled = true;

                            document.getElementById('DiasServOriginal').value = diasServicio;
                            document.getElementById('diasServMae').value = diasServicio;
                            document.getElementById('aniosServMae').value = aniosServicio;

                            var aniosserv = Math.floor(document.getElementById('aniosServMae').value);
                            $.post("../../controller/tramites.php?op=obtenRetiro",{aniosserv:aniosserv},function(data){       
                                data = JSON.parse(data);
                                $('#montRet').val(data.montret.toFixed(2));
                                montoRetiro = parseFloat(document.getElementById('montRet').value); //- adeudosMae).toFixed(2);
                            });  
                        }else{
                            let pagAnterior = document.referrer;
                            if (pagAnterior.indexOf(window.location.host) !== -1) {
                                window.history.back();
                            }
                        }
                    });
                    break;
                
                case 'vigenciaCadD':
                    diasServicio = data.diasServ
                    aniosServicio = Math.trunc(diasServicio/365);
                    if (data.prorroga == "SI") {
                        swal.fire({
                            title:'TRAMITE NO PROCEDENTE',
                            text:"La fecha del tramite excede la vigencia del retiro. Tiene oficio o tarjeta de soporte de autorizacion",
                            showCancelButton: true,
                            confirmButtonText:'Si',
                            cancelButtonText:'No',
                            timer:15000
                        }).then((result) => {
                            if (result.isConfirmed){
                                var divOfTr = document.getElementById("DivExcepciones");
                                divOfTr.style.display = "block";
                                document.getElementById("calcDiasAnios").disabled = true;
                                
                                document.getElementById('DiasServOriginal').value = diasServicio;
                                document.getElementById('diasServMae').value = diasServicio;
                                document.getElementById('aniosServMae').value = aniosServicio;
                                
                                var aniosserv = Math.floor(document.getElementById('aniosServMae').value);
                                $.post("../../controller/tramites.php?op=obtenRetiro",{aniosserv:aniosserv},function(data){       
                                    data = JSON.parse(data);
                                    $('#montRet').val(data.montret.toFixed(2));
                                    montoRetiro = parseFloat(document.getElementById('montRet').value); //- adeudosMae).toFixed(2);
                                }); 
                            }else{
                                let pagAnterior = document.referrer;
                                if (pagAnterior.indexOf(window.location.host) !== -1) {
                                    window.history.back();
                                }
                            }
                        });
                    } else {
                        swal.fire({
                            title:'TRAMITE NO PROCEDENTE',
                            text:"La fecha del tramite excede la vigencia del retiro y NO solicito prorroga",
                            showCancelButton: true,
                            confirmButtonText:'OK',
                            timer:15000
                        }).then((result) => {
                            if (result.isConfirmed){
                                let pagAnterior = document.referrer;
                                if (pagAnterior.indexOf(window.location.host) !== -1) {
                                    window.history.back();
                                }
                            }
                        });
                    }    
                    break;    
                
                case 'errorFecha':
                    notifError = data.diasServ;    
                    Swal.fire(
                        notifError,
                        'por favor verifique las fechas'
                    );
                    break;
                    
                case 'noProcede':
                    Swal.fire(
                        'TRAMITE NO PROCEDENTE',
                        'Tramite no procede, excede el limite de apoyo por oficio'
                    );
                    let pagAnterior = document.referrer;
                            if (pagAnterior.indexOf(window.location.host) !== -1) {
                                window.history.back();
                            }
                    break;
                default:
                    break;
            }
        });
    } else if (valorValid == 3) {
        motret = $("#OpcCauRetiro").val();
        NumPersgs = $("#numPsgs").val();
        diasInacPsgs = $("#diasPsgs").val();
        
        var fechIniJuic = 0;
        
        if ($("#fechIniJuicio").is(':visible')) {
            fechIniJuic = 1;
        } 

        if (motret == "FA") {
            $.post("../../controller/tramites.php?op=validaFechsFA",{clavemae:clavemae,motret:motret,diasInacPsgs:diasInacPsgs,NumPersgs:NumPersgs,fechRecibido:a_fechs[0]["valorF"],fechBaseMae:a_fechs[1]["valorF"],fechBajaMae:a_fechs[2]["valorF"],fecInicioJuic:fechIniJuic,fechaIniJuic:document.getElementById('fechIniJuicio').value,tiptest:document.getElementById('OpcTestamento').value,fechJuiCTL:document.getElementById('fechCTJuicio').value},function(data){
                data = JSON.parse(data);
                resultValid = data.descResult;
                switch (resultValid) {
                    case 'vigenciaVal':
                        diasServicio = data.diasServ;
                        aniosServicio = Math.trunc(diasServicio/365);
                        if (document.getElementById('numPsgs').value > 0 && document.getElementById('diasPsgs').value !== 0){
                            document.getElementById('DiasServOriginal').value = diasServicio;
                            document.getElementById('diasServMae').value = diasServicio;
                            document.getElementById('aniosServMae').value = aniosServicio;
                            //document.getElementById("ModoRetiro").disabled =  true;
                        }else{
                            document.getElementById('numPsgs').value = 0;
                            document.getElementById('diasPsgs').value = 0;
                            document.getElementById('DiasServOriginal').value = diasServicio;
                            document.getElementById('diasServMae').value = diasServicio;
                            document.getElementById('aniosServMae').value = aniosServicio;
                            //document.getElementById("ModoRetiro").disabled =  false;
                        }   
                        var aniosserv = Math.floor(document.getElementById('aniosServMae').value);
                        $.post("../../controller/tramites.php?op=obtenRetiro",{aniosserv:aniosserv},function(data){       
                            data = JSON.parse(data);
                            $('#montRet').val(data.montret.toFixed(2));
                            if (motret == "FA" || motret == "FJ") {
                                document.getElementById("ModoRetiro").disabled =  true;
                                document.getElementById("ModoRetiro").value = "C";
                                montoRetiro = parseFloat(document.getElementById('montRet').value); //- adeudosMae).toFixed(2);
                                document.getElementById('monRetEntr').value = montoRetiro;
                            }
                        });       
                        break;
                    
                    case 'vigenciaCad':
                        diasServicio = data.diasServ
                        aniosServicio = Math.trunc(diasServicio/365);
                        
                        swal.fire({
                            title:'TRAMITE NO PROCEDENTE',
                            text:"La fecha del tramite excede la vigencia del retiro. Tiene oficio o tarjeta de soporte de autorizacion",
                            showCancelButton: true,
                            confirmButtonText:'Si',
                            cancelButtonText:'No',
                            timer:15000
                        }).then((result) => {
                            if (result.isConfirmed){
                                var divOfTr = document.getElementById("DivExcepciones");
                                divOfTr.style.display = "block";
                                document.getElementById("ModoRetiro").disabled =  false;
                                document.getElementById("calcDiasAnios").disabled = true;
    
                                document.getElementById('DiasServOriginal').value = diasServicio;
                                document.getElementById('diasServMae').value = diasServicio;
                                document.getElementById('aniosServMae').value = aniosServicio;
    
                                var aniosserv = Math.floor(document.getElementById('aniosServMae').value);
                                $.post("../../controller/tramites.php?op=obtenRetiro",{aniosserv:aniosserv},function(data){       
                                    data = JSON.parse(data);
                                    $('#montRet').val(data.montret.toFixed(2));
                                    if (motret == "FA" || motret == "FJ") {
                                        document.getElementById("ModoRetiro").disabled =  true;
                                        document.getElementById("ModoRetiro").value = "C";
                                        montoRetiro = parseFloat(document.getElementById('montRet').value); //- adeudosMae).toFixed(2);
                                        document.getElementById('monRetEntr').value = montoRetiro;
                                    }
                                });  
                            }else{
                                let pagAnterior = document.referrer;
                                if (pagAnterior.indexOf(window.location.host) !== -1) {
                                    window.history.back();
                                }
                            }
                        });
                        break;
    
                    case 'errorFecha':
                        notifError = data.diasServ;    
                        Swal.fire(
                            notifError,
                            'por favor verifique las fechas'
                        );
                        break;
    
                    default:
                        break;
                }
            });
        }else if (motret == "FJ") {
            $.post("../../controller/tramites.php?op=validaFechsFJ",{clavemae:clavemae,motret:motret,fechRecibido:a_fechs[0]["valorF"],fechBaseMae:a_fechs[1]["valorF"],fechBajaMae:a_fechs[2]["valorF"],opTest:$("#OpcTestamento").val(),fechCTJuic:$("#fechCTJuicio").val(),fechIniJuic:document.getElementById("fechIniJuicio").value},function(data){
                data = JSON.parse(data);
                resultValid = data.descResult;
                switch (resultValid) {
                    case 'vigenciaVal':
                        diasServicio = data.diasJub;
                        aniosServicio = Math.trunc(diasServicio/365);
                        document.getElementById('DiasServOriginal').value = diasServicio;
                        document.getElementById('diasServMae').value = diasServicio;
                        document.getElementById('aniosServMae').value = aniosServicio;
                            //document.getElementById("ModoRetiro").disabled =  true;
                        
                        var aniosserv = Math.floor(document.getElementById('aniosServMae').value);
                        
                        $.post("../../controller/maestro.php?op=buscarJub",{claveisemym:claveisemym},function(dataJ){ 
                            dataJ = Object.values(JSON.parse(dataJ));
                            $("#programfallec").val(dataJ[10]);
                            
                        });
                        
                        
                        if ($("#programfallec").val() == "M") {
                            $.post("../../controller/tramites.php?op=obtenRetiroJub",{aniosserv:aniosserv,programac:"M"},function(data){       
                                data = JSON.parse(data);
                                
                                $('#montRet').val(data.montret.toFixed(2));
                                if (motret == "FA" || motret == "FJ") {
                                    document.getElementById("ModoRetiro").disabled =  true;
                                    document.getElementById("ModoRetiro").value = "C";
                                    montoRetiro = parseFloat(document.getElementById('montRet').value); //- adeudosMae).toFixed(2);
                                    document.getElementById('monRetEntr').value = montoRetiro;
                                }
                            });
                        }else if ($("#programfallec").val() == "FF") {
                            
                        }
                               
                        break;
                    
                    case 'vigenciaCad':
                        diasServicio = data.diasServ
                        aniosServicio = Math.trunc(diasServicio/365);
                        
                        swal.fire({
                            title:'TRAMITE NO PROCEDENTE',
                            text:"La fecha del tramite excede la vigencia del retiro. Tiene oficio o tarjeta de soporte de autorizacion",
                            showCancelButton: true,
                            confirmButtonText:'Si',
                            cancelButtonText:'No',
                            timer:15000
                        }).then((result) => {
                            if (result.isConfirmed){
                                var divOfTr = document.getElementById("DivExcepciones");
                                divOfTr.style.display = "block";
                                document.getElementById("ModoRetiro").disabled =  false;
                                document.getElementById("calcDiasAnios").disabled = true;
    
                                document.getElementById('DiasServOriginal').value = diasServicio;
                                document.getElementById('diasServMae').value = diasServicio;
                                document.getElementById('aniosServMae').value = aniosServicio;
    
                                var aniosserv = Math.floor(document.getElementById('aniosServMae').value);
                                $.post("../../controller/tramites.php?op=obtenRetiro",{aniosserv:aniosserv},function(data){       
                                    data = JSON.parse(data);
                                    $('#montRet').val(data.montret.toFixed(2));
                                    if (motret == "FA" || motret == "FJ") {
                                        document.getElementById("ModoRetiro").disabled =  true;
                                        document.getElementById("ModoRetiro").value = "C";
                                        montoRetiro = parseFloat(document.getElementById('montRet').value); //- adeudosMae).toFixed(2);
                                        document.getElementById('monRetEntr').value = montoRetiro;
                                    }
                                });  
                            }else{
                                let pagAnterior = document.referrer;
                                if (pagAnterior.indexOf(window.location.host) !== -1) {
                                    window.history.back();
                                }
                            }
                        });
                        break;
    
                    case 'errorFecha':
                        notifError = data.diasServ;    
                        Swal.fire(
                            notifError,
                            'por favor verifique las fechas'
                        );
                        break;
    
                    default:
                        break;
                }
            });
        }
        
    } else {
        Swal.fire(
            "Las Fechas ingresadas no son correctas",
            'No puede haber fechas mayores a el año en curso o menores a 1900, verifique las que estan marcadas en color rojo'
        );
    }
}
/*--------------------*/

const accionOpcTestamento = document.querySelector('#OpcTestamento');
accionOpcTestamento.addEventListener("click", function (evento) {
    evento.preventDefault();
    var tipoTestamnt = document.getElementById("OpcTestamento").value;

    if (tipoTestamnt == "SL") {
        document.getElementById("fechCTJuicio").disabled = true;
        document.getElementById("fechCTJuicio").value = fechaActual();
        document.getElementById("DivFechInicioJuicio").style.display = "none";
        document.getElementById('editaBefens').disabled = false;
    } else {
        document.getElementById("fechCTJuicio").value = "";
        document.getElementById("fechCTJuicio").disabled = false;
        document.getElementById("DivFechInicioJuicio").style.display = "none";
        document.getElementById('editaBefens').disabled = true;
    }
});

const accioFechTEstmnt = document.querySelector("#fechCTJuicio");
accioFechTEstmnt.addEventListener("blur", function (evento) {
    evento.preventDefault();

    var tipTestamento = document.getElementById('OpcTestamento').value;
    var validAnioFechCTJuic = false;

    if (parseInt(document.getElementById('fechCTJuicio').value.split("-")[0]) > 1930 && parseInt(document.getElementById('fechCTJuicio').value.split("-")[0]) < 2024) {
        document.getElementById("fechCTJuicio").style.border =  ".1em black solid";
        validAnioFechCTJuic = true;

        switch (tipTestamento) {
            case 'CT':
                if (isNaN(Date.parse(document.getElementById('fechCTJuicio').value)) && document.getElementById('fechCTJuicio').value == "") {
                    document.getElementById("calcDiasAnios").disabled = true;
                    document.getElementById("editaBefens").disabled = true;
                    Swal.fire(
                        'ERROR',
                        'La fecha de la carta testamentaria no es correcta, verifiquela!!!'
                    );
                    document.getElementById('calcDiasAnios').disabled = true;
                    validAnioFechCTJuic = false;
                } else {
                    $.post("../../controller/tramites.php?op=validFechaCTJuic",{tipoTestamento:tipTestamento,FBase:document.getElementById('fechBaseMae').value,FBaja:document.getElementById('fechBajaMae').value,FCTJuicio:document.getElementById('fechCTJuicio').value,FRecibido:document.getElementById('fechRecibido').value},function(data){
                        data = JSON.parse(data);
                        var resultValidVig = data.resultValid;
                        
                        switch (resultValidVig) {
                            case 'correcto':
                                validAnioFechCTJuic = true;
                                break;
                            
                            case 'errorFecha':
                                notifError = data.descValid;    
                                Swal.fire(
                                    notifError,
                                    'por favor verifique la(s) fecha(s)'
                                );
                                document.getElementById('calcDiasAnios').disabled = true;
                                validAnioFechCTJuic = false;
                                break;

                            default:
                                break;
                        }
                    });
                }

                if (!validAnioFechCTJuic) {
                    Swal.fire(
                        'ERROR',
                        'por favor verifique los datos ingresados'
                    );
                    document.getElementById('calcDiasAnios').disabled = true;
                } else {
                    if (motivo) {
                        
                    }
                
                    $.post("../../controller/tramites.php?op=validVigTramFA",{tipoTestamento:tipTestamento,ClaveMae:clavemae,FBase:document.getElementById('fechBaseMae').value,FBaja:document.getElementById('fechBajaMae').value,FCTJuicio:document.getElementById('fechCTJuicio').value,FRecibido:document.getElementById('fechRecibido').value},function(data){
                        data = JSON.parse(data);
                        
                        var resultValidVig = data.resulValidVig;
                        if (resultValidVig == 'vigenciaVal') {
                            document.getElementById("calcDiasAnios").disabled = false;
                            document.getElementById("editaBefens").disabled = false;
                        }else if (resultValidVig == 'vigenciaCad') {
                            document.getElementById("calcDiasAnios").disabled = true;
                            document.getElementById("editaBefens").disabled = true;

                            swal.fire({
                                title:'TRAMITE NO PROCEDENTE',
                                text:"La fecha ddel tramite excede el limite de su vigencia, tiene numero de oficio de autorizacion",
                                showCancelButton: true,
                                confirmButtonText:'Si',
                                cancelButtonText:'No',
                                timer:15000
                            }).then((result) => {
                                if (result.isConfirmed){
                                    var divOfTr = document.getElementById("DivExcepciones");
                                    divOfTr.style.display = "block";
                                    document.getElementById('editaBefens').disabled = false;
                                }else{
                                    let pagAnterior = document.referrer;
                                    if (pagAnterior.indexOf(window.location.host) !== -1) {
                                        window.history.back();
                                    }
                                }
                            });
                        }
                    });
                }
                break;
            
            case 'SL':
                document.getElementById("calcDiasAnios").disabled = false;
                document.getElementById("editaBefens").disabled = false;
                document.getElementById("fechCTJuicio").value = "";
                document.getElementById("fechCTJuicio").disabled = true;
                validAnioFechCTJuic = true;

                if (!validAnioFechCTJuic) {
                    Swal.fire(
                        'ERROR',
                        'por favor verifique los datos ingresados'
                    );
                    document.getElementById('calcDiasAnios').disabled = true;
                } else {
                    $.post("../../controller/tramites.php?op=validVigTramFA",{tipoTestamento:tipTestamento,ClaveMae:clavemae,FBase:document.getElementById('fechBaseMae').value,FBaja:document.getElementById('fechBajaMae').value,FCTJuicio:document.getElementById('fechCTJuicio').value,FRecibido:document.getElementById('fechRecibido').value},function(data){
                        data = JSON.parse(data);
                        var resultValidVig = data.resulValidVig;

                        if (resultValidVig == 'vigenciaVal') {
                            document.getElementById("calcDiasAnios").disabled = false;
                            document.getElementById("editaBefens").disabled = false;
                        }else if (resultValidVig == 'vigenciaCad') {
                            document.getElementById("calcDiasAnios").disabled = true;
                            document.getElementById("editaBefens").disabled = true;

                            swal.fire({
                                title:'TRAMITE NO PROCEDENTE',
                                text:"La fecha ddel tramite excede el limite de su vigencia, tiene numero de oficio de autorizacion",
                                showCancelButton: true,
                                confirmButtonText:'Si',
                                cancelButtonText:'No',
                                timer:15000
                            }).then((result) => {
                                if (result.isConfirmed){
                                    var divOfTr = document.getElementById("DivExcepciones");
                                    divOfTr.style.display = "block";
                                    document.getElementById('editaBefens').disabled = false;
                                }else{
                                    let pagAnterior = document.referrer;
                                    if (pagAnterior.indexOf(window.location.host) !== -1) {
                                        window.history.back();
                                    }
                                }
                            });
                        }
                    });
                }
                break;
            
            case 'J':
                if (isNaN(Date.parse(document.getElementById('fechCTJuicio').value)) && document.getElementById('fechCTJuicio').value == "") {
                    document.getElementById("calcDiasAnios").disabled = true;
                    document.getElementById("editaBefens").disabled = true;
                    Swal.fire(
                        'ERROR',
                        'La fecha del JUICIO no es correcta, verifiquela!!!'
                    );
                    validAnioFechCTJuic = false;
                    document.getElementById('calcDiasAnios').disabled = true;
                } else {
                    $.post("../../controller/tramites.php?op=validFechaCTJuic",{tipoTestamento:tipTestamento,FBase:document.getElementById('fechBaseMae').value,FBaja:document.getElementById('fechBajaMae').value,FCTJuicio:document.getElementById('fechCTJuicio').value,FRecibido:document.getElementById('fechRecibido').value},function(data){
                        data = JSON.parse(data);
                        var resultValidVig = data.resultValid;
                            switch (resultValidVig) {
                                case 'correcto':
                                    document.getElementById("calcDiasAnios").disabled = false;
                                    document.getElementById("editaBefens").disabled = false;
                                    validAnioFechCTJuic = true;
                                    break;
                                
                                case 'errorFecha':
                                    notifError = data.descValid;    
                                    Swal.fire(
                                        notifError,
                                        'por favor verifique la(s) fecha(s)'
                                    );
                                    validAnioFechCTJuic = false;
                                    document.getElementById('calcDiasAnios').disabled = true;
                                    break;

                                default:
                                    break;
                            }
                    });
                }

                if (!validAnioFechCTJuic) {
                    Swal.fire(
                        'ERROR',
                        'por favor verifique los datos ingresados'
                    );
                    document.getElementById('calcDiasAnios').disabled = true;
                } else {
                    $.post("../../controller/tramites.php?op=validVigTramFA",{tipoTestamento:tipTestamento,ClaveMae:clavemae,FBase:document.getElementById('fechBaseMae').value,FBaja:document.getElementById('fechBajaMae').value,FCTJuicio:document.getElementById('fechCTJuicio').value,FRecibido:document.getElementById('fechRecibido').value},function(data){
                        data = JSON.parse(data);
                        var resultValidVig = data.resulValidVig;

                        if (resultValidVig == 'vigenciaVal') {
                            document.getElementById("calcDiasAnios").disabled = false;
                            document.getElementById("editaBefens").disabled = false;
                        }else if (resultValidVig == 'vigenciaCad') {
                            document.getElementById("calcDiasAnios").disabled = true;
                            document.getElementById("editaBefens").disabled = true;

                            swal.fire({
                                title:'TRAMITE NO PROCEDENTE',
                                text:"La fecha del tramite excede el limite de su vigencia, tiene numero de oficio de autorizacion",
                                showCancelButton: true,
                                confirmButtonText:'Si',
                                cancelButtonText:'No',
                                timer:15000
                            }).then((result) => {
                                if (result.isConfirmed){
                                    var divOfTr = document.getElementById("DivExcepciones");
                                    divOfTr.style.display = "bloxk";
                                    document.getElementById('editaBefens').disabled = false;
                                }else{
                                    let pagAnterior = document.referrer;
                                    if (pagAnterior.indexOf(window.location.host) !== -1) {
                                        window.history.back();
                                    }
                                }
                            });
                        }else if (resultValidVig == 'fechaIni') {
                            //document.getElementById("fechCTJuicio").disabled = true;
                            document.getElementById("DivFechInicioJuicio").style.display = "block";
                            document.getElementById("editaBefens").disabled = true;
                            document.getElementById("calcDiasAnios").disabled = true;
                            document.getElementById("fechCTJuicio").disabled = true;
                            Swal.fire(
                                "VIGENCIA DEL TRAMITE CADUCO",
                                'proporcione la fecha de inicio del juicio!!'
                            );
                        } else if (resultValidVig == 'noProcede') {
                            Swal.fire(
                                "TRAMITE NO PROCEDENTE",
                                'Tramite fuera del limite de vigencia para su validez'
                            );
                            
                            let pagAnterior = document.referrer;
                                if (pagAnterior.indexOf(window.location.host) !== -1) {
                                    window.history.back();
                                }
                        } 
                        
                    });
                }
                break;

            default:
                break;
        }
    }else{
        document.getElementById("fechCTJuicio").style.border =  ".1em red solid";
        Swal.fire(
            "El año de la fecha de CT o Juicio no es valido",
            'por favor corrija la fecha'
        );
        validAnioFechCTJuic = false;
        document.getElementById("calcDiasAnios").disabled = true;
        document.getElementById("editaBefens").disabled = true;
    }
});


const accioFechIniJuic = document.querySelector("#fechIniJuicio");
accioFechIniJuic.addEventListener("blur", function (evento) {
    evento.preventDefault();

    if (parseInt(document.getElementById('fechIniJuicio').value.slice(0,4)) > 2020 && parseInt(document.getElementById('fechIniJuicio').value.slice(0,4)) < 2024) {
        document.getElementById("fechCTJuicio").style.border =  ".1em black solid";
        $.post("../../controller/tramites.php?op=validaVigFechas",{fechRecibido:document.getElementById('fechRecibido').value,fechBaja:document.getElementById('fechBajaMae').value,fechIniJuic:document.getElementById('fechIniJuicio').value,fechCTJuic:document.getElementById('fechCTJuicio').value},function(data){
            data = JSON.parse(data);
            resultValidFI = data.descResult;
            
            switch (resultValidFI) {
                case 'validVal':
                    document.getElementById("calcDiasAnios").disabled = false;
                    document.getElementById("editaBefens").disabled = false;
                    break;
            
                case 'errorFecha':
                    notifError = data.descValid;    
                    Swal.fire(
                        notifError,
                        'por favor verifique la fecha'
                    );
                    document.getElementById("calcDiasAnios").disabled = true;
                    document.getElementById("editaBefens").disabled = true;
                    break;
                
                case 'noProcede':
                    document.getElementById("calcDiasAnios").disabled = true;
                    document.getElementById("editaBefens").disabled = true;
                    Swal.fire(
                        "TRAMITE NO PROCEDENTE",
                        'Tramite fuera del limite de vigencia para su validez'
                    );
                    
                    let pagAnterior = document.referrer;
                        if (pagAnterior.indexOf(window.location.host) !== -1) {
                            window.history.back();
                        }
                    break;
                
                default:
                    break;
            }
        });
    }else{
        document.getElementById("fechCTJuicio").style.border =  ".1em red solid";
        Swal.fire(
            "El año de la fecha de inicio del Juicio no es valido",
            'por favor corrija la fecha'
        );
        document.getElementById("calcDiasAnios").disabled = true;
        document.getElementById("editaBefens").disabled = true;
    }
    
});

var numBenefs=0;
const benefs_max = 20;
var contBenefs=1;
const accionBenefs = document.querySelector("#editaBefens");
accionBenefs.addEventListener("click", function (evento){
    evento.preventDefault();
    numBenefs = $("#numBenefs").val();
	
    if (numBenefs == 0) {
        $('#edita_Benefs')[0].reset();
        $('#editarBenefs').modal('show');
        document.getElementById('numsBenefs').value = contBenefs;
        document.getElementById("calcDiasAnios").disabled = false;
    } else {
        $('#edita_Benefs')[0].reset();
        document.getElementById('numsBenefs').value = contBenefs;
        document.getElementById("calcDiasAnios").disabled = true;
        $('#editarBenefs').modal('show');
        var aB_nombres = document.getElementById('nomsbenefs').value.split(",");
        var aB_curps = document.getElementById('curpsbenefs').value.split(",");
        var aB_parents = document.getElementById('parentsbenefs').value.split(",");
        var aB_porcents = document.getElementById('porcentsbenefs').value.split(",");
        var aB_edades = document.getElementById('edadesbenefs').value.split(",");
        var aB_vida = document.getElementById('vidasbenefs').value.split(",");
		var aB_folios = document.getElementById('foliosbenefs').value.split(",");
		
        indexA = 0;
        formulario = document.getElementById('edita_Benefs');
            for (let i = 0; i < formulario.elements.length - 1; i++) {
                elemento = formulario.elements[i].name;
				
                switch (elemento) {
                    case 'nombenef[]':
                        formulario.elements[i].value = aB_nombres[indexA];
                        break;
                
                    case 'curpbenef[]':
                        formulario.elements[i].value = aB_curps[indexA];
                        break;
                    
                    case 'parentBenef[]':
                        formulario.elements[i].value = aB_parents[indexA];
                        break;
        
                    case 'porcentBenef[]':
                        formulario.elements[i].value = aB_porcents[indexA];
                        break;
        
                    case 'opcEdoEdadBenef[]':
                        formulario.elements[i].value = aB_edades[indexA];
                        break;
        
                    case 'opcEdoVidBenef[]':
                        formulario.elements[i].value = aB_vida[indexA];
                        break;
					case 'numcheqBenef[]':
						formulario.elements[i].value = aB_folios[indexA];
                        indexA++;
						break;
                    default:
                        break;
                }
            }
    }
});
/*--------------------*/

$("#addBenef").click(function (e) {
    e.preventDefault();

    var elemntBenef = document.getElementById("DivBeneficiarios");
    var clonElement = elemntBenef.cloneNode(true);
    document.getElementById("DivDatsBenef").appendChild(clonElement);
    contBenefs++;
    document.getElementById('numsBenefs').value = contBenefs;
});

$('#DivDatsBenef').on("click", ".delete_Benef", function (e) {
    e.preventDefault();

    if (contBenefs >1) {
        $(this).parent('div').parent('div').remove();
        contBenefs--;
    }
    document.getElementById('numsBenefs').value = contBenefs;
});

$("#editarBenefs").on("submit",function(evento){
    evento.preventDefault();

    var a_nombres = [];
    var a_curps = [];
    var a_parentescos = [];
    var a_porcentajes = [];
    var a_edades = [];
    var a_vida = [];
	var a_foliosB = [];
    var porcentajeBenefs = 0;
    var integridadDats = true;

    formulario = document.getElementById('edita_Benefs');
    for (let index = 0; index < formulario.elements.length - 1; index++) {
        elemento = formulario.elements[index].name;
        switch (elemento) {
            case 'nombenef[]':
                if (formulario.elements[index].value != ""){
                    a_nombres.push(formulario.elements[index].value);
                    integridadDats = true;
                }else{
                    a_nombres.push(formulario.elements[index].value);
                    integridadDats = false;
                }
                break;
        
            case 'curpbenef[]':
                if (formulario.elements[index].value != ""){
                    a_curps.push(formulario.elements[index].value);
                    integridadDats = true;
                }else{
                    a_curps.push(formulario.elements[index].value);
                    integridadDats = false;
                }
                break;
            
            case 'parentBenef[]':
                a_parentescos.push(formulario.elements[index].value);
                break;

            case 'porcentBenef[]':
                if (parseInt(formulario.elements[index].value) > 0 && parseInt(formulario.elements[index].value) <= 100) {
                    a_porcentajes.push(parseInt(formulario.elements[index].value));
                    porcentajeBenefs = porcentajeBenefs + parseInt(formulario.elements[index].value);
                } else {
                    a_porcentajes.push(parseInt(formulario.elements[index].value));
                    porcentajeBenefs = porcentajeBenefs + parseInt(formulario.elements[index].value);
                    Swal.fire(
                        "EL porcentaje proporcionado no es correcto",
                        'verifique sus datos'
                    );
                }
                break;

            case 'opcEdoEdadBenef[]':
                a_edades.push(formulario.elements[index].value);
                break;

            case 'opcEdoVidBenef[]':
                a_vida.push(formulario.elements[index].value);
                break;

			case 'numcheqBenef[]':
				a_foliosB.push(formulario.elements[index].value)
				break;
            default:
                break;
        }
    }

    if (porcentajeBenefs != 100 || !integridadDats) {
        if (porcentajeBenefs != 100) {
            Swal.fire(
                "ERROR EN LOS PROCENTAJES",
                'deben sumar un total de 100%, verifiquelos'
            );
        }else if (!integridadDats) {
            Swal.fire(
                "ERROR EN LOS DATOS",
                'Algunos datos no son correctos, verificarlos'
            );
        }         
    } else {
        document.getElementById('nomsbenefs').value = a_nombres;
        document.getElementById('curpsbenefs').value = a_curps;
        document.getElementById('parentsbenefs').value = a_parentescos;
        document.getElementById('porcentsbenefs').value = a_porcentajes;
        document.getElementById('edadesbenefs').value = a_edades;
        document.getElementById('vidasbenefs').value = a_vida;
		document.getElementById('foliosbenefs').value = a_foliosB;
        document.getElementById('numBenefs'). value = document.getElementById('numsBenefs').value;
        numBenefs = document.getElementById('numsBenefs').value;
        $('#edita_Benefs')[0].reset();
        $("#editarBenefs").modal('hide');
        document.getElementById("calcDiasAnios").disabled = false;
    }
});





var checkboxAdeudo = document.getElementById('CheckAdeudos');
checkboxAdeudo.addEventListener("change", validaCheckAdeudos, false);
function validaCheckAdeudos(){
    var checked =checkboxAdeudo.checked;
    var modalidad = document.getElementById('ModoRetiro').value;
    if(checked){
        document.getElementById("DivDatsAdeudos").style.display = "block";
    }else{
        document.getElementById("DivDatsAdeudos").style.display = "none";
        document.getElementById('montAdeudos').value = 0;
        if (document.getElementById('montRet').value !== 0 && document.getElementById('montRet').value !== "") {
            montoRetiro = document.getElementById('montRet').value;
            if (modalidad == "C") {
                document.getElementById('monRetEntr').value = montoRetiro;
                document.getElementById("montRetFondFall").style.display = "none";
                document.getElementById("DivTpoDiferido").style.display = "none";
                document.getElementById("montRetFF").value = 0;
                document.getElementById("montSalMin").value = 0;
            } else if (modalidad == "D") {
                document.getElementById("DivTpoDiferido").style.display = "block";
                document.getElementById("montRetFondFall").style.display = "block";
                document.getElementById("montSalMin").disabled =  false;
                if (document.getElementById('ModRetDiferid50').checked){
                    document.getElementById('monRetEntr').value = (montoRetiro / 2).toFixed(2);
                    document.getElementById('montRetFF').value = (montoRetiro / 2).toFixed(2);
                }else if(document.getElementById('ModRetDiferid100').checked){
                    document.getElementById('monRetEntr').value = "0";
                    document.getElementById('montRetFF').value = montoRetiro;
                }
            }
        }
    }
}

var adeudosMae = 0;
$("#AdedFajam").change(function () {
    if (montoRetiro > 0) {
        AdeudoFAJAM = document.getElementById('AdedFajam').value.replace(",","");
        document.getElementById('AdedFajam').value = (new Intl.NumberFormat('es-MX').format(AdeudoFAJAM));
    } else {
        AdeudoFAJAM = document.getElementById('AdedFajam').value.replace(",","");
        document.getElementById('AdedFajam').value = (new Intl.NumberFormat('es-MX').format(AdeudoFAJAM));
    }
});

$("#AdedTS").change(function () {
    if (montoRetiro > 0) {
        AdeudoTS = document.getElementById('AdedTS').value.replace(",","");
        document.getElementById('AdedTS').value = (new Intl.NumberFormat('es-MX').format(AdeudoTS));
    } else {
        AdeudoTS = document.getElementById('AdedTS').value.replace(",","");
        document.getElementById('AdedTS').value = (new Intl.NumberFormat('es-MX').format(AdeudoTS));
    }
});

$("#AdedFondPension").change(function () {
    if (montoRetiro > 0) {
        AdeudoFondPension = document.getElementById('AdedFondPension').value.replace(",","");
        document.getElementById('AdedFondPension').value = (new Intl.NumberFormat('es-MX').format(AdeudoFondPension));
    } else {
        AdeudoFondPension = document.getElementById('AdedFondPension').value.replace(",","");
        document.getElementById('AdedFondPension').value = (new Intl.NumberFormat('es-MX').format(AdeudoFondPension));
    }
});

$("#AdedTurismo").change(function () {
    if (montoRetiro > 0) {
        AdeudoTurismo = document.getElementById('AdedTurismo').value.replace(",","");
        document.getElementById('AdedTurismo').value = (new Intl.NumberFormat('es-MX').format(AdeudoTurismo));
    } else {
        AdeudoTurismo = document.getElementById('AdedTurismo').value.replace(",","");
        document.getElementById('AdedTurismo').value = (new Intl.NumberFormat('es-MX').format(AdeudoTurismo)); 
    }
});

var numadeds = 0;
var accionActRetiro = document.querySelector("#ActRetAdeds");
accionActRetiro.addEventListener("click", function (event) {
    event.preventDefault();
    
    numadeds = 0
    adeudosMae = 0;
    adeudosMae = parseFloat(document.getElementById('AdedFajam').value.replace(",","")) + parseFloat(document.getElementById('AdedTS').value.replace(",","")) + parseFloat(document.getElementById('AdedFondPension').value.replace(",","")) + parseFloat(document.getElementById('AdedTurismo').value.replace(",",""));

    if (parseFloat(document.getElementById('AdedFajam').value.replace(",","")) > 0) {
        numadeds++;
    }
    if (parseFloat(document.getElementById('AdedTS').value.replace(",","")) > 0) {
        numadeds++;
    }
    if (parseFloat(document.getElementById('AdedFondPension').value.replace(",","")) > 0) {
        numadeds++;
    }
    if (parseFloat(document.getElementById('AdedTurismo').value.replace(",","")) > 0) {
        numadeds++;
    }

    var montTotRet = document.getElementById('montRet').value.replace(",","");
    document.getElementById('montRetSinAded').value = montTotRet - adeudosMae;
    document.getElementById('montAdeudos').value = adeudosMae;
    if (adeudosMae > 0) {
        var modalidadAct = document.getElementById('ModoRetiro').value;
        var montRetSinAded =  document.getElementById('montRetSinAded').value;
        if (modalidadAct == "C") {
            document.getElementById('monRetEntr').value = montRetSinAded;
            document.getElementById("montRetFondFall").style.display = "none";
            document.getElementById("DivTpoDiferido").style.display = "none";
        } else if (modalidadAct == "D") {
            document.getElementById("DivTpoDiferido").style.display = "block";
            document.getElementById("montRetFondFall").style.display = "block";
            document.getElementById("montSalMin").disabled =  false;
            if (document.getElementById('ModRetDiferid50').checked){
                document.getElementById('monRetEntr').value = (montRetSinAded / 2).toFixed(2);
                document.getElementById('montRetFF').value = (montRetSinAded / 2).toFixed(2);
            }else if(document.getElementById('ModRetDiferid100').checked){
                document.getElementById('monRetEntr').value = "0";
                document.getElementById('montRetFF').value = montRetSinAded;
            }
        }    
    }else{
        document.getElementById("DivDatsAdeudos").style.display = "none";
        document.getElementById("CheckAdeudos").checked = false;
        var modalidadAct = document.getElementById('ModoRetiro').value;
        var montRetSinAded =  document.getElementById('montRet').value;
        if (modalidadAct == "C") {
            document.getElementById('monRetEntr').value = montRetSinAded;
            document.getElementById("montRetFondFall").style.display = "none";
            document.getElementById("DivTpoDiferido").style.display = "none";
        } else if (modalidadAct == "D") {
            document.getElementById("DivTpoDiferido").style.display = "block";
            document.getElementById("montRetFondFall").style.display = "block";
            document.getElementById("montSalMin").disabled =  false;
            if (document.getElementById('ModRetDiferid50').checked){
                document.getElementById('monRetEntr').value = (montRetSinAded / 2).toFixed(2);
                document.getElementById('montRetFF').value = (montRetSinAded / 2).toFixed(2);
            }else if(document.getElementById('ModRetDiferid100').checked){
                document.getElementById('monRetEntr').value = "0";
                document.getElementById('montRetFF').value = montRetSinAded;
            }
        }    
    }
});

var montoRetiro = 0;
var accionOpciModRet = document.getElementById('ModoRetiro');
accionOpciModRet.addEventListener("change", calculaRetiro, false);
function calculaRetiro() {
    var modalidad = document.getElementById('ModoRetiro').value;
    if (document.getElementById('CheckAdeudos').checked && document.getElementById('montRetSinAded').value!=="") {
        montoRetiro = document.getElementById('montRetSinAded').value.replace(',','');
        if (modalidad == "C") {
            document.getElementById('monRetEntr').value = montoRetiro;
            document.getElementById("montRetFondFall").style.display = "none";
            document.getElementById("DivTpoDiferido").style.display = "none";
            document.getElementById('ModalRetiro').value = "C";
            document.getElementById("montRetFF").value = 0;
            document.getElementById("montSalMin").value = 0;
        } else if (modalidad == "D") {
            document.getElementById("DivTpoDiferido").style.display = "block";
            document.getElementById("montRetFondFall").style.display = "block";
            document.getElementById("montSalMin").disabled =  false;
            if (document.getElementById('ModRetDiferid50').checked){
                document.getElementById('monRetEntr').value = (montoRetiro / 2).toFixed(2);
                document.getElementById('montRetFF').value = (montoRetiro / 2).toFixed(2);
                document.getElementById('ModalRetiro').value = "D50";
            }else if(document.getElementById('ModRetDiferid100').checked){
                document.getElementById('monRetEntr').value = "0";
                document.getElementById('montRetFF').value = montoRetiro;
                document.getElementById('ModalRetiro').value = "D100";
            }
        }
    } else {
        montoRetiro = document.getElementById('montRet').value.replace(',','');
        if (modalidad == "C") {
            document.getElementById('monRetEntr').value = montoRetiro;
            document.getElementById("montRetFondFall").style.display = "none";
            document.getElementById("DivTpoDiferido").style.display = "none";
            document.getElementById('ModalRetiro').value = "C";
            document.getElementById("montRetFF").value = 0;
            document.getElementById("montSalMin").value = 0;
        } else if (modalidad == "D") {
            document.getElementById("DivTpoDiferido").style.display = "block";
            document.getElementById("montRetFondFall").style.display = "block";
            document.getElementById("montSalMin").disabled =  false;
            if (document.getElementById('ModRetDiferid50').checked){
                document.getElementById('monRetEntr').value = (montoRetiro / 2).toFixed(2);
                document.getElementById('montRetFF').value = (montoRetiro / 2).toFixed(2);
                document.getElementById('ModalRetiro').value = "D50";
            }else if(document.getElementById('ModRetDiferid100').checked){
                document.getElementById('monRetEntr').value = "0";
                document.getElementById('montRetFF').value = montoRetiro;
                document.getElementById('ModalRetiro').value = "D100";
            }
        }
    }
}

var radModDife100 = document.getElementById('ModRetDiferid100');
radModDife100.addEventListener("change", calcMretDif100porc, false);
function calcMretDif100porc() {
    if(document.getElementById('CheckAdeudos').checked && document.getElementById('montRetSinAded').value !== "0") {
        montoRetiro = document.getElementById('montRetSinAded').value.replace(',','');
    }else if (document.getElementById('CheckAdeudos').checked && document.getElementById('montRetSinAded').value == 0){
        montoRetiro = document.getElementById('montRet').value.replace(',','');
    }else {
        montoRetiro = document.getElementById('montRet').value.replace(',','');
    }
    var opcDife = radModDife100.checked;
    if(opcDife){
        document.getElementById('monRetEntr').value = "0";
        document.getElementById('montRetFF').value = montoRetiro;
        document.getElementById('ModalRetiro').value = "D100";  
    }
}

var radModDife50 = document.getElementById('ModRetDiferid50');
radModDife50.addEventListener("change", calcMretDif50porc, false);
function calcMretDif50porc() {
    var opcDife = radModDife50.checked;
    if(document.getElementById('CheckAdeudos').checked && document.getElementById('montRetSinAded').value !== "0") {
        montoRetiro = document.getElementById('montRetSinAded').value.replace(',','');
    }else if (document.getElementById('CheckAdeudos').checked && document.getElementById('montRetSinAded').value == 0){
        montoRetiro = document.getElementById('montRet').value.replace(',','');
    }else {
        montoRetiro = document.getElementById('montRet').value.replace(',','');
    }
    if(opcDife){
        document.getElementById('monRetEntr').value = (montoRetiro / 2).toFixed(2);
        document.getElementById('montRetFF').value = (montoRetiro / 2).toFixed(2);
        document.getElementById('ModalRetiro').value = "D50";
    }
}

var accionRegresa = document.querySelector('.Btnregresar');
accionRegresa.addEventListener("click", function (e) {
    e.preventDefault();
    javascript:history.go(-1);
});

var accionBtnInicio = document.getElementById('Btnnicio');
accionBtnInicio.addEventListener("click", function (e) {
    e.preventDefault();
    location.href = 'Inicio.php';
});

var accionGuardar = document.getElementById('updateTramite');
accionGuardar.addEventListener("click", function (event) {
    event.preventDefault();
    switch (motivo) {
        case 'I':
            actualizaJubInha();
            break;

        case 'J':
            actualizaJubInha();
            break;

        case 'FA':
            actualizaFallAct();
            break;

        case 'FJ':
            actualizaFallJub();
            break;

        default:
            break;
    }
});

function actualizaJubInha() {
    $.post("../../controller/tramites.php?op=updateJunInha",{Uanioentr:$("#AnioEntr").val(),
                                                        Unumentr:$("#numentr").val(),
                                                        Uidentr:$("#IdEntrega").val(),
                                                        Uidret: idretiro,
                                                        Uidentrret: paramidret,
                                                        Ucvemae:$("#cspMaeBusq").val(),
                                                        Ucveissemym:document.getElementById('cveIMaeBusq').value,
                                                        Uestatusmae:$("#estLaboral").val(),
                                                        Umotret:$("#OpcCauRetiro").val(),
                                                        Uapepat:$("#apePatMae").val(),
                                                        Uapemat:$("#apeMatMae").val(),
                                                        Unombre:$("#nombreMae").val(),
                                                        Unomcom:$("#nomComplMae").val(),
                                                        URegMae:$("#regsindmae").val(),
                                                        UfechDictam:$("#fechDictamen").val(),
                                                        UnumDictam:$("#folioDictamen").val(),
                                                        Ufechbaj:$("#fechBajaMae").val(),
                                                        UnomSolic:$("#nomSolic").val(),
                                                        UNumCel:$("#TelCelMae").val(),
                                                        UnumPart:$("#TelPartiMae").val(),
                                                        Ufechbase:$("#fechBaseMae").val(),
                                                        UfechInipsgs:document.getElementById('fechsIniPSGS').value,
                                                        UfechFinpsgs:document.getElementById('fechsFinPSGS').value,
                                                        Unumpsgs:$("#numPsgs").val(),
                                                        Udiaspsgs:$("#diasPsgs").val(),
                                                        UdiasServ:$("#diasServMae").val(),
                                                        UaniosServ:$('#aniosServMae').val(),
                                                        UmodRet:$("#ModoRetiro").val(),
                                                        Umonttotret:document.getElementById('montRet').value.replace(',',''),
                                                        UmontretEntr:$("#monRetEntr").val().replace(',',''),
                                                        UmontRetFF:document.getElementById('montRetFF').value.replace(',',''),
                                                        UfechRecibido:$("#fechRecibido").val(),
                                                        UnumOficTarj:$("#numOficTarj").val(),
                                                        UfechOficAut:$("#fechOficAut").val(),
                                                        UimageOficTarj:$("#imageOficTarj").val(),
                                                        Unumbenefs:$("#numbenef").val(),
                                                        UdiaHaber: $("#montSalMin").val().replace(",",""),
                                                        UadedFajam: $("#AdedFajam").val().replace(",",""),
                                                        UadedTS: $("#AdedTS").val().replace(",",""),
                                                        UadedFondPens: $("#AdedFondPension").val().replace(",",""),
                                                        UadedTurismo: $("#AdedTurismo").val().replace(",",""),
                                                        UmontAdeds: $("#montAdeudos").val().replace(",",""),
                                                        UmontretSnAdeds:$("#montRetSinAded").val().replace(",",""),
                                                        Unumadeds: numadeds,
                                                        Ucurpmae:document.getElementById('CURPMae').value,
                                                        Urfcmae:document.getElementById('RFCMae').value,
														UtipTram:tipTramit,
														UfolCheqBenef:document.getElementById('numfolcheqTEJI').value
                                                        },function (data) {
                                                            resultadoAdd = Object.values( JSON.parse(data));
                                                            NumregsResult = resultadoAdd.length;
                                                            switch (NumregsResult) {
                                                                case 3:
                                                                    if (resultadoAdd[0] == "Actualizado" && resultadoAdd[1] == "Actualizado" && resultadoAdd[2] == "Actualizado") {
                                                                        Swal.fire(
                                                                            "TRAMITE MODIFICADO CORRECTAMENTE"
                                                                        );
                                                                        javascript:history.go(-1);
                                                                    } else {
                                                                        Swal.fire(
                                                                            "ALGO SALIO MAL",
                                                                            'por favor verifique los datos'
                                                                        );
                                                                    }
                                                                    break;

                                                                case 4:
                                                                    if (resultadoAdd[0] == "Actualizado" && resultadoAdd[1] == "Actualizado" && resultadoAdd[2] == "Actualizado" && resultadoAdd[3] == "Agregado") {
                                                                        Swal.fire(
                                                                            "TRAMITE MODIFICADO CORRECTAMENTE"
                                                                        );
                                                                        javascript:history.go(-1);
                                                                    } else if (resultadoAdd[0] == "Actualizado" && resultadoAdd[1] == "Actualizado" && resultadoAdd[2] == "Eliminado" && resultadoAdd[3] == "Actualizado") {
                                                                        Swal.fire(
                                                                            "TRAMITE MODIFICADO CORRECTAMENTE"
                                                                        );
                                                                        javascript:history.go(-1);
                                                                    } else {
                                                                        Swal.fire(
                                                                            "ALGO SALIO MAL",
                                                                            'por favor verifique los datos'
                                                                        );
                                                                    }
                                                                    break;

                                                                case 5:
                                                                    if (resultadoAdd[0] == "Actualizado" && resultadoAdd[1] == "Actualizado" && resultadoAdd[2] == "Actualizado" && resultadoAdd[3] == "Actualizado" && resultadoAdd[4] == "Agregado") {
                                                                        Swal.fire(
                                                                            "TRAMITE MODIFICADO CORRECTAMENTE"
                                                                        );
                                                                        javascript:history.go(-1);
                                                                    } else {
                                                                        Swal.fire(
                                                                            "ALGO SALIO MAL",
                                                                            'por favor verifique los datos'
                                                                        );
                                                                    }
                                                                    break;

                                                                default:
                                                                    break;
                                                            }
                                                        });
}

function actualizaFallAct() {
    $.post("../../controller/tramites.php?op=updateFA",{Uanioentr:$("#AnioEntr").val(),
                                                        Unumentr:$("#numentr").val(),
                                                        Uidentr:$("#IdEntrega").val(),
                                                        Uidret: idretiro,
                                                        Uidentrret: paramidret,
                                                        Ucvemae:$("#cspMaeBusq").val(),
                                                        Ucveissemym:document.getElementById('cveIMaeBusq').value,
                                                        Uestatusmae:$("#estLaboral").val(),
                                                        Umotret:$("#OpcCauRetiro").val(),
                                                        Uapepat:$("#apePatMae").val(),
                                                        Uapemat:$("#apeMatMae").val(),
                                                        Unombre:$("#nombreMae").val(),
                                                        Unomcom:$("#nomComplMae").val(),
                                                        URegMae:$("#regsindmae").val(),
                                                        Ufechbaj:$("#fechBajaMae").val(),
                                                        UnomSolic:$("#nomSolic").val(),
                                                        UNumCel:$("#TelCelMae").val(),
                                                        UnumPart:$("#TelPartiMae").val(),
                                                        Ufechbase:$("#fechBaseMae").val(),
                                                        UfechInipsgs:document.getElementById('fechsIniPSGS').value,
                                                        UfechFinpsgs:document.getElementById('fechsFinPSGS').value,
                                                        Unumpsgs:$("#numPsgs").val(),
                                                        Udiaspsgs:$("#diasPsgs").val(),
                                                        UdiasServ:$("#diasServMae").val(),
                                                        UaniosServ:$('#aniosServMae').val(),
                                                        UmodRet:document.getElementById("ModoRetiro").value,
                                                        Umonttotret:document.getElementById('montRet').value.replace(',',''),
                                                        UmontretEntr:$("#monRetEntr").val().replace(',',''),
                                                        UfechRecibido:$("#fechRecibido").val(),
                                                        UnumOficTarj:$("#numOficTarj").val(),
                                                        UfechOficAut:$("#fechOficAut").val(),
                                                        UimageOficTarj:$("#imageOficTarj").val(),
                                                        Unumbenefs:$("#numBenefs").val(),
                                                        UadedFajam: $("#AdedFajam").val().replace(",",""),
                                                        UadedTS: $("#AdedTS").val().replace(",",""),
                                                        UadedFondPens: $("#AdedFondPension").val().replace(",",""),
                                                        UadedTurismo: $("#AdedTurismo").val().replace(",",""),
                                                        UmontAdeds: $("#montAdeudos").val().replace(",",""),
                                                        UmontretSnAdeds:$("#montRetSinAded").val().replace(",",""),
                                                        Unumadeds: numadeds,
                                                        Unombenefs:$("#nomsbenefs").val(),
                                                        Ucurpbenefs:$("#curpsbenefs").val(),
                                                        Uparentbenefs:$("#parentsbenefs").val(),
                                                        Uporcbenefs:$("#porcentsbenefs").val(),
                                                        Uedadbenefs:$("#edadesbenefs").val(),
                                                        Uvidabenefs:$("#vidasbenefs").val(),
                                                        Udoctestamnt:$("#OpcTestamento").val(),
                                                        Ufechdoctestmnt:$("#fechCTJuicio").val(),
                                                        Ucurpmae:document.getElementById('CURPMae').value,
                                                        Urfcmae:document.getElementById('RFCMae').value,
														UtipTram:tipTramit,
														UfolCheqBenef:document.getElementById('foliosbenefs').value
                                                        },function (data) {
                                                            resultadoAdd = Object.values( JSON.parse(data));
                                                            NumregsResult = resultadoAdd.length;
                                                            switch (NumregsResult) {
                                                                case 6:
                                                                    if (resultadoAdd[0] == "Actualizado" && resultadoAdd[1] == "Actualizado" && resultadoAdd[2] == "Eliminado" && resultadoAdd[3] == "Eliminado" && resultadoAdd[4] == "Agregado" && resultadoAdd[5] == "Agregado") {
                                                                        Swal.fire(
                                                                            "TRAMITE MODIFICADO CORRECTAMENTE"
                                                                        );
                                                                        javascript:history.go(-1);
                                                                    } else {
                                                                        Swal.fire(
                                                                            "ALGO SALIO MAL",
                                                                            'por favor verifique los datos'
                                                                        );
                                                                    }
                                                                    break;

                                                                case 7:
                                                                    if (resultadoAdd[0] == "Actualizado" && resultadoAdd[1] == "Actualizado" && resultadoAdd[2] == "Eliminado" && resultadoAdd[3] == "Eliminado" && resultadoAdd[4] == "Agregado" && resultadoAdd[5] == "Agregado" && resultadoAdd[6] == "Agregado") {
                                                                        Swal.fire(
                                                                            "TRAMITE MODIFICADO CORRECTAMENTE"
                                                                        );
                                                                        javascript:history.go(-1);
                                                                    } else {
                                                                        Swal.fire(
                                                                            "ALGO SALIO MAL",
                                                                            'por favor verifique los datos'
                                                                        );
                                                                    }
                                                                    break;

                                                                default:
                                                                    break;
                                                            }
                                                        });
}

function actualizaFallJub(){
    $.post("../../controller/tramites.php?op=updateFJ",{Uanioentr:$("#AnioEntr").val(),
                                                        Unumentr:$("#numentr").val(),
                                                        Uidentr:$("#IdEntrega").val(),
                                                        Uidret: idretiro,
                                                        Uidentrret: paramidret,
                                                        Ucveissemym:document.getElementById('cveIMaeBusq').value,
                                                        Uestatusmae:$("#estLaboral").val(),
                                                        Umotret:$("#OpcCauRetiro").val(),
                                                        Uapepat:$("#apePatMae").val(),
                                                        Uapemat:$("#apeMatMae").val(),
                                                        Unombre:$("#nombreMae").val(),
                                                        Unomcom:$("#nomComplMae").val(),
                                                        URegMae:$("#regsindmae").val(),
                                                        Ufechbaj:$("#fechBajaMae").val(),
                                                        UnomSolic:$("#nomSolic").val(),
                                                        UNumCel:$("#TelCelMae").val(),
                                                        UnumPart:$("#TelPartiMae").val(),
                                                        Ufechbase:document.getElementById("fechBaseMae").value, //$("#fechBaseMae").val(),
                                                        UdiasServ:$("#diasServMae").val(),
                                                        UaniosServ:$('#aniosServMae').val(),
                                                        UmodRet:document.getElementById("ModoRetiro").value,
                                                        Umonttotret:document.getElementById('montRet').value.replace(',',''),
                                                        UmontretEntr:$("#monRetEntr").val().replace(',',''),
                                                        UfechRecibido:$("#fechRecibido").val(),
                                                        UnumOficTarj:$("#numOficTarj").val(),
                                                        UfechOficAut:$("#fechOficAut").val(),
                                                        UimageOficTarj:$("#imageOficTarj").val(),
                                                        Unumbenefs:$("#numBenefs").val(),
                                                        UadedFajam: $("#AdedFajam").val().replace(",",""),
                                                        UadedTS: $("#AdedTS").val().replace(",",""),
                                                        UadedFondPens: $("#AdedFondPension").val().replace(",",""),
                                                        UadedTurismo: $("#AdedTurismo").val().replace(",",""),
                                                        UmontAdeds: $("#montAdeudos").val().replace(",",""),
                                                        UmontretSnAdeds:$("#montRetSinAded").val().replace(",",""),
                                                        Unumadeds: numadeds,
                                                        Unombenefs:$("#nomsbenefs").val(),
                                                        Ucurpbenefs:$("#curpsbenefs").val(),
                                                        Uparentbenefs:$("#parentsbenefs").val(),
                                                        Uporcbenefs:$("#porcentsbenefs").val(),
                                                        Uedadbenefs:$("#edadesbenefs").val(),
                                                        Uvidabenefs:$("#vidasbenefs").val(),
                                                        Udoctestamnt:$("#OpcTestamento").val(),
                                                        Ufechdoctestmnt:$("#fechCTJuicio").val(),
                                                        Ucurpmae:document.getElementById('CURPMae').value,
                                                        Urfcmae:document.getElementById('RFCMae').value
                                                        },function (data) {
                                                            resultadoAdd = JSON.parse(data);
                                                            NumregsResult = resultadoAdd.length;
                                                            switch (NumregsResult) {
                                                                case 6:
                                                                    if (resultadoAdd[0] == "Actualizado" && resultadoAdd[1] == "Actualizado" && resultadoAdd[2] == "Eliminado" && resultadoAdd[3] == "Eliminado" && resultadoAdd[4] == "Agregado" && resultadoAdd[5] == "Agregado") {
                                                                        Swal.fire(
                                                                            "TRAMITE MODIFICADO CORRECTAMENTE"
                                                                        );
                                                                        javascript:history.go(-1);
                                                                    } else {
                                                                        Swal.fire(
                                                                            "ALGO SALIO MAL",
                                                                            'por favor verifique los datos'
                                                                        );
                                                                    }
                                                                    break;

                                                                case 7:
                                                                    if (resultadoAdd[0] == "Actualizado" && resultadoAdd[1] == "Actualizado" && resultadoAdd[2] == "Eliminado" && resultadoAdd[3] == "Eliminado" && resultadoAdd[4] == "Agregado" && resultadoAdd[5] == "Agregado" && resultadoAdd[6] == "Agregado") {
                                                                        Swal.fire(
                                                                            "TRAMITE MODIFICADO CORRECTAMENTE"
                                                                        );
                                                                        javascript:history.go(-1);
                                                                    } else {
                                                                        Swal.fire(
                                                                            "ALGO SALIO MAL",
                                                                            'por favor verifique los datos'
                                                                        );
                                                                    }
                                                                    break;

                                                                default:
                                                                    break;
                                                            }
                                                        });
}

