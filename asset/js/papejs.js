   
function init() {
    
    
    
}




$(function(){
    
    $(".inputCURP").keydown(function(event){
        if((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105) && (event.keyCode < 65 || event.keyCode > 90) && (event.keyCode < 97 || event.keyCode > 122) && event.keyCode !==37  && event.keyCode !==39 && event.keyCode !==8 && event.keyCode !==9 && event.keyCode !==46){
            return false;
        }else if (event.keyCode > 96 || event.keyCode < 123){
            this.value = this.value.toUpperCase();
        }
    });
});



/*$("#cveIMaeBusq").change(function () {
    
});

$('#CURPMae').change(function () {
    document.getElementById('RFCMae').value = document.getElementById('CURPMae').value.substr(0,10);
})

$("#fechBaseMae").change(function () {
    fechBase = $("#fechBaseMae").val();
});

$("#fechBajaMae").change(function () {
    fechBaja = $("#fechBajaMae").val();
});*/

function validaVigenciaTram(){
    var fechaRecibido = new Date(document.getElementById('fechRecibido').value);
    var fechaBaja = new Date(document.getElementById('fechBajaMae').value);
    alert("Entro en la funcion valida tramite");
    if((isNaN(Date.parse(fechaBaja))) || (isNaN(Date.parse(fechaRecibido))) ){
        Swal.fire(
            'La fecha de recibido o de baja no ha sido ingresada',
            'por favor verifique sus datos!'
        );
    }else if (fechaBaja != null && fechaBaja < fechaRecibido) {
        vigenciaTram = ((fechaRecibido.getTime() - fechaBaja.getTime()) / (1000 * 60 * 60 * 24))/365;
        alert("esta en esta funcion");
        if(vigenciaTram > 1){
            

        }
    }
}

/*function ocultaDivFondFall(modalidad){
    var x = document.getElementById("montRetFondFall");
    if (modalidad == "P" || modalidad=="FF") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}*/

function modifNomMae(){
    $('#modal-title').html('Modificar Nombre');
    $.post("../../controller/maestro.php?op=mostrarNom",{clavemae:clavemae},function(data){       
        data = JSON.parse(data);
        $('#cvemae').val(data.csp);
        $('#apepatModif').val(data.apepatmae);
        $('#apematModif').val(data.apematmae);
        $('#nommaeModif').val(data.nommae);
        $('#nomcomModif').val(data.nomcommae);
    });
    $('#editarNomMae').modal('show');
}



/*function calculaAñosServicio(){
    var fechaBase = new Date(document.getElementById('fechBaseMae').value);
    var fechaBaja = new Date(document.getElementById('fechBajaMae').value);
    
    if (isNaN(Date.parse(fechaBase)) || isNaN(Date.parse(fechaBaja))) {
        Swal.fire(
            'Falta una fecha para el calculo',
            'por favor verifique sus datos!'
        );
    } else {
        if (fechaBaja > fechaBase){
            var difDias = fechaBaja.getTime() - fechaBase.getTime();
            document.getElementById('numPsgs').value = 0;
            document.getElementById('tiempoPsgs').value = (difDias / (1000 * 60 * 60 * 24));
            document.getElementById('aniosServMae').value = Math.trunc((difDias / (1000 * 60 * 60 * 24))/365);
            document.getElementById("ModoRetiro").disabled =  false;
        }else if (fechaBaja != null && fechaBaja < fechaBase) {
            Swal.fire(
                'La fecha de baja debe ser posterior a la fecha de base',
                'por favor verifique sus datos!'
            );
            document.getElementById('tiempoPsgs').value = 0;
        }
    }  
}*/

var contPSGS = 0;

/*$("#AdedFajam").change(function () {
    var AdeudoFajam = document.getElementById('AdedFajam').value;
    document.getElementById('AdedFajam').value = (new Intl.NumberFormat('es-MX').format(AdeudoFajam));
});

$("#AdedTS").change(function () {
    var AdeudoTS = document.getElementById('AdedTS').value;
    document.getElementById('AdedTS').value = (new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(AdeudoTS));
});
$("#AdedFonObra").change(function () {
    var AdeudoFonObra = $("#AdedFonObra").val();
    document.getElementById('AdedFonObra').value = (new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(AdeudoFonObra));
});
$("#AdedFondPension").change(function () {
    var AdeudoFondPension = $("#AdedFondPension").val();
    document.getElementById('AdedFondPension').value = (new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(AdeudoFondPension));
});
$("#AdedTurismo").change(function () {
    var AdeudoTurismo = $("#AdedTurismo").val();
    document.getElementById('AdedTurismo').value = (new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(AdeudoTurismo));
});*/






init();

/*var eleetosform = document.getElementById("form_CarpetasArchivo");
    for (let index = 0; index < eleetosform.elements.length; index++) {
        element = eleetosform.elements[index].name;
         alert(element);
    }*/