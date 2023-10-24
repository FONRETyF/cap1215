function init(){
    $("#consulta_Retiro").on("submit", function(e){
        consultaRets(e);
    });
}

$(document).ready(function () {
    
});

$('#CveServPub').keydown(function (event) {
    var key = window.event ? event.which : event.keyCode;
    if((key < 65 || key > 90)  && (key < 97 || key > 122) && (key < 48 || key > 57) && (key < 96 || key > 105) && key !== 37 && key !==39 && key !==8 && key!==9 && key !==46 && key !== 32 && key !== 192){
        return false;
    } 
});

$('#CveServPub').change(function () {
    document.getElementById('CveServPub').value = document.getElementById('CveServPub').value.toUpperCase();
});

function consultaRets(e){
    e.preventDefault();

    var criterio= 0;
    var validaCri = false;
    var statCri = false;

    if (document.getElementById("RadBtnCSP").checked) {
        criterio =1;
        statCri = true;
    }
    if (document.getElementById("RadBtnIssemym").checked) {
        criterio =2;
        statCri = true;
    }
    if (document.getElementById("RadBtnNombre").checked) {
        criterio =3;
        statCri = true;
    }
    if (document.getElementById("RadBtnFolio").checked) {
        criterio =4;
        statCri = true;
    }

    if (!statCri) {
        Swal.fire(
            'SELECCIONE UN CRITERIO DE BUSQUEDA PARA EFECTUAR LA CONSULTA'
        );
    } else {
        validaCri= validacriterio(criterio, document.getElementById("CveServPub").value);
        if (!validaCri) {
            Swal.fire(
                'EL DATO PROPORCIONADO ES INCORRECTO VERIFIQUE LA CLAVE O NOMBRE'
            );
        } else {
            $.post("../../controller/retiros.php?op=buscaRets",{criterioBusq:criterio,valCriBusq:document.getElementById("CveServPub").value},function (data) {
                data = JSON.parse(data);
                dataResultBusqrets = Object.values(data);
                $("#resultBusqRets").html("");
                for (var index = 0; index < dataResultBusqrets.length; index++) {
                    datosRet = Object.values(dataResultBusqrets[index]);
                    var tr = `<tr>
                            <td>`+datosRet[0]+ `</td> 
                            <td>`+datosRet[1]+ `</td> 
                            <td>`+datosRet[2]+ `</td> 
                            <td>`+datosRet[3]+ `</td> 
                            <td>`+datosRet[4]+ `</td> 
                            <td>`+datosRet[5]+ `</td> 
                            <td>`+datosRet[10]+ `</td> 
                            <td>`+datosRet[6]+ `</td> 
                            <td>`+datosRet[7]+ `</td> 
                            <td>`+datosRet[8]+ `</td> 
                            <td>`+datosRet[9]+ `</td> 
                        </tr>`;
                    $("#resultBusqRets").append(tr);
                }     
            });
        }
    }
}

function validacriterio(criterio,valorCri){

    switch (criterio) {
        case 1:
            if (valorCri.length == 9) {
                return true;
            } else {
                return false;
            } 
            break;
        case 2:
            if (valorCri.length > 2 && valorCri.length < 8) {
                return true;
            } else {
                return false;
            } 
            break;

        case 3:
            if (valorCri.length > 3) {
                return true;
            } else {
                return false;
            } 
            break;

        case 4:
            if (valorCri.length == 7) {
                return true;
            } else {
                return false;
            } 
            break;

        default:
            break;
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


init();