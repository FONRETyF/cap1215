var motivo = "";
var programfallec = "";
var clavemae = "";
var contPSGS = 0;
var idretiro = '';
var paramidret = '';
var numadedsM = 0;
var tipTramit = '';

function init(){
}

$(document).ready(function () {
    document.getElementById('numentr').value = document.getElementById('InputNumEntr').value;
    document.getElementById('AnioEntr').value = document.getElementById('InputAnioEntr').value;
    document.getElementById('IdEntrega').value = document.getElementById('AnioEntr').value + document.getElementById('numentr').value;
    document.getElementById("DivTestBenefsMae").style.display = "none";

    $('#tituto_BasJubBajFall').html('BASE Y BAJA');
    $('#tituto_InptBasJub').html('Base: &nbsp');
    $('#tituto_InptBajFall').html('Baja: &nbsp');   
    
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

        if(motivoRet == "FRJ" || motivoRet == "FRI") {
            $.post("../../controller/retiros.php?op=updateTram",{identret:paramidret,modretiro:modretiro,cvemae:cvemae,motivoRet:motivoRet},function(data){
                datUpdateTram = Object.values(JSON.parse(data));
                var infoTramite = Object.values(datUpdateTram[0]);
                
                idretiro = infoTramite[4];
                
                switch (infoTramite[7]) {
                    case 'FRI':
                        var estatLabMae = "INHABILITADO";
                        break;
                    case 'FRJ':
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
        }else if (motivoRet == "FRF") {
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

        }else if (motivoRet == "FMJ") {
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

const accionOpcTestamento = document.querySelector('#OpcTestamento');
accionOpcTestamento.addEventListener("click", function (evento) {
    evento.preventDefault();
    var tipoTestamnt = document.getElementById("OpcTestamento").value;
 
    document.getElementById("fechCTJuicio").value = "";
    document.getElementById("fechCTJuicio").disabled = false;
    document.getElementById("DivFechInicioJuicio").style.display = "none";
    document.getElementById('editaBefens').disabled = true;
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
        case 'FRI':
            actualizaJubInha();
            break;

        case 'FRJ':
            actualizaJubInha();
            break;

        case 'FRF':
            actualizaFallAct();
            break;

        case 'FMJ':
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
                                                        Ufechbase:$("#fechBaseMae").val(),
                                                        UaniosServ:$('#aniosServMae').val(),
                                                        Umonttotret:document.getElementById('montRet').value.replace(',',''),
                                                        UfechRecibido:$("#fechRecibido").val(),
                                                        Unumbenefs:$("#numbenef").val(),
                                                        Ucurpmae:document.getElementById('CURPMae').value,
                                                        Urfcmae:document.getElementById('RFCMae').value,
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
                                                        Ufechbase:$("#fechBaseMae").val(),
                                                        UaniosServ:$('#aniosServMae').val(),
                                                        Umonttotret:document.getElementById('montRet').value.replace(',',''),
                                                        UfechRecibido:$("#fechRecibido").val(),
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
                                                        Ufechbase:document.getElementById("fechBaseMae").value, //$("#fechBaseMae").val(),
                                                        UaniosServ:$('#aniosServMae').val(),
                                                        UmodRet:document.getElementById("ModoRetiro").value,
                                                        Umonttotret:document.getElementById('montRet').value.replace(',',''),
                                                        Unumbenefs:$("#numBenefs").val(),
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

