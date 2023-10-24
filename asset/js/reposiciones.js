function init(){

}

$(document).ready(function () {
  document.getElementById("divDatsReposCheq").style.display = "none";
});

$("#BttnBuscarCheq").on("click",function (e) {
    e.preventDefault();

    $.post("../../controller/cheque.php?opcion=buscaCheqC",{folio:$("#numCheqCancel").val()},function (data) {
        data = Object.values(JSON.parse(data));
        if (data.length === 0) {
            Swal.fire(
                "NO SE PUEDE REPONER EL CHEQUE " + $("#numCheqCancel").val(),
                'solo se puede reponer un cheque que fue CANCELADO'
            );
        } else {
            resultBusqCheqC = Object.values(data[0]);
            $("#resultBusqCheqs").html("");
            for (let index = 0; index < resultBusqCheqC.length; index++) {
                datosCheq = Object.values(resultBusqCheqC[index]);
                var tr = `<tr>
                        <td>`+datosCheq[4]+ `</td>
                        <td>`+datosCheq[8]+ `</td>
                        <td>`+datosCheq[19]+ `</td>
                        <td>`+datosCheq[31]+ `</td>
                        <td>`+datosCheq[20]+ `</td>
                    </tr>`;
                $("#resultBusqCheqs").append(tr);
            }

            $("#NomBenefRepos").val(resultBusqCheqC[0][8]);
            $("#MontBenefRepos").val(resultBusqCheqC[0][9].replace(",","").replace("$",""));
            $("#MontLetRepos").val(resultBusqCheqC[0][10]);

            if (resultBusqCheqC[0][22] == 2 || resultBusqCheqC[0][22] == 4 || resultBusqCheqC[0][22]==5 || resultBusqCheqC[0][22]==20 || resultBusqCheqC[0][22]==23) {
                document.getElementById("divDatsReposCheq").style.display = "block";
            }
        }
    });
});

$(".MontBenefRepos").keydown( function(event){
	var key = window.event ? event.which : event.keyCode;
    if((key < 48 || key > 57) && (key < 96 || key > 105) && key !== 37 && key !==39 && key !==8 && key!==9 && key !==46){
        return false;
    }
});

$("#MontBenefRepos").change( function (){
	var montbenefRepos = $("#MontBenefRepos").val();
	
	$.post("../../controller/cheque.php?opcion=cantidadLet",{montoRepos:montbenefRepos},function(data){
		$("#MontLetRepos").val(data);
	});
});

$("#reposCheque").on("click", function (e) {
    e.preventDefault();

    $.post("../../controller/cheque.php?opcion=reponerCheque",{folioAnt:$("#numCheqCancel").val(),folioNuevo:$("#numCheqRepos").val(),fechRepos:$("#fechRepos").val(),observRepos:$("#observRepos").val(),nomBenef:$("#NomBenefRepos").val(),montBenef:$("#MontBenefRepos").val(),montBenefLet:$("#MontLetRepos").val()},function (data) {
        data = Object.values(JSON.parse(data));
        resultPre = data.length;
        switch (resultPre) {
            case 1:
                if (data[0] == "Fallo") {
                    Swal.fire(
                        "ALGO SALIO MAL",
                        'por favor comuniquese con el administrador del sistema'
                    );
                }
                break;

            case 2:
                if (data[0] == "Agregado" && data[1] == "Actualizado") {
                    Swal.fire(
                        "REPOSICION REALIZADA CORRECTAMENTE"
                    );
                    location.href = "../../views/home/oficioReposicion.php" + "?folio=" + $("#numCheqCancel").val();
                }
                if (data[0] == "Agregado" && data[1] == "Fallo") {
                    Swal.fire(
                        "ALGO SALIO MAL",
                        'por favor comuniquese con el administrador del sistema'
                    );
                }

                break;

            default:
                break;
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
