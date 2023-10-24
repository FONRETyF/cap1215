var folioCheque = '';

function init() {

}

$(document).ready(function () {

});

var accionCancelCheq = document.getElementById("cancelCheque")
accionCancelCheq.addEventListener("click", function (e) {
    e.preventDefault();


    /*folcheque = $("#numCheqCalcel").val();*/
    $.post("../../controller/cheque.php?opcion=cancelCheque",{numcheque:$("#numCheqCalcel").val(),motvcanc:$("#motivCancel").val(),observ:$("#observCancelCheque").val()},function (data) {
        data = Object.values(JSON.parse(data));
        if (data[0] == "cancelado") {
            Swal.fire(
                "CHEQUE CANCELADO CORRECTAMENTE"
            );
            location.href = 'entregas.php';
        } else {
            Swal.fire(
                "ALGO SALIO MAL!!!",
                'verifiquelo con el administrador del sistema'
            );
        }
    });

});

$(".folcheque").keydown(function (event) {
    var key = window.event ? event.which : event.keyCode;
    if((key < 48 || key > 57) && (key < 96 || key > 105) && key !== 37 && key !==39 && key !==8 && key!==9 && key !==46){
        return false;
    }
});

$("#numCheqCalcel").change(function () {
    $folioCheque = $("#numCheqCalcel").val();

    if ($folioCheque.length == 7) {
        $.post("../../controller/cheque.php?opcion=buscaCheque",{folcheque:$folioCheque},function (dataCheque) {
            dataCheque =JSON.parse(dataCheque);
            dataResultCheque = Object.values(dataCheque);
			
            $("#resultsBusqCheq").html("");
			if(dataResultCheque.length == 0){
				Swal.fire(
                    "CHEQUE NO ENCONTRADO!!!",
                    'posiblemnete el folio ya fue repuesto, consulte en el sistema'
                );
			}else{
				if (dataResultCheque[0][6] == "CANCELADO") {
                Swal.fire(
                    "EL CHEQUE YA ESTA CANCELADO!!!",
                    'no se puede cancelar un cheque cancelado'
                );
                document.getElementById("cancelCheque").disabled = true;
				} else {
					for (let index = 0; index < dataResultCheque.length; index++) {
						datsCheq = Object.values(dataResultCheque[index]);
						var tr = `<tr>
									<td>`+dataResultCheque[0][0]+ `</td>
									<td>`+dataResultCheque[0][4]+ `</td>
									<td>`+dataResultCheque[0][2]+ `</td>
									<td>`+dataResultCheque[0][3]+ `</td>
									<td>`+dataResultCheque[0][5]+ `</td>
								</tr>`;
							$("#resultsBusqCheq").append(tr);
					}
				}
			}
        });
    } else {

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

init();
