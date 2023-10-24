var tabla;

const windowsModalEmision = document.querySelector('.modalEmision');
const windowsModalEdoCta = document.querySelectorAll('.modal_container')[0];

const closeModalEmision = document.querySelector('.modal_close');

const idemi =  $("#inputIdEmis").val();

function init(){
    
}

$(document).ready(function(){
    $('#emisiones_data').dataTable({
        "aProcessing": true, //procesamiento del datatable
        "aServerSide": true, //paginacion y filtrado por el servidor
        scrollY: '500px',
        scrollCollapse: true,
        paging: true,
        dom: 'Bfrtip', //definicion de los elementos del control de la tabla
        buttons: [		          
            'copyHtml5',
            'excelHtml5',
            'csvHtml5'
        ],
        "ajax":{
            url: '../../controller/mutualidad.php?op=listar',
            type : "post",
            dataType : "json",						
            error: function(e){
                console.log(e.responseText);
            }
        },
        "ordering": false,
        'rowsGroup': [0,1],
        "bDestroy": true,
        "responsive": true,
        "bInfo":true,
        "iDisplayLength": 50,
        "language": {
            "sProcessing":     "Procesando...",
            "sLengthMenu":     "Mostrar _MENU_ registros",
            "sZeroRecords":    "No se encontraron resultados",
            "sEmptyTable":     "Ningún dato disponible en esta tabla",
            "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix":    "",
            "sSearch":         "Buscar:",
            "sUrl":            "",
            "sInfoThousands":  ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {          
                "sFirst":    "Primero",
                "sLast":     "Último",
                "sNext":     "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        },
    }).DataTable();

    $('#solicsmut_data').dataTable({
        "aProcessing": true, //procesamiento del datatable
        "aServerSide": true, //paginacion y filtrado por el servidor
        scrollY: '500px',
        scrollCollapse: true,
        paging: true,
        dom: 'Bfrtip', //definicion de los elementos del control de la tabla
        buttons: [		          
            'copyHtml5',
            'excelHtml5',
            'csvHtml5'
        ],
        "ajax":{
            url: '../../controller/mutualidad.php?op=listarS&idemision='+ idemi,
            type : "post",
            dataType : "json",						
            error: function(e){
                console.log(e.responseText);
            }
        },
        "ordering": false,
        'rowsGroup': [0,1],
        "bDestroy": true,
        "responsive": true,
        "bInfo":true,
        "iDisplayLength": 50,
        "language": {
            "sProcessing":     "Procesando...",
            "sLengthMenu":     "Mostrar _MENU_ registros",
            "sZeroRecords":    "No se encontraron resultados",
            "sEmptyTable":     "Ningún dato disponible en esta tabla",
            "sInfo":           "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "sInfoEmpty":      "Mostrando registros del 0 al 0 de un total de 0 registros",
            "sInfoFiltered":   "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix":    "",
            "sSearch":         "Buscar:",
            "sUrl":            "",
            "sInfoThousands":  ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {          
                "sFirst":    "Primero",
                "sLast":     "Último",
                "sNext":     "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        },
    }).DataTable();



});

function eliminar(idemision){
    swal.fire({
        title:'ELIMINACIÓN DE EMISION',
        text:"Eliminara la emision " + idemision +"?",
        //icon: 'danger',
        showCancelButton: true,
        confirmButtonText:'Si',
        cancelButtonText:'No',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed){
            $.post("../../controller/mutualidad.php?op=eliminar",{idemision:idemision},function(data){
            });
            tabla = $('#emisiones_data').DataTable();
            tabla.ajax.reload();
            swal.fire(
                'Eliminada!',
                'La emision se elimino correctamente!!!',
                'success'
            )
        }
    });
}

$(document).on("click", ".addEmision", function (e) {
    e.preventDefault();
    guardaryeditar(e);
});

$(document).on("click", ".updateEmision", function (e) {
    e.preventDefault();
    updateEmi(e);
});

function editar(idemision){
    $.post("../../controller/mutualidad.php?op=mostrar",{idemision:idemision},function(data){       
        data = JSON.parse(data);
        $('#idemision').val(data.idemision);
        $('#numemision').val(data.numemision);
        $('#Anioemision').val(data.anioemision);
        $('#descemision').val(data.descemision);
        $('#fechIniRecep').val(data.fechemision);
        $('#observemision').val(data.observemision);
    });
    document.getElementById('numemision').disabled = true;
    document.getElementById('Anioemision').disabled = true;

    document.querySelector('.addEmision').style.display = "none";

    /*document.querySelector('.updateEmision').style.display = "block";*/
    $('.modal_title').html('Modificacion de emision para afiliaciones al programa de Mutalidad');
    windowsModalEmision.classList.add('modal--show');
}

function guardaryeditar(e){
    e.preventDefault();

    var fechIniRecepEmis = $("#fechIniRecep").val();
    var numEmiMut = $("#numemision").val();

    if ($("#numemision").val() < 10) {
        numEmiMut = 0 + $("#numemision").val();
    }

    var idEmision = $("#Anioemision").val() + numEmiMut;
    document.getElementById("idemision").value = idEmision; 

    $.post("../../controller/mutualidad.php?op=agregar",{idemision:idEmision,numemision:$("#numemision").val(),anioemision:$("#Anioemision").val(),fechEmision:$("#fechIniRecep").val(),descemision:$("#descemision").val(),observemi:$("#observemision").val()},function (data) {
        resultadoAdd = Object.values( JSON.parse(data));
        var resultado = resultadoAdd[0] ;
        switch (resultado) {
            case "Agregado":
                swal.fire(
                    'Registro!',
                    'La emision se ingreso correctamente!!!',
                    'success'
                );
                windowsModalEmision.classList.remove('modal--show');
                $('#emisiones_data').DataTable().ajax.reload();
                break;
                       
            case "Existente":
                Swal.fire(
                    'EXISTENTE!',
                    'Ya esta registrada una emision con los datos proporcionados!!!',
                    'success'
                );
                windowsModalEmision.classList.remove('modal--show');
                $('#emisiones_data').DataTable().ajax.reload();
                break;
            
            case "Error":
                Swal.fire(
                    "LA EMISION NO SE AGREGO",
                    'surgio un error'
                );
                break;

            default:
                break;
        }
    });    
}

function updateEmi(e){
    e.preventDefault();

    var numEmiMut = $("#numemision").val();

    if ($("#numemision").val() < 10) {
        numEmiMut = 0 + $("#numemision").val();
    }

    var idEmision = $("#Anioemision").val() + numEmiMut;
    document.getElementById("idemision").value = idEmision; 

    $.post("../../controller/mutualidad.php?op=updateEmi",{idemision:idEmision,numemision:$("#numemision").val(),anioemision:$("#Anioemision").val(),fechEmision:$("#fechIniRecep").val(),descemision:$("#descemision").val(),observemi:$("#observemision").val()},function (data) {
        resultadoAdd = Object.values( JSON.parse(data));
        var resultado = resultadoAdd[0] ;
        switch (resultado) {         
            case "Actualizado":
                Swal.fire(
                    'Actualizado!',
                    'La emision se actualizo correctamente!!!',
                    'success'
                );
                windowsModalEmision.classList.remove('modal--show');
                $('#emisiones_data').DataTable().ajax.reload();
                break;
            
            case "Error":
                Swal.fire(
                    "LA EMISION NO SE AGREGO",
                    'surgio un error'
                );
                break;

            default:
                break;
        }
    });    
}

function detalleEmision(idemision){
    location.href = "../../views/home/detalleEmiMut.php" + "?idemi=" + idemision;
}

$(document).on("click",".newEmision",function (e) {
    e.preventDefault();
    $('.modal_title').html('Alta de emision para afiliaciones al programa de Mutualidad');
    document.querySelector('.updateEmision').style.display = "none";
    windowsModalEmision.classList.add('modal--show');
});

$(document).on("click",".modal_close",function (e) {
    e.preventDefault();
    windowsModalEmision.classList.remove('modal--show');
});

$(".cveIssemym").keydown(function (event) {
    var key = window.event ? event.which : event.keyCode;
    if((key < 48 || key > 57) && (key < 96 || key > 105) && key !== 37 && key !==39 && key !==8 && key!==9 && key !==46){
        return false;
    }
});

$(document).on("click",".searchMae",function (e) {
    e.preventDefault;
    
    $.post("../../controller/mutualidad.php?op=buscaEdoCta",{cveissemym:$("#cveIssemym").val()},function (data) {
        dataEdoCtaNew = JSON.parse(data);
        $("#nomcomMae").val(dataEdoCtaNew.nomcomjub);
        $("#numaports").val(dataEdoCtaNew.numaport);
        $("#anioultaport").val(dataEdoCtaNew.anioultaport);
    });
});

$(document).on("click",".updateEdoCtaMut",function (e) {
    e.preventDefault;
    
    $.post("../../controller/mutualidad.php?op=updateEdoCta",{cveissemym:$("#cveIssemym").val(),numaportant:$("#numaports").val(),numaport:$("#numaportsNew").val(),anioultaport:$("#anioultaportNew").val()},function (data) {
        resultadoUp = Object.values( JSON.parse(data));
        var resultado = resultadoUp[0] ;
        switch (resultado) {         
            case "Actualizado":
                Swal.fire(
                    'Actualizado!',
                    'El estado de cuenta se actualizo correctamente!!!',
                    'success'
                );
                location.href = 'emisionesMut.php';
                break;
            
            case "Error":
                Swal.fire(
                    "EL ESTADO DE CUENTA NO SE ACTUALIZO CORRECTAMENTE",
                    'surgio un error - consultelo con el administrador del sistema'
                );
                break;

            default:
                break;
        }
    });
});

var accionRegresa = document.querySelector('.Btnregresar');
accionRegresa.addEventListener("click", function (e) {
    e.preventDefault;

    let pagAnterior = document.referrer;
    if (pagAnterior.indexOf(window.location.host) !== -1) {
        window.history.back();
    }
});

var accionBtnInicio = document.getElementById('Btnnicio');
accionBtnInicio.addEventListener("click", function (e) {
    e.preventDefault();

    location.href = 'Inicio.php';
});




init();