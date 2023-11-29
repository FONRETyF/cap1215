var motivo = "";
var programfallec = "";
var clavemae;

function init() {
  
}

$(document).ready(function(){
    document.getElementById('numentr').value = document.getElementById('InputNumEntr').value;
    document.getElementById('AnioEntr').value = document.getElementById('InputAnioEntr').value;

    document.getElementById("DivTestBenefsMae").style.display = "none";
    document.getElementById("numfolcheqTEJI").style.display = "none";
    
    $('#tituto_BasJubBajFall').html('BASE Y BAJA');
    $('#tituto_InptBasJub').html('Base: &nbsp');
    $('#tituto_InptBajFall').html('Baja: &nbsp');   
    $("#cerrarEditBenefs").click(function () {
        $("#editarBenefs").modal('hide');
    });
});

$("#OpcCauRetiro").change(function () {
    motivo= $("#OpcCauRetiro").val();

    switch (motivo) {
        case "FRI":
            document.getElementById("DivDictamen").style.display = "block";
            document.getElementById("DivTestBenefsMae").style.display = "none";
            document.getElementById("numfolcheqTEJI").style.display = "block";
            
            $('#tituto_BasJubBajFall').html('BASE Y BAJA');
            $('#tituto_InptBasJub').html('Base: &nbsp');
            $('#tituto_InptBajFall').html('Baja: &nbsp');    
            break;

        case "FRJ":
            document.getElementById("DivDictamen").style.display = "block";
            document.getElementById("DivTestBenefsMae").style.display = "none";
            document.getElementById("numfolcheqTEJI").style.display = "block";

            $('#tituto_BasJubBajFall').html('BASE Y BAJA'); 
            $('#tituto_InptBasJub').html('Base: &nbsp');  
            $('#tituto_InptBajFall').html('Baja: &nbsp');    
            break;

        case "FRF":
            document.getElementById("DivDictamen").style.display = "none";
            document.getElementById("DivTestBenefsMae").style.display = "block";
            document.getElementById("numfolcheqTEJI").style.display = "none";

            $('#tituto_BasJubBajFall').html('JUBILACION Y FALLECIMIENTO');
            $('#tituto_InptBasJub').html('Base: &nbsp');
            $('#tituto_InptBajFall').html('Fallecim.: &nbsp');
            break;

        case "FMJ":
            document.getElementById("cspMaeBusq").disabled =  true;
            document.getElementById("DivDictamen").style.display = "none";
            document.getElementById("DivTestBenefsMae").style.display = "block";
            document.getElementById("numfolcheqTEJI").style.display = "none";

            $('#tituto_BasJubBajFall').html('JUBILACION Y FALLECIMIENTO');
            $('#tituto_InptBasJub').html('Jubilacion:&nbsp ');
            $('#tituto_InptBajFall').html('Fallecim.: &nbsp');
            break;

        default:
            break;
    }
});

$(".CSPMae").keydown(function (event) {
    var key = window.event ? event.which : event.keyCode;
    if((key < 48 || key > 57) && (key < 96 || key > 105) && key !== 37 && key !==39 && key !==8 && key!==9 && key !==46){
        return false;
    }
});

$(".cveissemym").keydown(function (event) {
    var key = window.event ? event.which : event.keyCode;
    if((key < 48 || key > 57) && (key < 96 || key > 105) && key !== 37 && key !==39 && key !==8 && key!==9 && key !==46){
        return false;
    }
});

$('#CURPMae').keydown(function (event) {
    var key = window.event ? event.which : event.keyCode;
    if((key < 65 || key > 90)  && (key < 97 || key > 122) && (key < 48 || key > 57) && (key < 96 || key > 105) && key !== 37 && key !==39 && key !==8 && key!==9 && key !==46){
        return false;
    }
});

