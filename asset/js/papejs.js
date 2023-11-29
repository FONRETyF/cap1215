   
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

var contPSGS = 0;

init();
