const identrega =  $("#InputIdentrega").val();

function init() {
}

$(document).ready(function () {
    var varstat = obtenEstatEntr(identrega);
    $('#retiros_data').dataTable({
        "aProcessing": true, //procesamiento dle datatable
        "aServerSide": true, //paginacion y filtrado por el servidor
        scrollY: '500px',
        scrollCollapse: true,
        paging: true,
        pagingType: 'full_numbers',
        dom: 'Bfrtip', //definicion de los elementos del control de la tabla
        buttons: [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5'
        ],
        "ajax":{
            url: '../../controller/retiros.php?op=listar&identrega='+ identrega,
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
        columnDefs:[
            {width: "5px",targets:0},
            {width: "5px",targets:1},
            {width: "5px",targets:2},
            {width: "5px",targets:3},
            {width: "5px",targets:4},
            {width: "5px",targets:5},
            {width: "5px",targets:6},
            {width: "3px",targets:7},
            {width: "3px",targets:8}
        ]
    }).DataTable();

    $("#c   errarDetalleRet").click(function () {
        $("#detalleInfoRatiro").modal('hide');
    });
});

function obtenEstatEntr(identrega) {
    $.post("../../controller/retiros.php?op=buscaEnt",{identrega:identrega},function(data){
        datEntr = JSON.parse(data);
        if (datEntr.EstatEnt == "CERRADA") {
            document.getElementById("operationsEntr").style.display = "none";
        }else{
            document.getElementById("operationsEntr").style.display = "block";
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

var motivo='';
var progamret='';
function mostrar(identret,cvemae) {
    $.post("../../controller/retiros.php?op=getTram",{identret:identret},function(data){
        datTramite = JSON.parse(data);
        var motivoRet = datTramite.motvret;
        var modretiro = datTramite.modretiro;
        if (motivoRet == "FRJ" || motivoRet == "FRI" || motivoRet == "FRF") {
            $.post("../../controller/retiros.php?op=mostrarJI",{identret:identret,modretiro:modretiro,cvemae:cvemae,motivoRet:motivoRet},function(datos){
                datos = JSON.parse(datos);
                if (datos.motvret == "FRJ") {
                    motivo="JUBILACION";
                } else if (datos.motvret == "FRI") {
                    motivo="INHABILITACION";
                }else if (datos.motvret == "FRF"){
                    motivo="FALLECIMIENTO";
                }

                switch (datos.modretiro) {
                    case 'C':
                        progamret = "COMPLETO";
                        break;

                    case 'D50':
                        progamret = "DIFERIDO 50%";
                        break;

                    case 'D100':
                        progamret = "PRORROGADO 100%";
                        break;

                    default:
                        break;
                }
                if (motivoRet == "FRJ" || motivoRet == "FRI") {
                    document.getElementById("secBenefes").style.display="none";
                    document.getElementById("DivDTFolche").style.display="block";
                    document.getElementById("DivDTEstatche").style.display="block";
                    document.getElementById("DivDTPermisos").style.display="block";
                    document.getElementById("DivDTDiasPermisos").style.display="block";
                    document.getElementById("DivDTAniosBase").style.display="block";


                }else if( motivoRet == "FRF"){
                    document.getElementById("secBenefes").style.display="block";
                    document.getElementById("DivDTFolche").style.display="none";
                    document.getElementById("DivDTEstatche").style.display="none";
                    document.getElementById("DivDTPermisos").style.display="block";
                    document.getElementById("DivDTDiasPermisos").style.display="block";
                    document.getElementById("DivDTAniosBase").style.display="block";

                    $.post("../../controller/retiros.php?op=busqbenefs",{cvemae:cvemae},function(data){
                        data = JSON.parse(data);
                        dataBenefs = Object.values(data);
                        $("#resultDTBenefs").html("");
                            for (var index = 0; index < dataBenefs.length; index++) {
                                datosBenef = Object.values(dataBenefs[index]);
                                    var tr = `<tr>
                                        <td>`+datosBenef[0]+ `</td>
                                        <td>`+datosBenef[1]+ `</td>
                                        <td>`+datosBenef[2]+ `</td>
                                        <td>`+datosBenef[3]+ `</td>
                                        <td>`+datosBenef[4]+ `</td>
                                        <td>`+datosBenef[5]+ `</td>
                                        <td>`+datosBenef[6]+ `</td>
                                        <td>`+datosBenef[7]+ `</td>
                                        <td>`+datosBenef[8]+ `</td>
                                        <td>`+datosBenef[9]+ `</td>
                                    </tr>`;
                                $("#resultDTBenefs").append(tr);
                                }
                    });
                }

                $("#DTIcvemae").val(datos.cvemae);
                $("#DTIMotivRet").val(motivo);
                $("#DTIfechBaja").val(datos.fechbajfall);
                $("#DTInommae").val(datos.nommae);
                $("#DTImodret").val(progamret);
                $("#DTImonttot").val(datos.montrettot);
                $("#DTImontentr").val(datos.montretentr);
                $("#DTImontff").val(datos.montretfall);
                $("#DTIfechRecib").val(datos.fechrecib);
                $("#DTIfechentre").val(datos.fechentrega);
                $("#DTIestattram").val(datos.estattramite);
                $("#DTIfechBase").val(datos.fcbasemae);
                $("#DTIpermisos").val(datos.numpsgs);
                $("#DTIdiaspermisos").val(datos.diaspsgs);
                $("#DTIaniosbase").val(datos.aservactmae);
                $("#DTIfolche").val(datos.folcheque);
                $("#DTIestatche").val(datos.estatcheque);
                $("#observTramite").val(datos.observtrami);
            });
        } else {
            document.getElementById("secBenefes").style.display="block";
            document.getElementById("DivDTFolche").style.display="none";
            document.getElementById("DivDTEstatche").style.display="none";
            document.getElementById("DivDTPermisos").style.display="none";
            document.getElementById("DivDTDiasPermisos").style.display="none";
            document.getElementById("DivDTAniosBase").style.display="block";

            $.post("../../controller/retiros.php?op=mostrarFJ",{identret:identret,modretiro:modretiro,cvemae:cvemae,motivoRet:motivoRet},function (datos) {
                datos = JSON.parse(datos);
                motivo="FALLECIMIENTO";
                progamret = "COMPLETO";

                $.post("../../controller/retiros.php?op=busqbenefs",{cvemae:cvemae},function(data){
                    data = JSON.parse(data);
                    dataBenefs = Object.values(data);
                    $("#resultDTBenefs").html("");
                        for (var index = 0; index < dataBenefs.length; index++) {
                            datosBenef = Object.values(dataBenefs[index]);

                                var tr = `<tr>
                                    <td>`+datosBenef[0]+ `</td>
                                    <td>`+datosBenef[1]+ `</td>
                                    <td>`+datosBenef[2]+ `</td>
                                    <td>`+datosBenef[3]+ `</td>
                                    <td>`+datosBenef[4]+ `</td>
                                    <td>`+datosBenef[5]+ `</td>
                                    <td>`+datosBenef[6]+ `</td>
                                    <td>`+datosBenef[7]+ `</td>
                                    <td>`+datosBenef[8]+ `</td>
                                    <td>`+datosBenef[9]+ `</td>
                                </tr>`;
                            $("#resultDTBenefs").append(tr);
                            }
                });

                $("#DTIcvemae").val(datos.cvemae);
                $("#DTIMotivRet").val(motivo);
                $("#DTIfechBaja").val(datos.fcfallecmae);
                $("#DTInommae").val(datos.nommae);
                $("#DTImodret").val(progamret);
                $("#DTImonttot").val(datos.montrettot);
                $("#DTImontentr").val(datos.montretentr);
                $("#DTImontff").val(datos.montretfall);
                $("#DTIfechRecib").val(datos.fechrecib);
                $("#DTIfechentre").val(datos.fechentrega);
                $("#DTIestattram").val(datos.estattramite);
                $("#DTIfechBase").val(datos.fechbajamae);
                $("#DTIaniosbase").val(datos.aniosjub);
                $("#observTramite").val(datos.observtrami);
            });
        }
    });
    $('#detalleInfoRatiro').modal('show');
}

function imprimir(identret,cvemae) {
    $.post("../../controller/retiros.php?op=getTram",{identret:identret},function(data){
        datTramite = JSON.parse(data);
        var motivoRet = datTramite.motvret;
        if (motivoRet == "FRJ" || motivoRet == "FRI") {
            location.href = "../../views/home/acuerdoRetiro.php" + "?identret=" + identret;
        } else {
            swal.fire(
                '¡¡¡ATENCION!!!',
                'No se genera acuerdo de retiro de un tramite por fallecimiento'
            );
        }
    });
}

function editarH(identret) {
    location.href = "../../views/home/tramiteUpdate.php" + "?identret=" + identret;
}

function eliminarH(identret,cvemae) {
    alert("dsjhshfihdifhidfhodsa");
    swal.fire({
        title:'ELIMINACIÓN DE TRAMITE',
        text:"Eliminara el tramite de la clave " + cvemae +"?",
        //icon: 'danger',
        showCancelButton: true,
        confirmButtonText:'Si',
        cancelButtonText:'No',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed){
            $.post("../../controller/retiros.php?op=deleteTramite",{identret:identret,cvemae:cvemae},function(data){
                resultadoDelete = Object.values( JSON.parse(data));
                NumregsResult = resultadoDelete.length;
                
                switch (NumregsResult) {
                    case 3:
                        if (resultadoDelete[0] == "Eliminado" && resultadoDelete[1] == "Actualizado" && resultadoDelete[2] == "Eliminado" ) {
                            tabla = $('#retiros_data').DataTable();
                            tabla.ajax.reload();
                            swal.fire(
                                'Eliminado!',
                                'El tramite se elimino correctamente!!!',
                                'success'
                            );
                        } else {
                            Swal.fire(
                                "ALGO SALIO MAL",
                                'por favor contacte al administrador del sistema'
                            );
                        }
                        break;

                    case 4:
                        if (resultadoDelete[0] == "Eliminado" && resultadoDelete[1] == "Eliminado" && resultadoDelete[2] == "Actualizado" && resultadoDelete[3] == "Eliminado" ) {
                            tabla = $('#retiros_data').DataTable();
                            tabla.ajax.reload();
                            swal.fire(
                                'Eliminado!',
                                'El tramite se elimino correctamente!!!',
                                'success'
                            );
                        } else {
                            Swal.fire(
                                "ALGO SALIO MAL",
                                'por favor contacte al administrador del sistema'
                            );
                        }
                        break;

                    case 5:
                        if (resultadoDelete[0] == "Eliminado" && resultadoDelete[1] == "Eliminado" && resultadoDelete[2] == "Eliminado" && resultadoDelete[3] == "Actualizado" && resultadoDelete[4] == "Eliminado" ) {
                            tabla = $('#retiros_data').DataTable();
                            tabla.ajax.reload();
                            swal.fire(
                                'Eliminado!',
                                'El tramite se elimino correctamente!!!',
                                'success'
                            );
                        } else {
                            Swal.fire(
                                "ALGO SALIO MAL",
                                'por favor contacte al administrador del sistema'
                            );
                        }
                        break;

                    default:
                        break;
                }
            });
        }
    });
}

init();
