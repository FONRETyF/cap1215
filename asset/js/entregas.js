var tabla;

const windowsModalEntrega = document.querySelector('.modalEntrega');
const closeModalEntrega = document.querySelector('.modal_close');

function init(){
    $("#edita_Entrega").on("submit",function(e){
        guardaryeditar(e);
    });
}

$("#editentrega").click(function () {
    $("#editarEntrega").modal('hide');
})

$(document).ready(function(){
    $('#entrega_data').dataTable({
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
            url: '../../controller/entregas.php?op=listar',
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

$(".Anioentrega").keydown(function (event) {
    var key = window.event ? event.which : event.keyCode;
    if((key < 48 || key > 57) && (key < 96 || key > 105) && key !== 37 && key !==39 && key !==8 && key!==9 && key !==46){
        return false;
    }
});

$(".numentrega").keydown(function (event) {
    var key = window.event ? event.which : event.keyCode;
    if((key < 48 || key > 57) && (key < 96 || key > 105) && key !== 37 && key !==39 && key !==8 && key!==9 && key !==46){
        return false;
    }
});

$(document).on("click", ".addEntrega", function (e) {
    e.preventDefault();
    
    guardaryeditar(e);
});

$(document).on("click", ".updateEntr", function (e) {
    e.preventDefault();
   
    updateEntr(e);
});


function guardaryeditar(e){
    e.preventDefault();

    var numentrega = $("#numentrega").val();
   
    if ($("#numentrega").val() < 10) {
        numentrega = 0 + $("#numentrega").val();
    }

    var identrega = $("#Anioentrega").val() + numentrega;
    document.getElementById("identrega").value = identrega; 

    $.post("../../controller/entregas.php?op=agregar",{identrega:identrega,Anioentrega:$("#Anioentrega").val(),numentrega:$("#numentrega").val(),descentrega:$("#descentrega").val(),fechentrega:$("#fechentrega").val(),observaciones:$("#observaciones").val()},function (data) {
        resultadoAdd = Object.values( JSON.parse(data));
        var resultado = resultadoAdd[0] ;
        switch (resultado) {
            case "Agregado":
                swal.fire(
                    'Registrada!',
                    'La entrega se ingreso correctamente!!!',
                    'success'
                );
                windowsModalEntrega.classList.remove('modalE--show');
                $('#entrega_data').DataTable().ajax.reload();
                break;
                       
            case "Existente":
                Swal.fire(
                    'EXISTENTE!',
                    'Ya esta registrada una entrega con los datos proporcionados!!!',
                    'success'
                );
                windowsModalEntrega.classList.remove('modalE--show');
                $('#entrega_data').DataTable().ajax.reload();
                break;
            
            case "Error":
                Swal.fire(
                    "LA ENTREGA NO SE AGREGO",
                    'surgio un error'
                );
                break;

            default:
                break;
        }
    });
}

function editar(identrega){
	$('.modal_title').html('Modificar datos de la entrega');
    $.post("../../controller/entregas.php?op=mostrar",{identrega:identrega},function(data){       
        data = JSON.parse(data);
        $('#identrega').val(data.identrega);
        $('#numentrega').val(data.numentrega);
        $('#Anioentrega').val(data.anioentrega);
        $('#descentrega').val(data.descentrega);
        $('#fechentrega').val(data.fechentrega);
        $('#observaciones').val(data.observaciones);
    });
    document.getElementById('numentrega').disabled = true;
    document.getElementById('Anioentrega').disabled = true;
  
    //$('#editarEntrega').modal('show');
    windowsModalEntrega.classList.add('modalE--show');
    document.getElementById('DivAsignaFecha').style.display = "block";
    document.querySelector('.addEntrega').style.display = "none";
    document.querySelector('.updateEntr').style.display = "block";    
}

function updateEntr(e){
    e.preventDefault();

    var actionFechEntr = document.getElementById('CheckAsigFech');
    var checked = actionFechEntr.checked;

    var fechaentrega = $("#fechentrega").val();

    if (checked) {
        $.post("../../controller/entregas.php?op=updateFech",{identrega:$("#identrega").val(),fechEntrega:fechaentrega},function(data){
            resultadoAdd = Object.values(JSON.parse(data));
            if (resultadoAdd[0] == "Actualizado" && resultadoAdd[1] == "Actualizado" && resultadoAdd[2] == "Actualizado") {
                Swal.fire(
                    "LA FECHA SE MODIFICO CORRECTAMENTE"
                );
                windowsModalEntrega.classList.remove('modalE--show');
            } else {
                Swal.fire(
                    "ALGO SALIO MAL",
                    'por favor verifique los datos'
                );
            }
        });
    } else {
        /*var formData = new FormData($("#edita_Entrega")[0]);
        $.ajax({
            url: '../../controller/entregas.php?op=guardaryeditar',
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function(datos){
                $('#edita_Entrega')[0].reset();
                $("#editarEntrega").modal('hide');
                $('#entrega_data').DataTable().ajax.reload();

                swal.fire(
                    'Registro!',
                    'La entrega se ingreso correctamente!!!',
                    'success'
                )
            }
        });*/
        $.post("../../controller/entregas.php?op=guardaryeditar",{identrega:$("#identrega").val(),Anioentrega:$("#Anioentrega").val(),numentrega:$("#numentrega").val(),descentrega:$("#descentrega").val(),fechentrega:$("#fechentrega").val(),observaciones:$("#observaciones").val()},function (data) {
            resultadoAdd = Object.values( JSON.parse(data));
            var resultado = resultadoAdd[0] ;
            switch (resultado) {
                case "Actualizado":
                    swal.fire(
                        'Registrada!',
                        'La entrega se ingreso correctamente!!!',
                        'success'
                    );
                    windowsModalEntrega.classList.remove('modalE--show');
                    $('#entrega_data').DataTable().ajax.reload();
                    break;
                
                case "Error":
                    Swal.fire(
                        "LA ENTREGA NO SE AGREGO",
                        'surgio un error'
                    );
                    break;
    
                default:
                    break;
            }
        });
    }
}

function eliminar(identrega){
    swal.fire({
        title:'ELIMINACIÓN DE ENTREGA',
        text:"Eliminara la entrega " + identrega +"?",
        //icon: 'danger',
        showCancelButton: true,
        confirmButtonText:'Si',
        cancelButtonText:'No',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed){
            $.post("../../controller/entregas.php?op=eliminar",{identrega:identrega},function(data){
            });
            tabla = $('#entrega_data').DataTable();
            tabla.ajax.reload();
            swal.fire(
                'Eliminado!',
                'La entrega se elimino correctamente!!!',
                'success'
            )
        }
    })
}

function detalleRetiros(identrega){
    location.href = "../../views/home/detalleRetiros.php" + "?identrega=" + identrega;
}

$(document).on("click","#entrNueva",function(e) {
   /* $('#modal-title').html('Nueva entrega');
    $('#edita_Entrega')[0].reset();
    $('#editarEntrega').modal('show');
    document.getElementById('DivAsignaFecha').style.display = "none";*/

    e.preventDefault();
    $('.modal_title').html('Alta de entregas');

    $("#Anioentrega").val("");
    $("#numentrega").val("");
    $("#descentrega").val("");
    $("#fechentrega").val("");
    $("#observaciones").val("");

    document.getElementById('Anioentrega').disabled = false;
	document.getElementById('numentrega').disabled = false;
	document.getElementById('DivAsignaFecha').style.display = "none";
    document.querySelector('.updateEntr').style.display = "none";
	document.querySelector('.addEntrega').style.display = 'block';
	
    windowsModalEntrega.classList.add('modalE--show');
});

$(document).on("click",".modalE_close",function (e) {
    e.preventDefault();
    windowsModalEntrega.classList.remove('modalE--show');
});

var accionRegresa = document.querySelector('.Btnregresar');
accionRegresa.addEventListener("click", function (e) {
    e.preventDefault;

    let pagAnterior = document.referrer;
    if (pagAnterior.indexOf(window.location.host) !== -1) {
        window.history.back();
    }
});



init();