$('#CURPMae').change(function () {
    document.getElementById('RFCMae').value = document.getElementById('CURPMae').value.substr(0,10).toUpperCase();
    if ($("#CURPMae").val().length < 18 ) {
        Swal.fire(
            'LA CLAVE CURP ES INCORRECTA',
            'deben ser 18 caracteres'
        );
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

$('#RFCMae').change(function () {
    if ($("#RFCMae").val().length < 10 || $("#RFCMae").val().length > 13) {
        Swal.fire(
            'LA CLAVE RFC ES INCORRECTA',
            'deben ser 10 o 13 caracteres'
        );
        $("#RFCMae").focus();
        document.getElementById('RFCMae').style.border =  ".1em red solid";
    }else{
        document.getElementById('RFCMae').style.border =  ".1em black solid";
    }
});

$("#cspMaeBusq").change(function () {
    clavemae = $("#cspMaeBusq").val();
    
    if (clavemae.length == 9) {
        $.post("../../controller/maestro.php?op=buscar",{clavemae:clavemae},function(data){ 
            if(jQuery.isEmptyObject(data)){
                
            }else{
                data = JSON.parse(data);
                
                if(data.motivo == "existente" || data.estatlabmae != "P"){
                    if (data.motivo == "existente") {
                        Swal.fire(
                            'Ya se encuentra un tramite registrado con la misma clave, por motivo de: ' + data.motvret +  ' el ' + data.fechentrega,
                            'Verifique su clave'                            
                        ).then((result)=>{
                            let pagAnterior = document.referrer;
                            if (pagAnterior.indexOf(window.location.host) !== -1) {
                                window.history.back();
                            }
                        });
                    }else if (data.estatlabmae != "P" && data.motivo == "inconsistencia") {
                        Swal.fire(
                            'ATENCION---REVISAR EL EXPEDIENTE'                            
                        ).then((result)=>{
                            let pagAnterior = document.referrer;
                            if (pagAnterior.indexOf(window.location.host) !== -1) {
                                window.history.back();
                            }
                        });
                    }
                    
                }else if(data.motivo == "nuevo" && data.estatlabmae == "P"){
                    estatusMae = "ACTIVO";
                    $('#cspMaeBusq').val(data.csp);
                    $('#cveIMaeBusq').val(data.cveissemym);
                    $('#apePatMae').val(data.apepatmae);
                    $('#apeMatMae').val(data.apematmae);
                    $('#nombreMae').val(data.nommae);
                    $('#estLaboral').val(estatusMae);
                    $('#nomComplMae').val(data.nomcommae);
                    $('#nomSolic').val(data.nomcommae); 

                    if (motivo == "FA") {
                        document.getElementById("OpcTestamento").disabled =  false;
                        document.getElementById("fechCTJuicio").disabled =  false;                        
                    }
                }
            }
        });
    } else {
        Swal.fire(
            'La clave es incorrecta, debe tener 9 digitos',
            'Verifique y corrija la clave!!!'
        );
    }
});

$("#cveIMaeBusq").change(function() {
    claveisemym = document.getElementById("cveIMaeBusq").value;

    if (claveisemym.length < 3 ) {
        Swal.fire(
            'LA CLAVE DE ISSEMYM ES INCORRECTA',
            'debe tener un maximo de 6 digitos y minimo 3 digitos'
        )
    }
    
    if($("#apePatMae").val().length == 0){
        $.post("../../controller/maestro.php?op=buscarJub",{claveisemym:claveisemym},function(dataJ){ 
            if(jQuery.isEmptyObject(dataJ)){
                
            }else{
                dataJ = JSON.parse(dataJ);
                var motivo = dataJ.motivo;
                var estatusmae = dataJ.estatusjub;
                programfallec = dataJ.programafallec;
                if (motivo == "nuevo" && estatusmae == "A") {
                    estatusMae = "JUBILADO " + programfallec;
                    $('#apePatMae').val(dataJ.apepatmae);
                    $('#apeMatMae').val(dataJ.apematmae);
                    $('#nombreMae').val(dataJ.nommae);
                    $('#estLaboral').val(estatusMae);
                    $('#nomComplMae').val(dataJ.nomcommae);
                    $('#CURPMae').val(dataJ.curpmae);
                    $('#RFCMae').val(dataJ.rfcmae);
                    
                    $('#inputProgramFall').val(dataJ.programafallec);

                } else if (motivo == "existente" || estatusmae == "F") {
                    if (dataJ.motivo == "existente") {
                        Swal.fire(
                            'Ya se encuentra un tramite registrado con la misma clave, por motivo de Fallecimiento' + dataJ.fechentrega,
                            'Verifique su clave'                            
                        ).then((result)=>{
                            let pagAnterior = document.referrer;
                            if (pagAnterior.indexOf(window.location.host) !== -1) {
                                window.history.back();
                            }
                        });
                    }
                } else if (estatusmae == "P") {
                    Swal.fire(
                        'El maestro aun no esta activo en el programa de mutualidad'                            
                    ).then((result)=>{
                        let pagAnterior = document.referrer;
                        if (pagAnterior.indexOf(window.location.host) !== -1) {
                            window.history.back();
                        }
                    });
                } else if (motivo == "nuevo" || estatusmae == "F") {
                    Swal.fire(
                        'No se puede dar de alta un tramite con esta clave que tiene estatus de Fallecido'                            
                    ).then((result)=>{
                        let pagAnterior = document.referrer;
                        if (pagAnterior.indexOf(window.location.host) !== -1) {
                            window.history.back();
                        }
                    });
                }
            }
        });
    }
});

const accionFechBaja = document.querySelector("#fechBajaMae");
accionFechBaja.addEventListener("blur", function (evento) {
    evento.preventDefault();

    if (parseInt(document.getElementById('fechBajaMae').value.split("-")[0]) < 2012 || parseInt(document.getElementById('fechBajaMae').value.split("-")[0]) > 2024) {
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

    if (parseInt(document.getElementById('fechBaseMae').value.split("-")[0]) < 1899 || parseInt(document.getElementById('fechBaseMae').value.split("-")[0]) > 2024) {
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
});

const accioFechTEstmnt = document.querySelector("#fechCTJuicio");
accioFechTEstmnt.addEventListener("blur", function (evento) {
    evento.preventDefault();

    var tipTestamento = document.getElementById('OpcTestamento').value;
    var validAnioFechCTJuic = false;

    if (parseInt(document.getElementById('fechCTJuicio').value.split("-")[0]) > 1930 && parseInt(document.getElementById('fechCTJuicio').value.split("-")[0]) < 2024) {
        document.getElementById("fechCTJuicio").style.border =  ".1em black solid";
        validAnioFechCTJuic = true;
    }else{
        document.getElementById("fechCTJuicio").style.border =  ".1em red solid";
        Swal.fire(
            "El año de la fecha de CT o Juicio no es valido",
            'por favor corrija la fecha'
        );
        validAnioFechCTJuic = false;
    }
});

var numBenefs=0;
const benefs_max = 20;
var contBenefs=1;
const accionBenefs = document.querySelector("#editaBefens");
accionBenefs.addEventListener("click", function (evento){
    evento.preventDefault();

    if (numBenefs == 0) {
        $('#edita_Benefs')[0].reset();
        $('#editarBenefs').modal('show');
        document.getElementById('numsBenefs').value = contBenefs;
    } else {
        $('#edita_Benefs')[0].reset();
        document.getElementById('numsBenefs').value = contBenefs;
        $('#editarBenefs').modal('show');
        var aB_nombres = document.getElementById('nomsbenefs').value.split(",");
        var aB_curps = document.getElementById('curpsbenefs').value.split(",");
        var aB_parents = document.getElementById('parentsbenefs').value.split(",");
        var aB_porcents = document.getElementById('porcentsbenefs').value.split(",");
        var aB_edades = document.getElementById('edadesbenefs').value.split(",");
        var aB_vida = document.getElementById('vidasbenefs').value.split(",");
		var aB_folios = document.getElementById('foliosbenefs').value.split(",");
        var aB_montos = document.getElementById('montosbenefs').value.split(",");

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
						break;
                       
                    case 'montBenef[]':
                        formulario.elements[i].value = aB_montos[indexA];
                        indexA++;
                        break;

                    default:
                        break;
                }
            }
    }
});

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
    var a_folios = [];
    var a_montos = [];
    var porcentajeBenefs = 0;
    var integridadDats = true;
    var curpvacia=false;
    

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
                    curpvacia=false;
                    a_curps.push(formulario.elements[index].value);
                    integridadDats = true;
                }else{
                    curpvacia=true;
                    a_curps.push(formulario.elements[index].value);
                    integridadDats = false;
                }
                break;
            
            case 'parentBenef[]':
                a_parentescos.push(formulario.elements[index].value);
                break;

            case 'porcentBenef[]':
                if (parseFloat(formulario.elements[index].value) > 0 && parseFloat(formulario.elements[index].value) <= 100) {
                    a_porcentajes.push(parseFloat(formulario.elements[index].value));
                    porcentajeBenefs = porcentajeBenefs + parseFloat(formulario.elements[index].value);
                } else {
                    a_porcentajes.push(parseFloat(formulario.elements[index].value));
                    porcentajeBenefs = porcentajeBenefs + parseFloat(formulario.elements[index].value);
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
                if (formulario.elements[index].value == "F" && curpvacia == true) {
                    a_vida.push(formulario.elements[index].value);
                    integridadDats = true;
                } else if (formulario.elements[index].value == "V" && curpvacia == true) {
                    a_vida.push(formulario.elements[index].value);
                    integridadDats = false;
                } else  {
                    a_vida.push(formulario.elements[index].value);
                }
                break;
            
            case 'numcheqBenef[]':
                a_folios.push(formulario.elements[index].value);
                break;
            
            case 'montBenef[]':
                a_montos.push(formulario.elements[index].value);
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
        document.getElementById('foliosbenefs').value = a_folios;
        document.getElementById('montosbenefs').value = a_montos;

        document.getElementById('numBenefs'). value = document.getElementById('numsBenefs').value;
        numBenefs = document.getElementById('numsBenefs').value;
        $('#edita_Benefs')[0].reset();
        $("#editarBenefs").modal('hide');
    }
});

