var nomcommae = '';

function init() {

}


$(document).ready(

);

$(".CSPMae").keydown(function (event) {
    var key = window.event ? event.which : event.keyCode;
    if((key < 48 || key > 57) && (key < 96 || key > 105) && key !== 37 && key !==39 && key !==8 && key!==9 && key !==46){
        return false;
    }
});

$("#cspMae").change(function () {
    if ($("#cspMae").val().length < 9 || $("#cspMae").val().length > 9) {
        Swal.fire(
            'LA CLAVE DE SERVIDOR PUBLICO ES INCORRECTA',
            'deben ser 9 caracteres'
        );
        $("#cspMae").focus();
        document.getElementById('cspMae').style.border =  ".1em red solid";
    }else{
        document.getElementById('cspMae').style.border =  ".1em black solid";
    }
});

$(".cveissemym").keydown(function (event) {
    var key = window.event ? event.which : event.keyCode;
    if((key < 48 || key > 57) && (key < 96 || key > 105) && key !== 37 && key !==39 && key !==8 && key!==9 && key !==46){
        return false;
    }
});

$("#cveIMaeBusq").change(function () {
    if ($("#cveIMaeBusq").val().length < 3 || $("#cveIMaeBusq").val().length > 7) {
        Swal.fire(
            'LA CLAVE DE SERVIDOR PUBLICO ES INCORRECTA',
            'deben ser DE 3 A 7 caracteres'
        );
        $("#cveIMaeBusq").focus();
        document.getElementById('cveIMaeBusq').style.border =  ".1em red solid";
    }else{
        document.getElementById('cveIMaeBusq').style.border =  ".1em black solid";
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

$('#apePatMae').change(function () {
    nomcommae = $('#apePatMae').val() + " " + $('#apeMatMae').val() + " " + $('#nombreMae').val();
    $("#nomComplMae").val(nomcommae.trim().toUpperCase());
});

$('#apeMatMae').change(function () {
    nomcommae = $('#apePatMae').val() + " " + $('#apeMatMae').val() + " " + $('#nombreMae').val();
    $("#nomComplMae").val(nomcommae.trim().toUpperCase());
});

$('#nombreMae').change(function () {
    nomcommae = $('#apePatMae').val() + " " + $('#apeMatMae').val() + " " + $('#nombreMae').val();
    $("#nomComplMae").val(nomcommae.trim().toUpperCase());
});

$("#agregaMae").on("click", function (event) {
    event.preventDefault();

    $.post("../../controller/maestro.php?op=insertMae",{csp:$("#cspMae").val(),
                                                        cveissemym:$("#cveIMaeBusq").val(),
                                                        apepat:$('#apePatMae').val(),
                                                        apemat:$('#apePatMae').val(),
                                                        nombre:$('#apePatMae').val(),
                                                        nomcom:$('#nomComplMae').val(),
                                                        curp:$("#CURPMae").val(),
                                                        rfc:$("#RFCMae").val(),
                                                        region:$("#OpcRegSind").val()
                                                        },function (data) {
                                                            data = Object.values(JSON.parse(data));
                                                            if (data == "Agregado") {
                                                                swal.fire({
                                                                    title:'AGREGADO!!!',
                                                                    text:"El maestro se agrego correctamente.",
                                                                    confirmButtonText:'OK',
                                                                    cancelButtonText:'No',
                                                                    timer:15000
                                                                }).then((result)=>{
                                                                    if (result.isConfirmed){
                                                                        location.href = 'Inicio.php';
                                                                    }
                                                                });
                                                                
                                                            }else{
                                                                swal.fire({
                                                                    title:'ALGO SALIO MAL',
                                                                    text:"por favor verifique los datos e intentelo nuevamente",
                                                                    confirmButtonText:'OK',
                                                                    cancelButtonText:'No',
                                                                    timer:15000
                                                                }).then((result)=>{
                                                                    if (result.isConfirmed){
                                                                        location.href = 'Inicio.php';
                                                                    }
                                                                });
                                                            }
    });

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

init();