var accionAgregar = document.getElementById('agregaTramite');
accionAgregar.addEventListener("click", function (event) {
    event.preventDefault();

    switch (motivo) {
        case 'FRI':
            agregajubilado();
            break;

        case 'FRJ':
            agregajubilado();
            break;

        case 'FRF':
            agregaRetFallecimiento();
            break;

        case 'FMJ':
            agregaRetFallecimientoJ();
            break;

        default:
            break;
    }
});

function agregajubilado() {
    $.post("../../controller/tramites.php?op=agregar",{Ianioentr:$("#AnioEntr").val(),
                                                    Inumentr:$("#numentr").val(),
                                                    Iidentr:$("#IdEntrega").val(),
                                                    Icvemae:$("#cspMaeBusq").val(),
                                                    Icveissemym:document.getElementById('cveIMaeBusq').value,
                                                    Imotret:$("#OpcCauRetiro").val(),
                                                    Iapepat:$("#apePatMae").val(),
                                                    Iapemat:$("#apeMatMae").val(),
                                                    Inombre:$("#nombreMae").val(),
                                                    Inomcom:$("#nomComplMae").val(),
                                                    IRegMae:$("#OpcRegSind").val(),
                                                    IfechDictam:$("#fechDictamen").val(),
                                                    InumDictam:$("#folioDictamen").val(),
                                                    Ifechbaj:$("#fechBajaMae").val(),
                                                    InomSolic:$("#nomSolic").val(),
                                                    Ifechbase:$("#fechBaseMae").val(),
                                                    IaniosServ:$('#aniosServMae').val(),
                                                    Imonttotret:document.getElementById('montRet').value,
                                                    IfechRecibido:$("#fechRecibido").val(),
                                                    Icurpmae:$("#CURPMae").val(),
                                                    Irfcmae: $("#RFCMae").val(),
                                                    IObserv: $("#observTramite").val(),
                                                    IFolCheq: $("#numfolcheqTEJI").val()
                                                    },function (data) {
                                                        resultadoAdd = Object.values( JSON.parse(data));
                                                        NumregsResult = resultadoAdd.length;
                                                        switch (NumregsResult) {
                                                            case 1:
                                                                Swal.fire(
                                                                    "EL TRAMITE YA FUE INGRESADO CON ANTERIORIDAD",
                                                                    'por favor ingrese un nuevo tramite'
                                                                );
                                                                javascript:history.go(-1);
                                                                break;

                                                            case 3:
                                                                if (resultadoAdd[0] == "Agregado" && resultadoAdd[1] == "Actualizado" && resultadoAdd[2] == "Agregado") {
                                                                    Swal.fire(
                                                                        "TRAMITE INGRESADO CORRECTAMENTE"
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
                                                                if (resultadoAdd[0] == "Agregado" && resultadoAdd[1] == "Actualizado" && resultadoAdd[2] == "Agregado" && resultadoAdd[3] == "Agregado") {
                                                                    Swal.fire(
                                                                        "TRAMITE INGRESADO CORRECTAMENTE"
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
                                                                if (resultadoAdd[0] == "Agregado" && resultadoAdd[1] == "Actualizado" && resultadoAdd[2] == "Agregado" && resultadoAdd[3] == "Agregado" && resultadoAdd[4] == "Agregado") {
                                                                    Swal.fire(
                                                                        "TRAMITE INGRESADO CORRECTAMENTE"
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


function agregaRetFallecimiento() {
    $.post("../../controller/tramites.php?op=agregarF",{Ianioentr:$("#AnioEntr").val(),
                                                        Inumentr:$("#numentr").val(),
                                                        Iidentr:$("#IdEntrega").val(),
                                                        Icvemae:$("#cspMaeBusq").val(),
                                                        Icveissemym:document.getElementById('cveIMaeBusq').value,
                                                        Imotret:$("#OpcCauRetiro").val(),
                                                        Iapepat:$("#apePatMae").val(),
                                                        Iapemat:$("#apeMatMae").val(),
                                                        Inombre:$("#nombreMae").val(),
                                                        Inomcom:$("#nomComplMae").val(),
                                                        IRegMae:$("#OpcRegSind").val(),
                                                        Ifechbaj:$("#fechBajaMae").val(),
                                                        InomSolic:$("#nomSolic").val(),
                                                        Ifechbase:$("#fechBaseMae").val(),
                                                        IaniosServ:$('#aniosServMae').val(),
                                                        Imonttotret:document.getElementById('montRet').value,
                                                        IfechRecibido:$("#fechRecibido").val(),
                                                        Inumbenefs:$("#numBenefs").val(),
                                                        Idoctestamnt:$("#OpcTestamento").val(),
                                                        Inomsbenefs:document.getElementById('nomsbenefs').value.split(","),
                                                        Icurpsbenefs:document.getElementById('curpsbenefs').value.split(","),
                                                        Iparentsbenefs:document.getElementById('parentsbenefs').value.split(","),
                                                        Iporcnsbenefs:document.getElementById('porcentsbenefs').value.split(","),
                                                        Iedadesbenefs:document.getElementById('edadesbenefs').value.split(","),
                                                        Ividabenefs:document.getElementById('vidasbenefs').value.split(","),
                                                        Ifechtestamnt:$("#fechCTJuicio").val(),
                                                        Icurpmae:$("#CURPMae").val(),
                                                        Irfcmae: $("#RFCMae").val(),
                                                        IObserv: $("#observTramite").val(),
                                                        IfolBenefs: $("#foliosbenefs").val().split(","),
                                                        ImonstBenefs: $("#montosbenefs").val().split(",")
                                                        },function (data) {
                                                            resultadoAdd = Object.values( JSON.parse(data));
                                                            NumregsResult = resultadoAdd.length;
                                                            switch (NumregsResult) {
                                                                case 1:
                                                                    Swal.fire(
                                                                        "EL TRAMITE YA FUE INGRESADO CON ANTERIORIDAD",
                                                                        'por favor ingrese un nuevo tramite'
                                                                    );
                                                                    javascript:history.go(-1);
                                                                    break;

                                                                case 4:
                                                                    if (resultadoAdd[0] == "Agregado" && resultadoAdd[1] == "Actualizado" && resultadoAdd[2] == "Agregado" && resultadoAdd[3] == "Agregado") {
                                                                        Swal.fire(
                                                                            "TRAMITE INGRESADO CORRECTAMENTE"
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


function agregaRetFallecimientoJ() {
    $.post("../../controller/tramites.php?op=agregarFJ",{Ianioentr:$("#AnioEntr").val(),
                                                        Inumentr:$("#numentr").val(),
                                                        Iidentr:$("#IdEntrega").val(),
                                                        Icveissemym:document.getElementById('cveIMaeBusq').value,
                                                        Imotret:$("#OpcCauRetiro").val(),
                                                        Iapepat:$("#apePatMae").val(),
                                                        Iapemat:$("#apeMatMae").val(),
                                                        Inombre:$("#nombreMae").val(),
                                                        Inomcom:$("#nomComplMae").val(),
                                                        IRegMae:$("#OpcRegSind").val(),
                                                        Ifechbaj:$("#fechBajaMae").val(),
                                                        InomSolic:$("#nomSolic").val(),
                                                        Ifechbase:$("#fechBaseMae").val(),
                                                        IaniosServ:$('#aniosServMae').val(),
                                                        Imonttotret:document.getElementById('montRet').value,
                                                        IfechRecibido:$("#fechRecibido").val(),
                                                        Inumbenefs:$("#numBenefs").val(),
                                                        Idoctestamnt:$("#OpcTestamento").val(),
                                                        Inomsbenefs:document.getElementById('nomsbenefs').value.split(","),
                                                        Icurpsbenefs:document.getElementById('curpsbenefs').value.split(","),
                                                        Iparentsbenefs:document.getElementById('parentsbenefs').value.split(","),
                                                        Iporcnsbenefs:document.getElementById('porcentsbenefs').value.split(","),
                                                        Iedadesbenefs:document.getElementById('edadesbenefs').value.split(","),
                                                        Ividabenefs:document.getElementById('vidasbenefs').value.split(","),
                                                        Icurpmae:document.getElementById('CURPMae').value,
                                                        Irfcmae:document.getElementById('RFCMae').value,
                                                        Ifechtestamnt:$("#fechCTJuicio").val(),
                                                        IObserv: $("#observTramite").val(),
                                                        IfolBenefs: $("#foliosbenefs").val().split(","),
                                                        ImonstBenefs: $("#montosbenefs").val().split(",")
                                                        },function (data) {
                                                            resultadoAdd = Object.values( JSON.parse(data));
                                                            NumregsResult = resultadoAdd.length;
                                                            switch (NumregsResult) {
                                                                case 1:
                                                                    Swal.fire(
                                                                        "EL TRAMITE YA FUE INGRESADO CON ANTERIORIDAD",
                                                                        'por favor ingrese un nuevo tramite'
                                                                    );
                                                                    javascript:history.go(-1);
                                                                    break;

                                                                case 4:
                                                                    if (resultadoAdd[0] == "Agregado" && resultadoAdd[1] == "Actualizado" && resultadoAdd[2] == "Agregado" && resultadoAdd[3] == "Agregado") {
                                                                        Swal.fire(
                                                                            "TRAMITE INGRESADO CORRECTAMENTE"
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

init();